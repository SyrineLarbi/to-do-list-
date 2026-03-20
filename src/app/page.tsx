"use client";

import { useEffect, useState } from "react";
import { Project, Task, TaskStatus } from "@/lib/types";
import { loadProjects, saveProjects } from "@/lib/storage";
import ProjectSidebar from "@/components/ProjectSidebar";
import TaskList from "@/components/TaskList";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const loaded = loadProjects();
    setProjects(loaded);
    if (loaded.length > 0) {
      setActiveProjectId(loaded[0].id);
    }
    setMounted(true);
  }, []);

  function persist(updated: Project[]) {
    setProjects(updated);
    saveProjects(updated);
  }

  function handleCreateProject(name: string) {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      tasks: [],
      createdAt: Date.now(),
    };
    const updated = [...projects, newProject];
    persist(updated);
    setActiveProjectId(newProject.id);
  }

  function handleDeleteProject(id: string) {
    const updated = projects.filter((p) => p.id !== id);
    persist(updated);
    if (activeProjectId === id) {
      setActiveProjectId(updated.length > 0 ? updated[0].id : null);
    }
  }

  function handleAddTask(title: string) {
    if (!activeProjectId) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: "not-started",
      createdAt: Date.now(),
    };
    const updated = projects.map((p) =>
      p.id === activeProjectId ? { ...p, tasks: [...p.tasks, newTask] } : p
    );
    persist(updated);
  }

  function handleUpdateTaskStatus(taskId: string, status: TaskStatus) {
    if (!activeProjectId) return;
    const updated = projects.map((p) =>
      p.id === activeProjectId
        ? { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)) }
        : p
    );
    persist(updated);
  }

  function handleDeleteTask(taskId: string) {
    if (!activeProjectId) return;
    const updated = projects.map((p) =>
      p.id === activeProjectId
        ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
        : p
    );
    persist(updated);
  }

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null;

  if (!mounted) return null;

  function handleSelectProject(id: string) {
    setActiveProjectId(id);
    setSidebarOpen(false);
  }

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Mobile hamburger button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 border border-gray-700 text-orange-400 cursor-pointer"
        aria-label="Open sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <ProjectSidebar
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={handleSelectProject}
        onCreateProject={handleCreateProject}
        onDeleteProject={handleDeleteProject}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {activeProject ? (
          <TaskList
            project={activeProject}
            onAddTask={handleAddTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2 pt-14 md:pt-0">
            <p className="text-xl">No project selected</p>
            <p className="text-sm text-center">Type a project name in the sidebar and press <strong className="text-orange-400">Enter</strong> to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}
