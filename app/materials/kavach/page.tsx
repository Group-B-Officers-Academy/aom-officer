'use client'

import React from 'react'

const Kavach = () => {
  const topics = [
    {
      id: 'kavach-manual',
      title: 'Kavach Railway Board Manual',
      description: 'Comprehensive safety and security manual for railway operations and personnel protection',
      href: '/materials/kavach/kavach-manual',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    },
    {
      id: 'kavach-material',
      title: 'Kavach Material',
      description: 'Comprehensive Kavach training and operational materials for railway safety systems and procedures',
      href: '/materials/kavach/kavach-material',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200'
    },
    {
      id: 'kavach-summary',
      title: 'Kavach Summary',
      description: 'Comprehensive summary of Kavach railway safety systems, protocols, and operational guidelines',
      href: '/materials/kavach/kavach-summary',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-200'
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">  
          <div className="text-center">
            <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-4">
              Kavach{' '}
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Materials
              </span>
            </h1>
            <p className="text-base lg:text-2xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Access comprehensive Kavach manuals covering essential railway safety procedures, systems, and operational protocols
            </p>
          </div>
        </div>
      </div>

      {/* Topic Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <a
              key={topic.id}
              href={topic.href}
              className={`group relative ${topic.bgColor} rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 ${topic.borderColor} hover:border-opacity-50 overflow-hidden block`}
            >
              {/* Gradient Overlay on Hover */}
              <div className={`absolute inset-0 bg-linear-to-br ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative p-8">
                {/* Icon */}
                <div className={`inline-flex lg:p-4 p-2 rounded-lg bg-linear-to-br ${topic.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {topic.icon}
                </div>
                
                {/* Title */}
                <h2 className={`text-2xl font-bold ${topic.textColor} mb-3 group-hover:scale-105 transition-transform duration-300`}>
                  {topic.title}
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {topic.description}
                </p>
                
                {/* CTA Button */}
                <div className="flex items-center text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                  <span className={`${topic.textColor}`}>View Materials</span>
                  <svg 
                    className={`w-5 h-5 ml-2 ${topic.textColor} group-hover:translate-x-1 transition-transform duration-300`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${topic.color} opacity-5 rounded-bl-full`}></div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Kavach
