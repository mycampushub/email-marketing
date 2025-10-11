import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { 
  Type, 
  Image, 
  Link, 
  Palette, 
  Layout, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Bold, 
  Italic, 
  Underline, 
  Save, 
  Eye, 
  Smartphone, 
  Monitor, 
  Tablet,
  Trash2,
  Copy,
  Move,
  Plus
} from 'lucide-react';

interface EmailElement {
  id: string;
  type: 'text' | 'image' | 'button' | 'divider' | 'spacer' | 'social' | 'header' | 'footer';
  content: any;
  styles: any;
}

interface DragDropEmailBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  onSave: (content: string, html: string) => void;
}

export const DragDropEmailBuilder: React.FC<DragDropEmailBuilderProps> = ({ 
  isOpen, 
  onClose, 
  initialContent = '', 
  onSave 
}) => {
  const [elements, setElements] = useState<EmailElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);

  const elementLibrary = [
    {
      type: 'header',
      name: 'Header',
      icon: Layout,
      description: 'Email header with logo',
      defaultContent: {
        logoUrl: 'https://via.placeholder.com/200x60?text=LOGO',
        backgroundColor: '#ffffff',
        padding: '20px'
      }
    },
    {
      type: 'text',
      name: 'Text Block',
      icon: Type,
      description: 'Headlines and paragraphs',
      defaultContent: {
        text: '<h2>Your Headline Here</h2><p>Add your content here. You can format text, add links, and more.</p>',
        fontSize: '16px',
        color: '#333333',
        alignment: 'left'
      }
    },
    {
      type: 'image',
      name: 'Image',
      icon: Image,
      description: 'Photos and graphics',
      defaultContent: {
        src: 'https://via.placeholder.com/600x300?text=Your+Image',
        alt: 'Image description',
        width: '100%',
        alignment: 'center'
      }
    },
    {
      type: 'button',
      name: 'Button',
      icon: Link,
      description: 'Call-to-action buttons',
      defaultContent: {
        text: 'Call to Action',
        url: '#',
        backgroundColor: '#007bff',
        textColor: '#ffffff',
        borderRadius: '4px',
        padding: '12px 24px',
        alignment: 'center'
      }
    },
    {
      type: 'divider',
      name: 'Divider',
      icon: AlignCenter,
      description: 'Separate content sections',
      defaultContent: {
        style: 'solid',
        color: '#e5e7eb',
        thickness: '1px',
        margin: '20px 0'
      }
    },
    {
      type: 'spacer',
      name: 'Spacer',
      icon: Layout,
      description: 'Add space between elements',
      defaultContent: {
        height: '20px'
      }
    },
    {
      type: 'social',
      name: 'Social Links',
      icon: Link,
      description: 'Social media icons',
      defaultContent: {
        platforms: ['facebook', 'twitter', 'instagram', 'linkedin'],
        iconSize: '32px',
        spacing: '10px',
        alignment: 'center'
      }
    },
    {
      type: 'footer',
      name: 'Footer',
      icon: AlignLeft,
      description: 'Contact info and unsubscribe',
      defaultContent: {
        companyName: 'Your Company Name',
        address: '123 Main St, City, State 12345',
        backgroundColor: '#f8f9fa',
        textColor: '#6c757d',
        fontSize: '12px'
      }
    }
  ];

  const addElement = (elementType: string) => {
    const elementDef = elementLibrary.find(el => el.type === elementType);
    if (!elementDef) return;

    const newElement: EmailElement = {
      id: `element-${Date.now()}`,
      type: elementType as any,
      content: elementDef.defaultContent,
      styles: {}
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (elementId: string, updates: Partial<EmailElement>) => {
    setElements(elements.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  };

  const removeElement = (elementId: string) => {
    setElements(elements.filter(el => el.id !== elementId));
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
  };

  const duplicateElement = (elementId: string) => {
    const element = elements.find(el => el.id === elementId);
    if (!element) return;

    const newElement = {
      ...element,
      id: `element-${Date.now()}`
    };

    const index = elements.findIndex(el => el.id === elementId);
    const newElements = [...elements];
    newElements.splice(index + 1, 0, newElement);
    setElements(newElements);
  };

  const moveElement = (elementId: string, direction: 'up' | 'down') => {
    const index = elements.findIndex(el => el.id === elementId);
    if (index === -1) return;

    const newElements = [...elements];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < elements.length) {
      [newElements[index], newElements[targetIndex]] = [newElements[targetIndex], newElements[index]];
      setElements(newElements);
    }
  };

  const generateHTML = () => {
    let html = `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #ffffff;">
    `;

    elements.forEach(element => {
      switch (element.type) {
        case 'header':
          html += `
            <div style="background-color: ${element.content.backgroundColor}; padding: ${element.content.padding}; text-align: center;">
              <img src="${element.content.logoUrl}" alt="Logo" style="max-height: 60px;" />
            </div>
          `;
          break;
        case 'text':
          html += `
            <div style="padding: 20px; text-align: ${element.content.alignment};">
              <div style="color: ${element.content.color}; font-size: ${element.content.fontSize};">
                ${element.content.text}
              </div>
            </div>
          `;
          break;
        case 'image':
          html += `
            <div style="padding: 20px; text-align: ${element.content.alignment};">
              <img src="${element.content.src}" alt="${element.content.alt}" style="width: ${element.content.width}; height: auto;" />
            </div>
          `;
          break;
        case 'button':
          html += `
            <div style="padding: 20px; text-align: ${element.content.alignment};">
              <a href="${element.content.url}" style="
                background-color: ${element.content.backgroundColor}; 
                color: ${element.content.textColor}; 
                padding: ${element.content.padding}; 
                text-decoration: none; 
                border-radius: ${element.content.borderRadius};
                display: inline-block;
              ">
                ${element.content.text}
              </a>
            </div>
          `;
          break;
        case 'divider':
          html += `
            <div style="padding: 0 20px;">
              <hr style="
                border: none; 
                border-top: ${element.content.thickness} ${element.content.style} ${element.content.color}; 
                margin: ${element.content.margin};
              " />
            </div>
          `;
          break;
        case 'spacer':
          html += `<div style="height: ${element.content.height};"></div>`;
          break;
        case 'social':
          html += `
            <div style="padding: 20px; text-align: ${element.content.alignment};">
              ${element.content.platforms.map((platform: string) => `
                <a href="#" style="margin: 0 ${element.content.spacing};">
                  <img src="https://via.placeholder.com/${element.content.iconSize}?text=${platform.charAt(0).toUpperCase()}" 
                       alt="${platform}" 
                       style="width: ${element.content.iconSize}; height: ${element.content.iconSize};" />
                </a>
              `).join('')}
            </div>
          `;
          break;
        case 'footer':
          html += `
            <div style="
              background-color: ${element.content.backgroundColor}; 
              color: ${element.content.textColor}; 
              font-size: ${element.content.fontSize}; 
              padding: 30px 20px; 
              text-align: center;
            ">
              <p style="margin: 0 0 10px 0;">${element.content.companyName}</p>
              <p style="margin: 0 0 15px 0;">${element.content.address}</p>
              <p style="margin: 0;">
                <a href="#" style="color: ${element.content.textColor};">Unsubscribe</a> | 
                <a href="#" style="color: ${element.content.textColor};">Update Preferences</a>
              </p>
            </div>
          `;
          break;
      }
    });

    html += '</div>';
    return html;
  };

  const handleSave = () => {
    const html = generateHTML();
    onSave(JSON.stringify(elements), html);
    toast({
      title: "Email Saved",
      description: "Your email design has been saved successfully",
    });
    onClose();
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] h-[90vh] p-0">
        <div className="flex h-full">
          {/* Left Sidebar - Elements Library */}
          <div className="w-64 bg-gray-50 border-r overflow-y-auto">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-lg">Elements</h3>
              <p className="text-sm text-gray-600">Drag elements to your email</p>
            </div>

            <div className="p-4">
              <div className="space-y-2">
                {elementLibrary.map((element) => (
                  <Card 
                    key={element.type} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addElement(element.type)}
                    draggable
                    onDragStart={() => setDraggedElement(element.type)}
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
            </div>
          </div>

          {/* Main Canvas */}
          <div className="flex-1 flex flex-col">
            {/* Toolbar */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 bg-gray-100 rounded p-1">
                  <Button 
                    variant={previewMode === 'desktop' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={previewMode === 'tablet' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPreviewMode('tablet')}
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={previewMode === 'mobile' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const html = generateHTML();
                    const previewWindow = window.open('', '_blank');
                    if (previewWindow) {
                      previewWindow.document.write(`
                        <!DOCTYPE html>
                        <html>
                          <head>
                            <title>Email Preview</title>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                          </head>
                          <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
                            ${html}
                          </body>
                        </html>
                      `);
                      previewWindow.document.close();
                    }
                  }}
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

            {/* Enhanced Canvas with Proper Scrolling */}
            <div className="flex-1 bg-gray-100" style={{ height: 'calc(90vh - 200px)', overflow: 'auto' }}>
              <div className="h-full p-4">
                <div className={`mx-auto bg-white shadow-lg transition-all duration-300 min-h-full ${
                  previewMode === 'mobile' ? 'max-w-sm' : 
                  previewMode === 'tablet' ? 'max-w-md' : 'max-w-2xl'
                }`}>
                  {/* Device Frame Indicator */}
                  <div 
                    className="bg-gray-200 px-4 py-2 text-xs text-gray-600 border-b flex justify-between items-center sticky top-0 z-10"
                    data-voice-context={`Viewing email in ${previewMode} mode with ${elements.length} elements`}
                  >
                    <span>
                      {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)} Preview
                      {previewMode === 'mobile' && ' (375px)'}
                      {previewMode === 'tablet' && ' (768px)'}
                      {previewMode === 'desktop' && ' (Desktop)'}
                    </span>
                    <span className="text-gray-500">{elements.length} elements</span>
                  </div>

                  <div 
                    ref={canvasRef}
                    className="min-h-[800px] relative pb-20"
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedElement) {
                        addElement(draggedElement);
                        setDraggedElement(null);
                        toast({
                          title: "Element Added",
                          description: `${draggedElement} element has been added to your email`,
                        });
                      }
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    data-voice-context="Drag and drop canvas for building email layouts with visual elements"
                  >
                    {elements.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-96 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100">
                        <Plus className="h-16 w-16 mb-4 text-gray-400" />
                        <p className="text-xl font-medium mb-2">Start Building Your Email</p>
                        <p className="text-sm text-center max-w-md">
                          Drag elements from the sidebar to create your email,<br />
                          or click on any element to add it instantly
                        </p>
                        <div className="mt-4 flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addElement('header')}
                          >
                            Add Header
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addElement('text')}
                          >
                            Add Text
                          </Button>
                        </div>
                      </div>
                    ) : (
                      elements.map((element, index) => (
                        <div
                          key={element.id}
                          className={`relative group cursor-pointer transition-all duration-200 ${
                            selectedElement === element.id ? 'ring-2 ring-blue-500 ring-inset' : 'hover:ring-1 hover:ring-gray-300'
                          }`}
                          onClick={() => setSelectedElement(element.id)}
                        >
                          {/* Enhanced Element Toolbar */}
                          <div className="absolute top-2 right-2 bg-white shadow-lg rounded-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 border">
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveElement(element.id, 'up');
                                }}
                                disabled={index === 0}
                                title="Move up"
                                className="h-8 w-8 p-0"
                              >
                                ↑
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveElement(element.id, 'down');
                                }}
                                disabled={index === elements.length - 1}
                                title="Move down"
                                className="h-8 w-8 p-0"
                              >
                                ↓
                              </Button>
                              <Separator orientation="vertical" className="h-4 mx-1" />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateElement(element.id);
                                }}
                                title="Duplicate"
                                className="h-8 w-8 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeElement(element.id);
                                }}
                                title="Delete"
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Element Type Badge */}
                          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            {element.type}
                          </div>

                        {/* Render Element */}
                        <div dangerouslySetInnerHTML={{ __html: generateElementHTML(element) }} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Element Properties */}
          {selectedElementData && (
            <div className="w-80 bg-white border-l overflow-y-auto">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Element Properties</h3>
                <p className="text-sm text-gray-600 capitalize">{selectedElementData.type} Settings</p>
              </div>
              
              <div className="p-4 space-y-4">
                <ElementPropertiesPanel 
                  element={selectedElementData}
                  onUpdate={(updates) => updateElement(selectedElementData.id, updates)}
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to generate HTML for individual elements
const generateElementHTML = (element: EmailElement): string => {
  switch (element.type) {
    case 'header':
      return `
        <div style="background-color: ${element.content.backgroundColor}; padding: ${element.content.padding}; text-align: center;">
          <img src="${element.content.logoUrl}" alt="Logo" style="max-height: 60px;" />
        </div>
      `;
    case 'text':
      return `
        <div style="padding: 20px; text-align: ${element.content.alignment};">
          <div style="color: ${element.content.color}; font-size: ${element.content.fontSize};">
            ${element.content.text}
          </div>
        </div>
      `;
    case 'image':
      return `
        <div style="padding: 20px; text-align: ${element.content.alignment};">
          <img src="${element.content.src}" alt="${element.content.alt}" style="width: ${element.content.width}; height: auto;" />
        </div>
      `;
    case 'button':
      return `
        <div style="padding: 20px; text-align: ${element.content.alignment};">
          <a href="${element.content.url}" style="
            background-color: ${element.content.backgroundColor}; 
            color: ${element.content.textColor}; 
            padding: ${element.content.padding}; 
            text-decoration: none; 
            border-radius: ${element.content.borderRadius};
            display: inline-block;
          ">
            ${element.content.text}
          </a>
        </div>
      `;
    case 'divider':
      return `
        <div style="padding: 0 20px;">
          <hr style="
            border: none; 
            border-top: ${element.content.thickness} ${element.content.style} ${element.content.color}; 
            margin: ${element.content.margin};
          " />
        </div>
      `;
    case 'spacer':
      return `<div style="height: ${element.content.height};"></div>`;
    case 'social':
      return `
        <div style="padding: 20px; text-align: ${element.content.alignment};">
          ${element.content.platforms.map((platform: string) => `
            <a href="#" style="margin: 0 ${element.content.spacing};">
              <img src="https://via.placeholder.com/${element.content.iconSize}?text=${platform.charAt(0).toUpperCase()}" 
                   alt="${platform}" 
                   style="width: ${element.content.iconSize}; height: ${element.content.iconSize};" />
            </a>
          `).join('')}
        </div>
      `;
    case 'footer':
      return `
        <div style="
          background-color: ${element.content.backgroundColor}; 
          color: ${element.content.textColor}; 
          font-size: ${element.content.fontSize}; 
          padding: 30px 20px; 
          text-align: center;
        ">
          <p style="margin: 0 0 10px 0;">${element.content.companyName}</p>
          <p style="margin: 0 0 15px 0;">${element.content.address}</p>
          <p style="margin: 0;">
            <a href="#" style="color: ${element.content.textColor};">Unsubscribe</a> | 
            <a href="#" style="color: ${element.content.textColor};">Update Preferences</a>
          </p>
        </div>
      `;
    default:
      return `<div>Element: ${element.type}</div>`;
  }
};

// Element properties panel component
const ElementPropertiesPanel: React.FC<{
  element: EmailElement;
  onUpdate: (updates: Partial<EmailElement>) => void;
}> = ({ element, onUpdate }) => {
  const updateContent = (updates: any) => {
    onUpdate({ content: { ...element.content, ...updates } });
  };

  switch (element.type) {
    case 'text':
      return (
        <div className="space-y-4">
          <div>
            <Label>Text Content</Label>
            <Textarea
              value={element.content.text}
              onChange={(e) => updateContent({ text: e.target.value })}
              rows={4}
            />
          </div>
          <div>
            <Label>Font Size</Label>
            <Input
              value={element.content.fontSize}
              onChange={(e) => updateContent({ fontSize: e.target.value })}
            />
          </div>
          <div>
            <Label>Text Color</Label>
            <Input
              type="color"
              value={element.content.color}
              onChange={(e) => updateContent({ color: e.target.value })}
            />
          </div>
        </div>
      );
    
    case 'button':
      return (
        <div className="space-y-4">
          <div>
            <Label>Button Text</Label>
            <Input
              value={element.content.text}
              onChange={(e) => updateContent({ text: e.target.value })}
            />
          </div>
          <div>
            <Label>Link URL</Label>
            <Input
              value={element.content.url}
              onChange={(e) => updateContent({ url: e.target.value })}
            />
          </div>
          <div>
            <Label>Background Color</Label>
            <Input
              type="color"
              value={element.content.backgroundColor}
              onChange={(e) => updateContent({ backgroundColor: e.target.value })}
            />
          </div>
        </div>
      );
    
    case 'image':
      return (
        <div className="space-y-4">
          <div>
            <Label>Image URL</Label>
            <Input
              value={element.content.src}
              onChange={(e) => updateContent({ src: e.target.value })}
            />
          </div>
          <div>
            <Label>Alt Text</Label>
            <Input
              value={element.content.alt}
              onChange={(e) => updateContent({ alt: e.target.value })}
            />
          </div>
          <div>
            <Label>Width</Label>
            <Input
              value={element.content.width}
              onChange={(e) => updateContent({ width: e.target.value })}
            />
          </div>
        </div>
      );
    
    case 'header':
      return (
        <div className="space-y-4">
          <div>
            <Label>Logo URL</Label>
            <Input
              value={element.content.logoUrl}
              onChange={(e) => updateContent({ logoUrl: e.target.value })}
            />
          </div>
          <div>
            <Label>Background Color</Label>
            <Input
              type="color"
              value={element.content.backgroundColor}
              onChange={(e) => updateContent({ backgroundColor: e.target.value })}
            />
          </div>
        </div>
      );
    
    case 'footer':
      return (
        <div className="space-y-4">
          <div>
            <Label>Company Name</Label>
            <Input
              value={element.content.companyName}
              onChange={(e) => updateContent({ companyName: e.target.value })}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Textarea
              value={element.content.address}
              onChange={(e) => updateContent({ address: e.target.value })}
              rows={2}
            />
          </div>
          <div>
            <Label>Background Color</Label>
            <Input
              type="color"
              value={element.content.backgroundColor}
              onChange={(e) => updateContent({ backgroundColor: e.target.value })}
            />
          </div>
        </div>
      );
    
    default:
      return <div>Properties for {element.type}</div>;
  }
};