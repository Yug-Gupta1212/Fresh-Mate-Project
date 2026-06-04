# 🥦 Fresh Mate — fFood Shelf Life Monitor

> Know what's fresh. Waste less. Eat better.
> Fresh Mate tracks your food's shelf life in real time so you never have to guess again..

---

## 📸 About the Project

Fresh Mate is an intelligent food freshness monitoring app that helps you track expiry dates, monitor shelf life, and reduce food waste — powered by ML models that analyze food freshness from images and data.

Whether it's leftovers in the fridge or packaged goods in the pantry, Fresh Mate keeps you informed before it's too late.

---

## ✨ Features

- 📅 **Shelf Life Tracking** — Add food items with purchase/expiry dates and monitor their freshness countdown
- 🤖 **ML-Powered Freshness Detection** — Uses machine learning models to predict food freshness
- 🔔 Expiry Alerts — Get notified before food goes bad
- 📊 Freshness Dashboard — Visual overview of all your food items and their status
- 🗂️ Category Management — Organize items by type (dairy, produce, meat, etc.)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React** | UI framework |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tooling & dev server |
| **Tailwind CSS** | Utility-first styling |
| **shadcn/ui** | UI component library |
| **ML Models** | Food freshness prediction |

---

## 🚀 Getting Started with (VS Code / Local Development)

### Prerequisites

Make sure you have **Node.js** and **npm** installed.
> Recommended: install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```bash
# Verify installations
node --version
npm --version
```

---

### Step 1 — Clone the Repository

```bash
git clone <YOUR_GIT_URL>
```

> Replace `<YOUR_GIT_URL>` with the actual Git URL from your repository settings.

---

### Step 2 — Open in VS Code

```bash
cd <YOUR_PROJECT_NAME>
code .
```

> Replace `<YOUR_PROJECT_NAME>` with your actual folder name after cloning.

---

### Step 3 — Install Dependencies

```bash
npm install
```

---

### Step 4 — Start the Development Server

```bash
npm run dev
```

The app will be live at **http://localhost:8080** (or whichever port Vite assigns).
It supports **hot module reloading** — changes reflect instantly without a full refresh.

---

## 🧰 Other Ways to Edit

### ✏️ Edit Directly on GitHub
1. Navigate to any file in the repository
2. Click the **pencil icon** (Edit) at the top right
3. Make your changes and commit

### ☁️ GitHub Codespaces
1. Go to the repository's main page
2. Click the green **Code** button → **Codespaces** tab
3. Click **New codespace**
4. Edit files in the browser-based VS Code environment and push when done

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy.

---

## 🌐 Deployment

This project is deployed via **Lovable**:

1. Open the [Lovable Project](https://lovable.dev/projects/be18a657-cc9a-48e5-ab3b-a8e5ff2dd2c5)
2. Click **Share → Publish**

### Custom Domain
To connect your own domain:
- Go to **Project → Settings → Domains → Connect Domain**
- See: [Lovable Custom Domain Docs](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## 📁 Project Structure

```
fresh-mate/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route-level page components
│   ├── models/         # ML model integrations
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── main.tsx        # App entry point
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">
  Made with ❤️ to fight food waste · <strong>Fresh Mate</strong>
</div>
