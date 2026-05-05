import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { key: 'shop', label: 'Shop', path: '/home' },
  { key: 'explore', label: 'Explore', path: '/explore' },
  { key: 'cart', label: 'Cart', path: '/cart' },
  { key: 'favourite', label: 'Favourite', path: '/favourites' },
  { key: 'account', label: 'Account', path: '/account' },
];

const TopNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = tabs.find((t) => location.pathname.startsWith(t.path))?.key ?? 'shop';

  return (
    <nav
      className="hidden lg:block bg-white border-b border-[#E2E2E2]"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between h-16 px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="14" fill="#53B175" />
            <path d="M9 14l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-lg font-bold text-[#181725]">Nectar</span>
        </div>
        <div className="flex items-center gap-8">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                onClick={() => navigate(tab.path)}
                className={`text-base font-medium cursor-pointer bg-transparent border-none pb-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-[#53B175] border-b-2 border-[#53B175]'
                    : 'text-[#181725] hover:text-[#53B175]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
