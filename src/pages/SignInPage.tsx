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
    <div className="h-screen w-full relative overflow-hidden bg-[#FCFCFC]">
      {/* Top grocery image */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: '42%' }}>
        <img
          src={groceryBg}
          alt=""
          aria-hidden="true"
          className="absolute"
          style={{
            width: '130%', height: '130%', top: '-15%', right: '-15%', left: 'auto',
            objectFit: 'cover', transform: 'rotate(-8deg)', transformOrigin: 'top right',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(to top, #FCFCFC, transparent)' }} />
      </div>

      {/* Bottom frosted glass */}
      <div className="absolute left-0 right-0 bottom-0" style={{ top: '66%', background: 'rgba(254,254,254,0.55)', backdropFilter: 'blur(45px)', WebkitBackdropFilter: 'blur(45px)' }} />

      {/* Heading */}
      <h1 className="absolute font-semibold text-[#030303]" style={{ left: '25px', top: '47%', fontSize: '26px', lineHeight: '29px', width: '222px' }}>
        Get your groceries<br />with nectar
      </h1>

      {/* Globe + +880 + input */}
      <div className="absolute" style={{ left: '25px', top: '57.7%', width: 'calc(100% - 50px)' }}>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
            <circle cx="8" cy="8" r="6.2" stroke="#1E1E1E" strokeWidth="1.6" />
            <ellipse cx="8" cy="8" rx="3" ry="6.2" stroke="#1E1E1E" strokeWidth="1.6" />
            <line x1="2" y1="8" x2="14" y2="8" stroke="#1E1E1E" strokeWidth="1.6" />
          </svg>
          <span className="font-medium text-[#030303] shrink-0" style={{ fontSize: '18px', lineHeight: '29px' }}>+880</span>
          <input
            type="tel" inputMode="numeric" value={phone}
            onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); if (error) setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            maxLength={10} aria-label="Phone number"
            className="flex-1 bg-transparent border-none outline-none text-[#030303]"
            style={{ fontSize: '18px', lineHeight: '29px' }}
          />
          {/* Green forward arrow — submit */}
          <button
            onClick={handleSubmit}
            className="w-12 h-12 rounded-full flex items-center justify-center border-none cursor-pointer shrink-0"
            style={{ background: '#53B175' }}
            aria-label="Continue"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 10h10M10 5l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        {error && <p role="alert" className="text-sm text-red-500 mt-1">{error}</p>}
      </div>

      {/* Underline */}
      <div className="absolute bg-[#E2E2E2]" style={{ left: '25px', top: '62%', width: 'calc(100% - 50px)', height: '1px' }} />

      {/* Or connect */}
      <p className="absolute w-full text-center font-semibold text-[#828282]" style={{ top: '66.6%', fontSize: '14px' }}>
        Or connect with social media
      </p>

      {/* Google */}
      <button className="absolute flex items-center justify-center gap-3 text-white font-semibold cursor-pointer border-none"
        style={{ left: '25px', top: '72.8%', width: 'calc(100% - 50px)', maxWidth: '364px', height: '67px', background: '#5383EC', borderRadius: '19px', fontSize: '18px' }}
        onClick={handleSubmit}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M11 4.5a6.5 6.5 0 014.6 1.9l-1.92 1.92A3.8 3.8 0 0011 7.1 3.8 3.8 0 007.2 11 3.8 3.8 0 0011 14.9c1.74 0 3.2-1.16 3.65-2.72H11V9.8h6.5A6.5 6.5 0 0111 17.5a6.5 6.5 0 010-13z" fill="white"/>
        </svg>
        Continue with Google
      </button>

      {/* Facebook */}
      <button className="absolute flex items-center justify-center gap-3 text-white font-semibold cursor-pointer border-none"
        style={{ left: '25px', top: '82.5%', width: 'calc(100% - 50px)', maxWidth: '364px', height: '67px', background: '#4A66AC', borderRadius: '19px', fontSize: '18px' }}
        onClick={handleSubmit}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M19.5 11a8.5 8.5 0 10-9.83 8.4v-5.94H7.6V11h2.07V9.2c0-2.04 1.22-3.17 3.08-3.17.89 0 1.82.16 1.82.16v2h-1.03c-1.01 0-1.33.63-1.27V11h2.27l-.36 2.46h-1.91v5.94A8.5 8.5 0 0019.5 11z" fill="white"/>
        </svg>
        Continue with Facebook
      </button>

      {/* Already have an account? Log In */}
      <p
        className="absolute w-full text-center font-semibold text-[#181725]"
        style={{ top: '93%', fontSize: '14px', letterSpacing: '0.05em' }}
      >
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
          className="bg-transparent border-none cursor-pointer text-[#53B175] font-semibold"
          style={{ fontSize: '14px' }}
        >
          Log In
        </button>
      </p>
    </div>
  );
};

export default SignInPage;
