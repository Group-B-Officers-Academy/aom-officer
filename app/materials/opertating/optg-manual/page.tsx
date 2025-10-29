'use client'
import React from 'react'

const OperatingManual = () => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/materials/Operating Manual SCR 2023.pdf'
    link.download = 'Operating Manual SCR 2023.pdf'
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
                Operating Materials
              </span>
            </div>
            <h1 className="lg:text-5xl text-3xl md:text-4xl font-black mb-6 leading-tight bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600">
              Operating Manual
            </h1>
            <p className="lg:text-xl text-base md:text-lg text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
              Comprehensive guide for railway operations, procedures, and best practices for efficient and safe railway management
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
                    <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-30"></div>
                    <div className="relative bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-xl">
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-4xl">📖</span>
                        <div className="text-left">
                          <h2 className="text-white font-bold text-xl md:text-2xl mb-1">Operating Manual</h2>
                          <p className="text-blue-100 text-sm md:text-base">SCR 2023 Edition</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                  The Operating Manual is a vital resource document that provides detailed instructions, procedures, and guidelines 
                  for railway operations. It covers operational standards, maintenance protocols, safety procedures, and best practices 
                  essential for efficient railway system management and compliance with regulatory requirements.
                </p>
              </div>

              {/* Key Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <div className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-200 transform hover:-translate-y-2">
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-cyan-500 rounded-xl blur-md opacity-50"></div>
                        <div className="relative w-16 h-16 bg-linear-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                          <span className="text-3xl">📘</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Operating Procedures</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Step-by-step procedures for day-to-day railway operations and management
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-purple-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-indigo-100 hover:border-indigo-200 transform hover:-translate-y-2">
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-linear-to-br from-indigo-400 to-purple-500 rounded-xl blur-md opacity-50"></div>
                        <div className="relative w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                          <span className="text-3xl">🔧</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Maintenance Guidelines</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Detailed maintenance schedules and procedures for railway infrastructure
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
                          <span className="text-3xl">⚡</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Best Practices</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        Industry best practices and recommendations for optimal railway operations
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
                          <h4 className="font-bold text-gray-900 mb-1">Operational Standards</h4>
                          <p className="text-gray-600 text-sm">Standard operating procedures and protocols</p>
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
                          <h4 className="font-bold text-gray-900 mb-1">Safety Protocols</h4>
                          <p className="text-gray-600 text-sm">Comprehensive safety measures and emergency procedures</p>
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
                          <h4 className="font-bold text-gray-900 mb-1">System Management</h4>
                          <p className="text-gray-600 text-sm">Guidelines for efficient railway system management</p>
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
                          <h4 className="font-bold text-gray-900 mb-1">Compliance Guidelines</h4>
                          <p className="text-gray-600 text-sm">Regulatory compliance and quality assurance standards</p>
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
                    Download the complete Operating Manual SCR 2023 document with all operational procedures and guidelines
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
                    📄 Operating Manual SCR 2023.pdf
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
                        This Operating Manual is a critical reference document for all railway operational personnel. 
                        It provides essential guidance for daily operations, maintenance activities, and compliance with 
                        operational standards. Ensure you refer to the latest version and keep it updated with any 
                        revisions or amendments issued by the railway administration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OperatingManual