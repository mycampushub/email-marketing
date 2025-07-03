
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Users, Mail, Bell, Shield, Globe, Palette, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PreferencesPage: React.FC = () => {
  const [preferences, setPreferences] = useState({
    doubleOptIn: true,
    unsubscribeConfirmation: true,
    frequencyControl: true,
    categorySelection: true,
    gdprCompliance: true,
    customFields: true,
    emailFrequency: 'weekly',
    defaultLanguage: 'en',
    theme: 'light'
  });

  const { toast } = useToast();

  const handlePreferenceChange = (key: string, value: boolean | string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    toast({
      title: "Preference Updated",
      description: "Your preference has been saved successfully",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscriber Preferences</h1>
          <p className="text-gray-600">Configure how subscribers can manage their communication preferences</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Preview the subscriber preference center to see how it appears to your audience members"
          data-voice-action="Opening preference center preview"
        >
          <Link className="h-4 w-4 mr-2" />
          Preview Preference Center
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Number of subscribers who have customized their email preferences">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Preferences</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Percentage of subscribers who have opted for weekly email frequency">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Frequency</p>
                <p className="text-2xl font-bold text-gray-900">67%</p>
              </div>
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Number of different email categories subscribers can choose from">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Email Categories</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Bell className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="GDPR compliance rate showing percentage of subscribers with explicit consent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GDPR Compliance</p>
                <p className="text-2xl font-bold text-gray-900">98.5%</p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subscription Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Subscription Settings
            </CardTitle>
            <CardDescription>
              Configure how subscribers join and manage their subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="double-opt-in" data-voice-context="Require subscribers to confirm their email address via a confirmation email for better list quality">
                  Double Opt-in
                </Label>
                <p className="text-sm text-gray-600">Require email confirmation for new subscribers</p>
              </div>
              <Switch
                id="double-opt-in"
                checked={preferences.doubleOptIn}
                onCheckedChange={(checked) => handlePreferenceChange('doubleOptIn', checked)}
                data-voice-context="Toggle double opt-in requirement for new subscribers"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="unsubscribe-confirmation" data-voice-context="Show confirmation page when subscribers unsubscribe to prevent accidental unsubscribes">
                  Unsubscribe Confirmation
                </Label>
                <p className="text-sm text-gray-600">Show confirmation page when unsubscribing</p>
              </div>
              <Switch
                id="unsubscribe-confirmation"
                checked={preferences.unsubscribeConfirmation}
                onCheckedChange={(checked) => handlePreferenceChange('unsubscribeConfirmation', checked)}
                data-voice-context="Toggle unsubscribe confirmation page"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="frequency-control" data-voice-context="Allow subscribers to choose how often they receive emails instead of unsubscribing completely">
                  Frequency Control
                </Label>
                <p className="text-sm text-gray-600">Let subscribers choose email frequency</p>
              </div>
              <Switch
                id="frequency-control"
                checked={preferences.frequencyControl}
                onCheckedChange={(checked) => handlePreferenceChange('frequencyControl', checked)}
                data-voice-context="Toggle email frequency control for subscribers"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="category-selection" data-voice-context="Enable subscribers to choose which types of emails they want to receive">
                  Email Category Selection
                </Label>
                <p className="text-sm text-gray-600">Allow subscribers to choose email types</p>
              </div>
              <Switch
                id="category-selection"
                checked={preferences.categorySelection}
                onCheckedChange={(checked) => handlePreferenceChange('categorySelection', checked)}
                data-voice-context="Toggle email category selection for subscribers"
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Privacy & Compliance
            </CardTitle>
            <CardDescription>
              Ensure compliance with privacy regulations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="gdpr-compliance" data-voice-context="Enable GDPR compliance features including explicit consent tracking and data processing transparency">
                  GDPR Compliance
                </Label>
                <p className="text-sm text-gray-600">Enable GDPR compliance features</p>
              </div>
              <Switch
                id="gdpr-compliance"
                checked={preferences.gdprCompliance}
                onCheckedChange={(checked) => handlePreferenceChange('gdprCompliance', checked)}
                data-voice-context="Toggle GDPR compliance features"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="custom-fields" data-voice-context="Allow collection of additional subscriber information through custom form fields">
                  Custom Fields
                </Label>
                <p className="text-sm text-gray-600">Enable custom data collection fields</p>
              </div>
              <Switch
                id="custom-fields"
                checked={preferences.customFields}
                onCheckedChange={(checked) => handlePreferenceChange('customFields', checked)}
                data-voice-context="Toggle custom field collection"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="default-language" data-voice-context="Set the default language for your preference center and communications">
                Default Language
              </Label>
              <Select 
                value={preferences.defaultLanguage} 
                onValueChange={(value) => handlePreferenceChange('defaultLanguage', value)}
              >
                <SelectTrigger data-voice-context="Choose the default language for subscriber communications">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="theme" data-voice-context="Choose the visual theme for your preference center and signup forms">
                Preference Center Theme
              </Label>
              <Select 
                value={preferences.theme} 
                onValueChange={(value) => handlePreferenceChange('theme', value)}
              >
                <SelectTrigger data-voice-context="Select visual theme for preference center">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="brand">Brand Colors</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Categories */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Email Categories
          </CardTitle>
          <CardDescription>
            Manage the email categories subscribers can choose from
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Newsletter', description: 'Weekly newsletter updates', subscribers: 2341 },
              { name: 'Product Updates', description: 'New features and products', subscribers: 1876 },
              { name: 'Promotions', description: 'Sales and special offers', subscribers: 3452 },
              { name: 'Events', description: 'Webinars and events', subscribers: 987 },
              { name: 'Blog Posts', description: 'New blog content', subscribers: 1234 },
              { name: 'Tips & Tutorials', description: 'Educational content', subscribers: 1567 },
              { name: 'Company News', description: 'Company announcements', subscribers: 892 },
              { name: 'Industry News', description: 'Industry insights', subscribers: 654 }
            ].map((category, index) => (
              <Card key={index} className="p-4">
                <h4 className="font-semibold text-sm mb-1">{category.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                <p className="text-xs font-medium text-blue-600">{category.subscribers.toLocaleString()} subscribers</p>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <Button 
              variant="outline"
              data-voice-context="Add a new email category that subscribers can choose to receive"
              data-voice-action="Opening new category creation form"
            >
              Add Category
            </Button>
            <Button 
              data-voice-context="Manage existing email categories, edit descriptions, and view subscriber counts"
              data-voice-action="Opening category management interface"
            >
              Manage Categories
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preference Center Customization */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Preference Center Customization
          </CardTitle>
          <CardDescription>
            Customize the look and content of your preference center
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="center-title">Preference Center Title</Label>
            <Input
              id="center-title"
              placeholder="Manage Your Email Preferences"
              data-voice-context="Set the main title that appears at the top of your preference center"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="center-description">Description</Label>
            <Textarea
              id="center-description"
              placeholder="Choose the types of emails you'd like to receive and how often..."
              data-voice-context="Provide instructions to help subscribers understand how to use the preference center"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <Input
                id="primary-color"
                type="color"
                defaultValue="#7c3aed"
                data-voice-context="Choose the primary brand color for your preference center"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="button-color">Button Color</Label>
              <Input
                id="button-color"
                type="color"
                defaultValue="#059669"
                data-voice-context="Choose the color for buttons in your preference center"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline"
              data-voice-context="Reset preference center to default design and content"
              data-voice-action="Resetting preference center to defaults"
            >
              Reset to Default
            </Button>
            <Button 
              data-voice-context="Save all customization changes to your preference center"
              data-voice-action="Saving preference center customizations"
            >
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
