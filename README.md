# STACKYR — “Stacking Intelligence”
### Premium Autonomous Venture Ecosystem & High-Velocity Infrastructure

Stackyr is a complete, production-ready MERN web application built strictly with **JavaScript (React 18 + Node.js/Express + MongoDB with local resilient fallback)**, featuring a cinematic dark UI, animated brand ecosystem, dedicated WEBIND flagship platform showcase, and an advanced 6-step Admin Management Console.

---

## ⚡ Key Highlights & Architecture

### 1. Public Ecosystem Website
- **Cinematic Animated Hero Section**:
  - Live interactive HTML5 Canvas synaptic particle network.
  - Official Stackyr 3D stacked geometric ribbon logo mark.
  - Typography reveal: *“Stacking Intelligence. Engineering the Frontiers.”*
  - 3-Layer Interactive Stacking Matrix (Application Mesh, Sovereign Data Fabric, Bare-Metal Silicon).
  - Real-time telemetry counter pills.
- **Interactive Brand Ecosystem**:
  - Dynamic filter chips: *All, AI & Autonomous Systems, Web Infrastructure & Cloud, Security & Sovereign Data, Data Intelligence, Creative Tech*.
  - Instant live keyword search bar across names, descriptions, and services.
  - Grid View & Compact List View toggle.
  - 3D interactive tilt cards with mouse coordinate tracking and glowing accent borders.
  - Interactive **Brand Detail Modal** with full architecture specs, benchmark telemetry, and social links.
- **Featured Venture Spotlight**:
  - Interactive multi-brand carousel showcasing flagship ventures like *WEBIND by Stackyr* and *KRONIX AI*.
- **WEBIND by Stackyr Flagship Showcase**:
  - Dedicated architecture section highlighting next-gen edge computing, V8 WASM runtime, and dynamic neural asset compilation.
  - Interactive Mesh Topology vs V8 WASM Config switcher with simulated node telemetry.
- **Capabilities Architecture (Bento Grid)**:
  - 6 foundational pillars: *Autonomous Multi-Agent Orchestration, Distributed Edge Infrastructure, Hyper-Velocity Web (WEBIND), Exabyte Vector Fabrics, Zero-Knowledge Defense, Neural Procedural Synthesis*.
- **Story, Ethos & Vision**:
  - Explains the philosophy of collective compounding intelligence, mission, vision, and core pillars.
- **Stealth Incubation Pipeline (Coming Soon)**:
  - Encrypted repository cards with waitlist request modal and automated registration.
- **Partner & Venture Dialogue**:
  - Interactive inquiry transmission form with instant database storage and notification feedback.

---

### 2. High-End Admin Ecosystem Console
Accessible via the **Admin Portal** button in the navbar or at `#admin`:
- **6-Step Animated Venture Builder**:
  - **01 — Brand Identity**: Name, Tagline, Category, Accent Color with 8 presets & color picker.
  - **02 — Content**: In-depth description, Deployment status (Active/Draft/Archived), Featured Pillar toggle, Stealth toggle, Sort order.
  - **03 — Services**: Dynamic tag manager with remove pills, Telemetry benchmark specs (Label & Value pairs).
  - **04 — Links**: Website URL, Twitter/X, LinkedIn, GitHub, Discord.
  - **05 — Design Assets**: Drag-and-drop logo upload, live preview, or one-click selection of pre-loaded Stackyr assets.
  - **06 — Preview & Publish**: Renders the **exact live interactive BrandCard** in real time before publishing to the ecosystem.
- **Venture Catalog Manager**:
  - Search, filter by category, instant order repositioning (Move Up / Down), quick toggle for Featured and Stealth, edit and delete with confirmation dialogs.
- **Site Content CMS**:
  - Section Enable/Disable toggles: Turn on/off Hero, Featured, Ecosystem, WEBIND, Capabilities, Story, Stealth, or Dialogue with one click.
  - Real-time text editor for headlines, subheadings, taglines, button labels, and contact emails.
- **Visual Assets Hub**:
  - Manage, preview, and replace official dark & light Stackyr logos, symbol icons, and banners.
- **Dialogue & Inquiries Desk**:
  - Review messages and waitlist requests sent from the public website.
- **Live Preview Mode**:
  - Test website modifications in a live preview mode with a sticky control bar before publishing.

---

## 🔑 Default Administrator Credentials
- **Email:** `admin@stackyr.io`
- **Passphrase:** `stackyr2026!`
*(A 1-click credential auto-fill button is also provided on the login modal for convenience).*

---

## 🚀 How to Run the Application

### Prerequisites
- Node.js (v18+) & npm

### Starting the Servers

1. **Start the Backend API Server**:
   ```powershell
   cd server
   npm run dev
   ```
   *Runs on `http://localhost:5000` (auto-connects to MongoDB or falls back to the embedded JSON persistence engine).*

2. **Start the Frontend Client**:
   ```powershell
   cd client
   npm run dev
   ```
   *Runs on `http://localhost:5173` with proxy to backend.*

---

## 📂 Project Structure
```
d:/stackyr/
├── client/                      # React 18 frontend (Vite + JavaScript)
│   ├── public/                  # Processed transparent logos, favicons
│   │   ├── stackyr-full-dark.png
│   │   ├── stackyr-icon-dark.png
│   │   ├── stackyr-full-light.png
│   │   ├── stackyr-icon-light.png
│   │   ├── favicon.ico / favicon.png
│   │   └── originals/           # Master original logos
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/           # AdminLayout, BrandFormModal (6-Step), BrandManager, ContentManager, AssetsManager, InquiriesManager, AdminDashboard, AdminLogin
│   │   │   ├── common/          # Navbar, Footer, BrandCard (3D tilt), BrandDetailModal
│   │   │   └── public/          # HeroSection, FeaturedSection, EcosystemSection, WebindSection, CapabilitiesSection, StoryVisionSection, ComingSoonSection, ContactSection
│   │   ├── context/             # AuthContext, ToastContext
│   │   ├── services/            # api.js client
│   │   ├── App.jsx              # Main App orchestrator
│   │   ├── index.css            # Master dark theme tokens, glassmorphism & keyframes
│   │   └── main.jsx
│   └── vite.config.js
│
├── server/                      # Node.js + Express backend
│   ├── src/
│   │   ├── config/              # db.js (MongoDB + persistent fallback engine)
│   │   ├── controllers/         # brandController, contentController, authController, analyticsController
│   │   ├── middleware/          # auth.js, upload.js (Multer)
│   │   ├── models/              # Brand.js, Content.js, User.js
│   │   ├── routes/              # brandRoutes, contentRoutes, authRoutes, analyticsRoutes, uploadRoutes
│   │   ├── seed/                # seedData.js (initial brands, WEBIND, KRONIX, CYBERMESH, site content)
│   │   └── server.js            # Express server entry point
│   ├── uploads/                 # Uploaded brand logos & assets
│   └── data/                    # Persistent local db.json store
└── package.json
```
