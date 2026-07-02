import { columns } from "@/components/tasks/columns";
import { DataTable } from "@/components/tasks/data-table";
import { tasks } from "@/lib/tasks";

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

        <DataTable columns={columns} data={tasks} />
      </main>
    </div>
  );
}
