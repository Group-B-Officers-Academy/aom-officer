'use client'

import React from 'react'
import Link from 'next/link'
import FogSignals from '@/components/mcq-practice/FogSignals'

const FogSignalsQuizPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-cyan-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white shadow-md">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-cyan-600 to-blue-600 opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                href="/mcq-practice"
                className="mr-6 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Back to practice quizzes"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center">
                  <span className="inline-flex p-3 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 text-white mr-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </span>
                  Fog Signals Quiz
                </h1>
                <p className="text-lg text-gray-600 ml-20">
                  Master fog signal procedures and safety protocols
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FogSignals />
      </div>
    </div>
  )
}

export default FogSignalsQuizPage

