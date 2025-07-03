
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Play, Pause, BarChart3, Users, Mail, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AllJourneysPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingJourney, setEditingJourney] = useState<any>(null);
  const [newJourney, setNewJourney] = useState({
    name: '',
    description: '',
    trigger: '',
    status: 'draft'
  });
  const { toast } = useToast();

  const [journeys, setJourneys] = useState([
    {
      id: 1,
      name: 'Welcome New Subscribers',
      description: 'Onboard new subscribers with a personalized welcome series',
      trigger: 'Subscription',
      status: 'Active',
      emails: 5,
      subscribers: 1245,
      openRate: '68.5%',
      clickRate: '12.3%',
      created: '2024-01-15',
      lastModified: '2024-01-20'
    },
    {
      id: 2,
      name: 'Abandoned Cart Recovery',
      description: 'Recover lost sales with targeted cart abandonment emails',
      trigger: 'Cart Abandonment',
      status: 'Active',
      emails: 3,
      subscribers: 892,
      openRate: '45.2%',
      clickRate: '8.7%',
      created: '2024-01-10',
      lastModified: '2024-01-18'
    },
    {
      id: 3,
      name: 'Post-Purchase Follow-up',
      description: 'Engage customers after purchase with thank you and feedback requests',
      trigger: 'Purchase',
      status: 'Paused',
      emails: 4,
      subscribers: 567,
      openRate: '72.1%',
      clickRate: '15.4%',
      created: '2024-01-05',
      lastModified: '2024-01-12'
    }
  ]);

  const filteredJourneys = journeys.filter(journey =>
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
      id: Math.max(...journeys.map(j => j.id)) + 1,
      ...newJourney,
      emails: 0,
      subscribers: 0,
      openRate: '0%',
      clickRate: '0%',
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setJourneys([...journeys, journey]);
    setNewJourney({ name: '', description: '', trigger: '', status: 'draft' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Journey Created",
      description: `${journey.name} has been created successfully`,
    });
  };

  const handleEditJourney = (journey: any) => {
    setEditingJourney(journey);
    setNewJourney({
      name: journey.name,
      description: journey.description,
      trigger: journey.trigger,
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

    setJourneys(journeys.map(journey =>
      journey.id === editingJourney.id
        ? { ...journey, ...newJourney, lastModified: new Date().toISOString().split('T')[0] }
        : journey
    ));
    setEditingJourney(null);
    setNewJourney({ name: '', description: '', trigger: '', status: 'draft' });
    toast({
      title: "Journey Updated",
      description: `${newJourney.name} has been updated successfully`,
    });
  };

  const handleDeleteJourney = (id: number) => {
    const journey = journeys.find(j => j.id === id);
    setJourneys(journeys.filter(j => j.id !== id));
    toast({
      title: "Journey Deleted",
      description: `${journey?.name} has been deleted successfully`,
    });
  };

  const handleToggleStatus = (id: number) => {
    setJourneys(journeys.map(journey =>
      journey.id === id
        ? { ...journey, status: journey.status === 'Active' ? 'Paused' : 'Active' }
        : journey
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Journeys</h1>
          <p className="text-gray-600">Manage all your customer journey automations</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Create a new customer journey automation with customizable triggers, email sequences, and targeting options to guide subscribers through personalized experiences"
              data-voice-action="Opening journey creation dialog with trigger options and email sequence builder"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Journey
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Journey</DialogTitle>
              <DialogDescription>
                Set up a new customer journey automation
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
                  data-voice-context="Name your customer journey automation for easy identification and management"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newJourney.description}
                  onChange={(e) => setNewJourney({ ...newJourney, description: e.target.value })}
                  placeholder="Describe the journey purpose"
                  data-voice-context="Provide a clear description of what this journey accomplishes and its goals"
                />
              </div>
              <div>
                <Label htmlFor="trigger">Trigger</Label>
                <Select value={newJourney.trigger} onValueChange={(value) => setNewJourney({ ...newJourney, trigger: value })}>
                  <SelectTrigger data-voice-context="Choose what action or event will start this customer journey automation">
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Subscription">New Subscription</SelectItem>
                    <SelectItem value="Purchase">Purchase Made</SelectItem>
                    <SelectItem value="Cart Abandonment">Cart Abandonment</SelectItem>
                    <SelectItem value="Birthday">Birthday</SelectItem>
                    <SelectItem value="Inactivity">Customer Inactivity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateJourney} className="flex-1" data-voice-context="Save and create this new customer journey automation">
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
        <Card data-voice-context="Total number of active journey automations currently running and engaging subscribers">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Journeys</p>
                <p className="text-2xl font-bold text-gray-900">{journeys.filter(j => j.status === 'Active').length}</p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total number of subscribers currently enrolled in all journey automations">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">{journeys.reduce((sum, j) => sum + j.subscribers, 0).toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average email open rate across all journey automations showing engagement levels">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-gray-900">61.9%</p>
              </div>
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average click-through rate showing how effectively journeys drive subscriber actions">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Click Rate</p>
                <p className="text-2xl font-bold text-gray-900">12.1%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search journeys by name, description, or trigger..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-voice-context="Search through your journey automations by name, description, trigger type, or status to quickly find specific customer journeys"
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
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{journey.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{journey.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <Badge variant={journey.status === 'Active' ? 'default' : 'secondary'}>
                        {journey.status}
                      </Badge>
                      <span>Trigger: {journey.trigger}</span>
                      <span>{journey.emails} emails</span>
                      <span>Created: {journey.created}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{journey.subscribers}</div>
                    <div className="text-gray-600">Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{journey.openRate}</div>
                    <div className="text-gray-600">Open Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{journey.clickRate}</div>
                    <div className="text-gray-600">Click Rate</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleStatus(journey.id)}
                      data-voice-context={`${journey.status === 'Active' ? 'Pause' : 'Activate'} the ${journey.name} journey automation`}
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
                          data-voice-context={`Edit ${journey.name} journey settings, emails, triggers, and automation flow`}
                          data-voice-action={`Opening ${journey.name} journey editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Journey</DialogTitle>
                          <DialogDescription>
                            Update journey settings and configuration
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Journey Name</Label>
                            <Input
                              id="edit-name"
                              value={newJourney.name}
                              onChange={(e) => setNewJourney({ ...newJourney, name: e.target.value })}
                              data-voice-context="Update the journey name for better identification"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={newJourney.description}
                              onChange={(e) => setNewJourney({ ...newJourney, description: e.target.value })}
                              data-voice-context="Update the journey description and purpose"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-trigger">Trigger</Label>
                            <Select value={newJourney.trigger} onValueChange={(value) => setNewJourney({ ...newJourney, trigger: value })}>
                              <SelectTrigger data-voice-context="Change what triggers this journey automation">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Subscription">New Subscription</SelectItem>
                                <SelectItem value="Purchase">Purchase Made</SelectItem>
                                <SelectItem value="Cart Abandonment">Cart Abandonment</SelectItem>
                                <SelectItem value="Birthday">Birthday</SelectItem>
                                <SelectItem value="Inactivity">Customer Inactivity</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleUpdateJourney} className="flex-1" data-voice-context="Save changes to this journey automation">
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
                      data-voice-context={`Delete ${journey.name} journey permanently - this action cannot be undone`}
                      data-voice-action={`Deleting ${journey.name} journey`}
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
