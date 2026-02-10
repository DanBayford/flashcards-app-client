import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const previewText = (text: string, maxLength: number = 200) => {
  if (text.length <= maxLength) return text;

  const previewText = text.slice(0, maxLength);

  // Find last space so as not to slice and preview in the middle of a word
  const indexOfLastSpace = previewText.lastIndexOf(" ");

  return indexOfLastSpace > 0
    ? previewText.slice(0, indexOfLastSpace) + "..."
    : previewText + "...";
};
