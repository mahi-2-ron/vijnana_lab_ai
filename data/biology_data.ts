import { SubjectData } from '../types';
import { SubjectType } from '../types';
import { Zap, FlaskConical, Dna, Calculator, Monitor } from 'lucide-react';

export const biologyData: SubjectData = {
    id: 'biology',
    name: SubjectType.BIOLOGY,
    icon: Dna,
    color: 'lime',
    hex: '#65a30d',
    description: 'Dissect virtually, observe microscopic life, and understand physiological processes.',
    labs: [
      { 
        id: 'b1',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], 
        title: 'Mitosis in Onion Tip', 
        description: 'Observe stages of cell division.', 
        difficulty: 'Medium', 
        duration: '40 min', 
        category: 'Cell Biology',
        content: {
            videoId: "L0k-enzoeOM",
            aim: "To study mitosis in onion root tip cells.",
            requirements: ["Microscope", "Slide", "Onion root"],
            theory: "Mitosis is a type of cell division in which a single cell divides to produce two genetically identical daughter cells. It occurs in somatic cells and is essential for growth, repair, and asexual reproduction.\n\n**Stages:**\n1. **Prophase:** Chromatin condenses into chromosomes. Nuclear membrane begins to disintegrate. Spindle apparatus starts forming.\n2. **Metaphase:** Chromosomes align at the equatorial plate. Spindle fibers attach to centromeres.\n3. **Anaphase:** Centromeres split, sister chromatids pulled to opposite poles.\n4. **Telophase:** Chromosomes reach poles, uncoil, nuclear membranes reform, nucleoli reappear.\n\n**Cytokinesis:** In plant cells, a cell plate forms at the center. In animal cells, a cleavage furrow pinches the cell.\n\n**Why Onion Root Tip?** The meristematic zone has actively dividing cells, ideal for observing all stages.\n\n**Significance:** Maintains chromosome number, ensures genetic uniformity, responsible for growth and tissue repair.",
            procedure: [
              "Place an onion bulb in a beaker of water so that only its base touches the water. Let roots grow for 3-4 days.",
              "Cut 2-3 cm of the newly grown white root tips and transfer them to a watch glass containing Carnoy\'s fluid (fixative) for 24 hours.",
              "Transfer the root tips to a watch glass containing 1N HCl and warm gently over a spirit lamp for 2-3 minutes to soften the tissue.",
              "Wash the tips thoroughly with water to remove the acid.",
              "Place a root tip on a clean glass slide and add a drop of Acetocarmine stain. Wait for 2-3 minutes.",
              "Gently squash the root tip using a needle or the back of a pencil, then cover with a coverslip.",
              "Tap the coverslip gently to spread the cells evenly in a single layer.",
              "Observe the slide under the low power and then the high power of a compound microscope to identify different stages of mitosis."
            ],
            objectives: ["Identify stages of division."],
            observationTable: { columns: ["Field No.", "Prophase", "Metaphase", "Anaphase", "Telophase", "Total Cells"] },
            assignments: [
                { id: 1, question: "Draw neat labeled diagrams of all stages of Mitosis.", marks: 5 },
                { id: 2, question: "Why is the onion root tip used for studying mitosis? Why not the leaf?", marks: 3 },
                { id: 3, question: "Differentiate between Cytokinesis in plant and animal cells.", marks: 4 },
                { id: 4, question: "What is the significance of Mitosis in multicellular organisms?", marks: 4 },
                { id: 5, question: "Explain the events occurring during Prophase and Metaphase.", marks: 4 }
            ],
            quizQuestions: [
                  {
                    "id": 1,
                    "question": "Mitosis results in:",
                    "options": [
                      "4 haploid cells",
                      "2 diploid cells identical to parent",
                      "1 cell with double DNA",
                      "4 diploid cells"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 2,
                    "question": "The correct sequence of mitosis phases is:",
                    "options": [
                      "Prophase, Metaphase, Anaphase, Telophase",
                      "Metaphase, Prophase, Telophase, Anaphase",
                      "Anaphase, Prophase, Metaphase, Telophase",
                      "Telophase, Anaphase, Metaphase, Prophase"
                    ],
                    "correctIndex": 0
                  },
                  {
                    "id": 3,
                    "question": "During metaphase, chromosomes align at the:",
                    "options": [
                      "Cell poles",
                      "Cell membrane",
                      "Metaphase plate (equator)",
                      "Nuclear envelope"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 4,
                    "question": "The stain used to observe chromosomes in onion root tip is:",
                    "options": [
                      "Methylene blue",
                      "Acetocarmine or Aceto-orcein",
                      "Iodine",
                      "Safranin"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 5,
                    "question": "Cytokinesis in plant cells occurs by:",
                    "options": [
                      "Cleavage furrow",
                      "Cell plate formation",
                      "Budding",
                      "Binary fission"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 6,
                    "question": "The part of the onion used for studying mitosis is:",
                    "options": [
                      "Leaf",
                      "Root tip",
                      "Stem",
                      "Flower"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 7,
                    "question": "Spindle fibers are made of:",
                    "options": [
                      "Cellulose",
                      "Actin",
                      "Tubulin (microtubules)",
                      "Keratin"
                    ],
                    "correctIndex": 2
                  },
                  {
                    "id": 8,
                    "question": "Chromosomes are visible because they:",
                    "options": [
                      "Glow naturally",
                      "Condense and become compact during prophase",
                      "Are stained after telophase",
                      "Float in cytoplasm"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 9,
                    "question": "HCl is used during the squash preparation to:",
                    "options": [
                      "Stain chromosomes",
                      "Soften tissue and separate cells (maceration)",
                      "Kill bacteria",
                      "Add color"
                    ],
                    "correctIndex": 1
                  },
                  {
                    "id": 10,
                    "question": "In which phase do sister chromatids separate?",
                    "options": [
                      "Prophase",
                      "Metaphase",
                      "Anaphase",
                      "Telophase"
                    ],
                    "correctIndex": 2
                  }
                ],
            vivaQuestions: [
                  {
                    "question": "Why are root tips ideal for studying mitosis?",
                    "answer": "Root tips contain the meristematic zone where cells are actively dividing, providing many cells in various stages of mitosis."
                  },
                  {
                    "question": "What is the significance of mitosis?",
                    "answer": "Mitosis ensures growth, repair, and regeneration of tissues while maintaining the chromosome number constant across generations of cells."
                  },
                  {
                    "question": "Why is acetocarmine used as a stain?",
                    "answer": "It has high affinity for DNA/chromatin and stains chromosomes dark red, making them clearly visible under the microscope."
                  },
                  {
                    "question": "What role does HCl play in root tip squash?",
                    "answer": "Dilute HCl softens the middle lamella between cells (maceration), allowing individual cells to spread out for clear observation."
                  },
                  {
                    "question": "Distinguish between mitosis and meiosis.",
                    "answer": "Mitosis produces 2 identical diploid cells for growth/repair. Meiosis produces 4 genetically different haploid cells for sexual reproduction."
                  },
                  {
                    "question": "What is the mitotic index?",
                    "answer": "The ratio of cells undergoing mitosis to the total number of cells observed, indicating the rate of cell division."
                  },
                  {
                    "question": "What happens during prophase?",
                    "answer": "Chromatin condenses into visible chromosomes, the nuclear membrane begins to break down, and the spindle apparatus starts forming."
                  },
                  {
                    "question": "Why is the slide gently tapped or squashed?",
                    "answer": "To spread the cells into a single layer so individual cells and their chromosomes can be observed without overlap."
                  },
                  {
                    "question": "What is a cell cycle?",
                    "answer": "The complete sequence of events from one cell division to the next, including Interphase (G1, S, G2) and M-phase (mitosis + cytokinesis)."
                  },
                  {
                    "question": "Can mitosis occur in mature nerve cells?",
                    "answer": "No, mature neurons are typically in a permanent G0 phase and do not undergo mitosis, which is why nerve damage is often irreversible."
                  }
                ],
            realWorldApplications: [
                  "Cancer Research: Uncontrolled mitosis is the hallmark of cancer; studying mitotic regulation helps develop chemotherapy drugs that target dividing cells.",
                  "Agriculture: Understanding mitosis in root meristems helps develop faster-growing crop varieties through selective breeding.",
                  "Wound Healing Medicine: Mitosis drives tissue repair; understanding its regulation aids in developing treatments for chronic wounds and burns.",
                  "Stem Cell Therapy: Controlled mitotic division of stem cells enables regenerative medicine for organ and tissue replacement.",
                  "Forensic Biology: Mitotic index analysis helps forensic pathologists estimate time of death based on cell division rates in tissues.",
                  "Plant Tissue Culture: Exploiting mitotic capacity of plant cells enables mass propagation of disease-free plants for commercial agriculture."
                ]
        }
      },
      {
          id: 'b2',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'],
          title: 'Stomata Distribution',
          description: 'Compare stomata on leaf surfaces.',
          difficulty: 'Easy',
          duration: '30 min',
          category: 'Plant Physiology',
          content: {
              videoId: "IlmgFYmbAUg",
              aim: "To study the distribution of stomata on the upper and lower surfaces of a leaf.",
              requirements: ["Leaf", "Forceps", "Safranin", "Glycerin", "Microscope"],
              theory: "Stomata are tiny pores on the epidermis of leaves bordered by specialized guard cells that regulate their opening and closing.\n\n**Structure:** Each stoma consists of two kidney-shaped (dicots) or dumbbell-shaped (monocots) guard cells surrounding a pore. Guard cells have unevenly thickened inner walls.\n\n**Function:** Gas exchange (CO₂ in, O₂ out) and transpiration (water vapor exit).\n\n**Mechanism:** When guard cells absorb water (become turgid), the stoma opens. When they lose water (become flaccid), it closes. Regulated by K⁺ ion concentration and light.\n\n**Distribution:**\n- Dorsiventral leaves (dicots): More stomata on lower surface.\n- Isobilateral leaves (monocots): Equal on both surfaces.\n- Floating leaves: Stomata only on upper surface.",
              procedure: [
              "Take a fresh leaf of a dicot plant (e.g., Tradescantia or Petunia).",
              "Fold the leaf and gently tear it to peel off a thin, transparent layer of the lower epidermis.",
              "Place the epidermal peel in a watch glass containing water.",
              "Transfer the peel onto a clean glass slide using a brush.",
              "Add a drop of Safranin stain to the peel and let it sit for a minute.",
              "Wash off the excess stain with a drop of water and add a drop of glycerine.",
              "Carefully cover it with a coverslip, avoiding air bubbles.",
              "Observe under a microscope, count the number of stomata in the field of view, and repeat the process for the upper epidermis to compare distribution."
            ],
              objectives: ["Calculate stomatal index."],
              observationTable: { columns: ["Surface", "No. of Stomata (Field 1)", "No. of Stomata (Field 2)", "Average"] },
              assignments: [
                  { id: 1, question: "Calculate the Stomatal Index if the number of stomata is 25 and number of epidermal cells is 100 in the field of view.", marks: 3 },
                  { id: 2, question: "Draw a labeled diagram of an open and closed stoma.", marks: 5 },
                  { id: 3, question: "Explain the mechanism of opening and closing of stomata (K+ ion theory).", marks: 5 },
                  { id: 4, question: "Differentiate between the leaves of Monocots and Dicots with respect to stomatal distribution.", marks: 4 },
                  { id: 5, question: "What factors affect the rate of transpiration?", marks: 3 }
              ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Stomata are primarily found on the:",
                      "options": [
                        "Upper epidermis of dorsiventral leaves",
                        "Lower epidermis of dorsiventral leaves",
                        "Mesophyll layer",
                        "Vascular bundles"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Each stoma is bordered by two:",
                      "options": [
                        "Epidermal cells",
                        "Guard cells",
                        "Mesophyll cells",
                        "Companion cells"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "The primary function of stomata is:",
                      "options": [
                        "Photosynthesis only",
                        "Gas exchange and transpiration",
                        "Water absorption",
                        "Mineral transport"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "Guard cells are unique among epidermal cells because they contain:",
                      "options": [
                        "No nucleus",
                        "Chloroplasts",
                        "Vacuoles only",
                        "No cell wall"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Stomata open when guard cells become:",
                      "options": [
                        "Flaccid",
                        "Turgid",
                        "Dehydrated",
                        "Dead"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The temporary mount for observing stomata is prepared using:",
                      "options": [
                        "Iodine solution",
                        "Safranin",
                        "Nail polish peel method",
                        "Methylene blue"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 7,
                      "question": "In monocot leaves, stomata distribution is typically:",
                      "options": [
                        "Only on upper surface",
                        "Only on lower surface",
                        "Equal on both surfaces (amphistomatic)",
                        "Absent entirely"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "The stomatal index is calculated as:",
                      "options": [
                        "(Stomata / Total cells) × 100",
                        "(Stomata / (Stomata + Epidermal cells)) × 100",
                        "Stomata × Epidermal cells",
                        "Epidermal cells / Stomata"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Which ion's movement into guard cells causes stomatal opening?",
                      "options": [
                        "Ca²⁺",
                        "Na⁺",
                        "K⁺ (Potassium)",
                        "Cl⁻"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "Xerophytic plants typically have:",
                      "options": [
                        "No stomata",
                        "Sunken stomata to reduce water loss",
                        "Very large stomata",
                        "Stomata only on upper surface"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What are stomata?",
                      "answer": "Microscopic pores on the epidermis of leaves and stems, each bordered by two guard cells, that regulate gas exchange and transpiration."
                    },
                    {
                      "question": "Why are there more stomata on the lower epidermis?",
                      "answer": "The lower surface receives less direct sunlight, reducing water loss through transpiration while still allowing gas exchange."
                    },
                    {
                      "question": "How does the nail polish peel method work?",
                      "answer": "A thin layer of clear nail polish is applied to the leaf surface, allowed to dry, peeled off, and observed under a microscope—it captures an impression of stomata."
                    },
                    {
                      "question": "What factors affect stomatal opening?",
                      "answer": "Light intensity, CO₂ concentration, temperature, humidity, and the plant hormone abscisic acid (ABA)."
                    },
                    {
                      "question": "What is transpiration?",
                      "answer": "The loss of water vapor from the aerial parts of the plant, primarily through stomata, creating a transpiration pull that aids water transport."
                    },
                    {
                      "question": "How do guard cells control stomatal opening?",
                      "answer": "K⁺ ions are pumped into guard cells, water follows by osmosis, making them turgid and bowing apart to open the pore."
                    },
                    {
                      "question": "What is a subsidiary cell?",
                      "answer": "Specialized epidermal cells surrounding guard cells that provide structural support and may contribute ions for stomatal movement."
                    },
                    {
                      "question": "Why do CAM plants open stomata at night?",
                      "answer": "To minimize water loss in hot, dry environments by fixing CO₂ at night when temperatures are cooler and humidity is higher."
                    },
                    {
                      "question": "Name the different types of stomatal arrangements.",
                      "answer": "Anomocytic (no subsidiary cells), paracytic (parallel subsidiary cells), diacytic (perpendicular), and anisocytic (three unequal subsidiary cells)."
                    },
                    {
                      "question": "How does ABA cause stomatal closure?",
                      "answer": "Abscisic acid triggers the efflux of K⁺ ions from guard cells, causing water to leave by osmosis, making them flaccid and closing the pore."
                    }
                  ],
              realWorldApplications: [
                    "Crop Water Management: Understanding stomatal behavior helps farmers optimize irrigation schedules for water-efficient agriculture.",
                    "Climate Change Research: Scientists study stomatal density in fossil leaves to reconstruct ancient atmospheric CO₂ levels.",
                    "Anti-transpirant Development: Chemical sprays that partially close stomata help protect crops during drought conditions.",
                    "Urban Air Quality: Plants are strategically placed in cities based on their stomatal gas exchange capacity to absorb pollutants.",
                    "Greenhouse Technology: Humidity and CO₂ levels are controlled to manipulate stomatal behavior for maximum crop growth.",
                    "Paleobotany: Fossil stomatal indices help scientists understand how plants adapted to different atmospheric conditions over millions of years."
                  ]
        }
      },
      {
          id: 'b3',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'],
          title: 'Osmosis (Potato)',
          description: 'Demonstrate osmosis using potato osmometer.',
          difficulty: 'Easy',
          duration: '45 min',
          category: 'Cell Physiology',
          content: {
              videoId: "eZsUv-9qYEQ",
              aim: "To demonstrate osmosis using a potato osmometer.",
              requirements: ["Large Potato", "Sugar solution", "Pin", "Beaker", "Water"],
              theory: "Osmosis is the spontaneous movement of solvent molecules from a region of lower solute concentration to higher solute concentration through a semipermeable membrane.\n\n**Types of Solutions:**\n1. **Hypertonic:** Water moves out of cell → plasmolysis/crenation.\n2. **Hypotonic:** Water moves into cell → turgidity/lysis.\n3. **Isotonic:** No net water movement.\n\n**Osmotic Pressure:** π = iCRT (Van't Hoff equation).\n\n**Potato Osmometer:** A potato cavity filled with sugar solution, placed in water — water enters by osmosis, level rises.\n\n**Significance:** Water absorption by roots, cell-to-cell water movement, turgidity maintenance, stomatal regulation.",
              procedure: [
              "Take a large, fresh potato tuber and peel off its outer skin.",
              "Cut one end flat so it can stand upright, and scoop out a deep cavity from the other end to make a potato osmoscope.",
              "Fill the cavity half-full with a 20% concentrated sugar solution.",
              "Mark the initial level of the sugar solution inside the cavity by inserting a common pin.",
              "Place the potato osmoscope in a beaker containing pure water, ensuring the water level outside is lower than the pin mark inside.",
              "Leave the setup undisturbed for 2 hours.",
              "Observe the level of the sugar solution inside the cavity after the designated time.",
              "The rise in the liquid level inside the potato cavity indicates endosmosis."
            ],
              objectives: ["Understand hypotonic/hypertonic solutions."],
              observationTable: { columns: ["Time (min)", "Initial Level", "Final Level", "Change"] },
              assignments: [
                  { id: 1, question: "Define Osmosis. How is it different from Diffusion?", marks: 4 },
                  { id: 2, question: "What happens to the potato cells in this experiment? Explain using the concept of Hypertonic/Hypotonic solutions.", marks: 5 },
                  { id: 3, question: "What is Plasmolysis? Draw a diagram of a plasmolysed plant cell.", marks: 4 },
                  { id: 4, question: "Why is the initial level marked in the potato osmometer? What would happen if the potato was boiled?", marks: 3 },
                  { id: 5, question: "Explain the importance of osmosis in absorption of water by roots.", marks: 4 }
              ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Osmosis is the movement of:",
                      "options": [
                        "Solute from low to high concentration",
                        "Solvent from high to low water potential through a semipermeable membrane",
                        "Both solute and solvent equally",
                        "Gases across membranes"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "A cell placed in a hypertonic solution will:",
                      "options": [
                        "Swell and burst",
                        "Shrink (plasmolyze)",
                        "Remain unchanged",
                        "Divide"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "In the potato osmosis experiment, potato pieces in concentrated sugar solution:",
                      "options": [
                        "Gain mass",
                        "Lose mass",
                        "Stay the same",
                        "Dissolve completely"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "The semipermeable membrane in plant cells is the:",
                      "options": [
                        "Cell wall",
                        "Tonoplast and cell membrane",
                        "Nuclear membrane",
                        "Chloroplast membrane"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Osmotic pressure is defined as:",
                      "options": [
                        "Pressure needed to prevent osmosis",
                        "Pressure needed to burst the cell",
                        "Pressure exerted by cell wall",
                        "Atmospheric pressure on cells"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 6,
                      "question": "A solution with equal solute concentration to the cell is called:",
                      "options": [
                        "Hypertonic",
                        "Hypotonic",
                        "Isotonic",
                        "Supersaturated"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 7,
                      "question": "Turgor pressure in plant cells is caused by:",
                      "options": [
                        "Loss of water",
                        "Water entering by osmosis pressing against the rigid cell wall",
                        "Cell division",
                        "Photosynthesis"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "If a potato piece gains mass in a solution, the solution was:",
                      "options": [
                        "Hypertonic",
                        "Isotonic",
                        "Hypotonic",
                        "Saturated"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 9,
                      "question": "Plasmolysis occurs when a plant cell is placed in a:",
                      "options": [
                        "Hypertonic solution",
                        "Hypotonic solution",
                        "Distilled water",
                        "Isotonic solution"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 10,
                      "question": "The process of water absorption by plant roots primarily involves:",
                      "options": [
                        "Active transport only",
                        "Osmosis",
                        "Diffusion of gases",
                        "Phagocytosis"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "Define osmosis.",
                      "answer": "The net movement of water molecules from a region of higher water potential to a region of lower water potential through a selectively permeable membrane."
                    },
                    {
                      "question": "How does osmosis differ from diffusion?",
                      "answer": "Osmosis specifically refers to solvent movement through a semipermeable membrane, while diffusion is the movement of any substance from high to low concentration without a membrane."
                    },
                    {
                      "question": "What is water potential?",
                      "answer": "A measure of the free energy of water in a system; pure water has the highest water potential (0 MPa at standard conditions)."
                    },
                    {
                      "question": "Why do potato chips in concentrated salt water become flaccid?",
                      "answer": "Water moves out of potato cells by osmosis into the hypertonic salt solution, causing the cells to lose turgor and become flaccid."
                    },
                    {
                      "question": "What is the significance of turgor pressure?",
                      "answer": "Turgor pressure provides structural support to non-woody plants, keeps leaves erect, and drives cell expansion during growth."
                    },
                    {
                      "question": "Explain endosmosis and exosmosis.",
                      "answer": "Endosmosis: water enters the cell (in hypotonic solutions). Exosmosis: water leaves the cell (in hypertonic solutions)."
                    },
                    {
                      "question": "Why don't animal cells plasmolyze?",
                      "answer": "Animal cells lack a rigid cell wall, so in hypertonic solutions they shrink (crenate) rather than pull away from a wall."
                    },
                    {
                      "question": "What is a thistle funnel experiment?",
                      "answer": "A classic demonstration where sugar solution in a thistle funnel rises in its tube when the funnel's mouth is covered with a semipermeable membrane and placed in water."
                    },
                    {
                      "question": "How does temperature affect osmosis?",
                      "answer": "Higher temperature increases kinetic energy of water molecules, accelerating the rate of osmosis."
                    },
                    {
                      "question": "What is the role of osmosis in kidney function?",
                      "answer": "Kidneys use osmosis in nephrons to reabsorb water from filtrate back into blood, concentrating urine."
                    }
                  ],
              realWorldApplications: [
                    "Medical IV Drips: Saline solutions must be isotonic (0.9% NaCl) to prevent red blood cells from bursting or shrinking when administered intravenously.",
                    "Food Preservation: Salting meat and making jam use hypertonic solutions to draw water from microorganisms by osmosis, preventing spoilage.",
                    "Kidney Dialysis: Artificial dialysis machines use osmotic principles to remove waste products from blood when kidneys fail.",
                    "Reverse Osmosis Water Purification: Applying pressure greater than osmotic pressure forces contaminated water through membranes, producing pure drinking water.",
                    "Agriculture: Farmers must manage soil salinity because excess salt creates hypertonic soil conditions that kill crops through osmotic water loss.",
                    "Contact Lens Design: Lens solutions are carefully formulated to be isotonic with tear fluid to prevent eye irritation from osmotic imbalance."
                  ]
        }
      },
      {
          id: 'b4',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'],
          title: 'Test for Sugar in Urine',
          description: 'Detect glucose using Benedict\'s Reagent.',
          difficulty: 'Medium',
          duration: '30 min',
          category: 'Physiology',
          content: {
              videoId: "M_wZ9XQ7v_I",
              aim: "To detect the presence of sugar (glucose) in a given urine sample.",
              requirements: ["Urine sample", "Benedict's Reagent", "Test tube", "Bunsen Burner"],
              theory: "Diabetes mellitus is a metabolic disorder with chronic hyperglycemia due to defective insulin secretion or action.\n\n**Normal:** Insulin from β-cells of pancreas facilitates glucose uptake. Kidneys reabsorb glucose below the renal threshold (≈180 mg/dL).\n\n**In Diabetes:** Blood glucose exceeds renal threshold → glycosuria (glucose in urine).\n\n**Benedict's Test:** CuSO₄ in the reagent is reduced by glucose:\n- Blue (negative) → Green (trace, 0.1-0.5%) → Yellow/orange (moderate, 0.5-1.5%) → Brick-red (high, >2%).\n\n**Principle:** Glucose (a reducing sugar) reduces Cu²⁺ (blue) to Cu₂O (colored precipitate). Color and quantity indicate glucose concentration.\n\n**Modern diagnosis:** Fasting blood glucose (normal: 70-110 mg/dL) or HbA1c tests.",
              procedure: [
              "Take 2 mL of Benedict\'s reagent in a clean test tube.",
              "Heat the reagent gently over a spirit lamp to ensure it does not change color (remains blue).",
              "Add 8-10 drops of the given urine sample to the warm Benedict\'s reagent.",
              "Boil the mixture carefully for 2 minutes.",
              "Allow the test tube to cool gradually.",
              "Observe the color change: Blue indicates absence of sugar, green/yellow indicates traces/moderate sugar, and brick-red precipitate indicates high sugar content (glycosuria)."
            ],
              objectives: ["Clinical diagnosis basics."],
              observationTable: { columns: ["Sample", "Test Performed", "Observation", "Inference"] },
              assignments: [
                  { id: 1, question: "What is the principle behind Benedict's Test? Which functional group is responsible for the reaction?", marks: 4 },
                  { id: 2, question: "List the colors observed in Benedict's test corresponding to different sugar concentrations.", marks: 4 },
                  { id: 3, question: "What is Glucosuria? Name the condition associated with high levels of glucose in urine.", marks: 3 },
                  { id: 4, question: "Differentiate between Diabetes Mellitus and Diabetes Insipidus.", marks: 4 },
                  { id: 5, question: "Why is sucrose called a non-reducing sugar? Does it give a positive Benedict's test?", marks: 3 }
              ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Benedict's solution is used to test for:",
                      "options": [
                        "Proteins",
                        "Reducing sugars",
                        "Lipids",
                        "Starch"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "A positive Benedict's test shows color change from blue to:",
                      "options": [
                        "Green/Yellow/Orange-Red",
                        "Purple",
                        "Black",
                        "Clear"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "Glucose in urine may indicate:",
                      "options": [
                        "Dehydration",
                        "Diabetes mellitus",
                        "Kidney stones",
                        "Anemia"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "Normal urine does NOT contain:",
                      "options": [
                        "Water",
                        "Urea",
                        "Glucose",
                        "Sodium chloride"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "The kidneys regulate blood sugar by:",
                      "options": [
                        "Producing insulin",
                        "Reabsorbing glucose in nephrons (up to a threshold)",
                        "Destroying glucose",
                        "Storing glucose"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The renal threshold for glucose is approximately:",
                      "options": [
                        "80 mg/dL",
                        "180 mg/dL",
                        "300 mg/dL",
                        "50 mg/dL"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Which reducing sugar is primarily found in diabetic urine?",
                      "options": [
                        "Sucrose",
                        "Glucose",
                        "Fructose",
                        "Lactose"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "The copper in Benedict's reagent is reduced from:",
                      "options": [
                        "Cu⁺ to Cu²⁺",
                        "Cu²⁺ to Cu⁺ (forming Cu₂O precipitate)",
                        "Cu to Cu²⁺",
                        "Cu²⁺ to Cu⁰"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Non-reducing sugars like sucrose must first be:",
                      "options": [
                        "Heated to 500°C",
                        "Hydrolyzed by acid to yield reducing sugars before testing",
                        "Dissolved in oil",
                        "Mixed with proteins"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "A green/yellow result in Benedict's test indicates:",
                      "options": [
                        "High sugar",
                        "Low/trace sugar",
                        "No sugar",
                        "Protein presence"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a reducing sugar?",
                      "answer": "A sugar with a free aldehyde or ketone group that can reduce oxidizing agents like Cu²⁺ in Benedict's reagent."
                    },
                    {
                      "question": "Why does glucose appear in urine during diabetes?",
                      "answer": "Blood glucose exceeds the renal threshold (~180 mg/dL), overwhelming the kidney's reabsorption capacity."
                    },
                    {
                      "question": "What is the chemical basis of Benedict's test?",
                      "answer": "Reducing sugars reduce Cu²⁺ (blue) to Cu₂O (copper(I) oxide, brick-red/orange precipitate) in alkaline conditions."
                    },
                    {
                      "question": "Name the components of Benedict's reagent.",
                      "answer": "Copper sulfate, sodium citrate, and sodium carbonate dissolved in water."
                    },
                    {
                      "question": "Why is heating required in Benedict's test?",
                      "answer": "Heat provides activation energy for the reduction reaction between the sugar and copper ions."
                    },
                    {
                      "question": "What is glycosuria?",
                      "answer": "The presence of glucose in urine, typically indicating diabetes mellitus or renal tubular dysfunction."
                    },
                    {
                      "question": "Can Benedict's test distinguish between different sugars?",
                      "answer": "No, it only confirms the presence of any reducing sugar; specific identification requires other tests like chromatography."
                    },
                    {
                      "question": "What is the normal pH of urine?",
                      "answer": "Around 4.5 to 8.0, with an average of about 6.0 (slightly acidic)."
                    },
                    {
                      "question": "Why is early morning urine preferred for testing?",
                      "answer": "It is more concentrated, increasing the likelihood of detecting abnormal substances present in small amounts."
                    },
                    {
                      "question": "What other conditions besides diabetes can cause glycosuria?",
                      "answer": "Pregnancy, stress, renal tubular defects, Cushing's syndrome, and certain medications."
                    }
                  ],
              realWorldApplications: [
                    "Clinical Diabetes Screening: Urine glucose testing strips are widely used as an initial, non-invasive screen for diabetes in clinics.",
                    "Gestational Diabetes Monitoring: Pregnant women routinely have urine tested for glucose to detect gestational diabetes early.",
                    "Sports Medicine: Athletes monitor urine composition to assess hydration status and metabolic health during training.",
                    "Veterinary Diagnostics: Urine sugar tests are used to diagnose diabetes in pets and livestock animals.",
                    "Public Health Surveys: Mass urine screening programs in developing countries identify undiagnosed diabetes in populations.",
                    "Pharmaceutical Drug Trials: Urine glucose monitoring helps assess the efficacy of new anti-diabetic medications."
                  ]
        }
      },
      {
          id: 'b5',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'],
          title: 'Paper Chromatography',
          description: 'Separate plant pigments.',
          difficulty: 'Hard',
          duration: '60 min',
          category: 'Biochemistry',
          content: {
              videoId: "SnbXpZ_k6c0",
              aim: "To separate plant pigments using paper chromatography.",
              requirements: ["Spinach leaves", "Acetone", "Chromatography paper", "Jar"],
              theory: "Paper chromatography separates mixture components based on their differential migration over filter paper.\n\n**Principle:** Stationary phase = water trapped in cellulose fibers. Mobile phase = solvent moving by capillary action. Components separate based on their partition coefficients.\n\n**Rf Value:** Rf = Distance traveled by solute / Distance traveled by solvent front. Characteristic for each substance under specific conditions.\n\n**Plant Pigment Separation:** Chlorophyll a (blue-green, ≈0.45), Chlorophyll b (yellow-green, ≈0.35), Xanthophyll (yellow, ≈0.28), Carotenoids (orange-yellow, ≈0.95).\n\n**Solvent System:** Petroleum ether and acetone (9:1).\n\n**Types:** Ascending, Descending, and Circular chromatography.",
              procedure: [
              "Take a rectangular strip of Whatman filter paper (about 20 cm x 5 cm).",
              "Draw a horizontal pencil line about 2 cm from one end of the strip.",
              "Crush spinach or grass leaves in a mortar with a little acetone to extract the plant pigments.",
              "Using a capillary tube, place a small drop of the pigment extract at the center of the pencil line. Let it dry and repeat to concentrate the spot.",
              "Suspend the paper strip in a chromatography jar containing the solvent mixture (e.g., petroleum ether and acetone in 9:1 ratio).",
              "Ensure the origin line is just above the solvent level. Cover the jar tightly.",
              "Allow the solvent to rise up the paper via capillary action until it reaches near the top.",
              "Remove the paper, mark the solvent front, and observe the separated pigment bands (Carotene, Xanthophyll, Chlorophyll a, Chlorophyll b)."
            ],
              objectives: ["Calculate Rf value."],
              observationTable: { columns: ["Pigment Color", "Dist Solute", "Dist Solvent", "Rf Value"] },
              assignments: [
                  { id: 1, question: "Define Rf value. Why is it always less than 1?", marks: 3 },
                  { id: 2, question: "Explain the principle of Paper Chromatography (Partition Chromatography).", marks: 5 },
                  { id: 3, question: "List the pigments usually separated from spinach leaves along with their colors.", marks: 4 },
                  { id: 4, question: "Why should the spotting line be drawn with a pencil and not a pen?", marks: 3 },
                  { id: 5, question: "Give three applications of chromatography in real life.", marks: 3 }
              ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Paper chromatography separates substances based on:",
                      "options": [
                        "Size only",
                        "Charge only",
                        "Differential adsorption and partition between stationary and mobile phases",
                        "Color only"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 2,
                      "question": "The stationary phase in paper chromatography is:",
                      "options": [
                        "The solvent",
                        "Water trapped in filter paper fibers",
                        "The glass plate",
                        "Air"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "Rf value is defined as:",
                      "options": [
                        "Distance moved by solute / Distance moved by solvent front",
                        "Distance of solvent / Distance of spot",
                        "Mass of solute / Volume of solvent",
                        "Color intensity / Time"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 4,
                      "question": "An Rf value is always between:",
                      "options": [
                        "0 and 100",
                        "0 and 1",
                        "-1 and 1",
                        "1 and 10"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "The solvent used in plant pigment chromatography is typically:",
                      "options": [
                        "Pure water",
                        "A mixture of petroleum ether and acetone",
                        "Hydrochloric acid",
                        "Mercury"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The green pigment in leaves is:",
                      "options": [
                        "Carotene",
                        "Xanthophyll",
                        "Chlorophyll",
                        "Anthocyanin"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 7,
                      "question": "In ascending chromatography, the solvent moves:",
                      "options": [
                        "Downward",
                        "Upward by capillary action",
                        "Horizontally",
                        "In a spiral"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "The origin line on chromatography paper is drawn with:",
                      "options": [
                        "Ink pen",
                        "Pencil (graphite doesn't dissolve)",
                        "Marker",
                        "Crayon"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The pigment that travels farthest (highest Rf) in plant extract is:",
                      "options": [
                        "Chlorophyll b",
                        "Chlorophyll a",
                        "Xanthophyll",
                        "Carotene"
                      ],
                      "correctIndex": 3
                    },
                    {
                      "id": 10,
                      "question": "Paper chromatography was first developed by:",
                      "options": [
                        "Watson and Crick",
                        "Martin and Synge",
                        "Mendel",
                        "Darwin"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is the principle of chromatography?",
                      "answer": "Separation of components based on their differential partitioning between a mobile phase and a stationary phase."
                    },
                    {
                      "question": "Why should the origin line not be submerged in solvent?",
                      "answer": "If the sample spots are submerged, the substances will dissolve directly into the solvent pool rather than being carried up by capillary action."
                    },
                    {
                      "question": "What determines the Rf value of a substance?",
                      "answer": "Its relative affinity for the stationary phase versus the mobile phase — more soluble substances in the mobile phase travel farther."
                    },
                    {
                      "question": "Can two different substances have the same Rf value?",
                      "answer": "Yes, in a given solvent system. This is why different solvent systems or 2D chromatography may be needed for definitive identification."
                    },
                    {
                      "question": "Name the four main plant pigments separated by chromatography.",
                      "answer": "Carotene (yellow-orange), xanthophyll (yellow), chlorophyll a (blue-green), and chlorophyll b (yellow-green)."
                    },
                    {
                      "question": "Why is carotene the fastest-moving pigment?",
                      "answer": "Carotene is the most non-polar pigment, so it has the highest affinity for the non-polar organic mobile phase and least for the polar stationary phase."
                    },
                    {
                      "question": "What is the role of the chromatography chamber/jar?",
                      "answer": "To create a closed environment saturated with solvent vapor, ensuring uniform solvent movement and preventing edge effects."
                    },
                    {
                      "question": "How is chromatography used in forensics?",
                      "answer": "To analyze ink compositions on questioned documents, identify drugs and poisons, and separate dyes from fibers."
                    },
                    {
                      "question": "What is two-dimensional chromatography?",
                      "answer": "Running the chromatogram in one direction, rotating 90°, and running it again in a different solvent to achieve better separation of complex mixtures."
                    },
                    {
                      "question": "How do you make spots visible if they are colorless?",
                      "answer": "Using UV light, iodine vapor exposure, or spraying with specific chemical reagents like ninhydrin for amino acids."
                    }
                  ],
              realWorldApplications: [
                    "Forensic Document Analysis: Identifying forged documents by comparing Rf values of different ink formulations.",
                    "Drug Testing in Sports: Separating and identifying banned substances from athlete urine samples using advanced chromatographic methods.",
                    "Food Industry Quality Control: Detecting artificial dyes, additives, and contaminants in processed food products.",
                    "Environmental Monitoring: Analyzing pesticide residues in water and soil samples to assess pollution levels.",
                    "Pharmaceutical Quality Assurance: Verifying purity and identity of drug compounds during manufacturing.",
                    "Botanical Research: Studying the pigment composition of different plant species to understand photosynthetic adaptations."
                  ]
        }
      }
,
      {
          id: 'b6',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Pollen Germination', description: 'Study pollen tube growth on stigma.', difficulty: 'Medium', duration: '30 min', category: 'Reproduction',          content: { aim: "To study pollen germination on a slide.", requirements: ["Pollen grains", "Sugar solution", "Slides", "Microscope"], theory: "Pollen grains germinate on sugar solution. Tube carries male gametes to ovule.", procedure: [
              "Prepare a nutrient solution by dissolving 10g sucrose, 10mg boric acid, 30mg calcium nitrate, 20mg magnesium sulphate, and 10mg potassium nitrate in 100 mL of distilled water.",
              "Take a clean glass slide with a central depression (cavity slide) or a normal slide.",
              "Place 2-3 drops of the prepared nutrient solution on the slide.",
              "Dust some pollen grains from a mature anther (e.g., Hibiscus or Vinca) over the drops.",
              "Keep the slide in a moist chamber (a petri dish covered with a wet filter paper) to prevent drying.",
              "Observe the slide under the low power of a microscope after 15 to 30 minutes.",
              "Look for pollen tubes emerging from the pollen grains, indicating successful germination in vitro."
            ], objectives: ["Understand plant reproduction."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Pollen germination occurs on the:",
                      "options": [
                        "Anther",
                        "Stigma",
                        "Filament",
                        "Sepal"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "The tube that grows from the pollen grain is called:",
                      "options": [
                        "Root hair",
                        "Pollen tube",
                        "Style",
                        "Ovule"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "Pollen germination in vitro requires:",
                      "options": [
                        "Soil and water",
                        "Sucrose solution and boric acid",
                        "Hydrochloric acid",
                        "Ethanol"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "The role of sucrose in the germination medium is to:",
                      "options": [
                        "Kill bacteria",
                        "Provide osmotic balance and energy",
                        "Stain the pollen",
                        "Dissolve the pollen wall"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Boric acid in the medium helps:",
                      "options": [
                        "Color the pollen",
                        "Promote pollen tube growth by aiding sugar translocation",
                        "Kill fungi",
                        "Reduce pH"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The male gametes in a pollen grain are called:",
                      "options": [
                        "Eggs",
                        "Sperm cells (generative nuclei)",
                        "Guard cells",
                        "Companion cells"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "The pollen tube enters the ovule through the:",
                      "options": [
                        "Chalaza",
                        "Micropyle",
                        "Funicle",
                        "Integument"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "The optimal concentration of sucrose for pollen germination is:",
                      "options": [
                        "1%",
                        "5-10%",
                        "50%",
                        "0.1%"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The outermost tough layer of a pollen grain is called:",
                      "options": [
                        "Intine",
                        "Exine",
                        "Tapetum",
                        "Endothecium"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "Germination percentage is calculated as:",
                      "options": [
                        "(Germinated pollen / Total pollen) × 100",
                        "Total pollen / Germinated pollen",
                        "Tube length × Width",
                        "Time taken × Pollen count"
                      ],
                      "correctIndex": 0
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is pollen germination?",
                      "answer": "The process by which a pollen grain produces a pollen tube after landing on a compatible stigma or in a suitable artificial medium."
                    },
                    {
                      "question": "Why is boric acid added to the medium?",
                      "answer": "Boron plays a crucial role in pollen tube elongation by facilitating pectin synthesis and sugar transport across cell membranes."
                    },
                    {
                      "question": "What is double fertilization?",
                      "answer": "A unique angiosperm process where one sperm fuses with the egg (forming the zygote) and the other fuses with polar nuclei (forming the triploid endosperm)."
                    },
                    {
                      "question": "Why do we use a hanging drop method?",
                      "answer": "It allows observation of pollen tube growth over time while preventing the slide from drying out."
                    },
                    {
                      "question": "What factors affect pollen germination rate?",
                      "answer": "Temperature, humidity, sucrose concentration, pH, boron availability, and pollen viability."
                    },
                    {
                      "question": "What is the function of the pollen tube?",
                      "answer": "To deliver the two male gametes from the pollen grain to the embryo sac inside the ovule for fertilization."
                    },
                    {
                      "question": "Why is the exine layer resistant?",
                      "answer": "It is composed of sporopollenin, one of the most chemically resistant biopolymers known, protecting the genetic material."
                    },
                    {
                      "question": "What is self-incompatibility?",
                      "answer": "A genetic mechanism preventing self-fertilization where the stigma rejects pollen from the same plant."
                    },
                    {
                      "question": "Which plant flowers are commonly used for this experiment?",
                      "answer": "Impatiens, Vinca (periwinkle), maize, or lily flowers because they produce abundant, viable pollen."
                    },
                    {
                      "question": "What happens if sucrose concentration is too high?",
                      "answer": "Exosmosis occurs, dehydrating the pollen grain and inhibiting or preventing tube emergence."
                    }
                  ],
              realWorldApplications: [
                    "Plant Breeding Programs: Assessing pollen viability and germination rates is essential for successful cross-pollination in crop improvement.",
                    "Fruit Production: Commercial orchards test pollen germination to ensure adequate pollination for maximum fruit set.",
                    "Allergy Research: Understanding pollen biology helps develop treatments and forecasting models for seasonal allergies.",
                    "Forensic Palynology: Pollen analysis helps forensic scientists link suspects to crime scenes based on pollen traces.",
                    "Conservation Biology: Testing pollen viability of endangered plant species is crucial for seed bank preservation efforts.",
                    "Agricultural Biotechnology: Genetic modification of pollen characteristics aims to improve crop yields and disease resistance."
                  ]
        }
      },
      {
          id: 'b7',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'DNA Isolation', description: 'Extract DNA from plant material.', difficulty: 'Medium', duration: '40 min', category: 'Genetics',          content: { aim: "To isolate DNA from plant material.", requirements: ["Spinach/Peas", "Detergent", "Salt", "Ethanol"], theory: "Detergent lyses membranes, salt precipitates proteins, ethanol precipitates DNA.", procedure: [
              "Take about 50g of plant material (e.g., ripe banana or papaya) and mash it thoroughly in a mortar and pestle.",
              "Add a mixture of 10 mL liquid dish soap (to break down lipid membranes) and 1g salt (to shield DNA phosphate groups) to the mashed paste.",
              "Stir gently to mix, then let it sit for 10-15 minutes.",
              "Filter the mixture through a muslin cloth or strainer into a clean beaker to obtain a clear filtrate.",
              "Add 1-2 drops of enzyme (e.g., meat tenderizer or pineapple juice) to degrade proteins associated with DNA.",
              "Slowly pour chilled ethanol (or isopropyl alcohol) down the side of the beaker so it forms a distinct layer on top of the filtrate.",
              "Do not shake. Wait for a few minutes and observe fine, white, thread-like structures indicating DNA precipitating at the interface.",
              "Spool the DNA out using a glass rod by twirling it gently."
            ], objectives: ["Understand DNA extraction."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "DNA is extracted from cells using:",
                      "options": [
                        "Only water",
                        "A lysis buffer containing detergent, salt, and enzymes",
                        "Acid alone",
                        "UV light"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "The detergent in DNA extraction disrupts:",
                      "options": [
                        "DNA backbone",
                        "Cell and nuclear membranes (lipid bilayers)",
                        "Sugar-phosphate bonds",
                        "Hydrogen bonds in DNA"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "DNA precipitates out of solution when cold:",
                      "options": [
                        "Water is added",
                        "Ethanol or isopropanol is layered on top",
                        "Salt is removed",
                        "HCl is added"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "The white, stringy material visible during DNA extraction is:",
                      "options": [
                        "Protein",
                        "Cellulose",
                        "Precipitated DNA fibers",
                        "Starch"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 5,
                      "question": "Salt (NaCl) is added to the lysis buffer to:",
                      "options": [
                        "Flavor the solution",
                        "Neutralize charges on DNA and remove histone proteins",
                        "Dissolve DNA",
                        "Kill bacteria"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "Meat tenderizer or protease is added to:",
                      "options": [
                        "Break down DNA",
                        "Degrade proteins bound to DNA",
                        "Add color",
                        "Increase DNA yield"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Which fruits are commonly used for DNA extraction?",
                      "options": [
                        "Citrus only",
                        "Strawberries, bananas, onions, peas",
                        "Coconuts",
                        "Peppers"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Strawberries are ideal because they are:",
                      "options": [
                        "Red in color",
                        "Octoploid (8 copies of each chromosome = lots of DNA)",
                        "Seedless",
                        "Acidic"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "DNA is insoluble in:",
                      "options": [
                        "Water",
                        "Saline solution",
                        "Cold alcohol/ethanol",
                        "Buffer solution"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "The structure of DNA was discovered by:",
                      "options": [
                        "Mendel",
                        "Watson and Crick",
                        "Darwin",
                        "Pasteur"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is the chemical composition of DNA?",
                      "answer": "DNA is a polymer of nucleotides, each consisting of a deoxyribose sugar, a phosphate group, and one of four nitrogenous bases (A, T, G, C)."
                    },
                    {
                      "question": "Why must the alcohol be ice-cold?",
                      "answer": "Cold temperature reduces the solubility of DNA in the alcohol layer, promoting faster and more complete precipitation."
                    },
                    {
                      "question": "What is the role of the lysis buffer?",
                      "answer": "It disrupts cell membranes (detergent breaks lipid bilayers), denatures proteins (salt), and releases cellular contents including DNA."
                    },
                    {
                      "question": "Why do we gently swirl rather than shake vigorously?",
                      "answer": "Vigorous shaking fragments the long, delicate DNA strands into small pieces that are difficult to collect."
                    },
                    {
                      "question": "How can you confirm the extracted material is DNA?",
                      "answer": "By the Dische diphenylamine test (blue color), UV absorbance at 260 nm, or gel electrophoresis."
                    },
                    {
                      "question": "What is the difference between DNA and RNA?",
                      "answer": "DNA is double-stranded with deoxyribose sugar and thymine; RNA is single-stranded with ribose sugar and uracil."
                    },
                    {
                      "question": "Why use a cheesecloth or filter?",
                      "answer": "To remove large cellular debris (cell wall fragments, organelle remnants) while allowing the dissolved DNA to pass through."
                    },
                    {
                      "question": "What are histones?",
                      "answer": "Proteins around which DNA is tightly wound in eukaryotic chromosomes; salt and protease help remove them during extraction."
                    },
                    {
                      "question": "Can DNA be extracted from cooked food?",
                      "answer": "Only partially — cooking denatures and fragments DNA, making extraction very difficult."
                    },
                    {
                      "question": "What is gel electrophoresis?",
                      "answer": "A technique using an electric field to separate DNA fragments by size through an agarose gel matrix."
                    }
                  ],
              realWorldApplications: [
                    "Criminal Forensics: DNA extraction from crime scene evidence (blood, hair, saliva) enables suspect identification through DNA fingerprinting.",
                    "Paternity Testing: DNA extraction and analysis conclusively establish biological relationships between individuals.",
                    "Medical Diagnostics: Extracting patient DNA enables genetic testing for hereditary diseases like cystic fibrosis and sickle cell anemia.",
                    "Agriculture (GMO Testing): DNA extraction from food products verifies whether they contain genetically modified organisms.",
                    "Ancient DNA Research: Paleogenomics extracts DNA from fossils to study extinct species like mammoths and Neanderthals.",
                    "Personalized Medicine: Patient DNA analysis guides doctors in prescribing the most effective medications based on genetic profiles."
                  ]
        }
      },
      {
          id: 'b8',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Mendelian Inheritance', description: 'Simulate inheritance ratios using beads.', difficulty: 'Easy', duration: '25 min', category: 'Genetics',          content: { aim: "To study Mendelian inheritance using bead simulation.", requirements: ["Colored Beads", "Bags", "Data Sheet"], theory: "Mendel's laws: Dominance, Segregation, Independent Assortment. F2 ratio 3:1.", procedure: [
              "Collect a sample of given seeds (e.g., pea seeds or plastic beads representing them) showing two contrast traits (e.g., Yellow/Green or Round/Wrinkled).",
              "Count the total number of seeds available in the provided sample.",
              "Separate the seeds based on the selected dominant and recessive traits.",
              "Count the exact number of seeds for each specific phenotype.",
              "Calculate the ratio of dominant to recessive phenotypes observed in the sample.",
              "Compare the observed ratio with standard Mendelian expected ratios (e.g., 3:1 for monohybrid cross, 9:3:3:1 for dihybrid cross).",
              "Note down any deviations and discuss statistical significance."
            ], objectives: ["Verify Mendel's laws."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Mendel's Law of Segregation states that:",
                      "options": [
                        "Traits blend together",
                        "Alleles separate during gamete formation",
                        "All traits are linked",
                        "Mutation is random"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "A monohybrid cross ratio in F2 generation is:",
                      "options": [
                        "1:1",
                        "3:1",
                        "9:3:3:1",
                        "1:2:1"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "A dihybrid cross ratio in F2 generation is:",
                      "options": [
                        "3:1",
                        "1:1",
                        "9:3:3:1",
                        "1:2:1"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "An organism with two identical alleles is:",
                      "options": [
                        "Heterozygous",
                        "Homozygous",
                        "Hemizygous",
                        "Polyploid"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "A test cross involves crossing with a:",
                      "options": [
                        "Heterozygous dominant",
                        "Homozygous dominant",
                        "Homozygous recessive",
                        "F1 hybrid"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "The physical appearance of an organism is its:",
                      "options": [
                        "Genotype",
                        "Phenotype",
                        "Karyotype",
                        "Genome"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Mendel chose pea plants because they:",
                      "options": [
                        "Were expensive",
                        "Had long generation time",
                        "Had clear contrasting characters and allowed controlled pollination",
                        "Were poisonous"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "The Law of Independent Assortment applies to genes on:",
                      "options": [
                        "The same chromosome",
                        "Different chromosomes",
                        "Mitochondrial DNA",
                        "Linked genes"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "In incomplete dominance, the F1 phenotype is:",
                      "options": [
                        "Same as dominant parent",
                        "Same as recessive parent",
                        "Intermediate between both parents",
                        "Lethal"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "Mendel is known as the:",
                      "options": [
                        "Father of Evolution",
                        "Father of Genetics",
                        "Father of Taxonomy",
                        "Father of Biochemistry"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What are alleles?",
                      "answer": "Alternative forms of a gene occupying the same locus on homologous chromosomes, coding for different versions of a trait."
                    },
                    {
                      "question": "Explain dominance with an example.",
                      "answer": "In pea plants, the allele for tallness (T) is dominant over dwarf (t). In Tt, only the tall phenotype is expressed."
                    },
                    {
                      "question": "What is a Punnett Square?",
                      "answer": "A grid diagram used to predict the genotypic and phenotypic ratios of offspring from a genetic cross."
                    },
                    {
                      "question": "What are the seven traits Mendel studied?",
                      "answer": "Seed shape, seed color, pod shape, pod color, flower color, flower position, and plant height."
                    },
                    {
                      "question": "What is co-dominance?",
                      "answer": "When both alleles express fully in the heterozygote, like AB blood group where both A and B antigens are present."
                    },
                    {
                      "question": "Distinguish between genotype and phenotype.",
                      "answer": "Genotype is the genetic makeup (e.g., Tt), while phenotype is the observable characteristic (e.g., tall)."
                    },
                    {
                      "question": "Why was Mendel's work not recognized initially?",
                      "answer": "His mathematical approach was ahead of its time, chromosomes were unknown, and his paper was published in a relatively obscure journal."
                    },
                    {
                      "question": "What is a back cross?",
                      "answer": "Crossing an F1 offspring with either parent. When crossed with the homozygous recessive parent, it becomes a test cross."
                    },
                    {
                      "question": "Explain pleiotropy.",
                      "answer": "When a single gene affects multiple phenotypic traits, like the sickle cell gene affecting blood cells, spleen function, and resistance to malaria."
                    },
                    {
                      "question": "What is the chromosomal basis of Mendel's laws?",
                      "answer": "Alleles are located on chromosomes; segregation occurs during meiosis I (anaphase I), and independent assortment occurs due to random orientation of bivalents."
                    }
                  ],
              realWorldApplications: [
                    "Genetic Counseling: Predicting inheritance patterns of genetic disorders like cystic fibrosis or sickle cell disease for prospective parents.",
                    "Selective Crop Breeding: Applying Mendelian principles to develop high-yield, disease-resistant crop varieties.",
                    "Animal Husbandry: Breeding livestock for desired traits like milk production, wool quality, or disease resistance.",
                    "Forensic Genetics: Understanding inheritance patterns helps in DNA profiling and paternity determination.",
                    "Pharmacogenomics: Predicting drug responses based on genetic inheritance patterns for personalized medicine.",
                    "Conservation Genetics: Managing breeding programs for endangered species to maintain genetic diversity."
                  ]
        }
      },
      {
          id: 'b9',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Pedigree Chart Analysis', description: 'Analyze inheritance patterns.', difficulty: 'Medium', duration: '25 min', category: 'Genetics',          content: { aim: "To study and analyze pedigree charts.", requirements: ["Pedigree Charts", "Colored Pens"], theory: "Pedigree charts trace inheritance. Squares=male, circles=female, filled=affected.", procedure: [
              "Carefully observe the provided pedigree chart for a specific genetic trait in a family.",
              "Note the symbols: squares represent males, circles represent females, shaded symbols show affected individuals.",
              "Determine if the trait is passed directly from parent to offspring in every generation (suggests dominant trait).",
              "Check if unaffected parents have affected offspring (suggests recessive trait).",
              "Analyze the ratio of affected males to affected females. Higher prevalence in males suggests X-linked recessive inheritance.",
              "Trace the inheritance pattern specifically from fathers to daughters and mothers to sons to confirm X-linked traits.",
              "Conclude the likely mode of inheritance (Autosomal dominant/recessive, X-linked dominant/recessive) based on the observations."
            ], objectives: ["Interpret genetic inheritance."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "A pedigree chart uses circles to represent:",
                      "options": [
                        "Males",
                        "Females",
                        "Carriers",
                        "Deceased individuals"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Squares in a pedigree chart represent:",
                      "options": [
                        "Females",
                        "Males",
                        "Unknown sex",
                        "Twins"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "A horizontal line connecting a circle and square indicates:",
                      "options": [
                        "Siblings",
                        "Mating/Marriage",
                        "Parent-child",
                        "Cousins"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "An autosomal recessive trait typically skips:",
                      "options": [
                        "No generations",
                        "One or more generations",
                        "Only males",
                        "Only females"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Color blindness is an example of:",
                      "options": [
                        "Autosomal dominant",
                        "Autosomal recessive",
                        "X-linked recessive",
                        "Y-linked"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 6,
                      "question": "A filled/shaded symbol in a pedigree indicates:",
                      "options": [
                        "Carrier",
                        "Affected individual",
                        "Dead individual",
                        "Healthy individual"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "If a trait appears in every generation, it is likely:",
                      "options": [
                        "Recessive",
                        "Dominant",
                        "Lethal",
                        "Sex-linked"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "A carrier is an individual who:",
                      "options": [
                        "Shows the disease",
                        "Is heterozygous and phenotypically normal",
                        "Is homozygous dominant",
                        "Has no alleles for the trait"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Hemophilia is more common in males because:",
                      "options": [
                        "Males are weaker",
                        "The gene is on the X chromosome and males have only one X",
                        "Males have two Y chromosomes",
                        "Females are immune"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "A consanguineous marriage (between relatives) increases risk of:",
                      "options": [
                        "Dominant diseases",
                        "Autosomal recessive disorders",
                        "X-linked diseases only",
                        "No health effects"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is a pedigree chart?",
                      "answer": "A family tree diagram showing the inheritance pattern of a specific trait or disease across multiple generations."
                    },
                    {
                      "question": "How do you identify autosomal dominant inheritance?",
                      "answer": "The trait appears in every generation, affected individuals have at least one affected parent, and it affects both sexes equally."
                    },
                    {
                      "question": "How do you identify autosomal recessive inheritance?",
                      "answer": "The trait often skips generations, unaffected parents can have affected children, and both sexes are equally affected."
                    },
                    {
                      "question": "What is a proband?",
                      "answer": "The individual through whom the family comes to medical attention, typically the first affected person identified in the pedigree."
                    },
                    {
                      "question": "Why are X-linked recessive traits more common in males?",
                      "answer": "Males have only one X chromosome (XY), so a single recessive allele on the X will be expressed. Females need two copies."
                    },
                    {
                      "question": "Give an example of autosomal dominant disorder.",
                      "answer": "Huntington's disease, Marfan syndrome, or achondroplasia (dwarfism)."
                    },
                    {
                      "question": "What does a half-shaded symbol represent?",
                      "answer": "A carrier — an individual who carries one copy of a recessive allele but does not express the disease phenotypically."
                    },
                    {
                      "question": "Can pedigree analysis predict the exact genotype?",
                      "answer": "Not always definitively, but it can determine the most probable genotypes and calculate risk probabilities."
                    },
                    {
                      "question": "What is genetic anticipation?",
                      "answer": "A phenomenon where a genetic disorder becomes more severe or appears at an earlier age in successive generations."
                    },
                    {
                      "question": "How are twins represented in a pedigree?",
                      "answer": "By lines from a single point — identical twins share a horizontal bar connecting them, fraternal twins do not."
                    }
                  ],
              realWorldApplications: [
                    "Genetic Counseling Clinics: Geneticists construct pedigrees to advise families about risks of inherited conditions like Huntington's disease.",
                    "Royal Family Studies: Historical pedigrees traced hemophilia through European royal families descended from Queen Victoria.",
                    "Rare Disease Diagnosis: Pedigree analysis helps identify inheritance patterns of ultra-rare genetic disorders.",
                    "Livestock Breeding Records: Pedigree charts track desirable genetic traits in thoroughbred horses and purebred dogs.",
                    "Prenatal Screening: Families with known genetic conditions use pedigree data to make informed reproductive decisions.",
                    "Population Genetics Research: Large-scale pedigrees help researchers study the spread of genetic variants through communities."
                  ]
        }
      },
      {
          id: 'b10',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Plant Population Density', description: 'Study density using quadrat method.', difficulty: 'Easy', duration: '30 min', category: 'Ecology',          content: { aim: "To study plant population density by quadrat method.", requirements: ["Quadrat", "Measuring Tape", "Data Sheet"], theory: "Throw frame randomly, count individuals. Density = count / area.", procedure: [
              "Select a designated study area measuring a specific dimension (e.g., a lawn or field).",
              "Prepare a quadrat (a square frame of known area, e.g., 1m x 1m) made of wood or PVC pipes.",
              "Randomly throw or place the quadrat in different locations within the study area.",
              "Identify a specific plant species to study (e.g., a weed like Parthenium or grasses).",
              "Count the number of individuals of the chosen plant species inside each quadrat placement.",
              "Record the data for at least 10 different random quadrat tosses.",
              "Calculate the total number of individuals counted across all quadrats.",
              "Calculate the Population Density = (Total number of individuals) / (Total number of quadrats studied)."
            ], objectives: ["Understand ecological sampling."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "The quadrat method is commonly used to estimate:",
                      "options": [
                        "Animal speed",
                        "Plant population density",
                        "Water pH",
                        "Soil temperature"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Population density is expressed as:",
                      "options": [
                        "Number of individuals per unit area",
                        "Total mass of organisms",
                        "Height of organisms",
                        "Color distribution"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "A quadrat is typically:",
                      "options": [
                        "A glass beaker",
                        "A square frame of known area (e.g., 1m²)",
                        "A microscope slide",
                        "A test tube"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "Random sampling is important because:",
                      "options": [
                        "It saves time",
                        "It eliminates bias in data collection",
                        "It only counts large organisms",
                        "It is cheaper"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Frequency in ecological studies refers to:",
                      "options": [
                        "Sound waves",
                        "How often a species occurs across sample units",
                        "Speed of growth",
                        "Color intensity"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The formula for density is:",
                      "options": [
                        "Total number of individuals / Total area sampled",
                        "Mass / Volume",
                        "Number × Area",
                        "Height / Width"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 7,
                      "question": "Which sampling method is best for mobile animals?",
                      "options": [
                        "Quadrat",
                        "Capture-recapture (Lincoln-Petersen method)",
                        "Line transect only",
                        "Point count only"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Species richness refers to:",
                      "options": [
                        "Total number of individuals",
                        "Number of different species in an area",
                        "Biomass of one species",
                        "Genetic diversity"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "A transect line is used to study:",
                      "options": [
                        "Changes in species distribution along an environmental gradient",
                        "Only aquatic organisms",
                        "Chemical reactions",
                        "Temperature changes"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 10,
                      "question": "The minimum number of quadrats needed for reliable data depends on:",
                      "options": [
                        "Student preference",
                        "Species-area curve reaching a plateau",
                        "Weather",
                        "Time of day"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is population density?",
                      "answer": "The number of individuals of a species per unit area or volume."
                    },
                    {
                      "question": "Why is random placement of quadrats important?",
                      "answer": "To avoid sampling bias and ensure the data is representative of the entire study area."
                    },
                    {
                      "question": "What is the difference between density and abundance?",
                      "answer": "Density is the number per unit area, while abundance is the total number of individuals in the entire population."
                    },
                    {
                      "question": "Explain the capture-recapture method.",
                      "answer": "Animals are captured, marked, and released. After mixing, a second sample is taken. The ratio of marked to unmarked animals estimates total population."
                    },
                    {
                      "question": "What are the assumptions of the capture-recapture method?",
                      "answer": "No births, deaths, immigration, or emigration between samples; marks don't affect survival; marked animals mix uniformly."
                    },
                    {
                      "question": "What is a belt transect?",
                      "answer": "A strip of habitat studied by placing contiguous quadrats along a transect line to record species composition changes."
                    },
                    {
                      "question": "How does habitat fragmentation affect population density?",
                      "answer": "It can increase local density within fragments while decreasing overall species diversity and genetic exchange."
                    },
                    {
                      "question": "What is the Simpson's Diversity Index?",
                      "answer": "A quantitative measure that accounts for both species richness and evenness in a community."
                    },
                    {
                      "question": "Why are multiple quadrats necessary?",
                      "answer": "To account for spatial variation in species distribution and obtain statistically reliable mean density values."
                    },
                    {
                      "question": "What ecological information can be derived from density studies?",
                      "answer": "Species distribution patterns, habitat preferences, competition effects, and conservation status assessment."
                    }
                  ],
              realWorldApplications: [
                    "Wildlife Conservation: Census methods are used to monitor endangered species populations and assess conservation effectiveness.",
                    "Forest Management: Forestry departments use quadrat sampling to estimate timber resources and plan sustainable harvesting.",
                    "Agricultural Pest Control: Monitoring pest population density helps farmers time pesticide applications optimally.",
                    "Urban Planning: Ecological surveys assess biodiversity before construction to comply with environmental regulations.",
                    "Marine Biology: Quadrat methods adapted for underwater use assess coral reef health and biodiversity.",
                    "Epidemiology: Population density studies help model disease transmission rates in human and animal communities."
                  ]
        }
      },
      {
          id: 'b11',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Plasmolysis', description: 'Observe plasmolysis in Rhoeo epidermal cells.', difficulty: 'Easy', duration: '20 min', category: 'Cell Biology',          content: { aim: "To study plasmolysis in epidermal peel.", requirements: ["Rhoeo leaves", "Sucrose solution", "Microscope"], theory: "In hypertonic solution, water leaves cell, membrane shrinks from wall = plasmolysis.", procedure: [
              "Take a fresh leaf of Rhoeo or Tradescantia and cleanly peel off the lower epidermis.",
              "Cut the peel into two small pieces and place them in two separate watch glasses.",
              "Add pure water to the first watch glass (control) and a 10% concentrated sugar or salt solution to the second watch glass.",
              "Leave both peels undisturbed for about 10-15 minutes.",
              "Mount the peel from the water on a glass slide, cover with a coverslip, and observe under the microscope. The cells will appear turgid.",
              "Mount the peel from the sugar/salt solution on another slide and observe.",
              "Notice that the cell membrane has shrunk and pulled away from the cell wall in the second slide.",
              "This shrinkage of the protoplast due to exosmosis is called plasmolysis."
            ], objectives: ["Understand osmotic behavior."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Plasmolysis is defined as:",
                      "options": [
                        "Cell swelling",
                        "Shrinkage of protoplast away from cell wall in hypertonic solution",
                        "Cell division",
                        "Cell death"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Plasmolysis occurs when a plant cell is placed in:",
                      "options": [
                        "Distilled water",
                        "Isotonic solution",
                        "Hypertonic solution",
                        "Vacuum"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "The space between the cell wall and shrunken protoplast fills with:",
                      "options": [
                        "Air",
                        "The external hypertonic solution",
                        "DNA",
                        "Starch"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "Incipient plasmolysis is when:",
                      "options": [
                        "Cell wall breaks",
                        "Protoplast just begins to pull away from the cell wall",
                        "Cell is fully plasmolyzed",
                        "Cell bursts"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Deplasmolysis occurs when a plasmolyzed cell is placed in:",
                      "options": [
                        "More concentrated solution",
                        "Hypotonic solution or water",
                        "Oil",
                        "Acid"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "Which cells are commonly used for plasmolysis experiments?",
                      "options": [
                        "White blood cells",
                        "Rhoeo/Tradescantia epidermal cells",
                        "Muscle cells",
                        "Nerve cells"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "The colored sap in Rhoeo cells makes observation easier because:",
                      "options": [
                        "It glows",
                        "The purple vacuolar sap visibly shrinks, showing clear plasmolysis",
                        "It changes color during plasmolysis",
                        "It fluoresces"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "NaCl or sucrose solutions used for plasmolysis are typically:",
                      "options": [
                        "0.001 M",
                        "0.5 M or higher",
                        "Pure water",
                        "Highly acidic"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Plasmolysis proves that the cell membrane is:",
                      "options": [
                        "Absent in plants",
                        "Rigid",
                        "Selectively permeable",
                        "Impermeable"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 10,
                      "question": "Animal cells in hypertonic solution undergo:",
                      "options": [
                        "Plasmolysis",
                        "Crenation (shrinking)",
                        "Lysis",
                        "No change"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "Define plasmolysis.",
                      "answer": "The process in which the protoplast of a plant cell shrinks away from the rigid cell wall when placed in a hypertonic solution due to exosmosis."
                    },
                    {
                      "question": "Why can't animal cells undergo plasmolysis?",
                      "answer": "Animal cells lack a rigid cell wall. In hypertonic solutions, they shrink (crenate) rather than having a protoplast pull away from a wall."
                    },
                    {
                      "question": "What is the significance of plasmolysis?",
                      "answer": "It demonstrates that the cell membrane is selectively permeable and that osmosis is a real physical process in living cells."
                    },
                    {
                      "question": "Is plasmolysis reversible?",
                      "answer": "Yes, if a plasmolyzed cell is promptly placed in a hypotonic solution, water re-enters by endosmosis (deplasmolysis) and the protoplast re-expands."
                    },
                    {
                      "question": "What determines the degree of plasmolysis?",
                      "answer": "The concentration difference between the external solution and the cell sap — greater hypertonic concentration causes more severe plasmolysis."
                    },
                    {
                      "question": "What is wall pressure?",
                      "answer": "The inward pressure exerted by the elastic cell wall on the cell contents, equal and opposite to turgor pressure at equilibrium."
                    },
                    {
                      "question": "Differentiate between flaccid and turgid cells.",
                      "answer": "Turgid cells are fully swollen with water (endosmosis), while flaccid cells have lost water and the protoplast is relaxed against the wall."
                    },
                    {
                      "question": "What is cytorrhysis?",
                      "answer": "Irreversible collapse of the entire cell wall inward in extreme plasmolysis conditions, not just the protoplast."
                    },
                    {
                      "question": "Why is Rhoeo/Tradescantia preferred for this experiment?",
                      "answer": "Its epidermal cells contain dark purple anthocyanin pigment in the vacuole, making the shrinking of the protoplast easily visible."
                    },
                    {
                      "question": "At what concentration does incipient plasmolysis occur?",
                      "answer": "When the external solution's osmotic pressure exactly equals the cell sap's osmotic pressure, so turgor pressure becomes zero."
                    }
                  ],
              realWorldApplications: [
                    "Food Preservation: Salting and sugaring foods exploits plasmolysis to dehydrate and kill bacteria and mold cells.",
                    "Agriculture: Understanding plasmolysis helps farmers avoid over-fertilizing, which creates hypertonic soil solutions that kill plant roots.",
                    "Pickle Making: Vegetables placed in concentrated brine undergo plasmolysis, allowing the brine to penetrate and preserve them.",
                    "Desalination Research: Understanding osmotic behavior of cell membranes aids in developing efficient water purification membranes.",
                    "Drug Delivery: Pharmaceutical scientists study membrane permeability principles derived from osmosis studies for transdermal drug patches.",
                    "Weed Control: Some herbicides work by disrupting water balance in weed cells, effectively causing lethal plasmolysis."
                  ]
        }
      },
      {
          id: 'b12',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Urine Analysis', description: 'Test for sugar and albumin in urine.', difficulty: 'Easy', duration: '20 min', category: 'Physiology',          content: { aim: "To test for sugar and albumin in urine.", requirements: ["Urine sample", "Benedicts reagent", "Nitric acid"], theory: "Sugar: Benedicts test (green/orange). Albumin: HNO3 (white ppt).", procedure: [
              "Procure normal urine sample and abnormal urine samples for testing.",
              "Test for Albumin: Fill a test tube 1/3 with urine and boil the upper portion. A white cloudiness that doesn\'t disappear on adding acetic acid indicates albumin.",
              "Test for Urea: Add 2 mL of urine to sodium hypobromite solution. Vigorous effervescence of nitrogen gas indicates urea.",
              "Test for Bile Salts: Sprinkle finely powdered sulphur on the surface of 5 mL urine in a test tube. If the sulphur sinks, bile salts are present.",
              "Test for Sugar: Perform Benedict\'s Test as described in Ex b4.",
              "Record the presence or absence of these organic compounds to analyze the metabolic health state."
            ], objectives: ["Clinical biochemistry."],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Normal urine is typically:",
                      "options": [
                        "Red",
                        "Pale yellow to amber due to urochrome",
                        "Green",
                        "Blue"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "The primary nitrogenous waste in human urine is:",
                      "options": [
                        "Uric acid",
                        "Ammonia",
                        "Urea",
                        "Creatinine"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "Protein in urine (proteinuria) may indicate:",
                      "options": [
                        "Diabetes",
                        "Kidney disease/damage",
                        "Liver disease",
                        "Anemia"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "The sulfosalicylic acid test detects:",
                      "options": [
                        "Glucose",
                        "Proteins (white precipitate)",
                        "Bile salts",
                        "Blood"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "Normal specific gravity of urine ranges from:",
                      "options": [
                        "1.000-1.005",
                        "1.003-1.030",
                        "0.5-0.8",
                        "2.0-3.0"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "Ketone bodies in urine (ketonuria) may indicate:",
                      "options": [
                        "Overhydration",
                        "Starvation or uncontrolled diabetes",
                        "Kidney stones",
                        "Normal metabolism"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "The presence of blood in urine is called:",
                      "options": [
                        "Glycosuria",
                        "Proteinuria",
                        "Hematuria",
                        "Ketonuria"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "Urine is formed in the:",
                      "options": [
                        "Bladder",
                        "Nephrons of the kidney",
                        "Liver",
                        "Pancreas"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "Which test detects bile pigments in urine?",
                      "options": [
                        "Benedict's test",
                        "Fouchet's test",
                        "Biuret test",
                        "Iodine test"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "The average daily urine output for an adult is:",
                      "options": [
                        "100 mL",
                        "500 mL",
                        "1-2 liters",
                        "5 liters"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What are the normal constituents of urine?",
                      "answer": "Water (95%), urea, creatinine, uric acid, sodium, potassium, chloride, and other ions in varying amounts."
                    },
                    {
                      "question": "What abnormal constituents may appear in pathological conditions?",
                      "answer": "Glucose (diabetes), proteins (kidney disease), blood (infection/injury), ketones (starvation/diabetes), and bile pigments (liver disease)."
                    },
                    {
                      "question": "Why is a 24-hour urine sample sometimes preferred?",
                      "answer": "It accounts for variations in concentration throughout the day, giving a more accurate measurement of total excretion."
                    },
                    {
                      "question": "What does the color of urine indicate?",
                      "answer": "Dark yellow suggests dehydration, colorless suggests overhydration. Red/brown may indicate blood or certain medications."
                    },
                    {
                      "question": "What is the role of the nephron?",
                      "answer": "The functional unit of the kidney that filters blood, reabsorbs useful substances, and secretes waste to form urine."
                    },
                    {
                      "question": "Why does diabetes cause glucose in urine?",
                      "answer": "Excess blood glucose overwhelms the kidney's reabsorption capacity (renal threshold ~180 mg/dL)."
                    },
                    {
                      "question": "What is specific gravity of urine and what does it signify?",
                      "answer": "The ratio of urine density to water density. It indicates the kidney's concentrating ability and hydration status."
                    },
                    {
                      "question": "What causes ketone bodies to appear in urine?",
                      "answer": "When the body metabolizes fat instead of glucose for energy (during fasting, starvation, or uncontrolled diabetes), producing acetoacetic acid, β-hydroxybutyric acid, and acetone."
                    },
                    {
                      "question": "Name the three processes of urine formation.",
                      "answer": "Glomerular filtration, tubular reabsorption, and tubular secretion."
                    },
                    {
                      "question": "Why is fresh urine preferred for analysis?",
                      "answer": "Standing urine becomes alkaline due to bacterial conversion of urea to ammonia, which can alter test results."
                    }
                  ],
              realWorldApplications: [
                    "Clinical Diagnostics: Urinalysis is one of the most common and affordable screening tests performed in hospitals worldwide.",
                    "Sports Anti-Doping: Urine analysis detects banned performance-enhancing drugs in competitive athletes.",
                    "Pregnancy Testing: Urine-based tests detect human chorionic gonadotropin (hCG) hormone for early pregnancy confirmation.",
                    "Workplace Drug Screening: Employers use urine tests to screen for illicit substance use among employees.",
                    "Neonatal Screening: Newborn urine tests detect metabolic disorders like phenylketonuria (PKU) and maple syrup urine disease.",
                    "Kidney Transplant Monitoring: Post-transplant patients have regular urinalysis to detect early signs of organ rejection."
                  ]
        }
      },
      {
          id: 'b13',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'T.S. of Testis and Ovary', description: 'Identify stages of gamete development.', difficulty: 'Medium', duration: '20 min', category: 'Reproduction',          content: { aim: "To study T.S. of testis and ovary through permanent slides to identify stages of gamete development.", requirements: ["Permanent slides of mammalian testis and ovary", "Compound microscope"], theory: "The testis is the male reproductive organ responsible for sperm production (spermatogenesis). The ovary is the female reproductive organ responsible for egg production (oogenesis). Cross sections reveal the sequential developmental stages from germ cells to mature gametes.", procedure: [
              "Obtain a permanent slide of the Transverse Section (T.S.) of a mammalian testis.",
              "Observe under low power first. Notice the circular/oval seminiferous tubules surrounded by interstitial connective tissue.",
              "Observe under high power to identify different stages of spermatogenesis from periphery to the lumen: spermatogonia, primary spermatocytes, secondary spermatocytes, spermatids, and spermatozoa.",
              "Identify the pyramidal-shaped Sertoli cells which provide nourishment.",
              "Identify the Leydig cells (interstitial cells) located between the tubules.",
              "Next, obtain a permanent slide of the T.S. of a mammalian ovary.",
              "Observe under low power to differentiate the outer cortex and inner medulla.",
              "In the cortex, identify different stages of ovarian follicles: primary follicle, secondary follicle, and mature Graafian follicle.",
              "Locate the oocyte within the Graafian follicle, and look for the corpus luteum (if present), the yellow glandular mass formed after ovulation."
            ], objectives: ["Understand gametogenesis in mammals.", "Identify microscopic mammalian structures."],
            observationTable: { columns: ["Slide Observed", "Key Features Seen", "Inference"] },
            assignments: [
                { id: 1, question: "Differentiate between spermatogenesis and oogenesis based on your microscopic observations.", marks: 5 },
                { id: 2, question: "What is the role of Leydig cells and Sertoli cells in the testis?", marks: 4 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Spermatogenesis occurs in the:",
                      "options": [
                        "Epididymis",
                        "Seminiferous tubules of the testis",
                        "Vas deferens",
                        "Prostate gland"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Oogenesis occurs in the:",
                      "options": [
                        "Fallopian tube",
                        "Uterus",
                        "Ovary",
                        "Cervix"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 3,
                      "question": "The cells that nourish developing sperm are called:",
                      "options": [
                        "Leydig cells",
                        "Sertoli cells",
                        "Oocytes",
                        "Follicle cells"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "Leydig cells (interstitial cells) produce:",
                      "options": [
                        "Estrogen",
                        "Testosterone",
                        "Progesterone",
                        "FSH"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "A Graafian follicle is found in the:",
                      "options": [
                        "Testis",
                        "Ovary",
                        "Uterus",
                        "Prostate"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "The corpus luteum forms after:",
                      "options": [
                        "Menstruation",
                        "Ovulation (from the ruptured follicle)",
                        "Fertilization only",
                        "Puberty"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Spermatogenesis produces:",
                      "options": [
                        "1 functional sperm from each spermatogonium",
                        "2 sperms",
                        "4 functional spermatozoa from each primary spermatocyte",
                        "8 sperms"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "Oogenesis produces:",
                      "options": [
                        "4 ova",
                        "1 ovum and 3 polar bodies",
                        "2 ova and 2 polar bodies",
                        "1 ovum only"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The T.S. of testis shows:",
                      "options": [
                        "Ovarian follicles",
                        "Seminiferous tubules with different stages of sperm development",
                        "Corpus luteum",
                        "Endometrium"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "Estrogen is primarily produced by:",
                      "options": [
                        "Leydig cells",
                        "Sertoli cells",
                        "Ovarian follicular cells",
                        "Adrenal glands only"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is spermatogenesis?",
                      "answer": "The process of formation of mature spermatozoa from spermatogonia through mitosis and meiosis in the seminiferous tubules."
                    },
                    {
                      "question": "What is oogenesis?",
                      "answer": "The process of formation of a mature ovum from oogonia through mitotic and meiotic divisions in the ovary."
                    },
                    {
                      "question": "Why does oogenesis produce only one functional ovum?",
                      "answer": "Unequal cytoplasmic division ensures one large cell retains most nutrients needed for embryo development; polar bodies degenerate."
                    },
                    {
                      "question": "What is the role of the Sertoli cells?",
                      "answer": "They provide nutrition, support, and protection to developing spermatids and form the blood-testis barrier."
                    },
                    {
                      "question": "What hormones regulate spermatogenesis?",
                      "answer": "FSH (stimulates Sertoli cells), LH/ICSH (stimulates Leydig cells to produce testosterone), and testosterone itself."
                    },
                    {
                      "question": "Describe the structure of a Graafian follicle.",
                      "answer": "A mature ovarian follicle containing the secondary oocyte surrounded by follicular fluid, granulosa cells, and theca layers."
                    },
                    {
                      "question": "What happens to the corpus luteum if fertilization does not occur?",
                      "answer": "It degenerates into the corpus albicans, progesterone levels drop, and menstruation begins."
                    },
                    {
                      "question": "At what stage is the oocyte released during ovulation?",
                      "answer": "As a secondary oocyte arrested in metaphase II of meiosis; meiosis II completes only upon fertilization."
                    },
                    {
                      "question": "What is the acrosome?",
                      "answer": "A cap-like structure on the sperm head containing enzymes (hyaluronidase) that help penetrate the egg's protective layers."
                    },
                    {
                      "question": "Differentiate between primary and secondary spermatocytes.",
                      "answer": "Primary spermatocytes are diploid (2n) and undergo meiosis I. Secondary spermatocytes are haploid (n) and undergo meiosis II."
                    }
                  ],
              realWorldApplications: [
                    "IVF (In Vitro Fertilization): Understanding oogenesis and follicular development is crucial for successful egg retrieval in fertility clinics.",
                    "Male Contraceptive Development: Research on spermatogenesis regulation helps develop hormonal and non-hormonal male contraceptives.",
                    "Cancer Diagnostics: Testicular and ovarian histological examination helps pathologists diagnose germ cell tumors.",
                    "Livestock Breeding: AI (Artificial Insemination) programs rely on sperm quality assessment based on spermatogenesis knowledge.",
                    "Fertility Assessment: Testicular biopsies examining seminiferous tubules help diagnose male infertility causes.",
                    "Hormone Therapy: Understanding gonadal endocrinology guides hormone replacement therapy for menopausal and hypogonadal patients."
                  ]
        }
      },
      {
          id: 'b14',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Meiosis in Onion Bud', description: 'Observe stages of meiosis in floral buds.', difficulty: 'Hard', duration: '40 min', category: 'Cell Biology',          content: { aim: "To study meiosis in onion bud cells or grasshopper testis through preparation of temporary mounts.", requirements: ["Onion floral buds", "Fixative (Carnoy's fluid)", "Acetocarmine stain", "Slide", "Coverslip", "Microscope", "Needle"], theory: "Meiosis is a reductional division occurring in germ cells to produce haploid gametes. It involves two sequential cycles of nuclear division (Meiosis I and Meiosis II). The most complex and prolonged phase is Prophase I, categorized into Leptotene, Zygotene, Pachytene, Diplotene, and Diakinesis.", procedure: [
              "Collect appropriately sized onion flower buds in the early morning.",
              "Fix the buds in Carnoy's fluid (acetic acid : ethanol = 1:3 ratio) for 24 hours, then store in 70% ethanol.",
              "Transfer a fixed bud to a watch glass and dissect it to isolate an anther.",
              "Place the anther on a clean glass slide and add a drop of Acetocarmine stain.",
              "Crush the anther gently using a glass rod or needle to release the pollen mother cells (PMCs).",
              "Remove any macroscopic debris with the needle.",
              "Place a coverslip over the drop and gently warm the slide over a spirit lamp for a few seconds (do not boil).",
              "Place the slide within a fold of filter paper and apply firm, even pressure over the coverslip with your thumb to squash the cells and spread the chromosomes.",
              "Observe under the microscope (low power, then high power) to identify the various meiotic stages such as homologous chromosome pairing (Zygotene), crossing over (Pachytene), or chiasmata formation (Diplotene)."
            ], objectives: ["Differentiate meiotic stages.", "Understand chromosomal crossing over."],
            observationTable: { columns: ["Meiotic Phase", "Key Chromosomal Activity Observed"] },
            assignments: [
                { id: 1, question: "Explain the events of Prophase I in detail.", marks: 5 },
                { id: 2, question: "Why is meiosis called a reductional division?", marks: 3 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Meiosis produces:",
                      "options": [
                        "2 diploid cells",
                        "4 haploid cells",
                        "4 diploid cells",
                        "2 haploid cells"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Crossing over occurs during:",
                      "options": [
                        "Prophase I (pachytene stage)",
                        "Metaphase II",
                        "Anaphase I",
                        "Telophase II"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 3,
                      "question": "The significance of meiosis is:",
                      "options": [
                        "Growth",
                        "Repair",
                        "Genetic variation and reduction of chromosome number",
                        "Protein synthesis"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 4,
                      "question": "Homologous chromosomes pair up during:",
                      "options": [
                        "Prophase II",
                        "Prophase I (zygotene/synapsis)",
                        "Metaphase I",
                        "Anaphase II"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "A bivalent consists of:",
                      "options": [
                        "Two sister chromatids",
                        "Four chromatids (tetrad) from two homologous chromosomes",
                        "One chromosome",
                        "Eight chromatids"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "Meiosis I is called reductional because:",
                      "options": [
                        "Cell size reduces",
                        "Chromosome number is halved",
                        "DNA content doubles",
                        "Proteins are reduced"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Chiasmata are visible evidence of:",
                      "options": [
                        "Mutation",
                        "Crossing over between non-sister chromatids",
                        "DNA replication",
                        "Cell death"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 8,
                      "question": "Sister chromatids separate during:",
                      "options": [
                        "Anaphase I",
                        "Anaphase II",
                        "Prophase I",
                        "Telophase I"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 9,
                      "question": "The material commonly used to study meiosis is:",
                      "options": [
                        "Root tip",
                        "Onion flower bud (young anthers)",
                        "Leaf",
                        "Stem"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 10,
                      "question": "If a parent cell has 2n=20 chromosomes, each meiotic product has:",
                      "options": [
                        "20",
                        "40",
                        "10",
                        "5"
                      ],
                      "correctIndex": 2
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is meiosis?",
                      "answer": "A specialized cell division that reduces the chromosome number by half, producing four genetically unique haploid cells from one diploid cell."
                    },
                    {
                      "question": "Where does meiosis occur?",
                      "answer": "In the gonads — testes (spermatogenesis) and ovaries (oogenesis) of animals, and in the sporangia of plants."
                    },
                    {
                      "question": "What is synapsis?",
                      "answer": "The precise pairing of homologous chromosomes along their entire length during the zygotene stage of prophase I."
                    },
                    {
                      "question": "What is crossing over and why is it important?",
                      "answer": "The exchange of genetic material between non-sister chromatids of homologous chromosomes, creating new allele combinations and increasing genetic diversity."
                    },
                    {
                      "question": "How does meiosis differ from mitosis?",
                      "answer": "Meiosis involves two divisions, produces 4 haploid cells, includes crossing over and independent assortment, and occurs only in reproductive cells."
                    },
                    {
                      "question": "What are the stages of prophase I?",
                      "answer": "Leptotene, zygotene, pachytene, diplotene, and diakinesis."
                    },
                    {
                      "question": "Why are young flower buds used for studying meiosis?",
                      "answer": "The anthers in young buds contain pollen mother cells actively undergoing meiosis to form pollen grains."
                    },
                    {
                      "question": "What is independent assortment during meiosis?",
                      "answer": "Each pair of homologous chromosomes aligns randomly at metaphase I, so maternal and paternal chromosomes are distributed independently."
                    },
                    {
                      "question": "What would happen without meiosis?",
                      "answer": "Chromosome number would double every generation, making normal development impossible."
                    },
                    {
                      "question": "What is non-disjunction?",
                      "answer": "Failure of chromosomes to separate properly during meiosis, leading to gametes with abnormal chromosome numbers (aneuploidy)."
                    }
                  ],
              realWorldApplications: [
                    "Down Syndrome Research: Non-disjunction during meiosis causes trisomy 21, spurring research into prevention and early diagnosis.",
                    "Plant Breeding: Exploiting meiotic recombination creates novel trait combinations in crops for better yield and disease resistance.",
                    "Genetic Diversity Studies: Understanding meiotic crossing over explains the vast phenotypic variation within species.",
                    "Fertility Treatment: Knowledge of meiotic stages helps diagnose causes of infertility related to gamete formation defects.",
                    "Cancer Research: Errors in meiosis-related genes can contribute to cancer when they malfunction in somatic cells.",
                    "Evolutionary Biology: Meiosis and sexual reproduction are fundamental to understanding how species adapt and evolve over time."
                  ]
        }
      },
      {
          id: 'b15',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Pollination Adaptations', description: 'Study flowers adapted to different pollination agencies.', difficulty: 'Easy', duration: '20 min', category: 'Ecology',          content: { aim: "To study flowers adapted to pollination by different agencies (wind, insects, birds).", requirements: ["Fresh flowers from different plant species (e.g. Maize, Salvia, Bougainvillea)", "Hand lens", "Forceps", "Microscope"], theory: "Pollination is the transfer of pollen grains from the anther to the stigma. Plants have evolved specific floral characteristics (syndromes) to attract vector agencies. Anemophily (wind pollination), Entomophily (insect pollination), and Ornithophily (bird pollination) are common.", procedure: [
              "Examine the provided fresh flowers one by one.",
              "Study an Insect-pollinated flower (e.g., Rose, Salvia, or Hibiscus). Observe the large, brightly colored petals. Note the presence of nectar and scent. Examine the pollen grains under a microscope to see if they are sticky or spiky. Note that stigmas are often sticky and inserted within the corolla tube.",
              "Observe the lever mechanism in Salvia if available.",
              "Study a Wind-pollinated flower (e.g., Maize, Wheat, or Grasses). Observe that flowers are small, inconspicuous, and lack bright colors or nectar. Note the large quantity of light, smooth, non-sticky pollen pollen grains. Observe the feathery, exposed stigmas designed to catch wind-borne pollen.",
              "Study a Bird-pollinated flower (e.g., Bignonia or Bougainvillea). Observe the tubular, brightly colored (often red/orange) flowers with abundant, watery nectar and lack of strong scent (as birds have a poor sense of smell).",
              "Record the morphological adaptations correlated with the pollination mode."
            ], objectives: ["Relate floral morphology to reproductive ecology.", "Identify pollination syndromes."],
            observationTable: { columns: ["Plant Name", "Adaptations Observed", "Pollinating Agency"] },
            assignments: [
                { id: 1, question: "List three characteristics of wind-pollinated flowers.", marks: 3 },
                { id: 2, question: "Explain the lever mechanism of pollination in Salvia.", marks: 4 }
            ],
              quizQuestions: [
                    {
                      "id": 1,
                      "question": "Pollination is the transfer of pollen from:",
                      "options": [
                        "Root to shoot",
                        "Anther to stigma",
                        "Stigma to ovary",
                        "Leaf to flower"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 2,
                      "question": "Wind-pollinated flowers typically have:",
                      "options": [
                        "Large colorful petals and nectar",
                        "Light feathery pollen, large stigma, no scent",
                        "Sweet fragrance",
                        "Bright red color"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 3,
                      "question": "Insect-pollinated flowers usually possess:",
                      "options": [
                        "Reduced petals",
                        "Bright colors, nectar, fragrance, and sticky pollen",
                        "Feathery stigma",
                        "No nectar guide"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 4,
                      "question": "Self-pollination occurs when pollen transfers within:",
                      "options": [
                        "Different species",
                        "The same flower or same plant",
                        "Different plants of same species",
                        "Animal vectors"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 5,
                      "question": "An advantage of cross-pollination is:",
                      "options": [
                        "Guaranteed reproduction",
                        "Increased genetic variation",
                        "Reduced seed production",
                        "Faster germination"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 6,
                      "question": "Plants that rely on water for pollination are called:",
                      "options": [
                        "Anemophilous",
                        "Hydrophilous",
                        "Entomophilous",
                        "Ornithophilous"
                      ],
                      "correctIndex": 1
                    },
                    {
                      "id": 7,
                      "question": "Ornithophily refers to pollination by:",
                      "options": [
                        "Insects",
                        "Wind",
                        "Birds",
                        "Bats"
                      ],
                      "correctIndex": 2
                    },
                    {
                      "id": 8,
                      "question": "Contrivances to prevent self-pollination include:",
                      "options": [
                        "Self-incompatibility, dichogamy, heterostyly",
                        "Large petals",
                        "Absence of stigma",
                        "Waterproof pollen"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 9,
                      "question": "Dichogamy is when:",
                      "options": [
                        "Male and female parts mature at different times",
                        "Flowers have no petals",
                        "Seeds develop without fertilization",
                        "Pollen is sticky"
                      ],
                      "correctIndex": 0
                    },
                    {
                      "id": 10,
                      "question": "Bee-pollinated flowers are characterized by being:",
                      "options": [
                        "Red and odorless",
                        "Blue/yellow with nectar guides and landing platforms",
                        "Green with feathery stigma",
                        "Tiny and wind-dispersed"
                      ],
                      "correctIndex": 1
                    }
                  ],
              vivaQuestions: [
                    {
                      "question": "What is pollination?",
                      "answer": "The process of transfer of pollen grains from the anther to the stigma of a flower."
                    },
                    {
                      "question": "Differentiate between self and cross pollination.",
                      "answer": "Self-pollination occurs within the same flower or plant; cross-pollination involves transfer between different plants of the same species."
                    },
                    {
                      "question": "What adaptations do wind-pollinated flowers show?",
                      "answer": "Light/dry pollen production in large quantities, large feathery stigma to catch pollen, reduced or absent petals, no nectar/scent."
                    },
                    {
                      "question": "What is a nectar guide?",
                      "answer": "UV-visible patterns on petals that direct pollinators toward the nectaries, visible to bees but often invisible to humans."
                    },
                    {
                      "question": "Why is cross-pollination genetically advantageous?",
                      "answer": "It promotes genetic recombination, producing offspring with greater variation and potentially better adaptability."
                    },
                    {
                      "question": "What is self-incompatibility?",
                      "answer": "A genetic mechanism where the stigma recognizes and rejects pollen from the same plant, preventing self-fertilization."
                    },
                    {
                      "question": "Give an example of chiropterophily.",
                      "answer": "Pollination by bats — seen in plants like Kigelia (sausage tree) and some cacti that bloom at night with dull colors and strong fermented scents."
                    },
                    {
                      "question": "What is heterostyly?",
                      "answer": "The presence of different style lengths in flowers of the same species (e.g., pin and thrum flowers in primrose), promoting cross-pollination."
                    },
                    {
                      "question": "How does co-evolution relate to pollination?",
                      "answer": "Flowers and their pollinators evolve together — flower shape, color, and reward systems match pollinator morphology and behavior."
                    },
                    {
                      "question": "What would happen if all pollinators disappeared?",
                      "answer": "About 75% of flowering plants would fail to reproduce, causing massive ecosystem collapse and food shortage."
                    }
                  ],
              realWorldApplications: [
                    "Commercial Agriculture: Beekeepers rent managed hives to pollinate almond orchards, apple farms, and berry plantations.",
                    "Conservation Ecology: Protecting pollinator habitats is critical; pollinator decline threatens global food security.",
                    "Vanilla Production: Vanilla orchids require hand-pollination in most commercial growing regions due to absence of natural pollinators.",
                    "Allergy Medicine: Understanding wind pollination patterns helps predict pollen seasons and develop antihistamine treatments.",
                    "Genetic Engineering: Knowledge of pollination mechanisms prevents unintended gene flow from GMO crops to wild relatives.",
                    "Urban Gardening: City planners incorporate pollinator-friendly plants to support urban bee populations and local food production."
                  ]
        }
      }


    ]
  };
