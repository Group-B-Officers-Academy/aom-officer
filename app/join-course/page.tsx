'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const JoinCourse = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-100 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section with Image */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-linear-to-r from-orange-100 to-pink-100 text-orange-700 font-bold rounded-full text-sm uppercase tracking-wide">
                Welcome to Excellence
              </span>
            </div>
            <h1 className="lg:text-6xl text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-orange-600 via-red-600 to-pink-600 leading-tight mb-6">
              Join Our Course
            </h1>
            <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed max-w-3xl mx-auto">
              Embark on your journey to success with expert guidance and comprehensive preparation
            </p>
            <div className="mt-6 w-24 h-1 bg-linear-to-r from-orange-500 via-red-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {/* Main Image Card */}
          <div className="relative mb-16 animate-fade-in-up">
            <div className="group relative">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-linear-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
              
              {/* Image container */}
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-orange-400/50 transition-all duration-700 border border-orange-100 transform group-hover:-translate-y-2">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/join-course.jpg"
                    alt="Join Course - Group B Officers Academy"
                    width={1200}
                    height={600}
                    className="w-full h-auto rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-orange-500/20 via-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  
                  {/* Floating badge */}
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-110">
                    <div className="bg-yellow-400/95 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg">
                      <span className="text-orange-900 font-black text-sm">✨ ENROLL NOW ✨</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Features Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="lg:text-4xl text-2xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Why Join Our Course?
            </h2>
            <p className="lg:text-xl text-base md:text-2xl text-gray-600 font-medium">
              Comprehensive preparation for your success
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 md:gap-10">
            {/* Feature 1 */}
            <div className="group relative animate-fade-in-up">
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

            {/* Feature 2 */}
            <div className="group relative animate-fade-in-up animation-delay-200">
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

            {/* Feature 3 */}
            <div className="group relative animate-fade-in-up animation-delay-400">
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

      {/* Call to Action Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-linear-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl blur-2xl opacity-30"></div>
            
            {/* Content card */}
            <div className="relative bg-linear-to-br from-orange-600 via-red-600 to-pink-600 rounded-3xl p-1 shadow-2xl">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl lg:p-12 p-8 text-white">
                <div className="text-center mb-8">
                  <div className="inline-block animate-bounce mb-4">
                    <span className="lg:text-6xl text-4xl drop-shadow-lg">🎓</span>
                  </div>
                  <h2 className="lg:text-4xl text-2xl md:text-5xl font-black mb-4 leading-tight">
                    Ready to Start Your Journey?
                  </h2>
                  <p className="lg:text-xl text-base md:text-2xl text-orange-100 font-medium leading-relaxed">
                    Join thousands of successful officers who started their journey with us.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/register">
                    <button className="group relative bg-white text-orange-600 px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg overflow-hidden w-full sm:w-auto">
                      <span className="relative z-10">Register Now</span>
                      <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </button>
                  </Link>
                  <Link href="/contact">
                    <button className="group relative border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-lg bg-transparent w-full sm:w-auto">
                      <span className="relative z-10">Contact Us</span>
                    </button>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-8 text-center">
                  <div className="inline-block bg-white/20 backdrop-blur-md rounded-xl px-6 py-4 border border-white/30">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">📲</span>
                        <span className="font-semibold">WhatsApp: 9701758170</span>
                      </div>
                      <span className="hidden sm:inline text-white/60">|</span>
                      <div>
                        <span className="font-semibold">🌐 www.groupbofficersacademy.com</span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-yellow-200 font-medium">
                      🚫 No Phone Calls Please — Only WhatsApp Messages
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Quote Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl blur-xl opacity-20"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-xl border border-yellow-100/50">
              <blockquote className="text-xl md:text-2xl font-semibold text-gray-800 italic leading-relaxed text-center mb-6">
                &ldquo;Success is not just about reaching the destination, it&apos;s about the journey of growth, learning, and transformation.&rdquo;
              </blockquote>
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-linear-to-r from-orange-100 to-pink-100 text-orange-700 font-bold rounded-full text-sm">
                  - Group B Officers Academy
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default JoinCourse
