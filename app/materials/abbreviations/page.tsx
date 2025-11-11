'use client'
import React, { useState, useMemo, useDeferredValue, useEffect } from 'react'
import { abbreviations } from '@/assets/abbreviations'

// Type for abbreviation items
type AbbreviationItem = {
  acronym: string;
  fullForm: string;
  explanation?: string;
  reference?: string;
}

const Abbreviations = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const deferredSearchTerm = useDeferredValue(searchTerm)
  const [reduceMotion, setReduceMotion] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileViewportQuery = window.matchMedia('(max-width: 768px)')

    const updateReduceMotion = () => {
      setReduceMotion(prefersReducedMotionQuery.matches || mobileViewportQuery.matches)
    }

    updateReduceMotion()

    if (typeof prefersReducedMotionQuery.addEventListener === 'function') {
      prefersReducedMotionQuery.addEventListener('change', updateReduceMotion)
    } else if (typeof prefersReducedMotionQuery.addListener === 'function') {
      prefersReducedMotionQuery.addListener(updateReduceMotion)
    }

    if (typeof mobileViewportQuery.addEventListener === 'function') {
      mobileViewportQuery.addEventListener('change', updateReduceMotion)
    } else if (typeof mobileViewportQuery.addListener === 'function') {
      mobileViewportQuery.addListener(updateReduceMotion)
    }

    return () => {
      if (typeof prefersReducedMotionQuery.removeEventListener === 'function') {
        prefersReducedMotionQuery.removeEventListener('change', updateReduceMotion)
      } else if (typeof prefersReducedMotionQuery.removeListener === 'function') {
        prefersReducedMotionQuery.removeListener(updateReduceMotion)
      }

      if (typeof mobileViewportQuery.removeEventListener === 'function') {
        mobileViewportQuery.removeEventListener('change', updateReduceMotion)
      } else if (typeof mobileViewportQuery.removeListener === 'function') {
        mobileViewportQuery.removeListener(updateReduceMotion)
      }
    }
  }, [])

  // Filter abbreviations based on search term
  const filteredAbbreviations = useMemo(() => {
    if (!deferredSearchTerm.trim()) {
      return abbreviations
    }

    const filtered: Record<string, AbbreviationItem[]> = {}
    const searchLower = deferredSearchTerm.toLowerCase()

    Object.entries(abbreviations).forEach(([letter, items]) => {
      const filteredItems = items.filter((item) => {
        const acronymMatch = item.acronym?.toLowerCase().includes(searchLower)
        const fullFormMatch = item.fullForm?.toLowerCase().includes(searchLower)
        const explanationMatch = item.explanation?.toLowerCase().includes(searchLower)
        const referenceMatch = item.reference?.toLowerCase().includes(searchLower)

        return acronymMatch || fullFormMatch || explanationMatch || referenceMatch
      })
      
      if (filteredItems.length > 0) {
        filtered[letter] = filteredItems
      }
    })

    return filtered
  }, [deferredSearchTerm])

  const totalAbbreviations = useMemo(() => Object.values(abbreviations).reduce((count, items) => count + items.length, 0), [])
  const filteredCount = useMemo(() => Object.values(filteredAbbreviations).reduce((count, items) => count + items.length, 0), [filteredAbbreviations])

  const enableAnimations = !reduceMotion

  return (
    <div className={enableAnimations ? 'min-h-screen bg-linear-to-r from-slate-900 via-purple-900 to-slate-900' : 'min-h-screen bg-slate-950'}>
      {/* Animated Background */}
      {enableAnimations && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="lg:text-5xl text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-blue-200 to-purple-200 mb-4">
            Indian Railways Complete Abbreviations
          </h1>
          <p className="lg:text-xl text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Comprehensive guide to Indian Railways terminology and abbreviations with detailed explanations and references.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-4 text-gray-400">
            <div className={`w-3 h-3 bg-green-500 rounded-full ${enableAnimations ? 'animate-pulse' : ''}`} />
            <span className="text-sm">{totalAbbreviations} Abbreviations</span>
          </div>
        </div>
        
        {/* Sticky Search Section */}
        <div className="sticky top-20 z-40 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              
              <input
                type="text"
                placeholder="Search Abbreviations (Example: FOIS)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-5 pr-10 py-3 ${enableAnimations ? 'bg-linear-to-r from-white/20 to-white/10 backdrop-blur-xl' : 'bg-white/10'} border border-white/30 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${enableAnimations ? 'transition-all duration-300 shadow-2xl shadow-purple-500/20' : ''} lg:text-base text-sm`}
              />
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-200"
                  tabIndex={0}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredCount}</span> of <span className="text-white font-semibold">{totalAbbreviations}</span> abbreviations
          </p>
        </div>
        
        {/* No Results */}
        {searchTerm && Object.keys(filteredAbbreviations).length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-linear-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No abbreviations found</h3>
            <p className="text-gray-400">Try adjusting your search terms</p>
          </div>
        )}
        
        {/* Abbreviations Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {Object.entries(filteredAbbreviations).map(([letter, items]) => (
            <div
              key={letter}
              className={`group relative bg-white/5 ${enableAnimations ? 'backdrop-blur-md transition-all duration-500' : ''} border border-white/10 rounded-2xl overflow-hidden`}
            >
              {/* Letter Header */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-purple-500 via-blue-500 to-indigo-600 opacity-90"></div>
                <div className="absolute inset-0 bg-linear-to-r from-white/20 via-white/10 to-transparent"></div>
                <div className="relative p-6 text-center">
                  <h2 className="text-5xl font-black text-white drop-shadow-lg mb-2">
                    {letter}
                  </h2>
                  <div className="w-16 h-1 bg-white/60 rounded-full mx-auto"></div>
                  <p className="text-white/90 text-sm font-medium mt-2">
                    {items.length} {items.length === 1 ? 'Term' : 'Terms'}
                  </p>
                </div>
              </div>
              
              {/* Content */}
              <div className="py-6 lg:px-6 px-2">
                <div className="space-y-4">
                  {items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className={`group/item bg-linear-to-r from-white/5 to-white/10 ${enableAnimations ? 'backdrop-blur-sm' : ''} rounded-lg p-4 ${enableAnimations ? 'hover:bg-linear-to-r hover:from-purple-500/20 hover:to-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:border-purple-400/30' : ''} border border-white/10`}
                    >
                      {/* Acronym and Full Form Header */}
                      <div className="mb-3">
                        <h3 className={`font-bold text-white text-lg ${enableAnimations ? 'group-hover/item:text-purple-200 transition-colors' : ''} mb-1`}>
                          {item.acronym}
                        </h3>
                        <p className={`text-gray-300 text-sm leading-relaxed ${enableAnimations ? 'group-hover/item:text-gray-200' : ''}`}>
                          {item.fullForm}
                        </p>
                      </div>
                      
                      {/* Explanation Section */}
                      {item.explanation && (
                        <div className="mb-3 p-3 bg-linear-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                          <div className="mb-2">
                            <span className="text-blue-400 text-xs font-semibold uppercase tracking-wide">Explanation</span>
                          </div>
                          <p className="text-gray-200 text-sm leading-relaxed">
                            {item.explanation}
                          </p>
                        </div>
                      )}
                      
                      {/* Reference Section */}
                      {item.reference && (
                        <div className="flex items-center justify-between">
                          <span className="text-green-400 text-sm font-medium">Reference</span>
                          <span className="text-green-300 text-xs font-medium">
                            {item.reference}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Abbreviations