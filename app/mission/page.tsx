import React from 'react'
import Image from 'next/image'

const Mission = () => {
  const coreValues = [
    {
      icon: "🎯",
      title: "Excellence in Training",
      description: "Preparing Group B Officers with the best training methodologies and practices",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: "💡",
      title: "Innovation & Technology",
      description: "Embracing modern technology and innovative teaching methodologies",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "🤝",
      title: "Collaborative Learning",
      description: "Promoting knowledge exchange through collaborative learning approaches",
      color: "from-green-500 to-green-600"
    },
    {
      icon: "⭐",
      title: "Quality Education",
      description: "Providing quality educational content and comprehensive guidance",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: "🚀",
      title: "Career Growth",
      description: "Paving the way for professional development and career advancement",
      color: "from-red-500 to-red-600"
    },
    {
      icon: "🌟",
      title: "Continuous Improvement",
      description: "Staying at the forefront through continuous development and updates",
      color: "from-teal-500 to-teal-600"
    }
  ]

  const objectives = [
    {
      number: "01",
      title: "Student Empowerment",
      description: "Equipping students with all the necessary resources for Railway Group B examinations",
      icon: "📚"
    },
    {
      number: "02",
      title: "Quality Content",
      description: "Providing comprehensive and updated study material aligned with the exam syllabus",
      icon: "✍️"
    },
    {
      number: "03",
      title: "Personal Guidance",
      description: "Identifying each student's needs and providing individual attention and mentorship",
      icon: "👨‍🏫"
    },
    {
      number: "04",
      title: "Exam Strategy",
      description: "Developing effective exam strategies and time management skills for success",
      icon: "⏰"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="flex justify-center mb-6">
                <div className="lg:text-7xl text-5xl mb-4 animate-bounce flex justify-center items-center">🎯</div>
              </div>
              <h1 className="lg:text-5xl text-3xl text-center font-extrabold mb-6 animate-fade-in">
                Our Mission
              </h1>
              <p className="lg:text-xl text-lg text-center font-semibold mb-4 text-blue-100">
                Empowering Future Railway Officers
              </p>
              <div className="space-y-6">
                <p className="lg:text-xl text-lg leading-relaxed text-blue-50">
                  To provide exceptional education, guidance, and resources to candidates preparing for Railway Group B Officer examinations, helping them achieve their dreams and aspirations
                </p>
                <div className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <p className="text-lg font-semibold">
                    &ldquo;Empowerment through Education, Transformation through Success&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Logo */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative">
                  <Image
                    src="/images/logo-in-mission.jpg"
                    alt="Group B Officers Academy Mission"
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
      </div>

      {/* Images Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-bold rounded-full text-sm uppercase tracking-wide">
                📚 Training Information
              </span>
            </div>
            <h2 className="lg:text-4xl text-2xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Your Learning Journey
            </h2>
            <p className="lg:text-xl text-base md:text-2xl text-gray-600 font-medium">
              Comprehensive support for your success
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Spared Slot Information Image */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-green-300/50 transition-all duration-700 border border-green-100 transform hover:-translate-y-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-mission-2.jpg"
                    alt="Spared Slot Information - Group B Officers Academy"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">📅 Spared Slot Available</h3>
                      <p className="text-sm text-gray-600">Saturday revision sessions for missed classes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Group Information Image */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-orange-300/50 transition-all duration-700 border border-orange-100 transform hover:-translate-y-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-mission-3.jpg"
                    alt="WhatsApp Group Information - Group B Officers Academy"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">💬 Join WhatsApp Group</h3>
                      <p className="text-sm text-gray-600">Dedicated AOM aspirants community</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Training Benefits */}
          <div className="mt-16 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur-xl opacity-20"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-blue-100/50">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Why Choose Our Training?
                </h3>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Flexible Learning</h4>
                      <p className="text-sm text-gray-600">Saturday revision sessions for missed classes</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Community Support</h4>
                      <p className="text-sm text-gray-600">Dedicated WhatsApp group for serious aspirants</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Expert Guidance</h4>
                      <p className="text-sm text-gray-600">Senior instructor from ZRTI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h2 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4">
            Our Core Values
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${value.color} p-8 text-center transition-all duration-300`}>
                <div className="lg:text-6xl text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Objectives Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4">
              Our Objectives
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4"></div>
            <p className="lg:text-xl text-lg text-gray-600 max-w-3xl mx-auto">
              Goals we are committed to for student success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 lg:p-8 p-4 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="lg:w-20 lg:h-20 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white lg:text-3xl text-2xl font-bold shadow-lg">
                      {objective.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="lg:text-2xl text-xl font-bold text-gray-800">
                        {objective.title}
                      </h3>
                    </div>
                    <p className="lg:text-xl text-lg text-gray-600 leading-relaxed">
                      {objective.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-12 text-white text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-300 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="lg:text-4xl text-2xl font-bold mb-6">
              Our Commitment
            </h2>
            <p className="lg:text-xl text-lg leading-relaxed max-w-4xl mx-auto mb-8 text-blue-50">
              We want every student to succeed in achieving their goals. Through quality education, dedicated instructors, and comprehensive support, we pave the way for your success.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4">
                <div className="lg:text-3xl text-xl font-bold">5000+</div>
                <div className="text-sm text-blue-100">Students</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4">
                <div className="lg:text-3xl text-xl font-bold">95%</div>
                <div className="text-sm text-blue-100">Success Rate</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4">
                <div className="lg:text-3xl text-xl font-bold">50+</div>
                <div className="text-sm text-blue-100">Experts</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4">
                <div className="lg:text-3xl text-xl font-bold">24/7</div>
                <div className="text-sm text-blue-100">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-10">
        <div className="text-center">
          <h2 className="lg:text-3xl text-xl font-bold text-gray-800 mb-6">
            Achieve Your Dreams With Us
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/register/trainee-register"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Join Now
            </a>
            <a
              href="/topics"
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              View Courses
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mission