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
      {
        "id": 19,
        "question": "भारत के संविधान के किस भाग में राजभाषा संबंधी प्रावधान दिए गए हैं? (In which part of Indian Constitution, provisions related to Official Language are given?)",
        "options": [
          "(A) भाग-15 (Part -15)",
          "(B) भाग-16 (part-16)",
          "**(C) भाग - 17 (Part-17)**",
          "(D) भाग-18 (part -18)"
        ],
        "correctAnswer": 2,
        "explanation": "राजभाषा संबंधी प्रावधान भारतीय संविधान के भाग 17 में दिए गए हैं। (Provisions related to Official Language are given in Part 17 of the Indian Constitution) [cite: 1, 2, 3]"
      },
      {
        "id": 20,
        "question": "संविधान के भाग – 17 के किस अध्याय में संघ की राजभाषा का उल्लेख है? (In which chapter of the Part – 17 of Constitution the official language of the Union is mentioned?)",
        "options": [
          "**(A) अध्याय - 1 (Chapter - 1)**",
          "(B) अध्याय - 2 (Chapter - 2)",
          "(C) अध्याय - 3 (Chapter - 3)",
          "(D) अध्याय - 4 (Chapter - 4)"
        ],
        "correctAnswer": 0,
        "explanation": "संघ की राजभाषा का उल्लेख संविधान के भाग 17 के अध्याय 1 में है। (The official language of the Union is mentioned in Chapter 1 of Part 17 of the Constitution) [cite_start][cite: 3, 4, 5]"
      },
      {
        "id": 21,
        "question": "संसद में उपयोग की जानेवाली भाषा के बारे में भारत के संविधान के किस अनुच्छेद में उल्लेख है? (In which article of the Constitution of India mentions about the language to be used in the Parliament?)",
        "options": [
          "(A) अनुच्छेद - 12 (Article - 12)",
          "**(B) अनुच्छेद - 120 (Article - 120)**",
          "(C) अनुच्छेद -112 (Article - 112)",
          "(D) अनुच्छेद - 210 (Article – 210)"
        ],
        "correctAnswer": 1,
        "explanation": "संसद में प्रयोग की जाने वाली भाषा का उल्लेख अनुच्छेद 120 में है। (The language to be used in the Parliament is mentioned in Article 120) [cite_start][cite: 5, 6, 7]"
      },
      {
        "id": 22,
        "question": "विधान मंडल में प्रयोग की जानेवाली भाषा के संबंध में भारत के संविधान के किस अनुच्छेद में उल्लेख है ? (Which article of the Constitution of India mentions about the language to be used in the Legislature?)",
        "options": [
          "(A) अनुच्छेद - 120 (Article - 120)",
          "**(B) अनुच्छेद - 210 (Article - 210)**",
          "(C) अनुच्छेद - 343 (Article - 343)",
          "(D) अनुच्छेद - 345 (Article - 345)"
        ],
        "correctAnswer": 1,
        "explanation": "विधान मंडल में प्रयोग की जाने वाली भाषा का उल्लेख अनुच्छेद 210 में है। (The language to be used in the Legislature is mentioned in Article 210) [cite_start][cite: 7, 8, 9]"
      },
      {
        "id": 23,
        "question": "भारत के संविधान के किस अनुच्छेद में संघ की राजभाषा के बारे में उल्लेख किया गया है? (Under which article of the Constitution of India, Official language of the Union is mentioned?)",
        "options": [
          "(A) अनुच्छेद -112 (Article - 112)",
          "(B) अनुच्छेद - 120 (Article - 120)",
          "(C) अनुच्छेद - 340 (Article - 340)",
          "**(D) अनुच्छेद - 343 (Article - 343)**"
        ],
        "correctAnswer": 3,
        "explanation": "संघ की राजभाषा का उल्लेख अनुच्छेद 343 में किया गया है। (Official language of the Union is mentioned in Article 343) [cite_start][cite: 9, 10, 11]"
      },
      {
        "id": 24,
        "question": "राजभाषा के संबंध में आयोग और संसद की समिति के बारे में भारत के संविधान के किस अनुच्छेद में उल्लेख है? (Which article of the Constitution of India mentions about the Commission and Committee of Parliament in connection with the official language?)",
        "options": [
          "(A) अनुच्छेद - 210 (Article - 210)",
          "(B) अनुच्छेद - 343 (Article - 343)",
          "**(C) अनुच्छेद - 344 (Article - 344)**",
          "(D) अनुच्छेद - 351 (Article - 351)"
        ],
            "correctAnswer": 2,
        "explanation": "राजभाषा आयोग और संसदीय समिति का उल्लेख अनुच्छेद 344 में है। (The Commission and Committee of Parliament in connection with the official language is mentioned in Article 344) [cite_start][cite: 11, 12, 13]"
      },
      {
        "id": 25,
        "question": "राज्य की राजभाषा या राजभाषाओं के बारे में भारत के संविधान के किस अनुच्छेद में उल्लेख है? (Which article of the Constitution of India mentions about the official language or official languages of the state?)",
        "options": [
          "(A) अनुच्छेद - 343 (Article - 343)",
          "(B) अनुच्छेद - 344 (Article - 344)",
          "**(C) अनुच्छेद - 345 (Article - 345)**",
          "(D) अनुच्छेद - 346 (Article - 346)"
        ],
        "correctAnswer": 2,
        "explanation": "राज्य की राजभाषा या राजभाषाओं का उल्लेख अनुच्छेद 345 में है। (The official language or official languages of the state are mentioned in Article 345) [cite_start][cite: 13, 14, 15]"
      },
      {
        "id": 26,
        "question": "एक राज्य और दूसरे राज्य के बीच या किसी राज्य और संघ के बीच पत्रादि की भाषा के बारे में भारत के संविधान के किस अनुच्छेद में उल्लेख है? (Which article of the Constitution of India mentions about the language of communication between one state and another or between a state and the Union?)",
        "options": [
          "**(A) अनुच्छेद - 346 (Article - 346)**",
          "(B) अनुच्छेद -347 (Article -347)",
          "(C) अनुच्छेद - 348 (Article - 348)",
          "(D) अनुच्छेद - 349 (Article - 349)"
        ],
        "correctAnswer": 0,
        "explanation": "राज्यों और संघ के बीच पत्रादि की भाषा का उल्लेख अनुच्छेद 346 में है। (The language of communication between one state and another or between a state and the Union is mentioned in Article 346) [cite_start][cite: 15, 16, 17]"
      },
      {
        "id": 27,
        "question": "उच्चतम न्यायालय और उच्च न्यायालयों में और अधिनियमों, विधेयकों आदि के लिए प्रयोग की जानेवाली भाषा के बारे में भारत के संविधान के किस अनुच्छेद में उल्लेख है? (Which article of the Constitution of India mention about the language used in the Supreme Court and High Courts and for the Acts, Bills etc.?)",
        "options": [
          "(A) अनुच्छेद - 347 (Article - 347)",
          "**(B) अनुच्छेद - 348 (Article - 348)**",
          "(C)अनुच्छेद - 349 (Article - 349)",
          "(D) अनुच्छेद - 350 (Article - 350)"
        ],
        "correctAnswer": 1,
        "explanation": "उच्चतम न्यायालय और उच्च न्यायालयों में प्रयोग की जाने वाली भाषा का उल्लेख अनुच्छेद 348 में है। (The language used in the Supreme Court and High Courts and for the Acts, Bills etc. is mentioned in Article 348) [cite_start][cite: 17, 18, 19]"
      },
      {
        "id": 28,
        "question": "व्यथा के निवारण के लिए अभ्यावेदन में प्रयोग की जानेवाली भाषा के बारे में भारत के संविधान के किस अनुच्छेद में उल्लेख है? (Which article of the Constitution of India mentions about the language used in the representation for the prevention of grief?)",
        "options": [
          "(A) अनुच्छेद - 344 (Article - 344)",
          "(B) अनुच्छेद - 346 (Article - 346)",
          "(C) अनुच्छेद - 348 (Article - 348)",
          "**(D) अनुच्छेद - 350 (Article - 350)**"
        ],
        "correctAnswer": 3,
        "explanation": "व्यथा के निवारण के लिए अभ्यावेदन में प्रयोग की जाने वाली भाषा का उल्लेख अनुच्छेद 350 में है। (The language used in the representation for the prevention of grief is mentioned in Article 350) [cite_start][cite: 19, 20, 21]"
      },
      {
        "id": 29,
        "question": "हिंदी भाषा के विकास के लिए निदेश का उल्लेख भारत के संविधान के किस अनुच्छेद में है? (Which article of the Constitution of India mentions the Directive for the development of Hindi language?)",
        "options": [
          "(A) अनुच्छेद - 343 (Article - 343)",
          "(B) अनुच्छेद - 344 (Article - 344)",
          "**(C) अनुच्छेद - 351 (Article - 351)**",
          "(D) इनमें से कोई नहीं (None of the above)"
        ],
          "correctAnswer": 2,
        "explanation": "हिंदी भाषा के विकास के लिए निदेश का उल्लेख अनुच्छेद 351 में है। (The Directive for the development of Hindi language is mentioned in Article 351) [cite_start][cite: 21, 22, 23]"
      },
      {
        "id": 30,
        "question": "भारत के संविधान के अनुसार संघ की राजभाषा हिंदी तथा लिपि ________ होगी? (According to the Constitution of India, the official language of the Union will be Hindi and the script will be ________.)",
        "options": [
          "(A) रोमन (Roman)",
          "(B) खरोष्ठी (Kharosthi)",
          "**(C) देवनागरी (Devnagri)**",
          "(D) ब्राम्ही (Brahmi)"
        ],
        "correctAnswer": 2,
        "explanation": "संघ की राजभाषा हिंदी और लिपि देवनागरी होगी। (The official language of the Union will be Hindi and the script will be Devnagri) [cite_start][cite: 23, 24, 25]"
      },
      {
        "id": 31,
        "question": "संसदीय राजभाषा समिति की कौन सी उप समिति रेल कार्यालयों का निरीक्षण करती है? (Which sub-committee of Parliamentary Committee on Official Language inspects Railway offices?)",
        "options": [
          "(A) दूसरी उप समिति (Second sub Committee)",
          "**(B) तीसरी उप समिति (Third sub Committee)**",
          "(C) पहली उप समिति (First sub Committee)",
          "(D) इनमें से कोई नहीं (None of the above)"
        ],
        "correctAnswer": 1,
        "explanation": "संसदीय राजभाषा समिति की तीसरी उप समिति रेल कार्यालयों का निरीक्षण करती है। (The Third sub-committee of the Parliamentary Committee on Official Language inspects Railway offices) [cite_start][cite: 25, 26, 27]"
      },
      {
        "id": 32,
        "question": "राजभाषा अधिनियम की धारा 4 के अंतर्गत गठित संसदीय राजभाषा समिति में लोक सभा के कितने सदस्य होते हैं? (How many members of Lok Sabha are there in the Parliamentary Committee on Official Language constituted under section 4 of the Official Language Act?)",
        "options": [
          "(A) 5",
          "(B) 10",
          "**(C) 15**",
          "(D) 20"
        ],
        "correctAnswer": 2,
        "explanation": "संसदीय राजभाषा समिति में लोक सभा के 15 सदस्य होते हैं। (There are 15 members of Lok Sabha in the Parliamentary Committee on Official Language) [cite_start][cite: 28, 29, 30]"
      },
      {
        "id": 33,
        "question": "संसदीय राजभाषा समिति में राज्य सभा के कितने सदस्य होते हैं? (How many members of Rajya Sabha are there in the Parliamentary Committee on Official Language?)",
        "options": [
          "(A) 5",
          "**(B) 10**",
          "(C) 15",
          "(D) 22"
        ],
        "correctAnswer": 1,
        "explanation": "संसदीय राजभाषा समिति में राज्य सभा के 10 सदस्य होते हैं। (There are 10 members of Rajya Sabha in the Parliamentary Committee on Official Language) [cite_start][cite: 30, 31, 32]"
      },
      {
        "id": 34,
        "question": "संविधान की किस अनुसूची में राज्य के राजभाषाओं का उल्लेख है? (Which Schedule of the Constitution mentions about the official languages of the state?)",
        "options": [
          "(A) सातवीं (Seventh)",
          "**(B) आठवीं (Eighth)**",
          "(C) नौवीं (Ninth)",
          "(D) दसवीं (Tenth)"
        ],
        "correctAnswer": 1,
        "explanation": "संविधान की आठवीं अनुसूची में राजभाषाओं का उल्लेख है। (The Eighth Schedule of the Constitution mentions about the official languages) [cite_start][cite: 32, 33, 34]"
      },
      {
        "id": 35,
        "question": "भारत के संविधान के भाग-17 में राजभाषा के प्रयोजन के लिए कितने अनुच्छेद हैं? (Part-17 of the Constitution of India contains how many articles for the purpose of Official language?)",
        "options": [
          "**(A) 9**",
          "(B) 10",
          "(C) 11",
          "(D) 12"
        ],
        "correctAnswer": 0,
        "explanation": "संविधान के भाग-17 में राजभाषा के प्रयोजन के लिए 9 अनुच्छेद (343 से 351 तक) हैं। (Part-17 of the Constitution contains 9 articles (from 343 to 351) [cite_start]for the purpose of Official language) [cite: 34, 35, 36]"
      },
      {
        "id": 36,
        "question": "राजभाषा अधिनियम किस वर्ष पारित किया गया? (In which year the Official Language Act was passed?)",
        "options": [
          "(A) 1961",
          "(B) 1962",
          "**(C) 1963**",
          "(D) 1968"
        ],
        "correctAnswer": 2,
        "explanation": "राजभाषा अधिनियम 1963 में पारित किया गया। (The Official Language Act was passed in 1963) [cite_start][cite: 36, 37, 38]"
      },
      {
        "id": 37,
        "question": "राजभाषा अधिनियम की किस धारा के दस्तावेजों को हिंदी और अंग्रेजी दोनों भाषाओं में तैयार और जारी करना अनिवार्य है? (Under which section of the Official Language Act, certain documents are compulsorily be prepared, issued both in Hindi and English languages?)",
        "options": [
          "(A) धारा 3 (1) (Section 3(1))",
          "(B) धारा 3(2) (Section 3(2))",
          "**(C) धारा 3(3) (Section 3 (3))**",
          "(D) धारा 4 (Section 4)"
        ],
        "correctAnswer": 2,
        "explanation": "धारा 3(3) के अंतर्गत दस्तावेजों को हिंदी और अंग्रेजी दोनों भाषाओं में तैयार और जारी करना अनिवार्य है। (Under Section 3(3)[cite_start], certain documents are compulsorily to be prepared and issued both in Hindi and English) [cite: 38, 39, 40]"
      },
      {
        "id": 38,
        "question": "राजभाषा अधिनियम के प्रयोजनों को कार्यान्वित करने के लिए नियम बनाने की शक्ति किसे प्रदान की गई? (Who is empowered to make rules to implement the Official Language Act?)",
        "options": [
          "**(A) केंद्र सरकार को (Central Government)**",
          "(B) राज्य सरकार को (State Government)",
          "(C) राज्यपाल को (Governor)",
          "(D) इनमें से कोई नहीं (None of the above)"
        ],
        "correctAnswer": 0,
        "explanation": "राजभाषा अधिनियम के प्रयोजनों को कार्यान्वित करने के लिए नियम बनाने की शक्ति केंद्र सरकार को प्रदान की गई है। (The Central Government is empowered to make rules to implement the Official Language Act) [cite_start][cite: 40, 41, 42]"
      },
      {
        "id": 39,
        "question": "राजभाषा अधिनियम में संशोधन किस वर्ष के दौरान किया गया था? (In which year amendment to the Official Language Act was made?)",
        "options": [
          "(A) 1964",
          "(B) 1965",
          "(C)1966",
          "**(D) 1967**"
        ],
        "correctAnswer": 3,
        "explanation": "राजभाषा अधिनियम में संशोधन वर्ष 1967 के दौरान किया गया था। (The amendment to the Official Language Act was made in 1967) [cite_start][cite: 42, 43, 44]"
      },
      {
        "id": 40,
        "question": "राजभाषा के संबंध में राष्ट्रपति के आदेश किस वर्ष 27 अप्रैल को जारी हुए थे? (In which year the President's orders regarding the Official language were issued on 27 April?)",
        "options": [
          "**(A) 1955**",
          "(B) 1960",
          "(C) 1962",
          "(D) 1965"
        ],
        "correctAnswer": 0,
        "explanation": "राजभाषा के संबंध में राष्ट्रपति के आदेश 27 अप्रैल 1955 को जारी हुए थे। (The President's orders regarding the Official language were issued on 27 April 1955) [cite_start][cite: 44, 45, 46]"
      },
      {
        "id": 23,
        "question": "राजभाषा संकल्प किस वर्ष के दौरान पारित किया गया था? (During which year the Official Language Resolution was passed?)",
        "options": [
          "(A) 1960",
          "(B) 1962",
          "**(C) 1967**",
          "(D) 1968"
        ],
        "correctAnswer": 2,
        "explanation": "राजभाषा संकल्प वर्ष 1967 के दौरान पारित किया गया था। (The Official Language Resolution was passed in 1967) [cite_start][cite: 46, 47, 48]"
      },
      {
        "id": 41,
        "question": "राजभाषा नियम किस वर्ष पारित किया गया था ? (In which year the Official Language Rule was passed?)",
        "options": [
          "(A) 1963",
          "(B) 1967",
          "**(C) 1976**",
          "(D) 1987"
        ],
        "correctAnswer": 2,
        "explanation": "राजभाषा नियम 1976 में पारित किया गया था। (The Official Language Rule was passed in 1976) [cite_start][cite: 48, 49, 50]"
      },
      {
        "id": 42,
        "question": "राजभाषा नियम भारत के किस राज्य पर लागू नहीं होते हैं? (Official Language Rules do not apply to which state of India?)",
        "options": [
          "(A) कर्नाटक (Karnataka)",
          "**(B) तमिलनाडु (Tamil Nadu)**",
          "(C) गोवा (Goa)",
          "(D) इनमें से कोई नहीं (None of the above)"
        ],
        "correctAnswer": 1,
        "explanation": "राजभाषा नियम, 1976 भारत के तमिलनाडु राज्य पर लागू नहीं होते हैं। (The Official Language Rules, 1976 do not apply to the state of Tamil Nadu) [cite_start][cite: 50, 51, 52]"
      },
      {
        "id": 43,
        "question": "राजभाषा नियम, 1976 के अंतर्गत भारत के राज्यों और केंद्र शासित प्रदेशों को कितने क्षेत्रों में वर्गीकृत किया गया है? (In how many regions States and Union Territories of India are categorized under Official Language Rules, 1976?)",
        "options": [
          "(A) 2",
          "**(B) 3**",
          "(C) 4",
          "(D) 5"
        ],
        "correctAnswer": 1,
        "explanation": "राजभाषा नियम, 1976 के अंतर्गत राज्यों और केंद्र शासित प्रदेशों को 3 क्षेत्रों ('क', 'ख', 'ग') में वर्गीकृत किया गया है। (States and Union Territories are categorized into 3 regions ('A', 'B', 'C') [cite_start]under the Official Language Rules, 1976) [cite: 52, 53, 54]"
      },
      {
        "id": 44,
        "question": "अंदमान व निकोबार द्वीप समूह राजभाषा के प्रयोग-प्रसार के लिए वर्गीकृत किस क्षेत्र के अधीन आते हैं? (Andaman and Nicobar Islands come under which are classified for the propagation of the Official language ?)",
        "options": [
          "**(A) ‘क’ क्षेत्र (‘A’ region)**",
          "(B) ‘ख’ क्षेत्र (‘B’ region)",
          "(C) ‘ग’ क्षेत्र (‘C’ region)",
          "(D) इनमें से कोई नहीं (None of the above)"
        ],
        "correctAnswer": 0,
        "explanation": "अंदमान व निकोबार द्वीप समूह 'क' क्षेत्र के अधीन आते हैं। (Andaman and Nicobar Islands come under the 'A' region) [cite_start][cite: 54, 55, 56]"
      },
      {
        "id": 45,
        "question": "तेलंगाना राज्य राजभाषा के प्रयोग-प्रसार के लिए वर्गीकृत किस क्षेत्र के अधीन आता है? (The state of Telangana comes under which area classified for the use of the official language?)",
        "options": [
          "(A) ‘क’ क्षेत्र (‘A’ region)",
          "(B) ‘ख’ क्षेत्र (‘B’ region)",
          "**(C) ‘ग’ क्षेत्र (‘C’ region)**",
          "(D) इनमें से कोई नहीं (None of the above)"
        ],
        "correctAnswer": 2,
        "explanation": "तेलंगाना राज्य 'ग' क्षेत्र के अधीन आता है। (The state of Telangana comes under the 'C' region) [cite_start][cite: 56, 57, 58]"
      },
      {
        "id": 46,
        "question": "‘हिंदी में कार्यसाधक ज्ञान’ की परिभाषा राजभाषा नियम की किस नियम में दी गई है? (The definition of 'working knowledge in Hindi' is given in which rule of the Official Language Rules?)",
        "options": [
          "(A) 7",
          "(B) 8",
          "**(C) 9**",
          "(D) 10"
        ],
        "correctAnswer": 2,
        "explanation": "‘हिंदी में कार्यसाधक ज्ञान’ की परिभाषा राजभाषा नियम के नियम 9 में दी गई है। (The definition of 'working knowledge in Hindi' is given in Rule 9 of the Official Language Rules) [cite_start][cite: 58, 59, 60]"
      },
      {
        "id": 47,
        "question": "‘हिंदी में प्रवीणता’ की परिभाषा राजभाषा नियम की किस नियम में शामिल है? (Definition of 'Proficiency in Hindi' is included in which rule of the Official Language Rules?)",
        "options": [
          "**(A) 9**",
          "(B) 10",
          "(C) 11",
          "(D) 12"
        ],
        "correctAnswer": 0,
        "explanation": "‘हिंदी में प्रवीणता’ की परिभाषा राजभाषा नियम के नियम 9 में शामिल है। (The definition of 'Proficiency in Hindi' is included in Rule 9 of the Official Language Rules) [cite_start][cite: 60, 61, 62]"
      },
      {
        "id": 48,
        "question": "केंद्र सरकार के कार्यालयों के कितने प्रतिशत कर्मचारियों द्वारा हिंदी का कार्यसाधक ज्ञान प्राप्त कर लेने पर उन कार्यालयों के नाम राजपत्र में अधिसूचित किए जाते हैं? (Upon what percentage of acquiring Working Knowledge of Hindi by the employees of Central Government offices, that office is required to be notified in the Gazette of Govt. of India.)",
        "options": [
          "(A) 60%",
          "(B) 70%",
          "**(C) 80%**",
          "(D) 100%"
        ],
        "correctAnswer": 2,
        "explanation": "80% कर्मचारियों द्वारा हिंदी का कार्यसाधक ज्ञान प्राप्त कर लेने पर कार्यालयों के नाम राजपत्र में अधिसूचित किए जाते हैं। (When 80% of employees acquire Working Knowledge of Hindi, the office is required to be notified in the Gazette) [cite_start][cite: 62, 63, 64]"
      },
      {
        "id": 49,
        "question": "भारत सरकार के कार्यालयों में प्रत्येक वर्ष हिंदी दिवस कब मनाया जाता है? (When is Hindi Day celebrated every year in the Central Government Offices?)",
        "options": [
          "(A) 12 सितंबर (12 September)",
          "**(B) 14 सितंबर (14 September)**",
          "(C) 12 जनवरी (12 January)",
          "(D) 14 जनवरी (14 January)"
        ],
        "correctAnswer": 1,
        "explanation": "भारत सरकार के कार्यालयों में प्रत्येक वर्ष 14 सितंबर को हिंदी दिवस मनाया जाता है। (Hindi Day is celebrated every year on 14 September in the Central Government Offices) [cite_start][cite: 64, 65, 66]"
      },
      {
        "id": 50,
        "question": "संविधान सभा ने हिंदी को राजभाषा के रूप में कब स्वीकार किया था? (When did the Constituent Assembly accepted Hindi as the official language of the Union?)",
        "options": [
          "(A) 10 जनवरी 1975 (10 January 1975)",
          "(B) 10 सितंबर 1975 (10 September 1975)",
          "**(C) 14 सितंबर, 1949 (14 September, 1949)**",
          "(D) 14 सितंबर 1963 (14 September 1963)"
        ],
        "correctAnswer": 2,
        "explanation": "संविधान सभा ने हिंदी को राजभाषा के रूप में 14 सितंबर, 1949 को स्वीकार किया था। (The Constituent Assembly accepted Hindi as the official language of the Union on 14 September, 1949) [cite_start][cite: 66, 67, 68]"
      },
      {
        "id": 51,
        "question": "भारतीय संविधान की 8वीं अनुसूची में निम्नलिखित में से कौन सी भाषा शामिल नहीं है? (Which of the following languages is not included in the 8th Schedule of the Constitution?)",
        "options": [
          "(A) नेपाली (Nepali)",
          "(B) उर्दू (Urdu)",
          "**(C) अंग्रेजी (English)**",
          "(D) सिंधी (Sindhi)"
        ],
        "correctAnswer": 2,
        "explanation": "अंग्रेजी भाषा भारतीय संविधान की 8वीं अनुसूची में शामिल नहीं है। (English language is not included in the 8th Schedule of the Constitution) [cite_start][cite: 68, 69, 70]"
      },
      {
        "id": 52,
        "question": "संविधान की 8वीं अनुसूची में अब तक कितनी भाषाओं को राजभाषा के रूप में शामिल किया गया है? (How many languages have been included so far as the Official Languages in the 8th schedule of the constitution?)",
        "options": [
          "(A) 15",
          "(B) 18",
          "**(C) 22**",
          "(D) 24"
        ],
        "correctAnswer": 2,
        "explanation": "संविधान की 8वीं अनुसूची में अब तक 22 भाषाओं को शामिल किया गया है। (22 languages have been included so far as the Official Languages in the 8th schedule of the constitution) [cite_start][cite: 70, 71, 72]"
      },
      {
        "id": 53,
        "question": "राजभाषा नियम के अनुसार कोई भी कर्मचारी आवेदन, अपील या अभ्यावेदन किस भाषा में कर सकता है? (According to the Official Language Rules, an employee can submit his application, appeal or representation in ------- language?)",
        "options": [
          "(A) हिंदी में (In Hindi)",
          "(B) अंग्रेजी में (In English)",
          "**(C) हिंदी या अंग्रेजी में (In Hindi - English)**",
          "(D) किसी भी भाषा में (In any language)"
        ],
        "correctAnswer": 2,
        "explanation": "राजभाषा नियम के अनुसार कोई भी कर्मचारी आवेदन, अपील या अभ्यावेदन हिंदी या अंग्रेजी में कर सकता है। (According to the Official Language Rules, an employee can submit his application, appeal or representation in Hindi or English) [cite_start][cite: 72, 73, 74]"
      },
      {
        "id": 54,
        "question": "प्रथम राजभाषा आयोग का गठन किस वर्ष के दौरान किया गया था? (During which year was the first Official Language Commission formed?)",
        "options": [
          "**(A) 1955**",
          "(B) 1960",
          "(C) 1963",
          "(D) 1976"
        ],
        "correctAnswer": 0,
        "explanation": "प्रथम राजभाषा आयोग का गठन 1955 में किया गया था। (The first Official Language Commission was formed in 1955) [cite_start][cite: 74, 75, 76]"
      },
      {
        "id": 55,
        "question": "मैनुअल, संहिताएं, प्रक्रिया संबंधी अन्य साहित्य लेखन सामग्री आदि द्विभाषिक रूप में जारी किए जाने की अनिवार्यता के बारे में राजभाषा नियम के किस नियम संख्या में उल्लेख किया गया है? (In which rule of the Official Language Rules have been mentioned about the imperative of issuing bilingual form manuals, codes, other literature related to process etc.?)",
        "options": [
          "(A) नियम 9 (Rule 9)",
          "(B) नियम 10 (Rule 10)",
          "**(C) नियम 11 (Rule 11)**",
          "(D) नियम 12 (Rule 12)"
        ],
        "correctAnswer": 2,
        "explanation": "मैनुअल, संहिताएं आदि द्विभाषिक रूप में जारी किए जाने की अनिवार्यता का उल्लेख राजभाषा नियम के नियम 11 में किया गया है। (The imperative of issuing bilingual form manuals, codes, etc. is mentioned in Rule 11 of the Official Language Rules) [cite_start][cite: 76, 77, 78]"
      },
      {
        "id": 56,
        "question": "राजभाषा नियम संख्या-12 के अनुसार राजभाषा अधिनियम और नियमों के संबंध में जारी निर्देशों के समुचित अनुपालन को सुनिश्चित करने का उत्तरदायित्व किसे सौंपा गया है? (According to Official Language Rule-12, who is entrusted with the responsibility of ensuring proper compliance of the instructions issued in connection with the Official Language Act and Rules?)",
        "options": [
          "(A) राजभाषा अधिकारी को (Rajbhasha Adhikari)",
          "**(B) कार्यालय के प्रशासनिक प्रधान को (Administrative Head of the office)**",
          "(C) संबंधित डीलर को (Concerned Dealer)",
          "(D) उपर्युक्त तीनों को (Above three)"
        ],
        "correctAnswer": 1,
        "explanation": "राजभाषा नियम संख्या-12 के अनुसार यह उत्तरदायित्व कार्यालय के प्रशासनिक प्रधान को सौंपा गया है। (According to Official Language Rule-12, the Administrative Head of the office is entrusted with this responsibility) [cite_start][cite: 78, 79, 80]"
      },
      {
        "id": 57,
        "question": "1955 में गठित प्रथम राजभाषा आयोग के अध्यक्ष कौन थे? (Who was the Chairman of the First Official Language Commission constituted in 1955?)",
        "options": [
          "(A) श्री गोविंद वल्लभ पंत (Sri Govind Vallabh Pant)",
          "**(B) श्री बी.जी. खेर (Sri B.G. Kher)**",
          "(C) श्री जवाहर लाल नेहरू (Sri Jawahar Lal Nehru)",
          "(D) श्री ओम मेहता (Sri Om Mehtha)"
        ],
        "correctAnswer": 1,
        "explanation": "1955 में गठित प्रथम राजभाषा आयोग के अध्यक्ष श्री बी.जी. खेर थे। (The Chairman of the First Official Language Commission constituted in 1955 was Sri B.G. Kher) [cite_start][cite: 80, 81, 82, 83, 84]"
      },
      {
        "id": 58,
        "question": "हिंदी के प्रयोग के लिए वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ग क्षेत्र स्थित कार्यालयों को कितने प्रतिशत मूल पत्र हिंदी में भेजा जाना अपेक्षित है? (According to the annual programme of the year 2024-25 for the use of Hindi, what percentage of the originating correspondence is required to be done by offices situated in C region?)",
        "options": [
          "(A) 55 प्रतिशत (55 Percent)",
          "**(B) 60 प्रतिशत (60 Percent)**",
          "(C) 75 प्रतिशत (75 Percent)",
          "(D)100 प्रतिशत (100 Percent)"
        ],
        "correctAnswer": 1,
        "explanation": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ग क्षेत्र स्थित कार्यालयों को 60% मूल पत्र हिंदी में भेजा जाना अपेक्षित है। (According to the annual program for 2025-26, offices in C region are required to send 60% of original correspondence in Hindi) [cite_start][cite: 84, 85, 86]"
      },
      {
        "id": 59,
        "question": "केंद्र सरकार के कार्यालयों में गठित राजभाषा कार्यान्वयन समिति की बैठकों के आयोजन की अवधि क्या है ? (What is the period for holding the meetings of the Official Language Implementation Committee constituted in Central Government Offices?)",
        "options": [
          "**(A) 3 महीने में एक बार (Once in 3 months)**",
          "(B) 6 महीने में एक बार (Once in 6 months)",
          "(C) वर्ष में एक बार (Once in a year)",
          "(D) 2 वर्ष में एक बार (Once in 2 years)"
        ],
        "correctAnswer": 0,
        "explanation": "राजभाषा कार्यान्वयन समिति की बैठकों के आयोजन की अवधि 3 महीने में एक बार है। (The period for holding the meetings of the Official Language Implementation Committee is once in 3 months) [cite_start][cite: 86, 87, 88, 89, 90]"
      },
      {
        "id": 60,
        "question": "नगर राजभाषा कार्यान्वयन समिति की बैठकों के आयोजन की अवधि क्या है ? (What is the period of holding of meetings of the Town Official Language Implementation Committee?)",
        "options": [
          "(A) 3 महीने में एक बार (Once in 3 months)",
          "**(B) 6 महीने में एक बार (Once in 6 months)**",
          "(C) वर्ष में एक बार (Once in a year)",
          "(D) 2 वर्ष में एक बार (Once in 2 years)"
        ],
        "correctAnswer": 1, 
        "explanation": "नगर राजभाषा कार्यान्वयन समिति की बैठकों के आयोजन की अवधि 6 महीने में एक बार है। (The period of holding of meetings of the Town Official Language Implementation Committee is once in 6 months) [cite_start][cite: 90, 91, 92, 93, 94]"
      },
      {
        "id": 61,
        "question": "राजभाषा नियम, 1976 में कुल कितने नियम हैं? (How many rules are there in the Official Language Rules 1976?)",
        "options": [
          "(A) 9",
          "(B) 10",
          "**(C) 12**",
          "(D) 14"
        ],
        "correctAnswer": 2, 
        "explanation": "राजभाषा नियम, 1976 में कुल 12 नियम हैं। (There are a total of 12 rules in the Official Language Rules 1976) [cite_start][cite: 94, 95]"
      },
      {
        "id": 62,
        "question": "राजभाषा का वार्षिक कार्यक्रम किस मंत्रालय द्वारा जारी किया जाता है? (The annual program of Official Language is released by which ministry?)",
        "options": [
          "(A) मानव संसाधन मंत्रालय (Human Resource Ministry)",
          "(B) रेल मंत्रालय (Ministry of Railways)",
          "(C) सभी मंत्रालय (All Ministries)",
          "**(D) गृह मंत्रालय (Ministry of Home Affairs)**"
        ],
        "correctAnswer": 3,
        "explanation": "राजभाषा का वार्षिक कार्यक्रम गृह मंत्रालय द्वारा जारी किया जाता है। (The annual program of Official Language is released by the Ministry of Home Affairs) [cite_start][cite: 96, 97]"
      },
      {
        "id": 63,
        "question": "हिंदी शिक्षण योजना के अंतर्गत निर्धारित हिंदी पाठ्यक्रम की परीक्षाएं वर्ष में कितनी बार ली जाती हैं? (How many times in a year the examinations of Hindi courses prescribed under Hindi Teaching Scheme are conducted?)",
        "options": [
          "(A) 1 बार (once)",
          "**(B) 2 बार (twice)**",
          "(C) 3 बार (thrice)",
          "(D) 4 बार (4 times)"
        ],
        "correctAnswer": 1,
        "explanation": "हिंदी पाठ्यक्रम की परीक्षाएं वर्ष में 2 बार ली जाती हैं। (The examinations of Hindi courses are conducted twice a year) [cite_start][cite: 98, 99, 100]"
      },
      {
        "id": 64,
        "question": "सिंधी भाषा को अष्टम अनुसूची में किस वर्ष में शामिल किया गया था? (In which year Sindhi language was added to eighth schedule?)",
        "options": [
          "(A) 1968",
          "(B) 1966",
          "**(C) 1967**",
          "(D) 1969"
        ],
        "correctAnswer": 2,
        "explanation": "सिंधी भाषा को अष्टम अनुसूची में 1967 में शामिल किया गया था। (Sindhi language was added to the eighth schedule in 1967) [cite_start][cite: 100, 101, 102]"
      },
      {
        "id": 65,
        "question": "मंडल स्तर पर राजभाषा कार्यान्वयन समिति के अध्यक्ष कौन होते हैं? (Who is the Chairman of the Official Language Implementation Committee at Divisional level?)",
        "options": [
          "(A) अपर मुख्य राजभाषा अधिकारी (AMRA)",
          "**(B) मंडल रेल प्रबंधक (DRM)**",
          "(C) मुख्य राजभाषा अधिकारी (MRA)",
          "(D) महाप्रबंधक (GM)"
        ],
        "correctAnswer": 1,
        "explanation": "मंडल स्तर पर राजभाषा कार्यान्वयन समिति के अध्यक्ष मंडल रेल प्रबंधक (DRM) होते हैं। (The Chairman of the Official Language Implementation Committee at Divisional level is the Divisional Railway Manager (DRM)[cite_start]) [cite: 102, 103, 104]"
      },
      {
        "id": 66,
        "question": "क्षेत्रीय रेल राजभाषा कार्यान्वयन समिति के अध्यक्ष कौन होते हैं? (Who is the Chairman of Zonal Railways Official Language Implementation Committee?)",
        "options": [
          "(A) मुख्य राजभाषा अधिकारी (MRA)",
          "(B) प्रमुख मुख्य कार्मिक अधिकारी (PCPO)",
          "**(C) महाप्रबंधक (General Manager)**",
          "(D) अध्यक्ष, रेलवे बोर्ड (Chairman, Railway Board)"
        ],
        "correctAnswer": 2,
        "explanation": "क्षेत्रीय रेल राजभाषा कार्यान्वयन समिति के अध्यक्ष महाप्रबंधक होते हैं। (The Chairman of Zonal Railways Official Language Implementation Committee is the General Manager) [cite_start][cite: 104, 105, 106]"
      },
      {
        "id": 67,
        "question": "राजभाषा अधिनियम, 1963 में कुल कितनी धाराएं हैं? (How many Sections are there in the Official Language Act, 1963?)",
        "options": [
          "(A) 9",
          "**(B) 10**",
          "(C) 11",
          "(D) 12"
        ],
        "correctAnswer": 1,
        "explanation": "राजभाषा अधिनियम, 1963 में कुल 10 धाराएं हैं। (There are a total of 10 Sections in the Official Language Act, 1963) [cite_start][cite: 106, 107, 108]"
      },
      {
        "id": 68,
        "question": "किस राजभाषा पुरस्कार योजना में राशि व व्यक्तिगत रूप से पुरस्कार नहीं दिए जाते हैं? (In which Official Language award scheme amount and individual awards are not given?)",
        "options": [
          "**(A) राजभाषा कीर्ति पुरस्कार (Rajbhasha Keerti Puraskar)**",
          "(B) राजभाषा गौरव पुरस्कार (Rajbhasha Gaurav Puraskar)",
          "(C) मैथिलीशरण गुप्त पुरस्कार (Maithili Sharan Gupta Puraskar)",
          "(D) प्रेमचंद पुरस्कार (Premchand Puraskar)"
        ],
        "correctAnswer": 0,
        "explanation": "राजभाषा कीर्ति पुरस्कार योजना में राशि व व्यक्तिगत रूप से पुरस्कार नहीं दिए जाते हैं। (Amount and individual awards are not given in the Rajbhasha Keerti Puraskar scheme) [cite_start][cite: 108, 109, 110]"
      },
      {
        "id": 69,
        "question": "राजभाषा अधिनियम, 1963 की किस धारा के अंतर्गत केंद्र सरकार को राजभाषा संबंधित नियम बनाने की शक्ति दी गई है? (Under which section of the Official Language Act, 1963, the Central Government has been given the power to make rules related to the official language.)",
        "options": [
          "(A) धारा - 6 (Section - 6)",
          "(B) धारा -7 (Section -7)",
          "**(C) धारा - 8 (Section – 8)**",
          "(D) धारा - 9 (Section -9)"
        ],
        "correctAnswer": 2,
        "explanation": "राजभाषा अधिनियम, 1963 की धारा 8 के अंतर्गत केंद्र सरकार को राजभाषा संबंधित नियम बनाने की शक्ति दी गई है। (Under Section 8 of the Official Language Act, 1963, the Central Government has been given the power to make rules related to the official language) [cite_start][cite: 110, 111, 112]"
      },
      {
        "id": 70,
        "question": "तकनीकी रेल विषयों पर हिंदी में मौलिक पुस्तकें लिखने के लिए कौन सी योजना है? (What is the scheme for writing original books in Hindi on technical subjects of Railway?)",
        "options": [
          "**(A) विश्वेश्वरैया तकनीकी मौलिक पुस्तक लेखन पुरस्कार योजना (Visvesvaraya Technological original Book Writing Award Scheme)**",
          "(B) लाल बहादुर शास्त्री तकनीकी मौलिक पुस्तक लेखन पुरस्कार योजना (Lal Bahadur Shastri Technical original Book Writing Award Scheme)",
          "(C) आचार्य महावीर प्रसाद तकनीकी मौलिक पुस्तक लेखन पुरस्कार योजना (Acharya Mahavir Prasad Technical original Book Writing Award Scheme)",
          "(D) शिवसागर मिश्र तकनीकी मौलिक पुस्तक लेखन पुरस्कार योजना (Sivasagar Mishra Technical original Book Writing Award Scheme)"
        ],
        "correctAnswer": 0,
        "explanation": "तकनीकी रेल विषयों पर हिंदी में मौलिक पुस्तकें लिखने के लिए विश्वेश्वरैया तकनीकी मौलिक पुस्तक लेखन पुरस्कार योजना है। (The scheme for writing original books in Hindi on technical subjects of Railway is Visvesvaraya Technological original Book Writing Award Scheme) [cite_start][cite: 112, 113, 114]"
      },
      {
        "id": 71,
        "question": "हिंदी में मौलिक कथा/कहानी संग्रह एवं उपन्यास लेखन को पुरस्कृत करने हेतु योजना का क्या नाम है? (What is the name of the award scheme for writing original fiction/story collection and novel in Hindi?)",
        "options": [
          "(A) मैथिली शरण गुप्त पुरस्कार योजना (Maithili Sharan Gupta Award Scheme)",
          "**(B) मुंशी प्रेमचंद पुरस्कार योजना (Munshi Premchand Award Scheme)**",
          "(C) माखनलाल चतुर्वेदी पुरस्कार योजना (Makhanlal Chaturvedi Award Scheme)",
          "(D) भारतेन्दु हरिश्चंद्र पुरस्कार योजना (Bharatendu Harishchandra Award Scheme)"
        ],
        "correctAnswer": 1,
        "explanation": "हिंदी में मौलिक कथा/कहानी संग्रह एवं उपन्यास लेखन को पुरस्कृत करने हेतु मुंशी प्रेमचंद पुरस्कार योजना है। (The award scheme for writing original fiction/story collection and novel in Hindi is Munshi Premchand Award Scheme) [cite_start][cite: 114, 115, 116]"
      },
      {
        "id": 72,
        "question": "हिंदी में मौलिक काव्य, कविता संग्रह को पुरस्कृत करने हेतु चलाई गई योजना का क्या नाम है? (What is the name of the scheme launched to award Original poetry, poetry collection in Hindi?)",
        "options": [
          "(A) महादेवी वर्मा पुरस्कार योजना (Mahadevi Verma Award Scheme)",
          "(B) रवींद्रनाथ ठाकुर पुरस्कार योजना (Rabindranath Thakur Award Scheme)",
          "**(C) मैथिलीशरण गुप्त पुरस्कार योजना (Maithilisharan Gupta Award Scheme)**",
          "(D) माखनलाल चतुर्वेदी पुरस्कार योजना (Makhanlal Chaturvedi Award Scheme)"
        ],
        "correctAnswer": 2,
        "explanation": "हिंदी में मौलिक काव्य, कविता संग्रह को पुरस्कृत करने हेतु मैथिलीशरण गुप्त पुरस्कार योजना चलाई गई है। (The scheme launched to award Original poetry, poetry collection in Hindi is Maithilisharan Gupta Award Scheme) [cite_start][cite: 116, 117, 118]"
      },
      {
        "id": 73,
        "question": "राजभाषा अधिनियम, 1976 के किस नियम के अंतर्गत कर्मचारी फाइल पर टिप्पणी या कार्यवृत्त हिंदी या अंग्रेजी में लिख सकता है? (Under which rule of the Official Language Act 1976, an employee can write Notings or minutes on the file in Hindi or English?)",
        "options": [
          "(A) नियम 3(1) (Rule 3(1))",
          "(B) नियम 7(1) (Rule 7(1))",
          "**(C) नियम 8 (1) (Rule 8 (1))**",
          "(D) नियम 10 (1) (Rule 10 (1))"
        ],
        "correctAnswer": 2,
        "explanation": "राजभाषा अधिनियम, 1976 के नियम 8(1) के अंतर्गत कर्मचारी फाइल पर टिप्पणी या कार्यवृत्त हिंदी या अंग्रेजी में लिख सकता है। (Under Rule 8(1) [cite_start]of the Official Language Act 1976, an employee can write Notings or minutes on the file in Hindi or English) [cite: 118, 119, 120]"
      },
      {
        "id": 74,
        "question": "रेलवे बोर्ड राजभाषा कार्यान्वयन समिति के अध्यक्ष कौन होते हैं? (Who is the Chairman of the Railway Board Official Language Implementation Committee?)",
        "options": [
          "**(A) अध्यक्ष, रेलवे बोर्ड व मुख्य कार्यकारी अधिकारी (CRB & CEO)**",
          "(B) निदेशक (राजभाषा) (Director (OL))",
          "(C) सदस्य (एमओबीडी) (Member (MOBD))",
          "(D) रेल मंत्री (Railway Minister)"
        ],
        "correctAnswer": 0,
        "explanation": "रेलवे बोर्ड राजभाषा कार्यान्वयन समिति के अध्यक्ष, रेलवे बोर्ड व मुख्य कार्यकारी अधिकारी (CRB & CEO) होते हैं। (The Chairman of the Railway Board Official Language Implementation Committee is the CRB & CEO) [cite_start][cite: 120, 121, 122, 123]"
      },
      {
        "id": 75,
        "question": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ग क्षेत्र में स्थित केंद्र सरकारी कार्यालयों के कितने प्रतिशत अनुभागों को हिंदी में शत-प्रतिशत कार्य के लिए नामित किया जाना है? (As per annual program for the year 2025-26, how many sections of Central Govt. offices in region C should be nominated for Cent Percent Work in Hindi?)",
        "options": [
          "(A) 20",
          "**(B) 25**",
          "(C) 30",
          "(D) 35"
        ],
        "correctAnswer": 1,
        "explanation": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ग क्षेत्र में स्थित केंद्र सरकारी कार्यालयों के 25% अनुभागों को हिंदी में शत-प्रतिशत कार्य के लिए नामित किया जाना है। (As per annual program for 2025-26, 25% sections of Central Govt. offices in region C should be nominated for Cent Percent Work in Hindi) [cite_start][cite: 123, 124, 125, 126]"
      },
      {
        "id": 76,
        "question": "राजभाषा अधिनयम की धारा 3(3) के अनुपालन का दायित्व किसको सौंपा गया है? (Who is entrusted with the responsibility of complying with Section 3(3) of the Official Language Act?)",
        "options": [
          "(A) कार्यालय के प्रशासनिक प्रधान को (Administrative Head of the office)",
          "(B) राजभाषा अधिकारी को (Rajbhasha Adhikari)",
          "**(C) ऐसे दस्तावेजों पर हस्ताक्षर करनेवाले अधिकारी को (Officer signing such documents)**",
          "(D) संबंधित लिपिक को (Concerned Clerk)"
        ],
        "correctAnswer": 2,
        "explanation": "राजभाषा अधिनयम की धारा 3(3) के अनुपालन का दायित्व ऐसे दस्तावेजों पर हस्ताक्षर करनेवाले अधिकारी को सौंपा गया है। (The responsibility of complying with Section 3(3) [cite_start]of the Official Language Act is entrusted to the officer signing such documents) [cite: 126, 127, 128]"
      },
      {
        "id": 77,
        "question": "राजभाषा नियम, 1976 के नियम 5 के अनुसार हिंदी में प्राप्त पत्रों के उत्तर किस भाषा में देना अपेक्षित है? (Under rule No. 5 of the Official Language Rules 1976, in which language is it required to reply to the letters received in Hindi?)",
        "options": [
          "**(A) हिंदी (Hindi)**",
          "(B) अंग्रेजी (English)",
          "(C) हिंदी या अंग्रेजी (Hindi or English)",
          "(D) हिंदी-अंग्रेजी द्विभाषी (Hindi-English bilingual)"
        ],
        "correctAnswer": 0,
        "explanation": "राजभाषा नियम, 1976 के नियम 5 के अनुसार हिंदी में प्राप्त पत्रों के उत्तर हिंदी में देना अपेक्षित है। (Under Rule No. 5 of the Official Language Rules 1976, it is required to reply to the letters received in Hindi in Hindi) [cite_start][cite: 128, 129, 130]"
      },
      {
        "id": 78,
        "question": "किस राजभाषा पुरस्कार योजना के अंतर्गत पुरस्कार स्वरूप सबसे अधिक धनराशि प्रदान की जाती है? (Under which Rajbhasha award scheme maximum amount is given as prize?)",
        "options": [
          "(A) राजभाषा कीर्ति पुरस्कार (Rajbhasha Keerthi Award)",
          "**(B) राजभाषा गौरव पुरस्कार (Rajbhasha Gaurav Puraskar)**",
          "(C) रेलवे बोर्ड पुरस्कार (Railway Board Award)",
          "(D) गृह मंत्रालय पुरस्कार (Home Ministry Award)"
        ],
        "correctAnswer": 1,
        "explanation": "राजभाषा गौरव पुरस्कार योजना के अंतर्गत पुरस्कार स्वरूप सबसे अधिक धनराशि प्रदान की जाती है। (Maximum amount is given as prize under the Rajbhasha Gaurav Puraskar scheme) [cite_start][cite: 130, 131, 132]"
      },
      {
        "id": 79,
        "question": "भारत की भाषाओं के माध्यम से हिंदी सीखने के लिए उपलब्ध सॉफ्टवेयर का क्या नाम है? (What is the name of the software available to learn Hindi through the languages of India?)",
        "options": [
          "(A) प्रवाचक (Pravachak)",
          "(B) श्रुतलेखन (Shruthlekhan)",
          "(C) मंत्रा (Mantra)",
          "**(D) लीला (LILA)**"
        ],
        "correctAnswer": 3,
        "explanation": "भारत की भाषाओं के माध्यम से हिंदी सीखने के लिए उपलब्ध सॉफ्टवेयर का नाम लीला (LILA) है। (The name of the software available to learn Hindi through the languages of India is LILA) [cite_start][cite: 132, 133, 134]"
      },
      {
        "id": 80,
        "question": "हिंदी स्पीच को हिंदी टेक्स्ट में बदलने से संबंधित सॉफ्टवेयर का क्या नाम है? (What is the name of the software related with converting Hindi speech into Hindi text?)",
        "options": [
          "**(A) श्रुतलेखन - राजभाषा (Shruthlekhan - Rajbhasha)**",
          "(B) लीला (LILA)",
          "(C) प्रवाचक (Pravachak)",
          "(D) मंत्र (Mantra)"
        ],
        "correctAnswer": 0,
        "explanation": "हिंदी स्पीच को हिंदी टेक्स्ट में बदलने से संबंधित सॉफ्टवेयर का नाम श्रुतलेखन - राजभाषा है। (The name of the software related with converting Hindi speech into Hindi text is Shruthlekhan - Rajbhasha) [cite_start][cite: 134, 135, 136]"
      },
      {
        "id": 81,
        "question": "हिंदी टेक्स्ट को हिंदी स्पीच में बदलने से संबंधित सॉफ्टवेयर का क्या नाम है? (What is the name of the software related with converting Hindi text to Hindi speech ?)",
        "options": [
          "(A) रेल राजभाषा (Rail Rajbhasha)",
          "**(B) प्रवाचक - राजभाषा (Pravachak - Rajbhasha)**",
          "(C) लीला (Leela)",
          "(D) श्रुतलेखन (Shruthlekhan)"
        ],
        "correctAnswer": 1,
        "explanation": "हिंदी टेक्स्ट को हिंदी स्पीच में बदलने से संबंधित सॉफ्टवेयर का नाम प्रवाचक - राजभाषा है। (The name of the software related with converting Hindi text to Hindi speech is Pravachak - Rajbhasha) [cite_start][cite: 136, 137, 138]"
      },
      {
        "id": 82,
        "question": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार केंद्र सरकारी कार्यालयों में हिंदी में प्रशिक्षित कर्मचारियों का प्रतिशत ----- होना चाहिए. (According to the annual program for the year 2025-26, percentage of trained employees in central government offices should be -------.)",
        "options": [
          "(A) 55%",
          "(B) 70%",
          "**(C) 60%**",
          "(D) 100%"
        ],
        "correctAnswer": 2,
        "explanation": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार केंद्र सरकारी कार्यालयों में हिंदी में प्रशिक्षित कर्मचारियों का प्रतिशत 60% होना चाहिए। (According to the annual program for 2025-26, the percentage of trained employees in central government offices should be 60%) [cite_start][cite: 138, 139, 140]"
      },
      {
        "id": 83,
        "question": "हिंदी के प्रयोग के लिए वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र से ‘ख’ क्षेत्र के लिए हिंदी में कितना प्रतिशत मूल पत्राचार निर्धारित है? (According to the annual program for the usage of Hindi in the year 2025-26, what percentage of the original correspondence in Hindi is to be done from the 'C' region to the central government offices of 'B' region?)",
        "options": [
          "**(A) 100%**",
          "(B) 70%",
          "(C) 60%",
          "(D) 55%"
        ],
        "correctAnswer": 0,
        "explanation": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र से ‘ख’ क्षेत्र के लिए हिंदी में 100% मूल पत्राचार निर्धारित है। (According to the annual program for 2025-26, 100% of original correspondence in Hindi is to be done from 'C' region to 'B' region) [cite_start][cite: 140, 141, 142]"
      },
      {
        "id": 84,
        "question": "हिंदी के प्रयोग के लिए वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र से ‘ग’ क्षेत्र के लिए हिंदी में कितना प्रतिशत मूल पत्राचार निर्धारित है? (According to the annual program for the usage of Hindi in the year 2025-26, what percentage of the original correspondence in Hindi is to be done from the 'C' region to the central government offices of 'C' region?)",
        "options": [
          "**(A) 100%**",
          "(B) 70%",
          "(C) 60%",
          "(D) 55%"
        ],
        "correctAnswer": 0,
        "explanation": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र से ‘ग’ क्षेत्र के लिए हिंदी में 100% मूल पत्राचार निर्धारित है। (According to the annual program for 2025-26, 100% of original correspondence in Hindi is to be done from 'C' region to 'C' region) [cite_start][cite: 142, 143, 144]"
      },
      {
        "id": 85,
        "question": "हिंदी के प्रयोग के लिए वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र से ‘क’ क्षेत्र और ‘ख’ क्षेत्र के राज्य/ संघ राज्य क्षेत्र के कार्यालय/ व्यक्ति के लिए हिंदी में कितना प्रतिशत मूल पत्राचार निर्धारित है? (According to the annual program for the year 2025-26 for the usage of Hindi, what percentage of original correspondence in Hindi is required to be done from 'C' region with the persons/offices of State / Union Territory of 'A' region and 'B' region?)",
        "options": [
          "**(A) 100%**",
          "(B) 85%",
          "(C) 60%",
          "(D) 55%"
        ],
        "correctAnswer": 0,
        "explanation": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र से ‘क’ क्षेत्र और ‘ख’ क्षेत्र के लिए हिंदी में 100% मूल पत्राचार निर्धारित है। (According to the annual program for 2025-26, 100% of original correspondence in Hindi is required to be done from 'C' region to 'A' and 'B' regions) [cite_start][cite: 144, 145, 146, 147]"
      },
      {
        "id": 86,
        "question": "हिंदी के प्रयोग के लिए वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार हिंदी में प्राप्त कितने प्रतिशत पत्रों के उत्तर हिंदी में दिए जाने का लक्ष्य निर्धारित है? (According to the annual program for the year 2025-26 for the usage of Hindi, as per the target set what percentage of letters received in Hindi should be replied in Hindi ?)",
        "options": [
          "(A) 40%",
          "(B) 60%",
          "(C) 80%",
          "**(D) 100%**"
        ],
        "correctAnswer": 3,
        "explanation": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार हिंदी में प्राप्त 100% पत्रों के उत्तर हिंदी में दिए जाने का लक्ष्य निर्धारित है। (According to the annual program for 2025-26, the target is set for 100% of letters received in Hindi to be replied in Hindi) [cite_start][cite: 147, 148, 149]"
      },
      {
        "id": 87, 
        "question": "हिंदी के प्रयोग के लिए वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र में हिंदी में टिप्पण लिखने का कितना प्रतिशत लक्ष्य निर्धारित है? (For the use of Hindi, according to the annual program for the year 2024-25, as per the target set what percentage of Hindi noting is required to be done in the 'C' region. ?)",
        "options": [
          "**(A) 35%**",
          "(B) 50%",
          "(C) 75%",
          "(D) 100%"
        ],
        "correctAnswer": 0,
        "explanation": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र में हिंदी में टिप्पण लिखने का 35% लक्ष्य निर्धारित है। (According to the annual program for 2025-26, the target set for Hindi noting in the 'C' region is 35%) [cite_start][cite: 149, 150, 151]"
      },
      {
        "id": 88,
        "question": "हिंदी के प्रयोग के लिए वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र में हिंदी में डिक्टेशन का कितना प्रतिशत लक्ष्य निर्धारित है? (For the use of Hindi, according to the annual program for the year 2025-26, as per the target set what percentage of Hindi Dictations are required to be given in the 'C' region?)",
        "options": [
          "(A) 25%",
          "**(B) 35%**",
          "(C) 75%",
          "(D) 100%"
        ],
        "correctAnswer": 1,
        "explanation": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र में हिंदी में डिक्टेशन का 35% लक्ष्य निर्धारित है। (According to the annual program for 2025-26, the target set for Hindi Dictations in the 'C' region is 35%) [cite_start][cite: 151, 152, 153]"
      },
      {
        "id": 89,
        "question": "हिंदी के प्रयोग के लिए वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र में कंप्यूटर सहित सभी प्रकार के इलेक्ट्रानिक उपकरणों की द्विभाषिक रूप में खरीद का कितना प्रतिशत लक्ष्य निर्धारित है? (According to the annual program for the year 2025-26 for the use of Hindi, what percentage of the target is set for the purchase of all types of electronic devices including computers in bilingual form in the 'C' region?)",
        "options": [
          "(A) 75%",
          "(B) 80%",
          "**(C) 90%**",
          "(D) 100%"
        ],
        "correctAnswer": 2,
        "explanation": "वर्ष 2025-26 के वार्षिक कार्यक्रम के अनुसार ‘ग’ क्षेत्र में कंप्यूटर सहित सभी प्रकार के इलेक्ट्रानिक उपकरणों की द्विभाषिक रूप में खरीद का 90% लक्ष्य निर्धारित है। (According to the annual program for 2025-26, the target set for the purchase of all types of electronic devices including computers in bilingual form in the 'C' region is 90%) [cite_start][cite: 153, 154, 155, 156]"
      },
      {
        "id": 90,
        "question": "भारत संघ के शासकीय प्रयोजन के लिए प्रयुक्‍त होने वाले अंकों का रूप क्या होना चाहिए? (Which forms of the numerals should be used in official purposes of the Union of India?)",
        "options": [
          "**(A) भारतीय अंकों का अंतर्राष्‍ट्रीय रूप (International form of Indian Numerals)**",
          "(B) देवनागरी अंक (Devanagari numerals)",
          "(C) रोमन अंक (Roman numerals)",
          "(D) उपर्युक्‍त में से कोई भी नहीं (None of the above)"
        ],
        "correctAnswer": 0,
        "explanation": "भारत संघ के शासकीय प्रयोजन के लिए भारतीय अंकों का अंतर्राष्‍ट्रीय रूप प्रयुक्‍त होना चाहिए। (The International form of Indian Numerals should be used in official purposes of the Union of India) [cite_start][cite: 156, 157, 158]"
      },
      {
        "id": 91,
        "question": "केंद्र सरकार के जिन कार्यालयों के ______ प्रतिशत कर्मचारियों ने हिंदी का कार्यसाधक ज्ञान प्राप्त कर लिया है, उन कार्यालयों के नाम भारत के राजपत्र में अधिसूचित किए जाते हैं? (The names of the Central Government offices of which ______ percent employees have acquired working knowledge of Hindi are notified in the Gazette?)",
        "options": [
          "(A) 60%",
          "(B) 70%",
          "**(C) 80%**",
          "(D) 100%"
        ],
        "correctAnswer": 2,
        "explanation": "जिन कार्यालयों के 80% कर्मचारियों ने हिंदी का कार्यसाधक ज्ञान प्राप्त कर लिया है, उनके नाम राजपत्र में अधिसूचित किए जाते हैं। (The names of the Central Government offices of which 80% employees have acquired working knowledge of Hindi are notified in the Gazette) [cite_start][cite: 158, 159, 160, 161]"
      },
      {
        "id": 92,
        "question": "केंद्र सरकार के जिन कार्यालयों के 80 प्रतिशत कर्मचारियों ने हिंदी का कार्यसाधक ज्ञान प्राप्त कर लिया है, उन कार्यालयों के नाम किस राजभाषा नियम के अंतर्गत भारत के राजपत्र में अधिसूचित किए जाते हैं? (Under which Official Language rule the names of the Central Government offices of which 80% of employees have acquired working knowledge of Hindi are notified in the Gazette ?)",
        "options": [
          "**(A) नियम 10(4) (Rule 10(4))**",
          "(B) नियम 10(3) (Rule 10(3))",
          "(C) नियम 10 (Rule 10)",
          "(D) नियम 10(2) (Rule 10(2))"
        ],
        "correctAnswer": 0,
        "explanation": "80% कर्मचारियों द्वारा हिंदी का कार्यसाधक ज्ञान प्राप्त कर लेने पर कार्यालयों के नाम राजपत्र में नियम 10(4) के अंतर्गत अधिसूचित किए जाते हैं। (The names of the Central Government offices of which 80% of employees have acquired working knowledge of Hindi are notified in the Gazette under Rule 10(4)[cite_start]) [cite: 161, 162, 163]"
      },
      {
        "id": 93,
        "question": "रेलवे बोर्ड व्यक्तिगत नकद पुरस्कार योजना के अंतर्गत दी जानेवाली पुरस्कार की राशि कितनी है ? (What is the amount of award given under Railway Board Individual Cash Award Scheme?)",
        "options": [
          "**(A) 2000 रु. (Rs. 2000)**",
          "(B) 3000 रु. (Rs. 3000)",
          "(C) 1000 रु. (Rs. 1000)",
          "(D) 1200 रु. (Rs. 1200)"
        ],
        "correctAnswer": 0,
        "explanation": "रेलवे बोर्ड व्यक्तिगत नकद पुरस्कार योजना के अंतर्गत दी जानेवाली पुरस्कार की राशि 2000 रु. है। (The amount of award given under Railway Board Individual Cash Award Scheme is Rs. 2000) [cite_start][cite: 163, 164, 165, 166, 167, 168, 169]"
      },
      {
        "id": 94,
        "question": "गृह मंत्रालय, राजभाषा विभाग द्वारा जारी वार्षिक कार्यक्रम के अनुसार कितने प्रतिशत अनुभागों को हिंदी में शत-प्रतिशत कार्य करने के लिए नामित किया जाना आवश्यक है? (According to the annual program issued by the Rajbhasha Department, Ministry of Home Affairs, what percentage of sections are required to be nominated for doing cent percent work in Hindi?)",
        "options": [
          "(A) 20",
          "**(B) 30**",
          "(C) 55",
          "(D) 100"
        ],
        "correctAnswer": 1,
        "explanation": "वार्षिक कार्यक्रम के अनुसार 30% अनुभागों को हिंदी में शत-प्रतिशत कार्य करने के लिए नामित किया जाना आवश्यक है। (According to the annual program, 30% of sections are required to be nominated for doing cent percent work in Hindi) [cite_start][cite: 169, 170, 171]"
      },
      {
        "id": 95,
        "question": "विभागीय हिंदी भाषा प्रशिक्षण प्राज्ञ को किस कक्षा के ज्ञान के समकक्ष माना जाता है? (Departmental Hindi Basha training PRAGYA is considered equivalent to which level of education?)",
        "options": [
          "(A) दसवीं (Tenth)",
          "(B) बारहवीं (Twelfth)",
          "(C) आठवीं (Eighth)",
          "**(D) डिग्री (Degree)**"
        ],
        "correctAnswer": 3,
        "explanation": "विभागीय हिंदी भाषा प्रशिक्षण प्राज्ञ को डिग्री कक्षा के ज्ञान के समकक्ष माना जाता है। (Departmental Hindi Basha training PRAGYA is considered equivalent to the Degree level of education) [cite_start][cite: 171, 172, 173]"
      },
      {
        "id": 96,
        "question": "राजभाषा नियम, 1976 के किस नियम के अंतर्गत कार्यालय के प्रशासनिक प्रधान को राजभाषा अधिनियम और राजभाषा नियम के अनुपालन का उत्तरदायित्व सौंपा गया है ? (Under which rule of the Official Language Rules, 1976, the administrative head of the office is entrusted with the responsibility of complying with the Official Language Act and the Official Language Rules?)",
        "options": [
          "**(A) नियम 12 (Rule 12)**",
          "(B) नियम 11 (Rule 11)",
          "(C) नियम 10 (Rule 10)",
          "(D) नियम 3 (Rule 3)"
        ],
        "correctAnswer": 0,
        "explanation": "राजभाषा नियम, 1976 के नियम 12 के अंतर्गत यह उत्तरदायित्व कार्यालय के प्रशासनिक प्रधान को सौंपा गया है। (Under Rule 12 of the Official Language Rules, 1976, the administrative head of the office is entrusted with this responsibility) [cite_start][cite: 173, 174, 175]"
      },
      {
        "id": 97,
        "question": "राजभाषा नियम, 1976 के किस उपनियम के अनुसार कोई भी कर्मचारी आवेदन, अपील या अभ्यावेदन हिंदी या अंग्रेजी भाषा में कर सकता है? (According to which sub rule of Official Language Rules 1976, an employee can submit his application, appeal or representation in Hindi or English?)",
        "options": [
          "**(A) नियम 7(1) (Rule 7(1))**",
          "(B) नियम 7(3) (Rule 7(3))",
          "(C) नियम 8(1) (Rule 8(1))",
          "(D) नियम 8(4) (Rule 8(4))"
        ],
        "correctAnswer": 0,
        "explanation": "राजभाषा नियम, 1976 के नियम 7(1) के अनुसार कोई भी कर्मचारी आवेदन, अपील या अभ्यावेदन हिंदी या अंग्रेजी भाषा में कर सकता है। (According to Rule 7(1) [cite_start]of Official Language Rules 1976, an employee can submit his application, appeal or representation in Hindi or English) [cite: 175, 176, 177]"
      },
      {
        "id": 98,
        "question": "राजभाषा नियम, 1976 के किस उप नियम के अनुसार कोई भी कर्मचारी मांग कर सकता है कि उस पर तामील किया जानेवाला आदेश या सूचना हिंदी या अंग्रेजी में दी जाए? (According to which sub-rule of the Official Language Rules 1976, where an employee can demand any orders or notices served to him Hindi or in English.)",
        "options": [
          "(A) नियम 7 (1) (Rule 7(1))",
          "**(B) नियम 7(3) (Rule 7(3))**",
          "(C) नियम 8 (1) (Rule 8(1))",
          "(D) नियम 8(4) (Rule 8 (4))"
        ],
        "correctAnswer": 1,
        "explanation": "राजभाषा नियम, 1976 के नियम 7(3) के अनुसार कोई भी कर्मचारी मांग कर सकता है कि उस पर तामील किया जानेवाला आदेश या सूचना हिंदी या अंग्रेजी में दी जाए। (According to Rule 7(3) [cite_start]of the Official Language Rules 1976, an employee can demand any orders or notices served to him Hindi or in English) [cite: 177, 178, 179]"
      },
      {
        "id": 99,
        "question": "राजभाषा अधिनियम, 1976 के किस नियम के अंतर्गत केंद्रीय सरकार के किसी कार्यालय में प्रयोग किए जानेवाले सभी नाम पट्ट, सूचना पट्ट, पत्र शीर्ष, लिफाफों पर उत्कीर्ण लेख, लेखन सामग्री की अन्य मदें हिंदी और अंग्रेजी में होने चाहिए? (Under which rule of the Official Language Act, 1976, all name plates, sign boards, letter heads, inscriptions on envelopes, other items of stationery used in any central government office should be in Hindi and English?)",
        "options": [
          "(A) नियम 11(1) (Rule 11(1))",
          "**(B) नियम 11(3) (Rule 11 (3))**",
          "(C) नियम 11(2) (Rule 11(2))",
          "(D) इनमें से कोई नहीं (None of the above)"
        ],
        "correctAnswer": 1,
        "explanation": "राजभाषा नियम, 1976 के नियम 11(3) के अंतर्गत नाम पट्ट आदि हिंदी और अंग्रेजी में होने चाहिए। (Under Rule 11(3) [cite_start]of the Official Language Act, 1976, all name plates etc. should be in Hindi and English) [cite: 179, 180, 181]"
      },
      {
        "id": 100,
        "question": "राजभाषा हिंदी में उत्कृष्ट कार्य करने के लिए महाप्रबंधकों और उनसे ऊपर के स्तर के अधिकारियों को कौन-सा पुरस्कार प्रदान किया जाता है? (Which award is given to the General Managers and above level officers for doing excellent work in the Official Language Hindi?)",
        "options": [
          "**(A) कमलापति त्रिपाठी राजभाषा स्वर्ण पदक (Kamlapati Tripathi Rajbhasha Gold Medal)**",
          "(B) रेल मंत्री राजभाषा रजत पदक (Rail Manthri Rajbhasha Silver Medal)",
          "(C) राजभाषा गौरव पुरस्कार (Rajbhasha Gaurav Purskar)",
          "(D) रेल मंत्री राजभाषा स्वर्ण पदक (Rail Manthri Rjbhasha Gold Medal)"
        ],
        "correctAnswer": 0,
        "explanation": "महाप्रबंधकों और उनसे ऊपर के स्तर के अधिकारियों को कमलापति त्रिपाठी राजभाषा स्वर्ण पदक प्रदान किया जाता है। (Kamlapati Tripathi Rajbhasha Gold Medal is given to the General Managers and above level officers) [cite_start][cite: 181, 182, 183]"
      },
      {
        "id": 101,
        "question": "राजभाषा हिंदी में उत्कृष्ट कार्य करने के लिए वरिष्ठ प्रशासनिक ग्रेड और उनसे ऊपर के अधिकारियों को निम्न में से कौन-सा सम्मान दिया जाता है? (Which of the following honors are given to the SAG and above officers for doing excellent work in the Official Language Hindi ?)",
        "options": [
          "(A) कमलापति त्रिपाठी राजभाषा स्वर्ण पदक (Kamlapati Tripathi Rajbhasha Gold Medal)",
          "**(B) रेल मंत्री राजभाषा रजत पदक (Rail Manthri Rjbhasha Silver Medal)**",
          "(C) राजभाषा गौरव पुरस्कार (Rajbhasha Gaurav Purskar)",
          "(D) रेल मंत्री राजभाषा स्वर्ण पदक (Rail Manthri Rajbhasha Gold Medal)"
        ],
        "correctAnswer": 1,
        "explanation": "वरिष्ठ प्रशासनिक ग्रेड और उनसे ऊपर के अधिकारियों को रेल मंत्री राजभाषा रजत पदक सम्मान दिया जाता है। (Rail Manthri Rajbhasha Silver Medal is given to the SAG and above officers) [cite_start][cite: 183, 184, 185]"
      },
      {
        "id": 102, 
        "question": "ग क्षेत्र का कोई कर्मचारी को अपने दैनंदिन सरकारी कामकाज में वर्ष के दौरान हिंदी में 10,000 शब्द लिखने पर किस पुरस्कार योजना के अंतर्गत पुरस्कृत किया जाता है. (When an employee writes 10,000 words in Hindi in C region during the year in his daily official work, Under which award scheme he will be awarded.)",
        "options": [
          "(A) गृह मंत्रालय पुरस्कार योजना (Home Ministry Award Scheme)",
          "(B) रेल मंत्री पुरस्कार योजना (Rail Mantri Award Scheme)",
          "(C) महाप्रबंधक पुरस्कार योजना (General Manager Award Scheme)",
          "**(D) प्रोत्साहन पुरस्कार योजना (Incentive award scheme)**"
        ],
        "correctAnswer": 3,
        "explanation": "ग क्षेत्र के कर्मचारी को हिंदी में 10,000 शब्द लिखने पर प्रोत्साहन पुरस्कार योजना के अंतर्गत पुरस्कृत किया जाता है। (An employee in C region writing 10,000 words in Hindi is awarded under the Incentive award scheme) [cite_start][cite: 185, 186, 187]"
      },
      {
        "id": 103,
        "question": "क्षेत्रीय रेल स्तर पर राजभाषा समिति का अध्यक्ष कौन होता है? (Who is the Chairman of Official Language Committee at Zonal Level?)",
        "options": [
          "**(A) महाप्रबंधक (General Manager)**",
          "(B) मुख्य राजभाषा अधिकारी (Mukhya Rajbhasha Adhikari)",
          "(C) मंडल रेल प्रबंधक (Divisional Railway Manager)",
          "(D) राजभाषा अधिकारी (Rajbhasha Adhikari)"
        ],
        "correctAnswer": 0,
        "explanation": "क्षेत्रीय रेल स्तर पर राजभाषा समिति का अध्यक्ष महाप्रबंधक होता है। (The Chairman of Official Language Committee at Zonal Level is the General Manager) [cite_start][cite: 187, 188, 189]"
      },
      {
        "id": 104,
        "question": "गृह मंत्रालय, राजभाषा विभाग द्वारा जारी वार्षिक कार्यक्रम के अनुसार प्रशिक्षण संस्थानों की कितनी प्रतिशत पाठ्य सामग्री द्विभाषिक रूप में होना अनिवार्य है. (According to the annual programme issued by the Ministry of Home Affairs, Department of Official Language, what percentage of the training material of training institutes should be in bilingual form)",
        "options": [
          "(A) 20",
          "(B) 30",
          "(C) 55",
          "**(D) 100**"
        ],
        "correctAnswer": 3,
        "explanation": "प्रशिक्षण संस्थानों की 100% पाठ्य सामग्री द्विभाषिक रूप में होना अनिवार्य है। (100% of the training material of training institutes should be in bilingual form) [cite_start][cite: 189, 190, 191]"
      },
      {
        "id": 105,
        "question": "गृह मंत्रालय, राजभाषा विभाग द्वारा जारी वार्षिक कार्यक्रम के अनुसार सरकारी कार्यालयों में प्रयुक्त कोड, मैनुअल, प्रक्रिया, साहित्य का अनुवाद आदि का कितना प्रतिशत द्विभाषिक होना चाहिए. (According to the annual programme issued by the Ministry of Home Affairs, Department of Official Language, what percentage of the code, manual, procedure, translation of literature, etc. used in government offices should be bilingual.)",
        "options": [
          "(A) 20",
          "(B) 50",
          "(C) 55",
          "**(D) 100**"
        ],
        "correctAnswer": 3,
        "explanation": "सरकारी कार्यालयों में प्रयुक्त कोड, मैनुअल, प्रक्रिया, साहित्य का अनुवाद आदि का 100% द्विभाषिक होना चाहिए। (100% of the code, manual, procedure, translation of literature, etc. used in government offices should be bilingual) [cite_start][cite: 191, 192, 193]"
      },
      {
        "id": 106,
        "question": "गृह मंत्रालय, राजभाषा विभाग द्वारा जारी वार्षिक कार्यक्रम के अनुसार प्रशिक्षण संस्थानों की कितनी प्रतिशत पाठ्य सामग्री का द्विभाषिक रूप में होना अनिवार्य है. (According to the annual programme issued by the Ministry of Home Affairs, Department of Official Language, what percentage of the training material of training institutes should be in bilingual form)",
        "options": [
          "(A) 20",
          "(B) 30",
          "(C) 55",
          "**(D) 100**"
        ],
        "correctAnswer": 3,
        "explanation": "प्रशिक्षण संस्थानों की 100% पाठ्य सामग्री का द्विभाषिक रूप में होना अनिवार्य है। (100% of the training material of training institutes should be in bilingual form) [cite_start][cite: 193, 194, 195]"
      },
      {
        "id": 107,
        "question": "गृह मंत्रालय, राजभाषा विभाग द्वारा जारी वार्षिक कार्यक्रम के अनुसार राजभाषा विभाग के अधिकारियों द्वारा अपने अधीनस्थ कार्यालयों का न्यूनतम कितने प्रतिशत कार्यालयों का निरीक्षण किया जाना अनिवार्य है. (According to the annual programme issued by the Department of Official Language, Ministry of Home Affairs, it is mandatory for officers of the Official Language Department to inspect the minimum percentage of their subordinate offices.)",
        "options": [
          "**(A) 20**",
          "(B) 25",
          "(C) 55",
          "(D) 100"
        ],
        "correctAnswer": 0,
        "explanation": "राजभाषा विभाग के अधिकारियों द्वारा अपने अधीनस्थ कार्यालयों का न्यूनतम 20% कार्यालयों का निरीक्षण किया जाना अनिवार्य है। (It is mandatory for officers of the Official Language Department to inspect a minimum of 20% of their subordinate offices) [cite_start][cite: 195, 196, 197]"
      },
      {
        "id": 108,
        "question": "गृह मंत्रालय, राजभाषा विभाग द्वारा जारी वार्षिक कार्यक्रम के अनुसार पुस्तकालयों के अनुदान में से कितनी प्रतिशत राशि हिंदी पुस्तकों, हिंदी ई-पुस्तकों पर व्यय की जानी अपेक्षित है. (According to the annual programme issued by the Ministry of Home Affairs, Department of Official Language, what percentage of the grant of libraries is required to be spent on Hindi books, Hindi e-books)",
        "options": [
          "(A) 20",
          "**(B) 50**",
          "(C) 55",
          "(D) 100"
        ],
        "correctAnswer": 1,
        "explanation": "पुस्तकालयों के अनुदान में से 50% राशि हिंदी पुस्तकों, हिंदी ई-पुस्तकों पर व्यय की जानी अपेक्षित है। (50% of the grant of libraries is required to be spent on Hindi books, Hindi e-books) [cite_start][cite: 197, 198, 199, 200]"
      },
      {
        "id": 109,
        "question": "हिंदी टाइपिंग परीक्षा पास करने पर कितने महीने के लिए एक वेतनवृद्धि के बराबर व्यक्तिगत वेतन दिया जाता है? (On passing Hindi typing examination, for how many months personal pay equal in amount to one increment is given?)",
        "options": [
          "(A) 36",
          "(B) 24",
          "(C) 6",
          "**(D) 12**"
        ],
        "correctAnswer": 3,
        "explanation": "हिंदी टाइपिंग परीक्षा पास करने पर 12 महीने के लिए एक वेतनवृद्धि के बराबर व्यक्तिगत वेतन दिया जाता है। (On passing Hindi typing examination, personal pay equal to one increment is given for 12 months) [cite_start][cite: 200, 201, 202]"
      },
      {
        "id": 110,
        "question": "हिंदी आशुलिपि परीक्षा पास करने पर कितने महीने के लिए एक वेतनवृद्धि के बराबर व्यक्तिगत वेतन दिया जाता है? (On passing Hindi Stenography examination, for how many months personal pay equal in amount to one increment is given?)",
        "options": [
          "(A) 6",
          "**(B) 36**",
          "(C) 12",
          "(D) 24"
        ],
        "correctAnswer": 1,
        "explanation": "हिंदी आशुलिपि परीक्षा पास करने पर 36 महीने के लिए एक वेतनवृद्धि के बराबर व्यक्तिगत वेतन दिया जाता है। (On passing Hindi Stenography examination, personal pay equal to one increment is given for 36 months) [cite_start][cite: 202, 203, 204]"
      },
      {
        "id": 111,
        "question": "अगर भारत का कोई राज्‍य संविधान में प्रदत्‍त शक्तियों का प्रयोग करते हुए अपने क्षेत्र में बोली जानेवाली भाषाओं में से अपनी राजभाषा का चयन नहीं करता है, तो उस राज्य की राजभाषा क्या होगी? (If a state does not choose Official Language for itself from the languages spoken in the state what language will be its Official Language?)",
        "options": [
          "(A) उस राज्‍य में बोली जानेवाली सभी भाषाएं (All the languages spoken in the state)",
          "**(B) हिंदी भाषा (Hindi Language)**",
          "(C) अंग्रेजी भाषा (English Language)",
          "(D) उपर्युक्त में से कोई भी नहीं (None of the above)"
        ],
        "correctAnswer": 1,
        "explanation": "अगर कोई राज्‍य अपनी राजभाषा का चयन नहीं करता है, तो उस राज्य की राजभाषा हिंदी भाषा होगी। (If a state does not choose Official Language for itself, Hindi Language will be its Official Language) [cite_start][cite: 204, 205, 206, 207, 208]"
      },
      {
        "id": 112,
        "question": "संसदीय राजभाषा समिति के अध्यक्ष कौन होते हैं? (Who is the Chairman of Parliamentary Committee on Official Language?)",
        "options": [
          "(A) राजभाषा विभाग के सचिव (Secretary of Rajbhasha Department)",
          "**(B) गृह मंत्री (Home Minister)**",
          "(C) रेल मंत्री (Rail Minister)",
          "(D) प्रधान मंत्री (Prime Minister)"
        ],
        "correctAnswer": 1,
        "explanation": "संसदीय राजभाषा समिति के अध्यक्ष गृह मंत्री होते हैं। (The Chairman of Parliamentary Committee on Official Language is the Home Minister) [cite_start][cite: 209, 210]"
      },
      {
        "id": 113,
        "question": "भारत के संविधान के वर्तमान उपबंधों के अनुसार उच्‍चतम न्‍यायालय और प्रत्येक उच्‍च न्‍यायलय की कार्यवाहियां .......... भाषा में होनी है. (As per the prevailing provisions of the Constitution of India all proceedings in the Supreme Court and in every High Court shall be in ........... language.)",
        "options": [
          "(A) हिंदी में (In Hindi)",
          "**(B) अंग्रेजी में (In English)**",
          "(C) संविधान की 8वीं अनुसूची में उल्लिखित किसी भी भाषा में (In any of the Languages mentioned in 8th Schedule of the Constitution)",
          "(D) उपर्युक्‍त में से कोई भी नहीं (None of the above)"
        ],
        "correctAnswer": 1,
        "explanation": "संविधान के वर्तमान उपबंधों के अनुसार उच्‍चतम न्‍यायालय और प्रत्येक उच्‍च न्‍यायलय की कार्यवाहियां अंग्रेजी भाषा में होनी है। (As per the prevailing provisions of the Constitution, all proceedings in the Supreme Court and in every High Court shall be in English language) [cite_start][cite: 211, 212, 213]"
      },
      {
        "id": 114,
        "question": "संवैधानिक उपबंधों के अनुसार हिंदी भाषा को भारतीय सामासिक संस्‍कृति के सभी तत्‍वों की अभिव्‍यक्ति का माध्‍यम बनाने हेतु इसे समृद्ध बनाने के लिए जहां कहीं आवश्‍यक या वांछनीय हो वहां मुख्‍यत: किस भाषा से शब्‍दों को ग्रहण किया जाना है? (As per the provisions of the Constitution of India, vocabulary should be drawn primarily from which language wherever necessary or desirable for enrichment of Hindi Language to serve as medium of expression for all the elements of the composite culture of India?)",
        "options": [
          "(A) अंग्रेजी भाषा से (English Language)",
          "(B) हिंदुस्तानी भाषा से (Hindustani Language)",
          "(C) बोलचाल की भाषा से (Lingua Franca)",
          "**(D) संस्कृत भाषा से (Sanskrit Language)**"
        ],
        "correctAnswer": 3,
        "explanation": "हिंदी को समृद्ध बनाने के लिए जहां कहीं आवश्‍यक या वांछनीय हो वहां मुख्‍यत: संस्कृत भाषा से शब्‍दों को ग्रहण किया जाना है। (Vocabulary should be drawn primarily from Sanskrit Language wherever necessary or desirable for enrichment of Hindi Language) [cite_start][cite: 213, 214, 215, 216]"
      },
      {
        "id": 115,
        "question": "हिंदीतर भाषी क्षेत्रों में बोर्डों को किस क्रम में प्रदर्शित जाता है? (In which order the boards are displayed in non-Hindi speaking areas?)",
        "options": [
          "(A) हिंदी, अंग्रेजी, क्षेत्रीय भाषा (Hindi, English, Regional Language)",
          "(B) अंग्रेजी, हिंदी, क्षेत्रीय भाषा (English, Hindi, Regional Language)",
          "**(C) क्षेत्रीय भाषा, हिंदी, अंग्रेजी (Regional Language, Hindi, English)**",
          "(D) क्षेत्रीय भाषा, अंग्रेजी, हिंदी (Regional Language, English, Hindi)"
        ],
        "correctAnswer": 2,
        "explanation": "हिंदीतर भाषी क्षेत्रों में बोर्डों को क्षेत्रीय भाषा, हिंदी, अंग्रेजी के क्रम में प्रदर्शित जाता है। (The boards are displayed in the order of Regional Language, Hindi, English in non-Hindi speaking areas) [cite_start][cite: 216, 217, 218]"
      },
      {
        "id": 116,
        "question": "रेलवे स्टेशनों पर उद्घोषणाओं का क्रम क्या होना चाहिए ? (What should be the order of announcements at Railway stations?)",
        "options": [
          "(A) हिंदी, क्षेत्रीय भाषा, अंग्रेजी (Hindi, regional language, English)",
          "(B) हिंदी, अंग्रेजी, क्षेत्रीय भाषा (Hindi, English, Regional language,)",
          "**(C) क्षेत्रीय भाषा, हिंदी, अंग्रेजी (Regional language, Hindi, English)**",
          "(D) क्षेत्रीय भाषा, अंग्रेजी, हिंदी (Regional language, English, Hindi)"
        ],
        "correctAnswer": 2,
        "explanation": "रेलवे स्टेशनों पर उद्घोषणाओं का क्रम क्षेत्रीय भाषा, हिंदी, अंग्रेजी होना चाहिए। (The order of announcements at Railway stations should be Regional language, Hindi, English) [cite_start][cite: 218, 219, 220]"
      },
      {
        "id": 117,
        "question": "भारतीय संविधान की 8वीं अनुसूची में 1950 में कितनी भाषाएं शामिल की गईं थी? (How many languages were included in 1950 in 8th schedule of Indian Constitution ?)",
        "options": [
          "(A) 12",
          "(B) 13",
          "**(C) 14**",
          "(D) 15"
        ],
        "correctAnswer": 2,
        "explanation": "भारतीय संविधान की 8वीं अनुसूची में 1950 में 14 भाषाएं शामिल की गईं थी। (14 languages were included in 1950 in the 8th schedule of the Indian Constitution) [cite_start][cite: 220, 221, 222]"
      },
      
        {
          "id": 118,
          "question": "In which part of the Indian Constitution, are provisions related to the Official Language given?",
          "options": [
            "(A) Part -15",
            "(B) Part -16",
            "**(C) Part -17**",
            "(D) Part -18"
          ],
          "correctAnswer": 2,
          "explanation": "Provisions related to the Official Language are contained in **Part XVII** (Articles 343 to 351) of the Indian Constitution. [cite: 307]"
        },
        {
          "id": 119,
          "question": "In which chapter of Part – 17 of the Constitution is the official language of the Union mentioned?",
          "options": [
            "**(A) Chapter - 1**",
            "(B) Chapter - 2",
            "(C) Chapter - 3",
            "(D) Chapter - 4"
          ],
          "correctAnswer": 0,
          "explanation": "The official language of the Union (Article 343 and 344) is mentioned in **Chapter - 1** of Part XVII of the Constitution. [cite: 309]"
        },
        {
          "id": 120,
          "question": "Which article of the Constitution of India mentions the language to be used in the Parliament?",
          "options": [
            "(A) Article - 12",
            "**(B) Article - 120**",
            "(C) Article - 112",
            "(D) Article – 210"
          ],
          "correctAnswer": 1,
          "explanation": "Article **120** of the Constitution mentions the language to be used for transacting business in Parliament. [cite: 311]"
        },
        {
          "id": 121,
          "question": "Which article of the Constitution of India mentions the language to be used in the Legislature?",
          "options": [
            "(A) Article - 120",
            "**(B) Article - 210**",
            "(C) Article - 343",
            "(D) Article - 345"
          ],
          "correctAnswer": 1,
          "explanation": "Article **210** of the Constitution mentions the language to be used for transacting business in the Legislature (State). [cite: 313]"
        },
        {
          "id": 122,
          "question": "Under which article of the Constitution of India is the Official language of the Union mentioned?",
          "options": [
            "(A) Article - 112",
            "(B) Article - 120",
            "(C) Article - 340",
            "**(D) Article - 343**"
          ],
          "correctAnswer": 3,
          "explanation": "The Official language of the Union (Hindi in Devanagari script) is mentioned in **Article 343**. [cite: 315]"
        },
        {
          "id": 123,
          "question": "Which article of the Constitution of India mentions the Commission and Committee of Parliament in connection with the official language?",
          "options": [
            "(A) Article - 210",
            "(B) Article - 343",
            "**(C) Article - 344**",
            "(D) Article - 351"
          ],
          "correctAnswer": 2,
          "explanation": "The provisions for the Commission and Committee of Parliament on Official Language are contained in **Article 344**. [cite: 317]"
        },
        {
          "id": 124,
          "question": "Which article of the Constitution of India mentions the official language or official languages of the state?",
          "options": [
            "(A) Article - 343",
            "(B) Article - 344",
            "**(C) Article - 345**",
            "(D) Article - 346"
          ],
          "correctAnswer": 2,
          "explanation": "The provision for the official language or official languages of a State is mentioned in **Article 345**. [cite: 319]"
        },
        {
          "id": 125,
          "question": "Which article of the Constitution of India mentions the language of communication between one state and another or between a state and the Union?",
          "options": [
            "**(A) Article - 346**",
            "(B) Article - 347",
            "(C) Article - 348",
            "(D) Article - 349"
          ],
          "correctAnswer": 0,
          "explanation": "The language for communication between a State and another State or between a State and the Union is mentioned in **Article 346**. [cite: 321]"
        },
        {
          "id": 126,
          "question": "Which article of the Constitution of India mentions the language used in the Supreme Court and High Courts and for the Acts, Bills, etc.?",
          "options": [
            "(A) Article - 347",
            "**(B) Article - 348**",
            "(C) Article - 349",
            "(D) Article - 350"
          ],
          "correctAnswer": 1,
          "explanation": "The language to be used in the Supreme Court and in the High Courts and for Acts, Bills, etc. is specified in **Article 348**. [cite: 323]"
        },
        {
          "id": 127,
          "question": "Which article of the Constitution of India mentions the language used in the representation for the redress of grievance (complaint)?",
          "options": [
            "(A) Article - 344",
            "(B) Article - 346",
            "(C) Article - 348",
            "**(D) Article - 350**"
          ],
          "correctAnswer": 3,
          "explanation": "The right to submit a representation for the redress of any grievance in any language used in the Union or State is guaranteed under **Article 350**. [cite: 325]"
        },
        {
          "id": 128,
          "question": "Which article of the Constitution of India mentions the Directive for the development of the Hindi language?",
          "options": [
            "(A) Article - 343",
            "(B) Article - 344",
            "**(C) Article - 351**",
            "(D) None of the above"
          ],
          "correctAnswer": 2,
          "explanation": "The Directive for the development of the Hindi language is laid out in **Article 351**. [cite: 327]"
        },
        {
          "id": 129,
          "question": "According to the Constitution of India, the official language of the Union will be Hindi and the script will be ________.",
          "options": [
            "(A) Roman",
            "(B) Kharosthi",
            "**(C) Devanagari**",
            "(D) Brahmi"
          ],
          "correctAnswer": 2,
          "explanation": "Article 343(1) states that the official language of the Union shall be Hindi in the **Devanagari** script. [cite: 329]"
        },
        {
          "id": 130,
          "question": "Which sub-committee of the Parliamentary Committee on Official Language inspects Railway offices?",
          "options": [
            "(A) Second sub Committee",
            "**(B) Third sub Committee**",
            "(C) First sub Committee",
            "(D) None of the above"
          ],
          "correctAnswer": 1,
          "explanation": "The **Third sub Committee** of the Parliamentary Committee on Official Language is responsible for inspecting offices of the Railway Ministry. [cite: 331]"
        },
        {
          "id": 131,
          "question": "How many members of the Lok Sabha are there in the Parliamentary Committee on Official Language constituted under section 4 of the Official Language Act?",
          "options": [
            "(A) 5",
            "(B) 10",
            "**(C) 15**",
            "(D) 20"
          ],
          "correctAnswer": 2,
          "explanation": "The Committee consists of 30 members in total: **15** from the Lok Sabha and 10 from the Rajya Sabha. [cite: 334]"
        },
        {
          "id": 132,
          "question": "How many members of the Rajya Sabha are there in the Parliamentary Committee on Official Language?",
          "options": [
            "(A) 5",
            "**(B) 10**",
            "(C) 15",
            "(D) 22"
          ],
          "correctAnswer": 1,
          "explanation": "The Committee consists of 30 members in total: 15 from the Lok Sabha and **10** from the Rajya Sabha. [cite: 336]"
        },
        {
          "id": 133,
          "question": "Which Schedule of the Constitution mentions the official languages of the state?",
          "options": [
            "(A) Seventh",
            "**(B) Eighth**",
            "(C) Ninth",
            "(D) Tenth"
          ],
          "correctAnswer": 1,
          "explanation": "The **Eighth** Schedule of the Constitution lists the official languages of India (originally 14, now 22). [cite: 338]"
        },
        {
          "id": 134,
          "question": "Part-17 of the Constitution of India contains how many articles for the purpose of Official language?",
          "options": [
            "**(A) 9**",
            "(B) 10",
            "(C) 11",
            "(D) 12"
          ],
          "correctAnswer": 0,
          "explanation": "Part XVII contains **9** articles, from Article 343 to Article 351. [cite: 340]"
        },
        {
          "id": 135,
          "question": "In which year was the Official Language Act passed?",
          "options": [
            "(A) 1961",
            "(B) 1962",
            "**(C) 1963**",
            "(D) 1968"
          ],
          "correctAnswer": 2,
          "explanation": "The Official Language Act was passed in the year **1963**. [cite: 342]"
        },
        {
          "id": 136,
          "question": "Under which section of the Official Language Act are certain documents compulsorily to be prepared and issued both in Hindi and English languages?",
          "options": [
            "(A) Section 3(1)",
            "(B) Section 3(2)",
            "**(C) Section 3 (3)**",
            "(D) Section 4"
          ],
          "correctAnswer": 2,
          "explanation": "Section **3(3)** of the Official Language Act makes it mandatory to prepare and issue specific documents in both Hindi and English. [cite: 344]"
        },
        {
          "id": 137,
          "question": "Who is empowered to make rules to implement the Official Language Act?",
          "options": [
            "**(A) Central Government**",
            "(B) State Government",
            "(C) Governor",
            "(D) None of the above"
          ],
          "correctAnswer": 0,
          "explanation": "The power to make rules under the Official Language Act is given to the **Central Government** (specifically, the Ministry of Home Affairs). [cite: 346]"
        },
        {
          "id": 138,
          "question": "In which year was an amendment to the Official Language Act made?",
          "options": [
            "(A) 1964",
            "(B) 1965",
            "(C) 1966",
            "**(D) 1967**"
          ],
          "correctAnswer": 3,
          "explanation": "The Official Language Act, 1963 was amended in **1967** (Official Languages (Amendment) Act, 1967). [cite: 348]"
        },
        {
          "id": 139,
          "question": "In which year were the President's orders regarding the Official language issued on 27 April?",
          "options": [
            "**(A) 1955**",
            "(B) 1960",
            "(C) 1962",
            "(D) 1965"
          ],
          "correctAnswer": 0,
          "explanation": "The President's orders regarding the Official Language were issued on 27 April **1955** (after the submission of the report of the First Official Language Commission). [cite: 350]"
        },
        {
          "id": 140,
          "question": "During which year was the Official Language Resolution passed?",
          "options": [
            "(A) 1960",
            "(B) 1962",
            "**(C) 1967**",
            "(D) 1968"
          ],
          "correctAnswer": 2,
          "explanation": "The Official Language Resolution was passed in **1967**. [cite: 352]"
        },
        {
          "id": 141,
          "question": "In which year was the Official Language Rule passed?",
          "options": [
            "(A) 1963",
            "(B) 1967",
            "**(C) 1976**",
            "(D) 1987"
          ],
          "correctAnswer": 2,
          "explanation": "The Official Language Rule (Rules) was passed in **1976** (The Official Languages (Use for Official Purposes of the Union) Rules, 1976). [cite: 354]"
        },
        {
          "id": 142,
          "question": "Official Language Rules do not apply to which state of India?",
          "options": [
            "(A) Karnataka",
            "**(B) Tamil Nadu**",
            "(C) Goa",
            "(D) None of the above"
          ],
          "correctAnswer": 1,
          "explanation": "The Official Language Rules, 1976, do not apply to the State of **Tamil Nadu**. [cite: 356]"
        },
        {
          "id": 143,
          "question": "In how many regions are States and Union Territories of India categorized under Official Language Rules, 1976?",
          "options": [
            "(A) 2",
            "**(B) 3**",
            "(C) 4",
            "(D) 5"
          ],
          "correctAnswer": 1,
          "explanation": "States and Union Territories are categorized into **3** regions ('A', 'B', and 'C') under the Official Language Rules, 1976. [cite: 358]"
        },
        {
          "id": 144,
          "question": "Andaman and Nicobar Islands come under which region classified for the propagation of the Official language?",
          "options": [
            "**(A) 'A' region**",
            "(B) 'B' region",
            "(C) 'C' region",
            "(D) None of the above"
          ],
          "correctAnswer": 0,
          "explanation": "Andaman and Nicobar Islands come under the **'A' region** ('क' क्षेत्र). [cite: 360]"
        },
        {
          "id": 145,
          "question": "The state of Telangana comes under which area classified for the use of the official language?",
          "options": [
            "(A) 'A' region",
            "(B) 'B' region",
            "**(C) 'C' region**",
            "(D) None of the above"
          ],
          "correctAnswer": 2,
          "explanation": "Telangana is categorized under the **'C' region** ('ग' क्षेत्र). [cite: 362]"
        },
        {
          "id": 146,
          "question": "The definition of 'working knowledge in Hindi' is given in which rule of the Official Language Rules?",
          "options": [
            "(A) 7",
            "(B) 8",
            "**(C) 9**",
            "(D) 10"
          ],
          "correctAnswer": 2,
          "explanation": "The definition of 'Working Knowledge in Hindi' is specified in **Rule 9** of the Official Language Rules, 1976. [cite: 364]"
        },
        {
          "id": 147,
          "question": "Definition of 'Proficiency in Hindi' is included in which rule of the Official Language Rules?",
          "options": [
            "**(A) 9**",
            "(B) 10",
            "(C) 11",
            "(D) 12"
          ],
          "correctAnswer": 0,
          "explanation": "The definition of 'Proficiency in Hindi' is included in **Rule 9** of the Official Language Rules, 1976. [cite: 366]"
        },
        {
          "id": 148,
          "question": "Upon what percentage of acquiring Working Knowledge of Hindi by the employees of Central Government offices is that office required to be notified in the Gazette of Govt. of India?",
          "options": [
            "(A) 60%",
            "(B) 70%",
            "**(C) 80%**",
            "(D) 100%"
          ],
          "correctAnswer": 2,
          "explanation": "An office is notified in the Gazette under Rule 10(4) when **80%** or more of its employees have acquired a working knowledge of Hindi. [cite: 368]"
        },
        {
          "id": 149,
          "question": "When is Hindi Day celebrated every year in the Central Government Offices?",
          "options": [
            "(A) 12 September",
            "**(B) 14 September**",
            "(C) 12 January",
            "(D) 14 January"
          ],
          "correctAnswer": 1,
          "explanation": "Hindi Day (Hindi Diwas) is celebrated every year on **14 September**, the day Hindi was adopted as the Official Language of the Union in 1949. [cite: 370]"
        },
        {
          "id": 150,
          "question": "When did the Constituent Assembly accept Hindi as the official language of the Union?",
          "options": [
            "(A) 10 January 1975",
            "(B) 10 September 1975",
            "**(C) 14 September, 1949**",
            "(D) 14 September 1963"
          ],
          "correctAnswer": 2,
          "explanation": "Hindi was accepted as the official language of the Union by the Constituent Assembly on **14 September, 1949**. [cite: 372]"
        },
        {
          "id": 151,
          "question": "Which of the following languages is not included in the 8th Schedule of the Constitution?",
          "options": [
            "(A) Nepali",
            "(B) Urdu",
            "**(C) English**",
            "(D) Sindhi"
          ],
          "correctAnswer": 2,
          "explanation": "**English** is not one of the 22 languages listed in the 8th Schedule of the Constitution. [cite: 374]"
        },
        {
          "id": 152,
          "question": "How many languages have been included so far as the Official Languages in the 8th schedule of the constitution?",
          "options": [
            "(A) 15",
            "(B) 18",
            "**(C) 22**",
            "(D) 24"
          ],
          "correctAnswer": 2,
          "explanation": "The 8th Schedule presently recognizes **22** languages. [cite: 376]"
        },
        {
          "id": 153,
          "question": "According to the Official Language Rules, an employee can submit his application, appeal or representation in which language?",
          "options": [
            "(A) In Hindi",
            "(B) In English",
            "**(C) In Hindi or English**",
            "(D) In any language"
          ],
          "correctAnswer": 2,
          "explanation": "Under Rule 7(1) of the Official Language Rules, 1976, an employee may submit an application, appeal or representation in **Hindi or English**. [cite: 378]"
        },
        {
          "id": 154,
          "question": "During which year was the first Official Language Commission formed?",
          "options": [
            "**(A) 1955**",
            "(B) 1960",
            "(C) 1963",
            "(D) 1976"
          ],
          "correctAnswer": 0,
          "explanation": "The first Official Language Commission was formed in **1955** under Article 344. [cite: 380]"
        },
        {
          "id": 155,
          "question": "In which rule of the Official Language Rules is it mentioned that manuals, codes, and other procedural literature must be issued in bilingual form?",
          "options": [
            "(A) Rule 9",
            "(B) Rule 10",
            "**(C) Rule 11**",
            "(D) Rule 12"
          ],
          "correctAnswer": 2,
          "explanation": "The mandatory bilingual issue of manuals, codes, and other literature is prescribed under **Rule 11** of the Official Language Rules, 1976. [cite: 382]"
        },
        {
          "id": 156,
          "question": "According to Official Language Rule-12, who is entrusted with the responsibility of ensuring proper compliance with the instructions issued in connection with the Official Language Act and Rules?",
          "options": [
            "(A) Rajbhasha Adhikari (Official Language Officer)",
            "**(B) Administrative Head of the office**",
            "(C) Concerned Dealer",
            "(D) Above three"
          ],
          "correctAnswer": 1,
          "explanation": "Rule **12** entrusts the responsibility of ensuring proper compliance with the Official Language Act and Rules to the **Administrative Head of the office**. [cite: 384]"
        },
        {
          "id": 157,
          "question": "Who was the Chairman of the First Official Language Commission constituted in 1955?",
          "options": [
            "(A) Sri Govind Vallabh Pant",
            "**(B) Sri B.G. Kher**",
            "(C) Sri Jawahar Lal Nehru",
            "(D) Sri Om Mehtha"
          ],
          "correctAnswer": 1,
          "explanation": "The Chairman of the First Official Language Commission (1955) was **Sri B.G. [cite_start]Kher** (Bal Gangadhar Kher). [cite: 387, 389]"
        },
        {
          "id": 158,
          "question": "According to the annual programme of the year 2024-25 (or 2025-26 as per later context), what percentage of originating correspondence is required to be done by offices situated in the 'C' region?",
          "options": [
            "(A) 55 Percent",
            "**(B) 60 Percent**",
            "(C) 75 Percent",
            "(D) 100 Percent"
          ],
          "correctAnswer": 1,
          "explanation": "As per the annual program (2025-26), the target for originating correspondence in Hindi for 'C' region offices is **60%**. [cite: 390]"
        },
        {
          "id": 159,
          "question": "What is the periodicity for holding the meetings of the Official Language Implementation Committee (OLIC) constituted in Central Government Offices?",
          "options": [
            "**(A) Once in 3 months**",
            "(B) Once in 6 months",
            "(C) Once in a year",
            "(D) Once in 2 years"
          ],
          "correctAnswer": 0,
          "explanation": "OLIC meetings at the office level must be held at least **Once in 3 months** (quarterly). [cite: 392, 394]"
        },
        {
          "id": 160,
          "question": "What is the periodicity for holding meetings of the Town Official Language Implementation Committee (TOLIC)?",
          "options": [
            "(A) Once in 3 months",
            "**(B) Once in 6 months**",
            "(C) Once in a year",
            "(D) Once in 2 years"
          ],
          "correctAnswer": 1,
          "explanation": "TOLIC meetings must be held at least **Once in 6 months** (half-yearly). [cite: 396, 398]"
        },
        {
          "id": 161,
          "question": "How many rules are there in the Official Language Rules 1976?",
          "options": [
            "(A) 9",
            "(B) 10",
            "**(C) 12**",
            "(D) 14"
          ],
          "correctAnswer": 2,
          "explanation": "The Official Language Rules, 1976, consist of **12** rules. [cite: 399]"
        },
        {
          "id": 162,
          "question": "The annual program of Official Language is released by which ministry?",
          "options": [
            "(A) Human Resource Ministry",
            "(B) Ministry of Railways",
            "(C) All Ministries",
            "**(D) Ministry of Home Affairs**"
          ],
          "correctAnswer": 3,
          "explanation": "The annual program is released by the Department of Official Language under the **Ministry of Home Affairs**. [cite: 401]"
        },
        {
          "id": 163,
          "question": "How many times in a year are the examinations of Hindi courses prescribed under the Hindi Teaching Scheme conducted?",
          "options": [
            "(A) Once",
            "**(B) Twice**",
            "(C) Thrice",
            "(D) 4 times"
          ],
          "correctAnswer": 1,
          "explanation": "The examinations of Hindi courses (Prabodh, Praveen, Pragya) are generally conducted **twice** a year (in May and November). [cite: 404, 178]"
        },
        {
          "id": 164,
          "question": "In which year was the Sindhi language added to the Eighth Schedule?",
          "options": [
            "(A) 1968",
            "(B) 1966",
            "**(C) 1967**",
            "(D) 1969"
          ],
          "correctAnswer": 2,
          "explanation": "The Sindhi language was added to the Eighth Schedule by the 21st Amendment Act in **1967**. [cite: 406]"
        },
        {
          "id": 165,
          "question": "Who is the Chairman of the Official Language Implementation Committee at the Divisional level?",
          "options": [
            "(A) AMRA (Additional Chief Official Language Officer)",
            "**(B) DRM (Divisional Railway Manager)**",
            "(C) MRA (Chief Official Language Officer)",
            "(D) GM (General Manager)"
          ],
          "correctAnswer": 1,
          "explanation": "The Chairman of the OLIC at the Divisional level is the **DRM (Divisional Railway Manager)**. [cite: 408]"
        },
        {
          "id": 166,
          "question": "Who is the Chairman of the Zonal Railways Official Language Implementation Committee?",
          "options": [
            "(A) MRA (Chief Official Language Officer)",
            "(B) PCPO (Principal Chief Personnel Officer)",
            "**(C) General Manager**",
            "(D) Chairman, Railway Board"
          ],
          "correctAnswer": 2,
          "explanation": "The Chairman of the OLIC at the Zonal Railway level is the **General Manager**. [cite: 410]"
        },
        {
          "id": 167,
          "question": "How many Sections are there in the Official Language Act, 1963?",
          "options": [
            "(A) 9",
            "**(B) 10**",
            "(C) 11",
            "(D) 12"
          ],
          "correctAnswer": 1,
          "explanation": "The Official Language Act, 1963, consists of **10** sections. [cite: 412]"
        },
        {
          "id": 168,
          "question": "In which Official Language award scheme are prize amounts and individual awards not given?",
          "options": [
            "**(A) Rajbhasha Keerti Puraskar**",
            "(B) Rajbhasha Gaurav Puraskar",
            "(C) Maithili Sharan Gupta Puraskar",
            "(D) Premchand Puraskar"
          ],
          "correctAnswer": 0,
          "explanation": "**Rajbhasha Keerti Puraskar** is given to Ministries, Departments, and Offices for excellent overall performance, not as an individual cash award. [cite: 414]"
        },
        {
          "id": 169,
          "question": "Under which section of the Official Language Act, 1963, has the Central Government been given the power to make rules related to the official language?",
          "options": [
            "(A) Section - 6",
            "(B) Section - 7",
            "**(C) Section – 8**",
            "(D) Section - 9"
          ],
          "correctAnswer": 2,
          "explanation": "Section **8** of the Official Language Act, 1963, grants the Central Government the power to make rules. [cite: 416]"
        },
        {
          "id": 170,
          "question": "What is the scheme for writing original books in Hindi on technical subjects of Railway?",
          "options": [
            "**(A) Visvesvaraya Technological original Book Writing Award Scheme**",
            "(B) Lal Bahadur Shastri Technical original Book Writing Award Scheme",
            "(C) Acharya Mahavir Prasad Technical original Book Writing Award Scheme",
            "(D) Sivasagar Mishra Technical original Book Writing Award Scheme"
          ],
          "correctAnswer": 0,
          "explanation": "The scheme for original technical book writing in Hindi on Railway subjects is the **Visvesvaraya Technological original Book Writing Award Scheme**. [cite: 418]"
        },
        {
          "id": 171,
          "question": "What is the name of the award scheme for writing original fiction/story collection and novel in Hindi?",
          "options": [
            "(A) Maithili Sharan Gupta Award Scheme",
            "**(B) Munshi Premchand Award Scheme**",
            "(C) Makhanlal Chaturvedi Award Scheme",
            "(D) Bharatendu Harishchandra Award Scheme"
          ],
          "correctAnswer": 1,
          "explanation": "The award scheme for writing original Hindi fiction/novels is the **Munshi Premchand Award Scheme**. [cite: 420]"
        },
        {
          "id": 172,
          "question": "What is the name of the scheme launched to award Original poetry, poetry collection in Hindi?",
          "options": [
            "(A) Mahadevi Verma Award Scheme",
            "(B) Rabindranath Thakur Award Scheme",
            "**(C) Maithilisharan Gupta Award Scheme**",
            "(D) Makhanlal Chaturvedi Award Scheme"
          ],
          "correctAnswer": 2,
          "explanation": "The award scheme for writing original Hindi poetry/collections is the **Maithilisharan Gupta Award Scheme**. [cite: 422]"
        },
        {
          "id": 173,
          "question": "Under which rule of the Official Language Act 1976 can an employee write Notings or minutes on the file in Hindi or English?",
          "options": [
            "(A) Rule 3(1)",
            "(B) Rule 7(1)",
            "**(C) Rule 8 (1)**",
            "(D) Rule 10 (1)"
          ],
          "correctAnswer": 2,
          "explanation": "**Rule 8 (1)** gives an employee the option to write a note or minute in Hindi or English, and mandates that no compulsion should be placed on him to write in the other language. [cite: 424]"
        },
        {
          "id": 174,
          "question": "Who is the Chairman of the Railway Board Official Language Implementation Committee?",
          "options": [
            "**(A) CRB & CEO (Chairman Railway Board & Chief Executive Officer)**",
            "(B) Director (OL)",
            "(C) Member (MOBD)",
            "(D) Railway Minister"
          ],
          "correctAnswer": 0,
          "explanation": "The Chairman of the Railway Board Official Language Implementation Committee is the **CRB & CEO**. [cite: 426, 428]"
        },
        {
          "id": 175,
          "question": "As per the annual program for the year 2025-26, how many sections of Central Govt. offices in region 'C' should be nominated for 'Cent Percent Work in Hindi'?",
          "options": [
            "(A) 20",
            "**(B) 25**",
            "(C) 30",
            "(D) 35"
          ],
          "correctAnswer": 1,
          "explanation": "The annual target for nominating sections for 'Cent Percent Work in Hindi' in the 'C' region is **25%**. [cite: 429]"
        },
        {
          "id": 176,
          "question": "Who is entrusted with the responsibility of complying with Section 3(3) of the Official Language Act?",
          "options": [
            "(A) Administrative Head of the office",
            "(B) Rajbhasha Adhikari (Official Language Officer)",
            "**(C) Officer signing such documents**",
            "(D) Concerned Clerk"
          ],
          "correctAnswer": 2,
          "explanation": "The responsibility for ensuring that documents listed under Section 3(3) are issued bilingually rests with the **Officer signing such documents**. [cite: 432]"
        },
        {
          "id": 177,
          "question": "Under rule No. 5 of the Official Language Rules 1976, in which language is it required to reply to the letters received in Hindi?",
          "options": [
            "**(A) Hindi**",
            "(B) English",
            "(C) Hindi or English",
            "(D) Hindi-English bilingual"
          ],
          "correctAnswer": 0,
          "explanation": "Rule 5 mandates that every letter received in **Hindi** shall be replied to in **Hindi**. [cite: 434]"
        },
        {
          "id": 178,
          "question": "Under which Rajbhasha award scheme is the maximum amount given as a prize?",
          "options": [
            "(A) Rajbhasha Keerthi Award",
            "**(B) Rajbhasha Gaurav Puraskar**",
            "(C) Railway Board Award",
            "(D) Home Ministry Award"
          ],
          "correctAnswer": 1,
          "explanation": "The **Rajbhasha Gaurav Puraskar** (for original book writing by a Central Govt. employee) offers the highest prize money among book awards. [cite: 436]"
        },
        {
          "id": 179,
          "question": "What is the name of the software available to learn Hindi through the languages of India?",
          "options": [
            "(A) Pravachak",
            "(B) Shruthlekhan",
            "(C) Mantra",
            "**(D) LILA**"
          ],
          "correctAnswer": 3,
          "explanation": "**LILA** (Learn Indian Languages through Artificial intelligence) is the software available for learning Hindi through other Indian languages. [cite: 438]"
        },
        {
          "id": 180,
          "question": "What is the name of the software related to converting Hindi speech into Hindi text?",
          "options": [
            "**(A) Shruthlekhan - Rajbhasha**",
            "(B) LILA",
            "(C) Pravachak",
            "(D) Mantra"
          ],
          "correctAnswer": 0,
          "explanation": "**Shruthlekhan - Rajbhasha** is the Speech-to-Text software for Hindi. [cite: 440]"
        },
        {
          "id": 181,
          "question": "What is the name of the software related to converting Hindi text to Hindi speech?",
          "options": [
            "(A) Rail Rajbhasha",
            "**(B) Pravachak - Rajbhasha**",
            "(C) Leela",
            "(D) Shruthlekhan"
          ],
          "correctAnswer": 1,
          "explanation": "**Pravachak - Rajbhasha** is the Text-to-Speech software for Hindi. [cite: 442]"
        },
        {
          "id": 182,
          "question": "According to the annual program for the year 2025-26, the percentage of trained employees in central government offices should be -------.",
          "options": [
            "(A) 55%",
            "(B) 70%",
            "**(C) 60%**",
            "(D) 100%"
          ],
          "correctAnswer": 2,
          "explanation": "The annual target for the percentage of employees trained in Hindi in Central Government offices is **60%**. [cite: 444]"
        },
        {
          "id": 183,
          "question": "According to the annual program for the usage of Hindi in the year 2025-26, what percentage of the original correspondence in Hindi is to be done from the 'C' region to the central government offices of 'B' region?",
          "options": [
            "**(A) 100%**",
            "(B) 70%",
            "(C) 60%",
            "(D) 55%"
          ],
          "correctAnswer": 0,
          "explanation": "The target for original correspondence from 'C' region to 'B' region is **100%**. [cite: 446]"
        },
        {
          "id": 184,
          "question": "According to the annual program for the usage of Hindi in the year 2025-26, what percentage of the original correspondence in Hindi is to be done from the 'C' region to the central government offices of 'C' region?",
          "options": [
            "**(A) 100%**",
            "(B) 70%",
            "(C) 60%",
            "(D) 55%"
          ],
          "correctAnswer": 0,
          "explanation": "The target for original correspondence from 'C' region to 'C' region is **100%**. [cite: 448]"
        },
        {
          "id": 185,
          "question": "According to the annual program for the year 2025-26, what percentage of original correspondence in Hindi is required to be done from 'C' region with the persons/offices of State / Union Territory of 'A' region and 'B' region?",
          "options": [
            "**(A) 100%**",
            "(B) 85%",
            "(C) 60%",
            "(D) 55%"
          ],
          "correctAnswer": 0,
          "explanation": "The target for original correspondence from 'C' region to individuals/offices in 'A' and 'B' regions is **100%**. [cite: 450, 452]"
        },
        {
          "id": 186,
          "question": "According to the annual program for the year 2025-26 for the usage of Hindi, what percentage of letters received in Hindi should be replied to in Hindi as per the target set?",
          "options": [
            "(A) 40%",
            "(B) 60%",
            "(C) 80%",
            "**(D) 100%**"
          ],
          "correctAnswer": 3,
          "explanation": "The target set is that **100%** of letters received in Hindi must be replied to in Hindi (as per Rule 5). [cite: 453]"
        },
        {
          "id": 187,
          "question": "For the use of Hindi, according to the annual program for the year 2024-25 (or 2025-26), what percentage of Hindi noting is required to be done in the 'C' region?",
          "options": [
            "**(A) 35%**",
            "(B) 50%",
            "(C) 75%",
            "(D) 100%"
          ],
          "correctAnswer": 0,
          "explanation": "The target set for Hindi noting in the 'C' region is **35%**. [cite: 455]"
        },
        {
          "id": 188,
          "question": "For the use of Hindi, according to the annual program for the year 2025-26, what percentage of Hindi Dictations are required to be given in the 'C' region?",
          "options": [
            "(A) 25%",
            "**(B) 35%**",
            "(C) 75%",
            "(D) 100%"
          ],
          "correctAnswer": 1,
          "explanation": "The target set for Hindi Dictations in the 'C' region is **35%**. [cite: 457]"
        },
        {
          "id": 189,
          "question": "According to the annual program for the year 2025-26 for the use of Hindi, what percentage of the target is set for the purchase of all types of electronic devices including computers in bilingual form in the 'C' region?",
          "options": [
            "(A) 75%",
            "(B) 80%",
            "**(C) 90%**",
            "(D) 100%"
          ],
          "correctAnswer": 2,
          "explanation": "The target for purchasing bilingual electronic devices in the 'C' region is **90%**. [cite: 459]"
        },
        {
          "id": 190,
          "question": "Which form of the numerals should be used for official purposes of the Union of India?",
          "options": [
            "**(A) International form of Indian Numerals**",
            "(B) Devanagari numerals",
            "(C) Roman numerals",
            "(D) None of the above"
          ],
          "correctAnswer": 0,
          "explanation": "The form of numerals to be used for the official purposes of the Union is the **International form of Indian Numerals** (i.e., 1, 2, 3...). [cite: 462]"
        },
        {
          "id": 191,
          "question": "The names of the Central Government offices of which ______ percent employees have acquired working knowledge of Hindi are notified in the Gazette?",
          "options": [
            "(A) 60%",
            "(B) 70%",
            "**(C) 80%**",
            "(D) 100%"
          ],
          "correctAnswer": 2,
          "explanation": "Offices are notified in the Gazette when **80%** or more of their employees have acquired working knowledge of Hindi. [cite: 464]"
        },
        {
          "id": 192,
          "question": "Under which Official Language rule are the names of the Central Government offices of which 80% of employees have acquired working knowledge of Hindi notified in the Gazette?",
          "options": [
            "**(A) Rule 10(4)**",
            "(B) Rule 10(3)",
            "(C) Rule 10",
            "(D) Rule 10(2)"
          ],
          "correctAnswer": 0,
          "explanation": "This notification is done under **Rule 10(4)** of the Official Language Rules, 1976. [cite: 467]"
        },
        {
          "id": 193,
          "question": "What is the amount of the award given under the Railway Board Individual Cash Award Scheme?",
          "options": [
            "**(A) Rs. 2000**",
            "(B) Rs. 3000",
            "(C) Rs. 1000",
            "(D) Rs. 1200"
          ],
          "correctAnswer": 0,
          "explanation": "The amount for the individual cash award scheme is **Rs. [cite_start]2000**. [cite: 469, 471]"
        },
        {
          "id": 194,
          "question": "According to the annual program issued by the Rajbhasha Department, Ministry of Home Affairs, what percentage of sections are required to be nominated for doing cent percent work in Hindi?",
          "options": [
            "(A) 20",
            "**(B) 30**",
            "(C) 55",
            "(D) 100"
          ],
          "correctAnswer": 1,
          "explanation": "The annual target for nominating sections for 'Cent Percent Work in Hindi' is **30%**. [cite: 475]"
        },
        {
          "id": 195,
          "question": "Departmental Hindi Basha training PRAGYA is considered equivalent to which level of education?",
          "options": [
            "(A) Tenth",
            "(B) Twelfth",
            "(C) Eighth",
            "**(D) Degree**"
          ],
          "correctAnswer": 3,
          "explanation": "The highest level of Hindi training, **PRAGYA**, is considered equivalent to a **Degree** level of knowledge. [cite: 477]"
        },
        {
          "id": 196,
          "question": "Under which rule of the Official Language Rules, 1976, is the administrative head of the office entrusted with the responsibility of complying with the Official Language Act and the Official Language Rules?",
          "options": [
            "**(A) Rule 12**",
            "(B) Rule 11",
            "(C) Rule 10",
            "(D) Rule 3"
          ],
          "correctAnswer": 0,
          "explanation": "**Rule 12** entrusts this responsibility to the Administrative Head of the Office. [cite: 479]"
        },
        {
          "id": 197,
          "question": "According to which sub rule of Official Language Rules 1976, can an employee submit his application, appeal or representation in Hindi or English?",
          "options": [
            "**(A) Rule 7(1)**",
            "(B) Rule 7(3)",
            "(C) Rule 8(1)",
            "(D) Rule 8(4)"
          ],
          "correctAnswer": 0,
          "explanation": "An employee has the option to submit any application, appeal, or representation in **Hindi or English** under **Rule 7(1)**. [cite: 481]"
        },
        {
          "id": 198,
          "question": "According to which sub-rule of the Official Language Rules 1976, can an employee demand that any orders or notices served to him be in Hindi or in English?",
          "options": [
            "(A) Rule 7(1)",
            "**(B) Rule 7(3)**",
            "(C) Rule 8(1)",
            "(D) Rule 8 (4)"
          ],
          "correctAnswer": 1,
          "explanation": "An employee may demand that any order or notice served on him shall be in Hindi or English under **Rule 7(3)**. [cite: 483]"
        },
        {
          "id": 199,
          "question": "Under which rule of the Official Language Rules, 1976, should all name plates, sign boards, letter heads, inscriptions on envelopes, and other items of stationery used in any central government office be in Hindi and English?",
          "options": [
            "(A) Rule 11(1)",
            "**(B) Rule 11 (3)**",
            "(C) Rule 11(2)",
            "(D) None of the above"
          ],
          "correctAnswer": 1,
          "explanation": "The bilingual requirement for name plates, signboards, stationery, etc. is specified in **Rule 11(3)**. [cite: 485]"
        },
        {
          "id": 200,
          "question": "Which award is given to General Managers and above level officers for doing excellent work in the Official Language, Hindi?",
          "options": [
            "**(A) Kamlapati Tripathi Rajbhasha Gold Medal**",
            "(B) Rail Manthri Rajbhasha Silver Medal",
            "(C) Rajbhasha Gaurav Purskar",
            "(D) Rail Manthri Rjbhasha Gold Medal"
          ],
          "correctAnswer": 0,
          "explanation": "The **Kamlapati Tripathi Rajbhasha Gold Medal** is given to officers at the General Manager level and above for outstanding work in Official Language. [cite: 487]"
        },
        {
          "id": 201,
          "question": "Which of the following honors are given to Senior Administrative Grade (SAG) and above officers for doing excellent work in the Official Language, Hindi?",
          "options": [
            "(A) Kamlapati Tripathi Rajbhasha Gold Medal",
            "**(B) Rail Manthri Rajbhasha Silver Medal**",
            "(C) Rajbhasha Gaurav Purskar",
            "(D) Rail Manthri Rajbhasha Gold Medal"
          ],
            "correctAnswer": 1,
          "explanation": "The **Rail Manthri Rajbhasha Silver Medal** is given to SAG level and above officers (excluding those eligible for the Gold Medal). [cite: 489]"
        },
        {
          "id": 202,
          "question": "When an employee writes 10,000 words in Hindi in the 'C' region during the year in his daily official work, under which award scheme will he be awarded?",
          "options": [
            "(A) Home Ministry Award Scheme",
            "(B) Rail Mantri Award Scheme",
            "(C) General Manager Award Scheme",
            "**(D) Incentive award scheme**"
          ],
          "correctAnswer": 3,
          "explanation": "An employee achieving this word count is awarded under the local-level **Incentive award scheme** (Individual Cash Award Scheme for noting/drafting in Hindi). [cite: 491]"
        },
        {
          "id": 203,
          "question": "Who is the Chairman of the Official Language Committee at the Zonal Level?",
          "options": [
            "**(A) General Manager**",
            "(B) Mukhya Rajbhasha Adhikari (Chief Official Language Officer)",
            "(C) Divisional Railway Manager",
            "(D) Rajbhasha Adhikari (Official Language Officer)"
          ],
          "correctAnswer": 0,
          "explanation": "The Chairman of the Official Language Committee at the Zonal Level (Zonal Railways OLIC) is the **General Manager**. [cite: 493]"
        },
        {
          "id": 204,
          "question": "According to the annual programme issued by the Ministry of Home Affairs, Department of Official Language, what percentage of the training material of training institutes should be in bilingual form?",
          "options": [
            "(A) 20",
            "(B) 30",
            "(C) 55",
            "**(D) 100**"
          ],
          "correctAnswer": 3,
          "explanation": "The target is for **100%** of the training material of training institutes to be in bilingual form. [cite: 495]"
        },
        {
          "id": 205,
          "question": "According to the annual programme issued by the Ministry of Home Affairs, Department of Official Language, what percentage of the code, manual, procedure, translation of literature, etc. used in government offices should be bilingual?",
          "options": [
            "(A) 20",
            "(B) 50",
            "(C) 55",
            "**(D) 100**"
          ],
          "correctAnswer": 3,
          "explanation": "The target is for **100%** of codes, manuals, procedural literature, and their translations to be bilingual. [cite: 497]"
        },
        {
          "id": 206,
          "question": "According to the annual programme issued by the Ministry of Home Affairs, Department of Official Language, what percentage of the training material of training institutes should be in bilingual form?",
          "options": [
            "(A) 20",
            "(B) 30",
            "(C) 55",
            "**(D) 100**"
          ],
          "correctAnswer": 3,
          "explanation": "The target is for **100%** of the training material of training institutes to be in bilingual form. [cite: 499]"
        },
        {
          "id": 207,
          "question": "According to the annual programme, it is mandatory for officers of the Official Language Department to inspect the minimum percentage of their subordinate offices.",
          "options": [
            "**(A) 20**",
            "(B) 25",
            "(C) 55",
            "(D) 100"
          ],
          "correctAnswer": 0,
          "explanation": "It is mandatory to inspect a minimum of **20%** of subordinate offices annually. [cite: 501]"
        },
        {
          "id": 208,
          "question": "According to the annual programme, what percentage of the grant of libraries is required to be spent on Hindi books and Hindi e-books?",
          "options": [
            "(A) 20",
            "**(B) 50**",
            "(C) 55",
            "(D) 100"
          ],
          "correctAnswer": 1,
          "explanation": "The target is for **50%** of the library grant to be spent on Hindi books and e-books. [cite: 503, 505]"
        },
        {
          "id": 209,
          "question": "On passing the Hindi typing examination, for how many months is personal pay equal to one increment given?",
          "options": [
            "(A) 36",
            "(B) 24",
            "(C) 6",
            "**(D) 12**"
          ],
          "correctAnswer": 3,
          "explanation": "Personal pay is given for **12** months on passing the Hindi typing examination. [cite: 506, 507]"
        },
        {
          "id": 210,
          "question": "On passing the Hindi Stenography examination, for how many months is personal pay equal to one increment given?",
          "options": [
            "(A) 6",
            "**(B) 36**",
            "(C) 12",
            "(D) 24"
          ],
          "correctAnswer": 1,
          "explanation": "Personal pay is given for **36** months on passing the Hindi Stenography examination. [cite: 508, 509]"
        },
        {
          "id": 211,
          "question": "If a state does not choose an Official Language for itself from the languages spoken in the state, what language will be its Official Language?",
          "options": [
            "(A) All the languages spoken in the state",
            "**(B) Hindi Language**",
            "(C) English Language",
            "(D) None of the above"
          ],
          "correctAnswer": 1,
          "explanation": "If a State Legislature has not adopted any language, the **Hindi Language** is deemed to be the Official Language for communication between that State and the Union/other states. [cite: 510, 512]"
        },
        {
          "id": 212,
          "question": "Who is the Chairman of the Parliamentary Committee on Official Language?",
          "options": [
            "(A) Secretary of Rajbhasha Department",
            "**(B) Home Minister**",
            "(C) Rail Minister",
            "(D) Prime Minister"
          ],
          "correctAnswer": 1,
          "explanation": "The Chairman of the Parliamentary Committee on Official Language is the Union **Home Minister**. [cite: 514, 515]"
        },
        {
          "id": 213,
          "question": "As per the prevailing provisions of the Constitution of India, all proceedings in the Supreme Court and in every High Court shall be in which language?",
          "options": [
            "(A) In Hindi",
            "**(B) In English**",
            "(C) In any of the Languages mentioned in the 8th Schedule of the Constitution",
            "(D) None of the above"
          ],
          "correctAnswer": 1,
          "explanation": "Article 348 provides that all proceedings in the Supreme Court and in every High Court shall be in the **English** language unless Parliament or the Governor, as the case may be, otherwise provides. [cite: 516, 518]"
        },
        {
          "id": 214,
          "question": "As per the provisions of the Constitution of India, vocabulary should be drawn primarily from which language wherever necessary or desirable for the enrichment of Hindi Language to serve as a medium of expression for all the elements of the composite culture of India?",
          "options": [
            "(A) English Language",
            "(B) Hindustani Language",
            "(C) Lingua Franca",
            "**(D) Sanskrit Language**"
          ],
          "correctAnswer": 3,
          "explanation": "Article 351 directs that Hindi's vocabulary should be drawn primarily from **Sanskrit** and secondarily from other languages. [cite: 519, 521]"
        },
        {
          "id": 215,
          "question": "In which order are the boards displayed in non-Hindi speaking areas?",
          "options": [
            "(A) Hindi, English, Regional Language",
            "(B) English, Hindi, Regional Language",
            "**(C) Regional Language, Hindi, English**",
            "(D) Regional Language, English, Hindi"
          ],
          "correctAnswer": 2,
          "explanation": "In non-Hindi speaking areas, the order for display boards is **Regional Language, Hindi, English**. [cite: 522, 232]"
        },
        {
          "id": 216,
          "question": "What should be the order of announcements at Railway stations?",
          "options": [
            "(A) Hindi, regional language, English",
            "(B) Hindi, English, Regional language,",
            "**(C) Regional language, Hindi, English**",
            "(D) Regional language, English, Hindi"
          ],
          "correctAnswer": 2,
          "explanation": "The order of announcements at Railway stations should be **Regional language, Hindi, English** (Trilingual). [cite: 524, 262]"
        },
        {
          "id": 217,
          "question": "How many languages were included in 1950 in the 8th schedule of the Indian Constitution?",
          "options": [
            "(A) 12",
            "(B) 13",
            "**(C) 14**",
            "(D) 15"
          ],
          "correctAnswer": 2,
          "explanation": "The 8th Schedule originally included **14** languages in 1950. [cite: 526]"
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
