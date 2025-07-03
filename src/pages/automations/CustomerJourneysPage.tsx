
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Play, Pause, Users, TrendingUp, Target, GitBranch } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CustomerJourneysPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingJourney, setEditingJourney] = useState<any>(null);
  const [newJourney, setNewJourney] = useState({
    name: '',
    description: '',
    trigger: '',
    goal: '',
    status: 'draft'
  });
  const { toast } = useToast();

  const [customerJourneys, setCustomerJourneys] = useState([
    {
      id: 1,
      name: 'New Customer Onboarding',
      description: 'Complete onboarding experience for new customers',
      trigger: 'Account Creation',
      goal: 'Product Adoption',
      status: 'Active',
      steps: 8,
      participants: 567,
      completionRate: '78.5%',
      avgTimeToComplete: '5.2 days',
      conversions: 445,
      revenue: '$12,340',
      created: '2024-01-15'
    },
    {
      id: 2,
      name: 'Product Discovery Journey',
      description: 'Guide users to discover and use key product features',
      trigger: 'Feature Interest',
      goal: 'Feature Adoption',
      status: 'Active',
      steps: 6,
      participants: 892,
      completionRate: '65.3%',
      avgTimeToComplete: '3.8 days',
      conversions: 583,
      revenue: '$8,750',
      created: '2024-01-10'
    },
    {
      id: 3,
      name: 'Churn Prevention',
      description: 'Re-engage customers showing signs of disengagement',
      trigger: 'Low Activity',
      goal: 'Re-engagement',
      status: 'Paused',
      steps: 5,
      participants: 234,
      completionRate: '42.1%',
      avgTimeToComplete: '7.1 days',
      conversions: 98,
      revenue: '$2,450',
      created: '2024-01-05'
    }
  ]);

  const filteredJourneys = customerJourneys.filter(journey =>
    journey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journey.trigger.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateJourney = () => {
    if (!newJourney.name.trim()) {
      toast({
        title: "Error",
        description: "Journey name is required",
        variant: "destructive",
      });
      return;
    }

    const journey = {
      id: Math.max(...customerJourneys.map(j => j.id)) + 1,
      ...newJourney,
      steps: 0,
      participants: 0,
      completionRate: '0%',
      avgTimeToComplete: '0 days',
      conversions: 0,
      revenue: '$0',
      created: new Date().toISOString().split('T')[0]
    };

    setCustomerJourneys([...customerJourneys, journey]);
    setNewJourney({ name: '', description: '', trigger: '', goal: '', status: 'draft' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Customer Journey Created",
      description: `${journey.name} has been created successfully`,
    });
  };

  const handleEditJourney = (journey: any) => {
    setEditingJourney(journey);
    setNewJourney({
      name: journey.name,
      description: journey.description,
      trigger: journey.trigger,
      goal: journey.goal,
      status: journey.status
    });
  };

  const handleUpdateJourney = () => {
    if (!newJourney.name.trim()) {
      toast({
        title: "Error",
        description: "Journey name is required",
        variant: "destructive",
      });
      return;
    }

    setCustomerJourneys(customerJourneys.map(journey =>
      journey.id === editingJourney.id
        ? { ...journey, ...newJourney }
        : journey
    ));
    setEditingJourney(null);
    setNewJourney({ name: '', description: '', trigger: '', goal: '', status: 'draft' });
    toast({
      title: "Journey Updated",
      description: `${newJourney.name} has been updated successfully`,
    });
  };

  const handleDeleteJourney = (id: number) => {
    const journey = customerJourneys.find(j => j.id === id);
    setCustomerJourneys(customerJourneys.filter(j => j.id !== id));
    toast({
      title: "Journey Deleted",
      description: `${journey?.name} has been deleted successfully`,
    });
  };

  const handleToggleStatus = (id: number) => {
    setCustomerJourneys(customerJourneys.map(journey =>
      journey.id === id
        ? { ...journey, status: journey.status === 'Active' ? 'Paused' : 'Active' }
        : journey
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Journeys</h1>
          <p className="text-gray-600">Design and optimize customer experience workflows</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Create new customer journey workflows with multiple touchpoints, personalized experiences, and conversion tracking to guide customers through their lifecycle"
              data-voice-action="Opening customer journey builder with visual workflow designer and conversion optimization tools"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Journey
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Customer Journey</DialogTitle>
              <DialogDescription>
                Design a new customer experience workflow
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Journey Name</Label>
                <Input
                  id="name"
                  value={newJourney.name}
                  onChange={(e) => setNewJourney({ ...newJourney, name: e.target.value })}
                  placeholder="Enter journey name"
                  data-voice-context="Name your customer journey to identify the specific experience or workflow you're creating"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newJourney.description}
                  onChange={(e) => setNewJourney({ ...newJourney, description: e.target.value })}
                  placeholder="Describe the journey purpose"
                  data-voice-context="Describe the goals and objectives of this customer journey workflow"
                />
              </div>
              <div>
                <Label htmlFor="trigger">Journey Trigger</Label>
                <Select value={newJourney.trigger} onValueChange={(value) => setNewJourney({ ...newJourney, trigger: value })}>
                  <SelectTrigger data-voice-context="Select what customer action or event will start this journey workflow">
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Account Creation">Account Creation</SelectItem>
                    <SelectItem value="First Purchase">First Purchase</SelectItem>
                    <SelectItem value="Feature Interest">Feature Interest</SelectItem>
                    <SelectItem value="Low Activity">Low Activity</SelectItem>
                    <SelectItem value="Support Request">Support Request</SelectItem>
                    <SelectItem value="Upgrade Intent">Upgrade Intent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="goal">Journey Goal</Label>
                <Select value={newJourney.goal} onValueChange={(value) => setNewJourney({ ...newJourney, goal: value })}>
                  <SelectTrigger data-voice-context="Define the primary goal this customer journey aims to achieve">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product Adoption">Product Adoption</SelectItem>
                    <SelectItem value="Feature Adoption">Feature Adoption</SelectItem>
                    <SelectItem value="Purchase Conversion">Purchase Conversion</SelectItem>
                    <SelectItem value="Re-engagement">Re-engagement</SelectItem>
                    <SelectItem value="Retention">Customer Retention</SelectItem>
                    <SelectItem value="Upsell">Upsell/Cross-sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateJourney} className="flex-1" data-voice-context="Create this customer journey and begin building the workflow steps">
                  Create Journey
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} data-voice-context="Cancel journey creation and close dialog">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of customers currently participating in active journey workflows">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Participants</p>
                <p className="text-2xl font-bold text-gray-900">{customerJourneys.reduce((sum, j) => sum + j.participants, 0).toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average completion rate showing percentage of customers who finish their journeys">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
                <p className="text-2xl font-bold text-gray-900">61.9%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total conversions achieved across all customer journey workflows">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Conversions</p>
                <p className="text-2xl font-bold text-gray-900">{customerJourneys.reduce((sum, j) => sum + j.conversions, 0).toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total revenue generated from customer journey conversions and goal achievements">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$23,540</p>
              </div>
              <GitBranch className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search customer journeys by name, trigger, or goal..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-voice-context="Search through your customer journey workflows by name, trigger type, goal, or description to quickly find specific customer experiences"
          />
        </div>
      </div>

      {/* Journey List */}
      <div className="grid gap-4">
        {filteredJourneys.map((journey) => (
          <Card key={journey.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <GitBranch className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{journey.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{journey.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <Badge variant={journey.status === 'Active' ? 'default' : 'secondary'}>
                        {journey.status}
                      </Badge>
                      <span>Trigger: {journey.trigger}</span>
                      <span>Goal: {journey.goal}</span>
                      <span>{journey.steps} steps</span>
                      <span>Created: {journey.created}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{journey.participants}</div>
                    <div className="text-gray-600">Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{journey.completionRate}</div>
                    <div className="text-gray-600">Completion</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{journey.conversions}</div>
                    <div className="text-gray-600">Conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">{journey.revenue}</div>
                    <div className="text-gray-600">Revenue</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleStatus(journey.id)}
                      data-voice-context={`${journey.status === 'Active' ? 'Pause' : 'Activate'} the ${journey.name} customer journey workflow`}
                      data-voice-action={`${journey.status === 'Active' ? 'Pausing' : 'Activating'} ${journey.name} journey`}
                    >
                      {journey.status === 'Active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditJourney(journey)}
                          data-voice-context={`Edit ${journey.name} customer journey workflow, steps, triggers, and optimization settings`}
                          data-voice-action={`Opening ${journey.name} journey workflow editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Customer Journey</DialogTitle>
                          <DialogDescription>
                            Update journey workflow settings
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Journey Name</Label>
                            <Input
                              id="edit-name"
                              value={newJourney.name}
                              onChange={(e) => setNewJourney({ ...newJourney, name: e.target.value })}
                              data-voice-context="Update the customer journey name for better identification"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={newJourney.description}
                              onChange={(e) => setNewJourney({ ...newJourney, description: e.target.value })}
                              data-voice-context="Update the journey description and objectives"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-trigger">Journey Trigger</Label>
                            <Select value={newJourney.trigger} onValueChange={(value) => setNewJourney({ ...newJourney, trigger: value })}>
                              <SelectTrigger data-voice-context="Change what triggers this customer journey workflow">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Account Creation">Account Creation</SelectItem>
                                <SelectItem value="First Purchase">First Purchase</SelectItem>
                                <SelectItem value="Feature Interest">Feature Interest</SelectItem>
                                <SelectItem value="Low Activity">Low Activity</SelectItem>
                                <SelectItem value="Support Request">Support Request</SelectItem>
                                <SelectItem value="Upgrade Intent">Upgrade Intent</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="edit-goal">Journey Goal</Label>
                            <Select value={newJourney.goal} onValueChange={(value) => setNewJourney({ ...newJourney, goal: value })}>
                              <SelectTrigger data-voice-context="Update the primary goal for this customer journey">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Product Adoption">Product Adoption</SelectItem>
                                <SelectItem value="Feature Adoption">Feature Adoption</SelectItem>
                                <SelectItem value="Purchase Conversion">Purchase Conversion</SelectItem>
                                <SelectItem value="Re-engagement">Re-engagement</SelectItem>
                                <SelectItem value="Retention">Customer Retention</SelectItem>
                                <SelectItem value="Upsell">Upsell/Cross-sell</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleUpdateJourney} className="flex-1" data-voice-context="Save changes to this customer journey workflow">
                              Update Journey
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteJourney(journey.id)}
                      data-voice-context={`Delete ${journey.name} customer journey permanently - this will stop all workflow automation`}
                      data-voice-action={`Deleting ${journey.name} customer journey`}
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
