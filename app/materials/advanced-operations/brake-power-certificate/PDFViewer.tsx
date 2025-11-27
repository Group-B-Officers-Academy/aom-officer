'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set up PDF.js worker - using jsdelivr CDN with https protocol (more reliable)
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
}

interface PDFViewerProps {
  pageNumber: number
  scale?: number // Deprecated: using dynamic width calculation instead
  onDocumentLoadSuccess: (data: { numPages: number }) => void
  onPrevPage?: () => void
  onNextPage?: () => void
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pageNumber, onDocumentLoadSuccess, onPrevPage, onNextPage }) => {
  const isClient = typeof window !== 'undefined'
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined)
  const [isProtected, setIsProtected] = useState<boolean>(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const touchEndX = useRef<number>(0)
  const touchEndY = useRef<number>(0)

  useEffect(() => {
    // Ensure client-side setup
    if (typeof window !== 'undefined') {
      // Set worker source again in useEffect to ensure it's set
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
      
      // Set page width to fit viewport without scrolling
      const updateWidth = () => {
        if (window.innerWidth < 640) {
          // Mobile: account for padding on both sides
          setPageWidth(window.innerWidth - 32)
        } else if (window.innerWidth < 768) {
          // Small tablet: account for padding
          setPageWidth(window.innerWidth - 128)
        } else if (window.innerWidth < 1024) {
          // Tablet: account for padding
          setPageWidth(window.innerWidth - 160)
        } else {
          // Desktop: max width for better readability
          setPageWidth(920)
        }
      }
      updateWidth()
      window.addEventListener('resize', updateWidth)
      
      const container = containerRef.current
      if (!container) {
        return () => {
          window.removeEventListener('resize', updateWidth)
        }
      }

      // Disable copy, paste, and right-click only within PDF container
      const handleContextMenu = (e: MouseEvent) => {
        if (container.contains(e.target as Node)) {
          e.preventDefault()
          return false
        }
      }

      const handleCopy = (e: ClipboardEvent) => {
        if (container.contains(e.target as Node)) {
          e.preventDefault()
          return false
        }
      }

      const handleCut = (e: ClipboardEvent) => {
        if (container.contains(e.target as Node)) {
          e.preventDefault()
          return false
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        // Only block if focus is within PDF container
        if (container.contains(document.activeElement)) {
          // Disable Ctrl+C, Ctrl+A, Ctrl+V, Ctrl+X, Cmd+C, Cmd+A, Cmd+V, Cmd+X
          if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'x' || e.key === 'X' || e.key === 'a' || e.key === 'A')) {
            e.preventDefault()
            return false
          }
        }
      }

      const handleSelectStart = (e: Event) => {
        if (container.contains(e.target as Node)) {
          e.preventDefault()
          return false
        }
      }

      const handleDragStart = (e: DragEvent) => {
        if (container.contains(e.target as Node)) {
          e.preventDefault()
          return false
        }
      }

      // Enhanced Screenshot and screen capture protection for mobile and desktop - More aggressive
      let visibilityTimeout: NodeJS.Timeout | null = null
      const handleVisibilityChange = () => {
        if (document.hidden) {
          // Page hidden - likely screenshot taken on mobile or app switch
          setIsProtected(true)
          if (visibilityTimeout) clearTimeout(visibilityTimeout)
          // Keep protection active longer - don't auto-disable
          // visibilityTimeout = setTimeout(() => {
          //   setIsProtected(false)
          // }, 5000) // Much longer delay
        } else {
          // Page visible again - keep protection active for longer
          if (visibilityTimeout) clearTimeout(visibilityTimeout)
          setIsProtected(true)
          visibilityTimeout = setTimeout(() => {
            setIsProtected(false)
          }, 3000) // Longer delay
        }
      }
      document.addEventListener('visibilitychange', handleVisibilityChange)

      const handleBlur = () => {
        setIsProtected(true)
        // Keep protection active - don't auto-disable on blur
      }
      const handleFocus = () => {
        setIsProtected(true)
        setTimeout(() => setIsProtected(false), 3000) // Longer delay
      }
      window.addEventListener('blur', handleBlur)
      window.addEventListener('focus', handleFocus)

      // Detect page unload (app closing/switching on mobile)
      const handleBeforeUnload = () => {
        setIsProtected(true)
      }
      window.addEventListener('beforeunload', handleBeforeUnload)
      window.addEventListener('pagehide', handleBeforeUnload)

      // Detect Print Screen key (desktop)
      const handlePrintScreen = (e: KeyboardEvent) => {
        if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && e.key === 'S')) {
          e.preventDefault()
          setIsProtected(true)
          setTimeout(() => setIsProtected(false), 2000)
          return false
        }
      }
      document.addEventListener('keydown', handlePrintScreen)

      // Detect screen capture using MediaQueryList
      let mediaQuery: MediaQueryList | null = null
      let handleMediaChange: ((e: MediaQueryListEvent) => void) | null = null
      try {
        mediaQuery = window.matchMedia('(display-mode: fullscreen)')
        handleMediaChange = (e: MediaQueryListEvent) => {
          if (e.matches) {
            setIsProtected(true)
            setTimeout(() => setIsProtected(false), 1000)
          }
        }
        mediaQuery.addEventListener('change', handleMediaChange)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_e) {
        // MediaQueryList not supported
      }

      // Mobile-specific: Detect touch events that might indicate screenshot attempt - More aggressive
      const handleTouchStart = (e: TouchEvent) => {
        // Multiple simultaneous touches might indicate screenshot gesture
        if (e.touches.length > 1) {
          setIsProtected(true)
          // Keep protection active longer - don't auto-disable immediately
          setTimeout(() => setIsProtected(false), 5000) // Much longer delay
        }
      }
      document.addEventListener('touchstart', handleTouchStart, { passive: true })
      
      // Additional mobile screenshot detection - detect rapid visibility changes
      let lastVisibilityChange = Date.now()
      const handleVisibilityChangeAggressive = () => {
        const now = Date.now()
        const timeSinceLastChange = now - lastVisibilityChange
        lastVisibilityChange = now
        
        // If visibility changes rapidly (within 500ms), likely screenshot attempt
        if (timeSinceLastChange < 500) {
          setIsProtected(true)
          // Keep protection active - don't auto-disable
        }
      }
      document.addEventListener('visibilitychange', handleVisibilityChangeAggressive)

      // Detect screen orientation changes (mobile)
      const handleOrientationChange = () => {
        setIsProtected(true)
        setTimeout(() => setIsProtected(false), 1000)
      }
      window.addEventListener('orientationchange', handleOrientationChange)

      // Periodic check for visibility (mobile screenshot detection) - More frequent and aggressive
      const visibilityCheck = setInterval(() => {
        if (document.hidden) {
          setIsProtected(true)
          // Keep protection active while hidden - don't auto-disable
        }
        // Also check for rapid focus/blur changes
        if (document.hasFocus && !document.hasFocus()) {
          setIsProtected(true)
        }
      }, 50) // More frequent checks

      // Add event listeners
      document.addEventListener('contextmenu', handleContextMenu)
      document.addEventListener('copy', handleCopy, true)
      document.addEventListener('cut', handleCut, true)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('selectstart', handleSelectStart, true)
      document.addEventListener('dragstart', handleDragStart, true)

      // Cleanup
      return () => {
        if (visibilityTimeout) clearTimeout(visibilityTimeout)
        window.removeEventListener('resize', updateWidth)
        document.removeEventListener('contextmenu', handleContextMenu)
        document.removeEventListener('copy', handleCopy, true)
        document.removeEventListener('cut', handleCut, true)
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('selectstart', handleSelectStart, true)
        document.removeEventListener('dragstart', handleDragStart, true)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        document.removeEventListener('visibilitychange', handleVisibilityChangeAggressive)
        window.removeEventListener('blur', handleBlur)
        window.removeEventListener('focus', handleFocus)
        window.removeEventListener('beforeunload', handleBeforeUnload)
        window.removeEventListener('pagehide', handleBeforeUnload)
        document.removeEventListener('keydown', handlePrintScreen)
        document.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('orientationchange', handleOrientationChange)
        clearInterval(visibilityCheck)
        if (mediaQuery && handleMediaChange) {
          mediaQuery.removeEventListener('change', handleMediaChange)
        }
      }
    }
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[600px] w-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading PDF...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .pdf-viewer-container,
          .pdf-viewer-container *,
          .pdf-viewer-container *::before,
          .pdf-viewer-container *::after {
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            -webkit-touch-callout: none !important;
            -webkit-tap-highlight-color: transparent !important;
          }
          .pdf-viewer-container ::selection,
          .pdf-viewer-container *::selection {
            background: transparent !important;
          }
          .pdf-viewer-container ::-moz-selection,
          .pdf-viewer-container *::-moz-selection {
            background: transparent !important;
          }
          .pdf-viewer-container.protected::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.95);
            z-index: 999999;
            pointer-events: none;
            animation: pulse-black 0.5s infinite;
          }
          @keyframes pulse-black {
            0%, 100% { background: rgba(0, 0, 0, 0.95); }
            50% { background: rgba(0, 0, 0, 1); }
          }
          .pdf-viewer-container.protected::after {
            content: 'Screenshot Protection Active - Screenshots Not Allowed';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff0000;
            font-size: 20px;
            font-weight: bold;
            z-index: 1000000;
            pointer-events: none;
            animation: pulse-text 0.5s infinite;
            text-align: center;
            padding: 30px;
            background: rgba(0, 0, 0, 0.95);
            border-radius: 10px;
            border: 3px solid #ff0000;
            text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
          }
          @keyframes pulse-text {
            0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.05); }
          }
          @media print {
            .pdf-viewer-container {
              display: none !important;
            }
          }
          @media screen {
            @media (prefers-color-scheme: dark) {
              .pdf-viewer-container.protected::before {
                background: rgba(0, 0, 0, 0.95);
              }
            }
          }
        `
      }} />
      {/* Continuous Watermark Overlay for Screenshot Protection - Always Active */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 999998,
          background: `
            repeating-linear-gradient(45deg, 
              transparent, 
              transparent 50px, 
              rgba(255,0,0,0.03) 50px, 
              rgba(255,0,0,0.03) 100px
            ),
            repeating-linear-gradient(-45deg, 
              transparent, 
              transparent 50px, 
              rgba(0,0,255,0.03) 50px, 
              rgba(0,0,255,0.03) 100px
            )
          `,
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />
      {/* Additional Text Watermark Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 999997,
          background: 'transparent',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 200px,
              rgba(0,0,0,0.02) 200px,
              rgba(0,0,0,0.02) 201px
            )
          `,
        }}
        aria-hidden="true"
      />
      <div 
        ref={containerRef}
        className={`pdf-viewer-container ${isProtected ? 'protected' : ''}`}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          WebkitTouchCallout: 'none',
          WebkitTapHighlightColor: 'transparent',
          pointerEvents: 'auto',
        }}
        onContextMenu={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onTouchStart={(e) => {
          const touch = e.touches[0]
          touchStartX.current = touch.clientX
          touchStartY.current = touch.clientY
        }}
        onTouchEnd={(e) => {
          const touch = e.changedTouches[0]
          touchEndX.current = touch.clientX
          touchEndY.current = touch.clientY
          
          // Calculate swipe distance
          const deltaX = touchEndX.current - touchStartX.current
          const deltaY = touchEndY.current - touchStartY.current
          
          // Minimum swipe distance (50px)
          const minSwipeDistance = 50
          
          // Check if it's a horizontal swipe (not vertical scrolling)
          if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0 && onPrevPage) {
              // Swipe right - go to previous page
              onPrevPage()
            } else if (deltaX < 0 && onNextPage) {
              // Swipe left - go to next page
              onNextPage()
            }
          }
        }}
      >
        <Document
          file="/materials/BRAKE POWER CERTIFICATE.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[600px] w-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base">Loading PDF...</p>
              </div>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={true}
            className="shadow-lg mx-auto"
            width={pageWidth}
          />
        </Document>
      </div>
    </>
  )
}

export default PDFViewer

