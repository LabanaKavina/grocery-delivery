import { useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastNotificationProps {
  message: string;
  type?: ToastType;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

const typeClasses: Record<ToastType, string> = {
  success: 'bg-[#53B175] text-white',
  error: 'bg-[#D32F2F] text-white',
  info: 'bg-[#181725] text-white',
};

const ToastNotification = ({
  message,
  type = 'success',
  visible,
  onDismiss,
  duration = 3000,
}: ToastNotificationProps) => {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [visible, onDismiss, duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-[12px] shadow-lg transition-all duration-300 ${typeClasses[type]}`}
      role="alert"
      aria-live="polite"
    >
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default ToastNotification;
