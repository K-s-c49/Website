import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value, currency = 'INR', locale = 'en-IN') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value);

export const formatDate = (value, locale = 'en-US') =>
  new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));

export const getErrorMessage = (error, fallback = 'Something went wrong') => {
  if (!error) return fallback;
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  if (error.response?.data?.message) return error.response.data.message;
  return fallback;
};

