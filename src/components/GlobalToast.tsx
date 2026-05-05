import { useGlobalToast } from '../contexts/ToastContext';
import ToastNotification from './molecules/ToastNotification';

const GlobalToast = () => {
  const { toast, dismiss } = useGlobalToast();

  return (
    <ToastNotification
      message={toast.message}
      type={toast.type}
      visible={toast.visible}
      onDismiss={dismiss}
    />
  );
};

export default GlobalToast;
