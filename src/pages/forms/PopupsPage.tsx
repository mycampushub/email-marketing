
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Eye, Copy, Settings, BarChart3, Users, MousePointer, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PopupsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<any>(null);
  const [newPopup, setNewPopup] = useState({
    name: '',
    description: '',
    type: '',
    trigger: '',
    status: 'active'
  });
  const { toast } = useToast();

  const [popups, setPopups] = useState([
    {
      id: 1,
      name: 'Exit Intent Newsletter',
      description: 'Capture emails when visitors are about to leave',
      type: 'Exit Intent',
      trigger: 'Exit Intent',
      status: 'Active',
      views: 15620,
      conversions: 1245,
      conversionRate: '8.0%',
      created: '2024-01-15',
      lastModified: '2024-01-20'
    },
    {
      id: 2,
      name: 'Welcome Discount Popup',
      description: 'Offer discount to first-time visitors',
      type: 'Welcome',
      trigger: 'Time on Page',
      status: 'Active',
      views: 23450,
      conversions: 2156,
      conversionRate: '9.2%',
      created: '2024-01-10',
      lastModified: '2024-01-18'
    },
    {
      id: 3,
      name: 'Cart Abandonment',
      description: 'Recover abandoned shopping carts',
      type: 'Cart Recovery',
      trigger: 'Add to Cart',
      status: 'Paused',
      views: 8930,
      conversions: 567,
      conversionRate: '6.3%',
      created: '2024-01-05',
      lastModified: '2024-01-12'
    }
  ]);

  const filteredPopups = popups.filter(popup =>
    popup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    popup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    popup.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreatePopup = () => {
    if (!newPopup.name.trim()) {
      toast({
        title: "Error",
        description: "Popup name is required",
        variant: "destructive",
      });
      return;
    }

    const popup = {
      id: Math.max(...popups.map(p => p.id)) + 1,
      ...newPopup,
      views: 0,
      conversions: 0,
      conversionRate: '0%',
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setPopups([...popups, popup]);
    setNewPopup({ name: '', description: '', type: '', trigger: '', status: 'active' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Popup Created",
      description: `${popup.name} has been created successfully`,
    });
  };

  const handleEditPopup = (popup: any) => {
    setEditingPopup(popup);
    setNewPopup({
      name: popup.name,
      description: popup.description,
      type: popup.type,
      trigger: popup.trigger,
      status: popup.status
    });
  };

  const handleUpdatePopup = () => {
    if (!newPopup.name.trim()) {
      toast({
        title: "Error",
        description: "Popup name is required",
        variant: "destructive",
      });
      return;
    }

    setPopups(popups.map(popup =>
      popup.id === editingPopup.id
        ? { ...popup, ...newPopup, lastModified: new Date().toISOString().split('T')[0] }
        : popup
    ));
    setEditingPopup(null);
    setNewPopup({ name: '', description: '', type: '', trigger: '', status: 'active' });
    toast({
      title: "Popup Updated",
      description: `${newPopup.name} has been updated successfully`,
    });
  };

  const handleDeletePopup = (id: number) => {
    const popup = popups.find(p => p.id === id);
    setPopups(popups.filter(p => p.id !== id));
    toast({
      title: "Popup Deleted",
      description: `${popup?.name} has been deleted successfully`,
    });
  };

  const handleDuplicatePopup = (popup: any) => {
    const duplicatedPopup = {
      ...popup,
      id: Math.max(...popups.map(p => p.id)) + 1,
      name: `${popup.name} (Copy)`,
      views: 0,
      conversions: 0,
      conversionRate: '0%',
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setPopups([...popups, duplicatedPopup]);
    toast({
      title: "Popup Duplicated",
      description: `${popup.name} has been duplicated successfully`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pop-ups</h1>
          <p className="text-gray-600">Create engaging pop-ups to capture leads and boost conversions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Create a new popup with customizable triggers, timing, and design options to engage visitors and capture leads at the perfect moment"
              data-voice-action="Opening popup creation wizard with trigger settings and design templates"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Pop-up
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Pop-up</DialogTitle>
              <DialogDescription>
                Set up a new pop-up to engage visitors
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Pop-up Name</Label>
                <Input
                  id="name"
                  value={newPopup.name}
                  onChange={(e) => setNewPopup({ ...newPopup, name: e.target.value })}
                  placeholder="Enter popup name"
                  data-voice-context="Name your popup for easy identification and management in your campaigns"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPopup.description}
                  onChange={(e) => setNewPopup({ ...newPopup, description: e.target.value })}
                  placeholder="Describe the popup purpose"
                  data-voice-context="Provide a clear description of what this popup is designed to achieve and its target audience"
                />
              </div>
              <div>
                <Label htmlFor="type">Pop-up Type</Label>
                <Select value={newPopup.type} onValueChange={(value) => setNewPopup({ ...newPopup, type: value })}>
                  <SelectTrigger data-voice-context="Choose the type of popup based on your marketing goals and user experience strategy">
                    <SelectValue placeholder="Select popup type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Welcome">Welcome Popup</SelectItem>
                    <SelectItem value="Exit Intent">Exit Intent</SelectItem>
                    <SelectItem value="Cart Recovery">Cart Recovery</SelectItem>
                    <SelectItem value="Newsletter">Newsletter Signup</SelectItem>
                    <SelectItem value="Promotion">Promotional Offer</SelectItem>
                    <SelectItem value="Survey">Survey/Feedback</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="trigger">Trigger</Label>
                <Select value={newPopup.trigger} onValueChange={(value) => setNewPopup({ ...newPopup, trigger: value })}>
                  <SelectTrigger data-voice-context="Define when this popup should appear to maximize engagement and conversion rates">
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Time on Page">Time on Page</SelectItem>
                    <SelectItem value="Exit Intent">Exit Intent</SelectItem>
                    <SelectItem value="Scroll Percentage">Scroll Percentage</SelectItem>
                    <SelectItem value="Page Views">Number of Page Views</SelectItem>
                    <SelectItem value="Add to Cart">Add to Cart</SelectItem>
                    <SelectItem value="Immediate">Immediate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreatePopup} className="flex-1" data-voice-context="Create this popup and start engaging visitors with targeted messaging">
                  Create Pop-up
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} data-voice-context="Cancel popup creation and close dialog">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of popup views across all active popups this month">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{popups.reduce((sum, p) => sum + p.views, 0).toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total number of conversions generated by all popups">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Conversions</p>
                <p className="text-2xl font-bold text-gray-900">{popups.reduce((sum, p) => sum + p.conversions, 0).toLocaleString()}</p>
              </div>
              <MousePointer className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average conversion rate across all popup campaigns showing overall effectiveness">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">7.8%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Number of active popups currently running and engaging website visitors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Pop-ups</p>
                <p className="text-2xl font-bold text-gray-900">{popups.filter(p => p.status === 'Active').length}</p>
              </div>
              <Timer className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search pop-ups by name, type, or trigger..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-voice-context="Search through your popups by name, popup type, trigger condition, or description to quickly find specific engagement campaigns"
          />
        </div>
      </div>

      {/* Popups List */}
      <div className="grid gap-4">
        {filteredPopups.map((popup) => (
          <Card key={popup.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <MousePointer className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{popup.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{popup.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <Badge variant={popup.status === 'Active' ? 'default' : 'secondary'}>
                        {popup.status}
                      </Badge>
                      <span>Type: {popup.type}</span>
                      <span>Trigger: {popup.trigger}</span>
                      <span>Created: {popup.created}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{popup.views.toLocaleString()}</div>
                    <div className="text-gray-600">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">{popup.conversions.toLocaleString()}</div>
                    <div className="text-gray-600">Conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{popup.conversionRate}</div>
                    <div className="text-gray-600">Rate</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`Preview ${popup.name} popup to see how it appears to website visitors`}
                      data-voice-action={`Opening ${popup.name} popup preview`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`Configure ${popup.name} popup settings including triggers, timing, and display rules`}
                      data-voice-action={`Opening ${popup.name} popup settings`}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDuplicatePopup(popup)}
                      data-voice-context={`Duplicate ${popup.name} popup to create a copy for A/B testing or different campaigns`}
                      data-voice-action={`Duplicating ${popup.name} popup`}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditPopup(popup)}
                          data-voice-context={`Edit ${popup.name} popup design, content, triggers, and targeting settings`}
                          data-voice-action={`Opening ${popup.name} popup editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Pop-up</DialogTitle>
                          <DialogDescription>
                            Update popup settings and configuration
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Pop-up Name</Label>
                            <Input
                              id="edit-name"
                              value={newPopup.name}
                              onChange={(e) => setNewPopup({ ...newPopup, name: e.target.value })}
                              data-voice-context="Update the popup name for better identification"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={newPopup.description}
                              onChange={(e) => setNewPopup({ ...newPopup, description: e.target.value })}
                              data-voice-context="Update the popup description and purpose"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-type">Pop-up Type</Label>
                            <Select value={newPopup.type} onValueChange={(value) => setNewPopup({ ...newPopup, type: value })}>
                              <SelectTrigger data-voice-context="Change the popup type and behavior">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Welcome">Welcome Popup</SelectItem>
                                <SelectItem value="Exit Intent">Exit Intent</SelectItem>
                                <SelectItem value="Cart Recovery">Cart Recovery</SelectItem>
                                <SelectItem value="Newsletter">Newsletter Signup</SelectItem>
                                <SelectItem value="Promotion">Promotional Offer</SelectItem>
                                <SelectItem value="Survey">Survey/Feedback</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="edit-trigger">Trigger</Label>
                            <Select value={newPopup.trigger} onValueChange={(value) => setNewPopup({ ...newPopup, trigger: value })}>
                              <SelectTrigger data-voice-context="Update when this popup should appear">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Time on Page">Time on Page</SelectItem>
                                <SelectItem value="Exit Intent">Exit Intent</SelectItem>
                                <SelectItem value="Scroll Percentage">Scroll Percentage</SelectItem>
                                <SelectItem value="Page Views">Number of Page Views</SelectItem>
                                <SelectItem value="Add to Cart">Add to Cart</SelectItem>
                                <SelectItem value="Immediate">Immediate</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleUpdatePopup} className="flex-1" data-voice-context="Save changes to this popup">
                              Update Pop-up
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeletePopup(popup.id)}
                      data-voice-context={`Delete ${popup.name} popup permanently - this action cannot be undone`}
                      data-voice-action={`Deleting ${popup.name} popup`}
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
