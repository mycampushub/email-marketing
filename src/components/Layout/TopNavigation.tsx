import React, { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search, Bell, User, X, Mail, Users, Zap, FileText
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const TopNavigation: React.FC = () => {
  const { search } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{
    campaigns: any[];
    contacts: any[];
    automations: any[];
    forms: any[];
  } | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = search(searchQuery);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults(null);
      setShowResults(false);
    }
  }, [searchQuery, search]);

  const handleResultClick = (type: string, id: string) => {
    switch (type) {
      case 'campaign':
        navigate(`/campaigns`);
        break;
      case 'contact':
        navigate(`/audience/contacts`);
        break;
      case 'automation':
        navigate(`/automations`);
        break;
      case 'form':
        navigate(`/forms`);
        break;
    }
    setSearchQuery('');
    setShowResults(false);
  };

  const totalResults = searchResults 
    ? searchResults.campaigns.length + 
      searchResults.contacts.length + 
      searchResults.automations.length + 
      searchResults.forms.length
    : 0;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search campaigns, contacts, and more..."
              className="pl-10 pr-10 w-80 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery && setShowResults(true)}
              data-voice-context="Search across all your campaigns, contacts, and content"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowResults(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {showResults && searchResults && totalResults > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-md shadow-lg max-h-96 overflow-auto z-50">
                {searchResults.campaigns.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs font-medium text-gray-500 px-2 py-1">Campaigns</div>
                    {searchResults.campaigns.slice(0, 3).map((campaign) => (
                      <button
                        key={campaign.id}
                        onClick={() => handleResultClick('campaign', campaign.id)}
                        className="w-full flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-md text-left"
                      >
                        <Mail className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium">{campaign.name}</p>
                          <p className="text-xs text-gray-500">{campaign.subject}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {searchResults.contacts.length > 0 && (
                  <div className="p-2 border-t">
                    <div className="text-xs font-medium text-gray-500 px-2 py-1">Contacts</div>
                    {searchResults.contacts.slice(0, 3).map((contact) => (
                      <button
                        key={contact.id}
                        onClick={() => handleResultClick('contact', contact.id)}
                        className="w-full flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-md text-left"
                      >
                        <Users className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">{contact.firstName} {contact.lastName}</p>
                          <p className="text-xs text-gray-500">{contact.email}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {searchResults.automations.length > 0 && (
                  <div className="p-2 border-t">
                    <div className="text-xs font-medium text-gray-500 px-2 py-1">Automations</div>
                    {searchResults.automations.slice(0, 3).map((automation) => (
                      <button
                        key={automation.id}
                        onClick={() => handleResultClick('automation', automation.id)}
                        className="w-full flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-md text-left"
                      >
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <p className="text-sm font-medium">{automation.name}</p>
                      </button>
                    ))}
                  </div>
                )}
                
                {searchResults.forms.length > 0 && (
                  <div className="p-2 border-t">
                    <div className="text-xs font-medium text-gray-500 px-2 py-1">Forms</div>
                    {searchResults.forms.slice(0, 3).map((form) => (
                      <button
                        key={form.id}
                        onClick={() => handleResultClick('form', form.id)}
                        className="w-full flex items-center gap-3 px-2 py-2 hover:bg-gray-100 rounded-md text-left"
                      >
                        <FileText className="h-4 w-4 text-green-500" />
                        <p className="text-sm font-medium">{form.name}</p>
                      </button>
                    ))}
                  </div>
                )}
                
                {totalResults > 10 && (
                  <button
                    onClick={() => {
                      navigate('/');
                      setSearchQuery('');
                      setShowResults(false);
                    }}
                    className="w-full p-2 text-sm text-purple-600 hover:bg-gray-100 border-t text-center"
                  >
                    View all {totalResults} results
                  </button>
                )}
              </div>
            )}
            
            {showResults && searchResults && totalResults === 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-md shadow-lg p-4 z-50">
                <p className="text-sm text-gray-500 text-center">No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            data-voice-context="View notifications and alerts"
            onClick={() => toast({
              title: "Notifications",
              description: "You have no new notifications at this time.",
            })}
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            data-voice-context="Access account settings and profile"
            onClick={() => toast({
              title: "Profile Settings",
              description: "Profile settings page would open here.",
            })}
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
