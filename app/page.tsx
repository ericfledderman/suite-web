import TaskTable from "./components/task-table";

export default function Home() {
  return (
    <div className="flex flex-1 justify-center bg-background font-sans">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <TaskTable />
      </main>
    </div>
  );
}
