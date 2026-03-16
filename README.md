# To-Do List

A simple per-project reading tracker to manage files and tasks you need to read. Dark theme with orange accents.

**Live demo:** [https://to-do-list-theta-seven-74.vercel.app/]

## Features

- **Per-project task lists** — create multiple projects, each with its own set of tasks
- **Status tracking** — each task has a status: Not Started, In Progress, or Done
- **Color-coded badges** — gray (not started), orange (in progress), green (done)
- **Archive section** — completed tasks move to a "Done / Archive" list
- **Persistent storage** — all data saved in browser localStorage (no account needed)
- **Dark theme** — easy on the eyes with orange accent colors

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- localStorage for persistence

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

1. Type a project name in the sidebar and press **Enter** to create it
2. Add tasks using the input field in the main area
3. Click **Start Reading** to mark a task as in progress
4. Click **Mark Done** to move it to the archive
5. Click **Reopen** on archived tasks to bring them back
