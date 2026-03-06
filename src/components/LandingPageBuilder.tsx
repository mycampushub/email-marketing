import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Save, Eye, Code, Settings, Palette, Undo, Redo,
  Smartphone, Tablet, Monitor, Download, Upload, Trash2,
  GripVertical, Image, Type, Layout, FormInput, Check,
  ChevronUp, ChevronDown, Copy, ExternalLink, Globe
} from 'lucide-react';

interface LandingPageSection {
  id: string;
  type: 'hero' | 'features' | 'about' | 'cta' | 'form' | 'testimonials' | 'footer' | 'spacer';
  content: Record<string, any>;
  styles: Record<string, any>;
}

interface LandingPage {
  id: string;
  name: string;
  description: string;
  goal: string;
  template: string;
  status: 'Draft' | 'Published';
  url?: string;
  sections: LandingPageSection[];
  styles: {
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  analytics: {
    visitors: number;
    conversions: number;
    conversionRate: number;
  };
  created: string;
  lastModified: string;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const templates = [
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'Showcase a new product with hero, features, and CTA',
    thumbnail: '🚀',
    sections: [
      { type: 'hero', content: { title: 'Introducing Our New Product', subtitle: 'The solution you\'ve been waiting for', ctaText: 'Get Started', ctaLink: '#signup' } },
      { type: 'features', content: { title: 'Key Features', items: ['Feature 1', 'Feature 2', 'Feature 3'] } },
      { type: 'cta', content: { title: 'Ready to Get Started?', subtitle: 'Join thousands of happy customers', ctaText: 'Sign Up Now', ctaLink: '#signup' } },
      { type: 'footer', content: { text: '© 2024 Your Company. All rights reserved.' } },
    ]
  },
  {
    id: 'newsletter',
    name: 'Newsletter Signup',
    description: 'Capture email subscribers with a clean signup form',
    thumbnail: '📧',
    sections: [
      { type: 'hero', content: { title: 'Stay Updated', subtitle: 'Get the latest news and updates delivered to your inbox', ctaText: 'Subscribe', ctaLink: '#form' } },
      { type: 'testimonials', content: { title: 'What Our Subscribers Say', items: ['Great content!', 'Very informative!', 'Love the updates!'] } },
      { type: 'footer', content: { text: '© 2024 Your Company. All rights reserved.' } },
    ]
  },
  {
    id: 'webinar',
    name: 'Webinar Registration',
    description: 'Promote and register attendees for webinars',
    thumbnail: '🎥',
    sections: [
      { type: 'hero', content: { title: 'Free Webinar', subtitle: 'Learn the secrets to success', date: 'January 25, 2024', time: '2:00 PM EST', ctaText: 'Register Now', ctaLink: '#form' } },
      { type: 'features', content: { title: 'What You\'ll Learn', items: ['Tip 1', 'Tip 2', 'Tip 3', 'Tip 4'] } },
      { type: 'cta', content: { title: 'Don\'t Miss Out!', subtitle: 'Limited seats available', ctaText: 'Reserve Your Spot', ctaLink: '#form' } },
      { type: 'footer', content: { text: '© 2024 Your Company. All rights reserved.' } },
    ]
  },
  {
    id: 'ebook',
    name: 'Ebook Download',
    description: 'Lead magnet for ebook downloads',
    thumbnail: '📚',
    sections: [
      { type: 'hero', content: { title: 'Free Ebook', subtitle: 'The Ultimate Guide to Success', ctaText: 'Download Now', ctaLink: '#form' } },
      { type: 'about', content: { title: 'What\'s Inside', description: 'Chapter 1, Chapter 2, Chapter 3, and more!' } },
      { type: 'testimonials', content: { title: 'What Readers Say', items: ['Life changing!', 'Must read!', 'Highly recommended!'] } },
      { type: 'footer', content: { text: '© 2024 Your Company. All rights reserved.' } },
    ]
  },
  {
    id: 'contact',
    name: 'Contact Form',
    description: 'Simple contact page for inquiries',
    thumbnail: '📝',
    sections: [
      { type: 'hero', content: { title: 'Get In Touch', subtitle: 'We\'d love to hear from you' } },
      { type: 'form', content: { title: 'Send us a Message', fields: ['name', 'email', 'message'] } },
      { type: 'footer', content: { text: '© 2024 Your Company. All rights reserved.' } },
    ]
  },
  {
    id: 'blank',
    name: 'Blank',
    description: 'Start from scratch',
    thumbnail: '⬜',
    sections: []
  }
];

const sectionTypes = [
  { type: 'hero', label: 'Hero Section', icon: Layout, defaultContent: { title: 'Hero Title', subtitle: 'Hero subtitle', ctaText: 'Click Here' } },
  { type: 'features', label: 'Features', icon: Check, defaultContent: { title: 'Features', items: ['Feature 1', 'Feature 2', 'Feature 3'] } },
  { type: 'about', label: 'About', icon: Type, defaultContent: { title: 'About Us', description: 'Tell your story' } },
  { type: 'cta', label: 'Call to Action', icon: FormInput, defaultContent: { title: 'Ready?', subtitle: 'Take action now', ctaText: 'Get Started' } },
  { type: 'form', label: 'Form', icon: FormInput, defaultContent: { title: 'Sign Up', fields: ['email'] } },
  { type: 'testimonials', label: 'Testimonials', icon: Type, defaultContent: { title: 'Testimonials', items: ['Great!', 'Amazing!'] } },
  { type: 'spacer', label: 'Spacer', icon: Plus, defaultContent: { height: 40 } },
  { type: 'footer', label: 'Footer', icon: Layout, defaultContent: { text: '© 2024 Company' } },
];

export const LandingPageBuilder: React.FC<{ initialData?: LandingPage; onSave?: (data: LandingPage) => void; onCancel?: () => void }> = ({ 
  initialData, 
  onSave, 
  onCancel 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [pageName, setPageName] = useState(initialData?.name || 'My Landing Page');
  const [pageDescription, setPageDescription] = useState(initialData?.description || '');
  const [pageGoal, setPageGoal] = useState(initialData?.goal || 'lead-generation');
  const [sections, setSections] = useState<LandingPageSection[]>(initialData?.sections || []);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('builder');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [history, setHistory] = useState<LandingPageSection[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(!!initialData?.id);

  useEffect(() => {
    if (initialData) {
      setPageName(initialData.name || 'My Landing Page');
      setPageDescription(initialData.description || '');
      setPageGoal(initialData.goal || 'lead-generation');
      setSections(initialData.sections || []);
      setIsEditing(!!initialData.id);
    }
  }, [initialData]);

  const [styles, setStyles] = useState({
    primaryColor: initialData?.styles?.primaryColor || '#8B5CF6',
    backgroundColor: initialData?.styles?.backgroundColor || '#FFFFFF',
    fontFamily: initialData?.styles?.fontFamily || 'Inter',
  });

  const [seo, setSeo] = useState(initialData?.seo || {
    title: '',
    description: '',
    keywords: '',
  });

  const addToHistory = useCallback((newSections: LandingPageSection[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newSections);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSections(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSections(history[historyIndex + 1]);
    }
  };

  const addSection = (type: string) => {
    const sectionDef = sectionTypes.find(s => s.type === type);
    if (!sectionDef) return;
    
    const newSection: LandingPageSection = {
      id: generateId(),
      type: type as any,
      content: { ...sectionDef.defaultContent },
      styles: {},
    };
    
    const newSections = [...sections, newSection];
    setSections(newSections);
    addToHistory(newSections);
    setSelectedSection(newSection.id);
    
    toast({ title: "Section Added", description: `${sectionDef.label} has been added to your page.` });
  };

  const removeSection = (id: string) => {
    const newSections = sections.filter(s => s.id !== id);
    setSections(newSections);
    addToHistory(newSections);
    if (selectedSection === id) setSelectedSection(null);
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) return;
    
    const newSections = [...sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    setSections(newSections);
    addToHistory(newSections);
  };

  const updateSectionContent = (id: string, content: Record<string, any>) => {
    const newSections = sections.map(s => 
      s.id === id ? { ...s, content: { ...s.content, ...content } } : s
    );
    setSections(newSections);
  };

  const handleSave = () => {
    const pageData: LandingPage = {
      id: initialData?.id || generateId(),
      name: pageName,
      description: pageDescription,
      goal: pageGoal,
      template: initialData?.template || 'custom',
      status: 'Draft',
      url: initialData?.url || `/${pageName.toLowerCase().replace(/\s+/g, '-')}`,
      sections,
      styles,
      seo,
      analytics: initialData?.analytics || { visitors: 0, conversions: 0, conversionRate: 0 },
      created: initialData?.created || new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };
    
    onSave?.(pageData);
    toast({ title: "Landing Page Saved", description: `"${pageName}" has been saved as draft.` });
  };

  const handlePublish = () => {
    const pageData: LandingPage = {
      id: initialData?.id || generateId(),
      name: pageName,
      description: pageDescription,
      goal: pageGoal,
      template: initialData?.template || 'custom',
      status: 'Published',
      url: initialData?.url || `/${pageName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      sections,
      styles,
      seo,
      analytics: initialData?.analytics || { visitors: Math.floor(Math.random() * 1000), conversions: Math.floor(Math.random() * 100), conversionRate: 10 },
      created: initialData?.created || new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };
    
    onSave?.(pageData);
    toast({ title: "Landing Page Published!", description: `Your page is now live at ${pageData.url}` });
  };

  const handlePreview = () => {
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(generateHTML(true));
      previewWindow.document.close();
    }
  };

  const generateHTML = (includeScripts = false) => {
    const sectionHTML = sections.map(section => {
      switch (section.type) {
        case 'hero':
          return `
            <section style="background: linear-gradient(135deg, ${styles.primaryColor} 0%, #667eea 100%); padding: 80px 20px; text-align: center; color: white;">
              <h1 style="font-size: 48px; margin-bottom: 20px;">${section.content.title}</h1>
              <p style="font-size: 20px; margin-bottom: 30px; opacity: 0.9;">${section.content.subtitle}</p>
              <a href="${section.content.ctaLink || '#'}" style="background: white; color: ${styles.primaryColor}; padding: 15px 40px; border-radius: 30px; text-decoration: none; font-weight: 600; display: inline-block;">${section.content.ctaText}</a>
            </section>
          `;
        case 'features':
          return `
            <section style="padding: 60px 20px; background: ${styles.backgroundColor};">
              <h2 style="text-align: center; font-size: 36px; margin-bottom: 40px;">${section.content.title}</h2>
              <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; max-width: 1200px; margin: 0 auto;">
                ${(section.content.items || []).map((item: string, i: number) => `
                  <div style="flex: 1; min-width: 250px; padding: 30px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center;">
                    <div style="width: 60px; height: 60px; background: ${styles.primaryColor}; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px;">${i + 1}</div>
                    <h3 style="margin: 0 0 10px;">${item}</h3>
                  </div>
                `).join('')}
              </div>
            </section>
          `;
        case 'cta':
          return `
            <section style="background: ${styles.primaryColor}; padding: 60px 20px; text-align: center; color: white;">
              <h2 style="font-size: 36px; margin-bottom: 10px;">${section.content.title}</h2>
              <p style="font-size: 18px; margin-bottom: 30px; opacity: 0.9;">${section.content.subtitle}</p>
              <a href="${section.content.ctaLink || '#'}" style="background: white; color: ${styles.primaryColor}; padding: 15px 40px; border-radius: 30px; text-decoration: none; font-weight: 600; display: inline-block;">${section.content.ctaText}</a>
            </section>
          `;
        case 'testimonials':
          return `
            <section style="padding: 60px 20px; background: #f9fafb;">
              <h2 style="text-align: center; font-size: 36px; margin-bottom: 40px;">${section.content.title}</h2>
              <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; max-width: 1200px; margin: 0 auto;">
                ${(section.content.items || []).map((item: string) => `
                  <div style="flex: 1; min-width: 280px; max-width: 350px; padding: 30px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <p style="font-style: italic; color: #6b7280; margin-bottom: 20px;">"${item}"</p>
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <div style="width: 40px; height: 40px; background: ${styles.primaryColor}; border-radius: 50%;"></div>
                      <div><strong>Happy Customer</strong></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          `;
        case 'footer':
          return `
            <footer style="background: #1f2937; color: white; padding: 40px 20px; text-align: center;">
              <p>${section.content.text}</p>
            </footer>
          `;
        case 'spacer':
          return `<div style="height: ${section.content.height || 40}px;"></div>`;
        case 'form':
          return `
            <section style="padding: 60px 20px; background: ${styles.backgroundColor};">
              <div style="max-width: 500px; margin: 0 auto; padding: 40px; background: white; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; margin-bottom: 30px;">${section.content.title}</h2>
                <form>
                  ${(section.content.fields || []).includes('name') ? `
                    <div style="margin-bottom: 20px;">
                      <label style="display: block; margin-bottom: 8px; font-weight: 500;">Name</label>
                      <input type="text" style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; box-sizing: border-box;">
                    </div>
                  ` : ''}
                  ${(section.content.fields || []).includes('email') ? `
                    <div style="margin-bottom: 20px;">
                      <label style="display: block; margin-bottom: 8px; font-weight: 500;">Email</label>
                      <input type="email" style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; box-sizing: border-box;">
                    </div>
                  ` : ''}
                  ${(section.content.fields || []).includes('message') ? `
                    <div style="margin-bottom: 20px;">
                      <label style="display: block; margin-bottom: 8px; font-weight: 500;">Message</label>
                      <textarea style="width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; min-height: 100px; box-sizing: border-box;"></textarea>
                    </div>
                  ` : ''}
                  <button type="submit" style="width: 100%; background: ${styles.primaryColor}; color: white; padding: 14px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer;">Submit</button>
                </form>
              </div>
            </section>
          `;
        default:
          return '';
      }
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${pageName}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=${styles.fontFamily.replace(' ', '+')}:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: '${styles.fontFamily}', sans-serif; }
          </style>
        </head>
        <body>
          ${sectionHTML}
        </body>
      </html>
    `;
  };

  const selectedSectionData = sections.find(s => s.id === selectedSection);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onCancel || (() => navigate('/forms/landing'))}>
            <ChevronUp className="h-4 w-4 rotate-90 mr-1" />
            Back
          </Button>
          <Input
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            className="font-semibold text-lg w-64"
            placeholder="Page Name"
          />
          <Badge variant="outline">Draft</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={undo} disabled={historyIndex === 0}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={redo} disabled={historyIndex === history.length - 1}>
            <Redo className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            <Globe className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Section Types */}
        <div className="w-64 bg-white border-r overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold mb-3">Add Sections</h3>
            <div className="space-y-2">
              {sectionTypes.map((section) => (
                <Button
                  key={section.type}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => addSection(section.type)}
                >
                  <section.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{section.label}</span>
                </Button>
              ))}
            </div>

            <h3 className="font-semibold mt-6 mb-3">Templates</h3>
            <div className="space-y-2">
              {templates.map((template) => (
                <Button
                  key={template.id}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => {
                    const newSections = template.sections.map((s: any) => ({
                      id: generateId(),
                      type: s.type,
                      content: { ...s.content },
                      styles: {},
                    }));
                    setSections(newSections);
                    addToHistory(newSections);
                    toast({ title: "Template Applied", description: `${template.name} template loaded.` });
                  }}
                >
                  <span className="text-xl mr-2">{template.thumbnail}</span>
                  <span>{template.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div 
            className={`mx-auto bg-white shadow-lg transition-all duration-300 ${
              previewDevice === 'mobile' ? 'max-w-sm' : 
              previewDevice === 'tablet' ? 'max-w-2xl' : 'max-w-5xl'
            }`}
            style={{ minHeight: '600px' }}
          >
            {sections.length === 0 ? (
              <div className="flex items-center justify-center h-96 text-gray-400">
                <div className="text-center">
                  <Layout className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Add sections to build your landing page</p>
                  <p className="text-sm">Choose from the sidebar or start with a template</p>
                </div>
              </div>
            ) : (
              sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`relative group ${selectedSection === section.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  {/* Section Controls */}
                  <div className="absolute -left-12 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'up'); }} disabled={index === 0}>
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); moveSection(section.id, 'down'); }} disabled={index === sections.length - 1}>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Section Content Preview */}
                  <div className="p-4">
                    {section.type === 'hero' && (
                      <div className="text-center py-12" style={{ background: `linear-gradient(135deg, ${styles.primaryColor} 0%, #667eea 100%)`, borderRadius: 8 }}>
                        <h1 className="text-4xl font-bold text-white mb-4">{section.content.title}</h1>
                        <p className="text-white/90 text-lg mb-6">{section.content.subtitle}</p>
                        <span className="inline-block bg-white text-gray-800 px-6 py-2 rounded-full font-medium">{section.content.ctaText}</span>
                      </div>
                    )}
                    {section.type === 'features' && (
                      <div className="py-8">
                        <h2 className="text-2xl font-bold text-center mb-6">{section.content.title}</h2>
                        <div className="grid grid-cols-3 gap-4">
                          {(section.content.items || []).map((item: string, i: number) => (
                            <div key={i} className="text-center p-4 border rounded-lg">
                              <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ background: styles.primaryColor, color: 'white' }}>{i + 1}</div>
                              <p className="font-medium">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {section.type === 'cta' && (
                      <div className="text-center py-8" style={{ background: styles.primaryColor, borderRadius: 8, color: 'white' }}>
                        <h2 className="text-2xl font-bold mb-2">{section.content.title}</h2>
                        <p className="mb-4 opacity-90">{section.content.subtitle}</p>
                        <span className="inline-block bg-white px-6 py-2 rounded-full font-medium" style={{ color: styles.primaryColor }}>{section.content.ctaText}</span>
                      </div>
                    )}
                    {section.type === 'testimonials' && (
                      <div className="py-8 bg-gray-50 -mx-4 px-4">
                        <h2 className="text-2xl font-bold text-center mb-6">{section.content.title}</h2>
                        <div className="grid grid-cols-3 gap-4">
                          {(section.content.items || []).map((item: string, i: number) => (
                            <div key={i} className="bg-white p-4 rounded-lg shadow">
                              <p className="italic text-gray-600 mb-3">"{item}"</p>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full" style={{ background: styles.primaryColor }}></div>
                                <span className="text-sm font-medium">Customer</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {section.type === 'form' && (
                      <div className="max-w-md mx-auto py-8">
                        <h2 className="text-2xl font-bold text-center mb-6">{section.content.title}</h2>
                        <div className="space-y-4">
                          {(section.content.fields || []).includes('name') && (
                            <div>
                              <label className="block text-sm font-medium mb-1">Name</label>
                              <input type="text" className="w-full p-2 border rounded" disabled />
                            </div>
                          )}
                          {(section.content.fields || []).includes('email') && (
                            <div>
                              <label className="block text-sm font-medium mb-1">Email</label>
                              <input type="email" className="w-full p-2 border rounded" disabled />
                            </div>
                          )}
                          {(section.content.fields || []).includes('message') && (
                            <div>
                              <label className="block text-sm font-medium mb-1">Message</label>
                              <textarea className="w-full p-2 border rounded" rows={3} disabled></textarea>
                            </div>
                          )}
                          <button className="w-full py-2 rounded font-medium text-white" style={{ background: styles.primaryColor }}>Submit</button>
                        </div>
                      </div>
                    )}
                    {section.type === 'spacer' && (
                      <div className="py-4 text-center text-gray-400 border-2 border-dashed rounded" style={{ height: section.content.height || 40 }}>
                        Spacer ({section.content.height || 40}px)
                      </div>
                    )}
                    {section.type === 'footer' && (
                      <div className="py-6 text-center text-gray-400 border-t">
                        <p>{section.content.text}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-white border-l overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="builder" className="flex-1">Edit</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
              <TabsTrigger value="style" className="flex-1">Style</TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="p-4">
              {selectedSectionData ? (
                <div className="space-y-4">
                  <h3 className="font-semibold capitalize">{selectedSectionData.type} Section</h3>
                  
                  {selectedSectionData.type === 'hero' && (
                    <>
                      <div>
                        <Label>Title</Label>
                        <Input 
                          value={selectedSectionData.content.title} 
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Subtitle</Label>
                        <Textarea 
                          value={selectedSectionData.content.subtitle}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { subtitle: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>CTA Text</Label>
                        <Input 
                          value={selectedSectionData.content.ctaText}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { ctaText: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>CTA Link</Label>
                        <Input 
                          value={selectedSectionData.content.ctaLink}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { ctaLink: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {selectedSectionData.type === 'features' && (
                    <>
                      <div>
                        <Label>Title</Label>
                        <Input 
                          value={selectedSectionData.content.title}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Features (one per line)</Label>
                        <Textarea 
                          value={(selectedSectionData.content.items || []).join('\n')}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { items: e.target.value.split('\n').filter(Boolean) })}
                          rows={5}
                        />
                      </div>
                    </>
                  )}

                  {selectedSectionData.type === 'cta' && (
                    <>
                      <div>
                        <Label>Title</Label>
                        <Input 
                          value={selectedSectionData.content.title}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Subtitle</Label>
                        <Input 
                          value={selectedSectionData.content.subtitle}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { subtitle: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>CTA Text</Label>
                        <Input 
                          value={selectedSectionData.content.ctaText}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { ctaText: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {selectedSectionData.type === 'testimonials' && (
                    <>
                      <div>
                        <Label>Title</Label>
                        <Input 
                          value={selectedSectionData.content.title}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Testimonials (one per line)</Label>
                        <Textarea 
                          value={(selectedSectionData.content.items || []).join('\n')}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { items: e.target.value.split('\n').filter(Boolean) })}
                          rows={5}
                        />
                      </div>
                    </>
                  )}

                  {selectedSectionData.type === 'form' && (
                    <>
                      <div>
                        <Label>Form Title</Label>
                        <Input 
                          value={selectedSectionData.content.title}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Fields</Label>
                        <div className="space-y-2">
                          {['name', 'email', 'phone', 'company', 'message'].map((field) => (
                            <div key={field} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={(selectedSectionData.content.fields || []).includes(field)}
                                onChange={(e) => {
                                  const fields = selectedSectionData.content.fields || [];
                                  if (e.target.checked) {
                                    updateSectionContent(selectedSectionData.id, { fields: [...fields, field] });
                                  } else {
                                    updateSectionContent(selectedSectionData.id, { fields: fields.filter((f: string) => f !== field) });
                                  }
                                }}
                                className="rounded border-gray-300"
                              />
                              <span className="capitalize">{field}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>Submit Button Text</Label>
                        <Input 
                          value={selectedSectionData.content.submitText || 'Submit'}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { submitText: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Success Message</Label>
                        <Input 
                          value={selectedSectionData.content.successMessage || 'Thank you for your submission!'}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { successMessage: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {selectedSectionData.type === 'spacer' && (
                    <div>
                      <Label>Height (px)</Label>
                      <Input 
                        type="number"
                        value={selectedSectionData.content.height || 40}
                        onChange={(e) => updateSectionContent(selectedSectionData.id, { height: parseInt(e.target.value) })}
                      />
                    </div>
                  )}

                  {selectedSectionData.type === 'about' && (
                    <>
                      <div>
                        <Label>Title</Label>
                        <Input 
                          value={selectedSectionData.content.title}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea 
                          value={selectedSectionData.content.description}
                          onChange={(e) => updateSectionContent(selectedSectionData.id, { description: e.target.value })}
                          rows={4}
                        />
                      </div>
                    </>
                  )}

                  {selectedSectionData.type === 'footer' && (
                    <div>
                      <Label>Footer Text</Label>
                      <Input 
                        value={selectedSectionData.content.text}
                        onChange={(e) => updateSectionContent(selectedSectionData.id, { text: e.target.value })}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <p>Select a section to edit</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="p-4 space-y-4">
              <div>
                <Label>Page Name</Label>
                <Input value={pageName} onChange={(e) => setPageName(e.target.value)} />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={pageDescription} onChange={(e) => setPageDescription(e.target.value)} />
              </div>
              <div>
                <Label>Goal</Label>
                <Select value={pageGoal} onValueChange={setPageGoal}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead-generation">Lead Generation</SelectItem>
                    <SelectItem value="email-signup">Email Signup</SelectItem>
                    <SelectItem value="event-registration">Event Registration</SelectItem>
                    <SelectItem value="product-sales">Product Sales</SelectItem>
                    <SelectItem value="contact">Contact Form</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>SEO Title</Label>
                <Input value={seo.title} onChange={(e) => setSeo({ ...seo, title: e.target.value })} />
              </div>
              <div>
                <Label>SEO Description</Label>
                <Textarea value={seo.description} onChange={(e) => setSeo({ ...seo, description: e.target.value })} />
              </div>
              <div>
                <Label>SEO Keywords</Label>
                <Input value={seo.keywords} onChange={(e) => setSeo({ ...seo, keywords: e.target.value })} placeholder="keyword1, keyword2, keyword3" />
              </div>
            </TabsContent>

            <TabsContent value="style" className="p-4 space-y-4">
              <div>
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <Input type="color" value={styles.primaryColor} onChange={(e) => setStyles({ ...styles, primaryColor: e.target.value })} className="w-12 h-10 p-1" />
                  <Input value={styles.primaryColor} onChange={(e) => setStyles({ ...styles, primaryColor: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Background Color</Label>
                <div className="flex gap-2">
                  <Input type="color" value={styles.backgroundColor} onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })} className="w-12 h-10 p-1" />
                  <Input value={styles.backgroundColor} onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>Font Family</Label>
                <Select value={styles.fontFamily} onValueChange={(v) => setStyles({ ...styles, fontFamily: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
        </Tabs>
      </div>
    </div>
    </div>
    </div>
  );
};
