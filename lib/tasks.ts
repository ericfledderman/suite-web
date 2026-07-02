// Field definitions
// Summary:  required, min 2, max 64
// Status:   required, options below, default "do"
// Priority: required, options below, default "medium"

export const STATUS_OPTIONS = ["dont", "do", "doing", "done"] as const;
export const PRIORITY_OPTIONS = [
  "low",
  "medium",
  "high",
  "critical",
  "urgent",
] as const;

export type Status = (typeof STATUS_OPTIONS)[number];
export type Priority = (typeof PRIORITY_OPTIONS)[number];

export const DEFAULT_STATUS: Status = "do";
export const DEFAULT_PRIORITY: Priority = "medium";

export type Task = {
  id: string;
  summary: string;
  status: Status;
  priority: Priority;
  due: string;
};

export const statusVariant: Record<Status, "default" | "secondary" | "outline"> =
  {
    done: "default",
    doing: "secondary",
    do: "outline",
    dont: "outline",
  };

export const priorityVariant: Record<
  Priority,
  "default" | "destructive" | "secondary" | "outline"
> = {
  urgent: "destructive",
  critical: "destructive",
  high: "default",
  medium: "secondary",
  low: "outline",
};

// Ordering used for sorting the priority column meaningfully.
export const priorityOrder: Record<Priority, number> = {
  low: 0,
  medium: 1,
  high: 2,
  critical: 3,
  urgent: 4,
};

export const statusOrder: Record<Status, number> = {
  dont: 0,
  do: 1,
  doing: 2,
  done: 3,
};

export const tasks: Task[] = [
  {
    id: "TASK-8782",
    summary: "Design homepage",
    status: "doing",
    priority: "high",
    due: "Jul 10, 2026",
  },
  {
    id: "TASK-7878",
    summary: "Set up database",
    status: "done",
    priority: "critical",
    due: "Jul 03, 2026",
  },
  {
    id: "TASK-9012",
    summary: "Write API endpoints",
    status: "do",
    priority: "medium",
    due: "Jul 15, 2026",
  },
  {
    id: "TASK-3390",
    summary: "Configure CI/CD",
    status: "dont",
    priority: "low",
    due: "Jul 18, 2026",
  },
  {
    id: "TASK-4521",
    summary: "User testing",
    status: "doing",
    priority: "urgent",
    due: "Jul 20, 2026",
  },
];
