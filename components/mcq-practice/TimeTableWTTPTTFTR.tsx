'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const TimeTableWTTPTTFTR = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All 25 TIME TABLE WTT/PTT/FTR MCQ Questions
  const questions: Question[] = [
    {
      id: 1,
      question: "Time tables in Indian Railways are usually published and majorly reviewed at what frequency?",
      options: [
        "A. Quarterly",
        "B. Annually",
        "C. Bi-annually",
        "D. Every 5 years"
      ],
      correctAnswer: 1,
      explanation: "The Operating Manual clearly states: 'Time tables are usually published once in a year'."
    },
    {
      id: 2,
      question: "Which type of time table is the most detailed staff document containing sectional information, loads, PSRs (Permanent Speed Restrictions), JPOs, and allowances?",
      options: [
        "A. Public Time Table (PTT)",
        "B. Working Time Table (WTT)",
        "C. Trains At A Glance (TAAG)",
        "D. Sheet TT"
      ],
      correctAnswer: 1,
      explanation: "The Working Time Table (WTT) is the Detailed staff document with sectional information, loads, PSRs, JPOs, and allowances."
    },
    {
      id: 3,
      question: "The annual time table preparation cycle officially begins with the finalization of divisional proposals in which month?",
      options: [
        "A. January",
        "B. May",
        "C. September",
        "D. December"
      ],
      correctAnswer: 2,
      explanation: "The official PTT preparation cycle runs from SEPTEMBER → JUNE. Divisions finalise proposals in September."
    },
    {
      id: 4,
      question: "Which apex national body is responsible for harmonising and finalising all Inter-Railway Time Table-related decisions across Indian Railways?",
      options: [
        "A. Railway Board (RB) Planning Directorate",
        "B. Inter Railway Time Table Co-ordination Committee (IRTTCC)",
        "C. Chief Passenger Transportation Manager (CPTM) Committee",
        "D. Traffic Directors' Steering Committee"
      ],
      correctAnswer: 1,
      explanation: "The Inter-Railway Time Table Coordination Committee (IRTTCC) is the apex national body that finalises all Time Table-related decisions across Indian Railways."
    },
    {
      id: 5,
      question: "The Inter-Railway Time Table Co-ordination Committee Meeting (IRTTCC) is chaired by whom?",
      options: [
        "A. Director (Coaching), Railway Board",
        "B. General Secretary, IRCA",
        "C. Executive Director (Coaching), Railway Board",
        "D. Senior-most CPTM"
      ],
      correctAnswer: 2,
      explanation: "The IRTTCC Meeting is presided by Executive Director (Coaching), Railway Board (RB)."
    },
    {
      id: 6,
      question: "When is the Inter Railway Time Table Committee Meeting (IRTTCC) officially held in the annual cycle?",
      options: [
        "A. September",
        "B. November",
        "C. Feb-March",
        "D. May"
      ],
      correctAnswer: 2,
      explanation: "The IRTTCC Meeting is held during Feb-March. This is the national-level finalisation stage before printing and publication."
    },
    {
      id: 7,
      question: "Orders to print the final Time Table documents (WTT/PTT) are issued by which date?",
      options: [
        "A. 1st January",
        "B. 15th May",
        "C. 1st June",
        "D. 31st March"
      ],
      correctAnswer: 1,
      explanation: "Orders shall be given to print Time Table on 15th May."
    },
    {
      id: 8,
      question: "Which document is defined as the All-India Public Time Table of Indian Railways, consolidating important long-distance train timings?",
      options: [
        "A. Public Time Table (PTT)",
        "B. Working Time Table (WTT)",
        "C. Trains At A Glance (TAAG)",
        "D. Train Control Chart"
      ],
      correctAnswer: 2,
      explanation: "Trains At A Glance (TAAG) is the All-India Public Time Table of Indian Railways."
    },
    {
      id: 9,
      question: "The PTT (Public Time Table) covers the timings of trains for how much area?",
      options: [
        "A. All India",
        "B. One Zone",
        "C. One Division",
        "D. Trunk routes only"
      ],
      correctAnswer: 1,
      explanation: "PTT (Public Time Table) coverage is 'One Zone', while TAAG covers the 'Entire IR'."
    },
    {
      id: 10,
      question: "Who acts as the Member-Secretary of the IRTTCC Meeting?",
      options: [
        "A. General Secretary, IRCA",
        "B. Director (Coaching), Railway Board",
        "C. Executive Director (Coaching), Railway Board",
        "D. ED/ME"
      ],
      correctAnswer: 1,
      explanation: "The Director (Coaching), Railway Board, acts as the Member-Secretary of the IRTTCC."
    },
    {
      id: 11,
      question: "The Operating Manual mandates that all proposals for new trains, extensions, and timing revisions drafted at the Division must show requirements for which resources?",
      options: [
        "A. Revenue earnings and GST implications.",
        "B. Stock/loco/path/crew requirements.",
        "C. Engineering block requirements only.",
        "D. Fare structures and concession rules."
      ],
      correctAnswer: 1,
      explanation: "Each proposal must show stock/loco/path/crew requirement."
    },
    {
      id: 12,
      question: "Decisions taken in the IRTTCC meeting are typically integrated into which key financial document?",
      options: [
        "A. Annual Report of IRCTC",
        "B. Railway Budget",
        "C. Annual Cash Flow Statement",
        "D. Maintenance Budget"
      ],
      correctAnswer: 1,
      explanation: "Decisions taken in this meeting are proposed in the Railway Budget."
    },
    {
      id: 13,
      question: "The final approved Time Table changes decided at IRTTCC must be updated in which digital system/s?",
      options: [
        "A. Only PTT printing modules.",
        "B. ICMS, COA, NTES, and PRS/UTS.",
        "C. Only FOIS and TMS.",
        "D. Only WTT printing modules."
      ],
      correctAnswer: 1,
      explanation: "Data must be updated in: ICMS, COA, NTES, and PRS/UTS."
    },
    {
      id: 14,
      question: "The booking of Special Tourist Coaches, Saloons, and Special Trains on Full Tariff Rates (FTR) is mandatorily governed by which agency?",
      options: [
        "A. Divisional Railway Manager (DRM)",
        "B. Station Commercial Counters",
        "C. IRCTC (Indian Railway Catering and Tourism Corporation)",
        "D. Principal Chief Operations Manager (PCOM)"
      ],
      correctAnswer: 2,
      explanation: "The booking of Special Tourist Coaches, Saloons, and Special Trains on Full Tariff Rates (FTR) is governed by a centralised online booking system operated exclusively by IRCTC, acting as the single-window agency."
    },
    {
      id: 15,
      question: "What is the security deposit amount required per coach for an FTR booking?",
      options: [
        "A. ₹10,000",
        "B. ₹25,000",
        "C. ₹50,000",
        "D. ₹1,00,000"
      ],
      correctAnswer: 2,
      explanation: "The security deposit required is ₹50,000 per coach (refundable subject to conditions)."
    },
    {
      id: 16,
      question: "What is the mandatory minimum time limit for booking an FTR Special Coach/Train before the date of journey?",
      options: [
        "A. 15 days",
        "B. 1 month",
        "C. 3 months",
        "D. 6 months"
      ],
      correctAnswer: 1,
      explanation: "The minimum booking time limit is 1 month before the date of journey. The maximum is 6 months."
    },
    {
      id: 17,
      question: "What is the percentage of service charge levied by Railways on the point-to-point round-trip fare for FTR bookings?",
      options: [
        "A. 5%",
        "B. 15%",
        "C. 30%",
        "D. 50%"
      ],
      correctAnswer: 2,
      explanation: "A 30% service charge is levied on the point-to-point round-trip fare."
    },
    {
      id: 18,
      question: "In FTR booking, Empty Haulage Charge is applied on a minimum chargeable distance of how many kilometres?",
      options: [
        "A. 100 km",
        "B. 200 km",
        "C. 300 km",
        "D. 500 km"
      ],
      correctAnswer: 1,
      explanation: "The Empty Haulage Charge applies with a minimum of 200 km chargeable."
    },
    {
      id: 19,
      question: "Which of the following categories is **NOT** allowed any fare concession on FTR bookings?",
      options: [
        "A. Senior citizens",
        "B. Children",
        "C. Government servants",
        "D. All of the above"
      ],
      correctAnswer: 3,
      explanation: "No fare concession is allowed for Senior citizens, Children, Students, Medical cases, or Govt. servants."
    },
    {
      id: 20,
      question: "What is the facilitation fee percentage levied by IRCTC on the total fare for FTR booking coordination and administrative work?",
      options: [
        "A. 5%",
        "B. 10%",
        "C. 15%",
        "D. 30%"
      ],
      correctAnswer: 0,
      explanation: "IRCTC levies a 5% facilitation fee on the total fare for coordination, registration & administrative work."
    },
    {
      id: 21,
      question: "Which authority is responsible for coordinating with concerned zones, obtaining path feasibility and coach availability for an FTR request?",
      options: [
        "A. The requesting party's agent.",
        "B. The originating Divisional Railway Manager.",
        "C. IRCTC.",
        "D. The Chief Commercial Manager."
      ],
      correctAnswer: 2,
      explanation: "IRCTC performs coordination with Railway zones/divisions, obtaining Path feasibility and Availability of coaches."
    },
    {
      id: 22,
      question: "Manual booking for FTR is allowed only as an exception for which two groups?",
      options: [
        "A. Senior Citizens & Students.",
        "B. Government Departments & PSUs.",
        "C. Paramilitary & Defence Forces.",
        "D. IRCTC Regional Offices & Zonal Railways."
      ],
      correctAnswer: 2,
      explanation: "Manual booking is allowed only for Paramilitary & Defence Forces."
    },
    {
      id: 23,
      question: "TAAG (Trains At A Glance) is the most authoritative publication for timings of which type of trains?",
      options: [
        "A. All passenger/suburban services.",
        "B. Only goods and parcel specials.",
        "C. All important long-distance trains.",
        "D. Only superfast trains."
      ],
      correctAnswer: 2,
      explanation: "TAAG is the most authoritative national publication for all long-distance train timings. The coverage includes 'Only important long-distance trains'."
    },
    {
      id: 24,
      question: "The annual time table preparation cycle culminates in the **publication to the Public (PTT released)** on which date?",
      options: [
        "A. 15th May",
        "B. 1st June",
        "C. 1st July",
        "D. 1st September"
      ],
      correctAnswer: 1,
      explanation: "The cycle culminates in 'Publication to Public (PTT released)' on 1st June."
    },
    {
      id: 25,
      question: "The FTR point-to-point fare is charged on which basis, even if the return journey is empty?",
      options: [
        "A. One-way basis (to destination only).",
        "B. Round-trip basis.",
        "C. Actual occupancy basis.",
        "D. Distance travelled by locomotive only."
      ],
      correctAnswer: 1,
      explanation: "The fare is charged on a round-trip basis. Even if the return is empty, charges apply."
    }
  ]

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (answerIndex: number) => {
    // Don't allow changing answer once selected for current question
    if (answeredQuestions.has(currentQuestion)) {
      return
    }
    
    setSelectedAnswer(answerIndex)
    
    // Update user answers
    setUserAnswers(prev => new Map([...prev, [currentQuestion, answerIndex]]))
    
    // Update score if correct
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1)
    }
    
    // Mark question as answered
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion]))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      const nextQuestionIndex = currentQuestion + 1
      setCurrentQuestion(nextQuestionIndex)
      // Restore previous answer if question was already answered
      const previousAnswer = userAnswers.get(nextQuestionIndex)
      setSelectedAnswer(previousAnswer !== undefined ? previousAnswer : null)
    } else {
      // Quiz completed
      setQuizCompleted(true)
      setShowSummary(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const previousQuestionIndex = currentQuestion - 1
      setCurrentQuestion(previousQuestionIndex)
      // Restore previous answer if question was already answered
      const previousAnswer = userAnswers.get(previousQuestionIndex)
      setSelectedAnswer(previousAnswer !== undefined ? previousAnswer : null)
    }
  }

  const handleQuestionJump = (questionIndex: number) => {
    setCurrentQuestion(questionIndex)
    // Restore previous answer if question was already answered
    const previousAnswer = userAnswers.get(questionIndex)
    setSelectedAnswer(previousAnswer !== undefined ? previousAnswer : null)
  }

  const isCorrect = selectedAnswer === questions[currentQuestion]?.correctAnswer

  // Calculate quiz statistics
  const totalQuestions = questions.length
  const answeredCount = answeredQuestions.size
  const correctCount = score
  const incorrectCount = answeredCount - correctCount
  const percentage = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0
  const timeSpent = 3600 - timeLeft
  const timeSpentMinutes = Math.floor(timeSpent / 60)
  const timeSpentSeconds = timeSpent % 60

  // Get question categories for analysis
  const getQuestionCategory = (questionId: number) => {
    if (questionId <= 5) return "Time Table Basics"
    if (questionId <= 10) return "IRTTCC & Preparation"
    if (questionId <= 15) return "WTT/PTT/TAAG"
    if (questionId <= 20) return "FTR Booking & Charges"
    return "FTR Procedures & Rules"
  }

  // Calculate category-wise performance
  const categoryPerformance = questions.reduce((acc, question) => {
    const category = getQuestionCategory(question.id)
    if (!acc[category]) {
      acc[category] = { total: 0, correct: 0 }
    }
    acc[category].total++
    if (userAnswers.get(question.id - 1) === question.correctAnswer) {
      acc[category].correct++
    }
    return acc
  }, {} as Record<string, { total: number; correct: number }>)

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setAnsweredQuestions(new Set())
    setTimeLeft(3600)
    setQuizCompleted(false)
    setUserAnswers(new Map())
    setShowSummary(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center lg:flex-row flex-col gap-3">
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Time Table WTT/PTT/FTR 25 MCQ Quiz</h1>
            <div className="text-right">
              <div className="lg:text-2xl text-xl font-semibold text-blue-600 text-center">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-600">Time Remaining</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>Score: {score}/{answeredQuestions.size}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Question Navigation</h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, index) => {
                  const userAnswer = userAnswers.get(index)
                  const isCorrect = userAnswer !== undefined && userAnswer === questions[index].correctAnswer
                  const isAnswered = answeredQuestions.has(index)
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionJump(index)}
                      className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                        index === currentQuestion
                          ? 'bg-blue-600 text-white'
                          : isAnswered && isCorrect
                          ? 'bg-green-500 text-white'
                          : isAnswered && !isCorrect
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 text-xs text-gray-600">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Correct</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Incorrect</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span>Not Answered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-3 lg:p-6">
              {questions[currentQuestion] && (
                <>
                  <div className="mb-6">
                    <h2 className="lg:text-xl text-base font-semibold text-gray-800 mb-4">
                      {questions[currentQuestion].question}
                    </h2>
                    
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <label
                          key={index}
                          className={`block lg:p-4 p-2 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedAnswer === index
                              ? selectedAnswer !== null && answeredQuestions.has(currentQuestion)
                                ? isCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-red-500 bg-red-50'
                                : 'border-blue-500 bg-blue-50'
                              : index === questions[currentQuestion].correctAnswer && selectedAnswer !== null && answeredQuestions.has(currentQuestion) && selectedAnswer !== index
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          } ${answeredQuestions.has(currentQuestion) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={index}
                            checked={selectedAnswer === index}
                            onChange={() => handleAnswerSelect(index)}
                            className="sr-only"
                            disabled={answeredQuestions.has(currentQuestion)}
                          />
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                              selectedAnswer === index
                                ? selectedAnswer !== null && answeredQuestions.has(currentQuestion)
                                  ? isCorrect
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-red-500 bg-red-500'
                                  : 'border-blue-500 bg-blue-500'
                                : index === questions[currentQuestion].correctAnswer && selectedAnswer !== null && answeredQuestions.has(currentQuestion)
                                ? 'border-green-500 bg-green-500'
                                : 'border-gray-300'
                            }`}>
                              {(selectedAnswer === index || (index === questions[currentQuestion].correctAnswer && selectedAnswer !== null && answeredQuestions.has(currentQuestion))) && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="text-gray-700">{option}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {selectedAnswer !== null && (
                    <div className="mb-6 p-4 rounded-lg bg-gray-50">
                      <div className={`text-lg font-semibold mb-2 ${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Correct Answer: {questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Explanation:</strong> {questions[currentQuestion].explanation}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="px-6 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                    >
                      Previous
                    </button>

                    <button
                      onClick={handleNext}
                      disabled={selectedAnswer === null}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
                    >
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quiz Summary Modal */}
        {(quizCompleted || timeLeft === 0) && showSummary && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 my-8 max-h-[90vh] overflow-y-auto">
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Time Table WTT/PTT/FTR Quiz Summary & Overview</h2>
              
              {/* Overall Score */}
              <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-6 text-white">
                <div className="text-center">
                  <div className="lg:text-5xl text-2xl font-bold mb-2">{correctCount}/{totalQuestions}</div>
                  <div className="lg:text-xl text-base mb-2">Your Score</div>
                  <div className="lg:text-3xl text-xl font-bold">{percentage}%</div>
                  <div className="text-sm mt-2">Time Spent: {timeSpentMinutes}m {timeSpentSeconds}s</div>
                </div>
              </div>

              {/* Performance Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="lg:text-2xl text-xl font-bold text-green-600">{correctCount}</div>
                  <div className="text-green-700">Correct Answers</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="lg:text-2xl text-xl font-bold text-red-600">{incorrectCount}</div>
                  <div className="text-red-700">Incorrect Answers</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="lg:text-2xl text-xl font-bold text-blue-600">{totalQuestions - answeredCount}</div>
                  <div className="text-blue-700">Unanswered</div>
                </div>
              </div>

              {/* Category-wise Performance */}
              <div className="mb-6">
                <h3 className="lg:text-xl text-base font-semibold mb-4 text-gray-800">Category-wise Performance</h3>
                <div className="space-y-3">
                  {Object.entries(categoryPerformance).map(([category, data]) => {
                    const categoryPercentage = Math.round((data.correct / data.total) * 100)
                    return (
                      <div key={category} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">{category}</span>
                          <span className="text-sm text-gray-600">{data.correct}/{data.total}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              categoryPercentage >= 80 ? 'bg-green-500' :
                              categoryPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${categoryPercentage}%` }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{categoryPercentage}%</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Question Review */}
              <div className="mb-6">
                <h3 className="lg:text-xl text-base font-semibold mb-4 text-gray-800">Question Review</h3>
                <div className="max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((question, index) => {
                      const userAnswer = userAnswers.get(index)
                      const isCorrect = userAnswer === question.correctAnswer
                      const isAnswered = userAnswer !== undefined
                      
                      return (
                        <div
                          key={index}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                            !isAnswered ? 'bg-gray-200 text-gray-600' :
                            isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}
                          title={`Q${index + 1}: ${isAnswered ? (isCorrect ? 'Correct' : 'Incorrect') : 'Not Answered'}`}
                        >
                          {index + 1}
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span>Correct</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span>Incorrect</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded"></div>
                      <span>Not Answered</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Question Analysis */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Detailed Analysis</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {questions.map((question, index) => {
                    const userAnswer = userAnswers.get(index)
                    const isCorrect = userAnswer === question.correctAnswer
                    const isAnswered = userAnswer !== undefined
                    
                    if (!isAnswered) return null
                    
                    return (
                      <div key={index} className={`border-l-4 p-4 rounded-r-lg ${
                        isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-gray-800">Question {index + 1}</span>
                          <span className={`text-sm font-medium ${
                            isCorrect ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700 mb-2">{question.question}</div>
                        <div className="text-xs text-gray-600">
                          <div>Your Answer: {isAnswered ? question.options[userAnswer] : 'Not answered'}</div>
                          <div>Correct Answer: {question.options[question.correctAnswer]}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleRestartQuiz}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Restart Quiz
                </button>
                <button
                  onClick={() => setShowSummary(false)}
                  className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Close Summary
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TimeTableWTTPTTFTR
