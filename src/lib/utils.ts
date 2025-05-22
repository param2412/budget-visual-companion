import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number as currency based on the specified currency code
 * @param amount - The amount to format
 * @param currencyCode - The ISO currency code (USD, EUR, GBP, JPY, CAD, INR)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currencyCode: string = 'USD'): string {
  // Get the appropriate locale based on currency
  let locale = 'en-US';

  // For some currencies, we might want to use a different locale
  // to get the correct formatting
  switch (currencyCode) {
    case 'EUR':
      locale = 'de-DE'; // Using German locale for Euro
      break;
    case 'GBP':
      locale = 'en-GB';
      break;
    case 'JPY':
      locale = 'ja-JP';
      break;
    case 'CAD':
      locale = 'en-CA';
      break;
    case 'INR':
      locale = 'en-IN';
      break;
    default:
      locale = 'en-US';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
}
