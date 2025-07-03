
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Eye, Users, BarChart3, Filter, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SegmentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSegment, setEditingSegment] = useState<any>(null);
  const [newSegment, setNewSegment] = useState({
    name: '',
    description: '',
    condition: '',
    criteria: '',
    status: 'active'
  });
  const { toast } = useToast();

  const [segments, setSegments] = useState([
    {
      id: 1,
      name: 'High Value Customers',
      description: 'Customers who have spent over $500',
      condition: 'Purchase Amount',
      criteria: 'Total spent > $500',
      contactCount: 1245,
      openRate: '45.2%',
      clickRate: '12.8%',
      status: 'Active',
      created: '2024-01-15',
      lastUpdated: '2024-01-20'
    },
    {
      id: 2,
      name: 'Newsletter Subscribers',
      description: 'Active newsletter subscribers',
      condition: 'Subscription Type',
      criteria: 'Subscribed to newsletter',
      contactCount: 3456,
      openRate: '38.7%',
      clickRate: '8.5%',
      status: 'Active',
      created: '2024-01-10',
      lastUpdated: '2024-01-18'
    },
    {
      id: 3,
      name: 'Inactive Users',
      description: 'No activity in last 30 days',
      condition: 'Last Activity',
      criteria: 'Last activity > 30 days ago',
      contactCount: 892,
      openRate: '12.3%',
      clickRate: '2.1%',
      status: 'Active',
      created: '2024-01-05',
      lastUpdated: '2024-01-12'
    },
    {
      id: 4,
      name: 'VIP Members',
      description: 'Premium membership holders',
      condition: 'Membership Status',
      criteria: 'Has VIP membership',
      contactCount: 234,
      openRate: '68.9%',
      clickRate: '25.3%',
      status: 'Active',
      created: '2024-01-01',
      lastUpdated: '2024-01-15'
    }
  ]);

  const filteredSegments = segments.filter(segment =>
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    segment.criteria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSegment = () => {
    if (!newSegment.name.trim()) {
      toast({
        title: "Error",
        description: "Segment name is required",
        variant: "destructive",
      });
      return;
    }

    const segment = {
      id: Math.max(...segments.map(s => s.id)) + 1,
      ...newSegment,
      contactCount: 0,
      openRate: '0%',
      clickRate: '0%',
      created: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setSegments([...segments, segment]);
    setNewSegment({ name: '', description: '', condition: '', criteria: '', status: 'active' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Segment Created",
      description: `${segment.name} has been created successfully`,
    });
  };

  const handleEditSegment = (segment: any) => {
    setEditingSegment(segment);
    setNewSegment({
      name: segment.name,
      description: segment.description,
      condition: segment.condition,
      criteria: segment.criteria,
      status: segment.status
    });
  };

  const handleUpdateSegment = () => {
    if (!newSegment.name.trim()) {
      toast({
        title: "Error",
        description: "Segment name is required",
        variant: "destructive",
      });
      return;
    }

    setSegments(segments.map(segment =>
      segment.id === editingSegment.id
        ? { ...segment, ...newSegment, lastUpdated: new Date().toISOString().split('T')[0] }
        : segment
    ));
    setEditingSegment(null);
    setNewSegment({ name: '', description: '', condition: '', criteria: '', status: 'active' });
    toast({
      title: "Segment Updated",
      description: `${newSegment.name} has been updated successfully`,
    });
  };

  const handleDeleteSegment = (id: number) => {
    const segment = segments.find(s => s.id === id);
    setSegments(segments.filter(s => s.id !== id));
    toast({
      title: "Segment Deleted",
      description: `${segment?.name} has been deleted successfully`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audience Segments</h1>
          <p className="text-gray-600">Create targeted segments based on subscriber behavior and demographics</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Create a new audience segment with custom conditions and filters to target specific groups of subscribers for personalized campaigns"
              data-voice-action="Opening segment builder with condition setup and targeting options"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Segment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Audience Segment</DialogTitle>
              <DialogDescription>
                Set up targeting conditions for your new segment
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Segment Name</Label>
                <Input
                  id="name"
                  value={newSegment.name}
                  onChange={(e) => setNewSegment({ ...newSegment, name: e.target.value })}
                  placeholder="Enter segment name"
                  data-voice-context="Name your audience segment for easy identification in campaigns and automation"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSegment.description}
                  onChange={(e) => setNewSegment({ ...newSegment, description: e.target.value })}
                  placeholder="Describe this segment"
                  data-voice-context="Provide a clear description of what type of subscribers this segment contains"
                />
              </div>
              <div>
                <Label htmlFor="condition">Condition Type</Label>
                <Select value={newSegment.condition} onValueChange={(value) => setNewSegment({ ...newSegment, condition: value })}>
                  <SelectTrigger data-voice-context="Choose the type of condition to filter subscribers for this segment">
                    <SelectValue placeholder="Select condition type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Purchase Amount">Purchase Amount</SelectItem>
                    <SelectItem value="Subscription Type">Subscription Type</SelectItem>
                    <SelectItem value="Last Activity">Last Activity</SelectItem>
                    <SelectItem value="Location">Geographic Location</SelectItem>
                    <SelectItem value="Email Engagement">Email Engagement</SelectItem>
                    <SelectItem value="Membership Status">Membership Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="criteria">Criteria</Label>
                <Input
                  id="criteria"
                  value={newSegment.criteria}
                  onChange={(e) => setNewSegment({ ...newSegment, criteria: e.target.value })}
                  placeholder="e.g., Total spent > $100"
                  data-voice-context="Define the specific criteria that contacts must meet to be included in this segment"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateSegment} className="flex-1" data-voice-context="Create this audience segment and start building targeted subscriber groups">
                  Create Segment
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} data-voice-context="Cancel segment creation and close dialog">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of active audience segments for targeted marketing campaigns">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Segments</p>
                <p className="text-2xl font-bold text-gray-900">{segments.length}</p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total number of contacts across all segments for audience reach analysis">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{segments.reduce((sum, s) => sum + s.contactCount, 0).toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average email open rate across all audience segments showing engagement levels">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-gray-900">41.3%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Best performing segment with the highest engagement and conversion rates">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Segment</p>
                <p className="text-2xl font-bold text-gray-900">VIP Members</p>
              </div>
              <Filter className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search segments by name, description, or criteria..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-voice-context="Search through your audience segments by name, description, condition type, or targeting criteria to quickly find specific subscriber groups"
          />
        </div>
      </div>

      {/* Segments List */}
      <div className="grid gap-4">
        {filteredSegments.map((segment) => (
          <Card key={segment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{segment.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{segment.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <Badge variant={segment.status === 'Active' ? 'default' : 'secondary'}>
                        {segment.status}
                      </Badge>
                      <span>Condition: {segment.condition}</span>
                      <span>Created: {segment.created}</span>
                      <span>Updated: {segment.lastUpdated}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Criteria:</span> {segment.criteria}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-2xl">{segment.contactCount.toLocaleString()}</div>
                    <div className="text-gray-600">Contacts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{segment.openRate}</div>
                    <div className="text-gray-600">Open Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{segment.clickRate}</div>
                    <div className="text-gray-600">Click Rate</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`View contacts in ${segment.name} segment to see who matches these criteria`}
                      data-voice-action={`Opening ${segment.name} contact list`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditSegment(segment)}
                          data-voice-context={`Edit ${segment.name} segment conditions, criteria, and targeting settings`}
                          data-voice-action={`Opening ${segment.name} segment editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Audience Segment</DialogTitle>
                          <DialogDescription>
                            Update segment conditions and targeting
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Segment Name</Label>
                            <Input
                              id="edit-name"
                              value={newSegment.name}
                              onChange={(e) => setNewSegment({ ...newSegment, name: e.target.value })}
                              data-voice-context="Update the segment name for better identification"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={newSegment.description}
                              onChange={(e) => setNewSegment({ ...newSegment, description: e.target.value })}
                              data-voice-context="Update the segment description"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-condition">Condition Type</Label>
                            <Select value={newSegment.condition} onValueChange={(value) => setNewSegment({ ...newSegment, condition: value })}>
                              <SelectTrigger data-voice-context="Change the condition type for this segment">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Purchase Amount">Purchase Amount</SelectItem>
                                <SelectItem value="Subscription Type">Subscription Type</SelectItem>
                                <SelectItem value="Last Activity">Last Activity</SelectItem>
                                <SelectItem value="Location">Geographic Location</SelectItem>
                                <SelectItem value="Email Engagement">Email Engagement</SelectItem>
                                <SelectItem value="Membership Status">Membership Status</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="edit-criteria">Criteria</Label>
                            <Input
                              id="edit-criteria"
                              value={newSegment.criteria}
                              onChange={(e) => setNewSegment({ ...newSegment, criteria: e.target.value })}
                              data-voice-context="Update the specific criteria for this segment"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleUpdateSegment} className="flex-1" data-voice-context="Save changes to this audience segment">
                              Update Segment
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteSegment(segment.id)}
                      data-voice-context={`Delete ${segment.name} segment permanently - this action cannot be undone`}
                      data-voice-action={`Deleting ${segment.name} segment`}
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
