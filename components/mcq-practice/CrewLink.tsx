'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const CrewLink = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All 25 Crew Link MCQ Questions
  const questions: Question[] = [
    {
      id: 1,
      question: "The primary purpose of a Power Link (Engine Link) is to: (Power Link (Engine Link) का मुख्य उद्देश्य क्या है?)",
      options: [
        "Manage crew duty hours",
        "Manage the movement and utilization of locomotives",
        "Manage passenger reservation quotas",
        "Manage rake maintenance"
      ],
      correctAnswer: 1,
      explanation: "The primary purpose of a Power Link (Engine Link) is to manage the movement and utilization of locomotives."
    },
    {
      id: 2,
      question: "Power Links are prepared by which department? (Power Link किस विभाग द्वारा तैयार किए जाते हैं?)",
      options: [
        "Personnel Department",
        "Operating Department",
        "Mechanical Department in coordination with Operating Department",
        "Accounts Department"
      ],
      correctAnswer: 2,
      explanation: "Power Links are prepared by Mechanical Department in coordination with Operating Department."
    },
    {
      id: 3,
      question: "Approval of Power Link is given by: (Power Link की स्वीकृति कौन देता है?)",
      options: [
        "DRM",
        "CPTM (Chief Passenger Transportation Manager)",
        "Sr. DOM",
        "Sr. DME"
      ],
      correctAnswer: 1,
      explanation: "Approval of Power Link is given by CPTM (Chief Passenger Transportation Manager)."
    },
    {
      id: 4,
      question: "Crew Links are drawn as per: (Crew Link किस नियम के अनुसार तैयार किए जाते हैं?)",
      options: [
        "Leave Rules",
        "Hours of Employment Regulations (HOER)",
        "Safety Rules",
        "Rest Rules"
      ],
      correctAnswer: 1,
      explanation: "Crew Links are drawn as per Hours of Employment Regulations (HOER)."
    },
    {
      id: 5,
      question: "Who prepares Crew Links? (Crew Link कौन तैयार करता है?)",
      options: [
        "CTLC / CPRC",
        "CPTM",
        "DRM",
        "Sr.DOM"
      ],
      correctAnswer: 0,
      explanation: "Crew Links are prepared by CTLC / CPRC."
    },
    {
      id: 6,
      question: "The maximum duty hours in any one trip should not exceed: (किसी एक यात्रा में अधिकतम कार्य घंटे कितने होने चाहिए?)",
      options: [
        "8 Hours",
        "10 Hours",
        "12 Hours",
        "14 Hours"
      ],
      correctAnswer: 1,
      explanation: "The maximum duty hours in any one trip should not exceed 10 Hours."
    },
    {
      id: 7,
      question: "Average duty hours in a fortnight should not exceed: (एक पखवाड़े में औसत कार्य घंटे कितने से अधिक नहीं होने चाहिए?)",
      options: [
        "96 Hours",
        "104 Hours",
        "120 Hours",
        "125 Hours"
      ],
      correctAnswer: 1,
      explanation: "Average duty hours in a fortnight should not exceed 104 Hours."
    },
    {
      id: 8,
      question: "Minimum home station rest for duty more than 8 hours is: (यदि पिछली ड्यूटी 8 घंटे या उससे अधिक है, तो न्यूनतम होम स्टेशन विश्राम कितना होगा?)",
      options: [
        "8 Hours",
        "12 Hours",
        "16 Hours",
        "20 Hours"
      ],
      correctAnswer: 2,
      explanation: "Minimum home station rest for duty more than 8 hours is 16 Hours."
    },
    {
      id: 9,
      question: "Leave Reserve for Loco Pilots is: (Loco Pilots के लिए Leave Reserve कितना होता है?)",
      options: [
        "10%",
        "20%",
        "30%",
        "40%"
      ],
      correctAnswer: 2,
      explanation: "Leave Reserve for Loco Pilots is 30%."
    },
    {
      id: 10,
      question: "Trainee Reserve for Loco Pilots is: (Loco Pilots के लिए Trainee Reserve कितना होता है?)",
      options: [
        "5%",
        "10%",
        "15%",
        "20%"
      ],
      correctAnswer: 1,
      explanation: "Trainee Reserve for Loco Pilots is 10%."
    },
    {
      id: 11,
      question: "One Loco Inspector is required for every: (प्रत्येक कितने Loco Pilots के लिए एक Loco Inspector आवश्यक है?)",
      options: [
        "10 LP",
        "25 LP",
        "30 LP",
        "50 LP"
      ],
      correctAnswer: 1,
      explanation: "One Loco Inspector is required for every 25 LP."
    },
    {
      id: 12,
      question: "Loco (Power) Links are prepared by: (Loco Link कौन तैयार करता है?)",
      options: [
        "Divisional Office",
        "Headquarters",
        "DRM Office",
        "ZRTI"
      ],
      correctAnswer: 1,
      explanation: "Loco (Power) Links are prepared by Headquarters."
    },
    {
      id: 13,
      question: "Loco must return to its nominated shed for: (Loco को अपने नामित शेड में किस कार्य के लिए लौटना चाहिए?)",
      options: [
        "Refuelling",
        "Scheduled Servicing",
        "Rest",
        "Change of crew"
      ],
      correctAnswer: 1,
      explanation: "Loco must return to its nominated shed for Scheduled Servicing."
    },
    {
      id: 14,
      question: "The Power Plan is prepared how often? (Power Plan कितनी बार तैयार किया जाता है?)",
      options: [
        "Every month",
        "Every quarter",
        "Once every year",
        "Every six months"
      ],
      correctAnswer: 2,
      explanation: "The Power Plan is prepared once every year."
    },
    {
      id: 15,
      question: "The Power Plan is jointly signed by: (Power Plan पर संयुक्त रूप से हस्ताक्षर कौन करता है?)",
      options: [
        "Sr.DOM & Sr.DEE",
        "Sr.DOM & Sr.DME(P)",
        "CPTM & DRM",
        "PCOM & CPTM"
      ],
      correctAnswer: 1,
      explanation: "The Power Plan is jointly signed by Sr.DOM & Sr.DME(P)."
    },
    {
      id: 16,
      question: "POL stands for: (POL का अर्थ है:)",
      options: [
        "Power Off Line",
        "Power On Line",
        "Power Operation Log",
        "Power of Loco"
      ],
      correctAnswer: 1,
      explanation: "POL stands for Power On Line."
    },
    {
      id: 17,
      question: "Bare POL is calculated as: (Bare POL की गणना का सूत्र क्या है?)",
      options: [
        "HOR + PAD + PDD",
        "PDD × HOR × PAD",
        "PDD – HOR + PAD",
        "Only HOR"
      ],
      correctAnswer: 0,
      explanation: "Bare POL is calculated as HOR + PAD + PDD."
    },
    {
      id: 18,
      question: "Growth and Bunching Allowance in Power Plan are: (Power Plan में Growth और Bunching Allowance कितने प्रतिशत हैं?)",
      options: [
        "3% & 5%",
        "3.5% & 10%",
        "4% & 12%",
        "5% & 8%"
      ],
      correctAnswer: 1,
      explanation: "Growth and Bunching Allowance in Power Plan are 3.5% & 10%."
    },
    {
      id: 19,
      question: "Rake Link is issued by: (Rake Link किसके द्वारा जारी किया जाता है?)",
      options: [
        "DRM",
        "PCOM (Principal Chief Operations Manager)",
        "Sr.DOM",
        "CPTM"
      ],
      correctAnswer: 1,
      explanation: "Rake Link is issued by PCOM (Principal Chief Operations Manager)."
    },
    {
      id: 20,
      question: "The Rake Link Booklet is used by: (Rake Link Booklet का उपयोग कौन करता है?)",
      options: [
        "Only Reservation Staff",
        "Only Operating Department",
        "Operating, Mechanical & Commercial Staff",
        "Accounts Department"
      ],
      correctAnswer: 2,
      explanation: "The Rake Link Booklet is used by Operating, Mechanical & Commercial Staff."
    },
    {
      id: 21,
      question: "Rake Link ensures: (Rake Link किसकी सुनिश्चितता करता है?)",
      options: [
        "Crew Rest",
        "Proper Utilization of Rakes",
        "Maintenance of Loco",
        "Crew Training"
      ],
      correctAnswer: 1,
      explanation: "Rake Link ensures Proper Utilization of Rakes."
    },
    {
      id: 22,
      question: "In Rake Link, Long Distance Trains generally require: (Long Distance Trains में सामान्यतः कितने Rakes आवश्यक होते हैं?)",
      options: [
        "One",
        "Two",
        "Four or more",
        "Five only"
      ],
      correctAnswer: 2,
      explanation: "In Rake Link, Long Distance Trains generally require Four or more rakes."
    },
    {
      id: 23,
      question: "Loco Outage indicates: (Loco Outage किसे दर्शाता है?)",
      options: [
        "Average number of locos under repair",
        "Average number of locos available for traffic use",
        "Average number of locos at shed",
        "Number of locos in idle condition"
      ],
      correctAnswer: 1,
      explanation: "Loco Outage indicates average number of locos under repair."
    },
    {
      id: 24,
      question: "Formula for Loco Outage is: (Loco Outage का सूत्र क्या है?)",
      options: [
        "Engine hours ÷ 12",
        "Engine hours × 24",
        "Engine hours ÷ 24",
        "Train kms ÷ Engine hours"
      ],
      correctAnswer: 2,
      explanation: "Formula for Loco Outage is Engine hours ÷ 24."
    },
    {
      id: 25,
      question: "Loco Utilisation represents: (Loco Utilisation किसे प्रदर्शित करता है?)",
      options: [
        "Loco availability",
        "Loco productivity (km per day)",
        "Crew rest hours",
        "Loco repairs"
      ],
      correctAnswer: 1,
      explanation: "Loco Utilisation represents Loco productivity (km per day)."
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
    if (questionId <= 5) return "Power Link Basics"
    if (questionId <= 10) return "Crew Link & Duty Hours"
    if (questionId <= 15) return "Power Plan & POL"
    if (questionId <= 20) return "Rake Link"
    return "Loco Operations"
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
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Crew Link 25 MCQ Quiz</h1>
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
                      {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
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
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Crew Link Quiz Summary & Overview</h2>
              
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

export default CrewLink
