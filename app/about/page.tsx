import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-60 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-300 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="inline-block mb-6">
                <span className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full text-sm uppercase tracking-wider shadow-lg">
                  ✨ About Us
                </span>
              </div>
              <h1 className="lg:text-5xl text-3xl font-black text-white mb-6 leading-tight animate-fade-in">
                About Our Academy
              </h1>
              
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-semibold animate-fade-in-up">
                  <span className="text-3xl font-bold text-yellow-300 drop-shadow-md inline-block mb-2">GROUP B OFFICERS ACADEMY</span>
                  <br />
                  <span className="block text-lg md:text-xl font-light text-white/80 mt-4">
                    At <span className="text-blue-200 font-semibold">Group B Officers Academy</span>, we believe in the transformative power of education and mentorship. Our mission is to ignite the potential within every aspirant preparing for the <span className="text-indigo-200 font-bold">AOM LDCE Examinations</span>. We provide holistic, high-quality, and innovative learning experiences that empower our students to shine in the most competitive environments of the Indian Railways.
                  </span>
                </p>
                
                <div className="flex flex-col md:flex-row justify-start items-center gap-6 mt-8">
                  <div className="relative group w-full md:w-auto">
                    <div className="bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-2xl group-hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                      <svg className="w-12 h-12 text-white mb-2 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" />
                      </svg>
                      <span className="relative z-10 font-extrabold text-lg">Expert Guidance</span>
                      <span className="block text-white/75 text-sm mt-1 text-center">Led by accomplished officers and seasoned educators</span>
                    </div>
                  </div>
                  <div className="relative group w-full md:w-auto">
                    <div className="bg-gradient-to-tr from-green-400 to-emerald-600 rounded-2xl p-6 shadow-2xl group-hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                      <svg className="w-12 h-12 text-white mb-2 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" fill="white" opacity="0.15"/>
                        <path d="M13 7H7v10h10v-6m-1-5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="relative z-10 font-extrabold text-lg">Interactive Learning</span>
                      <span className="block text-white/75 text-sm mt-1 text-center">Live classes, practice sessions, and peer discussion</span>
                    </div>
                  </div>
                  <div className="relative group w-full md:w-auto">
                    <div className="bg-gradient-to-tr from-purple-500 to-pink-600 rounded-2xl p-6 shadow-2xl group-hover:scale-105 transition-transform duration-300 flex flex-col items-center">
                      <svg className="w-12 h-12 text-white mb-2 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8v4l3 3m5-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="relative z-10 font-extrabold text-lg">Proven Results</span>
                      <span className="block text-white/75 text-sm mt-1 text-center">Consistent success in guiding students to Group B officer roles</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-medium animate-fade-in-up">
                  From rigorous mock tests and adaptive learning modules, to ongoing personal mentorship, we nurture your academic journey every step of the way. <span className="text-pink-200 font-semibold">Join us</span> and embrace a brighter, more confident path to success.
                </p>
              </div>
            </div>

            {/* Right Side - Logo */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative">
                  <Image
                    src="/images/logo-in-about.jpg"
                    alt="Group B Officers Academy"
                    width={400}
                    height={400}
                    className="relative rounded-lg shadow-2xl ring-8 ring-white group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 font-bold rounded-full text-sm uppercase tracking-wide">
                💪 Motivation Gallery
              </span>
            </div>
            <h2 className="lg:text-4xl text-2xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Mindset & Determination
            </h2>
            <p className="lg:text-xl text-base md:text-2xl text-gray-600 font-medium">
              Your attitude determines your altitude
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Mindset is Everything Image */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-blue-300/50 transition-all duration-700 border border-blue-100 transform hover:-translate-y-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-about-2.jpg"
                    alt="Mindset is Everything - Group B Officers Academy"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">🧠 Mindset is Everything</h3>
                      <p className="text-sm text-gray-600">Transform your thinking, transform your future</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Winners Find a Way Image */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-green-300/50 transition-all duration-700 border border-green-100 transform hover:-translate-y-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-about-3.jpg"
                    alt="Winners Find a Way - Group B Officers Academy"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">🏆 Winners Find a Way</h3>
                      <p className="text-sm text-gray-600">Overcome obstacles, don&apos;t make excuses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="mt-16 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl blur-xl opacity-20"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-yellow-100/50">
                <blockquote className="text-xl md:text-2xl font-semibold text-gray-800 italic leading-relaxed">
                  &ldquo;Success is not final, failure is not fatal: it is the courage to continue that counts.&rdquo;
                </blockquote>
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 font-bold rounded-full text-sm">
                    - Group B Officers Academy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-purple-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 font-bold rounded-full text-sm uppercase tracking-wide">
                💫 Our Purpose
              </span>
            </div>
            <h2 className="lg:text-5xl text-3xl font-black text-gray-900 mb-4">
              Mission & Vision
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-100 hover:border-blue-300 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl blur-lg opacity-50"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                      <span className="text-5xl">🎯</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 mb-6">Our Mission</h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    To provide <span className="text-blue-600 font-bold">exceptional training and guidance</span> to AOM aspirants, ensuring they are well-prepared for the LDCE examination through comprehensive study materials, expert instruction, and regular practice sessions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative bg-white backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-100 hover:border-purple-300 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-lg opacity-50"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                      <span className="text-5xl">🌟</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-6">Our Vision</h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-medium">
                    To be the <span className="text-purple-600 font-bold">leading academy</span> for Group B officer preparation, recognized for our excellence in education and our commitment to student success in the Indian Railways sector.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Academy Features */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-indigo-50 to-purple-100"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-bold rounded-full text-sm uppercase tracking-wide">
                ⭐ Why Choose Us
              </span>
            </div>
            <h2 className="lg:text-5xl text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-6 leading-tight">
              What Sets Us Apart
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Our unique approach to AOM preparation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-300 transform hover:-translate-y-3">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-4xl">📖</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">Comprehensive Study Material</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">Well-structured curriculum covering all aspects of the examination</p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-300 transform hover:-translate-y-3">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-4xl">💻</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">Live Interactive Classes</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">Real-time learning through Zoom sessions with expert instructors</p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-300 transform hover:-translate-y-3">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-4xl">📝</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">Regular Practice Tests</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">Mock tests and assessments to track your progress</p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-300 transform hover:-translate-y-3">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                    <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
                      <span className="text-4xl">🤝</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">Personal Mentorship</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">Individual guidance and support throughout your journey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About