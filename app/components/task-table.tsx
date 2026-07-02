"use client";

import { useMemo, useState } from "react";

type Status = "todo" | "in-progress" | "done";
type Priority = "low" | "medium" | "high";

type Task = {
  id: string;
  title: string;
  assignee: string;
  status: Status;
  priority: Priority;
  due: string;
};

const STATUS_ORDER: Status[] = ["todo", "in-progress", "done"];

const STATUS_LABEL: Record<Status, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

const STATUS_CLASS: Record<Status, string> = {
  todo: "bg-status-todo-bg text-status-todo-fg",
  "in-progress": "bg-status-progress-bg text-status-progress-fg",
  done: "bg-status-done-bg text-status-done-fg",
};

const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const PRIORITY_CLASS: Record<Priority, string> = {
  low: "bg-priority-low-bg text-priority-low-fg",
  medium: "bg-priority-medium-bg text-priority-medium-fg",
  high: "bg-priority-high-bg text-priority-high-fg",
};

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Design onboarding flow",
    assignee: "Maya Chen",
    status: "in-progress",
    priority: "high",
    due: "Jul 8",
  },
  {
    id: "2",
    title: "Set up CI pipeline",
    assignee: "Devon Park",
    status: "todo",
    priority: "medium",
    due: "Jul 11",
  },
  {
    id: "3",
    title: "Write API documentation",
    assignee: "Priya Nair",
    status: "todo",
    priority: "low",
    due: "Jul 15",
  },
  {
    id: "4",
    title: "Migrate database schema",
    assignee: "Luis Ortega",
    status: "done",
    priority: "high",
    due: "Jul 2",
  },
  {
    id: "5",
    title: "Refine dashboard charts",
    assignee: "Sara Kim",
    status: "in-progress",
    priority: "medium",
    due: "Jul 9",
  },
];

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_CLASS[status]}`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {STATUS_LABEL[status]}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${PRIORITY_CLASS[priority]}`}
    >
      {PRIORITY_LABEL[priority]}
    </span>
  );
}

function cycleStatus(status: Status): Status {
  const next = (STATUS_ORDER.indexOf(status) + 1) % STATUS_ORDER.length;
  return STATUS_ORDER[next];
}

export default function TaskTable() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<Status | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? tasks : tasks.filter((t) => t.status === filter)),
    [tasks, filter],
  );

  const doneCount = tasks.filter((t) => t.status === "done").length;

  function toggleStatus(id: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: cycleStatus(t.status) } : t,
      ),
    );
  }

  function addTask(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks((prev) => [
      {
        id: crypto.randomUUID(),
        title: trimmed,
        assignee: "Unassigned",
        status: "todo",
        priority: "medium",
        due: "—",
      },
      ...prev,
    ]);
    setTitle("");
  }

  const filters: (Status | "all")[] = ["all", ...STATUS_ORDER];

  return (
    <section className="w-full">
      <header className="mb-5 flex flex-col gap-1">
        <h1 className="text-balance text-2xl font-semibold tracking-tight">
          Tasks
        </h1>
        <p className="text-sm text-muted">
          {doneCount} of {tasks.length} tasks completed
        </p>
      </header>

      <form onSubmit={addTask} className="mb-4 flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task…"
          aria-label="New task title"
          className="min-w-0 flex-1 rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Add
        </button>
      </form>

      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted border border-border hover:text-foreground"
            }`}
          >
            {f === "all" ? "All" : STATUS_LABEL[f]}
          </button>
        ))}
      </div>

      {/* Mobile: stacked cards */}
      <ul className="flex flex-col gap-3 sm:hidden">
        {filtered.map((task) => (
          <li
            key={task.id}
            className="rounded-lg border border-border bg-card p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <p className="font-medium leading-snug text-pretty">
                {task.title}
              </p>
              <PriorityBadge priority={task.priority} />
            </div>
            <div className="flex items-center justify-between gap-2 text-sm text-muted">
              <span className="truncate">{task.assignee}</span>
              <span>Due {task.due}</span>
            </div>
            <button
              onClick={() => toggleStatus(task.id)}
              className="mt-3 w-full rounded-md border border-border py-1.5"
              aria-label={`Change status for ${task.title}`}
            >
              <StatusBadge status={task.status} />
            </button>
          </li>
        ))}
      </ul>

      {/* Larger screens: table */}
      <div className="hidden overflow-hidden rounded-lg border border-border bg-card sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Task</th>
              <th className="px-4 py-3 font-medium">Assignee</th>
              <th className="px-4 py-3 font-medium">Priority</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((task) => (
              <tr
                key={task.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-4 py-3 font-medium text-pretty">
                  {task.title}
                </td>
                <td className="px-4 py-3 text-muted">{task.assignee}</td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className="px-4 py-3 text-muted">{task.due}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(task.id)}
                    className="rounded-full outline-none focus:ring-2 focus:ring-primary/30"
                    aria-label={`Change status for ${task.title}`}
                  >
                    <StatusBadge status={task.status} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-muted">
          No tasks in this view.
        </p>
      )}
    </section>
  );
}
