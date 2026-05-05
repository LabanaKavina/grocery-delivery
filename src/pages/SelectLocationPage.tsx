import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const zones = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Sylhet'];
const areasByZone: Record<string, string[]> = {
  Dhaka: ['Banasree', 'Banani', 'Gulshan', 'Dhanmondi', 'Mirpur', 'Uttara'],
  Chittagong: ['Agrabad', 'Nasirabad', 'Halishahar', 'Patenga'],
  Rajshahi: ['Shaheb Bazar', 'Upashahar', 'Kazla'],
  Khulna: ['Sonadanga', 'Khalishpur', 'Boyra'],
  Sylhet: ['Zindabazar', 'Amberkhana', 'Subid Bazar'],
};

const SelectLocationPage = () => {
  const navigate = useNavigate();
  const { setLocation } = useAuthStore();
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');
  const [zoneOpen, setZoneOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);

  const areas = areasByZone['Dhaka'] ?? [];

  const handleSubmit = () => {
    setLocation({ zone, area: area || zone });
    navigate('/home', { replace: true });
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden lg:items-center lg:justify-center lg:bg-gray-50">

      {/* Gradient background */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '320px',
          background: 'radial-gradient(ellipse at 80% 20%, rgba(255,200,180,0.4) 0%, transparent 60%), radial-gradient(ellipse at 20% 10%, rgba(180,200,255,0.3) 0%, transparent 50%)',
        }}
      />

      {/* ── Desktop card ── */}
      <div className="hidden lg:flex lg:flex-col lg:w-full lg:max-w-md lg:bg-white lg:rounded-2xl lg:shadow-xl lg:p-10 lg:relative lg:z-10 lg:gap-5">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="bg-transparent border-none cursor-pointer p-0 self-start" aria-label="Go back">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
            <path d="M9 1L1 9l8 8" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Illustration */}
        <div className="flex justify-center">
          <svg width="140" height="124" viewBox="0 0 180 160" fill="none" aria-hidden="true">
            <ellipse cx="90" cy="130" rx="72" ry="18" fill="#C9CDD3" fillOpacity="0.5"/>
            <path d="M18 118L90 100L90 148L18 148Z" fill="#FEE379"/>
            <path d="M90 100L162 118L162 148L90 148Z" fill="#69CA9F" fillOpacity="0.8"/>
            <path d="M30 148L100 100L162 118" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round"/>
            <path d="M90 100L162 118L162 148L90 148Z" fill="#C9CDD3" fillOpacity="0.35"/>
            <line x1="18" y1="125" x2="162" y2="125" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.6"/>
            <line x1="90" y1="100" x2="90" y2="148" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.6"/>
            <line x1="90" y1="95" x2="90" y2="108" stroke="#5565EE" strokeWidth="3" strokeLinecap="round"/>
            <path d="M90 20C76 20 65 31 65 45C65 62 90 88 90 88C90 88 115 62 115 45C115 31 104 20 90 20Z" fill="url(#pinGrad2)"/>
            <circle cx="90" cy="45" r="10" fill="white"/>
            <circle cx="84" cy="39" r="4" fill="white" fillOpacity="0.5"/>
            <defs>
              <linearGradient id="pinGrad2" x1="65" y1="20" x2="115" y2="88" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7D99FD"/>
                <stop offset="0.4" stopColor="#5F75FF"/>
                <stop offset="1" stopColor="#5565EE"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-[#181725] font-semibold" style={{ fontSize: '26px', lineHeight: '34px' }}>Select Your Location</h1>
          <p className="text-[#7C7C7C] font-medium mt-2" style={{ fontSize: '15px', lineHeight: '22px' }}>
            Switch on your location to stay in tune with what's happening in your area
          </p>
        </div>

        {/* Zone */}
        <div>
          <p className="font-semibold text-[#7C7C7C] mb-2" style={{ fontSize: '16px' }}>Your Zone</p>
          <div className="relative">
            <button onClick={() => setZoneOpen(!zoneOpen)} className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer p-0 pb-3" style={{ borderBottom: '1px solid #E2E2E2' }}>
              <span className="font-medium text-[#181725]" style={{ fontSize: '18px' }}>{zone}</span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="M1 1l5 6 5-6" stroke="#7C7C7C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {zoneOpen && (
              <div className="absolute left-0 right-0 bg-white border border-[#E2E2E2] rounded-[10px] shadow-lg z-20 bottom-full mb-1">
                {zones.map((z) => (
                  <button key={z} onClick={() => { setZone(z); setZoneOpen(false); }} className="w-full text-left px-4 py-3 text-[#181725] bg-transparent border-none cursor-pointer hover:bg-[#F2F3F2]" style={{ fontSize: '16px' }}>{z}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Area */}
        <div>
          <p className="font-semibold text-[#7C7C7C] mb-2" style={{ fontSize: '16px' }}>Your Area</p>
          <div className="relative">
            <button onClick={() => setAreaOpen(!areaOpen)} className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer p-0 pb-3" style={{ borderBottom: '1px solid #E2E2E2' }}>
              <span className="font-medium" style={{ fontSize: '18px', color: area ? '#181725' : '#B1B1B1' }}>{area || 'Types of your area'}</span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="M1 1l5 6 5-6" stroke="#7C7C7C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {areaOpen && (
              <div className="absolute left-0 right-0 bg-white border border-[#E2E2E2] rounded-[10px] shadow-lg z-20 bottom-full mb-1">
                {areas.map((a) => (
                  <button key={a} onClick={() => { setArea(a); setAreaOpen(false); }} className="w-full text-left px-4 py-3 text-[#181725] bg-transparent border-none cursor-pointer hover:bg-[#F2F3F2]" style={{ fontSize: '16px' }}>{a}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button onClick={handleSubmit} className="w-full border-none cursor-pointer font-semibold text-[#FFF9FF]"
          style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px' }}>
          Submit
        </button>
      </div>

      {/* ── Mobile layout (hidden on desktop) ── */}
      <div className="lg:hidden flex flex-col flex-1 w-full">
        {/* Back arrow */}
        <button onClick={() => navigate(-1)} className="relative z-10 bg-transparent border-none cursor-pointer p-0 self-start" style={{ marginLeft: '25px', marginTop: '56px' }} aria-label="Go back">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden="true">
            <path d="M9 1L1 9l8 8" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="relative z-10 flex justify-center mt-6">
          <svg width="180" height="160" viewBox="0 0 180 160" fill="none" aria-hidden="true">
            <ellipse cx="90" cy="130" rx="72" ry="18" fill="#C9CDD3" fillOpacity="0.5"/>
            <path d="M18 118L90 100L90 148L18 148Z" fill="#FEE379"/>
            <path d="M90 100L162 118L162 148L90 148Z" fill="#69CA9F" fillOpacity="0.8"/>
            <path d="M30 148L100 100L162 118" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round"/>
            <path d="M90 100L162 118L162 148L90 148Z" fill="#C9CDD3" fillOpacity="0.35"/>
            <line x1="18" y1="125" x2="162" y2="125" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.6"/>
            <line x1="90" y1="100" x2="90" y2="148" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.6"/>
            <line x1="90" y1="95" x2="90" y2="108" stroke="#5565EE" strokeWidth="3" strokeLinecap="round"/>
            <path d="M90 20C76 20 65 31 65 45C65 62 90 88 90 88C90 88 115 62 115 45C115 31 104 20 90 20Z" fill="url(#pinGrad)"/>
            <circle cx="90" cy="45" r="10" fill="white"/>
            <circle cx="84" cy="39" r="4" fill="white" fillOpacity="0.5"/>
            <defs>
              <linearGradient id="pinGrad" x1="65" y1="20" x2="115" y2="88" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7D99FD"/>
                <stop offset="0.4" stopColor="#5F75FF"/>
                <stop offset="1" stopColor="#5565EE"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className="relative z-10 text-center text-[#181725] font-semibold mt-4 px-6" style={{ fontSize: '26px', lineHeight: '29px' }}>Select Your Location</h1>
        <p className="relative z-10 text-center text-[#7C7C7C] font-medium mt-3 px-10" style={{ fontSize: '16px', lineHeight: '22px' }}>
          Switch on your location to stay in tune with what's happening in your area
        </p>

        <div className="h-24" />

        <div className="relative z-10 px-6 mb-5">
          <p className="font-semibold text-[#7C7C7C] mb-2" style={{ fontSize: '16px' }}>Your Zone</p>
          <div className="relative">
            <button onClick={() => setZoneOpen(!zoneOpen)} className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer p-0 pb-3 border-b border-[#E2E2E2]">
              <span className="font-medium text-[#181725]" style={{ fontSize: '18px', lineHeight: '29px' }}>{zone}</span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="M1 1l5 6 5-6" stroke="#7C7C7C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {zoneOpen && (
              <div className="absolute left-0 right-0 bg-white border border-[#E2E2E2] rounded-[10px] shadow-lg z-20 bottom-full mb-1">
                {zones.map((z) => (
                  <button key={z} onClick={() => { setZone(z); setZoneOpen(false); }} className="w-full text-left px-4 py-3 text-[#181725] bg-transparent border-none cursor-pointer hover:bg-[#F2F3F2]" style={{ fontSize: '16px' }}>{z}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 px-6 mb-6">
          <p className="font-semibold text-[#7C7C7C] mb-2" style={{ fontSize: '16px' }}>Your Area</p>
          <div className="relative">
            <button onClick={() => setAreaOpen(!areaOpen)} className="w-full flex items-center justify-between bg-transparent border-none cursor-pointer p-0 pb-3 border-b border-[#E2E2E2]">
              <span className="font-medium" style={{ fontSize: '18px', lineHeight: '29px', color: area ? '#181725' : '#B1B1B1' }}>{area || 'Types of your area'}</span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true"><path d="M1 1l5 6 5-6" stroke="#7C7C7C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {areaOpen && (
              <div className="absolute left-0 right-0 bg-white border border-[#E2E2E2] rounded-[10px] shadow-lg z-20 bottom-full mb-1">
                {areas.map((a) => (
                  <button key={a} onClick={() => { setArea(a); setAreaOpen(false); }} className="w-full text-left px-4 py-3 text-[#181725] bg-transparent border-none cursor-pointer hover:bg-[#F2F3F2]" style={{ fontSize: '16px' }}>{a}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10 px-6 pb-8">
          <button onClick={handleSubmit} className="w-full border-none cursor-pointer font-semibold text-[#FFF9FF]"
            style={{ height: '67px', background: '#53B175', borderRadius: '19px', fontSize: '18px', lineHeight: '18px' }}>
            Submit
          </button>
        </div>
      </div>

    </div>
  );
};

export default SelectLocationPage;
