'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const OperatingManual20 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All 20 Operating Manual 20 MCQ Questions
  const questions: Question[] = [
    {
      id: 1,
      question: "साधारणनियम -----द्वाराबनाएजातेहैं. General Rules are framed by ",
      options: [
        "भारतसरकार/Government of India",
        "प्रमुख मुख्य संरक्षा अधिकारी / PCSO",
        "महाप्रबंधक/General Manager",
        "प्रमुखमुख्यपरिचालनप्रबंधक/PCOM"
      ],
      correctAnswer: 0,
      explanation: "General Rules are framed by the Government of India."
    },
    {
      id: 2,
      question: "अनुमोदितविशेषअनुदेश-------------द्वाराजारीयाअनुमोदितकियेजातेहैं. Approved special instructions are issued or approved by",
      options: [
        "प्रमुखमुख्यपरिचालनप्रबंधक / PCOM",
        "प्राधिकृतअधिकारी / Authorised Officer",
        "रेलवे सुरक्षा आयुक्त / Commissioner of Railway Safety",
        "सक्षम रेलसेवक / Competent Railway Servent"
      ],
      correctAnswer: 2,
      explanation: "Approved special instructions are issued or approved by the Commissioner of Railway Safety."
    },
    {
      id: 3,
      question: "दक्षिण मध्य रेलवेकेप्राधिकृतअधिकारी - - - - हैं. The authorized officer of South Central railway is",
      options: [
        "प्रमुख मुख्य परिचालन प्रबंधक / PCOM",
        "महाप्रबंधक / GM",
        "मुख्य यातायात प्रबंधक / CTM",
        "प्रमुख मुख्य संरक्षा अधिकारी / PCSO"
      ],
      correctAnswer: 0,
      explanation: "The authorized officer of South Central railway is the Principal Chief Operations Manager (PCOM)."
    },
    {
      id: 4,
      question: "विशेष अनुदेश ------------द्वारा जारी किये जाते हैं. Special instructions are issued by",
      options: [
        "मुख्य यातायात प्रबंधक / CTM",
        "मुख्य संरक्षा अधिकारी / CSO",
        "प्राधिकृतअधिकारी / Authorized Officer",
        "रेलवे बोर्ड / Railway Board"
      ],
      correctAnswer: 2,
      explanation: "Special instructions are issued by the Authorized Officer."
    },
    {
      id: 5,
      question: "डबललाइनकेक्लास 'बी'बहुसंकेतीसिगनलस्टेशनपर, स्टेशनसेक्शन -----केबीचहोताहै. On Double line class 'B' station Multiple Aspect Signalling, station section lies between",
      options: [
        "बाह्यत्तमसम्मुखप्वाइंटोंसेएलएसएस / outermost facing points to LSS",
        "बीएसएलबीसेएलएसएस / BSLB to LSS",
        "क या ख / Either 'A' or 'B.'",
        "उपर्युक्तमेंसेकोईनहीं / none of above"
      ],
      correctAnswer: 2,
      explanation: "On Double line class 'B' station with Multiple Aspect Signalling, station section lies between either outermost facing points to LSS or BSLB to LSS."
    },
    {
      id: 6,
      question: "सिंगललाइनकेक्लास 'बी'बहुसंकेतीसिगनलस्टेशनमें, स्टेशनसेक्शनके -----केबीचहोतीहै. On single line class 'B' station with Multiple Aspect Signalling, the Station section lies between the",
      options: [
        "एडवांसस्टार्टर / Advance Starters",
        "एसएलबी / SLBs",
        "दोबाह्यत्तमप्वाइंटों / Outermost points",
        "उपर्युक्तमेंसेकोईएक / Any one of the above"
      ],
      correctAnswer: 3,
      explanation: "On single line class 'B' station with Multiple Aspect Signalling, the Station section lies between any one of: Advance Starters, SLBs, or Outermost points."
    },
    {
      id: 7,
      question: "रेलवेकेकिसीभीभागपरगाड़ियोंकेसंचालनकेलिएतत्समयअपनाईजानेवालीप्रणालीको- - - - कहतेहैं. The system adopted for the time being for the working of trains on any portion of a railway is known as",
      options: [
        "नियंत्रणप्रणाली / System of controlling",
        "यातायातकीदिशा / Direction of traffic",
        "संचालनप्रणाली / System of working",
        "इनमेंसेकोईनहीं / None of these"
      ],
      correctAnswer: 2,
      explanation: "The system adopted for the time being for the working of trains on any portion of a railway is known as System of working."
    },
    {
      id: 8,
      question: "भारीतूफान, जोयात्रीगाड़ियोंकीसंरक्षाकेलिएखतराहो, तोस्टेशनमास्टर - - - - - When there is a severe storm endangering the safety of passengers trains, SM shall",
      options: [
        "गाड़ीकोरोकरखेगा / Detain the train",
        "लाइनक्लियरप्रदानकरनेसेमनाकरेगा / Refuse to grant line clear",
        "A और B दोनों / Both A and B",
        "इनमेंसेकोईनहीं /None of these"
      ],
      correctAnswer: 2,
      explanation: "When there is a severe storm endangering the safety of passengers trains, SM shall both detain the train and refuse to grant line clear."
    },
    {
      id: 9,
      question: "बुलावासिगनलको ----- केसिवायकिसीभीरोकसिगनलकेनीचेलगायाजासकताहै. Calling On signal may be provided below any stop signal, except",
      options: [
        "एफएसएस / FSS",
        "एलएसएस / LSS",
        "स्टार्टर / Starter",
        "होम / Home"
      ],
      correctAnswer: 1,
      explanation: "Calling On signal may be provided below any stop signal, except LSS (Last Stop Signal)."
    },
    {
      id: 10,
      question: "बुलावासिगनलको ------- केदौरानऑफनहींकियाजासकताहै. Calling ON signal cannot be taken \"OFF\" during",
      options: [
        "सम्मुखछोरपाइंटखराबहोने / Facing end point failure",
        "ट्रेलिंगपाइंटखराबहोने / Trailing point failure",
        "धुराकाउंटरखराबहोने / Axle Counter failure",
        "होमसिगनलखराबहोने / Home signal failure"
      ],
      correctAnswer: 0,
      explanation: "Calling ON signal cannot be taken \"OFF\" during Facing end point failure."
    },
    {
      id: 11,
      question: "बुलावासिगनलकाउपयोग ------- अवसरोंपरकियाजासकताहै- The occasions when Calling ON signal can be used are",
      options: [
        "अवरुद्धलाइनपरगाड़ीकोलेतेसमय / Receiving a train on obstructed line",
        "जबऊपरकासिगनलखराबहो / When signal above is defective",
        "A और B दोनों / Both A and B",
        "उपर्युक्तमेंसेकोईनहीं / None of the above"
      ],
      correctAnswer: 2,
      explanation: "Calling ON signal can be used when receiving a train on obstructed line and when signal above is defective - both occasions."
    },
    {
      id: 12,
      question: "बुलावासिगनलकोऑफकरनेपर, गाड़ीको--------- परआकररुकनाहोगा. Take \"OFF\" calling ON signal, the train must come to stop at",
      options: [
        "राकाउंटर / Axle counter",
        "फ्रीजोन / Free zone",
        "कॉलिंगऑनजोन / Calling zone",
        "डिस्टेंटसिगनल / Distant signal"
      ],
      correctAnswer: 2,
      explanation: "When Calling ON signal is taken OFF, the train must come to stop at the Calling zone."
    },
    {
      id: 13,
      question: "शंटसिगनलको ------केसिवायकिसीभीरोकसिगनलकेनीचेलगायाजासकताहै. Shunt signal may be provided below any stop signal, except",
      options: [
        "एलएसएस / LSS",
        "एफएसएस / FSS",
        "स्टार्टर / Starter",
        "उपर्युक्त में से कोई नहीं / None of above"
      ],
      correctAnswer: 1,
      explanation: "Shunt signal may be provided below any stop signal, except FSS (First Stop Signal)."
    },
    {
      id: 14,
      question: "शंट सिगनल -----------कापतालगाताहै. Shunt signal detects",
      options: [
        "होम सिगनल / Home signal",
        "एलएसएस / LSS",
        "मार्गपरपाइंट / Points over the route",
        "कोईपाइंटनहीं / No points"
      ],
      correctAnswer: 2,
      explanation: "Shunt signal detects points over the route."
    },
    {
      id: 15,
      question: "जबकोईनयासिगनललगायाजाताहैयाकिसीसिगनलकास्थानबदलाजाताहै, तो------------ कीअवधिकेलिएसतर्कता आदेश दियाजाएगा. When a signal is newly erected or shifted, caution order shall be given for a period of",
      options: [
        "15दिन / 15 days",
        "10दिन / 10 days",
        "90दिन / 90days",
        "16दिन / 16 days"
      ],
      correctAnswer: 2,
      explanation: "When a signal is newly erected or shifted, caution order shall be given for a period of 90 days."
    },
    {
      id: 16,
      question: "आरहीगाड़ीके लिए 'ऑफ' किए गए सिगनलकोकेवल ------------ जैसीआपातस्थितिमें 'ऑन' स्थितिमेंवापिसलाया जा सकता है. A signal taken \"OFF\" for an approaching train can be put to \"ON\" position in emergency only to",
      options: [
        "सेक्शननियंत्रककेअनुदेशोंकापालनकरने / Obey SCOR instructions",
        "स्टेशन मास्टर केअनुदेशोंका पालन करने / Obey Station Master`s instructions",
        "टिकटजारीकरने / Issue tickets",
        "दुर्घटनासेबचाने / Avert an accident"
      ],
      correctAnswer: 3,
      explanation: "A signal taken \"OFF\" for an approaching train can be put to \"ON\" position in emergency only to avert an accident."
    },
    {
      id: 17,
      question: "प्रस्थान करनेवाली गाडी के लिए ऑफकियेगयेसिगनल को ------परहीफिरसेऑनकिया जा सकता है. Signals taken OFF for a departing train may be put back to ON",
      options: [
        "दुर्घटनारोकने / To avert an accident",
        "गाडी की क्रासिंग / For crossing of a train",
        "गाडीकोपहलेलेने / For precedence of a train",
        "इनमें से कोईएक / Any of the above"
      ],
      correctAnswer: 3,
      explanation: "Signals taken OFF for a departing train may be put back to ON for any of the above reasons: to avert an accident, for crossing of a train, or for precedence of a train."
    },
    {
      id: 18,
      question: "प्रस्थानकरनेवाली गाड़ी के लिए स्टार्टर / एडवांस्डस्टार्टरसिगनल को वापसरखनेकेबाद, लोको पायलट कोसंचारकेसुरक्षितसाधनयालिखितमेमोद्वारासूचितनकिएजानेतकस्टेशन मास्टर --------------- नहींकरेगा. After putting back starter/advanced starter for a departing train, till LP is advised through secured means of communication or through a written memo, SM shall not",
      options: [
        "दूसरीगाडी के लिए एलसीप्राप्त / ObtainLC for another train",
        "मार्गकेपाइंटोंकेनहींबदलेगा / Alter the points on the route",
        "दूसरीगाडी के लिए एलसीनीहींदेगा / Grant LCfor another train",
        "उपर्युक्त में से कोई नहीं / None of above"
      ],
      correctAnswer: 1,
      explanation: "After putting back starter/advanced starter for a departing train, till LP is advised, SM shall not alter the points on the route."
    },
    {
      id: 19,
      question: "होम सिगनल कोऑनमेंआंशिक रूप से पार कर चुकी और फिर रूकी गाड़ी को लेनेकाप्राधिकार. Authority for receiving a train which has passed home signal at 'ON' partially and stopped.",
      options: [
        "टी/369 / T/369",
        "पुर्नआरंभमेमो / Restart memo",
        "पीएचएस / PHS",
        "येसभी / All the above"
      ],
      correctAnswer: 3,
      explanation: "Authority for receiving a train which has passed home signal at 'ON' partially and stopped can be T/369, Restart memo, or PHS - all of the above."
    },
    {
      id: 20,
      question: "प्रस्थानसिगनलोंके\"ऑफ\"होनेपरभीलोको पायलट ऐसेस्टेशनोंपररुकेगा, जहां ------------------मेंरुकनानिर्धारितकियागयाहो. Even though departure signals are taken off, LP shall stop at stations where stoppages are scheduled in the",
      options: [
        "वीजी / VG",
        "सीटीआर / CTR",
        "डब्ल्यूटीटी / WTT",
        "एसओबी / SOB"
      ],
      correctAnswer: 2,
      explanation: "Even though departure signals are taken off, LP shall stop at stations where stoppages are scheduled in the WTT (Working Time Table)."
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
    if (questionId <= 5) return "General Rules"
    if (questionId <= 10) return "Signalling Basics"
    if (questionId <= 15) return "Signal Operations"
    return "Emergency Procedures"
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
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">G&SR Rules MCQ</h1>
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
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Operating Manual 20 Quiz Summary & Overview</h2>
              
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

export default OperatingManual20