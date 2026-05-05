import type { CartItem } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

interface CartItemRowProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

const CartItemRow = ({ item, onIncrement, onDecrement, onRemove }: CartItemRowProps) => {
  const { product, quantity } = item;

  return (
    <div className="flex items-start gap-4 py-6" style={{ borderBottom: '1px solid #E2E2E2', marginLeft: '0', marginRight: '0' }}>
      {/* Product image — ~70×65 */}
      <div className="shrink-0 flex items-center justify-center" style={{ width: '70px', height: '65px' }}>
        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        {/* Name + close icon */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-[#181725] truncate" style={{ fontSize: '16px', lineHeight: '18px', letterSpacing: '0.1px' }}>
              {product.name}
            </h3>
            <p className="text-[#7C7C7C] mt-1" style={{ fontSize: '14px', lineHeight: '18px' }}>
              {product.weight}
            </p>
          </div>
          {/* Close/remove — X icon, #B3B3B3 */}
          <button
            onClick={() => onRemove(product.id)}
            className="shrink-0 bg-transparent border-none cursor-pointer p-0 mt-0.5"
            aria-label={`Remove ${product.name} from cart`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1 1 13" stroke="#B3B3B3" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Quantity selector + price */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            {/* Minus — border: 1px solid #F0F0F0, border-radius: 17px, 45.67×45.67 */}
            <button
              onClick={() => onDecrement(product.id)}
              className="flex items-center justify-center bg-transparent cursor-pointer"
              style={{ width: '45.67px', height: '45.67px', border: '1px solid #F0F0F0', borderRadius: '17px' }}
              aria-label="Decrease quantity"
            >
              <svg width="14" height="2" viewBox="0 0 14 2" fill="none" aria-hidden="true">
                <path d="M1 1h12" stroke="#B3B3B3" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Count — 16px semibold #181725 */}
            <span className="font-semibold text-[#181725]" style={{ fontSize: '16px', lineHeight: '18px', minWidth: '16px', textAlign: 'center', letterSpacing: '0.1px' }}>
              {quantity}
            </span>

            {/* Plus — border: 1px solid #E2E2E2, border-radius: 17px, 45.67×45.67 */}
            <button
              onClick={() => onIncrement(product.id)}
              className="flex items-center justify-center bg-transparent cursor-pointer"
              style={{ width: '45.67px', height: '45.67px', border: '1px solid #E2E2E2', borderRadius: '17px' }}
              aria-label="Increase quantity"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 1v12M1 7h12" stroke="#53B175" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Price — 18px/27px semibold #181725 */}
          <span className="font-semibold text-[#181725]" style={{ fontSize: '18px', lineHeight: '27px', letterSpacing: '0.1px' }}>
            ${formatCurrency(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;
