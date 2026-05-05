import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { validateEmail, validatePassword } from '../utils/validators';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});

  const handleLogin = async () => {
    const next: typeof errors = {};
    if (!validateEmail(email)) next.email = 'Enter a valid email address';
    const pwdErr = validatePassword(password);
    if (pwdErr) next.password = pwdErr;
    if (Object.keys(next).length) { setErrors(next); return; }

    setErrors({});
    await login(email, password);
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/home', { replace: true });
    } else {
      setErrors({ form: 'Invalid credentials' });
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-white lg:flex lg:items-center lg:justify-center">

      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 75% 8%, rgba(255,180,160,0.35) 0%, transparent 45%), radial-gradient(ellipse at 25% 5%, rgba(180,200,255,0.3) 0%, transparent 40%), radial-gradient(ellipse at 85% 90%, rgba(200,180,255,0.25) 0%, transparent 40%), radial-gradient(ellipse at 15% 85%, rgba(180,230,200,0.2) 0%, transparent 35%)',
      }} />

      {/* Desktop card wrapper */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:w-full lg:max-w-md lg:bg-white lg:rounded-2xl lg:shadow-lg lg:p-10 lg:relative lg:z-10 lg:gap-6">
        {/* Carrot */}
        <svg width="48" height="60" viewBox="0 0 48 60" fill="none" aria-hidden="true">
          <path d="M24 58C24 58 8 40 8 26C8 17.163 15.163 10 24 10C32.837 10 40 17.163 40 26C40 40 24 58 24 58Z" fill="#F3603F"/>
          <path d="M18 18C18 18 16 24 17 30" stroke="#F7A593" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M24 10C24 10 20 2 14 4C14 4 18 8 22 10" fill="#53B175"/>
          <path d="M24 10C24 10 24 1 30 2C30 2 28 7 24 10" fill="#53B175"/>
          <path d="M24 10C24 10 28 3 34 5C34 5 30 9 24 10" fill="#53B175"/>
        </svg>
        <div className="w-full">
          <h1 className="font-semibold text-[#181725] mb-1" style={{ fontSize: '26px', lineHeight: '29px' }}>Loging</h1>
          <p className="font-medium text-[#7C7C7C] mb-6" style={{ fontSize: '16px' }}>Enter your emails and password</p>
          {/* Email */}
          <p className="font-semibold text-[#7C7C7C] mb-2" style={{ fontSize: '16px' }}>Email</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="imshuvo97@gmail.com"
            className="w-full bg-transparent border-none outline-none font-medium text-[#181725] placeholder-[#B1B1B1] border-b border-[#E2E2E2] pb-2 mb-1"
            style={{ fontSize: '18px' }} />
          {errors.email && <p className="text-red-500 mb-3" style={{ fontSize: '12px' }}>{errors.email}</p>}
          {/* Password */}
          <p className="font-semibold text-[#7C7C7C] mt-4 mb-2" style={{ fontSize: '16px' }}>Password</p>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full bg-transparent border-none outline-none font-medium text-[#181725] border-b border-[#E2E2E2] pb-2 pr-8"
              style={{ fontSize: '18px' }} />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1 bg-transparent border-none cursor-pointer p-0" aria-label="Toggle password">
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
                <path d="M1 8C2.5 4.5 6.5 2 11 2s8.5 2.5 10 6c-1.5 3.5-5.5 6-10 6S2.5 11.5 1 8Z" stroke="#7C7C7C" strokeWidth="1.5"/>
                <circle cx="11" cy="8" r="3" stroke="#7C7C7C" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
          {errors.password && <p className="text-red-500 mt-1" style={{ fontSize: '12px' }}>{errors.password}</p>}
          <div className="flex justify-end mt-2 mb-4">
            <button className="bg-transparent border-none cursor-pointer font-medium text-[#181725]" style={{ fontSize: '14px' }}>Forgot Password?</button>
          </div>
          {errors.form && <p className="text-red-500 text-sm mb-3">{errors.form}</p>}
          <button onClick={handleLogin} disabled={isLoading}
            className="w-full border-none cursor-pointer font-semibold text-[#FFF9FF] disabled:opacity-50"
            style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px' }}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
          <p className="text-center font-semibold text-[#181725] mt-4" style={{ fontSize: '14px' }}>
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="bg-transparent border-none cursor-pointer text-[#53B175] font-semibold" style={{ fontSize: '14px' }}>Signup</button>
          </p>
        </div>
      </div>

      {/* Mobile layout — hidden on desktop */}
      <div className="lg:hidden">

      {/* Carrot icon */}
      <div className="absolute" style={{ left: '50%', top: '77px', transform: 'translateX(-50%)' }}>
        <svg width="48" height="60" viewBox="0 0 48 60" fill="none" aria-hidden="true">
          <path d="M24 58C24 58 8 40 8 26C8 17.163 15.163 10 24 10C32.837 10 40 17.163 40 26C40 40 24 58 24 58Z" fill="#F3603F"/>
          <path d="M18 18C18 18 16 24 17 30" stroke="#F7A593" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M24 10C24 10 20 2 14 4C14 4 18 8 22 10" fill="#53B175"/>
          <path d="M24 10C24 10 24 1 30 2C30 2 28 7 24 10" fill="#53B175"/>
          <path d="M24 10C24 10 28 3 34 5C34 5 30 9 24 10" fill="#53B175"/>
        </svg>
      </div>

      <h1 className="absolute font-semibold text-[#181725]" style={{ left: '25px', top: '233px', fontSize: '26px', lineHeight: '29px' }}>Loging</h1>
      <p className="absolute font-medium text-[#7C7C7C]" style={{ left: '25px', top: '277px', fontSize: '16px', lineHeight: '15px' }}>Enter your emails and password</p>

      {/* Email */}
      <p className="absolute font-semibold text-[#7C7C7C]" style={{ left: '25px', top: '332px', fontSize: '16px', lineHeight: '29px' }}>Email</p>
      <input
        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="imshuvo97@gmail.com"
        className="absolute bg-transparent border-none outline-none font-medium text-[#181725] placeholder-[#B1B1B1]"
        style={{ left: '50%', transform: 'translateX(-50%)', top: '371px', width: 'calc(100% - 50px)', maxWidth: '364px', fontSize: '18px', lineHeight: '29px' }}
      />
      <div className="absolute bg-[#E2E2E2]" style={{ left: '50%', transform: 'translateX(-50%)', top: '410px', width: 'calc(100% - 50px)', maxWidth: '364px', height: '1px' }} />
      {errors.email && <p className="absolute text-red-500" style={{ left: '25px', top: '415px', fontSize: '12px' }}>{errors.email}</p>}

      {/* Password */}
      <p className="absolute font-semibold text-[#7C7C7C]" style={{ left: '25px', top: '440px', fontSize: '16px', lineHeight: '29px' }}>Password</p>
      <input
        type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        className="absolute bg-transparent border-none outline-none font-medium text-[#181725]"
        style={{ left: '25px', top: '480px', width: 'calc(100% - 90px)', maxWidth: '330px', fontSize: '18px', lineHeight: '29px' }}
      />
      <button onClick={() => setShowPassword(!showPassword)} className="absolute bg-transparent border-none cursor-pointer p-0" style={{ right: '25px', top: '485px' }} aria-label={showPassword ? 'Hide password' : 'Show password'}>
        {showPassword ? (
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" aria-hidden="true">
            <path d="M1 1l20 16M9.5 4.5A5 5 0 0116 9m-1.5 3.5A5 5 0 016 9c0-.9.24-1.74.66-2.46M4 5.5C2.5 6.8 1.5 8 1 9c1.5 3.5 5.5 6 10 6 1.5 0 2.9-.3 4.2-.8" stroke="#7C7C7C" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <path d="M1 8C2.5 4.5 6.5 2 11 2s8.5 2.5 10 6c-1.5 3.5-5.5 6-10 6S2.5 11.5 1 8Z" stroke="#7C7C7C" strokeWidth="1.5"/>
            <circle cx="11" cy="8" r="3" stroke="#7C7C7C" strokeWidth="1.5"/>
          </svg>
        )}
      </button>
      <div className="absolute bg-[#E2E2E2]" style={{ left: '50%', transform: 'translateX(-50%)', top: '519px', width: 'calc(100% - 50px)', maxWidth: '364px', height: '1px' }} />
      {errors.password && <p className="absolute text-red-500" style={{ left: '25px', top: '524px', fontSize: '12px' }}>{errors.password}</p>}

      <button className="absolute bg-transparent border-none cursor-pointer font-medium text-[#181725]" style={{ right: '25px', top: '539px', fontSize: '14px', letterSpacing: '0.05em' }}>
        Forgot Password?
      </button>

      {errors.form && <p className="absolute text-red-500 text-sm" style={{ left: '25px', top: '562px' }}>{errors.form}</p>}

      <button
        onClick={handleLogin} disabled={isLoading}
        className="absolute left-1/2 -translate-x-1/2 border-none cursor-pointer font-semibold text-[#FFF9FF] disabled:opacity-50"
        style={{ top: '583px', width: '364px', maxWidth: 'calc(100% - 50px)', height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px', lineHeight: '18px' }}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>

      <div className="absolute w-full text-center font-semibold text-[#181725]" style={{ top: '675px', fontSize: '14px', letterSpacing: '0.05em' }}>
        Don't have an account?{' '}
        <button onClick={() => navigate('/signup')} className="bg-transparent border-none cursor-pointer text-[#53B175] font-semibold" style={{ fontSize: '14px', letterSpacing: '0.05em' }}>
          Signup
        </button>
      </div>
      </div> {/* end lg:hidden */}
    </div>
  );
};

export default LoginPage;
