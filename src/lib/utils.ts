import { type ClassValue, clsx } from 'clsx';

// Simple clsx implementation (no external dep needed since we have tailwind)
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// Safe access nested properties
export function safeGet<T>(obj: unknown, path: string, fallback: T): T {
  try {
    const keys = path.split('.');
    let result: unknown = obj;
    for (const key of keys) {
      if (result === null || result === undefined) return fallback;
      result = (result as Record<string, unknown>)[key];
    }
    return (result as T) ?? fallback;
  } catch {
    return fallback;
  }
}

// Safe JSON parse
export function safeJsonParse(json: string): { data: unknown; error: string | null } {
  try {
    const data = JSON.parse(json);
    return { data, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid JSON';
    return { data: null, error: message };
  }
}

// Generate unique ID
export function generateId(): string {
  return `comp-${Math.random().toString(36).substring(2, 9)}`;
}

// Format number with commas
export function formatNumber(num: number | string): string {
  const n = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(n)) return String(num);
  return n.toLocaleString();
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
