import React from 'react'
import Image from 'next/image'

const CrashCourse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Image Gallery Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">📸 Image Gallery</h2>
            <p className="text-gray-600">Course highlights and materials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Original Image */}
            <div className="relative group">
              <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src="/images/logo-in-crash.jpg"
                  alt="AOM Crash Course - Original"
                  width={400}
                  height={500}
                  className="rounded-xl w-full h-auto"
                />
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-gray-700">Course Overview</p>
                </div>
              </div>
            </div>

            {/* New Image */}
            <div className="relative group">
              <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src="/images/logo-in-crash-2.jpg"
                  alt="AOM Crash Course - Details"
                  width={400}
                  height={500}
                  className="rounded-xl w-full h-auto"
                />
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-gray-700">Course Details</p>
                </div>
              </div>
            </div>

            {/* Placeholder for future images */}
            
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-2 items-center">
          {/* Content Section - Left Side */}
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <div className="flex flex-col items-center gap-3 mb-4">
                <span className="lg:text-5xl text-3xl mb-2">🎯</span>
                <h1 className="lg:text-5xl text-3xl font-bold text-gray-800">
                  AOM CRASH COURSE
                </h1>
              </div>
              <p className="lg:text-xl text-lg text-gray-600 mb-8">
                🚉 Your Fast Track to Success in AOM LDCE Exam! 🚉
              </p>
            </div>

            {/* Course Details */}
            <div className="space-y-6">
              {/* Start Date */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                <div className="flex items-center space-x-3">
                  <span className="lg:text-2xl text-xl">👆</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800">STARTS FROM</h3>
                    <p className="lg:text-2xl text-xl font-bold text-green-600">31/10/2025</p>
                    <p className="text-sm text-gray-500">📅 Mark your Calendar! ⏰</p>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-center space-x-3">
                  <span className="lg:text-2xl text-xl">🤝</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800">DURATION</h3>
                    <p className="lg:text-2xl text-xl font-bold text-blue-600">60 DAYS</p>
                    <p className="text-sm text-gray-500">📖 A complete learning journey—Structured, Focused & Powerful!</p>
                  </div>
                </div>
              </div>

              {/* Course Includes */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                <div className="flex items-start space-x-3">
                  <span className="lg:text-2xl text-xl">📚</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800 mb-3">COURSE INCLUDES</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center space-x-2">
                        <span>🧠</span>
                        <span>THEORY CLASSES</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span>🤔</span>
                        <span>TOPIC-WISE DOUBT SESSIONS</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span>📝</span>
                        <span>MCQ PRACTICE</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span>🎯</span>
                        <span>6 MOCK TESTS (Simulated Real Exam Experience)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Time */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                <div className="flex items-center space-x-3">
                  <span className="lg:text-2xl text-xl">🕘</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800">TIME</h3>
                    <p className="lg:text-2xl text-xl font-bold text-orange-600">21:30 to 22:30 HOURS</p>
                    <p className="text-sm text-gray-500">🌙 Evening learning, designed for working professionals!</p>
                  </div>
                </div>
              </div>

              {/* Course Fee */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
                <div className="flex items-center space-x-3">
                  <span className="lg:text-2xl text-xl">💰</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800">COURSE FEE</h3>
                    <p className="lg:text-3xl text-2xl font-bold text-red-600">₹ 3,000/-</p>
                    <p className="text-sm text-gray-500">(Your investment in career growth!)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Academy Info */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
              <div className="text-center">
                <h3 className="lg:text-xl text-lg font-bold mb-2">🎓 Conducted by</h3>
                <h2 className="lg:text-2xl text-xl font-bold mb-2">GROUP B OFFICERS ACADEMY</h2>
                <p className="text-lg mb-4">💬 ASPIRE • LEARN • LEAD</p>
                
                <div className="bg-gray-800 bg-opacity-20 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-3">
                    <span className="lg:text-2xl text-xl">📱</span>
                    <div>
                      <p className="font-semibold text-green-600">
                        WhatsApp:
                        <span className="inline-block align-middle mr-1" aria-label="WhatsApp icon" title="WhatsApp">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="inline text-green-500" viewBox="0 0 32 32">
                            <path d="M16.023 2.003a13.98 13.98 0 0 0-12.004 21.3L2.01 29.99l6.795-1.997A13.977 13.977 0 1 0 16.024 2.003zm6.635 20.082c-.28.786-1.62 1.541-2.228 1.641-.589.094-1.308.134-2.115-.135-.483-.158-1.096-.356-1.892-.697-3.333-1.436-5.509-4.784-5.677-5.006-.164-.224-1.36-1.81-1.36-3.453 0-1.642.862-2.453 1.167-2.786.304-.334.663-.418.884-.418.227 0 .442.002.632.011.203.009.475-.079.747.57.28.668.954 2.316 1.038 2.484.083.168.137.37.016.595-.121.224-.181.362-.358.562-.173.194-.364.432-.521.58-.173.163-.354.341-.157.672.197.329.878 1.45 1.88 2.348 1.296 1.147 2.39 1.479 2.72 1.646.336.168.534.14.731-.08.198-.22.84-.936 1.066-1.257.224-.319.456-.261.764-.157.304.104 1.924.908 2.256 1.071.334.16.556.238.638.376.086.139.086.813-.195 1.599z"/>
                          </svg>
                        </span>
                        <span className="text-green-600">9701758170</span>
                      </p>
                      <p className="text-sm opacity-90 text-gray-500"> No phone calls please — WhatsApp only!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section - Right Side */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-2xl">
                <Image
                  src="/images/logo-in-crash.jpg"
                  alt="AOM Crash Course"
                  width={500}
                  height={600}
                  className="rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrashCourse