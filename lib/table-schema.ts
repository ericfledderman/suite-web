import type { ComponentProps } from "react";
import type { Badge } from "@/components/ui/badge";

/** Visual style used when rendering an enum value as a Badge. */
export type BadgeVariant = NonNullable<ComponentProps<typeof Badge>["variant"]>;

/** The kinds of data a column can hold. Drives formatting + sorting. */
export type FieldType = "text" | "enum" | "date" | "number";

/** A single allowed value for an `enum` field. */
export interface EnumOption {
  value: string;
  /** Human label shown in the cell. Defaults to `value`. */
  label?: string;
  /** Badge style for this value. Defaults to "secondary". */
  variant?: BadgeVariant;
}

/** Definition for one column/field of a record. */
export interface FieldSchema {
  /** Key on the data object (accessor). */
  key: string;
  /** Column header label. */
  label: string;
  /** Data type — controls how the cell is formatted and sorted. */
  type: FieldType;

  // --- display ---
  /** Text alignment for header + cells. Defaults to "left" (numbers/dates "right"). */
  align?: "left" | "right" | "center";
  /** Whether the column header is a sort toggle. Defaults to true. */
  sortable?: boolean;
  /** Whether this field powers the table's text filter. First match wins. */
  filterable?: boolean;
  /** Hide the column from the table (still part of the schema/data). */
  hidden?: boolean;

  // --- enum ---
  /** Allowed values for `enum` fields, in the desired sort order. */
  options?: EnumOption[];

  // --- validation (used by forms; documented on the schema) ---
  required?: boolean;
  /** Default value for new records. */
  defaultValue?: string | number;
  /** For `text`: min/max character length. */
  minLength?: number;
  maxLength?: number;
  /** For `number`: min/max value. */
  min?: number;
  max?: number;
}

/** A full table schema: an ordered list of field definitions. */
export interface TableSchema {
  fields: FieldSchema[];
}

/** Resolve the display label for an enum value. */
export function enumLabel(field: FieldSchema, value: string): string {
  return field.options?.find((o) => o.value === value)?.label ?? value;
}

/** Resolve the badge variant for an enum value. */
export function enumVariant(field: FieldSchema, value: string): BadgeVariant {
  return field.options?.find((o) => o.value === value)?.variant ?? "secondary";
}

/** Position of an enum value in its defined option order (for sorting). */
export function enumOrder(field: FieldSchema, value: string): number {
  const idx = field.options?.findIndex((o) => o.value === value) ?? -1;
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx;
}
