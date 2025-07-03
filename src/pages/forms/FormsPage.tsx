
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Search, Filter, Edit, Trash2, Copy, Eye, 
  BarChart3, Settings, Users, FileText, MousePointer 
} from 'lucide-react';

export const FormsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [forms, setForms] = useState([
    {
      id: 1,
      name: 'Newsletter Signup',
      type: 'Embedded',
      status: 'Active',
      submissions: 245,
      conversionRate: '12.3%',
      views: 1992,
      created: '2024-01-15',
      lastSubmission: '2 hours ago'
    },
    {
      id: 2,
      name: 'Product Updates',
      type: 'Pop-up',
      status: 'Active',
      submissions: 89,
      conversionRate: '8.7%',
      views: 1024,
      created: '2024-01-10',
      lastSubmission: '30 minutes ago'
    },
    {
      id: 3,
      name: 'Contact Us',
      type: 'Landing Page',
      status: 'Paused',
      submissions: 156,
      conversionRate: '15.2%',
      views: 1026,
      created: '2024-01-05',
      lastSubmission: '1 day ago'
    },
    {
      id: 4,
      name: 'Event Registration',
      type: 'Embedded',
      status: 'Draft',
      submissions: 0,
      conversionRate: '-',
      views: 0,
      created: '2024-01-20',
      lastSubmission: 'Never'
    }
  ]);

  const formTemplates = [
    {
      name: 'Simple Newsletter',
      description: 'Basic email signup form',
      type: 'Embedded',
      difficulty: 'Easy',
      fields: 2,
      preview: 'Email only signup'
    },
    {
      name: 'Lead Generation',
      description: 'Comprehensive lead capture',
      type: 'Landing Page',
      difficulty: 'Medium',
      fields: 5,
      preview: 'Name, email, company, phone'
    },
    {
      name: 'Event Registration',
      description: 'Registration with custom fields',
      type: 'Embedded',
      difficulty: 'Medium',
      fields: 6,
      preview: 'Registration details'
    },
    {
      name: 'Exit Intent Pop-up',
      description: 'Capture leaving visitors',
      type: 'Pop-up',
      difficulty: 'Easy',
      fields: 1,
      preview: 'Email capture on exit'
    },
    {
      name: 'Survey Form',
      description: 'Collect feedback and insights',
      type: 'Landing Page',
      difficulty: 'Advanced',
      fields: 8,
      preview: 'Multiple choice and text'
    },
    {
      name: 'Contest Entry',
      description: 'Competition and giveaway form',
      type: 'Landing Page',
      difficulty: 'Medium',
      fields: 4,
      preview: 'Entry details and rules'
    }
  ];

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || form.type.toLowerCase() === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleStatusChange = (formId: number, newStatus: string) => {
    setForms(forms.map(form => 
      form.id === formId ? { ...form, status: newStatus } : form
    ));
  };

  const handleDeleteForm = (formId: number) => {
    setForms(forms.filter(form => form.id !== formId));
  };

  const handleDuplicateForm = (formId: number) => {
    const form = forms.find(f => f.id === formId);
    if (form) {
      const newForm = {
        ...form,
        id: Math.max(...forms.map(f => f.id)) + 1,
        name: `${form.name} (Copy)`,
        status: 'Draft',
        submissions: 0,
        views: 0,
        lastSubmission: 'Never'
      };
      setForms([...forms, newForm]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forms</h1>
          <p className="text-gray-600">Create and manage signup forms, landing pages, and pop-ups</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Create a new form with drag-and-drop builder, custom fields, and advanced targeting options"
          data-voice-action="Opening form builder with templates and customization options"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Form
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of active forms collecting submissions across all channels">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Forms</p>
                <p className="text-2xl font-bold text-gray-900">
                  {forms.filter(f => f.status === 'Active').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total form submissions received across all forms this month">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {forms.reduce((sum, f) => sum + f.submissions, 0).toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average conversion rate across all active forms showing form performance">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Conversion</p>
                <p className="text-2xl font-bold text-gray-900">12.1%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total form views and impressions across all forms and channels">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {forms.reduce((sum, f) => sum + f.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" data-voice-context="View all forms with filtering, editing, and performance tracking">All Forms</TabsTrigger>
          <TabsTrigger value="templates" data-voice-context="Browse pre-designed form templates for quick setup">Templates</TabsTrigger>
          <TabsTrigger value="analytics" data-voice-context="View detailed form analytics and conversion insights">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search forms..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-voice-context="Search forms by name, type, or status to quickly find specific forms"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48" data-voice-context="Filter forms by type: embedded, pop-up, landing page, or all types">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="embedded">Embedded</SelectItem>
                <SelectItem value="pop-up">Pop-up</SelectItem>
                <SelectItem value="landing page">Landing Page</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredForms.map((form) => (
              <Card key={form.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        {form.type === 'Pop-up' ? <MousePointer className="h-5 w-5 text-blue-600" /> : 
                         form.type === 'Landing Page' ? <FileText className="h-5 w-5 text-blue-600" /> :
                         <Users className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{form.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <Badge variant={form.status === 'Active' ? 'default' : form.status === 'Paused' ? 'secondary' : 'outline'}>
                            {form.status}
                          </Badge>
                          <span>Type: {form.type}</span>
                          <span>Created: {form.created}</span>
                          <span>Last submission: {form.lastSubmission}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{form.views}</div>
                        <div className="text-gray-600">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{form.submissions}</div>
                        <div className="text-gray-600">Submissions</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{form.conversionRate}</div>
                        <div className="text-gray-600">Conversion</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-voice-context={`Preview ${form.name} form as visitors will see it`}
                          data-voice-action={`Opening ${form.name} preview`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-voice-context={`Edit ${form.name} design, fields, and settings`}
                          data-voice-action={`Opening ${form.name} editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDuplicateForm(form.id)}
                          data-voice-context={`Duplicate ${form.name} to create a copy for modification`}
                          data-voice-action={`Duplicating ${form.name} form`}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteForm(form.id)}
                          data-voice-context={`Delete ${form.name} form permanently`}
                          data-voice-action={`Deleting ${form.name} form`}
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
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Form Templates</h2>
            <p className="text-gray-600">Start with professionally designed templates and customize to match your brand</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formTemplates.map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Type: {template.type}</span>
                      <Badge variant="outline">{template.difficulty}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {template.fields} fields • {template.preview}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1" 
                        size="sm"
                        data-voice-context={`Use ${template.name} template with ${template.fields} pre-configured fields and ${template.difficulty} setup`}
                        data-voice-action={`Creating form from ${template.name} template`}
                      >
                        Use Template
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-voice-context={`Preview ${template.name} template design and layout`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card data-voice-context="Form performance trends showing submissions over time">
              <CardHeader>
                <CardTitle>Submission Trends</CardTitle>
                <CardDescription>Form submissions over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Chart: Submissions trend over time
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Conversion rates comparison across different form types">
              <CardHeader>
                <CardTitle>Conversion by Type</CardTitle>
                <CardDescription>Performance comparison by form type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Landing Page</span>
                    <span className="font-medium">15.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Embedded</span>
                    <span className="font-medium">12.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pop-up</span>
                    <span className="font-medium">8.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
