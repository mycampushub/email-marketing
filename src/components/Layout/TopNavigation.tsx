
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell, Search, User } from 'lucide-react';

export const TopNavigation: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search campaigns, contacts, and more..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              data-voice-context="Search across all your campaigns, contacts, and content"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="default" 
            size="sm"
            onClick={() => window.location.href = 'https://skillsim.vercel.app/dashboard'}
            data-voice-context="Navigate to Master Dashboard"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Master Dashboard
          </Button>
          <Button variant="ghost" size="icon" data-voice-context="View notifications and alerts">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" data-voice-context="Access account settings and profile">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
