// 'use client'
// import React, { useState, useEffect } from 'react'
// import Image from 'next/image'

// const Home = () => {
//   const [userInfo, setUserInfo] = useState<{name?: string, email?: string} | null>(null)

//   // Check user session on mount and listen for changes
//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const userSession = localStorage.getItem('userSession')
      
//       if (userSession) {
//         try {
//           const userData = JSON.parse(userSession)
//           setUserInfo({ name: userData.name, email: userData.email })
//         } catch {
//           setUserInfo(null)
//         }
//       } else {
//         setUserInfo(null)
//       }
//     }

//     checkLoginStatus()
    
//     // Listen for session updates
//     window.addEventListener('adminSessionUpdated', checkLoginStatus)
//     window.addEventListener('storage', checkLoginStatus)

//     return () => {
//       window.removeEventListener('adminSessionUpdated', checkLoginStatus)
//       window.removeEventListener('storage', checkLoginStatus)
//     }
//   }, [])

//   return (
//     <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
//       {/* User Welcome Message - Top Right */}
//       {userInfo && (
//         <div className="fixed top-16 md:top-20 right-2 md:right-4 z-50 animate-fade-in">
//           <div className="relative">
//             <div className="absolute inset-0 bg-linear-to-r from-blue-400 via-purple-500 to-indigo-600 rounded-xl blur-xl opacity-40"></div>
//             <div className="relative bg-white/95 backdrop-blur-xl rounded-xl px-3 py-2 md:px-4 md:py-3 shadow-2xl border border-blue-200/50 transform hover:scale-105 transition-all duration-300">
//               <div className="flex items-center gap-2">
//                 <span className="text-xl md:text-2xl">👋</span>
//                 <div>
//                   <p className="text-xs md:text-sm text-gray-600 font-medium">Welcome</p>
//                   <p className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 truncate max-w-[120px] md:max-w-none">
//                     {userInfo.name || userInfo.email}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
      
      

      

//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
//         <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
//       </div>

      

//       {/* Our Approach to Achieve Success Section */}
//       <section className="relative py-10 overflow-hidden bg-linear-to-br from-teal-50 via-emerald-50 to-green-50">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
//           <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
//           <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
//         </div>
        
//         <div className="max-w-7xl mx-auto px-3 lg:px-8 relative">
//         <div className="text-center">
//                   <span className="px-4 py-3 bg-linear-to-r from-teal-100 to-emerald-100 text-teal-700 font-bold rounded-full lg:text-5xl text-base uppercase tracking-wide">
//                     Our Approach to Achieve Success
//                   </span>
//                 </div>
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-10">
            
//             {/* Left Side - Content */}
//             <div className="space-y-8 animate-fade-in">
//               {/* Header */}
                
//               <div className="space-y-4">
//                 <h2 className="lg:text-xl text-base font-black bg-clip-text text-transparent bg-linear-to-r from-teal-600 via-emerald-600 to-green-600 leading-tight">
//                   ✨ GROUP B OFFICERS ACADEMY ✨
//                 </h2>
//                 <p className="lg:text-xl text-base text-gray-700 font-semibold">
//                   (ASPIRE – LEARN – LEAD)
//                 </p>
//               </div>

//               {/* F.A.S.T Concept */}
//               <div className="space-y-6">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-400 rounded-xl blur-xl opacity-20"></div>
//                   <div className="relative bg-white/80 backdrop-blur-xl rounded-xl lg:p-6 p-4 shadow-lg border border-yellow-200">
//                     <p className="lg:text-2xl text-lg font-black text-gray-800 text-center">
//                       🚀 We use the concept of F.A.S.T 🚀
//                     </p>
//                   </div>
//                 </div>

//                 {/* F.A.S.T Breakdown */}
//                 <div className="grid grid-cols-1 gap-4">
//                   {/* F - FOCUS */}
//                   <div className="relative group">
//                     <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-green-500 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//                     <div className="relative bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 border border-emerald-100 hover:border-emerald-300">
//                       <div className="flex items-start gap-4">
//                         <div className="shrink-0 lg:w-12 w-10 lg:h-12 h-10 bg-linear-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
//                           <span className="lg:text-2xl text-xl">✅</span>
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="lg:text-xl text-base font-black text-gray-900 mb-2">F – FOCUS</h3>
//                           <p className="lg:text-base text-sm text-gray-700 font-medium">🎯 Concentrate on what truly matters.</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* A - ACTION */}
//                   <div className="relative group">
//                     <div className="absolute inset-0 bg-linear-to-r from-yellow-400 to-amber-500 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//                     <div className="relative bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 border border-yellow-100 hover:border-yellow-300">
//                       <div className="flex items-start gap-4">
//                         <div className="shrink-0 lg:w-12 w-10 lg:h-12 h-10 bg-linear-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
//                           <span className="lg:text-2xl text-xl">✅</span>
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="lg:text-xl text-base font-black text-gray-900 mb-2">A – ACTION</h3>
//                           <p className="lg:text-base text-sm text-gray-700 font-medium">🏃‍♂ Turn your big goals into small actionable steps.</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* S - SYSTEM */}
//                   <div className="relative group">
//                     <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-500 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//                     <div className="relative bg-white rounded-xl lg:p-5 p-4 shadow-lg hover:shadow-xl transition-all duration-500 border border-blue-100 hover:border-blue-300">
//                       <div className="flex items-start gap-4">
//                         <div className="shrink-0 lg:w-12 w-10 lg:h-12 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"> 
//                           <span className="lg:text-2xl text-xl">✅</span>
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="lg:text-xl text-base font-black text-gray-900 mb-2">S – SYSTEM</h3>
//                           <p className="lg:text-base text-sm text-gray-700 font-medium">⚙ Create a consistent routine to stay accountable.</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* T - TRACKING */}
//                   <div className="relative group">
//                     <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-500 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//                     <div className="relative bg-white rounded-xl lg:p-5 p-4 shadow-lg hover:shadow-xl transition-all duration-500 border border-purple-100 hover:border-purple-300">
//                       <div className="flex items-start gap-4">
//                         <div className="shrink-0 lg:w-12 w-10 lg:h-12 h-10 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
//                           <span className="lg:text-2xl text-xl">✅</span>
//                         </div>
//                         <div className="flex-1">
//                           <h3 className="lg:text-xl text-base font-black text-gray-900 mb-2">T – TRACKING</h3>
//                           <p className="lg:text-base text-sm text-gray-700 font-medium">📊 Measure your progress — what gets tracked, gets improved!</p>
//                         </div>  
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Bottom Messages */}
//               <div className="space-y-4">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-linear-to-r from-teal-400 to-emerald-500 rounded-xl blur-xl opacity-20"></div>
//                   <div className="relative bg-white/90 backdrop-blur-xl rounded-xl lg:p-6 p-4 shadow-lg border border-teal-200">
//                     <p className="lg:text-lg text-base font-semibold text-gray-800 text-center mb-3">
//                       💪 We focus on your actions & establish a system to track your preparation!
//                     </p>
//                     <p className="lg:text-base text-sm font-medium text-gray-700 text-center">
//                       🎓 Empowering AOM Aspirants Every Step of the Way!
//                     </p>
//                   </div>
//                 </div>

//                 {/* Contact Info */}
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-500 rounded-xl blur-xl opacity-20"></div>
//                   <div className="relative bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl lg:p-6 p-4 shadow-xl text-white">
//                     <div className="space-y-3">
//                       <p className="lg:text-lg text-base font-bold text-center">🌐 www.groupbofficersacademy.com</p>
//                       <div className="flex items-center justify-center gap-3">
//                         <span className="lg:text-2xl text-xl">📲</span>
//                         <span className="lg:text-lg text-base font-semibold">WhatsApp: 9701758170</span>
//                       </div>
//                       <p className="lg:text-sm text-xs text-center text-yellow-200 font-medium">
//                         🚫 No Phone Calls Please — Only WhatsApp Messages
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side - Image */}
//             <div className="relative flex justify-center lg:justify-end">
//               <div className="group relative">
//                 <div className="absolute inset-0 bg-linear-to-r from-teal-600 to-emerald-600 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
//                 <div className="absolute inset-0 bg-linear-to-br from-teal-400 to-green-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
//                 <div className="relative">
//                   <Image
//                     src="/images/logo-in-home-approach.jpg"
//                     alt="F.A.S.T Approach - Group B Officers Academy"
//                     width={500}
//                     height={600}
//                     className="relative rounded-3xl shadow-2xl ring-8 ring-white group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-teal-500/20 to-emerald-500/20 group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all duration-500"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>


//       {/* Hero Section */}
//       <section className="relative py-20 px-4 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             {/* Left Side - Welcome Message */}
//             <div className="space-y-8 animate-fade-in">
//               <div className="space-y-6">
//                 <div className="inline-block">
//                   <span className="px-4 py-2 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 font-bold rounded-full text-sm uppercase tracking-wide">
//                     Welcome to Excellence
//                   </span>
//                 </div>
//                 <h1 className="lg:text-6xl text-4xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600 leading-tight">
//                   Group B Officers Academy
//                 </h1>
//                 <p className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed">
//                   Your gateway to success in the <span className="text-blue-600 font-bold">AOM LDCE Examination</span> through expert guidance and comprehensive preparation
//                 </p>
//                 <p className="text-lg text-gray-600 leading-relaxed">
//                   Join thousands of successful officers who achieved their dreams through our structured learning approach, interactive classes, and expert mentorship.
//                 </p>
//               </div>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="group relative bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg overflow-hidden">
//                   <span className="relative z-10">Start Learning</span>
//                   <div className="absolute inset-0 bg-linear-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </button>
//                 <button className="group relative border-2 border-blue-600 text-blue-700 px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold text-lg bg-white/80 backdrop-blur-sm overflow-hidden">
//                   <span className="relative z-10 group-hover:text-white transition-colors duration-300">Learn More</span>
//                   <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
//                 </button>
//               </div>

              
//             </div>

//             {/* Right Side - Logo */}
//             <div className="relative flex justify-center lg:justify-end">
//               <div className="group relative">
//                 <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
//                 <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-purple-500 rounded-lg blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
//                 <div className="relative">
//                   <Image
//                     src="/images/logo-in-home.jpg"
//                     alt="Group B Officers Academy"
//                     width={400}
//                     height={400}
//                     className="relative rounded-lg shadow-2xl ring-8 ring-white group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 rounded-lg bg-linear-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>      

      

//       {/* Welcome Message Section */}
//       <section className="relative py-10 overflow-hidden">
//         <div className="absolute inset-0 bg-linear-to-br from-white to-blue-50"></div>
//         <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative">
//           <div className="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-1 shadow-2xl hover:shadow-blue-300/50 transition-all duration-500">
//             <div className="bg-white/10 backdrop-blur-xl rounded-3xl lg:p-8 p-4 text-white">
//               <div className="text-center mb-10">
//                 <div className="inline-block animate-bounce">
//                   <span className="lg:text-6xl text-4xl mb-6 block drop-shadow-lg">🌟</span>
//                 </div>
//                 <h2 className="lg:text-4xl text-2xl md:text-5xl font-black mb-5 leading-tight tracking-tight">
//                   HELLO, AOM ASPIRANTS!
//                 </h2>
//                 <div className="inline-block lg:px-6 px-4 lg:py-3 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
//                   <p className="lg:text-xl text-base font-semibold">
//                     From GROUP &apos;B&apos; OFFICERS ACADEMY
//                   </p>
//                 </div>
//               </div>
              
//               <div className="max-w-4xl mx-auto lg:text-lg text-base md:text-xl leading-relaxed space-y-6">
//                 <p className="text-white/95 font-medium">
//                   It&apos;s wonderful to see such a large number of dedicated aspirants preparing for the AOM LDCE Examination.
//                 </p>
                
//                 <p className="text-white/95 font-medium">
//                   To instill seriousness and focus among all participants and to ensure effective preparation through interactive Zoom classes and regular practice tests, an Intensive Crash Course has been specially designed under the able guidance of:
//                 </p>
                
//                 <div className="relative mt-12">
//                   <div className="absolute inset-0 bg-linear-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-2xl blur-2xl opacity-40"></div>
//                   <div className="relative bg-white/80 backdrop-blur-2xl rounded-xl lg:p-12 p-6 shadow-2xl border border-yellow-100/40 transform hover:scale-105 transition-transform duration-400">
//                     <div className="flex items-center justify-center">
//                       <div className="text-center">
//                         <div className="mb-4">
//                           <p className="text-lg sm:text-xl font-medium text-gray-700/80">
//                             Experience the <span className="font-bold text-orange-600">Power of Mentorship</span> under the remarkable guidance of our beloved
//                           </p>
//                         </div>
//                         {/* <p className="font-black lg:text-3xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-500 to-purple-700 mb-3 drop-shadow-lg tracking-tight animate-pulse">
//                           Sri SREENIVASULU CHEVURU
//                         </p> */}
//                         <p className="lg:text-xl text-base font-semibold text-gray-800 flex items-center justify-center gap-2">
//                           Renewed Instructors across the country
//                         </p>
//                         <p className="mt-5 text-base md:text-lg text-slate-700 max-w-xl mx-auto italic">
//                           Unlock your fullest potential guided by inspired teaching, wisdom, and dedication.<br/>
//                           Embark on a transformative learning journey towards your dream of success in the AOM LDCE Examination!
//                         </p>
//                         <div className="flex justify-center mt-5">
//                           <span className="inline-block rounded-full bg-yellow-300/80 px-5 py-2 text-yellow-900 font-bold text-lg shadow-md border border-yellow-200 tracking-wide animate-fade-in-up">
//                             Elevate. Empower. Excel.
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 relative bg-linear-to-b from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16 animate-fade-in">
//             <div className="inline-block mb-4">
//               <span className="px-4 py-2 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 font-bold rounded-full text-sm uppercase tracking-wide">
//                 Our Features
//               </span>
//             </div>
//             <h2 className="lg:text-4xl text-2xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
//               Why Choose Our Academy?
//             </h2>
//             <p className="lg:text-xl text-base md:text-2xl text-gray-600 font-medium">
//               Comprehensive preparation for your success
//             </p>
//           </div>
          
//           <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 md:gap-10">
//             <div className="group relative">
//               <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-indigo-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//               <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
//                 <div className="text-center">
//                   <div className="relative mb-6">
//                     <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-indigo-500 rounded-2xl blur-md opacity-50"></div>
//                     <div className="relative w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
//                       <span className="text-4xl">📚</span>
//                     </div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Guidance</h3>
//                   <p className="text-gray-600 leading-relaxed text-lg">
//                     Learn from experienced instructors with proven track records in LDCE examinations.
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="group relative">
//               <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//               <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
//                 <div className="text-center">
//                   <div className="relative mb-6">
//                     <div className="absolute inset-0 bg-linear-to-br from-green-400 to-emerald-500 rounded-2xl blur-md opacity-50"></div>
//                     <div className="relative w-20 h-20 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
//                       <span className="text-4xl">💻</span>
//                     </div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">Interactive Classes</h3>
//                   <p className="text-gray-600 leading-relaxed text-lg">
//                     Join live Zoom sessions for real-time learning and doubt clarification.
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="group relative">
//               <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
//               <div className="relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2">
//                 <div className="text-center">
//                   <div className="relative mb-6">
//                     <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-pink-500 rounded-2xl blur-md opacity-50"></div>
//                     <div className="relative w-20 h-20 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
//                       <span className="text-4xl">🎯</span>
//                     </div>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">Practice Tests</h3>
//                   <p className="text-gray-600 leading-relaxed text-lg">
//                     Regular mock tests and practice sessions to boost your confidence.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

     
//     </div>
//   )
// }

// export default Home
