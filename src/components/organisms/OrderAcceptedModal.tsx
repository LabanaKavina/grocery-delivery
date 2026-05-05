import groceryBg from '../../assets/grocery-bg.jpg';

interface OrderAcceptedModalProps {
  visible: boolean;
  onClose: () => void;
}

const OrderAcceptedModal = ({ visible, onClose }: OrderAcceptedModalProps) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      {/* Full-screen blurred background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${groceryBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
          transform: 'scale(1.05)',
        }}
        aria-hidden="true"
      />
      {/* Frosted overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(252,252,252,0.75)', backdropFilter: 'blur(20px)' }} aria-hidden="true" />

      {/* Decorative confetti */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute" style={{ width: 42, height: 39, right: 88, top: 162, border: '3px solid #F3603F', borderRadius: '50%', borderBottomColor: 'transparent', transform: 'rotate(-30deg)' }} />
        <div className="absolute" style={{ width: 20, height: 26, right: 120, top: 348, border: '3px solid #F7B23B', transform: 'rotate(20deg)' }} />
        <div className="absolute" style={{ width: 67, height: 35, left: 58, top: 294, border: '3px solid #6E89FA', borderRadius: '50%', borderTopColor: 'transparent' }} />
        <div className="absolute rounded-full" style={{ width: 15, height: 15, left: 231, top: 377, background: '#637BFE' }} />
        <div className="absolute rounded-full" style={{ width: 15, height: 15, right: 97, top: 257, border: '1px solid #C05EFD' }} />
        <div className="absolute rounded-full" style={{ width: 17, height: 17, left: 181, top: 152, background: '#53B175' }} />
        <div className="absolute rounded-full" style={{ width: 9, height: 9, left: 209, top: 170, background: '#F3603F' }} />
        <div className="absolute rounded-full" style={{ width: 15, height: 15, left: 109, top: 231, border: '1px solid #F7B23B' }} />
        <div className="absolute rounded-full" style={{ width: 17, height: 17, left: 126, top: 351, border: '1px solid #53B175' }} />
        <div className="absolute rounded-full" style={{ width: 8, height: 8, left: 211, top: 372, background: '#53B175' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full px-6">
        {/* Green checkmark circle */}
        <div className="flex items-center justify-center rounded-full" style={{ width: 158, height: 158, background: '#53B175' }}>
          <div className="flex items-center justify-center rounded-full" style={{ width: 138, height: 138, border: '2px solid rgba(255,255,255,0.7)', boxShadow: '0px 3px 4px rgba(0,0,0,0.12)' }}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-label="Order accepted">
              <path d="M14 28.5L23 37.5L42 19.5" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <h1 className="font-semibold text-[#181725] text-center" style={{ fontSize: '28px', lineHeight: '34px', marginTop: '36px', maxWidth: '265px' }}>
          Your Order has been accepted
        </h1>
        <p className="text-center text-[#7C7C7C]" style={{ fontSize: '16px', lineHeight: '21px', marginTop: '16px', maxWidth: '265px' }}>
          Your items have been placed and are on their way to being processed.
        </p>

        <div className="w-full" style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center border-none cursor-pointer font-semibold text-[#FFF9FF]"
            style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px', lineHeight: '18px' }}
          >
            Track Order
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

export default OrderAcceptedModal;
