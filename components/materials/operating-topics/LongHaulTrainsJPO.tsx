import React from 'react'
import Link from 'next/link'

const LongHaulTrainsJPO = () => {
  return (
    <Link href="/materials/opertating/long-haul-trains-jpo" className="block">
      <div className="group relative bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-indigo-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-3xl">🚆</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              Long Haul Trains JPO
            </h3>
            <p className="text-gray-600 text-sm">
              Comprehensive guide for Long Haul Trains Joint Procedure Orders and operational protocols
            </p>
          </div>
          <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default LongHaulTrainsJPO