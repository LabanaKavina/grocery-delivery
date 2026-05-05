import orderFailedImg from '../../assets/order-failed.png';

interface OrderFailedModalProps {
  visible: boolean;
  onRetry: () => void;
  onClose: () => void;
  retrying?: boolean;
}

const OrderFailedModal = ({ visible, onRetry, onClose, retrying }: OrderFailedModalProps) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: '#000000', opacity: 0.4 }} aria-hidden="true" />

      {/* White card */}
      <div
        className="relative flex flex-col items-center"
        style={{ width: '364px', background: '#FFFFFF', borderRadius: '18px', padding: '0 25px 32px', overflow: 'hidden' }}
        role="dialog"
        aria-modal="true"
        aria-label="Order failed"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute bg-transparent border-none cursor-pointer"
          style={{ top: '16px', left: '16px' }}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1 1 13" stroke="#181725" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Illustration */}
        <img src={orderFailedImg} alt="Order failed" style={{ width: '222px', height: '222px', objectFit: 'contain', marginTop: '48px' }} />

        {/* Title */}
        <h1 className="font-semibold text-[#181725] text-center" style={{ fontSize: '28px', lineHeight: '34px', marginTop: '8px' }}>
          Oops! Order Failed
        </h1>

        {/* Subtitle */}
        <p className="text-center text-[#7C7C7C]" style={{ fontSize: '16px', lineHeight: '21px', marginTop: '12px' }}>
          Something went terribly wrong.
        </p>

        {/* Buttons */}
        <div className="w-full" style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={onRetry}
            disabled={retrying}
            className="w-full flex items-center justify-center border-none cursor-pointer font-semibold text-[#FFF9FF]"
            style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px', lineHeight: '18px', opacity: retrying ? 0.7 : 1 }}
          >
            {retrying ? 'Retrying...' : 'Please Try Again'}
          </button>
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center border-none cursor-pointer font-semibold text-[#181725] bg-transparent"
            style={{ height: '67px', fontSize: '18px', lineHeight: '18px' }}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFailedModal;
