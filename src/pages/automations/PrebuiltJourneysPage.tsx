
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Play, Eye, Copy, Star, Users, Mail, Calendar, ShoppingCart, Heart, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PrebuiltJourneysPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const [prebuiltJourneys, setPrebuiltJourneys] = useState([
    {
      id: 1,
      name: 'Welcome New Subscribers',
      description: 'A 5-email welcome series to onboard new subscribers',
      category: 'Welcome',
      emails: 5,
      duration: '7 days',
      popularity: 'High',
      rating: 4.8,
      uses: 15420,
      preview: ['Welcome & Introduction', 'Company Story', 'Best Resources', 'Customer Stories', 'Special Offer'],
      icon: Users,
      color: 'blue'
    },
    {
      id: 2,
      name: 'Abandoned Cart Recovery',
      description: 'Recover lost sales with a proven 3-email sequence',
      category: 'E-commerce',
      emails: 3,
      duration: '3 days',
      popularity: 'Very High',
      rating: 4.9,
      uses: 23150,
      preview: ['Cart Reminder', 'Product Benefits', 'Limited Time Offer'],
      icon: ShoppingCart,
      color: 'green'
    },
    {
      id: 3,
      name: 'Birthday Campaign',
      description: 'Celebrate customer birthdays with special offers',
      category: 'Celebration',
      emails: 2,
      duration: '2 days',
      popularity: 'Medium',
      rating: 4.6,
      uses: 8930,
      preview: ['Birthday Wishes', 'Special Birthday Discount'],
      icon: Gift,
      color: 'purple'
    },
    {
      id: 4,
      name: 'Re-engagement Series',
      description: 'Win back inactive subscribers with compelling content',
      category: 'Re-engagement',
      emails: 4,
      duration: '14 days',
      popularity: 'High',
      rating: 4.7,
      uses: 12680,
      preview: ['We Miss You', 'What\'s New', 'Exclusive Comeback Offer', 'Last Chance'],
      icon: Heart,
      color: 'red'
    },
    {
      id: 5,
      name: 'Product Launch Series',
      description: 'Build excitement and drive sales for new products',
      category: 'Product',
      emails: 6,
      duration: '10 days',
      popularity: 'Medium',
      rating: 4.5,
      uses: 6740,
      preview: ['Coming Soon Teaser', 'Behind the Scenes', 'Launch Day', 'Early Bird Offer', 'Customer Reviews', 'Final Call'],
      icon: Star,
      color: 'orange'
    }
  ]);

  const categories = ['all', 'Welcome', 'E-commerce', 'Celebration', 'Re-engagement', 'Product'];

  const filteredJourneys = prebuiltJourneys.filter(journey => {
    const matchesSearch = journey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journey.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || journey.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (journey: any) => {
    toast({
      title: "Template Applied",
      description: `${journey.name} template has been added to your automations`,
    });
  };

  const handlePreview = (journey: any) => {
    toast({
      title: "Preview Opening",
      description: `Opening preview for ${journey.name}`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pre-built Journey Templates</h1>
          <p className="text-gray-600">Choose from proven automation templates to get started quickly</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of pre-built journey templates available for immediate use">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Templates</p>
                <p className="text-2xl font-bold text-gray-900">{prebuiltJourneys.length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Most popular template category used by other marketers">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Most Popular</p>
                <p className="text-2xl font-bold text-gray-900">E-commerce</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average rating of all pre-built templates based on user feedback">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.7</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total number of times these templates have been used by all users">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Uses</p>
                <p className="text-2xl font-bold text-gray-900">66K+</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search journey templates..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-voice-context="Search through pre-built journey templates by name, description, or category to find the perfect automation for your needs"
          />
        </div>
        <div className="flex space-x-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              data-voice-context={`Filter templates by ${category === 'all' ? 'all categories' : category + ' category'}`}
              data-voice-action={`Filtering by ${category} templates`}
            >
              {category === 'all' ? 'All' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJourneys.map((journey) => {
          const IconComponent = journey.icon;
          return (
            <Card key={journey.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-${journey.color}-100 p-2 rounded-lg`}>
                    <IconComponent className={`h-6 w-6 text-${journey.color}-600`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{journey.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{journey.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{journey.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{journey.emails} emails</span>
                  <span>{journey.duration}</span>
                  <Badge variant="outline">{journey.popularity}</Badge>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-600 mb-2">Email sequence:</p>
                  <div className="space-y-1">
                    {journey.preview.slice(0, 3).map((email, index) => (
                      <div key={index} className="text-xs text-gray-500 flex items-center">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                        {email}
                      </div>
                    ))}
                    {journey.preview.length > 3 && (
                      <div className="text-xs text-gray-400">+{journey.preview.length - 3} more emails</div>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePreview(journey)}
                    data-voice-context={`Preview ${journey.name} template to see the complete email sequence and content before using it`}
                    data-voice-action={`Opening ${journey.name} template preview`}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleUseTemplate(journey)}
                    data-voice-context={`Use ${journey.name} template to create a new automation journey based on this proven template`}
                    data-voice-action={`Setting up ${journey.name} journey from template`}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Use Template
                  </Button>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Used by {journey.uses.toLocaleString()} marketers
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
