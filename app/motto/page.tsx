import React from 'react'
import Image from 'next/image'

const Motto = () => {
  const mottos = [
    {
      icon: "📖",
      title: "Learn with Purpose",
      motto: "Knowledge is the foundation of success",
      description: "Every lesson learned is a step closer to your dream career in Indian Railways",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: "💪",
      title: "Strive for Excellence",
      motto: "Excellence is not a skill, it's an attitude",
      description: "We inspire students to aim beyond their limits and achieve extraordinary results",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: "🎯",
      title: "Focus and Discipline",
      motto: "Success comes to those who stay focused",
      description: "Maintain unwavering focus on your goals with disciplined preparation",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: "🤝",
      title: "Together We Rise",
      motto: "Alone we can do little, together we achieve much",
      description: "Building a community where everyone supports each other's success",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: "⚡",
      title: "Action Creates Results",
      motto: "Dreams don't work unless you do",
      description: "Transform your aspirations into reality through consistent action and hard work",
      color: "from-yellow-500 to-amber-600"
    },
    {
      icon: "🌟",
      title: "Believe and Achieve",
      motto: "Your belief determines your success",
      description: "Faith in yourself is the first step toward achieving the impossible",
      color: "from-cyan-500 to-blue-600"
    }
  ]

  const principles = [
    {
      number: "01",
      title: "Integrity First",
      description: "We uphold the highest standards of honesty, ethics, and transparency in everything we do",
      icon: "🛡️"
    },
    {
      number: "02",
      title: "Student-Centric Approach",
      description: "Every decision we make prioritizes the success and well-being of our students",
      icon: "👨‍🎓"
    },
    {
      number: "03",
      title: "Continuous Innovation",
      description: "We constantly evolve our teaching methods to provide the best learning experience",
      icon: "💡"
    },
    {
      number: "04",
      title: "Result-Oriented Teaching",
      description: "Our focus is on delivering measurable outcomes and ensuring student success",
      icon: "📊"
    }
  ]

  const inspirations = [
    {
      quote: "The future belongs to those who believe in the beauty of their dreams",
      author: "Eleanor Roosevelt",
      icon: "✨"
    },
    {
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts",
      author: "Winston Churchill",
      icon: "🔥"
    },
    {
      quote: "Education is the most powerful weapon which you can use to change the world",
      author: "Nelson Mandela",
      icon: "🎓"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="flex justify-center mb-6">
                <div className="lg:text-7xl text-5xl mb-4 animate-bounce flex justify-center items-center">🏛️</div>
              </div>
              <h1 className="lg:text-5xl text-3xl text-center font-extrabold mb-6 animate-fade-in">
                Our Motto
              </h1>
              <p className="lg:text-xl text-lg text-center font-semibold mb-4 text-teal-100">
                Guiding Principles That Drive Us Forward
              </p>
              <div className="space-y-6">
                <p className="lg:text-xl text-lg leading-relaxed text-teal-50">
                  Our mottos are more than just words - they are the principles that guide every aspect of our 
                  academy, inspiring both educators and students to strive for excellence every single day
                </p>
                <div className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <p className="text-lg font-semibold">
                    &ldquo;Excellence Through Dedication, Success Through Perseverance&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Logo */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative">
                  <Image
                    src="/images/logo-in-motto.jpg"
                    alt="Group B Officers Academy Motto"
                    width={400}
                    height={400}
                    className="relative rounded-lg shadow-2xl ring-8 ring-white group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-500/20 group-hover:from-teal-500/30 group-hover:to-cyan-500/30 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mottos Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h2 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4">
            Our Core Mottos
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 mx-auto rounded-full mb-4"></div>
          <p className="lg:text-xl text-lg text-gray-600 max-w-3xl mx-auto">
            The beliefs and values that inspire our community every day
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mottos.map((motto, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${motto.color} p-8 text-center transition-all duration-300`}>
                <div className="lg:text-6xl text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {motto.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="lg:text-xl text-lg font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                  {motto.title}
                </h3>
                <p className="lg:text-xl text-lg text-teal-600 font-semibold italic mb-3 text-sm">
                  &ldquo;{motto.motto}&rdquo;
                </p>
                <p className="lg:text-xl text-lg text-gray-600 leading-relaxed text-sm">
                  {motto.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Principles Section */}
      <div className="bg-gradient-to-br from-gray-50 to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4">
              Our Guiding Principles
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 mx-auto rounded-full mb-4"></div>
            <p className="lg:text-xl text-lg text-gray-600 max-w-3xl mx-auto">
              The fundamental principles that shape our approach to education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 lg:p-8 p-4 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="lg:w-20 lg:h-20 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center text-white lg:text-xl text-lg font-bold shadow-lg">
                      {principle.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="lg:text-2xl text-xl font-bold text-gray-800">
                        {principle.title}
                      </h3>
                    </div>
                    <p className="lg:text-xl text-lg text-gray-600 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inspirational Quotes */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="text-center mb-12">
          <h2 className="lg:text-4xl text-2xl font-bold text-gray-800 mb-4">
            Words That Inspire Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {inspirations.map((inspiration, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 lg:p-8 p-4 transform hover:-translate-y-1 border-l-4 border-teal-600"
            >
              <div className="lg:text-5xl text-4xl mb-4 text-center">{inspiration.icon}</div>
              <p className="lg:text-xl text-lg text-gray-700 leading-relaxed italic mb-4 text-center">
                &ldquo;{inspiration.quote}&rdquo;
              </p>
              <p className="lg:text-xl text-lg text-teal-600 font-semibold text-center">
                — {inspiration.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment Section */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl shadow-2xl lg:p-12 p-6 text-white text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-300 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="lg:text-4xl text-2xl font-bold mb-6">
              Live Our Motto Every Day
            </h2>
            <p className="lg:text-xl text-lg leading-relaxed max-w-4xl mx-auto mb-8 text-teal-50">
              Our mottos are not just philosophical statements - they are practical guidelines that shape 
              every interaction, every lesson, and every success story at our academy. Join us in living 
              these principles and achieving your dreams.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 mt-12">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="lg:text-5xl text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-lg mb-2">Focus</h3>
                <p className="text-teal-100 text-sm">
                  Stay committed to your goals
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="lg:text-5xl text-4xl mb-3">💪</div>
                <h3 className="font-bold text-lg mb-2">Perseverance</h3>
                <p className="text-teal-100 text-sm">
                  Never give up on your dreams
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="lg:text-5xl text-4xl mb-3">🌟</div>
                <h3 className="font-bold text-lg mb-2">Excellence</h3>
                <p className="text-teal-100 text-sm">
                  Strive for the highest standards
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <div className="lg:text-5xl text-4xl mb-3">🤝</div>
                <h3 className="font-bold text-lg mb-2">Unity</h3>
                <p className="text-teal-100 text-sm">
                  Grow together as a community
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
            Embrace Our Values, Achieve Your Goals
          </h2>
          <p className="lg:text-xl text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a community that believes in these principles and is committed to your success
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/register/trainee-register"
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-teal-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Join Our Academy
            </a>
            <a
              href="/mission"
              className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Our Mission
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Motto