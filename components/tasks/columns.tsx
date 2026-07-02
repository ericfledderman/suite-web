"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  priorityOrder,
  priorityVariant,
  statusOrder,
  statusVariant,
  type Task,
} from "@/lib/tasks";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "summary",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Summary
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("summary")}</span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue<Task["status"]>("status");
      return <Badge variant={statusVariant[status]}>{status}</Badge>;
    },
    sortingFn: (a, b) =>
      statusOrder[a.getValue<Task["status"]>("status")] -
      statusOrder[b.getValue<Task["status"]>("status")],
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Priority
        <ArrowUpDown data-icon="inline-end" />
      </Button>
    ),
    cell: ({ row }) => {
      const priority = row.getValue<Task["priority"]>("priority");
      return <Badge variant={priorityVariant[priority]}>{priority}</Badge>;
    },
    sortingFn: (a, b) =>
      priorityOrder[a.getValue<Task["priority"]>("priority")] -
      priorityOrder[b.getValue<Task["priority"]>("priority")],
  },
  {
    accessorKey: "due",
    header: () => <div className="text-right">Due</div>,
    cell: ({ row }) => (
      <div className="whitespace-nowrap text-right">{row.getValue("due")}</div>
    ),
  },
];
