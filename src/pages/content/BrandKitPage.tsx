import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, Upload, Save, Plus, Trash2, 
  Type, Image as ImageIcon, Building2, Phone, 
  Globe, MapPin, Copy, Check
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useState } from 'react';

export const BrandKitPage: React.FC = () => {
  const { brandKit, updateBrandKit } = useAppContext();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Brand Kit</h1>
          <p className="text-muted-foreground">Manage your brand identity and assets</p>
        </div>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="fonts">Fonts</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="business">Business Info</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Brand Colors
              </CardTitle>
              <CardDescription>Define your brand colors for consistent email design</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {brandKit.colors.map((color, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{color.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(color.hex)}
                      >
                        {copiedColor === color.hex ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div 
                      className="h-16 rounded-md mb-2 cursor-pointer"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex)}
                    />
                    <Input 
                      value={color.hex}
                      onChange={(e) => {
                        const newColors = [...brandKit.colors];
                        newColors[index] = { ...color, hex: e.target.value };
                        updateBrandKit({ colors: newColors });
                      }}
                      className="font-mono"
                    />
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Color
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fonts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Type className="h-5 w-5 mr-2" />
                Typography
              </CardTitle>
              <CardDescription>Set your brand fonts for emails</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Heading Font</Label>
                <Select 
                  value={brandKit.fonts.heading} 
                  onValueChange={(value) => updateBrandKit({ fonts: { ...brandKit.fonts, heading: value } })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                    <SelectItem value="Playfair Display">Playfair Display</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-4 p-4 border rounded-lg">
                  <p className="text-3xl" style={{ fontFamily: brandKit.fonts.heading }}>
                    Heading Text - ABCDEFGHIJKLMNOPQRSTUVWXYZ
                  </p>
                  <p className="text-3xl" style={{ fontFamily: brandKit.fonts.heading }}>
                    1234567890
                  </p>
                </div>
              </div>

              <div>
                <Label>Body Font</Label>
                <Select 
                  value={brandKit.fonts.body} 
                  onValueChange={(value) => updateBrandKit({ fonts: { ...brandKit.fonts, body: value } })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                    <SelectItem value="Merriweather">Merriweather</SelectItem>
                    <SelectItem value="Source Sans Pro">Source Sans Pro</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-4 p-4 border rounded-lg">
                  <p className="text-base" style={{ fontFamily: brandKit.fonts.body }}>
                    Body text - The quick brown fox jumps over the lazy dog. 
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 1234567890
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Logo
              </CardTitle>
              <CardDescription>Upload your brand logo for email templates</CardDescription>
            </CardHeader>
            <CardContent>
              {brandKit.logo ? (
                <div className="space-y-4">
                  <div className="border rounded-lg p-8 flex items-center justify-center bg-gray-50">
                    <img src={brandKit.logo} alt="Brand Logo" className="max-h-24" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Replace
                    </Button>
                    <Button variant="outline" onClick={() => updateBrandKit({ logo: '' })}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-muted-foreground mb-4">Upload your logo</p>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">PNG, JPG, SVG up to 2MB</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2" />
                Business Information
              </CardTitle>
              <CardDescription>Your business details for email footers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Business Name</Label>
                <Input 
                  value={brandKit.businessInfo?.name || ''}
                  onChange={(e) => updateBrandKit({ 
                    businessInfo: { ...brandKit.businessInfo!, name: e.target.value } 
                  })}
                />
              </div>
              <div>
                <Label>Address</Label>
                <Input 
                  value={brandKit.businessInfo?.address || ''}
                  onChange={(e) => updateBrandKit({ 
                    businessInfo: { ...brandKit.businessInfo!, address: e.target.value } 
                  })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Phone</Label>
                  <Input 
                    value={brandKit.businessInfo?.phone || ''}
                    onChange={(e) => updateBrandKit({ 
                      businessInfo: { ...brandKit.businessInfo!, phone: e.target.value } 
                    })}
                  />
                </div>
                <div>
                  <Label>Website</Label>
                  <Input 
                    value={brandKit.businessInfo?.website || ''}
                    onChange={(e) => updateBrandKit({ 
                      businessInfo: { ...brandKit.businessInfo!, website: e.target.value } 
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
