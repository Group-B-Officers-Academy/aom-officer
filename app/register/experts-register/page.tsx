'use client'
import React, { useState } from 'react'
import { useToast } from '../../../components/Toast'
import { z } from 'zod'

// Zod validation schema
const expertSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\.\-']+$/, 'Name can only contain letters, spaces, dots, hyphens, and apostrophes'),
  designation: z.string()
    .min(2, 'Designation must be at least 2 characters')
    .max(100, 'Designation must be less than 100 characters'),
  workingPost: z.string()
    .max(200, 'Working post must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  department: z.string()
    .min(1, 'Please select a department')
    .refine(val => ['Operating', 'Commercial', 'Engineering', 'S&T', 'Personnel', 'Accounts', 'Mechanical', 'Electrical', 'Others'].includes(val), {
      message: 'Please select a valid department'
    }),
  preparingFor: z.string()
    .max(50, 'Post must be less than 50 characters')
    .optional()
    .or(z.literal('')),
  division: z.string()
    .max(100, 'Division must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  zone: z.string()
    .max(100, 'Zone must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  phone: z.string()
    .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  address: z.string()
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
})

const ExpertsRegister = () => {
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    workingPost: '',
    department: '',
    preparingFor: '',
    division: '',
    zone: '',
    phone: '',
    address: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Limit phone number to exactly 10 digits and only allow numbers
    let processedValue = value
    if (name === 'phone') {
      // Remove all non-numeric characters
      processedValue = value.replace(/\D/g, '')
      // Limit to 10 digits
      if (processedValue.length > 10) {
        processedValue = processedValue.slice(0, 10)
      }
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    })
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = (): boolean => {
    try {
      expertSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        const zodError = error as z.ZodError<typeof formData>
        zodError.issues.forEach((err: z.ZodIssue) => {
          const field = err.path[0] as string
          fieldErrors[field] = err.message
        })
        setErrors(fieldErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submitting
    if (!validateForm()) {
      addToast('Please fix the errors in the form', 'error', 5000)
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/experts-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        addToast('Expert Registration sent successfully! We will review your application and get back to you soon.', 'success', 5000)
        // Reset form
        setFormData({
          name: '',
          designation: '',
          workingPost: '',
          department: '',
          preparingFor: '',
          division: '',
          zone: '',
          phone: '',
          address: '',
          email: '',
          password: ''
        })
        setErrors({})
      } else {
        addToast(`Error: ${result.error}`, 'error', 5000)
      }
    } catch (error) {
      console.error('Error submitting registration:', error)
      addToast('Failed to complete registration. Please try again.', 'error', 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 mb-4">
            Experts Registration
          </h1>
          <p className="text-gray-600 text-lg">Join Group B Officers Academy and start your journey</p>
          <div className="mt-4 w-24 h-1 bg-linear-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 backdrop-blur-sm bg-opacity-95 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.name ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                } transition-all duration-200 outline-none hover:border-gray-300`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Designation */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.designation ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  } transition-all duration-200 outline-none hover:border-gray-300`}
                  placeholder="Your designation"
                />
                {errors.designation && (
                  <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
                )}
              </div>

              {/* Department */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.department ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  } transition-all duration-200 outline-none hover:border-gray-300 bg-white cursor-pointer`}
                >
                  <option value="">Select Department</option>
                  <option value="Operating">Operating</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Engineering">Engineering</option>
                  <option value="S&T">S&T</option>
                  <option value="Personnel">Personnel</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Others">Others</option>
                </select>
                {errors.department && (
                  <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                )}
              </div>
            </div>

            {/* Working Post */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Working Post (Deputation if any)
              </label>
              <input
                type="text"
                name="workingPost"
                value={formData.workingPost}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.workingPost ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                } transition-all duration-200 outline-none hover:border-gray-300`}
                placeholder="Enter working post or deputation details"
              />
              {errors.workingPost && (
                <p className="mt-1 text-sm text-red-600">{errors.workingPost}</p>
              )}
            </div>

            {/* Expert for the post */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Expert for the post
              </label>
              <select
                name="preparingFor"
                value={formData.preparingFor}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none hover:border-gray-300 bg-white cursor-pointer"
              >
                <option value="">Select Post</option>
                <option value="AOM">AOM</option>
                <option value="ACM">ACM</option>
                <option value="ADEN">ADEN</option>
                <option value="ADSTE">ADSTE</option>
                <option value="APO">APO</option>
                <option value="AFM">AFM</option>
                <option value="ADMI">ADMI</option>
                <option value="ADEE">ADEE</option>
              </select>
            </div>

            {/* Three Column Layout */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Division */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  Division
                </label>
                <input
                  type="text"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none hover:border-gray-300"
                  placeholder="Division"
                />
              </div>

              {/* Zone */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  Zone
                </label>
                <input
                  type="text"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none hover:border-gray-300"
                  placeholder="Zone"
                />
              </div>

              {/* Phone */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  maxLength={10}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                  } transition-all duration-200 outline-none hover:border-gray-300`}
                  placeholder="Enter 10 digit phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.address ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                } transition-all duration-200 outline-none hover:border-gray-300 resize-none`}
                placeholder="Enter your complete address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.email ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                } transition-all duration-200 outline-none hover:border-gray-300`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 rounded-lg border-2 ${
                  errors.password ? 'border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                } transition-all duration-200 outline-none hover:border-gray-300`}
                placeholder="Create a secure password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
              {!errors.password && (
                <p className="mt-1 text-xs text-gray-500">Must contain at least 8 characters with uppercase, lowercase, and number</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Expert Registration'}
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-sm text-gray-500 mt-6">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ExpertsRegister