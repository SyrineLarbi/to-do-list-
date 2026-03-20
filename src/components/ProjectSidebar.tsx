"use client";

import { useState } from "react";
import { Project } from "@/lib/types";

interface ProjectSidebarProps {
  projects: Project[];
  activeProjectId: string | null;
  onSelectProject: (id: string) => void;
  onCreateProject: (name: string) => void;
  onDeleteProject: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectSidebar({
  projects,
  activeProjectId,
  onSelectProject,
  onCreateProject,
  onDeleteProject,
  isOpen,
  onClose,
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
    <aside
      className={`
        w-64 bg-gray-900 border-r border-gray-800 h-screen flex flex-col shrink-0
        fixed inset-y-0 left-0 z-40 transition-transform duration-200 ease-in-out
        md:static md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-orange-400 uppercase tracking-wide">Projects</h2>
        <button
          onClick={onClose}
          className="md:hidden p-1 text-gray-400 hover:text-gray-200 cursor-pointer"
          aria-label="Close sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-b border-gray-800">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New project name + Enter"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </form>

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
    </aside>
  );
}
