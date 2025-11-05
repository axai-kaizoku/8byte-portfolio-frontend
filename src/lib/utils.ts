import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function throttleFn<T extends (...args: any[]) => any>(func: T, wait: number) {
  let lastRun = 0;
  let count = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRun >= wait && count >= 5) {
      count = 0;
    }
    if (count < 5 || now - lastRun >= wait) {
      func.apply(undefined, args);
      lastRun = now;
      count++;
    } else {
      return null;
    }
  };
}

export function formatNumber(n: number): string {
  return n?.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

export function formatNumberWithLocaleString(n: number): string {
  if (n >= 100000 && n < 10000000) {
    const val = (n / 100000).toFixed(2);
    return `${parseFloat(val)}L`;
  } else if (n >= 10000000) {
    const val = (n / 10000000).toFixed(2);
    return `${parseFloat(val)}Cr`;
  }

  return n?.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}
