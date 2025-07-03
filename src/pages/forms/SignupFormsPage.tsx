
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Eye, Copy, Code, BarChart3, Users, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SignupFormsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingForm, setEditingForm] = useState<any>(null);
  const [newForm, setNewForm] = useState({
    name: '',
    description: '',
    type: '',
    audience: '',
    status: 'active'
  });
  const { toast } = useToast();

  const [signupForms, setSignupForms] = useState([
    {
      id: 1,
      name: 'Newsletter Signup',
      description: 'Main newsletter subscription form for website',
      type: 'Embedded',
      audience: 'Newsletter Subscribers',
      status: 'Active',
      submissions: 1245,
      conversionRate: '3.2%',
      views: 38950,
      created: '2024-01-15',
      lastModified: '2024-01-20',
      embedCode: '<div id="mc_embed_signup">...</div>'
    },
    {
      id: 2,
      name: 'Product Updates Form',
      description: 'Collect emails for product update notifications',
      type: 'Pop-up',
      audience: 'Product Interested',
      status: 'Active',
      submissions: 892,
      conversionRate: '5.8%',
      views: 15379,
      created: '2024-01-10',
      lastModified: '2024-01-18',
      embedCode: '<script src="..."></script>'
    },
    {
      id: 3,
      name: 'Event Registration',
      description: 'Sign up form for upcoming webinar',
      type: 'Landing Page',
      audience: 'Event Attendees',
      status: 'Paused',
      submissions: 567,
      conversionRate: '12.4%',
      views: 4573,
      created: '2024-01-05',
      lastModified: '2024-01-12',
      embedCode: '<iframe src="..."></iframe>'
    }
  ]);

  const filteredForms = signupForms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateForm = () => {
    if (!newForm.name.trim()) {
      toast({
        title: "Error",
        description: "Form name is required",
        variant: "destructive",
      });
      return;
    }

    const form = {
      id: Math.max(...signupForms.map(f => f.id)) + 1,
      ...newForm,
      submissions: 0,
      conversionRate: '0%',
      views: 0,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      embedCode: '<div>Embed code will be generated</div>'
    };

    setSignupForms([...signupForms, form]);
    setNewForm({ name: '', description: '', type: '', audience: '', status: 'active' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Signup Form Created",
      description: `${form.name} has been created successfully`,
    });
  };

  const handleEditForm = (form: any) => {
    setEditingForm(form);
    setNewForm({
      name: form.name,
      description: form.description,
      type: form.type,
      audience: form.audience,
      status: form.status
    });
  };

  const handleUpdateForm = () => {
    if (!newForm.name.trim()) {
      toast({
        title: "Error",
        description: "Form name is required",
        variant: "destructive",
      });
      return;
    }

    setSignupForms(signupForms.map(form =>
      form.id === editingForm.id
        ? { ...form, ...newForm, lastModified: new Date().toISOString().split('T')[0] }
        : form
    ));
    setEditingForm(null);
    setNewForm({ name: '', description: '', type: '', audience: '', status: 'active' });
    toast({
      title: "Form Updated",
      description: `${newForm.name} has been updated successfully`,
    });
  };

  const handleDeleteForm = (id: number) => {
    const form = signupForms.find(f => f.id === id);
    setSignupForms(signupForms.filter(f => f.id !== id));
    toast({
      title: "Form Deleted",
      description: `${form?.name} has been deleted successfully`,
    });
  };

  const handleDuplicateForm = (form: any) => {
    const duplicatedForm = {
      ...form,
      id: Math.max(...signupForms.map(f => f.id)) + 1,
      name: `${form.name} (Copy)`,
      submissions: 0,
      views: 0,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setSignupForms([...signupForms, duplicatedForm]);
    toast({
      title: "Form Duplicated",
      description: `${form.name} has been duplicated successfully`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Signup Forms</h1>
          <p className="text-gray-600">Create and manage signup forms to grow your audience</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Create a new signup form with customizable fields, design options, and targeting settings to capture leads and grow your email list"
              data-voice-action="Opening signup form creation wizard with templates and customization options"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Form
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Signup Form</DialogTitle>
              <DialogDescription>
                Set up a new form to capture subscriber information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Form Name</Label>
                <Input
                  id="name"
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  placeholder="Enter form name"
                  data-voice-context="Name your signup form for easy identification and management"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newForm.description}
                  onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                  placeholder="Describe the form purpose"
                  data-voice-context="Provide a clear description of what this form is used for and its goals"
                />
              </div>
              <div>
                <Label htmlFor="type">Form Type</Label>
                <Select value={newForm.type} onValueChange={(value) => setNewForm({ ...newForm, type: value })}>
                  <SelectTrigger data-voice-context="Choose how this signup form will be displayed to visitors">
                    <SelectValue placeholder="Select form type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Embedded">Embedded Form</SelectItem>
                    <SelectItem value="Pop-up">Pop-up Form</SelectItem>
                    <SelectItem value="Landing Page">Landing Page</SelectItem>
                    <SelectItem value="Slide-in">Slide-in Form</SelectItem>
                    <SelectItem value="Header Bar">Header Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  value={newForm.audience}
                  onChange={(e) => setNewForm({ ...newForm, audience: e.target.value })}
                  placeholder="Enter audience name"
                  data-voice-context="Specify which audience segment this form will add subscribers to"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateForm} className="flex-1" data-voice-context="Create this signup form and start capturing leads">
                  Create Form
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} data-voice-context="Cancel form creation and close dialog">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of form submissions received across all signup forms this month">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{signupForms.reduce((sum, f) => sum + f.submissions, 0).toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Number of active signup forms currently collecting subscribers">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Forms</p>
                <p className="text-2xl font-bold text-gray-900">{signupForms.filter(f => f.status === 'Active').length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average conversion rate across all signup forms showing effectiveness">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Conversion</p>
                <p className="text-2xl font-bold text-gray-900">7.1%</p>
              </div>
              <ExternalLink className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total number of form views and impressions across all forms">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{signupForms.reduce((sum, f) => sum + f.views, 0).toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search signup forms by name, type, or audience..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-voice-context="Search through your signup forms by name, form type, target audience, or description to quickly find specific forms"
          />
        </div>
      </div>

      {/* Forms List */}
      <div className="grid gap-4">
        {filteredForms.map((form) => (
          <Card key={form.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{form.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{form.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <Badge variant={form.status === 'Active' ? 'default' : 'secondary'}>
                        {form.status}
                      </Badge>
                      <span>Type: {form.type}</span>
                      <span>Audience: {form.audience}</span>
                      <span>Created: {form.created}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{form.submissions.toLocaleString()}</div>
                    <div className="text-gray-600">Submissions</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{form.conversionRate}</div>
                    <div className="text-gray-600">Conversion</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{form.views.toLocaleString()}</div>
                    <div className="text-gray-600">Views</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`Preview ${form.name} form to see how it appears to visitors`}
                      data-voice-action={`Opening ${form.name} form preview`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`Get embed code for ${form.name} to add to your website`}
                      data-voice-action={`Copying ${form.name} embed code`}
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDuplicateForm(form)}
                      data-voice-context={`Duplicate ${form.name} form to create a copy for modification`}
                      data-voice-action={`Duplicating ${form.name} form`}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditForm(form)}
                          data-voice-context={`Edit ${form.name} form settings, design, fields, and targeting options`}
                          data-voice-action={`Opening ${form.name} form editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Signup Form</DialogTitle>
                          <DialogDescription>
                            Update form settings and configuration
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Form Name</Label>
                            <Input
                              id="edit-name"
                              value={newForm.name}
                              onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                              data-voice-context="Update the form name for better identification"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={newForm.description}
                              onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                              data-voice-context="Update the form description and purpose"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-type">Form Type</Label>
                            <Select value={newForm.type} onValueChange={(value) => setNewForm({ ...newForm, type: value })}>
                              <SelectTrigger data-voice-context="Change how this form is displayed to visitors">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Embedded">Embedded Form</SelectItem>
                                <SelectItem value="Pop-up">Pop-up Form</SelectItem>
                                <SelectItem value="Landing Page">Landing Page</SelectItem>
                                <SelectItem value="Slide-in">Slide-in Form</SelectItem>
                                <SelectItem value="Header Bar">Header Bar</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="edit-audience">Target Audience</Label>
                            <Input
                              id="edit-audience"
                              value={newForm.audience}
                              onChange={(e) => setNewForm({ ...newForm, audience: e.target.value })}
                              data-voice-context="Update which audience this form adds subscribers to"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleUpdateForm} className="flex-1" data-voice-context="Save changes to this signup form">
                              Update Form
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteForm(form.id)}
                      data-voice-context={`Delete ${form.name} form permanently - this action cannot be undone`}
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
    </div>
  );
};
