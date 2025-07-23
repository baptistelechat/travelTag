import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utilitaire pour combiner des classes CSS avec Tailwind
 * Utilise clsx et tailwind-merge pour gérer les conflits de classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}