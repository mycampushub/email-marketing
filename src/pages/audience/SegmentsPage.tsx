
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
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';

export const SegmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { segments, addSegment, updateSegment, deleteSegment } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSegment, setEditingSegment] = useState<any>(null);
  const [viewingSegment, setViewingSegment] = useState<any>(null);
  const [newSegment, setNewSegment] = useState({
    name: '',
    description: '',
    condition: '',
    criteria: ''
  });
  const { toast } = useToast();

  const filteredSegments = segments.filter(segment =>
    segment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (segment.description && segment.description.toLowerCase().includes(searchTerm.toLowerCase()))
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

    // Check for duplicate segment name
    const existingSegment = segments.find(s => s.name.toLowerCase() === newSegment.name.toLowerCase());
    if (existingSegment) {
      toast({
        title: "Duplicate Segment Name",
        description: `A segment named "${newSegment.name}" already exists. Please choose a different name.`,
        variant: "destructive",
      });
      return;
    }

    addSegment({
      name: newSegment.name,
      description: newSegment.description,
      contactCount: 0,
      conditions: [
        {
          id: Date.now().toString(),
          field: newSegment.condition,
          operator: 'is',
          value: newSegment.criteria,
          logicalOperator: 'AND'
        }
      ],
      created: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'Active'
    });

    setNewSegment({ name: '', description: '', condition: '', criteria: '' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Segment Created",
      description: `${newSegment.name} has been created successfully`,
    });
  };

  const handleEditSegment = (segment: any) => {
    setEditingSegment(segment);
    const condition = segment.conditions && segment.conditions[0] ? segment.conditions[0] : null;
    setNewSegment({
      name: segment.name,
      description: segment.description || '',
      condition: condition?.field || '',
      criteria: condition?.value?.toString() || ''
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

    // Check for duplicate segment name (excluding current segment being edited)
    const existingSegment = segments.find(s => s.id !== editingSegment.id && s.name.toLowerCase() === newSegment.name.toLowerCase());
    if (existingSegment) {
      toast({
        title: "Duplicate Segment Name",
        description: `A segment named "${newSegment.name}" already exists. Please choose a different name.`,
        variant: "destructive",
      });
      return;
    }

    updateSegment(editingSegment.id, {
      name: newSegment.name,
      description: newSegment.description,
      conditions: [
        {
          id: Date.now().toString(),
          field: newSegment.condition,
          operator: 'is',
          value: newSegment.criteria,
          logicalOperator: 'AND'
        }
      ],
      lastUpdated: new Date().toISOString().split('T')[0]
    });

    setEditingSegment(null);
    setNewSegment({ name: '', description: '', condition: '', criteria: '' });
    toast({
      title: "Segment Updated",
      description: `${newSegment.name} has been updated successfully`,
    });
  };

  const handleDeleteSegment = (id: string) => {
    const segment = segments.find(s => s.id === id);
    deleteSegment(id);
    toast({
      title: "Segment Deleted",
      description: `${segment?.name} has been deleted successfully`,
    });
  };

  const handleViewSegment = (segment: any) => {
    setViewingSegment(segment);
    navigate('/audience/contacts', { state: { segment } });
    toast({
      title: "Viewing Segment",
      description: `Viewing contacts in "${segment.name}" segment`,
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                      <span>Created: {segment.created}</span>
                      <span>Updated: {segment.lastUpdated}</span>
                    </div>
                    {segment.conditions && segment.conditions.length > 0 && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Condition:</span>{' '}
                        {segment.conditions[0].field} {segment.conditions[0].operator} {segment.conditions[0].value}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-2xl">{segment.contactCount.toLocaleString()}</div>
                    <div className="text-gray-600">Contacts</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewSegment(segment)}
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
