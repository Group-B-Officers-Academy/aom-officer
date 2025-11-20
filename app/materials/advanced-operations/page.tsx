'use client'

import React from 'react'

const AdvancedOperations = () => {
  const topics = [
    {
      id: 'control-organisation',
      title: 'Control Organisation',
      description: 'Comprehensive guide for control organisation systems, operational protocols, and procedures for railway control management',
      href: '/materials/advanced-operations/control-organisation',
      icon: (
        <svg className="lg:w-12 lg:h-12 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    },
    {
      id: 'preferential-traffic-order',
      title: 'Preferential Traffic Order',
      description: 'Comprehensive guide for preferential traffic order systems, operational protocols, and procedures for railway traffic management',
      href: '/materials/advanced-operations/preferential-traffic-order',
      icon: (
        <svg className="lg:w-12 lg:h-12 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200'
    },
    {
      id: 'crew-power-rake-link',
      title: 'Crew Power Rake Link',
      description: 'Comprehensive guide for crew power rake link systems, operational protocols, and procedures for railway crew management',
      href: '/materials/advanced-operations/crew-power-rake-link',
      icon: (
        <svg className="lg:w-12 lg:h-12 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      borderColor: 'border-green-200'
    },
    {
      id: 'marshalling',
      title: 'Marshalling',
      description: 'Comprehensive guide for marshalling systems, operational protocols, and procedures for railway marshalling operations',
      href: '/materials/advanced-operations/marshalling',
      icon: (
        <svg className="lg:w-12 lg:h-12 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200'
    },
    {
      id: 'operating-statistics',
      title: 'Operating Statistics',
      description: 'Comprehensive guide for operating statistics systems, data analysis protocols, and procedures for railway operational statistics',
      href: '/materials/advanced-operations/operating-statistics',
      icon: (
        <svg className="lg:w-12 lg:h-12 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-200'
    },
    {
      id: 'line-capacity-throughput',
      title: 'Line Capacity Throughput',
      description: 'Comprehensive guide for line capacity throughput systems, operational protocols, and procedures for railway line capacity management',
      href: '/materials/advanced-operations/line-capacity-throughput',
      icon: (
        <svg className="lg:w-12 lg:h-12 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'wagon-turn-round',
      title: 'Wagon Turn Round',
      description: 'Comprehensive guide for wagon turn round systems, operational protocols, and procedures for railway wagon management',
      href: '/materials/advanced-operations/wagon-turn-round',
      icon: (
        <svg className="lg:w-12 lg:h-12 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700',
      borderColor: 'border-teal-200'
    },
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl lg:text-6xl font-bold text-gray-900 mb-4">
              Advanced Operations{' '}
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Materials
              </span>
            </h1>
            <p className="text-base lg:text-2xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Access comprehensive advanced operations manuals covering essential railway procedures, control systems, and operational protocols
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

export default AdvancedOperations
