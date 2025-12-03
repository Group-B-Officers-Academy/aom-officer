// 'use client'
// import React, { useEffect, useState, useRef } from 'react'
// import { Document, Page, pdfjs } from 'react-pdf'
// import 'react-pdf/dist/Page/AnnotationLayer.css'
// import 'react-pdf/dist/Page/TextLayer.css'

// // Set up PDF.js worker - using jsdelivr CDN with https protocol (more reliable)
// if (typeof window !== 'undefined') {
//   pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
// }

// interface PDFViewerProps {
//   pageNumber: number
//   scale: number
//   onDocumentLoadSuccess: (data: { numPages: number }) => void
//   onPrevPage?: () => void
//   onNextPage?: () => void
// }

// const PDFViewer: React.FC<PDFViewerProps> = ({ pageNumber, scale, onDocumentLoadSuccess, onPrevPage, onNextPage }) => {
//   const isClient = typeof window !== 'undefined'
//   const [pageWidth, setPageWidth] = useState<number | undefined>(undefined)

//   const containerRef = useRef<HTMLDivElement>(null)
//   const touchStartX = useRef<number>(0)
//   const touchStartY = useRef<number>(0)
//   const touchEndX = useRef<number>(0)
//   const touchEndY = useRef<number>(0)

//   useEffect(() => {
//     // Ensure client-side setup
//     if (typeof window !== 'undefined') {
//       // Set worker source again in useEffect to ensure it's set
//       pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
      
//       // Set page width for mobile
//       const updateWidth = () => {
//         if (window.innerWidth < 640) {
//           setPageWidth(window.innerWidth - 40)
//         } else {
//           setPageWidth(undefined)
//         }
//       }
//       updateWidth()
//       window.addEventListener('resize', updateWidth)
      
//       const container = containerRef.current
//       if (!container) {
//         return () => {
//           window.removeEventListener('resize', updateWidth)
//         }
//       }

//       // Disable copy, paste, and right-click only within PDF container
//       const handleContextMenu = (e: MouseEvent) => {
//         if (container.contains(e.target as Node)) {
//           e.preventDefault()
//           return false
//         }
//       }

//       const handleCopy = (e: ClipboardEvent) => {
//         if (container.contains(e.target as Node)) {
//           e.preventDefault()
//           return false
//         }
//       }

//       const handleCut = (e: ClipboardEvent) => {
//         if (container.contains(e.target as Node)) {
//           e.preventDefault()
//           return false
//         }
//       }

//       const handleKeyDown = (e: KeyboardEvent) => {
//         // Prevent screenshot shortcuts globally
//         // Print Screen key
//         if (e.key === 'PrintScreen' || e.keyCode === 44) {
//           e.preventDefault()
//           e.stopPropagation()
//           return false
//         }
        
//         // Windows + Shift + S (Snipping Tool)
//         if (e.key === 's' || e.key === 'S') {
//           if ((e.metaKey || e.ctrlKey) && e.shiftKey) {
//             e.preventDefault()
//             e.stopPropagation()
//             return false
//           }
//         }
        
//         // Windows + G (Game Bar)
//         if (e.key === 'g' || e.key === 'G') {
//           if (e.metaKey || e.ctrlKey) {
//             e.preventDefault()
//             e.stopPropagation()
//             return false
//           }
//         }
        
//         // F12, Ctrl+Shift+I, Ctrl+Shift+J (Developer Tools)
//         if (e.key === 'F12' || e.keyCode === 123) {
//           e.preventDefault()
//           e.stopPropagation()
//           return false
//         }
        
//         if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
//           if (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c') {
//             e.preventDefault()
//             e.stopPropagation()
//             return false
//           }
//         }
        
//         // Ctrl+U (View Source)
//         if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
//           e.preventDefault()
//           e.stopPropagation()
//           return false
//         }
        
//         // Ctrl+P (Print)
//         if ((e.ctrlKey || e.metaKey) && (e.key === 'P' || e.key === 'p')) {
//           e.preventDefault()
//           e.stopPropagation()
//           return false
//         }
        
//         // Only block copy/paste if focus is within PDF container
//         if (container.contains(document.activeElement)) {
//           // Disable Ctrl+C, Ctrl+A, Ctrl+V, Ctrl+X, Cmd+C, Cmd+A, Cmd+V, Cmd+X
//           if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'x' || e.key === 'X' || e.key === 'a' || e.key === 'A')) {
//             e.preventDefault()
//             return false
//           }
//         }
//       }

//       const handleSelectStart = (e: Event) => {
//         if (container.contains(e.target as Node)) {
//           e.preventDefault()
//           return false
//         }
//       }

//       const handleDragStart = (e: DragEvent) => {
//         if (container.contains(e.target as Node)) {
//           e.preventDefault()
//           return false
//         }
//       }

//       // Prevent print dialog
//       const handleBeforePrint = (e: Event) => {
//         e.preventDefault()
//         return false
//       }

//       // Detect visibility change (user switching apps - might be taking screenshot)
//       const handleVisibilityChange = () => {
//         if (document.hidden && container) {
//           // Page is hidden - could be screenshot
//           container.style.opacity = '0'
//           setTimeout(() => {
//             if (container) {
//               container.style.opacity = '1'
//             }
//           }, 100)
//         }
//       }

//       // Add event listeners
//       document.addEventListener('contextmenu', handleContextMenu)
//       document.addEventListener('copy', handleCopy, true)
//       document.addEventListener('cut', handleCut, true)
//       document.addEventListener('keydown', handleKeyDown, true)
//       document.addEventListener('selectstart', handleSelectStart, true)
//       document.addEventListener('dragstart', handleDragStart, true)
//       window.addEventListener('beforeprint', handleBeforePrint)
//       document.addEventListener('visibilitychange', handleVisibilityChange)

//       // Cleanup
//       return () => {
//         window.removeEventListener('resize', updateWidth)
//         document.removeEventListener('contextmenu', handleContextMenu)
//         document.removeEventListener('copy', handleCopy, true)
//         document.removeEventListener('cut', handleCut, true)
//         document.removeEventListener('keydown', handleKeyDown, true)
//         document.removeEventListener('selectstart', handleSelectStart, true)
//         document.removeEventListener('dragstart', handleDragStart, true)
//         window.removeEventListener('beforeprint', handleBeforePrint)
//         document.removeEventListener('visibilitychange', handleVisibilityChange)
//       }
//     }
//   }, [])

//   if (!isClient) {
//     return (
//       <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[600px] w-full">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-sm sm:text-base">Loading PDF...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{
//         __html: `
//           .pdf-viewer-container,
//           .pdf-viewer-container *,
//           .pdf-viewer-container *::before,
//           .pdf-viewer-container *::after {
//             user-select: none !important;
//             -webkit-user-select: none !important;
//             -moz-user-select: none !important;
//             -ms-user-select: none !important;
//             -webkit-touch-callout: none !important;
//             -webkit-user-drag: none !important;
//             -khtml-user-drag: none !important;
//             -moz-user-drag: none !important;
//             -o-user-drag: none !important;
//             user-drag: none !important;
//             pointer-events: auto !important;
//             -webkit-tap-highlight-color: transparent !important;
//           }
//           .pdf-viewer-container ::selection,
//           .pdf-viewer-container *::selection {
//             background: transparent !important;
//           }
//           .pdf-viewer-container ::-moz-selection,
//           .pdf-viewer-container *::-moz-selection {
//             background: transparent !important;
//           }
//           .pdf-viewer-container img,
//           .pdf-viewer-container canvas,
//           .pdf-viewer-container video {
//             pointer-events: none !important;
//             -webkit-user-drag: none !important;
//             -khtml-user-drag: none !important;
//             -moz-user-drag: none !important;
//             -o-user-drag: none !important;
//             user-drag: none !important;
//           }
//           @media print {
//             .pdf-viewer-container,
//             .pdf-viewer-container * {
//               display: none !important;
//             }
//           }
//           @media screen {
//             @media (max-width: 768px) {
//               .pdf-viewer-container {
//                 -webkit-touch-callout: none !important;
//                 -webkit-user-select: none !important;
//               }
//             }
//           }
//         `
//       }} />
//       <div 
//         ref={containerRef}
//         className="pdf-viewer-container"
//         style={{
//           userSelect: 'none',
//           WebkitUserSelect: 'none',
//           MozUserSelect: 'none',
//           msUserSelect: 'none',
//           pointerEvents: 'auto',
//         }}
//         onContextMenu={(e) => e.preventDefault()}
//         onCopy={(e) => e.preventDefault()}
//         onCut={(e) => e.preventDefault()}
//         onDragStart={(e) => e.preventDefault()}
//         onTouchStart={(e) => {
//           const touch = e.touches[0]
//           touchStartX.current = touch.clientX
//           touchStartY.current = touch.clientY
//         }}
//         onTouchEnd={(e) => {
//           const touch = e.changedTouches[0]
//           touchEndX.current = touch.clientX
//           touchEndY.current = touch.clientY
          
//           // Calculate swipe distance
//           const deltaX = touchEndX.current - touchStartX.current
//           const deltaY = touchEndY.current - touchStartY.current
          
//           // Minimum swipe distance (50px)
//           const minSwipeDistance = 50
          
//           // Check if it's a horizontal swipe (not vertical scrolling)
//           if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
//             if (deltaX > 0 && onPrevPage) {
//               // Swipe right - go to previous page
//               onPrevPage()
//             } else if (deltaX < 0 && onNextPage) {
//               // Swipe left - go to next page
//               onNextPage()
//             }
//           }
//         }}
//       >
//         <Document
//           file="/materials/LONG HAUL SUMMARY.pdf"
//           onLoadSuccess={onDocumentLoadSuccess}
//           loading={
//             <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[600px] w-full">
//               <div className="text-center">
//                 <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//                 <p className="text-gray-600 text-sm sm:text-base">Loading PDF...</p>
//               </div>
//             </div>
//           }
//         >
//           <Page
//             pageNumber={pageNumber}
//             scale={scale}
//             renderTextLayer={false}
//             renderAnnotationLayer={true}
//             className="shadow-lg max-w-full"
//             width={pageWidth}
//           />
//         </Document>
//       </div>
//     </>
//   )
// }

// export default PDFViewer

