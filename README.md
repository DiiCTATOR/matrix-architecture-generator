# Matrix — Offline Architecture Generator

A lightning-fast, fully offline, AI-powered AWS architecture diagram generator with a highly interactive UI and accurate drag-and-drop mechanics.

## Features

- **Blazing Fast Local Engine** — Parse plain-English prompts into architecture diagrams instantly on your own machine. No APIs, no internet, no server required!
- **Interactive Canvas** — Full drag-and-drop interactivity! Select nodes, freely reposition them around the board, and watch the connections dynamically re-route.
- **Canvas Panning** — Infinite interactive scrolling with the `Pan` tool to navigate over large-scale architectures.
- **Share Links** — Generate Base64-encoded, stateless shareable URLs to instantly share boards without needing a backend database.
- **30+ Official AWS Icons** — Complete utilization of the `aws-react-icons` set for high-fidelity exact matches of standard AWS documentation (EC2, Lambda, S3, RDS, CloudFront, WAF, etc).
- **Matrix Dark Mode** — Immersive, cyberpunk-inspired glowing green typography, watermarking, and split-pane view.
- **Smart Routing** — Smooth Bézier edge-to-edge connections that stick to components as you drag them.
- **Export SVG** — Export the live rendering into vector graphics at any time.

---

## Running Locally (Vite Dev Server)

```bash
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Usage

1. Type your architecture in the left panel 
   (e.g., `User → WAF → CloudFront → API Gateway → Lambda → DynamoDB. SQS to ECS.`)
2. Click **✦ Generate Diagram** 
3. Switch between **pan** and **select** tools to interact with your diagram.
4. Export as SVG or Share the generated copy link.

## Project Structure

```
matrix-architect/
├── App.jsx             ← Application logic (NLP parser, Diagram rendering, Layout, Mouse interactions)
├── main.jsx            ← React entry point
├── index.html          ← Vite HTML template
├── vite.config.js
├── package.json
└── README.md
```

## Tech Stack

- **React 18** + **Vite 5**
- **aws-react-icons** — Official SVG icons
- **Pure SVG Rendering** — Zero diagramming library dependencies
- **Inter + Google Fonts** — Matrix UI

## Build for Production

```bash
npm run build   # outputs to dist/
npm run preview # preview production build
```
