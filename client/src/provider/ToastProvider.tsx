import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toasty from '../components/Toasty';

type ToastType = 'success' | 'error';

interface Toast {
  message: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (toast: Toast) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Toast) => {
    setToasts((prevToasts) => [...prevToasts, toast]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.slice(1));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
  {children}
  <div className="fixed bottom-5 right-5 space-y-2">
    {toasts.map((toast, index) => (
        <Toasty key={index} message={toast.message} type={toast.type} />
))}
  </div>
  </ToastContext.Provider>
);
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
