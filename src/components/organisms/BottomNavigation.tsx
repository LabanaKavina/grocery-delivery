import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  {
    key: 'shop',
    label: 'Shop',
    path: '/home',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5Z"
          stroke={active ? '#53B175' : '#181725'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'explore',
    label: 'Explore',
    path: '/explore',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke={active ? '#53B175' : '#181725'} strokeWidth="1.5" />
        <path d="M20 20l-3-3" stroke={active ? '#53B175' : '#181725'} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: 'cart',
    label: 'Cart',
    path: '/cart',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6ZM3 6h18M16 10a4 4 0 0 1-8 0"
          stroke={active ? '#53B175' : '#181725'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'favourite',
    label: 'Favourite',
    path: '/favourites',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
          stroke={active ? '#53B175' : '#181725'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    key: 'account',
    label: 'Account',
    path: '/account',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          stroke={active ? '#53B175' : '#181725'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = tabs.find((t) => location.pathname.startsWith(t.path))?.key ?? 'shop';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-[92px] bg-white rounded-t-[15px] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex items-start pt-3 justify-around lg:hidden z-50"
      aria-label="Main navigation"
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            onClick={() => navigate(tab.path)}
            className="flex flex-col items-center gap-1 cursor-pointer bg-transparent border-none p-0"
            aria-current={isActive ? 'page' : undefined}
            aria-label={tab.label}
          >
            {tab.icon(isActive)}
            <span className={`text-xs font-medium transition-colors duration-200 ${isActive ? 'text-[#53B175]' : 'text-[#181725]'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
