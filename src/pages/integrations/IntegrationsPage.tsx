
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Search, Settings, Key, Zap, ShoppingCart, BarChart3, Cloud } from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  const connectedIntegrations = [
    {
      id: 1,
      name: 'Shopify',
      category: 'E-commerce',
      status: 'Connected',
      description: 'Sync customer data and purchase history',
      icon: ShoppingCart,
      lastSync: '2024-01-15 14:30'
    },
    {
      id: 2,
      name: 'Google Analytics',
      category: 'Analytics',
      status: 'Connected',
      description: 'Track email campaign performance',
      icon: BarChart3,
      lastSync: '2024-01-15 12:15'
    },
    {
      id: 3,
      name: 'Zapier',
      category: 'Automation',
      status: 'Pending',
      description: 'Connect to 3000+ apps',
      icon: Zap,
      lastSync: 'Never'
    }
  ];

  const availableIntegrations = [
    {
      name: 'WooCommerce',
      category: 'E-commerce',
      description: 'Connect your WordPress store',
      icon: ShoppingCart,
      popular: true
    },
    {
      name: 'Salesforce',
      category: 'CRM',
      description: 'Sync leads and customer data',
      icon: Cloud,
      popular: true
    },
    {
      name: 'Facebook Ads',
      category: 'Advertising',
      description: 'Create lookalike audiences',
      icon: BarChart3,
      popular: false
    },
    {
      name: 'Stripe',
      category: 'Payments',
      description: 'Track revenue and transactions',
      icon: ShoppingCart,
      popular: true
    }
  ];

  const apiKeys = [
    {
      name: 'Main API Key',
      key: 'mc_*****-****-****-****-************',
      permissions: 'Read/Write',
      created: '2024-01-01',
      lastUsed: '2024-01-15'
    },
    {
      name: 'Mobile App Key',
      key: 'mc_*****-****-****-****-************',
      permissions: 'Read Only',
      created: '2024-01-10',
      lastUsed: '2024-01-14'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600">Connect MailChimp with your favorite tools and services</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Browse and connect new integrations"
          data-voice-action="Opening integration marketplace"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <Tabs defaultValue="connected" className="space-y-6">
        <TabsList>
          <TabsTrigger value="connected" data-voice-context="View currently connected integrations">Connected</TabsTrigger>
          <TabsTrigger value="browse" data-voice-context="Browse available integrations to connect">Browse</TabsTrigger>
          <TabsTrigger value="api" data-voice-context="Manage API keys and developer settings">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="connected" className="space-y-4">
          <div className="grid gap-4">
            {connectedIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <integration.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {integration.name}
                          <Badge variant={integration.status === 'Connected' ? 'default' : 'secondary'}>
                            {integration.status}
                          </Badge>
                        </h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                        <p className="text-xs text-gray-500">Last sync: {integration.lastSync}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" data-voice-context={`Configure ${integration.name} integration settings`}>
                        <Settings className="h-4 w-4 mr-1" />
                        Settings
                      </Button>
                      <Switch 
                        defaultChecked={integration.status === 'Connected'}
                        data-voice-context={`Toggle ${integration.name} integration on or off`}
                      />
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
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-sm text-green-700">Active Integrations</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">1</div>
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
                data-voice-context="Search available integrations by name or category"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableIntegrations.map((integration, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <integration.icon className="h-6 w-6 text-gray-600" />
                    </div>
                    {integration.popular && (
                      <Badge variant="secondary">Popular</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    data-voice-context={`Connect ${integration.name} to MailChimp`}
                    data-voice-action={`Setting up ${integration.name} integration`}
                  >
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
                <Button variant="outline" className="h-16 flex-col" data-voice-context="Browse e-commerce integrations">
                  <ShoppingCart className="h-5 w-5 mb-1" />
                  E-commerce
                </Button>
                <Button variant="outline" className="h-16 flex-col" data-voice-context="Browse analytics integrations">
                  <BarChart3 className="h-5 w-5 mb-1" />
                  Analytics
                </Button>
                <Button variant="outline" className="h-16 flex-col" data-voice-context="Browse automation integrations">
                  <Zap className="h-5 w-5 mb-1" />
                  Automation
                </Button>
                <Button variant="outline" className="h-16 flex-col" data-voice-context="Browse CRM integrations">
                  <Cloud className="h-5 w-5 mb-1" />
                  CRM
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Generate a new API key for development"
            >
              <Plus className="h-4 w-4 mr-2" />
              Generate Key
            </Button>
          </div>

          <div className="grid gap-4">
            {apiKeys.map((apiKey, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{apiKey.name}</h3>
                      <div className="space-y-1 mt-2">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Key: {apiKeyVisible ? apiKey.key.replace(/\*/g, 'x') : apiKey.key}</span>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => setApiKeyVisible(!apiKeyVisible)}
                            data-voice-context="Toggle API key visibility"
                          >
                            {apiKeyVisible ? 'Hide' : 'Show'}
                          </Button>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Permissions: {apiKey.permissions}</span>
                          <span>Created: {apiKey.created}</span>
                          <span>Last used: {apiKey.lastUsed}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" data-voice-context={`Edit ${apiKey.name} permissions and settings`}>
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" data-voice-context={`Regenerate ${apiKey.name} for security`}>
                        <Key className="h-4 w-4 mr-1" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Learn how to integrate with MailChimp's API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Getting Started</h4>
                  <p className="text-sm text-gray-600 mb-3">Learn the basics of our REST API</p>
                  <Button variant="outline" size="sm" data-voice-context="View API getting started guide">
                    View Guide
                  </Button>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">API Reference</h4>
                  <p className="text-sm text-gray-600 mb-3">Complete reference for all endpoints</p>
                  <Button variant="outline" size="sm" data-voice-context="Browse complete API reference documentation">
                    Browse Docs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
