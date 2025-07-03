
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Plus, Upload, Tag, Filter, Search, Mail, 
  Edit, Trash2, UserPlus, UserMinus, BarChart3,
  MessageSquare, Settings, Eye, Download
} from 'lucide-react';

export const AudiencePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Subscribed',
      tags: ['VIP', 'Newsletter'],
      segments: ['High Value'],
      joined: '2024-01-15',
      lastActivity: '2 hours ago',
      emailOpens: 45,
      emailClicks: 12
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Subscribed',
      tags: ['Customer'],
      segments: ['Regular'],
      joined: '2024-01-10',
      lastActivity: '1 day ago',
      emailOpens: 23,
      emailClicks: 8
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: 'Unsubscribed',
      tags: ['Former Customer'],
      segments: [],
      joined: '2024-01-05',
      lastActivity: '2 weeks ago',
      emailOpens: 5,
      emailClicks: 1
    }
  ]);

  const [segments, setSegments] = useState([
    {
      id: 1,
      name: 'High Value Customers',
      description: 'Customers who have spent over $500',
      contactCount: 156,
      conditions: 'Total spent > $500',
      created: '2024-01-15',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Newsletter Subscribers',
      description: 'Active newsletter subscribers',
      contactCount: 1234,
      conditions: 'Subscribed to newsletter',
      created: '2024-01-10',
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'Inactive Users',
      description: 'No activity in last 30 days',
      contactCount: 89,
      conditions: 'Last activity > 30 days ago',
      created: '2024-01-05',
      lastUpdated: '3 days ago'
    }
  ]);

  const [tags, setTags] = useState([
    { id: 1, name: 'VIP', color: 'purple', contactCount: 45 },
    { id: 2, name: 'Customer', color: 'blue', contactCount: 234 },
    { id: 3, name: 'Newsletter', color: 'green', contactCount: 567 },
    { id: 4, name: 'Former Customer', color: 'gray', contactCount: 123 }
  ]);

  const audienceStats = [
    { label: 'Total Contacts', value: '2,456', change: '+12%', icon: Users },
    { label: 'Subscribed', value: '2,234', change: '+8%', icon: Mail },
    { label: 'Segments', value: '8', change: '+1', icon: Tag },
    { label: 'Monthly Growth', value: '15.2%', change: '+2.1%', icon: BarChart3 }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteContact = (contactId: number) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handleStatusChange = (contactId: number, newStatus: string) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId ? { ...contact, status: newStatus } : contact
    ));
  };

  const handleDeleteSegment = (segmentId: number) => {
    setSegments(segments.filter(segment => segment.id !== segmentId));
  };

  const handleDeleteTag = (tagId: number) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audience</h1>
          <p className="text-gray-600">Manage contacts, segments, and subscriber preferences</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            data-voice-context="Import contacts from CSV file, Google Contacts, or other platforms"
            data-voice-action="Opening contact import wizard"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Contacts
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            data-voice-context="Add a new contact manually with custom fields and tags"
            data-voice-action="Opening new contact form"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {audienceStats.map((stat, index) => (
          <Card key={index} data-voice-context={`${stat.label}: ${stat.value} with ${stat.change} change from last month`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="flex flex-col items-end">
                  <stat.icon className="h-8 w-8 text-purple-600 mb-1" />
                  <div className="text-sm text-green-600 font-medium">{stat.change}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="contacts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="contacts" data-voice-context="View and manage all contacts with detailed profiles and activity history">All Contacts</TabsTrigger>
          <TabsTrigger value="segments" data-voice-context="Create and manage audience segments based on behavior and demographics">Segments</TabsTrigger>
          <TabsTrigger value="tags" data-voice-context="Organize contacts with tags for targeted campaigns and personalization">Tags</TabsTrigger>
          <TabsTrigger value="surveys" data-voice-context="Create surveys to collect feedback and insights from your audience">Surveys</TabsTrigger>
          <TabsTrigger value="preferences" data-voice-context="Manage subscriber preferences and communication settings">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search contacts..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-voice-context="Search contacts by name, email, tags, or segments to find specific subscribers"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48" data-voice-context="Filter contacts by subscription status: subscribed, unsubscribed, or all">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="subscribed">Subscribed</SelectItem>
                <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline"
              data-voice-context="Export filtered contacts to CSV file for external use"
              data-voice-action="Preparing contact export"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        <p className="text-gray-600">{contact.email}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <Badge variant={contact.status === 'Subscribed' ? 'default' : 'secondary'}>
                            {contact.status}
                          </Badge>
                          <span>Joined: {contact.joined}</span>
                          <span>Last activity: {contact.lastActivity}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          {contact.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{contact.emailOpens}</div>
                        <div className="text-gray-600">Opens</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{contact.emailClicks}</div>
                        <div className="text-gray-600">Clicks</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-voice-context={`View ${contact.name}'s detailed profile and activity history`}
                          data-voice-action={`Opening ${contact.name}'s profile`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-voice-context={`Edit ${contact.name}'s information, tags, and preferences`}
                          data-voice-action={`Opening ${contact.name}'s edit form`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteContact(contact.id)}
                          data-voice-context={`Delete ${contact.name} from your audience permanently`}
                          data-voice-action={`Deleting ${contact.name} contact`}
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

        <TabsContent value="segments" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Audience Segments</h2>
            <Button 
              data-voice-context="Create a new audience segment with custom conditions and filters"
              data-voice-action="Opening segment builder"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Segment
            </Button>
          </div>

          <div className="grid gap-4">
            {segments.map((segment) => (
              <Card key={segment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Tag className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{segment.name}</h3>
                        <p className="text-gray-600">{segment.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>Conditions: {segment.conditions}</span>
                          <span>Created: {segment.created}</span>
                          <span>Last updated: {segment.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-2xl">{segment.contactCount}</div>
                        <div className="text-gray-600">Contacts</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-voice-context={`View contacts in ${segment.name} segment`}
                          data-voice-action={`Opening ${segment.name} contact list`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          data-voice-context={`Edit ${segment.name} conditions and settings`}
                          data-voice-action={`Opening ${segment.name} editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteSegment(segment.id)}
                          data-voice-context={`Delete ${segment.name} segment permanently`}
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
        </TabsContent>

        <TabsContent value="tags" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Contact Tags</h2>
            <Button 
              data-voice-context="Create a new tag to organize and categorize contacts"
              data-voice-action="Opening tag creation form"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Tag
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tags.map((tag) => (
              <Card key={tag.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full bg-${tag.color}-500`}></div>
                      <div>
                        <h3 className="font-semibold">{tag.name}</h3>
                        <p className="text-sm text-gray-600">{tag.contactCount} contacts</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-voice-context={`Edit ${tag.name} tag name and color`}
                        data-voice-action={`Opening ${tag.name} tag editor`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteTag(tag.id)}
                        data-voice-context={`Delete ${tag.name} tag and remove from all contacts`}
                        data-voice-action={`Deleting ${tag.name} tag`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="surveys" className="space-y-6">
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Your First Survey</h3>
            <p className="text-gray-600 mb-4">Collect feedback and insights from your audience with custom surveys.</p>
            <Button 
              data-voice-context="Create a new survey with custom questions and response analysis"
              data-voice-action="Opening survey builder"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Survey
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="text-center py-12">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscriber Preferences</h3>
            <p className="text-gray-600 mb-4">Let subscribers manage their communication preferences and frequency.</p>
            <Button 
              data-voice-context="Set up subscriber preference center for communication management"
              data-voice-action="Opening preference center setup"
            >
              <Settings className="h-4 w-4 mr-2" />
              Setup Preference Center
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
