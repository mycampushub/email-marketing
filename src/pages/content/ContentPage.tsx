
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Palette, Image, FileText, Upload, Plus, Search, Wand2 } from 'lucide-react';

export const ContentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const brandAssets = [
    { type: 'Logo', name: 'Primary Logo', format: 'PNG', size: '1.2 MB' },
    { type: 'Logo', name: 'Logo White', format: 'SVG', size: '45 KB' },
    { type: 'Color', name: 'Primary Blue', hex: '#3B82F6', usage: 'Primary brand color' },
    { type: 'Color', name: 'Secondary Gray', hex: '#6B7280', usage: 'Text and accents' },
    { type: 'Font', name: 'Inter', weight: 'Regular', usage: 'Body text' },
    { type: 'Font', name: 'Inter Bold', weight: 'Bold', usage: 'Headlines' }
  ];

  const imageLibrary = [
    { id: 1, name: 'hero-banner.jpg', size: '2.1 MB', dimensions: '1920x1080', tags: ['banner', 'hero'] },
    { id: 2, name: 'product-photo.png', size: '850 KB', dimensions: '800x600', tags: ['product', 'showcase'] },
    { id: 3, name: 'team-photo.jpg', size: '1.5 MB', dimensions: '1200x800', tags: ['team', 'about'] },
    { id: 4, name: 'office-space.jpg', size: '980 KB', dimensions: '1000x667', tags: ['office', 'workspace'] }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Studio</h1>
          <p className="text-gray-600">Manage your brand assets, templates, and creative content</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Use AI to generate new content ideas and copy"
          data-voice-action="Opening AI content assistant"
        >
          <Wand2 className="h-4 w-4 mr-2" />
          AI Assistant
        </Button>
      </div>

      <Tabs defaultValue="assistant" className="space-y-6">
        <TabsList>
          <TabsTrigger value="assistant" data-voice-context="AI-powered content creation assistant">Creative Assistant</TabsTrigger>
          <TabsTrigger value="brand" data-voice-context="Manage brand colors, fonts, and logos">Brand Kit</TabsTrigger>
          <TabsTrigger value="images" data-voice-context="Upload and manage image library">Image Library</TabsTrigger>
          <TabsTrigger value="templates" data-voice-context="Browse email and content templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="assistant" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-purple-600" />
                AI Creative Assistant
              </CardTitle>
              <CardDescription>Generate subject lines, email copy, and creative ideas with AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Subject Lines</h3>
                    <p className="text-sm text-gray-600 mb-4">Generate compelling subject lines that boost open rates</p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      data-voice-context="Generate email subject lines using AI"
                    >
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Email Copy</h3>
                    <p className="text-sm text-gray-600 mb-4">Create engaging email content for any campaign</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      data-voice-context="Generate email body content using AI"
                    >
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Wand2 className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Campaign Ideas</h3>
                    <p className="text-sm text-gray-600 mb-4">Get creative campaign concepts and strategies</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      data-voice-context="Generate campaign ideas and strategies"
                    >
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent AI Generations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Subject Line: "Don't miss out on summer savings!"</h4>
                        <p className="text-sm text-gray-600">Generated for Summer Sale campaign</p>
                      </div>
                      <Button size="sm" variant="outline" data-voice-context="Use this AI-generated subject line">
                        Use
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium">Email Copy: Welcome new subscribers...</h4>
                        <p className="text-sm text-gray-600">Generated for Welcome Series</p>
                      </div>
                      <Button size="sm" variant="outline" data-voice-context="Use this AI-generated email copy">
                        Use
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brand" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Brand Assets</h2>
            <Button 
              variant="outline"
              data-voice-context="Upload new brand assets like logos and fonts"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Asset
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandAssets.map((asset, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{asset.type}</Badge>
                    {asset.type === 'Color' && (
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: asset.hex }}
                      />
                    )}
                  </div>
                  <h3 className="font-semibold mb-1">{asset.name}</h3>
                  {asset.format && (
                    <p className="text-sm text-gray-600">{asset.format} • {asset.size}</p>
                  )}
                  {asset.hex && (
                    <p className="text-sm text-gray-600">{asset.hex}</p>
                  )}
                  {asset.weight && (
                    <p className="text-sm text-gray-600">{asset.weight}</p>
                  )}
                  {asset.usage && (
                    <p className="text-xs text-gray-500 mt-2">{asset.usage}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Brand Guidelines</CardTitle>
              <CardDescription>Keep your brand consistent across all campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Color Palette</h4>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    <div className="w-8 h-8 bg-gray-600 rounded"></div>
                    <div className="w-8 h-8 bg-green-500 rounded"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Typography</h4>
                  <p className="text-sm text-gray-600">Primary: Inter (Headings)</p>
                  <p className="text-sm text-gray-600">Secondary: Inter Regular (Body)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search images..."
                className="pl-10 max-w-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-voice-context="Search through your image library"
              />
            </div>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Upload new images to your library"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {imageLibrary.map((image) => (
              <Card key={image.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold mb-1 truncate">{image.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{image.dimensions} • {image.size}</p>
                  <div className="flex flex-wrap gap-1">
                    {image.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
              <CardDescription>Manage your image library storage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Used: 8.5 GB</span>
                <span className="text-sm">Available: 15 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '57%' }}></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Templates</h3>
            <p className="text-gray-600 mb-4">Browse and customize pre-designed email templates</p>
            <Button data-voice-context="Browse available email templates">
              Browse Templates
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
