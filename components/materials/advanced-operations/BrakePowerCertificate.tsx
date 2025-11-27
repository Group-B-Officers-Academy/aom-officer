'use client'
import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Dynamically import react-pdf with SSR disabled
const PDFViewer = dynamic(
  () => import('../../../app/materials/advanced-operations/brake-power-certificate/PDFViewer').then((mod) => ({ default: mod.default })),
  { ssr: false, loading: () => <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[600px] w-full"><div className="text-center"><div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div><p className="text-gray-600 text-sm sm:text-base">Loading PDF...</p></div></div> }
)

const BrakePowerCertificate = () => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.5)
  const [isProtected, setIsProtected] = useState<boolean>(true) // Start with protection active
  const contentRef = useRef<HTMLDivElement>(null)
  const protectionIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Adjust scale based on screen size
  useEffect(() => {
    const updateScale = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 640) {
          setScale(0.8) // Mobile
        } else if (window.innerWidth < 1024) {
          setScale(1.2) // Tablet
        } else {
          setScale(1.5) // Desktop
        }
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // Enhanced Screenshot and screen capture protection for mobile and desktop
  useEffect(() => {
    if (typeof window === 'undefined') return

    const content = contentRef.current
    if (!content) return

    // Detect screen capture using MediaQueryList API
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

    // Enhanced visibility detection for mobile screenshots - More aggressive
    let visibilityTimeout: NodeJS.Timeout | null = null
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page hidden - likely screenshot taken on mobile or app switch
        setIsProtected(true)
        if (visibilityTimeout) clearTimeout(visibilityTimeout)
        // Keep protection active - NEVER auto-disable when hidden
      } else {
        // Page visible again - keep protection active for much longer
        if (visibilityTimeout) clearTimeout(visibilityTimeout)
        setIsProtected(true)
        // Only disable after 5 seconds and only if still focused
        visibilityTimeout = setTimeout(() => {
          if (document.hasFocus() && !document.hidden) {
            setIsProtected(false)
            // Immediately trigger random protection
            setTimeout(() => {
              setIsProtected(true)
              setTimeout(() => {
                if (document.hasFocus() && !document.hidden) {
                  setIsProtected(false)
                }
              }, 300)
            }, 100)
          }
        }, 5000) // Much longer delay
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Detect blur events (window losing focus) - mobile app switching - More aggressive
    const handleBlur = () => {
      setIsProtected(true)
      // Keep protection active - NEVER auto-disable on blur
    }
    const handleFocus = () => {
      setIsProtected(true)
      // Keep protection active for longer, then briefly disable and re-enable
      setTimeout(() => {
        if (document.hasFocus() && !document.hidden) {
          setIsProtected(false)
          // Immediately re-enable protection briefly
          setTimeout(() => {
            setIsProtected(true)
            setTimeout(() => {
              if (document.hasFocus() && !document.hidden) {
                setIsProtected(false)
              }
            }, 400)
          }, 100)
        }
      }, 4000) // Longer delay
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
    const handleKeyDown = (e: KeyboardEvent) => {
      // Print Screen key (keyCode 44 or key === 'PrintScreen')
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && e.key === 'S')) {
        e.preventDefault()
        setIsProtected(true)
        setTimeout(() => setIsProtected(false), 2000)
        return false
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    // Prevent dev tools shortcuts
    const handleDevTools = (e: KeyboardEvent) => {
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault()
        setIsProtected(true)
        setTimeout(() => setIsProtected(false), 1000)
        return false
      }
    }
    document.addEventListener('keydown', handleDevTools)

    // Mobile-specific: Detect touch events that might indicate screenshot attempt - More aggressive
    const handleTouchStart = (e: TouchEvent) => {
      // Multiple simultaneous touches might indicate screenshot gesture
      if (e.touches.length > 1) {
        setIsProtected(true)
        // Keep protection active longer - don't auto-disable immediately
        setTimeout(() => setIsProtected(false), 5000) // Much longer delay
      }
      // Also detect power button + volume button combination (common screenshot gesture)
      // This is detected via rapid visibility changes
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

    // Enhanced CSS to prevent screenshots (mobile and desktop)
    const style = document.createElement('style')
    style.textContent = `
      .protected-content {
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
      .protected-content * {
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        pointer-events: auto !important;
      }
      .protected-content button,
      .protected-content a {
        pointer-events: auto !important;
        z-index: 1000002 !important;
        position: relative;
      }
      .protected-content::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        z-index: 999999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.1s;
      }
      .protected-content.protected::before {
        opacity: 1;
        animation: pulse-black 0.5s infinite;
      }
      @keyframes pulse-black {
        0%, 100% { background: rgba(0, 0, 0, 0.95); }
        50% { background: rgba(0, 0, 0, 1); }
      }
      .protected-content.protected::after {
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
        text-align: center;
        padding: 30px;
        background: rgba(0, 0, 0, 0.98);
        border-radius: 10px;
        border: 4px solid #ff0000;
        animation: pulse-text 0.3s infinite;
        text-shadow: 0 0 15px rgba(255, 0, 0, 1);
        box-shadow: 0 0 30px rgba(255, 0, 0, 0.8);
      }
      @keyframes pulse-text {
        0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 0.95; transform: translate(-50%, -50%) scale(1.08); }
      }
      /* Make content harder to capture even when protection is "off" */
      .protected-content {
        position: relative;
      }
      .protected-content::selection {
        background: transparent !important;
      }
      .protected-content *::selection {
        background: transparent !important;
      }
      @media print {
        .protected-content {
          display: none !important;
        }
      }
      @media screen {
        @supports (-webkit-touch-callout: none) {
          .protected-content {
            -webkit-touch-callout: none !important;
          }
        }
      }
    `
    document.head.appendChild(style)

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

    // Aggressive random protection - randomly activate protection to make screenshot timing harder
    const randomProtection = () => {
      // Randomly activate protection for short durations
      const randomDelay = Math.random() * 2000 + 1000 // 1-3 seconds
      const randomDuration = Math.random() * 500 + 200 // 200-700ms
      
      setTimeout(() => {
        setIsProtected(true)
        setTimeout(() => {
          // Only disable if no other protection is active
          if (!document.hidden && document.hasFocus()) {
            setIsProtected(false)
          }
        }, randomDuration)
      }, randomDelay)
    }
    
    // Start random protection cycle
    protectionIntervalRef.current = setInterval(() => {
      randomProtection()
    }, 3000) // Trigger every 3 seconds

      return () => {
        if (visibilityTimeout) clearTimeout(visibilityTimeout)
        if (protectionIntervalRef.current) clearInterval(protectionIntervalRef.current)
        if (mediaQuery && handleMediaChange) {
          mediaQuery.removeEventListener('change', handleMediaChange)
        }
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        document.removeEventListener('visibilitychange', handleVisibilityChangeAggressive)
        window.removeEventListener('blur', handleBlur)
        window.removeEventListener('focus', handleFocus)
        window.removeEventListener('beforeunload', handleBeforeUnload)
        window.removeEventListener('pagehide', handleBeforeUnload)
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keydown', handleDevTools)
        document.removeEventListener('touchstart', handleTouchStart)
        window.removeEventListener('orientationchange', handleOrientationChange)
        clearInterval(visibilityCheck)
        if (document.head.contains(style)) {
          document.head.removeChild(style)
        }
      }
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages))
  }
  

  return (
    <>
      {/* Continuous Watermark Overlay for Screenshot Protection - Always Active with stronger opacity */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 999997,
          background: `
            repeating-linear-gradient(45deg, 
              transparent, 
              transparent 30px, 
              rgba(255,0,0,0.05) 30px, 
              rgba(255,0,0,0.05) 60px
            ),
            repeating-linear-gradient(-45deg, 
              transparent, 
              transparent 30px, 
              rgba(0,0,255,0.05) 30px, 
              rgba(0,0,255,0.05) 60px
            )
          `,
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />
      {/* Additional Text Watermark Overlay - Stronger */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 999996,
          background: 'transparent',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 150px,
              rgba(0,0,0,0.03) 150px,
              rgba(0,0,0,0.03) 151px
            )
          `,
        }}
        aria-hidden="true"
      />
      {/* Additional rotating watermark text overlay */}
      <div
        style={{
          position: 'fixed',
          top: '20%',
          left: '10%',
          width: '80%',
          height: '60%',
          pointerEvents: 'none',
          zIndex: 999995,
          opacity: 0.15,
          background: 'transparent',
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,0,0,0.1) 100px, rgba(255,0,0,0.1) 200px)',
          mixBlendMode: 'multiply',
        }}
        aria-hidden="true"
      />
      <div 
        ref={contentRef}
        className={`min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden protected-content ${isProtected ? 'protected' : ''}`}
        style={{
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
          WebkitTouchCallout: 'none',
        }}
      >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-linear-to-r from-blue-100 to-indigo-100 text-blue-700 font-bold rounded-full text-sm uppercase tracking-wide">
                Advanced Operations
              </span>
            </div>
            <h1 className="lg:text-5xl text-3xl md:text-4xl font-black mb-6 leading-tight bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
              Brake Power Certificate
            </h1>
            <p className="lg:text-xl text-base md:text-lg text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
              Comprehensive guide for brake power certificate systems, operational protocols, and procedures for railway brake management
            </p>
          </div>

          

          {/* PDF Single Page Viewer Section - Placed at Bottom */}
          <div 
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-3 sm:p-4 md:p-8 lg:p-12 border border-gray-100/50 mt-8 sm:mt-12 animate-fade-in-up"
            style={{
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
              WebkitTouchCallout: 'none',
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl md:rounded-3xl"></div>
            
            <div className="relative">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 px-2">
                  Read the Document
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
                  Browse through the Brake Power Certificate page by page. Use controls below to navigate.
                </p>
              </div>
              
              {/* PDF Display */}
              <div className="relative bg-gray-100 rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-6 lg:p-8 shadow-xl mb-4 md:mb-6">
                <div className="bg-white rounded-lg p-2 sm:p-4 md:p-6 flex justify-center items-center -mx-2 sm:mx-0">
                  <div className="w-full flex justify-center max-w-full">
                    <PDFViewer
                      pageNumber={pageNumber}
                      scale={scale}
                      onDocumentLoadSuccess={onDocumentLoadSuccess}
                      onPrevPage={goToPrevPage}
                      onNextPage={goToNextPage}
                    />
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200" style={{ position: 'relative', zIndex: 1000001 }}>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
                  {/* Navigation Buttons */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      goToPrevPage()
                    }}
                    disabled={pageNumber <= 1 || numPages === 0}
                    className="px-3 py-2.5 sm:px-4 sm:py-2.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base min-w-[70px] sm:min-w-[80px] justify-center touch-manipulation"
                    style={{ position: 'relative', zIndex: 1000002, pointerEvents: 'auto' }}
                    title="Previous Page"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Prev</span>
                  </button>

                  {/* Page Number Display */}
                  <div className="px-4 py-2 sm:px-6 sm:py-2 bg-white rounded-lg border-2 border-blue-500 shadow-md" style={{ position: 'relative', zIndex: 1000002 }}>
                    <span className="text-gray-700 font-bold text-sm sm:text-base md:text-lg whitespace-nowrap">
                      <span className="text-blue-600">{pageNumber}</span> / <span className="text-blue-600">{numPages || '--'}</span>
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      if (pageNumber < numPages && numPages > 0) {
                        goToNextPage()
                      }
                    }}
                    disabled={pageNumber >= numPages || numPages === 0}
                    className="px-3 py-2.5 sm:px-4 sm:py-2.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base min-w-[70px] sm:min-w-[80px] justify-center touch-manipulation"
                    style={{ position: 'relative', zIndex: 1000002, pointerEvents: 'auto' }}
                    title="Next Page"
                  >
                    <span>Next</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button Section */}
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/materials/advanced-operations"
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Advanced Operations</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default BrakePowerCertificate
