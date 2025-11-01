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
  scale: number
  onDocumentLoadSuccess: (data: { numPages: number }) => void
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pageNumber, scale, onDocumentLoadSuccess }) => {
  const isClient = typeof window !== 'undefined'
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure client-side setup
    if (typeof window !== 'undefined') {
      // Set worker source again in useEffect to ensure it's set
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
      
      // Set page width for mobile
      const updateWidth = () => {
        if (window.innerWidth < 640) {
          setPageWidth(window.innerWidth - 40)
        } else {
          setPageWidth(undefined)
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

      // Add event listeners
      document.addEventListener('contextmenu', handleContextMenu)
      document.addEventListener('copy', handleCopy, true)
      document.addEventListener('cut', handleCut, true)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('selectstart', handleSelectStart, true)
      document.addEventListener('dragstart', handleDragStart, true)

      // Cleanup
      return () => {
        window.removeEventListener('resize', updateWidth)
        document.removeEventListener('contextmenu', handleContextMenu)
        document.removeEventListener('copy', handleCopy, true)
        document.removeEventListener('cut', handleCut, true)
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('selectstart', handleSelectStart, true)
        document.removeEventListener('dragstart', handleDragStart, true)
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
          }
          .pdf-viewer-container ::selection,
          .pdf-viewer-container *::selection {
            background: transparent !important;
          }
          .pdf-viewer-container ::-moz-selection,
          .pdf-viewer-container *::-moz-selection {
            background: transparent !important;
          }
        `
      }} />
      <div 
        ref={containerRef}
        className="pdf-viewer-container"
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          pointerEvents: 'auto',
        }}
        onContextMenu={(e) => e.preventDefault()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <Document
          file="/materials/DARULESACT1968.pdf"
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
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={true}
            className="shadow-lg max-w-full"
            width={pageWidth}
          />
        </Document>
      </div>
    </>
  )
}

export default PDFViewer

