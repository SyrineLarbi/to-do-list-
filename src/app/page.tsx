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

  return (
    <div className="flex h-screen bg-gray-950">
      <ProjectSidebar
        projects={projects}
        activeProjectId={activeProjectId}
        onSelectProject={setActiveProjectId}
        onCreateProject={handleCreateProject}
        onDeleteProject={handleDeleteProject}
      />
      <main className="flex-1 p-8 overflow-y-auto">
        {activeProject ? (
          <TaskList
            project={activeProject}
            onAddTask={handleAddTask}
            onUpdateTaskStatus={handleUpdateTaskStatus}
            onDeleteTask={handleDeleteTask}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
            <p className="text-xl">No project selected</p>
            <p className="text-sm">Type a project name in the sidebar and press <strong className="text-orange-400">Enter</strong> to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}
