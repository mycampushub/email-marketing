import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { 
  MessageSquare, Plus, Search, Send, Calendar, 
  Clock, TrendingUp, DollarSign, Users, Eye,
  Edit, Trash2, Copy, Pause, Play
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';

export const SMSPage: React.FC = () => {
  const { smsCampaigns, contacts, addSmsCampaign, updateSmsCampaign, deleteSmsCampaign } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    content: '',
    audience: 'all',
  });
  const { toast } = useToast();

  const handleViewCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsViewOpen(true);
  };

  const handleEditCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setNewCampaign({
      name: campaign.name,
      content: campaign.content,
      audience: 'all',
    });
    setIsEditOpen(true);
  };

  const handleUpdateCampaign = () => {
    if (selectedCampaign && newCampaign.name && newCampaign.content) {
      updateSmsCampaign(selectedCampaign.id, {
        name: newCampaign.name,
        content: newCampaign.content,
      });
      setIsEditOpen(false);
      setSelectedCampaign(null);
      setNewCampaign({ name: '', content: '', audience: 'all' });
    }
  };

  const handleSendCampaign = (campaign: any) => {
    updateSmsCampaign(campaign.id, { status: 'Sent' });
    toast({ title: "Campaign Sent", description: `${campaign.name} has been sent to ${campaign.recipients} recipients.` });
  };

  const handleCreate = () => {
    if (!newCampaign.name) {
      toast({
        title: "Name Required",
        description: "Please enter a campaign name.",
        variant: "destructive"
      });
      return;
    }

    if (!newCampaign.content) {
      toast({
        title: "Content Required",
        description: "Please enter your SMS message.",
        variant: "destructive"
      });
      return;
    }

    if (newCampaign.content.length > 160) {
      toast({
        title: "Message Too Long",
        description: "SMS messages must be 160 characters or less.",
        variant: "destructive"
      });
      return;
    }

    addSmsCampaign({
      name: newCampaign.name,
      content: newCampaign.content,
      status: 'Draft',
      recipients: 0,
      delivered: 0,
      clicks: 0,
      revenue: 0,
      sent: null,
      created: new Date().toISOString().split('T')[0],
    });
    setNewCampaign({ name: '', content: '', audience: 'all' });
    setIsCreateOpen(false);
    toast({
      title: "Campaign Created",
      description: "Your SMS campaign has been created successfully.",
    });
  };

  const totalSent = smsCampaigns.filter(c => c.status === 'Sent').reduce((acc, c) => acc + c.delivered, 0);
  const totalClicks = smsCampaigns.filter(c => c.status === 'Sent').reduce((acc, c) => acc + c.clicks, 0);
  const avgClicks = totalSent > 0 ? ((totalClicks / totalSent) * 100).toFixed(1) : '0';
  const totalRevenue = smsCampaigns.reduce((acc, c) => acc + c.revenue, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SMS Campaigns</h1>
          <p className="text-muted-foreground">Create and manage SMS marketing campaigns</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create SMS Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sent</p>
                <p className="text-2xl font-bold">{totalSent.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Click Rate</p>
                <p className="text-2xl font-bold">{avgClicks}%</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Campaigns</p>
                <p className="text-2xl font-bold">{smsCampaigns.length}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All SMS Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Content</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Delivered</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {smsCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{campaign.content}</TableCell>
                  <TableCell>
                    <Badge variant={
                      campaign.status === 'Sent' ? 'default' :
                      campaign.status === 'Scheduled' ? 'secondary' : 'outline'
                    }>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.recipients}</TableCell>
                  <TableCell>{campaign.delivered}</TableCell>
                  <TableCell>{campaign.clicks}</TableCell>
                  <TableCell>${campaign.revenue}</TableCell>
                  <TableCell>{campaign.sent || campaign.scheduledAt || '-'}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={() => toast({ title: "View Campaign", description: `Opening details for ${campaign.name}` })}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toast({ title: "Edit Campaign", description: `Opening editor for ${campaign.name}` })}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => {
                        deleteSmsCampaign(campaign.id);
                        toast({ title: "Campaign Deleted", description: "SMS campaign has been removed." });
                      }}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create SMS Campaign</DialogTitle>
            <DialogDescription>
              Create a new SMS marketing campaign to reach your audience
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Campaign Name</Label>
              <Input 
                placeholder="e.g., Flash Sale Alert"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
              />
            </div>
            <div>
              <Label>Message Content</Label>
              <Textarea
                placeholder="Enter your SMS message..."
                value={newCampaign.content}
                onChange={(e) => setNewCampaign({...newCampaign, content: e.target.value})}
                maxLength={160}
                className="min-h-24"
              />
              <p className={`text-sm mt-1 ${newCampaign.content.length > 160 ? 'text-red-600 font-semibold' : 'text-muted-foreground'}`}>
                {newCampaign.content.length}/160 characters
                {newCampaign.content.length > 160 && ' (Too long!)'}
              </p>
            </div>
            <div>
              <Label>Audience</Label>
              <Select value={newCampaign.audience} onValueChange={(v) => setNewCampaign({...newCampaign, audience: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subscribers ({contacts.filter(c => c.status === 'Subscribed').length})</SelectItem>
                  <SelectItem value="vip">VIP Customers</SelectItem>
                  <SelectItem value="recent">Recent Buyers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Campaign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};
