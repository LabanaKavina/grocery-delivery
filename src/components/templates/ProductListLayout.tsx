import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductListLayoutProps {
  title: string;
  onFilterClick?: () => void;
  children: ReactNode;
}

const ProductListLayout = ({ title, onFilterClick, children }: ProductListLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 bg-white" style={{ height: '80px', paddingTop: '57px' }}>
        <button
          onClick={() => navigate(-1)}
          className="p-0 bg-transparent border-none cursor-pointer"
          aria-label="Go back"
        >
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
            <path d="M9 1L1 9l8 8" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <h1 className="font-bold text-[#181725] absolute left-1/2 -translate-x-1/2" style={{ fontSize: '20px', lineHeight: '18px' }}>
          {title}
        </h1>

        {onFilterClick ? (
          <button
            onClick={onFilterClick}
            className="p-0 bg-transparent border-none cursor-pointer lg:hidden"
            aria-label="Open filters"
          >
            {/* Figma filter icon: two circles with lines */}
            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" aria-hidden="true">
              <circle cx="4.5" cy="5" r="2.5" stroke="#181725" strokeWidth="1.5"/>
              <line x1="0" y1="5" x2="2" y2="5" stroke="#181725" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="7" y1="5" x2="17" y2="5" stroke="#181725" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="12.5" cy="13" r="2.5" stroke="#181725" strokeWidth="1.5"/>
              <line x1="0" y1="13" x2="10" y2="13" stroke="#181725" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="15" y1="13" x2="17" y2="13" stroke="#181725" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        ) : (
          <div className="w-6" />
        )}
      </header>
      <main className="p-4 pt-6 lg:px-8 lg:max-w-7xl lg:mx-auto">
        {children}
      </main>
    </div>
  );
};

export default ProductListLayout;
