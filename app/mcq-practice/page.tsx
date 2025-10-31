'use client'

import React from 'react'
import Link from 'next/link'

const MCQPractice = () => {
  const topics = [
    {
      id: 'kavach',
      title: 'Kavach',
      description: 'Train Collision Avoidance System - Master the KAVACH system with comprehensive practice questions',
      href: '/mcq-practice/kavach',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'fog-signals',
      title: 'Fog Signals',
      description: 'Learn about fog signal procedures, detonators, and safety protocols during low visibility conditions',
      href: '/mcq-practice/fog-signals',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    },
    {
      id: 'operating-manual',
      title: 'Operating Manual',
      description: 'General Rules and Operating Procedures - Test your knowledge of railway operating guidelines',
      href: '/mcq-practice/operating-manual',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200'
    }
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">  
          <div className="text-center">
            <h1 className="text-2xl lg:text-6xl font-bold text-gray-900 mb-4">
              Practice Quizzes with{' '}
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Topic-wise
              </span>
            </h1>
            <p className="text-base lg:text-2xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Enhance your knowledge with comprehensive MCQ practice tests covering essential railway topics
            </p>
          </div>
        </div>
      </div>

      {/* Topic Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <Link
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
                  <span className={`${topic.textColor}`}>Start Practice</span>
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MCQPractice