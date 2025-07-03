
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Mail, BarChart3, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const TransactionalEmailPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingEmail, setEditingEmail] = useState<any>(null);
  const [newEmail, setNewEmail] = useState({
    name: '',
    subject: '',
    type: '',
    status: 'active'
  });
  const { toast } = useToast();

  const [transactionalEmails, setTransactionalEmails] = useState([
    {
      id: 1,
      name: 'Welcome Email',
      subject: 'Welcome to our platform!',
      type: 'Welcome',
      status: 'Active',
      sent: 1245,
      delivered: 1232,
      opens: 892,
      clicks: 156,
      deliveryRate: '99.0%',
      openRate: '72.4%',
      clickRate: '17.5%',
      created: '2024-01-15'
    },
    {
      id: 2,
      name: 'Order Confirmation',
      subject: 'Your order has been confirmed',
      type: 'Order Confirmation',
      status: 'Active',
      sent: 2341,
      delivered: 2338,
      opens: 2156,
      clicks: 567,
      deliveryRate: '99.9%',
      openRate: '92.2%',
      clickRate: '26.3%',
      created: '2024-01-10'
    },
    {
      id: 3,
      name: 'Password Reset',
      subject: 'Reset your password',
      type: 'Password Reset',
      status: 'Active',
      sent: 456,
      delivered: 453,
      opens: 398,
      clicks: 234,
      deliveryRate: '99.3%',
      openRate: '87.8%',
      clickRate: '58.8%',
      created: '2024-01-05'
    }
  ]);

  const filteredEmails = transactionalEmails.filter(email =>
    email.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    email.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEmail = () => {
    if (!newEmail.name.trim() || !newEmail.subject.trim()) {
      toast({
        title: "Error",
        description: "Email name and subject are required",
        variant: "destructive",
      });
      return;
    }

    const email = {
      id: Math.max(...transactionalEmails.map(e => e.id)) + 1,
      ...newEmail,
      sent: 0,
      delivered: 0,
      opens: 0,
      clicks: 0,
      deliveryRate: '0%',
      openRate: '0%',
      clickRate: '0%',
      created: new Date().toISOString().split('T')[0]
    };

    setTransactionalEmails([...transactionalEmails, email]);
    setNewEmail({ name: '', subject: '', type: '', status: 'active' });
    setIsCreateDialogOpen(false);
    toast({
      title: "Transactional Email Created",
      description: `${email.name} has been created successfully`,
    });
  };

  const handleEditEmail = (email: any) => {
    setEditingEmail(email);
    setNewEmail({
      name: email.name,
      subject: email.subject,
      type: email.type,
      status: email.status
    });
  };

  const handleUpdateEmail = () => {
    if (!newEmail.name.trim() || !newEmail.subject.trim()) {
      toast({
        title: "Error",
        description: "Email name and subject are required",
        variant: "destructive",
      });
      return;
    }

    setTransactionalEmails(transactionalEmails.map(email =>
      email.id === editingEmail.id
        ? { ...email, ...newEmail }
        : email
    ));
    setEditingEmail(null);
    setNewEmail({ name: '', subject: '', type: '', status: 'active' });
    toast({
      title: "Email Updated",
      description: `${newEmail.name} has been updated successfully`,
    });
  };

  const handleDeleteEmail = (id: number) => {
    const email = transactionalEmails.find(e => e.id === id);
    setTransactionalEmails(transactionalEmails.filter(e => e.id !== id));
    toast({
      title: "Email Deleted",
      description: `${email?.name} has been deleted successfully`,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactional Emails</h1>
          <p className="text-gray-600">Manage automated system emails and notifications</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              data-voice-context="Create new transactional email templates for automated system notifications like welcome emails, order confirmations, password resets, and other triggered communications"
              data-voice-action="Opening transactional email creation dialog with template options and delivery settings"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Email
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Transactional Email</DialogTitle>
              <DialogDescription>
                Set up a new automated email template
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Email Name</Label>
                <Input
                  id="name"
                  value={newEmail.name}
                  onChange={(e) => setNewEmail({ ...newEmail, name: e.target.value })}
                  placeholder="Enter email name"
                  data-voice-context="Name your transactional email template for easy identification in your automation workflows"
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  value={newEmail.subject}
                  onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                  placeholder="Enter email subject"
                  data-voice-context="Write the subject line that recipients will see - make it clear and relevant to the action that triggered the email"
                />
              </div>
              <div>
                <Label htmlFor="type">Email Type</Label>
                <Select value={newEmail.type} onValueChange={(value) => setNewEmail({ ...newEmail, type: value })}>
                  <SelectTrigger data-voice-context="Select the type of transactional email to categorize and organize your automated communications">
                    <SelectValue placeholder="Select email type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Welcome">Welcome Email</SelectItem>
                    <SelectItem value="Order Confirmation">Order Confirmation</SelectItem>
                    <SelectItem value="Password Reset">Password Reset</SelectItem>
                    <SelectItem value="Account Verification">Account Verification</SelectItem>
                    <SelectItem value="Shipping Notification">Shipping Notification</SelectItem>
                    <SelectItem value="Receipt">Receipt/Invoice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleCreateEmail} className="flex-1" data-voice-context="Create this transactional email template and set up automation triggers">
                  Create Email
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} data-voice-context="Cancel email creation and close dialog">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of transactional emails sent across all templates this month">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sent</p>
                <p className="text-2xl font-bold text-gray-900">{transactionalEmails.reduce((sum, e) => sum + e.sent, 0).toLocaleString()}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Overall delivery rate showing percentage of emails successfully delivered to recipients">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
                <p className="text-2xl font-bold text-gray-900">99.4%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average open rate across all transactional email templates showing engagement levels">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
                <p className="text-2xl font-bold text-gray-900">84.1%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Number of active transactional email templates ready to send automatically">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Templates</p>
                <p className="text-2xl font-bold text-gray-900">{transactionalEmails.filter(e => e.status === 'Active').length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search transactional emails by name, subject, or type..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-voice-context="Search through your transactional email templates by name, subject line, or email type to quickly find specific automated communications"
          />
        </div>
      </div>

      {/* Email List */}
      <div className="grid gap-4">
        {filteredEmails.map((email) => (
          <Card key={email.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{email.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">Subject: {email.subject}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <Badge variant={email.status === 'Active' ? 'default' : 'secondary'}>
                        {email.status}
                      </Badge>
                      <span>Type: {email.type}</span>
                      <span>Created: {email.created}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold">{email.sent.toLocaleString()}</div>
                    <div className="text-gray-600">Sent</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{email.deliveryRate}</div>
                    <div className="text-gray-600">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{email.openRate}</div>
                    <div className="text-gray-600">Opens</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-purple-600">{email.clickRate}</div>
                    <div className="text-gray-600">Clicks</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditEmail(email)}
                          data-voice-context={`Edit ${email.name} transactional email template, subject line, content, and automation settings`}
                          data-voice-action={`Opening ${email.name} email template editor`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit Transactional Email</DialogTitle>
                          <DialogDescription>
                            Update email template settings
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="edit-name">Email Name</Label>
                            <Input
                              id="edit-name"
                              value={newEmail.name}
                              onChange={(e) => setNewEmail({ ...newEmail, name: e.target.value })}
                              data-voice-context="Update the email template name for better organization"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-subject">Subject Line</Label>
                            <Input
                              id="edit-subject"
                              value={newEmail.subject}
                              onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                              data-voice-context="Update the email subject line that recipients will see"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edit-type">Email Type</Label>
                            <Select value={newEmail.type} onValueChange={(value) => setNewEmail({ ...newEmail, type: value })}>
                              <SelectTrigger data-voice-context="Change the email type category for better organization">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Welcome">Welcome Email</SelectItem>
                                <SelectItem value="Order Confirmation">Order Confirmation</SelectItem>
                                <SelectItem value="Password Reset">Password Reset</SelectItem>
                                <SelectItem value="Account Verification">Account Verification</SelectItem>
                                <SelectItem value="Shipping Notification">Shipping Notification</SelectItem>
                                <SelectItem value="Receipt">Receipt/Invoice</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex space-x-2">
                            <Button onClick={handleUpdateEmail} className="flex-1" data-voice-context="Save changes to this transactional email template">
                              Update Email
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteEmail(email.id)}
                      data-voice-context={`Delete ${email.name} transactional email template permanently - this will stop all automated sending`}
                      data-voice-action={`Deleting ${email.name} email template`}
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
