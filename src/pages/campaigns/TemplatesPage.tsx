
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Mail, ShoppingCart, Heart, Briefcase } from 'lucide-react';

export const TemplatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      id: 1,
      name: 'Welcome Series',
      description: 'Perfect for onboarding new subscribers',
      category: 'Welcome',
      icon: Heart,
      preview: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Newsletter Template',
      description: 'Clean and professional newsletter design',
      category: 'Newsletter',
      icon: Mail,
      preview: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Product Launch',
      description: 'Announce new products with style',
      category: 'Promotional',
      icon: ShoppingCart,
      preview: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'Business Update',
      description: 'Professional business communications',
      category: 'Business',
      icon: Briefcase,
      preview: '/api/placeholder/300/200'
    }
  ];

  const categories = ['All', 'Welcome', 'Newsletter', 'Promotional', 'Business'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = templates.filter(template => 
    (selectedCategory === 'All' || template.category === selectedCategory) &&
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Templates</h1>
        <p className="text-gray-600">Choose from professionally designed email templates.</p>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="aspect-video bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <template.icon className="h-12 w-12 text-gray-400" />
              </div>
              <CardTitle className="flex items-center justify-between">
                {template.name}
                <Badge variant="secondary">{template.category}</Badge>
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  data-voice-context={`Use ${template.name} template for your campaign`}
                  data-voice-action={`Selected ${template.name} template`}
                >
                  Use Template
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  data-voice-context={`Preview ${template.name} template`}
                >
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
