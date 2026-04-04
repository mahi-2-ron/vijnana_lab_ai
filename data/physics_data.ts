import { SubjectData } from '../types';
import { SubjectType } from '../types';
import { Zap, FlaskConical, Dna, Calculator, Monitor } from 'lucide-react';

export const physicsData: SubjectData = {
    id: 'physics',
    name: SubjectType.PHYSICS,
    icon: Zap,
    color: 'blue',
    hex: '#3b82f6',
    description: 'Explore the laws of motion, optics, and electromagnetism through immersive simulations.',
    labs: [
      { 
        id: 'p1',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], 
        title: 'Vernier Calipers', 
        description: 'Measure precise dimensions of small objects.', 
        difficulty: 'Easy', 
        duration: '20 min', 
        category: 'Measurement',        content: {
          videoId: "t9Q_rX0r51E",
          aim: "To measure the diameter of a small spherical body using Vernier Calipers.",
          requirements: ["Vernier Calipers", "Spherical Body (Bob)", "Magnifying Glass"],
          theory: "The Vernier Caliper is a high-precision measuring instrument invented by Pierre Vernier in 1631. It uses a differential scale arrangement to measure dimensions with greater accuracy than a standard meter scale.\n\n**Working Principle (Vernier Acuity):**\nThe device relies on the ability of the human eye to detect the alignment of lines (Vernier Acuity) much more precisely than it can estimate position between lines. It consists of two scales:\n1. **Main Scale:** Fixed, graduated in millimeters.\n2. **Vernier Scale:** Sliding, usually having 10 divisions that span 9mm of the main scale.\n\n**Least Count (L.C.):**\nThe Least Count is the smallest difference between a Main Scale Division (MSD) and a Vernier Scale Division (VSD).\nL.C. = 1 MSD - 1 VSD\nIf N vernier divisions coincide with (N-1) main scale divisions:\n1 VSD = ((N-1)/N) MSD\nTherefore, L.C. = 1 MSD - ((N-1)/N) MSD = (1/N) MSD.\nFor a standard caliper: 1 MSD = 1mm, N = 10. Thus, L.C. = 0.1mm or 0.01cm.\n\n**Measurement Formula:**\nTotal Reading = Main Scale Reading (MSR) + (Vernier Coincidence (VC) × L.C.)\n- **MSR:** The main scale mark immediately to the left of the vernier zero.\n- **VC:** The division on the vernier scale that aligns perfectly with any main scale mark.\n\n**Zero Error Correction:**\nIdeally, when jaws are closed, the zeros of both scales coincide. If not, there is a Zero Error:\n- **Positive Error:** Vernier zero is to the right. Correction is negative.\n- **Negative Error:** Vernier zero is to the left. Correction is positive.",
          procedure: [
              "Find the least count and zero error of the vernier caliper.",
              "Open the jaws of the caliper.",
              "Place the spherical body between the two lower jaws and grip it firmly but gently.",
              "Note the main scale reading (MSR) just to the left of the vernier zero.",
              "Note the vernier scale division (VSD) that best coincides with a main scale division.",
              "Calculate the total reading by using Total Reading = MSR + (VSD * Least Count) - Zero Error.",
              "Repeat the above steps for two more positions of the body to obtain three readings.",
              "Find the mean diameter and halve it to find the radius."
            ],
          objectives: [
            "To learn the principle of Vernier scale.",
            "To measure the diameter of a spherical body.",
            "To calculate volume with significant figures."
          ],
          observationTable: {
            columns: ["MSR (a) cm", "VSD (n)", "VSR (b=n*LC) cm", "Total (a+b) cm"]
          },
          assignments: [
            { id: 1, question: "Calculate the volume of a sphere if the main scale reading is 2.4cm, vernier coincidence is 6, and least count is 0.01cm. Show your working.", marks: 5 },
            { id: 2, question: "Draw a neat labeled diagram of a Vernier Caliper showing a positive zero error of 0.05cm.", marks: 5 },
            { id: 3, question: "Explain why Vernier Calipers are more precise than a standard meter scale. Give two real-world examples where this precision is necessary.", marks: 5 },
            { id: 4, question: "A student measured the length of a rod as 3.52 cm. If the instrument has a negative zero error of 0.02 cm, what is the correct length?", marks: 3 },
            { id: 5, question: "Derive the formula for Least Count if N Vernier divisions match with (N-1) Main Scale divisions.", marks: 4 }
          ],
            quizQuestions: [
                  {
                    "id": 1,
                    "question": "What is the least count of a standard Vernier Caliper?",
                    "options": [
                      "0.1 cm",
                      "0.01 cm",
                      "0.001 cm",
                      "1 cm"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 2,
                    "question": "If the zero of the vernier scale is to the right of the main scale zero, the zero error is:",
                    "options": [
                      "Positive",
                      "Negative",
                      "Zero",
                      "Infinite"
                    ],
                    "correctIndex": 0
                  },
                  {
                    "id": 3,
                    "question": "Which part of the Vernier caliper is used to measure the internal diameter of a cylinder?",
                    "options": [
                      "Main scale",
                      "External jaws",
                      "Internal jaws",
                      "Depth probe"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 4,
                    "question": "The main scale of a Vernier caliper is graduated in:",
                    "options": [
                      "Meters and Decimeters",
                      "Centimeters and Millimeters",
                      "Inches only",
                      "Micrometers"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 5,
                    "question": "How is the least count of a Vernier caliper calculated?",
                    "options": [
                      "1 MSD + 1 VSD",
                      "1 MSD / 1 VSD",
                      "1 MSD - 1 VSD",
                      "1 MSD * 1 VSD"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 6,
                    "question": "A negative zero error is corrected by:",
                    "options": [
                      "Adding it to the observed reading",
                      "Subtracting it from the observed reading",
                      "Multiplying it",
                      "Ignoring it"
                    ],
                    "correctIndex": 0
                  },
                  {
                    "id": 7,
                    "question": "What is the purpose of the depth probe in a Vernier caliper?",
                    "options": [
                      "Measure external diameter",
                      "Measure internal diameter",
                      "Measure depth of a beaker",
                      "Measure weight"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 8,
                    "question": "If 10 vernier scale divisions coincide with 9 main scale divisions (1 MSD = 1mm), the least count is:",
                    "options": [
                      "0.1 mm",
                      "0.01 mm",
                      "1 mm",
                      "0.9 mm"
                    ],
                    "correctIndex": 0
                  },
                  {
                    "id": 9,
                    "question": "The sliding friction in a Vernier caliper is reduced by using:",
                    "options": [
                      "A locking screw",
                      "A fine adjustment screw",
                      "Lubrication",
                      "The depth strip"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 10,
                    "question": "Vernier calipers are based on the principle of:",
                    "options": [
                      "Alignment of two different scales",
                      "Screw and nut",
                      "Lenses",
                      "Magnetism"
                    ],
                    "correctIndex": 0
                  }
                ],
            vivaQuestions: [
                  {
                    "question": "What is meant by the 'least count' of a measuring instrument?",
                    "answer": "It is the smallest physical quantity that can be accurately measured by the given instrument."
                  },
                  {
                    "question": "What is the principle of a Vernier Caliper?",
                    "answer": "It uses two scales (Main and Vernier) with slightly different division sizes; the difference between one main scale division and one vernier scale division gives the least count."
                  },
                  {
                    "question": "What is zero error?",
                    "answer": "It is the error that occurs when the zero marks of the main scale and the vernier scale do not coincide when the jaws are completely closed."
                  },
                  {
                    "question": "How do you account for a positive zero error?",
                    "answer": "A positive zero error is subtracted from the observed reading to get the true reading."
                  },
                  {
                    "question": "What are the internal jaws used for?",
                    "answer": "They are used for measuring the inner dimensions of objects like hollow pipes or cylinders."
                  },
                  {
                    "question": "Can a Vernier caliper measure the depth of a blind hole?",
                    "answer": "Yes, by using the depth measuring strip (or probe) attached to the sliding jaw."
                  },
                  {
                    "question": "Why is a Vernier scale better than a standard meter scale?",
                    "answer": "It provides a higher resolution and accuracy, allowing measurements down to 0.1 mm (or 0.01 cm), compared to 1 mm on a meter scale."
                  },
                  {
                    "question": "What is the difference between sliding jaws and fixed jaws?",
                    "answer": "Fixed jaws are attached to the main scale and provide a static reference point, while sliding jaws move with the vernier scale to hold the object."
                  },
                  {
                    "question": "What material are high-quality Vernier calipers usually made of?",
                    "answer": "They are typically made of stainless steel to prevent rust and thermal expansion issues."
                  },
                  {
                    "question": "If the zero of the vernier scale is slightly to the left of the zero on the main scale, what kind of error is it?",
                    "answer": "Negative zero error."
                  }
                ],
            realWorldApplications: [
                  "Precision Machining: Used by machinists and engineers for highly accurate dimension checks on metal parts.",
                  "Aerospace Engineering: Inspecting the diameters and depths of critical engine components to precise tolerances.",
                  "Automotive Manufacturing: Measuring the internal diameter of engine cylinders for piston fitting.",
                  "Plumbing and Piping: Accurately determining the inner and outer diameters of pipes for connecting tight-fitting joints.",
                  "Woodworking: Helping carpenters achieve perfect joints by measuring mortises and tenons.",
                  "Medical Implants: Ensuring the dimensions of joint replacements and surgical screws are exactly according to design."
                ]
        }
      },
      { 
        id: 'p2',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], 
        title: 'Simple Pendulum', 
        description: 'Determine acceleration due to gravity (g).', 
        difficulty: 'Easy', 
        duration: '30 min', 
        category: 'Mechanics',
        content: {
          videoId: "02w9lSii_Hs",
          aim: "To determine the acceleration due to gravity (g) using a simple pendulum.",
          requirements: ["Metallic Bob", "Thread", "Clamp Stand", "Stopwatch", "Meter Scale"],
          theory: "A simple pendulum is an idealized system consisting of a heavy point mass (bob) suspended by a weightless, inextensible, and perfectly flexible string from a rigid support.\n\n**Physics of Oscillation (SHM):**\nWhen the bob is displaced by a small angle (θ < 10°) and released, it executes Simple Harmonic Motion (SHM). The restoring force is the tangential component of gravity:\nF_restoring = -mg sinθ\nFor small angles, sinθ ≈ θ (radians). Since θ = x/L (arc/radius):\nF = -mg(x/L) = -(mg/L)x\nThis form F = -kx confirms SHM with force constant k = mg/L.\n\n**Time Period Derivation:**\nThe time period T for SHM is given by T = 2π√(m/k).\nSubstituting k = mg/L:\nT = 2π√(m / (mg/L)) = 2π√(L/g)\n\n**Key Factors:**\n- **Length (L):** Distance from the point of suspension to the center of gravity of the bob.\n- **Acceleration due to Gravity (g):** Varies with altitude and latitude. Standard value is 9.8 m/s².\n- **Isochronism:** The period is independent of amplitude for small swings.\n\n**Graph Analysis:**\nA plot of L vs T² yields a straight line passing through the origin. The slope of this line is g/4π², allowing for the experimental calculation of g.",
          procedure: [
              "Measure the radius of the pendulum bob using a vernier caliper.",
              "Tie the string to the bob and suspend it through a split cork firmly clamped to a retort stand.",
              "Adjust the effective length (L) of the pendulum (e.g., 50 cm).",
              "Displace the bob by a small angle (less than 10 degrees) and release it gently so it oscillates in a vertical plane.",
              "Start the stopwatch when the bob crosses the mean position and count 20 complete oscillations.",
              "Stop the stopwatch after exactly 20 oscillations and record the time taken (t).",
              "Calculate the time period T = t/20 and its square T^2.",
              "Repeat the experiment for 4 to 5 different lengths (e.g., 60cm, 70cm, 80cm) and plot a graph between L and T^2."
            ],
          objectives: ["Calculate 'g' at your location.", "Plot L-T² graph."],
          observationTable: {
            columns: ["Length L (cm)", "Time 20 Osc (t) s", "Period T = t/20 s", "T² (s²)", "L/T² (cm/s²)"]
          },
          assignments: [
            { id: 1, question: "Plot a graph of L vs T². What does the slope of the graph represent? Calculate g from the slope.", marks: 5 },
            { id: 2, question: "Calculate the length of a Second's Pendulum at a place where g = 9.8 m/s².", marks: 3 },
            { id: 3, question: "How does the time period of a simple pendulum change if it is taken to the moon (g_moon = g_earth/6)?", marks: 3 },
            { id: 4, question: "Why is the amplitude of oscillation kept small in this experiment? Explain with the condition used in derivation.", marks: 4 },
            { id: 5, question: "A simple pendulum of length 100 cm has a time period of 2s. What is the acceleration due to gravity?", marks: 5 }
          ],
            quizQuestions: [
                  {
                    "id": 1,
                    "question": "The time period of a simple pendulum depends directly on:",
                    "options": [
                      "Mass of the bob",
                      "Amplitude of swing",
                      "Square root of length",
                      "Material of the bob"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 2,
                    "question": "If the length of a simple pendulum is increased by four times, its time period becomes:",
                    "options": [
                      "Halved",
                      "Doubled",
                      "Four times",
                      "Remains same"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 3,
                    "question": "Which force is responsible for the restoring force in a simple pendulum?",
                    "options": [
                      "Tension",
                      "Air resistance",
                      "Component of gravity",
                      "Centripetal force"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 4,
                    "question": "What is the time period of a seconds pendulum?",
                    "options": [
                      "1 second",
                      "2 seconds",
                      "4 seconds",
                      "0.5 seconds"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 5,
                    "question": "At the center of the earth, the time period of a simple pendulum is:",
                    "options": [
                      "Zero",
                      "Infinite",
                      "1 second",
                      "Same as surface"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 6,
                    "question": "The motion of a simple pendulum is considered simple harmonic if the amplitude is:",
                    "options": [
                      "Large",
                      "Greater than 45 degrees",
                      "Small (less than 15 degrees)",
                      "Exactly 90 degrees"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 7,
                    "question": "At the extreme position of the swing, the kinetic energy is:",
                    "options": [
                      "Maximum",
                      "Minimum (Zero)",
                      "Equal to potential energy",
                      "Infinite"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 8,
                    "question": "If a simple pendulum is taken to the moon, its time period will:",
                    "options": [
                      "Increase",
                      "Decrease",
                      "Remain the same",
                      "Become zero"
                    ],
                    "correctIndex": 0
                  },
                  {
                    "id": 9,
                    "question": "The effective length of a simple pendulum is measured from the point of suspension to the:",
                    "options": [
                      "Top of the bob",
                      "Center of gravity of the bob",
                      "Bottom of the bob",
                      "Middle of the string"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 10,
                    "question": "In the L-T^2 graph for a simple pendulum, the slope represents:",
                    "options": [
                      "g/(4π^2)",
                      "4π^2/g",
                      "g/2π",
                      "2π/g"
                    ],
                    "correctIndex": 1
                  }
                ],
            vivaQuestions: [
                  {
                    "question": "What is a simple pendulum?",
                    "answer": "An idealized model consisting of a point mass (bob) suspended by a massless, inextensible string."
                  },
                  {
                    "question": "Define the 'time period' of a pendulum.",
                    "answer": "The time taken to complete one full oscillation."
                  },
                  {
                    "question": "Does the mass of the bob affect the time period?",
                    "answer": "No, the time period is independent of the mass of the bob."
                  },
                  {
                    "question": "Why must the amplitude of oscillation be small for the formula T = 2π√(L/g) to hold true?",
                    "answer": "Because the restoring force is proportional to the sine of the angle (sin θ), and sin θ ≈ θ only for small angles."
                  },
                  {
                    "question": "What is the relationship between the graph of Length (L) versus Time Period Squared (T²)?",
                    "answer": "It is a straight line passing through the origin, indicating L is directly proportional to T²."
                  },
                  {
                    "question": "What happens to the time period if the experiment is performed in an accelerated elevator going upwards?",
                    "answer": "The effective gravity (g') increases, so the time period (T) decreases."
                  },
                  {
                    "question": "What is a 'seconds pendulum'?",
                    "answer": "A pendulum whose time period is exactly 2 seconds."
                  },
                  {
                    "question": "Where is the potential energy of the pendulum maximum?",
                    "answer": "At the extreme positions of its swing."
                  },
                  {
                    "question": "Why is the bob usually made a heavy metallic sphere?",
                    "answer": "To keep the center of gravity low and stable, and minimize the dampening effect of air resistance."
                  },
                  {
                    "question": "How does the L-T² graph help in finding the acceleration due to gravity?",
                    "answer": "The slope of the graph is equal to 4π²/g, from which 'g' can be calculated."
                  }
                ],
            realWorldApplications: [
                  "Horology (Clocks): Historically the fundamental mechanism for regulating the timekeeping of grandfather clocks.",
                  "Gravimetry: Used historically to measure the local acceleration due to gravity (g) at various places on Earth.",
                  "Seismographs: Similar pendulum mechanics form the basis of early seismographs used to detect earthquakes.",
                  "Foucault Pendulum: Demonstrated the rotation of the Earth using an unconstrained large pendulum.",
                  "Metronomes: Musicians use inverted pendulums (metronomes) to maintain a steady tempo.",
                  "Amusement Park Rides: The physics of swing rides and pirate ship rides are based on pendulum mechanics and resonance."
                ]
        }
      },
      { 
        id: 'p3',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], 
        title: 'Screw Gauge', 
        description: 'Measure the diameter of a thin wire.', 
        difficulty: 'Medium', 
        duration: '25 min', 
        category: 'Measurement',
        content: {
            videoId: "H7zX7dJ3_1Q",
            aim: "To measure the diameter of a given wire using a screw gauge.",
            requirements: ["Screw Gauge", "Wire", "Half-meter scale"],
            theory: "The Screw Gauge (or Micrometer) works on the principle of converting small linear displacements of a screw into large rotational displacements on the circular scale.\n\n**Construction:** It consists of a U-shaped frame, a fixed anvil, a movable spindle connected to a thimble, and a ratchet mechanism. The main scale (pitch scale) on the sleeve reads in millimeters, while the circular scale on the thimble has 50 or 100 divisions.\n\n**Pitch:** The distance moved by the spindle per complete rotation of the thimble. Usually 0.5 mm or 1 mm.\n\n**Least Count:** LC = Pitch / Number of circular scale divisions. For a pitch of 0.5 mm and 50 divisions: LC = 0.01 mm.\n\n**Zero Error:** When the anvil and spindle are in contact, if the zero of the circular scale does not coincide with the datum line, a zero error exists. It can be positive (zero below datum) or negative (zero above datum).\n\n**Reading:** Total reading = MSR + (CSR × LC) ± zero error correction.\n\n**Applications:** Measuring diameter of thin wires, thickness of metal sheets, diameter of small spheres.",
            procedure: [
              "Find the value of one main scale division and the total number of divisions on the circular scale to calculate the least count.",
              "Bring the flat faces of the screw and the stud in contact using the ratchet, and determine the zero error.",
              "Grip the given wire gently between the flat faces using the ratchet.",
              "Note the main scale reading (MSR).",
              "Note the circular scale division (CSR) that perfectly coincides with the reference line.",
              "Repeat the observation at three different places along the length of the wire to check for uniformity.",
              "Calculate the total reading and mean diameter of the wire."
            ],
            objectives: ["Measure thickness of thin objects.", "Understand zero correction."],
            observationTable: { columns: ["MSR (a) mm", "CSR (n)", "CSR val (b=n*LC)", "Total (a+b) mm"] },
            assignments: [
                { id: 1, question: "Determine the Least Count of a screw gauge which has a pitch of 1 mm and 100 divisions on the circular scale.", marks: 3 },
                { id: 2, question: "Describe how to determine the pitch of a screw gauge. Why is a ratchet provided?", marks: 4 },
                { id: 3, question: "Calculate the area of cross-section of a wire if its diameter is measured to be 1.25 mm.", marks: 4 },
                { id: 4, question: "Explain Backlash Error. How can it be avoided while taking readings?", marks: 4 },
                { id: 5, question: "If the zero of the circular scale is below the reference line by 4 divisions, what is the type of zero error? If LC is 0.01mm, calculate the correction.", marks: 5 }
            ],
            quizQuestions: [
                  {
                    "id": 1,
                    "question": "The pitch of a screw gauge is the distance moved by the spindle for:",
                    "options": [
                      "One complete rotation",
                      "Half a rotation",
                      "Two complete rotations",
                      "1/100th of a rotation"
                    ],
                    "correctIndex": 0
                  },
                  {
                    "id": 2,
                    "question": "If the pitch is 1mm and circular scale has 100 divisions, what is the least count?",
                    "options": [
                      "0.1 mm",
                      "0.01 mm",
                      "0.001 mm",
                      "1 cm"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 3,
                    "question": "The part of the screw gauge that prevents overtightening onto the object is the:",
                    "options": [
                      "Thimble",
                      "Sleeve",
                      "Ratchet",
                      "U-frame"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 4,
                    "question": "If the zero of the circular scale is below the reference line when closed, the zero error is:",
                    "options": [
                      "Positive",
                      "Negative",
                      "Zero",
                      "Not applicable"
                    ],
                    "correctIndex": 0
                  },
                  {
                    "id": 5,
                    "question": "A screw gauge is generally more precise than a vernier caliper by a factor of:",
                    "options": [
                      "2",
                      "10",
                      "100",
                      "They are identical"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 6,
                    "question": "To find the thickness of a wire, we measure it at several places because:",
                    "options": [
                      "To find zero error",
                      "The wire may not be uniformly cylindrical",
                      "The screw gauge is inaccurate",
                      "To increase temperature"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 7,
                    "question": "The linear scale parallel to the axis of the screw is called the:",
                    "options": [
                      "Circular scale",
                      "Pitch scale (Sleeve)",
                      "Vernier scale",
                      "Ratchet scale"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 8,
                    "question": "Backlash error in a screw gauge is caused by:",
                    "options": [
                      "Wear and tear of the screw threads",
                      "Change in temperature",
                      "Parallax error",
                      "Magnetic interference"
                    ],
                    "correctIndex": 0
                  },
                  {
                    "id": 9,
                    "question": "To avoid backlash error, the screw should be turned:",
                    "options": [
                      "In both directions constantly",
                      "In one direction only during measurement",
                      "As fast as possible",
                      "With bare hands"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 10,
                    "question": "Which of the following cannot be measured directly using a screw gauge?",
                    "options": [
                      "Diameter of a wire",
                      "Thickness of a glass slab",
                      "Internal diameter of a beaker",
                      "Thickness of a paper"
                    ],
                    "correctIndex": 2
                  }
                ],
            vivaQuestions: [
                  {
                    "question": "What is the 'pitch' of a screw?",
                    "answer": "It is the linear distance covered by the tip of the screw in one complete rotation."
                  },
                  {
                    "question": "How do you calculate the least count of a screw gauge?",
                    "answer": "Least Count = Pitch / Number of divisions on the circular scale."
                  },
                  {
                    "question": "What is the function of the ratchet?",
                    "answer": "It ensures a uniform pressure is applied on the object being measured and prevents overtightening."
                  },
                  {
                    "question": "What is backlash error in a screw gauge?",
                    "answer": "An error due to play or loose fitting between the threads of the screw and the nut, usually caused by wear and tear."
                  },
                  {
                    "question": "How do you eliminate or minimize backlash error?",
                    "answer": "By always advancing the screw in one direction only while taking a reading."
                  },
                  {
                    "question": "What is a negative zero error in a screw gauge?",
                    "answer": "When the zero of the circular scale lies above the reference line on the pitch scale when the studs are in contact."
                  },
                  {
                    "question": "Why is a screw gauge called a 'micrometer'?",
                    "answer": "Because it can measure small lengths or thicknesses accurately up to micrometers (usually 0.01 mm, which is 10 micrometers)."
                  },
                  {
                    "question": "What is the purpose of the U-shaped frame?",
                    "answer": "It provides a rigid support holding the stationary stud (anvil) and the rotating screw (spindle) in alignment."
                  },
                  {
                    "question": "If you rotate the thimble by 2 full turns and the pitch is 0.5mm, how far does the spindle move?",
                    "answer": "1.0 mm."
                  },
                  {
                    "question": "Can we measure the diameter of a soft rubber ball accurately with a micrometer screw gauge?",
                    "answer": "No, because the applied pressure from the spindle deform the soft surface, yielding an inaccurate reading."
                  }
                ],
            realWorldApplications: [
                  "Metals Industry: Verifying the precise thickness of sheet metal during rolling mill manufacturing.",
                  "Electrical Engineering: Measuring the extremely fine diameter of copper wires used in winding motors and transformers.",
                  "Paper Manufacturing: Monitoring the thickness (caliper) of paper and cardboard sheets for quality control.",
                  "Optics: Measuring the exact thickness of glass lenses and prisms during fabrication.",
                  "Machining operations: Checking tolerances of cylindrical piston pins and metallic shafts.",
                  "Forensics: Analyzing the precise caliber and striations of bullet casings."
                ]
        }
      },
      {
          id: 'p4',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'],
          title: 'Ohm\'s Law',
          description: 'Verify the relationship between Voltage and Current.',
          difficulty: 'Easy',
          duration: '30 min',
          category: 'Electricity',
          content: {
              videoId: "TsPLr_fKq28",
              aim: "To verify Ohm's Law and determine the resistance of a given wire.",
              requirements: ["Battery", "Voltmeter", "Ammeter", "Rheostat", "Resistor"],
              theory: "Ohm's Law, formulated by Georg Simon Ohm in 1827, states that the current (I) flowing through a conductor is directly proportional to the potential difference (V) applied across its ends, provided the temperature and other physical conditions remain constant.\n\n**Mathematical Statement:**\nV = IR or I = V/R\nwhere R is the resistance of the conductor measured in Ohms (Ω).\n\n**Resistance and Resistivity:**\nResistance depends on the material, length (l), and cross-sectional area (A) of the conductor:\nR = ρl/A\nwhere ρ (rho) is the resistivity of the material.\n\n**V-I Characteristics:**\nFor an Ohmic conductor (metals at constant temperature), the graph of V vs I is a straight line passing through the origin. The slope of this line gives the resistance R. Conductors that do not obey Ohm's Law (e.g., diodes, electrolytes) are called Non-Ohmic conductors.\n\n**Factors Affecting Resistance:**\n1. Length: R ∝ l\n2. Cross-sectional area: R ∝ 1/A\n3. Material: Different materials have different resistivities.\n4. Temperature: For metals, resistance increases with temperature.",
              procedure: [
              "Draw the circuit diagram and connect the apparatus as per the diagram.",
              "Keep the key open and the rheostat at its maximum resistance position to draw minimum current.",
              "Check the zero error of the ammeter and voltmeter.",
              "Close the key and note the lowest current and its corresponding voltage.",
              "Gradually shift the rheostat contact to increase the current in small, distinct steps.",
              "For each step, note down the ammeter and voltmeter readings.",
              "Take at least 5 to 6 sets of readings.",
              "Plot a graph between current (I) on the x-axis and potential difference (V) on the y-axis, and calculate resistance from the slope."
            ],
              objectives: ["Verify linearity of V-I graph.", "Calculate Resistance per unit length."],
              observationTable: { columns: ["Voltage (V)", "Current (I)", "V/I (R)", "Mean R"] },
              assignments: [
                  { id: 1, question: "Plot a V-I graph from your observations. Calculate the resistance from the slope.", marks: 5 },
                  { id: 2, question: "Calculate the resistivity of the wire if its length is 50cm, diameter is 0.5mm, and resistance is 2 Ohms.", marks: 5 },
                  { id: 3, question: "Why is the Voltmeter connected in parallel and Ammeter in series? Explain with circuit diagram.", marks: 4 },
                  { id: 4, question: "What are Non-Ohmic conductors? Give two examples and sketch their V-I characteristics.", marks: 3 },
                  { id: 5, question: "Explain the effect of temperature on the resistance of a metallic conductor. Why do we pass current only for a short time?", marks: 3 }
              ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Ohm's Law states that the current flowing through a conductor is directly proportional to:",
                      "options": [
                        "Resistance",
                        "Temperature",
                        "Voltage (Potential Difference)",
                        "Charge"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 2,
                      "question": "For Ohm's Law to be valid, which physical condition must remain constant?",
                      "options": [
                        "Voltage",
                        "Temperature",
                        "Current",
                        "Time"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "The V-I graph of a purely ohmic conductor is:",
                      "options": [
                        "A parabola",
                        "An exponential curve",
                        "A straight line passing through the origin",
                        "A circle"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "The slope of a V-I graph (where V is on the Y-axis and I is on the X-axis) gives the:",
                      "options": [
                        "Conductance",
                        "Resistance",
                        "Power",
                        "Resistivity"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Which of the following is a non-ohmic device?",
                      "options": [
                        "Copper wire",
                        "Silver wire",
                        "Semiconductor diode",
                        "Carbon resistor"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "The unit of electrical resistance is:",
                      "options": [
                        "Ampere",
                        "Volt",
                        "Ohm",
                        "Watt"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 7,
                      "question": "In the experimental setup for Ohm's law, a voltmeter is always connected in:",
                      "options": [
                        "Series",
                        "Parallel",
                        "Either series or parallel",
                        "Diagonal"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "In the experimental setup, the ammeter is connected in:",
                      "options": [
                        "Parallel",
                        "Series",
                        "Outside the circuit",
                        "Grounded"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "If you double the voltage across an Ohmic resistor, the current will:",
                      "options": [
                        "Halve",
                        "Remain the same",
                        "Quadruple",
                        "Double"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 10,
                      "question": "The inverse of Resistance is called:",
                      "options": [
                        "Resistivity",
                        "Conductivity",
                        "Conductance",
                        "Impedance"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "State Ohm's Law.",
                      "answer": "The current flowing through a conductor is directly proportional to the potential difference applied across its ends, provided temperature and other physical conditions remain constant."
                    },
                    {
                      "question": "What is an Ohmic conductor? Give an example.",
                      "answer": "Conductors that strictly obey Ohm's Law (i.e., display a linear V-I relationship), such as pure metals (Copper, Silver)."
                    },
                    {
                      "question": "Give an example of a non-Ohmic conductor.",
                      "answer": "Semiconductor diodes, transistors, or the filament of a light bulb."
                    },
                    {
                      "question": "Why is a voltmeter connected in parallel?",
                      "answer": "To measure the potential difference across the component without drawing a significant amount of current itself (it has very high resistance)."
                    },
                    {
                      "question": "Why is an ammeter connected in series?",
                      "answer": "To measure the full current passing through the component, having a very low resistance so it doesn't drop the voltage."
                    },
                    {
                      "question": "What does the slope of the I-V graph (I on Y-axis, V on X-axis) represent?",
                      "answer": "It represents Conductance (1/R)."
                    },
                    {
                      "question": "Why does the resistance of a metal wire increase with temperature?",
                      "answer": "Because higher temperature increases the thermal vibration of the lattice ions, causing more frequent collisions with the drifting electrons."
                    },
                    {
                      "question": "What is the function of a rheostat in the circuit?",
                      "answer": "To vary the resistance in the circuit, and thereby change the current flowing to plot multiple V-I points."
                    },
                    {
                      "question": "Can Ohm's law be applied to insulators?",
                      "answer": "No, insulators do not allow current to flow easily, and their breakdown behavior is highly non-linear."
                    },
                    {
                      "question": "What is the difference between Resistance and Resistivity?",
                      "answer": "Resistance depends on the material's dimensions (length, area), whereas Resistivity is an intrinsic property of the material independent of its shape."
                    }
                  ],
              realWorldApplications: [
                    "Circuit Design: Calculating required resistor values to prevent burning out LEDs and sensitive microchips.",
                    "Power Distribution: Electric companies calculate voltage drops across high-voltage transmission lines using variations of Ohm's Law.",
                    "Heating Appliances: Designing toasters, electric kettles, and space heaters to generate specific wattages based on fixed resistivity.",
                    "Fuses and Circuit Breakers: Determining the maximum permissible fault current before a protective element must sever the power.",
                    "Battery Life Calculation: Estimating how long a consumer electronic device will run under a specific current load.",
                    "Sensor Calibration: Many sensors (strain gauges, thermistors) rely on a changing resistance which is read out as a voltage via Ohm’s Law."
                  ]
        }
      },
      {
          id: 'p5',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'],
          title: 'Concave Mirror',
          description: 'Find focal length using u-v method.',
          difficulty: 'Medium',
          duration: '40 min',
          category: 'Optics',
          content: {
              videoId: "lK6-2gYy2_c",
              aim: "To find the focal length of a concave mirror by determining image distance (v) for various object distances (u).",
              requirements: ["Concave Mirror", "Optical Bench", "Needles/Candle"],
              theory: "A concave mirror is a spherical mirror whose reflecting surface is curved inward (toward the center of the sphere). It converges parallel rays of light to a point called the principal focus.\n\n**Key Terms:**\n- **Pole (P):** The geometric center of the mirror surface.\n- **Center of Curvature (C):** The center of the sphere of which the mirror is a part.\n- **Radius of Curvature (R):** The radius of this sphere.\n- **Principal Focus (F):** The point where paraxial rays parallel to the principal axis converge after reflection. f = R/2.\n\n**Mirror Formula:**\n1/v + 1/u = 1/f\nwhere u = object distance, v = image distance, f = focal length. All distances are measured from the pole using the New Cartesian Sign Convention.\n\n**Sign Convention (New Cartesian):**\n- All distances are measured from the pole.\n- Distances in the direction of incident light are positive; against it are negative.\n- Heights above the principal axis are positive; below are negative.\n\n**Image Formation:**\nDepending on the object position relative to F, C, and P, the image can be real/virtual, inverted/erect, and magnified/diminished/same size.\n\n**u-v Method:**\nBy measuring u and v for various object positions and applying the mirror formula, f can be determined experimentally.",
              procedure: [
              "Find the rough focal length of the concave mirror by focusing a distant object on a screen or wall.",
              "Mount the concave mirror on a specified mirror holder and place it on the optical bench.",
              "Mount an object pin vertically on a stand and place it in front of the mirror between its center of curvature (C) and principal focus (F).",
              "Move the screen or a second image pin to locate the inverted, real, magnified image of the object pin.",
              "Adjust the height and distance of the image pin to remove parallax between it and the mirror image.",
              "Carefully measure the object distance (u) and the exact image distance (v) from the pole of the mirror.",
              "Repeat the procedure for at least five different object distances.",
              "Calculate focal length f = (uv)/(u+v) or plot a 1/u vs 1/v graph to find the focal length."
            ],
              objectives: ["Understand real vs virtual images.", "Verify mirror formula."],
              observationTable: { columns: ["Object u", "Image v", "1/u", "1/v", "f"] },
              assignments: [
                  { id: 1, question: "Using the Mirror Formula, calculate the focal length if object distance u = -20cm and image distance v = -30cm.", marks: 3 },
                  { id: 2, question: "Draw ray diagrams showing image formation when the object is placed: (a) At C, (b) Between F and P.", marks: 5 },
                  { id: 3, question: "Plot a graph of 1/u vs 1/v. What do the intercepts on the axes represent?", marks: 4 },
                  { id: 4, question: "Define magnification. If the image is real and inverted, what is the sign of magnification?", marks: 3 },
                  { id: 5, question: "Differentiate between Real and Virtual images with respect to a concave mirror. How do you distinguish them experimentally?", marks: 5 }
              ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The focal length of a spherical mirror is defined as:",
                      "options": [
                        "Half the radius of curvature",
                        "Double the radius of curvature",
                        "Equal to radius of curvature",
                        "Unrelated to radius of curvature"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 2,
                      "question": "If the object is placed at the center of curvature (C) of a concave mirror, the image is formed at:",
                      "options": [
                        "Focus (F)",
                        "Between F and C",
                        "Center of Curvature (C)",
                        "Infinity"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "When an object is placed between the Focus and the Pole of a concave mirror, the image formed is:",
                      "options": [
                        "Real, inverted, diminished",
                        "Virtual, erect, magnified",
                        "Real, erect, magnified",
                        "Virtual, inverted, diminished"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "The mirror formula is:",
                      "options": [
                        "1/f = 1/v + 1/u",
                        "1/f = 1/v - 1/u",
                        "1/f = 1/u - 1/v",
                        "f = u + v"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 5,
                      "question": "According to the Cartesian sign convention, the focal length of a concave mirror is taken as:",
                      "options": [
                        "Positive",
                        "Negative",
                        "Zero",
                        "Variable depending on object position"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "A real image formed by a concave mirror is always:",
                      "options": [
                        "Inverted",
                        "Erect",
                        "Magnified",
                        "Diminished"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 7,
                      "question": "To find the rough focal length of a concave mirror, we focus the image of:",
                      "options": [
                        "A nearby candle",
                        "A distant object (like a tree/sun)",
                        "Our own face",
                        "A magnifying glass"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Magnification (m) for spherical mirrors is given by:",
                      "options": [
                        "-v/u",
                        "v/u",
                        "u/v",
                        "-u/v"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 9,
                      "question": "If magnification is negative, the image is:",
                      "options": [
                        "Virtual",
                        "Erect",
                        "Real and inverted",
                        "Diminished"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "In the u-v method, plotting a graph of 1/v vs 1/u yields:",
                      "options": [
                        "A parabola",
                        "An exponential curve",
                        "A straight line with intercept 1/f",
                        "A circle"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a concave mirror?",
                      "answer": "A spherical mirror whose reflecting surface curves inwards, converging parallel light rays to a real focus."
                    },
                    {
                      "question": "What is meant by principal focus (F)?",
                      "answer": "The point on the principal axis where light rays parallel to the principal axis converge after reflection."
                    },
                    {
                      "question": "Why does a concave mirror form a virtual image when the object is very close to it (between Pole and Focus)?",
                      "answer": "Because the reflected rays diverge instead of converging; they appear to meet behind the mirror."
                    },
                    {
                      "question": "What is the relationship between the radius of curvature (R) and the focal length (f)?",
                      "answer": "R = 2f (for mirrors of small aperture)."
                    },
                    {
                      "question": "What is the mirror formula?",
                      "answer": "1/f = 1/v + 1/u, where u is object distance, v is image distance, f is focal length."
                    },
                    {
                      "question": "What is 'parallax'?",
                      "answer": "The apparent shift in the position of an object (or image) relative to another when viewed from different angles."
                    },
                    {
                      "question": "How do you remove parallax in the optical bench experiment?",
                      "answer": "By moving the image needle until its tip coincides perfectly with the inverted image of the object needle, such that they move together when you shift your eye side-to-side."
                    },
                    {
                      "question": "Why is the focal length of a concave mirror taken as negative?",
                      "answer": "Because the focus lies in front of the mirror, in the direction opposite to the incident light, according to Cartesian sign convention."
                    },
                    {
                      "question": "What is the magnification when the object is at the Center of Curvature?",
                      "answer": "Magnification is -1 (the image is real, inverted, and the exact same size)."
                    },
                    {
                      "question": "Why can't we obtain a virtual image on a screen?",
                      "answer": "Because the light rays do not actually meet to form the image; they only appear to diverge from a point behind the mirror."
                    }
                  ],
              realWorldApplications: [
                    "Astronomical Telescopes: Used as the primary mirror in reflecting telescopes (like Hubble or James Webb) to gather and converge starlight.",
                    "Solar Furnaces/Cookers: Using large concave mirrors to concentrate solar energy onto a small point to generate intense heat.",
                    "Headlights and Torches: Placing the bulb at the focus of a parabolic/concave reflector produces a strong parallel beam of light.",
                    "Dentist's Mirrors: Providing a magnified, virtual, erect image of human teeth when held close.",
                    "Shaving Mirrors: Providing a magnified, erect view of the user's face when positioned within the focal length.",
                    "Satellite Dishes: Though using radio waves instead of light, they operate on the exact same concave converging principle."
                  ]
        }
      }
,
      {
          id: 'p6',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Metre Bridge — Resistance', description: 'Determine resistance per unit length using Metre Bridge.', difficulty: 'Medium', duration: '35 min', category: 'Electricity',          content: { aim: "To determine resistance using a Metre Bridge.", requirements: ["Metre Bridge", "Resistance Box", "Galvanometer", "Jockey"], theory: "The Metre Bridge (also called a slide wire bridge) is a practical form of the Wheatstone Bridge used to measure an unknown resistance.\n\n**Wheatstone Bridge Principle:**\nA Wheatstone Bridge consists of four resistances P, Q, R, and S arranged in a diamond shape. A galvanometer is connected between the junctions of P-Q and R-S. At balance (null point), no current flows through the galvanometer, and:\nP/Q = R/S\n\n**Metre Bridge Working:**\nIn a metre bridge, a 1-meter long uniform resistance wire replaces two of the four resistances. An unknown resistance S is placed in one gap and a known resistance R from a resistance box in the other gap. A jockey is slid along the wire to find the null point at distance l from one end.\n\nAt balance: R/S = l/(100 - l)\nTherefore: S = R(100 - l)/l\n\n**Key Points:**\n- The wire must be uniform in cross-section.\n- The balancing length should be near the middle (between 30cm and 70cm) for accurate results.\n- End corrections may need to be applied for the resistance of thick copper strips at the ends.", procedure: [
              "Draw a circuit diagram and connect the apparatus strictly as shown.",
              "Connect the unknown resistance wire in the right gap and the resistance box in the left gap of the metre bridge.",
              "Introduce a known resistance (R) from the resistance box.",
              "Touch the jockey gently at the left end and right end of the bridge wire to verify opposite deflections in the galvanometer.",
              "Slide the jockey gently along the wire to find the null point where the galvanometer shows zero deflection.",
              "Note the balancing length (l) from the zero end.",
              "Calculate unknown resistance S = R(100 - l)/l.",
              "Repeat for 4 to 5 different values of R."
            ], objectives: ["Verify Kirchhoff's laws."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The Metre Bridge works on the principle of:",
                      "options": [
                        "Ohm's Law",
                        "Wheatstone Bridge",
                        "Kirchhoff's Laws",
                        "Faraday's Laws"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "The length of the wire in a standard Metre Bridge is:",
                      "options": [
                        "50 cm",
                        "100 cm (1 metre)",
                        "200 cm",
                        "10 metres"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "Why is the Metre Bridge wire made of Constantan or Manganin?",
                      "options": [
                        "High conductivity",
                        "Low melting point",
                        "High resistivity and low temperature coefficient",
                        "Cheap material"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "If the null point is obtained at 40 cm from the left end (with unknown resistance in left gap), the ratio R/S is:",
                      "options": [
                        "40/60",
                        "60/40",
                        "40/100",
                        "100/40"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 5,
                      "question": "To increase the sensitivity of the Metre Bridge, the null point should ideally be obtained near:",
                      "options": [
                        "The left end (0 cm)",
                        "The middle (50 cm)",
                        "The right end (100 cm)",
                        "The 25 cm mark"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The thick copper strips used in a Metre Bridge minimize:",
                      "options": [
                        "Contact resistance",
                        "Magnetic interference",
                        "Eddy currents",
                        "Inductance"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 7,
                      "question": "What happens if the jockey is dragged forcefully along the wire?",
                      "options": [
                        "It produces sparks",
                        "It changes the uniform cross-sectional area of the wire",
                        "It increases voltage",
                        "It decreases resistance"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Why should the battery key be closed only when taking a reading?",
                      "options": [
                        "To save electricity",
                        "To prevent heating of the wire",
                        "To avoid damaging the galvanometer",
                        "To prevent magnetization"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The specific resistance (resistivity) of the wire material depends on:",
                      "options": [
                        "Length of wire",
                        "Radius of wire",
                        "Nature of the material",
                        "Applied voltage"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "If the radius of the unknown resistance wire is doubled, its specific resistance will:",
                      "options": [
                        "Double",
                        "Halve",
                        "Increase four times",
                        "Remain unchanged"
                      ],
                      "correctIndex": 3
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a Wheatstone Bridge?",
                      "answer": "An arrangement of four resistances used to measure one unknown resistance by balancing the two legs of a bridge circuit."
                    },
                    {
                      "question": "What is the condition for a balanced Wheatstone Bridge?",
                      "answer": "P/Q = R/S, or no current flows through the galvanometer."
                    },
                    {
                      "question": "Why are the connections made using thick copper strips?",
                      "answer": "Thick copper strips have very low resistance, so they do not add significant error to the resistance measurements."
                    },
                    {
                      "question": "What is the 'null point'?",
                      "answer": "The point on the Metre Bridge wire where touching the jockey results in zero deflection in the galvanometer."
                    },
                    {
                      "question": "Why shouldn't you slide the jockey on the wire?",
                      "answer": "Sliding scrapes the wire, making its cross-section non-uniform, which alters its resistance per unit length."
                    },
                    {
                      "question": "Why is Constantan or Manganin used for the bridge wire?",
                      "answer": "They have high resistivity and a very low temperature coefficient of resistance, meaning their resistance doesn't change much as they heat up."
                    },
                    {
                      "question": "Can a Metre Bridge be used to measure very high or very low resistances accurately?",
                      "answer": "No, it is inaccurate for very low resistances (due to contact resistance) and very high resistances (due to low sensitivity of the galvanometer at high resistance)."
                    },
                    {
                      "question": "What happens to the null point if the positions of the battery and galvanometer are interchanged?",
                      "answer": "The balanced condition remains unaffected; the null point does not shift."
                    },
                    {
                      "question": "Why is it advised to obtain the balance point near the middle (50 cm)?",
                      "answer": "It minimizes the percentage error in the measurement of length (l) and (100-l)."
                    },
                    {
                      "question": "How does the specific resistance depend on the measurement of the radius?",
                      "answer": "Resistivity = (R * π * r²) / L. Because r is squared, any error in measuring the radius (e.g., using a screw gauge) is magnified."
                    }
                  ],
              realWorldApplications: [
                    "Precision Resistor Calibration: Used in labs to verify the exact resistance of standard resistors produced for electronics.",
                    "Strain Gauges: Wheatstone bridge circuits form the basis of strain gauges used in mechanical engineering to measure applied stress.",
                    "Temperature Sensors: RTDs (Resistance Temperature Detectors) use bridge circuits to measure minute changes in resistance due to temperature.",
                    "Fault Detection: Cable companies use similar bridge principles (Murray loop test) to locate short circuits in underground telecommunication cables.",
                    "Material Testing: Determining the resistivity of newly synthesized alloys and conductive polymers.",
                    "Weight Scales: Electronic scales and balances use load cells constructed from Wheatstone bridge configurations."
                  ]
        }
      },
      {
          id: 'p7',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Galvanometer — Figure of Merit', description: 'Determine figure of merit of a galvanometer.', difficulty: 'Hard', duration: '40 min', category: 'Electricity',          content: { aim: "To determine the figure of merit of a galvanometer.", requirements: ["Galvanometer", "Battery", "Resistance Box"], theory: "The figure of merit of a galvanometer is defined as the current required to produce a unit deflection in the galvanometer. It is a measure of the sensitivity of the instrument.\n\n**Formula:**\nk = E / [(R + G) × θ]\nwhere k = figure of merit (A/div), E = EMF of the battery, R = resistance from the resistance box, G = galvanometer resistance, θ = deflection in divisions.\n\n**Galvanometer Resistance (G):**\nG is determined by the half-deflection method. First, a deflection θ is obtained with resistance R alone. Then a shunt S is connected across the galvanometer and adjusted to get deflection θ/2. At this point, G ≈ S.\n\n**Sensitivity:**\nA galvanometer with a smaller figure of merit is more sensitive, meaning it produces a larger deflection per unit current. Current sensitivity = 1/k = θ/Ig.\n\n**Applications:**\nThe figure of merit is essential for converting a galvanometer into an ammeter (by adding a shunt) or a voltmeter (by adding a high series resistance).", procedure: [
              "Connect the battery, a high resistance box (R), and the galvanometer in series with a one-way key.",
              "Connect a low resistance box (S) in parallel with the galvanometer to act as a shunt, along with another key.",
              "Close the main key and introduce a high resistance to obtain a full-scale deflection (theta) in the galvanometer.",
              "Record the value of resistance R and the deflection theta.",
              "Close the shunt key and adjust the shunt resistance S until the deflection is reduced exactly to half (theta/2).",
              "Record the value of S. The galvanometer resistance G is roughly equal to S.",
              "Calculate the figure of merit k = E / ((R + G) * theta).",
              "Repeat for different starting deflections."
            ], objectives: ["Understand sensitivity."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The figure of merit of a galvanometer is defined as:",
                      "options": [
                        "Current required for full scale deflection",
                        "Current required to produce a deflection of one division",
                        "Resistance of the galvanometer",
                        "Voltage per division"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "What is the SI unit of figure of merit (k)?",
                      "options": [
                        "Ampere/division",
                        "Volt/division",
                        "Ohm/Ampere",
                        "Divisions/Ampere"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "The resistance of a galvanometer is typically measured using the:",
                      "options": [
                        "Meter bridge",
                        "Half-deflection method",
                        "Ohm's law setup",
                        "Potentiometer"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "In the half-deflection method, if initial deflection is θ, we introduce a shunt resistance to make the deflection:",
                      "options": [
                        "2θ",
                        "Zero",
                        "θ/2",
                        "θ/4"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "The figure of merit (k) is related to full-scale deflection current (Ig) and total divisions (N) by:",
                      "options": [
                        "Ig = k/N",
                        "Ig = k + N",
                        "Ig = k * N",
                        "Ig = N/k"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "If the total number of divisions on the galvanometer scale is 30, and the figure of merit is 20 microamperes/div, the maximum current it can measure is:",
                      "options": [
                        "20 uA",
                        "30 uA",
                        "600 uA",
                        "1.5 uA"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 7,
                      "question": "High resistance R is connected in series with the galvanometer initially to:",
                      "options": [
                        "Increase current",
                        "Prevent the galvanometer from burning out",
                        "Decrease the figure of merit",
                        "Stop the current entirely"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Which equation represents the figure of merit (k) in terms of EMF (E), series resistance (R), galvanometer resistance (G), and deflection (θ)?",
                      "options": [
                        "k = E / ((R+G)*θ)",
                        "k = E*θ / (R+G)",
                        "k = (R+G) / (E*θ)",
                        "k = E / (R*G*θ)"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 9,
                      "question": "A galvanometer detects:",
                      "options": [
                        "Only voltage",
                        "Large currents only",
                        "Small electric currents",
                        "Magnetic poles"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "When finding the galvanometer resistance using half deflection, the shunt resistance (S) is approximately equal to the galvanometer resistance (G) because:",
                      "options": [
                        "The series resistance R is very low",
                        "The series resistance R is very high compared to G and S",
                        "Current is doubled",
                        "Voltage is halved"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a moving coil galvanometer?",
                      "answer": "An instrument used to detect and measure small electric currents, operating on the principle that a current-carrying coil in a magnetic field experiences a torque."
                    },
                    {
                      "question": "What do you mean by the figure of merit (k)?",
                      "answer": "It is the amount of current required to produce a deflection of one scale division in the galvanometer."
                    },
                    {
                      "question": "How is figure of merit different from current sensitivity?",
                      "answer": "Figure of merit is current per division (I/θ), whereas current sensitivity is deflection per unit current (θ/I). They are reciprocals of each other."
                    },
                    {
                      "question": "What is the half-deflection method?",
                      "answer": "A method to find the internal resistance of a galvanometer by introducing a shunt resistance that halves the initial deflection, making the shunt resistance effectively equal to the galvanometer resistance."
                    },
                    {
                      "question": "Why is a high resistance (R) used in series with the battery?",
                      "answer": "To limit the current in the circuit so that the sensitive galvanometer coil does not get damaged or burn out."
                    },
                    {
                      "question": "What determines the figure of merit?",
                      "answer": "The strength of the magnetic field, number of turns in the coil, area of the coil, and the restoring torque per unit twist of the suspension spring."
                    },
                    {
                      "question": "What is the typical order of magnitude for a galvanometer's resistance (G)?",
                      "answer": "Usually in the range of 50 to 100 Ohms."
                    },
                    {
                      "question": "What is a 'shunt'?",
                      "answer": "A low resistance connected in parallel to a galvanometer to bypass the majority of the current, effectively converting it into an ammeter."
                    },
                    {
                      "question": "What kind of magnetic poles are used in a galvanometer and why?",
                      "answer": "Concave cylindrical magnetic poles are used to produce a radial magnetic field, ensuring the plane of the coil is always parallel to the field lines."
                    },
                    {
                      "question": "Why must the battery key be opened when making changes to the resistance box?",
                      "answer": "To prevent accidental high current surges from damaging the galvanometer."
                    }
                  ],
              realWorldApplications: [
                    "Instrumentation: Galvanometers are the internal sensing mechanism inside many traditional analog ammeters and voltmeters (multimeters).",
                    "ECG Machines: Early string galvanometers were used as the primary recording instruments for the first electrocardiograms.",
                    "Laser Light Shows: Galvanometer scanners (galvos) are used to rapidly aim laser beams by pivoting small mirrors.",
                    "Hard Drives: The positioning of the read/write head in a computer hard drive relies on voice coil actuators that operate on galvanometer principles.",
                    "Seismic Detectors: Detecting minute electrical signals generated by geological sensors to predict earthquakes.",
                    "Light Meters: Used in older photography light meters where a photovoltaic cell generates a tiny current directly proportional to light intensity."
                  ]
        }
      },
      {
          id: 'p8',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Glass Prism — Refractive Index', description: 'Find refractive index using minimum deviation.', difficulty: 'Medium', duration: '30 min', category: 'Optics',          content: { aim: "To find refractive index of glass prism.", requirements: ["Glass Prism", "Drawing Board", "Pins"], theory: "When a ray of light passes through a glass prism, it undergoes refraction at both surfaces. The angle between the incident ray and the emergent ray is called the angle of deviation (δ).\n\n**Prism Geometry:**\nA prism has two refracting surfaces inclined at an angle A (the angle of the prism). At the first surface, the ray bends toward the normal; at the second, it bends away from the normal.\n\n**Minimum Deviation (Dm):**\nAs the angle of incidence increases, the angle of deviation first decreases, reaches a minimum value (Dm), and then increases. At minimum deviation, the refracted ray inside the prism is parallel to the base, and the angle of incidence equals the angle of emergence (i = e).\n\n**Refractive Index Formula:**\nAt minimum deviation:\nμ = sin[(A + Dm)/2] / sin(A/2)\nwhere μ is the refractive index of the prism material.\n\n**i-δ Graph:**\nA plot of i vs δ gives a U-shaped curve with the minimum at Dm. This graph is used experimentally to find Dm and hence μ.\n\n**Snell's Law:** At each refracting surface: n₁ sin i = n₂ sin r.", procedure: [
              "Fix a white sheet of paper on a drawing board using drawing pins.",
              "Place the glass prism on the paper and trace its triangular outline.",
              "Remove the prism and draw a normal to one refracting face. Draw an incident ray making an angle of incidence (e.g., 30 degrees).",
              "Fix two pins P and Q vertically on the incident ray.",
              "Place the prism back exactly on its outline.",
              "Look through the other refracting face and fix two more pins R and S such that they perfectly align with the images of P and Q.",
              "Remove the prism and pins, draw the emergent ray joining R and S, and measure the angle of deviation.",
              "Repeat the experiment for angles of incidence from 35 degrees to 60 degrees in steps of 5 degrees.",
              "Plot a graph between angle of incidence (i) and angle of deviation, and determine the angle of minimum deviation to calculate the refractive index."
            ], objectives: ["Snell's Law."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "What is the angle of deviation?",
                      "options": [
                        "Angle between incident ray and emergent ray",
                        "Angle between incident ray and normal",
                        "Angle of the prism",
                        "Angle between refracted ray and emergent ray"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 2,
                      "question": "At the angle of minimum deviation, how does the refracted ray behave inside the prism?",
                      "options": [
                        "It reflects back",
                        "It travels parallel to the base of the prism",
                        "It bends towards the apex",
                        "It splits into seven colors"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "The graph plotted between angle of incidence (i) and angle of deviation (D) is a:",
                      "options": [
                        "Straight line",
                        "Circle",
                        "Parabola (U-shaped curve)",
                        "Sine wave"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "At the angle of minimum deviation (Dm), the angle of incidence (i) is equal to:",
                      "options": [
                        "Angle of prism (A)",
                        "Angle of refraction (r)",
                        "Angle of emergence (e)",
                        "90 degrees"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "The formula to calculate the refractive index (n) of the prism is:",
                      "options": [
                        "sin((A+Dm)/2) / sin(A/2)",
                        "sin(A/2) / sin((A+Dm)/2)",
                        "sin(A+Dm) / sin(A)",
                        "sin(i) / sin(e)"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 6,
                      "question": "If the angle of a prism is 60° and the minimum deviation is 30°, the refractive index is:",
                      "options": [
                        "1.0",
                        "1.414 (sqrt 2)",
                        "1.5",
                        "1.732 (sqrt 3)"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Which color of white light deviates the most through a glass prism?",
                      "options": [
                        "Red",
                        "Green",
                        "Yellow",
                        "Violet"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 8,
                      "question": "Dispersion of light occurs because the refractive index of glass is:",
                      "options": [
                        "Constant for all colors",
                        "Different for different wavelengths of light",
                        "Zero inside the prism",
                        "Dependent on the temperature alone"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "What is the typical angle of an equilateral glass prism?",
                      "options": [
                        "45°",
                        "60°",
                        "90°",
                        "120°"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "If a monochromatic red laser is passed through the prism instead of white light, what will you observe?",
                      "options": [
                        "A rainbow",
                        "No deviation",
                        "Deviation but no dispersion (single red spot)",
                        "The beam disappears"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is meant by refraction of light?",
                      "answer": "The bending of a light ray as it passes from one transparent medium into another, due to a change in its speed."
                    },
                    {
                      "question": "What is the Angle of Prism (A)?",
                      "answer": "The angle between the two refracting surfaces of the prism."
                    },
                    {
                      "question": "Define the Angle of Deviation (D).",
                      "answer": "The angle formed between the path of the incident ray and the path of the emergent ray."
                    },
                    {
                      "question": "What is the condition for minimum deviation?",
                      "answer": "The angle of incidence must equal the angle of emergence (i = e), and the refracted ray inside the prism is parallel to its base."
                    },
                    {
                      "question": "Why does white light split into seven colors when passing through a prism?",
                      "answer": "Because white light is composed of different wavelengths (colors), and the refractive index of glass is different for each wavelength, causing each color to bend by a different amount (Dispersion)."
                    },
                    {
                      "question": "Which color deviates the least and why?",
                      "answer": "Red light deviates the least because it has the longest wavelength and consequently experiences the lowest refractive index in glass."
                    },
                    {
                      "question": "What does Snell's Law state?",
                      "answer": "The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant for a given pair of media (n = sin i / sin r)."
                    },
                    {
                      "question": "Why is a pin method used to trace the rays?",
                      "answer": "Object pins establish the incident ray line, and viewing their aligned images through the prism allows us to trace the precise emergent path."
                    },
                    {
                      "question": "How does the angle of deviation change if the prism is immersed in water?",
                      "answer": "The angle of deviation decreases because the relative refractive index of glass with respect to water is less than that of glass with respect to air."
                    },
                    {
                      "question": "Is the graph of angle 'i' versus 'D' a perfect parabola?",
                      "answer": "No, it is an asymmetric U-shaped curve. It decreases to a minimum and then rises, but not symmetrically."
                    }
                  ],
              realWorldApplications: [
                    "Spectrometers: Prisms are used to disperse light into its constituent spectra to analyze the chemical composition of stars and materials.",
                    "Binoculars and Periscopes: Porro prisms and roof prisms utilize total internal reflection to erect the inverted images formed by objective lenses.",
                    "Cameras: Used inside DSLR viewfinders (pentaprisms) to direct light from the lens into the photographer's eye.",
                    "Optometry: Small prisms are ground into eyeglass lenses to correct double vision (diplopia) and strabismus.",
                    "Rainbows: Water droplets in the atmosphere act as billions of tiny prisms to naturally disperse sunlight.",
                    "Laser Technology: Anamorphic prism pairs are used to shape and correct the elliptical beams emitted by laser diodes."
                  ]
        }
      },
      {
          id: 'p9',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Convex Lens — Focal Length', description: 'Determine focal length using u-v method.', difficulty: 'Easy', duration: '25 min', category: 'Optics',          content: { aim: "To determine focal length of convex lens.", requirements: ["Convex Lens", "Optical Bench", "Screen"], theory: "A convex lens is a transparent optical element that converges parallel rays of light to a point called the principal focus. It is thicker at the center than at the edges.\n\n**Lens Formula:**\n1/v - 1/u = 1/f\nwhere u = object distance, v = image distance, f = focal length. The New Cartesian sign convention is used.\n\n**Sign Convention:**\n- All distances are measured from the optical center of the lens.\n- Distances measured in the direction of incident light are positive.\n- The focal length of a convex lens is positive.\n\n**Image Formation:**\nDepending on the object position, a convex lens forms real/virtual, inverted/erect, and magnified/diminished images. When the object is beyond 2F, the image is between F and 2F (diminished); at 2F, same size; between F and 2F, magnified; at F, image at infinity.\n\n**u-v Method:**\nBy measuring u and v for different object positions and using the lens formula, the focal length can be calculated. A graph of 1/v vs 1/u gives a straight line with intercepts equal to 1/f.\n\n**Power of a Lens:** P = 1/f (in meters), measured in Diopters (D).", procedure: [
              "Find the rough focal length of the convex lens by catching the image of a distant tree or window on a screen.",
              "Mount the convex lens in a lens holder equipped on the optical bench.",
              "Place the object pin (O) in front of the lens at a distance slightly greater than the rough focal length.",
              "Place the image pin (I) on the other side of the lens and move it to locate the real and inverted image.",
              "Adjust the image pin to accurately remove parallax between the tip of the image and the tip of the image pin.",
              "Note the object distance (u) and image distance (v).",
              "Repeat the process for 5 or 6 different object distances.",
              "Calculate focal length f = (uv)/(u+v) and verify it by plotting a u-v graph."
            ], objectives: ["Verify lens formula."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A convex lens is also known as:",
                      "options": [
                        "Diverging lens",
                        "Converging lens",
                        "Plano-concave lens",
                        "Cylindrical lens"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "According to the thin lens formula, 1/f is equal to:",
                      "options": [
                        "1/v + 1/u",
                        "1/u - 1/v",
                        "1/v - 1/u",
                        "v + u"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "According to sign convention, the object distance (u) is always taken as:",
                      "options": [
                        "Positive",
                        "Negative",
                        "Zero",
                        "Not fixed"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "If an object is placed at infinity in front of a convex lens, the image is formed at:",
                      "options": [
                        "Center of curvature",
                        "Infinity",
                        "The principal focus",
                        "Optical center"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "For an object placed at 2F of a convex lens, the image is formed at:",
                      "options": [
                        "F",
                        "Between F and 2F",
                        "2F",
                        "Infinity"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "In the 2F case, the magnification is:",
                      "options": [
                        "+1",
                        "-1",
                        "+2",
                        "-0.5"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "If the lens is moved towards an object placed far away, what happens to the image distance (v)?",
                      "options": [
                        "Increases",
                        "Decreases",
                        "Remains constant",
                        "Becomes negative"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 8,
                      "question": "Parallax error represents:",
                      "options": [
                        "The blurring of the image",
                        "Apparent shift between object and image when moving the eye sideways",
                        "Spherical aberration",
                        "Chromatic aberration"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The graph between u and v for a convex lens is a:",
                      "options": [
                        "Straight line",
                        "Circle",
                        "Hyperbola",
                        "Parabola"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "The SI unit of Power of a lens is:",
                      "options": [
                        "Meter",
                        "Diopter",
                        "Watt",
                        "Focal length"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a convex lens?",
                      "answer": "A lens that is thicker at the center than at the edges. It converges parallel rays of light passing through it."
                    },
                    {
                      "question": "Define the principal focus of a convex lens.",
                      "answer": "The point on the principal axis where rays of light parallel to the principal axis converge after refracting through the lens."
                    },
                    {
                      "question": "What is the optical center?",
                      "answer": "The central point of the lens through which a ray of light passes undeviated."
                    },
                    {
                      "question": "Why is the focal length of a convex lens considered positive?",
                      "answer": "Because the real focus lies behind the lens, in the direction of the incident light, according to Cartesian sign convention."
                    },
                    {
                      "question": "What is parallax and how is it removed?",
                      "answer": "Parallax is the apparent separation of the needle and the image when the eye is moved sideways. It is removed by moving the image needle until its tip coincides perfectly with the image and they move together."
                    },
                    {
                      "question": "What is 'u' and 'v' in the lens formula?",
                      "answer": "u is the object distance (distance from optical center to object needle), v is the image distance (distance from optical center to image needle)."
                    },
                    {
                      "question": "Under what condition does a convex lens act as a magnifying glass?",
                      "answer": "When the object is placed between the optical center and the principal focus (u < f). The image formed is virtual, erect, and magnified."
                    },
                    {
                      "question": "How does the power of a lens relate to its focal length?",
                      "answer": "Power is the reciprocal of the focal length in meters (P = 1/f). A shorter focal length means higher converging power."
                    },
                    {
                      "question": "What happens to the focal length if the lens is immersed in water?",
                      "answer": "The focal length increases because the relative refractive index of glass with respect to water is less than that of glass with respect to air."
                    },
                    {
                      "question": "If you plot a graph of 1/v versus 1/u, what is the shape and what does the intercept represent?",
                      "answer": "The graph is a straight line. The x-intercept and y-intercept both represent 1/f."
                    }
                  ],
              realWorldApplications: [
                    "Human Eye: The crystalline lens in the human eye is a convex lens that focuses incoming light onto the retina.",
                    "Magnifying Glasses: Standard magnifying glasses use single convex lenses to produce enlarged virtual images.",
                    "Microscopes and Telescopes: Objective lenses and eyepieces are composed of complex arrangements of convex lenses to achieve high magnification.",
                    "Photography: Camera lenses use convex elements to focus images of real-world objects onto the digital sensor or film.",
                    "Eyeglasses: Convex lenses (positive diopter) are prescribed by optometrists to correct Hypermetropia (farsightedness).",
                    "Projectors: Used in movie and digital projectors to cast an enlarged real image onto a distant screen."
                  ]
        }
      },
      {
          id: 'p10',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Semiconductor Diode', description: 'Study I-V characteristics of p-n junction diode.', difficulty: 'Medium', duration: '30 min', category: 'Electronics',          content: { aim: "To study I-V characteristics of a p-n junction diode.", requirements: ["Diode", "Voltmeter", "Ammeter", "Battery"], theory: "Forward bias: current after 0.7V. Reverse bias: leakage current.", procedure: [
              "For Forward Bias, connect the p-side of the diode to the positive terminal of the battery and the n-side to the negative terminal via a rheostat.",
              "Connect a voltmeter (0-3V) in parallel and a milliammeter (0-50mA) in series with the diode.",
              "Gradually increase the voltage in steps of 0.1V and record the corresponding forward current.",
              "Observe the knee voltage where current starts rising sharply.",
              "For Reverse Bias, connect the p-side to the negative terminal and n-side to the positive terminal of a higher voltage source.",
              "Connect a voltmeter (0-50V) in parallel and a microammeter (0-100uA) in series.",
              "Increase the voltage in steps of 2V and record the steady reverse leakage current.",
              "Plot the Forward and Reverse I-V characteristics on a graph."
            ], objectives: ["Semiconductor behavior."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A p-n junction diode acts primarily as a:",
                      "options": [
                        "Amplifier",
                        "Oscillator",
                        "One-way valve (Rectifier)",
                        "Variable resistor"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 2,
                      "question": "In forward bias, the p-type material is connected to the:",
                      "options": [
                        "Positive terminal",
                        "Negative terminal",
                        "Ground",
                        "Base"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "The small current that flows during reverse bias is called:",
                      "options": [
                        "Forward current",
                        "Leakage current",
                        "Breakdown current",
                        "Threshold current"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "The voltage at which the forward current starts increasing rapidly is called the:",
                      "options": [
                        "Breakdown voltage",
                        "Reverse voltage",
                        "Knee voltage (or Cut-in voltage)",
                        "Stopping potential"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "For a typical Silicon diode, the knee voltage is approximately:",
                      "options": [
                        "0.3 V",
                        "0.7 V",
                        "1.5 V",
                        "5.0 V"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "For a typical Germanium diode, the knee voltage is approximately:",
                      "options": [
                        "0.3 V",
                        "0.7 V",
                        "1.5 V",
                        "5.0 V"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 7,
                      "question": "In reverse bias, if the voltage exceeds a critical limit, the diode conducts heavily. This is called:",
                      "options": [
                        "Knee point",
                        "Saturation",
                        "Zener/Avalanche Breakdown",
                        "Pinch-off"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "The depletion layer in a p-n junction ________ during forward bias.",
                      "options": [
                        "Widens",
                        "Narrows",
                        "Remains unchanged",
                        "Becomes an insulator"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Which carriers are responsible for the forward current in a diode?",
                      "options": [
                        "Only electrons",
                        "Only holes",
                        "Majority charge carriers (holes in p, electrons in n)",
                        "Minority charge carriers"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "In the experimental setup, a microammeter (uA) is used to measure current during:",
                      "options": [
                        "Forward bias",
                        "Reverse bias",
                        "Both forward and reverse",
                        "Neither"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a p-n junction?",
                      "answer": "It is the boundary or interface formed when a p-type semiconductor material is brought into intimate contact with an n-type semiconductor material."
                    },
                    {
                      "question": "What are holes and electrons?",
                      "answer": "Electrons are negative charge carriers. Holes are the absence of an electron in a covalent bond, acting as positive charge carriers."
                    },
                    {
                      "question": "What is the depletion layer?",
                      "answer": "A very thin region near the junction devoid of mobile charge carriers, creating a built-in potential barrier."
                    },
                    {
                      "question": "Define forward biasing.",
                      "answer": "Connecting the positive terminal of the battery to the p-region and the negative terminal to the n-region of the diode."
                    },
                    {
                      "question": "Why does current flow easily in forward bias?",
                      "answer": "Because the applied voltage opposes the potential barrier, narrowing the depletion region and allowing majority carriers to cross the junction."
                    },
                    {
                      "question": "Define reverse biasing.",
                      "answer": "Connecting the negative terminal of the battery to the p-region and the positive terminal to the n-region."
                    },
                    {
                      "question": "What is reverse saturation (leakage) current?",
                      "answer": "A very small current (in microamperes) that flows in reverse bias due to thermally generated minority charge carriers."
                    },
                    {
                      "question": "What is the knee voltage (cut-in voltage)?",
                      "answer": "The minimum forward voltage at which the diode starts to conduct heavily (approx. 0.7V for Si, 0.3V for Ge)."
                    },
                    {
                      "question": "What is Avalanche breakdown?",
                      "answer": "When a high reverse voltage is applied, minority carriers gain enough kinetic energy to knock out more electrons from covalent bonds, causing a huge surge in current that may destroy an ordinary diode."
                    },
                    {
                      "question": "Why do we use an ammeter in milliamperes (mA) for forward bias, but microamperes (uA) for reverse bias?",
                      "answer": "Forward current is large (due to majority carriers), while reverse leakage current is minute (due to minority carriers)."
                    }
                  ],
              realWorldApplications: [
                    "AC to DC Rectification: The primary component in power supplies and mobile phone chargers that converts alternating current from the wall into direct current.",
                    "Radio Demodulation: Used as 'detectors' in crystal radios to extract audio signals from amplitude-modulated (AM) radio carrier waves.",
                    "Light Emitting Diodes (LEDs): Specialized p-n junctions that release photons when forward-biased, used in everything from TV screens to light bulbs.",
                    "Solar Cells (Photodiodes): Large p-n junctions that generate current when exposed to light, converting solar energy into electricity.",
                    "Voltage Clamping: Used to protect sensitive electronics from voltage spikes and transient electrostatic discharges.",
                    "Logic Gates: Used to build basic OR/AND digital logic circuits in early computer designs."
                  ]
        }
      },
      {
          id: 'p11',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Sonometer — String Frequency', description: 'Verify laws of vibrating strings.', difficulty: 'Medium', duration: '35 min', category: 'Waves',          content: { aim: "To verify laws of vibrating strings.", requirements: ["Sonometer", "Tuning Forks", "Weights"], theory: "A sonometer consists of a hollow wooden box with a stretched metallic wire fixed at one end and passing over movable bridges. Weights can be attached to provide tension.\n\n**Principle:**\nWhen a string vibrates in its fundamental mode, the frequency of vibration is given by:\nf = (1/2L) × √(T/μ)\nwhere L = vibrating length, T = tension in the wire, μ = linear mass density (mass per unit length) of the wire.\n\n**Laws of Vibrating Strings:**\n1. **Law of Length:** f ∝ 1/L (for constant T and μ). So f × L = constant.\n2. **Law of Tension:** f ∝ √T (for constant L and μ).\n3. **Law of Mass:** f ∝ 1/√μ (for constant L and T).\n\n**Resonance:**\nWhen the natural frequency of the wire matches the frequency of an external source (tuning fork), the wire vibrates with maximum amplitude — this is resonance. A paper rider placed on the wire is thrown off at resonance.\n\n**Experimental Verification:**\nBy keeping tension constant and varying the vibrating length to achieve resonance with tuning forks of known frequencies, the law of length (f × L = constant) can be verified.", procedure: [
              "Place the sonometer on the table and stretch the wire over the two movable bridges, passing it over the pulley.",
              "Suspend a known mass (e.g., 1kg or 2kg) from the free end to provide tension (T).",
              "Strike a tuning fork of known frequency and place its stem gently on the sonometer box.",
              "Place a small V-shaped paper rider exactly in the middle of the wire between the bridges.",
              "Adjust the distance between the two bridges until the wire resonates with the tuning fork, causing the paper rider to flutter and fall off.",
              "Measure the resonant length (l) between the two bridges.",
              "Repeat the procedure with tuning forks of 4 to 5 different frequencies while keeping tension constant.",
              "Verify the law of length by checking if frequency * length is a constant."
            ], objectives: ["Standing waves."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A sonometer is fundamentally used to study the laws of:",
                      "options": [
                        "Transverse vibrations of strings",
                        "Longitudinal sound waves",
                        "Electromagnetism",
                        "Fluid dynamics"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 2,
                      "question": "According to the Law of Length, the fundamental frequency (n) of a stretched string is:",
                      "options": [
                        "Directly proportional to its length",
                        "Inversely proportional to its length",
                        "Proportional to the square of its length",
                        "Independent of length"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "According to the Law of Tension, the frequency (n) is directly proportional to the square root of:",
                      "options": [
                        "Length (l)",
                        "Linear density (m)",
                        "Tension (T)",
                        "Amplitude"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "According to the Law of Mass, frequency (n) is inversely proportional to the square root of:",
                      "options": [
                        "Mass of the bob",
                        "Tension",
                        "Mass per unit length (m)",
                        "Radius of the wire"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "In the sonometer experiment, resonance is proven when:",
                      "options": [
                        "The string breaks",
                        "The tuning fork stops vibrating",
                        "The paper rider is thrown off",
                        "The bridges fall"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "What type of wave is produced in the sonometer wire?",
                      "options": [
                        "Longitudinal traveling",
                        "Transverse stationary (standing) wave",
                        "Longitudinal standing wave",
                        "Electromagnetic wave"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "At the position of the wooden bridges, what part of the standing wave is formed?",
                      "options": [
                        "Antinode",
                        "Node",
                        "Both",
                        "Neither"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "The distance between two adjacent bridges during resonance (the fundamental mode) is equal to:",
                      "options": [
                        "Wavelength (λ)",
                        "Half the wavelength (λ/2)",
                        "Quarter wavelength (λ/4)",
                        "Double the wavelength"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "If the tension on the wire is quadrupled, its vibrating frequency will:",
                      "options": [
                        "Quadruple",
                        "Double",
                        "Halve",
                        "Remain the same"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "How do you calculate mass per unit length (m)?",
                      "options": [
                        "Mass / Volume",
                        "Mass of the wire / Length of the wire",
                        "Tension / Length",
                        "Volume / Density"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a sonometer?",
                      "answer": "An apparatus consisting of a hollow wooden box with a wire stretched across it, used to verify the laws of vibrating strings."
                    },
                    {
                      "question": "Why is the sonometer box hollow and provided with holes?",
                      "answer": "The hollow box acts as a resonating chamber. The air inside vibrates in sympathy with the wire, producing a louder sound, and the holes allow communication with the outside air."
                    },
                    {
                      "question": "What are stationary (standing) waves?",
                      "answer": "Waves formed by the superposition of two identical progressive waves traveling in opposite directions. They have fixed nodes (zero amplitude) and antinodes (max amplitude)."
                    },
                    {
                      "question": "What is meant by the 'fundamental frequency'?",
                      "answer": "The lowest frequency at which the string can vibrate, occurring when exactly one loop is formed between the two bridges."
                    },
                    {
                      "question": "What is meant by 'resonance' in this experiment?",
                      "answer": "Resonance occurs when the natural frequency of the stretched string exactly matches the applied frequency (of the tuning fork), resulting in maximum amplitude of vibration."
                    },
                    {
                      "question": "Why do we place a paper rider exactly at the center of the segment?",
                      "answer": "Because in the fundamental mode of vibration, an antinode (point of maximum displacement) is formed at the center, shaking the rider the hardest."
                    },
                    {
                      "question": "How is the tension (T) measured in the wire?",
                      "answer": "Tension T = Mg, where M is the total mass suspended on the hanger and g is the acceleration due to gravity."
                    },
                    {
                      "question": "What is 'm' in the formula n = (1/2l)√(T/m)?",
                      "answer": "Linear density, which is the mass per unit length of the wire (kilograms per meter)."
                    },
                    {
                      "question": "How can you change the pitch (frequency) of a guitar string?",
                      "answer": "By tightening tuning pegs (increasing Tension), changing the finger position (decreasing Length), or using thicker/heavier strings (increasing m)."
                    },
                    {
                      "question": "Does the thickness (diameter) of the wire affect its frequency?",
                      "answer": "Yes, a thicker wire has a greater mass per unit length (m), which decreases the frequency according to the Law of Mass."
                    }
                  ],
              realWorldApplications: [
                    "Musical Instruments: The fundamental laws of strings dictate exactly how pianos, guitars, violins, and cellos are designed and tuned.",
                    "Piano Tuning: Piano tuners adjust the tension of strings to achieve the precise resonant frequency required for musical notes.",
                    "Structural Engineering: Understanding standing waves and resonant frequencies in cables prevents bridge collapses (e.g., Tacoma Narrows).",
                    "Power Lines: Engineers must tension high-voltage overhead wires correctly to avoid destructive wind-induced 'galloping' or vibrations.",
                    "Elevator Cables: Testing cable tensions by measuring their resonant frequencies under load to ensure passenger safety.",
                    "Acoustic Architecture: Designing concert hall stringed panels and acoustic absorbers that resonate at specific frequencies to shape sound."
                  ]
        }
      },
      {
          id: 'p12',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Resonance Tube — Speed of Sound', description: 'Determine speed of sound in air.', difficulty: 'Medium', duration: '30 min', category: 'Waves',          content: { aim: "To determine speed of sound using resonance tube.", requirements: ["Resonance Tube", "Tuning Forks", "Water"], theory: "A resonance tube is a closed pipe apparatus used to determine the speed of sound in air by utilizing the principle of resonance with a tuning fork of known frequency.\n\n**Principle:**\nWhen a vibrating tuning fork is held near the open end of a tube closed at the other end (by water), standing waves are formed. Resonance occurs when the length of the air column is such that an antinode forms at the open end and a node at the closed end.\n\n**Resonance Conditions:**\n- First resonance: L₁ ≈ λ/4\n- Second resonance: L₂ ≈ 3λ/4\n\n**Speed of Sound Calculation:**\nL₂ - L₁ = λ/2, therefore λ = 2(L₂ - L₁)\nSpeed of sound: v = fλ = 2f(L₂ - L₁)\n\n**End Correction:**\nThe antinode forms slightly outside the open end. e = 0.3d (where d is the internal diameter).\ne = (L₂ - 3L₁)/2\n\n**Factors Affecting Speed of Sound:**\nSpeed increases with temperature: v ∝ √T (absolute temperature). At 0°C, the speed of sound in air is approximately 332 m/s.", procedure: [
              "Set up the resonance tube apparatus and adjust it so it stands vertically.",
              "Fill the tube completely with water using the attached reservoir.",
              "Strike a tuning fork of known frequency (e.g., 512 Hz) against a rubber pad and hold it horizontally just above the open end of the tube.",
              "Gradually lower the water level by lowering the reservoir until a loud resonant sound is heard.",
              "Measure the length of the air column from the water surface to the top of the tube. This is the first resonating length (l1).",
              "Lower the water level further to approximately three times l1 and fine-tune to find the second resonant position.",
              "Measure the second resonating length (l2).",
              "Calculate the speed of sound using v = 2 * frequency * (l2 - l1)."
            ], objectives: ["Understand resonance."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A resonance tube is used to determine the speed of sound in:",
                      "options": [
                        "Water",
                        "Glass",
                        "Air",
                        "Vacuum"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 2,
                      "question": "What type of wave is formed in the air column of the resonance tube?",
                      "options": [
                        "Transverse standing wave",
                        "Longitudinal stationary wave",
                        "Electromagnetic wave",
                        "Water wave"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "The closed end of the resonance tube (water surface) acts as a:",
                      "options": [
                        "Node",
                        "Antinode",
                        "Crest",
                        "Trough"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 4,
                      "question": "The open end of the resonance tube acts approximately as an:",
                      "options": [
                        "Antinode",
                        "Node",
                        "Neither",
                        "Rigid boundary"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 5,
                      "question": "The first resonance length (l1) relates to wavelength (λ) as approximately:",
                      "options": [
                        "λ",
                        "λ/2",
                        "λ/4",
                        "3λ/4"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "The second resonance length (l2) is roughly how many times the first resonance length (l1)?",
                      "options": [
                        "2 times",
                        "3 times",
                        "4 times",
                        "5 times"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "The formula for the speed of sound using two resonances is:",
                      "options": [
                        "v = f(l2 - l1)",
                        "v = 2f(l2 + l1)",
                        "v = 2f(l2 - l1)",
                        "v = f/(l2-l1)"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "What is the 'end correction' (e)?",
                      "options": [
                        "Error in the scale",
                        "Distance above the tube opening where the true antinode forms",
                        "Effect of temperature",
                        "Error in the tuning fork"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Does the speed of sound in air depend on temperature?",
                      "options": [
                        "No, it is constant",
                        "Yes, it increases with temperature",
                        "Yes, it decreases with temperature",
                        "It fluctuates randomly"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "The purpose of the water in the resonance tube is to:",
                      "options": [
                        "Cool the air",
                        "Act as a rigid boundary that reflects the sound wave",
                        "Moisten the air",
                        "Make it look like a liquid"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is resonance in this experiment?",
                      "answer": "Resonance occurs when the frequency of the vibrating tuning fork exactly matches the natural frequency of the air column in the tube, creating a loud boom."
                    },
                    {
                      "question": "How do longitudinal waves travel?",
                      "answer": "They travel as alternating series of compressions (high pressure) and rarefactions (low pressure) parallel to the direction of wave propagation."
                    },
                    {
                      "question": "Why is an antinode formed slightly outside the open end of the tube?",
                      "answer": "Because the sound wave needs some space to expand completely into the surrounding open air, resulting in an 'end correction'."
                    },
                    {
                      "question": "Write the formula for the end correction (e).",
                      "answer": "e = (l2 - 3l1) / 2, or roughly e ≈ 0.3 * d (where d is the internal diameter of the tube)."
                    },
                    {
                      "question": "Why do we use the difference of two resonance lengths (l2 - l1)?",
                      "answer": "Subtracting l1 from l2 automatically cancels out the difficult-to-measure end correction, yielding a purely wavelength-dependent distance (λ/2)."
                    },
                    {
                      "question": "Why does the water level change the natural frequency?",
                      "answer": "Changing the water level changes the length of the air column. Shorter columns resonate at higher frequencies, longer columns at lower frequencies."
                    },
                    {
                      "question": "What is the approximate speed of sound in air at 0°C?",
                      "answer": "Approximately 331 meters per second (m/s)."
                    },
                    {
                      "question": "How does humidity affect the speed of sound?",
                      "answer": "The speed of sound increases slightly with humidity, because moist air is less dense than dry air."
                    },
                    {
                      "question": "Can we find a third resonance length?",
                      "answer": "Yes, it occurs at approximately 5λ/4. However, the tube must be long enough to accommodate it."
                    },
                    {
                      "question": "Why shouldn't the tuning fork touch the edges of the tube?",
                      "answer": "Touching the tube will dampen the tuning fork's vibrations rapidly and introduce unwanted mechanical rattling."
                    }
                  ],
              realWorldApplications: [
                    "Wind Instruments: Defines how flutes, clarinets, pipe organs, and trumpets are designed with specific tube lengths to produce precise musical notes.",
                    "Acoustic Metamaterials: Designing tubes and chambers inside mufflers and exhaust pipes to purposely resonate and cancel out engine noise.",
                    "Architecture: Identifying unwanted resonant frequencies in long corridors or stairwells to mitigate acoustic echoing problems.",
                    "Hearing Sciences: The human ear canal acts essentially as a closed resonant tube, naturally amplifying frequencies around 3 kHz.",
                    "Meteorological Remote Sensing: SODAR devices use pulses of sound to measure atmospheric wind profiles and temperature based on sound velocity.",
                    "Voice Mechanics: Understanding how the vocal tract works as an adjustable resonant tube to produce different vowel sounds."
                  ]
        }
      }
,
      {
          id: 'p6',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Metre Bridge — Resistance', description: 'Determine resistance per unit length using Metre Bridge.', difficulty: 'Medium', duration: '35 min', category: 'Electricity',          content: { aim: "To determine resistance using a Metre Bridge.", requirements: ["Metre Bridge", "Resistance Box", "Galvanometer", "Jockey"], theory: "The Metre Bridge (also called a slide wire bridge) is a practical form of the Wheatstone Bridge used to measure an unknown resistance.\n\n**Wheatstone Bridge Principle:**\nA Wheatstone Bridge consists of four resistances P, Q, R, and S arranged in a diamond shape. A galvanometer is connected between the junctions of P-Q and R-S. At balance (null point), no current flows through the galvanometer, and:\nP/Q = R/S\n\n**Metre Bridge Working:**\nIn a metre bridge, a 1-meter long uniform resistance wire replaces two of the four resistances. An unknown resistance S is placed in one gap and a known resistance R from a resistance box in the other gap. A jockey is slid along the wire to find the null point at distance l from one end.\n\nAt balance: R/S = l/(100 - l)\nTherefore: S = R(100 - l)/l\n\n**Key Points:**\n- The wire must be uniform in cross-section.\n- The balancing length should be near the middle (between 30cm and 70cm) for accurate results.\n- End corrections may need to be applied for the resistance of thick copper strips at the ends.", procedure: [
              "Draw a circuit diagram and connect the apparatus strictly as shown.",
              "Connect the unknown resistance wire in the right gap and the resistance box in the left gap of the metre bridge.",
              "Introduce a known resistance (R) from the resistance box.",
              "Touch the jockey gently at the left end and right end of the bridge wire to verify opposite deflections in the galvanometer.",
              "Slide the jockey gently along the wire to find the null point where the galvanometer shows zero deflection.",
              "Note the balancing length (l) from the zero end.",
              "Calculate unknown resistance S = R(100 - l)/l.",
              "Repeat for 4 to 5 different values of R."
            ], objectives: ["Verify Kirchhoff's laws."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The Metre Bridge works on the principle of:",
                      "options": [
                        "Ohm's Law",
                        "Wheatstone Bridge",
                        "Kirchhoff's Laws",
                        "Faraday's Laws"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "The length of the wire in a standard Metre Bridge is:",
                      "options": [
                        "50 cm",
                        "100 cm (1 metre)",
                        "200 cm",
                        "10 metres"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "Why is the Metre Bridge wire made of Constantan or Manganin?",
                      "options": [
                        "High conductivity",
                        "Low melting point",
                        "High resistivity and low temperature coefficient",
                        "Cheap material"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "If the null point is obtained at 40 cm from the left end (with unknown resistance in left gap), the ratio R/S is:",
                      "options": [
                        "40/60",
                        "60/40",
                        "40/100",
                        "100/40"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 5,
                      "question": "To increase the sensitivity of the Metre Bridge, the null point should ideally be obtained near:",
                      "options": [
                        "The left end (0 cm)",
                        "The middle (50 cm)",
                        "The right end (100 cm)",
                        "The 25 cm mark"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The thick copper strips used in a Metre Bridge minimize:",
                      "options": [
                        "Contact resistance",
                        "Magnetic interference",
                        "Eddy currents",
                        "Inductance"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 7,
                      "question": "What happens if the jockey is dragged forcefully along the wire?",
                      "options": [
                        "It produces sparks",
                        "It changes the uniform cross-sectional area of the wire",
                        "It increases voltage",
                        "It decreases resistance"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Why should the battery key be closed only when taking a reading?",
                      "options": [
                        "To save electricity",
                        "To prevent heating of the wire",
                        "To avoid damaging the galvanometer",
                        "To prevent magnetization"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The specific resistance (resistivity) of the wire material depends on:",
                      "options": [
                        "Length of wire",
                        "Radius of wire",
                        "Nature of the material",
                        "Applied voltage"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "If the radius of the unknown resistance wire is doubled, its specific resistance will:",
                      "options": [
                        "Double",
                        "Halve",
                        "Increase four times",
                        "Remain unchanged"
                      ],
                      "correctIndex": 3
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a Wheatstone Bridge?",
                      "answer": "An arrangement of four resistances used to measure one unknown resistance by balancing the two legs of a bridge circuit."
                    },
                    {
                      "question": "What is the condition for a balanced Wheatstone Bridge?",
                      "answer": "P/Q = R/S, or no current flows through the galvanometer."
                    },
                    {
                      "question": "Why are the connections made using thick copper strips?",
                      "answer": "Thick copper strips have very low resistance, so they do not add significant error to the resistance measurements."
                    },
                    {
                      "question": "What is the 'null point'?",
                      "answer": "The point on the Metre Bridge wire where touching the jockey results in zero deflection in the galvanometer."
                    },
                    {
                      "question": "Why shouldn't you slide the jockey on the wire?",
                      "answer": "Sliding scrapes the wire, making its cross-section non-uniform, which alters its resistance per unit length."
                    },
                    {
                      "question": "Why is Constantan or Manganin used for the bridge wire?",
                      "answer": "They have high resistivity and a very low temperature coefficient of resistance, meaning their resistance doesn't change much as they heat up."
                    },
                    {
                      "question": "Can a Metre Bridge be used to measure very high or very low resistances accurately?",
                      "answer": "No, it is inaccurate for very low resistances (due to contact resistance) and very high resistances (due to low sensitivity of the galvanometer at high resistance)."
                    },
                    {
                      "question": "What happens to the null point if the positions of the battery and galvanometer are interchanged?",
                      "answer": "The balanced condition remains unaffected; the null point does not shift."
                    },
                    {
                      "question": "Why is it advised to obtain the balance point near the middle (50 cm)?",
                      "answer": "It minimizes the percentage error in the measurement of length (l) and (100-l)."
                    },
                    {
                      "question": "How does the specific resistance depend on the measurement of the radius?",
                      "answer": "Resistivity = (R * π * r²) / L. Because r is squared, any error in measuring the radius (e.g., using a screw gauge) is magnified."
                    }
                  ],
              realWorldApplications: [
                    "Precision Resistor Calibration: Used in labs to verify the exact resistance of standard resistors produced for electronics.",
                    "Strain Gauges: Wheatstone bridge circuits form the basis of strain gauges used in mechanical engineering to measure applied stress.",
                    "Temperature Sensors: RTDs (Resistance Temperature Detectors) use bridge circuits to measure minute changes in resistance due to temperature.",
                    "Fault Detection: Cable companies use similar bridge principles (Murray loop test) to locate short circuits in underground telecommunication cables.",
                    "Material Testing: Determining the resistivity of newly synthesized alloys and conductive polymers.",
                    "Weight Scales: Electronic scales and balances use load cells constructed from Wheatstone bridge configurations."
                  ]
        }
      },
      {
          id: 'p7',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Galvanometer — Figure of Merit', description: 'Determine figure of merit of a galvanometer.', difficulty: 'Hard', duration: '40 min', category: 'Electricity',          content: { aim: "To determine the figure of merit of a galvanometer.", requirements: ["Galvanometer", "Battery", "Resistance Box"], theory: "The figure of merit of a galvanometer is defined as the current required to produce a unit deflection in the galvanometer. It is a measure of the sensitivity of the instrument.\n\n**Formula:**\nk = E / [(R + G) × θ]\nwhere k = figure of merit (A/div), E = EMF of the battery, R = resistance from the resistance box, G = galvanometer resistance, θ = deflection in divisions.\n\n**Galvanometer Resistance (G):**\nG is determined by the half-deflection method. First, a deflection θ is obtained with resistance R alone. Then a shunt S is connected across the galvanometer and adjusted to get deflection θ/2. At this point, G ≈ S.\n\n**Sensitivity:**\nA galvanometer with a smaller figure of merit is more sensitive, meaning it produces a larger deflection per unit current. Current sensitivity = 1/k = θ/Ig.\n\n**Applications:**\nThe figure of merit is essential for converting a galvanometer into an ammeter (by adding a shunt) or a voltmeter (by adding a high series resistance).", procedure: [
              "Connect the battery, a high resistance box (R), and the galvanometer in series with a one-way key.",
              "Connect a low resistance box (S) in parallel with the galvanometer to act as a shunt, along with another key.",
              "Close the main key and introduce a high resistance to obtain a full-scale deflection (theta) in the galvanometer.",
              "Record the value of resistance R and the deflection theta.",
              "Close the shunt key and adjust the shunt resistance S until the deflection is reduced exactly to half (theta/2).",
              "Record the value of S. The galvanometer resistance G is roughly equal to S.",
              "Calculate the figure of merit k = E / ((R + G) * theta).",
              "Repeat for different starting deflections."
            ], objectives: ["Understand sensitivity."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The figure of merit of a galvanometer is defined as:",
                      "options": [
                        "Current required for full scale deflection",
                        "Current required to produce a deflection of one division",
                        "Resistance of the galvanometer",
                        "Voltage per division"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "What is the SI unit of figure of merit (k)?",
                      "options": [
                        "Ampere/division",
                        "Volt/division",
                        "Ohm/Ampere",
                        "Divisions/Ampere"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "The resistance of a galvanometer is typically measured using the:",
                      "options": [
                        "Meter bridge",
                        "Half-deflection method",
                        "Ohm's law setup",
                        "Potentiometer"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "In the half-deflection method, if initial deflection is θ, we introduce a shunt resistance to make the deflection:",
                      "options": [
                        "2θ",
                        "Zero",
                        "θ/2",
                        "θ/4"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "The figure of merit (k) is related to full-scale deflection current (Ig) and total divisions (N) by:",
                      "options": [
                        "Ig = k/N",
                        "Ig = k + N",
                        "Ig = k * N",
                        "Ig = N/k"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "If the total number of divisions on the galvanometer scale is 30, and the figure of merit is 20 microamperes/div, the maximum current it can measure is:",
                      "options": [
                        "20 uA",
                        "30 uA",
                        "600 uA",
                        "1.5 uA"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 7,
                      "question": "High resistance R is connected in series with the galvanometer initially to:",
                      "options": [
                        "Increase current",
                        "Prevent the galvanometer from burning out",
                        "Decrease the figure of merit",
                        "Stop the current entirely"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Which equation represents the figure of merit (k) in terms of EMF (E), series resistance (R), galvanometer resistance (G), and deflection (θ)?",
                      "options": [
                        "k = E / ((R+G)*θ)",
                        "k = E*θ / (R+G)",
                        "k = (R+G) / (E*θ)",
                        "k = E / (R*G*θ)"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 9,
                      "question": "A galvanometer detects:",
                      "options": [
                        "Only voltage",
                        "Large currents only",
                        "Small electric currents",
                        "Magnetic poles"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "When finding the galvanometer resistance using half deflection, the shunt resistance (S) is approximately equal to the galvanometer resistance (G) because:",
                      "options": [
                        "The series resistance R is very low",
                        "The series resistance R is very high compared to G and S",
                        "Current is doubled",
                        "Voltage is halved"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a moving coil galvanometer?",
                      "answer": "An instrument used to detect and measure small electric currents, operating on the principle that a current-carrying coil in a magnetic field experiences a torque."
                    },
                    {
                      "question": "What do you mean by the figure of merit (k)?",
                      "answer": "It is the amount of current required to produce a deflection of one scale division in the galvanometer."
                    },
                    {
                      "question": "How is figure of merit different from current sensitivity?",
                      "answer": "Figure of merit is current per division (I/θ), whereas current sensitivity is deflection per unit current (θ/I). They are reciprocals of each other."
                    },
                    {
                      "question": "What is the half-deflection method?",
                      "answer": "A method to find the internal resistance of a galvanometer by introducing a shunt resistance that halves the initial deflection, making the shunt resistance effectively equal to the galvanometer resistance."
                    },
                    {
                      "question": "Why is a high resistance (R) used in series with the battery?",
                      "answer": "To limit the current in the circuit so that the sensitive galvanometer coil does not get damaged or burn out."
                    },
                    {
                      "question": "What determines the figure of merit?",
                      "answer": "The strength of the magnetic field, number of turns in the coil, area of the coil, and the restoring torque per unit twist of the suspension spring."
                    },
                    {
                      "question": "What is the typical order of magnitude for a galvanometer's resistance (G)?",
                      "answer": "Usually in the range of 50 to 100 Ohms."
                    },
                    {
                      "question": "What is a 'shunt'?",
                      "answer": "A low resistance connected in parallel to a galvanometer to bypass the majority of the current, effectively converting it into an ammeter."
                    },
                    {
                      "question": "What kind of magnetic poles are used in a galvanometer and why?",
                      "answer": "Concave cylindrical magnetic poles are used to produce a radial magnetic field, ensuring the plane of the coil is always parallel to the field lines."
                    },
                    {
                      "question": "Why must the battery key be opened when making changes to the resistance box?",
                      "answer": "To prevent accidental high current surges from damaging the galvanometer."
                    }
                  ],
              realWorldApplications: [
                    "Instrumentation: Galvanometers are the internal sensing mechanism inside many traditional analog ammeters and voltmeters (multimeters).",
                    "ECG Machines: Early string galvanometers were used as the primary recording instruments for the first electrocardiograms.",
                    "Laser Light Shows: Galvanometer scanners (galvos) are used to rapidly aim laser beams by pivoting small mirrors.",
                    "Hard Drives: The positioning of the read/write head in a computer hard drive relies on voice coil actuators that operate on galvanometer principles.",
                    "Seismic Detectors: Detecting minute electrical signals generated by geological sensors to predict earthquakes.",
                    "Light Meters: Used in older photography light meters where a photovoltaic cell generates a tiny current directly proportional to light intensity."
                  ]
        }
      },
      {
          id: 'p8',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Glass Prism — Refractive Index', description: 'Find refractive index using minimum deviation.', difficulty: 'Medium', duration: '30 min', category: 'Optics',          content: { aim: "To find refractive index of glass prism.", requirements: ["Glass Prism", "Drawing Board", "Pins"], theory: "When a ray of light passes through a glass prism, it undergoes refraction at both surfaces. The angle between the incident ray and the emergent ray is called the angle of deviation (δ).\n\n**Prism Geometry:**\nA prism has two refracting surfaces inclined at an angle A (the angle of the prism). At the first surface, the ray bends toward the normal; at the second, it bends away from the normal.\n\n**Minimum Deviation (Dm):**\nAs the angle of incidence increases, the angle of deviation first decreases, reaches a minimum value (Dm), and then increases. At minimum deviation, the refracted ray inside the prism is parallel to the base, and the angle of incidence equals the angle of emergence (i = e).\n\n**Refractive Index Formula:**\nAt minimum deviation:\nμ = sin[(A + Dm)/2] / sin(A/2)\nwhere μ is the refractive index of the prism material.\n\n**i-δ Graph:**\nA plot of i vs δ gives a U-shaped curve with the minimum at Dm. This graph is used experimentally to find Dm and hence μ.\n\n**Snell's Law:** At each refracting surface: n₁ sin i = n₂ sin r.", procedure: [
              "Fix a white sheet of paper on a drawing board using drawing pins.",
              "Place the glass prism on the paper and trace its triangular outline.",
              "Remove the prism and draw a normal to one refracting face. Draw an incident ray making an angle of incidence (e.g., 30 degrees).",
              "Fix two pins P and Q vertically on the incident ray.",
              "Place the prism back exactly on its outline.",
              "Look through the other refracting face and fix two more pins R and S such that they perfectly align with the images of P and Q.",
              "Remove the prism and pins, draw the emergent ray joining R and S, and measure the angle of deviation.",
              "Repeat the experiment for angles of incidence from 35 degrees to 60 degrees in steps of 5 degrees.",
              "Plot a graph between angle of incidence (i) and angle of deviation, and determine the angle of minimum deviation to calculate the refractive index."
            ], objectives: ["Snell's Law."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "What is the angle of deviation?",
                      "options": [
                        "Angle between incident ray and emergent ray",
                        "Angle between incident ray and normal",
                        "Angle of the prism",
                        "Angle between refracted ray and emergent ray"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 2,
                      "question": "At the angle of minimum deviation, how does the refracted ray behave inside the prism?",
                      "options": [
                        "It reflects back",
                        "It travels parallel to the base of the prism",
                        "It bends towards the apex",
                        "It splits into seven colors"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "The graph plotted between angle of incidence (i) and angle of deviation (D) is a:",
                      "options": [
                        "Straight line",
                        "Circle",
                        "Parabola (U-shaped curve)",
                        "Sine wave"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "At the angle of minimum deviation (Dm), the angle of incidence (i) is equal to:",
                      "options": [
                        "Angle of prism (A)",
                        "Angle of refraction (r)",
                        "Angle of emergence (e)",
                        "90 degrees"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "The formula to calculate the refractive index (n) of the prism is:",
                      "options": [
                        "sin((A+Dm)/2) / sin(A/2)",
                        "sin(A/2) / sin((A+Dm)/2)",
                        "sin(A+Dm) / sin(A)",
                        "sin(i) / sin(e)"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 6,
                      "question": "If the angle of a prism is 60° and the minimum deviation is 30°, the refractive index is:",
                      "options": [
                        "1.0",
                        "1.414 (sqrt 2)",
                        "1.5",
                        "1.732 (sqrt 3)"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Which color of white light deviates the most through a glass prism?",
                      "options": [
                        "Red",
                        "Green",
                        "Yellow",
                        "Violet"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 8,
                      "question": "Dispersion of light occurs because the refractive index of glass is:",
                      "options": [
                        "Constant for all colors",
                        "Different for different wavelengths of light",
                        "Zero inside the prism",
                        "Dependent on the temperature alone"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "What is the typical angle of an equilateral glass prism?",
                      "options": [
                        "45°",
                        "60°",
                        "90°",
                        "120°"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "If a monochromatic red laser is passed through the prism instead of white light, what will you observe?",
                      "options": [
                        "A rainbow",
                        "No deviation",
                        "Deviation but no dispersion (single red spot)",
                        "The beam disappears"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is meant by refraction of light?",
                      "answer": "The bending of a light ray as it passes from one transparent medium into another, due to a change in its speed."
                    },
                    {
                      "question": "What is the Angle of Prism (A)?",
                      "answer": "The angle between the two refracting surfaces of the prism."
                    },
                    {
                      "question": "Define the Angle of Deviation (D).",
                      "answer": "The angle formed between the path of the incident ray and the path of the emergent ray."
                    },
                    {
                      "question": "What is the condition for minimum deviation?",
                      "answer": "The angle of incidence must equal the angle of emergence (i = e), and the refracted ray inside the prism is parallel to its base."
                    },
                    {
                      "question": "Why does white light split into seven colors when passing through a prism?",
                      "answer": "Because white light is composed of different wavelengths (colors), and the refractive index of glass is different for each wavelength, causing each color to bend by a different amount (Dispersion)."
                    },
                    {
                      "question": "Which color deviates the least and why?",
                      "answer": "Red light deviates the least because it has the longest wavelength and consequently experiences the lowest refractive index in glass."
                    },
                    {
                      "question": "What does Snell's Law state?",
                      "answer": "The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant for a given pair of media (n = sin i / sin r)."
                    },
                    {
                      "question": "Why is a pin method used to trace the rays?",
                      "answer": "Object pins establish the incident ray line, and viewing their aligned images through the prism allows us to trace the precise emergent path."
                    },
                    {
                      "question": "How does the angle of deviation change if the prism is immersed in water?",
                      "answer": "The angle of deviation decreases because the relative refractive index of glass with respect to water is less than that of glass with respect to air."
                    },
                    {
                      "question": "Is the graph of angle 'i' versus 'D' a perfect parabola?",
                      "answer": "No, it is an asymmetric U-shaped curve. It decreases to a minimum and then rises, but not symmetrically."
                    }
                  ],
              realWorldApplications: [
                    "Spectrometers: Prisms are used to disperse light into its constituent spectra to analyze the chemical composition of stars and materials.",
                    "Binoculars and Periscopes: Porro prisms and roof prisms utilize total internal reflection to erect the inverted images formed by objective lenses.",
                    "Cameras: Used inside DSLR viewfinders (pentaprisms) to direct light from the lens into the photographer's eye.",
                    "Optometry: Small prisms are ground into eyeglass lenses to correct double vision (diplopia) and strabismus.",
                    "Rainbows: Water droplets in the atmosphere act as billions of tiny prisms to naturally disperse sunlight.",
                    "Laser Technology: Anamorphic prism pairs are used to shape and correct the elliptical beams emitted by laser diodes."
                  ]
        }
      },
      {
          id: 'p9',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Convex Lens — Focal Length', description: 'Determine focal length using u-v method.', difficulty: 'Easy', duration: '25 min', category: 'Optics',          content: { aim: "To determine focal length of convex lens.", requirements: ["Convex Lens", "Optical Bench", "Screen"], theory: "A convex lens is a transparent optical element that converges parallel rays of light to a point called the principal focus. It is thicker at the center than at the edges.\n\n**Lens Formula:**\n1/v - 1/u = 1/f\nwhere u = object distance, v = image distance, f = focal length. The New Cartesian sign convention is used.\n\n**Sign Convention:**\n- All distances are measured from the optical center of the lens.\n- Distances measured in the direction of incident light are positive.\n- The focal length of a convex lens is positive.\n\n**Image Formation:**\nDepending on the object position, a convex lens forms real/virtual, inverted/erect, and magnified/diminished images. When the object is beyond 2F, the image is between F and 2F (diminished); at 2F, same size; between F and 2F, magnified; at F, image at infinity.\n\n**u-v Method:**\nBy measuring u and v for different object positions and using the lens formula, the focal length can be calculated. A graph of 1/v vs 1/u gives a straight line with intercepts equal to 1/f.\n\n**Power of a Lens:** P = 1/f (in meters), measured in Diopters (D).", procedure: [
              "Find the rough focal length of the convex lens by catching the image of a distant tree or window on a screen.",
              "Mount the convex lens in a lens holder equipped on the optical bench.",
              "Place the object pin (O) in front of the lens at a distance slightly greater than the rough focal length.",
              "Place the image pin (I) on the other side of the lens and move it to locate the real and inverted image.",
              "Adjust the image pin to accurately remove parallax between the tip of the image and the tip of the image pin.",
              "Note the object distance (u) and image distance (v).",
              "Repeat the process for 5 or 6 different object distances.",
              "Calculate focal length f = (uv)/(u+v) and verify it by plotting a u-v graph."
            ], objectives: ["Verify lens formula."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A convex lens is also known as:",
                      "options": [
                        "Diverging lens",
                        "Converging lens",
                        "Plano-concave lens",
                        "Cylindrical lens"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "According to the thin lens formula, 1/f is equal to:",
                      "options": [
                        "1/v + 1/u",
                        "1/u - 1/v",
                        "1/v - 1/u",
                        "v + u"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "According to sign convention, the object distance (u) is always taken as:",
                      "options": [
                        "Positive",
                        "Negative",
                        "Zero",
                        "Not fixed"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "If an object is placed at infinity in front of a convex lens, the image is formed at:",
                      "options": [
                        "Center of curvature",
                        "Infinity",
                        "The principal focus",
                        "Optical center"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "For an object placed at 2F of a convex lens, the image is formed at:",
                      "options": [
                        "F",
                        "Between F and 2F",
                        "2F",
                        "Infinity"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "In the 2F case, the magnification is:",
                      "options": [
                        "+1",
                        "-1",
                        "+2",
                        "-0.5"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "If the lens is moved towards an object placed far away, what happens to the image distance (v)?",
                      "options": [
                        "Increases",
                        "Decreases",
                        "Remains constant",
                        "Becomes negative"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 8,
                      "question": "Parallax error represents:",
                      "options": [
                        "The blurring of the image",
                        "Apparent shift between object and image when moving the eye sideways",
                        "Spherical aberration",
                        "Chromatic aberration"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The graph between u and v for a convex lens is a:",
                      "options": [
                        "Straight line",
                        "Circle",
                        "Hyperbola",
                        "Parabola"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "The SI unit of Power of a lens is:",
                      "options": [
                        "Meter",
                        "Diopter",
                        "Watt",
                        "Focal length"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a convex lens?",
                      "answer": "A lens that is thicker at the center than at the edges. It converges parallel rays of light passing through it."
                    },
                    {
                      "question": "Define the principal focus of a convex lens.",
                      "answer": "The point on the principal axis where rays of light parallel to the principal axis converge after refracting through the lens."
                    },
                    {
                      "question": "What is the optical center?",
                      "answer": "The central point of the lens through which a ray of light passes undeviated."
                    },
                    {
                      "question": "Why is the focal length of a convex lens considered positive?",
                      "answer": "Because the real focus lies behind the lens, in the direction of the incident light, according to Cartesian sign convention."
                    },
                    {
                      "question": "What is parallax and how is it removed?",
                      "answer": "Parallax is the apparent separation of the needle and the image when the eye is moved sideways. It is removed by moving the image needle until its tip coincides perfectly with the image and they move together."
                    },
                    {
                      "question": "What is 'u' and 'v' in the lens formula?",
                      "answer": "u is the object distance (distance from optical center to object needle), v is the image distance (distance from optical center to image needle)."
                    },
                    {
                      "question": "Under what condition does a convex lens act as a magnifying glass?",
                      "answer": "When the object is placed between the optical center and the principal focus (u < f). The image formed is virtual, erect, and magnified."
                    },
                    {
                      "question": "How does the power of a lens relate to its focal length?",
                      "answer": "Power is the reciprocal of the focal length in meters (P = 1/f). A shorter focal length means higher converging power."
                    },
                    {
                      "question": "What happens to the focal length if the lens is immersed in water?",
                      "answer": "The focal length increases because the relative refractive index of glass with respect to water is less than that of glass with respect to air."
                    },
                    {
                      "question": "If you plot a graph of 1/v versus 1/u, what is the shape and what does the intercept represent?",
                      "answer": "The graph is a straight line. The x-intercept and y-intercept both represent 1/f."
                    }
                  ],
              realWorldApplications: [
                    "Human Eye: The crystalline lens in the human eye is a convex lens that focuses incoming light onto the retina.",
                    "Magnifying Glasses: Standard magnifying glasses use single convex lenses to produce enlarged virtual images.",
                    "Microscopes and Telescopes: Objective lenses and eyepieces are composed of complex arrangements of convex lenses to achieve high magnification.",
                    "Photography: Camera lenses use convex elements to focus images of real-world objects onto the digital sensor or film.",
                    "Eyeglasses: Convex lenses (positive diopter) are prescribed by optometrists to correct Hypermetropia (farsightedness).",
                    "Projectors: Used in movie and digital projectors to cast an enlarged real image onto a distant screen."
                  ]
        }
      },
      {
          id: 'p10',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Semiconductor Diode', description: 'Study I-V characteristics of p-n junction diode.', difficulty: 'Medium', duration: '30 min', category: 'Electronics',          content: { aim: "To study I-V characteristics of a p-n junction diode.", requirements: ["Diode", "Voltmeter", "Ammeter", "Battery"], theory: "Forward bias: current after 0.7V. Reverse bias: leakage current.", procedure: [
              "For Forward Bias, connect the p-side of the diode to the positive terminal of the battery and the n-side to the negative terminal via a rheostat.",
              "Connect a voltmeter (0-3V) in parallel and a milliammeter (0-50mA) in series with the diode.",
              "Gradually increase the voltage in steps of 0.1V and record the corresponding forward current.",
              "Observe the knee voltage where current starts rising sharply.",
              "For Reverse Bias, connect the p-side to the negative terminal and n-side to the positive terminal of a higher voltage source.",
              "Connect a voltmeter (0-50V) in parallel and a microammeter (0-100uA) in series.",
              "Increase the voltage in steps of 2V and record the steady reverse leakage current.",
              "Plot the Forward and Reverse I-V characteristics on a graph."
            ], objectives: ["Semiconductor behavior."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A p-n junction diode acts primarily as a:",
                      "options": [
                        "Amplifier",
                        "Oscillator",
                        "One-way valve (Rectifier)",
                        "Variable resistor"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 2,
                      "question": "In forward bias, the p-type material is connected to the:",
                      "options": [
                        "Positive terminal",
                        "Negative terminal",
                        "Ground",
                        "Base"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "The small current that flows during reverse bias is called:",
                      "options": [
                        "Forward current",
                        "Leakage current",
                        "Breakdown current",
                        "Threshold current"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "The voltage at which the forward current starts increasing rapidly is called the:",
                      "options": [
                        "Breakdown voltage",
                        "Reverse voltage",
                        "Knee voltage (or Cut-in voltage)",
                        "Stopping potential"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "For a typical Silicon diode, the knee voltage is approximately:",
                      "options": [
                        "0.3 V",
                        "0.7 V",
                        "1.5 V",
                        "5.0 V"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "For a typical Germanium diode, the knee voltage is approximately:",
                      "options": [
                        "0.3 V",
                        "0.7 V",
                        "1.5 V",
                        "5.0 V"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 7,
                      "question": "In reverse bias, if the voltage exceeds a critical limit, the diode conducts heavily. This is called:",
                      "options": [
                        "Knee point",
                        "Saturation",
                        "Zener/Avalanche Breakdown",
                        "Pinch-off"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "The depletion layer in a p-n junction ________ during forward bias.",
                      "options": [
                        "Widens",
                        "Narrows",
                        "Remains unchanged",
                        "Becomes an insulator"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Which carriers are responsible for the forward current in a diode?",
                      "options": [
                        "Only electrons",
                        "Only holes",
                        "Majority charge carriers (holes in p, electrons in n)",
                        "Minority charge carriers"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "In the experimental setup, a microammeter (uA) is used to measure current during:",
                      "options": [
                        "Forward bias",
                        "Reverse bias",
                        "Both forward and reverse",
                        "Neither"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a p-n junction?",
                      "answer": "It is the boundary or interface formed when a p-type semiconductor material is brought into intimate contact with an n-type semiconductor material."
                    },
                    {
                      "question": "What are holes and electrons?",
                      "answer": "Electrons are negative charge carriers. Holes are the absence of an electron in a covalent bond, acting as positive charge carriers."
                    },
                    {
                      "question": "What is the depletion layer?",
                      "answer": "A very thin region near the junction devoid of mobile charge carriers, creating a built-in potential barrier."
                    },
                    {
                      "question": "Define forward biasing.",
                      "answer": "Connecting the positive terminal of the battery to the p-region and the negative terminal to the n-region of the diode."
                    },
                    {
                      "question": "Why does current flow easily in forward bias?",
                      "answer": "Because the applied voltage opposes the potential barrier, narrowing the depletion region and allowing majority carriers to cross the junction."
                    },
                    {
                      "question": "Define reverse biasing.",
                      "answer": "Connecting the negative terminal of the battery to the p-region and the positive terminal to the n-region."
                    },
                    {
                      "question": "What is reverse saturation (leakage) current?",
                      "answer": "A very small current (in microamperes) that flows in reverse bias due to thermally generated minority charge carriers."
                    },
                    {
                      "question": "What is the knee voltage (cut-in voltage)?",
                      "answer": "The minimum forward voltage at which the diode starts to conduct heavily (approx. 0.7V for Si, 0.3V for Ge)."
                    },
                    {
                      "question": "What is Avalanche breakdown?",
                      "answer": "When a high reverse voltage is applied, minority carriers gain enough kinetic energy to knock out more electrons from covalent bonds, causing a huge surge in current that may destroy an ordinary diode."
                    },
                    {
                      "question": "Why do we use an ammeter in milliamperes (mA) for forward bias, but microamperes (uA) for reverse bias?",
                      "answer": "Forward current is large (due to majority carriers), while reverse leakage current is minute (due to minority carriers)."
                    }
                  ],
              realWorldApplications: [
                    "AC to DC Rectification: The primary component in power supplies and mobile phone chargers that converts alternating current from the wall into direct current.",
                    "Radio Demodulation: Used as 'detectors' in crystal radios to extract audio signals from amplitude-modulated (AM) radio carrier waves.",
                    "Light Emitting Diodes (LEDs): Specialized p-n junctions that release photons when forward-biased, used in everything from TV screens to light bulbs.",
                    "Solar Cells (Photodiodes): Large p-n junctions that generate current when exposed to light, converting solar energy into electricity.",
                    "Voltage Clamping: Used to protect sensitive electronics from voltage spikes and transient electrostatic discharges.",
                    "Logic Gates: Used to build basic OR/AND digital logic circuits in early computer designs."
                  ]
        }
      },
      {
          id: 'p11',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Sonometer — String Frequency', description: 'Verify laws of vibrating strings.', difficulty: 'Medium', duration: '35 min', category: 'Waves',          content: { aim: "To verify laws of vibrating strings.", requirements: ["Sonometer", "Tuning Forks", "Weights"], theory: "A sonometer consists of a hollow wooden box with a stretched metallic wire fixed at one end and passing over movable bridges. Weights can be attached to provide tension.\n\n**Principle:**\nWhen a string vibrates in its fundamental mode, the frequency of vibration is given by:\nf = (1/2L) × √(T/μ)\nwhere L = vibrating length, T = tension in the wire, μ = linear mass density (mass per unit length) of the wire.\n\n**Laws of Vibrating Strings:**\n1. **Law of Length:** f ∝ 1/L (for constant T and μ). So f × L = constant.\n2. **Law of Tension:** f ∝ √T (for constant L and μ).\n3. **Law of Mass:** f ∝ 1/√μ (for constant L and T).\n\n**Resonance:**\nWhen the natural frequency of the wire matches the frequency of an external source (tuning fork), the wire vibrates with maximum amplitude — this is resonance. A paper rider placed on the wire is thrown off at resonance.\n\n**Experimental Verification:**\nBy keeping tension constant and varying the vibrating length to achieve resonance with tuning forks of known frequencies, the law of length (f × L = constant) can be verified.", procedure: [
              "Place the sonometer on the table and stretch the wire over the two movable bridges, passing it over the pulley.",
              "Suspend a known mass (e.g., 1kg or 2kg) from the free end to provide tension (T).",
              "Strike a tuning fork of known frequency and place its stem gently on the sonometer box.",
              "Place a small V-shaped paper rider exactly in the middle of the wire between the bridges.",
              "Adjust the distance between the two bridges until the wire resonates with the tuning fork, causing the paper rider to flutter and fall off.",
              "Measure the resonant length (l) between the two bridges.",
              "Repeat the procedure with tuning forks of 4 to 5 different frequencies while keeping tension constant.",
              "Verify the law of length by checking if frequency * length is a constant."
            ], objectives: ["Standing waves."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A sonometer is fundamentally used to study the laws of:",
                      "options": [
                        "Transverse vibrations of strings",
                        "Longitudinal sound waves",
                        "Electromagnetism",
                        "Fluid dynamics"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 2,
                      "question": "According to the Law of Length, the fundamental frequency (n) of a stretched string is:",
                      "options": [
                        "Directly proportional to its length",
                        "Inversely proportional to its length",
                        "Proportional to the square of its length",
                        "Independent of length"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "According to the Law of Tension, the frequency (n) is directly proportional to the square root of:",
                      "options": [
                        "Length (l)",
                        "Linear density (m)",
                        "Tension (T)",
                        "Amplitude"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "According to the Law of Mass, frequency (n) is inversely proportional to the square root of:",
                      "options": [
                        "Mass of the bob",
                        "Tension",
                        "Mass per unit length (m)",
                        "Radius of the wire"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "In the sonometer experiment, resonance is proven when:",
                      "options": [
                        "The string breaks",
                        "The tuning fork stops vibrating",
                        "The paper rider is thrown off",
                        "The bridges fall"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "What type of wave is produced in the sonometer wire?",
                      "options": [
                        "Longitudinal traveling",
                        "Transverse stationary (standing) wave",
                        "Longitudinal standing wave",
                        "Electromagnetic wave"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "At the position of the wooden bridges, what part of the standing wave is formed?",
                      "options": [
                        "Antinode",
                        "Node",
                        "Both",
                        "Neither"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "The distance between two adjacent bridges during resonance (the fundamental mode) is equal to:",
                      "options": [
                        "Wavelength (λ)",
                        "Half the wavelength (λ/2)",
                        "Quarter wavelength (λ/4)",
                        "Double the wavelength"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "If the tension on the wire is quadrupled, its vibrating frequency will:",
                      "options": [
                        "Quadruple",
                        "Double",
                        "Halve",
                        "Remain the same"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "How do you calculate mass per unit length (m)?",
                      "options": [
                        "Mass / Volume",
                        "Mass of the wire / Length of the wire",
                        "Tension / Length",
                        "Volume / Density"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a sonometer?",
                      "answer": "An apparatus consisting of a hollow wooden box with a wire stretched across it, used to verify the laws of vibrating strings."
                    },
                    {
                      "question": "Why is the sonometer box hollow and provided with holes?",
                      "answer": "The hollow box acts as a resonating chamber. The air inside vibrates in sympathy with the wire, producing a louder sound, and the holes allow communication with the outside air."
                    },
                    {
                      "question": "What are stationary (standing) waves?",
                      "answer": "Waves formed by the superposition of two identical progressive waves traveling in opposite directions. They have fixed nodes (zero amplitude) and antinodes (max amplitude)."
                    },
                    {
                      "question": "What is meant by the 'fundamental frequency'?",
                      "answer": "The lowest frequency at which the string can vibrate, occurring when exactly one loop is formed between the two bridges."
                    },
                    {
                      "question": "What is meant by 'resonance' in this experiment?",
                      "answer": "Resonance occurs when the natural frequency of the stretched string exactly matches the applied frequency (of the tuning fork), resulting in maximum amplitude of vibration."
                    },
                    {
                      "question": "Why do we place a paper rider exactly at the center of the segment?",
                      "answer": "Because in the fundamental mode of vibration, an antinode (point of maximum displacement) is formed at the center, shaking the rider the hardest."
                    },
                    {
                      "question": "How is the tension (T) measured in the wire?",
                      "answer": "Tension T = Mg, where M is the total mass suspended on the hanger and g is the acceleration due to gravity."
                    },
                    {
                      "question": "What is 'm' in the formula n = (1/2l)√(T/m)?",
                      "answer": "Linear density, which is the mass per unit length of the wire (kilograms per meter)."
                    },
                    {
                      "question": "How can you change the pitch (frequency) of a guitar string?",
                      "answer": "By tightening tuning pegs (increasing Tension), changing the finger position (decreasing Length), or using thicker/heavier strings (increasing m)."
                    },
                    {
                      "question": "Does the thickness (diameter) of the wire affect its frequency?",
                      "answer": "Yes, a thicker wire has a greater mass per unit length (m), which decreases the frequency according to the Law of Mass."
                    }
                  ],
              realWorldApplications: [
                    "Musical Instruments: The fundamental laws of strings dictate exactly how pianos, guitars, violins, and cellos are designed and tuned.",
                    "Piano Tuning: Piano tuners adjust the tension of strings to achieve the precise resonant frequency required for musical notes.",
                    "Structural Engineering: Understanding standing waves and resonant frequencies in cables prevents bridge collapses (e.g., Tacoma Narrows).",
                    "Power Lines: Engineers must tension high-voltage overhead wires correctly to avoid destructive wind-induced 'galloping' or vibrations.",
                    "Elevator Cables: Testing cable tensions by measuring their resonant frequencies under load to ensure passenger safety.",
                    "Acoustic Architecture: Designing concert hall stringed panels and acoustic absorbers that resonate at specific frequencies to shape sound."
                  ]
        }
      },
      {
          id: 'p12',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Resonance Tube — Speed of Sound', description: 'Determine speed of sound in air.', difficulty: 'Medium', duration: '30 min', category: 'Waves',          content: { aim: "To determine speed of sound using resonance tube.", requirements: ["Resonance Tube", "Tuning Forks", "Water"], theory: "A resonance tube is a closed pipe apparatus used to determine the speed of sound in air by utilizing the principle of resonance with a tuning fork of known frequency.\n\n**Principle:**\nWhen a vibrating tuning fork is held near the open end of a tube closed at the other end (by water), standing waves are formed. Resonance occurs when the length of the air column is such that an antinode forms at the open end and a node at the closed end.\n\n**Resonance Conditions:**\n- First resonance: L₁ ≈ λ/4\n- Second resonance: L₂ ≈ 3λ/4\n\n**Speed of Sound Calculation:**\nL₂ - L₁ = λ/2, therefore λ = 2(L₂ - L₁)\nSpeed of sound: v = fλ = 2f(L₂ - L₁)\n\n**End Correction:**\nThe antinode forms slightly outside the open end. e = 0.3d (where d is the internal diameter).\ne = (L₂ - 3L₁)/2\n\n**Factors Affecting Speed of Sound:**\nSpeed increases with temperature: v ∝ √T (absolute temperature). At 0°C, the speed of sound in air is approximately 332 m/s.", procedure: [
              "Set up the resonance tube apparatus and adjust it so it stands vertically.",
              "Fill the tube completely with water using the attached reservoir.",
              "Strike a tuning fork of known frequency (e.g., 512 Hz) against a rubber pad and hold it horizontally just above the open end of the tube.",
              "Gradually lower the water level by lowering the reservoir until a loud resonant sound is heard.",
              "Measure the length of the air column from the water surface to the top of the tube. This is the first resonating length (l1).",
              "Lower the water level further to approximately three times l1 and fine-tune to find the second resonant position.",
              "Measure the second resonating length (l2).",
              "Calculate the speed of sound using v = 2 * frequency * (l2 - l1)."
            ], objectives: ["Understand resonance."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A resonance tube is used to determine the speed of sound in:",
                      "options": [
                        "Water",
                        "Glass",
                        "Air",
                        "Vacuum"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 2,
                      "question": "What type of wave is formed in the air column of the resonance tube?",
                      "options": [
                        "Transverse standing wave",
                        "Longitudinal stationary wave",
                        "Electromagnetic wave",
                        "Water wave"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "The closed end of the resonance tube (water surface) acts as a:",
                      "options": [
                        "Node",
                        "Antinode",
                        "Crest",
                        "Trough"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 4,
                      "question": "The open end of the resonance tube acts approximately as an:",
                      "options": [
                        "Antinode",
                        "Node",
                        "Neither",
                        "Rigid boundary"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 5,
                      "question": "The first resonance length (l1) relates to wavelength (λ) as approximately:",
                      "options": [
                        "λ",
                        "λ/2",
                        "λ/4",
                        "3λ/4"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "The second resonance length (l2) is roughly how many times the first resonance length (l1)?",
                      "options": [
                        "2 times",
                        "3 times",
                        "4 times",
                        "5 times"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "The formula for the speed of sound using two resonances is:",
                      "options": [
                        "v = f(l2 - l1)",
                        "v = 2f(l2 + l1)",
                        "v = 2f(l2 - l1)",
                        "v = f/(l2-l1)"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "What is the 'end correction' (e)?",
                      "options": [
                        "Error in the scale",
                        "Distance above the tube opening where the true antinode forms",
                        "Effect of temperature",
                        "Error in the tuning fork"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Does the speed of sound in air depend on temperature?",
                      "options": [
                        "No, it is constant",
                        "Yes, it increases with temperature",
                        "Yes, it decreases with temperature",
                        "It fluctuates randomly"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "The purpose of the water in the resonance tube is to:",
                      "options": [
                        "Cool the air",
                        "Act as a rigid boundary that reflects the sound wave",
                        "Moisten the air",
                        "Make it look like a liquid"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is resonance in this experiment?",
                      "answer": "Resonance occurs when the frequency of the vibrating tuning fork exactly matches the natural frequency of the air column in the tube, creating a loud boom."
                    },
                    {
                      "question": "How do longitudinal waves travel?",
                      "answer": "They travel as alternating series of compressions (high pressure) and rarefactions (low pressure) parallel to the direction of wave propagation."
                    },
                    {
                      "question": "Why is an antinode formed slightly outside the open end of the tube?",
                      "answer": "Because the sound wave needs some space to expand completely into the surrounding open air, resulting in an 'end correction'."
                    },
                    {
                      "question": "Write the formula for the end correction (e).",
                      "answer": "e = (l2 - 3l1) / 2, or roughly e ≈ 0.3 * d (where d is the internal diameter of the tube)."
                    },
                    {
                      "question": "Why do we use the difference of two resonance lengths (l2 - l1)?",
                      "answer": "Subtracting l1 from l2 automatically cancels out the difficult-to-measure end correction, yielding a purely wavelength-dependent distance (λ/2)."
                    },
                    {
                      "question": "Why does the water level change the natural frequency?",
                      "answer": "Changing the water level changes the length of the air column. Shorter columns resonate at higher frequencies, longer columns at lower frequencies."
                    },
                    {
                      "question": "What is the approximate speed of sound in air at 0°C?",
                      "answer": "Approximately 331 meters per second (m/s)."
                    },
                    {
                      "question": "How does humidity affect the speed of sound?",
                      "answer": "The speed of sound increases slightly with humidity, because moist air is less dense than dry air."
                    },
                    {
                      "question": "Can we find a third resonance length?",
                      "answer": "Yes, it occurs at approximately 5λ/4. However, the tube must be long enough to accommodate it."
                    },
                    {
                      "question": "Why shouldn't the tuning fork touch the edges of the tube?",
                      "answer": "Touching the tube will dampen the tuning fork's vibrations rapidly and introduce unwanted mechanical rattling."
                    }
                  ],
              realWorldApplications: [
                    "Wind Instruments: Defines how flutes, clarinets, pipe organs, and trumpets are designed with specific tube lengths to produce precise musical notes.",
                    "Acoustic Metamaterials: Designing tubes and chambers inside mufflers and exhaust pipes to purposely resonate and cancel out engine noise.",
                    "Architecture: Identifying unwanted resonant frequencies in long corridors or stairwells to mitigate acoustic echoing problems.",
                    "Hearing Sciences: The human ear canal acts essentially as a closed resonant tube, naturally amplifying frequencies around 3 kHz.",
                    "Meteorological Remote Sensing: SODAR devices use pulses of sound to measure atmospheric wind profiles and temperature based on sound velocity.",
                    "Voice Mechanics: Understanding how the vocal tract works as an adjustable resonant tube to produce different vowel sounds."
                  ]
        }
      },
      {
          id: 'p13',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Spherometer', description: 'Measure the radius of curvature of a spherical surface.', difficulty: 'Medium', duration: '30 min', category: 'Measurement',          content: { aim: "To determine the radius of curvature of a given spherical surface by a spherometer.", requirements: ["Spherometer", "Spherical surface (watch glass)", "Flat glass plate", "Meter scale"], theory: "A spherometer works on the principle of the micrometer screw. The radius of curvature R of a spherical surface is given by R = (l^2 / 6h) + (h / 2), where l is the mean distance between the two legs of the spherometer and h is the sagittal height.", procedure: [
              "Determine the pitch and least count of the spherometer.",
              "Place the spherometer on the flat glass plate and turn the central screw until its tip just touches the glass surface. Note the initial reading (zero error).",
              "Place the spherometer on the spherical surface (watch glass).",
              "Turn the central screw until its tip lightly touches the spherical surface.",
              "Note the main scale reading and the circular scale division coinciding with the vertical scale.",
              "Calculate the total reading to find the sagittal height (h).",
              "Measure the distance between any two legs of the spherometer (l) by pressing them on paper and measuring the distance between points.",
              "Calculate the radius of curvature R using the formula."
            ], objectives: ["Learn precision measurement techniques.", "Calculate radius of curvature."],
            observationTable: { columns: ["Initial Reading (a)", "Final Reading (b)", "Height h = |a-b|"] },
            assignments: [
                { id: 1, question: "Calculate the least count of a spherometer having a pitch of 1mm and 100 circular divisions.", marks: 3 },
                { id: 2, question: "Derive the formula R = (l^2/6h) + (h/2).", marks: 5 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A spherometer works on the principle of:",
                      "options": [
                        "Wedge",
                        "Micrometer screw",
                        "Lever",
                        "Pulley"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "The number of legs a spherometer rests on is:",
                      "options": [
                        "One",
                        "Two",
                        "Three",
                        "Four"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "The distance between the inner legs (l) is measured to find the:",
                      "options": [
                        "Pitch",
                        "Radius of curvature",
                        "Focal length",
                        "Least count"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "The central screw in the spherometer measures the:",
                      "options": [
                        "Diameter",
                        "Sagitta (h)",
                        "Pitch",
                        "Perimeter"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "The formula for the radius of curvature (R) using a spherometer is:",
                      "options": [
                        "R = l²/2h + h",
                        "R = l²/6h + h/2",
                        "R = l/6h - h/2",
                        "R = l²/h + h/6"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "To find the pitch, the central screw is given a known number of:",
                      "options": [
                        "Pushes",
                        "Vibrations",
                        "Full rotations",
                        "Half rotations"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 7,
                      "question": "If the pitch is 1mm and the circular disc has 100 divisions, the least count is:",
                      "options": [
                        "0.01 mm",
                        "0.1 mm",
                        "0.001 mm",
                        "1 cm"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 8,
                      "question": "When placing a spherometer on a flat glass plate, the reading of the central screw should ideally be:",
                      "options": [
                        "1 mm",
                        "Zero",
                        "100 mm",
                        "Negative"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "For a concave surface, the central screw is turned:",
                      "options": [
                        "Downwards",
                        "Upwards",
                        "Sideways",
                        "It is kept stationary"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 10,
                      "question": "What is measured to confirm all three legs are equidistant?",
                      "options": [
                        "Pitch",
                        "The distance between the tips of the three legs (l)",
                        "The diameter of the central screw",
                        "The height of the glass plate"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a spherometer?",
                      "answer": "An instrument used to measure the precise radius of curvature of a spherical surface, like a lens or a curved mirror."
                    },
                    {
                      "question": "What is the principle of a spherometer?",
                      "answer": "It works on the principle of a micrometer screw, converting rotational motion into tiny, precise linear movements."
                    },
                    {
                      "question": "Why is it called a 'spherometer'?",
                      "answer": "Because it is specifically designed to measure the curvature of 'spherical' surfaces."
                    },
                    {
                      "question": "What is 'sagitta' (h)?",
                      "answer": "The maximum height or depth of the curved surface from the plane formed by the tips of the three outer legs."
                    },
                    {
                      "question": "Why is it important to press the spherometer gently?",
                      "answer": "Pressing too hard can cause the legs to slip or mechanically deform the glass surface, leading to an inaccurate reading."
                    },
                    {
                      "question": "How is the distance between the legs (l) measured?",
                      "answer": "By lightly pressing the spherometer legs onto a sheet of paper to mark three dots, and measuring the distance between these dots using a ruler or compass."
                    },
                    {
                      "question": "Can a spherometer measure the curvature of a very small bead?",
                      "answer": "No, the surface must be large enough for all three outer legs to firmly rest on it."
                    },
                    {
                      "question": "What is the purpose of the plane glass plate?",
                      "answer": "It serves as a zero-reference plane to find the initial reading before measuring the height (h) on the curved surface."
                    },
                    {
                      "question": "If the initial reading on the flat plate is not zero, what do you do?",
                      "answer": "Note it down as the zero error (positive or negative) and apply the correction to the final reading."
                    },
                    {
                      "question": "Why does the formula for R contain l²/6h + h/2?",
                      "answer": "It is derived from the geometry of intersecting chords in a sphere, establishing the relationship between the radius, the sagitta, and the chord distance."
                    }
                  ],
              realWorldApplications: [
                    "Optician Labs: Used to measure the radius of curvature of optical lenses to ensure they meet exact prescription specifications.",
                    "Telescope Manufacturing: Verifying the precise curvature of large primary mirrors for astronomical observatories.",
                    "Contact Lens Calibration: Quality control testing to ensure the inner curve of a contact lens matches the human cornea safely.",
                    "Glass Industry: Checking the convex/concave profiles of watch glasses and specialized laboratory glassware.",
                    "Automotive Mirrors: Testing the curvature of vehicle side mirrors (which are convex) for proper field of view.",
                    "Laser Optics: Ensuring the precise geometric specifications of spherical resonators and specialized laser focusing lenses."
                  ]
        }
      },
      {
          id: 'p14',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Parallelogram Law of Forces', description: 'Verify the law using Gravesand’s apparatus.', difficulty: 'Medium', duration: '30 min', category: 'Mechanics',          content: { aim: "To verify the parallelogram law of vector addition using Gravesand’s apparatus.", requirements: ["Gravesand's apparatus", "Thread", "Weights", "Pulleys", "Mirror strip"], theory: "If two vectors acting at a point are represented in magnitude and direction by the two adjacent sides of a parallelogram, their resultant is represented by the diagonal passing through that point. R = sqrt(P^2 + Q^2 + 2PQ cos theta).", procedure: [
              "Set up the Gravesand's apparatus vertically on a table.",
              "Pass a thread with three strings tied at a knot over the two pulleys.",
              "Suspend known weights P and Q from the two ends over the pulleys, and an unknown weight S from the central string.",
              "Allow the system to come to equilibrium.",
              "Place a white sheet of paper behind the threads and mark their positions using reflections in a mirror strip to avoid parallax.",
              "Draw lines connecting the marked points to represent the directions of the forces.",
              "Select a suitable scale (e.g., 1 cm = 50 g weight) and cut off lengths OA and OB representing forces P and Q respectively.",
              "Complete the parallelogram OACB and measure the diagonal OC.",
              "Verify that the diagonal OC represents the balancing force S in magnitude and opposite direction."
            ], objectives: ["Verify vector addition rules."],
            observationTable: { columns: ["Force P", "Force Q", "Force S", "Angle", "Resultant R"] },
            assignments: [
                { id: 1, question: "State the Parallelogram Law of Vector Addition.", marks: 3 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The Parallelogram Law of Forces applies to:",
                      "options": [
                        "Collinear forces",
                        "Concurrent, coplanar forces",
                        "Parallel forces",
                        "Non-coplanar forces"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "If two forces P and Q act at an angle θ, the magnitude of their resultant R is:",
                      "options": [
                        "√(P² + Q² + 2PQ cosθ)",
                        "√(P² - Q² + 2PQ sinθ)",
                        "P + Q + 2PQ",
                        "√(P² + Q² - 2PQ cosθ)"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "If the angle θ between forces P and Q is 90°, the resultant R relies on:",
                      "options": [
                        "Pythagoras theorem",
                        "Archimedes principle",
                        "Newton's third law",
                        "Boyle's law"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 4,
                      "question": "In Gravesand's apparatus, what acts as the resultant force to balance the two hanging weights?",
                      "options": [
                        "The tension in the middle string",
                        "The weight of the base",
                        "The friction of the pulleys",
                        "The third suspended weight"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 5,
                      "question": "The mirror strip is used to avoid:",
                      "options": [
                        "Magnetic interference",
                        "Parallax error while marking the string",
                        "Refraction",
                        "Heating of the string"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "For the system to be in equilibrium, the resultant of the two forces must be:",
                      "options": [
                        "Greater than the third force",
                        "Equal and opposite to the third force",
                        "Zero",
                        "Perpendicular to the third force"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Why are the pulleys lubricated?",
                      "options": [
                        "To prevent rust",
                        "To reduce friction",
                        "To cool the strings",
                        "To increase weight"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "What does the diagonal of the parallelogram drawn on the paper represent?",
                      "options": [
                        "The equilibrant",
                        "The calculated resultant force",
                        "The friction force",
                        "The tension error"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "In a balanced system, the net force on the central knot is:",
                      "options": [
                        "Infinite",
                        "Maximum",
                        "Zero",
                        "Random"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "If P = 3N and Q = 4N are at 90°, what is R?",
                      "options": [
                        "5N",
                        "7N",
                        "1N",
                        "12N"
                      ],
                      "correctIndex": 0
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "State the Parallelogram Law of Vector Addition.",
                      "answer": "If two vectors acting simultaneously at a point can be represented in magnitude and direction by the adjacent sides of a parallelogram, their resultant is represented completely by the diagonal passing through that point."
                    },
                    {
                      "question": "What is an 'equilibrant'?",
                      "answer": "A single force that, when applied together with the original forces, brings the system into perfect equilibrium. It is equal in magnitude and opposite in direction to the resultant."
                    },
                    {
                      "question": "What happens if friction in the pulleys is high?",
                      "answer": "The string will not move freely to reach the true equilibrium position, causing an error in the angle and force measurements."
                    },
                    {
                      "question": "How does the mirror strip prevent parallax error?",
                      "answer": "By aligning the actual string in your line of sight so that it covers its own reflection in the mirror, ensuring your eye is perfectly perpendicular to the drawing board."
                    },
                    {
                      "question": "What do the marks on the paper behind the strings represent?",
                      "answer": "They represent the exact lines of action (directions) of the tension forces pulling on the central knot."
                    },
                    {
                      "question": "Why do we tap the board gently during the experiment?",
                      "answer": "To overcome any static friction in the pulleys and allow the knot to settle at the true position of equilibrium."
                    },
                    {
                      "question": "What is a concurrent force system?",
                      "answer": "A system where all the forces' lines of action intersect at a single common point (the knot)."
                    },
                    {
                      "question": "Can this law be used for velocities as well as forces?",
                      "answer": "Yes, because velocity is also a vector quantity and follows identical vector addition rules."
                    },
                    {
                      "question": "If the angle between two equal forces increases from 0° to 180°, what happens to their resultant?",
                      "answer": "The resultant decreases continuously from a maximum (2F) to a minimum (0)."
                    },
                    {
                      "question": "Why should the central knot not touch the drawing board?",
                      "answer": "To avoid friction between the knot and the paper, which would ruin the force balance."
                    }
                  ],
              realWorldApplications: [
                    "Bridge Engineering: Calculating the massive tension forces acting on the support cables of suspension and cable-stayed bridges to prevent structural failure.",
                    "Crane Operations: Determining the resultant load and boom angles required when a crane lifts heavy materials at varying jib extensions.",
                    "Aviation: Calculating the resultant flight path of an aircraft when acting under the engine's thrust vector and strong crosswind vectors.",
                    "Towing Vehicles: Analyzing the resultant pull when two tugboats tow a large ship from different angles.",
                    "Kite Flying/Sailing: Calculating how wind force and string tension combine to keep the object aloft or moving.",
                    "Architecture: Analyzing the diagonal bracing structures in skyscraper steel skeletons to resist wind and seismic loads."
                  ]
        }
      },
      {
          id: 'p15',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Hooke\'s Law', description: 'Determine the force constant of a spring.', difficulty: 'Easy', duration: '25 min', category: 'Mechanics',          content: { aim: "To determine the force constant of a helical spring by plotting a load-extension graph.", requirements: ["Helical spring", "Slotted weights", "Scale", "Pointer"], theory: "According to Hooke's Law, within the elastic limit, the extension (x) produced in a body is directly proportional to the applied load (F). F = -kx, where k is the force constant of the spring.", procedure: [
              "Suspend the helical spring vertically from a rigid support.",
              "Attach a pointer to the lower end to read the vertical scale.",
              "Place the hanger (zero load) and note the initial scale reading.",
              "Add slotted weights (e.g., 50g at a time) and wait for the spring to reach equilibrium.",
              "Note the corresponding scale reading for each load during loading.",
              "Remove the weights incrementally and note the readings during unloading.",
              "Calculate the mean extension for each load.",
              "Plot a graph of Load (F) vs Extension (x) to find the force constant k."
            ], objectives: ["Calculate spring constant."],
            observationTable: { columns: ["Load (N)", "Loading Ext", "Unloading Ext", "Mean Ext (x)"] },
            assignments: [
                { id: 1, question: "Define elastic limit and Hooke's Law.", marks: 4 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Hooke's Law states that within the elastic limit, the extension is:",
                      "options": [
                        "Inversely proportional to load",
                        "Directly proportional to applied force (load)",
                        "Independent of the force",
                        "Proportional to the square root of the load"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "The mathematical expression for Hooke's Law is:",
                      "options": [
                        "F = -kx",
                        "F = k/x",
                        "F = 1/kx",
                        "F = kx²"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "The negative sign in F = -kx implies that:",
                      "options": [
                        "The force is weak",
                        "The spring is breaking",
                        "The restoring force is opposite to the direction of displacement",
                        "The constant is negative"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "The slope of the load-extension graph (Load on Y-axis, Extension on X-axis) gives:",
                      "options": [
                        "Work done",
                        "Spring constant (k)",
                        "Elastic limit",
                        "Acceleration"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "If you cut a spring exactly in half, the spring constant (k) of each half becomes:",
                      "options": [
                        "Half",
                        "Double",
                        "Remains the same",
                        "Quarter"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "What happens if the applied load exceeds the elastic limit?",
                      "options": [
                        "The spring snaps back faster",
                        "The spring obeys Hooke's law perfectly",
                        "The spring undergoes permanent deformation",
                        "The spring melts"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 7,
                      "question": "What is the SI unit of the spring constant (k)?",
                      "options": [
                        "Newton",
                        "Meter",
                        "Newton/meter (N/m)",
                        "Joule"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "When two identical springs of constant 'k' are connected in series, the equivalent constant is:",
                      "options": [
                        "2k",
                        "k",
                        "k/2",
                        "k²"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 9,
                      "question": "When two identical springs of constant 'k' are connected in parallel, the equivalent constant is:",
                      "options": [
                        "k/2",
                        "k",
                        "2k",
                        "k²"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "The area under the Load-Extension graph represents:",
                      "options": [
                        "Power",
                        "Force",
                        "Work done (Elastic Potential Energy)",
                        "Velocity"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "State Hooke's Law.",
                      "answer": "It states that within the elastic limit, the stress applied to a body is directly proportional to the strain produced. For a spring: F = -kx."
                    },
                    {
                      "question": "What is an elastic limit?",
                      "answer": "The maximum stress that a material can withstand without undergoing permanent deformation. Beyond this point, it will not return to its original shape."
                    },
                    {
                      "question": "What does the spring constant 'k' indicate?",
                      "answer": "It indicates the stiffness of the spring. A high 'k' means the spring is very stiff and requires more force to stretch it."
                    },
                    {
                      "question": "Why do we take measurements for both 'loading' and 'unloading'?",
                      "answer": "To ensure that the spring has not exceeded its elastic limit and to account for any elastic hysteresis."
                    },
                    {
                      "question": "What is 'elastic hysteresis'?",
                      "answer": "The phenomenon where the unloading curve lags behind the loading curve, resulting in some energy loss as heat."
                    },
                    {
                      "question": "How does Hooke's law apply to a rubber band?",
                      "answer": "Rubber bands only obey Hooke's law loosely and for very small extensions; their load-extension graph is generally a curve (non-linear)."
                    },
                    {
                      "question": "If the load-extension graph is a straight line, what does it prove?",
                      "answer": "It visually proves Hooke's Law: F is directly proportional to x."
                    },
                    {
                      "question": "Why is an initial small weight (dead weight) hung on the spring before starting the experiment?",
                      "answer": "To remove any initial kinks or pre-tension in the coiled wire and get a true zero reading."
                    },
                    {
                      "question": "What is restoring force?",
                      "answer": "The internal elastic force developed within the spring opposing the external deforming force, trying to bring it back to its original equilibrium."
                    },
                    {
                      "question": "What happens to the potential energy when a spring is stretched?",
                      "answer": "Elastic potential energy is stored in the spring, equal to 1/2*kx²."
                    }
                  ],
              realWorldApplications: [
                    "Vehicle Suspensions: Designing shock absorbers and coil springs that smoothly handle the dynamic weight loads of cars on bumpy roads.",
                    "Mechanical Watches: The balance spring relies strictly on elastic restoring torque to maintain the precise ticking of a mechanical watch.",
                    "Weighing Scales: Spring-based produce scales and luggage scales use Hooke's law to convert physical extension directly into weight readings.",
                    "Archery and Slingshots: Calculating the potential energy stored in a drawn bowstring to determine the kinetic energy release of the projectile.",
                    "Construction: Engineering the elasticity of tall building frameworks to sway safely during high winds and earthquakes without permanent bending.",
                    "Medical Devices: Designing specialized springs for orthodontics (braces), surgical retractors, and cardiovascular stents."
                  ]
        }
      },
      {
          id: 'p16',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Potentiometer', description: 'Compare EMF of two primary cells.', difficulty: 'Hard', duration: '40 min', category: 'Electricity',          content: { aim: "To compare the EMF of two given primary cells (Leclanche and Daniel primary cells) using a potentiometer.", requirements: ["Potentiometer", "Battery eliminator", "Leclanche cell", "Daniel cell", "Galvanometer", "Jockey", "Rheostat"], theory: "The principle of a potentiometer states that the potential drop across any length of a uniform wire is directly proportional to its length for a steady current. E1/E2 = L1/L2, where L1 and L2 are balancing lengths for cells E1 and E2 respectively.", procedure: [
              "Connect the primary circuit: positive terminal of the driving battery to the zero end of the potentiometer, negative terminal via key and rheostat to the other end.",
              "Connect the secondary circuit: positive terminals of both primary cells (E1 and E2) to the zero end of the potentiometer.",
              "Connect the negative terminals of both cells to the two terminals of a two-way key.",
              "Connect the common terminal of the two-way key to the galvanometer, and the other end of the galvanometer to the jockey.",
              "Insert the plug for cell E1 and slide the jockey to find the null point (zero deflection in galvanometer). Note balancing length L1.",
              "Insert the plug for cell E2 and find its balancing length L2.",
              "Calculate the ratio E1/E2 = L1/L2.",
              "Repeat the observations by changing the current via the rheostat."
            ], objectives: ["Compare electromotive forces."],
            observationTable: { columns: ["Current value", "Length L1", "Length L2", "Ratio E1/E2"] },
            assignments: [
                { id: 1, question: "Why is a potentiometer preferred over a voltmeter?", marks: 4 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The basic principle of a potentiometer is that the potential drop across any portion of the uniform wire is directly proportional to its:",
                      "options": [
                        "Area of cross-section",
                        "Resistance",
                        "Length",
                        "Temperature"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 2,
                      "question": "A potentiometer is preferred over a voltmeter for measuring EMF because:",
                      "options": [
                        "It draws maximum current from the cell",
                        "It draws zero current from the cell at the null point",
                        "It is smaller in size",
                        "It is cheaper"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "For the potentiometer to work, the EMF of the driver battery must be:",
                      "options": [
                        "Less than the EMF of the experimental cells",
                        "Equal to the EMF of the experimental cells",
                        "Greater than the EMF of the experimental cells",
                        "Zero"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "If L1 and L2 are the balancing lengths for cells E1 and E2 respectively, then:",
                      "options": [
                        "E1/E2 = L2/L1",
                        "E1/E2 = L1/L2",
                        "E1*E2 = L1*L2",
                        "E1+L1 = E2+L2"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Increasing the length of the potentiometer wire:",
                      "options": [
                        "Decreases its sensitivity",
                        "Increases its sensitivity",
                        "Makes it inaccurate",
                        "Increases current"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "If the jockey is pressed too hard on the wire:",
                      "options": [
                        "The sensitivity increases",
                        "The uniform area of cross-section of the wire is altered, leading to errors",
                        "The battery voltage increases",
                        "Null point is found faster"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "In a potentiometer, the uniform wire is typically composed of an alloy like:",
                      "options": [
                        "Copper",
                        "Aluminium",
                        "Constantan or Manganin",
                        "Iron"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "A high resistance is used in series with the galvanometer to:",
                      "options": [
                        "Increase the EMF",
                        "Protect the galvanometer from high initial currents",
                        "Increase the uniform potential gradient",
                        "Reverse the direction of current"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "What is 'potential gradient'?",
                      "options": [
                        "Current per unit length",
                        "Resistance per unit length",
                        "Potential drop per unit length of the wire",
                        "Temperature per unit length"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "If the balance point shifts towards the zero end, it means the unknown EMF has:",
                      "options": [
                        "Increased",
                        "Decreased",
                        "Become negative",
                        "Exceeded the driver cell"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is the defining principle of a potentiometer?",
                      "answer": "When a steady current passes through a wire of uniform cross-section and homogeneous composition, the potential drop across any segment is directly proportional to its length."
                    },
                    {
                      "question": "Why is a potentiometer considered superior to a standard voltmeter for measuring the true EMF of a cell?",
                      "answer": "Because at the balance (null) point, it draws absolutely no current from the experimental cell, rendering its internal resistance irrelevant."
                    },
                    {
                      "question": "What is the Potential Gradient (K)?",
                      "answer": "The fall in potential per unit length of the potentiometer wire (volts/meter)."
                    },
                    {
                      "question": "Why must the EMF of the primary driver cell be strictly greater than that of the cells being compared?",
                      "answer": "Because the maximum potential difference across the potentiometer wire cannot exceed the driver's EMF. If the unknown EMF is greater, the balance point will never be found on the wire."
                    },
                    {
                      "question": "Why do we remove the high resistance from the galvanometer circuit once near the null point?",
                      "answer": "To maximize the galvanometer's sensitivity; the high resistance desensitizes it to protect it initially from large off-balance currents."
                    },
                    {
                      "question": "Why is the wire made of constantan or manganin instead of copper?",
                      "answer": "These alloys have high resistivity and a very low temperature coefficient of resistance, ensuring the resistance and potential gradient remain stable as the wire naturally heats up."
                    },
                    {
                      "question": "What physical defect would happen if the wire's cross-sectional area was not uniform?",
                      "answer": "The potential gradient would fluctuate along the length of the wire, invalidating the direct proportionality between length and voltage."
                    },
                    {
                      "question": "What indicates a one-sided deflection before you start the measurement?",
                      "answer": "If touching the jockey at opposite ends of the wire yields deflections in the *same* direction, typically meaning the driver cell voltage is too low or the positive terminals are not connected to the same common terminal."
                    },
                    {
                      "question": "How does adding more meters of wire (e.g. 10m instead of 4m) affect the potentiometer?",
                      "answer": "It decreases the potential gradient (since identical voltage is spread over greater length), which makes the device significantly more sensitive and precise."
                    },
                    {
                      "question": "Why should the jockey never be dragged forcefully across the wire?",
                      "answer": "Dragging scrapes off material, creating 'bottlenecks' in the wire's cross-section, destroying the requirement of uniformity."
                    }
                  ],
              realWorldApplications: [
                    "Precision Electronics Calibration: Used extensively in metrology labs to calibrate digital multimeters, voltmeters, and ammeters with unparalleled accuracy.",
                    "Audio Equipment (Volume Controls): The rotating volume knobs on stereos and electric guitars are effectively miniature, rotary-wire potentiometers varying signal voltage.",
                    "Industrial Control Sensors (Joysticks): Aircraft yokes and industrial joysticks use potentiometers to convert a pilot's physical movement into an exact electrical voltage signal.",
                    "Battery Testing: Research laboratories use highly sensitive potentiometer circuits to calculate precise internal resistance drops inside solid-state batteries.",
                    "Motor Speed Control: Older electric sewing machines and RC cars use sliding potentiometers to proportionally adjust incoming motor voltage.",
                    "Thermocouple Measurement: Employed in specialized pyrometers to read the minute microvolt-level signals generated by thermocouples in industrial furnaces without drawing current."
                  ]
        }
      },
      {
          id: 'p17',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Zener Diode Characteristics', description: 'Study Zener diode in reverse bias.', difficulty: 'Medium', duration: '35 min', category: 'Electronics',          content: { aim: "To draw the I-V characteristic curve of a Zener diode in reverse bias and determine its reverse breakdown voltage.", requirements: ["Zener diode", "DC power supply", "Voltmeter", "Ammeter", "Resistor"], theory: "A Zener diode operates in the reverse breakdown region. Once the reverse voltage reaches the Zener voltage (Vz), current increases sharply while the voltage remains almost constant. It's used as a voltage regulator.", procedure: [
              "Draw the circuit diagram connecting the Zener diode in reverse bias: n-side to the positive terminal and p-side to the negative terminal via a series resistor.",
              "Connect a voltmeter across the Zener diode to measure the reverse voltage.",
              "Connect a microammeter in series with the diode to measure the reverse current.",
              "Gradually increase the reverse voltage from zero in small steps.",
              "Note the corresponding values of reverse voltage and reverse current.",
              "Observe the point where a small voltage increase causes a large current increase (Zener breakdown).",
              "Record the Zener voltage (Vz).",
              "Plot a graph of reverse voltage vs reverse current."
            ], objectives: ["Understand voltage regulation."],
            observationTable: { columns: ["Reverse Voltage (V)", "Reverse Current (uA)"] },
            assignments: [
                { id: 1, question: "Explain the mechanism of Zener breakdown.", marks: 5 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The frequency of the alternating current (AC) in domestic power supply in India is:",
                      "options": [
                        "110 Hz",
                        "50 Hz",
                        "60 Hz",
                        "220 Hz"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "A sonometer wire carrying AC is placed between the poles of a strong permanent magnet. The wire vibrates due to:",
                      "options": [
                        "Electrostatic force",
                        "Lorentz magnetic force (F = B*I*L)",
                        "Gravity",
                        "Newton's third law"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "In the AC frequency experiment, the wire naturally vibrates with exactly:",
                      "options": [
                        "Half the frequency of AC",
                        "The exact frequency of AC",
                        "Double the frequency of AC",
                        "Ten times the AC frequency"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "If the frequency of AC is 50 Hz, how many times does the current reverse its direction in one second?",
                      "options": [
                        "50",
                        "100",
                        "25",
                        "200"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "For finding the AC frequency (n) using resonance, the fundamental frequency formula used is:",
                      "options": [
                        "n = (1/2l)√(T/m)",
                        "n = (1/l)√(T/m)",
                        "n = 2l√(T/m)",
                        "n = (l/2)√(m/T)"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 6,
                      "question": "Why is an electromagnet sometimes used instead of a permanent magnet in this experiment?",
                      "options": [
                        "To heat the wire",
                        "Because it reverses polarity along with the AC, doubling the vibrational frequency of the wire",
                        "To cancel gravity",
                        "To save electricity"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "If the tension in the wire is increased drastically, what must happen to the resonant length (l) to maintain resonance at 50 Hz?",
                      "options": [
                        "It must decrease",
                        "It must remain same",
                        "It must increase",
                        "It cannot resonate"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "To locate the exact point of resonance, we use a small object called a:",
                      "options": [
                        "Jockey",
                        "Paper rider",
                        "Spherometer",
                        "Lens"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "If the magnetic field is placed exactly at the center between the bridges during fundamental mode, the wire experiences maximum:",
                      "options": [
                        "Tension",
                        "Nodes",
                        "Amplitude (Antinode)",
                        "Resistance"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "What acts as the step-down transformer in the circuit?",
                      "options": [
                        "To increase voltage to dangerous levels",
                        "To reduce the 220V AC mains to a safe 6V or 12V AC for the experiment",
                        "To convert AC to DC",
                        "To measure frequency"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is Alternating Current (AC)?",
                      "answer": "An electric current which periodically reverses its direction and continuously changes its magnitude with time."
                    },
                    {
                      "question": "What is the standard frequency of AC mains in your country?",
                      "answer": "In India and the UK, it is 50 Hz. In the US, it is 60 Hz."
                    },
                    {
                      "question": "Explain the underlying principle of this experiment.",
                      "answer": "When AC flows through a horizontal wire placed perpendicular to a strong magnetic field, the wire experiences an alternating Lorentz force (F=BIL). This causes the wire to vibrate at the frequency of the AC current."
                    },
                    {
                      "question": "Why do we use a step-down transformer?",
                      "answer": "To step down the dangerous 220V mains supply to a safe, low voltage (like 6V) to prevent electric shock and avoid burning out the sonometer wire."
                    },
                    {
                      "question": "What happens if a permanent horseshoe magnet is replaced by an electromagnet connected to the same AC?",
                      "answer": "The magnetic polarity will flip in sync with the current. Since both reverse simultaneously, the force will always push in the same direction 100 times a second, making the wire vibrate at 100 Hz (double the AC frequency)."
                    },
                    {
                      "question": "What is 'm' in the frequency formula?",
                      "answer": "The linear mass density of the wire (mass per unit length)."
                    },
                    {
                      "question": "Why is the paper rider placed precisely in the middle of the vibrating segment?",
                      "answer": "Because in the fundamental mode of vibration (the loudest resonance), an antinode forms at the exact center, providing maximum upward thrust to throw off the rider."
                    },
                    {
                      "question": "What is Fleming's Left-Hand Rule and how does it apply here?",
                      "answer": "It determines the direction of the magnetic force. If the thumb, forefinger, and middle finger of the left hand are perpendicular, the forefinger points to the B-field, middle to Current, and thumb points to Force direction perfectly describing the wire's up-down push."
                    },
                    {
                      "question": "Why does the wire vibrate up and down continuously?",
                      "answer": "Because the AC current sine wave goes positive and negative, constantly reversing the direction of the magnetic Lorentz force via Fleming's Left-Hand Rule."
                    },
                    {
                      "question": "Could this experiment be performed using Direct Current (DC)?",
                      "answer": "No. With steady DC, the wire would only bend consistently in one direction (either up or down) and stay there, never vibrating."
                    }
                  ],
              realWorldApplications: [
                    "Loudspeakers and Headphones: Operating on the exact same Lorentz force principle, where an AC audio signal creates vibrating coils mapped to sound frequencies.",
                    "Vibration Analysis Equipment: Constructing electrodynamic shakers used in labs to violently vibrate aerospace parts and test their durability.",
                    "Electric Motors: Utilizing alternating magnetic forces on current-carrying conductors to generate continuous torque and rotation.",
                    "Grid Frequency Monitoring: Measuring small fluctuations around the 50Hz baseline which can indicate an overload on national power grids.",
                    "AC Galvanometers: Instruments specifically designed to measure AC currents utilizing resonant vibrations inside distinct magnetic fields.",
                    "Musical Instrument Pickups: Electric guitars use magnetic fields disturbed by vibrating steel strings to induce AC signals analogous to the sonometer."
                  ]
        }
      }


    ]
  };
