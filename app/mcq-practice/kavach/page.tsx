'use client'

import React from 'react'
import Link from 'next/link'
import Kavach from '@/components/mcq-practice/Kavach'

const KavachQuizPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white shadow-md">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-5"></div>
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
                  <span className="inline-flex p-3 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white mr-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  Kavach Quiz
                </h1>
                <p className="text-lg text-gray-600 ml-20">
                  Test your knowledge of the KAVACH Train Collision Avoidance System
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Kavach />
      </div>
    </div>
  )
}

export default KavachQuizPage

