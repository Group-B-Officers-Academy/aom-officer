'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const Rajabhasha = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All Rajabhasha MCQ Questions
  const questions: Question[] = [
    {
      id: 1,
      question: "राजभाषा अधिनियम 1963 कब पारित हुआ? When was the Official Languages Act 1963 passed?",
      options: [
        "10th May, 1963",
        "14th September, 1963",
        "8th March, 1963",
        "26th January, 1963"
      ],
      correctAnswer: 0,
      explanation: "Official Languages Act 1963 was passed on 10th May, 1963"
    },
    {
      id: 2,
      question: "राजभाषा अधिनियम, 1963 किस वर्ष संशोधित हुआ? When was the Official Languages Act 1963 amended?",
      options: [
        "1968",
        "1963",
        "1967",
        "1976"
      ],
      correctAnswer: 2,
      explanation: "Official Languages Act 1963 was amended in 1967"
    },
    {
      id: 3,
      question: "राजभाषा अधिनियम की धारा 3(3) कब से प्रवृत्त हुई? From when did the Section 3(3) of Official Languages Act come into force?",
      options: [
        "10th May, 1965",
        "14th September, 1967",
        "8th March, 1976",
        "26th January, 1965"
      ],
      correctAnswer: 3,
      explanation: "Section 3(3) of Official Languages Act came into force from 26th January, 1965"
    },
    {
      id: 4,
      question: "राजभाषा अधिनियम 1963 की धारा (4) किससे संबंधित है? Section (4) of Official Languages Act 1963 is related to which one?",
      options: [
        "Constitution of Official Language Commission",
        "Constitution of Committee on Official Language",
        "Constitution of Official Language Act",
        "Constitution of National Women Commission"
      ],
      correctAnswer: 1,
      explanation: "Section 4 is related to Constitution of Committee on Official Language"
    },
    {
      id: 5,
      question: "राजभाषा अधिनियम की कौन-सी धारा संसदीय राजभाषा समिति के गठन से संबंधित है? Which section of the Official Language Act relates to the constitution the committee of parliament on Official Language?",
      options: [
        "Section-3",
        "Section-4",
        "Section-5",
        "Section-6"
      ],
      correctAnswer: 1,
      explanation: "Section-4 relates to the constitution of committee of parliament on Official Language"
    },
    {
      id: 6,
      question: "राजभाषा अधिनियम 1963 में कुल कितनी धाराएं है? How many section are there in the Official Language Act 1963?",
      options: [
        "7",
        "8",
        "9",
        "10"
      ],
      correctAnswer: 2,
      explanation: "Official Languages Act 1963 has 8 sections"
    },
    {
      id: 7,
      question: "राजभाषा अधिनियम 1963 की धारा 7 किससे संबंधित है? Section 7 of the Official Languages Act, 1963 is concerned with which one of the following?",
      options: [
        "Implementation of official language in Departments",
        "Implementation of official language in central government offices",
        "Optional use of Hindi or official language in judgement etc., of High Courts",
        "Power to make rules"
      ],
      correctAnswer: 2,
      explanation: "Section 7 is concerned with Optional use of Hindi or official language in judgement etc., of High Courts"
    },
    {
      id: 8,
      question: "राजभाषा अधिनियम 1963, की किस धारा के अंतर्गत केंद्र सरकार को राजभाषा संबंधी नियम बनाने की शक्ति प्रदान की गई है? The section of Official Languages Act, 1963 whereunder Central Government is empowered to make rules for Official Language?",
      options: [
        "In section -7",
        "In section -4",
        "In section -8",
        "In section -6&7"
      ],
      correctAnswer: 2,
      explanation: "Section 8 empowers Central Government to make rules for Official Language"
    },
    {
      id: 9,
      question: "संसदीय राजभाषा समिति में कुल कितने सदस्य हैं? How many members are there on the Committee of Parliament on Official Language?",
      options: [
        "20",
        "40",
        "10",
        "30"
      ],
      correctAnswer: 3,
      explanation: "Committee of Parliament on Official Language has 30 members"
    },
    {
      id: 10,
      question: "संसदीय राजभाषा समिति के सदस्य कौन होते हैं? Who are the members of the Committee of Parliament on Official Language?",
      options: [
        "Members of Lok Sabha",
        "Members of Rajya Sabha",
        "Members of Lok Sabha & Rajya Sabha",
        "Member of State Legislature"
      ],
      correctAnswer: 2,
      explanation: "Committee of Parliament on Official Language consists of Members of Lok Sabha & Rajya Sabha"
    },
    {
      id: 11,
      question: "संसदीय राजभाषा समिति अपना प्रतिवेदन किसे प्रस्तुत करती है? The Committee of Parliament on Official Language submits its report to whom?",
      options: [
        "Prime Minister",
        "President",
        "Home Minister",
        "Vice President"
      ],
      correctAnswer: 1,
      explanation: "Committee of Parliament on Official Language submits its report to President"
    },
    {
      id: 12,
      question: "राष्ट्रपति किसके प्रतिवेदन के आधार पर राजभाषा संबंधी आदेश जारी करता है? On whose reports does the President issues orders regarding official languages?",
      options: [
        "Official Language Commission",
        "Rajbhasha Department",
        "Home Ministry",
        "Parliamentary Committee on Official Language"
      ],
      correctAnswer: 3,
      explanation: "President issues orders regarding official languages based on reports of Parliamentary Committee on Official Language"
    },
    {
      id: 13,
      question: "राजभाषा अधिनियम 1963 की धारा 3(3) के अनुसार कितने दस्तावेजों को द्विभाषी रूप में जारी करना अनिवार्य हैं? According to Section 3(3) of the Official Language Act, 1963 how many documents are mandatory to be issued in the bilingual form?",
      options: [
        "10",
        "12",
        "13",
        "16"
      ],
      correctAnswer: 2,
      explanation: "According to Section 3(3), 13 documents are mandatory to be issued in bilingual form"
    },
    {
      id: 14,
      question: "निम्नलिखित दस्तावेजों में से कौन से दस्तावेज द्विभाषी रूप में जारी करना अनिवार्य हैं? Which of the following documents are mandatory to be issued in the bilingual form?",
      options: [
        "General order",
        "Resolution",
        "Contracts",
        "All"
      ],
      correctAnswer: 3,
      explanation: "All documents listed in Section 3(3) including General order, Resolution, and Contracts are mandatory to be issued in bilingual form"
    },
    {
      id: 15,
      question: "निम्नलिखित दस्तावेजों में से कौन से दस्तावेज धारा 3(3) के अंतर्गत नहीं आता हैं? Which of the following documents are not covered under Section 3(3)?",
      options: [
        "Agreement",
        "Press Releases",
        "Tender Notice",
        "None of these"
      ],
      correctAnswer: 3,
      explanation: "None of these documents are excluded from Section 3(3)"
    },
    {
      id: 16,
      question: "राजभाषा अधिनियम 1963 की धारा 3(3) से संबंधित कागजात किस भाषा में जारी किए जा सकते हैं? In which language may the papers related to Section 3(3) of the Official Language Act 1963 be issued?",
      options: [
        "Only Hindi",
        "Hindi & English both",
        "Only English",
        "Hindi or English"
      ],
      correctAnswer: 1,
      explanation: "Papers related to Section 3(3) must be issued in Hindi & English both languages"
    },
    {
      id: 17,
      question: "संसदीय राजभाषा समिति की कितनी उप-समितियां हैं? How many Sub-Committees are there in the Committee of Parliament on Official Language?",
      options: [
        "4 Sub-Committees",
        "6 Sub-Committees",
        "3 Sub-Committees",
        "5 Sub-Committees"
      ],
      correctAnswer: 2,
      explanation: "Committee of Parliament on Official Language has 3 Sub-Committees"
    },
    {
      id: 18,
      question: "रेल मंत्रालय के कार्यालयों का निरीक्षण संसदीय राजभाषा समिति की कौनसी उप-समिति द्वारा किया जाता है? Which sub-committee of the Committee of Parliament on official language carries out inspection of the offices of the Ministry of Railways?",
      options: [
        "1st Sub-Committee",
        "2nd Sub-Committee",
        "3rd Sub-Committee",
        "5th Sub-Committee"
      ],
      correctAnswer: 1,
      explanation: "1st Sub-Committee carries out inspection of the offices of the Ministry of Railways"
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
    if (questionId <= 6) return "Act Overview"
    if (questionId <= 9) return "Sections & Committees"
    if (questionId <= 13) return "Implementation & Reports"
    return "Documents & Sub-Committees"
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
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">राजभाषा (Rajabhasha) Quiz</h1>
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
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">राजभाषा (Rajabhasha) Quiz Summary & Overview</h2>
              
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

export default Rajabhasha
