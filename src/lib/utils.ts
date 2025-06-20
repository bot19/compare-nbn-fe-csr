import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { APP_SETTINGS } from './settings';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to check if current window width is desktop (>= LG breakpoint)
export const isDesktop = (): boolean => {
  return typeof window !== 'undefined' && window.innerWidth >= APP_SETTINGS.BREAKPOINTS.LG;
};

// Utility function to check if current window width is mobile (< LG breakpoint)
export const isMobile = (): boolean => {
  return !isDesktop();
};
