
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { 
  Plus, Search, Filter, Edit, Trash2, Copy, Eye, 
  BarChart3, Settings, Users, FileText, MousePointer,
  ExternalLink, Code2, Play, Pause, TrendingUp, Download
} from 'lucide-react';

export const FormsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { forms, addForm, updateForm, deleteForm } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || form.type.toLowerCase().replace(/[^a-z]/g, '') === typeFilter;
    const matchesStatus = statusFilter === 'all' || form.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateForm = (type: string) => {
    const newForm = {
      name: `New ${type} Form`,
      type: type as any,
      status: 'Draft' as const,
      submissions: 0,
      conversionRate: '0%',
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      audience: 'All Subscribers'
    };
    
    const addedForm = addForm(newForm);
    
    toast({
      title: "Form Created",
      description: `New ${type} form created successfully. Opening form builder...`,
    });
    
    // Small delay to ensure toast is visible before navigation
    setTimeout(() => {
      navigate('/forms/builder', { state: { formData: newForm, isEditing: false } });
    }, 500);
  };

  const handleEditForm = (form: any) => {
    navigate('/forms/builder', { state: { formData: form, isEditing: true } });
    toast({
      title: "Opening Form Builder",
      description: `Editing "${form.name}" with professional drag-and-drop builder`,
    });
  };

  const handlePreviewForm = (form: any) => {
    // Open preview in new window
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Form Preview - ${form.name}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
              .preview-container { max-width: 600px; margin: 0 auto; background: white; padding: 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
              .preview-header { text-align: center; margin-bottom: 24px; }
              .form-field { margin-bottom: 16px; }
              .form-field label { display: block; margin-bottom: 8px; font-weight: 500; color: #374151; }
              .form-field input, .form-field textarea, .form-field select { width: 100%; padding: 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px; }
              .form-field input:focus, .form-field textarea:focus, .form-field select:focus { outline: none; border-color: #3b82f6; }
              .submit-btn { background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 16px; font-weight: 500; cursor: pointer; width: 100%; margin-top: 16px; }
              .submit-btn:hover { background: #2563eb; }
            </style>
          </head>
          <body>
            <div class="preview-container">
              <div class="preview-header">
                <h1>${form.name}</h1>
                <p>This is a preview of your form. Form submissions are disabled in preview mode.</p>
              </div>
              <form onsubmit="event.preventDefault(); alert('Form preview - submissions are disabled');">
                <div class="form-field">
                  <label>Email Address *</label>
                  <input type="email" placeholder="Enter your email" required disabled>
                </div>
                <div class="form-field">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" disabled>
                </div>
                <div class="form-field">
                  <label>Message</label>
                  <textarea placeholder="Enter your message" rows="4" disabled></textarea>
                </div>
                <button type="submit" class="submit-btn">Submit Form</button>
              </form>
            </div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
    
    toast({
      title: "Form Preview",
      description: `Opening preview of "${form.name}" in new window`,
    });
  };

  const handleDuplicateForm = (form: any) => {
    const newForm = {
      ...form,
      name: `${form.name} (Copy)`,
      status: 'Draft' as const,
      submissions: 0,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    addForm(newForm);
    toast({
      title: "Form Duplicated",
      description: `Created "${newForm.name}" ready for customization`,
    });
  };

  const handleDeleteForm = (formId: number, formName: string) => {
    if (window.confirm(`Are you sure you want to delete "${formName}"? This action cannot be undone.`)) {
      deleteForm(formId);
      toast({
        title: "Form Deleted",
        description: `"${formName}" has been permanently deleted.`,
      });
    }
  };

  const handleToggleStatus = (form: any) => {
    const newStatus = form.status === 'Active' ? 'Paused' : 'Active';
    updateForm(form.id, { status: newStatus, lastModified: new Date().toISOString().split('T')[0] });
    toast({
      title: `Form ${newStatus}`,
      description: `"${form.name}" is now ${newStatus.toLowerCase()}`,
    });
  };

  const handleViewAnalytics = (form: any) => {
    navigate('/analytics', { state: { filter: 'forms', formId: form.id } });
    toast({
      title: "Opening Analytics",
      description: `Viewing performance data for "${form.name}"`,
    });
  };

  const handleExportForm = (form: any) => {
    const formData = {
      id: form.id,
      name: form.name,
      type: form.type,
      created: form.created,
      settings: {
        title: form.name,
        description: `Generated form: ${form.name}`,
        submitText: 'Submit',
        styling: {
          backgroundColor: '#ffffff',
          textColor: '#000000',
          buttonColor: '#3b82f6',
          borderRadius: '8',
          fontFamily: 'Inter'
        }
      },
      fields: [
        { id: 'email', type: 'email', label: 'Email Address', required: true, placeholder: 'Enter your email' },
        { id: 'name', type: 'text', label: 'Full Name', required: false, placeholder: 'Enter your full name' },
        { id: 'message', type: 'textarea', label: 'Message', required: false, placeholder: 'Enter your message' }
      ]
    };
    
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Form Exported",
      description: `"${form.name}" has been exported as JSON`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'Draft': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Pop-up': return MousePointer;
      case 'Landing Page': return ExternalLink;
      case 'Inline': return Code2;
      default: return FileText;
    }
  };

  const formStats = {
    total: forms.length,
    active: forms.filter(f => f.status === 'Active').length,
    drafts: forms.filter(f => f.status === 'Draft').length,
    paused: forms.filter(f => f.status === 'Paused').length,
    totalSubmissions: forms.reduce((sum, f) => sum + f.submissions, 0),
    avgConversion: forms.length > 0 ? forms.reduce((sum, f) => sum + parseFloat(f.conversionRate), 0) / forms.length : 0
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 
            className="text-3xl font-bold text-foreground mb-2"
            data-voice-context="Forms management center for creating signup forms, pop-ups, landing pages, and embedded forms to grow your email list"
          >
            Forms & Sign-up Pages
          </h1>
          <p 
            className="text-muted-foreground"
            data-voice-context="Create beautiful forms with drag-and-drop builder, customize design, set up automations, and track conversion rates"
          >
            Create beautiful forms to grow your audience and capture leads
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button 
            variant="outline"
            onClick={() => navigate('/forms/signup')}
            data-voice-context="View and manage all signup forms with embedded and standalone options"
          >
            <FileText className="h-4 w-4 mr-2" />
            Signup Forms
          </Button>
          <Button 
            onClick={() => handleCreateForm('Embedded')}
            className="bg-primary hover:bg-primary/90"
            data-voice-context="Create new form using drag-and-drop builder with customizable fields, styling, and automation"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card data-voice-context={`Total forms: ${formStats.total} across all types and statuses`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{formStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Forms</div>
          </CardContent>
        </Card>
        <Card data-voice-context={`Active forms: ${formStats.active} currently collecting submissions`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{formStats.active}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card data-voice-context={`Draft forms: ${formStats.drafts} being created or edited`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-500">{formStats.drafts}</div>
            <div className="text-sm text-muted-foreground">Drafts</div>
          </CardContent>
        </Card>
        <Card data-voice-context={`Paused forms: ${formStats.paused} temporarily disabled`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{formStats.paused}</div>
            <div className="text-sm text-muted-foreground">Paused</div>
          </CardContent>
        </Card>
        <Card data-voice-context={`Total submissions: ${formStats.totalSubmissions} collected from all forms`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{formStats.totalSubmissions}</div>
            <div className="text-sm text-muted-foreground">Submissions</div>
          </CardContent>
        </Card>
        <Card data-voice-context={`Average conversion rate: ${formStats.avgConversion.toFixed(1)}% across all active forms`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{formStats.avgConversion.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Avg Conversion</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Create Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            type: 'Embedded', 
            title: 'Embedded Form', 
            description: 'Add to your website or blog',
            icon: Code2,
            color: 'blue'
          },
          { 
            type: 'Pop-up', 
            title: 'Pop-up Form', 
            description: 'Capture visitors with exit intent',
            icon: MousePointer,
            color: 'orange'
          },
          { 
            type: 'Landing Page', 
            title: 'Landing Page', 
            description: 'Standalone conversion page',
            icon: ExternalLink,
            color: 'green'
          },
          { 
            type: 'Inline', 
            title: 'Inline Form', 
            description: 'Seamlessly blend with content',
            icon: FileText,
            color: 'purple'
          }
        ].map((formType) => {
          const IconComponent = formType.icon;
          return (
            <Card 
              key={formType.type}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 hover:border-primary/50"
              onClick={() => handleCreateForm(formType.type)}
              data-voice-context={`Create ${formType.title} - ${formType.description} with professional design templates`}
              data-voice-action={`Creating new ${formType.title} with drag-and-drop builder`}
            >
              <CardContent className="p-6 text-center">
                <div className={`mx-auto w-16 h-16 bg-${formType.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`h-8 w-8 text-${formType.color}-600`} />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {formType.title}
                </h3>
                <p className="text-sm text-muted-foreground">{formType.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-voice-context="Search through all forms by name, type, or description"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger 
            className="w-48"
            data-voice-context="Filter forms by type: embedded, pop-up, landing page, or inline forms"
          >
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="embedded">Embedded</SelectItem>
            <SelectItem value="popup">Pop-up</SelectItem>
            <SelectItem value="landingpage">Landing Page</SelectItem>
            <SelectItem value="inline">Inline</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger 
            className="w-48"
            data-voice-context="Filter forms by status: active, draft, or paused forms"
          >
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Forms List */}
      <div className="space-y-4">
        {filteredForms.map((form) => {
          const IconComponent = getTypeIcon(form.type);
          return (
            <Card key={form.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg flex items-center gap-3">
                        {form.name}
                        <Badge className={`${getStatusColor(form.status)} border`}>
                          {form.status}
                        </Badge>
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>Type: {form.type}</span>
                        <span>Audience: {form.audience}</span>
                        <span>Created: {form.created}</span>
                        <span>Modified: {form.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{form.submissions.toLocaleString()}</div>
                      <div className="text-muted-foreground">Submissions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{form.conversionRate}</div>
                      <div className="text-muted-foreground">Conversion</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditForm(form)}
                        data-voice-context={`Edit ${form.name} form with drag-and-drop builder`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePreviewForm(form)}
                        data-voice-context={`Preview ${form.name} form as visitors will see it`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewAnalytics(form)}
                        data-voice-context={`View analytics and performance data for ${form.name}`}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDuplicateForm(form)}
                        data-voice-context={`Duplicate ${form.name} form to create a copy`}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleExportForm(form)}
                        data-voice-context={`Export ${form.name} form as JSON file`}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleStatus(form)}
                        data-voice-context={`${form.status === 'Active' ? 'Pause' : 'Activate'} ${form.name} form`}
                      >
                        {form.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteForm(form.id, form.name)}
                        data-voice-context={`Delete ${form.name} form permanently`}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredForms.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Forms Found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm || typeFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Create your first form to start growing your email list.'
              }
            </p>
            <Button 
              onClick={() => handleCreateForm('Embedded')}
              className="bg-primary hover:bg-primary/90"
              data-voice-context="Create your first form to start collecting email subscribers"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Form
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
