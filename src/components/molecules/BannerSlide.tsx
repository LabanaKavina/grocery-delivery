import type { Banner } from '../../types';

interface BannerSlideProps {
  banner: Banner;
}

const BannerSlide = ({ banner }: BannerSlideProps) => {
  return (
    <div className="relative w-full h-[115px] rounded-[15px] overflow-hidden">
      <img
        src={banner.image}
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex flex-col justify-center px-6">
        <h3 className="text-white text-lg font-bold leading-tight">{banner.title}</h3>
        {banner.subtitle && (
          <p className="text-white/80 text-sm mt-1">{banner.subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default BannerSlide;
