'use client'
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import react-pdf with SSR disabled
const PDFViewer = dynamic(
  () => import('./PDFViewer').then((mod) => ({ default: mod.default })),
  { ssr: false, loading: () => <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[600px] w-full"><div className="text-center"><div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div><p className="text-gray-600 text-sm sm:text-base">Loading PDF...</p></div></div> }
)

const Kavach = () => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.5)

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

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages))
  }
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/materials/Kavach.pdf'
    link.download = 'Kavach.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
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
                Manuals
              </span>
            </div>
            <h1 className="lg:text-5xl text-3xl md:text-4xl font-black mb-6 leading-tight bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
              Kavach Manual
            </h1>
            <p className="lg:text-xl text-base md:text-lg text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
              Comprehensive safety and security manual for railway operations and personnel protection
            </p>
          </div>

          {/* Main Content Card */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100/50 mb-12 animate-fade-in-up">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-3xl"></div>
            
            <div className="relative space-y-8">
              {/* Introduction */}
              <div className="text-center">
                <div className="inline-block mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-purple-500 rounded-2xl blur-xl opacity-30"></div>
                    <div className="relative bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-4xl">🛡️</span>
                        <div className="text-left">
                          <h2 className="text-white font-bold text-xl md:text-2xl mb-1">Kavach Manual</h2>
                          <p className="text-indigo-100 text-sm md:text-base">Safety & Security Protocols</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                  The Kavach Manual is a comprehensive safety and security document designed to ensure the protection 
                  of railway personnel and operations. It contains essential protocols, safety measures, and security 
                  guidelines that are crucial for maintaining a secure railway environment.
                </p>
              </div>

              {/* Key Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <div className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-indigo-100 hover:border-indigo-200 transform hover:-translate-y-2">
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-linear-to-br from-indigo-400 to-purple-500 rounded-xl blur-md opacity-50"></div>
                        <div className="relative w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                          <span className="text-3xl">🛡️</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Security Protocols</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Comprehensive security measures and protection guidelines for railway operations
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-200 transform hover:-translate-y-2">
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-cyan-500 rounded-xl blur-md opacity-50"></div>
                        <div className="relative w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                          <span className="text-3xl">⚡</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Safety Measures</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Essential safety procedures and emergency response guidelines
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-purple-100 hover:border-purple-200 transform hover:-translate-y-2">
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-pink-500 rounded-xl blur-md opacity-50"></div>
                        <div className="relative w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                          <span className="text-3xl">📋</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Operational Guidelines</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Detailed procedures for safe and secure railway operations
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Sections */}
              <div className="mt-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                  Key Sections Covered
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-teal-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100 hover:border-emerald-200 transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Security Framework</h4>
                          <p className="text-gray-600 text-sm">Comprehensive security protocols and protection measures</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-cyan-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100 hover:border-blue-200 transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Emergency Procedures</h4>
                          <p className="text-gray-600 text-sm">Essential emergency response and crisis management guidelines</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-indigo-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative bg-linear-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100 hover:border-purple-200 transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Personnel Safety</h4>
                          <p className="text-gray-600 text-sm">Guidelines for protecting railway personnel and staff</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-amber-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <div className="relative bg-linear-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100 hover:border-orange-200 transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">✓</span>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Compliance Requirements</h4>
                          <p className="text-gray-600 text-sm">Mandatory adherence to safety and security standards</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Ready to Access the Document?
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    Download the complete Kavach Manual document with all safety and security protocols
                  </p>
                  <div className="flex justify-center">
                    <button
                      onClick={handleDownload}
                      className="group relative bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-5 px-10 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-blue-500/50 flex items-center justify-center space-x-3 text-lg"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <svg
                        className="w-7 h-7 relative z-10 group-hover:animate-bounce"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="relative z-10">Download PDF</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4">
                    📄 Kavach.pdf
                  </p>
                </div>
              </div>

              {/* Information Box */}
              <div className="mt-10 relative">
                <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl blur-xl opacity-20"></div>
                <div className="relative bg-linear-to-r from-yellow-50 via-orange-50 to-pink-50 rounded-2xl p-6 border border-yellow-200/50">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">💡</span>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 text-lg">Important Note</h4>
                      <p className="text-gray-700 leading-relaxed">
                        This Kavach Manual is essential reading for all railway personnel involved in operations and security. 
                        Ensure you familiarize yourself with all safety protocols and security measures outlined in the document. 
                        Regular updates and revisions are published to keep the manual current with evolving safety and security requirements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PDF Single Page Viewer Section - Placed at Bottom */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl p-3 sm:p-4 md:p-8 lg:p-12 border border-gray-100/50 mt-8 sm:mt-12 animate-fade-in-up">
            <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl md:rounded-3xl"></div>
            
            <div className="relative">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 px-2">
                  Read the Document
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
                  Browse through the Kavach Manual page by page. Use controls below to navigate.
                </p>
              </div>
              
              {/* PDF Display */}
              <div className="relative bg-gray-100 rounded-xl md:rounded-2xl p-2 sm:p-4 md:p-6 lg:p-8 shadow-xl mb-4 md:mb-6">
                <div className="bg-white rounded-lg p-2 sm:p-4 md:p-6 flex justify-center items-start overflow-auto -mx-2 sm:mx-0">
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
        </div>
      </section>
    </div>
  )
}

export default Kavach