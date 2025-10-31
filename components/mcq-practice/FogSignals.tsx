'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const FogSignals = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All 20 FOG SIGNALS MCQ Questions
  const questions: Question[] = [
    {
      id: 1,
      question: "What is the main purpose of a detonator? / किसी डेटोनेटर का मुख्य उद्देश्य क्या है?",
      options: [
        "To change signal aspect / सिग्नल का रंग बदलने के लिए",
        "To attract the attention of the Loco Pilot / लोको पायलट का ध्यान आकर्षित करने हेतु",
        "To measure visibility / दृश्यता मापने हेतु",
        "To mark block section limit / ब्लॉक सेक्शन की सीमा बताने हेतु"
      ],
      correctAnswer: 1,
      explanation: "A detonator explodes with a loud sound when a vehicle passes over it to attract attention during fog (GR 3.61)"
    },
    {
      id: 2,
      question: "Normal safety distance during a detonator explosion is— / डेटोनेटर विस्फोट के समय सामान्य सुरक्षा दूरी कितनी होती है?",
      options: [
        "25 m",
        "35 m",
        "45 m",
        "60 m"
      ],
      correctAnswer: 2,
      explanation: "Minimum 45 metres must be kept as safety radius during explosion"
    },
    {
      id: 3,
      question: "Who maintains stock of detonators? / डेटोनेटर का भंडार कौन रखता है?",
      options: [
        "Sr.DEN",
        "DRM",
        "PWI",
        "Station Master"
      ],
      correctAnswer: 1,
      explanation: "Stock of detonators is maintained by DRM and supplied to SM, PWI & CCC"
    },
    {
      id: 4,
      question: "Who supplies detonators to Loco Pilots? / लोको पायलट को डेटोनेटर कौन उपलब्ध कराताह?",
      options: [
        "SM",
        "CCC (Running Shed)",
        "PWI",
        "TWD Operator"
      ],
      correctAnswer: 1,
      explanation: "Running Sheds (CCC) issue detonators to Loco Pilots"
    },
    {
      id: 5,
      question: "Number of detonators per fog-signalman— / प्रत्येक फॉग सिग्नलमैन को कितने डेटोनेटर दिए जाते हैं?",
      options: [
        "10",
        "12",
        "16",
        "20"
      ],
      correctAnswer: 3,
      explanation: "Each fog signalman is issued 20 detonators"
    },
    {
      id: 6,
      question: "Life of a detonator manufactured after 2010 is— / सन् 2010 के बाद बने डेटोनेटर की आयु",
      options: [
        "7 years",
        "5 years",
        "10 years",
        "3 years"
      ],
      correctAnswer: 1,
      explanation: "Normal life 5 years; extendable 1 year × 3 times"
    },
    {
      id: 7,
      question: "Testing frequency of detonators— / डेटोनेटर की जांच कितनी अवधि में की जाती है?",
      options: [
        "6 months",
        "12 months",
        "24 months",
        "36 months"
      ],
      correctAnswer: 1,
      explanation: "Every 12 months using an empty wagon moving 8–11 km/h"
    },
    {
      id: 8,
      question: "VTO stands for— / VTO का पूरा नाम क्या है?",
      options: [
        "Visibility Test Object",
        "Visual Track Observation",
        "Visibility Trial Order",
        "Visual Target Object"
      ],
      correctAnswer: 0,
      explanation: "Used to check adequacy of visibility of signals"
    },
    {
      id: 9,
      question: "Distance of VTO from SM's nominated position— / स्टेशन मास्टर के नामित स्थान से VTO कितनी दूरी पर है ?",
      options: [
        "90 m",
        "120 m",
        "180 m",
        "270 m"
      ],
      correctAnswer: 2,
      explanation: "In MACLS stations, VTO is located 180 m away"
    },
    {
      id: 10,
      question: "VTP (Visibility Test Post) is provided when— / VTP कब प्रदान किया जाता है?",
      options: [
        "When curve or no signal available",
        "At LC gate",
        "At yard limit",
        "At loop line end"
      ],
      correctAnswer: 0,
      explanation: "Where VTO cannot be nominated due to curve or no signal"
    },
    {
      id: 11,
      question: "Colour of VTP post— / VTP पोस्ट का रंग क्या होता है?",
      options: [
        "Red & White",
        "Yellow (Self-luminous)",
        "Black & White",
        "Green"
      ],
      correctAnswer: 1,
      explanation: "Painted with self-luminous yellow colour for visibility"
    },
    {
      id: 12,
      question: "Distance of Fog Signal Post (FSP) from First Stop Signal— / FSP पहले स्टॉप सिग्नल से कितनी दूरी पर होता है?",
      options: [
        "180 m",
        "270 m",
        "90 m",
        "120 m"
      ],
      correctAnswer: 1,
      explanation: "Fog Signal Post is erected 270 m behind FSS in either direction"
    },
    {
      id: 13,
      question: "How many Fog Signalmen are deployed at each station? / प्रत्येक स्टेशन पर कितने फॉग सिग्नलमैन तैनात किए जाते हैं?",
      options: [
        "Two (Operating) only",
        "Two (Engg.) only",
        "Four (2 + 2)",
        "One each side"
      ],
      correctAnswer: 2,
      explanation: "Two from Operating and two from Engineering"
    },
    {
      id: 14,
      question: "How are detonators placed at FSP as per SR 3.61.9? / SR 3.61.9 के अनुसार डेटोनेटर कैसे रखे जाते हैं?",
      options: [
        "One at FSP and one 10 m apart for each direction",
        "Two at same spot",
        "Three within 5 m",
        "None"
      ],
      correctAnswer: 0,
      explanation: "Each direction — 20 detonators taken to FSP; one placed at FSP and others 10m apart"
    },
    {
      id: 15,
      question: "Station Detonator Register Part I contains— / स्टेशन डेटोनेटर रजिस्टर के भाग-I में क्या लिखा होता है?",
      options: [
        "Receipt of detonators",
        "Issue record",
        "Fog Signalmen details",
        "Testing details"
      ],
      correctAnswer: 2,
      explanation: "Part I records names & signatures of Fog Signalmen posted at station"
    },
    {
      id: 16,
      question: "When should SM arrange fog signalling? / SM को फॉग सिग्नलिंग कब करानी चाहिए?",
      options: [
        "When VTO is visible",
        "When VTO is not visible",
        "After sunrise",
        "On rainy day"
      ],
      correctAnswer: 1,
      explanation: "If VTO is not visible, it indicates fog has set in — SM to arrange fog signalling"
    },
    {
      id: 17,
      question: "Where is it NOT necessary to place detonators? / किन स्थानों पर डेटोनेटर लगाना आवश्यक नहीं है?",
      options: [
        "Automatic Signalling territory",
        "Single Distant Signal station",
        "Non-fog area",
        "Warning board section"
      ],
      correctAnswer: 0,
      explanation: "In automatic signalling territory & where Fog Safe Device is provided, detonators are not required"
    },
    {
      id: 18,
      question: "Purpose of Fog Safe Device (FSD)— / फॉग सेफ डिवाइस का उद्देश्य क्या है?",
      options: [
        "Speed measurement",
        "GPS-based navigation aid",
        "Signal replacement",
        "Crew communication"
      ],
      correctAnswer: 1,
      explanation: "It assists Loco Pilots by giving GPS-based alerts for signals and landmarks"
    },
    {
      id: 19,
      question: "Weight of Fog Safe Device is approximately— / फॉग सेफ डिवाइस का वजन लगभग कितना होता है?",
      options: [
        "0.5 kg",
        "1.0 kg",
        "1.5 kg",
        "2.0 kg"
      ],
      correctAnswer: 2,
      explanation: "Portable stand-alone device weighing about 1.5 kg"
    },
    {
      id: 20,
      question: "Maximum speed in fog as per SR 3.61.10— / SR 3.61.10 के अनुसार कोहरे में अधिकतम गति कितनी हो सकती है?",
      options: [
        "60 KMPH",
        "75 KMPH",
        "90 KMPH",
        "100 KMPH"
      ],
      correctAnswer: 1,
      explanation: "Loco Pilot must run at a speed not exceeding 75 KMPH and controllable to stop short of obstruction"
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
    setSelectedAnswer(answerIndex)
  }

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true)
      setUserAnswers(prev => new Map([...prev, [currentQuestion, selectedAnswer]]))
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(prev => prev + 1)
      }
      setAnsweredQuestions(prev => new Set([...prev, currentQuestion]))
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      // Quiz completed
      setQuizCompleted(true)
      setShowSummary(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const handleQuestionJump = (questionIndex: number) => {
    setCurrentQuestion(questionIndex)
    setSelectedAnswer(null)
    setShowResult(false)
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
    if (questionId <= 5) return "Basic Concepts"
    if (questionId <= 10) return "Detonator Management"
    if (questionId <= 15) return "VTO & FSP"
    return "Fog Safe Device & Speed Limits"
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
    setShowResult(false)
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
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Fog Signals 20 MCQ Quiz</h1>
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
                              ? showResult
                                ? isCorrect
                                  ? 'border-green-500 bg-green-50'
                                  : 'border-red-500 bg-red-50'
                                : 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={index}
                            checked={selectedAnswer === index}
                            onChange={() => handleAnswerSelect(index)}
                            className="sr-only"
                            disabled={showResult}
                          />
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                              selectedAnswer === index
                                ? showResult
                                  ? isCorrect
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-red-500 bg-red-500'
                                  : 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedAnswer === index && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                            <span className="text-gray-700">{option}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {showResult && (
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

                    {!showResult ? (
                      <button
                        onClick={handleSubmit}
                        disabled={selectedAnswer === null}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                      </button>
                    )}
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
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Fog Signals Quiz Summary & Overview</h2>
              
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

export default FogSignals