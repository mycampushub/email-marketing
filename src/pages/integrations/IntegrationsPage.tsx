import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Settings, Key, Zap, ShoppingCart, BarChart3, Cloud, CheckCircle, AlertCircle, Trash2, ExternalLink } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  category: string;
  status: 'Connected' | 'Disconnected' | 'Pending';
  description: string;
  icon: string;
  lastSync: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Shopify: <ShoppingCart className="h-5 w-5 text-blue-600" />,
  'Google Analytics': <BarChart3 className="h-5 w-5 text-blue-600" />,
  Zapier: <Zap className="h-5 w-5 text-orange-600" />,
  WooCommerce: <ShoppingCart className="h-5 w-5 text-purple-600" />,
  Salesforce: <Cloud className="h-5 w-5 text-blue-600" />,
  'Facebook Ads': <BarChart3 className="h-5 w-5 text-blue-600" />,
  Stripe: <ShoppingCart className="h-5 w-5 text-purple-600" />,
};

export const IntegrationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [connectedIntegrations, setConnectedIntegrations] = useState<Integration[]>([
    { id: '1', name: 'Shopify', category: 'E-commerce', status: 'Connected', description: 'Sync customer data and purchase history', icon: 'Shopify', lastSync: '2024-01-15 14:30' },
    { id: '2', name: 'Google Analytics', category: 'Analytics', status: 'Connected', description: 'Track email campaign performance', icon: 'Google Analytics', lastSync: '2024-01-15 12:15' },
    { id: '3', name: 'Zapier', category: 'Automation', status: 'Pending', description: 'Connect to 3000+ apps', icon: 'Zapier', lastSync: 'Never' }
  ]);
  const { toast } = useToast();

  const availableIntegrations = [
    { name: 'WooCommerce', category: 'E-commerce', description: 'Connect your WordPress store', icon: 'WooCommerce', popular: true },
    { name: 'Salesforce', category: 'CRM', description: 'Sync leads and customer data', icon: 'Salesforce', popular: true },
    { name: 'Facebook Ads', category: 'Advertising', description: 'Create lookalike audiences', icon: 'Facebook Ads', popular: false },
    { name: 'Stripe', category: 'Payments', description: 'Track revenue and transactions', icon: 'Stripe', popular: true }
  ];

  const handleToggleIntegration = (integrationId: string, enabled: boolean) => {
    setConnectedIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: enabled ? 'Connected' : 'Disconnected' }
          : integration
      )
    );
    const integration = connectedIntegrations.find(i => i.id === integrationId);
    toast({ title: enabled ? "Integration Activated" : "Integration Deactivated", description: `${integration?.name} has been ${enabled ? 'connected' : 'disconnected'}.` });
  };

  const handleConnectIntegration = (integrationName: string, icon: string) => {
    const newIntegration: Integration = {
      id: Date.now().toString(),
      name: integrationName,
      category: 'New',
      status: 'Connected',
      description: `Connected ${integrationName} integration`,
      icon,
      lastSync: 'Just now'
    };
    setConnectedIntegrations(prev => [...prev, newIntegration]);
    toast({ title: "Integration Connected", description: `${integrationName} has been successfully connected.` });
  };

  const handleDisconnectIntegration = (integrationId: string) => {
    const integration = connectedIntegrations.find(i => i.id === integrationId);
    if (integration && window.confirm(`Remove ${integration.name}?`)) {
      setConnectedIntegrations(prev => prev.filter(i => i.id !== integrationId));
      toast({ title: "Integration Removed", description: `${integration.name} has been disconnected.` });
    }
  };

  const handleSettings = (integration: Integration) => {
    navigate('/integrations/keys');
    toast({ title: "Opening Settings", description: `Configuring ${integration.name} settings.` });
  };

  const filteredAvailable = availableIntegrations.filter(i =>
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect MailChimp with your favorite tools and services</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate('/integrations/browse')}>
          <Plus className="h-4 w-4 mr-2" />
          Browse Integrations
        </Button>
      </div>

      <Tabs defaultValue="connected" className="space-y-6">
        <TabsList>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="browse">Browse</TabsTrigger>
        </TabsList>

        <TabsContent value="connected" className="space-y-4">
          <div className="grid gap-4">
            {connectedIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        {iconMap[integration.icon] || <Cloud className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {integration.name}
                          <Badge variant={integration.status === 'Connected' ? 'default' : 'secondary'}>
                            {integration.status}
                          </Badge>
                          {integration.status === 'Connected' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                        <p className="text-xs text-gray-500">Last sync: {integration.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleSettings(integration)}>
                        <Settings className="h-4 w-4 mr-1" />
                        Settings
                      </Button>
                      <Switch 
                        defaultChecked={integration.status === 'Connected'}
                        onCheckedChange={(checked) => handleToggleIntegration(integration.id, checked)}
                      />
                      <Button variant="outline" size="sm" onClick={() => handleDisconnectIntegration(integration.id)}>
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
              <CardTitle>Integration Health</CardTitle>
              <CardDescription>Monitor the status of your connected integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{connectedIntegrations.filter(i => i.status === 'Connected').length}</div>
                  <div className="text-sm text-green-700">Active Integrations</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{connectedIntegrations.filter(i => i.status === 'Pending').length}</div>
                  <div className="text-sm text-yellow-700">Pending Setup</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">5,430</div>
                  <div className="text-sm text-blue-700">Records Synced Today</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="browse" className="space-y-6">
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search integrations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAvailable.map((integration, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      {iconMap[integration.icon] || <Cloud className="h-6 w-6 text-gray-600" />}
                    </div>
                    {integration.popular && (
                      <Badge variant="secondary">Popular</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline" onClick={() => handleConnectIntegration(integration.name, integration.icon)}>
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Integration Categories</CardTitle>
              <CardDescription>Find integrations by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-16 flex-col" onClick={() => { setSearchTerm('E-commerce'); }}>
                  <ShoppingCart className="h-5 w-5 mb-1" />
                  E-commerce
                </Button>
                <Button variant="outline" className="h-16 flex-col" onClick={() => { setSearchTerm('Analytics'); }}>
                  <BarChart3 className="h-5 w-5 mb-1" />
                  Analytics
                </Button>
                <Button variant="outline" className="h-16 flex-col" onClick={() => { setSearchTerm('Automation'); }}>
                  <Zap className="h-5 w-5 mb-1" />
                  Automation
                </Button>
                <Button variant="outline" className="h-16 flex-col" onClick={() => { setSearchTerm('CRM'); }}>
                  <Cloud className="h-5 w-5 mb-1" />
                  CRM
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
