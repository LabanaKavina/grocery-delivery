import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.jpg';

const OnboardingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full relative overflow-hidden bg-[#FCFCFC]">

      {/* Background image — full screen, Figma: 414×896.35 */}
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay — starts at y:454 (50.7%), mix-blend-mode: overlay */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          top: '50.67%',
          background: 'linear-gradient(180deg, rgba(14, 23, 39, 0) 0%, rgba(133, 133, 133, 1) 100%)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Carrot/nectar icon — Figma: x:182.76, y:485.26, 48.47×56.36 */}
      <div
        className="absolute"
        style={{ left: '182.76px', top: '485.26px', width: '48.47px', height: '56.36px' }}
      >
        <svg
          width="49"
          height="57"
          viewBox="0 0 49 57"
          fill="none"
          aria-hidden="true"
        >
          {/* Carrot body */}
          <path
            d="M24.5 56C24.5 56 8 38 8 26C8 17.163 15.163 10 24 10C32.837 10 40 17.163 40 26C40 38 24.5 56 24.5 56Z"
            fill="white"
          />
          {/* Carrot leaves left */}
          <path
            d="M24 10C24 10 18 4 12 6C12 6 16 10 20 12"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          {/* Carrot leaves right */}
          <path
            d="M24 10C24 10 30 4 36 6C36 6 32 10 28 12"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* "Welcome to our store" — Figma: x:80.5, y:577.28, 253×86, 48px, lh:29px, paragraphSpacing:28 */}
      <h1
        className="absolute text-white text-center"
        style={{
          left: '80.5px',
          top: '577.28px',
          width: '253px',
          fontSize: '48px',
          fontWeight: 600,
          lineHeight: '29px',
        }}
      >
        Welcome<br /><br />to our store
      </h1>

      {/* Subtitle — Figma: x:59.5, y:682.28, 295×15, 16px Gilroy-Medium, lh:15px */}
      <p
        className="absolute text-center"
        style={{
          left: '59.5px',
          top: '682.28px',
          width: '295px',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '15px',
          color: 'rgba(252, 252, 252, 0.7)',
        }}
      >
        Get your groceries in as fast as one hour
      </p>

      {/* Button — Figma: x:30.5, y:738.16, 353×67, #53B175, rounded:19, 18px Gilroy Semibold #FFF9FF */}
      <button
        onClick={() => navigate('/signin')}
        className="absolute cursor-pointer border-none"
        style={{
          left: '30.5px',
          top: '738.16px',
          width: '353px',
          height: '67px',
          background: '#53B175',
          borderRadius: '19px',
          fontSize: '18px',
          fontWeight: 600,
          lineHeight: '18px',
          color: '#FFF9FF',
          textAlign: 'center',
        }}
      >
        Get Started
      </button>

    </div>
  );
};

export default OnboardingPage;
