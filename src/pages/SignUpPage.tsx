import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { validateEmail, validatePassword } from '../utils/validators';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; form?: string }>({});

  // Derived — no state needed
  const emailValid = email.length > 0 && validateEmail(email);

  const handleSignUp = async () => {
    const next: typeof errors = {};
    if (!username) next.username = 'Please enter a username';
    if (!validateEmail(email)) next.email = 'Enter a valid email address';
    const pwdErr = validatePassword(password);
    if (pwdErr) next.password = pwdErr;
    if (Object.keys(next).length) { setErrors(next); return; }

    setErrors({});
    await signup(username, email, password);
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/home', { replace: true });
    } else {
      setErrors({ form: 'Sign up failed. Please try again.' });
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-white lg:flex lg:items-center lg:justify-center">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 75% 8%, rgba(255,180,160,0.35) 0%, transparent 45%), radial-gradient(ellipse at 25% 5%, rgba(180,200,255,0.3) 0%, transparent 40%), radial-gradient(ellipse at 85% 90%, rgba(200,180,255,0.2) 0%, transparent 40%)' }} />

      {/* Desktop card */}
      <div className="hidden lg:flex lg:flex-col lg:items-center lg:w-full lg:max-w-md lg:bg-white lg:rounded-2xl lg:shadow-lg lg:p-10 lg:relative lg:z-10 lg:gap-4">
        <svg width="48" height="60" viewBox="0 0 48 60" fill="none" aria-hidden="true">
          <path d="M24 58C24 58 8 40 8 26C8 17.163 15.163 10 24 10C32.837 10 40 17.163 40 26C40 40 24 58 24 58Z" fill="#F3603F"/>
          <path d="M18 18C18 18 16 24 17 30" stroke="#F7A593" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M24 10C24 10 20 2 14 4C14 4 18 8 22 10" fill="#53B175"/>
          <path d="M24 10C24 10 24 1 30 2C30 2 28 7 24 10" fill="#53B175"/>
          <path d="M24 10C24 10 28 3 34 5C34 5 30 9 24 10" fill="#53B175"/>
        </svg>
        <div className="w-full">
          <h1 className="font-semibold text-[#030303] mb-1" style={{ fontSize: '26px', lineHeight: '29px' }}>Sign Up</h1>
          <p className="font-medium text-[#7C7C7C] mb-4" style={{ fontSize: '16px' }}>Enter your credentials to continue</p>
          <p className="font-semibold text-[#7C7C7C] mb-1" style={{ fontSize: '16px' }}>Username</p>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Afsar Hossen Shuvo"
            className="w-full bg-transparent border-none outline-none font-medium text-[#030303] placeholder-[#B1B1B1] border-b border-[#E2E2E2] pb-2 mb-1" style={{ fontSize: '18px' }} />
          {errors.username && <p className="text-red-500 mb-2" style={{ fontSize: '12px' }}>{errors.username}</p>}
          <p className="font-semibold text-[#7C7C7C] mt-3 mb-1" style={{ fontSize: '16px' }}>Email</p>
          <div className="relative">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="imshuvo97@gmail.com"
              className="w-full bg-transparent border-none outline-none font-medium text-[#030303] placeholder-[#B1B1B1] border-b border-[#E2E2E2] pb-2 pr-8" style={{ fontSize: '18px' }} />
            {emailValid && <svg className="absolute right-0 top-1" width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true"><path d="M1 8l6 6L19 1" stroke="#53B175" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          {errors.email && <p className="text-red-500 mb-2" style={{ fontSize: '12px' }}>{errors.email}</p>}
          <p className="font-semibold text-[#7C7C7C] mt-3 mb-1" style={{ fontSize: '16px' }}>Password</p>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
              className="w-full bg-transparent border-none outline-none font-medium text-[#030303] border-b border-[#E2E2E2] pb-2 pr-8" style={{ fontSize: '18px' }} />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1 bg-transparent border-none cursor-pointer p-0" aria-label="Toggle password">
              <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
                <path d="M1 8C2.5 4.5 6.5 2 11 2s8.5 2.5 10 6c-1.5 3.5-5.5 6-10 6S2.5 11.5 1 8Z" stroke="#7C7C7C" strokeWidth="1.5"/><circle cx="11" cy="8" r="3" stroke="#7C7C7C" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
          {errors.password && <p className="text-red-500 mb-2" style={{ fontSize: '12px' }}>{errors.password}</p>}
          <p className="font-medium text-[#7C7C7C] mt-3 mb-4" style={{ fontSize: '14px' }}>
            By continuing you agree to our <span className="text-[#53B175]">Terms of Service</span> and <span className="text-[#53B175]">Privacy Policy</span>.
          </p>
          {errors.form && <p className="text-red-500 text-sm mb-3">{errors.form}</p>}
          <button onClick={handleSignUp} disabled={isLoading}
            className="w-full border-none cursor-pointer font-semibold text-[#FFF9FF] disabled:opacity-50"
            style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px' }}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
          <p className="text-center font-semibold text-[#030303] mt-4" style={{ fontSize: '14px' }}>
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="bg-transparent border-none cursor-pointer text-[#53B175] font-semibold" style={{ fontSize: '14px' }}>Signin</button>
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

      <h1 className="absolute font-semibold text-[#030303]" style={{ left: '25px', top: '233px', fontSize: '26px', lineHeight: '29px' }}>Sign Up</h1>
      <p className="absolute font-medium text-[#7C7C7C]" style={{ left: '25px', top: '277px', fontSize: '16px', lineHeight: '15px' }}>Enter your credentials to continue</p>

      {/* Username */}
      <p className="absolute font-semibold text-[#7C7C7C]" style={{ left: '25px', top: '332px', fontSize: '16px', lineHeight: '29px' }}>Username</p>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Afsar Hossen Shuvo"
        className="absolute bg-transparent border-none outline-none font-medium text-[#030303] placeholder-[#B1B1B1]"
        style={{ left: '25px', top: '371px', width: '364px', fontSize: '18px', lineHeight: '29px' }} />
      <div className="absolute bg-[#E2E2E2]" style={{ left: '25px', top: '410px', width: '364px', height: '1px' }} />
      {errors.username && <p className="absolute text-red-500" style={{ left: '25px', top: '414px', fontSize: '12px' }}>{errors.username}</p>}

      {/* Email */}
      <p className="absolute font-semibold text-[#7C7C7C]" style={{ left: '25px', top: '440px', fontSize: '16px', lineHeight: '29px' }}>Email</p>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="imshuvo97@gmail.com"
        className="absolute bg-transparent border-none outline-none font-medium text-[#030303] placeholder-[#B1B1B1]"
        style={{ left: '25px', top: '479px', width: '330px', fontSize: '18px', lineHeight: '29px' }} />
      {emailValid && (
        <svg className="absolute" style={{ right: '25px', top: '484px' }} width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
          <path d="M1 8l6 6L19 1" stroke="#53B175" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      <div className="absolute bg-[#E2E2E2]" style={{ left: '25px', top: '519px', width: '364px', height: '1px' }} />
      {errors.email && <p className="absolute text-red-500" style={{ left: '25px', top: '523px', fontSize: '12px' }}>{errors.email}</p>}

      {/* Password */}
      <p className="absolute font-semibold text-[#7C7C7C]" style={{ left: '25px', top: '549px', fontSize: '16px', lineHeight: '29px' }}>Password</p>
      <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
        className="absolute bg-transparent border-none outline-none font-medium text-[#030303]"
        style={{ left: '25px', top: '589px', width: '330px', fontSize: '18px', lineHeight: '29px' }} />
      <button onClick={() => setShowPassword(!showPassword)} className="absolute bg-transparent border-none cursor-pointer p-0" style={{ right: '25px', top: '594px' }} aria-label="Toggle password">
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
          {showPassword
            ? <path d="M1 1l20 14M9.5 4A5 5 0 0116 9m-2 2.5A5 5 0 016 9" stroke="#7C7C7C" strokeWidth="1.5" strokeLinecap="round"/>
            : <><path d="M1 8C2.5 4.5 6.5 2 11 2s8.5 2.5 10 6c-1.5 3.5-5.5 6-10 6S2.5 11.5 1 8Z" stroke="#7C7C7C" strokeWidth="1.5"/><circle cx="11" cy="8" r="3" stroke="#7C7C7C" strokeWidth="1.5"/></>
          }
        </svg>
      </button>
      <div className="absolute bg-[#E2E2E2]" style={{ left: '25px', top: '627px', width: '364px', height: '1px' }} />
      {errors.password && <p className="absolute text-red-500" style={{ left: '25px', top: '631px', fontSize: '12px' }}>{errors.password}</p>}

      {/* Terms */}
      <p className="absolute font-medium text-[#7C7C7C]" style={{ left: '50%', transform: 'translateX(-50%)', top: '647px', width: '364px', maxWidth: 'calc(100% - 50px)', fontSize: '14px', lineHeight: '110%', letterSpacing: '0.05em' }}>
        By continuing you agree to our <span className="text-[#53B175]">Terms of Service</span> and <span className="text-[#53B175]">Privacy Policy</span>.
      </p>

      {errors.form && <p className="absolute text-red-500 text-sm" style={{ left: '25px', top: '700px' }}>{errors.form}</p>}

      <button onClick={handleSignUp} disabled={isLoading}
        className="absolute border-none cursor-pointer font-semibold text-[#FFF9FF] disabled:opacity-50"
        style={{ left: '50%', transform: 'translateX(-50%)', top: '716px', width: '364px', maxWidth: 'calc(100% - 50px)', height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px' }}>
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </button>

      <div className="absolute w-full text-center font-semibold text-[#030303]" style={{ top: '808px', fontSize: '14px', letterSpacing: '0.05em' }}>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} className="bg-transparent border-none cursor-pointer text-[#53B175] font-semibold" style={{ fontSize: '14px' }}>
          Signin
        </button>
      </div>
      </div> {/* end lg:hidden */}
    </div>
  );
};

export default SignUpPage;
