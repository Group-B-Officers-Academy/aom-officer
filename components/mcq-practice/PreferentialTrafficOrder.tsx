// 'use client'

// import React, { useState, useEffect } from 'react'

// interface Question {
//   id: number
//   question: string
//   options: string[]
//   correctAnswer: number
//   explanation: string
// }

// const PreferentialTrafficOrder = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [score, setScore] = useState(0)
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
//   const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
//   const [quizCompleted, setQuizCompleted] = useState(false)
//   const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
//   const [showSummary, setShowSummary] = useState(false)

//   // All 20 Preferential Traffic Order MCQ Questions
//   const questions: Question[] = [
//     {
//       id: 1,
//       question: "Which traffic gets unconditional top priority under PTO-99? / PTO-99 के अनुसार सर्वोच्च प्राथमिकता किसे मिलती है?",
//       options: [
//         "Food grains for PDS",
//         "Military traffic sponsored by MILRAIL",
//         "POL traffic",
//         "Levy sugar"
//       ],
//       correctAnswer: 1,
//       explanation: "Military traffic sponsored by MILRAIL and approved by Railway Board is Priority A — highest priority."
//     },
//     {
//       id: 2,
//       question: "Priority 'B' includes which item? / प्राथमिकता 'B' में क्या शामिल है?",
//       options: [
//         "All salt traffic",
//         "Food grains except quota",
//         "Coal traffic",
//         "Iron ore traffic"
//       ],
//       correctAnswer: 1,
//       explanation: "Priority B covers food grains (except quota), levy sugar, and emergency relief materials."
//     },
//     {
//       id: 3,
//       question: "Under which legal provision is PTO-99 issued? / PTO-99 किस कानूनी प्रावधान के तहत जारी है?",
//       options: [
//         "Section 70",
//         "Section 71",
//         "Section 73",
//         "Section 111"
//       ],
//       correctAnswer: 1,
//       explanation: "PTO is issued under Section 71 of Railways Act, empowering preference to certain goods."
//     },
//     {
//       id: 4,
//       question: "Rake allotment by date of registration occurs on which days? / पंजीकरण तिथि के आधार पर रेक कब आवंटित होते हैं?",
//       options: [
//         "Monday & Friday",
//         "Tuesday & Thursday",
//         "Wednesday & Saturday",
//         "Sunday & Monday"
//       ],
//       correctAnswer: 2,
//       explanation: "Wednesdays and Saturdays are fixed for date-based allotment."
//     },
//     {
//       id: 5,
//       question: "Premium indent gets priority on which days? / प्रीमियम इंडेंट को किन दिनों प्राथमिकता मिलती है?",
//       options: [
//         "Friday & Monday",
//         "Wednesday & Saturday",
//         "Tuesday & Sunday",
//         "Thursday & Saturday"
//       ],
//       correctAnswer: 0,
//       explanation: "Premium indent scheme is prioritized on Monday and Friday."
//     },
//     {
//       id: 6,
//       question: "Which traffic is always preferred over piecemeal? / किस यातायात को पीसमील से अधिक प्राथमिकता मिलती है?",
//       options: [
//         "POL traffic",
//         "Fertilizer traffic",
//         "Block/clubbed rakes",
//         "Salt traffic"
//       ],
//       correctAnswer: 2,
//       explanation: "Block rakes get preference irrespective of priority class."
//     },
//     {
//       id: 7,
//       question: "Priority C+ applies to which movement? / प्राथमिकता C+ किस पर लागू होती है?",
//       options: [
//         "Iron ore: terminal to non-owned terminal",
//         "Private siding to private siding of same owner",
//         "Iron ore to PFT terminal",
//         "Iron ore in piecemeal"
//       ],
//       correctAnswer: 1,
//       explanation: "C+ applies when both loading and unloading are customer's own private sidings."
//     },
//     {
//       id: 8,
//       question: "Coal program acceptance for ER/ECR/SER/SECR/ECoR is done by? / इन जोनों के लिए कोयला कार्यक्रम कौन स्वीकार करता है?",
//       options: [
//         "PCOM of Zonal Railway",
//         "ED Rail Movement, Kolkata",
//         "Railway Board",
//         "Sr.DOM"
//       ],
//       correctAnswer: 1,
//       explanation: "ED Rail Movement (Kolkata) accepts coal sponsorship for these zones."
//     },
//     {
//       id: 9,
//       question: "Imported coal indent is auto-accepted based on which document? / आयातित कोयले के लिए कौन सा दस्तावेज़ आवश्यक है?",
//       options: [
//         "Letter of Credit",
//         "Certificate of Origin",
//         "Bill of Entry",
//         "Delivery Order"
//       ],
//       correctAnswer: 2,
//       explanation: "System verifies Bill of Entry before auto-acceptance."
//     },
//     {
//       id: 10,
//       question: "Lowest priority category under PTO-99? / PTO-99 में सबसे कम प्राथमिकता किसकी है?",
//       options: [
//         "Priority C",
//         "Priority B",
//         "Priority D",
//         "Priority A"
//       ],
//       correctAnswer: 2,
//       explanation: "Priority D covers all traffic not included in A–C."
//     },
//     {
//       id: 11,
//       question: "POL traffic is sponsored by whom? / POL यातायात को कौन प्रायोजित करता है?",
//       options: [
//         "Ministry of Commerce",
//         "FCI",
//         "Oil companies",
//         "Customs Dept."
//       ],
//       correctAnswer: 2,
//       explanation: "POL traffic is sponsored by oil companies; accepted by Railway Board."
//     },
//     {
//       id: 12,
//       question: "Programmed traffic (non-coal, non-iron ore) falls under? / कार्यक्रमयुक्त माल (कोयला/लौह अयस्क नहीं) किस प्राथमिकता में आता है?",
//       options: [
//         "A",
//         "B",
//         "C",
//         "D"
//       ],
//       correctAnswer: 2,
//       explanation: "Programmed traffic like salt, fertilizer is Priority C."
//     },
//     {
//       id: 13,
//       question: "PFT owners get which priority in iron ore movement? / लोहे के अयस्क में PFT मालिकों को कौन सी प्राथमिकता मिलती है?",
//       options: [
//         "C+",
//         "C",
//         "C−",
//         "No higher priority"
//       ],
//       correctAnswer: 3,
//       explanation: "PFT owners do not get higher priority; treated like goods sheds."
//     },
//     {
//       id: 14,
//       question: "Highest priority among iron-ore categories? / लौह अयस्क श्रेणियों में सर्वोच्च प्राथमिकता कौन सी है?",
//       options: [
//         "C",
//         "C−",
//         "C+",
//         "D"
//       ],
//       correctAnswer: 2,
//       explanation: "Priority order: C+ > C > C−."
//     },
//     {
//       id: 15,
//       question: "Wednesday & Saturday allotment is based on? / बुधवार-शनिवार को किस आधार पर आवंटन होता है?",
//       options: [
//         "Premium indents only",
//         "Priority A only",
//         "Date of registration only",
//         "Operational convenience"
//       ],
//       correctAnswer: 2,
//       explanation: "These days rakes are allotted strictly by date of registration."
//     },
//     {
//       id: 16,
//       question: "WCL coal in SECR/SCR territory is approved by? / SECR/SCR क्षेत्र में स्थित WCL कोयले का कार्यक्रम कौन मंजूर करता है?",
//       options: [
//         "Railway Board",
//         "PCOM/CFTM Central Railway",
//         "GM SECR",
//         "PCOM ECoR"
//       ],
//       correctAnswer: 1,
//       explanation: "PTO specifies approval by PCOM/CFTM Central Railway."
//     },
//     {
//       id: 17,
//       question: "Higher preference within same priority class is given to? / समान प्राथमिकता वर्ग में किसे अधिक वरीयता मिलती है?",
//       options: [
//         "Two-point rakes",
//         "Short-distance traffic",
//         "Mechanized loading sidings",
//         "Piecemeal traffic"
//       ],
//       correctAnswer: 2,
//       explanation: "Mechanized loading sidings get higher preference."
//     },
//     {
//       id: 18,
//       question: "Traffic priority can be upgraded by whom? / किसके द्वारा प्राथमिकता बढ़ाई जा सकती है?",
//       options: [
//         "GM only",
//         "DRM only",
//         "Railway Board / Zonal Railway",
//         "Station Master"
//       ],
//       correctAnswer: 2,
//       explanation: "Special orders from Railway Board or Zonal Railway can upgrade priority."
//     },
//     {
//       id: 19,
//       question: "Which is NOT part of Priority B? / निम्न में से क्या प्राथमिकता B का हिस्सा नहीं है?",
//       options: [
//         "Emergency relief goods",
//         "Levy sugar",
//         "PDS quota food grains",
//         "Food grains except quota"
//       ],
//       correctAnswer: 2,
//       explanation: "PDS quota food grains are excluded from Priority B."
//     },
//     {
//       id: 20,
//       question: "PTO-99 is valid up to which date? / PTO-99 किस तिथि तक मान्य है?",
//       options: [
//         "31 March 2025",
//         "31 March 2026",
//         "1 April 2026",
//         "30 June 2026"
//       ],
//       correctAnswer: 1,
//       explanation: "PTO-99 is valid from 1 April 2025 to 31 March 2026."
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
//     if (questionId <= 4) return "Priority Classes"
//     if (questionId <= 8) return "Rake Allotment"
//     if (questionId <= 12) return "Coal & POL Traffic"
//     if (questionId <= 16) return "Iron Ore Priorities"
//     return "General Rules"
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
//             <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Preferential Traffic Order (PTO-99) MCQ Quiz</h1>
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
//                       {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
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
//               <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Preferential Traffic Order (PTO-99) Quiz Summary & Overview</h2>
              
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

// export default PreferentialTrafficOrder
