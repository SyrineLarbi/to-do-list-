import { Project, TaskStatus } from "@/lib/types";
import TaskItem from "./TaskItem";
import NewTaskForm from "./NewTaskForm";

interface TaskListProps {
  project: Project;
  onAddTask: (title: string) => void;
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

export default function TaskList({ project, onAddTask, onUpdateTaskStatus, onDeleteTask }: TaskListProps) {
  const pending = project.tasks.filter((t) => t.status !== "done");
  const done = project.tasks.filter((t) => t.status === "done");

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-orange-400 mb-4 md:mb-6 pt-10 md:pt-0">{project.name}</h1>

      <NewTaskForm onAdd={onAddTask} />

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-gray-300 mb-3">
          Pending ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <p className="text-gray-600 text-sm italic">No pending tasks. Add one above!</p>
        ) : (
          <div className="space-y-2">
            {pending.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdateStatus={onUpdateTaskStatus}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        )}
      </section>

      {done.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-300 mb-3">
            Done / Archive ({done.length})
          </h2>
          <div className="space-y-2">
            {done.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdateStatus={onUpdateTaskStatus}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
