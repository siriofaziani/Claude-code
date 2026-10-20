import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/Aceternity class helper: conditional classes, later Tailwind utilities win. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
