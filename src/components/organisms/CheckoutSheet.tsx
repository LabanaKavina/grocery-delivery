import { useState } from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

interface CheckoutSheetProps {
  visible: boolean;
  onClose: () => void;
  onPlaceOrder: () => void;
  total: number;
}

const deliveryOptions = ['Select Method', 'Delivery', 'Pick Up'];
const paymentOptions = ['Credit Card', 'Cash on Delivery', 'Mobile Banking'];
const promoOptions = ['Pick discount', '10% Off', '20% Off', 'Free Delivery'];

const CheckoutSheet = ({ visible, onClose, onPlaceOrder, total }: CheckoutSheetProps) => {
  const [delivery, setDelivery] = useState(deliveryOptions[0]);
  const [promo, setPromo] = useState(promoOptions[0]);
  const [openDropdown, setOpenDropdown] = useState<'delivery' | 'payment' | 'promo' | null>(null);

  const isReady = delivery !== deliveryOptions[0] && promo !== promoOptions[0];

  const handlePlaceOrder = () => {
    if (!isReady) return;
    onPlaceOrder();
  };

  const toggleDropdown = (name: 'delivery' | 'payment' | 'promo') => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{ background: '#000000', opacity: 0.4 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Checkout card */}
      <div
        className="relative w-full max-w-lg animate-slide-up overflow-y-auto"
        style={{ background: '#F2F3F2', borderRadius: '30px 30px 0 0', maxHeight: '85vh' }}
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ padding: '30px 25px 0 25px' }}>
          <h2 className="font-semibold text-[#181725]" style={{ fontSize: '24px', lineHeight: '29px' }}>
            Checkout
          </h2>
          <button
            onClick={onClose}
            className="bg-transparent border-none cursor-pointer p-0"
            aria-label="Close checkout"
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1 1 13" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Divider below header */}
        <div style={{ margin: '20px 0 0 0', borderBottom: '1px solid rgba(226, 226, 226, 0.7)' }} />

        {/* Rows */}
        <div style={{ padding: '0 25px' }}>

          {/* Delivery */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('delivery')}
              className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer p-0"
              style={{ padding: '20px 0' }}
            >
              <span className="font-semibold text-[#7C7C7C]" style={{ fontSize: '18px', lineHeight: '22px' }}>
                Delivery
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#181725]" style={{ fontSize: '16px', lineHeight: '20px' }}>
                  {delivery}
                </span>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                  <path d="M1 1l6 6-6 6" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
            {openDropdown === 'delivery' && (
              <div className="absolute right-0 top-full bg-white rounded-lg shadow-lg z-10" style={{ minWidth: '160px', border: '1px solid #E2E2E2' }}>
                {deliveryOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setDelivery(opt); setOpenDropdown(null); }}
                    className={`w-full text-left bg-transparent border-none cursor-pointer block ${opt === delivery ? 'text-[#53B175]' : 'text-[#181725]'}`}
                    style={{ padding: '12px 16px', fontSize: '14px' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ borderBottom: '1px solid rgba(226, 226, 226, 0.7)' }} />

          {/* Payment */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('payment')}
              className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer p-0"
              style={{ padding: '20px 0' }}
            >
              <span className="font-semibold text-[#7C7C7C]" style={{ fontSize: '18px', lineHeight: '22px' }}>
                Payment
              </span>
              <div className="flex items-center gap-2">
                {/* Card icon */}
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
                  <rect width="22" height="16" rx="3" fill="#5286F9"/>
                  <circle cx="14" cy="8" r="5" fill="#FFB655"/>
                  <circle cx="9" cy="8" r="5" fill="#D8143A" fillOpacity="0.8"/>
                </svg>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                  <path d="M1 1l6 6-6 6" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
            {openDropdown === 'payment' && (
              <div className="absolute right-0 top-full bg-white rounded-lg shadow-lg z-10" style={{ minWidth: '160px', border: '1px solid #E2E2E2' }}>
                {paymentOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setOpenDropdown(null); }}
                    className="w-full text-left bg-transparent border-none cursor-pointer block text-[#181725]"
                    style={{ padding: '12px 16px', fontSize: '14px' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ borderBottom: '1px solid rgba(226, 226, 226, 0.7)' }} />

          {/* Promo Code */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('promo')}
              className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer p-0"
              style={{ padding: '20px 0' }}
            >
              <span className="font-semibold text-[#7C7C7C]" style={{ fontSize: '18px', lineHeight: '22px' }}>
                Promo Code
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#181725]" style={{ fontSize: '16px', lineHeight: '20px' }}>
                  {promo}
                </span>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                  <path d="M1 1l6 6-6 6" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
            {openDropdown === 'promo' && (
              <div className="absolute right-0 top-full bg-white rounded-lg shadow-lg z-10" style={{ minWidth: '160px', border: '1px solid #E2E2E2' }}>
                {promoOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setPromo(opt); setOpenDropdown(null); }}
                    className={`w-full text-left bg-transparent border-none cursor-pointer block ${opt === promo ? 'text-[#53B175]' : 'text-[#181725]'}`}
                    style={{ padding: '12px 16px', fontSize: '14px' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ borderBottom: '1px solid rgba(226, 226, 226, 0.7)' }} />

          {/* Total Cost */}
          <div className="flex items-center justify-between" style={{ padding: '20px 0' }}>
            <span className="font-semibold text-[#7C7C7C]" style={{ fontSize: '18px', lineHeight: '22px' }}>
              Total Cost
            </span>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#181725]" style={{ fontSize: '16px', lineHeight: '20px' }}>
                ${formatCurrency(total)}
              </span>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                <path d="M1 1l6 6-6 6" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div style={{ borderBottom: '1px solid rgba(226, 226, 226, 0.7)' }} />
        </div>

        {/* Terms */}
        <div style={{ padding: '20px 25px 0 25px' }}>
          <p className="font-semibold text-[#7C7C7C]" style={{ fontSize: '14px', lineHeight: '21px' }}>
            By placing an order you agree to our{' '}
            <span className="text-[#181725]">Terms</span> And{' '}
            <span className="text-[#181725]">Conditions</span>
          </p>
        </div>

        {/* Place Order button */}
        <div style={{ padding: '20px 25px', paddingBottom: 'calc(40px + 92px)' }}>
          <button
            onClick={handlePlaceOrder}
            className="w-full flex items-center justify-center border-none cursor-pointer font-semibold text-[#FFF9FF]"
            style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px', lineHeight: '18px', opacity: isReady ? 1 : 0.4, cursor: isReady ? 'pointer' : 'not-allowed' }}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSheet;
