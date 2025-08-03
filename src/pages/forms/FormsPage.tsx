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
  ExternalLink, Code2
} from 'lucide-react';

export const FormsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const { forms, addForm, updateForm, deleteForm } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         form.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || form.type.toLowerCase().replace(/[^a-z]/g, '') === typeFilter;
    return matchesSearch && matchesType;
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
    
    addForm(newForm);
    toast({
      title: "Form Created",
      description: `New ${type} form has been created and is ready for customization.`,
    });
  };

  const handleEditForm = (form: any) => {
    // In a real app, this would open the form builder with the form data
    navigate('/forms/builder', { state: { formData: form, isEditing: true } });
    toast({
      title: "Opening Form Builder",
      description: `Editing "${form.name}" with drag-and-drop form builder`,
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

  const handleDeleteForm = (formId: number) => {
    deleteForm(formId);
    toast({
      title: "Form Deleted",
      description: "Form and all associated data permanently removed.",
    });
  };

  const handleToggleStatus = (form: any) => {
    const newStatus = form.status === 'Active' ? 'Paused' : 'Active';
    updateForm(form.id, { status: newStatus });
    toast({
      title: `Form ${newStatus}`,
      description: `"${form.name}" is now ${newStatus.toLowerCase()}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-brand-green text-white';
      case 'Draft': return 'bg-muted text-muted-foreground';
      case 'Paused': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
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
    totalSubmissions: forms.reduce((sum, f) => sum + f.submissions, 0),
    avgConversion: forms.length > 0 ? forms.reduce((sum, f) => sum + parseFloat(f.conversionRate), 0) / forms.length : 0
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
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
            className="bg-primary hover:bg-primary-dark"
            data-voice-context="Create new form using drag-and-drop builder with customizable fields, styling, and automation"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Form
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card data-voice-context={`Total forms: ${formStats.total} across all types and statuses`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-foreground">{formStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Forms</div>
          </CardContent>
        </Card>
        <Card data-voice-context={`Active forms: ${formStats.active} currently collecting submissions`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-brand-green">{formStats.active}</div>
            <div className="text-sm text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card data-voice-context={`Draft forms: ${formStats.drafts} being created or edited`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">{formStats.drafts}</div>
            <div className="text-sm text-muted-foreground">Drafts</div>
          </CardContent>
        </Card>
        <Card data-voice-context={`Total submissions: ${formStats.totalSubmissions} collected from all forms`}>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-brand-blue">{formStats.totalSubmissions}</div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            type: 'Embedded', 
            title: 'Embedded Form', 
            description: 'Add to your website or blog',
            icon: Code2,
            color: 'brand-blue'
          },
          { 
            type: 'Pop-up', 
            title: 'Pop-up Form', 
            description: 'Capture visitors with exit intent',
            icon: MousePointer,
            color: 'brand-orange'
          },
          { 
            type: 'Landing Page', 
            title: 'Landing Page', 
            description: 'Standalone conversion page',
            icon: ExternalLink,
            color: 'brand-green'
          },
          { 
            type: 'Inline', 
            title: 'Inline Form', 
            description: 'Seamlessly blend with content',
            icon: FileText,
            color: 'primary'
          }
        ].map((formType) => {
          const IconComponent = formType.icon;
          return (
            <Card 
              key={formType.type}
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-2 hover:border-primary"
              onClick={() => handleCreateForm(formType.type)}
              data-voice-context={`Create ${formType.title} - ${formType.description} with professional design templates`}
              data-voice-action={`Creating new ${formType.title} with drag-and-drop builder`}
            >
              <CardContent className="p-6 text-center">
                <div className={`mx-auto w-16 h-16 bg-${formType.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className={`h-8 w-8 text-${formType.color}`} />
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
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
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
                        <Badge className={getStatusColor(form.status)}>
                          {form.status}
                        </Badge>
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>Type: {form.type}</span>
                        <span>Audience: {form.audience}</span>
                        <span>Created: {form.created}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-foreground">{form.submissions}</div>
                      <div className="text-muted-foreground">Submissions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-brand-green">{form.conversionRate}</div>
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
                        data-voice-context={`Preview ${form.name} form as visitors will see it`}
                      >
                        <Eye className="h-4 w-4" />
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
                        onClick={() => handleToggleStatus(form)}
                        data-voice-context={`${form.status === 'Active' ? 'Pause' : 'Activate'} ${form.name} form`}
                      >
                        {form.status === 'Active' ? '⏸️' : '▶️'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteForm(form.id)}
                        data-voice-context={`Delete ${form.name} form permanently`}
                      >
                        <Trash2 className="h-4 w-4" />
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
              {searchTerm || typeFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Create your first form to start growing your email list.'
              }
            </p>
            <Button 
              onClick={() => handleCreateForm('Embedded')}
              className="bg-primary hover:bg-primary-dark"
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