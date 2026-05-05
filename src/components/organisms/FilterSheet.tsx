import { useState, useEffect, useCallback } from 'react';
import type { FilterState } from '../../types';

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  categories: string[];
  brands: string[];
  initialFilters: FilterState;
}

const FilterSheet = ({ visible, onClose, onApply, categories, brands, initialFilters }: FilterSheetProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters.categories);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialFilters.brands);

  useEffect(() => {
    if (visible) {
      setSelectedCategories(initialFilters.categories);
      setSelectedBrands(initialFilters.brands);
    }
  }, [visible, initialFilters]);

  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  }, []);

  const toggleBrand = useCallback((brand: string) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  }, []);

  const handleApply = () => {
    onApply({ categories: selectedCategories, brands: selectedBrands });
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Filter products">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 animate-fade-in" onClick={onClose} aria-hidden="true" />

      {/* Sheet — full screen with #F2F3F2 bg, white header area */}
      <div className="absolute inset-0 flex flex-col animate-slide-up">

        {/* White header — "Filters" title + close */}
        <div className="bg-white flex items-center justify-between px-6" style={{ paddingTop: '55px', paddingBottom: '16px' }}>
          {/* Close/back arrow */}
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer p-0" aria-label="Close filters">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="font-bold text-[#181725]" style={{ fontSize: '20px', lineHeight: '18px' }}>Filters</h1>
          <div style={{ width: '16px' }} />
        </div>

        {/* Gray content area — border-radius: 30px 30px 0 0 */}
        <div
          className="flex-1 overflow-y-auto px-6 pt-6"
          style={{ background: '#F2F3F2', borderRadius: '30px 30px 0 0' }}
        >

          {/* Categories section */}
          {categories.length > 0 && (
            <div className="mb-8">
              <h2 className="font-semibold text-[#181725] mb-5" style={{ fontSize: '24px', lineHeight: '29px' }}>
                Categories
              </h2>
              <div className="flex flex-col gap-5">
                {categories.map((cat) => {
                  const checked = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="flex items-center gap-4 bg-transparent border-none cursor-pointer p-0 text-left"
                    >
                      {/* Checkbox — 24×24, border-radius: 8px */}
                      <div
                        className="flex items-center justify-center shrink-0"
                        style={{
                          width: '24px', height: '24px', borderRadius: '8px',
                          background: checked ? '#53B175' : 'transparent',
                          border: checked ? 'none' : '1.5px solid #B1B1B1',
                        }}
                      >
                        {checked && (
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                            <path d="M1 5l4 4L13 1" stroke="#FCFCFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span
                        className="font-medium"
                        style={{ fontSize: '16px', lineHeight: '19px', color: checked ? '#53B175' : '#181725' }}
                      >
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Brand section */}
          {brands.length > 0 && (
            <div className="mb-8">
              <h2 className="font-semibold text-[#181725] mb-5" style={{ fontSize: '24px', lineHeight: '29px' }}>
                Brand
              </h2>
              <div className="flex flex-col gap-5">
                {brands.map((brand) => {
                  const checked = selectedBrands.includes(brand);
                  return (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className="flex items-center gap-4 bg-transparent border-none cursor-pointer p-0 text-left"
                    >
                      <div
                        className="flex items-center justify-center shrink-0"
                        style={{
                          width: '24px', height: '24px', borderRadius: '8px',
                          background: checked ? '#53B175' : 'transparent',
                          border: checked ? 'none' : '1.5px solid #B1B1B1',
                        }}
                      >
                        {checked && (
                          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                            <path d="M1 5l4 4L13 1" stroke="#FCFCFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span
                        className="font-medium"
                        style={{ fontSize: '16px', lineHeight: '19px', color: checked ? '#53B175' : '#181725' }}
                      >
                        {brand}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spacer to push button to bottom */}
          <div className="h-24" />
        </div>

        {/* Apply Filter button — sticky at bottom, above bottom nav */}
        <div className="bg-[#F2F3F2] px-6 pt-4" style={{ paddingBottom: 'max(32px, env(safe-area-inset-bottom))' }}>
          <button
            onClick={handleApply}
            className="w-full border-none cursor-pointer font-semibold text-[#FFF9FF]"
            style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px', lineHeight: '18px' }}
          >
            Apply Filter
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterSheet;
