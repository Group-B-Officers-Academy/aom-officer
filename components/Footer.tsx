'use client'

import { useState, useEffect } from 'react'

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0)

  useEffect(() => {
    const trackVisitor = async () => {
      // Check if this is a new session (first time visiting in this browser session)
      const sessionKey = 'visitorSession'
      const hasVisitedThisSession = sessionStorage.getItem(sessionKey)
      
      if (!hasVisitedThisSession) {
        try {
          // Increment visitor count on server
          const response = await fetch('/api/visitor-count', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          
          if (response.ok) {
            const data = await response.json()
            setVisitorCount(data.count)
            
            // Store in localStorage as backup
            localStorage.setItem('visitorCount', data.count.toString())
          } else {
            // Fallback to localStorage if server fails
            const storedCount = localStorage.getItem('visitorCount')
            const currentCount = storedCount ? parseInt(storedCount) : 0
            const newCount = currentCount + 1
            setVisitorCount(newCount)
            localStorage.setItem('visitorCount', newCount.toString())
          }
          
          // Mark this session as visited
          sessionStorage.setItem(sessionKey, 'true')
        } catch (error) {
          console.error('Error tracking visitor:', error)
          // Fallback to localStorage
          const storedCount = localStorage.getItem('visitorCount')
          const currentCount = storedCount ? parseInt(storedCount) : 0
          const newCount = currentCount + 1
          setVisitorCount(newCount)
          localStorage.setItem('visitorCount', newCount.toString())
          sessionStorage.setItem(sessionKey, 'true')
        }
      } else {
        // Load existing count from server
        try {
          const response = await fetch('/api/visitor-count')
          if (response.ok) {
            const data = await response.json()
            setVisitorCount(data.count)
          } else {
            // Fallback to localStorage
            const storedCount = localStorage.getItem('visitorCount')
            const currentCount = storedCount ? parseInt(storedCount) : 0
            setVisitorCount(currentCount)
          }
        } catch (error) {
          console.error('Error fetching visitor count:', error)
          // Fallback to localStorage
          const storedCount = localStorage.getItem('visitorCount')
          const currentCount = storedCount ? parseInt(storedCount) : 0
          setVisitorCount(currentCount)
        }
      }
    }

    trackVisitor()
  }, [])

  return (
    <footer className="bg-gray-900 text-white lg:py-8 py-4 lg:px-6 px-4 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm text-center mb-4 md:mb-0">
               Group B Officers Academy Copyright © {new Date().getFullYear()}. <br/> All rights reserved.
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <div className="text-gray-400 text-sm">
                Total Visitors: <span className="text-white font-semibold">{visitorCount.toLocaleString()}</span>
              </div>
              
            </div>
          </div>
    </footer>
  )
}

export default Footer
