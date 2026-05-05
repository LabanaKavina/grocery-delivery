import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validatePhone } from '../utils/validators';
import { useAuthStore } from '../stores/authStore';
import groceryBg from '../assets/grocery-bg.jpg';

const SignInPage = () => {
  const navigate = useNavigate();
  const sendOtp = useAuthStore((s) => s.sendOtp);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number');
      return;
    }
    await sendOtp(phone);
    navigate('/verification', { state: { phone } });
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-[#FCFCFC] lg:flex lg:items-center lg:justify-center">

      {/* Background image — visible on both, blurred on desktop */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden lg:inset-0 lg:h-full" style={{ height: '42%' }}>
        <img
          src={groceryBg} alt="" aria-hidden="true"
          className="absolute lg:w-full lg:h-full lg:object-cover lg:opacity-20"
          style={{ width: '130%', height: '130%', top: '-15%', right: '-15%', left: 'auto', objectFit: 'cover', transform: 'rotate(-8deg)', transformOrigin: 'top right' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 lg:hidden" style={{ background: 'linear-gradient(to top, #FCFCFC, transparent)' }} />
      </div>

      {/* ── Desktop card ── */}
      <div className="hidden lg:flex lg:flex-col lg:w-full lg:max-w-md lg:bg-white lg:rounded-2xl lg:shadow-xl lg:p-10 lg:relative lg:z-10 lg:gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-2">
          <svg width="36" height="36" viewBox="0 0 48 60" fill="none" aria-hidden="true">
            <path d="M24 58C24 58 8 40 8 26C8 17.163 15.163 10 24 10C32.837 10 40 17.163 40 26C40 40 24 58 24 58Z" fill="#F3603F"/>
            <path d="M24 10C24 10 20 2 14 4C14 4 18 8 22 10" fill="#53B175"/>
            <path d="M24 10C24 10 24 1 30 2C30 2 28 7 24 10" fill="#53B175"/>
          </svg>
          <span className="font-bold text-[#181725]" style={{ fontSize: '24px' }}>nectar</span>
        </div>

        <div>
          <h1 className="font-semibold text-[#030303]" style={{ fontSize: '26px', lineHeight: '34px', marginBottom: '8px' }}>
            Get your groceries<br />with nectar
          </h1>
          <p className="text-[#7C7C7C]" style={{ fontSize: '15px' }}>Enter your mobile number to continue</p>
        </div>

        {/* Phone input */}
        <div>
          <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid #E2E2E2' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
              <circle cx="8" cy="8" r="6.2" stroke="#1E1E1E" strokeWidth="1.6"/>
              <ellipse cx="8" cy="8" rx="3" ry="6.2" stroke="#1E1E1E" strokeWidth="1.6"/>
              <line x1="2" y1="8" x2="14" y2="8" stroke="#1E1E1E" strokeWidth="1.6"/>
            </svg>
            <span className="font-medium text-[#030303] shrink-0" style={{ fontSize: '18px' }}>+880</span>
            <input
              type="tel" inputMode="numeric" value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); if (error) setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              maxLength={10} aria-label="Phone number" placeholder="Enter phone number"
              className="flex-1 bg-transparent border-none outline-none text-[#030303] placeholder-[#B1B1B1]"
              style={{ fontSize: '18px' }}
            />
            <button onClick={handleSubmit} className="w-12 h-12 rounded-full flex items-center justify-center border-none cursor-pointer shrink-0" style={{ background: '#53B175' }} aria-label="Continue">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 10h10M10 5l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {error && <p role="alert" className="text-sm text-red-500 mt-2">{error}</p>}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#E2E2E2]" />
          <span className="font-semibold text-[#828282]" style={{ fontSize: '14px' }}>Or connect with social media</span>
          <div className="flex-1 h-px bg-[#E2E2E2]" />
        </div>

        {/* Social buttons */}
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-3 text-white font-semibold cursor-pointer border-none w-full"
            style={{ height: '67px', background: '#5383EC', borderRadius: '19px', fontSize: '18px' }}
            onClick={handleSubmit}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path d="M11 4.5a6.5 6.5 0 014.6 1.9l-1.92 1.92A3.8 3.8 0 0011 7.1 3.8 3.8 0 007.2 11 3.8 3.8 0 0011 14.9c1.74 0 3.2-1.16 3.65-2.72H11V9.8h6.5A6.5 6.5 0 0111 17.5a6.5 6.5 0 010-13z" fill="white"/>
            </svg>
            Continue with Google
          </button>
          <button className="flex items-center justify-center gap-3 text-white font-semibold cursor-pointer border-none w-full"
            style={{ height: '67px', background: '#4A66AC', borderRadius: '19px', fontSize: '18px' }}
            onClick={handleSubmit}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="white"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        <p className="text-center font-semibold text-[#181725]" style={{ fontSize: '14px' }}>
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="bg-transparent border-none cursor-pointer text-[#53B175] font-semibold" style={{ fontSize: '14px' }}>
            Log In
          </button>
        </p>
      </div>

      {/* ── Mobile layout (hidden on desktop) ── */}
      <div className="lg:hidden">
        {/* Bottom frosted glass */}
        <div className="absolute left-0 right-0 bottom-0" style={{ top: '66%', background: 'rgba(254,254,254,0.55)', backdropFilter: 'blur(45px)', WebkitBackdropFilter: 'blur(45px)' }} />

        <h1 className="absolute font-semibold text-[#030303]" style={{ left: '25px', top: '47%', fontSize: '26px', lineHeight: '29px', width: '222px' }}>
          Get your groceries<br />with nectar
        </h1>

        <div className="absolute" style={{ left: '25px', top: '57.7%', width: 'calc(100% - 110px)' }}>
          <div className="flex items-center gap-2 pb-3" style={{ borderBottom: '1px solid #E2E2E2' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
              <circle cx="8" cy="8" r="6.2" stroke="#1E1E1E" strokeWidth="1.6"/>
              <ellipse cx="8" cy="8" rx="3" ry="6.2" stroke="#1E1E1E" strokeWidth="1.6"/>
              <line x1="2" y1="8" x2="14" y2="8" stroke="#1E1E1E" strokeWidth="1.6"/>
            </svg>
            <span className="font-medium text-[#030303] shrink-0" style={{ fontSize: '18px', lineHeight: '29px' }}>+880</span>
            <input
              type="tel" inputMode="numeric" value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); if (error) setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              maxLength={10} aria-label="Phone number"
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-[#030303]"
              style={{ fontSize: '18px', lineHeight: '29px' }}
            />
          </div>
          {error && <p role="alert" className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        {/* Arrow button — positioned to the right of the input */}
        <button
          onClick={handleSubmit}
          className="absolute w-12 h-12 rounded-full flex items-center justify-center border-none cursor-pointer"
          style={{ right: '25px', top: '57.7%', background: '#53B175' }}
          aria-label="Continue"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 10h10M10 5l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p className="absolute w-full text-center font-semibold text-[#828282]" style={{ top: '66.6%', fontSize: '14px' }}>
          Or connect with social media
        </p>

        <button className="absolute flex items-center justify-center gap-3 text-white font-semibold cursor-pointer border-none"
          style={{ left: '25px', top: '72.8%', width: 'calc(100% - 50px)', maxWidth: '364px', height: '67px', background: '#5383EC', borderRadius: '19px', fontSize: '18px' }}
          onClick={handleSubmit}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M11 4.5a6.5 6.5 0 014.6 1.9l-1.92 1.92A3.8 3.8 0 0011 7.1 3.8 3.8 0 007.2 11 3.8 3.8 0 0011 14.9c1.74 0 3.2-1.16 3.65-2.72H11V9.8h6.5A6.5 6.5 0 0111 17.5a6.5 6.5 0 010-13z" fill="white"/>
          </svg>
          Continue with Google
        </button>

        <button className="absolute flex items-center justify-center gap-3 text-white font-semibold cursor-pointer border-none"
          style={{ left: '25px', top: '82.5%', width: 'calc(100% - 50px)', maxWidth: '364px', height: '67px', background: '#4A66AC', borderRadius: '19px', fontSize: '18px' }}
          onClick={handleSubmit}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="white"/>
          </svg>
          Continue with Facebook
        </button>

        <p className="absolute w-full text-center font-semibold text-[#181725]" style={{ top: '93%', fontSize: '14px', letterSpacing: '0.05em' }}>
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="bg-transparent border-none cursor-pointer text-[#53B175] font-semibold" style={{ fontSize: '14px' }}>
            Log In
          </button>
        </p>
      </div>

    </div>
  );
};

export default SignInPage;
