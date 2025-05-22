
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, PieChart, Wallet, Settings, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileMenu from '@/components/auth/ProfileMenu';
import { useAuth } from '@/contexts/AuthContext';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Transactions', href: '/transactions', icon: Wallet },
    { name: 'Reports', href: '/reports', icon: PieChart },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="fixed z-50 lg:hidden top-4 left-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-sidebar text-sidebar-foreground",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* App name */}
          <div className="px-6 py-6">
            <h1 className="text-xl font-bold text-sidebar-primary-foreground">Expense Tracker</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 mt-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center px-4 py-3 text-sm rounded-md hover:bg-sidebar-accent group"
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-sidebar-foreground/70">{user?.email || "user@example.com"}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-2 text-sidebar-foreground"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto flex flex-col">
        <div className="flex justify-end p-4 border-b">
          <ProfileMenu />
        </div>
        <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 flex-1">
          {children}
        </main>
        {/* Footer */}
        <footer className="bg-sidebar text-sidebar-foreground border-t border-sidebar-border mt-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <Link
                  to="/terms"
                  className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Terms & Conditions
                </Link>
                <Link
                  to="/privacy"
                  className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
              <div className="text-sm text-sidebar-foreground/70">
                Made by <span className="font-semibold text-sidebar-primary">P & D Technology</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
