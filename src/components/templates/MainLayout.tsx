import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNavigation from '../organisms/BottomNavigation';
import TopNavigation from '../organisms/TopNavigation';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />
      <main className="max-w-7xl mx-auto pb-[92px] lg:pb-12 lg:px-8">
        {children ?? <Outlet />}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
