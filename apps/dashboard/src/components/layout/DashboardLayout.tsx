import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { sidebarOpen } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "transition-all duration-300",
        sidebarOpen ? "md:ml-64" : "md:ml-20"
      )}>
        <Header />
        
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
