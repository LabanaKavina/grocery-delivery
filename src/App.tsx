import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout';
import ProtectedRoute from './components/templates/ProtectedRoute';
import { ToastProvider } from './contexts/ToastContext';
import GlobalToast from './components/GlobalToast';
import { useAuthStore } from './stores/authStore';

// Auth pages
import SplashPage from './pages/SplashPage';
import OnboardingPage from './pages/OnboardingPage';
import SignInPage from './pages/SignInPage';
import VerificationPage from './pages/VerificationPage';
import SelectLocationPage from './pages/SelectLocationPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// Main pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import CartPage from './pages/CartPage';
import FavouritesPage from './pages/FavouritesPage';
import AccountPage from './pages/AccountPage';

// Detail pages
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryListPage from './pages/CategoryListPage';
import SearchPage from './pages/SearchPage';

// Root layout that provides toast context to all routes
const RootLayout = () => (
  <ToastProvider>
    <GlobalToast />
    <Outlet />
  </ToastProvider>
);

// Redirect root based on auth state
const RootRedirect = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return <Navigate to={isAuthenticated ? '/home' : '/splash'} replace />;
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Auth routes
      { path: '/splash', element: <SplashPage /> },
      { path: '/onboarding', element: <OnboardingPage /> },
      { path: '/signin', element: <SignInPage /> },
      { path: '/verification', element: <VerificationPage /> },
      { path: '/select-location', element: <SelectLocationPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignUpPage /> },

      // Main routes wrapped in MainLayout + ProtectedRoute
      {
        element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
        children: [
          { path: '/home', element: <HomePage /> },
          { path: '/explore', element: <ExplorePage /> },
          { path: '/cart', element: <CartPage /> },
          { path: '/favourites', element: <FavouritesPage /> },
          { path: '/account', element: <AccountPage /> },
        ],
      },

      // Detail routes — also protected
      { path: '/product/:id', element: <ProtectedRoute><ProductDetailPage /></ProtectedRoute> },
      { path: '/category/:id', element: <ProtectedRoute><CategoryListPage /></ProtectedRoute> },
      { path: '/search', element: <ProtectedRoute><SearchPage /></ProtectedRoute> },

      // Default redirect
      { path: '/', element: <RootRedirect /> },
      { path: '*', element: <RootRedirect /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
