import { Task, TaskStatus } from "@/lib/types";
import StatusBadge from "./StatusBadge";

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

const actionConfig: Record<TaskStatus, { label: string; next: TaskStatus; classes: string }> = {
  "not-started": { label: "Start Reading", next: "in-progress", classes: "bg-orange-500 hover:bg-orange-600 text-white" },
  "in-progress": { label: "Mark Done", next: "done", classes: "bg-green-600 hover:bg-green-700 text-white" },
  done: { label: "Reopen", next: "not-started", classes: "bg-gray-600 hover:bg-gray-500 text-white" },
};

export default function TaskItem({ task, onUpdateStatus, onDelete }: TaskItemProps) {
  const action = actionConfig[task.status];

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-2 rounded-lg border border-gray-700 bg-gray-800/50 ${task.status === "done" ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-3 min-w-0">
        <StatusBadge status={task.status} />
        <span className={`truncate ${task.status === "done" ? "line-through text-gray-500" : "text-gray-200"}`}>
          {task.title}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0 pl-9 sm:pl-0 sm:ml-3">
        <button
          onClick={() => onUpdateStatus(task.id, action.next)}
          className={`px-3 py-1.5 sm:py-1 rounded text-sm font-medium cursor-pointer ${action.classes}`}
        >
          {action.label}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-2 py-1.5 sm:py-1 rounded text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
