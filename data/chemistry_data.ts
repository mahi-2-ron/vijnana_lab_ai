import { SubjectData } from '../types';
import { SubjectType } from '../types';
import { Zap, FlaskConical, Dna, Calculator, Monitor } from 'lucide-react';

export const chemistryData: SubjectData = {
    id: 'chemistry',
    name: SubjectType.CHEMISTRY,
    icon: FlaskConical,
    color: 'emerald',
    hex: '#10b981',
    description: 'Mix chemicals safely, visualize molecular structures, and perform titrations.',
    labs: [
      { 
        id: 'c1',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], 
        title: 'Acid-Base Titration', 
        description: 'Determine concentration of HCl using NaOH.', 
        difficulty: 'Medium', 
        duration: '45 min', 
        category: 'Physical Chem',
        content: {
          videoId: "sFpFcpRHu0k",
          aim: "To determine molarity of HCl using standard NaOH solution.",
          requirements: ["Burette", "Pipette", "Conical Flask", "Phenolphthalein"],
          theory: "Titration (volumetric analysis) is a quantitative chemical analysis method. In an acid-base titration, a solution of known concentration (titrant, typically in burette) is added to a solution of unknown concentration (analyte, in flask) until the reaction is complete.\n\n**Reaction Principle:**\nThe reaction between a strong acid (HCl) and a strong base (NaOH) is a neutralization reaction:\nHCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)\nIonic Eq: H⁺(aq) + OH⁻(aq) → H₂O(l)\n\n**Equivalence Point vs Endpoint:**\n- **Equivalence Point:** The theoretical point where moles of H⁺ equals moles of OH⁻.\n- **Endpoint:** The experimental point where the indicator changes color, approximating the equivalence point.\n\n**Indicators:**\nPhenolphthalein is used for Strong Acid vs Strong Base titrations. It functions in the pH range 8.2–10.0.\n- In Acid (HCl): Colorless\n- In Base (Excess NaOH): Pink\n\n**Molarity Equation:**\nUsing the law of equivalence: M₁V₁/n₁ = M₂V₂/n₂\nFor HCl and NaOH, stoichiometry is 1:1, so:\nM(acid) × V(acid) = M(base) × V(base)",
          procedure: [
              "Wash, rinse and fill the burette with the given titrant (e.g., standard NaOH solution) up to the zero mark.",
              "Pipette out exactly 20 mL of the given analyte (e.g., given HCl solution) into a clean conical flask.",
              "Add 1-2 drops of a suitable indicator (e.g., phenolphthalein) to the conical flask. The solution will remain colorless.",
              "Place the flask under the burette on a white tile and titrate slowly while swirling the flask gently.",
              "Stop adding titrant when a permanent pale pink color appears. This is the end-point.",
              "Note the final burette reading.",
              "Repeat the titration until concordant readings are obtained."
            ],
          objectives: ["Understanding neutralization."],
          observationTable: {
              columns: ["Initial Reading (mL)", "Final Reading (mL)", "Vol Used (mL)", "Concordant"]
          },
          assignments: [
            { id: 1, question: "Write the balanced chemical equation for the reaction between Oxalic Acid and KMnO4. Why is this a redox titration?", marks: 5 },
            { id: 2, question: "Calculate the molarity of NaOH if 20ml of 0.1M HCl is required to neutralize 25ml of NaOH.", marks: 5 },
            { id: 3, question: "Why is heating required for Oxalic Acid titration but not for Mohr's Salt?", marks: 4 },
            { id: 4, question: "Explain the selection of indicators for Strong Acid vs Weak Base titration. Why is Methyl Orange preferred over Phenolphthalein?", marks: 4 },
            { id: 5, question: "Define 'Primary Standard'. Give two examples of primary standard substances.", marks: 2 }
          ],
            quizQuestions: [
                  {
                    "id": 1,
                    "question": "In a strong acid-strong base titration, the indicator typically chosen is:",
                    "options": [
                      "Phenolphthalein",
                      "Methyl orange",
                      "Methyl red",
                      "Both Phenolphthalein and Methyl orange"
                    ],
                    "correctIndex": 3
                  },
                  {
                    "id": 2,
                    "question": "What is the endpoint of a titration?",
                    "options": [
                      "When the reaction theoretically completes",
                      "When the indicator changes color",
                      "When half the acid is neutralized",
                      "When precipitation occurs"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 3,
                    "question": "An acid is defined by Arrhenius theory as a substance that:",
                    "options": [
                      "Donates a proton",
                      "Accepts a proton",
                      "Produces H+ ions in aqueous solution",
                      "Accepts an electron pair"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 4,
                    "question": "The standard solution usually goes into the:",
                    "options": [
                      "Conical flask",
                      "Burette",
                      "Pipette",
                      "Beaker"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 5,
                    "question": "Phenolphthalein is naturally:",
                    "options": [
                      "Red in acid, colorless in base",
                      "Colorless in acid, pink in base",
                      "Yellow in acid, red in base",
                      "Blue in acid, red in base"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 6,
                    "question": "To find the molarity of the unknown acid (M1V1=M2V2), you need to know:",
                    "options": [
                      "Volume of acid, volume of base, molarity of base",
                      "Temperature of the room",
                      "Atmospheric pressure",
                      "Molar mass of indicator"
                    ],
                    "correctIndex": 0
                  },
                  {
                    "id": 7,
                    "question": "Why is a white tile placed under the conical flask during titration?",
                    "options": [
                      "To prevent spills",
                      "To keep it insulated",
                      "To easily detect the exact color change",
                      "Because it looks professional"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 8,
                    "question": "Reading the burette correctly requires looking at the:",
                    "options": [
                      "Top of the meniscus",
                      "Bottom of the meniscus for colorless liquids",
                      "Center of the tube",
                      "Scale from an angle"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 9,
                    "question": "The point of exact stoichiometric neutralization is called the:",
                    "options": [
                      "Endpoint",
                      "Equivalence point",
                      "Titration center",
                      "Null point"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 10,
                    "question": "Which equation represents neutralization?",
                    "options": [
                      "Acid + Base -> Salt + Water",
                      "Acid + Metal -> Salt + Hydrogen",
                      "Base + Metal -> Salt + Base",
                      "Acid + Acid -> Strong Acid"
                    ],
                    "correctIndex": 0
                  }
                ],
            vivaQuestions: [
                  {
                    "question": "What is titration?",
                    "answer": "A quantitative chemical analysis used to determine the unknown concentration of an identified analyte by adding a standard solution of known concentration until the reaction is complete."
                  },
                  {
                    "question": "What is a standard solution?",
                    "answer": "A solution whose exact concentration is known, prepared by dissolving a known mass of solute in a definite volume of solvent."
                  },
                  {
                    "question": "Distinguish between endpoint and equivalence point.",
                    "answer": "The equivalence point is the theoretical point where exactly stoichometric amounts of acid and base have reacted. The endpoint is the visible, practical observation when the indicator changes color, usually a drop after the equivalence point."
                  },
                  {
                    "question": "Why must the burette be rinsed with the solution it will contain?",
                    "answer": "To ensure any residual water droplets do not dilute the solution being filled in the burette, preventing an inaccurately low concentration."
                  },
                  {
                    "question": "What is the role of an indicator?",
                    "answer": "It is a weak organic acid or base that undergoes an abrupt, visible color change near the pH corresponding to the equivalence point."
                  },
                  {
                    "question": "Which indicator is best for Weak Acid-Strong Base titration?",
                    "answer": "Phenolphthalein, because the pH at equivalence is basic (around 8-9) where phenolphthalein changes from colorless to pink."
                  },
                  {
                    "question": "Why do we add only 1-2 drops of indicator?",
                    "answer": "Indicators are themselves weak acids/bases; adding too much would consume some of the titrant and introduce an error."
                  },
                  {
                    "question": "What is a concordant reading?",
                    "answer": "Two or more consecutive titration readings that agree within a very narrow margin, usually 0.1 mL, establishing precise experimental consistency."
                  },
                  {
                    "question": "What is a primary standard?",
                    "answer": "A highly pure, stable chemical substance that can be weighed accurately to directly prepare a standard solution, like Oxalic Acid."
                  },
                  {
                    "question": "Why is NaOH not a primary standard?",
                    "answer": "NaOH is highly deliquescent (absorbs moisture) and reacts with CO2 in the air to form Na2CO3, so its exact mass cannot be weighed out reliably."
                  }
                ],
            realWorldApplications: [
                  "Water Treatment Facilities: Titration is routinely used to strictly monitor the alkalinity and pH balance of municipal drinking water.",
                  "Food Industry: Calculating the precise acetic acid concentration in commercial vinegar or testing the acidity of fruit juices and wines.",
                  "Pharmaceuticals: Quality control analysis to verify the exact dosage strength (concentration) of active ingredients like vitamin C or antacids in medications.",
                  "Agriculture and Soil Testing: Agronomists assess soil acidity levels to determine exactly how much lime must be added to neutralize it for crop growth.",
                  "Clinical Diagnostics: Used historically in medical labs to measure the composition of patient blood and urine samples (e.g., specific buffering capacities).",
                  "Cosmetics Manufacturing: Ensuring the final pH of creams and shampoos is perfectly balanced to avoid causing chemical skin burns."
                ]
        }
      },
      { 
          id: 'c2',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], 
          title: 'Salt Analysis', 
          description: 'Identify the cation in a given salt.', 
          difficulty: 'Hard', 
          duration: '60 min', 
          category: 'Inorganic Chem',
          content: {
              videoId: "7z9_kK0a6E0",
              aim: "To identify the basic radical (cation) in the given salt.",
              requirements: ["Test tubes", "Reagents (NaOH, NH4OH, etc)", "Salt sample"],
              theory: "Systematic Qualitative Analysis is a methodical approach to identify the cation (basic radical) and anion (acid radical) present in a given inorganic salt sample.\n\n**Preliminary Tests:**\n- **Color:** Copper salts are blue/green, iron(III) salts are yellow/brown, cobalt salts are pink.\n- **Smell:** Ammonium salts release NH₃; acetates release vinegar smell on heating with H₂SO₄.\n- **Flame Test:** Na⁺ = golden yellow, K⁺ = violet, Ca²⁺ = brick red, Ba²⁺ = apple green, Cu²⁺ = green/blue.\n\n**Anion Analysis:**\n- Group 1 (Dilute H₂SO₄): CO₃²⁻, S²⁻, SO₃²⁻, NO₂⁻ — identified by evolved gases.\n- Group 2 (Conc. H₂SO₄): Cl⁻, Br⁻, I⁻, NO₃⁻, C₂O₄²⁻\n- Group 3 (Special reagents): SO₄²⁻, PO₄³⁻\n\n**Cation Analysis (Group Separation):**\n- Group 0: NH₄⁺\n- Group 1 (dil. HCl): Pb²⁺, Ag⁺\n- Group 2 (H₂S in acidic medium): Cu²⁺, Pb²⁺\n- Group 3 (NH₄OH + NH₄Cl): Fe³⁺, Al³⁺, Cr³⁺\n- Group 4 (H₂S in alkaline medium): Zn²⁺, Mn²⁺, Ni²⁺, Co²⁺\n- Group 5 ((NH₄)₂CO₃): Ca²⁺, Ba²⁺, Sr²⁺\n- Group 6: Mg²⁺, Na⁺, K⁺",
              procedure: [
              "Perform preliminary tests on the given salt: note its color, smell, and solubility in water.",
              "Perform the dry heating test and flame test to get hints of the cation.",
              "Treat a pinch of the salt with dilute H2SO4 and observe the evolved gas to test for dilute acid group anions (Carbonate, Sulphide, Sulphite).",
              "Treat the salt with concentrated H2SO4 to test for concentrated acid group anions (Chloride, Bromide, Nitrate).",
              "Perform specific confirmatory tests for the identified anion using the salt extract.",
              "Prepare the original solution (OS) of the salt in water or dilute HCl.",
              "Systematically add group reagents (dil. HCl, H2S gas, NH4OH, etc.) to the OS to precipitate and identify the cation group.",
              "Perform the specific confirmatory test for the identified cation."
            ],
              objectives: ["Systematic qualitative analysis."],
              observationTable: { columns: ["Experiment", "Observation", "Inference"] },
              assignments: [
                  { id: 1, question: "Provide the group separation table for cations from Group 0 to Group 6 with their group reagents.", marks: 5 },
                  { id: 2, question: "Write the chemistry of the 'Brown Ring Test' for nitrate ions with relevant chemical equations.", marks: 5 },
                  { id: 3, question: "Explain the Common Ion Effect. How is it utilized in the precipitation of Group 2 and Group 4 cations?", marks: 4 },
                  { id: 4, question: "Why is Conc. HNO3 added before precipitation of Group 3 cations?", marks: 3 },
                  { id: 5, question: "Describe the flame test colors for Calcium, Barium, and Strontium.", marks: 3 }
              ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "In qualitative salt analysis, Group I cations are precipitated as:",
                      "options": [
                        "Hydroxides",
                        "Chlorides",
                        "Sulfides",
                        "Carbonates"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Which reagent is used to precipitate Group I cations (like Pb2+)?",
                      "options": [
                        "Dilute HCl",
                        "H2S gas",
                        "NH4OH",
                        "Ammonium carbonate"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "The flame test color of Sodium (Na+) is:",
                      "options": [
                        "Crimson Red",
                        "Apple Green",
                        "Golden Yellow",
                        "Lilac/Violet"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "The brown ring test identifies the presence of which anion?",
                      "options": [
                        "Chloride",
                        "Sulfate",
                        "Nitrate",
                        "Carbonate"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "Adding Barium Chloride (BaCl2) to a Sulfate (SO4 2-) solution yields a:",
                      "options": [
                        "Yellow precipitate",
                        "Black precipitate",
                        "White precipitate insoluble in HCl",
                        "Red precipitate"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "Group III cations (Al3+, Fe3+) are precipitated by adding:",
                      "options": [
                        "NH4OH in presence of NH4Cl",
                        "H2S in acidic medium",
                        "NaCl",
                        "Concentrated HNO3"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 7,
                      "question": "A salt yielding a colorless, odorless gas that turns lime water milky indicates the presence of:",
                      "options": [
                        "Sulfite",
                        "Sulfate",
                        "Carbonate",
                        "Chloride"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "The pungent smell of ammonia upon adding NaOH to the salt identifies the cation:",
                      "options": [
                        "Lead",
                        "Copper",
                        "Ammonium (NH4+)",
                        "Calcium"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 9,
                      "question": "Which of the following cations gives a characteristic apple-green flame?",
                      "options": [
                        "Strontium",
                        "Barium",
                        "Calcium",
                        "Potassium"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "The chromyl chloride test is a definitive confirmatory test for:",
                      "options": [
                        "Bromide",
                        "Iodide",
                        "Chloride",
                        "Nitrate"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is the systematic progression in Qualitative Salt Analysis?",
                      "answer": "The process generally proceeds sequentially: preliminary exams (color, smell, flame test), detection of anions (acid tests), and finally the systematic separation and identification of cations by groups."
                    },
                    {
                      "question": "What is the principle behind grouping cations in qualitative analysis?",
                      "answer": "Cations are classified into six groups based on their decreasing solubility products. A specific group reagent precipitates the ions of that group while leaving all subsequent groups in solution."
                    },
                    {
                      "question": "Why is NH4Cl added before adding NH4OH in the Group III analysis?",
                      "answer": "NH4Cl suppresses the ionization of NH4OH due to the common ion effect, generating just enough OH- concentration to uniquely precipitate Group III hydroxides (Fe, Al) without precipitating higher groups."
                    },
                    {
                      "question": "What is the chemistry behind the Brown Ring test?",
                      "answer": "The nitrate ion is reduced by Fe2+ to nitric oxide (NO), which then combines with the remaining iron(II) complex to form a highly visible brown coordination complex ring [Fe(H2O)5(NO)]2+ at the acid-solution interface."
                    },
                    {
                      "question": "Why do some metals impart distinct colors to a flame?",
                      "answer": "Thermal energy from the flame excites electrons to higher un-stable atomic energy levels. As they immediately fall back, they emit excess energy in the form of visible light photons of specific characteristic wavelengths."
                    },
                    {
                      "question": "How do you perform the dry heating test and what does it reveal?",
                      "answer": "A small pinch of dry salt is heated in a dry test tube. Evolving gases, color changes in the residue (like ZnO turning yellow hot, white cold), or sublime deposits point to specific ions (e.g., iodine gives violet vapors)."
                    },
                    {
                      "question": "What differentiates the dilute acid test from the concentrated acid test for anions?",
                      "answer": "Dilute H2SO4 breaks down unstable acid radicals (carbonate, sulfide, nitrite). Concerated H2SO4 is a much stronger oxidizing and dehydrating agent, necessary to decompose more stable radicals like chloride, bromide, nitrate, and acetate."
                    },
                    {
                      "question": "How do you confirm the presence of an Iodide (I-) ion?",
                      "answer": "Adding AgNO3 creates a thick yellow precipitate of AgI that is completely insoluble in ammonium hydroxide (unlike AgCl, which dissolves)."
                    },
                    {
                      "question": "What is 'interfering radical' analysis?",
                      "answer": "The removal of certain interfering anions (like phosphate, borate, or fluoride) that prematurely precipitate completely wrong groups of cations in alkaline mediums, thereby ruining Group III analysis."
                    },
                    {
                      "question": "Why is Lead (Pb2+) included in both Group I and Group II?",
                      "answer": "Because its chloride (PbCl2, formed in Group I) is slightly soluble in hot water, so it does not precipitate entirely in Group I. The remainder must be precipitated as completely insoluble PbS in Group II."
                    }
                  ],
              realWorldApplications: [
                    "Environmental Water Testing: Systematically determining exactly which toxic heavy metal cations (e.g., Pb2+, Cd2+) have leached into a public drinking water supply.",
                    "Geological Ore Assaying: Identifying exactly which valuable rare earth or industrial minerals are present in a raw rock sample extracted from a new mine.",
                    "Forensic Toxicology: Analyzing tiny unidentified chemical residues found at disaster or crime scenes to trace the exact composition (e.g., explosive salt residues like nitrates/chlorates).",
                    "Metallurgical Refineries: Monitoring the exact concentration of impurities or flux additives present in blast furnaces to produce high-grade stainless steel.",
                    "Agriculture (Soil Composition): Assessing what essential mineral ions (NO3-, PO43-, K+) or toxic salts are actively present in farm soil.",
                    "Art History & Archaeology: Identifying the chemical makeup of ancient microscopic paint pigments to verify authenticity or recreate historical dyes."
                  ]
        } 
      },
      {
          id: 'c3',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'],
          title: 'pH Determination',
          description: 'Find pH of various fruit juices.',
          difficulty: 'Easy',
          duration: '20 min',
          category: 'Physical Chem',
          content: {
              videoId: "ckPHbHlG9MQ",
              aim: "To determine the pH of vegetable/fruit juices using pH paper.",
              requirements: ["pH Paper", "Standard pH scale", "Juice samples"],
              theory: "The pH scale is a logarithmic scale used to express the hydrogen ion concentration [H⁺] of a solution.\n\npH = -log₁₀[H⁺] (introduced by Sørensen in 1909).\n\n**pH Scale Range:**\n- pH 0 to 7: Acidic\n- pH 7: Neutral (pure water at 25°C, [H⁺] = 10⁻⁷ M)\n- pH 7 to 14: Basic/Alkaline\n\n**Ionic Product of Water:** Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25°C. Therefore pH + pOH = 14.\n\n**Measurement Methods:**\n1. pH Paper/Universal Indicator: color comparison with standard chart.\n2. Digital pH Meter: precise values using a glass electrode.\n\n**Indicators:**\n- Litmus: Red in acid, blue in base.\n- Phenolphthalein: Colorless in acid, pink in base (pH 8.2-10).\n- Methyl Orange: Red in acid, yellow in base (pH 3.1-4.4).\n\n**Buffer Solutions:** Solutions that resist changes in pH on addition of small amounts of acid or base. E.g., CH₃COOH/CH₃COONa (acidic buffer).",
              procedure: [
              "Take 10 mL of the given unknown solution in a clean test tube or beaker.",
              "Dip a clean piece of Universal Indicator paper or pH paper into the solution using a glass rod.",
              "Observe the color change on the pH paper.",
              "Compare the color developed on the pH paper with the standard color chart provided on the pH paper booklet.",
              "Note the pH value corresponding to the matching color.",
              "Alternatively, use a calibrated digital pH meter to record the exact pH value."
            ],
              objectives: ["Classify substances."],
              observationTable: { columns: ["Sample", "Color", "Approx pH", "Nature"] },
              assignments: [
                  { id: 1, question: "Define pH. Calculate the pH of a 0.001 M HCl solution.", marks: 3 },
                  { id: 2, question: "What are Buffer solutions? Explain the mechanism of an acidic buffer with an example.", marks: 5 },
                  { id: 3, question: "Why does pure water have a pH of 7 at 25°C? What happens to the pH if temperature increases?", marks: 4 },
                  { id: 4, question: "Determine the approximate pH values of: (a) Lemon Juice, (b) Blood, (c) Milk of Magnesia, (d) Gastric Juice.", marks: 4 },
                  { id: 5, question: "Explain the range and color change of Universal Indicator.", marks: 4 }
              ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "pH is defined mathematically as:",
                      "options": [
                        "log[H+]",
                        "-log[H+]",
                        "10^[H+]",
                        "-log[OH-]"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "A solution with a pH of 3 is considered:",
                      "options": [
                        "Neutral",
                        "Basic",
                        "Strongly Acidic",
                        "Weakly Basic"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "A Universal Indicator will turn what general color in a strong acid?",
                      "options": [
                        "Dark Violet",
                        "Bright Green",
                        "Deep Blue",
                        "Deep Red"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 4,
                      "question": "Which of the following solutions typically has a pH around 7?",
                      "options": [
                        "Lemon juice",
                        "Distilled water",
                        "Ammonia",
                        "Gastric acid"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "If you dilute an acidic solution 10 times with distilled water, its pH generally:",
                      "options": [
                        "Decreases by 1 unit",
                        "Increases by 1 unit",
                        "Remains the same",
                        "Becomes negative"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The pH scale of 0 to 14 is valid at a standard temperature of:",
                      "options": [
                        "0°C",
                        "25°C",
                        "100°C",
                        "0 K"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Sodium bicarbonate (baking soda) dissolved in water exhibits a pH of:",
                      "options": [
                        "Exactly 7",
                        "Around 2-3",
                        "Around 8-9 (Basic)",
                        "14"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "Which instrument provides the most accurate numerical pH value?",
                      "options": [
                        "Litmus paper",
                        "Phenolphthalein",
                        "Universal Indicator paper",
                        "Digital pH meter (glass electrode)"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 9,
                      "question": "The sum of pH and pOH for an aqueous solution at 25°C equals:",
                      "options": [
                        "1.0",
                        "7.0",
                        "14.0",
                        "0.0"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "Blood in a healthy human body typically maintains a highly regulated pH of:",
                      "options": [
                        "5.5",
                        "7.0 to 7.1",
                        "7.35 to 7.45",
                        "8.2"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What exactly does pH stand for?",
                      "answer": "'Potential of Hydrogen' or 'Power of Hydrogen'. It is a logarithmic scale measuring the concentration of free hydrogen ions in an aqueous solution."
                    },
                    {
                      "question": "What is the difference between a strong acid and a weak acid regarding pH?",
                      "answer": "A strong acid completely dissociates releasing large amounts of H+ (yielding a very low pH, 0-2). A weak acid only partially dissociates (yielding a moderate pH, 3-6)."
                    },
                    {
                      "question": "What constitutes a 'Universal Indicator'?",
                      "answer": "A precise blend of several different indicator dyes chosen so that the mixture displays a smooth, continuous spectrum of color changes ranging from red (pH 1) to green (pH 7) to violet (pH 14)."
                    },
                    {
                      "question": "How does temperature actually affect pH?",
                      "answer": "As temperature increases, the dissociation of water into H+ and OH- increases (Kw increases). Therefore, the neutral point drops slightly below pH 7 at higher temperatures."
                    },
                    {
                      "question": "What is a buffer solution?",
                      "answer": "An aqueous solution consisting of a weak acid and its conjugate base (or vice versa) that stubbornly resists significant changes in its pH level upon the minor addition of strong acids or bases."
                    },
                    {
                      "question": "Why isn't litmus paper considered highly accurate?",
                      "answer": "Litmus is a binary indicator. It only determines if a solution is generally acidic (red) or basic (blue). It cannot identify a specific numerical pH like 4.5 or 8.2."
                    },
                    {
                      "question": "Explain how a digital pH meter functions.",
                      "answer": "It relies on a highly sensitive glass electrode membrane. It measures the voltage difference (potential) caused by surrounding H+ ions across the glass boundary compared to a stable internal reference electrode."
                    },
                    {
                      "question": "Why is the pH scale logarithmic rather than linear?",
                      "answer": "Because hydrogen ion concentrations in chemistry naturally span over 14 orders of magnitude (from 1 M to 0.00000000000001 M). A logarithmic scale elegantly compresses this into an easily readable 0-14 bracket."
                    },
                    {
                      "question": "If solution A has pH 4 and solution B has pH 2, compare their H+ concentrations.",
                      "answer": "Since every 1-unit drop is a tenfold concentration increase, a 2-unit drop from pH 4 to pH 2 means Solution B is exactly 100 times more acidic (10^2) than A."
                    },
                    {
                      "question": "What is the chemical composition of gastric juice and how does the stomach survive its extreme pH?",
                      "answer": "It is predominantly Hydrochloric Acid (HCl) creating a harsh pH of 1.5-3.5. The stomach survives by continuously secreting a protective, alkaline mucous barrier over its inner lining."
                    }
                  ],
              realWorldApplications: [
                    "Aquarium Maintenance: Ensuring specific tropical fish or delicate coral reefs survive by hyper-regulating the pH of the enclosed aquatic environment.",
                    "Agriculture and Agronomy: Some crops (like blueberries) require highly acidic soil, while others require alkaline/limed soil to successfully absorb root nutrients.",
                    "Swimming Pool Chemistry: Balancing pool water pH meticulously between 7.2 and 7.8 to prevent eye irritation and stop corrosive scaling on metal pumps while maximizing chlorine lethality against bacteria.",
                    "Food Preservation: Fermenting pickles and yogurt requires carefully dropping the pH below 4.6 to completely halt the growth of the deadly botulism neurotoxin.",
                    "Metallurgical Electroplating: Controlling the pH of the plating bath is critical to ensure a shiny, uniform chromium or gold metal deposit without microscopic pitting.",
                    "Hair and Skincare Formulations: Commercial shampoos are strictly 'pH balanced' (around 5.5) to keep the hair cuticles sealed and skin's natural acidic mantle intact."
                  ]
        }
      },
      {
          id: 'c4',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'],
          title: 'Functional Groups',
          description: 'Detect presence of Aldehydes/Ketones.',
          difficulty: 'Medium',
          duration: '40 min',
          category: 'Organic Chem',
          content: {
              videoId: "5Jb2u9ihC44",
              aim: "To identify the functional group (Aldehyde) in the given organic compound.",
              requirements: ["Schiff's Reagent", "Fehling's Solution", "Test tubes"],
              theory: "Functional groups are specific groups of atoms within molecules that determine the characteristics and chemical reactivity of those molecules.\n\n**Common Functional Groups and Their Tests:**\n1. **Carboxylic Group (-COOH):** Brisk effervescence with NaHCO₃ (CO₂ evolved).\n2. **Alcoholic Group (-OH):** Reacts with sodium metal to evolve H₂. Ceric Ammonium Nitrate test gives red color.\n3. **Phenolic Group (-OH aromatic):** Violet/green/blue color with neutral FeCl₃.\n4. **Aldehyde Group (-CHO):** Tollen's Test (silver mirror), Fehling's Test (red Cu₂O precipitate), Schiff's Test (pink color), 2,4-DNP Test (yellow/orange precipitate).\n5. **Ketone Group (>C=O):** Does NOT give Tollen's or Fehling's test. Gives 2,4-DNP test and Sodium Nitroprusside test.\n6. **Amino Group (-NH₂):** Carbylamine test gives foul-smelling isocyanide. Azo dye test gives orange/red dye.",
              procedure: [
              "Take a small quantity of the given organic compound in a clean test tube.",
              "For Carboxylic group: Add a pinch of sodium bicarbonate. Brisk effervescence (CO2) indicates presence of -COOH.",
              "For Alcoholic group: Add a small piece of dry sodium metal. Evolution of hydrogen gas indicates an alcohol group, or perform the ceric ammonium nitrate test.",
              "For Phenolic group: Add a few drops of neutral FeCl3 solution. A violet, green, or blue coloration indicates a phenol.",
              "For Carbonyl group (Aldehyde/Ketone): Add 2,4-DNP reagent. A yellow/orange precipitate indicates a carbonyl group. Use Tollens\' or Fehling\'s test to distinguish aldehyde from ketone.",
              "For Amino group: Perform the carbylamine test (foul smell) or nitrous acid test."
            ],
              objectives: ["Distinguish aldehydes from ketones."],
              observationTable: { columns: ["Experiment", "Observation", "Inference"] },
              assignments: [
                  { id: 1, question: "Write the reaction involved in Tollen's Test. Why is it called the Silver Mirror test?", marks: 5 },
                  { id: 2, question: "Distinguish between Aldehydes and Ketones based on oxidation reactions.", marks: 4 },
                  { id: 3, question: "Draw the structure of 2,4-Dinitrophenylhydrazine. What is its observation with carbonyl compounds?", marks: 4 },
                  { id: 4, question: "Why do aromatic aldehydes not respond to Fehling's test?", marks: 3 },
                  { id: 5, question: "What is Schiff's Reagent chemically? Describe the color change observed.", marks: 4 }
              ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The characteristic functional group of an alcohol is:",
                      "options": [
                        "-COOH",
                        "-OH (Hydroxyl)",
                        "-CHO",
                        "-NH2"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Aldehydes have the functional group:",
                      "options": [
                        "-CHO",
                        "-CO- (Ketone)",
                        "-OH",
                        "-COOH"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "Which reagent is widely used to test for the presence of an Aldehyde?",
                      "options": [
                        "Litmus paper",
                        "Bromine water",
                        "Tollens' reagent",
                        "Sodium metal"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "Tollens' test produces what visual result if an aldehyde is present?",
                      "options": [
                        "A dense white smoke",
                        "A crimson flame",
                        "A brilliant 'silver mirror' on the glass",
                        "Deep blue coloration"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "Carboxylic acids (-COOH) aggressively react with Sodium Bicarbonate (NaHCO3) to produce:",
                      "options": [
                        "Hydrogen gas",
                        "Oxygen gas",
                        "Carbon Dioxide effervescence",
                        "Ammonia gas"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "Primary amines (-NH2) can be identified using the foul-smelling:",
                      "options": [
                        "Esterification test",
                        "Carbylamine test (Isocyanide test)",
                        "Lucas test",
                        "Iodoform test"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "The Lucas test (ZnCl2 + conc. HCl) differentiates between:",
                      "options": [
                        "Aldehydes and Ketones",
                        "Alkanes and Alkenes",
                        "Primary, secondary, and tertiary alcohols",
                        "Carboxylic acids and esters"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "A positive Iodoform test (yellow precipitate of CHI3) indicates the presence of:",
                      "options": [
                        "A methyl ketone structure",
                        "A primary amine",
                        "Phenol",
                        "A tertiary alcohol"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 9,
                      "question": "Phenols produce a distinct blue/violet coloration upon the addition of:",
                      "options": [
                        "Neutral Ferric Chloride (FeCl3)",
                        "Sodium hydroxide",
                        "Concentrated Sulfuric acid",
                        "Bromine water"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 10,
                      "question": "Unsaturation (like double C=C bonds in alkenes) directly decolorizes:",
                      "options": [
                        "Distilled water",
                        "Bromine water (turns from orange to colorless)",
                        "Phenolphthalein",
                        "Litmus solution"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a functional group?",
                      "answer": "It is a highly specific atom or cluster of atoms tightly bound within a molecule that strictly defines the chemical behavior, reactions, and properties of that organic compound."
                    },
                    {
                      "question": "Distinguish an alcohol (-OH) from a phenol chemically.",
                      "answer": "In an alcohol, the hydroxyl group is bound to an aliphatic carbon. In a phenol, the hydroxyl group is directly bound to an aromatic benzene ring, making it significantly more acidic."
                    },
                    {
                      "question": "What is the chemistry behind the Silver Mirror (Tollens') Test?",
                      "answer": "Tollens' reagent is essentially ammoniacal silver nitrate [Ag(NH3)2]+. Aldehydes act as reducing agents, oxidizing into carboxylic acids while reducing the Ag+ ions into pristine metallic silver (Ag) that plates the glass."
                    },
                    {
                      "question": "Why don't simple ketones respond to Tollens' or Fehling’s tests?",
                      "answer": "Ketones entirely lack the active hydrogen atom attached to the carbonyl carbon (present in aldehydes). Therefore, they strongly resist mild oxidation and fail these tests."
                    },
                    {
                      "question": "Explain the Esterification test for carboxylic acids.",
                      "answer": "Heating a carboxylic acid with a pure alcohol (like ethanol) in the presence of a few drops of concentrated sulfuric acid catalyst produces an ester, which emits a highly distinct, sweet, fruity scent."
                    },
                    {
                      "question": "What causes the effervescence in the Sodium Bicarbonate test?",
                      "answer": "A straightforward acid-base reaction. The relatively strong organic carboxylic acid reacts with the weak base salt (NaHCO3) to violently release Carbon Dioxide (CO2) gas bubbles."
                    },
                    {
                      "question": "How does the functional group dictate the boiling point of an alcohol vs an alkane of similar mass?",
                      "answer": "The -OH group engages in extensive intermolecular hydrogen bonding, requiring massively more thermal energy to boil, drastically raising the boiling point compared to non-polar alkanes."
                    },
                    {
                      "question": "Describe the Isocyanide (Carbylamine) test's toxicity.",
                      "answer": "It reacts a primary amine with chloroform and KOH to create an isocyanide. Isocyanides possess an agonizingly offensive and sickening odor, serving as the qualitative flag."
                    },
                    {
                      "question": "How does 2,4-DNP (Brady's Reagent) test work?",
                      "answer": "2,4-Dinitrophenylhydrazine reacts universally with the carbonyl group (C=O) of both aldehydes and ketones to produce a heavy yellow/orange crystalline precipitate."
                    },
                    {
                      "question": "What does a positive Bromine Water test indicate regarding molecular structure?",
                      "answer": "It definitively proves that the organic molecule is 'unsaturated', containing carbon-carbon double (olefins) or triple bonds, which undergo an electrophilic addition reaction breaking the bromine."
                    }
                  ],
              realWorldApplications: [
                    "Modern Pharmaceutical Synthesis: Drug efficacy fully relies on specific functional groups attaching to human receptor proteins (e.g., Aspirin contains ester and carboxylic acid groups).",
                    "Perfume and Fragrance Industry: Synthesizing highly specific esters and aldehydes to intentionally perfectly replicate natural scents like ripe bananas, jasmine, or mint.",
                    "Polymer and Plastics Manufacturing: Relying on functional groups (like amines and carboxylic acids) to undergo massive chain condensation reactions to create Nylon and Kevlar.",
                    "Forensic Sobriety Analysis: Early breathalyzers relied purely on the oxidation of the specific alcohol (-OH) functional group via a potassium dichromate reaction to measure intoxication.",
                    "Petrochemical Refining: Using massive bromine tests to monitor the exact levels of unstable alkene unsaturation in thousands of gallons of refined gasoline fuels.",
                    "Food Additives and Preservatives: Recognizing and utilizing carboxylic acids (like benzoic acid and acetic acid) directly for their acidic preserving characteristics against food molds."
                  ]
        }
      },
      {
          id: 'c5',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'],
          title: 'Exothermic Reaction',
          description: 'Study enthalpy change of neutralization.',
          difficulty: 'Medium',
          duration: '30 min',
          category: 'Thermodynamics',
          content: {
              videoId: "rdkUe_O20Ts",
              aim: "To determine the enthalpy of neutralization of strong acid and strong base.",
              requirements: ["Calorimeter", "Thermometer", "HCl", "NaOH"],
              theory: "Enthalpy (H) is the total heat content of a system at constant pressure. The change in enthalpy (ΔH) during a chemical reaction determines whether it is exothermic or endothermic.\n\n**Exothermic Reactions (ΔH < 0):** Release heat. Products have lower energy than reactants. Examples: dissolution of NaOH in water, neutralization of strong acid and strong base (ΔH = -57.1 kJ/mol).\n\n**Endothermic Reactions (ΔH > 0):** Absorb heat. Products have higher energy. Examples: dissolution of NH₄Cl or KNO₃ in water.\n\n**Calorimetry:** q = m × c × ΔT, where m = mass, c = specific heat capacity, ΔT = change in temperature.\n\n**Hess's Law:** The total enthalpy change of a reaction is independent of the pathway taken, provided initial and final states are the same.",
              procedure: [
              "Measure exactly 50 mL of dilute Hydrochloric Acid (HCl) into a clean, dry polystyrene calorimeter or insulated beaker.",
              "Measure the initial temperature of the acid using a thermometer and record it after it stabilizes.",
              "Quickly add exactly 50 mL of dilute Sodium Hydroxide (NaOH) of the same molarity to the calorimeter.",
              "Immediately cover the calorimeter with a lid.",
              "Stir the mixture gently but continuously using a stirrer.",
              "Observe the temperature rise on the thermometer and record the highest steady temperature reached.",
              "Calculate the change in temperature (Delta T).",
              "Verify that the reaction is exothermic as the temperature of the system increased."
            ],
              objectives: ["Calculate heat of reaction."],
              observationTable: { columns: ["Init Temp Acid", "Init Temp Base", "Mix Temp", "Rise"] },
              assignments: [
                  { id: 1, question: "Define Enthalpy of Neutralization. Why is its value constant for any strong acid and strong base pair?", marks: 4 },
                  { id: 2, question: "Calculate the heat evolved when 100ml of 1M HCl is mixed with 100ml of 1M NaOH. (Assume standard value -57.1 kJ/mol)", marks: 4 },
                  { id: 3, question: "Why is the enthalpy of neutralization of Acetic Acid (weak acid) and NaOH less than -57.1 kJ/mol?", marks: 4 },
                  { id: 4, question: "State Hess's Law of Constant Heat Summation with an example.", marks: 4 },
                  { id: 5, question: "Explain the construction and working of a simple calorimeter.", marks: 4 }
              ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "An exothermic reaction fundamentally:",
                      "options": [
                        "Absorbs heat from the surroundings",
                        "Releases heat into the surroundings",
                        "Requires constant heating to proceed",
                        "Exhibits zero temperature change"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "During an exothermic reaction, the temperature of the reaction vessel (the system container):",
                      "options": [
                        "Decreases drastically",
                        "Increases noticeably",
                        "Remains perfectly constant",
                        "Fluctuates up and down randomly"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "Which of the following describes the Enthalpy change (ΔH) for an exothermic process?",
                      "options": [
                        "ΔH is exactly zero",
                        "ΔH is strongly positive",
                        "ΔH is strongly negative",
                        "ΔH is undefined"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "When solid Sodium Hydroxide (NaOH) pellets dissolve in water, the process is:",
                      "options": [
                        "Highly exothermic",
                        "Highly endothermic",
                        "A sublimation process",
                        "A freezing process"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 5,
                      "question": "Neutralization between a strong acid (like HCl) and a strong base (like NaOH) is always:",
                      "options": [
                        "Exothermic",
                        "Endothermic",
                        "Catalytic",
                        "Reversible without temperature change"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 6,
                      "question": "Combustion (burning wood or gas) is a classic example of:",
                      "options": [
                        "An endothermic reaction",
                        "An exothermic reaction",
                        "A precipitation reaction",
                        "Nucleation"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "In an exothermic reaction energy profile graph, the products' energy state is:",
                      "options": [
                        "Higher than the reactants",
                        "Lower than the reactants",
                        "Exactly equal to the reactants",
                        "Higher than the activation energy"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Adding concentrated Sulfuric Acid to water is considered:",
                      "options": [
                        "Safely endothermic",
                        "Dangerously exothermic, it can boil over rapidly",
                        "Mildly endothermic",
                        "Purely physical with no heat"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "What is activation energy?",
                      "options": [
                        "The total heat of the reaction",
                        "The kinetic energy of products",
                        "The absolute initial energy hump required to start the reaction",
                        "The negative enthalpy"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "To correctly measure the accurate maximum temperature rise, a student must:",
                      "options": [
                        "Blow on the thermometer",
                        "Constantly mix the solution while recording",
                        "Remove the thermometer rapidly",
                        "Wrap the beaker in ice"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "Define an exothermic reaction precisely.",
                      "answer": "A chemical reaction or physical process that universally releases thermal energy (heat) to its surroundings, resulting in a measurable increase in the ambient temperature."
                    },
                    {
                      "question": "In terms of breaking and forming chemical bonds, why is a reaction exothermic?",
                      "answer": "Exothermic reactions occur when the immense energy released by forging new, highly stable bonds in the products far exceeds the initial energy required to cleanly break the bonds in the reactants."
                    },
                    {
                      "question": "Why is the enthalpy change (ΔH) universally negative for exothermic reactions?",
                      "answer": "Enthalpy strictly measures the internal heat content. Since the system has lost or expelled heat energy outwardly to the environment, its final enthalpy is less than its initial (H_final - H_initial < 0)."
                    },
                    {
                      "question": "Provide a real-world example of a purely endothermic reaction.",
                      "answer": "The rapid dissolution of Ammonium Nitrate (NH4NO3) in water, or solid CO2 (dry ice) violently sublimating into gas."
                    },
                    {
                      "question": "Why do we use an insulated container (like a polystyrene or styrofoam cup) as a calorimeter?",
                      "answer": "To perfectly trap the generated heat and severely minimize any thermal loss to the outside air, ensuring an exceedingly accurate calculation of the total heat produced."
                    },
                    {
                      "question": "What is the crucial 'Heat of Neutralization'?",
                      "answer": "The highly specific physical heat evolved when precisely one mole of H+ ions perfectly neutralizes one mole of OH- ions to form exactly one mole of water."
                    },
                    {
                      "question": "Why is adding highly concentrated H2SO4 into cold water immensely dangerous?",
                      "answer": "The dissociation process is incredibly exothermic. The hydration of the acid molecules violently releases explosive amounts of heat, risking local boiling, sudden splashing, and severe acid burns."
                    },
                    {
                      "question": "Explain the concept of 'activation energy' even in exothermic reactions.",
                      "answer": "Even if the net result releases massive heat, the initial reactant bonds require a 'spark' or primary energy input to stretch and break before the new bonds can form and release the payload."
                    },
                    {
                      "question": "If you measure Q = mcΔT, what does 'c' fundamentally represent?",
                      "answer": "The Specific Heat Capacity. It is the exact amount of thermal energy required to rigidly raise the temperature of 1 gram of the substance by 1 degree Celsius (or Kelvin)."
                    },
                    {
                      "question": "Are all exothermic processes strictly chemical reactions?",
                      "answer": "No. Many are purely physical phase changes, such as freezing water into ice or water vapor violently condensing into liquid rain."
                    }
                  ],
              realWorldApplications: [
                    "Military Ready-to-Eat Meals (MREs): Using incredibly robust, flameless exothermic chemical heating packets (magnesium/iron reactions) to rapidly boil soldier's rations in combat zones.",
                    "Emergency Hand Warmers: Super-saturating solutions mathematically to safely crystallize on demand, releasing slow, therapeutic exothermic heat inside winter gloves.",
                    "Commercial Power Generation: Burning millions of tons of natural gas or pulverized coal entirely for their massive exothermic combustion payloads to spin high-pressure steam turbines.",
                    "Aerospace Rocket Propulsion: The explosive exothermic mixing of liquid oxygen and rocket fuel produces thousands of degrees of thrust required to brutally break Earth's gravitational hold.",
                    "Setting Cement and Concrete: The chemical hydration of dry cement powder heavily releases an exothermic reaction capable of cracking massive dams if not artificially cooled.",
                    "Automotive Safety (Airbags): The near-instantaneous, explosive exothermic decomposition of sodium azide creates the rapid gas expansion necessary to inflate steering wheel airbags instantly during collisions."
                  ]
        }
      }
,
      {
          id: 'c6',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'KMnO4 Titration (Redox)', description: 'Standardize KMnO4 against ferrous ammonium sulphate.', difficulty: 'Hard', duration: '40 min', category: 'Volumetric Analysis',          content: { aim: "To determine concentration of KMnO4 by titrating against FAS.", requirements: ["Burette", "Pipette", "KMnO4", "FAS", "H2SO4"], theory: "KMnO4 acts as self-indicator. Endpoint: persistent pink.", procedure: [
              "Rinse and fill the burette with the given KMnO4 solution.",
              "Pipette out 20 mL of standard Mohr\'s salt (or oxalic acid) solution into a conical flask.",
              "Add 1 test tube (~20 mL) of dilute H2SO4 to the conical flask. (If using oxalic acid, heat the flask to 60 degrees C).",
              "Titrate the solution against KMnO4 from the burette while constantly swirling the flask.",
              "KMnO4 acts as a self-indicator. The end-point is marked by the appearance of a permanent pale pink color.",
              "Note the final burette reading.",
              "Repeat the titration until concordant readings are obtained."
            ], objectives: ["Understand redox titration."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "In a KMnO4 titration against Mohr's salt, KMnO4 acts as a:",
                      "options": [
                        "Reducing agent",
                        "Self-indicator and Oxidizing agent",
                        "Catalyst",
                        "Standard base"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "The oxidation state of Manganese (Mn) in KMnO4 is:",
                      "options": [
                        "+2",
                        "+5",
                        "+7",
                        "+4"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "Why is dilute H2SO4 added to the flask before titration?",
                      "options": [
                        "To prevent hydration of the salt",
                        "To provide the acidic medium required for full reduction of MnO4- to Mn2+",
                        "To act as an indicator",
                        "To neutralize the solution"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "What acts as the auto-indicator in this reaction?",
                      "options": [
                        "Phenolphthalein",
                        "Mohr's salt",
                        "KMnO4 itself",
                        "Dilute acid"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "The endpoint color change is specifically:",
                      "options": [
                        "Pink to Colorless",
                        "Colorless to Permanent Pale Pink",
                        "Blue to Red",
                        "Yellow to Green"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "Why do we avoid using HCl instead of H2SO4 to acidify the solution?",
                      "options": [
                        "HCl is too weak",
                        "HCl reacts with KMnO4 to evolve poisonous chlorine gas, wasting the titrant",
                        "HCl forms a precipitate",
                        "HCl changes the endpoint color"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "What is the equivalent weight of KMnO4 in an acidic medium? (Molecular weight = M)",
                      "options": [
                        "M / 1",
                        "M / 3",
                        "M / 5",
                        "M / 7"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "Mohr's salt is a double salt consisting of:",
                      "options": [
                        "Ferrous sulfate and Ammonium sulfate",
                        "Copper sulfate and Iron sulfate",
                        "Sodium chloride and Potassium chloride",
                        "Zinc sulfate and Ammonium nitrate"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 9,
                      "question": "The active reducing ion in Mohr's salt is:",
                      "options": [
                        "Fe3+",
                        "NH4+",
                        "SO42-",
                        "Fe2+"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 10,
                      "question": "When heating oxalic acid before titration with KMnO4, the required temperature is approximately:",
                      "options": [
                        "0°C",
                        "25°C",
                        "60-70°C",
                        "100°C (Boiling)"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What distinguishes a redox titration from an acid-base titration?",
                      "answer": "A redox titration involves the explicit transfer of electrons (simultaneous oxidation and reduction) rather than the transfer of protons (H+)."
                    },
                    {
                      "question": "What is a 'self-indicator'?",
                      "answer": "A titrant, like deeply purple KMnO4, whose own reduction/oxidation naturally generates a distinct, highly visible color change at the exact equivalence point without needing any external chemical dye."
                    },
                    {
                      "question": "Why is Mohr's salt preferred over pure Ferrous Sulfate as a primary standard?",
                      "answer": "Ferrous sulfate crystals readily oxidize in air to Ferric sulfate. Mohr's salt strongly resists air oxidation, acting as a stable, highly reliable primary standard weighing solid."
                    },
                    {
                      "question": "Why do we add Concentrated Sulfuric Acid while initially preparing the Mohr's salt solution?",
                      "answer": "To completely prevent the spontaneous hydrolysis of the delicate ferrous ions (Fe2+) into dense brown, insoluble Ferric Hydroxide (Fe(OH)3)."
                    },
                    {
                      "question": "In the presence of KMnO4, what exactly gets oxidized in Mohr's salt?",
                      "answer": "The Iron(II) cation (Fe2+) loses an electron to forcibly become the Iron(III) cation (Fe3+)."
                    },
                    {
                      "question": "If the pale pink color disappears after 30 seconds at the endpoint, is the titration complete?",
                      "answer": "No. The incredibly slow atmospheric reduction of the remaining unreacted MnO4- eventually consumes the pink color. The true endpoint is reached when the pale pink tint stubbornly persists for at least one full minute."
                    },
                    {
                      "question": "Why must Oxalic Acid be aggressively heated before titrating, unlike Mohr's salt?",
                      "answer": "The reaction between oxalic acid and KMnO4 is exceptionally sluggish at room temperature. Heating it provides the kinetic activation energy necessary to speed up the process to measurable levels."
                    },
                    {
                      "question": "What acts as the 'auto-catalyst' in the Oxalic-KMnO4 reaction?",
                      "answer": "The produced Mn2+ ions actively catalyze and accelerate their own continuous reaction."
                    },
                    {
                      "question": "Why can't Nitric Acid (HNO3) be used to provide the acidic medium?",
                      "answer": "Nitric acid is a brutally strong oxidizing agent itself. It will unfairly compete with the KMnO4 and oxidize the reducing agent, completely ruining the stoichiometric calculations."
                    },
                    {
                      "question": "If 5 moles of electrons are transferred per mole of KMnO4 in acid, what is its normality compared to its molarity?",
                      "answer": "Its Normality is precisely 5 times its Molarity (N = 5M)."
                    }
                  ],
              realWorldApplications: [
                    "Water Purification Plants: Directly measuring and eliminating highly toxic, dissolved organic matter and iron/manganese impurities in commercial drinking water via powerful oxidation.",
                    "Metallurgical Ore Analysis: Ascertaining the exact percentage of reactive iron mathematically present within crushed hematite and magnetite rock samples.",
                    "Food Expiration Testing: Determining the precise remaining concentration of active Vitamin C (ascorbic acid) inside aging fruit juices via potent redox titrations.",
                    "Wastewater Management (COD): Calculating the Chemical Oxygen Demand of raw sewage by chemically oxidizing the massive sludge payloads using strong oxidizers before discharging it.",
                    "Bleaching Agent Manufacturing: Quantifying the absolute reactive strength of active chlorine compounds synthesized for use in industrial paper bleaching.",
                    "Clinical Diagnostics (Historic): Formerly used to analyze exact sugar or calcium concentrations in human blood and urine before the invention of digital spectrometers."
                  ]
        }
      },
      {
          id: 'c7',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Qualitative Analysis — Cations', description: 'Identify cations using systematic group analysis.', difficulty: 'Hard', duration: '45 min', category: 'Qualitative Analysis',          content: { aim: "To identify the cation present in a given salt.", requirements: ["Test Tubes", "Reagents", "Bunsen Burner"], theory: "Cations identified by dissolving salt and adding group reagents systematically.", procedure: [
              "Prepare the Original Solution (OS) of the given mixture.",
              "Group I: Add dilute HCl to the OS. A white precipitate indicates Group I (e.g., Pb2+). If no ppt, proceed to Group II.",
              "Group II: Pass H2S gas through the HCl-acidified OS. A black/yellow ppt indicates Group II (e.g., Cu2+, As3+). Boil off H2S if absent.",
              "Group III: Add solid NH4Cl and excess NH4OH. A reddish-brown or gelatinous white ppt indicates Group III (e.g., Fe3+, Al3+).",
              "Group IV: Pass H2S gas through the ammoniacal solution from Group III. A white/black ppt indicates Group IV (e.g., Zn2+, Mn2+).",
              "Continue this systematic elimination up to Group VI (Mg2+) and perform confirmatory tests for the precipitated group."
            ], objectives: ["Master wet chemistry."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The Group Reagent for Group II cations (Pb2+, Cu2+, As3+) is:",
                      "options": [
                        "Dilute HCl",
                        "H2S gas in the presence of dilute HCl",
                        "NH4OH and NH4Cl",
                        "Ammonium carbonate"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Adding purely NH4OH along with NH4Cl precipitates which specific Group III cations?",
                      "options": [
                        "Ba2+, Sr2+, Ca2+",
                        "Co2+, Ni2+, Mn2+, Zn2+",
                        "Fe3+, Al3+, Cr3+",
                        "Na+, K+"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "When performing a flame test, a brilliant 'Apple Green' flame confirms:",
                      "options": [
                        "Calcium",
                        "Strontium",
                        "Barium",
                        "Potassium"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "A pure 'Crimson Red' flame test definitively indicates:",
                      "options": [
                        "Sodium",
                        "Strontium",
                        "Copper",
                        "Lithium"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "To uniquely detect the Ammonium ion (NH4+), the salt is directly heated with Strong NaOH to release:",
                      "options": [
                        "Chlorine gas",
                        "Ammonia gas",
                        "Carbon Dioxide",
                        "Hydrogen Sulfide"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "During the exact confirmation of Lead (Pb2+), adding Potassium Chromate (K2CrO4) instantly yields what color precipitate?",
                      "options": [
                        "Black",
                        "White",
                        "Bright Yellow",
                        "Red"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 7,
                      "question": "The 'Prussian Blue' complex mathematically formed when testing Iron (Fe3+) requires adding:",
                      "options": [
                        "Potassium Ferrocyanide",
                        "Dimethylglyoxime",
                        "Barium chloride",
                        "Silver nitrate"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 8,
                      "question": "Adding Dimethylglyoxime (DMG) to Nickel (Ni2+) universally produces a stunning:",
                      "options": [
                        "Yellow solution",
                        "Rosy Red / Cherry Red precipitate",
                        "Dark Blue precipitate",
                        "White gelatinous precipitate"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "For Aluminum (Al3+), a white gelatinous precipitate forms which is bizarrely soluble in an excess of:",
                      "options": [
                        "Water",
                        "NaOH",
                        "HCl",
                        "H2S"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "Group IV cations are strongly precipitated by pumping H2S gas into:",
                      "options": [
                        "A strongly acidic medium",
                        "A neutral water medium",
                        "A strongly ammoniacal (basic) medium",
                        "A pure alcohol solution"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What fundamentally dictates the exact grouping of cations in Qualitative Salt Analysis?",
                      "answer": "The concept of Solubility Product (Ksp). Cations with extremely low Ksp values precipitate easily first (Group I), while those with higher Ksp require much higher concentrations of the precipitating agent (Group IV)."
                    },
                    {
                      "question": "Why must Group II be rigorously precipitated in an explicitly acidic medium (dilute HCl)?",
                      "answer": "The H+ ions from HCl strongly suppress the ionization of the weak acid H2S via the Common Ion Effect. This allows only extremely low concentrations of S2- ions, ensuring that only the highly insoluble Group II sulfides (like CuS) precipitate without accidentally dropping Group IV sulfides."
                    },
                    {
                      "question": "Why do we completely boil off the toxic H2S gas after finishing Group II and before starting Group III?",
                      "answer": "If left inside, the remaining H2S will instantly react with the alkaline NH4OH added in Group III, drastically precipitating Group IV cations prematurely, completely ruining the sequential analysis."
                    },
                    {
                      "question": "What is the critical chemical role of Nitric Acid (Concentrated HNO3) before attempting Group III?",
                      "answer": "During the earlier H2S bubbling, any Iron(III) was brutally reduced to Iron(II). The HNO3 forcibly oxidizes all the Fe2+ back into Fe3+ so it can properly precipitate as a distinct red-brown Hydroxide in Group III."
                    },
                    {
                      "question": "How do you systematically distinguish between a Calcium and Barium salt?",
                      "answer": "By adding Potassium Chromate to the exactly neutralized solution. Barium yields an immediate heavy yellow precipitate, whereas Calcium remains completely soluble."
                    },
                    {
                      "question": "If the Ammonium (Zero Group) test with NaOH yields a pungent 'urinal' gas, how do you chemically confirm it is Ammonia?",
                      "answer": "By holding a glass rod dipped deeply in Concentrated Hydrochloric Acid (HCl) directly near the mouth of the test tube. Thick, dense white fumes of Ammonium Chloride (NH4Cl) will instantly erupt."
                    },
                    {
                      "question": "Why is Sodium (Na+) notoriously never precipitated in any of the massive groups?",
                      "answer": "Sodium (along with Potassium) compounds are almost perfectly soluble in all typical aqueous laboratory reagents. Thus, it can only be detected via its intense Golden-Yellow flame test."
                    },
                    {
                      "question": "What precisely is Nessler's Reagent and exactly what does it detect?",
                      "answer": "It is an alkaline solution of Potassium Tetraiodomercurate(II). It is exquisitely sensitive, turning a bold brown/yellow selectively indicating even trace amounts of the Ammonium (NH4+) cation."
                    },
                    {
                      "question": "Explain the Lake Test definitively used for Aluminum.",
                      "answer": "The aluminum hydroxide precipitate physically absorbs the blue 'litmus' dye compound, separating perfectly from the colorless liquid below, looking exactly like a distinct 'blue lake' floating inside the test tube."
                    },
                    {
                      "question": "Why do we fiercely rub the platinum wire against the concentrated HCl before every single flame test?",
                      "answer": "To vaporize and obliterate any trace metallic impurities from previous users. The wire must impart absolutely 'no color' initially to ensure the reading is genuinely from your specific salt."
                    }
                  ],
              realWorldApplications: [
                    "Clinical Blood Analysis: Hospitals meticulously quantifying exact Sodium, Potassium, and Calcium cation balances to diagnose severe patient dehydration or organ failure.",
                    "Environmental Heavy Metal Detection: Rapidly uncovering lethal Lead (Pb2+) or Cadmium traces secretly poisoning municipal municipal pipelines and community drinking reservoirs.",
                    "Industrial Electroplating Solutions: Technicians confirming the exact Copper (Cu2+) or Nickel (Ni2+) concentrations inside massive chemical baths preventing defective metallic coatings.",
                    "Agriculture and Soil Management: Systematically measuring absolutely vital Zinc, Iron, and Magnesium nutrient cations present within commercial fertilizers.",
                    "Criminal Forensic Science: Toxicologists searching for undetectable Arsenic (As3+) exactly within exhumed skeletal tissues during historical murder investigations.",
                    "Pharmaceutical Purity Control: FDA inspectors forcing drug batches through grueling qualitative tests looking for heavy metal contaminants like Barium or Lead."
                  ]
        }
      },
      {
          id: 'c8',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Qualitative Analysis — Anions', description: 'Detect anions using dry and wet tests.', difficulty: 'Medium', duration: '35 min', category: 'Qualitative Analysis',          content: { aim: "To identify the anion present in a given salt.", requirements: ["Test Tubes", "Dilute H2SO4", "BaCl2", "AgNO3"], theory: "CO3 gives CO2 effervescence, SO4 gives white ppt with BaCl2, Cl gives white curdy ppt with AgNO3.", procedure: [
              "Take a small amount of the salt in a dry test tube and add a few drops of dilute H2SO4.",
              "Observe for effervescence (CO3 2-) or rotten egg smell (S 2-). Perform confirmatory tests if positive.",
              "If no reaction, take another pinch of salt and add concentrated H2SO4.",
              "Heat gently. Pungent fumes (Cl-), reddish-brown fumes (Br-, NO3-), or violet vapors (I-) indicate concentrated acid group anions.",
              "Perform specific confirmatory test: e.g., Chromyl chloride test for chloride, or Brown ring test for nitrate.",
              "If both groups are absent, test for independent anions (Sulphate, Phosphate) using Barium chloride or Ammonium molybdate tests respectively."
            ], objectives: ["Identify common anions."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "When treating an unknown salt with Dilute Sulfuric Acid, vigorous effervescence of a colorless, odorless gas points solidly to:",
                      "options": [
                        "Chloride",
                        "Carbonate (CO3 2-)",
                        "Nitrate",
                        "Sulfate"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "A gas possessing a distinct 'Rotten Egg' smell strongly indicates the presence of the radical:",
                      "options": [
                        "Sulfite",
                        "Acetate",
                        "Sulfide (S 2-)",
                        "Nitrite"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "Adding Concentrated Sulfuric Acid heavily evolves a pungent Reddish-Brown gas. This proves the radical is:",
                      "options": [
                        "Nitrate or Bromide",
                        "Chloride initially",
                        "Carbonate",
                        "Sulfate"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 4,
                      "question": "What explicitly confirms the presence of an Acetate (CH3COO-) ion?",
                      "options": [
                        "The Apple-Green flame",
                        "The distinct smell of commercial vinegar upon aggressive rubbing or gentle acid heating",
                        "A deep blue precipitate",
                        "Effervescence of Ammonia"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "The specific 'Chromyl Chloride' test definitively identifies which critical anion?",
                      "options": [
                        "Bromide",
                        "Phosphate",
                        "Chloride (Cl-)",
                        "Iodide"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "If the Brown Ring test produces a highly stable complex [Fe(H2O)5(NO)]2+, the unknown salt is certainly a:",
                      "options": [
                        "Nitrite",
                        "Carbonate",
                        "Sulfate",
                        "Nitrate (NO3-)"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 7,
                      "question": "Adding Barium Chloride universally triggers a thick white precipitate permanently insoluble in any acid if the anion is:",
                      "options": [
                        "Chloride",
                        "Sulfate (SO4 2-)",
                        "Phosphate",
                        "Nitrate"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "When checking an unknown Iodide (I-) visually with Silver Nitrate (AgNO3), it instantly yields:",
                      "options": [
                        "A bright yellow precipitate perfectly completely insoluble in NH4OH",
                        "A white precipitate that dissolves easily",
                        "A completely clear reaction",
                        "A violent explosion"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 9,
                      "question": "A completely 'Vinegar' scented salt fiercely mixed with neutral FeCl3 yields what diagnostic color?",
                      "options": [
                        "Deep Blood Red coloration",
                        "Bright Neon Green",
                        "Solid Black",
                        "Pure White"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 10,
                      "question": "If Silver Nitrate heavily creates a curdy white precipitate completely soluble in Ammonium Hydroxide, the anion is undeniably:",
                      "options": [
                        "A Bromide",
                        "An Iodide",
                        "A loose Chloride",
                        "A fixed Sulfate"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What radically distinguishes the Dilute Acid group from the Concentrated Acid group of anions?",
                      "answer": "Dilute acids exclusively decompose the wildly unstable conjugate bases of incredibly weak acids (like Carbonates and Sulfides). Concentrated acids brutally attack and decompose the much stronger salts (like pure Chlorides, Bromides, and tough Nitrates) yielding identifiable corrosive gases."
                    },
                    {
                      "question": "During the initial Carbonate analysis, why do we pass the evolved 'colorless' gas precisely through Limewater?",
                      "answer": "The evolved Carbon Dioxide powerfully reacts purely with the Calcium Hydroxide (limewater) to mathematically yield incredibly insoluble chalky Calcium Carbonate, visually turning the entire transparent liquid completely 'milky'."
                    },
                    {
                      "question": "What causes the milky Limewater to suddenly miraculously turn clear again if you relentlessly bubble CO2 through it continuously?",
                      "answer": "The extreme excess of CO2 aggressively converts the insoluble Calcium Carbonate strictly into highly soluble Calcium Bicarbonate, dissolving the chalk effortlessly back into a clear state."
                    },
                    {
                      "question": "Describe the underlying chemistry driving the universally critical Chromyl Chloride test.",
                      "answer": "Heating a solid suspected Chloride salt violently with Solid Potassium Dichromate (K2Cr2O7) and pure concentrated Sulfuric Acid chemically creates vaporous Chromyl Chloride (CrO2Cl2). This intensely red gas, when forcibly captured inside NaOH, turns purely yellow—a reaction uniquely impossible for Bromides or Iodides."
                    },
                    {
                      "question": "Why is the critical 'Brown Ring' test never performed immediately inside an aggressively hot test tube?",
                      "answer": "The delicate iron-nitroso coordination complex forming the actual 'brown ring' is exceptionally unstable thermally. Any intense heat violently shatters the complex, releasing the NO gas prematurely and completely destroying the test's visual evidence."
                    },
                    {
                      "question": "How does the intensely pungent NO2 brown gas from Nitrates drastically differ from the identical NO2 brown gas produced by Nitrites?",
                      "answer": "Nitrites are incredibly unstable and will immediately release the brutal brown gas using weak Dilute acids even when cold. Nitrates are vastly more stable and demand boiling Concentrated Sulfuric acid plus physical copper turnings to finally break down into NO2."
                    },
                    {
                      "question": "What does the extreme 'Lead Acetate Paper' test definitively prove?",
                      "answer": "Exposing chemically moist Lead Acetate paper heavily to a foul Rotten-Egg gas (H2S) immediately generates black Lead Sulfide (PbS), physically turning the entire pure white paper visibly black, confirming the 'Sulfide' radical."
                    },
                    {
                      "question": "What explicitly differentiates an ordinary Bromide from a heavy Iodide regarding pure Concentrated Sulfuric Acid?",
                      "answer": "While a Bromide purely yields exclusively Reddish-Brown Bromine vapors, the massive Iodide atom oxidizes powerfully releasing deep, haunting Violet/Purple fumes of elemental Iodine that dramatically stain starch paper distinctly blue/black."
                    },
                    {
                      "question": "Why must you rigorously eliminate all traces of the initial interfering Sulfides before mathematically starting the exact Sulfate precipitation?",
                      "answer": "Because leaving random dissolved sulfides inside will recklessly precipitate purely black Barium Sulfide, completely masking the exact bright-white Barium Sulfate results entirely making identification completely impossible."
                    },
                    {
                      "question": "Explain precisely what the exact 'Phosphomolybdate' test proves.",
                      "answer": "Boiling the exact acid solution of a rare Phosphate intensely with Ammonium Molybdate violently creates an exceedingly heavy, bright Canary-Yellow crystalline precipitate, perfectly confirming the crucial Phosphate."
                    }
                  ],
              realWorldApplications: [
                    "Water Supply Disinfection: Systematically running exact Chloride anion mass tests heavily to measure exactly how much active bleach and lethal chlorine definitively remains inside massive public drinking pipelines.",
                    "Gunpowder and Explosives Identification: Forensic departments isolating and measuring extreme exact Nitrate or localized Chlorate anion residues deeply embedded inside burned clothing threads after violent explosive detonations.",
                    "Environmental Acid Rain Analysis: Scientists precisely checking exact Sulfate (SO4 2-) and toxic Nitrate (NO3-) atmospheric wash-down concentrations secretly destroying vulnerable mountain lakes.",
                    "Global Nutritional Supplements: Validating the exact active presence of pure essential Iodide (I-) anions chemically added into global retail table-salt explicitly avoiding global thyroid failures.",
                    "Marine Biology Maintenance: Relentlessly checking the exceedingly dangerous invisible Nitrite (NO2-) and lethal Ammonia exact levels actively killing fish within massively expensive recirculating aquaculture commercial fish-farms.",
                    "Baking and Commercial Cooking: Verifying the incredibly exact active concentrations of strong Carbonates specifically required inside dense pastry baking powders guaranteeing the explicit necessary physical rising lift."
                  ]
        }
      },
      {
          id: 'c9',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Rate of Reaction', description: 'Study how temperature affects reaction rate.', difficulty: 'Medium', duration: '35 min', category: 'Kinetics',          content: { aim: "To study effect of temperature on rate of reaction.", requirements: ["Na2S2O3", "HCl", "Beakers", "Thermometer", "Stopwatch"], theory: "Rate doubles for every 10C rise. Arrhenius equation: k = Ae^(-Ea/RT).", procedure: [
              "Prepare standard solutions of Sodium Thiosulphate (Na2S2O3) and Hydrochloric Acid (HCl).",
              "Measure a fixed volume (e.g., 50 mL) of 0.1M Na2S2O3 into a conical flask placed on a piece of paper marked with a cross (X).",
              "Add a fixed volume (e.g., 10 mL) of 1M HCl to the flask and immediately start the stopwatch.",
              "Swirl the flask once and observe the cross through the solution from the top.",
              "The solution will gradually turn milky yellow due to precipitating sulfur.",
              "Stop the stopwatch exactly when the cross (X) becomes completely invisible.",
              "Record the time taken.",
              "Repeat the experiment by changing the concentration of Na2S2O3 or changing the temperature to study the effect on the rate of reaction."
            ], objectives: ["Understand activation energy."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The rate of a chemical reaction is defined as:",
                      "options": [
                        "Change in color per unit time",
                        "Change in concentration of reactant or product per unit time",
                        "Change in temperature per unit time",
                        "Change in mass per unit time"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Which factor does NOT affect the rate of reaction?",
                      "options": [
                        "Temperature",
                        "Concentration",
                        "Catalyst",
                        "Molecular formula of product"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 3,
                      "question": "Increasing temperature generally increases rate because:",
                      "options": [
                        "It lowers activation energy",
                        "It increases the fraction of molecules exceeding activation energy",
                        "It changes the products",
                        "It removes the catalyst"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "A catalyst increases the rate of reaction by:",
                      "options": [
                        "Increasing concentration",
                        "Providing an alternative pathway with lower activation energy",
                        "Increasing temperature",
                        "Increasing pressure"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "The unit of rate of reaction for a first-order reaction is:",
                      "options": [
                        "mol L⁻¹",
                        "s⁻¹",
                        "mol L⁻¹ s⁻¹",
                        "L mol⁻¹ s⁻¹"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "For the reaction 2A → B, if rate of disappearance of A is 0.1 mol/L/s, rate of appearance of B is:",
                      "options": [
                        "0.1 mol/L/s",
                        "0.2 mol/L/s",
                        "0.05 mol/L/s",
                        "0.01 mol/L/s"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 7,
                      "question": "The reaction Na₂S₂O₃ + HCl produces a yellow turbidity due to:",
                      "options": [
                        "Formation of NaCl",
                        "Liberation of sulfur",
                        "Formation of SO₂",
                        "Release of H₂"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Collision theory states reaction occurs when molecules collide with:",
                      "options": [
                        "Any energy",
                        "Sufficient energy and proper orientation",
                        "Low speed",
                        "No energy"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Doubling the concentration of a reactant in a first-order reaction:",
                      "options": [
                        "Doubles the rate",
                        "Quadruples the rate",
                        "Halves the rate",
                        "No effect"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 10,
                      "question": "The Arrhenius equation relates rate constant to:",
                      "options": [
                        "Pressure",
                        "Volume",
                        "Temperature and activation energy",
                        "Moles of product"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is chemical kinetics?",
                      "answer": "The branch of chemistry that studies the rates and mechanisms of chemical reactions and the factors affecting them."
                    },
                    {
                      "question": "Differentiate between average rate and instantaneous rate.",
                      "answer": "Average rate is measured over a finite time interval, while instantaneous rate is measured at a specific moment using the slope of the tangent to the concentration-time curve."
                    },
                    {
                      "question": "What is activation energy?",
                      "answer": "The minimum energy that reacting molecules must possess for effective collisions to occur and form products."
                    },
                    {
                      "question": "How does surface area affect rate?",
                      "answer": "Increasing surface area (e.g., powdering a solid) exposes more reactant particles, increasing collision frequency and thus the rate."
                    },
                    {
                      "question": "What is the role of Na₂S₂O₃ in the rate experiment?",
                      "answer": "Sodium thiosulfate reacts with HCl to produce colloidal sulfur, whose appearance time is inversely proportional to the rate."
                    },
                    {
                      "question": "Why does the reaction appear faster at higher temperatures?",
                      "answer": "Higher temperatures increase molecular kinetic energy, so more molecules cross the activation energy barrier per unit time."
                    },
                    {
                      "question": "What is a rate law?",
                      "answer": "A mathematical expression showing how the rate depends on the concentration of reactants, each raised to an experimentally determined power (order)."
                    },
                    {
                      "question": "What is the order of a reaction?",
                      "answer": "The sum of the powers to which the concentration terms are raised in the rate law. It must be determined experimentally."
                    },
                    {
                      "question": "Can a catalyst change the equilibrium position?",
                      "answer": "No. A catalyst speeds up both forward and reverse reactions equally, reaching equilibrium faster without shifting it."
                    },
                    {
                      "question": "What is the half-life of a reaction?",
                      "answer": "The time required for the concentration of a reactant to decrease to exactly half its initial value."
                    }
                  ],
              realWorldApplications: [
                    "Food Preservation: Refrigeration slows biochemical decay reactions in food by reducing molecular kinetic energy.",
                    "Automobile Catalytic Converters: Platinum/palladium catalysts accelerate the conversion of toxic CO and NOx exhaust into harmless CO₂ and N₂.",
                    "Pharmaceutical Shelf Life: Drug companies use rate studies to determine expiration dates by predicting decomposition rates at room temperature.",
                    "Industrial Ammonia Synthesis (Haber Process): Optimizing temperature, pressure, and iron catalysts to maximize the rate of nitrogen fixation.",
                    "Enzyme Kinetics in Biology: Understanding Michaelis-Menten kinetics helps design drugs that inhibit specific enzyme-catalyzed reactions.",
                    "Combustion Engine Design: Engineers optimize fuel-air mixtures and compression ratios based on combustion reaction rate data."
                  ]
        }
      },
      {
          id: 'c10',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Enthalpy of Neutralization', description: 'Measure heat released in acid-base neutralization.', difficulty: 'Medium', duration: '30 min', category: 'Thermodynamics',          content: { aim: "To determine enthalpy of neutralization.", requirements: ["Calorimeter", "HCl", "NaOH", "Thermometer"], theory: "For strong acid + strong base: DeltaH = -57.1 kJ/mol. Q = m*c*DeltaT.", procedure: [
              "Take 100 mL of 0.1 M strong acid (e.g., HCl) in an insulated calorimeter and note its initial constant temperature (T1).",
              "Take 100 mL of 0.1 M strong base (e.g., NaOH) in a separate beaker and note its initial temperature (T2). Ensure T1 and T2 are nearly equal.",
              "Calculate the average initial temperature T_initial = (T1+T2)/2.",
              "Quickly pour the base into the acid in the calorimeter and stir well.",
              "Note the maximum highest temperature reached by the mixture (T_final).",
              "Calculate the temperature rise: Delta T = T_final - T_initial.",
              "Use the formula Q = m * c * Delta T to calculate the heat evolved.",
              "Calculate the Enthalpy of Neutralization per mole of water formed."
            ], objectives: ["Understand thermochemistry."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Enthalpy of neutralization is defined for the formation of:",
                      "options": [
                        "1 mole of salt",
                        "1 mole of water from H⁺ and OH⁻",
                        "1 mole of acid",
                        "1 mole of base"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "The standard enthalpy of neutralization for a strong acid-strong base reaction is approximately:",
                      "options": [
                        "-57.1 kJ/mol",
                        "-100 kJ/mol",
                        "+57.1 kJ/mol",
                        "-13.7 kJ/mol"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "Neutralization is always:",
                      "options": [
                        "Endothermic",
                        "Exothermic",
                        "Isothermal",
                        "Adiabatic"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "Why is the enthalpy of neutralization of weak acid-strong base less than -57.1 kJ?",
                      "options": [
                        "Weak acids are stronger",
                        "Part of the heat is used to ionize the weak acid",
                        "Temperature drops",
                        "No water is formed"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "In the calorimetry setup, the polystyrene cup acts as:",
                      "options": [
                        "A reactant",
                        "An insulator to minimize heat loss",
                        "A catalyst",
                        "An indicator"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The formula to calculate heat released is:",
                      "options": [
                        "Q = mcΔT",
                        "Q = PV",
                        "Q = nRT",
                        "Q = mv²/2"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 7,
                      "question": "What is 'c' in the equation Q = mcΔT?",
                      "options": [
                        "Concentration",
                        "Specific heat capacity",
                        "Molar mass",
                        "Temperature"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "If 50 mL of 1M HCl is mixed with 50 mL of 1M NaOH and temperature rises by 6.8°C, the heat evolved is approximately (c=4.18 J/g/°C):",
                      "options": [
                        "1.42 kJ",
                        "2.84 kJ",
                        "5.68 kJ",
                        "0.28 kJ"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The specific heat capacity of dilute aqueous solutions is assumed to be:",
                      "options": [
                        "1.0 J/g/°C",
                        "4.18 J/g/°C (same as water)",
                        "2.0 J/g/°C",
                        "10 J/g/°C"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "Hess's Law states that enthalpy change of a reaction is:",
                      "options": [
                        "Dependent on the path taken",
                        "Independent of the path, depending only on initial and final states",
                        "Always zero",
                        "Equal to activation energy"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is enthalpy?",
                      "answer": "A thermodynamic quantity representing the total heat content of a system at constant pressure (H = U + PV)."
                    },
                    {
                      "question": "Why do we use dilute solutions in this experiment?",
                      "answer": "So that the volume of water is large enough to assume the density and specific heat capacity are essentially those of pure water."
                    },
                    {
                      "question": "What assumptions are made in simple calorimetry?",
                      "answer": "No heat is lost to the surroundings, the specific heat capacity and density of solutions equal water, and mixing is instantaneous."
                    },
                    {
                      "question": "Why is the heat of neutralization of HF + NaOH different from HCl + NaOH?",
                      "answer": "HF is a weak acid; some energy is consumed in completely ionizing HF into H⁺ and F⁻, reducing the net heat evolved."
                    },
                    {
                      "question": "Define Hess's Law.",
                      "answer": "The total enthalpy change of a reaction is the same regardless of whether it occurs in one step or multiple steps, as enthalpy is a state function."
                    },
                    {
                      "question": "What is a calorimeter?",
                      "answer": "A device used to measure the heat released or absorbed during a chemical or physical process."
                    },
                    {
                      "question": "Why should you stir the solution continuously?",
                      "answer": "To ensure uniform mixing and homogeneous temperature distribution throughout the liquid for an accurate ΔT measurement."
                    },
                    {
                      "question": "What would happen if you used concentrated solutions?",
                      "answer": "The heat of dilution would add a significant extra exothermic contribution, distorting the true neutralization enthalpy value."
                    },
                    {
                      "question": "Can enthalpy of neutralization be positive?",
                      "answer": "No. Neutralization (H⁺ + OH⁻ → H₂O) is inherently exothermic, so ΔH is always negative."
                    },
                    {
                      "question": "What is the difference between enthalpy and internal energy?",
                      "answer": "Enthalpy includes the PV work term (H = U + PV), making it the relevant quantity for reactions at constant pressure."
                    }
                  ],
              realWorldApplications: [
                    "Antacid Tablet Design: Pharmaceutical companies measure neutralization heat to ensure antacids safely neutralize excess stomach acid without thermal damage.",
                    "Industrial Waste Neutralization: Chemical plants must carefully control heat release when neutralizing large volumes of acidic/basic wastewater.",
                    "Battery Electrolyte Management: Understanding neutralization thermodynamics helps manage thermal runaway risks in lead-acid batteries.",
                    "Agricultural Lime Application: Calculating exact amounts of lime needed to neutralize acidic soils without overheating the root zone.",
                    "Chemical Reactor Design: Engineers use enthalpy data to design cooling systems preventing dangerous temperature spikes during large-scale neutralizations.",
                    "Thermal Energy Storage: Some heating systems exploit the exothermic nature of neutralization to store and release thermal energy on demand."
                  ]
        }
      },
      {
          id: 'c11',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Preparation of Potash Alum', description: 'Prepare potash alum crystals from aluminium.', difficulty: 'Medium', duration: '45 min', category: 'Preparations',          content: { aim: "To prepare potash alum from scrap aluminium.", requirements: ["Aluminium", "KOH", "H2SO4", "Beaker"], theory: "Al dissolves in KOH, then reacts with H2SO4 to form potash alum crystals.", procedure: [
              "Weigh approximately 2.5g of Potassium Sulphate (K2SO4) and dissolve it in minimum boiling water in a beaker.",
              "Weigh approximately 10g of Aluminum Sulphate (Al2(SO4)3.18H2O) and dissolve it in minimum boiling water in another beaker. Add 1-2 mL of dilute H2SO4 to prevent hydrolysis.",
              "Filter both the hot solutions to remove insoluble impurities.",
              "Mix the two clear hot solutions in a china dish.",
              "Heat the mixture on a wire gauze to concentrate it up to the crystallization point (check by blowing on a glass rod dipped in the solution).",
              "Allow the concentrated solution to cool undisturbed at room temperature for several hours.",
              "Colorless, octahedral crystals of Potash Alum will separate out.",
              "Filter the crystals, wash them with a small amount of ice-cold distilled water, and dry them between folds of filter paper."
            ], objectives: ["Understand crystallization."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Potash Alum has the chemical formula:",
                      "options": [
                        "KAl(SO₄)₂·12H₂O",
                        "NaAl(SO₄)₂·12H₂O",
                        "K₂SO₄·Al₂O₃",
                        "AlCl₃·6H₂O"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 2,
                      "question": "Alum is classified as a:",
                      "options": [
                        "Simple salt",
                        "Double salt",
                        "Complex salt",
                        "Acid salt"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "The process of obtaining pure crystals from a hot saturated solution is called:",
                      "options": [
                        "Distillation",
                        "Crystallization",
                        "Sublimation",
                        "Evaporation"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "Why is the solution heated during preparation?",
                      "options": [
                        "To decompose the salt",
                        "To increase solubility and dissolve maximum solute",
                        "To change pH",
                        "To remove the solvent completely"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "The solution is filtered hot because:",
                      "options": [
                        "Cold filtration takes too long",
                        "Hot filtration removes insoluble impurities before crystallization",
                        "Crystals dissolve in hot filter paper",
                        "It prevents the filter from breaking"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "Slow cooling produces crystals that are:",
                      "options": [
                        "Small and powdery",
                        "Large and well-formed",
                        "Amorphous",
                        "Invisible"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "The 12H₂O in potash alum represents:",
                      "options": [
                        "Free water",
                        "Water of crystallization",
                        "Heavy water",
                        "Steam"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Potash alum is commonly used in:",
                      "options": [
                        "Nuclear reactors",
                        "Water purification as a flocculating agent",
                        "Rocket fuel",
                        "Semiconductor manufacturing"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The shape of potash alum crystals is:",
                      "options": [
                        "Cubic",
                        "Octahedral",
                        "Hexagonal",
                        "Needle-like"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "If the solution is cooled too rapidly, the crystals will be:",
                      "options": [
                        "Large and shiny",
                        "Small and impure",
                        "Perfectly formed",
                        "Nonexistent"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a double salt?",
                      "answer": "A salt formed by combining two simple salts that crystallize together in a fixed stoichiometric ratio but dissociate completely into individual ions in solution."
                    },
                    {
                      "question": "How does a double salt differ from a complex salt?",
                      "answer": "A double salt fully dissociates into all its constituent ions in solution, while a complex salt retains its complex ion structure in solution."
                    },
                    {
                      "question": "What is water of crystallization?",
                      "answer": "A fixed number of water molecules that are incorporated into the crystal lattice structure during crystallization, essential for maintaining the crystal shape."
                    },
                    {
                      "question": "Why do we add dilute H₂SO₄ during the preparation?",
                      "answer": "To prevent hydrolysis of aluminum sulfate and to maintain an acidic medium that promotes proper crystal formation."
                    },
                    {
                      "question": "What will happen if the alum is heated strongly?",
                      "answer": "It will lose its water of crystallization (become anhydrous/dehydrated), swell up (intumesce), and eventually decompose."
                    },
                    {
                      "question": "Why should the crystals be dried using filter paper and not by heating?",
                      "answer": "Heating would drive off the water of crystallization, destroying the crystal structure and changing the compound."
                    },
                    {
                      "question": "What is the role of K₂SO₄ in alum formation?",
                      "answer": "Potassium sulfate provides the K⁺ ions essential for forming the double salt crystal lattice with aluminum sulfate."
                    },
                    {
                      "question": "How do you test if the prepared salt is indeed potash alum?",
                      "answer": "Dissolve in water and test separately for K⁺ (flame test: lilac), Al³⁺ (lake test with litmus), and SO₄²⁻ (BaCl₂ white precipitate)."
                    },
                    {
                      "question": "What is a saturated solution?",
                      "answer": "A solution that contains the maximum amount of solute that can dissolve at a given temperature, with undissolved solute in equilibrium."
                    },
                    {
                      "question": "Why is crystallization preferred over simple evaporation for purification?",
                      "answer": "Crystallization yields pure, well-formed crystals because impurities remain dissolved in the mother liquor, while evaporation concentrates impurities alongside the product."
                    }
                  ],
              realWorldApplications: [
                    "Municipal Water Purification: Alum is widely used as a coagulant to clump suspended particles together for easy removal by sedimentation.",
                    "Dyeing and Textile Industry: Alum acts as a mordant, helping dyes bond permanently to fabric fibers for colorfast textiles.",
                    "Paper Manufacturing: Used in paper sizing to control ink absorption and improve paper quality.",
                    "Medicinal Styptic Pencils: Alum blocks are applied to minor cuts and shaving nicks to stop bleeding by constricting blood vessels.",
                    "Leather Tanning: Alum helps preserve animal hides by cross-linking collagen fibers during the tanning process.",
                    "Baking Powder Component: Certain baking powders contain alum as an acid component that reacts with baking soda to produce CO₂ for leavening."
                  ]
        }
      },
      {
          id: 'c12',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'pH of Various Solutions', description: 'Determine pH of household substances.', difficulty: 'Easy', duration: '20 min', category: 'Acids & Bases',          content: { aim: "To determine pH of various solutions using pH paper.", requirements: ["pH Paper", "Solutions", "Color Chart"], theory: "pH = -log[H+]. Acids: pH < 7, Neutral: pH = 7, Bases: pH > 7.", procedure: [
              "Procure different samples of solutions (e.g., fruit juices, standard acid/base dilutions, tap water, soapy water).",
              "Take 5 mL of each solution in separate, clean, labeled test tubes.",
              "Add 2 drops of Universal Indicator to each test tube.",
              "Shake the test tubes gently to mix the indicator.",
              "Observe the color change in each solution.",
              "Compare the colors with the pH color chart to determine the approximate pH value of each solution.",
              "Classify each solution as strongly acidic, weakly acidic, neutral, weakly basic, or strongly basic."
            ], objectives: ["Classify solutions."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A solution with pH 1 compared to pH 3 is:",
                      "options": [
                        "100 times more acidic",
                        "10 times more acidic",
                        "2 times more acidic",
                        "Equally acidic"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 2,
                      "question": "The pH of pure water at 25°C is:",
                      "options": [
                        "0",
                        "7",
                        "14",
                        "1"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "Which solution has the highest [OH⁻]?",
                      "options": [
                        "pH 2",
                        "pH 7",
                        "pH 10",
                        "pH 13"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 4,
                      "question": "A pH meter works by measuring:",
                      "options": [
                        "Color change",
                        "Electrical potential difference across a glass electrode",
                        "Temperature",
                        "Turbidity"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Black coffee typically has a pH around:",
                      "options": [
                        "2",
                        "5",
                        "7",
                        "9"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "Household bleach has a pH of approximately:",
                      "options": [
                        "1",
                        "7",
                        "10",
                        "12-13"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 7,
                      "question": "Adding a few drops of lemon juice to water will:",
                      "options": [
                        "Increase pH",
                        "Decrease pH",
                        "Not change pH",
                        "Make it neutral"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Which indicator is suitable for measuring pH in the range 3.1-4.4?",
                      "options": [
                        "Phenolphthalein",
                        "Methyl orange",
                        "Litmus",
                        "Bromothymol blue"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The pOH of a solution with pH 4 at 25°C is:",
                      "options": [
                        "4",
                        "7",
                        "10",
                        "14"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "Buffer solutions resist changes in pH upon addition of small amounts of:",
                      "options": [
                        "Water only",
                        "Acid or base",
                        "Salt",
                        "Indicator"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "Why is pH measured on a logarithmic scale?",
                      "answer": "Because H⁺ concentrations in solutions span many orders of magnitude (10⁰ to 10⁻¹⁴ M), and a logarithmic scale compresses this into a manageable 0-14 range."
                    },
                    {
                      "question": "What happens to the pH of water if CO₂ dissolves in it?",
                      "answer": "CO₂ reacts with water to form carbonic acid (H₂CO₃), releasing H⁺ ions and lowering the pH below 7."
                    },
                    {
                      "question": "What is the relationship between pH and pOH?",
                      "answer": "At 25°C, pH + pOH = 14 (derived from Kw = [H⁺][OH⁻] = 10⁻¹⁴)."
                    },
                    {
                      "question": "Why must a pH meter be calibrated before use?",
                      "answer": "To ensure accurate readings by adjusting the meter's response using standard buffer solutions of known pH values."
                    },
                    {
                      "question": "Can pH be negative or greater than 14?",
                      "answer": "Yes, for extremely concentrated strong acids (pH < 0) or bases (pH > 14), though the scale is conventionally 0-14 for dilute solutions."
                    },
                    {
                      "question": "What is an amphoteric substance?",
                      "answer": "A substance that can act as both an acid and a base (e.g., water, amino acids, aluminum hydroxide)."
                    },
                    {
                      "question": "How does temperature affect pH of pure water?",
                      "answer": "At higher temperatures, Kw increases, so [H⁺] increases slightly, making the neutral pH less than 7."
                    },
                    {
                      "question": "Give an example of a natural buffer system.",
                      "answer": "The bicarbonate buffer in blood (H₂CO₃/HCO₃⁻) maintains blood pH between 7.35 and 7.45."
                    },
                    {
                      "question": "What is the pH of 0.001 M HCl?",
                      "answer": "pH = -log(10⁻³) = 3, since HCl is a strong acid and fully dissociates."
                    },
                    {
                      "question": "Why do we not taste or touch chemicals to determine their pH?",
                      "answer": "Many acids and bases are corrosive and toxic; proper instruments or indicators must be used for safe and accurate measurement."
                    }
                  ],
              realWorldApplications: [
                    "Blood Gas Analysis: Hospitals continuously monitor arterial blood pH to detect life-threatening acidosis or alkalosis conditions.",
                    "Aquaculture Management: Fish farms maintain precise water pH to ensure optimal growth and prevent mass die-offs.",
                    "Winemaking: Vintners control must pH to influence fermentation rates and final wine flavor profiles.",
                    "Concrete Durability: Engineers test the pH of rain and groundwater to predict acid attack on concrete structures.",
                    "Cosmetic Formulation: Skincare products are formulated at skin-compatible pH (~5.5) to maintain the acid mantle.",
                    "Wastewater Treatment: Municipal plants adjust effluent pH to meet regulatory discharge standards before release into waterways."
                  ]
        }
      },
      {
          id: 'c13',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Food Analysis', description: 'Tests for Carbohydrates, Fats, and Proteins.', difficulty: 'Easy', duration: '40 min', category: 'Biochemistry',          content: { aim: "To detect the presence of carbohydrates, fats, and proteins in given food samples.", requirements: ["Food samples (e.g. egg white, potato, oil)", "Iodine solution", "Benedict's reagent", "Biuret reagent", "Test tubes", "Filter paper"], theory: "Specific chemical tests reveal nutritional components. Starch turns blue-black with Iodine. Reducing sugars form red-brick precipitate with Benedict's. Proteins turn violet with Biuret reagent. Fats leave a translucent spot on paper.", procedure: [
              "Test for Starch: Add 2 drops of Iodine solution to an aqueous extract of the sample. Blue-black colour indicates starch.",
              "Test for Reducing Sugar: Add 2mL Benedict's reagent to the sample extract and heat in a boiling water bath. Orange/red precipitate indicates reducing sugar.",
              "Test for Proteins (Biuret Test): Add 2mL of 10% NaOH and 2-3 drops of 1% CuSO4 to the sample. A violet colour indicates protein.",
              "Test for Proteins (Xanthoproteic Test): Add concentrated HNO3 to the sample and heat. Yellow colour (turning orange with ammonia) indicates protein with aromatic rings.",
              "Test for Fats: Rub a small quantity of the sample on a clean filter paper. A translucent spot that does not dry indicates fat."
            ], objectives: ["Understand basic food chemistry and nutrition testing."],
            observationTable: { columns: ["Sample", "Test Performed", "Observation", "Inference"] },
            assignments: [
                { id: 1, question: "Why does the Biuret test give a violet color with proteins?", marks: 3 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The iodine test is used to detect the presence of:",
                      "options": [
                        "Proteins",
                        "Fats",
                        "Starch",
                        "Vitamins"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 2,
                      "question": "Starch turns iodine solution:",
                      "options": [
                        "Red",
                        "Yellow",
                        "Blue-Black",
                        "Green"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "The Biuret test detects:",
                      "options": [
                        "Sugars",
                        "Proteins",
                        "Lipids",
                        "Nucleic acids"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "A positive Biuret test gives what color?",
                      "options": [
                        "Blue",
                        "Violet/Purple",
                        "Yellow",
                        "Red"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Benedict's test is used to detect:",
                      "options": [
                        "Starch",
                        "Reducing sugars",
                        "Proteins",
                        "Fats"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "A positive Benedict's test shows a color change from blue to:",
                      "options": [
                        "Green to Yellow to Orange-Red",
                        "Purple",
                        "Black",
                        "Colorless"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 7,
                      "question": "The emulsion test detects the presence of:",
                      "options": [
                        "Starch",
                        "Proteins",
                        "Lipids/Fats",
                        "Minerals"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "Vitamin C (ascorbic acid) can be tested using:",
                      "options": [
                        "Iodine solution",
                        "DCPIP (dichlorophenolindophenol) solution",
                        "Benedict's solution",
                        "Biuret reagent"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "DCPIP turns from blue to colorless in the presence of:",
                      "options": [
                        "Starch",
                        "Vitamin C",
                        "Protein",
                        "Fat"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "Adulteration in milk can be detected by testing for:",
                      "options": [
                        "Excess water (lactometer), starch, detergent",
                        "Only color",
                        "Temperature",
                        "Viscosity alone"
                      ],
                      "correctIndex": 0
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "Why is food analysis important?",
                      "answer": "To ensure food quality, detect adulterants, verify nutritional content, and ensure consumer safety."
                    },
                    {
                      "question": "How does the iodine-starch reaction work?",
                      "answer": "Iodine molecules slip into the helical structure of amylose in starch, forming a charge-transfer complex that absorbs all light except blue-black wavelengths."
                    },
                    {
                      "question": "What is adulteration?",
                      "answer": "The deliberate addition of inferior, harmful, or unauthorized substances to food products to increase volume or reduce cost."
                    },
                    {
                      "question": "What does a negative Benedict's test indicate?",
                      "answer": "The solution remains blue, indicating no reducing sugars (like glucose or fructose) are present."
                    },
                    {
                      "question": "How do you test for the presence of fats?",
                      "answer": "The emulsion test: dissolve the sample in ethanol, pour into water. A cloudy white emulsion indicates lipids."
                    },
                    {
                      "question": "Why is the Biuret test performed in alkaline conditions?",
                      "answer": "The peptide bonds in proteins must react with Cu²⁺ ions in an alkaline medium (NaOH) to form the characteristic violet-colored complex."
                    },
                    {
                      "question": "What common adulterant is added to turmeric powder?",
                      "answer": "Metanil yellow (a toxic synthetic dye) is commonly added to enhance the yellow color of turmeric."
                    },
                    {
                      "question": "How can you detect added water in milk?",
                      "answer": "Using a lactometer — adulterated milk has lower density and the lactometer reading drops below normal range."
                    },
                    {
                      "question": "Name the macronutrients detected in food analysis.",
                      "answer": "Carbohydrates (starch, sugars), proteins, and lipids (fats and oils)."
                    },
                    {
                      "question": "What is DCPIP and how does it work?",
                      "answer": "Dichlorophenolindophenol is a blue dye that acts as an oxidizing agent. Vitamin C (a reducing agent) reduces it, turning it colorless."
                    }
                  ],
              realWorldApplications: [
                    "FDA and FSSAI Food Safety Labs: Government agencies routinely test commercial food samples for adulterants and nutritional claims verification.",
                    "Hospital Dietetics: Clinical labs analyze patient meals to ensure therapeutic diets meet exact macronutrient requirements.",
                    "Dairy Industry Quality Control: Every batch of milk is tested for fat content, added water, starch, and detergent before packaging.",
                    "Sports Nutrition: Supplement companies verify protein content in powders using Kjeldahl/Biuret methods to match label claims.",
                    "Forensic Toxicology: Analysts test food samples in poisoning cases to identify contaminants or toxins.",
                    "School Nutrition Programs: Cafeteria food is periodically tested to verify it meets mandated nutritional standards for students."
                  ]
        }
      },
      {
          id: 'c14',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Organic Preparation (Acetanilide)', description: 'Synthesize Acetanilide from Aniline.', difficulty: 'Hard', duration: '50 min', category: 'Preparations',          content: { aim: "To prepare a sample of Acetanilide from aniline and calculate its yield.", requirements: ["Aniline", "Glacial acetic acid", "Acetic anhydride", "Zinc dust", "Round bottom flask", "Water bath", "Ice bath"], theory: "Acetanilide is prepared by acetylation of aniline. Aniline reacts with acetic anhydride in the presence of glacial acetic acid to form acetanilide and acetic acid. Zinc dust is added to prevent oxidation of aniline during the reaction.", procedure: [
              "Measure 5 mL of aniline into a 100 mL round-bottom flask.",
              "Add 5 mL of glacial acetic acid and 5 mL of acetic anhydride to the flask.",
              "Add a pinch of zinc dust to prevent oxidation.",
              "Attach a reflux condenser and gently boil the mixture on a water bath for about 20-30 minutes.",
              "Remove the flask and slowly pour the hot reaction mixture into a beaker containing 100 mL of ice-cold water while stirring vigorously.",
              "White crystals of acetanilide will precipitate out.",
              "Filter the crystals using a suction filter or filter paper.",
              "Wash the crystals with cold water, dry them between filter paper folds, and weigh to find the yield.",
              "Determine the melting point for purity checking (expected ~114°C)."
            ], objectives: ["Learn organic synthesis techniques.", "Determine yield and purity."],
            observationTable: { columns: ["Reactant Amount", "Theoretical Yield", "Actual Yield", "Melting Point"] },
            assignments: [
                { id: 1, question: "Why is zinc dust added during the preparation of acetanilide?", marks: 3 },
                { id: 2, question: "Write the balanced chemical equation for the acetylation of aniline.", marks: 4 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Acetanilide is prepared by the acetylation of:",
                      "options": [
                        "Acetic acid",
                        "Aniline",
                        "Phenol",
                        "Ethanol"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "The acetylating agent commonly used is:",
                      "options": [
                        "Glacial acetic acid",
                        "Acetic anhydride",
                        "Acetone",
                        "Ethanol"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "Acetylation is a type of:",
                      "options": [
                        "Addition reaction",
                        "Substitution (acylation) reaction",
                        "Elimination reaction",
                        "Rearrangement reaction"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "The melting point of pure acetanilide is approximately:",
                      "options": [
                        "50°C",
                        "114°C",
                        "180°C",
                        "250°C"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Why is zinc dust sometimes added during preparation?",
                      "options": [
                        "As a catalyst",
                        "To prevent oxidation of aniline",
                        "To increase yield",
                        "To change color"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "Acetanilide is also known as:",
                      "options": [
                        "N-phenylacetamide",
                        "N-methylaniline",
                        "Benzamide",
                        "Acetaldehyde"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 7,
                      "question": "The product is purified by:",
                      "options": [
                        "Distillation",
                        "Recrystallization from hot water",
                        "Sublimation",
                        "Chromatography"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "The functional group present in acetanilide is:",
                      "options": [
                        "-OH",
                        "-NH₂",
                        "-NHCOCH₃ (amide)",
                        "-COOH"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 9,
                      "question": "During the reaction, the immediate byproduct evolved is:",
                      "options": [
                        "Water or Acetic acid",
                        "CO₂",
                        "H₂",
                        "NH₃"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 10,
                      "question": "Acetanilide was historically used as a:",
                      "options": [
                        "Fertilizer",
                        "Fever reducer (antipyretic)",
                        "Fuel additive",
                        "Bleaching agent"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is acetylation?",
                      "answer": "The process of introducing an acetyl group (CH₃CO-) into a molecule, typically replacing an active hydrogen atom."
                    },
                    {
                      "question": "Why is aniline acetylated in organic chemistry labs?",
                      "answer": "To protect the highly reactive -NH₂ group during further reactions, and to demonstrate nucleophilic substitution on amines."
                    },
                    {
                      "question": "What is recrystallization?",
                      "answer": "A purification technique where a solid is dissolved in a hot solvent, filtered, then slowly cooled to form pure crystals while impurities remain dissolved."
                    },
                    {
                      "question": "Why is glacial acetic acid sometimes used instead of acetic anhydride?",
                      "answer": "It can serve as both the acetylating agent and solvent, though the reaction is slower and requires refluxing."
                    },
                    {
                      "question": "How do you confirm the purity of the prepared acetanilide?",
                      "answer": "By measuring its melting point — pure acetanilide melts sharply at 114°C. A broad melting range indicates impurities."
                    },
                    {
                      "question": "What is the role of the reflux condenser during preparation?",
                      "answer": "To prevent the loss of volatile reactants by condensing vapors and returning them to the reaction flask."
                    },
                    {
                      "question": "Why was acetanilide replaced by paracetamol in medicine?",
                      "answer": "Acetanilide caused methemoglobinemia (toxic side effect reducing oxygen transport in blood), while paracetamol (its metabolite) is safer."
                    },
                    {
                      "question": "What type of bond is formed between aniline and the acetyl group?",
                      "answer": "An amide bond (C-N bond with C=O), making acetanilide a secondary amide."
                    },
                    {
                      "question": "Why is the crude product washed with cold water?",
                      "answer": "To remove water-soluble impurities like excess acetic acid and unreacted aniline hydrochloride."
                    },
                    {
                      "question": "What is the significance of the melting point in organic chemistry?",
                      "answer": "It serves as a key identity and purity criterion — pure compounds have sharp, characteristic melting points."
                    }
                  ],
              realWorldApplications: [
                    "Pharmaceutical Intermediate: Acetanilide serves as a precursor for synthesizing paracetamol (acetaminophen) and other analgesic drugs.",
                    "Rubber Vulcanization: Used as an accelerator and stabilizer in the industrial processing of rubber products.",
                    "Dye Manufacturing: Acts as an intermediate in the production of various azo dyes and pigments.",
                    "Photography: Historically used as an inhibitor in hydrogen peroxide solutions used in photographic development.",
                    "Organic Synthesis Teaching: Serves as one of the fundamental preparatory experiments teaching acetylation, reflux, and recrystallization techniques.",
                    "Industrial Cellulose Processing: Used in the manufacture of cellulose lacquers and varnishes as a plasticizer component."
                  ]
        }
      },
      {
          id: 'c15',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Crystallization of Mohr\'s Salt', description: 'Prepare double salt (Ferrous Ammonium Sulphate).', difficulty: 'Medium', duration: '40 min', category: 'Preparations',          content: { aim: "To prepare pure crystals of Ferrous Ammonium Sulphate (Mohr's Salt).", requirements: ["Ferrous sulphate", "Ammonium sulphate", "Dilute H2SO4", "Beakers", "Evaporating dish", "Burner"], theory: "Mohr's salt is a double salt containing two different cations (Fe2+ and NH4+). It is prepared by crystallizing a mixture containing equimolar proportions of ferrous sulphate and ammonium sulphate in water containing a little dilute sulfuric acid to prevent the hydrolysis of ferrous sulphate.", procedure: [
              "Weigh 7g of ferrous sulphate and 3.5g of ammonium sulphate into a clean beaker.",
              "Add approximately 2-3 mL of dilute H2SO4 to prevent hydrolysis of ferrous sulfate.",
              "Add 20 mL of distilled water and warm gently while stirring to dissolve the salts completely.",
              "Filter the warm solution into an evaporating dish (China dish) to remove insoluble impurities.",
              "Heat the solution gently on a sand bath or wire gauze to concentrate it up to the crystallization point.",
              "Check the crystallization point by dipping a glass rod into the solution and blowing on it (a thin solid film should form).",
              "Remove the dish from heat and allow it to cool slowly undisturbed.",
              "Light green monoclinic crystals of Mohr's salt will separate out.",
              "Filter, wash carefully with a few drops of alcohol, and dry the crystals."
            ], objectives: ["Understand crystallization techniques for inorganic salts."],
            observationTable: { columns: ["Salts used", "Mass", "Crystal Color", "Crystal Shape"] },
            assignments: [
                { id: 1, question: "Explain why dilute sulfuric acid is added during the preparation of Mohr's salt.", marks: 3 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Mohr's salt has the chemical formula:",
                      "options": [
                        "FeSO₄·(NH₄)₂SO₄·6H₂O",
                        "FeSO₄·7H₂O",
                        "Fe₂(SO₄)₃",
                        "NH₄Cl·FeCl₃"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 2,
                      "question": "Mohr's salt is classified as a:",
                      "options": [
                        "Complex salt",
                        "Double salt",
                        "Normal salt",
                        "Acid salt"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "The crystals of Mohr's salt are:",
                      "options": [
                        "White cubic",
                        "Light green monoclinic",
                        "Blue triclinic",
                        "Yellow hexagonal"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "Why is dilute H₂SO₄ added during dissolution?",
                      "options": [
                        "To speed up crystallization",
                        "To prevent hydrolysis and oxidation of Fe²⁺",
                        "To act as indicator",
                        "To reduce temperature"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "The solution must be concentrated by:",
                      "options": [
                        "Rapid boiling",
                        "Slow evaporation on a water bath",
                        "Freezing",
                        "Adding more solute"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The number of water molecules of crystallization in Mohr's salt is:",
                      "options": [
                        "4",
                        "6",
                        "7",
                        "12"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Mohr's salt is preferred as a primary standard because:",
                      "options": [
                        "It is expensive",
                        "It is resistant to aerial oxidation unlike FeSO₄",
                        "It is a strong oxidizer",
                        "It has no water of crystallization"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "The cation present that gives Mohr's salt its green color is:",
                      "options": [
                        "NH₄⁺",
                        "Fe²⁺",
                        "Fe³⁺",
                        "SO₄²⁻"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Crystallization should ideally be done by:",
                      "options": [
                        "Rapid cooling in ice",
                        "Slow, undisturbed cooling at room temperature",
                        "Heating to dryness",
                        "Adding ethanol"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "Mohr's salt is named after:",
                      "options": [
                        "Karl Friedrich Mohr, a German chemist",
                        "Max Planck",
                        "Dmitri Mendeleev",
                        "Antoine Lavoisier"
                      ],
                      "correctIndex": 0
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "Why is Mohr's salt more stable than plain ferrous sulfate?",
                      "answer": "The presence of ammonium sulfate in the crystal lattice stabilizes Fe²⁺ ions against oxidation to Fe³⁺ by atmospheric oxygen."
                    },
                    {
                      "question": "What is the difference between a double salt and a mixed salt?",
                      "answer": "A double salt dissociates completely into its constituent ions in solution, while a mixed salt contains two different cations or anions within the same crystal."
                    },
                    {
                      "question": "How do you determine the yield percentage?",
                      "answer": "Yield % = (Actual mass of crystals obtained / Theoretical maximum mass) × 100."
                    },
                    {
                      "question": "Why should the crystals not be dried in a hot oven?",
                      "answer": "High temperature will drive off the 6 molecules of water of crystallization, converting it to an anhydrous powder and changing its composition."
                    },
                    {
                      "question": "What happens if excess acid is added?",
                      "answer": "Excess acid increases solubility and prevents proper crystallization, reducing yield."
                    },
                    {
                      "question": "How do you test for the presence of Fe²⁺ in the prepared salt?",
                      "answer": "Add potassium ferricyanide solution — a deep blue (Turnbull's blue) precipitate confirms Fe²⁺."
                    },
                    {
                      "question": "What is the mother liquor?",
                      "answer": "The residual solution left after crystals have separated during crystallization, containing dissolved impurities."
                    },
                    {
                      "question": "Why must equal molar quantities of FeSO₄ and (NH₄)₂SO₄ be used?",
                      "answer": "Because Mohr's salt has a 1:1 stoichiometric ratio of these two salts, and deviation reduces purity."
                    },
                    {
                      "question": "Can Mohr's salt be used to standardize KMnO₄?",
                      "answer": "Yes, it is one of the most common primary standards used to accurately determine the concentration of KMnO₄ solutions."
                    },
                    {
                      "question": "What is efflorescence? Does Mohr's salt show it?",
                      "answer": "Efflorescence is the spontaneous loss of water of crystallization on exposure to dry air. Mohr's salt is slightly efflorescent."
                    }
                  ],
              realWorldApplications: [
                    "Analytical Chemistry Standard: Used globally as a reliable primary standard for standardizing potassium permanganate and dichromate solutions.",
                    "Water Treatment Analysis: Employed in determining dissolved oxygen levels and chemical oxygen demand in water quality testing.",
                    "Photography: Historically used in photographic developers and iron-based printing processes like cyanotype.",
                    "Fertilizer Quality Testing: Used as a reference standard when analyzing the iron content of agricultural fertilizers.",
                    "Electroplating Industry: Acts as a source of ferrous ions in iron electroplating baths for coating metal surfaces.",
                    "Teaching Laboratory Essential: One of the fundamental preparatory experiments in every senior secondary and undergraduate chemistry curriculum worldwide."
                  ]
        }
      }


    ]
  };
