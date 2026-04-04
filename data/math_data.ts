import { SubjectData } from '../types';
import { SubjectType } from '../types';
import { Zap, FlaskConical, Dna, Calculator, Monitor } from 'lucide-react';

export const mathData: SubjectData = {
    id: 'math',
    name: SubjectType.MATH,
    icon: Calculator,
    color: 'violet',
    hex: '#8b5cf6',
    description: 'Visualize functions, calculus, and geometry interactively.',
    labs: [
        {
            id: 'm1',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Graphing Functions', description: 'Plot and analyze functions.', difficulty: 'Easy', duration: '20 min', category: 'Calculus',
            content: { 
                videoId: "S66-267_2Ck",
                aim: "To plot functions.", requirements: ["Graph paper"], theory: "A function is a relation between a set of inputs (domain) and a set of outputs (range) where each input maps to exactly one output.\n\n**Types of Functions:**\n1. Linear: f(x) = mx + c — straight line.\n2. Quadratic: f(x) = ax² + bx + c — parabola. Vertex at x = -b/2a.\n3. Modulus: f(x) = |x| — V-shaped.\n4. Signum: f(x) = 1 (x>0), 0 (x=0), -1 (x<0).\n5. Greatest Integer: f(x) = [x] — step function.\n\n**Transformations:**\n- Vertical shift: f(x) + k shifts up by k.\n- Horizontal shift: f(x-h) shifts right by h.\n- Reflection: -f(x) about x-axis; f(-x) about y-axis.\n- Scaling: af(x) vertically; f(bx) horizontally.\n\n**Key Features:** Domain, Range, Intercepts, Symmetry, Maxima/Minima, Asymptotes.", procedure: [
              "Open the graphing simulation interface.",
              "Select the type of mathematical function (e.g., linear, quadratic, trigonometric) from the dropdown menu.",
              "Input the variables and coefficients for the chosen function in the input fields provided.",
              "Adjust the X and Y axis scale range using the zoom or scale controls to ensure the curve is fully visible.",
              "Click the \"Plot\" or \"Generate Graph\" button to render the curve.",
              "Analyze turning points, intercepts, and asymptotic behavior of the generated graph by hovering over the curve."
            ], objectives: ["Visualize graphs"],
                observationTable: { columns: ["x", "f(x)"] },
                assignments: [
                    { id: 1, question: "Plot the graph of f(x) = x³ - x. Identify the local maxima and minima.", marks: 5 },
                    { id: 2, question: "Determine the domain and range of the function f(x) = √(16 - x²).", marks: 4 },
                    { id: 3, question: "How does the graph of y = f(x-a) + b differ from y = f(x)?", marks: 3 },
                    { id: 4, question: "Sketch the graph of y = |x-1| + |x+1|.", marks: 5 },
                    { id: 5, question: "Find the asymptotes of the function f(x) = (2x+1)/(x-3).", marks: 4 }
                ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "The graph of y = x² is a:",
                        "options": [
                          "Straight line",
                          "Parabola",
                          "Circle",
                          "Hyperbola"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "The graph of y = sin(x) has a period of:",
                        "options": [
                          "π",
                          "2π",
                          "π/2",
                          "4π"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 3,
                        "question": "A function f(x) is even if:",
                        "options": [
                          "f(-x) = -f(x)",
                          "f(-x) = f(x)",
                          "f(x) = 0",
                          "f(x) = x"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "The domain of f(x) = √x is:",
                        "options": [
                          "All real numbers",
                          "x ≥ 0",
                          "x > 0",
                          "x < 0"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "The graph of y = |x| has shape:",
                        "options": [
                          "U-shape (parabola)",
                          "V-shape",
                          "Straight line",
                          "S-curve"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "Shifting y = f(x) to y = f(x-2) moves the graph:",
                        "options": [
                          "2 units left",
                          "2 units right",
                          "2 units up",
                          "2 units down"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "The range of y = eˣ is:",
                        "options": [
                          "All real numbers",
                          "y > 0",
                          "y ≥ 0",
                          "y < 0"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "log₁₀(1) equals:",
                        "options": [
                          "1",
                          "10",
                          "0",
                          "Undefined"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 9,
                        "question": "The graph of y = 1/x has:",
                        "options": [
                          "One asymptote",
                          "Two asymptotes (x=0 and y=0)",
                          "No asymptotes",
                          "Three asymptotes"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "A function is one-to-one if it passes the:",
                        "options": [
                          "Vertical line test",
                          "Horizontal line test",
                          "Both tests",
                          "Neither test"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is a function?",
                        "answer": "A relation where each input (x) maps to exactly one output (y)."
                      },
                      {
                        "question": "How do you determine the domain of a function?",
                        "answer": "Identify all x-values for which the function produces a valid real output — exclude division by zero, negatives under even roots, etc."
                      },
                      {
                        "question": "What is the vertical line test?",
                        "answer": "If any vertical line intersects the graph at more than one point, the graph does not represent a function."
                      },
                      {
                        "question": "Explain the effect of y = -f(x) on a graph.",
                        "answer": "It reflects the graph across the x-axis."
                      },
                      {
                        "question": "What is an asymptote?",
                        "answer": "A line that the graph approaches but never actually reaches as x or y tends to infinity."
                      },
                      {
                        "question": "Distinguish between continuous and discontinuous functions.",
                        "answer": "A continuous function has no breaks, jumps, or holes in its graph. A discontinuous function has at least one such break."
                      },
                      {
                        "question": "What does it mean for a function to be increasing?",
                        "answer": "For any x₁ < x₂, f(x₁) < f(x₂) — the graph goes uphill from left to right."
                      },
                      {
                        "question": "What is a piecewise function?",
                        "answer": "A function defined by different expressions over different intervals of the domain."
                      },
                      {
                        "question": "How does stretching vertically differ from horizontally?",
                        "answer": "y = af(x) stretches vertically by factor a; y = f(bx) compresses horizontally by factor b."
                      },
                      {
                        "question": "What is the significance of roots/zeros of a function?",
                        "answer": "They are x-values where f(x) = 0, representing where the graph crosses the x-axis."
                      }
                    ],
                realWorldApplications: [
                      "Engineering Signal Processing: Sine and cosine functions model electrical signals, radio waves, and sound vibrations.",
                      "Economics: Exponential and logarithmic functions model compound interest, inflation, and economic growth.",
                      "Physics: Parabolic functions describe projectile motion and satellite dish shapes.",
                      "Computer Graphics: Function transformations are fundamental to rendering, scaling, and animating objects in video games.",
                      "Medicine: Exponential decay functions model drug metabolism and radioactive tracer decay in medical imaging.",
                      "Architecture: Understanding curves (parabolas, catenaries) is essential for designing bridges, arches, and suspension cables."
                    ]
            }
        },
        {
            id: 'm2',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Definite Integral', description: 'Area under curve.', difficulty: 'Medium', duration: '30 min', category: 'Calculus',
            content: { 
                videoId: "rfG8ce4nNh0",
                aim: "Find area.", requirements: ["Graph"], theory: "The definite integral ∫ₐᵇ f(x)dx represents the net signed area between the curve y = f(x) and the x-axis from x = a to x = b.\n\n**Fundamental Theorem of Calculus:** If F(x) is the antiderivative of f(x), then ∫ₐᵇ f(x)dx = F(b) - F(a).\n\n**Properties:**\n1. ∫ₐᵇ f(x)dx = -∫ᵇₐ f(x)dx\n2. ∫ₐᵃ f(x)dx = 0\n3. ∫ₐᵇ f(x)dx = ∫ₐᶜ f(x)dx + ∫ᶜᵇ f(x)dx\n4. ∫₀ₐ f(x)dx = ∫₀ₐ f(a-x)dx\n\n**Geometric Interpretation:** Area under curve above x-axis is positive, below is negative.\n\n**Applications:** Area between curves, volume of revolution, work done.", procedure: [
              "Enter the mathematical function for which the area under the curve is to be determined.",
              "Set the lower integration limit (a) and the upper integration limit (b) in the designated input fields.",
              "Choose the method of numerical approximation (e.g., Riemann Sums, Trapezoidal rule).",
              "Specify the number of intervals (n) to set the precision of the numerical approximation.",
              "Click \"Calculate\" to compute the definite integral and visually shade the area under the curve.",
              "Observe how increasing \'n\' makes the approximated shaded area closer to the exact integral value."
            ], objectives: ["Understand Riemann Sum"],
                assignments: [
                    { id: 1, question: "Evaluate ∫(0 to π/2) sin³x dx.", marks: 4 },
                    { id: 2, question: "Find the area bounded by the curve y = x² and the line y = 4.", marks: 5 },
                    { id: 3, question: "State the Fundamental Theorem of Calculus.", marks: 3 },
                    { id: 4, question: "Using integration, find the area of a circle of radius 'a'.", marks: 5 },
                    { id: 5, question: "Evaluate ∫(0 to 1) 1/(1+x²) dx and hence find the value of π.", marks: 4 }
                ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "The definite integral ∫ₐᵇ f(x)dx represents:",
                        "options": [
                          "The slope at a point",
                          "The net signed area under f(x) from a to b",
                          "The maximum value",
                          "The derivative"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "∫₀¹ x dx equals:",
                        "options": [
                          "0",
                          "1",
                          "1/2",
                          "2"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 3,
                        "question": "The Fundamental Theorem of Calculus connects:",
                        "options": [
                          "Algebra and geometry",
                          "Differentiation and integration",
                          "Probability and statistics",
                          "Trigonometry and algebra"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "∫₋₁¹ x³ dx equals:",
                        "options": [
                          "2/3",
                          "0",
                          "1",
                          "-1"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "If f(x) ≥ 0 on [a,b], the definite integral gives:",
                        "options": [
                          "Negative area",
                          "Exact area under the curve above x-axis",
                          "Slope of tangent",
                          "Volume"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "∫₀^π sin(x) dx equals:",
                        "options": [
                          "0",
                          "1",
                          "2",
                          "π"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 7,
                        "question": "Reversing limits of integration changes:",
                        "options": [
                          "Nothing",
                          "The sign of the integral",
                          "The function",
                          "The variable"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "The trapezoidal rule is a method for:",
                        "options": [
                          "Differentiation",
                          "Numerical approximation of definite integrals",
                          "Factoring polynomials",
                          "Finding limits"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "∫ₐᵃ f(x)dx always equals:",
                        "options": [
                          "1",
                          "a",
                          "f(a)",
                          "0"
                        ],
                        "correctIndex": 3
                      },
                      {
                        "id": 10,
                        "question": "Integration is the reverse process of:",
                        "options": [
                          "Multiplication",
                          "Division",
                          "Differentiation",
                          "Addition"
                        ],
                        "correctIndex": 2
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is the geometric interpretation of a definite integral?",
                        "answer": "It represents the net signed area between the curve y=f(x) and the x-axis over the interval [a,b]."
                      },
                      {
                        "question": "State the Fundamental Theorem of Calculus.",
                        "answer": "If F is an antiderivative of f on [a,b], then ∫ₐᵇ f(x)dx = F(b) - F(a)."
                      },
                      {
                        "question": "What is the difference between definite and indefinite integrals?",
                        "answer": "A definite integral has limits and gives a numerical value; an indefinite integral has no limits and gives a family of functions plus constant C."
                      },
                      {
                        "question": "Why do we add a constant C in indefinite integration?",
                        "answer": "Because the derivative of any constant is zero, so infinitely many antiderivatives exist differing only by a constant."
                      },
                      {
                        "question": "What happens when f(x) is negative on an interval?",
                        "answer": "The definite integral gives a negative value for that region, representing area below the x-axis."
                      },
                      {
                        "question": "Explain the substitution method.",
                        "answer": "Replace a complicated expression with a single variable (u-substitution) to simplify the integral into a recognizable form."
                      },
                      {
                        "question": "What is Simpson's rule?",
                        "answer": "A numerical integration method that approximates the area using parabolic segments instead of straight lines, giving higher accuracy."
                      },
                      {
                        "question": "Can every function be integrated analytically?",
                        "answer": "No. Functions like e^(-x²) have no closed-form antiderivative and require numerical methods."
                      },
                      {
                        "question": "What is an improper integral?",
                        "answer": "An integral where either a limit is infinite or the integrand has a discontinuity within the interval."
                      },
                      {
                        "question": "How is integration used in probability?",
                        "answer": "The area under a probability density function curve over an interval gives the probability of the random variable falling in that interval."
                      }
                    ],
                realWorldApplications: [
                      "Physics (Work and Energy): Calculating work done by a variable force by integrating Force over displacement.",
                      "Civil Engineering: Computing the total volume of irregular structures like dams, embankments, and curved surfaces.",
                      "Economics: Calculating consumer and producer surplus from supply and demand curves.",
                      "Medical Imaging: CT scan reconstruction uses integral calculus to build 3D images from 2D X-ray slices.",
                      "Electrical Engineering: Determining total charge from current-time graphs and energy from power-time graphs.",
                      "Environmental Science: Estimating total pollutant discharge in a river by integrating concentration over flow rate."
                    ]
            }
        },
        {
            id: 'm3',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Unit Circle', description: 'Trigonometric ratios.', difficulty: 'Easy', duration: '20 min', category: 'Trigonometry',
            content: { 
                videoId: "35-aVBDK5Yk",
                aim: "Study sin/cos.", requirements: ["Circle"], theory: "The unit circle is a circle of radius 1 centered at the origin. Any point P on it at angle θ has coordinates (cos θ, sin θ).\n\n**Equation:** x² + y² = 1.\n\n**Trig Functions:** cos θ = x-coordinate, sin θ = y-coordinate, tan θ = y/x.\n\n**Quadrant Signs (ASTC — All Students Take Coffee):**\nI: All positive, II: Only sin, III: Only tan, IV: Only cos.\n\n**Radian Measure:** 1 radian = angle subtended by arc = radius. π radians = 180°.\n\n**Key Values:**\n0°: sin=0, cos=1 | 30°: sin=1/2, cos=√3/2 | 45°: sin=1/√2, cos=1/√2 | 60°: sin=√3/2, cos=1/2 | 90°: sin=1, cos=0.\n\n**Pythagorean Identity:** sin²θ + cos²θ = 1 (from x² + y² = 1).", procedure: [
              "Open the interactive Unit Circle simulator.",
              "Drag the point along the circumference of the circle having a radius of 1 unit.",
              "Observe the formation of the right-angled triangle with the radius acting as the hypotenuse.",
              "Note the changing X coordinate (Cosine) and Y coordinate (Sine) automatically on the screen.",
              "Note the angle formed (in degrees and radians) corresponding to the point\'s position.",
              "Verify the Pythagoras theorem x^2 + y^2 = 1 for different angles to understand trigonometric identities."
            ], objectives: ["Link geometry to trig"],
                assignments: [
                    { id: 1, question: "Using the unit circle, find the value of sin(210°) and cos(300°).", marks: 4 },
                    { id: 2, question: "Convert 135° into radians. Show the position on the unit circle.", marks: 3 },
                    { id: 3, question: "Prove that sin²θ + cos²θ = 1 using the coordinates on a unit circle.", marks: 4 },
                    { id: 4, question: "Graph the function y = sin(x) for x in [0, 4π].", marks: 5 },
                    { id: 5, question: "Explain why tan(90°) is undefined using the unit circle concept.", marks: 3 }
                ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "On the unit circle, the radius is:",
                        "options": [
                          "0",
                          "2",
                          "1",
                          "π"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 2,
                        "question": "sin(90°) equals:",
                        "options": [
                          "0",
                          "1",
                          "-1",
                          "1/2"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 3,
                        "question": "cos(0°) equals:",
                        "options": [
                          "0",
                          "-1",
                          "1",
                          "√2"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 4,
                        "question": "tan(45°) equals:",
                        "options": [
                          "0",
                          "1",
                          "√3",
                          "Undefined"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "On the unit circle, sin θ represents the:",
                        "options": [
                          "x-coordinate",
                          "y-coordinate",
                          "Radius",
                          "Angle"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "π radians equals:",
                        "options": [
                          "90°",
                          "180°",
                          "360°",
                          "45°"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "sin²θ + cos²θ always equals:",
                        "options": [
                          "0",
                          "2",
                          "1",
                          "θ"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 8,
                        "question": "In the second quadrant, sine is:",
                        "options": [
                          "Negative",
                          "Positive",
                          "Zero",
                          "Undefined"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "The coordinates at θ = π/6 on the unit circle are:",
                        "options": [
                          "(√3/2, 1/2)",
                          "(1/2, √3/2)",
                          "(1, 0)",
                          "(0, 1)"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 10,
                        "question": "sec θ is the reciprocal of:",
                        "options": [
                          "sin θ",
                          "cos θ",
                          "tan θ",
                          "cot θ"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is the unit circle?",
                        "answer": "A circle centered at the origin with radius 1, used to define trigonometric functions for all real angles."
                      },
                      {
                        "question": "How do you convert degrees to radians?",
                        "answer": "Multiply by π/180. For example, 90° = 90 × π/180 = π/2 radians."
                      },
                      {
                        "question": "What is the ASTC rule?",
                        "answer": "All-Sin-Tan-Cos: tells which trig functions are positive in each quadrant (I: All, II: Sin, III: Tan, IV: Cos)."
                      },
                      {
                        "question": "Why is the unit circle useful?",
                        "answer": "It extends trigonometric functions beyond acute angles to all real numbers and provides exact values geometrically."
                      },
                      {
                        "question": "What are reference angles?",
                        "answer": "The acute angle between the terminal side of an angle and the x-axis, used to find trig values in any quadrant."
                      },
                      {
                        "question": "Derive sin(30°) using the unit circle.",
                        "answer": "At 30° (π/6), the coordinates are (√3/2, 1/2), so sin(30°) = y-coordinate = 1/2."
                      },
                      {
                        "question": "What is a radian?",
                        "answer": "The angle subtended at the center by an arc equal in length to the radius. One full rotation = 2π radians."
                      },
                      {
                        "question": "State the Pythagorean identity.",
                        "answer": "sin²θ + cos²θ = 1, derived directly from the equation x² + y² = 1 of the unit circle."
                      },
                      {
                        "question": "What are the three reciprocal trig functions?",
                        "answer": "csc θ = 1/sin θ, sec θ = 1/cos θ, cot θ = 1/tan θ."
                      },
                      {
                        "question": "How does the unit circle help visualize periodicity?",
                        "answer": "Rotating beyond 2π (360°) returns to the same point, showing that trig functions repeat every 2π."
                      }
                    ],
                realWorldApplications: [
                      "Navigation and GPS: Trigonometric calculations from the unit circle enable precise position determination on Earth's surface.",
                      "Music and Acoustics: Sound waves are modeled using sine functions; the unit circle helps visualize phase shifts and harmonics.",
                      "Robotics: Joint angles and rotational movements in robot arms are calculated using unit circle trigonometry.",
                      "Astronomy: Calculating the positions of stars and planets involves extensive use of spherical trigonometry.",
                      "Game Development: Character movement, rotation, and camera angles in video games rely on unit circle math.",
                      "Electrical Engineering: AC circuit analysis using phasors directly maps voltage and current to unit circle representations."
                    ]
            }
        },
        {
            id: 'm4',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Conic Sections', description: 'Parabola, Ellipse, Hyperbola.', difficulty: 'Hard', duration: '40 min', category: 'Geometry',
            content: { 
                videoId: "HO2zAU3Eppo",
                aim: "Construct conics.", requirements: ["Focus", "Directrix"], theory: "Conic sections are curves obtained by intersecting a right circular cone with a plane at different angles.\n\n**Circle:** (x-h)² + (y-k)² = r². Standard: x² + y² = r².\n\n**Parabola:** y² = 4ax (opens right). Focus at (a,0), directrix x = -a. Eccentricity e = 1.\n\n**Ellipse:** x²/a² + y²/b² = 1 (a>b). Foci at (±c,0) where c² = a²-b². 0 < e < 1.\n\n**Hyperbola:** x²/a² - y²/b² = 1. Foci at (±c,0) where c² = a²+b². e > 1. Asymptotes: y = ±(b/a)x.\n\n**General equation:** ax² + 2hxy + by² + 2gx + 2fy + c = 0 represents different conics based on the discriminant.", procedure: [
              "Select the specific conic section to explore: Circle, Ellipse, Parabola, or Hyperbola.",
              "Adjust the sliders for the standard equation parameters (e.g., a, b, h, k).",
              "Observe how the cutting plane intersects the 3D double cone to form the 2D curve.",
              "Analyze how changing the parameters shifts the center (h, k) or stretches the curve.",
              "Locate the foci, directrix, and vertices displayed on the generated 2D graph.",
              "Correlate the geometric visualization with the algebraic equation."
            ], objectives: ["Eccentricity"],
                assignments: [
                    { id: 1, question: "Find the equation of the parabola with focus (2,0) and directrix x = -2.", marks: 4 },
                    { id: 2, question: "Find the eccentricity and length of latus rectum of the ellipse 4x² + 9y² = 36.", marks: 5 },
                    { id: 3, question: "Define a Hyperbola in terms of locus of a point.", marks: 3 },
                    { id: 4, question: "Sketch the circle x² + y² - 4x - 6y - 12 = 0. Find its center and radius.", marks: 5 },
                    { id: 5, question: "Identify the conic section represented by x² - 4y² + 2x + 8y - 7 = 0.", marks: 4 }
                ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "A circle is the locus of points equidistant from:",
                        "options": [
                          "A line",
                          "A fixed point (center)",
                          "Two points",
                          "A plane"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "The eccentricity of a circle is:",
                        "options": [
                          "1",
                          "Greater than 1",
                          "0",
                          "Between 0 and 1"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 3,
                        "question": "A parabola has eccentricity:",
                        "options": [
                          "0",
                          "1",
                          "2",
                          "0.5"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "An ellipse has eccentricity:",
                        "options": [
                          "e = 0",
                          "0 < e < 1",
                          "e = 1",
                          "e > 1"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "A hyperbola has eccentricity:",
                        "options": [
                          "e = 0",
                          "0 < e < 1",
                          "e = 1",
                          "e > 1"
                        ],
                        "correctIndex": 3
                      },
                      {
                        "id": 6,
                        "question": "The standard equation of a parabola opening rightward is:",
                        "options": [
                          "y² = 4ax",
                          "x² = 4ay",
                          "x² + y² = r²",
                          "x²/a² + y²/b² = 1"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 7,
                        "question": "The foci of an ellipse lie on the:",
                        "options": [
                          "Minor axis",
                          "Major axis",
                          "Directrix",
                          "Tangent"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "A hyperbola has:",
                        "options": [
                          "One focus",
                          "No foci",
                          "Two foci",
                          "Three foci"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 9,
                        "question": "The sum of distances from any point on an ellipse to its two foci equals:",
                        "options": [
                          "2a (length of major axis)",
                          "2b",
                          "a + b",
                          "a²"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 10,
                        "question": "Conic sections are obtained by intersecting a:",
                        "options": [
                          "Sphere with a plane",
                          "Double cone with a plane",
                          "Cube with a line",
                          "Cylinder with a circle"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What are conic sections?",
                        "answer": "Curves obtained by intersecting a right circular cone with a plane at different angles — circle, ellipse, parabola, and hyperbola."
                      },
                      {
                        "question": "Define eccentricity.",
                        "answer": "The ratio of the distance from a point on the conic to the focus, to its distance from the directrix. It determines the shape."
                      },
                      {
                        "question": "What is the directrix?",
                        "answer": "A fixed line associated with a conic such that the ratio of distance to focus over distance to directrix (eccentricity) is constant."
                      },
                      {
                        "question": "Why is the parabola important in optics?",
                        "answer": "Parabolic mirrors reflect all parallel rays through the focus, making them ideal for telescopes and satellite dishes."
                      },
                      {
                        "question": "What is the latus rectum?",
                        "answer": "A chord through the focus perpendicular to the axis of the conic. For a parabola y²=4ax, its length is 4a."
                      },
                      {
                        "question": "How do planetary orbits relate to conics?",
                        "answer": "Kepler's First Law states that planets orbit the Sun in elliptical paths with the Sun at one focus."
                      },
                      {
                        "question": "What is the relationship between a and b in an ellipse?",
                        "answer": "a is the semi-major axis, b is the semi-minor axis, and they relate to eccentricity by b² = a²(1-e²)."
                      },
                      {
                        "question": "What are the asymptotes of a hyperbola?",
                        "answer": "Lines that the branches of the hyperbola approach but never touch. For x²/a² - y²/b² = 1, they are y = ±(b/a)x."
                      },
                      {
                        "question": "What is a degenerate conic?",
                        "answer": "When the cutting plane passes through the apex of the cone, producing a point, a line, or a pair of intersecting lines."
                      },
                      {
                        "question": "How is the parabola used in projectile motion?",
                        "answer": "The trajectory of a projectile under uniform gravity (ignoring air resistance) follows a parabolic path."
                      }
                    ],
                realWorldApplications: [
                      "Satellite Dishes: Parabolic reflector design focuses incoming signals at the focal point for maximum reception.",
                      "Planetary Orbits: All planets follow elliptical orbits as described by Kepler's laws.",
                      "Architecture: Elliptical and parabolic arches distribute weight efficiently in bridges and cathedrals.",
                      "Automotive Headlights: Parabolic reflectors project light in parallel beams for long-range visibility.",
                      "Nuclear Cooling Towers: Hyperbolic shapes provide structural strength with minimal material.",
                      "Whispering Galleries: Elliptical rooms (like the US Capitol) focus sound from one focus to the other."
                    ]
            }
        },
        {
            id: 'm5',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Vectors', description: 'Cross and Dot products.', difficulty: 'Medium', duration: '30 min', category: 'Algebra',
            content: { 
                videoId: "ml4NSzCQobk",
                aim: "Vector operations.", requirements: ["3D space"], theory: "A vector is a quantity with both magnitude and direction. Represented as ā = aₓî + aᵧĵ + a_zk̂.\n\n**Magnitude:** |ā| = √(aₓ² + aᵧ² + a_z²). Unit vector: â = ā/|ā|.\n\n**Dot Product:** ā·b̄ = |ā||b̄|cosθ = aₓbₓ + aᵧbᵧ + a_zb_z. If ā·b̄ = 0, vectors are perpendicular. Application: Work W = F̄·d̄.\n\n**Cross Product:** |ā×b̄| = |ā||b̄|sinθ. Gives area of parallelogram. Anti-commutative. Application: Torque τ̄ = r̄×F̄.\n\n**Direction Cosines:** cosα = aₓ/|ā|, cosβ = aᵧ/|ā|, cosγ = a_z/|ā|. cos²α + cos²β + cos²γ = 1.", procedure: [
              "Set up the 2D or 3D coordinate plane in the vector simulation.",
              "Input the components (x, y, z) for Vector A and Vector B to define their magnitude and direction.",
              "Select a vector operation: Addition, Subtraction, Dot Product, or Cross Product.",
              "For Vector Addition, visualize the Head-to-Tail or Parallelogram method dynamically drawing the resultant vector.",
              "For Dot/Cross products, observe the numerical output and the orthogonal vector generated (if applicable).",
              "Adjust the magnitude or angle of the initial vectors to see real-time updates in the resultant."
            ], objectives: ["Spatial understanding"],
                assignments: [
                    { id: 1, question: "Find the angle between vectors A = i + j + k and B = i - j + k.", marks: 4 },
                    { id: 2, question: "Find the area of the parallelogram whose adjacent sides are given by A = 3i + j - 2k and B = i - 3j + 4k.", marks: 5 },
                    { id: 3, question: "Find a unit vector perpendicular to both A = 2i - j + k and B = 3i + 4j - k.", marks: 5 },
                    { id: 4, question: "Find the projection of vector A = 2i + 3j + 2k on vector B = i + 2j + k.", marks: 3 },
                    { id: 5, question: "Show that the points A(1, 2, 3), B(2, 3, 4) and C(7, 0, 1) are collinear using vectors.", marks: 4 }
                ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "A vector has both:",
                        "options": [
                          "Magnitude only",
                          "Direction only",
                          "Magnitude and direction",
                          "Neither"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 2,
                        "question": "The magnitude of vector (3, 4) is:",
                        "options": [
                          "7",
                          "12",
                          "5",
                          "1"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 3,
                        "question": "Two vectors are equal if they have:",
                        "options": [
                          "Same magnitude only",
                          "Same direction only",
                          "Same magnitude and direction",
                          "Same starting point"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 4,
                        "question": "The dot product of perpendicular vectors is:",
                        "options": [
                          "1",
                          "Maximum",
                          "0",
                          "Undefined"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 5,
                        "question": "The cross product of two vectors gives:",
                        "options": [
                          "A scalar",
                          "A vector perpendicular to both",
                          "Zero always",
                          "A parallel vector"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "If a⃗ · b⃗ = |a⃗||b⃗|, the angle between them is:",
                        "options": [
                          "90°",
                          "0°",
                          "180°",
                          "45°"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "A unit vector has magnitude:",
                        "options": [
                          "0",
                          "1",
                          "Any value",
                          "Infinity"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "The zero vector has:",
                        "options": [
                          "Magnitude 1",
                          "No definite direction",
                          "Magnitude -1",
                          "Fixed direction"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "The triangle law of vector addition states vectors are added:",
                        "options": [
                          "Algebraically",
                          "Head to tail",
                          "Tail to tail",
                          "By multiplication"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "If a⃗ × b⃗ = 0⃗, the vectors are:",
                        "options": [
                          "Perpendicular",
                          "Parallel (or one is zero)",
                          "Equal",
                          "Unit vectors"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is a vector?",
                        "answer": "A quantity that has both magnitude and direction, represented geometrically as a directed line segment."
                      },
                      {
                        "question": "Distinguish between scalars and vectors.",
                        "answer": "Scalars have only magnitude (mass, temperature). Vectors have both magnitude and direction (force, velocity, displacement)."
                      },
                      {
                        "question": "What is the geometric meaning of the dot product?",
                        "answer": "a⃗·b⃗ = |a⃗||b⃗|cos θ; it measures the projection of one vector onto another."
                      },
                      {
                        "question": "What is the geometric meaning of the cross product?",
                        "answer": "a⃗×b⃗ gives a vector perpendicular to both with magnitude |a⃗||b⃗|sin θ, equal to the area of the parallelogram formed."
                      },
                      {
                        "question": "What are i⃗, j⃗, k⃗?",
                        "answer": "Unit vectors along the x, y, and z axes respectively, forming the standard basis for 3D space."
                      },
                      {
                        "question": "How do you find the angle between two vectors?",
                        "answer": "Using cos θ = (a⃗·b⃗)/(|a⃗||b⃗|)."
                      },
                      {
                        "question": "What is a position vector?",
                        "answer": "The vector from the origin to a point in space, uniquely identifying that point's coordinates."
                      },
                      {
                        "question": "Is the cross product commutative?",
                        "answer": "No, a⃗×b⃗ = -(b⃗×a⃗). It is anti-commutative."
                      },
                      {
                        "question": "What is the resultant of two vectors?",
                        "answer": "The single vector that has the same effect as the two original vectors combined, found by the parallelogram or triangle law."
                      },
                      {
                        "question": "What is meant by resolution of a vector?",
                        "answer": "Splitting a vector into two or more components, typically along perpendicular axes."
                      }
                    ],
                realWorldApplications: [
                      "Aviation: Pilots calculate resultant velocity vectors considering wind speed and direction for accurate navigation.",
                      "Structural Engineering: Force analysis on buildings and bridges uses vector addition to ensure structural integrity.",
                      "Computer Graphics: 3D rendering, lighting, and surface normal calculations rely heavily on vector operations.",
                      "Robotics: Robot arm kinematics and force calculations use vector mathematics for precise movement control.",
                      "Electromagnetism: Electric and magnetic fields are vector quantities; their interactions (Lorentz force) require cross products.",
                      "Sports Science: Analyzing projectile trajectories and impact forces in sports like cricket and football uses vector decomposition."
                    ]
            }
        },
        {
            id: 'm6',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Inverse Trig Functions', description: 'Explore domains and graphs of sin⁻¹, cos⁻¹, tan⁻¹.', difficulty: 'Medium', duration: '25 min', category: 'Trigonometry',            content: { aim: "To study inverse trigonometric functions and their principal values.", requirements: ["Graph paper", "Calculator"], theory: "sin⁻¹x has domain [-1,1] and range [-π/2, π/2]. cos⁻¹x: domain [-1,1], range [0, π]. tan⁻¹x: domain ℝ, range (-π/2, π/2).", procedure: [
              "Select the base trigonometric function (e.g., sine).",
              "Restrict the domain of the base function (e.g., -pi/2 to pi/2 for sine) to make it one-to-one.",
              "Click \"Invert\" to reflect the restricted graph across the line y = x.",
              "Observe the newly plotted inverse function (e.g., arcsine).",
              "Identify the specialized domain and ranges of the resulting inverse function.",
              "Input a specific value x to compute and verify the principal value of the inverse function."
            ], objectives: ["Understand inverse functions."],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "sin⁻¹(x) is defined for:",
                        "options": [
                          "All real x",
                          "-1 ≤ x ≤ 1",
                          "x > 1",
                          "x < -1"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "The range of sin⁻¹(x) is:",
                        "options": [
                          "[0, π]",
                          "[-π/2, π/2]",
                          "[0, 2π]",
                          "(-∞, ∞)"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 3,
                        "question": "cos⁻¹(0) equals:",
                        "options": [
                          "0",
                          "π/2",
                          "π",
                          "2π"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "tan⁻¹(1) equals:",
                        "options": [
                          "0",
                          "π/4",
                          "π/2",
                          "π"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "sin⁻¹(x) + cos⁻¹(x) equals:",
                        "options": [
                          "0",
                          "π",
                          "π/2",
                          "2π"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 6,
                        "question": "The principal value of sin⁻¹(-1/2) is:",
                        "options": [
                          "π/6",
                          "-π/6",
                          "5π/6",
                          "-5π/6"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "Inverse trig functions are used to find:",
                        "options": [
                          "Areas",
                          "Angles from given ratios",
                          "Derivatives only",
                          "Integrals only"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "The graph of y = sin⁻¹(x) is:",
                        "options": [
                          "A complete sine wave",
                          "An increasing curve from (-1,-π/2) to (1,π/2)",
                          "A circle",
                          "A parabola"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "tan⁻¹(x) has range:",
                        "options": [
                          "[0, π]",
                          "(-π/2, π/2)",
                          "[-π/2, π/2]",
                          "[0, 2π]"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "cos⁻¹(-1) equals:",
                        "options": [
                          "0",
                          "π/2",
                          "π",
                          "-π"
                        ],
                        "correctIndex": 2
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "Why are inverse trig functions needed?",
                        "answer": "To find the angle when the trigonometric ratio is known, which is essential in solving triangles and real-world angle problems."
                      },
                      {
                        "question": "What is a principal value?",
                        "answer": "The unique value within the restricted range of an inverse trig function that satisfies the equation."
                      },
                      {
                        "question": "Why do we restrict the domain of trig functions?",
                        "answer": "Because trig functions are periodic and not one-to-one over their natural domain; restriction makes them invertible."
                      },
                      {
                        "question": "State the identity: tan⁻¹(x) + tan⁻¹(y).",
                        "answer": "tan⁻¹(x) + tan⁻¹(y) = tan⁻¹((x+y)/(1-xy)) when xy < 1."
                      },
                      {
                        "question": "What is the derivative of sin⁻¹(x)?",
                        "answer": "1/√(1-x²), defined for |x| < 1."
                      },
                      {
                        "question": "Are inverse trig functions continuous?",
                        "answer": "Yes, within their principal value domains they are continuous and differentiable."
                      },
                      {
                        "question": "What is the relationship between sin⁻¹(x) and cosec⁻¹(x)?",
                        "answer": "sin⁻¹(x) = cosec⁻¹(1/x) for |x| ≤ 1, x ≠ 0."
                      },
                      {
                        "question": "How is tan⁻¹ used in navigation?",
                        "answer": "To calculate bearing angles from coordinate differences (arctan of opposite/adjacent)."
                      },
                      {
                        "question": "What happens if you try sin⁻¹(2)?",
                        "answer": "It is undefined for real numbers since the domain of sin⁻¹ is [-1, 1]."
                      },
                      {
                        "question": "Write sin⁻¹(sin(x)) = x. When is this true?",
                        "answer": "Only when x lies within [-π/2, π/2]; otherwise the principal value adjustment applies."
                      }
                    ],
                realWorldApplications: [
                      "Surveying: Calculating elevation angles from distance and height measurements using arctan.",
                      "Robotics: Computing joint angles from desired end-effector positions (inverse kinematics).",
                      "Signal Processing: Phase angle computation in Fourier analysis uses arctan extensively.",
                      "Construction: Determining roof pitch angles and ramp inclinations from rise-over-run ratios.",
                      "Aviation: Pilots use inverse trig to calculate glide slope angles during landing approach.",
                      "Optics: Calculating angles of refraction using Snell's law requires inverse sine (arcsin)."
                    ]
            }
        },
        {
            id: 'm7',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Maxima & Minima', description: 'Find local maxima and minima of functions using derivatives.', difficulty: 'Medium', duration: '25 min', category: 'Calculus',            content: { aim: "To visualize maxima, minima and inflection points of functions.", requirements: ["Graph paper", "Calculator"], theory: "Critical points occur where f'(x) = 0. Second derivative test: f''(x) > 0 → minimum, f''(x) < 0 → maximum.", procedure: [
              "Input a polynomial or continuous function into the function field.",
              "The simulation will plot the given function\'s curve.",
              "The system computes the first derivative f\'(x) and sets it to zero to find the critical points (stationary points).",
              "The system computes the second derivative f\'\'(x) to apply the second-derivative test.",
              "Observe the highlighted points on the graph: Local Maxima (where curve changes from increasing to decreasing) and Local Minima (decreasing to increasing).",
              "Verify the points against the calculated derivative conditions."
            ], objectives: ["Apply differential calculus."],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "A function has a local maximum when:",
                        "options": [
                          "f'(x) changes from + to -",
                          "f'(x) changes from - to +",
                          "f'(x) = 1",
                          "f(x) = 0"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 2,
                        "question": "At a critical point:",
                        "options": [
                          "f(x) = 0",
                          "f'(x) = 0 or f'(x) is undefined",
                          "f''(x) = 0",
                          "f(x) is maximum"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 3,
                        "question": "The second derivative test: if f''(c) < 0, then x=c is:",
                        "options": [
                          "A minimum",
                          "A maximum",
                          "An inflection point",
                          "Neither"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "If f''(c) > 0, then x=c is:",
                        "options": [
                          "A maximum",
                          "A minimum",
                          "An inflection point",
                          "Undefined"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "An inflection point occurs when:",
                        "options": [
                          "f'(x) = 0",
                          "f''(x) changes sign",
                          "f(x) = 0",
                          "f'(x) > 0"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "For the function f(x) = x² - 4x + 3, the minimum occurs at:",
                        "options": [
                          "x = 0",
                          "x = 2",
                          "x = 3",
                          "x = -2"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "The absolute maximum of f(x) on [a,b] can occur at:",
                        "options": [
                          "Critical points only",
                          "Endpoints only",
                          "Critical points or endpoints",
                          "x = 0 only"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 8,
                        "question": "If f'(x) = 0 and f''(x) = 0, the test is:",
                        "options": [
                          "Maximum",
                          "Minimum",
                          "Inconclusive",
                          "Always an inflection"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 9,
                        "question": "Optimization problems involve finding:",
                        "options": [
                          "Limits",
                          "Maximum or minimum values of a quantity",
                          "Derivatives only",
                          "Integrals only"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "The first derivative test uses:",
                        "options": [
                          "Sign changes of f'(x) around critical points",
                          "Value of f''(x)",
                          "f(x) = 0",
                          "Integration"
                        ],
                        "correctIndex": 0
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is a critical point?",
                        "answer": "A point where f'(x) = 0 or f'(x) does not exist. These are candidates for local extrema."
                      },
                      {
                        "question": "Explain the first derivative test.",
                        "answer": "If f'(x) changes from positive to negative at c, it's a local max. If from negative to positive, it's a local min."
                      },
                      {
                        "question": "When does the second derivative test fail?",
                        "answer": "When f''(c) = 0; the test is inconclusive, and we must use the first derivative test or higher-order derivatives."
                      },
                      {
                        "question": "What is the Extreme Value Theorem?",
                        "answer": "A continuous function on a closed interval [a,b] always attains both an absolute maximum and minimum on that interval."
                      },
                      {
                        "question": "How do you solve optimization word problems?",
                        "answer": "Define variables, write the objective function, find constraints, use calculus to find critical points, and verify max/min."
                      },
                      {
                        "question": "What is a saddle point?",
                        "answer": "A critical point that is neither a maximum nor minimum — the function increases in one direction and decreases in another."
                      },
                      {
                        "question": "Can a function have a maximum at an endpoint?",
                        "answer": "Yes, the absolute maximum on a closed interval may occur at an endpoint where f'(x) ≠ 0."
                      },
                      {
                        "question": "What is the concavity of a function?",
                        "answer": "Concave up (f'' > 0) means the curve opens upward; concave down (f'' < 0) means it opens downward."
                      },
                      {
                        "question": "Give a real example of an optimization problem.",
                        "answer": "Finding the dimensions of a box with maximum volume for a given amount of material."
                      },
                      {
                        "question": "What is the global vs local maximum?",
                        "answer": "Local maximum is highest in a neighborhood; global maximum is the highest value of f over its entire domain."
                      }
                    ],
                realWorldApplications: [
                      "Manufacturing: Minimizing material cost while maximizing container volume for packaging design.",
                      "Economics: Finding profit-maximizing production levels by analyzing marginal cost and revenue curves.",
                      "Medicine: Determining optimal drug dosage that maximizes therapeutic effect while minimizing side effects.",
                      "Civil Engineering: Designing structures with minimum material usage for maximum load-bearing capacity.",
                      "Machine Learning: Gradient descent algorithms find minima of loss functions to train neural networks.",
                      "Logistics: Optimizing delivery routes and warehouse locations to minimize transportation costs."
                    ]
            }
        },
        {
            id: 'm8',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Area Under Curve', description: 'Calculate area enclosed using definite integration.', difficulty: 'Hard', duration: '30 min', category: 'Calculus',            content: { aim: "To calculate the area under a curve using definite integration.", requirements: ["Graph paper", "Calculator"], theory: "Area = ∫[a to b] f(x)dx. For area between two curves: ∫[a to b] [f(x) - g(x)]dx.", procedure: [
              "Enter the function equation representing the upper boundary curve.",
              "If finding the area between two curves, enter the second function equation.",
              "Set the definitive integration limits (x = a to x = b).",
              "The system generates points highlighting the bounded region on the Cartesian plane.",
              "Review the highlighted area correctly matching the analytically calculated definite integration.",
              "Modify the boundary functions or limits to dynamically update the shaded area."
            ], objectives: ["Apply integral calculus."],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "The area under a curve y=f(x) from x=a to x=b is given by:",
                        "options": [
                          "f(b)-f(a)",
                          "∫ₐᵇ f(x) dx",
                          "f'(x)",
                          "Σf(x)"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "To find area between two curves, we calculate:",
                        "options": [
                          "∫(upper - lower) dx",
                          "∫(upper × lower) dx",
                          "∫(upper + lower) dx",
                          "upper - lower at one point"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 3,
                        "question": "The area under y = x from 0 to 2 is:",
                        "options": [
                          "4",
                          "2",
                          "1",
                          "3"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "If f(x) < 0 on [a,b], the area is:",
                        "options": [
                          "Negative",
                          "|∫ₐᵇ f(x) dx| (take absolute value)",
                          "Zero",
                          "Undefined"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "The area of a circle can be computed using:",
                        "options": [
                          "∫₋ᵣʳ 2√(r²-x²) dx",
                          "πr",
                          "2πr²",
                          "r²"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 6,
                        "question": "Area between y=x² and y=x from 0 to 1 is:",
                        "options": [
                          "1/2",
                          "1/3",
                          "1/6",
                          "1"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 7,
                        "question": "Simpson's rule gives better area approximation than trapezoidal because:",
                        "options": [
                          "It uses straight lines",
                          "It uses parabolic curves to fit data",
                          "It ignores errors",
                          "It uses fewer points"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "To find the area bounded by y-axis, we integrate with respect to:",
                        "options": [
                          "x",
                          "y",
                          "z",
                          "t"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "The area under the normal (bell) curve from -∞ to ∞ equals:",
                        "options": [
                          "0",
                          "π",
                          "1",
                          "2π"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 10,
                        "question": "Numerical integration is needed when:",
                        "options": [
                          "Functions are simple",
                          "An analytical antiderivative doesn't exist",
                          "Area is zero",
                          "The curve is a straight line"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "Why is integration related to area?",
                        "answer": "The definite integral sums infinitesimally thin rectangles under the curve, with the limit of this sum equaling the exact area."
                      },
                      {
                        "question": "How do you find area between two curves?",
                        "answer": "Integrate the difference (upper function minus lower function) over the interval where they bound a region."
                      },
                      {
                        "question": "What if the curves intersect within the interval?",
                        "answer": "Split the integral at intersection points and take the absolute value of each part to get total area."
                      },
                      {
                        "question": "What is the trapezoidal rule?",
                        "answer": "A numerical method that approximates the area by dividing it into trapezoids instead of rectangles for better accuracy."
                      },
                      {
                        "question": "How does increasing the number of partitions affect accuracy?",
                        "answer": "More partitions yield narrower strips, reducing approximation error and converging to the true area."
                      },
                      {
                        "question": "Can area be negative?",
                        "answer": "The integral can be negative (when the curve is below the x-axis), but geometric area is always positive."
                      },
                      {
                        "question": "How do you find the area enclosed by a polar curve?",
                        "answer": "Using A = ½∫ r²dθ over the appropriate angular interval."
                      },
                      {
                        "question": "What is Monte Carlo integration?",
                        "answer": "A probabilistic method that estimates area by randomly sampling points and counting how many fall under the curve."
                      },
                      {
                        "question": "How is area under a curve related to probability?",
                        "answer": "For a PDF, the area under the curve over an interval gives the probability of the variable falling in that interval."
                      },
                      {
                        "question": "What is a Riemann sum?",
                        "answer": "The sum of products of function values and strip widths, approximating the area under a curve."
                      }
                    ],
                realWorldApplications: [
                      "Economics: Calculating total revenue or total cost from marginal curves by finding area under those curves.",
                      "Hydrology: Determining total water discharge from a river by integrating flow rate over time.",
                      "Pharmacokinetics: Area Under the Curve (AUC) of drug concentration vs time indicates total drug exposure in the body.",
                      "Statistics: The area under probability density functions determines probabilities for continuous distributions.",
                      "Surveying: Calculating land areas from irregular boundary measurements using numerical integration.",
                      "Energy: Computing total energy delivered over time by integrating power output curves of solar panels."
                    ]
            }
        },
        {
            id: 'm9',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Probability Distribution', description: 'Simulate and visualize probability distributions.', difficulty: 'Easy', duration: '20 min', category: 'Statistics',            content: { aim: "To understand probability distributions through dice/coin experiments.", requirements: ["Dice", "Coins", "Tally Sheet"], theory: "Probability P(E) = favorable outcomes / total outcomes. For two dice: sample space = 36.", procedure: [
              "Select the type of distribution (e.g., Binomial, Normal, or Poisson distribution).",
              "Input the required parameters: for Binomial (n: number of trials, p: probability of success), for Normal (Mean mu, Standard Deviation sigma).",
              "View the generated probability mass or density function curve.",
              "Set an interval range to compute cumulative probability or area beneath the curve.",
              "Analyze the effect of varying standard deviation on the bell curve\'s spread in Normal Distribution.",
              "Relate the theoretical visualization to practical statistical significance."
            ], objectives: ["Understand random variables."],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "A probability distribution assigns probabilities to:",
                        "options": [
                          "Random variables",
                          "Fixed numbers",
                          "Constants",
                          "Colors"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 2,
                        "question": "The sum of all probabilities in a distribution equals:",
                        "options": [
                          "0",
                          "0.5",
                          "1",
                          "Infinity"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 3,
                        "question": "The mean (expected value) of X is:",
                        "options": [
                          "Σ xᵢP(xᵢ)",
                          "ΣP(xᵢ)",
                          "Σxᵢ",
                          "Max P(xᵢ)"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 4,
                        "question": "Standard deviation measures:",
                        "options": [
                          "Central tendency",
                          "Spread/dispersion of data",
                          "Probability",
                          "Mode"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "The binomial distribution models:",
                        "options": [
                          "Continuous data",
                          "Fixed number of independent yes/no trials",
                          "Normal curves",
                          "Time between events"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "For a fair coin tossed 3 times, P(exactly 2 heads) is:",
                        "options": [
                          "1/8",
                          "3/8",
                          "1/2",
                          "1/4"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "The normal distribution is:",
                        "options": [
                          "Skewed left",
                          "Uniform",
                          "Bell-shaped and symmetric",
                          "Rectangular"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 8,
                        "question": "In a normal distribution, approximately 68% of data falls within:",
                        "options": [
                          "1 standard deviation of mean",
                          "2 standard deviations",
                          "3 standard deviations",
                          "The mode"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 9,
                        "question": "Variance is:",
                        "options": [
                          "The square root of standard deviation",
                          "The square of standard deviation",
                          "Mean of the data",
                          "Mode of values"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "A Poisson distribution models:",
                        "options": [
                          "Continuous data",
                          "The number of events in a fixed interval with a known average rate",
                          "Two outcomes",
                          "Normal data"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is a random variable?",
                        "answer": "A variable whose value is determined by the outcome of a random experiment."
                      },
                      {
                        "question": "Distinguish between discrete and continuous distributions.",
                        "answer": "Discrete distributions have countable outcomes (e.g., dice). Continuous distributions have uncountable outcomes over an interval."
                      },
                      {
                        "question": "What is expected value?",
                        "answer": "The long-run average value of a random variable; the weighted mean of all possible values weighted by their probabilities."
                      },
                      {
                        "question": "State the conditions for binomial distribution.",
                        "answer": "Fixed number of trials, each trial independent, two possible outcomes, constant probability of success."
                      },
                      {
                        "question": "What is the Central Limit Theorem?",
                        "answer": "The sampling distribution of the sample mean approaches a normal distribution as sample size increases, regardless of population distribution."
                      },
                      {
                        "question": "What does a Z-score represent?",
                        "answer": "The number of standard deviations a data point is from the mean."
                      },
                      {
                        "question": "When is the Poisson distribution used?",
                        "answer": "For modeling rare events occurring randomly over a fixed time, area, or volume at a known average rate."
                      },
                      {
                        "question": "What is the law of large numbers?",
                        "answer": "As the number of trials increases, the experimental probability converges to the theoretical probability."
                      },
                      {
                        "question": "How is variance calculated?",
                        "answer": "Var(X) = E(X²) - [E(X)]² = Σ(xᵢ - μ)²P(xᵢ)."
                      },
                      {
                        "question": "What is a cumulative distribution function (CDF)?",
                        "answer": "F(x) = P(X ≤ x), giving the probability that the random variable is less than or equal to x."
                      }
                    ],
                realWorldApplications: [
                      "Insurance Actuarial Science: Calculating premiums and risk based on probability distributions of claims.",
                      "Quality Control: Using normal distribution to set tolerance limits and detect defective products.",
                      "Weather Forecasting: Probability distributions model uncertainty in temperature, rainfall, and wind predictions.",
                      "Finance: Stock price movements are modeled using probability distributions for portfolio risk management.",
                      "Epidemiology: Modeling disease spread using Poisson and binomial distributions to predict outbreak patterns.",
                      "Machine Learning: Naive Bayes classifiers and many ML algorithms are built on probability distribution theory."
                    ]
            }
        },
        {
            id: 'm10',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Matrix Operations', description: 'Perform addition, multiplication, inverse, and determinant.', difficulty: 'Medium', duration: '25 min', category: 'Algebra',            content: { aim: "To perform matrix operations and understand their properties.", requirements: ["Calculator", "Paper"], theory: "Matrix multiplication: (AB)ij = Σ aik × bkj. Determinant: |A| = ad - bc (2×2). Inverse: A⁻¹ = adj(A)/|A|.", procedure: [
              "Input the dimensions (rows and columns) for Matrix A and Matrix B.",
              "Fill the matrix cells with real numbers to define the matrices.",
              "Choose the mathematical matrix operation: Addition, Subtraction, Multiplication, Inverse, or Determinant.",
              "If multiplication is selected, ensure that the column count of A matches the row count of B.",
              "View the step-by-step arithmetic simulation of the selected operation (e.g., row-by-column multiplication steps).",
              "Finalize and review the resulting matrix values."
            ], objectives: ["Apply linear algebra."],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "A matrix is an ordered arrangement of numbers in:",
                        "options": [
                          "A circle",
                          "Rows and columns",
                          "A single line",
                          "Random positions"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "The order of a matrix with 3 rows and 2 columns is:",
                        "options": [
                          "2×3",
                          "3×2",
                          "6×1",
                          "1×6"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 3,
                        "question": "Matrix multiplication AB is possible only if:",
                        "options": [
                          "Rows of A = Rows of B",
                          "Columns of A = Rows of B",
                          "Both are square",
                          "Always possible"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "The identity matrix has:",
                        "options": [
                          "All zeros",
                          "1s on the main diagonal, 0s elsewhere",
                          "All 1s",
                          "Random values"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "The determinant of a 2×2 matrix [[a,b],[c,d]] is:",
                        "options": [
                          "a+d",
                          "ad-bc",
                          "ab-cd",
                          "ac-bd"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "If det(A) = 0, the matrix is:",
                        "options": [
                          "Identity",
                          "Singular (non-invertible)",
                          "Orthogonal",
                          "Symmetric"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "The transpose of matrix A is obtained by:",
                        "options": [
                          "Multiplying by -1",
                          "Interchanging rows and columns",
                          "Adding identity",
                          "Squaring each element"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "AB ≠ BA in general shows that matrix multiplication is:",
                        "options": [
                          "Commutative",
                          "Non-commutative",
                          "Distributive",
                          "Impossible"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "A symmetric matrix satisfies:",
                        "options": [
                          "A = -Aᵀ",
                          "A = Aᵀ",
                          "A = A⁻¹",
                          "A = 0"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "Cramer's rule uses determinants to solve:",
                        "options": [
                          "Differential equations",
                          "Systems of linear equations",
                          "Quadratic equations",
                          "Integrations"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is a matrix?",
                        "answer": "A rectangular array of numbers, symbols, or expressions arranged in rows and columns."
                      },
                      {
                        "question": "When can two matrices be added?",
                        "answer": "Only when they have the same order (same number of rows and columns)."
                      },
                      {
                        "question": "What is the inverse of a matrix?",
                        "answer": "Matrix A⁻¹ such that AA⁻¹ = A⁻¹A = I (identity matrix). It exists only if det(A) ≠ 0."
                      },
                      {
                        "question": "What are eigenvalues?",
                        "answer": "Scalars λ such that Av = λv for some non-zero vector v; they reveal fundamental properties of the linear transformation."
                      },
                      {
                        "question": "What is a diagonal matrix?",
                        "answer": "A square matrix where all elements outside the main diagonal are zero."
                      },
                      {
                        "question": "Explain the use of matrices in solving simultaneous equations.",
                        "answer": "A system AX = B can be solved as X = A⁻¹B if A is invertible, or using row reduction (Gaussian elimination)."
                      },
                      {
                        "question": "What is the trace of a matrix?",
                        "answer": "The sum of elements on the main diagonal of a square matrix."
                      },
                      {
                        "question": "What is an orthogonal matrix?",
                        "answer": "A square matrix whose transpose equals its inverse: AᵀA = I."
                      },
                      {
                        "question": "Why is det(A) important?",
                        "answer": "It determines whether the system has a unique solution (non-zero det), tells about volume scaling in transformations."
                      },
                      {
                        "question": "What is the rank of a matrix?",
                        "answer": "The maximum number of linearly independent rows or columns, indicating the dimension of the solution space."
                      }
                    ],
                realWorldApplications: [
                      "Computer Graphics: 3D transformations (rotation, scaling, translation) are performed using 4×4 transformation matrices.",
                      "Google PageRank: The algorithm uses massive matrix operations to rank web pages based on link structures.",
                      "Quantum Computing: Quantum states are represented as vectors and operations as unitary matrices.",
                      "Cryptography: Hill cipher and other encryption methods use invertible matrices to encode and decode messages.",
                      "Structural Engineering: Finite Element Analysis uses large matrices to model stress distribution in complex structures.",
                      "Economics (Input-Output Models): Leontief models use matrices to analyze inter-industry dependencies in national economies."
                    ]
            }
        }


    ]
  };
