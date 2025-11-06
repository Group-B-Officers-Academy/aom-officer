'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const AutomaticSignals = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All 20 AUTOMATIC SIGNALS MCQ Questions
  const questions: Question[] = [
    {
      id: 1,
      question: " एक रेलवे के किसी भी भाग पर गाड़ियों के कार्यचालन के लिए तत्समय अपनाई जाने वाली प्रणाली है / The system adopted for the time being for the working of trains on any portion of a railway is known as",
      options: [
        " system of controlling नियुत्रण प्रणाली",
        " direction of traffic यातायात का निर्देश",
        " System of working कार्यचालन प्रणाली",
        " none of these इनमें से कोई नहीं"
      ],
      correctAnswer: 2,
      explanation: "The system adopted for the time being for the working of trains on any portion of a railway is known as System of working (कार्यचालन प्रणाली)."
    },
    {
      id: 2,
      question: " आटोमेटिक सिगनल के सिवाए फिकस्ड सिगनल अपनी सामान्य स्थिति में हमेशा ---------------पहलु दिखाएगा. / The aspect in the normal position of fixed signals except Automatic Signals is",
      options: [
        " stop रोक",
        " caution सतर्कता",
        " proceed आगेबढ़ो",
        " most restrictive सर्वाधिक प्रतिबंधित"
      ],
      correctAnswer: 3,
      explanation: "Fixed signals except Automatic Signals show 'most restrictive' aspect in their normal position."
    },
    {
      id: 3,
      question: " स्वचालित रोक सिगनल पर जब गाड़ी रुकती है, गार्ड पीछे की ओर यह सिगनल दिखएगा. / When the train has been stopped at an Automatic stop signal, the signal that guard shall show towards the rear",
      options: [
        " Stop Hand Signal रुकें",
        " Signal warning of obstruction ahead आगे अवरुद्ध का चेतावनी सिगनल",
        " amber flasher light अंबर टिमटिमाती बत्ती",
        " Proceed आगे बढ़ें"
      ],
      correctAnswer: 0,
      explanation: "When train is stopped at an Automatic stop signal, guard shall show Stop Hand Signal towards the rear."
    },
    {
      id: 4,
      question: " जब सिंगल लाइन के आटोमेटिक ब्लाक सिगनलिंग सेक्शन में गाड़ी रुक जाती है और गाड़ी आगे नहीं जा सकती हो तो गार्ड पीछे की ओर --------मीटर पर पटाखे रखते हुए गाड़ी की सुरक्षा करेगा / When a train is stopped in an automatic block signaling section on single line and train cannot proceed further, the Guard shall protect in rear duly placing detonators at",
      options: [
        " 250M, 500M, &510M",
        " 90M, 180M, &190M",
        " 600M, 1200M, 1210M",
        " 90M,180M,190M &200M"
      ],
      correctAnswer: 1,
      explanation: "On single line, Guard shall place detonators at 90M, 180M, & 190M in rear when train cannot proceed."
    },
    {
      id: 5,
      question: " जब लोको पायलट आटोमेटिक सिगनल को 'आन' पर पास करता है तो वह ---की गति प्रतिबंध का पालन करेग / When Loco Pilot passes an automatic signal at ON, he shall observe maximum SR of",
      options: [
        " 8 kmph",
        " 10kmph",
        " 15 kmph",
        " Great caution"
      ],
      correctAnswer: 3,
      explanation: "When Loco Pilot passes an automatic signal at ON, he shall observe 'Great caution' speed restriction."
    },
    {
      id: 6,
      question: " डबल लाइन पर, आटोमेटिक सिगनल तब तक आफ स्थिति में नहीं आएगा जब तक कि न केवल अगले आटोमेटिक सिगनल तक कम से कम ---------मीटर की पर्याप्त दूरी तक लाइंन किल / On D/L the automatic signal shall not assume OFF position unless the line is clear not only upto the next Automatic signal but also for an adequate distance of not less than",
      options: [
        " 180 metres",
        " 120 metres",
        " 400 metres",
        " 100 metres"
      ],
      correctAnswer: 1,
      explanation: "On double line, automatic signal requires line clear upto next signal plus adequate distance of not less than 120 metres."
    },
    {
      id: 7,
      question: " आटोमेटिक सिगनल्ंिाग क्षेत्र में गेट सिगनल --- द्वारा पहचाना जाता है / Gate signal in automatic signaling territory is distinguished by",
      options: [
        " G marker and illuminated A marker when gate is closed जब फाटक बंद है तो G मार्कर और प्रदीप्त A मार्कर",
        " केवल G मार्कर only G marker",
        " जब फाटक खुला है G मार्कर और प्रदीप्त A मार्कर G marker and illuminated A marker when gate is open",
        " जब फाटक बंद है A मार्कर और प्रदीप्त G मार्कर A marker and illuminated G marker when gate is closed"
      ],
      correctAnswer: 0,
      explanation: "Gate signal in automatic signaling territory is distinguished by G marker and illuminated A marker when gate is closed."
    },
    {
      id: 8,
      question: " जब आटोमेटिक सिगनलिंग क्षेत्र में फाटक रोक सिगनल में ए मार्कर प्रदीप्त हो तो तात्पर्य है. / When 'A' marker is illuminated in the Gate stop signal in Automatic signaling territory, indicates",
      options: [
        " Gate is in open condition फाटक खुली स्थिति में है",
        " cannot say anything कुछ भी नहीं कह सकते",
        " gate is in closed condition फाटक बंद स्थिति में है",
        " gate is defective फाटक खराब है"
      ],
      correctAnswer: 2,
      explanation: "When 'A' marker is illuminated in Gate stop signal in Automatic signaling territory, it indicates gate is in closed condition."
    },
    {
      id: 9,
      question: " आटोमेटिक ब्लाक प्रणाली में डबल लाइन पर सिगनलों की लंबी अवधि की खराबी और दूरसंचार हो, के दौरान, लोको पायलट को दी जाने वाली प्रधिकार हे.. / During prolonged failure of signals but communications are available on D/L Automatic Block System, the authority given to Loco Pilot is",
      options: [
        " T/ D 602",
        " T/ D 912",
        " T /C 602",
        " T /B 912"
      ],
      correctAnswer: 1,
      explanation: "During prolonged failure of signals but communications available on D/L Automatic Block System, authority given to Loco Pilot is T/D 912."
    },
    {
      id: 10,
      question: " जब आटोमेटिक सिगनलिंग क्षेत्र में फाटक सिगनल 'आन' पर हो और ए मार्कर प्रदीप्त न हो तो लोको पायलट फाटक को पास करने के लिए------------नियमों का पालन करे / When Gate signal in Automatic signaling territory is at 'ON' and 'A' marker is not illuminated, LP shall follow the rules of passing",
      options: [
        " gate फाटक नियम",
        " automatic केवल आटोमेटिक नियम",
        " none of these इनमें से कोई नहीं",
        " gate&automatic rules"
      ],
      correctAnswer: 3,
      explanation: "When Gate signal in Automatic signaling territory is at 'ON' and 'A' marker is not illuminated, LP shall follow both gate and automatic rules."
    },
    {
      id: 11,
      question: " जब आटोमेटिक ब्लाक सिगनल सेक्शन में डबल लाइन पर गाड़ी रुक जाती है और गाड़ी आगे नहीं जा सकती हो तो लोको पायलट और सहायक लोको पायलट --------मीटर की दूरी पर पटाखे रखते हुए बगल वाली लाइन की सुरक्षा करेगा / When a train is stops in an automatic block signaling section on double line (BG) and train cannot proceed further, the LP shall protect adjacent line in front duly placing detonators at",
      options: [
        " 90, 180 & 190 Mtrs",
        " 600, 1200, 1210 &1220 Mtrs",
        " 250, 500 & 510 Mtrs",
        " 400, 800, 810, & 820 Mtrs"
      ],
      correctAnswer: 1,
      explanation: "On double line (BG), when train cannot proceed, LP shall protect adjacent line by placing detonators at 600, 1200, 1210 & 1220 Mtrs."
    },
    {
      id: 12,
      question: " आटोमेटिक रोक सिगनल का सामान्य संकेत ----------------------------है. / Normal aspect of an Automatic stop signal is",
      options: [
        " Stop रोकें",
        " Attention सावधान",
        " Proceed आगे बढ़ें",
        " Most restrictive aspect अधिक प्रतिबंधित संकेत"
      ],
      correctAnswer: 2,
      explanation: "Normal aspect of an Automatic stop signal is 'Proceed' (आगे बढ़ें)."
    },
    {
      id: 13,
      question: " आटोमेटिक रोक सिगनलों की पहचान--------------------से की जाती है. / Automatic stop signal is identified by",
      options: [
        " A marker A मार्कर",
        " Illuminated A marker प्रदीप्त A मार्कर",
        " C marker Cमार्कर",
        " AB marker AB मार्कर"
      ],
      correctAnswer: 0,
      explanation: "Automatic stop signal is identified by 'A marker' (A मार्कर)."
    },
    {
      id: 14,
      question: " स्वचालित ब्लाक पद्धति पर घने कोहरे के दौरान जब सिगनल एक पीली बत्ती बताता हो तो गाडी की अधिकतम गति---------------------तक प्रतिबंधित होनी चाहिए. / During dense fog, maximum speed of a train on Automatic block system when it is showing single yellow light shall be restricted to",
      options: [
        " 25kmph 25 कि.मी.प्र.घं",
        " Restricted speed to stop at next stop signal प्रतिबंधित गति जो अगले रोक सिगनल पर रोके",
        " 60kmph 60 कि.मी.प्र.घं.",
        " 30kmph 30 कि.मी.प्र.घं."
      ],
      correctAnswer: 1,
      explanation: "During dense fog on Automatic block system, when signal shows single yellow light, speed shall be restricted to stop at next stop signal."
    },
    {
      id: 15,
      question: " स्वचालित ब्लाक पद्धति पर घने कोहरे के दौरान काम करने से जुड़े फॉग सेफ्टी डिवाइस जब सिगनल बत्ती हरा रंग बताती हो तो गाडी की अधिकतम गति---------------------तक प्रतिबंधित होनी चाहिए. / During dense fog, fog safety device provided and working maximum speed of a train on Automatic block system when",
      options: [
        " 75kmph 75 कि.मी.प्र.घं.",
        " Restricted speed to stop at next stop signal अगले रोक सिगनल तक प्रतिबंधित गति से जाना",
        " 60kmph 60 कि.मी.प्र.घं.",
        " 30kmph 30 कि.मी.प्र.घं."
      ],
      correctAnswer: 0,
      explanation: "During dense fog with fog safety device working on Automatic block system, maximum speed is 75 kmph when signal shows green."
    },
    {
      id: 16,
      question: " स्वचालित ब्लाक पद्धति पर घने कोहरे के दौरान जब सिगनल दो पीली बत्तियां बताता हो तो गाडी की अधिकतम गति---------------------तक प्रतिबंधित होनी चाहिए. / During dense fog, maximum speed of a train on Automatic block system when signal showing two yellow lights shall be restricted to",
      options: [
        " 25 किमीप्रघं 25 KMPH",
        " अगले रोक सिगनल तकप्र तिबंधित गति से जाना Restricted speed to stop at next stop signal",
        " 60 किमीप्रघं 60 KMPH",
        " 30 किमीप्रघं 30 KMPH"
      ],
      correctAnswer: 3,
      explanation: "During dense fog on Automatic block system, when signal shows two yellow lights, maximum speed is restricted to 30 KMPH."
    },
    {
      id: 17,
      question: " जब अर्द्धस्वचालित रोक सिगनल, आटोमेटिक सिगनल के रुप में कार्य कर रहा हो तो उसकी पहचान -------बत्ती से की जाती है. / Semi automatic stop signal when working as automatic signal is identified by",
      options: [
        " A मार्करबोर्ड 'A' marker board",
        " प्रदीप्त A मार्करबत्ती Illuminated A Marker",
        " A&B",
        " इनमेंसेकोईनहीं none of these"
      ],
      correctAnswer: 1,
      explanation: "Semi automatic stop signal when working as automatic signal is identified by 'Illuminated A Marker' (प्रदीप्त A मार्करबत्ती)."
    },
    {
      id: 18,
      question: " घाट सेक्शन और ऑटोमैटिक टेरिटरी पर, रोड लर्निंग की न्यूनतम ____ यात्राएं, दोनों दिशाओं में 20.00 बजेऔर 06.00 बजे के बीच ____ रात्रि यात्राएं प्रदान की जाएंगी। / On Ghat sections and Automatic territories minimum _______no. of road learning shall be provided in both directions including ______night trips",
      options: [
        " 3 और 1 / 3 and 1",
        " 6 और 2 / 6 and 2",
        " 2 और 2 /2 and 2",
        " 4 और 2 /4 and 2"
      ],
      correctAnswer: 1,
      explanation: "On Ghat sections and Automatic territories, minimum 6 road learning trips shall be provided in both directions including 2 night trips."
    },
    {
      id: 19,
      question: " अगले स्वचालित सिगनल प्रणाली सेक्शन में, उससे आगे पर्याप्त दूरी तक में ___________ या रेलपथ पर ___________ होने या किसी ___________ होने के कारण स्वचालित रोक सिगनल 'ऑन' स्थिति दर्शाता है. / 'On' position of an Automatic Stop signal may be due to the __________in the automatic signaling section ahead including the adequate distance beyond it or due to an ___________on the track or a _____________or any other reason",
      options: [
        " obstruction",
        " train",
        " broken or a displaced rail",
        " Any one of above"
      ],
      correctAnswer: 3,
      explanation: "'On' position of an Automatic Stop signal may be due to obstruction, train, broken or displaced rail, or any other reason."
    },
    {
      id: 20,
      question: " एकल लाइन पर स्वचालित ब्लॉक प्रणाली में लाइन को किस प्रकार सुसज्जित किया जाना चाहिए? / In an Automatic Block System on a single line, how must the line be equipped",
      options: [
        " केवल टोकन यंत्रों के साथ With token instruments only",
        " हर सिग्नल पर डेटोनेटर के साथ With detonators at every signal",
        " निरंतर ट्रैक सर्किटिंग या एक्सल काउंटर के साथ With continuous track circuiting or axle counters",
        " झंडी सिग्नलों और मार्कर लाइट्स के साथ With flag signals and marker lights"
      ],
      correctAnswer: 2,
      explanation: "In an Automatic Block System on a single line, the line must be equipped with continuous track circuiting or axle counters."
    },
    {
        id: 21,
        question: `  What does the 'A' marker indicate for a Modified Semi-Automatic/ Semi-Automatic Stop signal?
  'A' मार्कर Modified/ Semi-Automatic स्टॉप सिग्नल पर क्या दर्शाता है?       `,
        options: [
          "  Lit = Manual, Extinguished = Automatic      ",
          "  Lit = Automatic, Extinguished = Manual / Modified Semi-Automatic     ",
          "  Lit = Calling-on permitted ",
          "  Extinguished = Gate closed and locked   "
        ],
        correctAnswer:  1  ,
        explanation: "  When the ‘A’ marker is illuminated, the signal works as Automatic. When the ‘A’ marker is extinguished, a Semi-Automatic is deemed Manual, and the Modified Semi-Automatic works in its modified mode (may assume ‘off’ automatically or be taken ‘off’ manually as required       "
      },
  
  {
        id: 22,
        question: `Where is a mid-section Modified Semi-Automatic Stop signal permitted?
  मिड-सेक्शन मॉडिफाइड सेमी-ऑटोमैटिक स्टॉप सिग्नल कहां अनुमत है?         `,
        options: [
          "  Double line Automatic Block only      ",
          "  Single line Automatic Block only     ",
          " Both Double & Single line Automatic Block (under special instructions)     ",
          "  Not permitted in AB territory      "
        ],
        correctAnswer:  2  ,
        explanation: "  Under special instructions, one of the automatic stop signals between two stations may be made a modified semi-automatic—provided in GR 9.01(3)(a) for double line and GR 9.03(3)(a) for single line       "
      },
  
  {
        id: 23,
        question: `  Who controls the mid-section Modified Semi-Automatic and how is it interlocked?
  मिड-सेक्शन मॉडिफाइड सेमी-ऑटोमैटिक का नियंत्रण किसके पास होता है और इंटरलॉकिंग कैसे होती है      `,
        options: [
          "  SM of station in rear; axle counters at rear only      ",
          " SM of station ahead; interlocked through TC/axle counters with station ahead signals    ",
          " Controller; not interlocked     ",
          "  Loco Pilot; radio authorization only      "
        ],
        correctAnswer:   1 ,
        explanation: "  The mid-section modified semi-automatic is interlocked with the station ahead signals via track circuits/axle counters and is controlled by the Station Master of the station ahead, with mode indications available to SMs at both ends       "
      },
  
  {
        id: 24,
        question: `  With 'A' extinguished, when may the Advanced Starter (rear) and the mid-section Modified Semi-Automatic show 'off'?
  'A' बुझा होने पर रियर का एडवांस्ड स्टार्टर और मिड-सेक्शन मॉडिफाइड सेमी-ऑटोमैटिक कब 'ऑफ' हो सकते हैं       `,
        options: [
          "   Whenever block section is clear up to next stop     ",
          "    Only after 5 minutes   ",
          "   Only when line is clear up to adequate distance beyond respective reference signals (mid-section signal / Home ahead)   ",
          "  At SM’s discretion without checks      "
        ],
        correctAnswer:   2 ,
        explanation: "   With ‘A’ extinguished, Advanced Starter (rear) may come ‘off’ only when the line is clear up to an adequate distance beyond the mid-section MSA; similarly, the mid-section MSA may come ‘off’ only when line is clear up to an adequate distance beyond the Home of the station ahead      "
      },
  
  {
        id: 25,
        question: `   During fog/bad visibility, what happens when the mid-section MSA is worked with 'A' extinguished?
  कोहरे/खराब दृश्यता में 'A' बुझाकर मिड-सेक्शन MSA चलाने पर क्या होता है?      `,
        options: [
          "  Only mid-section ‘A’ extinguishes      ",
          " Mid-section & Advanced Starter ‘A’ extinguish    ",
          "  Mid-section, Advanced Starter (rear), and Home (ahead) ‘A’ markers all extinguish    ",
          "  Home ahead alone extinguishes     "
        ],
        correctAnswer:  2  ,
        explanation: "  In abnormal conditions (fog/bad weather), working the mid-section MSA with ‘A’ extinguished shall also ensure the ‘A’ markers of the Advanced Starter in rear and Home in advance are extinguished       "
      },
  
  {
        id: 26,
        question: `   In normal conditions, how does the mid-section MSA work?
  सामान्य परिस्थितियों में मिड-सेक्शन MSA कैसे काम करता है?      `,
        options: [
          " As Manual only       ",
          "  As Calling-on     ",
          "  As a normal Automatic Stop signal    ",
          "  As a Gate Stop signal     "
        ],
        correctAnswer: 2   ,
        explanation: "    During normal conditions, the mid-section modified semi-automatic works as a normal automatic stop signal     "
      },
  
  {
        id: 27,
        question: `What must the Loco Pilot do if the mid-section MSA with 'A' extinguished is at 'ON'?
  यदि 'A' बुझा हुआ मिड-सेक्शन MSA 'ON' मिले तो लोको पायलट को क्या करना चाहिए?         `,
        options: [
          "  Pass after whistle      ",
          " Stop in rear and inform the SM of station ahead      ",
          "   Wait 2 minutes then pass   ",
          "    Ask Guard for permission    "
        ],
        correctAnswer:   1 ,
        explanation: "  LP shall stop in rear of the signal and inform the Station Master of the station ahead using approved communication, as prescribed       "
      },
  
  {
        id: 28,
        question: `  Who may authorize passing the mid-section MSA at 'ON' with 'A' extinguished, and how?
  'A' बुझा होने पर 'ON' मिड-सेक्शन MSA को पार करने की अनुमति कौन और कैसे देता है?       `,
        options: [
          "  Guard, by hand signal     ",
          "  Controller, by phone   ",
          "  Station Master of station ahead, via approved communication, after ensuring conditions  ",
          " Pointsman, by written memo       "
        ],
        correctAnswer:  2  ,
        explanation: "  The SM of the station ahead may authorize passing at ‘ON’ through approved means of communication after ensuring conditions/procedure as per special instructions       "
      },
  
  {
        id: 29,
        question: `  If the LP cannot contact the SM ahead, what is the fallback?
  यदि LP अगले SM से संपर्क नहीं कर पाता, तो वैकल्पिक प्रक्रिया क्या है       `,
        options: [
          " Pass immediately at 30 km/h       ",
          "  Wait 2 minutes, pass at 15 km/h     ",
          "  Wait 5 minutes, then proceed cautiously at ≤ 10 km/h up to next signal and act on its aspect    ",
          "  . Return to previous station      "
        ],
        correctAnswer: 2   ,
        explanation: "  If unable to contact, pass the signal at ‘ON’ after 5 minutes, proceed cautiously at a speed not exceeding 10 km/h up to the next signal and then act as per that signal’s aspect; report failure to SM ahead       "
      },
  
  {
        id: 30,
        question: ` Under AB system on double line, when may a Stop signal take 'OFF', and what is the minimum "adequate distance"?
  डबल लाइन AB प्रणाली में स्टॉप सिग्नल कब 'ऑफ' हो सकता है और "पर्याप्त दूरी" की न्यूनतम सीमा क्या है?    `,
        options: [
          "  Clear up to next stop only; 60 m      ",
          "   Clear up to next stop and adequate distance beyond; ≥ 120 m (unless otherwise directed)    ",
          "    Clear up to Home only; 1,200 m  ",
          "    Controller’s discretion; no minimum    "
        ],
        correctAnswer: 1    ,
        explanation: "  Track circuits/axle counters shall control that a Stop signal takes ‘OFF’ only when the line is clear up to the next Stop signal and for an adequate distance beyond it; unless otherwise directed, the adequate distance is not less than 120 m    "
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
    if (questionId <= 5) return "Basic Concepts"
    if (questionId <= 10) return "Signal Operations"
    if (questionId <= 15) return "Fog & Speed Limits"
    return "System Requirements"
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
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">Automatic Signals 20 MCQ Quiz</h1>
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
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">Automatic Signals Quiz Summary & Overview</h2>
              
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

export default AutomaticSignals
