import { useState, useEffect, useCallback } from 'react';
import type { Banner } from '../../types';
import BannerSlide from '../molecules/BannerSlide';

interface BannerCarouselProps {
  banners: Banner[];
  autoPlayInterval?: number;
}

const BannerCarousel = ({ banners, autoPlayInterval = 4000 }: BannerCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [banners.length, autoPlayInterval, goToNext]);

  if (banners.length === 0) return null;

  return (
    <div className="relative" role="region" aria-label="Banner carousel" aria-roledescription="carousel">
      <div className="overflow-hidden rounded-[15px]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="w-full shrink-0" role="group" aria-roledescription="slide">
              <BannerSlide banner={banner} />
            </div>
          ))}
        </div>
      </div>
      {banners.length > 1 && (
        <div className="flex justify-center gap-2 mt-3" role="tablist" aria-label="Banner slides">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                index === currentIndex ? 'bg-[#53B175]' : 'bg-[#B3B3B3]'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
