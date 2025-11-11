'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'
import { z } from 'zod'

// Zod validation schema for login
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email or phone number is required')
    .refine(
      (val) => {
        // Check if it's an email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // Check if it's a 10-digit phone number
        const phoneRegex = /^[0-9]{10}$/
        return emailRegex.test(val) || phoneRegex.test(val)
      },
      {
        message: 'Please enter a valid email address or 10-digit phone number'
      }
    ),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
})

// Zod validation schema for forgot password
const forgotPasswordSchema = z.object({
  emailOrPhone: z.string()
    .min(1, 'Email or phone number is required')
    .refine(
      (val) => {
        // Check if it's an email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        // Check if it's a 10-digit phone number
        const phoneRegex = /^[0-9]{10}$/
        return emailRegex.test(val) || phoneRegex.test(val)
      },
      {
        message: 'Please enter a valid email address or 10-digit phone number'
      }
    ),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

const extractErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === 'string' && error.trim() !== '') {
    return error
  }

  if (Array.isArray(error)) {
    const joined = error
      .map((item) => (typeof item === 'string' ? item.trim() : ''))
      .filter((item) => item.length > 0)
      .join(', ')

    if (joined.length > 0) {
      return joined
    }
  }

  if (error && typeof error === 'object') {
    const candidateKeys = ['message', 'title', 'error', 'detail', 'note']

    for (const key of candidateKeys) {
      const value = (error as Record<string, unknown>)[key]
      if (typeof value === 'string' && value.trim() !== '') {
        return value
      }
    }

    if ('reasons' in (error as Record<string, unknown>) && Array.isArray((error as Record<string, unknown>).reasons)) {
      const reasons = (error as { reasons?: unknown[] }).reasons ?? []
      const formattedReasons = reasons
        .map((reason) => (typeof reason === 'string' ? reason.trim() : ''))
        .filter((reason) => reason.length > 0)
        .join(', ')

      if (formattedReasons.length > 0) {
        return formattedReasons
      }
    }
  }

  return fallback
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordData, setForgotPasswordData] = useState({
    emailOrPhone: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [forgotPasswordErrors, setForgotPasswordErrors] = useState<Record<string, string>>({})
  const [isResetting, setIsResetting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submitting
    if (!validateForm()) {
      toast.error('Please fix the errors in the form', {
        duration: 5000,
      })
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Check if it's admin login
        if (result.isAdmin) {
          // Store admin session in both localStorage (for client-side) and cookies (for middleware)
          const adminData = { username: 'adminaom', role: 'admin' }
          localStorage.setItem('adminSession', JSON.stringify(adminData))
          
          // Set cookie for middleware
          document.cookie = `adminSession=${encodeURIComponent(JSON.stringify(adminData))}; path=/; max-age=86400; SameSite=Strict`
          
          // Dispatch custom event to notify Navbar about admin session update
          window.dispatchEvent(new Event('adminSessionUpdated'))
          
          toast.success('Login Successfully! Redirecting to admin dashboard...')
          router.push('/admin/dashboard')
          return
        }
        
        // Store user session in both localStorage and cookies
        const userData = {
          email: result.user.email,
          userType: result.user.userType,
          name: result.user.name
        }
        localStorage.setItem('userSession', JSON.stringify(userData))
        
        // Set cookie for middleware
        document.cookie = `userSession=${encodeURIComponent(JSON.stringify(userData))}; path=/; max-age=86400; SameSite=Strict`
        
        // Dispatch custom event to notify Navbar about user session update
        window.dispatchEvent(new Event('adminSessionUpdated'))
        
        toast.success('Login Successfully!')
        // Here you can redirect to dashboard or store user data
        console.log('User data:', result.user)
        
        // Check if there's a redirect parameter
        const searchParams = new URLSearchParams(window.location.search)
        const redirectPath = searchParams.get('redirect')
        
        // Redirect to home page or the requested page
        router.push(redirectPath || '/')
      } else {
        // Show error message with better visibility
        const errorMessage = extractErrorMessage(result.error, 'Invalid credentials. Please try again.')
        
        // Increase duration for longer error messages
        const duration = errorMessage.length > 50 ? 10000 : 7000
        
        toast.error(errorMessage, {
          duration: duration,
          style: {
            background: '#fee',
            color: '#c33',
            fontSize: '14px',
            fontWeight: '500',
            padding: '14px 18px',
            marginTop: '10px',
            maxWidth: '400px',
          }
        })
      }
    } catch (error) {
      console.error('Error during login:', error)
      toast.error('Unable to connect to server. Please check your internet connection and try again.', {
        duration: 8000,
        style: {
          background: '#fee',
          color: '#c33',
          fontSize: '14px',
          fontWeight: '500',
          padding: '14px 18px',
          marginTop: '10px',
          maxWidth: '400px',
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Limit phone input to 10 digits and only allow numbers if it looks like a phone number
    let processedValue = value
    if (name === 'email' && /^\d*$/.test(value)) {
      // If only digits are entered, treat as phone number and limit to 10 digits
      processedValue = value.replace(/\D/g, '').slice(0, 10)
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
      loginSchema.parse(formData)
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

  const handleForgotPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Limit phone input to 10 digits and only allow numbers if it looks like a phone number
    let processedValue = value
    if (name === 'emailOrPhone' && /^\d*$/.test(value)) {
      // If only digits are entered, treat as phone number and limit to 10 digits
      processedValue = value.replace(/\D/g, '').slice(0, 10)
    }
    
    setForgotPasswordData({
      ...forgotPasswordData,
      [name]: processedValue
    })
    
    // Clear error for this field when user starts typing
    if (forgotPasswordErrors[name]) {
      setForgotPasswordErrors({
        ...forgotPasswordErrors,
        [name]: ''
      })
    }
  }

  const validateForgotPasswordForm = (): boolean => {
    try {
      forgotPasswordSchema.parse(forgotPasswordData)
      setForgotPasswordErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        const zodError = error as z.ZodError<typeof forgotPasswordData>
        zodError.issues.forEach((err: z.ZodIssue) => {
          const field = err.path[0] as string
          fieldErrors[field] = err.message
        })
        setForgotPasswordErrors(fieldErrors)
      }
      return false
    }
  }

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form before submitting
    if (!validateForgotPasswordForm()) {
      toast.error('Please fix the errors in the form', {
        duration: 5000,
      })
      return
    }
    
    setIsResetting(true)
    
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: forgotPasswordData.emailOrPhone,
          newPassword: forgotPasswordData.newPassword
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Password reset successfully! You can now login with your new password.', {
          duration: 5000,
        })
        // Close modal and populate login form
        setShowForgotPassword(false)
        setFormData({
          email: forgotPasswordData.emailOrPhone,
          password: ''
        })
        setForgotPasswordData({
          emailOrPhone: '',
          newPassword: '',
          confirmPassword: ''
        })
        setForgotPasswordErrors({})
      } else {
        toast.error(extractErrorMessage(result.error, 'Failed to reset password. Please try again.'), {
          duration: 7000,
        })
      }
    } catch (error) {
      console.error('Error resetting password:', error)
      toast.error('Unable to connect to server. Please check your internet connection and try again.', {
        duration: 8000,
      })
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#363636',
            fontSize: '14px',
            padding: '12px 16px',
          },
          error: {
            style: {
              background: '#fee',
              color: '#c33',
              fontWeight: '500',
            },
            duration: 10000, // 10 seconds for error messages
          },
          success: {
            duration: 3000,
          },
        }}
      />
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="mx-auto h-24 w-24 relative mb-6">
            <Image
              src="/logo.jpg"
              alt="Group B Officers Academy"
              fill
              className="rounded-full shadow-lg"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-lg text-gray-600">
            Sign in to your academy account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email or Phone number <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter your email or 10-digit phone number"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

         

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Academy Info */}
        {/* <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              New to Our Academy?
            </h3>
            <p className="text-gray-600 mb-4">
              Join our intensive crash course for AOM LDCE examination preparation
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                View Courses
              </button>
              <button className="flex-1 border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-medium">
                Contact Us
              </button>
            </div>
          </div>
        </div> */}


      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Reset Password
              </h2>
              <button
                onClick={() => {
                  setShowForgotPassword(false)
                  setForgotPasswordData({
                    emailOrPhone: '',
                    newPassword: '',
                    confirmPassword: ''
                  })
                  setForgotPasswordErrors({})
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form 
              onSubmit={handleForgotPasswordSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  Email or Phone number <span className="text-red-500">*</span>
                </label>
                <input
                  id="emailOrPhone"
                  name="emailOrPhone"
                  type="text"
                  required
                  value={forgotPasswordData.emailOrPhone}
                  onChange={handleForgotPasswordChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                    forgotPasswordErrors.emailOrPhone 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Enter your email or 10-digit phone number"
                />
                {forgotPasswordErrors.emailOrPhone && (
                  <p className="mt-1 text-sm text-red-600">{forgotPasswordErrors.emailOrPhone}</p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={forgotPasswordData.newPassword}
                  onChange={handleForgotPasswordChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                    forgotPasswordErrors.newPassword 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Enter new password"
                />
                {forgotPasswordErrors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{forgotPasswordErrors.newPassword}</p>
                )}
                {!forgotPasswordErrors.newPassword && (
                  <p className="mt-1 text-xs text-gray-500">Must contain at least 8 characters with uppercase, lowercase, and number</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={forgotPasswordData.confirmPassword}
                  onChange={handleForgotPasswordChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors ${
                    forgotPasswordErrors.confirmPassword 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  placeholder="Confirm new password"
                />
                {forgotPasswordErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{forgotPasswordErrors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isResetting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isResetting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Resetting password...
                  </div>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login