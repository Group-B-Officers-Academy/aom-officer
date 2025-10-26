import React from 'react'
import Image from 'next/image'

const Vision = () => {
  const visionPillars = [
    {
      icon: "🌟",
      title: "Excellence",
      description: "Being the premier institution for Railway Group B officer preparation in the region",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: "🎓",
      title: "Knowledge Hub",
      description: "Creating a comprehensive learning ecosystem for aspiring railway professionals",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "Leading the way with cutting-edge teaching methods and technology integration",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Building a supportive network of learners, mentors, and successful alumni",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: "🏆",
      title: "Success",
      description: "Achieving industry-leading success rates and producing top-ranking candidates",
      color: "from-red-500 to-rose-600"
    },
    {
      icon: "🌍",
      title: "Impact",
      description: "Making a lasting positive impact on students' lives and railway services",
      color: "from-indigo-500 to-violet-600"
    }
  ]

  const futureGoals = [
    {
      year: "2025",
      title: "Digital Transformation",
      description: "Complete digitalization of all learning materials with AI-powered personalized learning paths",
      icon: "💻",
      status: "In Progress"
    },
    {
      year: "2026",
      title: "National Expansion",
      description: "Establishing presence in 10 major railway zones across India with dedicated training centers",
      icon: "🗺️",
      status: "Planning"
    },
    {
      year: "2027",
      title: "Advanced Analytics",
      description: "Implementing advanced performance analytics and predictive success modeling for students",
      icon: "📊",
      status: "Research"
    },
    {
      year: "2028",
      title: "Industry Partnership",
      description: "Collaborating with Indian Railways for direct recruitment and internship opportunities",
      icon: "🤝",
      status: "Vision"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="flex justify-center mb-6">
                <div className="lg:text-7xl text-5xl mb-4 animate-bounce flex justify-center items-center">👁️</div>
              </div>
              <h1 className="lg:text-5xl text-3xl text-center font-extrabold mb-6 animate-fade-in">
                Our Vision
              </h1>
              <p className="lg:text-xl text-lg text-center font-semibold mb-4 text-purple-100">
                Shaping Tomorrow&apos;s Railway Leaders
              </p>
              <div className="space-y-6">
                <p className="lg:text-xl text-lg leading-relaxed text-purple-50">
                  To be the most trusted and innovative academy for Railway Group B officer preparation, 
                  transforming aspiring candidates into competent professionals who will shape the future of Indian Railways
                </p>
                <div className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <p className="text-lg font-semibold">
                    &ldquo;Envisioning Excellence, Inspiring Success&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Logo */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative">
                  <Image
                    src="/images/logo-in-vision.jpg"
                    alt="Group B Officers Academy Vision"
                    width={400}
                    height={400}
                    className="relative rounded-lg shadow-2xl ring-8 ring-white group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-bold rounded-full text-sm uppercase tracking-wide">
                🚀 Action Gallery
              </span>
            </div>
            <h2 className="lg:text-4xl text-2xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Take Action Today
            </h2>
            <p className="lg:text-xl text-base md:text-2xl text-gray-600 font-medium">
              Your future starts with the decisions you make today
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Crash Course Information Image */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-orange-300/50 transition-all duration-700 border border-orange-100 transform hover:-translate-y-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-vision-2.jpg"
                    alt="Join Crash Course - Group B Officers Academy"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">🔥 Join Crash Course</h3>
                      <p className="text-sm text-gray-600">60-day intensive preparation program</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Work for Your Goal Image */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-3xl p-2 shadow-2xl hover:shadow-blue-300/50 transition-all duration-700 border border-blue-100 transform hover:-translate-y-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo-in-vision-3.jpg"
                    alt="Work for Your Goal - Group B Officers Academy"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-2xl group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">🎯 Work for Your Goal</h3>
                      <p className="text-sm text-gray-600">Success comes to those who take action</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 rounded-2xl blur-xl opacity-20"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-purple-100/50">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  Ready to Transform Your Future?
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🔥</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Intensive Crash Course</h4>
                      <p className="text-sm text-gray-600">60-day program starting October 22, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Goal-Oriented Learning</h4>
                      <p className="text-sm text-gray-600">Structured approach to achieve your dreams</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <blockquote className="text-lg md:text-xl font-semibold text-gray-800 italic leading-relaxed">
                    &ldquo;The future belongs to those who believe in the beauty of their dreams and take action to achieve them.&rdquo;
                  </blockquote>
                  <div className="mt-4">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 font-bold rounded-full text-sm">
                      - Group B Officers Academy
                    </span>
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
            Our Vision Pillars
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full mb-4"></div>
          <p className="lg:text-xl text-lg text-gray-600 max-w-3xl mx-auto">
            The foundational elements that guide our vision for the future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visionPillars.map((pillar, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${pillar.color} p-8 text-center transition-all duration-300`}>
                <div className="lg:text-6xl text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="lg:text-xl text-lg font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {pillar.title}
                </h3>
                <p className="lg:text-xl text-lg text-gray-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Future Goals Timeline */}
      <div className="bg-gradient-to-br from-gray-50 to-purple-50 py-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4">
              Future Roadmap
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full mb-4"></div>
            <p className="lg:text-xl text-lg text-gray-600 max-w-3xl mx-auto">
              Our strategic goals for becoming the leading railway preparation academy
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {futureGoals.map((goal, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 lg:p-8 p-4 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="lg:w-20 lg:h-20 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white lg:text-xl text-lg font-bold shadow-lg">
                      {goal.year}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <h3 className="lg:text-2xl text-xl font-bold text-gray-800">
                          {goal.title}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        goal.status === 'In Progress' ? 'bg-green-100 text-green-600' :
                        goal.status === 'Planning' ? 'bg-blue-100 text-blue-600' :
                        goal.status === 'Research' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                    <p className="lg:text-xl text-lg text-gray-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vision Statement */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl lg:p-12 p-6 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="lg:text-4xl text-2xl font-bold mb-6">
              What We Envision
            </h2>
            <p className="lg:text-xl text-lg leading-relaxed max-w-4xl mx-auto mb-8 text-purple-50">
              We envision a future where every aspiring railway professional has access to world-class education, 
              personalized mentorship, and the tools they need to excel in their careers and contribute to the 
              development of India&apos;s railway infrastructure.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="lg:text-5xl text-4xl mb-3">🎯</div>
                <h3 className="lg:text-xl text-lg font-bold mb-2">Our Target</h3>
                <p className="text-purple-100 text-sm">
                  Become the #1 choice for Railway Group B preparation by 2026
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="lg:text-5xl text-4xl mb-3">📈</div>
                <h3 className="lg:text-xl text-lg font-bold mb-2">Our Growth</h3>
                <p className="text-purple-100 text-sm">
                  Expand to serve 25,000+ students annually with 98% satisfaction
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="lg:text-5xl text-4xl mb-3">🌟</div>
                <h3 className="lg:text-xl text-lg font-bold mb-2">Our Legacy</h3>
                <p className="text-purple-100 text-sm">
                  Create generations of successful railway professionals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-10">
        <div className="text-center">
          <h2 className="lg:text-3xl text-xl font-bold text-gray-800 mb-6">
            Be Part of Our Vision
          </h2>
          <p className="lg:text-xl text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us in shaping the future of railway education and your career
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/register/trainee-register"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Your Journey
            </a>
            <a
              href="/about"
              className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vision