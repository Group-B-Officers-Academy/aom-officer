'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const Signals = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All Signals MCQ Questions
  const questions: Question[] = [
    {
      id: 1,
      question: "Which of the following is not a type of fixed signal? / निम्नलिखित में से कौन-सा एक स्थायी संकेत नहीं है?",
      options: [
        "Home Signal",
        "Distant Signal",
        "Hand Signal",
        "Starter Signal"
      ],
      correctAnswer: 2,
      explanation: "Hand signals are manually given; fixed signals are Permanent"
    },
    {
      id: 2,
      question: "What is the function of a Warner Signal? / वार्नर सिग्नल का कार्य क्या है?",
      options: [
        "Stop",
        "Warn about next stop",
        "Indicate route",
        "Control shunting"
      ],
      correctAnswer: 1,
      explanation: "Warns LP about condition of next block/stop signal"
    },
    {
      id: 3,
      question: "A semaphore Warner signal has which special feature? / सेमाफोर वार्नर सिग्नल में कौन-सी विशेषता होती है?",
      options: [
        "Square arm",
        "Fish-tailed arm",
        "Circular disc",
        "Triangular plate"
      ],
      correctAnswer: 1,
      explanation: "Warner signal has a fish-tailed arm"
    },
    {
      id: 4,
      question: "Minimum distance of Distant Signal from first Stop Signal shall be — ? / पहले स्टॉप सिग्नल से डिस्टेंट सिग्नल की न्यूनतम दूरी कितनी होनी चाहिए?",
      options: [
        "800 m",
        "1000 m",
        "1200 m",
        "400 m"
      ],
      correctAnswer: 1,
      explanation: "Minimum distance is 1000 meters"
    },
    {
      id: 5,
      question: "In Double Distant territory, the outermost signal is placed at — / डबल डिस्टेंट क्षेत्र में बाहरी सिग्नल कहाँ लगाया जाता है?",
      options: [
        "1000 m",
        "1500 m",
        "2000 m",
        "500 m"
      ],
      correctAnswer: 2,
      explanation: "Outermost signal is placed at 2000m in Double Distant territory"
    },
    {
      id: 6,
      question: "Signal Warning Board (SWB) is dispensed when — / सिग्नल वार्निंग बोर्ड कब हटाया जाता है?",
      options: [
        "Single Distant Signal",
        "Automatic",
        "Double Distant",
        "Speed ≤ 50 km/h"
      ],
      correctAnswer: 2,
      explanation: "SWB is dispensed when Double Distant signalling is provided"
    },
    {
      id: 7,
      question: "What is the shape of arm of a Stop Signal? / स्टॉप सिग्नल की भुजा का आकार क्या होता है?",
      options: [
        "Fish tailed",
        "Square ended",
        "Tapered",
        "Circular"
      ],
      correctAnswer: 1,
      explanation: "Stop signal has a square ended arm"
    },
    {
      id: 8,
      question: "At a Class 'B' station with TAS, the first Stop Signal is — / टीएएस क्षेत्र में क्लास 'बी' स्टेशन पर पहला स्टॉप सिग्नल कौन सा है?",
      options: [
        "Home",
        "Outer",
        "Starter",
        "Routing"
      ],
      correctAnswer: 1,
      explanation: "At Class B station with TAS, the first stop signal is Outer"
    },
    {
      id: 9,
      question: "Outer Signal shall not be taken 'off' unless — / आउटर सिग्नल को 'ऑफ' नहीं किया जा सकता जब तक — ?",
      options: [
        "Starter off",
        "Home off",
        "Adv Starter off",
        "Points locked"
      ],
      correctAnswer: 1,
      explanation: "Outer signal cannot be taken off unless Home signal is off"
    },
    {
      id: 10,
      question: "Which is the FSS at Class 'A' and 'B' stations in MAS? / एमएएस क्षेत्र में क्लास 'ए' और 'बी' स्टेशनों पर एफएसएस कौन सा है?",
      options: [
        "Home",
        "Outer",
        "Starter",
        "Routing"
      ],
      correctAnswer: 0,
      explanation: "Home signal is the FSS (First Stop Signal) at Class A and B stations in MAS"
    },
    {
      id: 11,
      question: "Home Signal in MAS can show — / एमएएस क्षेत्र में होम सिग्नल कौन से अवस्था दिखा सकता है?",
      options: [
        "Stop & Proceed",
        "Stop, Caution & Proceed",
        "Stop only",
        "Proceed only"
      ],
      correctAnswer: 1,
      explanation: "Home signal in MAS can show Stop, Caution & Proceed aspects"
    },
    {
      id: 12,
      question: "Route Indicators work in conjunction with — / रूट इंडिकेटर किस के साथ कार्य करते हैं?",
      options: [
        "Warner",
        "Stop",
        "Distant",
        "Repeater"
      ],
      correctAnswer: 1,
      explanation: "Route indicators work in conjunction with Stop signals"
    },
    {
      id: 13,
      question: "If Route Indicator is defective, related Stop Signal is — / यदि रूट इंडिकेटर खराब हो जाए तो संबंधित स्टॉप सिग्नल को कैसे माना जाएगा?",
      options: [
        "Automatic",
        "Defective",
        "Cancelled",
        "Permissive"
      ],
      correctAnswer: 1,
      explanation: "If Route Indicator is defective, the related Stop Signal is treated as Defective"
    },
    {
      id: 14,
      question: "A Calling on Signal shows which aspect in OFF position? / कॉलिंग ऑन सिग्नल 'ऑफ' स्थिति में कौन सा अवस्था दिखाता है?",
      options: [
        "Red",
        "Green",
        "Miniature Yellow",
        "White"
      ],
      correctAnswer: 2,
      explanation: "Calling on signal shows Miniature Yellow aspect in OFF position"
    },
    {
      id: 15,
      question: "A Calling on Signal is provided below which signal? / कॉलिंग ऑन सिग्नल किस सिग्नल के नीचे लगाया जाता है?",
      options: [
        "Home",
        "Any Stop except LSS",
        "Starter",
        "Distant"
      ],
      correctAnswer: 1,
      explanation: "Calling on signal is provided below any Stop signal except Last Stop Signal (LSS)"
    },
    {
      id: 16,
      question: "How many types of Shunt Signals exist? / शंट सिग्नलों के कितने प्रकार होते हैं?",
      options: [
        "Two",
        "Three",
        "Four",
        "Five"
      ],
      correctAnswer: 1,
      explanation: "There are three types of Shunt Signals"
    },
    {
      id: 17,
      question: "Position Light Shunt Signal shows which lights in ON position? / पोज़िशन लाइट शंट सिग्नल 'ऑन' स्थिति में कौन सी लाइटें जलती हैं?",
      options: [
        "Two white horizontal",
        "Two white diagonal",
        "One yellow",
        "No light"
      ],
      correctAnswer: 0,
      explanation: "Position Light Shunt Signal shows two white lights in horizontal position when ON"
    },
    {
      id: 18,
      question: "Repeating Signal is provided for — / रिपीटिंग सिग्नल किस लिए लगाया जाता है?",
      options: [
        "Repeating aspect of next signal",
        "Shunting",
        "Gate protection",
        "Speed restriction"
      ],
      correctAnswer: 0,
      explanation: "Repeating signal is provided to repeat the aspect of next signal"
    },
    {
      id: 19,
      question: "Repeating Signal can be of which types? / रिपीटिंग सिग्नल किस किस प्रकार का हो सकता है?",
      options: [
        "Disc/Colour Light/Semaphore",
        "Banner/Semaphore/Colour Light",
        "LED/Stencil",
        "None of These"
      ],
      correctAnswer: 1,
      explanation: "Repeating signal can be Banner, Semaphore or Colour Light type"
    },
    {
      id: 20,
      question: "Automatic Stop Signal is identified by — / ऑटोमेटिक स्टॉप सिग्नल की पहचान क्या है?",
      options: [
        "'P'",
        "'G'",
        "'A'",
        "'C'"
      ],
      correctAnswer: 2,
      explanation: "Automatic Stop Signal is identified by letter 'A'"
    },
    {
      id: 21,
      question: " According to GR 3.33, when a station has only one connection off the main line, how should it be worked?        ",
      options: [
        "  Under ordinary rules      ",
        "  Under approved special instructions    ",
        "  Without any signals   ",
        "   As per Station Master’s discretion   "
      ],
      correctAnswer:  1  ,
      explanation: " Rule 3.33 (a) specifies that such a station shall be worked in accordance with approved special instructions        "
    },

{
      id: 22,
      question: " On light-traffic sections, how many Stop signals may be provided in each direction?        ",
      options: [
        "  Two      ",
        "   Three   ",
        "   One  ",
        "   None     "
      ],
      correctAnswer: 2   ,
      explanation: "  As per Rule 3.33 (b), one Stop signal only in each direction may be provided       "
    },

{
      id: 23,
      question: "  Where the traffic is light and speed slow, where should that single Stop signal be located?       ",
      options: [
        "  Inside station yard       ",
        "  At the Home signal location     ",
        "   At adequate distance outside outermost facing points    ",
        "   At platform end      "
      ],
      correctAnswer:  2  ,
      explanation: " Rule 3.33 (b) specifies the Stop signal shall be located at adequate distance outside the outermost facing points        "
    },

{
      id: 24,
      question: " Under what condition may all signals be dispensed with on a railway?        ",
      options: [
        " When speed is above 100 km/h       ",
        " When traffic is very light      ",
        "  When automatic signalling is provided    ",
        "  When station is non-interlocked      "
      ],
      correctAnswer:  1  ,
      explanation: "Rule 3.33 (c) permits dispensing with all signals where railway has very light traffic       "
    },

{
      id: 25,
      question: " At stations with manually operated multiple-aspect signals and train speed not exceeding 50 km/h, what signals may be provided in each direction?        ",
      options: [
        " Only Home signal        ",
        "  Distant and Home signals     ",
        "  Starter and Home    ",
        "   Warner and Starter     "
      ],
      correctAnswer:  1  ,
      explanation: "  Proviso allows Distant and Home signal only where speed ≤ 50 km/h       "
    },

{
      id: 26,
      question: "  Which rules are explicitly excepted by GR 3.33?       ",
      options: [
        "   3.25 to 3.29     ",
        "    3.27, 3.28, 3.29 and 3.32   ",
  "    3.30 to 3.35 ",
        "  3.05 to 3.07      "
      ],
      correctAnswer:  1  ,
      explanation: "  GR 3.33 provides exceptions to Rules 3.27, 3.28, 3.29 and 3.32       "
    },

{
      id: 27,
      question: "  What governs the working of a station under the exceptions of GR 3.33?       ",
      options: [
        "   Station Master’s discretion      ",
        "    Approved special instructions    ",
        "     General Rules only  ",
        "      Local conditions only  "
      ],
      correctAnswer: 1   ,
      explanation: "  All exceptions under GR 3.33 require operation under approved special instructions   "
    },

{
      id: 28,
      question: "   Where must the approved special instructions under GR 3.33 be embodied?      ",
      options: [
        "   Train Working Manual      ",
        "    Station Working Rules    ",
        "  Signal Maintenance Register     ",
        "    Block Working Manual     "
      ],
      correctAnswer:  1  ,
      explanation: "  S.R.3.33 specifies they shall be embodied in Station Working Rules       "
    },

{
      id: 29,
      question: "  What is the maximum permissible train speed for the proviso under GR 3.33?       ",
      options: [
 "   60 km/h   ",
        "   40 km/h   ",
        "   50 km/h  ",
        "    30km/h   "
      ],
      correctAnswer:  2  ,
      explanation: " The proviso applies to stations where speed does not exceed 50 km/h        "
    },

{
      id: 30,
      question: "  What is the primary objective of GR 3.33 exceptions?       ",
      options: [
        " To simplify signalling for low-traffic areas        ",
        "  To increase line capacity      ",
        "   To improve aesthetic design    ",
        "    To eliminate manual signalling     "
      ],
      correctAnswer: 0   ,
      explanation: " GR 3.33 aims to simplify signalling for low or very light traffic areas under safety-approved instructions        "
    },



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
    if (questionId <= 5) return "Basic Signals"
    if (questionId <= 10) return "Signal Types"
    if (questionId <= 15) return "Signal Operations"
    return "Advanced Signals"
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
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Signals MCQ Quiz</h1>
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
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Signals Quiz Summary & Overview</h2>
              
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

export default Signals
