
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Key, Plus, Copy, Shield, Clock, Eye, EyeOff, Trash2 } from 'lucide-react';

export const APIKeysPage: React.FC = () => {
  const [apiKeyVisible, setApiKeyVisible] = useState<Record<number, boolean>>({});
  const [newKeyName, setNewKeyName] = useState('');

  const apiKeys = [
    {
      id: 1,
      name: 'Main API Key',
      key: 'mc_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
      permissions: 'Read/Write',
      created: '2024-01-01',
      lastUsed: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Mobile App Key',
      key: 'mc_z9y8x7w6v5u4t3s2r1q0p9o8i7u6y5t4',
      permissions: 'Read Only',
      created: '2024-01-10',
      lastUsed: '2024-01-14',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Webhook Integration',
      key: 'mc_p0o9i8u7y6t5r4e3w2q1a1s2d3f4g5h6',
      permissions: 'Read/Write',
      created: '2023-12-15',
      lastUsed: '2024-01-05',
      status: 'Inactive'
    }
  ];

  const toggleKeyVisibility = (keyId: number) => {
    setApiKeyVisible(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Keys</h1>
          <p className="text-gray-600">Manage API keys and access to your MailChimp account</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Generate a new API key for development or integration access"
          data-voice-action="Opening API key generation form"
        >
          <Plus className="h-4 w-4 mr-2" />
          Generate API Key
        </Button>
      </div>

      <Tabs defaultValue="keys" className="space-y-6">
        <TabsList>
          <TabsTrigger value="keys" data-voice-context="View and manage your API keys">API Keys</TabsTrigger>
          <TabsTrigger value="usage" data-voice-context="View API usage statistics and rate limits">Usage & Limits</TabsTrigger>
          <TabsTrigger value="security" data-voice-context="Configure API security and access settings">Security</TabsTrigger>
          <TabsTrigger value="docs" data-voice-context="Access API documentation and examples">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-6">
          <div className="grid gap-4">
            {apiKeys.map((apiKey) => (
              <Card key={apiKey.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Key className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          {apiKey.name}
                          <Badge variant={apiKey.status === 'Active' ? 'default' : 'secondary'}>
                            {apiKey.status}
                          </Badge>
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Permissions: {apiKey.permissions}</span>
                          <span>Created: {apiKey.created}</span>
                          <span>Last used: {apiKey.lastUsed}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                            {apiKeyVisible[apiKey.id] ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => toggleKeyVisibility(apiKey.id)}
                            data-voice-context={`${apiKeyVisible[apiKey.id] ? 'Hide' : 'Show'} API key for ${apiKey.name}`}
                          >
                            {apiKeyVisible[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(apiKey.key)}
                            data-voice-context={`Copy ${apiKey.name} API key to clipboard`}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-voice-context={`Edit ${apiKey.name} permissions and settings`}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-voice-context={`Delete ${apiKey.name} API key`}
                      >
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
              <CardTitle>Generate New API Key</CardTitle>
              <CardDescription>Create a new API key for your applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="key-name">API Key Name</Label>
                <Input
                  id="key-name"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Mobile App, Website Integration"
                  data-voice-context="Enter a descriptive name for your new API key"
                />
              </div>
              
              <div>
                <Label>Permissions</Label>
                <Select data-voice-context="Select permission level for the new API key">
                  <SelectTrigger>
                    <SelectValue placeholder="Select permissions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read">Read Only</SelectItem>
                    <SelectItem value="write">Read/Write</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                data-voice-context="Generate the new API key with specified settings"
              >
                Generate API Key
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card data-voice-context="Total API calls made this month">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">API Calls</p>
                    <p className="text-2xl font-bold text-gray-900">24,567</p>
                  </div>
                  <div className="text-sm text-green-600 font-medium">67% of limit</div>
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="API calls remaining in current billing period">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Remaining</p>
                    <p className="text-2xl font-bold text-gray-900">12,433</p>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">33% left</div>
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Current API rate limit per minute">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rate Limit</p>
                    <p className="text-2xl font-bold text-gray-900">1000/min</p>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Per minute</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>API Usage by Endpoint</CardTitle>
              <CardDescription>Most frequently used API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { endpoint: '/api/v3/lists', calls: 8750, percentage: 36 },
                  { endpoint: '/api/v3/campaigns', calls: 6420, percentage: 26 },
                  { endpoint: '/api/v3/lists/{list_id}/members', calls: 5230, percentage: 21 },
                  { endpoint: '/api/v3/reports', calls: 4167, percentage: 17 }
                ].map((usage, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div>
                      <code className="text-sm font-mono">{usage.endpoint}</code>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">{usage.calls.toLocaleString()} calls</div>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full" 
                          style={{ width: `${usage.percentage}%` }}
                        />
                      </div>
                      <div className="text-sm text-gray-600 w-10">{usage.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure API access and security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ip-whitelist">IP Address Whitelist</Label>
                  <p className="text-sm text-gray-600">Restrict API access to specific IP addresses</p>
                </div>
                <Switch 
                  id="ip-whitelist"
                  data-voice-context="Toggle IP address whitelisting for API security"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="webhook-verification">Webhook Verification</Label>
                  <p className="text-sm text-gray-600">Require signature verification for webhooks</p>
                </div>
                <Switch 
                  id="webhook-verification"
                  defaultChecked
                  data-voice-context="Toggle webhook signature verification"
                />
              </div>

              <div>
                <Label>Allowed Domains</Label>
                <Input 
                  placeholder="*.yourdomain.com, api.partner.com"
                  className="mt-1"
                  data-voice-context="Specify domains allowed to make API requests"
                />
              </div>

              <div>
                <Label>Rate Limit Threshold</Label>
                <Select data-voice-context="Set custom rate limit threshold for API calls">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500">500 calls/minute</SelectItem>
                    <SelectItem value="1000">1000 calls/minute</SelectItem>
                    <SelectItem value="2000">2000 calls/minute</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Learn how to integrate with the MailChimp API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Getting Started</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Quick start guide and authentication setup.
                  </p>
                  <Button 
                    variant="outline"
                    data-voice-context="View getting started guide for MailChimp API"
                  >
                    View Guide
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">API Reference</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Complete API endpoint documentation with examples.
                  </p>
                  <Button 
                    variant="outline"
                    data-voice-context="Browse complete API reference documentation"
                  >
                    Browse Reference
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Code Examples</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Sample code in various programming languages.
                  </p>
                  <Button 
                    variant="outline"
                    data-voice-context="View code examples in different programming languages"
                  >
                    View Examples
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">SDKs & Libraries</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Official SDKs and community libraries.
                  </p>
                  <Button 
                    variant="outline"
                    data-voice-context="Download official SDKs and libraries"
                  >
                    Download SDKs
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <h4 className="font-semibold mb-2">Quick Example</h4>
                <pre className="text-sm bg-white p-3 rounded border overflow-x-auto">
{`curl -X GET \\
  https://us1.api.mailchimp.com/3.0/lists \\
  -H 'Authorization: apikey YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
