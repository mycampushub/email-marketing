import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { JourneyBuilder } from '@/components/JourneyBuilder';
import { useAppContext, Automation } from '@/contexts/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Play, Pause, Edit, Copy, Trash2, Plus, GitBranch, 
  Mail, Clock, Users, Settings, Target, Zap, BarChart3,
  Calendar, Tag, UserPlus, MessageSquare
} from 'lucide-react';

export const WorkflowBuilderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { automations, addAutomation, updateAutomation, deleteAutomation, templates } = useAppContext();
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false);
  const [editingWorkflowId, setEditingWorkflowId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    const state = location.state as any;
    if (state?.automation) {
      setEditingWorkflowId(state.automation.id);
    }
  }, [location.state]);

  const filteredWorkflows = automations.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (workflowId: string, newStatus: 'Active' | 'Paused' | 'Draft') => {
    updateAutomation(workflowId, { status: newStatus });
    toast({ title: `Workflow ${newStatus}`, description: `The workflow has been ${newStatus.toLowerCase()} successfully.` });
  };

  const handleDeleteWorkflow = (workflowId: string) => {
    const workflow = automations.find(w => w.id === workflowId);
    if (workflow && window.confirm(`Are you sure you want to delete "${workflow.name}"?`)) {
      deleteAutomation(workflowId);
      toast({ title: "Workflow Deleted", description: `"${workflow.name}" has been permanently deleted.` });
    }
  };

  const handleDuplicateWorkflow = (workflowId: string) => {
    const workflow = automations.find(w => w.id === workflowId);
    if (workflow) {
      const newWorkflow = {
        ...workflow,
        name: `${workflow.name} (Copy)`,
        status: 'Draft' as const,
        subscribers: 0,
        completed: 0,
        opens: 0,
        clicks: 0,
        revenue: 0,
        created: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
      };
      delete (newWorkflow as any).id;
      addAutomation(newWorkflow);
      toast({ title: "Workflow Duplicated", description: `"${workflow.name}" has been duplicated as a copy.` });
    }
  };

  const handleCreateFromTemplate = (template: any) => {
    const newAutomation = {
      name: template.name,
      status: 'Draft' as const,
      trigger: template.trigger === 'Subscription' ? 'signup' : 
               template.trigger === 'Cart Abandonment' ? 'purchase' : 
               template.trigger === 'Purchase Complete' ? 'purchase' : 'signup',
      triggerType: template.trigger === 'Subscription' ? 'signup' as const : 
                   template.trigger === 'Cart Abandonment' ? 'purchase' as const : 
                   template.trigger === 'Purchase Complete' ? 'purchase' as const : 'signup' as const,
      emails: [],
      subscribers: 0,
      completed: 0,
      performance: '0% completion',
      opens: 0,
      clicks: 0,
      revenue: 0,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      lastRun: 'Never',
      settings: { exitOnPurchase: true, exitOnUnsubscribe: true, reEnter: false }
    };
    addAutomation(newAutomation);
    toast({ title: "Automation Created", description: `${template.name} has been created from template.` });
    setIsCreatingWorkflow(false);
    navigate('/automations');
  };

  const handleEditWorkflow = (workflow: Automation) => {
    setEditingWorkflowId(workflow.id);
  };

  const handleViewAnalytics = (workflow: Automation) => {
    navigate('/automations/customer-journeys', { state: { automation: workflow } });
    toast({ title: "Viewing Analytics", description: `Analytics for "${workflow.name}"` });
  };

  const workflowTemplates = [
    { name: 'Welcome New Subscribers', description: 'Introduce new subscribers to your brand with a 5-email sequence', trigger: 'Subscription', steps: 5, category: 'Welcome' },
    { name: 'Abandoned Cart Recovery', description: 'Win back customers who left items in their shopping cart', trigger: 'Cart Abandonment', steps: 3, category: 'E-commerce' },
    { name: 'Post-Purchase Follow-up', description: 'Thank customers and encourage reviews after purchase', trigger: 'Purchase Complete', steps: 3, category: 'E-commerce' },
    { name: 'Lead Nurturing Sequence', description: 'Convert leads into customers with educational content', trigger: 'Lead Magnet Download', steps: 7, category: 'Lead Generation' },
    { name: 'Event Promotion Series', description: 'Build excitement and drive registrations for events', trigger: 'Event Created', steps: 4, category: 'Events' },
    { name: 'Win-back Campaign', description: 'Re-engage subscribers who have not opened emails recently', trigger: 'Inactive for 30 days', steps: 4, category: 'Re-engagement' }
  ];

  const workflowStats = {
    total: automations.length,
    active: automations.filter(w => w.status === 'Active').length,
    paused: automations.filter(w => w.status === 'Paused').length,
    draft: automations.filter(w => w.status === 'Draft').length,
    totalSubscribers: automations.reduce((sum, w) => sum + w.subscribers, 0),
    totalRevenue: automations.reduce((sum, w) => sum + w.revenue, 0)
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Automation Workflows</h1>
          <p className="text-gray-600">Create and manage sophisticated email automation workflows</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setIsCreatingWorkflow(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create from Template
          </Button>
          <Button onClick={() => setEditingWorkflowId('new')}>
            <Zap className="h-4 w-4 mr-2" />
            Build Custom Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                <p className="text-2xl font-bold text-gray-900">{workflowStats.total}</p>
              </div>
              <GitBranch className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Workflows</p>
                <p className="text-2xl font-bold text-green-600">{workflowStats.active}</p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-blue-600">{workflowStats.totalSubscribers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue Generated</p>
                <p className="text-2xl font-bold text-emerald-600">${workflowStats.totalRevenue.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Paused</p>
                <p className="text-2xl font-bold text-yellow-600">{workflowStats.paused}</p>
              </div>
              <Pause className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search workflows by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-4"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4 mb-8">
        {filteredWorkflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`p-3 rounded-lg ${
                    workflow.status === 'Active' ? 'bg-green-100' : 
                    workflow.status === 'Paused' ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <GitBranch className={`h-6 w-6 ${
                      workflow.status === 'Active' ? 'text-green-600' : 
                      workflow.status === 'Paused' ? 'text-yellow-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                      <Badge variant={
                        workflow.status === 'Active' ? 'default' : 
                        workflow.status === 'Paused' ? 'secondary' : 'outline'
                      }>
                        {workflow.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2">Trigger: {workflow.trigger}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {workflow.emails?.length || 0} emails
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Last run: {workflow.lastRun}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{workflow.subscribers.toLocaleString()}</div>
                    <div className="text-gray-600">Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">{workflow.performance}</div>
                    <div className="text-gray-600">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">${workflow.revenue.toLocaleString()}</div>
                    <div className="text-gray-600">Revenue</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {workflow.status === 'Active' ? (
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(workflow.id, 'Paused')}>
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleStatusChange(workflow.id, 'Active')}>
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm" onClick={() => handleEditWorkflow(workflow)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={() => handleDuplicateWorkflow(workflow.id)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={() => handleViewAnalytics(workflow)}>
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={() => handleDeleteWorkflow(workflow.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isCreatingWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Choose a Workflow Template</h2>
              <Button variant="outline" onClick={() => setIsCreatingWorkflow(false)}>×</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workflowTemplates.map((template, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Trigger: {template.trigger}
                      </div>
                      <div className="flex items-center">
                        <GitBranch className="h-4 w-4 mr-2" />
                        {template.steps} steps
                      </div>
                    </div>
                    
                    <Button className="w-full" onClick={() => handleCreateFromTemplate(template)}>
                      Use This Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      <JourneyBuilder
        isOpen={editingWorkflowId !== null}
        onClose={() => setEditingWorkflowId(null)}
        journeyId={editingWorkflowId || undefined}
        onSave={(journey) => {
          if (editingWorkflowId === 'new') {
            const newAutomation = {
              name: journey.name,
              status: 'Draft' as const,
              trigger: journey.trigger,
              triggerType: 'signup' as const,
              emails: [],
              subscribers: 0,
              completed: 0,
              performance: '0% completion',
              opens: 0,
              clicks: 0,
              revenue: 0,
              created: new Date().toISOString().split('T')[0],
              lastModified: new Date().toISOString().split('T')[0],
              lastRun: 'Never',
              settings: { exitOnPurchase: true, exitOnUnsubscribe: true, reEnter: false }
            };
            addAutomation(newAutomation);
            toast({ title: "Automation Created", description: `${journey.name} has been created successfully.` });
          } else if (editingWorkflowId) {
            updateAutomation(editingWorkflowId, {
              name: journey.name,
              trigger: journey.trigger,
            });
            toast({ title: "Automation Updated", description: `${journey.name} has been updated successfully.` });
          }
          setEditingWorkflowId(null);
        }}
      />
    </div>
  );
};
