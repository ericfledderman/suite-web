import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Field definitions
// Summary:  required, min 2, max 64
// Status:   required, options below, default "do"
// Priority: required, options below, default "medium"

const STATUS_OPTIONS = ["dont", "do", "doing", "done"] as const;
const PRIORITY_OPTIONS = [
  "low",
  "medium",
  "high",
  "critical",
  "urgent",
] as const;

type Status = (typeof STATUS_OPTIONS)[number];
type Priority = (typeof PRIORITY_OPTIONS)[number];

const DEFAULT_STATUS: Status = "do";
const DEFAULT_PRIORITY: Priority = "medium";

type Task = {
  id: string;
  summary: string;
  status: Status;
  priority: Priority;
  due: string;
};

const tasks: Task[] = [
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

const statusVariant: Record<Status, "default" | "secondary" | "outline"> = {
  done: "default",
  doing: "secondary",
  do: "outline",
  dont: "outline",
};

const priorityVariant: Record<
  Priority,
  "default" | "destructive" | "secondary" | "outline"
> = {
  urgent: "destructive",
  critical: "destructive",
  high: "default",
  medium: "secondary",
  low: "outline",
};

export default function Home() {
  return (
    <div className="flex flex-1 justify-center bg-background font-sans">
      <main className="flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Tasks
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A list of your team&apos;s tasks and their current status.
          </p>
        </header>

        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableCaption className="pb-4">
              {tasks.length} tasks total
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Summary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.summary}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[task.status]}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={priorityVariant[task.priority]}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-right">
                    {task.due}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
