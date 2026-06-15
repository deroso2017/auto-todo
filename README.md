# 📝 Auto Todo

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

An intelligent todo application built with Next.js, React, and TypeScript that helps you organize and manage your tasks effortlessly.

[Live Demo](https://auto-todo-two.vercel.app)

</div>

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
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   ├── TaskForm.tsx
│   ├── TaskFilter.tsx
│   └── TaskSearch.tsx
│
├── 📂 types/
│   ├── task.ts
│   └── index.ts
│
├── 📂 mock/
│   └── tasks.ts
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

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.
