'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        const errorMessage = result.error || 'Invalid credentials. Please try again.'
        
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
                Email or Phone number
              </label>
              <input
                id="email"
                name="email"
                type="text"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your email or Phone number"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
              />
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
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Forgot your password?
                </a>
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
        <div className="bg-white rounded-xl p-6 shadow-lg">
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
        </div>
      </div>
    </div>
  )
}

export default Login