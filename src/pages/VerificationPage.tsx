import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useGlobalToast } from '../contexts/ToastContext';

const VerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = (location.state as { phone?: string })?.phone ?? '';
  const { verifyOtp, sendOtp, isLoading } = useAuthStore();
  const { showToast } = useGlobalToast();
  const [code, setCode] = useState('');

  useEffect(() => {
    if (code.length === 4) {
      verifyOtp(code).then((valid) => {
        if (valid) navigate('/select-location', { replace: true });
      });
    }
  }, [code, verifyOtp, navigate]);

  const handleResend = async () => {
    if (phone) await sendOtp(phone);
    showToast('Verification code resent', 'success');
  };

  const handleContinue = () => {
    if (code.length === 4) {
      verifyOtp(code).then((valid) => {
        if (valid) navigate('/select-location', { replace: true });
      });
    }
  };

  const handleKey = (key: string) => {
    if (key === 'del') {
      setCode((c) => c.slice(0, -1));
    } else {
      setCode((c) => c.length < 4 ? c + key : c);
    }
  };

  const keys = [
    [{ label: '1', sub: '' }, { label: '2', sub: 'ABC' }, { label: '3', sub: 'DEF' }],
    [{ label: '4', sub: 'GHI' }, { label: '5', sub: 'JKL' }, { label: '6', sub: 'MNO' }],
    [{ label: '7', sub: 'PQRS' }, { label: '8', sub: 'TUV' }, { label: '9', sub: 'WXYZ' }],
    [{ label: '+*#', sub: '' }, { label: '0', sub: '' }, { label: '⌫', sub: '' }],
  ];

  return (
    <div className="h-screen w-full bg-white flex flex-col lg:items-center lg:justify-center lg:bg-gray-50">

      {/* ── Desktop card ── */}
      <div className="hidden lg:flex lg:flex-col lg:w-full lg:max-w-md lg:bg-white lg:rounded-2xl lg:shadow-xl lg:p-10 lg:gap-6">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="bg-transparent border-none cursor-pointer p-0 self-start" aria-label="Go back">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
            <path d="M9 1L1 9l8 8" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div>
          <h1 className="text-[#181725] font-semibold mb-2" style={{ fontSize: '26px', lineHeight: '34px' }}>Enter your 4-digit code</h1>
          {phone && <p className="text-[#7C7C7C]" style={{ fontSize: '15px' }}>Sent to +880 {phone}</p>}
        </div>

        {/* OTP boxes — clicking focuses hidden input */}
        <div>
          <p className="font-semibold text-[#7C7C7C] mb-3" style={{ fontSize: '16px' }}>Code</p>
          <div className="relative">
            {/* Hidden input captures keyboard */}
            <input
              type="tel" inputMode="numeric" maxLength={4} value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="absolute inset-0 opacity-0 cursor-default"
              aria-label="Enter 4-digit code"
              autoFocus
            />
            {/* Visual boxes */}
            <div className="flex items-center gap-4 mb-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-center rounded-xl border-2 font-semibold text-[#181725]"
                  style={{ width: '64px', height: '64px', fontSize: '28px', borderColor: i === code.length ? '#53B175' : code[i] ? '#53B175' : '#E2E2E2', background: code[i] ? '#F0FAF4' : 'white' }}>
                  {code[i] ?? ''}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#E2E2E2]" style={{ height: '1px' }} />
        </div>

        <div className="flex items-center justify-between">
          <button onClick={handleResend} disabled={isLoading}
            className="bg-transparent border-none cursor-pointer font-medium text-[#53B175] p-0"
            style={{ fontSize: '16px' }}>
            Resend Code
          </button>
          <button onClick={handleContinue}
            className="flex items-center justify-center border-none cursor-pointer rounded-full"
            style={{ width: '67px', height: '67px', background: code.length === 4 ? '#53B175' : '#B3B3B3', flexShrink: 0, transition: 'background 0.2s' }}
            aria-label="Continue">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 10h10M10 5l5 5-5 5" stroke="#FFF9FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile layout (hidden on desktop) ── */}
      <div className="lg:hidden flex flex-col flex-1 w-full">
        {/* Top content area */}
        <div className="flex-1 bg-white px-6 pt-14">
          <button onClick={() => navigate(-1)} className="mb-8 bg-transparent border-none cursor-pointer p-0" aria-label="Go back">
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
              <path d="M9 1L1 9l8 8" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <h1 className="text-[#181725] font-semibold mb-6" style={{ fontSize: '26px', lineHeight: '29px' }}>Enter your 4-digit code</h1>

          <p className="font-semibold text-[#7C7C7C] mb-3" style={{ fontSize: '16px', lineHeight: '29px' }}>Code</p>

          <div className="flex items-center gap-6 mb-1">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="font-medium" style={{ fontSize: '18px', lineHeight: '29px', minWidth: '12px', color: code[i] ? '#181725' : '#7C7C7C' }}>
                {code[i] ?? '-'}
              </span>
            ))}
          </div>

          <div className="bg-[#E2E2E2]" style={{ height: '1px', width: '100%' }} />

          <div className="flex items-center justify-between mt-auto pt-48">
            <button onClick={handleResend} disabled={isLoading}
              className="bg-transparent border-none cursor-pointer font-medium text-[#53B175] p-0"
              style={{ fontSize: '18px', lineHeight: '29px' }}>
              Resend Code
            </button>
            <button onClick={handleContinue}
              className="flex items-center justify-center border-none cursor-pointer rounded-full"
              style={{ width: '67px', height: '67px', background: '#53B175', flexShrink: 0 }}
              aria-label="Continue">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 10h10M10 5l5 5-5 5" stroke="#FFF9FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Phone keypad */}
        <div className="border-t border-[#F2F3F2] bg-white">
          {keys.map((row, ri) => (
            <div key={ri} className="flex border-b border-[#F2F3F2] last:border-b-0">
              {row.map(({ label, sub }) => {
                const isDel = label === '⌫';
                const isSpecial = label === '+*#';
                return (
                  <button
                    key={label}
                    onClick={() => { if (isDel) handleKey('del'); else if (!isSpecial) handleKey(label); }}
                    className="flex-1 flex flex-col items-center justify-center bg-white border-none border-r border-[#F2F3F2] last:border-r-0 cursor-pointer active:bg-[#F2F3F2] transition-colors"
                    style={{ height: '72px' }}
                    aria-label={isDel ? 'Delete' : label}
                  >
                    {isDel ? (
                      <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
                        <path d="M9 1H22a1 1 0 011 1v14a1 1 0 01-1 1H9l-8-8 8-8z" stroke="#181725" strokeWidth="1.5" strokeLinejoin="round"/>
                        <path d="M14 6l4 6M18 6l-4 6" stroke="#181725" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <>
                        <span className="text-[#181725] font-medium" style={{ fontSize: isSpecial ? '14px' : '24px', lineHeight: '28px' }}>{label}</span>
                        {sub && <span className="text-[#7C7C7C]" style={{ fontSize: '9px', letterSpacing: '1px' }}>{sub}</span>}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default VerificationPage;
