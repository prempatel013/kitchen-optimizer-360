
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChartBar, Database, FileText, Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { 
    name: 'Dashboard', 
    path: '/', 
    icon: <ChartBar className="h-5 w-5" /> 
  },
  { 
    name: 'Inventory', 
    path: '/inventory', 
    icon: <Database className="h-5 w-5" /> 
  },
  { 
    name: 'Menu Optimization', 
    path: '/menu', 
    icon: <FileText className="h-5 w-5" /> 
  },
  { 
    name: 'Waste Reports', 
    path: '/waste', 
    icon: <ChartBar className="h-5 w-5" /> 
  },
  { 
    name: 'Settings', 
    path: '/settings', 
    icon: <Settings className="h-5 w-5" /> 
  },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const sidebarClasses = cn(
    "bg-sidebar h-screen flex flex-col transition-all duration-300 overflow-y-auto fixed md:sticky top-0 z-20",
    isMobile ? (open ? "w-64 translate-x-0" : "w-64 -translate-x-full") : "w-64"
  );

  const overlayClasses = cn(
    "fixed inset-0 bg-black/30 z-10 transition-opacity",
    isMobile && open ? "opacity-100" : "opacity-0 pointer-events-none"
  );

  return (
    <>
      <div className={overlayClasses} onClick={onClose} />
      <aside className={sidebarClasses}>
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-white font-bold text-lg">Kitchen Optimizer</span>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
        <nav className="p-2 flex-1">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    location.pathname === item.path 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                      : "text-white hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  onClick={isMobile ? onClose : undefined}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2 text-white">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-kitchen-orange text-white flex items-center justify-center font-medium">
              RO
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Restaurant Owner</p>
              <p className="text-xs text-gray-300 truncate">owner@example.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
