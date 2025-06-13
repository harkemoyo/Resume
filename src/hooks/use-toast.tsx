import { useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

/**
 * Custom hook for managing toast notifications
 * @returns An object containing the toast list and functions to manage toasts
 */
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const addToast = useCallback((message: string, type: ToastType = 'info', duration: number = 5000) => {
    const id = idCounter;
    setIdCounter(prev => prev + 1);

    const newToast = { id, message, type };
    setToasts(prevToasts => [...prevToasts, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [idCounter]);

  const removeToast = useCallback((id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    // Convenience methods
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration),
    warning: (message: string, duration?: number) => addToast(message, 'warning', duration)
  };
};

export default useToast;
