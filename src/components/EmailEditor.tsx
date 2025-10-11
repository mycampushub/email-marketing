import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { DragDropEmailBuilder } from './DragDropEmailBuilder';
import { 
  Type, Image, Link, Palette, Layout, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Bold, Italic, Underline, Save, Eye, Smartphone, Monitor, Tablet, Layers, 
  Plus, Minus, RotateCcw, Download, Upload, Settings, Paintbrush, Strikethrough,
  List, ListOrdered, Quote, Link2, Code, Hash
} from 'lucide-react';

interface EmailEditorProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  onSave: (content: string) => void;
}

export const EmailEditor: React.FC<EmailEditorProps> = ({ 
  isOpen, 
  onClose, 
  initialContent = '', 
  onSave 
}) => {
  const [content, setContent] = useState(initialContent);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragDropOpen, setIsDragDropOpen] = useState(false);
  const [editorSettings, setEditorSettings] = useState({
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    textColor: '#333333',
    backgroundColor: '#ffffff',
    linkColor: '#007bff',
    maxWidth: '600px'
  });
  const editorRef = useRef<HTMLDivElement>(null);

  const elements = [
    { id: 'text', name: 'Text Block', icon: Type, description: 'Add headlines and paragraphs' },
    { id: 'image', name: 'Image', icon: Image, description: 'Insert photos and graphics' },
    { id: 'button', name: 'Button', icon: Link, description: 'Add call-to-action buttons' },
    { id: 'divider', name: 'Divider', icon: AlignCenter, description: 'Separate content sections' },
    { id: 'social', name: 'Social Links', icon: Link, description: 'Add social media icons' },
    { id: 'footer', name: 'Footer', icon: AlignLeft, description: 'Contact info and unsubscribe' }
  ];

  const templates = [
    { id: 1, name: 'Newsletter', preview: 'Modern newsletter layout with header, content blocks, and footer' },
    { id: 2, name: 'Promotional', preview: 'Eye-catching design for sales and special offers' },
    { id: 3, name: 'Welcome', preview: 'Warm welcome message for new subscribers' },
    { id: 4, name: 'Product Launch', preview: 'Showcase new products with compelling visuals' }
  ];

  const handleSave = () => {
    const finalContent = editorRef.current?.innerHTML || content;
    onSave(finalContent);
    onClose();
  };

  const execCommand = (command: string, value?: string) => {
    try {
      document.execCommand(command, false, value);
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
    } catch (error) {
      console.warn('execCommand failed, using fallback');
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const link = document.createElement('a');
        link.href = url;
        link.textContent = selection.toString() || url;
        range.deleteContents();
        range.insertNode(link);
        if (editorRef.current) {
          setContent(editorRef.current.innerHTML);
        }
      }
    }
  };

  const changeTextColor = (color: string) => {
    execCommand('foreColor', color);
  };

  const changeBackgroundColor = (color: string) => {
    execCommand('backColor', color);
  };

  const changeFontSize = (size: string) => {
    execCommand('fontSize', size);
  };

  const changeFontFamily = (font: string) => {
    execCommand('fontName', font);
  };

  const insertHTML = (html: string) => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const div = document.createElement('div');
        div.innerHTML = html;
        const frag = document.createDocumentFragment();
        while (div.firstChild) {
          frag.appendChild(div.firstChild);
        }
        range.insertNode(frag);
        setContent(editorRef.current.innerHTML);
      }
    }
  };

  const getPreviewStyles = () => {
    const baseStyles = {
      margin: '0 auto',
      backgroundColor: '#ffffff',
      minHeight: '500px',
      transition: 'all 0.3s ease',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    };

    switch (previewMode) {
      case 'mobile':
        return { ...baseStyles, maxWidth: '375px', width: '100%' };
      case 'tablet':
        return { ...baseStyles, maxWidth: '768px', width: '100%' };
      default:
        return { ...baseStyles, maxWidth: editorSettings.maxWidth, width: '100%' };
    }
  };

  const addElement = (elementType: string) => {
    const elementContent = {
      text: '<h2>Your Headline Here</h2><p>Add your content here...</p>',
      image: '<img src="https://via.placeholder.com/400x200" alt="Your image" style="width: 100%; height: auto;" />',
      button: '<a href="#" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Call to Action</a>',
      divider: '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />',
      social: '<div style="text-align: center; margin: 20px 0;"><a href="#" style="margin: 0 10px;">Facebook</a><a href="#" style="margin: 0 10px;">Twitter</a><a href="#" style="margin: 0 10px;">Instagram</a></div>',
      footer: '<div style="text-align: center; font-size: 12px; color: #6b7280; margin-top: 40px;"><p>Your Company Name<br>123 Main St, City, State 12345</p><p><a href="#">Unsubscribe</a> | <a href="#">Update Preferences</a></p></div>'
    };

    setContent(prev => prev + '\n' + elementContent[elementType as keyof typeof elementContent]);
  };

  const applyTemplate = (templateId: number) => {
    const templateContent = {
      1: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <header style="background: #3B82F6; color: white; padding: 20px; text-align: center;">
    <h1>Newsletter Title</h1>
  </header>
  <main style="padding: 20px;">
    <h2>Welcome to our newsletter!</h2>
    <p>This is where your main content goes. You can add multiple paragraphs, images, and more.</p>
    <a href="#" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Read More</a>
  </main>
  <footer style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px;">
    <p>© 2024 Your Company. All rights reserved.</p>
    <p><a href="#">Unsubscribe</a></p>
  </footer>
</div>`,
      2: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  <div style="padding: 40px 20px; text-align: center; color: white;">
    <h1 style="font-size: 32px; margin-bottom: 10px;">Special Offer!</h1>
    <h2 style="font-size: 24px; margin-bottom: 20px;">50% Off Everything</h2>
    <p style="font-size: 18px; margin-bottom: 30px;">Limited time offer. Don't miss out!</p>
    <a href="#" style="background: white; color: #667eea; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 18px;">Shop Now</a>
  </div>
</div>`,
      3: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="padding: 40px 20px; text-align: center;">
    <h1 style="color: #10b981; font-size: 28px;">Welcome!</h1>
    <p style="font-size: 18px; color: #374151;">We're excited to have you join our community.</p>
    <div style="margin: 30px 0;">
      <img src="https://via.placeholder.com/400x200" alt="Welcome" style="width: 100%; max-width: 400px; height: auto;" />
    </div>
    <p>Here's what you can expect from us:</p>
    <ul style="text-align: left; display: inline-block;">
      <li>Weekly tips and insights</li>
      <li>Exclusive offers and discounts</li>
      <li>Early access to new features</li>
    </ul>
    <a href="#" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px;">Get Started</a>
  </div>
</div>`,
      4: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="text-align: center; padding: 20px;">
    <h1 style="color: #1f2937;">Introducing Our Latest Product</h1>
    <div style="margin: 20px 0;">
      <img src="https://via.placeholder.com/500x300" alt="New Product" style="width: 100%; max-width: 500px; height: auto;" />
    </div>
    <h2 style="color: #3B82F6;">Revolutionary Innovation</h2>
    <p style="font-size: 16px; line-height: 1.6;">Experience the future with our groundbreaking new product. Designed with you in mind.</p>
    <div style="margin: 30px 0;">
      <a href="#" style="background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-size: 18px; margin: 0 10px;">Pre-order Now</a>
      <a href="#" style="background: white; color: #3B82F6; border: 2px solid #3B82F6; padding: 13px 28px; text-decoration: none; border-radius: 4px; font-size: 18px; margin: 0 10px;">Learn More</a>
    </div>
  </div>
</div>`
    };

    setContent(templateContent[templateId as keyof typeof templateContent] || '');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-r overflow-y-auto">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-lg">Email Editor</h3>
              <p className="text-sm text-gray-600">Drag and drop elements to build your email</p>
            </div>

            <Tabs defaultValue="elements" className="w-full">
              <TabsList className="grid w-full grid-cols-4 m-4">
                <TabsTrigger value="elements" className="text-xs">Elements</TabsTrigger>
                <TabsTrigger value="templates" className="text-xs">Templates</TabsTrigger>
                <TabsTrigger value="styles" className="text-xs">Styles</TabsTrigger>
                <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="elements" className="px-4">
                <div className="space-y-2">
                  {elements.map((element) => (
                    <Card 
                      key={element.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => addElement(element.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-3">
                          <element.icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <h4 className="font-medium text-sm">{element.name}</h4>
                            <p className="text-xs text-gray-500">{element.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="templates" className="px-4">
                <div className="space-y-3">
                  {templates.map((template) => (
                    <Card 
                      key={template.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => applyTemplate(template.id)}
                    >
                      <CardContent className="p-3">
                        <h4 className="font-medium text-sm mb-1">{template.name}</h4>
                        <p className="text-xs text-gray-500">{template.preview}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="styles" className="px-4 space-y-4">
                <div className="space-y-3">
                  <div>
                    <Label>Font Family</Label>
                    <Select onValueChange={changeFontFamily}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                        <SelectItem value="Georgia, serif">Georgia</SelectItem>
                        <SelectItem value="Times New Roman, serif">Times New Roman</SelectItem>
                        <SelectItem value="Helvetica, sans-serif">Helvetica</SelectItem>
                        <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Font Size</Label>
                    <Select onValueChange={changeFontSize}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Small (10px)</SelectItem>
                        <SelectItem value="2">Normal (13px)</SelectItem>
                        <SelectItem value="3">Medium (16px)</SelectItem>
                        <SelectItem value="4">Large (18px)</SelectItem>
                        <SelectItem value="5">X-Large (24px)</SelectItem>
                        <SelectItem value="6">XX-Large (32px)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Text Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="color" 
                        className="w-16 h-8"
                        onChange={(e) => changeTextColor(e.target.value)} 
                      />
                      <Input 
                        type="text" 
                        placeholder="#333333" 
                        onChange={(e) => changeTextColor(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Background Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="color" 
                        className="w-16 h-8"
                        onChange={(e) => changeBackgroundColor(e.target.value)} 
                      />
                      <Input 
                        type="text" 
                        placeholder="#ffffff" 
                        onChange={(e) => changeBackgroundColor(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="px-4 space-y-4">
                <div>
                  <Label htmlFor="maxWidth">Email Max Width</Label>
                  <Select onValueChange={(value) => setEditorSettings({...editorSettings, maxWidth: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="600px" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500px">500px</SelectItem>
                      <SelectItem value="600px">600px</SelectItem>
                      <SelectItem value="700px">700px</SelectItem>
                      <SelectItem value="800px">800px</SelectItem>
                      <SelectItem value="100%">Full Width</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bgColor">Email Background</Label>
                  <Input 
                    id="bgColor" 
                    type="color" 
                    value={editorSettings.backgroundColor}
                    onChange={(e) => setEditorSettings({...editorSettings, backgroundColor: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="linkColor">Link Color</Label>
                  <Input 
                    id="linkColor" 
                    type="color" 
                    value={editorSettings.linkColor}
                    onChange={(e) => setEditorSettings({...editorSettings, linkColor: e.target.value})}
                  />
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setContent('')}
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const blob = new Blob([content], { type: 'text/html' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'email.html';
                      a.click();
                    }}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Editor */}
          <div className="flex-1 flex flex-col">
            {/* Enhanced Toolbar */}
            <div className="p-3 border-b bg-white">
              {/* Primary Toolbar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsDragDropOpen(true)}
                  >
                    <Layers className="h-4 w-4 mr-1" />
                    Advanced Builder
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-gray-100 rounded p-1">
                    <Button 
                      variant={previewMode === 'desktop' ? 'default' : 'ghost'} 
                      size="sm"
                      onClick={() => setPreviewMode('desktop')}
                    >
                      <Monitor className="h-4 w-4" />
                      <span className="ml-1 hidden sm:inline">Desktop</span>
                    </Button>
                    <Button 
                      variant={previewMode === 'tablet' ? 'default' : 'ghost'} 
                      size="sm"
                      onClick={() => setPreviewMode('tablet')}
                    >
                      <Tablet className="h-4 w-4" />
                      <span className="ml-1 hidden sm:inline">Tablet</span>
                    </Button>
                    <Button 
                      variant={previewMode === 'mobile' ? 'default' : 'ghost'} 
                      size="sm"
                      onClick={() => setPreviewMode('mobile')}
                    >
                      <Smartphone className="h-4 w-4" />
                      <span className="ml-1 hidden sm:inline">Mobile</span>
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (content) {
                        const html = `
                          <!DOCTYPE html>
                          <html>
                            <head>
                              <title>Email Preview</title>
                              <meta charset="utf-8">
                              <meta name="viewport" content="width=device-width, initial-scale=1">
                              <style>
                                body { 
                                  margin: 0; 
                                  padding: 20px; 
                                  background-color: #f5f5f5; 
                                  font-family: ${editorSettings.fontFamily};
                                }
                                .email-container {
                                  max-width: ${editorSettings.maxWidth};
                                  margin: 0 auto;
                                  background: ${editorSettings.backgroundColor};
                                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                                }
                              </style>
                            </head>
                            <body>
                              <div class="email-container">
                                ${content}
                              </div>
                            </body>
                          </html>
                        `;
                        const previewWindow = window.open('', '_blank');
                        if (previewWindow) {
                          previewWindow.document.write(html);
                          previewWindow.document.close();
                        }
                      }
                    }}
                    disabled={!content}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Formatting Toolbar */}
              <div className="flex items-center space-x-1 flex-wrap gap-1">
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('bold')}
                    title="Bold"
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('italic')}
                    title="Italic"
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('underline')}
                    title="Underline"
                  >
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('strikeThrough')}
                    title="Strikethrough"
                  >
                    <Strikethrough className="h-4 w-4" />
                  </Button>
                </div>

                <Separator orientation="vertical" className="h-6 mx-2" />

                <div className="flex items-center space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('justifyLeft')}
                    title="Align Left"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('justifyCenter')}
                    title="Align Center"
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('justifyRight')}
                    title="Align Right"
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('justifyFull')}
                    title="Justify"
                  >
                    <AlignJustify className="h-4 w-4" />
                  </Button>
                </div>

                <Separator orientation="vertical" className="h-6 mx-2" />

                <div className="flex items-center space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('insertUnorderedList')}
                    title="Bullet List"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('insertOrderedList')}
                    title="Numbered List"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('outdent')}
                    title="Decrease Indent"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('indent')}
                    title="Increase Indent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Separator orientation="vertical" className="h-6 mx-2" />

                <div className="flex items-center space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={insertLink}
                    title="Insert Link"
                  >
                    <Link2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const imageUrl = prompt('Enter image URL:');
                      if (imageUrl) {
                        execCommand('insertImage', imageUrl);
                      }
                    }}
                    title="Insert Image"
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => execCommand('formatBlock', 'blockquote')}
                    title="Quote"
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>


            {/* Enhanced Editor Content with Improved Scrolling */}
            <div 
              className="flex-1 bg-gray-100" 
              style={{ height: 'calc(90vh - 280px)', overflow: 'auto' }}
            >
              <div className="h-full p-4">
                <div 
                  style={getPreviewStyles()}
                  className="relative min-h-full"
                >
                  {/* Device Frame Indicator */}
                  <div className="sticky top-0 z-10 -mt-4 mb-4 text-xs text-gray-600 bg-white px-3 py-2 rounded shadow-sm border border-gray-200 inline-block">
                    {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} View
                    {previewMode === 'mobile' && ' (375px)'}
                    {previewMode === 'tablet' && ' (768px)'}
                    {previewMode === 'desktop' && ` (${editorSettings.maxWidth})`}
                  </div>

                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{ __html: content }}
                    onInput={(e) => setContent(e.currentTarget.innerHTML)}
                    onBlur={(e) => setContent(e.currentTarget.innerHTML)}
                    className="w-full min-h-[600px] p-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded"
                    style={{ 
                      fontFamily: editorSettings.fontFamily,
                      fontSize: editorSettings.fontSize,
                      color: editorSettings.textColor,
                      backgroundColor: editorSettings.backgroundColor,
                      lineHeight: '1.6'
                    }}
                    data-placeholder="Start writing your email content here..."
                    data-voice-context="Rich text editor canvas with full formatting support, drag-and-drop capabilities, and live preview"
                  />
                  
                  {/* Empty State */}
                  {!content && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
                      <Type className="h-12 w-12 mb-4" />
                      <p className="text-lg font-medium mb-2">Start creating your email</p>
                      <p className="text-sm text-center">
                        Use the toolbar above for formatting<br />
                        or drag elements from the sidebar
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Drag & Drop Email Builder */}
        <DragDropEmailBuilder
          isOpen={isDragDropOpen}
          onClose={() => setIsDragDropOpen(false)}
          initialContent={content}
          onSave={(jsonContent, htmlContent) => {
            setContent(htmlContent);
            onSave(htmlContent);
            setIsDragDropOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};