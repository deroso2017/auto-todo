# 📝 Auto Todo

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![ESLint](https://img.shields.io/badge/ESLint-9-4B3BE5?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

An intelligent todo application with auto-delete functionality. Click an item to move it to a category and watch it auto-return after 5 seconds!

[Live Demo](https://auto-todo-two.vercel.app)

</div>

---

## 🎯 How It Works

**Click item → moves to category → returns after 5s**

This unique Kanban-style board lets you organize items into categories with automatic reset functionality.

---

## 🏗️ Architecture

### Application Flow

```
┌─────────────────────────────────────────────────┐
│          User Interface (React)                 │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ TodoBoard    │  │ Column       │            │
│  │ (Kanban)     │  │ (Category)   │            │
│  └──────────────┘  └──────────────┘            │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│       State Management & Logic                  │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ Status       │  │ Auto-delete  │            │
│  │ Management   │  │ Timer (5s)   │            │
│  └──────────────┘  └──────────────┘            │
└─────────────────────────────────────────────────┘
```

### Component Hierarchy

```
RootLayout
├── Navbar
└── Page
    └── TodoBoard (Client)
        ├── Column (Main List)
        │   └── TodoItem[] (Fruit & Vegetable)
        ├── Column (Fruit)
        │   └── TodoItem[] (Active Fruits)
        └── Column (Vegetable)
            └── TodoItem[] (Active Vegetables)
```

### Data Flow Diagram

```
User Click
    ↓
TodoItem.onClick()
    ↓
moveToCategory(id)
    ↓
Update todos state (status: "active")
    ↓
Set 5s Timer
    ↓
Timer Expires
    ↓
returnToMain(id)
    ↓
Update todos state (status: "main")
    ↓
UI Re-renders
```

---

## 📁 Project Structure

```
auto-todo/
│
├── 📂 app/
│   ├── layout.tsx                       # Root layout with Navbar
│   ├── page.tsx                         # Main page (TodoBoard)
│   └── globals.css                      # Global styles
│
├── 📂 components/
│   ├── TodoBoard.tsx                    # Main Kanban board container
│   ├── Column.tsx                       # Category column component
│   ├── TodoItem.tsx                     # Individual todo item
│   ├── UserData.tsx                     # User data aggregator
│   └── Navbar.tsx                       # Navigation bar
│
├── 📂 types/
│   ├── todo.ts                          # Todo interface
│   ├── column.ts                        # Column props interface
│   ├── user.ts                          # User interface
│   ├── groupedUsers.ts                  # Grouped users interface
│   └── accumulatorGroup.ts              # Accumulator group interface
│
├── 📂 mock/
│   └── todos.ts                         # Mock todo data
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
| **DOM Rendering** | ![React DOM](https://img.shields.io/badge/React%20DOM-19.2.4-61DAFB?logo=react) | 19.2.4 |
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
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint code quality checks
```

---

## ✨ Key Features

- 🎯 **Kanban Board** - Organize todos into Main, Fruit, and Vegetable categories
- ⏱️ **Auto-Delete** - Items automatically return to main list after 5 seconds
- 🏷️ **Type Categorization** - Each item is categorized as Fruit or Vegetable
- 📊 **Counter Badges** - See item count in each column
- 🎨 **Beautiful UI** - Modern dark theme with gradient accents
- ⚡ **Fast Performance** - Built with Next.js and optimized React
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌙 **Dark Mode** - Easy on the eyes with dark theme by default
- 👥 **User Data** - Includes user data aggregation component

---

## 🎨 UI Components

### TodoBoard
Main container that manages the Kanban board state and logic.
- Handles todo state with React hooks
- Manages 5-second auto-return timers
- Filters todos by status and type

### Column
Reusable column component for each category.
- Displays category title
- Shows item count
- Renders todo items

### TodoItem
Individual todo item component.
- Displays item name and type badge
- Color-coded badges (Emerald for Fruit, Orange for Vegetable)
- Clickable for category movement

---

## 🎯 Use Cases

- **Task Organization** - Organize items by category
- **Quick Sorting** - Rapidly categorize items with auto-reset
- **Data Demonstration** - Shows user data aggregation capabilities
- **Learning Project** - Perfect for learning Next.js and React patterns

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
