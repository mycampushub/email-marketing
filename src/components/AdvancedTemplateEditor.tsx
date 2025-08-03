import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, 
  Eye, 
  Palette, 
  Type, 
  Layout, 
  Image, 
  Mail,
  Download,
  Upload,
  Copy,
  Star
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  htmlContent: string;
  thumbnail: string;
  tags: string[];
  isCustom: boolean;
  rating?: number;
  uses?: number;
}

interface AdvancedTemplateEditorProps {
  isOpen: boolean;
  onClose: () => void;
  template?: Template;
  onSave: (template: Template) => void;
}

export const AdvancedTemplateEditor: React.FC<AdvancedTemplateEditorProps> = ({
  isOpen,
  onClose,
  template,
  onSave
}) => {
  const [editedTemplate, setEditedTemplate] = useState<Template>(template || {
    id: `template-${Date.now()}`,
    name: '',
    category: 'Newsletter',
    description: '',
    htmlContent: '',
    thumbnail: '',
    tags: [],
    isCustom: true
  });
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const { toast } = useToast();

  const categories = [
    'Newsletter', 'Promotional', 'Welcome', 'Product Launch', 
    'Event', 'Survey', 'Thank You', 'Re-engagement'
  ];

  const handleSave = () => {
    if (!editedTemplate.name.trim()) {
      toast({
        title: "Error",
        description: "Template name is required",
        variant: "destructive",
      });
      return;
    }

    onSave(editedTemplate);
    toast({
      title: "Template Saved",
      description: `${editedTemplate.name} has been saved successfully`,
    });
    onClose();
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(editedTemplate, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${editedTemplate.name.replace(/\s+/g, '_')}_template.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Template Exported",
      description: "Template has been downloaded as JSON file",
    });
  };

  const predefinedTemplates = [
    {
      name: 'Modern Newsletter',
      htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Your Newsletter</h1>
            <p style="margin: 10px 0 0; opacity: 0.9;">Stay updated with our latest news</p>
          </header>
          <main style="padding: 40px 20px;">
            <article style="margin-bottom: 30px;">
              <h2 style="color: #1a202c; font-size: 24px; margin: 0 0 15px;">Featured Article</h2>
              <p style="color: #4a5568; line-height: 1.6; margin: 0 0 20px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <a href="#" style="color: #667eea; text-decoration: none; font-weight: 600;">Read More →</a>
            </article>
            <div style="text-align: center; margin: 40px 0;">
              <a href="#" style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Call to Action</a>
            </div>
          </main>
          <footer style="background: #f7fafc; padding: 30px 20px; text-align: center; font-size: 14px; color: #718096;">
            <p style="margin: 0 0 10px;">© 2024 Your Company. All rights reserved.</p>
            <p style="margin: 0;"><a href="#" style="color: #718096;">Unsubscribe</a> | <a href="#" style="color: #718096;">Update Preferences</a></p>
          </footer>
        </div>
      `
    },
    {
      name: 'E-commerce Promotional',
      htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #ffffff;">
          <div style="background: linear-gradient(45deg, #ff6b6b, #ffa500); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 32px; font-weight: bold;">MEGA SALE</h1>
            <h2 style="margin: 10px 0 0; font-size: 24px;">Up to 70% OFF</h2>
          </div>
          <div style="padding: 30px;">
            <div style="display: flex; gap: 20px; margin-bottom: 30px;">
              <div style="flex: 1; text-align: center;">
                <img src="https://via.placeholder.com/150x150" alt="Product" style="width: 100%; max-width: 150px; border-radius: 8px;" />
                <h3 style="margin: 15px 0 5px; color: #333;">Product Name</h3>
                <p style="margin: 0; color: #666; text-decoration: line-through;">$99.99</p>
                <p style="margin: 5px 0; color: #ff6b6b; font-weight: bold; font-size: 18px;">$29.99</p>
              </div>
              <div style="flex: 1; text-align: center;">
                <img src="https://via.placeholder.com/150x150" alt="Product" style="width: 100%; max-width: 150px; border-radius: 8px;" />
                <h3 style="margin: 15px 0 5px; color: #333;">Product Name</h3>
                <p style="margin: 0; color: #666; text-decoration: line-through;">$149.99</p>
                <p style="margin: 5px 0; color: #ff6b6b; font-weight: bold; font-size: 18px;">$49.99</p>
              </div>
            </div>
            <div style="text-align: center;">
              <a href="#" style="background: #ff6b6b; color: white; padding: 18px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; display: inline-block;">Shop Now</a>
            </div>
          </div>
        </div>
      `
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <div className="flex h-full">
          {/* Left Sidebar - Template Settings */}
          <div className="w-80 bg-gray-50 border-r overflow-y-auto">
            <div className="p-6 border-b">
              <h3 className="font-semibold text-lg">Template Editor</h3>
              <p className="text-sm text-gray-600">Customize your email template</p>
            </div>

            <Tabs defaultValue="settings" className="w-full">
              <TabsList className="grid w-full grid-cols-2 m-4">
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="presets">Presets</TabsTrigger>
              </TabsList>

              <TabsContent value="settings" className="px-6 space-y-4">
                <div>
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input
                    id="templateName"
                    value={editedTemplate.name}
                    onChange={(e) => setEditedTemplate({ ...editedTemplate, name: e.target.value })}
                    placeholder="Enter template name"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={editedTemplate.category} 
                    onValueChange={(value) => setEditedTemplate({ ...editedTemplate, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editedTemplate.description}
                    onChange={(e) => setEditedTemplate({ ...editedTemplate, description: e.target.value })}
                    placeholder="Describe this template"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={editedTemplate.tags.join(', ')}
                    onChange={(e) => setEditedTemplate({ 
                      ...editedTemplate, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                    })}
                    placeholder="modern, clean, business"
                  />
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button variant="outline" className="w-full" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Template
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Template
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="presets" className="px-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Quick Templates</h4>
                  {predefinedTemplates.map((preset, index) => (
                    <Card 
                      key={index}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setEditedTemplate({ 
                        ...editedTemplate, 
                        htmlContent: preset.htmlContent,
                        name: editedTemplate.name || preset.name
                      })}
                    >
                      <CardContent className="p-3">
                        <h5 className="font-medium">{preset.name}</h5>
                        <p className="text-sm text-gray-600">Click to apply this template</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Editor */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-gray-100 rounded p-1">
                  <Button 
                    variant={previewMode === 'desktop' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Layout className="h-4 w-4" />
                    Desktop
                  </Button>
                  <Button 
                    variant={previewMode === 'mobile' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Eye className="h-4 w-4" />
                    Mobile
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Duplicate
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-1" />
                  Save Template
                </Button>
              </div>
            </div>

            <div className="flex-1 flex">
              {/* HTML Editor */}
              <div className="w-1/2 border-r">
                <div className="p-4 border-b bg-gray-50">
                  <h4 className="font-medium">HTML Editor</h4>
                </div>
                <Textarea
                  value={editedTemplate.htmlContent}
                  onChange={(e) => setEditedTemplate({ ...editedTemplate, htmlContent: e.target.value })}
                  className="w-full h-full border-0 resize-none font-mono text-sm rounded-none"
                  placeholder="Enter your HTML template code here..."
                />
              </div>

              {/* Preview */}
              <div className="w-1/2 overflow-auto bg-gray-100">
                <div className="p-4 border-b bg-gray-50">
                  <h4 className="font-medium">Live Preview</h4>
                </div>
                <div className="p-4">
                  <div className={`mx-auto bg-white shadow-lg ${
                    previewMode === 'mobile' ? 'max-w-sm' : 'max-w-2xl'
                  }`}>
                    {editedTemplate.htmlContent ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: editedTemplate.htmlContent }}
                        style={{ minHeight: '400px' }}
                      />
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <Mail className="h-12 w-12 mx-auto mb-4" />
                        <p>Start editing HTML to see preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};