import { SubjectData } from '../types';
import { SubjectType } from '../types';
import { Zap, FlaskConical, Dna, Calculator, Monitor } from 'lucide-react';

export const csData: SubjectData = {
    id: 'cs',
    name: SubjectType.CS,
    icon: Monitor,
    color: 'purple',
    hex: '#a855f7',
    description: 'Understand logic gates, algorithms, and number systems.',
    labs: [
        {
            id: 'cs1',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Logic Gates', description: 'AND, OR, NOT, XOR gates.', difficulty: 'Easy', duration: '20 min', category: 'Digital Logic',
            content: { 
                videoId: "gI-qXk7XojA",
                aim: "Verify truth tables.", requirements: ["Gates"], theory: "Boolean algebra deals with variables having two values: true (1) and false (0). It is the mathematical foundation for digital logic circuits.\n\n**Basic Gates:**\n1. AND: Y = A·B (output 1 only when all inputs are 1).\n2. OR: Y = A+B (output 1 when any input is 1).\n3. NOT: Y = A' (complement).\n4. NAND: Y = (A·B)' — Universal gate.\n5. NOR: Y = (A+B)' — Universal gate.\n6. XOR: Y = A⊕B (output 1 when inputs differ).\n7. XNOR: Y = (A⊕B)' (output 1 when inputs same).\n\n**Boolean Laws:** Commutative, Associative, Distributive.\n**De Morgan's Theorems:** (A+B)' = A'·B'; (A·B)' = A'+B'.\n\n**Universal Gates:** NAND and NOR can implement any Boolean function.", procedure: [
              "Open the digital circuit simulator canvas.",
              "Drag and drop basic input pins (switches representing 0 or 1).",
              "Select and place the desired logic gate component (AND, OR, NOT, NAND, NOR, XOR, XNOR) onto the canvas.",
              "Wire the input pins to the gate inputs by connecting their nodes.",
              "Connect an output indicator (like an LED or a probe) to the gate\'s output node.",
              "Toggle the input switches to generate all possible input combinations (00, 01, 10, 11).",
              "Observe the output LED state for each combination and construct the Truth Table accurately."
            ], objectives: ["Digital circuits"],
                observationTable: { columns: ["Input A", "Input B", "Output Y"] },
                assignments: [
                    { id: 1, question: "Construct a truth table for the expression Y = (A AND B) OR (NOT C).", marks: 5 },
                    { id: 2, question: "Why are NAND and NOR gates called Universal Gates? Implement an OR gate using only NAND gates.", marks: 5 },
                    { id: 3, question: "Draw the logic circuit for the Half Adder and write its truth table.", marks: 5 },
                    { id: 4, question: "State and prove De Morgan's Laws using truth tables.", marks: 4 },
                    { id: 5, question: "Explain the working of an XOR gate. Where is it used?", marks: 3 }
                ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "The AND gate outputs 1 only when:",
                        "options": [
                          "Any input is 1",
                          "All inputs are 1",
                          "All inputs are 0",
                          "Inputs are different"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "The OR gate outputs 0 only when:",
                        "options": [
                          "Any input is 1",
                          "All inputs are 1",
                          "All inputs are 0",
                          "Inputs alternate"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 3,
                        "question": "The NOT gate has:",
                        "options": [
                          "2 inputs",
                          "3 inputs",
                          "1 input",
                          "No inputs"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 4,
                        "question": "NAND gate is a combination of:",
                        "options": [
                          "NOT + OR",
                          "NOT + AND",
                          "AND + OR",
                          "XOR + NOT"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "NAND and NOR gates are called universal because:",
                        "options": [
                          "They are fastest",
                          "Any logic function can be built using only NAND or only NOR",
                          "They use least power",
                          "They are cheapest"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "XOR gate outputs 1 when inputs are:",
                        "options": [
                          "Same",
                          "Different",
                          "Both 1",
                          "Both 0"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "De Morgan's theorem states NOT(A AND B) equals:",
                        "options": [
                          "NOT A AND NOT B",
                          "NOT A OR NOT B",
                          "A AND B",
                          "A OR B"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "A truth table for 2 inputs has how many rows?",
                        "options": [
                          "2",
                          "3",
                          "4",
                          "8"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 9,
                        "question": "The Boolean expression for OR gate is:",
                        "options": [
                          "A · B",
                          "A + B",
                          "A'",
                          "A ⊕ B"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "In binary, 1 + 1 equals:",
                        "options": [
                          "2",
                          "11",
                          "10",
                          "01"
                        ],
                        "correctIndex": 2
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is a logic gate?",
                        "answer": "A fundamental digital circuit element that performs a basic logical operation on one or more binary inputs to produce a single binary output."
                      },
                      {
                        "question": "Why are NAND gates considered universal?",
                        "answer": "Because any Boolean function (AND, OR, NOT, XOR, etc.) can be implemented using only NAND gates."
                      },
                      {
                        "question": "What is a truth table?",
                        "answer": "A table showing all possible input combinations and their corresponding outputs for a logic circuit."
                      },
                      {
                        "question": "State De Morgan's First Theorem.",
                        "answer": "The complement of a sum (OR) equals the product (AND) of the complements: (A+B)' = A'·B'."
                      },
                      {
                        "question": "What is the difference between combinational and sequential circuits?",
                        "answer": "Combinational circuits' output depends only on current inputs; sequential circuits also depend on previous states (memory)."
                      },
                      {
                        "question": "What is a half adder?",
                        "answer": "A circuit that adds two single bits, producing a Sum (XOR) and a Carry (AND)."
                      },
                      {
                        "question": "What is Boolean Algebra?",
                        "answer": "A mathematical framework for analyzing and simplifying logic circuits using variables that have only two values: 0 and 1."
                      },
                      {
                        "question": "How is the XOR gate used in error detection?",
                        "answer": "XOR is used in parity bit generation and checking — it outputs 1 when an odd number of inputs are 1."
                      },
                      {
                        "question": "What are minterms and maxterms?",
                        "answer": "Minterms are product terms where the function equals 1; maxterms are sum terms where the function equals 0."
                      },
                      {
                        "question": "What is a Karnaugh Map?",
                        "answer": "A graphical method for simplifying Boolean expressions by grouping adjacent 1s to minimize the number of logic gates."
                      }
                    ],
                realWorldApplications: [
                      "Computer Processors: Billions of logic gates form the CPU, performing all arithmetic and logical operations.",
                      "Digital Communication: Error detection and correction codes use XOR gates extensively.",
                      "Automotive Electronics: Logic circuits control airbag deployment, ABS braking, and engine management systems.",
                      "Home Automation: Smart home devices use logic gates in controllers for lights, thermostats, and security systems.",
                      "Medical Devices: Pacemakers and diagnostic equipment rely on logic circuits for precise signal processing.",
                      "Space Technology: Radiation-hardened logic gates are used in satellite and spacecraft control systems."
                    ]
            }
        },
        {
            id: 'cs2',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Bubble Sort', description: 'Sorting algorithm visualization.', difficulty: 'Medium', duration: '30 min', category: 'Algorithms',
            content: { 
                videoId: "nmhjrI-aW5o",
                aim: "Visualize sorting.", requirements: ["Array"], theory: "Bubble Sort is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if in wrong order.\n\n**Algorithm:** Compare adjacent pairs, swap if needed. Each pass moves the largest unsorted element to its correct position.\n\n**Time Complexity:** Best O(n), Average O(n²), Worst O(n²).\n**Space Complexity:** O(1) — in-place.\n\n**Properties:** Stable (equal elements maintain order), Adaptive (O(n) for nearly sorted with flag optimization), In-place.\n\n**Passes Required:** Max (n-1) passes for n elements. Pass i makes (n-i) comparisons.\n\n**Limitations:** Inefficient for large datasets compared to O(n log n) algorithms.", procedure: [
              "Define an unsorted array of numbers in the visual array input.",
              "Start the simulation. The algorithm points to the first two adjacent elements (index 0 and 1).",
              "It compares them. If the first element is larger than the second (for ascending sort), they are swapped.",
              "The pointers move to the next pair (index 1 and 2), repeating the comparison and swapping if necessary.",
              "This process continues to the end of the array, successfully bubbling the largest element to the last position.",
              "The process repeats for the remaining unsorted portion of the array.",
              "Observe the visual iteration until no more swaps are needed, marking the array as fully sorted."
            ], objectives: ["Algorithm analysis"],
                assignments: [
                    { id: 1, question: "Trace the Bubble Sort algorithm for the array [5, 1, 4, 2, 8]. Show each pass.", marks: 5 },
                    { id: 2, question: "What is the time complexity of Bubble Sort in Best, Average, and Worst cases?", marks: 3 },
                    { id: 3, question: "How can Bubble Sort be optimized to stop early if the array is already sorted?", marks: 4 },
                    { id: 4, question: "Is Bubble Sort a stable sorting algorithm? Explain with an example.", marks: 3 },
                    { id: 5, question: "Write the pseudocode for the Bubble Sort algorithm.", marks: 5 }
                ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "Bubble sort repeatedly:",
                        "options": [
                          "Divides the array",
                          "Swaps adjacent elements if they are in wrong order",
                          "Selects the minimum",
                          "Uses recursion"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "The worst-case time complexity of bubble sort is:",
                        "options": [
                          "O(n)",
                          "O(n log n)",
                          "O(n²)",
                          "O(1)"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 3,
                        "question": "After the first pass of bubble sort, the largest element is at:",
                        "options": [
                          "Beginning",
                          "End of the array",
                          "Middle",
                          "Random position"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "Bubble sort is a:",
                        "options": [
                          "Divide and conquer algorithm",
                          "Comparison-based sorting algorithm",
                          "Greedy algorithm",
                          "Graph algorithm"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "The best-case time complexity (already sorted) is:",
                        "options": [
                          "O(n²)",
                          "O(n) with optimization",
                          "O(n log n)",
                          "O(1)"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "Bubble sort is:",
                        "options": [
                          "Not stable",
                          "Stable (equal elements maintain order)",
                          "Unstable sometimes",
                          "Random"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "The space complexity of bubble sort is:",
                        "options": [
                          "O(n)",
                          "O(n²)",
                          "O(1) (in-place)",
                          "O(log n)"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 8,
                        "question": "How many passes are needed for n elements in worst case?",
                        "options": [
                          "n",
                          "n-1",
                          "n/2",
                          "log n"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "An optimized bubble sort stops early when:",
                        "options": [
                          "Array is empty",
                          "No swaps occur in a pass",
                          "First element is sorted",
                          "Last element is found"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "For array [5,3,1], after first pass:",
                        "options": [
                          "[1,3,5]",
                          "[3,1,5]",
                          "[3,5,1]",
                          "[5,1,3]"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "Explain the bubble sort algorithm step by step.",
                        "answer": "Compare adjacent elements, swap if in wrong order, repeat for all elements. After each pass, the next largest element 'bubbles' to its correct position."
                      },
                      {
                        "question": "Why is it called 'bubble' sort?",
                        "answer": "Because larger elements gradually 'bubble up' to the end of the array, like air bubbles rising in water."
                      },
                      {
                        "question": "Is bubble sort efficient for large datasets?",
                        "answer": "No, O(n²) complexity makes it impractical for large datasets; algorithms like merge sort O(n log n) are preferred."
                      },
                      {
                        "question": "What does 'stable sort' mean?",
                        "answer": "Equal elements maintain their original relative order in the sorted output."
                      },
                      {
                        "question": "How can bubble sort be optimized?",
                        "answer": "By adding a flag that tracks if any swap occurred during a pass; if no swap occurs, the array is sorted and we can stop early."
                      },
                      {
                        "question": "Compare bubble sort with selection sort.",
                        "answer": "Both are O(n²). Bubble sort swaps adjacent elements; selection sort finds the minimum and places it at the correct position."
                      },
                      {
                        "question": "What is in-place sorting?",
                        "answer": "Sorting that uses only a constant amount of extra memory (O(1) space), modifying the array directly."
                      },
                      {
                        "question": "When might bubble sort be acceptable?",
                        "answer": "For very small arrays, nearly sorted data, or educational purposes to understand sorting fundamentals."
                      },
                      {
                        "question": "How many comparisons does bubble sort make in worst case?",
                        "answer": "n(n-1)/2 comparisons for an array of n elements."
                      },
                      {
                        "question": "Can bubble sort be applied to linked lists?",
                        "answer": "Yes, but it's even less efficient due to the lack of random access; insertion sort is generally preferred for linked lists."
                      }
                    ],
                realWorldApplications: [
                      "Education: The most commonly taught sorting algorithm to introduce algorithmic thinking and Big-O analysis.",
                      "Small Embedded Systems: Used in microcontrollers with tiny datasets where code simplicity matters more than speed.",
                      "Data Validation: Checking if a small dataset is nearly sorted (optimized bubble sort detects this in O(n)).",
                      "Network Packet Ordering: Simple sorting of small buffer queues in low-power IoT devices.",
                      "Database Index Maintenance: Understanding bubble sort helps appreciate why databases use B-trees and more efficient algorithms.",
                      "Competitive Programming: Serves as a baseline to compare and understand more advanced sorting algorithms."
                    ]
            }
        },
        {
            id: 'cs3',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Insertion Sort', description: 'Sorting algorithm.', difficulty: 'Medium', duration: '30 min', category: 'Algorithms',
            content: { 
                videoId: "OGzPmgsI-pQ",
                aim: "Visualize insertion sort.", requirements: ["Array"], theory: "Insertion Sort is an adaptive, comparison-based sorting algorithm that builds the final sorted array one element at a time. It works like sorting playing cards in hand.\n\n**Algorithm:**\n1. Consider first element as sorted.\n2. Pick next element (key).\n3. Compare with sorted portion from right to left.\n4. Shift elements greater than key one position right.\n5. Insert key at correct position.\n6. Repeat for all elements.\n\n**Time Complexity:** Best O(n) (already sorted), Average O(n²), Worst O(n²) (reverse sorted).\n**Space Complexity:** O(1) — in-place.\n\n**Properties:** Stable, Adaptive (better on nearly sorted data), Online (can sort as it receives), In-place.\n\n**When to Use:** Best for small datasets or nearly sorted data. Used as base case in hybrid algorithms like Timsort.", procedure: [
              "Initialize an unsorted numerical array in the simulator.",
              "The outer loop begins at the second element (index 1), assuming the first element (index 0) is already a sorted sub-array.",
              "The algorithm stores the current element in a temporary key variable.",
              "It compares the key with elements in the sorted sub-array to its left, moving from right to left.",
              "If a compared element is greater than the key, it shifts that element one position to the right.",
              "It formally inserts the key into its correctly ordered position within the sorted sub-array.",
              "The process iteratively expands the sorted sub-array one element at a time until the entire array is sorted."
            ], objectives: ["Sorting"],
                assignments: [
                    { id: 1, question: "Trace the Insertion Sort algorithm for the array [12, 11, 13, 5, 6].", marks: 5 },
                    { id: 2, question: "Compare Insertion Sort and Bubble Sort. Which one is better for nearly sorted arrays?", marks: 4 },
                    { id: 3, question: "Why is Insertion Sort preferred for small datasets?", marks: 3 },
                    { id: 4, question: "Calculate the number of comparisons required to sort [4, 3, 2, 1] using Insertion Sort.", marks: 3 },
                    { id: 5, question: "Explain the 'online' property of Insertion Sort.", marks: 4 }
                ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "Insertion sort works by:",
                        "options": [
                          "Dividing the array in half",
                          "Inserting each element into its correct position in the sorted portion",
                          "Finding the minimum repeatedly",
                          "Swapping random elements"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "Best-case time complexity of insertion sort is:",
                        "options": [
                          "O(n²)",
                          "O(n log n)",
                          "O(n)",
                          "O(1)"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 3,
                        "question": "Insertion sort is most efficient when data is:",
                        "options": [
                          "Reverse sorted",
                          "Nearly sorted",
                          "Random",
                          "Very large"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "Insertion sort is:",
                        "options": [
                          "Unstable",
                          "Stable",
                          "Non-deterministic",
                          "Recursive"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "The worst-case complexity of insertion sort is:",
                        "options": [
                          "O(n)",
                          "O(n log n)",
                          "O(n²)",
                          "O(2ⁿ)"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 6,
                        "question": "Insertion sort uses how much extra space?",
                        "options": [
                          "O(n)",
                          "O(n²)",
                          "O(1)",
                          "O(log n)"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 7,
                        "question": "Insertion sort is analogous to:",
                        "options": [
                          "Binary search",
                          "Sorting playing cards in hand",
                          "Quick sort",
                          "Merge sort"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "For nearly sorted data, insertion sort outperforms:",
                        "options": [
                          "Only bubble sort",
                          "Merge sort and quick sort",
                          "No algorithm",
                          "Only selection sort"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "In insertion sort, the 'key' element is compared with:",
                        "options": [
                          "All elements ahead",
                          "Elements in the sorted portion to its left",
                          "The last element only",
                          "Random elements"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "Shell sort is an optimization of:",
                        "options": [
                          "Bubble sort",
                          "Quick sort",
                          "Insertion sort",
                          "Merge sort"
                        ],
                        "correctIndex": 2
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "Describe insertion sort in your own words.",
                        "answer": "Pick one element at a time, compare it with the already sorted portion, and insert it at the correct position by shifting larger elements right."
                      },
                      {
                        "question": "Why is insertion sort preferred for small datasets?",
                        "answer": "Its low overhead and simplicity make it faster than O(n log n) algorithms for small n, which have higher constant factors."
                      },
                      {
                        "question": "Compare insertion sort with merge sort.",
                        "answer": "Insertion sort is O(n²) but in-place and stable. Merge sort is O(n log n) but requires O(n) extra space."
                      },
                      {
                        "question": "What is the adaptive property of insertion sort?",
                        "answer": "It performs fewer comparisons when data is partially sorted, making its performance adapt to the input's pre-sorted level."
                      },
                      {
                        "question": "What is binary insertion sort?",
                        "answer": "A variant that uses binary search to find the correct insertion position, reducing comparisons to O(n log n) but shifts remain O(n²)."
                      },
                      {
                        "question": "Is insertion sort a good choice for online sorting?",
                        "answer": "Yes, because it can sort elements as they arrive one by one without needing the complete dataset upfront."
                      },
                      {
                        "question": "What is Shell sort?",
                        "answer": "A generalization of insertion sort that allows exchange of far-apart elements, then progressively reduces the gap between compared elements."
                      },
                      {
                        "question": "When would you choose insertion sort over quick sort?",
                        "answer": "For small arrays, nearly sorted data, or when stability is required and extra space is limited."
                      },
                      {
                        "question": "How many swaps does insertion sort make in the worst case?",
                        "answer": "O(n²) shifts/swaps when the array is in reverse order."
                      },
                      {
                        "question": "Why is insertion sort used as a subroutine in Timsort?",
                        "answer": "Timsort (used in Python/Java) uses insertion sort for small segments because it's fast for small/partially sorted data."
                      }
                    ],
                realWorldApplications: [
                      "Python's Timsort: Python's built-in sort uses insertion sort for small partitions within its hybrid Timsort algorithm.",
                      "Real-time Systems: Insertion sort is used in systems where data arrives incrementally and must be kept sorted.",
                      "Card Game Algorithms: Digital card games sort hands using insertion sort, mirroring how humans naturally sort cards.",
                      "Database Small Batch Sorting: Used for sorting small result sets in database query optimization.",
                      "Embedded Systems: Preferred in memory-constrained environments due to its O(1) space requirement.",
                      "Streaming Data: Maintaining a sorted window of recent data points in IoT sensor networks."
                    ]
            }
        },
        {
            id: 'cs4',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Stack Operations', description: 'Push and Pop visualization.', difficulty: 'Easy', duration: '20 min', category: 'Data Structures',
            content: { 
                videoId: "I5lq6sCuABE",
                aim: "LIFO principle.", requirements: ["Stack"], theory: "A Stack is a linear data structure following Last In, First Out (LIFO) principle.\n\n**Operations:**\n1. Push: Add to top. O(1).\n2. Pop: Remove from top. O(1).\n3. Peek/Top: View top element. O(1).\n4. isEmpty/isFull: Check status.\n\n**Overflow/Underflow:** Pushing onto full stack = overflow. Popping from empty = underflow.\n\n**Implementation:** Using arrays (fixed size) or linked lists (dynamic).\n\n**Applications:**\n- Expression evaluation: infix to postfix conversion.\n- Function call management (call stack).\n- Undo/Redo operations.\n- Backtracking: browser back button, maze solving, DFS.\n- Balanced parentheses checking.", procedure: [
              "Initialize a Stack data structure and define its capacity maximum limit.",
              "To perform a PUSH operation, input a value and click Push.",
              "Observe the standard stack pointer (TOP) incrementing and the item placed at the top of the stack visually.",
              "To perform a POP operation, click Pop.",
              "Observe the item being removed strictly from the TOP, complying with the LIFO (Last In, First Out) principle, and the TOP pointer decrementing.",
              "Identify the boundary conditions by attempting to Push when full (causing Stack Overflow) or Pop when empty (causing Stack Underflow)."
            ], objectives: ["Memory structure"],
                assignments: [
                    { id: 1, question: "Convert the infix expression (A+B)*(C-D) to postfix using a stack.", marks: 5 },
                    { id: 2, question: "Explain the terms 'Stack Overflow' and 'Stack Underflow'.", marks: 3 },
                    { id: 3, question: "Write an algorithm for PUSH and POP operations in a stack implemented using arrays.", marks: 5 },
                    { id: 4, question: "How is a stack used in function calls and recursion?", marks: 4 },
                    { id: 5, question: "Evaluate the postfix expression: 2 3 1 * + 9 -", marks: 3 }
                ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "A stack follows which principle?",
                        "options": [
                          "FIFO",
                          "LIFO",
                          "Random access",
                          "Priority-based"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "The push operation:",
                        "options": [
                          "Removes from top",
                          "Adds to top",
                          "Searches the stack",
                          "Sorts the stack"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 3,
                        "question": "The pop operation:",
                        "options": [
                          "Adds to bottom",
                          "Removes from top",
                          "Views without removing",
                          "Clears the stack"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "Peek/Top operation:",
                        "options": [
                          "Removes the top element",
                          "Returns the top element without removing it",
                          "Pushes a new element",
                          "Empties the stack"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "Stack overflow occurs when:",
                        "options": [
                          "Stack is empty",
                          "A pop is attempted on empty stack",
                          "Push is attempted on a full stack",
                          "Elements are sorted"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 6,
                        "question": "Stack underflow occurs when:",
                        "options": [
                          "Stack is full",
                          "Pop is attempted on empty stack",
                          "Too many pushes",
                          "Stack overflows"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "Which data structure is used for function call management?",
                        "options": [
                          "Queue",
                          "Stack (call stack)",
                          "Array",
                          "Linked list"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "Infix expression A+B in postfix is:",
                        "options": [
                          "AB+",
                          "+AB",
                          "A+B",
                          "BA+"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 9,
                        "question": "Stacks can be implemented using:",
                        "options": [
                          "Arrays only",
                          "Linked lists only",
                          "Both arrays and linked lists",
                          "Neither"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 10,
                        "question": "The time complexity of push and pop is:",
                        "options": [
                          "O(n)",
                          "O(log n)",
                          "O(1)",
                          "O(n²)"
                        ],
                        "correctIndex": 2
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is a stack?",
                        "answer": "A linear data structure following LIFO (Last In, First Out) principle where insertion and deletion happen at only one end (top)."
                      },
                      {
                        "question": "Give real-world analogies of a stack.",
                        "answer": "A stack of plates, a pile of books, or the browser's back button history."
                      },
                      {
                        "question": "How is a stack used in recursion?",
                        "answer": "Each recursive call is pushed onto the call stack with its local variables; when the base case is reached, calls are popped and resolved."
                      },
                      {
                        "question": "What is the difference between stack and queue?",
                        "answer": "Stack is LIFO (last in, first out); Queue is FIFO (first in, first out)."
                      },
                      {
                        "question": "How are function calls managed using stacks?",
                        "answer": "The system maintains a call stack where each function call's return address and local variables are pushed, and popped upon return."
                      },
                      {
                        "question": "What are applications of stacks in compilers?",
                        "answer": "Expression evaluation, syntax parsing, postfix/prefix conversion, and managing nested function scopes."
                      },
                      {
                        "question": "What is expression conversion using stacks?",
                        "answer": "Converting infix (A+B) to postfix (AB+) or prefix (+AB) using an operator stack with precedence rules."
                      },
                      {
                        "question": "Can you implement a stack using two queues?",
                        "answer": "Yes, by using one queue for storage and the other for dequeue-and-enqueue operations to simulate LIFO."
                      },
                      {
                        "question": "What is a balanced parentheses problem?",
                        "answer": "Using a stack to check if every opening bracket has a matching closing bracket in the correct order."
                      },
                      {
                        "question": "What is the call stack in debugging?",
                        "answer": "A stack trace showing the sequence of function calls leading to an error, helping developers trace bugs."
                      }
                    ],
                realWorldApplications: [
                      "Web Browsers: The back button uses a stack to track visited pages (each new page is pushed, back pops the top).",
                      "Undo/Redo in Editors: Text editors maintain stacks of actions for undo (pop last action) and redo functionality.",
                      "Compiler Design: Parsing expressions, evaluating postfix notation, and managing nested scopes use stacks extensively.",
                      "Operating Systems: Process scheduling and interrupt handling use stacks to save and restore processor states.",
                      "Mobile App Navigation: Android's activity back stack manages screen navigation using LIFO ordering.",
                      "Depth-First Search: Graph traversal algorithms use stacks (explicitly or via recursion) to explore paths deeply before backtracking."
                    ]
            }
        },
        {
            id: 'cs5',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['1st PUC / Class 11'], title: 'Number Systems', description: 'Binary to Decimal conversion.', difficulty: 'Easy', duration: '15 min', category: 'Basics',
            content: { 
                videoId: "LpuPe81bc2w",
                aim: "Convert bases.", requirements: ["Number"], theory: "Number systems are mathematical notations for representing numbers using digits or symbols.\n\n**Types:**\n1. Binary (Base 2): digits 0,1. Fundamental to computers.\n2. Octal (Base 8): digits 0-7. Each octal digit = 3 binary digits.\n3. Decimal (Base 10): digits 0-9. Standard system.\n4. Hexadecimal (Base 16): digits 0-9, A-F. Each hex digit = 4 binary digits.\n\n**Conversions:**\n- Decimal to Binary: Repeated division by 2.\n- Binary to Decimal: Positional multiplication and summation.\n- Binary ↔ Octal: Group in 3s.\n- Binary ↔ Hex: Group in 4s.\n\n**Complements:**\n- 1's Complement: Flip all bits.\n- 2's Complement: 1's complement + 1. Used for negative numbers.\n\n**Applications:** Binary (processors), Octal (Unix permissions), Hex (memory addresses, HTML colors).", procedure: [
              "Input a numerical value into the primary base field (e.g., Base 10 / Decimal).",
              "Select the target conversion base (e.g., Base 2 / Binary, Base 8 / Octal, Base 16 / Hexadecimal).",
              "Observe the step-by-step division process by the target base, noting the quotients and remainders at each explicit step.",
              "Read the string of remainders strictly from bottom to top (or last to first) to construct the converted value.",
              "Reverse the process by multiplying each digit of the converted string by the progressive powers of the base to verify the initial Base 10 value.",
              "Validate the conversion conceptually."
            ], objectives: ["Data representation"],
                observationTable: { columns: ["Binary", "Decimal"] },
                assignments: [
                    { id: 1, question: "Convert (110101)₂ to Decimal and Octal.", marks: 4 },
                    { id: 2, question: "Perform binary addition: 10110 + 1101.", marks: 3 },
                    { id: 3, question: "Find the 2's complement of the binary number 1011001.", marks: 3 },
                    { id: 4, question: "Convert (255)₁₀ to Binary and Hexadecimal.", marks: 4 },
                    { id: 5, question: "Explain how negative numbers are represented in computer systems.", marks: 4 }
                ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "The decimal number 10 in binary is:",
                        "options": [
                          "1010",
                          "1100",
                          "1001",
                          "0110"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 2,
                        "question": "Binary is base:",
                        "options": [
                          "8",
                          "10",
                          "16",
                          "2"
                        ],
                        "correctIndex": 3
                      },
                      {
                        "id": 3,
                        "question": "Hexadecimal is base:",
                        "options": [
                          "2",
                          "8",
                          "10",
                          "16"
                        ],
                        "correctIndex": 3
                      },
                      {
                        "id": 4,
                        "question": "The hexadecimal equivalent of decimal 255 is:",
                        "options": [
                          "EE",
                          "FF",
                          "FE",
                          "11"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "Octal number system has digits:",
                        "options": [
                          "0-9",
                          "0-7",
                          "0-F",
                          "0-1"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "1 byte equals:",
                        "options": [
                          "4 bits",
                          "8 bits",
                          "16 bits",
                          "32 bits"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "Binary 1111 equals decimal:",
                        "options": [
                          "8",
                          "16",
                          "15",
                          "14"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 8,
                        "question": "To convert decimal to binary, we repeatedly:",
                        "options": [
                          "Add 2",
                          "Divide by 2 and note remainders",
                          "Multiply by 10",
                          "Subtract 1"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "In 2's complement, -1 in 8-bit is:",
                        "options": [
                          "00000001",
                          "10000001",
                          "11111111",
                          "11111110"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 10,
                        "question": "BCD (Binary Coded Decimal) represents each decimal digit as:",
                        "options": [
                          "8 bits",
                          "4 bits",
                          "2 bits",
                          "16 bits"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "Why do computers use binary?",
                        "answer": "Because electronic circuits have two reliable states (on/off, high/low voltage), perfectly mapping to 0 and 1."
                      },
                      {
                        "question": "Convert 42 to binary.",
                        "answer": "42 = 32+8+2 = 101010 in binary."
                      },
                      {
                        "question": "What is 2's complement and why is it used?",
                        "answer": "A method for representing negative numbers in binary. It allows addition and subtraction to use the same circuit."
                      },
                      {
                        "question": "How do you convert binary to hexadecimal?",
                        "answer": "Group binary digits in sets of 4 from right to left, then convert each group to its hex equivalent."
                      },
                      {
                        "question": "What is the difference between signed and unsigned integers?",
                        "answer": "Unsigned can only represent non-negative values (0 to 2ⁿ-1). Signed uses one bit for sign, representing negative values too."
                      },
                      {
                        "question": "What is overflow in binary arithmetic?",
                        "answer": "When the result exceeds the maximum representable value for the given number of bits."
                      },
                      {
                        "question": "Why is hexadecimal commonly used in programming?",
                        "answer": "It provides a compact, human-readable representation of binary data — each hex digit represents exactly 4 bits."
                      },
                      {
                        "question": "What is ASCII?",
                        "answer": "American Standard Code for Information Interchange — a 7-bit encoding assigning numbers (0-127) to characters."
                      },
                      {
                        "question": "Explain floating-point representation.",
                        "answer": "Numbers stored as sign bit, exponent, and mantissa (IEEE 754 standard), enabling representation of very large/small decimals."
                      },
                      {
                        "question": "What is a nibble?",
                        "answer": "A group of 4 bits, representing one hexadecimal digit or values 0-15."
                      }
                    ],
                realWorldApplications: [
                      "Computer Memory Addressing: All RAM addresses are in binary/hexadecimal for efficient hardware addressing.",
                      "Web Development: Colors in CSS/HTML are specified in hexadecimal (e.g., #FF5733).",
                      "Networking: IP addresses (IPv4: 32-bit, IPv6: 128-bit) are fundamentally binary with decimal/hex notation.",
                      "Embedded Systems: Microcontroller programming requires direct binary and hex manipulation of registers.",
                      "Digital Forensics: Examining raw binary data in hex editors to recover deleted files or analyze malware.",
                      "Cryptography: Encryption algorithms operate on binary data, with keys often expressed in hexadecimal."
                    ]
            }
        },
        {
            id: 'cs6',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Linked List Operations', description: 'Insert, delete, and traverse a singly linked list.', difficulty: 'Medium', duration: '30 min', category: 'Data Structures',            content: { aim: "To implement and visualize linked list operations.", requirements: ["Computer"], theory: "A linked list stores data in nodes. Each node has data and a pointer to the next node. Operations: insert (head/tail/middle), delete, search, traverse.", procedure: [
              "Open the dynamic memory allocation visualization module.",
              "To INSERT, create a newly allocated node with a data value.",
              "Connect the new node\'s Next pointer to an existing target node or Null, and adjust the Head or previous node to point to the new node.",
              "To DELETE, locate the specific tracking pointer pointing to the target node.",
              "Update the preceding node\'s Next pointer to bypass the target node, linking it directly to the subsequent node.",
              "Dynamically deallocate the bypassed node.",
              "To TRAVERSE, start at the Head node and iteratively follow the Next pointers, processing node data, until reaching the Null pointer."
            ], objectives: ["Understand dynamic memory."],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "A linked list node contains:",
                        "options": [
                          "Only data",
                          "Data and a pointer to the next node",
                          "Only pointers",
                          "Index and data"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "The head of a linked list points to:",
                        "options": [
                          "The last node",
                          "The first node",
                          "The middle node",
                          "NULL"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 3,
                        "question": "Insertion at the beginning of a singly linked list is:",
                        "options": [
                          "O(n)",
                          "O(n²)",
                          "O(1)",
                          "O(log n)"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 4,
                        "question": "Accessing the nth element in a linked list takes:",
                        "options": [
                          "O(1)",
                          "O(log n)",
                          "O(n)",
                          "O(n²)"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 5,
                        "question": "A doubly linked list node has:",
                        "options": [
                          "One pointer",
                          "Two pointers (prev and next)",
                          "Three pointers",
                          "No pointers"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "The last node of a singly linked list points to:",
                        "options": [
                          "Head",
                          "Itself",
                          "NULL",
                          "Random node"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 7,
                        "question": "Advantage of linked list over array:",
                        "options": [
                          "Faster random access",
                          "Dynamic size and efficient insertion/deletion",
                          "Less memory usage",
                          "Simpler implementation"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "A circular linked list's last node points to:",
                        "options": [
                          "NULL",
                          "The head (first node)",
                          "Itself",
                          "Random"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "Deletion of a node (given pointer) in a linked list is:",
                        "options": [
                          "O(n) always",
                          "O(1) if pointer to previous is available",
                          "O(n²)",
                          "Impossible"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "Linked lists are used to implement:",
                        "options": [
                          "Stacks, queues, and graphs",
                          "Only arrays",
                          "Only trees",
                          "Only hash tables"
                        ],
                        "correctIndex": 0
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is a linked list?",
                        "answer": "A linear data structure where elements (nodes) are stored non-contiguously in memory, each containing data and a reference (pointer) to the next node."
                      },
                      {
                        "question": "Compare arrays and linked lists.",
                        "answer": "Arrays have O(1) random access but fixed size; linked lists have dynamic size and O(1) insertion/deletion but O(n) access."
                      },
                      {
                        "question": "What is a sentinel/dummy node?",
                        "answer": "An extra node at the start or end that simplifies boundary conditions, avoiding special cases for empty lists or head operations."
                      },
                      {
                        "question": "How do you detect a cycle in a linked list?",
                        "answer": "Using Floyd's Cycle Detection (tortoise and hare): two pointers moving at different speeds will meet if a cycle exists."
                      },
                      {
                        "question": "What is a doubly linked list's advantage?",
                        "answer": "It allows traversal in both directions and O(1) deletion when a node reference is given (no need to find previous node)."
                      },
                      {
                        "question": "How do you reverse a linked list?",
                        "answer": "Iteratively: maintain three pointers (prev, current, next) and reverse the direction of each link."
                      },
                      {
                        "question": "What is memory overhead of linked lists?",
                        "answer": "Each node requires extra memory for pointer(s), which is significant for small data elements."
                      },
                      {
                        "question": "Where is the NULL pointer in a singly linked list?",
                        "answer": "The last node's next pointer is NULL, indicating the end of the list."
                      },
                      {
                        "question": "What is a self-referential structure?",
                        "answer": "A structure that contains a pointer to another instance of the same structure type, like a linked list node."
                      },
                      {
                        "question": "Can linked lists store heterogeneous data?",
                        "answer": "In languages with void pointers or generics, yes, but typically nodes store data of the same type."
                      }
                    ],
                realWorldApplications: [
                      "Operating Systems: Process scheduling and memory management use linked lists to maintain dynamic lists of processes and free blocks.",
                      "Music Players: Playlist implementations (next/previous song) use doubly linked lists.",
                      "Web Browsers: Forward/backward navigation history can be implemented with doubly linked lists.",
                      "Blockchain: Each block contains a reference (hash) to the previous block, forming a conceptual linked list.",
                      "Image Viewers: Circular linked lists enable seamless looping through photo galleries.",
                      "Memory Allocation: Free memory blocks in heap management are tracked using linked lists (free lists)."
                    ]
            }
        },
        {
            id: 'cs7',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Queue Operations', description: 'Enqueue, Dequeue, and visualize FIFO behavior.', difficulty: 'Easy', duration: '20 min', category: 'Data Structures',            content: { aim: "To understand the Queue (FIFO) data structure.", requirements: ["Computer"], theory: "Queue follows First In First Out (FIFO). Operations: Enqueue (rear), Dequeue (front), Peek, isEmpty.", procedure: [
              "Create a Queue array with a specific maximum size to hold elements. Initialize Front and Rear pointers to -1 or 0 appropriately.",
              "To ENQUEUE, input a data item.",
              "Observe the Rear pointer incrementing and placing the item at the sequence\'s end.",
              "To DEQUEUE, request a removal.",
              "Observe the item strictly being removed from the Front pointer location, adhering to the FIFO (First In, First Out) principle, and the Front pointer incrementing.",
              "Observe circular behavior (if demonstrating a Circular Queue) where pointers wrap around using modulo arithmetic.",
              "Verify overflow (Rear meets Front logic) and underflow conditions."
            ], objectives: ["Understand FIFO principle."],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "A queue follows:",
                        "options": [
                          "LIFO",
                          "FIFO",
                          "Random",
                          "Priority"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "Enqueue adds an element to the:",
                        "options": [
                          "Front",
                          "Rear",
                          "Middle",
                          "Top"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 3,
                        "question": "Dequeue removes an element from the:",
                        "options": [
                          "Rear",
                          "Front",
                          "Middle",
                          "Bottom"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "A circular queue solves which problem of linear queue?",
                        "options": [
                          "Sorting",
                          "Memory wastage from unused front positions",
                          "Priority ordering",
                          "Random access"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "The time complexity of enqueue and dequeue is:",
                        "options": [
                          "O(n)",
                          "O(log n)",
                          "O(1)",
                          "O(n²)"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 6,
                        "question": "In a priority queue, elements are dequeued based on:",
                        "options": [
                          "Arrival order",
                          "Priority value",
                          "Random selection",
                          "Size"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "A deque (double-ended queue) allows:",
                        "options": [
                          "Insertion at both ends",
                          "Insertion and deletion at both ends",
                          "Only at front",
                          "Only at rear"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "Queue can be implemented using:",
                        "options": [
                          "Arrays only",
                          "Linked lists only",
                          "Both arrays and linked lists",
                          "Stacks only"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 9,
                        "question": "BFS (Breadth-First Search) uses:",
                        "options": [
                          "Stack",
                          "Queue",
                          "Binary tree",
                          "Hash table"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "A queue is empty when:",
                        "options": [
                          "Front > Rear",
                          "Front = Rear = -1 (or front equals rear in circular)",
                          "Rear > Front",
                          "Always"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is a queue?",
                        "answer": "A linear data structure following FIFO (First In, First Out) principle — elements are added at the rear and removed from the front."
                      },
                      {
                        "question": "Give real-world examples of queues.",
                        "answer": "People standing in line at a ticket counter, printer job queue, CPU task scheduling."
                      },
                      {
                        "question": "What is the problem with a simple linear queue?",
                        "answer": "After multiple dequeue operations, front positions become wasted space that cannot be reused without shifting all elements."
                      },
                      {
                        "question": "How does a circular queue work?",
                        "answer": "The rear wraps around to the front using modular arithmetic: (rear + 1) % size, reusing vacated positions."
                      },
                      {
                        "question": "What is the difference between a queue and a priority queue?",
                        "answer": "A regular queue serves in FIFO order; a priority queue serves the highest (or lowest) priority element first regardless of arrival."
                      },
                      {
                        "question": "How is a queue used in BFS?",
                        "answer": "BFS visits nodes level by level, enqueuing neighbors of the current node and dequeuing the next node to visit."
                      },
                      {
                        "question": "Can a queue be implemented using two stacks?",
                        "answer": "Yes — use one stack for enqueue and another for dequeue, transferring elements between them when needed."
                      },
                      {
                        "question": "What is a blocking queue?",
                        "answer": "A thread-safe queue where enqueue blocks when full and dequeue blocks when empty, used in producer-consumer patterns."
                      },
                      {
                        "question": "What is buffer management?",
                        "answer": "Queues buffer data between asynchronous producer and consumer processes (e.g., I/O buffers, streaming buffers)."
                      },
                      {
                        "question": "Explain the difference between queue and deque.",
                        "answer": "A queue allows insertion at rear and deletion at front only. A deque allows both operations at both ends."
                      }
                    ],
                realWorldApplications: [
                      "Operating System CPU Scheduling: Ready queues hold processes waiting for CPU time in round-robin and FCFS scheduling.",
                      "Print Spooling: Multiple print jobs are queued and processed in the order they were submitted.",
                      "Call Center Management: Customer calls are placed in a queue and answered in order of arrival.",
                      "Network Routers: Data packets are buffered in queues before forwarding to prevent congestion.",
                      "Simulation Systems: Event-driven simulations use priority queues to process events in chronological order.",
                      "Streaming Services: Video/audio data is buffered in queues to ensure smooth playback despite network fluctuations."
                    ]
            }
        },
        {
            id: 'cs8',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Binary Search', description: 'Search a sorted array efficiently using divide and conquer.', difficulty: 'Easy', duration: '20 min', category: 'Algorithms',            content: { aim: "To implement and visualize Binary Search algorithm.", requirements: ["Computer"], theory: "Binary Search works on sorted arrays. Compare target with middle element: if smaller go left, if larger go right. Time complexity: O(log n).", procedure: [
              "Initialize a strictly SORTED numerical array in the interface. Define the target search value (Target).",
              "The algorithm initializes Low (Start) and High (End) pointers at the array\'s boundaries.",
              "The system calculates the Mid index using Mid = (Low + High) / 2 and checks the middle element.",
              "If Target equals Mid element, search is successful, and iteration halts.",
              "If Target is less than Mid element, intuitively discard the right half by setting High = Mid - 1.",
              "If Target is greater than Mid element, discard the left half by setting Low = Mid + 1.",
              "Loop steps 3-6 until the exact target is found or Low exceeds High (signifying target is not present)."
            ], objectives: ["Understand logarithmic search."],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "Binary search requires the array to be:",
                        "options": [
                          "Unsorted",
                          "Sorted",
                          "Empty",
                          "Circular"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "The time complexity of binary search is:",
                        "options": [
                          "O(n)",
                          "O(n²)",
                          "O(log n)",
                          "O(1)"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 3,
                        "question": "Binary search divides the search space by:",
                        "options": [
                          "3",
                          "4",
                          "2 (half each time)",
                          "n"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 4,
                        "question": "If the middle element equals the target:",
                        "options": [
                          "Search continues",
                          "Search returns the middle index",
                          "Search restarts",
                          "Array is resorted"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "If target < middle element, search continues in:",
                        "options": [
                          "Right half",
                          "Left half",
                          "Both halves",
                          "Full array"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "Binary search on 1024 elements takes at most:",
                        "options": [
                          "1024 comparisons",
                          "512 comparisons",
                          "10 comparisons",
                          "100 comparisons"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 7,
                        "question": "Linear search time complexity is:",
                        "options": [
                          "O(log n)",
                          "O(n)",
                          "O(1)",
                          "O(n²)"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 8,
                        "question": "Binary search can be implemented:",
                        "options": [
                          "Only iteratively",
                          "Only recursively",
                          "Both iteratively and recursively",
                          "Neither"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 9,
                        "question": "The space complexity of iterative binary search is:",
                        "options": [
                          "O(n)",
                          "O(log n)",
                          "O(1)",
                          "O(n²)"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 10,
                        "question": "Binary search is an example of:",
                        "options": [
                          "Brute force",
                          "Divide and conquer",
                          "Greedy",
                          "Dynamic programming"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "Explain binary search step by step.",
                        "answer": "Compare target with middle element. If equal, found. If target is less, search the left half. If greater, search the right half. Repeat until found or search space is empty."
                      },
                      {
                        "question": "Why must the array be sorted for binary search?",
                        "answer": "The algorithm relies on comparing the target with the middle element to eliminate half the remaining elements — this only works if elements are ordered."
                      },
                      {
                        "question": "Compare linear search and binary search.",
                        "answer": "Linear: O(n), works on unsorted data. Binary: O(log n), requires sorted data. Binary is vastly faster for large datasets."
                      },
                      {
                        "question": "What is the recurrence relation for binary search?",
                        "answer": "T(n) = T(n/2) + O(1), which solves to T(n) = O(log n)."
                      },
                      {
                        "question": "Can binary search find the first/last occurrence?",
                        "answer": "Yes, with modifications — continue searching in the appropriate half even after finding a match to locate the boundary."
                      },
                      {
                        "question": "What happens if the array has duplicate elements?",
                        "answer": "Standard binary search finds one occurrence; modified versions can find the first or last occurrence."
                      },
                      {
                        "question": "How is binary search used in the real world?",
                        "answer": "Dictionary lookup, debugging with git bisect, finding data in sorted databases, and decision boundary search."
                      },
                      {
                        "question": "What is interpolation search?",
                        "answer": "A variant that estimates the position based on the target value distribution, achieving O(log log n) for uniformly distributed data."
                      },
                      {
                        "question": "Can binary search be applied to linked lists efficiently?",
                        "answer": "No, because linked lists lack O(1) random access to the middle element, making binary search O(n) overall."
                      },
                      {
                        "question": "What is ternary search?",
                        "answer": "A variant that divides the search space into three parts; it has O(log₃ n) comparisons but isn't faster than binary search in practice."
                      }
                    ],
                realWorldApplications: [
                      "Database Indexing: B-trees use binary search principles to efficiently locate records in massive databases.",
                      "Git Bisect: Developers use binary search to find the exact commit that introduced a bug.",
                      "Dictionary/Phone Book Search: Real-world alphabetical searching mirrors the binary search strategy.",
                      "Game AI: Binary search on sorted score arrays enables efficient leaderboard ranking and matchmaking.",
                      "Machine Learning: Hyperparameter tuning uses binary-search-like optimization to find optimal values.",
                      "Library Systems: Dewey Decimal and ISBN lookup systems conceptually apply binary search for book retrieval."
                    ]
            }
        },
        {
            id: 'cs9',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'File Handling with Python', description: 'Read and write text and binary files.', difficulty: 'Medium', duration: '40 min', category: 'Programming',            content: { aim: "To perform read and write operations on Text and Binary files using Python.", requirements: ["Computer", "Python IDE"], theory: "File handling allows persistent storage of data. Text files store data as human-readable strings (ASCII/Unicode). Binary files store data in the same format it is held in memory, typically accessed using the 'pickle' module in Python.", procedure: [
              "Open your Python IDE.",
              "To write to a Text File: Use `f = open('data.txt', 'w')`. Write data using `f.write('Hello World')` or `f.writelines()`. Close the file using `f.close()`.",
              "To read from a Text File: Use `f = open('data.txt', 'r')`. Read characters using `f.read()`, lines using `f.readline()`, or iteration over lines. Print the output.",
              "Implement a function to count the number of vowels, consonants, or words in the text file.",
              "To write to a Binary File: Import the `pickle` module. Use `f = open('data.dat', 'wb')`. Create a Python object (e.g., a dictionary or list). Use `pickle.dump(object, f)` to write to the file. Close it.",
              "To read from a Binary File: Use `f = open('data.dat', 'rb')`. Use `data = pickle.load(f)` to deserialize the object. Print the loaded data.",
              "Implement a simple search or update operation on the records within the binary file."
            ], objectives: ["Understand persistent data storage.", "Master serialization with pickle."],
            observationTable: { columns: ["Operation", "File Type", "Python Function Used", "Status"] },
            assignments: [
                { id: 1, question: "Write a Python script to read a text file and print lines starting with the letter 'A'.", marks: 5 },
                { id: 2, question: "Differentiate between `dump()` and `load()` methods of the pickle module.", marks: 3 }
            ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "To open a file in Python for reading, we use:",
                        "options": [
                          "open('file.txt', 'w')",
                          "open('file.txt', 'r')",
                          "open('file.txt', 'a')",
                          "read('file.txt')"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "The 'w' mode in file handling:",
                        "options": [
                          "Reads the file",
                          "Writes to file (creates new or overwrites)",
                          "Appends to file",
                          "Executes the file"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 3,
                        "question": "To add content without erasing existing data, use mode:",
                        "options": [
                          "'r'",
                          "'w'",
                          "'a' (append)",
                          "'x'"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 4,
                        "question": "The with statement in Python is used for:",
                        "options": [
                          "Creating loops",
                          "Automatic resource management (auto-closes file)",
                          "Defining functions",
                          "Error suppression"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "f.readlines() returns:",
                        "options": [
                          "A single string",
                          "A list of all lines in the file",
                          "The first line only",
                          "A dictionary"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "f.readline() reads:",
                        "options": [
                          "All lines",
                          "One line at a time",
                          "The entire file",
                          "A character"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "CSV stands for:",
                        "options": [
                          "Comma Separated Values",
                          "Common Standard Values",
                          "Computer System Variables",
                          "Coded Sequential Values"
                        ],
                        "correctIndex": 0
                      },
                      {
                        "id": 8,
                        "question": "Binary files in Python are opened with mode:",
                        "options": [
                          "'r'",
                          "'rb' or 'wb'",
                          "'t'",
                          "'csv'"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "To write a dictionary to a file, we commonly use:",
                        "options": [
                          "print()",
                          "json.dump()",
                          "csv.write()",
                          "os.write()"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 10,
                        "question": "The tell() method returns:",
                        "options": [
                          "File size",
                          "Current position of file pointer",
                          "Number of lines",
                          "File name"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is file handling?",
                        "answer": "The process of creating, reading, writing, and manipulating files stored on disk using programming operations."
                      },
                      {
                        "question": "Why do we need to close files after use?",
                        "answer": "To release system resources, flush buffered data to disk, and prevent data corruption or memory leaks."
                      },
                      {
                        "question": "Explain the advantage of the 'with' statement.",
                        "answer": "It automatically closes the file when the block ends, even if an exception occurs, ensuring proper cleanup."
                      },
                      {
                        "question": "What is the difference between text and binary mode?",
                        "answer": "Text mode handles encoding/decoding and newline conversion. Binary mode reads/writes raw bytes without any translation."
                      },
                      {
                        "question": "How do you handle file not found errors?",
                        "answer": "Using try-except blocks to catch FileNotFoundError and handle it gracefully."
                      },
                      {
                        "question": "What is the seek() method?",
                        "answer": "It moves the file pointer to a specific position in the file, allowing random access reading/writing."
                      },
                      {
                        "question": "What is pickling in Python?",
                        "answer": "Serializing Python objects into a byte stream for storage using the pickle module, and deserializing them back."
                      },
                      {
                        "question": "How do you read a CSV file in Python?",
                        "answer": "Using the csv module: csv.reader() creates an iterable that parses each row into a list of values."
                      },
                      {
                        "question": "What is the difference between write() and writelines()?",
                        "answer": "write() writes a single string; writelines() writes a list of strings without adding newline characters automatically."
                      },
                      {
                        "question": "What are the potential security risks of file handling?",
                        "answer": "Path traversal attacks, reading sensitive files, writing malicious content, and resource exhaustion from unclosed files."
                      }
                    ],
                realWorldApplications: [
                      "Log Management: Applications write diagnostic and error information to log files for debugging and auditing.",
                      "Data Science: Reading datasets from CSV, JSON, and XML files is fundamental to data analysis workflows.",
                      "Configuration Management: Applications store and read settings from config files (INI, YAML, JSON).",
                      "Report Generation: Business applications generate PDF, Excel, and text reports from processed data.",
                      "Backup Systems: File handling operations copy, compress, and archive critical data for disaster recovery.",
                      "Web Scraping: Scraped data is persisted to files for offline analysis and machine learning training."
                    ]
            }
        },
        {
            id: 'cs10',
    boards: ['CBSE', 'Karnataka PUC', 'ICSE'],
    standards: ['2nd PUC / Class 12'], title: 'Database Management SQL', description: 'Execute SQL queries and integrate Python with SQL.', difficulty: 'Medium', duration: '45 min', category: 'Databases',            content: { aim: "To create and manipulate relational databases using SQL and perform operations through Python.", requirements: ["Computer", "Python IDE", "MySQL Server", "mysql-connector-python module"], theory: "SQL (Structured Query Language) is used to manage relational databases. Key operations include DDL (Data Definition Language) commands like CREATE, DML (Data Manipulation Language) commands like INSERT, UPDATE, DELETE, and DQL (Data Query Language) like SELECT. Python integrates with MySQL via connectors to execute these queries dynamically.", procedure: [
              "Launch MySQL command line or IDE. Create a database using `CREATE DATABASE School;`. Use it via `USE School;`.",
              "Create a table: `CREATE TABLE Student (RollNo INT PRIMARY KEY, Name VARCHAR(50), Marks FLOAT);`.",
              "Insert records: `INSERT INTO Student VALUES (1, 'Alice', 85.5);`. Insert multiple records to populate the table.",
              "Query data: Use `SELECT * FROM Student WHERE Marks > 80;` to retrieve filtered records.",
              "Update records: `UPDATE Student SET Marks = 90 WHERE RollNo = 1;`.",
              "Now, open the Python IDE. Import `mysql.connector`.",
              "Establish a connection using `mysql.connector.connect(host='localhost', user='root', password='password', database='School')`.",
              "Create a cursor object and execute a query string: `cursor.execute(\"SELECT * FROM Student\")`.",
              "Fetch and print all records using `cursor.fetchall()`.",
              "Close the cursor and connection properly."
            ], objectives: ["Understand RDBMS concepts.", "Learn backend programming with Python."],
            observationTable: { columns: ["SQL Command", "Purpose", "Python equivalent execute string"] },
            assignments: [
                { id: 1, question: "Write an SQL query to display the names of students in descending order of their marks.", marks: 3 },
                { id: 2, question: "Write a complete Python program to insert a new student record into the MySQL database, taking inputs from the user.", marks: 5 }
            ],
                quizQuestions: [
                      {
                        "id": 1,
                        "question": "SQL stands for:",
                        "options": [
                          "Simple Query Language",
                          "Structured Query Language",
                          "Standard Question Language",
                          "Sequential Query Logic"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 2,
                        "question": "Which command creates a new table?",
                        "options": [
                          "INSERT",
                          "CREATE TABLE",
                          "ALTER",
                          "UPDATE"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 3,
                        "question": "SELECT * FROM students returns:",
                        "options": [
                          "Nothing",
                          "All rows and columns from students table",
                          "Only column names",
                          "Table structure only"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 4,
                        "question": "The WHERE clause is used to:",
                        "options": [
                          "Sort results",
                          "Filter rows based on a condition",
                          "Group data",
                          "Join tables"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 5,
                        "question": "INSERT INTO adds:",
                        "options": [
                          "New columns",
                          "New rows of data",
                          "New tables",
                          "New databases"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 6,
                        "question": "UPDATE modifies:",
                        "options": [
                          "Table structure",
                          "Existing data in rows",
                          "Column names",
                          "Database name"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 7,
                        "question": "DELETE FROM removes:",
                        "options": [
                          "Columns",
                          "The entire table",
                          "Specific rows matching a condition",
                          "The database"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 8,
                        "question": "ORDER BY sorts results in:",
                        "options": [
                          "Random order",
                          "Ascending (default) or Descending order",
                          "Insert order only",
                          "Reverse alphabetical only"
                        ],
                        "correctIndex": 1
                      },
                      {
                        "id": 9,
                        "question": "A PRIMARY KEY ensures:",
                        "options": [
                          "Null values allowed",
                          "Duplicate values allowed",
                          "Unique and non-null identification of each row",
                          "Automatic sorting"
                        ],
                        "correctIndex": 2
                      },
                      {
                        "id": 10,
                        "question": "GROUP BY is used with:",
                        "options": [
                          "INSERT statements",
                          "Aggregate functions (COUNT, SUM, AVG)",
                          "DELETE only",
                          "ALTER TABLE"
                        ],
                        "correctIndex": 1
                      }
                    ],
                vivaQuestions: [
                      {
                        "question": "What is a database?",
                        "answer": "An organized collection of structured data stored and managed electronically, typically controlled by a DBMS."
                      },
                      {
                        "question": "What is RDBMS?",
                        "answer": "Relational Database Management System — stores data in tables (relations) with rows and columns, using SQL for management."
                      },
                      {
                        "question": "Explain the difference between DDL and DML.",
                        "answer": "DDL (Data Definition Language) defines structure (CREATE, ALTER, DROP). DML (Data Manipulation Language) manages data (SELECT, INSERT, UPDATE, DELETE)."
                      },
                      {
                        "question": "What is a foreign key?",
                        "answer": "A column that creates a link between two tables by referencing the primary key of another table, enforcing referential integrity."
                      },
                      {
                        "question": "What is normalization?",
                        "answer": "The process of organizing database tables to reduce redundancy and dependency, typically into 1NF, 2NF, 3NF."
                      },
                      {
                        "question": "What are aggregate functions?",
                        "answer": "Functions that operate on sets of rows: COUNT, SUM, AVG, MAX, MIN."
                      },
                      {
                        "question": "What is a JOIN?",
                        "answer": "An operation combining rows from two or more tables based on a related column (foreign key relationship)."
                      },
                      {
                        "question": "Explain INNER JOIN vs LEFT JOIN.",
                        "answer": "INNER JOIN returns only matching rows. LEFT JOIN returns all rows from the left table, with NULLs for non-matching right rows."
                      },
                      {
                        "question": "What is an index in a database?",
                        "answer": "A data structure that speeds up data retrieval operations at the cost of additional storage and slower writes."
                      },
                      {
                        "question": "What is ACID in databases?",
                        "answer": "Atomicity, Consistency, Isolation, Durability — properties ensuring reliable database transactions."
                      }
                    ],
                realWorldApplications: [
                      "E-Commerce Platforms: Managing product catalogs, customer orders, and payment records using relational databases.",
                      "Healthcare Systems: Storing and querying patient records, prescriptions, and medical histories securely.",
                      "Banking and Finance: Transaction processing, account management, and regulatory reporting rely on SQL databases.",
                      "Social Media: User profiles, posts, friendships, and interactions are managed in massive distributed databases.",
                      "Education Management: Student information systems track grades, attendance, and enrollment using SQL queries.",
                      "Government Census: National population databases use SQL to store, query, and analyze demographic data at scale."
                    ]
            }
        }


    ]
  };
