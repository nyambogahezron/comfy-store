import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';

export const Header = () => {
  const { toggleSidebar } = useStore();

  return (
    <header className="h-16 border-b border-border bg-card sticky top-0 z-30">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left section */}
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <Menu size={20} />
          </Button>

          {/* Search */}
          <div className="relative hidden md:block w-full max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search products, orders..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </Button>
        </div>
      </div>
    </header>
  );
};
