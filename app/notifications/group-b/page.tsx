import React from 'react'
import Image from 'next/image'

const GroupB = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Floating Notice Board - Bottom Right to Top Right */}
        <div className="pointer-events-none">
          <div className="fixed right-4 bottom-4 z-50 animate-scroll-up-right">
            <div className="w-72 bg-white/95 backdrop-blur rounded-2xl border-4 border-orange-400 shadow-2xl">
              <div className="px-4 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-t-xl flex items-center justify-center">
                <span className="text-xl mr-2">📋</span>
                <span className="font-black uppercase tracking-wider text-sm">Notice Board</span>
              </div>
              <div className="px-4 py-4">
                <p className="text-sm font-semibold text-gray-900 text-center">
                  Notifications will be issued soon...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-6">
            <span className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full text-sm uppercase tracking-wide shadow-lg">
              Group B Notifications
            </span>
          </div>
          <h1 className="lg:text-5xl text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
            Important Updates
          </h1>
        </div>

        {/* Images Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 animate-fade-in-up-delay">
          {/* Image 1 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-red-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-3xl p-4 shadow-2xl border-4 border-orange-300 hover:border-orange-400 transition-all duration-500 transform hover:scale-105">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/group-b-1.jpg"
                  alt="Group B Notifications Announcement"
                  width={600}
                  height={800}
                  className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
              </div>
            </div>
          </div>

          {/* Image 2 */}
          <div className="group relative">
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-3xl p-4 shadow-2xl border-4 border-blue-300 hover:border-blue-400 transition-all duration-500 transform hover:scale-105">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/images/group-b-2.jpg"
                  alt="Group B Academy Information"
                  width={600}
                  height={800}
                  className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Main Announcement Card */}
          <div className="group relative animate-fade-in-up-delay-2">
            <div className="absolute inset-0 bg-linear-to-r from-orange-400 to-red-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-4 border-orange-300 hover:border-orange-400 transition-all duration-500 transform hover:scale-105">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-linear-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full shadow-lg">
                  <span className="text-2xl animate-bounce inline-block mr-2">🚨</span>
                  <span className="font-black text-sm uppercase">Important Notice</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center mt-6">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-xl animate-pulse">
                    <span className="text-5xl">📢</span>
                  </div>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
                  Notifications will be issued soon...
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Stay tuned for important updates regarding Group B notifications and announcements.
                </p>
                <div className="bg-linear-to-r from-orange-100 to-red-100 rounded-2xl p-4 border border-orange-200">
                  <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                    🔔 Keep Checking for Updates
                  </p>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 opacity-20">
                <div className="w-16 h-16 border-4 border-orange-300 rounded-full animate-ping"></div>
              </div>
              <div className="absolute bottom-4 left-4 opacity-20">
                <div className="w-8 h-8 border-2 border-red-300 rounded-full animate-ping animation-delay-1000"></div>
              </div>
            </div>
          </div>

          {/* Coming Soon Card */}
          <div className="group relative animate-fade-in-up-delay-2">
            <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-4 border-blue-300 hover:border-blue-400 transition-all duration-500 transform hover:scale-105">
              {/* Badge */}
              <div className="absolute -top-4 right-4">
                <div className="bg-linear-to-r from-blue-500 to-indigo-500 text-white px-6 py-2 rounded-full shadow-lg">
                  <span className="font-black text-sm uppercase">Latest</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-linear-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <span className="text-5xl">⏳</span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-6">
                  More Information Coming Soon
                </h3>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                  We are preparing comprehensive details and will share them with you shortly.
                </p>
                <div className="bg-linear-to-r from-blue-100 to-indigo-100 rounded-2xl p-4 border border-blue-200">
                  <p className="text-sm font-semibold text-gray-800">
                    📝 Check Back Regularly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="relative animate-fade-in-up-delay-3">
          <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-3xl blur-2xl opacity-20"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-2 border-gray-200">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                Thank You for Your Patience
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed max-w-3xl mx-auto">
                Your dedication and interest in Group B notifications are greatly appreciated. We are working diligently to provide you with the most current and accurate information.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="bg-linear-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-3 shadow-md">
                  <p className="text-sm font-bold text-blue-800">
                    🌐 www.groupbofficersacademy.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GroupB