const tasks = [
  {
    id: 1,
    name: "Design homepage",
    assignee: "Alice",
    status: "In progress",
    due: "2026-07-10",
  },
  {
    id: 2,
    name: "Set up database",
    assignee: "Bob",
    status: "Done",
    due: "2026-07-03",
  },
  {
    id: 3,
    name: "Write API endpoints",
    assignee: "Carol",
    status: "To do",
    due: "2026-07-15",
  },
  {
    id: 4,
    name: "Configure CI/CD",
    assignee: "Dave",
    status: "To do",
    due: "2026-07-18",
  },
  {
    id: 5,
    name: "User testing",
    assignee: "Eve",
    status: "In progress",
    due: "2026-07-20",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 justify-center bg-background font-sans">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="mb-4 text-2xl font-semibold text-foreground">Tasks</h1>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Task
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Assignee
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Due date
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 text-foreground">{task.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {task.assignee}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {task.status}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {task.due}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
