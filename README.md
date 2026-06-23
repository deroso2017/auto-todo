# 📝 Auto Todo

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B3BE5?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

An intelligent todo application built with Next.js and React that helps you organize and manage your tasks effortlessly with an intuitive interface.

[Live Demo](https://auto-todo-two.vercel.app)

</div>

---

## 🏗️ Architecture

### Application Flow

```
┌─────────────────────────────────────────────────┐
│          User Interface (React)                 │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ Task List    │  │ Task Form    │            │
│  │ Components   │  │ Components   │            │
│  └──────────────┘  └──────────────┘            │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│       State Management & Logic                  │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ Task Hooks   │  │ Utilities    │            │
│  │ & Context    │  │ & Helpers    │            │
│  └──────────────┘  └──────────────┘            │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│      Local Storage / Data Persistence           │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  Browser Storage (JSON Data)             │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Component Architecture

```
Layout (Root)
    ├── TaskList
    │   ├── TaskItem
    │   ├── TaskItem
    │   └── TaskItem
    ├── TaskForm
    │   ├── Input Fields
    │   ├── Priority Selector
    │   └── Submit Button
    ├── TaskFilter
    │   ├── Category Filter
    │   ├── Priority Filter
    │   └── Status Filter
    └── TaskSearch
        └── Search Input
```

---

## 📁 Project Structure

```
auto-todo/
│
├── 📂 app/
│   ├── layout.tsx                       # Root layout
│   ├── page.tsx                         # Home page
│   └── globals.css                      # Global styles
│
├── 📂 components/
│   ├── TaskItem.tsx                     # Individual task
│   ├── TaskList.tsx                     # Task container
│   ├── TaskForm.tsx                     # Add/edit form
│   ├── TaskFilter.tsx                   # Filter controls
│   └── TaskSearch.tsx                   # Search component
│
├── 📂 types/
│   ├── task.ts                          # Task interface
│   └── index.ts                         # Type exports
│
├── 📂 mock/
│   └── tasks.ts                         # Sample data
│
├── 📂 public/
│   └── Static assets
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.js
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|:---------|:-----------|:-------:|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?logo=next.js) | 16.2.9 |
| **UI Library** | ![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react) | 19.2.4 |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) | ^5 |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.1-06B6D4?logo=tailwindcss) | 4.3.1 |
| **Linting** | ![ESLint](https://img.shields.io/badge/ESLint-9-4B3BE5?logo=eslint) | ^9 |
| **Processing** | ![PostCSS](https://img.shields.io/badge/PostCSS-8.5.15-DD3A0A?logo=postcss) | 8.5.15 |

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/deroso2017/auto-todo.git
cd auto-todo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

---

## ✨ Key Features

- ✅ Create, edit, and delete tasks
- 📅 Set due dates for tasks
- 🎯 Priority levels (Low, Medium, High)
- 🏷️ Task categories and tags
- 🔍 Search and filter tasks
- 💾 Local data persistence
- 📱 Responsive design
- ⚡ Fast performance with Next.js

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
