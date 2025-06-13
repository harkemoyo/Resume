export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastOptions {
  duration?: number;
}

export interface ToastReturn {
  id: number;
  dismiss: () => void;
  update: (props: { message: string; type?: ToastType }) => void;
}

export interface ToastHandler {
  (message: string, options?: ToastOptions): ToastReturn;
  success: (message: string, options?: ToastOptions) => ToastReturn;
  error: (message: string, options?: ToastOptions) => ToastReturn;
  info: (message: string, options?: ToastOptions) => ToastReturn;
  warning: (message: string, options?: ToastOptions) => ToastReturn;
  dismiss: (toastId: number) => void;
  promise: <T>(
    promise: Promise<T>,
    msgs: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    },
    opts?: ToastOptions
  ) => Promise<T>;
}