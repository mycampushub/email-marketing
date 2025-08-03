import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Globe, Plus, Settings, Trash2, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConnectedSite {
  id: number;
  domain: string;
  status: 'Connected' | 'Pending' | 'Error';
  lastSync: string;
  visitors: number;
  subscribers: number;
  trackingCode: string;
}

export const ConnectedSitesPage: React.FC = () => {
  const [sites, setSites] = useState<ConnectedSite[]>([
    {
      id: 1,
      domain: 'example.com',
      status: 'Connected',
      lastSync: '2024-01-15 14:30',
      visitors: 12450,
      subscribers: 234,
      trackingCode: 'MC_TRACK_12345'
    },
    {
      id: 2,
      domain: 'shop.example.com',
      status: 'Pending',
      lastSync: 'Never',
      visitors: 0,
      subscribers: 0,
      trackingCode: 'MC_TRACK_67890'
    }
  ]);

  const [newSite, setNewSite] = useState({ domain: '', description: '' });
  const [isAddingSite, setIsAddingSite] = useState(false);
  const { toast } = useToast();

  const handleAddSite = () => {
    if (!newSite.domain) return;
    
    const site: ConnectedSite = {
      id: Date.now(),
      domain: newSite.domain,
      status: 'Pending',
      lastSync: 'Never',
      visitors: 0,
      subscribers: 0,
      trackingCode: `MC_TRACK_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    
    setSites([...sites, site]);
    setNewSite({ domain: '', description: '' });
    setIsAddingSite(false);
    
    toast({
      title: "Site Added",
      description: `${newSite.domain} has been added and is being verified.`,
    });
  };

  const handleDeleteSite = (siteId: number) => {
    setSites(sites.filter(site => site.id !== siteId));
    toast({
      title: "Site Removed",
      description: "Website has been disconnected from your account.",
    });
  };

  const copyTrackingCode = (code: string) => {
    navigator.clipboard.writeText(`<script src="https://track.mailchimp.com/${code}.js"></script>`);
    toast({
      title: "Tracking Code Copied",
      description: "Paste this code in your website's header section.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Connected Sites</h1>
          <p className="text-gray-600">Manage your connected websites and tracking</p>
        </div>
        <Dialog open={isAddingSite} onOpenChange={setIsAddingSite}>
          <DialogTrigger asChild>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Connect a new website to track visitors and conversions"
              data-voice-action="Opening website connection form"
            >
              <Plus className="h-4 w-4 mr-2" />
              Connect Website
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect New Website</DialogTitle>
              <DialogDescription>
                Add a new website to track visitors and grow your audience
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="domain">Website Domain</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={newSite.domain}
                  onChange={(e) => setNewSite({...newSite, domain: e.target.value})}
                  data-voice-context="Enter your website domain name"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="Main website, online store, etc."
                  value={newSite.description}
                  onChange={(e) => setNewSite({...newSite, description: e.target.value})}
                  data-voice-context="Add an optional description for this website"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleAddSite}
                  className="flex-1"
                  data-voice-context="Add this website to your connected sites"
                  data-voice-action="Adding website and generating tracking code"
                >
                  Connect Website
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddingSite(false)}
                  data-voice-context="Cancel adding website"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {sites.map((site) => (
          <Card key={site.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-3">
                      {site.domain}
                      <Badge variant={site.status === 'Connected' ? 'default' : site.status === 'Pending' ? 'secondary' : 'destructive'}>
                        {site.status}
                      </Badge>
                    </h3>
                    <p className="text-sm text-gray-600">Last sync: {site.lastSync}</p>
                    <p className="text-xs text-gray-500 mt-1">Tracking ID: {site.trackingCode}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="font-semibold text-lg">{site.visitors.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Visitors</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{site.subscribers}</div>
                    <div className="text-sm text-gray-600">Subscribers</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyTrackingCode(site.trackingCode)}
                      data-voice-context={`Copy tracking code for ${site.domain}`}
                      data-voice-action="Copying tracking code to clipboard"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Code
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`Configure settings for ${site.domain}`}
                      data-voice-action={`Opening ${site.domain} settings`}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Settings
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://${site.domain}`, '_blank')}
                      data-voice-context={`Visit ${site.domain} in new tab`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteSite(site.id)}
                      data-voice-context={`Disconnect ${site.domain} from MailChimp`}
                      data-voice-action={`Removing ${site.domain}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sites.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Connected Sites</h3>
            <p className="text-gray-600 mb-4">Connect your first website to start tracking visitors and growing your audience</p>
            <Button 
              onClick={() => setIsAddingSite(true)}
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Connect your first website to start tracking"
            >
              <Plus className="h-4 w-4 mr-2" />
              Connect Your First Website
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How Website Tracking Works</CardTitle>
          <CardDescription>Learn how to maximize your website integration with MailChimp</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mx-auto mb-3">
                <Copy className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">1. Add Tracking Code</h4>
              <p className="text-sm text-gray-600">Copy and paste the tracking code into your website's header section before the closing &lt;/head&gt; tag</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-3">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">2. Configure Tracking</h4>
              <p className="text-sm text-gray-600">Set up goals, events, and conversion tracking to measure your marketing success</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-3">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">3. Analyze Performance</h4>
              <p className="text-sm text-gray-600">View detailed reports on visitor behavior, conversions, and email campaign effectiveness</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};