import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { JourneyBuilder } from '@/components/JourneyBuilder';
import { 
  Play, Pause, Edit, Copy, Trash2, Plus, GitBranch, 
  Mail, Clock, Users, Settings, Target, Zap, BarChart3,
  Calendar, Tag, UserPlus, MessageSquare
} from 'lucide-react';

interface Workflow {
  id: number;
  name: string;
  description: string;
  trigger: string;
  status: 'Active' | 'Paused' | 'Draft';
  subscribers: number;
  performance: string;
  opens: number;
  clicks: number;
  revenue: string;
  created: string;
  lastRun: string;
  steps: number;
  completionRate: string;
  tags: string[];
}

export const WorkflowBuilderPage: React.FC = () => {
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false);
  const [isEditingWorkflow, setIsEditingWorkflow] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: 1,
      name: 'Welcome Series',
      description: 'Multi-touch welcome sequence for new subscribers',
      trigger: 'New Subscriber',
      status: 'Active',
      subscribers: 1250,
      performance: '89% completion',
      opens: 3420,
      clicks: 680,
      revenue: '$2,340',
      created: '2024-01-15',
      lastRun: '2 hours ago',
      steps: 5,
      completionRate: '89%',
      tags: ['Welcome', 'Onboarding']
    },
    {
      id: 2,
      name: 'Abandoned Cart Recovery',
      description: 'Recover lost sales with timed email sequences',
      trigger: 'Cart Abandonment',
      status: 'Active',
      subscribers: 890,
      performance: '65% completion',
      opens: 1560,
      clicks: 450,
      revenue: '$8,890',
      created: '2024-01-10',
      lastRun: '30 minutes ago',
      steps: 3,
      completionRate: '65%',
      tags: ['E-commerce', 'Recovery']
    },
    {
      id: 3,
      name: 'Birthday Campaign',
      description: 'Personalized birthday offers and greetings',
      trigger: 'Birthday Date',
      status: 'Paused',
      subscribers: 234,
      performance: '78% completion',
      opens: 890,
      clicks: 123,
      revenue: '$567',
      created: '2024-01-05',
      lastRun: '1 day ago',
      steps: 2,
      completionRate: '78%',
      tags: ['Birthday', 'Personalized']
    },
    {
      id: 4,
      name: 'Re-engagement Series',
      description: 'Win back inactive subscribers with targeted content',
      trigger: 'Inactive for 30 days',
      status: 'Draft',
      subscribers: 0,
      performance: '-',
      opens: 0,
      clicks: 0,
      revenue: '$0',
      created: '2024-01-20',
      lastRun: 'Never',
      steps: 4,
      completionRate: '0%',
      tags: ['Re-engagement', 'Win-back']
    }
  ]);

  const workflowTemplates = [
    {
      name: 'Welcome New Subscribers',
      description: 'Introduce new subscribers to your brand with a 5-email sequence',
      trigger: 'Subscription',
      steps: 5,
      category: 'Welcome',
      estimatedTime: '30 minutes',
      difficulty: 'Easy'
    },
    {
      name: 'Abandoned Cart Recovery',
      description: 'Win back customers who left items in their shopping cart',
      trigger: 'Cart Abandonment',
      steps: 3,
      category: 'E-commerce',
      estimatedTime: '20 minutes',
      difficulty: 'Medium'
    },
    {
      name: 'Post-Purchase Follow-up',
      description: 'Thank customers and encourage reviews after purchase',
      trigger: 'Purchase Complete',
      steps: 3,
      category: 'E-commerce',
      estimatedTime: '25 minutes',
      difficulty: 'Easy'
    },
    {
      name: 'Lead Nurturing Sequence',
      description: 'Convert leads into customers with educational content',
      trigger: 'Lead Magnet Download',
      steps: 7,
      category: 'Lead Generation',
      estimatedTime: '60 minutes',
      difficulty: 'Advanced'
    },
    {
      name: 'Event Promotion Series',
      description: 'Build excitement and drive registrations for events',
      trigger: 'Event Created',
      steps: 4,
      category: 'Events',
      estimatedTime: '40 minutes',
      difficulty: 'Medium'
    },
    {
      name: 'Win-back Campaign',
      description: 'Re-engage subscribers who haven\'t opened emails recently',
      trigger: 'Inactive for 30 days',
      steps: 4,
      category: 'Re-engagement',
      estimatedTime: '35 minutes',
      difficulty: 'Medium'
    }
  ];

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.trigger.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workflow.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (workflowId: number, newStatus: 'Active' | 'Paused') => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === workflowId ? { ...workflow, status: newStatus } : workflow
    ));
    
    toast({
      title: `Workflow ${newStatus}`,
      description: `The workflow has been ${newStatus.toLowerCase()} successfully.`,
    });
  };

  const handleDeleteWorkflow = (workflowId: number) => {
    const workflow = workflows.find(w => w.id === workflowId);
    setWorkflows(workflows.filter(workflow => workflow.id !== workflowId));
    
    toast({
      title: "Workflow Deleted",
      description: `"${workflow?.name}" has been permanently deleted.`,
    });
  };

  const handleDuplicateWorkflow = (workflowId: number) => {
    const workflow = workflows.find(w => w.id === workflowId);
    if (workflow) {
      const newWorkflow = {
        ...workflow,
        id: Math.max(...workflows.map(w => w.id)) + 1,
        name: `${workflow.name} (Copy)`,
        status: 'Draft' as const,
        subscribers: 0,
        opens: 0,
        clicks: 0,
        revenue: '$0',
        performance: '-',
        lastRun: 'Never',
        completionRate: '0%',
        created: new Date().toISOString().split('T')[0]
      };
      setWorkflows([...workflows, newWorkflow]);
      
      toast({
        title: "Workflow Duplicated",
        description: `"${newWorkflow.name}" has been created as a copy.`,
      });
    }
  };

  const createWorkflowFromTemplate = (template: any) => {
    const newWorkflow: Workflow = {
      id: Math.max(...workflows.map(w => w.id)) + 1,
      name: template.name,
      description: template.description,
      trigger: template.trigger,
      status: 'Draft',
      subscribers: 0,
      performance: '-',
      opens: 0,
      clicks: 0,
      revenue: '$0',
      created: new Date().toISOString().split('T')[0],
      lastRun: 'Never',
      steps: template.steps,
      completionRate: '0%',
      tags: [template.category]
    };

    setWorkflows([...workflows, newWorkflow]);
    setIsEditingWorkflow(newWorkflow.id);

    toast({
      title: "Workflow Created",
      description: `"${template.name}" workflow has been created from template.`,
    });
  };

  const workflowStats = {
    total: workflows.length,
    active: workflows.filter(w => w.status === 'Active').length,
    paused: workflows.filter(w => w.status === 'Paused').length,
    draft: workflows.filter(w => w.status === 'Draft').length,
    totalSubscribers: workflows.reduce((sum, w) => sum + w.subscribers, 0),
    totalRevenue: workflows.reduce((sum, w) => {
      const revenue = parseFloat(w.revenue.replace('$', '').replace(',', '')) || 0;
      return sum + revenue;
    }, 0),
    avgCompletionRate: workflows.filter(w => w.completionRate !== '0%')
      .reduce((sum, w) => sum + parseFloat(w.completionRate), 0) / 
      workflows.filter(w => w.completionRate !== '0%').length || 0
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
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
          <Button onClick={() => setIsEditingWorkflow(0)}>
            <Zap className="h-4 w-4 mr-2" />
            Build Custom Workflow
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
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
                <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
                <p className="text-2xl font-bold text-orange-600">{workflowStats.avgCompletionRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search workflows by name, description, or trigger..."
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

      {/* Workflows List */}
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
                      {workflow.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-2">{workflow.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Target className="h-4 w-4 mr-1" />
                        Trigger: {workflow.trigger}
                      </span>
                      <span className="flex items-center">
                        <GitBranch className="h-4 w-4 mr-1" />
                        {workflow.steps} steps
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
                    <div className="font-semibold text-gray-900">{workflow.completionRate}</div>
                    <div className="text-gray-600">Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{workflow.revenue}</div>
                    <div className="text-gray-600">Revenue</div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {workflow.status === 'Active' ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(workflow.id, 'Paused')}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange(workflow.id, 'Active')}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditingWorkflow(workflow.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDuplicateWorkflow(workflow.id)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Workflow Analytics",
                          description: `Viewing detailed analytics for "${workflow.name}"`,
                        });
                      }}
                    >
                      <BarChart3 className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteWorkflow(workflow.id)}
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

      {/* Workflow Templates Modal */}
      {isCreatingWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Choose a Workflow Template</h2>
              <Button variant="outline" onClick={() => setIsCreatingWorkflow(false)}>
                ×
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workflowTemplates.map((template, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge variant="outline">{template.difficulty}</Badge>
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
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Setup: {template.estimatedTime}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={() => {
                        createWorkflowFromTemplate(template);
                        setIsCreatingWorkflow(false);
                      }}
                    >
                      Use This Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Journey Builder */}
      <JourneyBuilder
        isOpen={isEditingWorkflow !== null}
        onClose={() => setIsEditingWorkflow(null)}
        journeyId={isEditingWorkflow?.toString()}
        onSave={(journey) => {
          if (isEditingWorkflow === 0) {
            // Creating new workflow
            const newWorkflow: Workflow = {
              id: Math.max(...workflows.map(w => w.id)) + 1,
              name: journey.name,
              description: journey.description,
              trigger: journey.trigger,
              status: 'Draft',
              subscribers: 0,
              performance: '-',
              opens: 0,
              clicks: 0,
              revenue: '$0',
              created: journey.created,
              lastRun: 'Never',
              steps: journey.steps.length,
              completionRate: '0%',
              tags: ['Custom']
            };
            setWorkflows([...workflows, newWorkflow]);
          } else {
            // Editing existing workflow
            setWorkflows(workflows.map(w => 
              w.id === isEditingWorkflow ? {
                ...w,
                name: journey.name,
                description: journey.description,
                trigger: journey.trigger,
                steps: journey.steps.length
              } : w
            ));
          }
          setIsEditingWorkflow(null);
        }}
      />
    </div>
  );
};