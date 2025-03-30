
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, Bell, Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-white border-b border-border flex justify-between items-center px-4 h-16 sticky top-0 z-10">
      <div className="flex items-center">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        {!isMobile && (
          <h1 className="text-lg font-semibold text-kitchen-teal">Kitchen Optimizer 360</h1>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="h-5 w-5" />
        </Button>
        <div className="ml-3 flex items-center">
          <div className="h-8 w-8 rounded-full bg-kitchen-teal text-white flex items-center justify-center font-medium">
            RO
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
