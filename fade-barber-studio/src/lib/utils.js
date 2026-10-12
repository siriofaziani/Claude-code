import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Unisce classi condizionali e risolve i conflitti Tailwind (helper `cn` in stile Aceternity UI / shadcn). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
