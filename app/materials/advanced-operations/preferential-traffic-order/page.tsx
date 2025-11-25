'use client'
import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Dynamically import react-pdf with SSR disabled
const PDFViewer = dynamic(
  () => import('./PDFViewer').then((mod) => ({ default: mod.default })),
  { ssr: false, loading: () => <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[600px] w-full"><div className="text-center"><div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div><p className="text-gray-600 text-sm sm:text-base">Loading PDF...</p></div></div> }
)

const PreferentialTrafficOrder = () => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.5)
  const [isProtected, setIsProtected] = useState<boolean>(false)
  const contentRef = useRef<HTMLDivElement>(null)

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

  // Screenshot and screen capture protection
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

    // Detect visibility changes (tab switching, app switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsProtected(true)
      } else {
        setTimeout(() => setIsProtected(false), 500)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Detect blur events (window losing focus)
    const handleBlur = () => {
      setIsProtected(true)
    }
    const handleFocus = () => {
      setTimeout(() => setIsProtected(false), 500)
    }
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)

    // Detect Print Screen key
    const handleKeyDown = (e: KeyboardEvent) => {
      // Print Screen key (keyCode 44 or key === 'PrintScreen')
      if (e.key === 'PrintScreen' || (e.ctrlKey && e.shiftKey && e.key === 'S')) {
        e.preventDefault()
        setIsProtected(true)
        setTimeout(() => setIsProtected(false), 1000)
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
        return false
      }
    }
    document.addEventListener('keydown', handleDevTools)

    // CSS to prevent screenshots (limited browser support)
    const style = document.createElement('style')
    style.textContent = `
      .protected-content {
        -webkit-touch-callout: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      .protected-content::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        z-index: 999999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s;
      }
      .protected-content.protected::before {
        opacity: 1;
      }
      @media print {
        .protected-content {
          display: none !important;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      if (mediaQuery && handleMediaChange) {
        mediaQuery.removeEventListener('change', handleMediaChange)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keydown', handleDevTools)
      document.head.removeChild(style)
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
      {/* Watermark Overlay for Screenshot Protection */}
      {!isProtected && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 999997,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(0,0,0,0.02) 100px, rgba(0,0,0,0.02) 200px)',
            mixBlendMode: 'multiply',
          }}
          aria-hidden="true"
        />
      )}
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
              Preferential Traffic Order
            </h1>
            <p className="lg:text-xl text-base md:text-lg text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
              Comprehensive guide for preferential traffic order systems, operational protocols, and procedures for railway traffic management
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
                  Browse through the Preferential Traffic Order page by page. Use controls below to navigate.
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
              <div className="bg-gray-50 rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-200">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
                  {/* Navigation Buttons */}
                  <button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    className="px-3 py-2.5 sm:px-4 sm:py-2.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base min-w-[70px] sm:min-w-[80px] justify-center touch-manipulation"
                    title="Previous Page"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Prev</span>
                  </button>

                  {/* Page Number Display */}
                  <div className="px-4 py-2 sm:px-6 sm:py-2 bg-white rounded-lg border-2 border-blue-500 shadow-md">
                    <span className="text-gray-700 font-bold text-sm sm:text-base md:text-lg whitespace-nowrap">
                      <span className="text-blue-600">{pageNumber}</span> / <span className="text-blue-600">{numPages || '--'}</span>
                    </span>
                  </div>

                  <button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    className="px-3 py-2.5 sm:px-4 sm:py-2.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base min-w-[70px] sm:min-w-[80px] justify-center touch-manipulation"
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

export default PreferentialTrafficOrder