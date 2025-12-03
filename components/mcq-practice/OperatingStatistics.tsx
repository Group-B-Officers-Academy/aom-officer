// 'use client'

// import React, { useState, useEffect } from 'react'

// interface Question {
//   id: number
//   question: string
//   options: string[]
//   correctAnswer: number
//   explanation: string
// }

// const OperatingStatistics = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [score, setScore] = useState(0)
//   const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
//   const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
//   const [quizCompleted, setQuizCompleted] = useState(false)
//   const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
//   const [showSummary, setShowSummary] = useState(false)

//   // All 25 Operating Statistics MCQ Questions
//   const questions: Question[] = [
//     {
//       id: 1,
//       question: "Operating Statistics are based on four key parameters. Which of the following is NOT one of these key parameters?",
//       options: [
//         "A. Quantity",
//         "B. Distance",
//         "C. Duration",
//         "D. Revenue"
//       ],
//       correctAnswer: 3,
//       explanation: "The four key parameters for railway statistics are Quantity, Distance, Duration, and Service. Revenue (Earnings) is a result derived from these parameters, not a base parameter class."
//     },
//     {
//       id: 2,
//       question: "Which type of statistical unit measures fundamental quantities directly associated with railway operations, such as Tonnes, Passengers, or Trains?",
//       options: [
//         "A. Fundamental Units",
//         "B. Derived Units",
//         "C. Primary Units",
//         "D. Composite Units"
//       ],
//       correctAnswer: 2,
//       explanation: "Primary Units are the basic statistical units that measure fundamental quantities directly associated with railway operations. Tonnes and Passengers are examples of Primary Units (Quantity)."
//     },
//     {
//       id: 3,
//       question: "What is the mathematical relationship that forms the Fundamental Unit **Tonne-km**?",
//       options: [
//         "A. Tonnes + Km",
//         "B. Tonnes / Km",
//         "C. Tonnes x Km",
//         "D. Tonnes x Hours"
//       ],
//       correctAnswer: 2,
//       explanation: "The fundamental unit Tonne-km is calculated as Tonnes x Km, and represents Goods traffic carried over distance."
//     },
//     {
//       id: 4,
//       question: "Which statistical unit highlights **Productivity, Efficiency, and Operational Performance**?",
//       options: [
//         "A. Primary Units",
//         "B. Fundamental Units",
//         "C. Basic Units",
//         "D. Derived Units"
//       ],
//       correctAnswer: 3,
//       explanation: "Derived Units express the relationship between two sets of primary or fundamental units and highlight Productivity, Efficiency, and Operational performance."
//     },
//     {
//       id: 5,
//       question: "The derived unit **Wagon-km $\div$ Wagon-days** is a key indicator for monitoring which operational factor?",
//       options: [
//         "A. Locomotive utilization",
//         "B. Train load average",
//         "C. Wagon utilization",
//         "D. Passenger traffic density"
//       ],
//       correctAnswer: 2,
//       explanation: "Wagon-km per Wagon-day (Wagon-km ÷ Wagon-days) is the key indicator of wagon utilisation."
//     },
//     {
//       id: 6,
//       question: "Which type of statistical unit is specifically referred to as a **Composite Unit**?",
//       options: [
//         "A. Primary Units",
//         "B. Derived Units",
//         "C. Basic Units",
//         "D. Fundamental Units"
//       ],
//       correctAnswer: 3,
//       explanation: "Fundamental Units are also known as Composite Units, and they express the relationship between two primary ideas combined."
//     },
//     {
//       id: 7,
//       question: "Which of the following is NOT an example of a Primary Unit?",
//       options: [
//         "A. Passengers Carried",
//         "B. Kilometres (Km)",
//         "C. Train-km",
//         "D. Tonnes (Goods carried)"
//       ],
//       correctAnswer: 2,
//       explanation: "Train-km (Train run x Km) is a Fundamental Unit. Tonnes, Kilometres, and Passengers are all examples of Primary Units."
//     },
//     {
//       id: 8,
//       question: "The purpose of calculating the derived unit **Passenger-km $\div$ Number of Passengers** is to find the:",
//       options: [
//         "A. Earnings per Passenger",
//         "B. Average speed of the train",
//         "C. Average Lead of Passenger Traffic",
//         "D. Total traffic density"
//       ],
//       correctAnswer: 2,
//       explanation: "Passenger-km $\div$ Number of Passengers gives the Average Lead of Passenger Traffic, which indicates the average distance travelled per passenger."
//     },
//     {
//       id: 9,
//       question: "The Fundamental Unit **Engine hours** is a measure of:",
//       options: [
//         "A. Total hours worked by crew",
//         "B. Utilisation of locomotive",
//         "C. Hours a wagon is held (Wagon-days)",
//         "D. Time taken for maintenance"
//       ],
//       correctAnswer: 1,
//       explanation: "Engine hours (Time Loco in use) measures the Utilisation of locomotive."
//     },
//     {
//       id: 10,
//       question: "The derived unit calculated as **Passenger Earnings $\div$ Passenger-km** measures:",
//       options: [
//         "A. Earnings per Passenger",
//         "B. Average Lead",
//         "C. Earnings per unit traffic work",
//         "D. Total operational expenditure"
//       ],
//       correctAnswer: 2,
//       explanation: "Passenger Earnings $\div$ Passenger-km measures Earnings per Passenger-km, which indicates revenue per unit traffic work."
//     },
//     {
//       id: 11,
//       question: "Which statistical units are considered the building blocks of all operating statistics?",
//       options: [
//         "A. Derived Units",
//         "B. Fundamental Units",
//         "C. Composite Units",
//         "D. Primary Units"
//       ],
//       correctAnswer: 3,
//       explanation: "Primary units are the building blocks of all operating statistics."
//     },
//     {
//       id: 12,
//       question: "Which of the following is a Primary Unit under the category **Duration**?",
//       options: [
//         "A. Trains",
//         "B. Tonnes",
//         "C. Kilometres",
//         "D. Hours"
//       ],
//       correctAnswer: 3,
//       explanation: "Duration (Time) is measured in Minutes, Hours, and Days. Trains (Service), Tonnes (Quantity), and Kilometres (Distance) are different categories."
//     },
//     {
//       id: 13,
//       question: "The Fundamental Unit **Passenger-km** signifies:",
//       options: [
//         "A. Revenue generated per train.",
//         "B. Passenger traffic carried over distance.",
//         "C. Total number of coaches run.",
//         "D. Distance covered by locomotives."
//       ],
//       correctAnswer: 1,
//       explanation: "Passenger-km (Passengers x Km) signifies Passenger traffic carried over distance."
//     },
//     {
//       id: 14,
//       question: "Derived Units express the relationship between:",
//       options: [
//         "A. Two Primary Units only",
//         "B. Two sets of primary or fundamental units",
//         "C. Service and Duration only",
//         "D. Quantity and Distance only"
//       ],
//       correctAnswer: 1,
//       explanation: "Derived units express the relationship between two sets of primary or fundamental units."
//     },
//     {
//       id: 15,
//       question: "Operating statistics help in all the following managerial functions EXCEPT:",
//       options: [
//         "A. Traffic planning and capacity utilization monitoring",
//         "B. Evaluating throughput and improving utilization",
//         "C. Controlling expenditure",
//         "D. Defining the sectional ruling gradient"
//       ],
//       correctAnswer: 3,
//       explanation: "Operating statistics are used for planning, monitoring, evaluation, and decision-making for asset deployment and controlling expenditure. Defining the ruling gradient is a Civil Engineering function."
//     },
//     {
//       id: 16,
//       question: "The derived unit is calculated as **Passenger Earnings $\div$ Passengers Carried**?",
//       options: [
//         "A. Earnings per Passenger",
//         "B. Average Lead",
//         "C. Earnings per Passenger-km",
//         "D. Total Passenger Revenue"
//       ],
//       correctAnswer: 0,
//       explanation: "Passenger Earnings $\div$ Passengers Carried measures Earnings per Passenger, which indicates revenue efficiency per passenger."
//     },
//     {
//       id: 17,
//       question: "Which of the following is categorized under the Primary Unit **Service Performed**?",
//       options: [
//         "A. Tonnes",
//         "B. Days",
//         "C. Vehicles",
//         "D. Kilometres"
//       ],
//       correctAnswer: 2,
//       explanation: "Service Performed is expressed in terms of Trains, Vehicles, Wagons, and Engines (Locomotives). Tonnes (Quantity), Days (Duration), and Kilometres (Distance) are separate categories."
//     },
//     {
//       id: 18,
//       question: "The Fundamental Unit **Tonne-km** signifies:",
//       options: [
//         "A. Distance covered by goods only.",
//         "B. Goods traffic carried over distance.",
//         "C. Load per wagon.",
//         "D. Wagon availability."
//       ],
//       correctAnswer: 1,
//       explanation: "Tonne-km signifies Goods traffic carried over distance."
//     },
//     {
//       id: 19,
//       question: "The Fundamental Unit **Wagon-days** (Time wagons in holding) is primarily a measure of:",
//       options: [
//         "A. Wagon movement",
//         "B. Availability measure",
//         "C. Utilisation of locomotive",
//         "D. Average speed"
//       ],
//       correctAnswer: 1,
//       explanation: "Wagon-days (Time wagons in holding) is an Availability measure."
//     },
//     {
//       id: 20,
//       question: "The fundamental unit **Train-km** represents:",
//       options: [
//         "A. Total revenue from a train.",
//         "B. Total distance covered by trains.",
//         "C. Number of trains run per hour.",
//         "D. Distance covered by coaches."
//       ],
//       correctAnswer: 1,
//       explanation: "Train-km (Train run x Km) represents the Total distance covered by trains."
//     },
//     {
//       id: 21,
//       question: "How are Fundamental Units created?",
//       options: [
//         "A. They are defined by the government.",
//         "B. They are relationships between primary units.",
//         "C. They are fixed values (constants).",
//         "D. They are derived from Composite Units."
//       ],
//       correctAnswer: 1,
//       explanation: "Fundamental Units are created as relationships between primary units, expressing two primary ideas combined."
//     },
//     {
//       id: 22,
//       question: "The term 'Average Lead' in passenger traffic is another name for the:",
//       options: [
//         "A. Earnings per Passenger-km.",
//         "B. Average distance travelled per passenger.",
//         "C. Total passenger-km.",
//         "D. Passenger density."
//       ],
//       correctAnswer: 1,
//       explanation: "The Average Lead of Passenger Traffic 'Indicates average distance travelled per passenger'."
//     },
//     {
//       id: 23,
//       question: "The Primary Unit **Quantity (weight)** is expressed as:",
//       options: [
//         "A. Kilometres",
//         "B. Tonnes",
//         "C. Trains",
//         "D. Hours"
//       ],
//       correctAnswer: 1,
//       explanation: "Quantity (weight) is expressed as Tonnes (Goods carried), Number of Passengers carried, and Earnings derived."
//     },
//     {
//       id: 24,
//       question: "The Fundamental Unit **Wagon-km** measures:",
//       options: [
//         "A. Wagon availability",
//         "B. Total distance covered by goods",
//         "C. Wagon movement over distance",
//         "D. Load per wagon"
//       ],
//       correctAnswer: 2,
//       explanation: "Wagon-km (Wagons x Km) measures Wagon movement over distance."
//     },
//     {
//       id: 25,
//       question: "Operating Statistics support which aspects of railway management?",
//       options: [
//         "A. Strategic only",
//         "B. Tactical only",
//         "C. Both strategic and tactical railway management",
//         "D. Only engineering and safety management"
//       ],
//       correctAnswer: 2,
//       explanation: "Operating statistics support both strategic and tactical railway management."
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
//     if (questionId <= 10) return "Primary Units"
//     if (questionId <= 15) return "Fundamental Units"
//     if (questionId <= 20) return "Derived Units"
//     return "Management Applications"
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
//             <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Operating Statistics MCQ Quiz</h1>
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
//               <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Operating Statistics Quiz Summary & Overview</h2>
              
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

// export default OperatingStatistics
