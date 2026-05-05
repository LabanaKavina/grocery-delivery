import { useFavoritesStore } from '../stores/favoritesStore';
import FavoriteItemRow from '../components/molecules/FavoriteItemRow';
import { useGlobalToast } from '../contexts/ToastContext';

const FavouritesPage = () => {
  const { items, removeFavorite, addAllToCart } = useFavoritesStore();
  const { showToast } = useGlobalToast();

  const handleRemove = (productId: string) => {
    const product = items.find((p) => p.id === productId);
    removeFavorite(productId);
    if (product) {
      showToast(`${product.name} removed from favorites`, 'info');
    }
  };

  const handleAddAllToCart = () => {
    if (items.length === 0) return;
    addAllToCart();
    showToast('All favorites added to cart', 'success');
  };

  return (
    <div className="mobile-fixed-page fixed inset-0 bg-white flex flex-col lg:max-w-2xl lg:mx-auto lg:w-full lg:min-h-[calc(100vh-64px)]" style={{ bottom: '92px' }}>

      {/* Fixed top — "Favourites" title */}
      <div className="shrink-0">
        <h1
          className="text-center font-bold text-[#181725]"
          style={{ fontSize: '20px', lineHeight: '18px', paddingTop: '56px', paddingBottom: '32px' }}
        >
          Favourites
        </h1>
        <div className="w-full bg-[#E2E2E2]" style={{ height: '1px' }} />
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
              stroke="#B3B3B3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[#7C7C7C] text-base">No favorites yet</p>
        </div>
      ) : (
        <>
          {/* Scrollable favorite items */}
          <div className="flex-1 overflow-y-auto" style={{ padding: '0 25px' }}>
            {items.map((product) => (
              <FavoriteItemRow
                key={product.id}
                product={product}
                onRemove={handleRemove}
              />
            ))}
          </div>

          {/* Fixed bottom — "Add All To Cart" button */}
          <div className="shrink-0">
            <div className="w-full bg-[#E2E2E2]" style={{ height: '1px' }} />
            <div style={{ padding: '20px 25px' }}>
              <button
                onClick={handleAddAllToCart}
                className="w-full flex items-center justify-center border-none cursor-pointer font-semibold text-[#FCFCFC]"
                style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px', lineHeight: '18px' }}
              >
                Add All To Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FavouritesPage;
