import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Button from '../components/atoms/Button';

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="px-4 py-6 lg:max-w-3xl lg:mx-auto">
      <h1 className="text-2xl font-bold text-[#181725] text-center mb-6">Account</h1>

      {isAuthenticated && user ? (
        <div className="space-y-6">
          {/* User info */}
          <div className="flex items-center gap-4 pb-6 border-b border-[#E2E2E2]">
            <div className="w-16 h-16 rounded-full bg-[#F2F3F2] flex items-center justify-center shrink-0">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                  stroke="#7C7C7C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-[#181725] truncate">{user.username}</h2>
              <p className="text-sm text-[#7C7C7C] truncate">{user.email}</p>
            </div>
          </div>

          {/* Account menu items */}
          {[
            { label: 'Orders', icon: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6ZM3 6h18' },
            { label: 'My Details', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z' },
            { label: 'Delivery Address', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z' },
            { label: 'Notifications', icon: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0' },
            { label: 'Help', icon: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM12 16v-4M12 8h.01' },
          ].map(({ label, icon }) => (
            <button
              key={label}
              className="flex items-center gap-4 w-full py-4 border-b border-[#E2E2E2] cursor-pointer bg-transparent border-x-0 border-t-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d={icon} stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="flex-1 text-left text-base font-semibold text-[#181725]">{label}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 3l4 4-4 4" stroke="#181725" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}

          <div className="pt-4">
            <Button fullWidth variant="secondary" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
              stroke="#B3B3B3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[#7C7C7C] text-base">Please log in to view your account</p>
          <Button size="md" onClick={() => navigate('/login')}>
            Log In
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
