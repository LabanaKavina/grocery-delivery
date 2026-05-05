import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { formatCurrency } from '../utils/formatCurrency';
import CartItemRow from '../components/molecules/CartItemRow';
import CheckoutSheet from '../components/organisms/CheckoutSheet';
import OrderAcceptedModal from '../components/organisms/OrderAcceptedModal';
import OrderFailedModal from '../components/organisms/OrderFailedModal';
import { useGlobalToast } from '../contexts/ToastContext';
import { OrderStatus, PaymentMethod } from '../types';
import { placeOrder } from '../services/mockApi';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, incrementQuantity, decrementQuantity, removeItem, getTotal, clearCart } = useCartStore();
  const { showToast } = useGlobalToast();
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'accepted' | 'failed'>('idle');
  const [retrying, setRetrying] = useState(false);

  const total = getTotal();

  const handleRemove = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    removeItem(productId);
    if (item) showToast(`${item.product.name} removed from cart`, 'info');
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder({ items, total, status: OrderStatus.Pending, deliveryMethod: 'Delivery', paymentMethod: PaymentMethod.CashOnDelivery });
      clearCart();
      setCheckoutVisible(false);
      setOrderStatus('accepted');
    } catch {
      setCheckoutVisible(false);
      setOrderStatus('failed');
    }
  };

  const handleRetry = async () => {
    setRetrying(true);
    try {
      await placeOrder({ items, total, status: OrderStatus.Pending, deliveryMethod: 'Delivery', paymentMethod: PaymentMethod.CashOnDelivery });
      clearCart();
      setRetrying(false);
      setOrderStatus('accepted');
    } catch {
      setRetrying(false);
    }
  };

  const handleCloseAccepted = () => {
    setOrderStatus('idle');
    navigate('/home');
  };

  const handleCloseFailed = () => {
    setOrderStatus('idle');
    navigate('/home');
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col lg:max-w-3xl lg:mx-auto" style={{ bottom: '92px' }}>

      {/* Fixed top — "My Cart" title */}
      <div className="shrink-0">
        <h1
          className="text-center font-bold text-[#181725]"
          style={{ fontSize: '20px', lineHeight: '18px', paddingTop: '56px', paddingBottom: '32px' }}
        >
          My Cart
        </h1>
        <div className="w-full bg-[#E2E2E2]" style={{ height: '1px' }} />
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" stroke="#B3B3B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-[#7C7C7C] text-base">Your cart is empty</p>
          <button
            onClick={() => navigate('/home')}
            className="border border-[#53B175] text-[#53B175] font-semibold cursor-pointer"
            style={{ height: '52px', padding: '0 24px', borderRadius: '15px', fontSize: '16px', background: 'white' }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Scrollable cart items */}
          <div className="flex-1 overflow-y-auto" style={{ padding: '0 25px' }}>
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onIncrement={incrementQuantity}
                onDecrement={decrementQuantity}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Fixed bottom — checkout button */}
          <div className="shrink-0">
            <div className="w-full bg-[#E2E2E2]" style={{ height: '1px' }} />
            <div style={{ padding: '20px 25px' }}>
              <button
                onClick={() => setCheckoutVisible(true)}
                className="w-full flex items-center justify-center border-none cursor-pointer font-semibold text-[#FCFCFC] relative"
                style={{ height: '67px', background: '#53B175', borderRadius: '19px', padding: '0 20px' }}
              >
                <span style={{ fontSize: '18px', lineHeight: '18px' }}>Go to Checkout</span>
                <div
                  className="absolute flex items-center justify-center"
                  style={{ right: '20px', background: '#489E67', borderRadius: '4px', padding: '2px 5px', height: '22px' }}
                >
                  <span className="font-semibold text-[#FCFCFC]" style={{ fontSize: '12px', lineHeight: '18px' }}>
                    ${formatCurrency(total)}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      <CheckoutSheet
        visible={checkoutVisible}
        onClose={() => setCheckoutVisible(false)}
        onPlaceOrder={handlePlaceOrder}
        total={total}
      />

      <OrderAcceptedModal visible={orderStatus === 'accepted'} onClose={handleCloseAccepted} />
      <OrderFailedModal visible={orderStatus === 'failed'} onRetry={handleRetry} onClose={handleCloseFailed} retrying={retrying} />
    </div>
  );
};

export default CartPage;
