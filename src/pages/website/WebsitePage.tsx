import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Globe, Code, Settings, Plus, Link, BarChart3, Trash2, ExternalLink, Copy } from 'lucide-react';

interface ConnectedSite {
  id: string;
  domain: string;
  status: 'Connected' | 'Pending' | 'Error';
  lastSync: string;
  visitors: number;
  subscribers: number;
  trackingCode: string;
}

export const WebsitePage: React.FC = () => {
  const navigate = useNavigate();
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [cookieConsent, setCookieConsent] = useState(false);
  const [sites, setSites] = useState<ConnectedSite[]>([
    { id: '1', domain: 'example.com', status: 'Connected', lastSync: '2024-01-15 14:30', visitors: 12450, subscribers: 234, trackingCode: 'MC_TRACK_12345' },
    { id: '2', domain: 'shop.example.com', status: 'Pending', lastSync: 'Never', visitors: 0, subscribers: 0, trackingCode: 'MC_TRACK_67890' }
  ]);
  const [newSiteDomain, setNewSiteDomain] = useState('');
  const [isAddSiteOpen, setIsAddSiteOpen] = useState(false);
  const { toast } = useToast();

  const trackingEvents = [
    { event: 'Page Views', count: '25,430', change: '+12%' },
    { event: 'Form Submissions', count: '1,234', change: '+8%' },
    { event: 'Button Clicks', count: '5,670', change: '+15%' },
    { event: 'Downloads', count: '890', change: '+5%' }
  ];

  const handleAddSite = () => {
    if (!newSiteDomain.trim()) return;
    const newSite: ConnectedSite = {
      id: Date.now().toString(),
      domain: newSiteDomain,
      status: 'Pending',
      lastSync: 'Never',
      visitors: 0,
      subscribers: 0,
      trackingCode: `MC_TRACK_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    setSites([...sites, newSite]);
    setNewSiteDomain('');
    setIsAddSiteOpen(false);
    toast({ title: "Website Connected", description: `${newSiteDomain} has been added and is being verified.` });
  };

  const handleDeleteSite = (siteId: string) => {
    const site = sites.find(s => s.id === siteId);
    if (site && window.confirm(`Disconnect ${site.domain}?`)) {
      setSites(sites.filter(s => s.id !== siteId));
      toast({ title: "Website Disconnected", description: `${site.domain} has been removed.` });
    }
  };

  const handleViewSettings = (site: ConnectedSite) => {
    navigate('/website/reports');
    toast({ title: "Opening Settings", description: `Configuring tracking for ${site.domain}` });
  };

  const handleCopyTrackingCode = (site: ConnectedSite) => {
    const code = `<script src="https://track.mailchimp.com/${site.trackingCode}.js"></script>`;
    navigator.clipboard.writeText(code);
    toast({ title: "Tracking Code Copied", description: "Paste this code in your website's <head> section." });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website</h1>
          <p className="text-gray-600">Connect and track your websites with MailChimp</p>
        </div>
        <Dialog open={isAddSiteOpen} onOpenChange={setIsAddSiteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Connect Website
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect New Website</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Website Domain</Label>
                <Input
                  placeholder="example.com"
                  value={newSiteDomain}
                  onChange={(e) => setNewSiteDomain(e.target.value)}
                />
              </div>
              <Button onClick={handleAddSite} className="w-full">Connect Website</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="sites" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sites">Connected Sites</TabsTrigger>
          <TabsTrigger value="tracking">Tracking Settings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="sites" className="space-y-6">
          <div className="grid gap-4">
            {sites.map((site) => (
              <Card key={site.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Globe className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {site.domain}
                          <Badge variant={site.status === 'Connected' ? 'default' : 'secondary'}>
                            {site.status}
                          </Badge>
                        </h3>
                        <p className="text-sm text-gray-600">Last sync: {site.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{site.visitors.toLocaleString()}</div>
                        <div className="text-gray-600">Visitors</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{site.subscribers}</div>
                        <div className="text-gray-600">Subscribers</div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewSettings(site)}>
                        <Settings className="h-4 w-4 mr-1" />
                        Settings
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCopyTrackingCode(site)}>
                        <Copy className="h-4 w-4 mr-1" />
                        Code
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => window.open(`https://${site.domain}`, '_blank')}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteSite(site.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>How to Connect Your Website</CardTitle>
              <CardDescription>Follow these steps to integrate MailChimp with your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-purple-100 p-3 rounded-lg w-fit mx-auto mb-3">
                    <Code className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">1. Add Tracking Code</h4>
                  <p className="text-sm text-gray-600">Copy and paste our tracking code into your website's header</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-lg w-fit mx-auto mb-3">
                    <Link className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">2. Verify Connection</h4>
                  <p className="text-sm text-gray-600">We'll automatically detect the code and verify the connection</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-lg w-fit mx-auto mb-3">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">3. Start Tracking</h4>
                  <p className="text-sm text-gray-600">Begin collecting visitor data and audience insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tracking Configuration</CardTitle>
              <CardDescription>Configure how MailChimp tracks your website visitors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="tracking">Enable Website Tracking</Label>
                  <p className="text-sm text-gray-600">Track visitor behavior and engagement</p>
                </div>
                <Switch id="tracking" checked={trackingEnabled} onCheckedChange={setTrackingEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cookies">Cookie Consent Banner</Label>
                  <p className="text-sm text-gray-600">Show cookie consent popup for GDPR compliance</p>
                </div>
                <Switch id="cookies" checked={cookieConsent} onCheckedChange={setCookieConsent} />
              </div>

              <div>
                <Label>Tracking Code</Label>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <code className="text-sm text-gray-800">
                    {`<!-- MailChimp Tracking Code -->`}<br/>
                    {`<script type="text/javascript">`}<br/>
                    {`  (function(m,a,i,l,c,h,i,m,p) {`}<br/>
                    {`    // Tracking code here`}<br/>
                    {`  })(window,document,'script','mc-tracking');`}<br/>
                    {`</script>`}
                  </code>
                </div>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => {
                  navigator.clipboard.writeText(`<!-- MailChimp Tracking Code -->
<script type="text/javascript">
  (function(m,a,i,l,c,h,i,m,p) {
    // Tracking code here
  })(window,document,'script','mc-tracking');
</script>`);
                  toast({ title: "Tracking Code Copied", description: "The tracking code has been copied to your clipboard." });
                }}>
                  Copy Code
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trackingEvents.map((event, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{event.event}</p>
                      <p className="text-2xl font-bold text-gray-900">{event.count}</p>
                    </div>
                    <div className="text-sm text-green-600 font-medium">{event.change}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Website Performance</CardTitle>
              <CardDescription>Detailed analytics from your connected websites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <h4 className="font-medium">Homepage Visits</h4>
                    <p className="text-sm text-gray-600">Most visited page on your site</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">8,430</div>
                    <div className="text-sm text-green-600">+12%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <h4 className="font-medium">Product Pages</h4>
                    <p className="text-sm text-gray-600">Product catalog engagement</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">5,230</div>
                    <div className="text-sm text-green-600">+8%</div>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium">Contact Form</h4>
                    <p className="text-sm text-gray-600">Contact page interactions</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">1,230</div>
                    <div className="text-sm text-green-600">+15%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
