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

/**
 * Get the full URL for a product image
 * Handles both backend-uploaded images (/uploads/...) and frontend public images (/images/...)
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/products/logo.jpg';
  
  // If it's already a full URL (http:// or https://), return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a backend upload path (/uploads/...), prepend backend URL
  if (imagePath.startsWith('/uploads/')) {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';
    const backendUrl = apiUrl.replace('/api/v1', '').replace(/\/$/, '');
    return `${backendUrl}${imagePath}`;
  }
  
  // If it's a frontend public image (/images/...), return as is (Vite handles it)
  if (imagePath.startsWith('/images/') || imagePath.startsWith('./images/')) {
    return imagePath.startsWith('./') ? imagePath.substring(1) : imagePath;
  }
  
  // If it starts with storage/ (old format), convert to /uploads/
  if (imagePath.startsWith('storage/uploads/')) {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';
    const backendUrl = apiUrl.replace('/api/v1', '').replace(/\/$/, '');
    return `${backendUrl}/uploads/${imagePath.replace('storage/uploads/', '')}`;
  }
  
  // Default fallback to placeholder
  return '/images/products/logo.jpg';
};

