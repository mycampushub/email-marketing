import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Plus, Zap, ShoppingCart, BarChart2, 
  Users, Globe, Smartphone, CreditCard, Calendar,
  CheckCircle2, XCircle, ExternalLink
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';

const availableIntegrations = [
  { id: '1', name: 'WooCommerce', description: 'Connect your WooCommerce store', category: 'ecommerce', popularity: 95 },
  { id: '2', name: 'Magento', description: 'Enterprise e-commerce platform', category: 'ecommerce', popularity: 85 },
  { id: '3', name: 'BigCommerce', description: 'Scalable e-commerce solution', category: 'ecommerce', popularity: 80 },
  { id: '4', name: 'HubSpot', description: 'Marketing automation and CRM', category: 'crm', popularity: 92 },
  { id: '5', name: 'Salesforce', description: 'World\'s #1 CRM', category: 'crm', popularity: 88 },
  { id: '6', name: 'Pipedrive', description: 'Sales CRM for small business', category: 'crm', popularity: 75 },
  { id: '7', name: 'Google Analytics', description: 'Website analytics', category: 'analytics', popularity: 98 },
  { id: '8', name: 'Mixpanel', description: 'Product analytics', category: 'analytics', popularity: 70 },
  { id: '9', name: 'Zapier', description: 'Connect 5,000+ apps', category: 'productivity', popularity: 96 },
  { id: '10', name: 'Slack', description: 'Team communication', category: 'productivity', popularity: 90 },
  { id: '11', name: 'Trello', description: 'Project management', category: 'productivity', popularity: 82 },
  { id: '12', name: 'Facebook', description: 'Social media marketing', category: 'social', popularity: 94 },
  { id: '13', name: 'Instagram', description: 'Visual social platform', category: 'social', popularity: 91 },
  { id: '14', name: 'Twitter', description: 'Social media platform', category: 'social', popularity: 78 },
  { id: '15', name: 'LinkedIn', description: 'Professional network', category: 'social', popularity: 72 },
  { id: '16', name: 'Twilio', description: 'SMS and messaging', category: 'sms', popularity: 85 },
  { id: '17', name: 'Stripe', description: 'Payment processing', category: 'payments', popularity: 93 },
  { id: '18', name: 'PayPal', description: 'Online payments', category: 'payments', popularity: 89 },
];

const categoryIcons: Record<string, React.ReactNode> = {
  ecommerce: <ShoppingCart className="h-5 w-5" />,
  crm: <Users className="h-5 w-5" />,
  analytics: <BarChart2 className="h-5 w-5" />,
  productivity: <Zap className="h-5 w-5" />,
  social: <Globe className="h-5 w-5" />,
  sms: <Smartphone className="h-5 w-5" />,
  payments: <CreditCard className="h-5 w-5" />,
};

export const BrowseIntegrationsPage: React.FC = () => {
  const { integrations, connectIntegration } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const connectedIds = integrations.filter(i => i.status === 'connected').map(i => i.name);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'crm', name: 'CRM' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'productivity', name: 'Productivity' },
    { id: 'social', name: 'Social' },
    { id: 'sms', name: 'SMS' },
    { id: 'payments', name: 'Payments' },
  ];

  const filteredIntegrations = availableIntegrations.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          i.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || i.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Browse Integrations</h1>
          <p className="text-muted-foreground">Connect your favorite tools and services</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat.id)}
            className="whitespace-nowrap"
          >
            {cat.id !== 'all' && categoryIcons[cat.id]}
            <span className="ml-2">{cat.name}</span>
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((integration) => {
          const isConnected = connectedIds.includes(integration.name);
          return (
            <Card key={integration.id} className={isConnected ? 'border-green-500' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {categoryIcons[integration.category]}
                    </div>
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < Math.floor(integration.popularity / 20)
                            ? 'bg-primary'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">{integration.popularity}%</span>
                  </div>
                  {isConnected ? (
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Button size="sm" onClick={() => connectIntegration(integration.id)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
