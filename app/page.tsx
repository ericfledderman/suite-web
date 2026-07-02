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

type Status = "To do" | "In progress" | "Done";
type Priority = "Low" | "Medium" | "High";

type Task = {
  id: string;
  title: string;
  assignee: string;
  status: Status;
  priority: Priority;
  due: string;
};

const tasks: Task[] = [
  {
    id: "TASK-8782",
    title: "Design homepage",
    assignee: "Alice",
    status: "In progress",
    priority: "High",
    due: "Jul 10, 2026",
  },
  {
    id: "TASK-7878",
    title: "Set up database",
    assignee: "Bob",
    status: "Done",
    priority: "High",
    due: "Jul 03, 2026",
  },
  {
    id: "TASK-9012",
    title: "Write API endpoints",
    assignee: "Carol",
    status: "To do",
    priority: "Medium",
    due: "Jul 15, 2026",
  },
  {
    id: "TASK-3390",
    title: "Configure CI/CD",
    assignee: "Dave",
    status: "To do",
    priority: "Medium",
    due: "Jul 18, 2026",
  },
  {
    id: "TASK-4521",
    title: "User testing",
    assignee: "Eve",
    status: "In progress",
    priority: "Low",
    due: "Jul 20, 2026",
  },
];

const statusVariant: Record<Status, "default" | "secondary" | "outline"> = {
  Done: "default",
  "In progress": "secondary",
  "To do": "outline",
};

const priorityVariant: Record<
  Priority,
  "destructive" | "secondary" | "outline"
> = {
  High: "destructive",
  Medium: "secondary",
  Low: "outline",
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
                <TableHead className="w-28">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {task.id}
                  </TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
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
