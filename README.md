# 🎧 Echo — Mood & Memory Music App

## 🧠 Problem Statement

In today’s fast-paced digital world, people often experience emotions without reflecting on them. Memories tied to music, places, and moments are scattered across platforms and not meaningfully preserved.

**Echo** solves this problem by providing a centralized platform where users can:

* Express their current mood through music
* Capture personal memories with photos, notes, and songs
* Revisit emotional moments through a timeline of experiences

This helps users build emotional awareness and preserve meaningful life moments in a more immersive and personal way.

---

## ✨ Features

### 🎭 Mood-Based Music Board

* Pinterest-style grid of moods (Happy, Sad, Focused, Nostalgic, etc.)
* Each mood opens a **vibe board** with:

  * Dynamic gradient background
  * Embedded Spotify playlist
* Users can create custom moods with their own playlists

---

### 📸 Memory Journal

* Users can:

  * Upload an image
  * Select a mood
  * Add a personal note
  * Attach a Spotify playlist
* Memories are displayed as visual cards in a timeline/grid
* Each memory becomes a **music-linked emotional snapshot**

---

### 🔐 Authentication System

* User signup and login using Firebase Authentication
* Protected routes (memory page accessible only when logged in)

---

### 📊 Personalized Experience

* Each user has their own stored memories
* Data persists across sessions

---

## 🛠️ Tech Stack

### Frontend

* React (Functional Components)
* React Router
* Context API (Global state management)
* Tailwind CSS (UI styling)

### Backend / Services

* Firebase Authentication
* Firebase Firestore (for storing user data)
* Firebase Storage (for image uploads)

### Integrations

* Spotify Embed API (for music playback)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/echo-app.git
cd echo-app
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Setup Firebase

1. Go to https://firebase.google.com/

2. Create a new project

3. Enable:

   * Authentication → Email/Password
   * Firestore Database
   * Storage

4. Copy your Firebase config and create:

```bash
/src/services/firebase.js
```

Paste your config:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

### 4. Run the App

```bash
npm run dev
```

---

## 📌 Future Improvements

* Mood analytics dashboard
* AI-based mood detection
* Social sharing of memory cards
* Music recommendations based on history

---

## 🎥 Demo

(Add your demo video link here)

---

## 🌐 Live Deployment

https://echoapp-six.vercel.app/

---

## 👨‍💻 Author

Akshara Jain
GitHub: https://github.com/ARMedAndCurious

---

## 💡 Final Note

This project was built as part of a React web development course to demonstrate:

* Strong React fundamentals
* Real-world problem solving
* Backend integration
* UI/UX design thinking

---
