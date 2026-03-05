
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Eye, Copy, ExternalLink, BarChart3, Users, Globe, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';

export const LandingPagesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { landingPages, addLandingPage, deleteLandingPage, updateLandingPage } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredPages = landingPages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (page.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreatePage = (template: string, goal: string) => {
    const templates: Record<string, string> = {
      'product-launch': 'Product Launch',
      'newsletter': 'Newsletter Signup',
      'webinar': 'Webinar Registration',
      'ebook': 'Ebook Download',
      'contact': 'Contact Form',
      'blank': 'Custom'
    };

    const newPage = addLandingPage({
      name: `New ${templates[template]} Page`,
      description: '',
      goal: goal,
      template: template,
      status: 'Draft',
      sections: [],
      styles: {
        primaryColor: '#8B5CF6',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Inter',
      },
      seo: { title: '', description: '', keywords: '' },
      analytics: { visitors: 0, conversions: 0, conversionRate: 0 },
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    });
    
    toast({
      title: "Landing Page Created",
      description: `New landing page created. Opening builder...`,
    });
    
    setTimeout(() => {
      navigate('/forms/landing/builder', { state: { pageData: newPage, isEditing: false } });
    }, 500);
  };

  const handleEditPage = (page: any) => {
    navigate('/forms/landing/builder', { state: { pageData: page, isEditing: true } });
    toast({
      title: "Opening Landing Page Builder",
      description: `Editing "${page.name}"`,
    });
  };

  const handleDeletePage = (id: string) => {
    const page = landingPages.find(p => p.id === id);
    deleteLandingPage(id);
    toast({
      title: "Landing Page Deleted",
      description: `${page?.name} has been deleted successfully`,
    });
  };

  const handleDuplicatePage = (page: any) => {
    const duplicatedPage = addLandingPage({
      ...page,
      name: `${page.name} (Copy)`,
      status: 'Draft',
      analytics: { visitors: 0, conversions: 0, conversionRate: 0 },
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    });
    toast({
      title: "Landing Page Duplicated",
      description: `Created a copy of "${page.name}"`,
    });
  };

  const handlePublish = (page: any) => {
    updateLandingPage(page.id, { 
      status: 'Published',
      url: page.url || `/${page.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      lastModified: new Date().toISOString().split('T')[0]
    });
    toast({
      title: "Landing Page Published",
      description: `"${page.name}" is now live!`,
    });
  };

  const totalVisitors = landingPages.reduce((acc, p) => acc + (p.analytics?.visitors || 0), 0);
  const totalConversions = landingPages.reduce((acc, p) => acc + (p.analytics?.conversions || 0), 0);
  const publishedCount = landingPages.filter(p => p.status === 'Published').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Landing Pages</h1>
          <p className="text-gray-600">Create and manage high-converting landing pages</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Landing Page
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Landing Page</DialogTitle>
              <DialogDescription>
                Choose a template to get started quickly
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              {[
                { id: 'product-launch', name: 'Product Launch', emoji: '🚀', goal: 'product-sales' },
                { id: 'newsletter', name: 'Newsletter Signup', emoji: '📧', goal: 'email-signup' },
                { id: 'webinar', name: 'Webinar', emoji: '🎥', goal: 'event-registration' },
                { id: 'ebook', name: 'Ebook Download', emoji: '📚', goal: 'lead-generation' },
                { id: 'contact', name: 'Contact Form', emoji: '📝', goal: 'contact' },
                { id: 'blank', name: 'Blank', emoji: '⬜', goal: 'lead-generation' },
              ].map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleCreatePage(template.id, template.goal)}
                  className="p-4 border-2 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <span className="text-3xl block mb-2">{template.emoji}</span>
                  <span className="font-medium">{template.name}</span>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pages</p>
                <p className="text-2xl font-bold">{landingPages.length}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Globe className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Visitors</p>
                <p className="text-2xl font-bold">{totalVisitors.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Conversions</p>
                <p className="text-2xl font-bold">{totalConversions.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{publishedCount}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ExternalLink className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search landing pages..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page) => (
          <Card key={page.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{page.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{page.description}</p>
                </div>
                <Badge variant={page.status === 'Published' ? 'default' : 'secondary'}>
                  {page.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold">{page.analytics?.visitors?.toLocaleString() || 0}</p>
                  <p className="text-muted-foreground text-xs">Visitors</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{page.analytics?.conversions?.toLocaleString() || 0}</p>
                  <p className="text-muted-foreground text-xs">Conversions</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{page.analytics?.conversionRate || 0}%</p>
                  <p className="text-muted-foreground text-xs">Rate</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditPage(page)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDuplicatePage(page)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeletePage(page.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {page.status === 'Draft' ? (
                  <Button size="sm" onClick={() => handlePublish(page)}>
                    Publish
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" asChild>
                    <a href={page.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPages.length === 0 && (
        <div className="text-center py-12">
          <Globe className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No landing pages yet</h3>
          <p className="text-gray-500 mb-4">Create your first landing page to start converting visitors</p>
        </div>
      )}
    </div>
  );
};
