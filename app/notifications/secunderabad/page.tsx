'use client'
import React from 'react'

const Secunderabad = () => {
  const notifications = [
    {
      id: 1,
      title: 'Chief Controller in Level - 7',
      pdfName: 'Chief Controller SC.pdf',
      publishedDate: '24-10-2025',
      lastDate: '04.11.2025',
      description: 'Filling up the vacancies of Chief Controller in Level - 7 of 7th CPC against 50% LDCE Quota of Operating Department in Secunderabad Division through CBT - Reg.'
    },
    
  ]

  const handleDownload = (pdfName: string) => {
    // Create a temporary download link
    const link = document.createElement('a')
    link.href = `/notifications/secunderabad/${pdfName}`
    link.download = pdfName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="lg:text-4xl text-xl font-bold text-gray-900 mb-4">
            Notifications in Secunderabad Division
          </h1>
          <p className="lg:text-lg text-base text-gray-600">
            Stay updated with the latest notifications and announcements for Secunderabad Division
          </p>
        </div>

        {/* Notifications Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Card Header */}
              <div className="bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/20 rounded-lg p-2">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">
                        {notification.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-3">
                    {notification.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 text-xs">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Published Date: {notification.publishedDate}
                    </div>
                    <div className="flex items-center text-red-600 text-xs font-semibold">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Last Date: {notification.lastDate}
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(notification.pdfName)}
                  className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Download Notification</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 rounded-lg p-3">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Important Information
              </h3>
              <p className="text-gray-600 text-sm">
                Please ensure you have the latest version of Adobe Acrobat Reader to view and download the notifications. 
                For any queries regarding the notifications, please contact the respective department.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Secunderabad
