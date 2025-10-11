import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, Plus, Search, Filter, Download, Upload, Mail, 
  Edit, Trash2, Tag, UserPlus, BarChart3, Eye, Star,
  Phone, MapPin, Calendar, Globe, UserCheck
} from 'lucide-react';

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  location?: string;
  status: 'subscribed' | 'unsubscribed' | 'bounced' | 'pending';
  tags: string[];
  segments: string[];
  signupDate: string;
  lastActivity: string;
  openRate: string;
  clickRate: string;
  source: string;
  totalSpent?: string;
  averageOrderValue?: string;
}

export const ContactManagerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState<Contact | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const { toast } = useToast();

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      status: 'subscribed',
      tags: ['VIP', 'Newsletter'],
      segments: ['High Value Customers'],
      signupDate: '2024-01-15',
      lastActivity: '2024-01-20',
      openRate: '85%',
      clickRate: '12%',
      source: 'Website',
      totalSpent: '$1,250',
      averageOrderValue: '$125'
    },
    {
      id: 2,
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@example.com',
      phone: '+1 (555) 987-6543',
      location: 'San Francisco, CA',
      status: 'subscribed',
      tags: ['Tech Enthusiast'],
      segments: ['Newsletter Subscribers'],
      signupDate: '2024-01-10',
      lastActivity: '2024-01-18',
      openRate: '92%',
      clickRate: '18%',
      source: 'Social Media',
      totalSpent: '$850',
      averageOrderValue: '$85'
    },
    {
      id: 3,
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@example.com',
      status: 'unsubscribed',
      tags: ['Former Customer'],
      segments: [],
      signupDate: '2023-12-05',
      lastActivity: '2024-01-01',
      openRate: '45%',
      clickRate: '3%',
      source: 'Email Campaign'
    }
  ]);

  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    tags: '',
    segments: ''
  });

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddContact = () => {
    if (!newContact.email.trim() || !newContact.firstName.trim()) {
      toast({
        title: "Missing Information",
        description: "First name and email are required fields.",
        variant: "destructive",
      });
      return;
    }

    const contact: Contact = {
      id: Date.now(),
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      email: newContact.email,
      phone: newContact.phone,
      location: newContact.location,
      status: 'subscribed',
      tags: newContact.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      segments: newContact.segments.split(',').map(seg => seg.trim()).filter(seg => seg),
      signupDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      openRate: '0%',
      clickRate: '0%',
      source: 'Manual Import'
    };

    setContacts([...contacts, contact]);
    setNewContact({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      tags: '',
      segments: ''
    });
    setIsAddingContact(false);

    toast({
      title: "Contact Added Successfully",
      description: `${contact.firstName} ${contact.lastName} has been added to your audience.`,
    });
  };

  const handleEditContact = (contact: Contact) => {
    const updatedContacts = contacts.map(c =>
      c.id === contact.id ? contact : c
    );
    setContacts(updatedContacts);
    setIsEditingContact(null);

    toast({
      title: "Contact Updated",
      description: `${contact.firstName} ${contact.lastName} has been updated successfully.`,
    });
  };

  const handleDeleteContact = (contactId: number) => {
    const contact = contacts.find(c => c.id === contactId);
    setContacts(contacts.filter(c => c.id !== contactId));
    
    toast({
      title: "Contact Deleted",
      description: `${contact?.firstName} ${contact?.lastName} has been removed from your audience.`,
    });
  };

  const handleBulkAction = (action: string) => {
    const selectedContactsData = contacts.filter(c => selectedContacts.includes(c.id));
    
    switch (action) {
      case 'delete':
        setContacts(contacts.filter(c => !selectedContacts.includes(c.id)));
        toast({
          title: "Bulk Delete Complete",
          description: `${selectedContacts.length} contacts have been deleted.`,
        });
        break;
      case 'add-tag':
        const tag = prompt('Enter tag name:');
        if (tag) {
          const updatedContacts = contacts.map(c =>
            selectedContacts.includes(c.id) 
              ? { ...c, tags: [...c.tags, tag] }
              : c
          );
          setContacts(updatedContacts);
          toast({
            title: "Tag Added",
            description: `Tag "${tag}" added to ${selectedContacts.length} contacts.`,
          });
        }
        break;
      case 'unsubscribe':
        const updatedContacts = contacts.map(c =>
          selectedContacts.includes(c.id)
            ? { ...c, status: 'unsubscribed' as const }
            : c
        );
        setContacts(updatedContacts);
        toast({
          title: "Contacts Unsubscribed",
          description: `${selectedContacts.length} contacts have been unsubscribed.`,
        });
        break;
    }
    setSelectedContacts([]);
  };

  const handleExportContacts = () => {
    const csvContent = [
      'First Name,Last Name,Email,Phone,Location,Status,Tags,Segments,Signup Date,Last Activity',
      ...filteredContacts.map(contact => 
        `"${contact.firstName}","${contact.lastName}","${contact.email}","${contact.phone || ''}","${contact.location || ''}","${contact.status}","${contact.tags.join(';')}","${contact.segments.join(';')}","${contact.signupDate}","${contact.lastActivity}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contacts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast({
      title: "Export Complete",
      description: `${filteredContacts.length} contacts exported to CSV.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'subscribed': return 'bg-green-100 text-green-800';
      case 'unsubscribed': return 'bg-red-100 text-red-800';
      case 'bounced': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const contactStats = {
    total: contacts.length,
    subscribed: contacts.filter(c => c.status === 'subscribed').length,
    unsubscribed: contacts.filter(c => c.status === 'unsubscribed').length,
    bounced: contacts.filter(c => c.status === 'bounced').length,
    avgOpenRate: contacts.reduce((acc, c) => acc + parseFloat(c.openRate || '0'), 0) / contacts.length || 0,
    avgClickRate: contacts.reduce((acc, c) => acc + parseFloat(c.clickRate || '0'), 0) / contacts.length || 0
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Manager</h1>
          <p className="text-gray-600">Manage your audience with advanced segmentation and personalization tools</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button variant="outline" onClick={handleExportContacts}>
            <Download className="h-4 w-4 mr-2" />
            Export Contacts
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Button>
          <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={newContact.firstName}
                      onChange={(e) => setNewContact({...newContact, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={newContact.lastName}
                      onChange={(e) => setNewContact({...newContact, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newContact.location}
                    onChange={(e) => setNewContact({...newContact, location: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newContact.tags}
                    onChange={(e) => setNewContact({...newContact, tags: e.target.value})}
                    placeholder="VIP, Newsletter, Customer"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingContact(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddContact}>
                    Add Contact
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{contactStats.total}</div>
            <div className="text-sm text-gray-600">Total Contacts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{contactStats.subscribed}</div>
            <div className="text-sm text-gray-600">Subscribed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{contactStats.unsubscribed}</div>
            <div className="text-sm text-gray-600">Unsubscribed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{contactStats.bounced}</div>
            <div className="text-sm text-gray-600">Bounced</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{contactStats.avgOpenRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Avg Open Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{contactStats.avgClickRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Avg Click Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search contacts by name, email, or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status ({contactStats.total})</SelectItem>
            <SelectItem value="subscribed">Subscribed ({contactStats.subscribed})</SelectItem>
            <SelectItem value="unsubscribed">Unsubscribed ({contactStats.unsubscribed})</SelectItem>
            <SelectItem value="bounced">Bounced ({contactStats.bounced})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedContacts.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedContacts.length} contact{selectedContacts.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('add-tag')}>
                  <Tag className="h-4 w-4 mr-1" />
                  Add Tag
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('unsubscribe')}>
                  <UserPlus className="h-4 w-4 mr-1" />
                  Unsubscribe
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction('delete')}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setSelectedContacts([])}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Contacts ({filteredContacts.length})
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('table')}
              >
                Table
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">
                      <Checkbox 
                        checked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedContacts(filteredContacts.map(c => c.id));
                          } else {
                            setSelectedContacts([]);
                          }
                        }}
                      />
                    </th>
                    <th className="text-left p-2">Contact</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Tags</th>
                    <th className="text-left p-2">Performance</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <Checkbox 
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedContacts([...selectedContacts, contact.id]);
                            } else {
                              setSelectedContacts(selectedContacts.filter(id => id !== contact.id));
                            }
                          }}
                        />
                      </td>
                      <td className="p-2">
                        <div>
                          <div className="font-medium">{contact.firstName} {contact.lastName}</div>
                          <div className="text-sm text-gray-600">{contact.email}</div>
                          {contact.phone && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {contact.phone}
                            </div>
                          )}
                          {contact.location && (
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {contact.location}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                      </td>
                      <td className="p-2">
                        <div className="flex flex-wrap gap-1">
                          {contact.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {contact.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{contact.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-sm">
                          <div>Opens: {contact.openRate}</div>
                          <div>Clicks: {contact.clickRate}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditingContact(contact)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Contact Profile",
                                description: `Viewing detailed profile for ${contact.firstName} ${contact.lastName}`,
                              });
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteContact(contact.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{contact.firstName} {contact.lastName}</h3>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                      </div>
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                    </div>
                    
                    {contact.phone && (
                      <div className="text-sm text-gray-500 flex items-center mb-1">
                        <Phone className="h-3 w-3 mr-1" />
                        {contact.phone}
                      </div>
                    )}
                    
                    {contact.location && (
                      <div className="text-sm text-gray-500 flex items-center mb-3">
                        <MapPin className="h-3 w-3 mr-1" />
                        {contact.location}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 mb-3">
                      {contact.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-sm text-gray-600 mb-3">
                      <div>Opens: {contact.openRate} | Clicks: {contact.clickRate}</div>
                      <div>Source: {contact.source}</div>
                    </div>

                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingContact(contact)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Contact Profile",
                            description: `Viewing detailed profile for ${contact.firstName} ${contact.lastName}`,
                          });
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Contact Dialog */}
      {isEditingContact && (
        <Dialog open={true} onOpenChange={() => setIsEditingContact(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editFirstName">First Name</Label>
                  <Input
                    id="editFirstName"
                    value={isEditingContact.firstName}
                    onChange={(e) => setIsEditingContact({...isEditingContact, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="editLastName">Last Name</Label>
                  <Input
                    id="editLastName"
                    value={isEditingContact.lastName}
                    onChange={(e) => setIsEditingContact({...isEditingContact, lastName: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={isEditingContact.email}
                  onChange={(e) => setIsEditingContact({...isEditingContact, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editPhone">Phone</Label>
                <Input
                  id="editPhone"
                  value={isEditingContact.phone || ''}
                  onChange={(e) => setIsEditingContact({...isEditingContact, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editLocation">Location</Label>
                <Input
                  id="editLocation"
                  value={isEditingContact.location || ''}
                  onChange={(e) => setIsEditingContact({...isEditingContact, location: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editStatus">Status</Label>
                <Select 
                  value={isEditingContact.status} 
                  onValueChange={(value: any) => setIsEditingContact({...isEditingContact, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subscribed">Subscribed</SelectItem>
                    <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                    <SelectItem value="bounced">Bounced</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editTags">Tags (comma separated)</Label>
                <Input
                  id="editTags"
                  value={isEditingContact.tags.join(', ')}
                  onChange={(e) => setIsEditingContact({
                    ...isEditingContact, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                  })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditingContact(null)}>
                  Cancel
                </Button>
                <Button onClick={() => handleEditContact(isEditingContact)}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};