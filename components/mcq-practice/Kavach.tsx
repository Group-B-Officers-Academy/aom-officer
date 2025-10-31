'use client'

import React, { useState, useEffect } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const Kavach = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [timeLeft, setTimeLeft] = useState(3600) // 60 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [userAnswers, setUserAnswers] = useState<Map<number, number>>(new Map())
  const [showSummary, setShowSummary] = useState(false)

  // All 50 KAVACH MCQ Questions from PDF
  const questions: Question[] = [
    {
      id: 1,
      question: "1. What is the former name of the KAVACH system? कवच पिंजरी का पूर्व नाम क्या था ?",
      options: [
        "Automatic Train Protection (ATP) / ऑटोमे 􀟁टक ट􀛍े न प􀛎 ोटे 􀛝शन (एटीपी)",
        "Train Collision Avoidance System (TCAS) / ट􀛍े न को􀟂लशन अवॉइड􀟌 स िस􀝂टम (टीसीएएस)",
        "Anti-Collision Device (ACD) / एंटी-को􀟂लशन 􀟁डवाइस (एसीडी)",
        "European Train Control System (ETCS) / यू रो􀟁पयन ट􀛍े न कं ट􀛍 ोल िस􀝂टम (ईटीसीएस)",
      ],
      correctAnswer: 1,
      explanation: "KAVACH was formerly known as the Cab-signalling Train Collision Avoidance System (TCAS) " 
    },
    {
      id: 2,
      question: `The KAVACH system is being provided on sections equipped with which type of
signalling?
कवच प􀛎 णाली 􀟁कस प􀛎 कार क􀟆 िस􀛧न􀟁लं ग से लै स खं ड􀟌 ा पर प􀛎 दान क􀟆 जा रही है ?`,
      options: [
        "Two-Aspect Semaphore Signalling / ट􀞾 -ए􀝂पे 􀛜ट से माफोर िस􀛧न􀟁लंग",
        "Multi Aspect Colour Light Signalling / म􀜲टी ए􀝂पे 􀛜ट कलर लाइट िस􀛧न􀟁लंग", 
        "Modified Lower Quadrant Signalling / मॉ􀟁डफाइड लोअर 􀛙वाड􀛍􀟌 ट िस􀛧न􀟁लंग",
        "Route Relay Interlocking only / के वल 􀞵ट 􀟀रले इंटरलॉ􀟀कं ग"
      ],
      correctAnswer: 1,
      explanation: `KAVACH is being provided on sections equipped with Multi Aspect Colour Light
Signalling controlled by relay or electronic interlocking`
    },
    {
      id: 3,
      question: `What is the primary role of KAVACH in relation to the Loco Pilot?
लोको पायलट के संबंध म􀟌 कवच क􀟆 प􀛎 ाथिमक भू िमका 􀛟या है ?`,
      options: [
        `To replace the Loco Pilot in automatic sections / 􀝂वचा􀟂लत खं ड􀟌 ा म􀟌 लोको पायलट को प􀛎 􀟁त􀝂था􀟁पत
करना।`,
        `To be an additional aid to the Loco Pilot / लोको पायलट के 􀟂लए एक अ􀟁त􀟀र􀛜त सहायक होना।`,
        `To record the Loco Pilot's actions for review / समी􀛊ा के 􀟂लए लोको पायलट क􀟆 कार􀛌 वाइय􀟌 ा को
􀟀रकॉड􀛌 करना।`,
        `To control the train independently of the Loco Pilot / लोको पायलट से 􀝂वतं􀞚 􀞵प से ट􀛍े न को
􀟁नयं􀟁􀞚त करना।`
      ],
      correctAnswer: 1,
      explanation: `KAVACH is only an additional safety aid to the Loco Pilot and the Loco Pilot
shall continue to follow prevalent operating and safety rules`
    },
    {
      id: 4,
      question: `What are the two main sub-systems or components of the KAVACH system?
कवच प􀛎 णाली के दो मु 􀛣य उप-प􀛎 णा􀟂लयँा या घटक 􀛟या ह􀟐 ?`,
      options: [
        "Station Equipment and Control Room Equipment / 􀝂टे शन उपकरण और 􀟁नयं􀞚ण क􀛊 उपकरण",
        "On-Board Equipment and Track Side Equipment / ऑन-बोड􀛌 उपकरण और टै􀛍 क साइड उपकरण",
        "Loco Equipment and Wagon Equipment / लोको उपकरण और वै गन उपकरण",
        "Signal Equipment and Communication Equipment / िस􀛧नल उपकरण और संचार उपकरण"
      ],
      correctAnswer: 1,
      explanation: `The KAVACH System comprises two main categories: Track side equipment and
On-board equipment (Loco Kavach)`
    },
    {
      id: 5,
      question: `What is the function of Radio Frequency Identification (RFID) tags in the KAVACH system?`,
      options: [
        `To communicate directly with the satellite / सीधे उपग􀛎 ह के साथ संचार करना।`,
        "To provide power to the trackside units / टै􀛍 कसाइड इकाइय􀟌 ा को िबजली प􀛎 दान करना।",
        `To transfer track information and location data to the on-board computer / ऑन-बोड􀛌 कं 􀜕यू टर
को टै􀛍 क जानकारी और 􀝂थान डे टा 􀝂थानां त􀟀रत करना।`,
        "To physically stop the train in an emergency / आपात 􀟄􀝂थ􀟁त म􀟌 ट􀛍े न को भौ􀟁तक 􀞵प से रोकना।"
      ],
      correctAnswer: 2,
      explanation: `RFID tags are fastened to track sleepers and they transfer track information
and location data to the on-board KAVACH computer`
    },
    {
      id: 6,
      question: `Where is the Stationary Kavach Unit typically located?
􀝂टे शनरी कवच यू 􀟁नट आमतौर पर कहँा 􀟄􀝂थत होती है ?`,
      options: [
        "In the Station Master's office / 􀝂टे शन मा􀝂टर के काया􀛌 लय म􀟌 ।",
        "At the base of the communication tower / संचार टॉवर के आधार पर।",
        "In the Relay Room or Electronic Interlocking Room / 􀟀रले 􀞵म या इले 􀛜ट􀛍 ॉ􀟁नक इंटरलॉ􀟀कं ग 􀞵म म􀟌 ।",
        "Inside the locomotive cab / लोकोमो􀟁टव कै ब के अंदर।"
      ],
      correctAnswer: 2,
      explanation:`The Stationary Kavach Unit is located in the Relay Room/Electronic Interlocking
Room`
    },
    {
      id: 7,
      question: `7. What is the Driver Machine Interface (DMI) in the context of KAVACH?
कवच के संदभ􀛌 म􀟌 ड􀛍 ाइवर मशीन इंटरफे स (DMI) 􀛟या है ?`,
      options: [
        `The physical brake handle used by the Loco Pilot / लोको पायलट 􀞥ारा उपयोग 􀟁कया जाने वाला
भौ􀟁तक ब􀛎 े क ह􀟐 डल।`,
        `The radio used for communication with the Station Master / 􀝂टे शन मा􀝂टर के साथ संचार के 􀟂लए
उपयोग 􀟁कया जाने वाला रे 􀟁डयो।`,
        `A display panel in the locomotive cab providing real-time information / लोकोमो􀟁टव कै ब म􀟌 एक
􀟁ड􀝂􀜕ले पै नल जो वा􀝂त􀟁वक समय क􀟆 जानकारी प􀛎 दान करता है ।`,
        "The main computer of the locomotive / लोकोमो􀟁टव का मु 􀛣य कं 􀜕यू टर।"
      ],
      correctAnswer: 2,
      explanation: `The Driver Machine Interface (DMI) is a display panel in the locomotive cab that
provides real-time information about track conditions, movement authority, and signal
aspects`
    },
    {
      id: 8,
      question: `What is the function of the Brake Interface Unit (BIU)?
ब􀛎 े क इंटरफे स यू 􀟁नट (BIU) का 􀛟या काय􀛌 है ?`,
      options: [
        `It allows the Guard to apply brakes from the brake van / यह गाड􀛌 को ब􀛎 े क वै न से ब􀛎 े क लगाने क􀟆
अनु म􀟁त दे ता है ।`,
        `It executes the brake commands from the Onboard Vital Computer automatically / यह
ऑनबोड􀛌 वाइटल कं 􀜕यू टर से ब􀛎 े क कमांड को 􀝂वचा􀟂लत 􀞵प से 􀟁न􀝁पा􀟁दत करता है ।`,
        `It indicates the health of the train's braking system / यह ट􀛍े न क􀟆 ब􀛎 े 􀟀कं ग प􀛎 णाली के 􀝂वा􀝂􀜆य को
इंिगत करता है ।`,
        `It is an interface for manual brake application by the Loco Pilot / यह लोको पायलट 􀞥ारा मै नु अल
ब􀛎 े क लगाने के 􀟂लए एक इंटरफे स है ।`,
      ],
      correctAnswer: 1,
      explanation: `The Brake Interface Unit (BIU) executes the brake commanded by the Onboard
Vital Computer automatically when the Loco Pilot is not controlling the speed as required`
    },
    {
      id: 9,
      question: `For what purpose is the Key Management System (KMS) used in KAVACH?
कवच म􀟌 कुं जी प􀛎 बंधन प􀛎 णाली (KMS) का उपयोग 􀟁कस उ􀞝े 􀝀य के 􀟂लए 􀟁कया जाता है ?`,
      options: [
        `To manage the physical keys of the locomotive / लोकोमो􀟁टव क􀟆 भौ􀟁तक चािबय􀟌 ा का प􀛎 बं धन करने
के 􀟂लए।`,
        `To ensure secure exchange of Movement Authorities between Stationary and Onboard
systems / 􀝂टे शनरी और ऑनबोड􀛌 प􀛎 णा􀟂लय􀟌 ा के बीच मू वम􀟌 ट अथॉ􀟀रटीज के सु रि􀛊त आदान-प􀛎 दान को सु 􀟁न􀟄􀝀चत
करने के 􀟂लए।`,
        `To manage the keys for the relay room / 􀟀रले 􀞵म के 􀟂लए चािबय􀟌 ा का प􀛎 बं धन करने के 􀟂लए।`,
        `To provide the Station Master with a security key for the SM-OCIP / SM-OCIP के 􀟂लए 􀝂टे शन
मा􀝂टर को एक सु र􀛊ा कुं जी प􀛎 दान करने के 􀟂लए।`,
      ],
      correctAnswer: 1,
      explanation: `The Key Management System (KMS) ensures a secure exchange of Movement
Authorities between Stationary Kavach and Onboard Kavach systems`
    },
    {
      id: 10,
      question: `What is "Movement Authority" (MA) in the KAVACH system?
कवच प􀛎 णाली म􀟌 "मू वम􀟌 ट अथॉ􀟀रटी" (MA) 􀛟या है ?`,  
      options: [
        `The maximum speed a train is allowed to travel at / वह अ􀟁धकतम ग􀟁त 􀟂जस पर एक ट􀛍े न को या􀞚ा
करने क􀟆 अनु म􀟁त है ।`,
        `The distance up to which the train is permitted to travel safely / वह 􀞲री 􀟂जस तक ट􀛍े न को
सु रि􀛊त 􀞵प से या􀞚ा करने क􀟆 अनु म􀟁त है ।`,
        `The permission given by the Station Master to start the train / 􀝂टे शन मा􀝂टर 􀞥ारा ट􀛍े न शु 􀞵 करने
के 􀟂लए दी गई अनु म􀟁त।`,
        `The authority to pass a signal at 'ON' / 'ऑन' पर एक िस􀛧नल को पार करने का अ􀟁धकार।`,
      ],
      correctAnswer: 1,
      explanation: `Movement Authority (MA) is defined as the distance up to which the train is
permitted to travel safely`
    },
    {
      id: 11,
      question: `Where are the operating instructions for the Station Master Operation Cum Indication
Panel (SM-OCIP) to be incorporated?`, 
options: [
        `In the General & Subsidiary Rules (G&SR) / सामा􀜎य और सहायक 􀟁नयम􀟌 ा (G&SR) म􀟌 ।`,
        `In the Accident Manual / 􀞱घ􀛌 टना मै नु अल म􀟌 ।`,  
        `In Appendix-C of the Station Working Rules (SWR) / 􀝂टे शन सं चालन 􀟁नयम􀟌 ा (SWR) के प􀟀रिश􀞨-सी
म􀟌 ।`,
        `In the Loco Pilot's handbook / लोको पायलट क􀟆 ह􀟐 डबु क म􀟌 ।`,
      ],
      correctAnswer: 2,
      explanation: `The system of working and operations for the SM-OCIP shall be incorporated in
Appendix-C of Station Working Rules (SWR) of the stations equipped with Kavach`
    },
    {
      id: 12,
      question: `How can a Station Master perform any operation on the SM-OCIP?
एक 􀝂टे शन मा􀝂टर SM-OCIP पर कोई भी ऑपरे शन कै से कर सकता है ?
`, options: [
        `By pressing any button on the panel / पै नल पर कोई भी बटन दबाकर।`,
        `Only when the SM's key is inserted and turned to the 'IN' position / के वल जब SM क􀟆 चाबी
डाली जाती है और 'IN' 􀟄􀝂थ􀟁त म􀟌 घु माई जाती है ।`,
        `After receiving a private number from the Controller / कं ट􀛍 ोलर से एक 􀟁नजी नंबर प􀛎 ा􀞦 करने के
बाद।`,
        `After the panel shows 'HEALTH OK' / पै नल 'HEALTH OK' 􀟁दखाने के बाद।`,
      ],
      correctAnswer: 1,
      explanation: `All operations on the SM-OCIP can be performed only when the SM's key is
inserted and turned to the 'IN' position`
    },
    {
      id: 13,
      question: `What is the indication on the SM-OCIP when the Stationary Kavach is unhealthy? 
जब 􀝂टे शनरी कवच अ􀝂व􀝂थ होता है तो SM-OCIP पर 􀛟या संके त होता है ?  
`, options: [
        `A solid GREEN 'HEALTH OK' LED / एक ठोस हरा 'HEALTH OK' LED।`,
        `A blinking RED 'SOS' LED / एक चमकता 􀞶आ लाल 'SOS' LED।`,
        `A solid RED 'HEALTH FAIL' LED / एक ठोस लाल 'HEALTH FAIL' LED।`,
        `A blinking YELLOW 'TSR-ACK' LED / एक चमकता 􀞶आ पीला 'TSR-ACK' LED।`,
      ],
      correctAnswer: 2,
      explanation: `A solid RED 'HEALTH FAIL' LED indicates that the Station Kavach is Unhealthy`
    },
    {
      id: 14,
      question: `How does a Station Master manually generate an SOS message?
एक 􀝂टे शन मा􀝂टर मै 􀜎यु अल 􀞵प से SOS संदे श कै से उ􀜀प􀜍न करता है ?  
`, options: [
        `By pressing the RED 'SOS' button alone / के वल लाल 'SOS' बटन दबाकर।`,
        `By pressing the 'SOS' and 'Common' buttons simultaneously / 'SOS' और 'कॉमन' बटन एक साथ
दबाकर।`,
        `By pressing the 'SOS' and 'Cancel' buttons simultaneously / 'SOS' और 'क􀟐 सल' बटन एक साथ
दबाकर।`,
        `By turning the SM Key to 'OFF' position / SM कुं जी को 'OFF' 􀟄􀝂थ􀟁त म􀟌 घु माकर।`,
      ],
      correctAnswer: 1,
      explanation: `The Station Master shall press the 'SOS' and 'Common' buttons simultaneously
to generate the SOS`
    },
    {
      id: 15,
      question: `When a manual SOS is generated from a station, within what radius will brakes be applied
      automatically to functional KAVACH locos?
      जब 􀟁कसी 􀝂टे शन से मै 􀜎यु अल SOS उ􀜀प􀜍न होता है , तो 􀟁कस दायरे के भीतर काया􀛌 􀜂मक कवच लोको पर 􀝂वचा􀟂लत
      􀞵प से ब􀛎 े क लगाए जाएंगे ?`, 
      options: [
        `1000m / १००० मीटर`,
        `2000m / २००० मीटर`,
        `3000m / ३००० मीटर`,
        `5000m / ५००० मीटर`,
      ],
      correctAnswer: 2,
      explanation: `The generated SOS will cause brakes to be applied automatically to
Onboard/Loco Kavach within a radius of 3000m from the SOS generating Station Kavach15`
    },
    {
      id: 16,
      question: `After an SOS has brought a train to a stop, what must the Loco Pilot do to release the
brakes?
SOS 􀞥ारा ट􀛍े न को रोकने के बाद, ब􀛎 े क छोड़ने के 􀟂लए लोको पायलट को 􀛟या करना चा􀟁हए?`, 
      options: [
        `Wait for the SOS to be cancelled / SOS के र􀞝 होने क􀟆 प􀛎 ती􀛊ा कर􀟌 ।`,
        `Acknowledge the SOS / SOS को 􀝂वीकार कर􀟌 ।`,
        `Reverse the train by 10 metres / ट􀛍े न को 10 मीटर पीछे कर􀟌 ।`,
        `Contact the Station Master for permission / अनु म􀟁त के 􀟂लए 􀝂टे शन मा􀝂टर से संपक􀛌 कर􀟌 ।`,
      ],
      correctAnswer: 1,
      explanation: `After the train is brought to a STOP DEAD (STANDSTILL), the Loco Pilot shall
acknowledge the SOS, for releasing the brakes`
    },
    {
      id: 17,
      question: `How does a Station Master cancel an SOS message that was previously generated?
एक 􀝂टे शन मा􀝂टर पहले से उ􀜀प􀜍न SOS संदे श को कै से र􀞝 करता है ?
`, options: [
        `By pressing the 'Cancel' button alone / के वल 'क􀟐 सल' बटन दबाकर।`,
        `By turning the SM Key to the 'OFF' position / SM कुं जी को 'OFF' 􀟄􀝂थ􀟁त म􀟌 घु माकर।`,
        `By pressing the 'Cancel' and 'Common' buttons simultaneously / 'क􀟐 सल' और 'कॉमन' बटन एक
साथ दबाकर।`,
        `The SOS cancels automatically after 3 minutes / SOS 3 िमनट के बाद 􀝂वचा􀟂लत 􀞵प से र􀞝 हो जाता
है ।`,
      ],
      correctAnswer: 2,
      explanation: `The SM shall cancel the SOS message by pressing the 'Cancel' and 'Common'
buttons simultaneously`
    },
    {
      id: 18,
      question: `In which operational mode does the Onboard KAVACH unit start when the loco is first
energized?
लोको को पहली बार ऊिज􀛌 त करने पर ऑनबोड􀛌 कवच यू 􀟁नट 􀟁कस प􀟀रचालन मोड म􀟌 शु 􀞵 होती है ?`,
      options: [
        `Staff Responsible Mode (SR) / 􀝂टाफ 􀟀र􀝂पॉ􀟃􀜍सबल मोड (SR)`,
        `Full Supervision Mode (FS) / फु ल सु पर􀟁वजन मोड (FS)`,
        `Standby Mode (SB) / 􀝂ट􀟐 डबाय मोड (SB)`,
        `On Sight Mode (OS) / ऑन साइट मोड (OS)`,
      ],
      correctAnswer: 2,
      explanation: `When the loco is energized and the Kavach unit is switched on, it comes into
Standby (SB) mode, which is the default mode`
    },
    {
      id: 19,
      question: `In Standby (SB) mode, what movement is supervised by KAVACH?
􀝂ट􀟐 डबाय (SB) मोड म􀟌 , कवच 􀞥ारा 􀟁कस मू वम􀟌 ट का पय􀛌 वे 􀛊ण 􀟁कया जाता है ?`,
      options: [
        `A maximum speed of 10 km/h / 10 􀟁कमी/घंटा क􀟆 अ􀟁धकतम ग􀟁त।`,
        `Standstill (STOP DEAD) only / के वल ठहराव (􀝂टॉप डे ड)।`,
        `The maximum permissible speed of the loco / लोको क􀟆 अ􀟁धकतम अनु मे य ग􀟁त।`,
        `Reverse movement only / के वल 􀟀रवस􀛌 मू वम􀟌 ट।`,
      ],
      correctAnswer: 1,
      explanation: `In Standby (SB) mode, the train is supervised for STOP DEAD (STANDSTILL) only.
If any movement is detected, it applies Emergency Brake`
    },
    {
      id: 20,
      question: `Which mode must be selected by the Loco Pilot to start the train from a standstill?
ठहराव से ट􀛍े न शु 􀞵 करने के 􀟂लए लोको पायलट को कौन सा मोड चु नना होगा?
`, options: [  
        `Full Supervision Mode (FS) / फु ल सु पर􀟁वजन मोड (FS)`,
        `Staff Responsible Mode (SR) / 􀝂टाफ 􀟀र􀝂पॉ􀟃􀜍सबल मोड (SR)`,
        `On Sight Mode (OS) / ऑन साइट मोड (OS)`,
        `Trip Mode (TR) / 􀟁ट􀛍 प मोड (TR)`,
      ],
      correctAnswer: 1,
      explanation: `The Staff Responsible Mode (SR) needs to be selected by the LP in order to
start the train`
    },
    {
      id: 21,
      question: `In Staff Responsible (SR) mode, KAVACH only supervises what speed?
􀝂टाफ 􀟀र􀝂पॉ􀟃􀜍सबल (SR) मोड म􀟌 , कवच के वल 􀟁कस ग􀟁त का पय􀛌 वे 􀛊ण करता है ?
`, options: [
        `A ceiling speed (Maximum Permissible Speed of the Loco) / एक सी􀟁लंग ग􀟁त (लोको क􀟆
अ􀟁धकतम अनु मे य ग􀟁त)।`,
        `A fixed speed of 30 km/h / 30 􀟁कमी/घंटा क􀟆 एक 􀟁न􀟄􀝀चत ग􀟁त।`,
        `The speed dictated by the signal aspect / िस􀛧नल पहलू 􀞥ारा 􀟁नधा􀛌 􀟀रत ग􀟁त।`,
        `The speed restrictions of turnouts / टन􀛌 आउट क􀟆 ग􀟁त प􀛎 􀟁तबंध।`,
      ],
      correctAnswer: 0,
      explanation: `In Staff Responsible (SR) mode, Kavach will only supervise a ceiling speed (MPS
of Loco)`
    },
    {
      id: 22,
      question: `How does the Onboard KAVACH automatically transition from Staff Responsible (SR)  
mode to On Sight (OS) mode?
ऑनबोड􀛌 कवच 􀝂वचा􀟂लत 􀞵प से 􀝂टाफ 􀟀र􀝂पॉ􀟃􀜍सबल (SR) मोड से ऑन साइट (OS) मोड म􀟌 कै से प􀟀रव􀟀त􀛌 त होता
है ?`, options: [
        `After passing one Stop signal in the 'OFF' position / 'ऑफ' 􀟄􀝂थ􀟁त म􀟌 एक 􀝂टॉप िस􀛧नल पार करने के
बाद।`,
        `After receiving an SOS message / एक SOS संदे श प􀛎 ा􀞦 करने के बाद।`,
        `After passing two RFID tags and establishing communication from Stationary Kavach / दो
RFID टै ग पार करने और 􀝂टे शनरी कवच से संचार 􀝂था􀟁पत करने के बाद।`,
        `After the Loco Pilot presses the 'OS' button / लोको पायलट 􀞥ारा 'OS' बटन दबाने के बाद।`,
      ],
      correctAnswer: 2,
      explanation: `After passing two RFID tags (for getting direction) and communication from
stationary Kavach, the on board Kavach will automatically enter into 'On sight' mode from 'SR'
mode`
    },
    {
      id: 23,
      question: `The Onboard KAVACH enters Full Supervision (FS) mode automatically only after the train
has:`, options: [
        `Reached its maximum booked speed / अपनी अ􀟁धकतम बु क क􀟆 गई ग􀟁त पर प􀞶ंच गई हो।`,
        `Crossed at least one stop signal in the OFF condition after entering On Sight mode / ऑन
साइट मोड म􀟌 प􀛎 वे श करने के बाद ऑफ 􀟄􀝂थ􀟁त म􀟌 कम से कम एक 􀝂टॉप िस􀛧नल पार कर 􀟂लया हो।`,
        `Received a specific command from the Station Master / 􀝂टे शन मा􀝂टर से एक 􀟁विश􀞨 कमांड प􀛎 ा􀞦
कर 􀟂लया हो।`,
        `Travelled for at least 3 kilometres in KAVACH territory / कवच 􀛊े 􀞚 म􀟌 कम से कम 3 􀟁कलोमीटर क􀟆
या􀞚ा कर ली हो।`,
      ],
      correctAnswer: 1,
      explanation: `A necessary condition for entering Full Supervision mode is that after coming to
On Sight mode, the train has crossed at least one stop signal in OFF condition`
    },
    {
      id: 24,
      question: `Into which mode does KAVACH automatically transition from Full Supervision (FS) mode if
radio communication is lost for 30 seconds in an Absolute Block Section?`, 
options: [
        `Staff Responsible Mode (SR) / 􀝂टाफ 􀟀र􀝂पॉ􀟃􀜍सबल मोड (SR)`,
        `On Sight Mode (OS) / ऑन साइट मोड (OS)`,
        `Limited Supervision Mode (LS) / 􀟂लिमटे ड सु पर􀟁वजन मोड (LS)`,
        `Trip Mode (TR) / 􀟁ट􀛍 प मोड (TR)`,
      ],
      correctAnswer: 2,
      explanation: `KAVACH will automatically enter Limited Supervision (LS) mode from FS mode
when radio packets are not available/received for 30 seconds (configurable) for an Absolute
Block System`
    },
    {
      id: 25,
      question: `What action will cause the Onboard KAVACH to enter Trip (TR) mode?
कौन सी कार􀛌 वाई ऑनबोड􀛌 कवच को 􀟁ट􀛍 प (TR) मोड म􀟌 प􀛎 वे श करने का कारण बने गी?`, options: [
        `Exceeding the sectional speed by 10% / अनु भागीय ग􀟁त को 10% से अ􀟁धक करना।`,
        `Passing a stop signal at 'ON' when in FS/OS mode / FS/OS मोड म􀟌 रहते 􀞶ए 'ऑन' पर एक 􀝂टॉप
िस􀛧नल पार करना।`,
        `Loss of communication with the station / 􀝂टे शन के साथ संचार का खो जाना।`,
        `The Loco Pilot applying emergency brakes / लोको पायलट 􀞥ारा आपातकालीन ब􀛎 े क लगाना।`,
      ],
      correctAnswer: 1,
      explanation: `When Loco Kavach is in FS/OS mode and the train passes a stop signal at 'ON'
or end of authority, Kavach will automatically enter into trip mode`
    },
    {
      id: 26,
      question: `How does a Loco Pilot come out of Trip (TR) mode?
एक लोको पायलट 􀟁ट􀛍 प (TR) मोड से बाहर कै से आता है ?`, 
options: [
        `It resets automatically after 60 seconds / यह 60 से कं ड के बाद 􀝂वचा􀟂लत 􀞵प से रीसे ट हो जाता है ।`,
        `The Station Master must cancel it from the SM-OCIP / 􀝂टे शन मा􀝂टर को इसे SM-OCIP से र􀞝
करना होगा।`,
        `The LP shall manually select Post Trip (PT) Mode when the train is at a standstill / एलपी को
ट􀛍े न के ठहराव पर मै 􀜎यु अल 􀞵प से पो􀝂ट 􀟁ट􀛍 प (PT) मोड का चयन करना होगा।`,
        `By reversing the train slightly / ट􀛍े न को थोड़ा पीछे करके ।`,
      ],
      correctAnswer: 2,
      explanation: `The Loco Pilot shall manually select Post Trip Mode (PT) in order to come out of
Trip Mode, which can only be done when the train is at STOP DEAD (STANDSTILL)`
    },
    {
      id: 27,
      question: `What is the default supervised speed in Reverse (RV) mode?
􀟀रवस􀛌 (RV) मोड म􀟌 􀟁डफ़ॉ􀜲ट पय􀛌 वे ि􀛊त ग􀟁त 􀛟या है ?`, 
options: [
        `15 kmph / १५ 􀟁कमी प􀛎 􀟁त घंटा`,
        `25 kmph / २५ 􀟁कमी प􀛎 􀟁त घंटा`,
        `30 kmph / ३० 􀟁कमी प􀛎 􀟁त घंटा`,
        `40 kmph / ४० 􀟁कमी प􀛎 􀟁त घंटा`,
      ],
      correctAnswer: 1,
      explanation: `In Reverse (RV) mode, the Loco Kavach unit shall supervise train movements
against a ceiling speed (Default 25 kmph)`
    },
    {
      id: 28,
      question: `Which mode is defined to manage the loco KAVACH unit of a slave engine in a multipleunit
consist?`, options: [
        `Shunt Mode (SH) / शंट मोड (SH)`,
        `Non-Leading Mode (NL) / नॉन-ली􀟀डंग मोड (NL)`,
        `Isolation Mode (IS) / आइसोले शन मोड (IS)`,
        `Staff Responsible Mode (SR) / 􀝂टाफ 􀟀र􀝂पॉ􀟃􀜍सबल मोड (SR)`,
      ],
      correctAnswer: 1,
      explanation: `The Non-leading mode (NL) is defined to manage the loco Kavach unit of a
slave engine that is either electrically coupled or not to the leading engine`
    },
    {
      id: 29,
      question: `What is the default supervised speed in Shunt (SH) mode?
शंट (SH) मोड म􀟌 􀟁डफ़ॉ􀜲ट पय􀛌 वे ि􀛊त ग􀟁त 􀛟या है ?`, options: [
        `10 kmph / १० 􀟁कमी प􀛎 􀟁त घंटा`,
        `15 kmph / १५ 􀟁कमी प􀛎 􀟁त घंटा`,
        `25 kmph / २५ 􀟁कमी प􀛎 􀟁त घंटा`,
        `No speed supervision / कोई ग􀟁त पय􀛌 वे 􀛊ण नहीं।`,
      ],
      correctAnswer: 1,
      explanation: `KAVACH supervises Shunt mode speed, which is by default 15 kmph, within the
station section`
    },
    {
      id: 30,
      question: `In which situation should KAVACH be isolated by the Loco Pilot?
􀟁कस 􀟄􀝂थ􀟁त म􀟌 लोको पायलट 􀞥ारा कवच को आइसोले ट 􀟁कया जाना चा􀟁हए?`, options: [
        `During normal run in an automatic signalling section / एक 􀝂वचा􀟂लत िस􀛧न􀟁लंग से 􀛝शन म􀟌 सामा􀜎य
रन के दौरान।`,
        `When entering a loop line for a scheduled stop / एक 􀟁नधा􀛌 􀟀रत 􀝂टॉप के 􀟂लए एक लू प लाइन म􀟌 प􀛎 वे श
करते समय।`,
        `For shunting beyond the station section / 􀝂टे शन से 􀛝शन से परे शं􀟀टं ग के 􀟂लए।`,
        `When the train is running perfectly on time / जब ट􀛍े न िब􀜲कु ल समय पर चल रही हो।`,
      ],
      correctAnswer: 2,
      explanation: `KAVACH should be isolated for dispatching a train into the wrong line in a
double line section, for shunting beyond the station section, and during Non-Interlocked (NI)
working`
    },
    {
      id: 31,
      question: `Does the absence or damage of RFID tags cause conventional line-side signal failures?   
􀛟या RFID टै ग क􀟆 अनु प􀟄􀝂थ􀟁त या 􀛊􀟁त पारंप􀟀रक लाइन-साइड िस􀛧नल 􀟁वफलताआ􀟌 का कारण बनती है ?`, options: [
        `Yes, it causes the signal to show a red aspect / हँा, यह िस􀛧नल को लाल पहलू 􀟁दखाने का कारण
बनता है ।`,
        `Yes, it causes the signal to go blank / हँा, यह िस􀛧नल को 􀜢ल􀟐 क करने का कारण बनता है ।`,
        `No, it does not cause signal failures / नहीं, यह िस􀛧नल 􀟁वफलताआ􀟌 का कारण नहीं बनता है ।`,
        `Only if two consecutive tags are damaged / के वल तभी जब लगातार दो टै ग 􀛊􀟁तग􀛎 􀝂त ह􀟌 ा।`,
      ],
      correctAnswer: 2,
      explanation: `RFID tags do not control conventional Line side Railway Signals. Hence, absence
or damage or deterioration of RFID tags does not cause Signal failures`
    },
    {
      id: 32,
      question: `If a Station Master wrongly generates an SOS, how is normalcy restored?
य􀟁द कोई 􀝂टे शन मा􀝂टर गलती से SOS उ􀜀प􀜍न करता है , तो सामा􀜎य 􀟄􀝂थ􀟁त कै से बहाल क􀟆 जाती है ?
`, options: [
        `It restores automatically after 5 minutes / यह 5 िमनट के बाद 􀝂वचा􀟂लत 􀞵प से बहाल हो जाता है ।`,
        `The Loco Pilot must acknowledge and cancel it / लोको पायलट को इसे 􀝂वीकार और र􀞝 करना
होगा।`,
        `The SM has to cancel it by pressing CANCEL and COMMON buttons together / SM को
CANCEL और COMMON बटन एक साथ दबाकर इसे र􀞝 करना होगा।`,
        `The system has to be restarted by the S&T staff / िस􀝂टम को S&T 􀝂टाफ 􀞥ारा पु नरारंभ करना होगा।`,
      ],
      correctAnswer: 2,
      explanation: `The SM has to cancel the wrongly generated SOS by pressing the CANCEL and
COMMON buttons on the SM-OCIP together with the SM's Key in the "IN" position`
    },
    {
      id: 33,
      question: `Protection against Signal Passing At Danger (SPAD) is an example of which category of
KAVACH protection?
िस􀛧नल पा􀟀संग एट ड􀟌 जर (SPAD) के 􀟃खलाफ सु र􀛊ा कवच सु र􀛊ा क􀟆 􀟁कस 􀞧े णी का एक उदाहरण है ?`, options: [
        `Category (I): Protection against inadequate braking by Loco Pilot in his own Loco / 􀞧े णी (I):
अपने 􀝂वयं के लोको म􀟌 लोको पायलट 􀞥ारा अपया􀛌 􀞦 ब􀛎 े 􀟀कं ग के 􀟃खलाफ सु र􀛊ा।`,
        `Category (II): Protection against unusuals caused by external factors / 􀞧े णी (II): बाहरी कारक􀟌 ा
के कारण होने वाली असामा􀜎यताआ􀟌 के 􀟃खलाफ सु र􀛊ा।`,
        `Category (III): Protection against communication failure / 􀞧े णी (III): संचार 􀟁वफलता के 􀟃खलाफ
सु र􀛊ा।`,
        `Not a protected feature / एक संरि􀛊त सु 􀟁वधा नहीं है ।`,
      ],
      correctAnswer: 0,
      explanation:`Protection against Collisions due to SPAD is a Category (I) protection, for which
functional Onboard Kavach in the defaulting loco is adequate and the protection is
guaranteed`
    },
    {
      id: 34,
      question: `Is the protection level against hitting another derailed train guaranteed by KAVACH?
􀛟या कवच 􀞥ारा 􀟁कसी अ􀜎य पटरी से उतरी ट􀛍े न से टकराने के 􀟃खलाफ सु र􀛊ा 􀝂तर क􀟆 गारंटी है ?`, options: [
        `Yes, it is always guaranteed / हँा, यह हमे शा गारं टीकृ त है ।`,
        `Yes, but only if both trains have KAVACH / हँा, ले 􀟁कन के वल तभी जब दोन􀟌 ा ट􀛍े न􀟌 ा म􀟌 कवच हो।`,
        `No, such protections and their level of protection are not guaranteed / नहीं, ऐसी सु र􀛊ा और
उनके सु र􀛊ा 􀝂तर क􀟆 गारंटी नहीं है ।`,
        `Yes, but only in automatic signalling sections / हँा, ले 􀟁कन के वल 􀝂वचा􀟂लत िस􀛧न􀟁लं ग खं ड􀟌 ा म􀟌 ।`,
      ],
      correctAnswer: 2,
      explanation: `Protection against hitting another derailed train is a Category (II) protection,
and such protections and their level of protection are not guaranteed`
    },
    {
      id: 35,
      question: `How often do the Station Kavach and Loco Kavach units communicate with each other?
􀝂टे शन कवच और लोको कवच इकाइयँा एक 􀞲सरे के साथ 􀟁कतनी बार सं चार करती ह􀟐 ?
`, options: [
        `Every second / हर से कं ड`,
        `Every 2 seconds / हर 2 से कं ड`,
        `Every 5 seconds / हर 5 से कं ड`,
        `Every 10 seconds / हर 10 से कं ड`,
      ],
      correctAnswer: 1,
      explanation: `Station Kavach and Loco Kavach units communicate with each other for every 2
seconds`
    },
    {
      id: 36,
      question: `The Dynamic Speed Profile used by KAVACH depends on the braking characteristics of
the train and what other factor?
कवच 􀞥ारा उपयोग 􀟁कया जाने वाला डायने िमक 􀝂पीड प􀛎 ोफाइल ट􀛍े न क􀟆 ब􀛎 े 􀟀कं ग 􀟁वशे षताआ􀟌 और 􀟁कस अ􀜎य कारक
पर 􀟁नभ􀛌 र करता है ?`, options: [
        `The number of coaches / कोच􀟌 ा क􀟆 सं 􀛣या।`,
        `The train length / ट􀛍े न क􀟆 लंबाई।`,
        `The type of locomotive (Diesel/Electric) / लोकोमो􀟁टव का प􀛎 कार (डीजल/इले 􀟅􀛜ट􀛍 क)।`,
        `The time of day (Day/Night) / 􀟁दन का समय (􀟁दन/रात)।`,
      ],
      correctAnswer: 1,
      explanation: `The Dynamic Speed Profile curve depends on the braking characteristics of the
train and train length`
    },
    {
      id: 37,
      question: `What is the timeout period for radio communication failure in an Automatic Block Section
before KAVACH takes action?
कवच 􀞥ारा कार􀛌 वाई करने से पहले एक 􀝂वचा􀟂लत 􀜢लॉक से 􀛝शन म􀟌 रे 􀟁डयो संचार 􀟁वफलता के 􀟂लए टाइमआउट
अव􀟁ध 􀛟या है ?`, options: [
        `5 seconds / ५ से कं ड`,
        `10 seconds / १० से कं ड`,
        `20 seconds / २० से कं ड`,
        `30 seconds / ३० से कं ड`,
      ],
      correctAnswer: 1,
      explanation: `Timeout due to radio communication failure is deemed to occur when 10
seconds (configurable) have passed for an Automatic Block Section since the last packet was
received`
    },
    {
      id: 38,
      question: `How are RFID tags fixed to PSC Sleepers?
RFID टै ग PSC 􀝂लीपर􀟌 ा से कै से जु ड़े होते ह􀟐 ?`, options: [
        `By drilling holes and using bolts / छे द करके और बो􀜲ट का उपयोग करके ।`,
        `By using a strong adhesive / एक मजबू त िचपकने वाले का उपयोग करके ।`,
        `Through clamps only / के वल 􀛙ल􀟐 प के मा􀜉यम से ।`,
        `By welding them to the track / उ􀜍ह􀟌 टै􀛍 क पर वे 􀟃􀜲डं ग करके ।`,
      ],
      correctAnswer: 2,
      explanation: `No holes shall be drilled in the Sleepers and the arrangement of fixing must be
through clamps only`
    },
    {
      id: 39,
      question: `KAVACH RFID tags are designed to be reliable for train speeds up to what limit?
कवच RFID टै ग 􀟁कस सीमा तक क􀟆 ट􀛍े न ग􀟁त के 􀟂लए 􀟁व􀝀वसनीय होने के 􀟂लए 􀟁डज़ाइन 􀟁कए गए ह􀟐 ?
`, options: [
        `130 kmph / १३० 􀟁कमी प􀛎 􀟁त घंटा`,
        `160 kmph / १६० 􀟁कमी प􀛎 􀟁त घंटा`,
        `200 kmph / २०० 􀟁कमी प􀛎 􀟁त घंटा`,
        `250 kmph / २५० 􀟁कमी प􀛎 􀟁त घंटा`,
      ],
      correctAnswer: 2,
      explanation: `These RFID tags are suitable for reliable working for train speeds up to 200
kmph`
    },
    {
      id: 40,
      question: `What happens if an RFID tag is submerged in water up to the rail level?
य􀟁द एक RFID टै ग रे ल 􀝂तर तक पानी म􀟌 ड􀞾 ब जाता है तो 􀛟या होता है ?`, options: [
        `It stops working immediately / यह तु रंत काम करना बंद कर दे ता है ।`,
        `It sends an error message to the SM-OCIP / यह SM-OCIP को एक 􀞚ु 􀟁ट संदे श भे जता है ।`,
        `It is able to work normally / यह सामा􀜎य 􀞵प से काम करने म􀟌 स􀛊म है ।`,
        `Its range is reduced by half / इसक􀟆 सीमा आधी हो जाती है ।`,
      ],
      correctAnswer: 2,
      explanation: `These RFID tags are able to work even when submerged in water up to rail
level`
    },
    {
      id: 41,
      question: `What is the "End of Authority" (EoA)?
"अ􀟁धकार का अंत" (EoA) 􀛟या है ?`, options: [
        `The point where the Loco Pilot's duty ends / वह 􀟀बं 􀞱 जहँा लोको पायलट का कत􀛌 􀜼य समा􀞦 होता है ।`,
        `The location up to which the train is permitted to proceed and where the target speed is
zero / वह 􀝂थान जहँा तक ट􀛍े न को आगे बढ़ने क􀟆 अनु म􀟁त है और जहँा ल􀝻य ग􀟁त शू 􀜎य है ।`,
        `The end of the KAVACH-equipped section / कवच-सु सि􀛴जत खंड का अंत।`,
        `The last signal of the station / 􀝂टे शन का अं􀟁तम िस􀛧नल।`,
      ],
      correctAnswer: 1,
      explanation: `The End of Authority (EoA) is the location up to which the train is permitted to
proceed and where the target speed is zero`
    },
    {
      id: 42,
      question: `What is displayed on the first line of the SM-OCIP LCD screen?
SM-OCIP LCD 􀝂क􀛎 􀟆न क􀟆 पहली पं􀟅􀛜त पर 􀛟या प􀛎 द􀟀श􀛌 त होता है ?`, options: [
        `Current date and time / वत􀛌 मान 􀟁दनांक और समय।`,
        `The name of the Station Master on duty / 􀞖ू टी पर मौजू द 􀝂टे शन मा􀝂टर का नाम।`,
        `Station ID, KMS Key Index, and TSR Count / 􀝂टे शन आईडी, KMS कुं जी सू चकांक, और TSR गणना।`,
        `The last SOS message received / प􀛎 ा􀞦 अं􀟁तम SOS संदे श।`,
      ],
      correctAnswer: 2,
      explanation: `Line-1 of the LCD panel displays: ID: (Station ID) KI: (KMS Key Index) T: (TSR
Count)`
    },
    {
      id: 43,
      question: `The audio buzzer on the SM-OCIP will sound when:
SM-OCIP पर ऑ􀟁डयो बजर बजे गा जब:`, options: [
        `The HEALTH FAIL LED is lit / HEALTH FAIL LED जल रही हो।`,
        `An SOS is generated or received / एक SOS उ􀜀प􀜍न या प􀛎 ा􀞦 होता है ।`,
        `The SM Key is turned to the 'IN' position / SM कुं जी को 'IN' 􀟄􀝂थ􀟁त म􀟌 घु माया जाता है ।`,
        `A train enters the station limits / एक ट􀛍े न 􀝂टे शन सीमा म􀟌 प􀛎 वे श करती है ।`,
      ],
      correctAnswer: 1,
      explanation: `The audio buzzer will sound along with the SOS LED Red blinking when a
manual SOS is generated / received`
    },
    {
      id: 44,
      question: `After an SOS brings a train to a stop, KAVACH supervises the train speed at 30 kmph until
what point?
SOS 􀞥ारा ट􀛍े न को रोकने के बाद, कवच ट􀛍े न क􀟆 ग􀟁त को 30 􀟁कमी प􀛎 􀟁त घंटे पर कब तक पय􀛌 वे 􀛊ण करता है ?`, options: [
        `For a distance of 1 kilometre / 1 􀟁कलोमीटर क􀟆 􀞲री के 􀟂लए।`,
        `Until the train passes the originating location of the "SOS" message / जब तक ट􀛍े न "SOS"
संदे श के मू ल 􀝂थान को पार नहीं कर ले ती।`,
        `Until the train reaches the next station / जब तक ट􀛍े न अगले 􀝂टे शन पर नहीं प􀞶ंच जाती।`,
        `For a duration of 5 minutes / 5 िमनट क􀟆 अव􀟁ध के 􀟂लए।`,
      ],
      correctAnswer: 1,
      explanation: `After acknowledging the SOS, the train speed shall be supervised by KAVACH
for 30kmph (configurable) till the train passes the originating Location of the "SOS"
message`
    },
    {
      id: 45,
      question: `Which of these is a condition for the speed of an SOS-affected train to be restored to
normal?
इनम􀟌 से कौन सी एक SOS-प􀛎 भा􀟁वत ट􀛍े न क􀟆 ग􀟁त को सामा􀜎य करने के 􀟂लए एक शत􀛌 है ?`, options: [
        `The Loco Pilot presses the 'SR' button / लोको पायलट 'SR' बटन दबाता है ।`,
        `The train waits for 10 minutes / ट􀛍े न 10 िमनट तक प􀛎 ती􀛊ा करती है ।`,
        `The SOS message is cancelled by the source / SOS संदे श स􀛏 ोत 􀞥ारा र􀞝 कर 􀟁दया जाता है ।`,
        `The train communicates with a non-Kavach loco / ट􀛍े न एक गै र-कवच लोको के साथ संचार करती है ।`,
      ],
      correctAnswer: 2,
      explanation: `The speed of such trains shall be restored only if one of the conditions is
satisfied, one of which is: "SOS message is cancelled by the source`
    },
    {
      id: 46,
      question: `The TSR / Ack button on the SM-OCIP is YELLOW. What is its current function?
SM-OCIP पर TSR / Ack बटन पीला है । इसका वत􀛌 मान काय􀛌 􀛟या है ?`, options: [
        `To generate Temporary Speed Restrictions (TSR) / अ􀝂थायी ग􀟁त प􀛎 􀟁तबंध (TSR) उ􀜀प􀜍न करना।`,
        `To acknowledge display screens and the buzzer / 􀟁ड􀝂􀜕ले 􀝂क􀛎 􀟆न और बजर को 􀝂वीकार करना।`,
        `To communicate with the Loco Pilot / लोको पायलट के साथ संचार करना।`,
        `It is not currently in use / यह वत􀛌 मान म􀟌 उपयोग म􀟌 नहीं है ।`,
      ],
      correctAnswer: 1,
      explanation: `The TSR / Ack button is used to acknowledge the display screen and buzzer. The
TSR functionality is for future use`
    },
    {
      id: 47,
      question: `Which of these is NOT a function of KAVACH in its normal operational modes?
इनम􀟌 से कौन सा कवच का सामा􀜎य प􀟀रचालन मोड म􀟌 एक काय􀛌 नहीं है ?`, options: [
        `Continuous Speed Supervision / 􀟁नरंतर ग􀟁त पय􀛌 वे 􀛊ण।`,
        `Displaying Signal Aspect in the cab / कै ब म􀟌 िस􀛧नल पहलू प􀛎 द􀟀श􀛌 त करना।`,
        `Auto whistling at Level Crossing gates / ले वल क􀛎 ॉ􀟀सं ग फाटक􀟌 ा पर ऑटो-􀟃􀜽ह􀟄􀝂लं ग।`,
        `Automatic routing of trains / ट􀛍े न􀟌 ा का 􀝂वचा􀟂लत 􀞵􀟀टं ग।`,
      ],
      correctAnswer: 3,
      explanation: `While KAVACH supervises the route set by interlocking, it does not perform
automatic routing of trains itself. The other three are listed functions`
    },
    {
      id: 48,
      question: `The On-board Kavach reverts to Staff Responsible (SR) mode from Full Supervision (FS) if:
य􀟁द ऑन-बोड􀛌 कवच फु ल सु पर􀟁वजन (FS) से 􀝂टाफ 􀟀र􀝂पॉ􀟃􀜍सबल (SR) मोड म􀟌 वापस आ जाता है :`, options: [
        `The train runs 10 minutes late / ट􀛍े न 10 िमनट दे र से चलती है ।`,
        `The Loco Pilot applies normal brakes / लोको पायलट सामा􀜎य ब􀛎 े क लगाता है ।`,
        `Three consecutive RFID tags are missed / लगातार तीन RFID टै ग छ􀞾 ट जाते ह􀟐 ।`,
        `The train passes a signal at 'Double Yellow' / ट􀛍े न 'डबल ये लो' पर एक िस􀛧नल पार करती है ।`,
      ],
      correctAnswer: 2,
      explanation: `Onboard Kavach will revert to Staff Responsible (SR) mode if, among other
conditions, three consecutive tags are missed`
    },
    {
      id: 49,
      question: `To come out of Post Trip (PT) mode and start the train, the Loco Pilot must press which
button combination?
पो􀝂ट 􀟁ट􀛍 प (PT) मोड से बाहर आने और ट􀛍े न शु 􀞵 करने के 􀟂लए, लोको पायलट को कौन सा बटन संयोजन दबाना
होगा?`, options: [
        `P_Trip followed by CNFM / P_Trip के बाद CNFM।`,
        `OVRD button followed by CNFM button / OVRD बटन के बाद CNFM बटन।`,
        `SR button followed by CNFM button / SR बटन के बाद CNFM बटन।`,
        `REV button followed by CNFM button / REV बटन के बाद CNFM बटन।`,
      ],
      correctAnswer: 1,
      explanation: `After obtaining necessary authorities post-trip, for the train to start, the LP is
required to press the OVRD button followed by the CNFM button in order to enter OS mode
from PT mode`
    },
    {
      id: 50,
      question: `What is a key feature of the radio communication system in KAVACH?
कवच म􀟌 रे 􀟁डयो संचार प􀛎 णाली क􀟆 एक प􀛎 मु ख 􀟁वशे षता 􀛟या है ?`, options: [
        `It works only in one direction (Station to Loco) / यह के वल एक 􀟁दशा म􀟌 काम करता है (􀝂टे शन से
लोको)।`,
        `It uses a single radio channel for all communications / यह सभी संचार के 􀟂लए एक एकल रे 􀟁डयो
चै नल का उपयोग करता है ।`,
        `It has a dual arrangement with separate antennas, acting as a hot standby / इसम􀟌 अलग-
अलग एंटे ना के साथ एक दोहरी 􀜼यव􀝂था है , जो एक हॉट 􀝂ट􀟐 डबाय के 􀞵प म􀟌 काय􀛌 करती है ।`,
        `It requires a line-of-sight of at least 10 km / इसके 􀟂लए कम से कम 10 􀟁कमी क􀟆 लाइन-ऑफ-साइट
क􀟆 आव􀝀यकता होती है ।`,
      ],
      correctAnswer: 2,
      explanation: `The radio communication channels are in a dual arrangement which are used in
alternate time cycles with a separate cable and antenna for each radio, which also acts as a
hot standby`
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
    if (questionId <= 10) return "Basic Concepts"
    if (questionId <= 20) return "Technical Specifications"
    if (questionId <= 30) return "System Operations"
    if (questionId <= 40) return "Performance & Reliability"
    return "Advanced Features"
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
            <h1 className="lg:text-3xl text-xl font-bold text-gray-800">KAVACH 50 MCQ Quiz</h1>
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
              <h2 className="lg:text-3xl text-xl font-bold text-center mb-6 text-gray-800">KAVACH Quiz Summary & Overview</h2>
              
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

export default Kavach