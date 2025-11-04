'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const ChapterVMCQ = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All 20 Chapter V MCQ Questions
  const questions: Question[] = [
    {
      id: 1,
      question: "Who alone may ask for/give Line Clear or give authority to proceed at a station? किसे ही लाइन क्लियर माँगने/देने या प्रस्थान प्राधिकरण देने का अधिकार है?",
      options: [
        "Guard",
        "Cabin SM",
        "Station Master",
        "Pointsman"
      ],
      correctAnswer: 2,
      explanation: "Rule 5.01(4) specifies only the Station Master. Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 2,
      question: "The Station Master must ensure proper distribution/exhibition of which operational documents? स्टेशन मास्टर किन दस्तावेज़ों का सही वितरण/प्रदर्शन सुनिश्चित करेगा?",
      options: [
        "Only General Rules",
        "Working Time Table with correction slips etc",
        "Only Station Working Rules",
        "Only Appendix-G"
      ],
      correctAnswer: 1,
      explanation: "Rule 5.02(b). Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 3,
      question: "Sheet time tables and fare lists must be exhibited at stations open for booking. True/False? बुकिंग के लिए खुले स्टेशनों पर शीट टाइम-टेबल व किराया-सूची प्रदर्शित करना अनिवार्य है। सत्य/असत्य?",
      options: [
        "True",
        "False",
        "",
        ""
      ],
      correctAnswer: 0,
      explanation: "Rule 5.02(c). Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 4,
      question: "What is the SM's duty regarding signal cabins? सिग्नल केबिनों के संबंध में एसएम का कर्तव्य क्या है?",
      options: [
        "No need to visit",
        "Visit frequently and ensure correct working; keep unauthorised persons out",
        "Only visit on complaints",
        "Hand over to engineering"
      ],
      correctAnswer: 1,
      explanation: "Rule 5.04(1) & (3). Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 5,
      question: "Leaving vehicles in a siding outside station limits is permitted only if: स्टेशन सीमा के बाहर साइडिंग में वाहनों को छोड़ना तभी अनुमेय है जब",
      options: [
        "Guard agrees",
        "Wheels properly secured and vehicle clear of running lines",
        "Points clamped",
        "CASM permits"
      ],
      correctAnswer: 1,
      explanation: "Rule 5.22. Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 6,
      question: "Each station must have Station Working Rules (SWR); copies to be kept at cabins and relevant LCs. True/False? प्रत्येक स्टेशन पर एसडब्ल्यूआर होना चाहिए; प्रतियाँ केबिन/सम्बंधित लेवल क्रॉसिंग पर रखी जाएँ — सत्य/असत्य?",
      options: [
        "True",
        "False",
        "",
        ""
      ],
      correctAnswer: 0,
      explanation: "Rule 5.06(1)-(2). Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 7,
      question: "Fresh staff declarations for having read/understood SWR must be taken when which occurs? नए स्टाफ घोषणापत्र कब लेने चाहिए?",
      options: [
        "Every month",
        "New staff joins",
        "Only after accidents",
        "Never needed"
      ],
      correctAnswer: 1,
      explanation: "S.R. 5.06.13. Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 8,
      question: "SWR should be re-issued afresh at least every: एसडब्ल्यूआर को ताज़ा रूप में पुनः जारी करने की अधिकतम अवधि:",
      options: [
        "2 years",
        "3 years",
        "5 years or after 5 Amendment Slips",
        "10 years"
      ],
      correctAnswer: 2,
      explanation: "S.R. 5.06.8. Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 9,
      question: "Messages/authorities must be on prescribed forms and station-stamped; if not available, a manuscript may be used with reasons in SM diary. True/False? संदेश/प्राधिकरण निर्धारित फ़ॉर्म पर स्टेशन-स्टैम्प सहित हों; फ़ॉर्म न होने पर पांडुलिपि फ़ॉर्म के साथ एसएम डायरी में कारण दर्ज — सत्य/असत्य?",
      options: [
        "True",
        "False",
        "",
        ""
      ],
      correctAnswer: 0,
      explanation: "Rule 5.07(1)-(2). Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 10,
      question: "Access to operate signals, points, block/communication instruments is restricted to authorised persons. True/False? सिग्नल, प्वाइंट, ब्लॉक/संचार यंत्र चलाने का अधिकार केवल अधिकृत व्यक्तियों को है — सत्य/असत्य?",
      options: [
        "True",
        "False",
        "",
        ""
      ],
      correctAnswer: 0,
      explanation: "Rule 5.08. Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 11,
      question: "For reception on an obstructed line, which written authority is used (if required)? अवरोधित लाइन पर ग्रहण के लिए कौन-सा लिखित प्राधिकरण (आवश्यक होने पर) दिया जाता है?",
      options: [
        "T/369(3b)",
        "T/509",
        "T/510",
        "T/512"
      ],
      correctAnswer: 1,
      explanation: "G&SR 5.09 + SR note; Appendix-XV lists T/509. Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 12,
      question: "Minimum distance for placing a Stop hand signal ahead of the obstruction is: अवरोध से आगे स्टॉप हैंड सिग्नल रखने की न्यूनतम दूरी:",
      options: [
        "15 m",
        "30 m",
        "45 m",
        "60 m"
      ],
      correctAnswer: 2,
      explanation: "Rule 5.09(4). Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 13,
      question: "For reception on a non-signalled line (emergency), SM must bring the train to stand at the first Stop signal and issue authority: गैर-सिग्नल लाइन (आपात) पर ग्रहण हेतु ट्रेन पहले स्टॉप सिग्नल पर रुकाई जाए और प्राधिकरण जारी किया जाए:",
      options: [
        "T/509",
        "T/510",
        "T/512",
        "T/369(1)"
      ],
      correctAnswer: 1,
      explanation: "Rule 5.10(1)(a) & Note \"T/510.\" Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 14,
      question: "For departure from a non-signalled line, the Loco Pilot is given: गैर-सिग्नल लाइन से प्रस्थान के लिए लोको पायलट को मिलता है:",
      options: [
        "Only authority to proceed",
        "Written permission (or tangible authority), after points set & facing points locked",
        "Proceed hand signal only",
        "Calling-on only"
      ],
      correctAnswer: 1,
      explanation: "Rule 5.11(1)-(2); T/511 is the form. Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 15,
      question: "From a group with common Starter, what extra is given to start a train? कॉमन स्टार्टर वाले समूह से ट्रेन शुरू करने हेतु अतिरिक्त क्या दिया जाता है?",
      options: [
        "Calling-on",
        "T/512 written permission along with normal authority",
        "Private number only",
        "None"
      ],
      correctAnswer: 1,
      explanation: "Rule 5.12(1)-(2); SR 5.12. Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 16,
      question: "Shunting operations speed limit (unless otherwise authorised) is: शंटिंग गति सीमा (विशेष निर्देश न हों तो):",
      options: [
        "5 km/h",
        "8 km/h",
        "10 km/h",
        "15 km/h"
      ],
      correctAnswer: 3,
      explanation: "Rule 5.13(3). Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 17,
      question: "The Loco Pilot during shunting shall not depend entirely on signals and must remain vigilant. True/False? शंटिंग के दौरान लोको पायलट केवल सिग्नलों पर निर्भर न रहे और सतर्क रहे — सत्य/असत्य?",
      options: [
        "True",
        "False",
        "",
        ""
      ],
      correctAnswer: 0,
      explanation: "Rule 5.13(2). Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 18,
      question: "Passenger carriages shall not be moved for shunting without: यात्री कोचों को शंट करने से पूर्व आवश्यक है:",
      options: [
        "Pointsman's oral ok",
        "SM's personal orders only",
        "SM and Guard's personal orders with precautions",
        "Controller's ok only"
      ],
      correctAnswer: 2,
      explanation: "S.R. 5.14.4. Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 19,
      question: "Shunting during reception of an incoming train on a non-isolated line is allowed only under SI at identified stations, provided: गैर-आइसोलेटेड लाइन पर आगमन के दौरान शंटिंग केवल विशेष निर्देशों के अंतर्गत तभी जब:",
      options: [
        "Any speed allowed",
        "Supervision by authorised staff, rake fully on air brake, max 15 km/h",
        "Guard consent only",
        "None"
      ],
      correctAnswer: 1,
      explanation: "Rule 5.16 (AS-11, 22-08-2023). Digi SCR G&SR 2020 upto AS 21"
    },
    {
      id: 20,
      question: "Before shunting across a level crossing, the person in charge must ensure: लेवल क्रॉसिंग पर शंटिंग से पहले क्या सुनिश्चित करना चाहिए?",
      options: [
        "Gatekeeper is present",
        "Gates closed and locked against road traffic",
        "Flagman posted",
        "Whistle only"
      ],
      correctAnswer: 1,
      explanation: "Rule 5.17. Digi SCR G&SR 2020 upto AS 21"
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
    if (questionId <= 5) return "Station Master Duties"
    if (questionId <= 10) return "Station Working Rules"
    if (questionId <= 15) return "Reception & Departure"
    return "Shunting Operations"
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
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Chapter V MCQ Quiz</h1>
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
                      {questions[currentQuestion].options.map((option, index) => {
                        if (option.trim() === '') return null
                        return (
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
                        )
                      })}
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
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Chapter V MCQ Quiz Summary & Overview</h2>
              
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

export default ChapterVMCQ
