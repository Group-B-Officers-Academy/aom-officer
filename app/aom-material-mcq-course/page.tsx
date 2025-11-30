import React from 'react'
import Image from 'next/image'

const AOMMaterialMCQCourse = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Image Gallery Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">📸 Image Gallery</h2>
            <p className="text-gray-600">Course highlights and materials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Image 1 */}
            <div className="relative group">
              <div className="absolute w-full h-full top-0 left-0 bg-linear-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src="/images/aom-course-1.jpg"
                  alt="AOM Material MCQ Course - Overview"
                  width={400}
                  height={500}
                  className="rounded-xl w-full h-auto"
                />
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-gray-700">Course Overview</p>
                </div>
              </div>
            </div>

            {/* Image 2 */}
            <div className="relative group">
              <div className="absolute w-full h-full top-0 left-0 bg-linear-to-r from-green-400 to-blue-500 rounded-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src="/images/aom-course-2.jpg"
                  alt="AOM Material MCQ Course - Details"
                  width={400}
                  height={500}
                  className="rounded-xl w-full h-auto"
                />
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-gray-700">Course Details</p>
                </div>
              </div>
            </div>

            {/* Image 3 */}
            <div className="relative group md:col-span-2 lg:col-span-1">
              <div className="absolute w-full h-full top-0 left-0 bg-linear-to-r from-orange-400 to-pink-500 rounded-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-2xl p-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src="/images/aom-course-3.jpg"
                  alt="AOM Material MCQ Course - Features"
                  width={400}
                  height={500}
                  className="rounded-xl w-full h-auto"
                />
                <div className="mt-3 text-center">
                  <p className="text-sm font-semibold text-gray-700">Course Features</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Content Section - Left Side */}
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <div className="flex flex-col items-center gap-3 mb-4">
                <span className="lg:text-5xl text-3xl mb-2">🎯</span>
                <h1 className="lg:text-5xl text-3xl font-bold text-gray-800">
                  AOM – 40 DAYS
                </h1>
              </div>
              <p className="lg:text-xl text-lg text-gray-600 mb-8">
                MATERIAL cum MCQ PRACTICE COURSE
              </p>
            </div>

            {/* Course Details */}
            <div className="space-y-6">
              {/* Daily Learning Plan */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                <div className="flex items-start space-x-3">
                  <span className="lg:text-2xl text-xl">⏰</span>
                  <div className="flex-1">
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800 mb-3">DAILY LEARNING PLAN</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-lg">👉</span>
                        <span><strong className="text-gray-800">High-Quality AOM Material</strong> (Sir-prepared material with latest updates) will be provided one day before the class in PDF format, personally shared to you.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-lg">📘</span>
                        <span><strong className="text-gray-800">Topic-wise MCQs Practice</strong> will be conducted on the next day on the same topic, with complete doubt clarification.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-lg">🕒</span>
                        <span><strong className="text-gray-800">Every Day – 1 Hour Class</strong> exclusively for Previous Year MCQs Practice.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-lg">🧠</span>
                        <span><strong className="text-gray-800">Detailed Explanations</strong> for each MCQ to ensure complete conceptual clarity.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-lg">❓</span>
                        <span><strong className="text-gray-800">Daily Doubt Clarification</strong> to strengthen your understanding and accuracy.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* What You Will Get */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                <div className="flex items-start space-x-3">
                  <span className="lg:text-2xl text-xl">📝</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800 mb-3">WHAT YOU WILL GET</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center space-x-2">
                        <span>👉</span>
                        <span>Practice of Previous Year AOM Question Papers</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span>👉</span>
                        <span>Concept Strengthening through systematic daily drills</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Course Duration */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                <div className="flex items-center space-x-3">
                  <span className="lg:text-2xl text-xl">📅</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800">COURSE DURATION</h3>
                    <p className="lg:text-2xl text-xl font-bold text-purple-600">1st December – 10th January</p>
                    <p className="text-lg font-semibold text-purple-600">(40 Days)</p>
                  </div>
                </div>
              </div>

              {/* Class Timings */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                <div className="flex items-start space-x-3">
                  <span className="lg:text-2xl text-xl">⏰</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800 mb-3">CLASS TIMINGS – TWO SLOTS</h3>
                    <div className="space-y-2 text-gray-600 mb-3">
                      <p className="flex items-center space-x-2">
                        <span className="text-xl">🕔</span>
                        <span className="lg:text-xl text-lg font-bold text-orange-600">05:00 to 06:00 Hours</span>
                      </p>
                      <p className="text-center text-gray-500 font-semibold">or</p>
                      <p className="flex items-center space-x-2">
                        <span className="text-xl">🌙</span>
                        <span className="lg:text-xl text-lg font-bold text-orange-600">22:00 to 23:00 Hours</span>
                      </p>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 mt-4">
                      <li className="flex items-start space-x-2">
                        <span>👉</span>
                        <span>Attend ANY ONE SLOT as per your convenience</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span>👉</span>
                        <span>Same topic covered in both slots</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span>👉</span>
                        <span>Specially designed considering Roster Duties of Operating Staff</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span>👉</span>
                        <span>Whatever your roster—you will never miss a class</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FREE Website Access */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-teal-500">
                <div className="flex items-start space-x-3">
                  <span className="lg:text-2xl text-xl">🌐</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800 mb-3">FREE WEBSITE ACCESS – 24 MONTHS</h3>
                    <p className="text-gray-600 mb-2">Inside the website, you get:</p>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span>Full Material Access</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span>Unlimited MCQ Practice</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Special Note */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
                <div className="flex items-start space-x-3">
                  <span className="lg:text-2xl text-xl">🔥</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800 mb-3">SPECIAL NOTE</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start space-x-2">
                        <span>👉</span>
                        <span>This new course is designed by combining the best content of all other courses</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span>👉</span>
                        <span>This course is fully sufficient for preparation of AOM LDCE 30% Examination</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Free Items */}
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
                <div className="flex items-start space-x-3">
                  <span className="lg:text-2xl text-xl">🎁</span>
                  <div>
                    <h3 className="lg:text-lg text-base font-semibold text-gray-800 mb-3">YOU GET THE FOLLOWING FREE</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span>AOM Material (Sir Prepared)</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span>Advanced Operations Course</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span>Previous Year MCQs Practice</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-green-500">✅</span>
                        <span>AOM Viva Voce Course</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Academy Info */}
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
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

          {/* Right Side - Visual Element */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute w-full h-full top-0 left-0 bg-linear-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-md">
                <div className="text-center space-y-6">
                  <div className="text-6xl mb-4">🎯</div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">AOM 40 DAYS</h2>
                  <p className="text-xl text-gray-600 mb-6">MATERIAL cum MCQ PRACTICE COURSE</p>
                  
                  <div className="space-y-4 text-left">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-800">📚 Daily Material</p>
                      <p className="text-sm text-gray-600">High-quality PDFs shared personally</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-800">📝 MCQ Practice</p>
                      <p className="text-sm text-gray-600">Topic-wise with detailed explanations</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-800">⏰ Flexible Timings</p>
                      <p className="text-sm text-gray-600">Two slots - choose your convenience</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-800">🌐 24 Months Access</p>
                      <p className="text-sm text-gray-600">Free website access included</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Big Update Section */}
        <div className="mt-16 mb-6">
          <div className="bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">  
            <div className="text-center mb-6">
              <div className="lg:text-5xl text-3xl mb-4">🎯</div>
              <h2 className="text-xl md:text-4xl font-bold text-white mb-2">
                BIG UPDATE – COMPLETE AOM SYLLABUS NOW INSIDE ONE COURSE!
              </h2>
            </div>
          </div>
        </div>

        {/* What's New Section */}
        <div className="mb-12">
          <div className="bg-white rounded-xl p-3 shadow-lg border-l-2 border-blue-500">
            <div className="flex items-start space-x-4 mb-6">
              <span className="text-4xl">💡</span>
              <div className="flex-1">
                <h3 className="lg:text-2xl text-base font-bold text-gray-800 mb-4">What&apos;s New?</h3>
                <p className="text-lg text-gray-700 mb-4">
                  By popular demand, MCQ practice has been extended to every single topic in the AOM LDCE 30% syllabus.
                </p>
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
                  <p className="lg:text-xl text-base font-bold text-blue-700 text-center"> 
                    One enrolment = total coverage.
                  </p>
                </div>
              </div>
            </div>

            {/* Full MCQ Line-Up */}
            <div className="mt-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <span>👉</span>
                <span>Full MCQ Line-Up:</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'G&SR',
                  'Unified SRs (USRs)',
                  'Disaster Management',
                  'Accident Manual',
                  'Block Working Manual',
                  'Railway Board JPOs',
                  'Accident Protocol',
                  'Advanced Commercial',
                  'Establishment Rules',
                  'Financial Rules',
                  'Official Language Policy'
                ].map((topic, index) => (
                  <div
                    key={index}
                    className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">📌</span>
                      <span className="font-semibold text-gray-800">{topic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* One Course Total Preparation */}
        <div className="mb-12">
          <div className="bg-linear-to-r from-purple-600 to-pink-600 rounded-xl p-3 shadow-lg border-l-2 border-pink-500 text-gray-800">
            <div className="text-center mb-6">
              <div className="lg:text-5xl text-3xl mb-4">🚀</div>
              <h3 className="lg:text-3xl text-lg font-bold mb-6 text-white">One Course : Total Preparation</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '📌', text: 'Daily MCQs + Detailed Explanations' },
                { icon: '📌', text: 'Latest Sir-prepared PDFs' },
                { icon: '📌', text: '24-month portal access (unlimited practice)' },
                { icon: '📌', text: 'Night slot 22:00–23:00 hrs – perfect for rostered staff' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm border border-white border-opacity-30"
                >
                  <div className="flex items-center space-x-3">
                    <span className="lg:text-2xl text-xl">{item.icon}</span>
                    <span className="lg:text-lg text-base font-semibold">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 inline-block backdrop-blur-sm border border-white border-opacity-30">
                <p className="lg:text-xl text-base font-bold flex items-center justify-center space-x-2">
                  <span>👉</span>
                  <span>LATEST CIRCULARS UPDATE</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Viva-Voce Support */}
        <div className="mb-12">
          <div className="bg-white rounded-xl p-3 shadow-lg border-l-2 border-green-500">
            <div className="flex items-start space-x-4">
              <span className="lg:text-5xl text-3xl">🎤</span>
              <div className="flex-1">
                <h3 className="lg:text-2xl text-base font-bold text-gray-800 mb-4">BONUS – Viva-Voce Support</h3>
                <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <span className="lg:text-3xl text-xl text-green-600">✅</span>
                    <p className="lg:text-lg text-base font-semibold text-gray-800">
                      FREE Mock Interviews with an expert panel once you clear the CBT.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mb-12">
          <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-3 shadow-2xl border-l-2 border-pink-500 text-white">
            <div className="text-center space-y-6">
              <div className="lg:text-5xl text-3xl mb-4">🏛</div>
              <h3 className="lg:text-3xl text-lg font-bold mb-2">Group B Officers Academy</h3>
              
              <div className="bg-white bg-opacity-20 rounded-lg p-3 backdrop-blur-sm border border-white border-opacity-30 max-w-2xl mx-auto text-gray-800">
                <p className="lg:text-lg text-base font-semibold mb-2">WhatsApp (messages only):</p>
                <div className="flex flex-wrap items-center justify-center gap-4 lg:text-xl text-base">
                  <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-green-300" viewBox="0 0 32 32">
                      <path d="M16.023 2.003a13.98 13.98 0 0 0-12.004 21.3L2.01 29.99l6.795-1.997A13.977 13.977 0 1 0 16.024 2.003zm6.635 20.082c-.28.786-1.62 1.541-2.228 1.641-.589.094-1.308.134-2.115-.135-.483-.158-1.096-.356-1.892-.697-3.333-1.436-5.509-4.784-5.677-5.006-.164-.224-1.36-1.81-1.36-3.453 0-1.642.862-2.453 1.167-2.786.304-.334.663-.418.884-.418.227 0 .442.002.632.011.203.009.475-.079.747.57.28.668.954 2.316 1.038 2.484.083.168.137.37.016.595-.121.224-.181.362-.358.562-.173.194-.364.432-.521.58-.173.163-.354.341-.157.672.197.329.878 1.45 1.88 2.348 1.296 1.147 2.39 1.479 2.72 1.646.336.168.534.14.731-.08.198-.22.84-.936 1.066-1.257.224-.319.456-.261.764-.157.304.104 1.924.908 2.256 1.071.334.16.556.238.638.376.086.139.086.813-.195 1.599z"/>
                    </svg>
                    <span className="font-bold">93469 99858</span>
                  </span>
                  <span className="text-white opacity-50">•</span>
                  <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="text-green-300" viewBox="0 0 32 32">
                      <path d="M16.023 2.003a13.98 13.98 0 0 0-12.004 21.3L2.01 29.99l6.795-1.997A13.977 13.977 0 1 0 16.024 2.003zm6.635 20.082c-.28.786-1.62 1.541-2.228 1.641-.589.094-1.308.134-2.115-.135-.483-.158-1.096-.356-1.892-.697-3.333-1.436-5.509-4.784-5.677-5.006-.164-.224-1.36-1.81-1.36-3.453 0-1.642.862-2.453 1.167-2.786.304-.334.663-.418.884-.418.227 0 .442.002.632.011.203.009.475-.079.747.57.28.668.954 2.316 1.038 2.484.083.168.137.37.016.595-.121.224-.181.362-.358.562-.173.194-.364.432-.521.58-.173.163-.354.341-.157.672.197.329.878 1.45 1.88 2.348 1.296 1.147 2.39 1.479 2.72 1.646.336.168.534.14.731-.08.198-.22.84-.936 1.066-1.257.224-.319.456-.261.764-.157.304.104 1.924.908 2.256 1.071.334.16.556.238.638.376.086.139.086.813-.195 1.599z"/>
                    </svg>
                    <span className="font-bold">97017 58170</span>
                  </span>
                </div>
                <p className="lg:text-sm text-xs mt-4 opacity-90">No phone calls please.</p>
              </div>

              <div className="mt-8 bg-white bg-opacity-20 rounded-xl p-3 backdrop-blur-sm border border-white border-opacity-30 max-w-3xl mx-auto text-gray-800">
                <p className="lg:text-2xl text-base font-bold flex flex-wrap items-center justify-center gap-2">
                  <span>Join now</span>
                  <span className="text-3xl">→</span>
                  <span>Master the whole syllabus</span>
                  <span className="text-3xl">→</span>
                  <span>Ace the exam</span>
                  <span className="text-3xl">→</span>
                  <span>Nail the viva!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AOMMaterialMCQCourse
