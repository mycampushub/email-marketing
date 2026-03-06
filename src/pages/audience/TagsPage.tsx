
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
import { useAppContext } from '@/contexts/AppContext';

export const TagsPage: React.FC = () => {
  const { tags, addTag, updateTag, deleteTag } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [newTag, setNewTag] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
  });
  const { toast } = useToast();

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (tag.description && tag.description.toLowerCase().includes(searchTerm.toLowerCase()))
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

    // Check for duplicate tag name
    const existingTag = tags.find(t => t.name.toLowerCase() === newTag.name.toLowerCase());
    if (existingTag) {
      toast({
        title: "Duplicate Tag Name",
        description: `A tag named "${newTag.name}" already exists. Please choose a different name.`,
        variant: "destructive",
      });
      return;
    }

    addTag({
      name: newTag.name,
      description: newTag.description,
      color: newTag.color,
      contactCount: 0,
      created: new Date().toISOString().split('T')[0],
    });

    setNewTag({ name: '', description: '', color: '#3B82F6' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Tag Created",
      description: `${newTag.name} tag has been created successfully`,
    });
  };

  const handleEditTag = (tag: any) => {
    setEditingTag(tag);
    setNewTag({
      name: tag.name,
      description: tag.description || '',
      color: tag.color,
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

    // Check for duplicate tag name (excluding current tag being edited)
    const existingTag = tags.find(t => t.id !== editingTag.id && t.name.toLowerCase() === newTag.name.toLowerCase());
    if (existingTag) {
      toast({
        title: "Duplicate Tag Name",
        description: `A tag named "${newTag.name}" already exists. Please choose a different name.`,
        variant: "destructive",
      });
      return;
    }

    updateTag(editingTag.id, {
      name: newTag.name,
      description: newTag.description,
      color: newTag.color,
    });

    setEditingTag(null);
    setNewTag({ name: '', description: '', color: '#3B82F6' });
    toast({
      title: "Tag Updated",
      description: `${newTag.name} tag has been updated successfully`,
    });
  };

  const handleDeleteTag = (id: string) => {
    const tag = tags.find(t => t.id === id);
    deleteTag(id);
    toast({
      title: "Tag Deleted",
      description: `${tag?.name} tag has been deleted successfully`,
    });
  };

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      '#3B82F6': 'bg-blue-100 text-blue-800 border-blue-200',
      '#8B5CF6': 'bg-purple-100 text-purple-800 border-purple-200',
      '#10B981': 'bg-green-100 text-green-800 border-green-200',
      '#F59E0B': 'bg-orange-100 text-orange-800 border-orange-200',
      '#EF4444': 'bg-red-100 text-red-800 border-red-200',
      '#F59E0B': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return colorMap[color] || colorMap['#3B82F6'];
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
                <Label htmlFor="color">Tag Color</Label>
                <Select value={newTag.color} onValueChange={(value) => setNewTag({ ...newTag, color: value })}>
                  <SelectTrigger data-voice-context="Choose a color for visual identification of this tag in lists and reports">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="#3B82F6">Blue</SelectItem>
                    <SelectItem value="#8B5CF6">Purple</SelectItem>
                    <SelectItem value="#10B981">Green</SelectItem>
                    <SelectItem value="#F59E0B">Orange</SelectItem>
                    <SelectItem value="#EF4444">Red</SelectItem>
                    <SelectItem value="#F59E0B">Yellow</SelectItem>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <p className="text-2xl font-bold text-gray-900">{tags.reduce((sum, t) => sum + t.contactCount, 0).toLocaleString()}</p>
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
                <p className="text-2xl font-bold text-gray-900">{tags.length > 0 ? Math.round(tags.reduce((sum, t) => sum + t.contactCount, 0) / tags.length) : 0}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
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
                          <Label htmlFor="edit-color">Tag Color</Label>
                          <Select value={newTag.color} onValueChange={(value) => setNewTag({ ...newTag, color: value })}>
                            <SelectTrigger data-voice-context="Update the tag color for visual identification">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="#3B82F6">Blue</SelectItem>
                              <SelectItem value="#8B5CF6">Purple</SelectItem>
                              <SelectItem value="#10B981">Green</SelectItem>
                              <SelectItem value="#F59E0B">Orange</SelectItem>
                              <SelectItem value="#EF4444">Red</SelectItem>
                              <SelectItem value="#F59E0B">Yellow</SelectItem>
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
                  <span className="text-gray-600">Description:</span>
                  <span className="text-gray-500 text-right max-w-48 truncate">{tag.description || 'No description'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Contacts:</span>
                  <span className="font-medium">{tag.contactCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-500">{tag.created}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                  data-voice-context={`View all ${tag.contactCount} subscribers with the ${tag.name} tag and manage their information`}
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
