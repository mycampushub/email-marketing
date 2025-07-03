
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Tag, Users, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const TagsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [newTag, setNewTag] = useState({
    name: '',
    description: '',
    color: 'blue',
    category: ''
  });
  const { toast } = useToast();

  const [tags, setTags] = useState([
    {
      id: 1,
      name: 'VIP Customer',
      description: 'High-value customers with frequent purchases',
      color: 'purple',
      category: 'Customer Type',
      subscribers: 245,
      growth: '+12%',
      lastUpdated: '2024-01-20',
      created: '2024-01-15'
    },
    {
      id: 2,
      name: 'Newsletter Subscriber',
      description: 'Subscribers who joined through newsletter signup',
      color: 'blue',
      category: 'Source',
      subscribers: 1890,
      growth: '+8%',
      lastUpdated: '2024-01-19',
      created: '2024-01-10'
    },
    {
      id: 3,
      name: 'Product Launch Interest',
      description: 'Interested in new product launches and updates',
      color: 'green',
      category: 'Interest',
      subscribers: 567,
      growth: '+15%',
      lastUpdated: '2024-01-18',
      created: '2024-01-12'
    },
    {
      id: 4,
      name: 'Abandoned Cart',
      description: 'Customers who left items in their cart',
      color: 'orange',
      category: 'Behavior',
      subscribers: 234,
      growth: '-5%',
      lastUpdated: '2024-01-17',
      created: '2024-01-08'
    }
  ]);

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tag.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTag = () => {
    if (!newTag.name.trim()) {
      toast({
        title: "Error",
        description: "Tag name is required",
        variant: "destructive",
      });
      return;
    }

    const tag = {
      id: Math.max(...tags.map(t => t.id)) + 1,
      ...newTag,
      subscribers: 0,
      growth: '0%',
      lastUpdated: new Date().toISOString().split('T')[0],
      created: new Date().toISOString().split('T')[0]
    };

    setTags([...tags, tag]);
    setNewTag({ name: '', description: '', color: 'blue', category: '' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Tag Created",
      description: `${tag.name} tag has been created successfully`,
    });
  };

  const handleEditTag = (tag: any) => {
    setEditingTag(tag);
    setNewTag({
      name: tag.name,
      description: tag.description,
      color: tag.color,
      category: tag.category
    });
  };

  const handleUpdateTag = () => {
    if (!newTag.name.trim()) {
      toast({
        title: "Error",
        description: "Tag name is required",
        variant: "destructive",
      });
      return;
    }

    setTags(tags.map(tag =>
      tag.id === editingTag.id
        ? { ...tag, ...newTag, lastUpdated: new Date().toISOString().split('T')[0] }
        : tag
    ));
    setEditingTag(null);
    setNewTag({ name: '', description: '', color: 'blue', category: '' });
    toast({
      title: "Tag Updated",
      description: `${newTag.name} tag has been updated successfully`,
    });
  };

  const handleDeleteTag = (id: number) => {
    const tag = tags.find(t => t.id === id);
    setTags(tags.filter(t => t.id !== id));
    toast({
      title: "Tag Deleted",
      description: `${tag?.name} tag has been deleted successfully`,
    });
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tags</h1>
          <p className="text-gray-600">Organize and categorize your audience with custom tags</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Create new audience tags to organize subscribers by behavior, interests, demographics, purchase history, or any custom criteria for targeted marketing campaigns"
              data-voice-action="Opening tag creation dialog with color coding and category options for better audience organization"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Tag
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Tag</DialogTitle>
              <DialogDescription>
                Add a new tag to organize your audience
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tag Name</Label>
                <Input
                  id="name"
                  value={newTag.name}
                  onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                  placeholder="Enter tag name"
                  data-voice-context="Name your tag to identify specific audience characteristics or behaviors for targeted campaigns"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTag.description}
                  onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
                  placeholder="Describe what this tag represents"
                  data-voice-context="Provide a clear description of what this tag represents and when it should be applied to subscribers"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newTag.category} onValueChange={(value) => setNewTag({ ...newTag, category: value })}>
                  <SelectTrigger data-voice-context="Categorize your tag to group related tags together for better organization and reporting">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Customer Type">Customer Type</SelectItem>
                    <SelectItem value="Source">Source/Origin</SelectItem>
                    <SelectItem value="Interest">Interest/Preference</SelectItem>
                    <SelectItem value="Behavior">Behavior</SelectItem>
                    <SelectItem value="Demographics">Demographics</SelectItem>
                    <SelectItem value="Purchase History">Purchase History</SelectItem>
                    <SelectItem value="Engagement">Engagement Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="color">Tag Color</Label>
                <Select value={newTag.color} onValueChange={(value) => setNewTag({ ...newTag, color: value })}>
                  <SelectTrigger data-voice-context="Choose a color for visual identification of this tag in lists and reports">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="yellow">Yellow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateTag} className="flex-1" data-voice-context="Create this tag and start organizing your audience with custom criteria">
                  Create Tag
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} data-voice-context="Cancel tag creation and close dialog">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of unique tags created for audience organization and targeting">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tags</p>
                <p className="text-2xl font-bold text-gray-900">{tags.length}</p>
              </div>
              <Tag className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total number of subscribers across all tags showing audience reach and organization">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tagged Subscribers</p>
                <p className="text-2xl font-bold text-gray-900">{tags.reduce((sum, t) => sum + t.subscribers, 0).toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average number of subscribers per tag showing distribution and tag effectiveness">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. per Tag</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(tags.reduce((sum, t) => sum + t.subscribers, 0) / tags.length)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Number of tag categories for organizing and grouping related audience segments">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(tags.map(t => t.category)).size}</p>
              </div>
              <Tag className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tags by name, description, or category..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-voice-context="Search through your audience tags by name, description, category, or characteristics to quickly find specific organizational labels"
          />
        </div>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTags.map((tag) => (
          <Card key={tag.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getColorClasses(tag.color)}`}>
                  <Tag className="h-3 w-3 mr-1" />
                  {tag.name}
                </div>
                <div className="flex items-center space-x-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditTag(tag)}
                        data-voice-context={`Edit ${tag.name} tag settings, description, color, and category for better audience organization`}
                        data-voice-action={`Opening ${tag.name} tag editor`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Tag</DialogTitle>
                        <DialogDescription>
                          Update tag settings and organization
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-name">Tag Name</Label>
                          <Input
                            id="edit-name"
                            value={newTag.name}
                            onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                            data-voice-context="Update the tag name for better identification"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            value={newTag.description}
                            onChange={(e) => setNewTag({ ...newTag, description: e.target.value })}
                            data-voice-context="Update what this tag represents and its purpose"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-category">Category</Label>
                          <Select value={newTag.category} onValueChange={(value) => setNewTag({ ...newTag, category: value })}>
                            <SelectTrigger data-voice-context="Change the tag category for better organization">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Customer Type">Customer Type</SelectItem>
                              <SelectItem value="Source">Source/Origin</SelectItem>
                              <SelectItem value="Interest">Interest/Preference</SelectItem>
                              <SelectItem value="Behavior">Behavior</SelectItem>
                              <SelectItem value="Demographics">Demographics</SelectItem>
                              <SelectItem value="Purchase History">Purchase History</SelectItem>
                              <SelectItem value="Engagement">Engagement Level</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-color">Tag Color</Label>
                          <Select value={newTag.color} onValueChange={(value) => setNewTag({ ...newTag, color: value })}>
                            <SelectTrigger data-voice-context="Update the tag color for visual identification">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="blue">Blue</SelectItem>
                              <SelectItem value="purple">Purple</SelectItem>
                              <SelectItem value="green">Green</SelectItem>
                              <SelectItem value="orange">Orange</SelectItem>
                              <SelectItem value="red">Red</SelectItem>
                              <SelectItem value="yellow">Yellow</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleUpdateTag} className="flex-1" data-voice-context="Save changes to this tag">
                            Update Tag
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteTag(tag.id)}
                    data-voice-context={`Delete ${tag.name} tag permanently - this will remove the tag from all subscribers`}
                    data-voice-action={`Deleting ${tag.name} tag`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-sm mt-2">
                {tag.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <Badge variant="outline">{tag.category}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subscribers:</span>
                  <span className="font-medium">{tag.subscribers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Growth:</span>
                  <span className={`font-medium ${tag.growth.startsWith('+') ? 'text-green-600' : tag.growth.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
                    {tag.growth}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="text-gray-500">{tag.lastUpdated}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                  data-voice-context={`View all ${tag.subscribers} subscribers with the ${tag.name} tag and manage their information`}
                  data-voice-action={`Viewing subscribers with ${tag.name} tag`}
                >
                  View Subscribers
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
