import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const SplashPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isAuthenticated ? '/home' : '/onboarding', { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen bg-[#53B175] flex flex-col items-center justify-center relative">
      {/* Logo + wordmark group */}
      <div className="flex items-center gap-3">
        {/* Carrot icon */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          {/* Carrot body */}
          <path
            d="M24 44C24 44 14 30 14 22a10 10 0 0 1 20 0c0 8-10 22-10 22Z"
            fill="#FFFFFF"
          />
          {/* Carrot leaves */}
          <path
            d="M24 12c-1.5-4-5-7-5-7s4.5 1 6 4c1.5-3 6-4 6-4s-3.5 3-5 7"
            fill="#FFFFFF"
            opacity="0.8"
          />
        </svg>
        {/* Wordmark */}
        <h1
          className="text-white font-bold"
          style={{ fontSize: '42px', lineHeight: '48px', letterSpacing: '1px' }}
        >
          nectar
        </h1>
      </div>

      {/* Tagline — matching Figma: 14px, letter-spacing 5.5px */}
      <p
        className="text-white text-center font-medium mt-2"
        style={{ fontSize: '14px', lineHeight: '18px', letterSpacing: '5.5px' }}
      >
        online groceries
      </p>
    </div>
  );
};

export default SplashPage;
