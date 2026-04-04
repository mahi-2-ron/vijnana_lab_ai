# Vijnana Lab  - Experience Science 🔬

**Vijnana Lab** is a next-generation virtual science laboratory tailored for Pre-University (Class 11 & 12) students across CBSE, ICSE, and Karnataka PUC boards. It transforms traditional science practical learning through immersive 3D simulations, real-world interactivity, and context-aware artificial intelligence.

## ✨ Key Features Built

### 1. Robust Role-Based Access Control (RBAC)
- **Firebase Custom Claims**: Securely segregates user authorizations directly parsed in identity tokens, avoiding front-end bypasses.
- **Dedicated Portals**:
  - **Superadmin Dashboard**: Advanced interface to provision faculty, track platform statistics, and assign subjects safely.
  - **Teacher Dashboard**: Secure, dedicated view for instructors.
  - **Student Dashboard**: Individualized sandbox mapping and progress tracking.

### 2. Secure Backend API Integrations
- **Privileged Server Routes**: Created dedicated Express endpoints (e.g., `/api/users/create-teacher`) using the **Firebase Admin SDK**. This securely abstracts the user creation pipeline for roles like 'Teacher', overriding client-side state collisions and `firestore.rules` rejections.
- **Isolated Database Architectures**: The backend handles **MongoDB** connections gracefully. If a local instance (`127.0.0.1:27017`) is failing or absent, the server logs a warning and proceeds without crashing, ensuring Firebase-powered endpoints remain 100% accessible.

### 3. Interactive 3D Modals & AI Integration
- **Immersive Labs**: Fully functional WebGL-based laboratory experiments built in React Three Fiber (e.g., Vernier Calipers, Spherometer, Prism).
- **Floating AI Tutor**: A globally accessible, draggable AI widget. It communicates via a **Secure Backend Proxy** to Gemini 2.0 Flash (`@google/genai`), ensuring your API Key is never exposed to the client. It detects exactly which lab experiment you have open and anchors its guidance to that specific syllabus.

### 4. Responsive & Polished UI Design
- **Glass-morphism Concepts**: The application uses high-end, premium glassy components for a futuristic "Lab" feel.
- **Framer Motion Elements**: Includes micro-animations and smooth layout transitions (such as title locale-cycling in the Navigation Bar) for elevated user engagement.

---

## 💻 Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS (v4), Framer Motion, React-Router
- **Backend**: Node.js, Express, TSX, Cors
- **Database / Auth**: Firebase (Authentication & Cloud Firestore), MongoDB (Mongoose)
- **3D Graphics**: Three.js, React Three Fiber (`@react-three/fiber`), Drei
- **Artificial Intelligence**: `@google/genai` (Gemini 2.0 Flash) - *Integrated via Secure Backend Proxy*

---

## 🛠 Run Locally

**Prerequisites:** Node.js (v18+), Git. (MongoDB instance is purely optional based on module usage).

1. **Clone the repository:**
   ```bash
   git clone https://github.com/srujanpalled/vijnana-lab.git
   cd vijnana-lab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   MONGO_URI=mongodb://127.0.0.1:27017/vijnanalab # (Optional)
   SERVER_PORT=5000
   ```
   *Ensure you have `scripts/serviceAccountKey.json` initialized for Firebase Admin privileges locally.* 

4. **Start the Complete Full-Stack Environment:**
   Run both the frontend (Vite) and backend (Express) concurrently:
   ```bash
   npm run dev:full
   ```
   *Frontend is usually mapped to `http://localhost:3000` while Express serves API calls at `http://localhost:5000`.*

---
## 🤝 Contribution (Hackolympic)
This codebase is part of the `vijnana_lab_hackolympic-` submission. All features, UI upgrades, and 3D implementations are designed to elevate digital education accessibility!

> Developed by Team Supra.
