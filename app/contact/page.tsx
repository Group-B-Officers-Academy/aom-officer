'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useToast } from '../../components/Toast'

const Contact = () => {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        addToast('Message sent successfully! We will get back to you soon.', 'success', 5000)
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        addToast(`Error: ${result.error}`, 'error', 5000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      addToast('Failed to send message. Please try again.', 'error', 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get in touch with us for any queries or to join our academy
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      Group B Officers Academy<br />
                      Hyderabad<br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    {/* WhatsApp SVG Icon */}
                    <svg
                      viewBox="0 0 32 32"
                      width={28}
                      height={28}
                      fill="currentColor"
                      className="text-green-500"
                      aria-label="WhatsApp"
                    >
                      <g>
                        <path d="M16 3C9.375 3 3.999 8.375 3.999 15c0 2.478.812 4.79 2.21 6.731L4 29l7.472-2.183C13.832 27.59 14.903 27.75 16 27.75c6.625 0 12-5.375 12-12.001C28 8.375 22.625 3 16 3zm0 22.75c-1.037 0-2.05-.137-3.024-.398l-.216-.059-4.425 1.293 1.288-4.413-.14-.223A9.713 9.713 0 0 1 5.749 15C5.749 9.038 10.039 4.25 16 4.25c5.963 0 10.252 4.788 10.252 10.75 0 5.962-4.289 10.75-10.252 10.75zm5.417-7.317c-.296-.148-1.75-.867-2.02-.967-.271-.099-.469-.148-.667.149-.197.296-.765.967-.937 1.164-.172.198-.346.223-.643.074-.296-.148-1.252-.46-2.386-1.463-.882-.788-1.479-1.757-1.653-2.053-.173-.297-.019-.456.13-.604.134-.133.296-.346.445-.519.149-.173.198-.297.297-.495.099-.197.05-.372-.025-.52-.075-.148-.667-1.611-.913-2.207-.242-.58-.49-.501-.667-.51l-.57-.009c-.198 0-.52.074-.792.372s-1.04 1.017-1.04 2.478c0 1.46 1.065 2.874 1.214 3.073.148.197 2.102 3.203 5.1 4.267.713.244 1.268.39 1.702.5.715.183 1.368.158 1.883.096.574-.067 1.75-.716 2-.140.247.574.247 1.068.173 1.159z" />
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">WhatsApp</h3>
                    <p className="text-gray-600">
                      +91 97017 58170<br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">
                      groupbofficersacademy@gmail.com<br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-xl">🕒</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">
                      Open 24 hours a day, 7 days a week for your convenience on WhatsApp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Academy Details */}
              <div className="mt-12 bg-gradient-to-br from-blue-50 to-white rounded-2xl p-10 shadow-2xl border border-gray-100">
                <h3 className="text-3xl font-extrabold text-blue-800 mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" />
                  </svg>
                  About Our Academy
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600 text-2xl shadow-sm">
                      <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 016 6v2a6 6 0 01-2 4.472V18a2 2 0 11-4 0v-3.528A6 6 0 014 10V8a6 6 0 016-6z" /></svg>
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Instructors</h4>
                      <p className="text-gray-700">Team of highly experienced officers and professional trainers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-500 text-2xl shadow-sm">
                      <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M9 12l2 2 4-4"/><path d="M7 15a7 7 0 1014 0A7 7 0 007 15zm7 0l3-3"/></svg>
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900">Specialization</h4>
                      <p className="text-gray-700">Preparation for AOM LDCE and other Group B competitive exams</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Training Highlights</h4>
                    <ul className="grid sm:grid-cols-2 gap-3 list-none p-0">
                      <li className="flex items-center gap-2 bg-blue-100 rounded-lg px-4 py-2">
                        <span className="text-blue-600 text-xl">&#128483;</span>
                        <span className="font-semibold text-blue-800">Interactive Online Live Classes</span>
                      </li>
                      <li className="flex items-center gap-2 bg-green-100 rounded-lg px-4 py-2">
                        <span className="text-green-600 text-xl">&#128221;</span>
                        <span className="font-semibold text-green-800">Topic-wise Practice Sessions</span>
                      </li>
                      <li className="flex items-center gap-2 bg-purple-100 rounded-lg px-4 py-2">
                        <span className="text-purple-600 text-xl">&#9201;</span>
                        <span className="font-semibold text-purple-800">Bi-Weekly Evaluation Tests</span>
                      </li>
                      <li className="flex items-center gap-2 bg-pink-100 rounded-lg px-4 py-2">
                        <span className="text-pink-600 text-xl">&#127942;</span>
                        <span className="font-semibold text-pink-800">Full-length Mock Exams</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Logo Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-200 to-orange-200 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-amber-100">
                <Image 
                  src="/images/logo-in-contact.jpg" 
                  alt="Group B Officers Academy Contact Information" 
                  width={600}
                  height={400}
                  className="max-w-full h-auto rounded-xl shadow-lg"
                  priority
                />
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Group B Officers Academy
                  </h3>
                  <p className="text-gray-600 text-lg">
                    Your Gateway to Success
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Links
            </h2>
            <p className="text-xl text-gray-600">
              Find what you&apos;re looking for quickly
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Information</h3>
              <p className="text-gray-600">Learn about our AOM LDCE preparation courses and curriculum</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule</h3>
              <p className="text-gray-600">Check our class schedules and upcoming sessions</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600">Get help with your queries and technical support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact