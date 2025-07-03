
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Eye, BarChart3, MessageSquare, Users, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SurveysPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<any>(null);
  const [newSurvey, setNewSurvey] = useState({
    name: '',
    description: '',
    type: '',
    audience: '',
    status: 'draft'
  });
  const { toast } = useToast();

  const [surveys, setSurveys] = useState([
    {
      id: 1,
      name: 'Customer Satisfaction Survey',
      description: 'Measure customer satisfaction and gather feedback',
      type: 'Satisfaction',
      audience: 'All Customers',
      status: 'Active',
      responses: 1245,
      responseRate: '34.2%',
      averageRating: 4.2,
      created: '2024-01-15',
      lastModified: '2024-01-20'
    },
    {
      id: 2,
      name: 'Product Feedback Survey',
      description: 'Collect feedback on new product features',
      type: 'Product Feedback',
      audience: 'Product Users',
      status: 'Active',
      responses: 892,
      responseRate: '28.7%',
      averageRating: 3.8,
      created: '2024-01-10',
      lastModified: '2024-01-18'
    },
    {
      id: 3,
      name: 'Market Research Survey',
      description: 'Understand market preferences and trends',
      type: 'Market Research',
      audience: 'Newsletter Subscribers',
      status: 'Draft',
      responses: 0,
      responseRate: '0%',
      averageRating: 0,
      created: '2024-01-05',
      lastModified: '2024-01-12'
    }
  ]);

  const filteredSurveys = surveys.filter(survey =>
    survey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    survey.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSurvey = () => {
    if (!newSurvey.name.trim()) {
      toast({
        title: "Error",
        description: "Survey name is required",
        variant: "destructive",
      });
      return;
    }

    const survey = {
      id: Math.max(...surveys.map(s => s.id)) + 1,
      ...newSurvey,
      responses: 0,
      responseRate: '0%',
      averageRating: 0,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };

    setSurveys([...surveys, survey]);
    setNewSurvey({ name: '', description: '', type: '', audience: '', status: 'draft' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Survey Created",
      description: `${survey.name} has been created successfully`,
    });
  };

  const handleEditSurvey = (survey: any) => {
    setEditingSurvey(survey);
    setNewSurvey({
      name: survey.name,
      description: survey.description,
      type: survey.type,
      audience: survey.audience,
      status: survey.status
    });
  };

  const handleUpdateSurvey = () => {
    if (!newSurvey.name.trim()) {
      toast({
        title: "Error",
        description: "Survey name is required",
        variant: "destructive",
      });
      return;
    }

    setSurveys(surveys.map(survey =>
      survey.id === editingSurvey.id
        ? { ...survey, ...newSurvey, lastModified: new Date().toISOString().split('T')[0] }
        : survey
    ));
    setEditingSurvey(null);
    setNewSurvey({ name: '', description: '', type: '', audience: '', status: 'draft' });
    toast({
      title: "Survey Updated",
      description: `${newSurvey.name} has been updated successfully`,
    });
  };

  const handleDeleteSurvey = (id: number) => {
    const survey = surveys.find(s => s.id === id);
    setSurveys(surveys.filter(s => s.id !== id));
    toast({
      title: "Survey Deleted",
      description: `${survey?.name} has been deleted successfully`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Surveys</h1>
          <p className="text-gray-600">Create surveys to collect feedback and insights from your audience</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Create a new survey with custom questions, rating scales, and targeting options to gather valuable feedback from your audience"
              data-voice-action="Opening survey builder with question templates and response analysis features"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Survey
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Survey</DialogTitle>
              <DialogDescription>
                Set up a new survey to collect feedback
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Survey Name</Label>
                <Input
                  id="name"
                  value={newSurvey.name}
                  onChange={(e) => setNewSurvey({ ...newSurvey, name: e.target.value })}
                  placeholder="Enter survey name"
                  data-voice-context="Name your survey for easy identification and organization in your feedback collection"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newSurvey.description}
                  onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
                  placeholder="Describe the survey purpose"
                  data-voice-context="Provide a clear description of what this survey aims to achieve and what feedback you're collecting"
                />
              </div>
              <div>
                <Label htmlFor="type">Survey Type</Label>
                <Select value={newSurvey.type} onValueChange={(value) => setNewSurvey({ ...newSurvey, type: value })}>
                  <SelectTrigger data-voice-context="Choose the type of survey based on your feedback collection goals">
                    <SelectValue placeholder="Select survey type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Satisfaction">Customer Satisfaction</SelectItem>
                    <SelectItem value="Product Feedback">Product Feedback</SelectItem>
                    <SelectItem value="Market Research">Market Research</SelectItem>
                    <SelectItem value="Event Feedback">Event Feedback</SelectItem>
                    <SelectItem value="Employee Survey">Employee Survey</SelectItem>
                    <SelectItem value="NPS">Net Promoter Score</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="audience">Target Audience</Label>
                <Input
                  id="audience"
                  value={newSurvey.audience}
                  onChange={(e) => setNewSurvey({ ...newSurvey, audience: e.target.value })}
                  placeholder="Enter target audience"
                  data-voice-context="Specify which audience segment will receive this survey for targeted feedback collection"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateSurvey} className="flex-1" data-voice-context="Create this survey and start collecting valuable feedback from your audience">
                  Create Survey
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} data-voice-context="Cancel survey creation and close dialog">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of survey responses received across all active surveys">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Responses</p>
                <p className="text-2xl font-bold text-gray-900">{surveys.reduce((sum, s) => sum + s.responses, 0).toLocaleString()}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Number of active surveys currently collecting feedback from your audience">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Surveys</p>
                <p className="text-2xl font-bold text-gray-900">{surveys.filter(s => s.status === 'Active').length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average response rate across all surveys showing engagement with your feedback requests">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">31.5%</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average satisfaction rating across all customer feedback surveys">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p className="text-2xl font-bold text-gray-900">4.0</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search surveys by name, type, or audience..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-voice-context="Search through your surveys by name, survey type, target audience, or description to quickly find specific feedback collection campaigns"
          />
        </div>
      </div>

      {/* Surveys List */}
      <div className="grid gap-4">
        {filteredSurveys.map((survey) => (
          <Card key={survey.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{survey.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{survey.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <Badge variant={survey.status === 'Active' ? 'default' : 'secondary'}>
                        {survey.status}
                      </Badge>
                      <span>Type: {survey.type}</span>
                      <span>Audience: {survey.audience}</span>
                      <span>Created: {survey.created}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{survey.responses.toLocaleString()}</div>
                    <div className="text-gray-600">Responses</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{survey.responseRate}</div>
                    <div className="text-gray-600">Response Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{survey.averageRating > 0 ? survey.averageRating.toFixed(1) : 'N/A'}</div>
                    <div className="text-gray-600">Avg. Rating</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      data-voice-context={`View ${survey.name} survey results and detailed response analysis`}
                      data-voice-action={`Opening ${survey.name} survey results dashboard`}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditSurvey(survey)}
                          data-voice-context={`Edit ${survey.name} survey questions, settings, and targeting options`}
                          data-voice-action={`Opening ${survey.name} survey editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Survey</DialogTitle>
                          <DialogDescription>
                            Update survey settings and configuration
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Survey Name</Label>
                            <Input
                              id="edit-name"
                              value={newSurvey.name}
                              onChange={(e) => setNewSurvey({ ...newSurvey, name: e.target.value })}
                              data-voice-context="Update the survey name for better identification"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={newSurvey.description}
                              onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
                              data-voice-context="Update the survey description and purpose"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-type">Survey Type</Label>
                            <Select value={newSurvey.type} onValueChange={(value) => setNewSurvey({ ...newSurvey, type: value })}>
                              <SelectTrigger data-voice-context="Change the survey type and category">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Satisfaction">Customer Satisfaction</SelectItem>
                                <SelectItem value="Product Feedback">Product Feedback</SelectItem>
                                <SelectItem value="Market Research">Market Research</SelectItem>
                                <SelectItem value="Event Feedback">Event Feedback</SelectItem>
                                <SelectItem value="Employee Survey">Employee Survey</SelectItem>
                                <SelectItem value="NPS">Net Promoter Score</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="edit-audience">Target Audience</Label>
                            <Input
                              id="edit-audience"
                              value={newSurvey.audience}
                              onChange={(e) => setNewSurvey({ ...newSurvey, audience: e.target.value })}
                              data-voice-context="Update which audience will receive this survey"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleUpdateSurvey} className="flex-1" data-voice-context="Save changes to this survey">
                              Update Survey
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteSurvey(survey.id)}
                      data-voice-context={`Delete ${survey.name} survey permanently - this action cannot be undone`}
                      data-voice-action={`Deleting ${survey.name} survey`}
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
