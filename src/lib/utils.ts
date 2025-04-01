
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  // Format to Indian Rupee format with thousands separators
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generatePDF() {
  // This would contain the PDF generation logic
  // For now, it's a placeholder
  return true;
}

export function sendEmail(emailAddress: string, data: any) {
  // This would contain the email sending logic
  // For now, it's a placeholder
  return true;
}
