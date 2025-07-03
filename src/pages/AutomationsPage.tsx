
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Zap, Users, Mail, Timer, ArrowRight, Search, Filter, 
  Play, Pause, Edit, Trash2, Copy, BarChart3, Settings 
} from 'lucide-react';

export const AutomationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [journeys, setJourneys] = useState([
    {
      id: 1,
      name: 'Welcome Series',
      status: 'Active',
      trigger: 'New Subscriber',
      emails: 3,
      subscribers: 156,
      performance: '89% completion',
      opens: 1234,
      clicks: 456,
      revenue: '$2,340',
      created: '2024-01-15',
      lastRun: '2 hours ago'
    },
    {
      id: 2,
      name: 'Abandoned Cart Recovery',
      status: 'Active',
      trigger: 'Cart Abandonment',
      emails: 2,
      subscribers: 89,
      performance: '65% completion',
      opens: 567,
      clicks: 234,
      revenue: '$1,890',
      created: '2024-01-10',
      lastRun: '30 minutes ago'
    },
    {
      id: 3,
      name: 'Birthday Campaign',
      status: 'Paused',
      trigger: 'Birthday Date',
      emails: 1,
      subscribers: 234,
      performance: '78% completion',
      opens: 890,
      clicks: 123,
      revenue: '$567',
      created: '2024-01-05',
      lastRun: '1 day ago'
    },
    {
      id: 4,
      name: 'Re-engagement Series',
      status: 'Draft',
      trigger: 'Inactive for 30 days',
      emails: 4,
      subscribers: 0,
      performance: '-',
      opens: 0,
      clicks: 0,
      revenue: '$0',
      created: '2024-01-20',
      lastRun: 'Never'
    }
  ]);

  const prebuiltJourneys = [
    {
      name: 'Welcome New Subscribers',
      description: 'Introduce new subscribers to your brand',
      emails: 3,
      category: 'Welcome',
      icon: Users,
      difficulty: 'Easy',
      estimatedTime: '30 minutes'
    },
    {
      name: 'Abandoned Cart Recovery',
      description: 'Win back customers who left items in cart',
      emails: 2,
      category: 'E-commerce',
      icon: Timer,
      difficulty: 'Medium',
      estimatedTime: '45 minutes'
    },
    {
      name: 'Birthday Campaign',
      description: 'Send personalized birthday offers',
      emails: 1,
      category: 'Engagement',
      icon: Mail,
      difficulty: 'Easy',
      estimatedTime: '20 minutes'
    },
    {
      name: 'Re-engagement Series',
      description: 'Win back inactive subscribers',
      emails: 4,
      category: 'Retention',
      icon: Zap,
      difficulty: 'Advanced',
      estimatedTime: '60 minutes'
    },
    {
      name: 'Product Launch Sequence',
      description: 'Build excitement for new products',
      emails: 5,
      category: 'Marketing',
      icon: Mail,
      difficulty: 'Medium',
      estimatedTime: '75 minutes'
    },
    {
      name: 'Post-Purchase Follow-up',
      description: 'Nurture customers after purchase',
      emails: 3,
      category: 'E-commerce',
      icon: Users,
      difficulty: 'Easy',
      estimatedTime: '40 minutes'
    }
  ];

  const transactionalTypes = [
    {
      name: 'Order Confirmation',
      description: 'Confirm successful purchases',
      icon: Mail,
      color: 'green',
      setup: 'Basic',
      volume: '1,234/month'
    },
    {
      name: 'Shipping Updates',
      description: 'Keep customers informed about delivery',
      icon: Timer,
      color: 'blue',
      setup: 'Advanced',
      volume: '856/month'
    },
    {
      name: 'Password Reset',
      description: 'Help users reset passwords securely',
      icon: Users,
      color: 'orange',
      setup: 'Basic',
      volume: '234/month'
    },
    {
      name: 'Welcome Email',
      description: 'Instant welcome after signup',
      icon: Zap,
      color: 'purple',
      setup: 'Basic',
      volume: '567/month'
    }
  ];

  const filteredJourneys = journeys.filter(journey => {
    const matchesSearch = journey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journey.trigger.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || journey.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (journeyId: number, newStatus: string) => {
    setJourneys(journeys.map(journey => 
      journey.id === journeyId ? { ...journey, status: newStatus } : journey
    ));
  };

  const handleDeleteJourney = (journeyId: number) => {
    setJourneys(journeys.filter(journey => journey.id !== journeyId));
  };

  const handleDuplicateJourney = (journeyId: number) => {
    const journey = journeys.find(j => j.id === journeyId);
    if (journey) {
      const newJourney = {
        ...journey,
        id: Math.max(...journeys.map(j => j.id)) + 1,
        name: `${journey.name} (Copy)`,
        status: 'Draft',
        subscribers: 0,
        performance: '-',
        lastRun: 'Never'
      };
      setJourneys([...journeys, newJourney]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automations</h1>
          <p className="text-gray-600">Create automated email journeys to engage your audience</p>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          data-voice-context="Create a new automation journey with drag-and-drop builder, behavior triggers, and advanced segmentation"
          data-voice-action="Opening automation builder with workflow templates"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Journey
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total active automation journeys currently running and engaging subscribers">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Journeys</p>
                <p className="text-2xl font-bold text-gray-900">
                  {journeys.filter(j => j.status === 'Active').length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total subscribers currently enrolled in all automation journeys">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {journeys.reduce((sum, j) => sum + j.subscribers, 0).toLocaleString()}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Revenue generated from all automation campaigns this month">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue This Month</p>
                <p className="text-2xl font-bold text-gray-900">$4,797</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average completion rate across all active automation journeys">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Completion</p>
                <p className="text-2xl font-bold text-gray-900">77%</p>
              </div>
              <Timer className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" data-voice-context="View all automation journeys with filtering and management options">All Journeys</TabsTrigger>
          <TabsTrigger value="prebuilt" data-voice-context="Browse pre-built automation templates for quick setup">Pre-built Journeys</TabsTrigger>
          <TabsTrigger value="transactional" data-voice-context="Manage transactional emails like order confirmations and password resets">Transactional Email</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search journeys..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-voice-context="Search automation journeys by name, trigger type, or performance metrics"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48" data-voice-context="Filter journeys by status: active, paused, draft, or all">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredJourneys.map((journey) => (
              <Card key={journey.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Zap className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{journey.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <Badge variant={journey.status === 'Active' ? 'default' : journey.status === 'Paused' ? 'secondary' : 'outline'}>
                            {journey.status}
                          </Badge>
                          <span>Trigger: {journey.trigger}</span>
                          <span>{journey.emails} emails</span>
                          <span>Last run: {journey.lastRun}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{journey.subscribers}</div>
                        <div className="text-gray-600">Subscribers</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{journey.opens}</div>
                        <div className="text-gray-600">Opens</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{journey.clicks}</div>
                        <div className="text-gray-600">Clicks</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{journey.revenue}</div>
                        <div className="text-gray-600">Revenue</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {journey.status === 'Active' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStatusChange(journey.id, 'Paused')}
                            data-voice-context={`Pause ${journey.name} automation to stop sending emails`}
                            data-voice-action={`Pausing ${journey.name} journey`}
                          >
                            <Pause className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleStatusChange(journey.id, 'Active')}
                            data-voice-context={`Activate ${journey.name} automation to start sending emails`}
                            data-voice-action={`Activating ${journey.name} journey`}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-voice-context={`Edit ${journey.name} automation workflow and settings`}
                          data-voice-action={`Opening ${journey.name} editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDuplicateJourney(journey.id)}
                          data-voice-context={`Duplicate ${journey.name} to create a copy for modification`}
                          data-voice-action={`Duplicating ${journey.name} journey`}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteJourney(journey.id)}
                          data-voice-context={`Delete ${journey.name} automation permanently`}
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
        </TabsContent>

        <TabsContent value="prebuilt" className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pre-built Journeys</h2>
            <p className="text-gray-600">Start with proven automation templates and customize them for your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prebuiltJourneys.map((journey, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <journey.icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{journey.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {journey.category} • {journey.emails} emails • {journey.difficulty}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{journey.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">Setup time: {journey.estimatedTime}</span>
                    <Badge variant="outline">{journey.difficulty}</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      data-voice-context={`Use ${journey.name} template with ${journey.emails} pre-designed emails and automated triggers`}
                      data-voice-action={`Setting up ${journey.name} automation workflow`}
                    >
                      Use Template
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`Preview ${journey.name} email sequence and workflow structure`}
                    >
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactional">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Transactional Emails</h2>
              <p className="text-gray-600">Set up automated emails triggered by customer actions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {transactionalTypes.map((type, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`bg-${type.color}-100 p-3 rounded-lg w-fit`}>
                      <type.icon className={`h-6 w-6 text-${type.color}-600`} />
                    </div>
                    <CardTitle>{type.name}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Setup: {type.setup}</span>
                      <span className="text-sm font-medium">Volume: {type.volume}</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1" 
                        variant="outline"
                        data-voice-context={`Set up ${type.name} transactional email with automated triggers and delivery tracking`}
                        data-voice-action={`Configuring ${type.name} email automation`}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-voice-context={`View ${type.name} performance analytics and delivery metrics`}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
