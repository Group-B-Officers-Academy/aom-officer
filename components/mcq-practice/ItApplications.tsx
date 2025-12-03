// 'use client'

// import React, { useState, useEffect } from 'react'

// interface Question {
//   id: number
//   question: string
//   options: string[]
//   correctAnswer: number
//   explanation: string
// }

// const ItApplications = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [score, setScore] = useState(0)
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
//   const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
//   const [quizCompleted, setQuizCompleted] = useState(false)
//   const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
//   const [showSummary, setShowSummary] = useState(false)

//   // All 25 IT APPLICATIONS MCQ Questions
//   const questions: Question[] = [
//     {
//       id: 1,
//       question: "What is the full form of FOIS?",
//       options: [
//             "A. Finance and Operations Information System",
//             "B. Freight Operations Information System",
//             "C. Fleet and Organization Intelligence System",
//             "D. Fuel Optimization Integrated System"
//           ],
//       correctAnswer: 1,
//       explanation: "FOIS stands for Freight Operations Information System, which provides digital management of end-to-end freight operations."
//     },
//     {
//       id: 2,
//       question: "The two main modules of FOIS are TMS and which other system?",
//       options: [
//             "A. SFOORTI",
//             "B. RMS",
//             "C. COA",
//             "D. ICMS"
//           ],
//       correctAnswer: 1,
//       explanation: "FOIS has two main modules: TMS (Terminal Management System) and RMS (Rake Management System)."
//     },
//     {
//       id: 3,
//       question: "Which FOIS module handles **all Commercial Activities** at a terminal, such as demand registration and generation of Railway Receipts (RR)?",
//       options: [
//             "A. RMS",
//             "B. TMS",
//             "C. COMS",
//             "D. ETR"
//           ],
//       correctAnswer: 1,
//       explanation: "TMS (Terminal Management System) handles loading-unloading operations at terminals and all Commercial Activities are reported in TMS, including registration of loading demand and generation of RR."
//     },
//     {
//       id: 4,
//       question: "Which FOIS module handles **all Operating Activities**, such as rake formation, breakup, and monitoring of empty/loaded flows?",
//       options: [
//             "A. ETR",
//             "B. TMS",
//             "C. COMS",
//             "D. RMS"
//           ],
//       correctAnswer: 3,
//       explanation: "RMS (Rake Management System) handles movement and utilisation of rakes/wagons, and all Operating Activities are reported in RMS, including rake formation and breakup."
//     },
//     {
//       id: 5,
//       question: "What is the primary purpose of ICMS?",
//       options: [
//             "A. Real-time GPS tracking of trains.",
//             "B. Centralized management of coaching operations, punctuality, and maintenance.",
//             "C. Automation of goods terminal operations.",
//             "D. Crew availability and rest management."
//           ],
//       correctAnswer: 1,
//       explanation: "ICMS (Integrated Coaching Management System) is a centralized system for coaching operations, punctuality, and maintenance. It manages train composition, rake links, utilization, and maintenance planning."
//     },
//     {
//       id: 6,
//       question: "Which ICMS subsystem handles Punctuality Analysis & Monitoring and fixes delay responsibility?",
//       options: [
//             "A. COIS",
//             "B. BLOCO",
//             "C. PAM",
//             "D. MIS Reports"
//           ],
//       correctAnswer: 2,
//       explanation: "PAM (Punctuality Analysis & Monitoring) is the Punctuality Module that handles arrival/departure data, delay reasons, and responsibility fixing."
//     },
//     {
//       id: 7,
//       question: "What is the core purpose of the Control Office Application (COA)?",
//       options: [
//             "A. To manage coach inventory and maintenance schedules.",
//             "B. To handle registration of loading demand.",
//             "C. To automate control charting and provide real-time train running monitoring in divisional control offices.",
//             "D. To manage running staff sign-on/off records."
//           ],
//       correctAnswer: 2,
//       explanation: "COA is a comprehensive software system that automates control charting in divisional control offices and is the heart of control office operations for real-time train running monitoring."
//     },
//     {
//       id: 8,
//       question: "The integration of RTIS (Real-Time Train Information System) with COA enables what key COA feature?",
//       options: [
//             "A. Loco attach/detach functionality.",
//             "B. GPS data feeding for real-time train charting.",
//             "C. Generation of eT-RR.",
//             "D. Master data validation."
//           ],
//       correctAnswer: 1,
//       explanation: "COA is integrated with RTIS for GPS data which enables real-time train charting and accurate visibility of train movements."
//     },
//     {
//       id: 9,
//       question: "The Crew Management System (CMS) primarily monitors and ensures compliance with which key regulatory aspect?",
//       options: [
//             "A. Rake links planning",
//             "B. H.O.E.R (Hours of Employment Regulations)",
//             "C. NTKM/GTKM calculation",
//             "D. Primary/Secondary maintenance planning"
//           ],
//       correctAnswer: 1,
//       explanation: "CMS manages running staff (LP, ALP, Guards) and monitors H.O.E.R compliance and rest rules."
//     },
//     {
//       id: 10,
//       question: "What is the primary function of RTIS?",
//       options: [
//             "A. Management of coaching maintenance planning.",
//             "B. High-end freight movement analytics.",
//             "C. Provides real-time GPS-based location of trains.",
//             "D. Automation of control charting."
//           ],
//       correctAnswer: 2,
//       explanation: "RTIS (Real-Time Train Information System) provides real-time GPS-based location of trains. A key objective is to obtain real-time position of locomotives/trains without manual reporting."
//     },
//     {
//       id: 11,
//       question: "Which system is the high-end freight movement analytics and network optimization tool that provides real-time freight train tracking and congestion heat maps?",
//       options: [
//             "A. SATSANG",
//             "B. COA",
//             "C. SFOORTI",
//             "D. CMS"
//           ],
//       correctAnswer: 2,
//       explanation: "SFOORTI (Smart Freight Operations Optimization & Real-Time Information) is the high-end freight movement analytics and network optimization tool that provides congestion heat maps and detention analytics."
//     },
//     {
//       id: 12,
//       question: "The term **eT-RR** stands for:",
//       options: [
//             "A. Electronic Train Rake Routing",
//             "B. Electronic Transmission of Railway Receipt",
//             "C. Engine Tracking and Resource Routing",
//             "D. Electronic Terminal Registration Record"
//           ],
//       correctAnswer: 1,
//       explanation: "ETR stands for Electronic Transmission of RR. This is part of the TMS module."
//     },
//     {
//       id: 13,
//       question: "Which ICMS subsystem covers complete coaching operations, including Rake formation and SICK/SHOP mark of coaches?",
//       options: [
//             "A. PAM",
//             "B. BLOCO",
//             "C. COIS",
//             "D. MASTER DATA"
//           ],
//       correctAnswer: 2,
//       explanation: "COIS (Coaching Operations Information System) covers complete coaching operations, including Rake formation and Coach operations (SICK/SHOP mark, fit release, stock entry)."
//     },
//     {
//       id: 14,
//       question: "What is the key purpose of the **MASTER DATA MODULE** within ICMS?",
//       options: [
//             "A. Punctuality analysis and monitoring.",
//             "B. Managing all foundational data like train definitions, schedules, and coach details.",
//             "C. Handling Light Engine formation and movement.",
//             "D. Administrative tasks like user management."
//           ],
//       correctAnswer: 1,
//       explanation: "The MASTER DATA MODULE is the Foundational Data Layer and Manages all master data used across ICMS, including train data and coach data."
//     },
//     {
//       id: 15,
//       question: "Which application is the digital brain of the control office, providing automatic charting via RTIS input?",
//       options: [
//             "A. ICMS",
//             "B. SFOORTI",
//             "C. COA",
//             "D. CMS"
//           ],
//       correctAnswer: 2,
//       explanation: "COA (Control Office Application) is the Control's digital brain, and automates control charting in divisional control offices often using RTIS input."
//     },
//     {
//       id: 16,
//       question: "REMLOT is primarily a system for:",
//       options: [
//             "A. Real-time crew movement.",
//             "B. Real-time loco **health monitoring and predictive maintenance**.",
//             "C. Remote freight loading operations.",
//             "D. Rake empty movement planning."
//           ],
//       correctAnswer: 1,
//       explanation: "REMLOT (Remote Monitoring & Logging of Locomotives) is used for real-time loco health monitoring & predictive maintenance, and prevents loco failures."
//     },
//     {
//       id: 17,
//       question: "The module COMS (Control Office Mgmt) integrates FOIS with which other system?",
//       options: [
//             "A. RTIS",
//             "B. ICMS",
//             "C. SFOORTI",
//             "D. CMS"
//           ],
//       correctAnswer: 1,
//       explanation: "COMS (Control Office Mgmt) integrates FOIS with ICMS."
//     },
//     {
//       id: 18,
//       question: "Which ICMS subsystem specifically covers Loco attach/detach, Light Engine formation, and Traction validations?",
//       options: [
//             "A. PAM",
//             "B. BLOCO MODULE",
//             "C. COIS",
//             "D. UTILITY MODULE"
//           ],
//       correctAnswer: 1,
//       explanation: "BLOCO MODULE (Passenger Loco Operations) covers Loco attach/detach, Light Engine (LE) formation & movement, and Traction validations."
//     },
//     {
//       id: 19,
//       question: "CMS manages which categories of running staff?",
//       options: [
//             "A. Station Masters and Pointsmen.",
//             "B. Loco Pilot (LP), Assistant Loco Pilot (ALP), and Guards.",
//             "C. TXR and SSE (C&W).",
//             "D. Chief Controller and Section Controller."
//           ],
//       correctAnswer: 1,
//       explanation: "CMS manages running staff: LP, ALP, Guards."
//     },
//     {
//       id: 20,
//       question: "Which system provides automatic, continuous, high-accuracy train running information to multiple applications without manual reporting?",
//       options: [
//             "A. COA",
//             "B. SFOORTI",
//             "C. RTIS",
//             "D. SIMRAN"
//           ],
//       correctAnswer: 2,
//       explanation: "RTIS is the system that provides automatic, continuous, high-accuracy train running information to multiple applications without manual reporting."
//     },
//     {
//       id: 21,
//       question: "Which system is the predecessor to RTIS and was a legacy GPS/GPRS-based train tracking system?",
//       options: [
//             "A. SFOORTI",
//             "B. SIMRAN",
//             "C. SATSANG",
//             "D. REMLOT"
//           ],
//       correctAnswer: 1,
//       explanation: "SIMRAN (Satellite Imaging for Rail Navigation) was an early GPS/GPRS-based train tracking system, which was the predecessor to RTIS."
//     },
//     {
//       id: 22,
//       question: "The ICMS subsystem **UTILITY MODULE** handles which primary function?",
//       options: [
//             "A. Punctuality reporting and delay reason fixing.",
//             "B. Loco status changes and MU formation.",
//             "C. Administrative functions like User management and Password management.",
//             "D. Coach condemnation and transfer data."
//           ],
//       correctAnswer: 2,
//       explanation: "The UTILITY MODULE is the Administrative/System Management module and handles User management, Password management, and User authentication."
//     },
//     {
//       id: 23,
//       question: "What is the full form of SATSANG?",
//       options: [
//             "A. Satellite Aided Traffic Scheduling and Network Governance",
//             "B. Software Aided Train Scheduling and Network Governance",
//             "C. Smart Automation for Traffic Safety and Network Generation",
//             "D. Sectional Activity Tracking System and Network Governance"
//           ],
//       correctAnswer: 1,
//       explanation: "SATSANG stands for Software Aided Train Scheduling and Network Governance."
//     },
//     {
//       id: 24,
//       question: "Which system is specifically used for the high-level governance reports, providing integrated analytics and congestion visibility across freight and coaching traffic?",
//       options: [
//             "A. SFOORTI",
//             "B. RTIS",
//             "C. SATSANG",
//             "D. TMS"
//           ],
//       correctAnswer: 2,
//       explanation: "SATSANG is the smart system for train scheduling, network governance, and provides integrated data from COA, FOIS, ICMS, RTIS for high-level governance reports."
//     },
//     {
//       id: 25,
//       question: "ICMS integrates with which system for providing public information, such as train running status?",
//       options: [
//             "A. FOIS",
//             "B. RTIS",
//             "C. NTES",
//             "D. CMS"
//           ],
//       correctAnswer: 2,
//       explanation: "ICMS's MASTER DATA MODULE ensures accuracy for COA, NTES, PRS, and ICMS integrates with NTES for public information."
//     }
//   ]

//   // Timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 0) {
//           clearInterval(timer)
//           return 0
//         }
//         return prev - 1
//       })
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [])

//   const formatTime = (seconds: number) => {
//     const hours = Math.floor(seconds / 3600)
//     const minutes = Math.floor((seconds % 3600) / 60)
//     const secs = seconds % 60
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
//   }

//   const handleAnswerSelect = (answerIndex: number) => {
//     // Don't allow changing answer once selected for current question
//     if (answeredQuestions.has(currentQuestion)) {
//       return
//     }
    
//     setSelectedAnswer(answerIndex)
    
//     // Update user answers
//     setUserAnswers(prev => new Map([...prev, [currentQuestion, answerIndex]]))
    
//     // Update score if correct
//     if (answerIndex === questions[currentQuestion].correctAnswer) {
//       setScore(prev => prev + 1)
//     }
    
//     // Mark question as answered
//     setAnsweredQuestions(prev => new Set([...prev, currentQuestion]))
//   }

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       const nextQuestionIndex = currentQuestion + 1
//       setCurrentQuestion(nextQuestionIndex)
//       // Restore previous answer if question was already answered
//       const previousAnswer = userAnswers.get(nextQuestionIndex)
//       setSelectedAnswer(previousAnswer !== undefined ? previousAnswer : null)
//     } else {
//       // Quiz completed
//       setQuizCompleted(true)
//       setShowSummary(true)
//     }
//   }

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       const previousQuestionIndex = currentQuestion - 1
//       setCurrentQuestion(previousQuestionIndex)
//       // Restore previous answer if question was already answered
//       const previousAnswer = userAnswers.get(previousQuestionIndex)
//       setSelectedAnswer(previousAnswer !== undefined ? previousAnswer : null)
//     }
//   }

//   const handleQuestionJump = (questionIndex: number) => {
//     setCurrentQuestion(questionIndex)
//     // Restore previous answer if question was already answered
//     const previousAnswer = userAnswers.get(questionIndex)
//     setSelectedAnswer(previousAnswer !== undefined ? previousAnswer : null)
//   }

//   const isCorrect = selectedAnswer === questions[currentQuestion]?.correctAnswer

//   // Calculate quiz statistics
//   const totalQuestions = questions.length
//   const answeredCount = answeredQuestions.size
//   const correctCount = score
//   const incorrectCount = answeredCount - correctCount
//   const percentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0
//   const timeSpent = 3600 - timeLeft
//   const timeSpentMinutes = Math.floor(timeSpent / 60)
//   const timeSpentSeconds = timeSpent % 60

//   // Get question categories for analysis
//   const getQuestionCategory = (questionId: number) => {
//     if (questionId <= 5) return "FOIS & TMS"
//     if (questionId <= 10) return "ICMS & COA"
//     if (questionId <= 15) return "RTIS & CMS"
//     if (questionId <= 20) return "Tracking Systems"
//     return "Governance & Integration"
//   }

//   // Calculate category-wise performance
//   const categoryPerformance = questions.reduce((acc, question) => {
//     const category = getQuestionCategory(question.id)
//     if (!acc[category]) {
//       acc[category] = { total: 0, correct: 0 }
//     }
//     acc[category].total++
//     if (userAnswers.get(question.id - 1) === question.correctAnswer) {
//       acc[category].correct++
//     }
//     return acc
//   }, {} as Record<string, { total: number; correct: number }>)

//   const handleRestartQuiz = () => {
//     setCurrentQuestion(0)
//     setSelectedAnswer(null)
//     setScore(0)
//     setAnsweredQuestions(new Set())
//     setTimeLeft(3600)
//     setQuizCompleted(false)
//     setUserAnswers(new Map())
//     setShowSummary(false)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex justify-between items-center lg:flex-row flex-col gap-3">
//             <h1 className="lg:text-3xl text-xl font-bold text-gray-800">IT Applications 25 MCQ Quiz</h1>
//             <div className="text-right">
//               <div className="lg:text-2xl text-xl font-semibold text-blue-600 text-center">{formatTime(timeLeft)}</div>
//               <div className="text-sm text-gray-600">Time Remaining</div>
//             </div>
//           </div>
//           <div className="mt-4">
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>Question {currentQuestion + 1} of {questions.length}</span>
//               <span>Score: {score}/{answeredQuestions.size}</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
//               <div 
//                 className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Question Navigation */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-md p-4">
//               <h3 className="font-semibold text-gray-800 mb-4">Question Navigation</h3>
//               <div className="grid grid-cols-5 gap-2">
//                 {questions.map((_, index) => {
//                   const userAnswer = userAnswers.get(index)
//                   const isCorrect = userAnswer !== undefined && userAnswer === questions[index].correctAnswer
//                   const isAnswered = answeredQuestions.has(index)
                  
//                   return (
//                     <button
//                       key={index}
//                       onClick={() => handleQuestionJump(index)}
//                       className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
//                         index === currentQuestion
//                           ? 'bg-blue-600 text-white'
//                           : isAnswered && isCorrect
//                           ? 'bg-green-500 text-white'
//                           : isAnswered && !isCorrect
//                           ? 'bg-red-500 text-white'
//                           : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                       }`}
//                     >
//                       {index + 1}
//                     </button>
//                   )
//                 })}
//               </div>
//               <div className="mt-4 text-xs text-gray-600">
//                 <div className="flex items-center gap-2 mb-1">
//                   <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
//                   <span>Current</span>
//                 </div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                   <span>Correct</span>
//                 </div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                   <span>Incorrect</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
//                   <span>Not Answered</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Question Area */}
//           <div className="lg:col-span-3">
//             <div className="bg-white rounded-lg shadow-md p-3 lg:p-6">
//               {questions[currentQuestion] && (
//                 <>
//                   <div className="mb-6">
//                     <h2 className="lg:text-xl text-base font-semibold text-gray-800 mb-4">
//                       {questions[currentQuestion].question}
//                     </h2>
                    
//                     <div className="space-y-3">
//                       {questions[currentQuestion].options.map((option, index) => (
//                         <label
//                           key={index}
//                           className={`block lg:p-4 p-2 rounded-lg border-2 cursor-pointer transition-all ${
//                             selectedAnswer === index
//                               ? selectedAnswer !== null && answeredQuestions.has(currentQuestion)
//                                 ? isCorrect
//                                   ? 'border-green-500 bg-green-50'
//                                   : 'border-red-500 bg-red-50'
//                                 : 'border-blue-500 bg-blue-50'
//                               : index === questions[currentQuestion].correctAnswer && selectedAnswer !== null && answeredQuestions.has(currentQuestion) && selectedAnswer !== index
//                               ? 'border-green-500 bg-green-50'
//                               : 'border-gray-200 hover:border-gray-300'
//                           } ${answeredQuestions.has(currentQuestion) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//                         >
//                           <input
//                             type="radio"
//                             name="answer"
//                             value={index}
//                             checked={selectedAnswer === index}
//                             onChange={() => handleAnswerSelect(index)}
//                             className="sr-only"
//                             disabled={answeredQuestions.has(currentQuestion)}
//                           />
//                           <div className="flex items-center">
//                             <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
//                               selectedAnswer === index
//                                 ? selectedAnswer !== null && answeredQuestions.has(currentQuestion)
//                                   ? isCorrect
//                                     ? 'border-green-500 bg-green-500'
//                                     : 'border-red-500 bg-red-500'
//                                   : 'border-blue-500 bg-blue-500'
//                                 : index === questions[currentQuestion].correctAnswer && selectedAnswer !== null && answeredQuestions.has(currentQuestion)
//                                 ? 'border-green-500 bg-green-500'
//                                 : 'border-gray-300'
//                             }`}>
//                               {(selectedAnswer === index || (index === questions[currentQuestion].correctAnswer && selectedAnswer !== null && answeredQuestions.has(currentQuestion))) && (
//                                 <div className="w-2 h-2 bg-white rounded-full"></div>
//                               )}
//                             </div>
//                             <span className="text-gray-700">{option}</span>
//                           </div>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {selectedAnswer !== null && (
//                     <div className="mb-6 p-4 rounded-lg bg-gray-50">
//                       <div className={`text-lg font-semibold mb-2 ${
//                         isCorrect ? 'text-green-600' : 'text-red-600'
//                       }`}>
//                         {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
//                       </div>
//                       <div className="text-sm text-gray-600 mb-2">
//                         Correct Answer: {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
//                       </div>
//                       <div className="text-sm text-gray-700">
//                         <strong>Explanation:</strong> {questions[currentQuestion].explanation}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex justify-between items-center">
//                     <button
//                       onClick={handlePrevious}
//                       disabled={currentQuestion === 0}
//                       className="px-6 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
//                     >
//                       Previous
//                     </button>

//                     <button
//                       onClick={handleNext}
//                       disabled={selectedAnswer === null}
//                       className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
//                     >
//                       {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Quiz Summary Modal */}
//         {(quizCompleted || timeLeft === 0) && showSummary && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
//             <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
//               <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">IT Applications Quiz Summary & Overview</h2>
              
//               {/* Overall Score */}
//               <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-6 text-white">
//                 <div className="text-center">
//                   <div className="lg:text-5xl text-2xl font-bold mb-2">{correctCount}/{totalQuestions}</div>
//                   <div className="lg:text-xl text-base mb-2">Your Score</div>
//                   <div className="lg:text-3xl text-xl font-bold">{percentage}%</div>
//                   <div className="text-sm mt-2">Time Spent: {timeSpentMinutes}m {timeSpentSeconds}s</div>
//                 </div>
//               </div>

//               {/* Performance Analysis */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//                 <div className="bg-green-50 rounded-lg p-4 text-center">
//                   <div className="lg:text-2xl text-xl font-bold text-green-600">{correctCount}</div>
//                   <div className="text-green-700">Correct Answers</div>
//                 </div>
//                 <div className="bg-red-50 rounded-lg p-4 text-center">
//                   <div className="lg:text-2xl text-xl font-bold text-red-600">{incorrectCount}</div>
//                   <div className="text-red-700">Incorrect Answers</div>
//                 </div>
//                 <div className="bg-blue-50 rounded-lg p-4 text-center">
//                   <div className="lg:text-2xl text-xl font-bold text-blue-600">{totalQuestions - answeredCount}</div>
//                   <div className="text-blue-700">Unanswered</div>
//                 </div>
//               </div>

//               {/* Category-wise Performance */}
//               <div className="mb-6">
//                 <h3 className="lg:text-xl text-base font-semibold mb-4 text-gray-800">Category-wise Performance</h3>
//                 <div className="space-y-3">
//                   {Object.entries(categoryPerformance).map(([category, data]) => {
//                     const categoryPercentage = Math.round((data.correct / data.total) * 100)
//                     return (
//                       <div key={category} className="bg-gray-50 rounded-lg p-4">
//                         <div className="flex justify-between items-center mb-2">
//                           <span className="font-medium text-gray-700">{category}</span>
//                           <span className="text-sm text-gray-600">{data.correct}/{data.total}</span>
//                         </div>
//                         <div className="w-full bg-gray-200 rounded-full h-2">
//                           <div 
//                             className={`h-2 rounded-full transition-all duration-500 ${
//                               categoryPercentage >= 80 ? 'bg-green-500' :
//                               categoryPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
//                             }`}
//                             style={{ width: `${categoryPercentage}%` }}
//                           ></div>
//                         </div>
//                         <div className="text-sm text-gray-600 mt-1">{categoryPercentage}%</div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>

//               {/* Question Review */}
//               <div className="mb-6">
//                 <h3 className="lg:text-xl text-base font-semibold mb-4 text-gray-800">Question Review</h3>
//                 <div className="max-h-60 overflow-y-auto">
//                   <div className="grid grid-cols-5 gap-2">
//                     {questions.map((question, index) => {
//                       const userAnswer = userAnswers.get(index)
//                       const isCorrect = userAnswer === question.correctAnswer
//                       const isAnswered = userAnswer !== undefined
                      
//                       return (
//                         <div
//                           key={index}
//                           className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
//                             !isAnswered ? 'bg-gray-200 text-gray-600' :
//                             isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
//                           }`}
//                           title={`Q${index + 1}: ${isAnswered ? (isCorrect ? 'Correct' : 'Incorrect') : 'Not Answered'}`}
//                         >
//                           {index + 1}
//                         </div>
//                       )
//                     })}
//                   </div>
//                   <div className="mt-4 flex items-center gap-4 text-sm">
//                     <div className="flex items-center gap-2">
//                       <div className="w-4 h-4 bg-green-500 rounded"></div>
//                       <span>Correct</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-4 h-4 bg-red-500 rounded"></div>
//                       <span>Incorrect</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-4 h-4 bg-gray-200 rounded"></div>
//                       <span>Not Answered</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Detailed Question Analysis */}
//               <div className="mb-6">
//                 <h3 className="text-xl font-semibold mb-4 text-gray-800">Detailed Analysis</h3>
//                 <div className="space-y-4 max-h-60 overflow-y-auto">
//                   {questions.map((question, index) => {
//                     const userAnswer = userAnswers.get(index)
//                     const isCorrect = userAnswer === question.correctAnswer
//                     const isAnswered = userAnswer !== undefined
                    
//                     if (!isAnswered) return null
                    
//                     return (
//                       <div key={index} className={`border-l-4 p-4 rounded-r-lg ${
//                         isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
//                       }`}>
//                         <div className="flex justify-between items-start mb-2">
//                           <span className="font-medium text-gray-800">Question {index + 1}</span>
//                           <span className={`text-sm font-medium ${
//                             isCorrect ? 'text-green-600' : 'text-red-600'
//                           }`}>
//                             {isCorrect ? '✓ Correct' : '✗ Incorrect'}
//                           </span>
//                         </div>
//                         <div className="text-sm text-gray-700 mb-2">{question.question}</div>
//                         <div className="text-xs text-gray-600">
//                           <div>Your Answer: {isAnswered ? question.options[userAnswer] : 'Not answered'}</div>
//                           <div>Correct Answer: {question.options[question.correctAnswer]}</div>
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-4 justify-center">
//                 <button
//                   onClick={handleRestartQuiz}
//                   className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                 >
//                   Restart Quiz
//                 </button>
//                 <button
//                   onClick={() => setShowSummary(false)}
//                   className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
//                 >
//                   Close Summary
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ItApplications
