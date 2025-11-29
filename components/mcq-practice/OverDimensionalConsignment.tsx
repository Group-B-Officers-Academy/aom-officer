'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const OverDimensionalConsignment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All 25 Over Dimensional Consignment MCQ Questions
  const questions: Question[] = [
    {
      id: 1,
      question: "An Over Dimensional Consignment (ODC) is defined as any consignment which exceeds the:",
      options: [
        "A. Maximum Permissible Load (MPL)",
        "B. Standard Moving Dimensions (SMD)",
        "C. Standard Route Dimensions (SRD)",
        "D. Gross Clearance limit (GCL)"
      ],
      correctAnswer: 1,
      explanation: "ODC is any consignment which exceeds Standard Moving Dimensions (SMD) of Indian Railways."
    },
    {
      id: 2,
      question: "The **Gross Clearance** of a consignment is the distance between the consignment and a fixed structure when the wagon is in what condition?",
      options: [
        "A. Moving at sectional speed",
        "B. Negotiating the sharpest curve",
        "C. Stationary on straight track",
        "D. On track with maximum super-elevation"
      ],
      correctAnswer: 2,
      explanation: "Gross Clearance is the distance between the consignment and the fixed structure when the wagon is stationary on straight track."
    },
    {
      id: 3,
      question: "What is the minimum expected clearance in motion, accounting for factors like lurching, bouncing, and overhang on curves, called?",
      options: [
        "A. Gross Clearance",
        "B. Safety Clearance",
        "C. Net Clearance",
        "D. Standard Clearance"
      ],
      correctAnswer: 3,
      explanation: "Net Clearance is the 'Minimum expected clearance in motion, after accounting' for factors like lurching, bouncing, overhang on curves, and super-elevation."
    },
    {
      id: 4,
      question: "What is the defining Gross Clearance range for a **Class 'A' ODC** (Permitted out of Gauge loads)?",
      options: [
        "A. Less than 4 inches (< 101.6 mm)",
        "B. $\\ge 4$ inches but $< 6$ inches",
        "C. $\\ge 6$ inches but $< 9$ inches",
        "D. $\\ge 9$ inches (228.6 mm) and above"
      ],
      correctAnswer: 3,
      explanation: "Class 'A' ODC has a gross clearance of $\\ge 228.6$ mm (9 inches), and is considered the safest category."
    },
    {
      id: 5,
      question: "Who is the Sanctioning Authority for a **Class 'C' ODC** (Extra-ordinary out of Gauge loads)?",
      options: [
        "A. Principal Chief Operations Manager (PCOM)",
        "B. Divisional Railway Manager (DRM)",
        "C. Commissioner of Railway Safety (CRS)",
        "D. Principal Chief Engineer (PCE)"
      ],
      correctAnswer: 2,
      explanation: "The Sanctioning Authority for Class 'C' ODC is the Commissioner of Railway Safety (CRS), with the sanction obtained by the PCOM through the Pr.Chief Engineer."
    },
    {
      id: 6,
      question: "What is the maximum permissible speed (typical) for a **Class 'C' ODC** on Broad Gauge (BG)?",
      options: [
        "A. Sectional Speed",
        "B. 40 KMPH",
        "C. 25 KMPH",
        "D. 15 KMPH"
      ],
      correctAnswer: 2,
      explanation: "Class 'C' ODC movement is 'Highly restricted', typically to 25 KMPH on Broad Gauge."
    },
    {
      id: 7,
      question: "What is the Gross Clearance range that defines a **Class 'B' ODC** (Exceptional out of Gauge loads)?",
      options: [
        "A. Less than 4 inches",
        "B. $\\ge 4$ inches but $< 6$ inches",
        "C. $\\ge 6$ inches (152.4 mm) but $< 9$ inches",
        "D. $\\ge 9$ inches and above"
      ],
      correctAnswer: 2,
      explanation: "Class 'B' ODC has a gross clearance of $\\ge 152.4$ mm (6 inches) but $< 9$ inches (228.6 cm)."
    },
    {
      id: 8,
      question: "For a **Class 'A' ODC** moving inter-divisionally within the **same Zone**, who is the Sanctioning Authority?",
      options: [
        "A. Divisional Railway Manager (DRM)",
        "B. Principal Chief Operations Manager (PCOM)",
        "C. Commissioner of Railway Safety (CRS)",
        "D. Railway Board"
      ],
      correctAnswer: 1,
      explanation: "For an inter-division movement within the same Zone, the sanctioning authority for Class 'A' is the Pr.Chief Operations Manager (PCOM)."
    },
    {
      id: 9,
      question: "What is the movement condition for a **Class 'C' ODC** (Extraordinary out of Gauge)?",
      options: [
        "A. Day & Night",
        "B. Night Only",
        "C. Daylight hours ONLY",
        "D. Only during maintenance blocks"
      ],
      correctAnswer: 2,
      explanation: "Movement of Class 'C' ODC is permitted during daylight hours ONLY."
    },
    {
      id: 10,
      question: "Which specific escort member is mandatory for a **Class 'B' ODC** movement?",
      options: [
        "A. Traffic Inspector (TI)",
        "B. SSE (P.Way)",
        "C. TXR (Train Examiner)",
        "D. DRM's representative"
      ],
      correctAnswer: 2,
      explanation: "Class 'B' ODC movement requires a TXR escort."
    },
    {
      id: 11,
      question: "What is the Gross Clearance range that defines a **Class 'C' ODC**?",
      options: [
        "A. $\\ge 9$ inches",
        "B. $\\ge 6$ inches but $< 9$ inches",
        "C. $\\ge 4$ inches (101.6 mm) but $< 6$ inches",
        "D. $< 4$ inches"
      ],
      correctAnswer: 2,
      explanation: "Class 'C' ODC has a gross clearance of $\\ge 101.6$ mm (4 inches) but $< 6$ inches."
    },
    {
      id: 12,
      question: "Who is the minimum Sanctioning Authority for a **Class 'A' ODC** moving **within a single Division**?",
      options: [
        "A. Principal Chief Engineer (PCE)",
        "B. Divisional Railway Manager (DRM)",
        "C. Principal Chief Operations Manager (PCOM)",
        "D. Chief Mechanical Engineer (CME)"
      ],
      correctAnswer: 1,
      explanation: "Within the Division, the Sanctioning Authority for a Class 'A' ODC is the Divisional Railway Manager (DRM)."
    },
    {
      id: 13,
      question: "If an infringement occurs in only a **part of the route**, does the consignment still become an ODC?",
      options: [
        "A. No, only if the entire route is infringed.",
        "B. Yes, even a partial infringement makes it ODC.",
        "C. Only if the infringement is greater than 12 inches.",
        "D. Only if the consignment is Class 'C'."
      ],
      correctAnswer: 1,
      explanation: "Even if infringement occurs in any part of the route, the consignment becomes ODC."
    },
    {
      id: 14,
      question: "The movement conditions for a **Class 'A' ODC** specify:",
      options: [
        "A. Speed restricted to 25 KMPH, Day Only.",
        "B. Speed restricted to 40 KMPH, TXR escort.",
        "C. Speed is Sectional speed, Movement Day & Night, Escort Not required.",
        "D. Speed is Sectional speed, Escort mandatory."
      ],
      correctAnswer: 2,
      explanation: "For Class 'A' ODC: Speed is Sectional speed (unless specified otherwise), Movement is permitted during both Day & Night, and Escort is generally not required (NIL)."
    },
    {
      id: 15,
      question: "Which authority sanctions a **Class 'B' ODC** in consultation with the Principal Chief Engineer?",
      options: [
        "A. Divisional Railway Manager (DRM)",
        "B. Commissioner of Railway Safety (CRS)",
        "C. Principal Chief Operations Manager (PCOM)",
        "D. Chief Safety Officer (CSO)"
      ],
      correctAnswer: 2,
      explanation: "Class 'B' ODC sanctioning authority is the PCOM, who sanctions in consultation with the Pr.Chief Engineer."
    },
    {
      id: 16,
      question: "What is the typical speed restriction for a **Class 'B' ODC** on Broad Gauge (BG)?",
      options: [
        "A. Sectional Speed",
        "B. 40 KMPH",
        "C. 25 KMPH",
        "D. 10 KMPH"
      ],
      correctAnswer: 1,
      explanation: "The speed for Class 'B' ODC is restricted, typically to 40 KMPH on Broad Gauge (BG)."
    },
    {
      id: 17,
      question: "Which of the following factors contributes to the difference between Gross Clearance and Net Clearance?",
      options: [
        "A. Wagon Tare Weight",
        "B. Locomotive Horsepower",
        "C. Overhang on curves",
        "D. Block Section Length"
      ],
      correctAnswer: 2,
      explanation: "Net Clearance accounts for factors like Lurching, Bouncing, Overhang on curves, and Super-Elevation, which Gross Clearance does not."
    },
    {
      id: 18,
      question: "The escort team for a **Class 'C' ODC** movement typically includes which three senior railway staff?",
      options: [
        "A. DRM, PCOM, CRS",
        "B. SSE(C&W), SSE(P.Way), and a Traffic Inspector (TI)",
        "C. Guard, Loco Pilot, and TXR",
        "D. PCE, TI, and SSE(P.Way)"
      ],
      correctAnswer: 1,
      explanation: "The mandatory senior escort team for Class 'C' ODC typically includes SE(C&W), SE(P.Way), and a Traffic Inspector (TI)."
    },
    {
      id: 19,
      question: "For a **Class 'A' ODC** moving **Inter-Railway**, who must sanction the movement?",
      options: [
        "A. Railway Board.",
        "B. CRS of the originating Railway.",
        "C. PCOMs of all concerned Railways.",
        "D. The DRM of the destination division."
      ],
      correctAnswer: 2,
      explanation: "For an Inter-Railway movement of Class 'A' ODC, the sanctioning authority requires PCOMs of all concerned Railways."
    },
    {
      id: 20,
      question: "The term 'Exceptional out of Gauge loads' is used to define which ODC class?",
      options: [
        "A. Class 'A'",
        "B. Class 'B'",
        "C. Class 'C'",
        "D. Not used for any ODC class"
      ],
      correctAnswer: 1,
      explanation: "Class 'B' ODC is referred to as 'Exceptional out of Gauge loads'."
    },
    {
      id: 21,
      question: "What is the Gross Clearance value (in inches) that separates Class 'A' and Class 'B' ODC classifications?",
      options: [
        "A. 4 inches",
        "B. 6 inches",
        "C. 9 inches",
        "D. 12 inches"
      ],
      correctAnswer: 2,
      explanation: "Class 'A' is $\\ge 9$ inches, and Class 'B' is $< 9$ inches (but $\\ge 6$ inches). Thus, 9 inches is the separating value."
    },
    {
      id: 22,
      question: "The movement condition for a **Class 'B' ODC** specifies:",
      options: [
        "A. Daylight hours ONLY.",
        "B. Day and Night.",
        "C. Night Only.",
        "D. Movement prohibited."
      ],
      correctAnswer: 1,
      explanation: "Class 'B' ODC movement is permitted during both Day and Night."
    },
    {
      id: 23,
      question: "Which ODC class is described as having a **'Very critical infringement; highest restrictions'**?",
      options: [
        "A. Class 'A'",
        "B. Class 'B'",
        "C. Class 'C'",
        "D. None"
      ],
      correctAnswer: 2,
      explanation: "Class 'C' ODC has the highest level of restriction due to its very critical infringement."
    },
    {
      id: 24,
      question: "What are the two movement conditions (Movement and Escort) specified for a **Class 'B' ODC**?",
      options: [
        "A. Day Only, SSE(C&W) escort.",
        "B. Day & Night, TXR escort.",
        "C. Day Only, No escort.",
        "D. Day & Night, PCOM sanction only."
      ],
      correctAnswer: 1,
      explanation: "Class 'B' movement is Day & Night and requires a TXR escort."
    },
    {
      id: 25,
      question: "Who must approve the sanction for a **Class 'C' ODC** before it goes to the CRS?",
      options: [
        "A. Divisional Railway Manager (DRM) only.",
        "B. Principal Chief Operations Manager (PCOM) through the Principal Chief Engineer (PCE).",
        "C. Traffic Inspector (TI) and SSE(P.Way).",
        "D. DRM and PCOM jointly."
      ],
      correctAnswer: 1,
      explanation: "The sanction for Class 'C' ODC is obtained by the PCOM through the Pr.Chief Engineer before submission to the CRS."
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
    if (questionId <= 5) return "Basic Concepts"
    if (questionId <= 10) return "ODC Classes"
    if (questionId <= 15) return "Sanctioning Authorities"
    if (questionId <= 20) return "Movement Conditions"
    return "Escort & Clearance"
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
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Over Dimensional Consignment MCQ Quiz</h1>
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
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Over Dimensional Consignment Quiz Summary & Overview</h2>
              
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

export default OverDimensionalConsignment
