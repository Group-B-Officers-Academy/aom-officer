'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const LineCapacityThroughput = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All 25 Line Capacity & Throughput MCQ Questions
  const questions: Question[] = [
    {
      id: 1,
      question: "What is the definition of Line Capacity?",
      options: [
        "A. Total traffic transported over a section in 24 hours.",
        "B. The maximum speed achieved by trains on a section.",
        "C. Number of trains that can be run each way on a given section of the railway in 24 hours.",
        "D. The total available locomotive horsepower."
      ],
      correctAnswer: 2,
      explanation: "Line Capacity is the 'Number of trains that can be run run each way on a given section of the railway in 24 hours'."
    },
    {
      id: 2,
      question: "In Scott's Formula (C = 1440 * e / (T + t)), what does the symbol 't' represent?",
      options: [
        "A. Running time of the fastest train.",
        "B. Efficiency factor.",
        "C. Block operation time (block clearance time).",
        "D. Running time of the slowest train (T)."
      ],
      correctAnswer: 2,
      explanation: "The symbol 't' represents the 'Block operation time (time lost in granting/notifying authority, releasing block, etc.)'. It is also called 'block clearance time'."
    },
    {
      id: 3,
      question: "The capacity of an entire section is always limited by the capacity of which part of the route?",
      options: [
        "A. The shortest block section.",
        "B. The terminal yard's capacity.",
        "C. The critical block section (longest or maximum running time).",
        "D. The least busy station."
      ],
      correctAnswer: 2,
      explanation: "Capacity is always limited by the weakest point on the route, which is the critical block section (the longest block section or the one with maximum running time)."
    },
    {
      id: 4,
      question: "Which method is considered the most reliable and practical for determining true, usable section capacity by reflecting real operational conditions?",
      options: [
        "A. Scott's Formula.",
        "B. The Economic Line Capacity model.",
        "C. Charting Method (Time-Distance Graph).",
        "D. Running Time Averaging."
      ],
      correctAnswer: 2,
      explanation: "The Charting Method uses a time-distance graph and is considered the most reliable and practical method for determining true, usable section capacity because it reflects real operational conditions."
    },
    {
      id: 5,
      question: "What is the typical practical value commonly used by IR for the Efficiency Factor (e) in Scott's Formula?",
      options: [
        "A. 1.00",
        "B. 0.95",
        "C. 0.85",
        "D. 0.75"
      ],
      correctAnswer: 2,
      explanation: "The Efficiency factor (e) typically ranges from 0.80 to 0.90, and IR commonly uses **0.85** as a practical value."
    },
    {
      id: 6,
      question: "Which type of capacity is defined as the optimum number of trains run without disproportionately increasing the cost of train operations?",
      options: [
        "A. Practical Line Capacity.",
        "B. Maximum Line Capacity.",
        "C. Economic Line Capacity (Optimum Capacity).",
        "D. Theoretical Capacity."
      ],
      correctAnswer: 2,
      explanation: "Economic Line Capacity is the 'optimum number of trains that can be run without disproportionately increasing the cost of train operations (train-km cost)'."
    },
    {
      id: 7,
      question: "Which measure is **NOT** an operational/managerial improvement to increase capacity **without incurring expenditure**?",
      options: [
        "A. Speedier shunting and quick crew change.",
        "B. Provision of Automatic Signals (ABS).",
        "C. Scientific Time-Tabling.",
        "D. Reducing Block Operation Time ('t')."
      ],
      correctAnswer: 1,
      explanation: "Provision of Automatic Signals (ABS) is a capital-intensive measure, as line capacity enhancement through ABS is done 'by incurring expenditure'."
    },
    {
      id: 8,
      question: "In the Charting Method, which is the first type of train path plotted, forming the base skeleton of the Master Chart?",
      options: [
        "A. Goods train paths.",
        "B. Coaching train paths.",
        "C. Crack Specials.",
        "D. Maintenance block windows."
      ],
      correctAnswer: 1,
      explanation: "The procedure is to 'Plot All Scheduled Coaching Train Paths' first, as their timings are fixed by the timetable, and this forms the base skeleton of the master chart."
    },
    {
      id: 9,
      question: "What does the symbol 'T' in Scott's Formula (C = 1440 * e / (T + t)) represent?",
      options: [
        "A. Total running time in 24 hours.",
        "B. The Running time of the slowest train over the critical block section.",
        "C. Block operation time.",
        "D. Terminal detention time."
      ],
      correctAnswer: 1,
      explanation: "T represents the 'Running time of the slowest train over the critical block section'. It is used because the slowest train determines the minimum headway."
    },
    {
      id: 10,
      question: "Provision of Automatic Signals (ABS) increases line capacity mainly by what mechanism?",
      options: [
        "A. Reducing the running time (T).",
        "B. Replacing manual working and dividing the section into smaller automatic blocks.",
        "C. Eliminating all level crossing gates.",
        "D. Increasing the load per train."
      ],
      correctAnswer: 1,
      explanation: "ABS 'Replaces manual/slot-based working' and 'Divides the section into smaller automatic blocks', which reduces minimum headway."
    },
    {
      id: 11,
      question: "Which of the following infrastructural improvements is designed to allow entrance/exit at higher speeds, reducing station detention?",
      options: [
        "A. Provision of Axle counters.",
        "B. Easing of Ruling Gradient.",
        "C. Provision of Longer Turnouts (e.g., 1 in 18.5).",
        "D. Increasing the number of reception lines."
      ],
      correctAnswer: 2,
      explanation: "Longer Turnouts (High-speed turnouts) 'Permit entrance/exit at higher speeds', which 'Reduces station detention and increases throughput'."
    },
    {
      id: 12,
      question: "What is the consequence of 'Avoiding Separate Traction for Different Sections' as an operational measure?",
      options: [
        "A. Increases the efficiency factor (e).",
        "B. Reduces loco changeover delays and increases throughput.",
        "C. Increases the total load hauled.",
        "D. Increases signal setting time."
      ],
      correctAnswer: 1,
      explanation: "Avoiding separate traction 'Ensures: No loco changeover delays' and 'Continuous train movement without halts', which 'Saves time → increases throughput'."
    },
    {
      id: 13,
      question: "What is the definition of **Throughput** of a section?",
      options: [
        "A. The number of trains run in one direction in 24 hours.",
        "B. The total quantum of traffic transported over a section in 24 hours.",
        "C. The difference between Maximum and Practical Capacity.",
        "D. The maximum load hauled by a locomotive."
      ],
      correctAnswer: 1,
      explanation: "Throughput of a section is the 'total quantum of traffic transported over a section in 24 hours'."
    },
    {
      id: 14,
      question: "In commercial transactions, Goods Throughput is expressed in which unit, as it reflects the actual productive (paying) work done?",
      options: [
        "A. Number of Wagons.",
        "B. Gross Tonne-Kilometres (GTKM).",
        "C. Net Tonne-Kilometres (NTKM).",
        "D. Running Train-Kilometres."
      ],
      correctAnswer: 2,
      explanation: "In commercial transactions, throughput is expressed in **NTKM** because NTKM reflects the actual productive work done by Railways (only paying load is counted)."
    },
    {
      id: 15,
      question: "The two major ways to improve throughput are (A) Running more number of trains and (B) ________.",
      options: [
        "A. Reducing terminal delays.",
        "B. Increasing load per train.",
        "C. Increasing the number of block stations.",
        "D. Reducing the running time (T)."
      ],
      correctAnswer: 1,
      explanation: "Throughput can be improved in two major ways: (A) Running more number of trains and (B) **Increasing load per train**."
    },
    {
      id: 16,
      question: "What is the unit of measure for Passenger Throughput?",
      options: [
        "A. Passenger per hour (PPH).",
        "B. Passenger-Kilometres (PKM).",
        "C. Net Tonne-Kilometres (NTKM).",
        "D. Number of coaches."
      ],
      correctAnswer: 1,
      explanation: "Passenger Throughput is measured in **Passenger-Kilometres (PKM)**."
    },
    {
      id: 17,
      question: "Which measure, taken by incurring expenditure, aims to allow handling of longer trains and prevents train splitting?",
      options: [
        "A. Easing of Ruling Gradient.",
        "B. Provision of EMU/DMU.",
        "C. Increasing CSL (Clear Standing Length) of Running Lines.",
        "D. Provision of PI/RRI/EI."
      ],
      correctAnswer: 2,
      explanation: "Increasing CSL involves 'Lengthening loops, sidings, and platforms' to allow handling of longer trains and prevent train splitting."
    },
    {
      id: 18,
      question: "In the Charting Method, why is the process continued until the 'Saturation Point' is reached?",
      options: [
        "A. To ensure all trains run at the same speed.",
        "B. To calculate the total cost of operation.",
        "C. To determine the Maximum Section Capacity.",
        "D. To determine the Efficiency Factor (e)."
      ],
      correctAnswer: 2,
      explanation: "The process continues until no additional train path can be accommodated; this saturation point equals the **Maximum Section Capacity**."
    },
    {
      id: 19,
      question: "Scott's Formula is used to estimate which type of capacity?",
      options: [
        "A. Maximum Line Capacity.",
        "B. Practical Line Capacity.",
        "C. Economic Line Capacity.",
        "D. Theoretical Capacity."
      ],
      correctAnswer: 1,
      explanation: "IR adopts Scott's Formula, which provides a scientific, operational method to estimate the **practical line capacity**."
    },
    {
      id: 20,
      question: "What is the primary benefit of running Heavy-Haul Goods Trains (without incurring capital expenditure)?",
      options: [
        "A. Increases the number of paths run.",
        "B. Larger load per path, requiring fewer trains for the same tonnage.",
        "C. Reduces maintenance windows.",
        "D. Increases the speed of the rake."
      ],
      correctAnswer: 1,
      explanation: "Heavy-Haul trains mean 'Larger load per path → fewer trains required', which 'Reduces congestion' and improves NTKM per path."
    },
    {
      id: 21,
      question: "Which of the following is an IT-based measure (without physical cost) that helps monitor running trains and detect bottlenecks?",
      options: [
        "A. Panel Interlocking (PI).",
        "B. EMU/DMU deployment.",
        "C. Management Information Systems (MIS).",
        "D. Automatic Warning System (AWS)."
      ],
      correctAnswer: 2,
      explanation: "MIS helps in 'Monitoring running trains' and 'Detecting bottlenecks', enabling data-driven decisions."
    },
    {
      id: 22,
      question: "What is the main objective of using EMU/DMU for stopping (passenger) trains, leading to capacity enhancement?",
      options: [
        "A. They are cheaper to operate.",
        "B. Their high acceleration and deceleration reduces station dwell and block occupancy time.",
        "C. They can haul heavier loads.",
        "D. They eliminate the need for crew change."
      ],
      correctAnswer: 1,
      explanation: "EMU/DMU's 'High acceleration and deceleration' reduces station dwell and 'reduces block occupancy', enhancing capacity."
    },
    {
      id: 23,
      question: "The installation of RRI/PI/EI (Route Relay/Panel/Electronic Interlocking) primarily enhances section capacity by:",
      options: [
        "A. Increasing the speed of the slowest train (T).",
        "B. Reducing running time by easing the ruling gradient.",
        "C. Reducing station clearance time through faster signal setting and improved reliability.",
        "D. Reducing maintenance windows."
      ],
      correctAnswer: 2,
      explanation: "These interlocking systems achieve 'Faster signal setting, improved reliability, fewer failures', which 'Reduces station clearance time, increasing section capacity'."
    },
    {
      id: 24,
      question: "Practical Line Capacity accounts for time allowances for which of the following?",
      options: [
        "A. Maximum train speed and track geometry.",
        "B. Track/OHE/Signalling maintenance, operational irregularities, and engineering blocks.",
        "C. Theoretical maximum train paths (plotting margin).",
        "D. Total annual cost of train operations."
      ],
      correctAnswer: 1,
      explanation: "Practical Line Capacity accounts for time allowances for 'Track/OHE/Signalling maintenance', 'Operational irregularities', 'Engineering blocks', and unforeseen delays."
    },
    {
      id: 25,
      question: "The key advantage of Higher Throughput includes:",
      options: [
        "A. Reduction of yard / sectional congestion and improved wagon utilisation.",
        "B. Lower cost of train operations (cost of scale).",
        "C. Increase in Railway revenue and improved reliability.",
        "D. All of the above."
      ],
      correctAnswer: 3,
      explanation: "Higher throughput provides multiple benefits including: Improved wagon utilisation, Increase in Railway revenue, Reduction of yard / sectional congestion, Higher reliability, and Lower cost of freight transport (economy of scale)."
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
    if (questionId <= 10) return "Scott's Formula"
    if (questionId <= 15) return "Throughput"
    if (questionId <= 20) return "Capacity Enhancement"
    return "Advanced Topics"
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
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Line Capacity & Throughput MCQ Quiz</h1>
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
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Line Capacity & Throughput Quiz Summary & Overview</h2>
              
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

export default LineCapacityThroughput
