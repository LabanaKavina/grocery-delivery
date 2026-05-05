import { useNavigate } from 'react-router-dom';
import heroImg from '../assets/hero.jpg';

const OnboardingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full relative overflow-hidden bg-[#FCFCFC]">

      {/* Background image */}
      <img src={heroImg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />

      {/* Gradient overlay */}
      <div
        className="absolute left-0 right-0 bottom-0"
        style={{
          top: '50.67%',
          background: 'linear-gradient(180deg, rgba(14, 23, 39, 0) 0%, rgba(133, 133, 133, 1) 100%)',
          mixBlendMode: 'overlay',
        }}
      />

      {/* ── Mobile layout (hidden on desktop) ── */}
      <div className="lg:hidden">
        <div className="absolute" style={{ left: '182.76px', top: '485.26px', width: '48.47px', height: '56.36px' }}>
          <svg width="49" height="57" viewBox="0 0 49 57" fill="none" aria-hidden="true">
            <path d="M24.5 56C24.5 56 8 38 8 26C8 17.163 15.163 10 24 10C32.837 10 40 17.163 40 26C40 38 24.5 56 24.5 56Z" fill="white"/>
            <path d="M24 10C24 10 18 4 12 6C12 6 16 10 20 12" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M24 10C24 10 30 4 36 6C36 6 32 10 28 12" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        <h1 className="absolute text-white text-center" style={{ left: '80.5px', top: '577.28px', width: '253px', fontSize: '48px', fontWeight: 600, lineHeight: '29px' }}>
          Welcome<br /><br />to our store
        </h1>
        <p className="absolute text-center" style={{ left: '59.5px', top: '682.28px', width: '295px', fontSize: '16px', fontWeight: 400, lineHeight: '15px', color: 'rgba(252, 252, 252, 0.7)' }}>
          Get your groceries in as fast as one hour
        </p>
        <button
          onClick={() => navigate('/signin')}
          className="absolute cursor-pointer border-none"
          style={{ left: '30.5px', top: '738.16px', width: '353px', height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px', fontWeight: 600, lineHeight: '18px', color: '#FFF9FF', textAlign: 'center' }}
        >
          Get Started
        </button>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-center">
        <div
          className="flex flex-col items-center text-center"
          style={{ maxWidth: '480px', padding: '48px', background: 'rgba(0,0,0,0.35)', borderRadius: '24px', backdropFilter: 'blur(12px)' }}
        >
          {/* Icon */}
          <svg width="56" height="66" viewBox="0 0 49 57" fill="none" aria-hidden="true" style={{ marginBottom: '24px' }}>
            <path d="M24.5 56C24.5 56 8 38 8 26C8 17.163 15.163 10 24 10C32.837 10 40 17.163 40 26C40 38 24.5 56 24.5 56Z" fill="white"/>
            <path d="M24 10C24 10 18 4 12 6C12 6 16 10 20 12" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M24 10C24 10 30 4 36 6C36 6 32 10 28 12" stroke="white" strokeWidth="2" fill="none"/>
          </svg>

          <h1 className="text-white" style={{ fontSize: '52px', fontWeight: 600, lineHeight: '1.1', marginBottom: '16px' }}>
            Welcome<br />to our store
          </h1>

          <p style={{ fontSize: '18px', fontWeight: 400, lineHeight: '1.6', color: 'rgba(252, 252, 252, 0.75)', marginBottom: '36px' }}>
            Get your groceries in as fast as one hour
          </p>

          <button
            onClick={() => navigate('/signin')}
            className="cursor-pointer border-none w-full"
            style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px', fontWeight: 600, color: '#FFF9FF' }}
          >
            Get Started
          </button>
        </div>
      </div>

    </div>
  );
};

export default OnboardingPage;
