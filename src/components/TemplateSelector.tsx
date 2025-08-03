import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Mail, ShoppingCart, Heart, Briefcase, Users, Gift, Calendar, Star } from 'lucide-react';

interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  preview: string;
  htmlContent: string;
  popularity: number;
}

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const templates: Template[] = [
    {
      id: 1,
      name: 'Welcome Series',
      description: 'Perfect for onboarding new subscribers with a warm welcome',
      category: 'Welcome',
      icon: Heart,
      preview: 'Clean welcome design with company branding and next steps',
      popularity: 95,
      htmlContent: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="padding: 40px 20px; text-align: center;">
    <h1 style="color: #10b981; font-size: 28px;">Welcome to Our Community!</h1>
    <p style="font-size: 18px; color: #374151;">We're thrilled to have you join us.</p>
    <div style="margin: 30px 0;">
      <img src="https://via.placeholder.com/400x200" alt="Welcome" style="width: 100%; max-width: 400px;" />
    </div>
    <p>Here's what you can expect:</p>
    <ul style="text-align: left; display: inline-block;">
      <li>Weekly tips and insights</li>
      <li>Exclusive offers</li>
      <li>Community access</li>
    </ul>
    <a href="#" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 20px;">Get Started</a>
  </div>
</div>`
    },
    {
      id: 2,
      name: 'Newsletter Template',
      description: 'Clean and professional newsletter design for regular updates',
      category: 'Newsletter',
      icon: Mail,
      preview: 'Modern layout with header, content sections, and social links',
      popularity: 88,
      htmlContent: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <header style="background: #3B82F6; color: white; padding: 20px; text-align: center;">
    <h1>Your Newsletter</h1>
    <p>Stay updated with our latest news</p>
  </header>
  <main style="padding: 20px;">
    <h2>This Week's Highlights</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
    <a href="#" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Read More</a>
  </main>
  <footer style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 12px;">
    <p>© 2024 Your Company. All rights reserved.</p>
  </footer>
</div>`
    },
    {
      id: 3,
      name: 'Product Launch',
      description: 'Eye-catching design to announce new products with style',
      category: 'Promotional',
      icon: ShoppingCart,
      preview: 'Bold design with product images and compelling call-to-action',
      popularity: 92,
      htmlContent: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="text-align: center; padding: 20px;">
    <h1 style="color: #1f2937; font-size: 32px;">New Product Launch!</h1>
    <div style="margin: 20px 0;">
      <img src="https://via.placeholder.com/500x300" alt="New Product" style="width: 100%; max-width: 500px;" />
    </div>
    <h2 style="color: #3B82F6;">Revolutionary Innovation</h2>
    <p style="font-size: 16px; line-height: 1.6;">Experience the future with our groundbreaking new product.</p>
    <a href="#" style="background: #3B82F6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-size: 18px;">Shop Now</a>
  </div>
</div>`
    },
    {
      id: 4,
      name: 'Business Update',
      description: 'Professional template for business communications and updates',
      category: 'Business',
      icon: Briefcase,
      preview: 'Corporate design with structured content and professional styling',
      popularity: 76,
      htmlContent: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; color: #374151;">
  <header style="border-bottom: 3px solid #3B82F6; padding: 20px 0;">
    <h1 style="color: #1f2937;">Business Update</h1>
  </header>
  <main style="padding: 30px 20px;">
    <h2>Quarterly Results</h2>
    <p>We're pleased to share our latest business developments and achievements.</p>
    <ul>
      <li>Revenue growth of 25%</li>
      <li>New partnerships established</li>
      <li>Product innovations launched</li>
    </ul>
    <a href="#" style="background: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">View Full Report</a>
  </main>
</div>`
    },
    {
      id: 5,
      name: 'Event Invitation',
      description: 'Elegant invitation template for events and webinars',
      category: 'Event',
      icon: Calendar,
      preview: 'Sophisticated design with event details and RSVP button',
      popularity: 84,
      htmlContent: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center;">
    <h1 style="font-size: 28px; margin-bottom: 10px;">You're Invited!</h1>
    <h2 style="font-size: 24px; margin-bottom: 20px;">Annual Conference 2024</h2>
    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p><strong>Date:</strong> March 15, 2024</p>
      <p><strong>Time:</strong> 9:00 AM - 5:00 PM</p>
      <p><strong>Location:</strong> Convention Center, Downtown</p>
    </div>
    <a href="#" style="background: white; color: #667eea; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">RSVP Now</a>
  </div>
</div>`
    },
    {
      id: 6,
      name: 'Special Offer',
      description: 'High-converting template for sales and promotional campaigns',
      category: 'Promotional',
      icon: Gift,
      preview: 'Attention-grabbing design with discount codes and urgency',
      popularity: 90,
      htmlContent: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="background: #dc2626; color: white; padding: 10px; text-align: center;">
    <strong>⏰ LIMITED TIME OFFER - Expires in 24 hours!</strong>
  </div>
  <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); padding: 40px 20px; text-align: center; color: white;">
    <h1 style="font-size: 36px; margin-bottom: 10px;">50% OFF</h1>
    <h2 style="font-size: 24px; margin-bottom: 20px;">Everything Must Go!</h2>
    <p style="font-size: 18px; margin-bottom: 30px;">Use code: SAVE50</p>
    <a href="#" style="background: white; color: #f59e0b; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 18px;">Shop Now</a>
  </div>
</div>`
    },
    {
      id: 7,
      name: 'Customer Testimonials',
      description: 'Showcase customer reviews and success stories',
      category: 'Social Proof',
      icon: Star,
      preview: 'Clean layout highlighting customer feedback and ratings',
      popularity: 79,
      htmlContent: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
  <h1 style="text-align: center; color: #1f2937;">What Our Customers Say</h1>
  <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <div style="display: flex; margin-bottom: 10px;">
      <span style="color: #fbbf24;">★★★★★</span>
    </div>
    <p style="font-style: italic;">"Absolutely amazing service! Exceeded all my expectations."</p>
    <p style="text-align: right; font-weight: bold;">- Sarah Johnson</p>
  </div>
  <div style="text-align: center; margin-top: 30px;">
    <a href="#" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Read More Reviews</a>
  </div>
</div>`
    },
    {
      id: 8,
      name: 'Team Introduction',
      description: 'Introduce your team members with photos and bios',
      category: 'Company',
      icon: Users,
      preview: 'Professional layout featuring team photos and descriptions',
      popularity: 71,
      htmlContent: `
<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; padding: 20px;">
  <h1 style="text-align: center; color: #1f2937;">Meet Our Team</h1>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
    <div style="text-align: center;">
      <img src="https://via.placeholder.com/150x150" alt="Team Member" style="border-radius: 50%; width: 100px; height: 100px;" />
      <h3>John Smith</h3>
      <p style="font-size: 14px; color: #6b7280;">CEO & Founder</p>
    </div>
    <div style="text-align: center;">
      <img src="https://via.placeholder.com/150x150" alt="Team Member" style="border-radius: 50%; width: 100px; height: 100px;" />
      <h3>Jane Doe</h3>
      <p style="font-size: 14px; color: #6b7280;">Head of Marketing</p>
    </div>
  </div>
  <div style="text-align: center;">
    <a href="#" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Learn More About Us</a>
  </div>
</div>`
    }
  ];

  const categories = ['All', 'Welcome', 'Newsletter', 'Promotional', 'Business', 'Event', 'Social Proof', 'Company'];

  const filteredTemplates = templates.filter(template => 
    (selectedCategory === 'All' || template.category === selectedCategory) &&
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectTemplate = (template: Template) => {
    onSelectTemplate(template);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl h-[85vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">Choose Email Template</DialogTitle>
            <DialogDescription>
              Select a professionally designed template to start your campaign
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col h-full">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  data-voice-context="Search through available email templates"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    data-voice-context={`Filter templates by ${category.toLowerCase()} category`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Templates Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center relative">
                        <template.icon className="h-12 w-12 text-gray-400" />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            {template.popularity}% popular
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="flex items-center justify-between text-lg">
                        {template.name}
                        <Badge variant="outline">{template.category}</Badge>
                      </CardTitle>
                      <CardDescription className="text-sm">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleSelectTemplate(template)}
                          data-voice-context={`Use ${template.name} template for your campaign`}
                          data-voice-action={`Selected ${template.name} template`}
                        >
                          Use Template
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setPreviewTemplate(template)}
                          data-voice-context={`Preview ${template.name} template`}
                          data-voice-action={`Opening ${template.name} preview`}
                        >
                          Preview
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-4xl h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {previewTemplate?.icon && <previewTemplate.icon className="h-5 w-5" />}
              {previewTemplate?.name} Preview
            </DialogTitle>
            <DialogDescription>
              {previewTemplate?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="max-w-2xl mx-auto bg-white shadow-lg">
                {previewTemplate && (
                  <div 
                    dangerouslySetInnerHTML={{ __html: previewTemplate.htmlContent }}
                  />
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => previewTemplate && handleSelectTemplate(previewTemplate)}
              className="flex-1"
              data-voice-context={`Use ${previewTemplate?.name} template`}
            >
              Use This Template
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setPreviewTemplate(null)}
              data-voice-context="Close template preview"
            >
              Close Preview
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};