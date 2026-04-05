<h1 align="center">🔬 Vijnana Lab — Experience Science</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
   <img src="https://img.shields.io/badge/Express_Gemini_2.0-orange?logo=google&logoColor=white" alt="Gemini AI">
  <img src="https://img.shields.io/badge/Graphics-React_Three_Fiber-black?logo=three.js&logoColor=white" alt="R3F">
  <img src="https://img.shields.io/badge/Auth-Firebase-FFCA28?logo=firebase&logoColor=black" alt="Firebase">
</p>

<p align="center">
  <b>Democratizing high-fidelity science laboratory education for Class 11 & 12 students across Bharat.</b>
</p>

---

## 🚩 Problem Statement
In the current educational landscape of Bharat, millions of students in rural or under-funded Pre-University colleges lack access to functional physics and chemistry laboratories. Equipment like Vernier Calipers, Spectrometers, or Titration setups are often broken, missing, or one-of-a-kind, leading to **"Rote Learning"**—where students memorize practicals without ever touching the apparatus.

## 💡 Proposed Solution
**Vijnana Lab** provides a high-fidelity, interactive, and safe virtual sandbox for scientific discovery. By leveraging **WebGL (React Three Fiber)** and **Physics Engines**, we bring the laboratory to the student's smartphone or PC.

- **Immersive 3D Manipulation**: Touch or mouse-driven interaction with high-precision instruments.
- **AI-Guided Discovery**: A Gemini 2.0-powered assistant that tracks experiment state and provides contextual hints.
- **Teacher-Led Governance**: A robust role-based dashboard for educators to track class-wide progress.
- **Zero Barrier to Entry**: Works in any browser without expensive hardware.

---

## 🏗 System Architecture

```text
Student / Teacher
   |
   v
React 19 Frontend
   |-- 3D Simulation Engine (React Three Fiber)
   |-- Floating AI Mentor
   |-- Firebase Authentication
   |
   v
Express API Server
   |-- Gemini 2.0 Flash AI
   |-- Custom Role Claims
   |-- Optional MongoDB Storage
```

---

## 📂 Project Structure

```bash
vijnana_lab_ai/
├── components/          # Reusable UI and lab modules
├── data/                # Subject and content datasets
├── pages/               # Route-level screens and dashboards
├── scripts/             # Admin / role-claim utilities
├── server/              # Express API, config, routes, and models
├── services/            # Client-side auth, API, and state logic
├── public/              # Static assets
└── App.tsx              # Main routing and role guards
```

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Core** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS v4 (Glassmorphism), Framer Motion |
| **3D Rendering** | Three.js, React Three Fiber, Drei |
| **Intelligence** | Gemini 2.0 Flash AI (via Secure Backend Proxy) |
| **Identity** | Firebase Authentication + Custom Role Claims |
| **Database** | Cloud Firestore + optional MongoDB (Mongoose) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0 or higher)
- **Git**
- **Firebase Project** (with Service Account Key)

### Installation

1. **Clone the Project**
   ```bash
   git clone https://github.com/mahi-2-ron/vijnana_lab_ai.git
   cd vijnana_lab_ai
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root:
   ```env
   GEMINI_API_KEY=your_google_ai_key
   MONGO_URI=your_mongodb_connection_string
   SERVER_PORT=5000
   ```
   `MONGO_URI` is optional; the server will start without MongoDB if you are using the Firebase-only flow.
   *Note: Ensure `scripts/serviceAccountKey.json` is present for Firebase Admin/RBAC features.*

4. **Launch the Full-Stack Portal**
   ```bash
   npm run dev:full
   ```
   - **Frontend**: http://localhost:5173
   - **Backend Health**: http://localhost:5000/api/health

---


## 🛡 License & Team
Vijnana Lab is developed by **Team Supra** for the Hackolympic Innovation Challenge. All rights reserved.
