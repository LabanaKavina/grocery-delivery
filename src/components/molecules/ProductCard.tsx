import type { Product } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCartStore } from '../../stores/cartStore';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onPress: (productId: string) => void;
}

const ProductCard = ({ product, onAddToCart, onPress }: ProductCardProps) => {
  const { items, incrementQuantity, decrementQuantity } = useCartStore();
  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <div
      className="w-[173px] min-h-[249px] rounded-[18px] border border-[#E2E2E2] p-4 flex flex-col cursor-pointer"
      onClick={() => onPress(product.id)}
      role="button"
      tabIndex={0}
      aria-label={`${product.name}, ${formatCurrency(product.price)}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onPress(product.id);
        }
      }}
    >
      <div className="flex items-center justify-center h-[100px] mb-3">
        <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="text-base font-bold text-[#181725] leading-tight">{product.name}</h3>
        <p className="text-sm text-[#7C7C7C] mt-0.5">{product.weight}</p>

        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="text-lg font-semibold text-[#181725]">${formatCurrency(product.price)}</span>

          {quantity === 0 ? (
            /* Add button */
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
              className="w-[45px] h-[45px] rounded-[17px] bg-[#53B175] flex items-center justify-center text-white hover:bg-[#489e68] transition-colors cursor-pointer"
              aria-label={`Add ${product.name} to cart`}
            >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
                <path d="M8.5 1v15M1 8.5h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          ) : (
            /* +/- quantity controls */
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={(e) => { e.stopPropagation(); decrementQuantity(product.id); }}
                className="w-[30px] h-[30px] rounded-[10px] flex items-center justify-center cursor-pointer"
                style={{ border: '1px solid #F0F0F0', background: 'white' }}
                aria-label="Decrease quantity"
              >
                <svg width="12" height="2" viewBox="0 0 12 2" fill="none" aria-hidden="true">
                  <path d="M1 1h10" stroke="#B3B3B3" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>

              <span className="font-semibold text-[#181725]" style={{ fontSize: '14px', minWidth: '14px', textAlign: 'center' }}>
                {quantity}
              </span>

              <button
                onClick={(e) => { e.stopPropagation(); incrementQuantity(product.id); }}
                className="w-[30px] h-[30px] rounded-[10px] bg-[#53B175] flex items-center justify-center cursor-pointer border-none"
                aria-label="Increase quantity"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
