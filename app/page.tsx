'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  const [userInfo, setUserInfo] = useState<{name?: string, email?: string} | null>(null)

  // Check user session on mount and listen for changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const userSession = localStorage.getItem('userSession')
      
      if (userSession) {
        try {
          const userData = JSON.parse(userSession)
          setUserInfo({ name: userData.name, email: userData.email })
        } catch {
          setUserInfo(null)
        }
      } else {
        setUserInfo(null)
      }
    }

    checkLoginStatus()
    
    // Listen for session updates
    window.addEventListener('adminSessionUpdated', checkLoginStatus)
    window.addEventListener('storage', checkLoginStatus)

    return () => {
      window.removeEventListener('adminSessionUpdated', checkLoginStatus)
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [])

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* User Welcome Message - Top Right */}
      {userInfo && (
        <div className="fixed top-16 md:top-20 right-2 md:right-4 z-50 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 via-purple-500 to-indigo-600 rounded-xl blur-xl opacity-40"></div>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-xl px-3 py-2 md:px-4 md:py-3 shadow-2xl border border-blue-200/50 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl">👋</span>
                <div>
                  <p className="text-xs md:text-sm text-gray-600 font-medium">Welcome</p>
                  <p className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 truncate max-w-[120px] md:max-w-none">
                    {userInfo.name || userInfo.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Scrolling Announcement Bar */}
      <div className="relative bg-linear-to-r from-orange-500 via-red-500 to-pink-500 py-4 overflow-hidden z-0 shadow-lg border-b-4 border-yellow-400">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
        
        {/* Animated underline effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent animate-pulse"></div>
        
        <div className="animate-scroll-right-to-left whitespace-nowrap">
          <div className="inline-flex items-center gap-12">
            {/* Duplicate content for seamless loop */}
            <span className="text-white font-black text-lg md:text-xl lg:text-2xl flex items-center gap-3 tracking-wide drop-shadow-lg">
              <span className="animate-bounce text-yellow-300 text-2xl md:text-3xl">🎉</span>
              <span className="uppercase">🎓 
                <Link href="/crash-course" className="underline hover:text-yellow-300 transition-colors duration-200">AOM CRASH COURSE</Link>
                {/* {' & '} */}
                {/* <Link href="/super-crash-course" className="underline hover:text-yellow-300 transition-colors duration-200">AOM SUPER CRASH COURSE</Link> */}
                {' WILL START FROM 31.10.2025 (FRIDAY) 🎓'}
              </span>
              <span className="animate-bounce text-yellow-300 text-2xl md:text-3xl">🎉</span>
            </span>
            <span className="text-white font-black text-lg md:text-xl lg:text-2xl flex items-center gap-3 tracking-wide drop-shadow-lg">
              <span className="animate-bounce text-yellow-300 text-2xl md:text-3xl">🎉</span>
              <span className="uppercase">🎓 
                <Link href="/crash-course" className="underline hover:text-yellow-300 transition-colors duration-200">AOM CRASH COURSE</Link>
                {/* {' & '} */}
                {/* <Link href="/super-crash-course" className="underline hover:text-yellow-300 transition-colors duration-200">AOM SUPER CRASH COURSE</Link> */}
                {' WILL START FROM 31.10.2025 (FRIDAY) 🎓'}
              </span>
              <span className="animate-bounce text-yellow-300 text-2xl md:text-3xl">🎉</span>
            </span>
            <span className="text-white font-black text-lg md:text-xl lg:text-2xl flex items-center gap-3 tracking-wide drop-shadow-lg">
              <span className="animate-bounce text-yellow-300 text-2xl md:text-3xl">🎉</span>
              <span className="uppercase">🎓 
                <Link href="/crash-course" className="underline hover:text-yellow-300 transition-colors duration-200">AOM CRASH COURSE</Link>
                {' & '}
                <Link href="/super-crash-course" className="underline hover:text-yellow-300 transition-colors duration-200">AOM SUPER CRASH COURSE</Link>
                {' WILL START FROM 31.10.2025 (FRIDAY) 🎓'}
              </span>
              <span className="animate-bounce text-yellow-300 text-2xl md:text-3xl">🎉</span>
            </span>
          </div>
        </div>
      </div>

      {/* Join Course Button - Sticky Top Left */}
      <div className="sticky top-0 z-40 py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/join-course">
            <div className="group relative inline-block animate-fade-in">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-linear-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Main button container */}
              <div className="relative bg-linear-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-1 shadow-2xl hover:shadow-orange-400/50 transition-all duration-500 transform hover:scale-105">
                <div className="relative bg-white/95 backdrop-blur-xl rounded-xl overflow-hidden">
                  {/* Image Section */}
                  
                  
                  {/* Text Section */}
                  <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-xs md:text-sm text-gray-600 font-semibold mb-1">Click here to</p>
                        <h3 className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-red-600 to-pink-600">
                          Join Course
                        </h3>
                      </div>
                      <div className="shrink-0">
                        
                      </div>
                    </div>
                    
                    {/* Arrow indicator */}
                    <div className="mt-3 flex items-center gap-2 text-orange-600 font-bold text-sm">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">Get Started</span>
                      <span className="text-lg group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </div>
                  
                  {/* Hover shine effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Images Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-orange-50 via-yellow-50 to-pink-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-linear-to-r from-orange-100 to-pink-100 text-orange-700 font-bold rounded-full text-sm uppercase tracking-wide">
                Inspiration Gallery
              </span>
            </div>
            <h2 className="lg:text-4xl text-2xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Your Journey to Success
            </h2>
            <p className="lg:text-xl text-base md:text-2xl text-gray-600 font-medium">
              Visualize your path to excellence
            </p>
          </div>
          
          {/* Main Images Grid */}
          

          {/* Additional Images Grid - 5 New Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Image 8 */}
            {/* <div className="group relative animate-fade-in-up">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-teal-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-emerald-300/50 transition-all duration-700 border border-emerald-100 transform hover:-translate-y-4 hover:rotate-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-home-8.jpg"
                    alt="Course Information - Group B Officers Academy"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-emerald-400/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                      <span className="text-emerald-900 font-bold text-xs">📋 COURSE INFO</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
                      <h3 className="text-base font-bold text-gray-800 mb-1">Course Details</h3>
                      <p className="text-xs text-gray-600">Comprehensive learning materials</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Image 9 */}
            <div className="group relative animate-fade-in-up animation-delay-200">
              <div className="absolute inset-0 bg-linear-to-r from-violet-400 to-purple-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-violet-300/50 transition-all duration-700 border border-violet-100 transform hover:-translate-y-4 hover:-rotate-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-home-9.jpg"
                    alt="Learning Journey - Group B Officers Academy"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-violet-400/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                      <span className="text-violet-900 font-bold text-xs">🎓 LEARNING</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
                      <h3 className="text-base font-bold text-gray-800 mb-1">Learning Path</h3>
                      <p className="text-xs text-gray-600">Structured educational journey</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 10 */}
            {/* <div className="group relative animate-fade-in-up animation-delay-400">
              <div className="absolute inset-0 bg-linear-to-r from-rose-400 to-pink-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-rose-300/50 transition-all duration-700 border border-rose-100 transform hover:-translate-y-4 hover:rotate-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-home-10.jpg"
                    alt="Success Stories - Group B Officers Academy"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-rose-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-rose-400/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                      <span className="text-rose-900 font-bold text-xs">🏆 SUCCESS</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
                      <h3 className="text-base font-bold text-gray-800 mb-1">Success Stories</h3>
                      <p className="text-xs text-gray-600">Inspiring achievements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Image 11 */}
            <div className="group relative animate-fade-in-up animation-delay-600">
              <div className="absolute inset-0 bg-linear-to-r from-amber-400 to-orange-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-amber-300/50 transition-all duration-700 border border-amber-100 transform hover:-translate-y-4 hover:-rotate-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-home-11.jpg"
                    alt="Expert Guidance - Group B Officers Academy"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-amber-400/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                      <span className="text-amber-900 font-bold text-xs">👨‍🏫 EXPERT</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
                      <h3 className="text-base font-bold text-gray-800 mb-1">Expert Guidance</h3>
                      <p className="text-xs text-gray-600">Professional mentorship</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 11 */}
            <div className="group relative animate-fade-in-up animation-delay-600">
              <div className="absolute inset-0 bg-linear-to-r from-amber-400 to-orange-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-amber-300/50 transition-all duration-700 border border-amber-100 transform hover:-translate-y-4 hover:-rotate-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-home-12.jpg"
                    alt="Expert Guidance - Group B Officers Academy"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-amber-400/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                      <span className="text-amber-900 font-bold text-xs">� FUTURE</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
                      <h3 className="text-base font-bold text-gray-800 mb-1">Future Goals</h3>
                      <p className="text-xs text-gray-600">Professional mentorship</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="group relative animate-fade-in-up animation-delay-600">
              <div className="absolute inset-0 bg-linear-to-r from-amber-400 to-orange-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-amber-300/50 transition-all duration-700 border border-amber-100 transform hover:-translate-y-4 hover:-rotate-1">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-home-13.jpg"
                    alt="Expert Guidance - Group B Officers Academy"
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-amber-400/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                      <span className="text-amber-900 font-bold text-xs">👨‍🏫 EXPERT</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
                      <h3 className="text-base font-bold text-gray-800 mb-1">Expert Guidance</h3>
                      <p className="text-xs text-gray-600">Professional mentorship</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            
          </div>

          {/* Bottom Quote */}
          <div className="mt-16 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl blur-xl opacity-20"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-yellow-100/50">
                <blockquote className="text-xl md:text-2xl font-semibold text-gray-800 italic leading-relaxed">
                  &ldquo;Success is not just about reaching the destination, it&apos;s about the journey of growth, learning, and transformation.&rdquo;
                </blockquote>
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 bg-linear-to-r from-orange-100 to-pink-100 text-orange-700 font-bold rounded-full text-sm">
                    - Group B Officers Academy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach to Achieve Success Section */}
      <section className="relative py-10 overflow-hidden bg-linear-to-br from-teal-50 via-emerald-50 to-green-50">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-3 lg:px-8 relative">
        <div className="text-center">
                  <span className="px-4 py-3 bg-linear-to-r from-teal-100 to-emerald-100 text-teal-700 font-bold rounded-full lg:text-5xl text-base uppercase tracking-wide">
                    Our Approach to Achieve Success
                  </span>
                </div>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-10">
            
            {/* Left Side - Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Header */}
                
              <div className="space-y-4">
                <h2 className="lg:text-xl text-base font-black bg-clip-text text-transparent bg-linear-to-r from-teal-600 via-emerald-600 to-green-600 leading-tight">
                  ✨ GROUP B OFFICERS ACADEMY ✨
                </h2>
                <p className="lg:text-xl text-base text-gray-700 font-semibold">
                  (ASPIRE – LEARN – LEAD)
                </p>
              </div>

              {/* F.A.S.T Concept */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-400 rounded-xl blur-xl opacity-20"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-xl lg:p-6 p-4 shadow-lg border border-yellow-200">
                    <p className="lg:text-2xl text-lg font-black text-gray-800 text-center">
                      🚀 We use the concept of F.A.S.T 🚀
                    </p>
                  </div>
                </div>

                {/* F.A.S.T Breakdown */}
                <div className="grid grid-cols-1 gap-4">
                  {/* F - FOCUS */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-green-500 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 border border-emerald-100 hover:border-emerald-300">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 lg:w-12 w-10 lg:h-12 h-10 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="lg:text-2xl text-xl">✅</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="lg:text-xl text-base font-black text-gray-900 mb-2">F – FOCUS</h3>
                          <p className="lg:text-base text-sm text-gray-700 font-medium">🎯 Concentrate on what truly matters.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* A - ACTION */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-amber-500 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 border border-yellow-100 hover:border-yellow-300">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 lg:w-12 w-10 lg:h-12 h-10 bg-linear-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="lg:text-2xl text-xl">✅</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="lg:text-xl text-base font-black text-gray-900 mb-2">A – ACTION</h3>
                          <p className="lg:text-base text-sm text-gray-700 font-medium">🏃‍♂ Turn your big goals into small actionable steps.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* S - SYSTEM */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-500 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative bg-white rounded-xl lg:p-5 p-4 shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-300">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 lg:w-12 w-10 lg:h-12 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"> 
                          <span className="lg:text-2xl text-xl">✅</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="lg:text-xl text-base font-black text-gray-900 mb-2">S – SYSTEM</h3>
                          <p className="lg:text-base text-sm text-gray-700 font-medium">⚙ Create a consistent routine to stay accountable.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* T - TRACKING */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-500 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative bg-white rounded-xl lg:p-5 p-4 shadow-lg hover:shadow-xl transition-all duration-500 border border-purple-100 hover:border-purple-300">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 lg:w-12 w-10 lg:h-12 h-10 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="lg:text-2xl text-xl">✅</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="lg:text-xl text-base font-black text-gray-900 mb-2">T – TRACKING</h3>
                          <p className="lg:text-base text-sm text-gray-700 font-medium">📊 Measure your progress — what gets tracked, gets improved!</p>
                        </div>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Messages */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-teal-400 to-emerald-500 rounded-xl blur-xl opacity-20"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-xl lg:p-6 p-4 shadow-lg border border-teal-200">
                    <p className="lg:text-lg text-base font-semibold text-gray-800 text-center mb-3">
                      💪 We focus on your actions & establish a system to track your preparation!
                    </p>
                    <p className="lg:text-base text-sm font-medium text-gray-700 text-center">
                      🎓 Empowering AOM Aspirants Every Step of the Way!
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-500 rounded-xl blur-xl opacity-20"></div>
                  <div className="relative bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl lg:p-6 p-4 shadow-xl text-white">
                    <div className="space-y-3">
                      <p className="lg:text-lg text-base font-bold text-center">🌐 www.groupbofficersacademy.com</p>
                      <div className="flex items-center justify-center gap-3">
                        <span className="lg:text-2xl text-xl">📲</span>
                        <span className="lg:text-lg text-base font-semibold">WhatsApp: 9701758170</span>
                      </div>
                      <p className="lg:text-sm text-xs text-center text-yellow-200 font-medium">
                        🚫 No Phone Calls Please — Only WhatsApp Messages
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="group relative">
                <div className="absolute inset-0 bg-linear-to-r from-teal-600 to-emerald-600 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-linear-to-br from-teal-400 to-green-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative">
                  <Image
                    src="/images/logo-in-home-approach.jpg"
                    alt="F.A.S.T Approach - Group B Officers Academy"
                    width={500}
                    height={600}
                    className="relative rounded-3xl shadow-2xl ring-8 ring-white group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-teal-500/20 to-emerald-500/20 group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Hero Section */}
      <section className="relative py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Welcome Message */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="px-4 py-2 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 font-bold rounded-full text-sm uppercase tracking-wide">
                    Welcome to Excellence
                  </span>
                </div>
                <h1 className="lg:text-6xl text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 leading-tight">
                  Group B Officers Academy
                </h1>
                <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed">
                  Your gateway to success in the <span className="text-blue-600 font-bold">AOM LDCE Examination</span> through expert guidance and comprehensive preparation
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Join thousands of successful officers who achieved their dreams through our structured learning approach, interactive classes, and expert mentorship.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg overflow-hidden">
                  <span className="relative z-10">Start Learning</span>
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group relative border-2 border-blue-600 text-blue-700 px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Learn More</span>
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>

              
            </div>

            {/* Right Side - Logo */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="group relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-purple-500 rounded-lg blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative">
                  <Image
                    src="/images/logo-in-home.jpg"
                    alt="Group B Officers Academy"
                    width={400}
                    height={400}
                    className="relative rounded-lg shadow-2xl ring-8 ring-white group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-lg bg-linear-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>      

      

      {/* Welcome Message Section */}
      <section className="relative py-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-white to-blue-50"></div>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative">
          <div className="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-1 shadow-2xl hover:shadow-blue-300/50 transition-all duration-500">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl lg:p-8 p-4 text-white">
              <div className="text-center mb-10">
                <div className="inline-block animate-bounce">
                  <span className="lg:text-6xl text-4xl mb-6 block drop-shadow-lg">🌟</span>
                </div>
                <h2 className="lg:text-4xl text-2xl md:text-5xl font-black mb-5 leading-tight tracking-tight">
                  HELLO, AOM ASPIRANTS!
                </h2>
                <div className="inline-block lg:px-6 px-4 lg:py-3 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  <p className="lg:text-xl text-base font-semibold">
                    From GROUP &apos;B&apos; OFFICERS ACADEMY
                  </p>
                </div>
              </div>
              
              <div className="max-w-4xl mx-auto lg:text-lg text-base md:text-xl leading-relaxed space-y-6">
                <p className="text-white/95 font-medium">
                  It&apos;s wonderful to see such a large number of dedicated aspirants preparing for the AOM LDCE Examination.
                </p>
                
                <p className="text-white/95 font-medium">
                  To instill seriousness and focus among all participants and to ensure effective preparation through interactive Zoom classes and regular practice tests, an Intensive Crash Course has been specially designed under the able guidance of:
                </p>
                
                <div className="relative mt-12">
                  <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl blur-2xl opacity-40"></div>
                  <div className="relative bg-white/80 backdrop-blur-2xl rounded-xl lg:p-12 p-6 shadow-2xl border border-yellow-100/40 transform hover:scale-105 transition-transform duration-400">
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="mb-4">
                          <p className="text-lg sm:text-xl font-medium text-gray-700/80">
                            Experience the <span className="font-bold text-orange-600">Power of Mentorship</span> under the remarkable guidance of our beloved
                          </p>
                        </div>
                        {/* <p className="font-black lg:text-3xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-700 mb-3 drop-shadow-lg tracking-tight animate-pulse">
                          Sri SREENIVASULU CHEVURU
                        </p> */}
                        <p className="lg:text-xl text-base font-semibold text-gray-800 flex items-center justify-center gap-2">
                          Senior Instructor from ZRTI
                        </p>
                        <p className="mt-5 text-base md:text-lg text-slate-700 max-w-xl mx-auto italic">
                          Unlock your fullest potential guided by inspired teaching, wisdom, and dedication.<br/>
                          Embark on a transformative learning journey towards your dream of success in the AOM LDCE Examination!
                        </p>
                        <div className="flex justify-center mt-5">
                          <span className="inline-block rounded-full bg-yellow-300/80 px-5 py-2 text-yellow-900 font-bold text-lg shadow-md border border-yellow-200 tracking-wide animate-fade-in-up">
                            Elevate. Empower. Excel.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 font-bold rounded-full text-sm uppercase tracking-wide">
                Our Features
              </span>
            </div>
            <h2 className="lg:text-4xl text-2xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Why Choose Our Academy?
            </h2>
            <p className="lg:text-xl text-base md:text-2xl text-gray-600 font-medium">
              Comprehensive preparation for your success
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 md:gap-10">
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-indigo-500 rounded-2xl blur-md opacity-50"></div>
                    <div className="relative w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-4xl">📚</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Guidance</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Learn from experienced instructors with proven track records in LDCE examinations.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-linear-to-br from-green-400 to-emerald-500 rounded-2xl blur-md opacity-50"></div>
                    <div className="relative w-20 h-20 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-4xl">💻</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Classes</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Join live Zoom sessions for real-time learning and doubt clarification.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-pink-500 rounded-2xl blur-md opacity-50"></div>
                    <div className="relative w-20 h-20 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-4xl">🎯</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Practice Tests</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Regular mock tests and practice sessions to boost your confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-900 via-indigo-900 to-purple-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="inline-block mb-6">
              <span className="px-5 py-2 bg-linear-to-r from-yellow-400 to-orange-500 text-gray-900 font-black rounded-full text-sm uppercase tracking-wider shadow-lg">
                Start Today
              </span>
            </div>
            <h2 className="lg:text-4xl text-2xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to Start Your Journey?
            </h2>
            <p className="lg:text-xl text-base md:text-2xl text-blue-100 mb-10 font-medium leading-relaxed">
              Join thousands of successful officers who started their journey with us.
            </p>
            
            {/* Course Information Images - Floating Design */}
            <div className="relative mb-16">
              {/* Floating Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-20 right-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-purple-400/20 rounded-full blur-xl animate-pulse animation-delay-4000"></div>
                <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-orange-400/20 rounded-full blur-xl animate-pulse animation-delay-6000"></div>
              </div>

              {/* Floating Images Grid */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
                

                {/* Image 2 - AOM Aspirants Join Now */}
                <div className="group relative animate-float-slow animation-delay-1000">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-3 lg:p-2 shadow-2xl hover:shadow-blue-300/50 transition-all duration-700 border border-blue-200/30 transform hover:-translate-y-4 hover:-rotate-2 hover:scale-105">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src="/images/logo-in-home-5.jpg"
                        alt="AOM Aspirants - Join Our Zoom Classes"
                        width={400}
                        height={350}
                        className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="bg-blue-400/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                          <span className="text-blue-900 font-bold text-xs">📚 ZOOM CLASSES</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image 3 - AOM Crash Course Tree Design */}
                <div className="group relative animate-float-slow animation-delay-2000">
                  <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-3 lg:p-2 shadow-2xl hover:shadow-green-300/50 transition-all duration-700 border border-green-200/30 transform hover:-translate-y-4 hover:rotate-1 hover:scale-105">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src="/images/logo-in-home-6.jpg"
                        alt="AOM Crash Course - Educational Journey"
                        width={400}
                        height={350}
                        className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="bg-green-400/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                          <span className="text-green-900 font-bold text-xs">🌳 LEARNING TREE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image 4 - Saturday Spared Slot */}
                <div className="group relative animate-float-slow animation-delay-3000">
                  <div className="absolute inset-0 bg-linear-to-r from-pink-400 to-rose-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-3 lg:p-2 shadow-2xl hover:shadow-pink-300/50 transition-all duration-700 border border-pink-200/30 transform hover:-translate-y-4 hover:-rotate-1 hover:scale-105">
                    <div className="relative overflow-hidden rounded-2xl">
                      <Image
                        src="/images/logo-in-home-7.jpg"
                        alt="Saturday Spared Slot - Group B Officers Academy"
                        width={400}
                        height={350}
                        className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-br from-pink-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="bg-pink-400/90 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg">
                          <span className="text-pink-900 font-bold text-xs">📅 SATURDAY SLOT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Action Text */}
              <div className="mt-12 text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-xl border border-white/30">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      🚀 Join Our AOM Crash Course Today!
                    </h3>
                    <p className="text-blue-100 font-medium">
                      Interactive Zoom Classes • MCQ Practice • Mock Tests • Expert Guidance
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            
            
            {/* Stats */}
            
            
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home