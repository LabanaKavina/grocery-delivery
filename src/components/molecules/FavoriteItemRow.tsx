import type { Product } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

interface FavoriteItemRowProps {
  product: Product;
  onRemove: (productId: string) => void;
}

const FavoriteItemRow = ({ product, onRemove }: FavoriteItemRowProps) => {
  return (
    <div className="flex items-center gap-4" style={{ padding: '24px 0', borderBottom: '1px solid #E2E2E2' }}>
      {/* Product image — ~55×55 area */}
      <div className="shrink-0 flex items-center justify-center" style={{ width: '55px', height: '55px' }}>
        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
      </div>

      {/* Name + weight */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-bold text-[#181725] truncate"
          style={{ fontSize: '16px', lineHeight: '18px', letterSpacing: '0.1px' }}
        >
          {product.name}
        </h3>
        <p className="text-[#7C7C7C] mt-1" style={{ fontSize: '14px', lineHeight: '18px' }}>
          {product.weight}
        </p>
      </div>

      {/* Price + chevron */}
      <div className="shrink-0 flex items-center gap-3">
        <span
          className="font-semibold text-[#181725]"
          style={{ fontSize: '16px', lineHeight: '27px', letterSpacing: '0.1px' }}
        >
          ${formatCurrency(product.price)}
        </span>
        {/* Right chevron arrow */}
        <button
          onClick={() => onRemove(product.id)}
          className="bg-transparent border-none cursor-pointer p-0 flex items-center"
          aria-label={`Remove ${product.name} from favorites`}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
            <path d="M1 1l6 6-6 6" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FavoriteItemRow;
