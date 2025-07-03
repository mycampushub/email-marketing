
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

export const LandingPagesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<any>(null);
  const [newPage, setNewPage] = useState({
    name: '',
    description: '',
    template: '',
    goal: '',
    status: 'draft'
  });
  const { toast } = useToast();

  const [landingPages, setLandingPages] = useState([
    {
      id: 1,
      name: 'Product Launch Landing',
      description: 'Main landing page for new product launch campaign',
      template: 'Product Launch',
      goal: 'Lead Generation',
      status: 'Published',
      visitors: 12450,
      conversions: 892,
      conversionRate: '7.2%',
      created: '2024-01-15',
      lastModified: '2024-01-20',
      url: 'https://yoursite.com/product-launch'
    },
    {
      id: 2,
      name: 'Newsletter Signup',
      description: 'Dedicated page for newsletter subscriptions',
      template: 'Newsletter',
      goal: 'Email Signup',
      status: 'Published',
      visitors: 8930,
      conversions: 1245,
      conversionRate: '13.9%',
      created: '2024-01-10',
      lastModified: '2024-01-18',
      url: 'https://yoursite.com/newsletter'
    },
    {
      id: 3,
      name: 'Webinar Registration',
      description: 'Registration page for upcoming webinar',
      template: 'Event',
      goal: 'Event Registration',
      status: 'Draft',
      visitors: 0,
      conversions: 0,
      conversionRate: '0%',
      created: '2024-01-05',
      lastModified: '2024-01-12',
      url: 'https://yoursite.com/webinar'
    }
  ]);

  const filteredPages = landingPages.filter(page =>
    page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.template.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePage = () => {
    if (!newPage.name.trim()) {
      toast({
        title: "Error",
        description: "Landing page name is required",
        variant: "destructive",
      });
      return;
    }

    const page = {
      id: Math.max(...landingPages.map(p => p.id)) + 1,
      ...newPage,
      visitors: 0,
      conversions: 0,
      conversionRate: '0%',
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      url: `https://yoursite.com/${newPage.name.toLowerCase().replace(/\s+/g, '-')}`
    };

    setLandingPages([...landingPages, page]);
    setNewPage({ name: '', description: '', template: '', goal: '', status: 'draft' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Landing Page Created",
      description: `${page.name} has been created successfully`,
    });
  };

  const handleEditPage = (page: any) => {
    setEditingPage(page);
    setNewPage({
      name: page.name,
      description: page.description,
      template: page.template,
      goal: page.goal,
      status: page.status
    });
  };

  const handleUpdatePage = () => {
    if (!newPage.name.trim()) {
      toast({
        title: "Error",
        description: "Landing page name is required",
        variant: "destructive",
      });
      return;
    }

    setLandingPages(landingPages.map(page =>
      page.id === editingPage.id
        ? { ...page, ...newPage, lastModified: new Date().toISOString().split('T')[0] }
        : page
    ));
    setEditingPage(null);
    setNewPage({ name: '', description: '', template: '', goal: '', status: 'draft' });
    toast({
      title: "Landing Page Updated",
      description: `${newPage.name} has been updated successfully`,
    });
  };

  const handleDeletePage = (id: number) => {
    const page = landingPages.find(p => p.id === id);
    setLandingPages(landingPages.filter(p => p.id !== id));
    toast({
      title: "Landing Page Deleted",
      description: `${page?.name} has been deleted successfully`,
    });
  };

  const handleDuplicatePage = (page: any) => {
    const duplicatedPage = {
      ...page,
      id: Math.max(...landingPages.map(p => p.id)) + 1,
      name: `${page.name} (Copy)`,
      visitors: 0,
      conversions: 0,
      conversionRate: '0%',
      status: 'Draft',
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setLandingPages([...landingPages, duplicatedPage]);
    toast({
      title: "Landing Page Duplicated",
      description: `${page.name} has been duplicated successfully`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Landing Pages</h1>
          <p className="text-gray-600">Create high-converting landing pages for your campaigns</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Create a new landing page with professional templates, drag-and-drop editor, and conversion optimization features"
              data-voice-action="Opening landing page creation wizard with template selection and customization options"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Landing Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Landing Page</DialogTitle>
              <DialogDescription>
                Set up a new landing page for your campaign
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Page Name</Label>
                <Input
                  id="name"
                  value={newPage.name}
                  onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
                  placeholder="Enter page name"
                  data-voice-context="Name your landing page for easy identification and URL generation"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPage.description}
                  onChange={(e) => setNewPage({ ...newPage, description: e.target.value })}
                  placeholder="Describe the page purpose"
                  data-voice-context="Provide a clear description of what this landing page is designed to achieve"
                />
              </div>
              <div>
                <Label htmlFor="template">Template</Label>
                <Select value={newPage.template} onValueChange={(value) => setNewPage({ ...newPage, template: value })}>
                  <SelectTrigger data-voice-context="Choose a template that matches your campaign goals and design preferences">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product Launch">Product Launch</SelectItem>
                    <SelectItem value="Newsletter">Newsletter Signup</SelectItem>
                    <SelectItem value="Event">Event Registration</SelectItem>
                    <SelectItem value="Download">Content Download</SelectItem>
                    <SelectItem value="Contact">Contact Form</SelectItem>
                    <SelectItem value="Custom">Custom Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="goal">Primary Goal</Label>
                <Select value={newPage.goal} onValueChange={(value) => setNewPage({ ...newPage, goal: value })}>
                  <SelectTrigger data-voice-context="Define the main conversion goal for this landing page">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                    <SelectItem value="Email Signup">Email Signup</SelectItem>
                    <SelectItem value="Event Registration">Event Registration</SelectItem>
                    <SelectItem value="Product Sales">Product Sales</SelectItem>
                    <SelectItem value="Content Download">Content Download</SelectItem>
                    <SelectItem value="Contact Form">Contact Form</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreatePage} className="flex-1" data-voice-context="Create this landing page and start building your conversion-focused page">
                  Create Page
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} data-voice-context="Cancel page creation and close dialog">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of visitors across all landing pages this month">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                <p className="text-2xl font-bold text-gray-900">{landingPages.reduce((sum, p) => sum + p.visitors, 0).toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total number of conversions achieved across all landing pages">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Conversions</p>
                <p className="text-2xl font-bold text-gray-900">{landingPages.reduce((sum, p) => sum + p.conversions, 0).toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average conversion rate across all landing pages showing overall performance">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">10.5%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Number of published landing pages currently live and receiving traffic">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published Pages</p>
                <p className="text-2xl font-bold text-gray-900">{landingPages.filter(p => p.status === 'Published').length}</p>
              </div>
              <Globe className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search landing pages by name, template, or goal..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-voice-context="Search through your landing pages by name, template type, campaign goal, or description to quickly find specific pages"
          />
        </div>
      </div>

      {/* Pages List */}
      <div className="grid gap-4">
        {filteredPages.map((page) => (
          <Card key={page.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{page.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{page.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <Badge variant={page.status === 'Published' ? 'default' : 'secondary'}>
                        {page.status}
                      </Badge>
                      <span>Template: {page.template}</span>
                      <span>Goal: {page.goal}</span>
                      <span>Created: {page.created}</span>
                    </div>
                    <div className="mt-2">
                      <a href={page.url} className="text-blue-600 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                        {page.url}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{page.visitors.toLocaleString()}</div>
                    <div className="text-gray-600">Visitors</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{page.conversions.toLocaleString()}</div>
                    <div className="text-gray-600">Conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{page.conversionRate}</div>
                    <div className="text-gray-600">Rate</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`Preview ${page.name} landing page to see how it appears to visitors`}
                      data-voice-action={`Opening ${page.name} page preview`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`Visit live ${page.name} landing page in a new tab`}
                      data-voice-action={`Opening ${page.name} live page`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDuplicatePage(page)}
                      data-voice-context={`Duplicate ${page.name} landing page to create a copy for A/B testing or modification`}
                      data-voice-action={`Duplicating ${page.name} page`}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditPage(page)}
                          data-voice-context={`Edit ${page.name} landing page design, content, form fields, and conversion settings`}
                          data-voice-action={`Opening ${page.name} page editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Landing Page</DialogTitle>
                          <DialogDescription>
                            Update page settings and configuration
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Page Name</Label>
                            <Input
                              id="edit-name"
                              value={newPage.name}
                              onChange={(e) => setNewPage({ ...newPage, name: e.target.value })}
                              data-voice-context="Update the landing page name for better identification"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={newPage.description}
                              onChange={(e) => setNewPage({ ...newPage, description: e.target.value })}
                              data-voice-context="Update the landing page description and purpose"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-template">Template</Label>
                            <Select value={newPage.template} onValueChange={(value) => setNewPage({ ...newPage, template: value })}>
                              <SelectTrigger data-voice-context="Change the template design of this landing page">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Product Launch">Product Launch</SelectItem>
                                <SelectItem value="Newsletter">Newsletter Signup</SelectItem>
                                <SelectItem value="Event">Event Registration</SelectItem>
                                <SelectItem value="Download">Content Download</SelectItem>
                                <SelectItem value="Contact">Contact Form</SelectItem>
                                <SelectItem value="Custom">Custom Template</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="edit-goal">Primary Goal</Label>
                            <Select value={newPage.goal} onValueChange={(value) => setNewPage({ ...newPage, goal: value })}>
                              <SelectTrigger data-voice-context="Update the primary conversion goal for this page">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Lead Generation">Lead Generation</SelectItem>
                                <SelectItem value="Email Signup">Email Signup</SelectItem>
                                <SelectItem value="Event Registration">Event Registration</SelectItem>
                                <SelectItem value="Product Sales">Product Sales</SelectItem>
                                <SelectItem value="Content Download">Content Download</SelectItem>
                                <SelectItem value="Contact Form">Contact Form</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleUpdatePage} className="flex-1" data-voice-context="Save changes to this landing page">
                              Update Page
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeletePage(page.id)}
                      data-voice-context={`Delete ${page.name} landing page permanently - this action cannot be undone`}
                      data-voice-action={`Deleting ${page.name} page`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
