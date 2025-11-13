'use client'

import React from 'react'
import Image from 'next/image'

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
  ]

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Image and Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8 md:mb-12">
            {/* Left Side - Image */}
            <div className="relative w-full flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 bg-gray-100">
              <Image
                src="/images/advanced-operations.jpg"
                alt="Advanced Operations"
                width={800}
                height={600}
                className="object-contain w-full h-auto rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10 pointer-events-none"></div>
            </div>

            {/* Right Side - Content */}
            <div className="bg-linear-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl border-2 border-blue-200/50">
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b-2 border-blue-300 pb-4">
                  <h2 className="text-xl text-center lg:text-2xl font-bold text-gray-900 mb-2 flex flex-col items-center gap-2">
                    <span className="text-2xl lg:text-3xl">📌</span>
                    <span>HIGHER TRANSPORTATION (ADVANCED OPERATIONS)</span>
                  </h2>
                </div>

                {/* Attention Box */}
                <div className="bg-linear-to-r from-yellow-400 via-yellow-300 to-yellow-400 rounded-xl p-4 md:p-5 border-2 border-yellow-500 shadow-lg">
                  <p className="text-lg md:text-xl font-bold text-gray-900 text-center">
                    🌟 ATTENTION AOM ASPIRANTS 🌟
                  </p>
                  <p className="text-base md:text-lg text-gray-800 mt-3 text-center font-semibold">
                    If you are seriously preparing for AOM LDCE, this is the <span className="text-red-600 underline">MOST IMPORTANT</span> subject you can&apos;t afford to ignore.
                  </p>
                </div>

                {/* Core Information */}
                <div className="bg-white rounded-xl p-5 md:p-6 border-l-4 border-blue-600 shadow-md">
                  <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                    Higher Transportation (Advanced Operations) forms the <span className="font-bold text-blue-700">CORE</span> of both MCQs and Viva-Voce, and almost every practical question asked in the interview is drawn from this topic.
                  </p>
                </div>

                {/* Why Important Section */}
                <div className="bg-linear-to-r from-blue-100 to-purple-100 rounded-xl p-5 md:p-6 border-2 border-blue-300">
                  <h3 className="text-xl text-center lg:text-2xl font-bold text-gray-900 mb-4 flex flex-col items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    <span>Why This Course Is Extremely Important for AOM Viva-Voce?</span>
                  </h3>
                  <p className="text-base md:text-lg text-gray-800 mb-4">
                    Most AOM viva questions are role-based, practical, and directly related to Higher Transportation concepts.
                  </p>
                  <div className="bg-white rounded-lg p-4 mt-4">
                    <p className="font-semibold text-gray-900 mb-3 text-lg">🔥 Frequently Asked in Viva-Voce:</p>
                    <ul className="space-y-2 text-gray-800">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold mt-1">⿡</span>
                        <span>As an AOM, how will you increase the Average Goods Speed?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold mt-1">⿢</span>
                        <span>How will you increase the Throughput of your Division?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold mt-1">⿣</span>
                        <span>What is a Critical Block Section and how does it affect line capacity?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold mt-1">⿤</span>
                        <span>What is a Ruling Gradient and why is it operationally important?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold mt-1">⿥</span>
                        <span>As an AOM (Goods), what measures will you take to increase Loading?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold mt-1">⿦</span>
                        <span>As an AOM (Coaching), what operational factors must you consider before preparing a Time Table?</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* What You Will Gain */}
                <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-5 md:p-6 border-2 border-green-300">
                  <h3 className="text-xl text-center lg:text-2xl font-bold text-gray-900 mb-4 flex flex-col items-center gap-2">
                    <span className="text-2xl">📚</span>
                    <span>What You Will Gain From This Course</span>
                  </h3>
                  <ul className="space-y-2 text-gray-800">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold text-lg">✔</span>
                      <span className="text-base md:text-lg">Complete conceptual clarity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold text-lg">✔</span>
                      <span className="text-base md:text-lg">Practical, role-based understanding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold text-lg">✔</span>
                      <span className="text-base md:text-lg">Real railway case studies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold text-lg">✔</span>
                      <span className="text-base md:text-lg">How to answer viva questions confidently</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold text-lg">✔</span>
                      <span className="text-base md:text-lg">How to link theory with field operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold text-lg">✔</span>
                      <span className="text-base md:text-lg">Techniques to think like an AOM during interviews</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-base md:text-lg text-gray-800 italic bg-white rounded-lg p-3 border-l-4 border-green-500">
                    This course transforms you from knowing the rule → understanding the logic → answering like an officer.
                  </p>
                </div>

                {/* Call to Action */}
                <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-5 md:p-6 text-white shadow-xl">
                  <p className="text-base md:text-lg font-semibold mb-3">
                    🚀 If you want confident, structured, and impactful answers in the AOM Viva-Voce — this course is absolutely essential.
                  </p>
                  <p className="text-sm md:text-base opacity-95">
                    Every topic is covered deeply, logically, and exam-oriented.
                  </p>
                </div>

                {/* Hurry Up Section */}
                <div className="bg-linear-to-r from-red-500 to-orange-500 rounded-xl p-5 md:p-6 text-white shadow-xl text-center">
                  <p className="text-xl md:text-2xl font-bold mb-2">🕒 HURRY UP! JOIN TODAY</p>
                  <p className="text-base md:text-lg font-semibold">
                    Seats are limited — and Higher Transportation is the key to clearing AOM LDCE with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>

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
