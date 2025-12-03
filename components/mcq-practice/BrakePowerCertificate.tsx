// 'use client'

// import React, { useState, useEffect } from 'react'

// interface Question {
//   id: number
//   question: string
//   options: string[]
//   correctAnswer: number
//   explanation: string
// }

// const BrakePowerCertificate = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [score, setScore] = useState(0)
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
//   const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
//   const [quizCompleted, setQuizCompleted] = useState(false)
//   const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
//   const [showSummary, setShowSummary] = useState(false)

//   // All 25 BRAKE POWER CERTIFICATE MCQ Questions
//   const questions: Question[] = [
//     {
//       id: 1,
//       question: "What is the minimum originating Brake Power (BP) percentage required for a Closed Circuit (CC) Rake?",
//       options: [
//         "A. 85%",
//         "B. 90%",
//         "C. 95%",
//         "D. 100%"
//       ],
//       correctAnswer: 3,
//       explanation: "CC Rakes must originate with 100% BP, although en-route it can drop to 90%."
//     },
//     {
//       id: 2,
//       question: "Who are the three railway personnel whose joint signatures are required on the BPC to confirm continuity and fitness?",
//       options: [
//         "A. TXR, Guard, Station Master",
//         "B. TXR, Loco Pilot, Guard",
//         "C. Station Master, Loco Pilot, Guard",
//         "D. SSE/JE (C&W), Guard, DRM"
//       ],
//       correctAnswer: 1,
//       explanation: "The BPC requires joint signatures from the TXR (C&W staff), Guard (Train Manager), and Loco Pilot (LP)."
//     },
//     {
//       id: 3,
//       question: "What is the validity period for a BPC issued to a Premium Rake?",
//       options: [
//         "A. 35 days or 7500 km",
//         "B. 4 days or 3500 km",
//         "C. 12 days (+3 days grace)",
//         "D. One-time loading only"
//       ],
//       correctAnswer: 2,
//       explanation: "Premium Rake BPC is valid for 12 days from issue, with a grace period of +3 days if the rake is loaded on the 12th day and reaches the TXR yard by the 15th day."
//     },
//     {
//       id: 4,
//       question: "If the distance (km) data is missing and not retrievable for a CC Rake, for how many days is the BPC valid?",
//       options: [
//         "A. 7 days",
//         "B. 20 days",
//         "C. 35 days",
//         "D. 4 days"
//       ],
//       correctAnswer: 1,
//       explanation: "If the kilometer data is missing and not retrievable, the CC BPC is valid only for 20 days."
//     },
//     {
//       id: 5,
//       question: "What is the color of the BPC issued for a Closed Circuit (CC) Rake?",
//       options: [
//         "A. Yellow",
//         "B. Green",
//         "C. Blue",
//         "D. Red"
//       ],
//       correctAnswer: 0,
//       explanation: "The BPC color for a Closed Circuit (CC) Rake is Yellow. The BPC color for End-to-End Rakes is Green."
//     },
//     {
//       id: 6,
//       question: "A BPC becomes invalid if the rake integrity is disturbed by more than how many wagons?",
//       options: [
//         "A. >1 wagon",
//         "B. >2 wagons",
//         "C. >3 wagons",
//         "D. >4 wagons"
//       ],
//       correctAnswer: 3,
//       explanation: "Rake integrity disturbed by >4 wagons invalidates the BPC across CC, Premium, and End-to-End rakes."
//     },
//     {
//       id: 7,
//       question: "What is the maximum distance allowed for an End-to-End Rake movement under a GLP check?",
//       options: [
//         "A. 100 km",
//         "B. 200 km",
//         "C. 300 km",
//         "D. 400 km"
//       ],
//       correctAnswer: 3,
//       explanation: "A maximum limit of 400 km is allowed on GLP movements for End-to-End rakes when the unloading point is not a TXR point."
//     },
//     {
//       id: 8,
//       question: "What is the validity period for BPC of an ICF Mail/Express Train?",
//       options: [
//         "A. 4000 km or 96 hours",
//         "B. 3500 km or 96 hours (4 days)",
//         "C. 3500 km or 7 days",
//         "D. 4500 km or 10 days"
//       ],
//       correctAnswer: 1,
//       explanation: "ICF Coaching Stock (Mail/Express Trains) BPC is valid for 3500 km OR 96 hours (4 days), whichever is earlier."
//     },
//     {
//       id: 9,
//       question: "Which examination category allows for multiple loading/unloading within its validity period?",
//       options: [
//         "A. End-to-End Rakes",
//         "B. Ordinary Rakes",
//         "C. Premium and CC Rakes",
//         "D. Vacuum Brake Stock"
//       ],
//       correctAnswer: 2,
//       explanation: "CC Rakes run in fixed circuits and Premium Rakes allow multiple load/unload operations within their validity."
//     },
//     {
//       id: 10,
//       question: "If a BPC Rake (CC, Premium, or End-to-End) is stabled for more than 24 hours at a TXR yard, what is the consequence?",
//       options: [
//         "A. GLP check is required.",
//         "B. LP must log the distance.",
//         "C. BPC becomes invalid.",
//         "D. Fresh BPC is required only if loaded."
//       ],
//       correctAnswer: 2,
//       explanation: "Stabling for >24 hours at a TXR yard invalidates the BPC (for CC, Premium, and End-to-End rakes)."
//     },
//     {
//       id: 11,
//       question: "The minimum BP percentage required for End-to-End **Air Brake stock** at the originating station is:",
//       options: [
//         "A. 75%",
//         "B. 85%",
//         "C. 90%",
//         "D. 95%"
//       ],
//       correctAnswer: 2,
//       explanation: "End-to-End Air Brake stock requires 90% BP at the originating station."
//     },
//     {
//       id: 12,
//       question: "What is the primary function/importance of the BPC?",
//       options: [
//         "A. To record the Loco Pilot's working hours.",
//         "B. To certify the wagon's maintenance date.",
//         "C. To certify the **minimum Brake Power percentage** and overall fitness for safe running.",
//         "D. To log fuel consumption per trip."
//       ],
//       correctAnswer: 2,
//       explanation: "The BPC's primary function is to certify the minimum Brake Power percentage and mechanical fitness, ensuring the train is safe to run."
//     },
//     {
//       id: 13,
//       question: "What is the minimum Brake Power required for **Vacuum Brake Stock** at the originating station of an Ordinary End-to-End Rake?",
//       options: [
//         "A. 75%",
//         "B. 85%",
//         "C. 90%",
//         "D. 100%"
//       ],
//       correctAnswer: 1,
//       explanation: "Vacuum brake stock (End-to-End) requires 85% BP at the originating station."
//     },
//     {
//       id: 14,
//       question: "When must an Empty End-to-End Rake reach the loading point from the time of BPC issue, otherwise a fresh BPC is required?",
//       options: [
//         "A. Within 96 hours",
//         "B. Within 7 days",
//         "C. Within 4 days",
//         "D. Within 12 days"
//       ],
//       correctAnswer: 2,
//       explanation: "The empty End-to-End rake must reach the loading point within 4 days (96 hours) of BPC issue, otherwise a fresh BPC is required."
//     },
//     {
//       id: 15,
//       question: "What is the validity of BPC for LHB Coaching Stock running as a Mail/Express train?",
//       options: [
//         "A. 3500 km or 96 hours",
//         "B. 4000 km or 96 hours (4 days)",
//         "C. 3500 km or 7 days",
//         "D. 4000 km or 7 days"
//       ],
//       correctAnswer: 1,
//       explanation: "LHB Coaching Stock BPC is valid for 4000 km OR 96 hours (4 days), whichever is earlier."
//     },
//     {
//       id: 16,
//       question: "Which rake is formed only in an empty condition at nominated 'A' category depots and must maintain a minimum originating BP of ≥95%?",
//       options: [
//         "A. CC Rake",
//         "B. End-to-End Rake",
//         "C. Premium Rake",
//         "D. Ordinary Rake"
//       ],
//       correctAnswer: 2,
//       explanation: "Premium Rakes are formed and examined only in the empty condition at nominated 'A' category depots and must originate with ≥95% BP."
//     },
//     {
//       id: 17,
//       question: "What is the minimum en-route Brake Power required for a Closed Circuit (CC) Rake?",
//       options: [
//         "A. 75%",
//         "B. 85%",
//         "C. 90%",
//         "D. 100%"
//       ],
//       correctAnswer: 2,
//       explanation: "While originating BP is 100%, the minimum BP allowed en-route for a CC Rake is 90%."
//     },
//     {
//       id: 18,
//       question: "What is the maximum distance limit (km cap) for GLP movements, as an exam-focused must-write point?",
//       options: [
//         "A. 100 km",
//         "B. 200 km",
//         "C. 300 km",
//         "D. 400 km"
//       ],
//       correctAnswer: 3,
//       explanation: "The critical distance limit mentioned for GLP movements is 400 km."
//     },
//     {
//       id: 19,
//       question: "What is the color of the BPC issued for an End-to-End Rake?",
//       options: [
//         "A. Yellow",
//         "B. Green",
//         "C. Blue",
//         "D. Red"
//       ],
//       correctAnswer: 1,
//       explanation: "The BPC color for an End-to-End Rake is Green."
//     },
//     {
//       id: 20,
//       question: "Which document is considered a 'permissive movement tool' and is **NOT** a substitute for a BPC?",
//       options: [
//         "A. Loco Pilot's Log Book",
//         "B. Joint Memo (GLP Check)",
//         "C. Train Manager's Diary",
//         "D. Maintenance Register"
//       ],
//       correctAnswer: 1,
//       explanation: "The Guard-LP Joint Memo (GLP check) is explicitly stated as NOT a substitute for a BPC, but rather a permissive movement tool."
//     },
//     {
//       id: 21,
//       question: "What is the validity of BPC for a Dedicated Parcel Express Train?",
//       options: [
//         "A. 4000 km or 96 hours",
//         "B. 3500 km or 7 days",
//         "C. 4500 km or 10 days",
//         "D. 10000 km or 35+5 days"
//       ],
//       correctAnswer: 2,
//       explanation: "The BPC for a fully dedicated parcel rake is valid for 4500 km OR 10 days, whichever is earlier."
//     },
//     {
//       id: 22,
//       question: "If a CC Rake is empty and overdue, what is required for its movement back to the base depot?",
//       options: [
//         "A. Fresh BPC required.",
//         "B. Direct move without any check.",
//         "C. GLP check.",
//         "D. Only TXR endorsement is needed."
//       ],
//       correctAnswer: 2,
//       explanation: "If an overdue CC Rake is empty, it may move to the base depot with a GLP check."
//     },
//     {
//       id: 23,
//       question: "According to the summary, what is the validity of BPC for Passenger Trains (ICF Stock) **Without Toilets**?",
//       options: [
//         "A. 3500 km OR 96 hours",
//         "B. 4000 km OR 96 hours",
//         "C. 3500 km OR 7 days",
//         "D. 4500 km OR 10 days"
//       ],
//       correctAnswer: 2,
//       explanation: "Passenger Trains (ICF Stock) Without Toilets have a BPC validity of 3500 km OR 7 days, whichever is earlier."
//     },
//     {
//       id: 24,
//       question: "What is the enhanced (under trial) validity for a BOXN/BOXNHL CC Rake?",
//       options: [
//         "A. 9000 km or 30+5 days",
//         "B. 7500 km or 35 days",
//         "C. 10000 km or 35+5 days",
//         "D. 12 days + 3 days grace"
//       ],
//       correctAnswer: 2,
//       explanation: "The enhanced (under trial) validity for BOXN/BOXNHL CC Rakes is 10000 km OR 35+5 days, whichever is earlier."
//     },
//     {
//       id: 25,
//       question: "Which freight rake type requires a fresh BPC immediately if 'loading is attempted after the 12th day'?",
//       options: [
//         "A. CC Rake",
//         "B. End-to-End Rake",
//         "C. Premium Rake",
//         "D. Ordinary Vacuum Brake Rake"
//       ],
//       correctAnswer: 2,
//       explanation: "Loading attempted after the 12th day makes the Premium BPC invalid, highlighting its strict validity rules for loading operations."
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
//     if (questionId <= 5) return "Basic Concepts"
//     if (questionId <= 10) return "Validity & Requirements"
//     if (questionId <= 15) return "Rake Types & Operations"
//     if (questionId <= 20) return "BP Percentages & Colors"
//     return "Special Cases & Procedures"
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
//             <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Brake Power Certificate 25 MCQ Quiz</h1>
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
//               <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Brake Power Certificate Quiz Summary & Overview</h2>
              
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

// export default BrakePowerCertificate
