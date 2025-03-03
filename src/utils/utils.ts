import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const getValueByKey = (obj: any, key: keyof any): string | number => {
  return obj[key];
};

export function extractValues<T, K extends keyof T>(arr: T[], key: K): T[K][] {
  return arr.map((item) => item[key]);
}

export const removeEmptyStrings = (obj: any) => {
  // Use Object.entries to filter out keys with empty string values
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => value !== "")
  );
};

export const filterDataByInterface = <T extends object>(
  data: any
): Partial<T> => {
  const filteredData: Partial<T> = {};

  // Get the keys of the interface using a dummy object
  const validKeys = Object.keys({} as T);

  for (const key of validKeys) {
    if (key in data) {
      filteredData[key as keyof T] = data[key]; // Safe indexing
    }
  }
  return filteredData;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export const formatDateTime = (dateString: Date) => {
  const date = new Date(dateString);

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${time} ( ${formattedDate} )`;
};
