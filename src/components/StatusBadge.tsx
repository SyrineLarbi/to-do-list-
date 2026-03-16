import { TaskStatus } from "@/lib/types";

const statusConfig: Record<TaskStatus, { label: string; classes: string }> = {
  "not-started": { label: "Not Started", classes: "bg-gray-700 text-gray-300" },
  "in-progress": { label: "In Progress", classes: "bg-orange-500/20 text-orange-400" },
  done: { label: "Done", classes: "bg-green-500/20 text-green-400" },
};

export default function StatusBadge({ status }: { status: TaskStatus }) {
  const { label, classes } = statusConfig[status];
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
}
