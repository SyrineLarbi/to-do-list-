"use client";

import { useState } from "react";
import { Project } from "@/lib/types";

interface ProjectSidebarProps {
  projects: Project[];
  activeProjectId: string | null;
  onSelectProject: (id: string) => void;
  onCreateProject: (name: string) => void;
  onDeleteProject: (id: string) => void;
}

export default function ProjectSidebar({
  projects,
  activeProjectId,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onCreateProject(trimmed);
    setName("");
  }

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-orange-400 uppercase tracking-wide">Projects</h2>
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        {projects.length === 0 && (
          <p className="text-gray-600 text-sm p-2 italic">No projects yet</p>
        )}
        {projects.map((project) => (
          <div
            key={project.id}
            className={`group flex items-center justify-between rounded-lg cursor-pointer ${
              project.id === activeProjectId
                ? "bg-orange-500/20 text-orange-400"
                : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            <button
              onClick={() => onSelectProject(project.id)}
              className="flex-1 text-left px-3 py-2 text-sm font-medium truncate cursor-pointer"
            >
              {project.name}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteProject(project.id);
              }}
              className="hidden group-hover:block px-2 py-1 text-xs text-red-400 hover:text-red-300 cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </nav>

      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-800 flex flex-col gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New project..."
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="w-full px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 cursor-pointer"
        >
          + Create Project
        </button>
      </form>
    </aside>
  );
}
