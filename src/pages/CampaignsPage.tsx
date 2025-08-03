
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { useAppContext } from '@/contexts/AppContext';
import { 
  Plus, Search, Filter, Mail, Calendar, Users, TrendingUp, 
  Edit, Trash2, Play, Pause, Copy, BarChart3, Target,
  Clock, Eye, MousePointer, DollarSign, Send, TestTube
} from 'lucide-react';

interface Campaign {
  id: number;
  name: string;
  status: 'Draft' | 'Sent' | 'Scheduled' | 'Sending' | 'A/B Testing';
  type: 'Regular' | 'A/B Test' | 'Automation' | 'RSS' | 'Welcome Series';
  sent: string | null;
  recipients: number;
  openRate: string;
  clickRate: string;
  bounceRate: string;
  unsubscribeRate: string;
  revenue: string;
  subject: string;
  previewText: string;
  created: string;
  lastModified: string;
  tags: string[];
  segment: string;
  abTestProgress?: number;
}

export const CampaignsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastModified');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  const { campaigns, addCampaign, updateCampaign, deleteCampaign } = useAppContext();
  // Data is now coming from context

  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = selectedFilter === 'all' || campaign.status.toLowerCase().replace(' ', '').includes(selectedFilter.toLowerCase());
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'openRate':
          return parseFloat(b.openRate) - parseFloat(a.openRate);
        case 'recipients':
          return b.recipients - a.recipients;
        default:
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      }
    });

  // Campaign statistics
  const campaignStats = {
    total: campaigns.length,
    sent: campaigns.filter(c => c.status === 'Sent').length,
    scheduled: campaigns.filter(c => c.status === 'Scheduled').length,
    drafts: campaigns.filter(c => c.status === 'Draft').length,
    testing: campaigns.filter(c => c.status === 'A/B Testing').length,
    avgOpenRate: campaigns.filter(c => c.openRate !== '-').reduce((acc, c) => acc + parseFloat(c.openRate), 0) / campaigns.filter(c => c.openRate !== '-').length || 0,
    totalRevenue: campaigns.filter(c => c.revenue !== '-').reduce((acc, c) => acc + parseFloat(c.revenue.replace('$', '').replace(',', '')), 0)
  };

  const handleCreateCampaign = () => {
    toast({
      title: "Campaign Builder Loading",
      description: "Opening drag-and-drop email builder with templates...",
    });
    navigate('/campaigns/create');
  };

  const handleEditCampaign = (campaign: Campaign) => {
    toast({
      title: "Opening Campaign Editor",
      description: `Editing "${campaign.name}" with full design capabilities`,
    });
    console.log('Editing campaign:', campaign);
  };

  const handleDuplicateCampaign = (campaign: any) => {
    const newCampaign = {
      ...campaign,
      name: `${campaign.name} (Copy)`,
      status: 'Draft' as const,
      sent: null,
      recipients: 0,
      openRate: '-',
      clickRate: '-',
      bounceRate: '-',
      unsubscribeRate: '-',
      revenue: '-',
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    
    addCampaign(newCampaign);
    toast({
      title: "Campaign Duplicated Successfully",
      description: `Created "${newCampaign.name}" ready for editing`,
    });
  };

  const handleDeleteCampaign = (campaignId: number) => {
    deleteCampaign(campaignId);
    toast({
      title: "Campaign Deleted",
      description: "Campaign and all associated data permanently removed.",
    });
  };

  const handleSendCampaign = (campaign: any) => {
    updateCampaign(campaign.id, { 
      status: 'Sending' as const, 
      sent: new Date().toISOString().split('T')[0] 
    });
    toast({
      title: "Campaign Sending Started",
      description: `"${campaign.name}" is being delivered to ${campaign.recipients || 'selected'} recipients with real-time tracking.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-800 border-green-200';
      case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Sending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'A/B Testing': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'A/B Test': return TestTube;
      case 'Automation': return Target;
      case 'Welcome Series': return Users;
      case 'RSS': return TrendingUp;
      default: return Mail;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
        <div>
          <h1 
            className="text-3xl font-bold text-gray-900 mb-2"
            data-voice-context="Email Campaigns management center where you create, manage, and track all your email marketing campaigns including regular emails, A/B tests, automated sequences, and RSS campaigns"
          >
            Email Campaigns
          </h1>
          <p 
            className="text-gray-600"
            data-voice-context="Comprehensive campaign management with drag-and-drop editor, template library, A/B testing, automation, performance tracking, and revenue attribution"
          >
            Create, manage, and track email campaigns with advanced features and analytics
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button 
            variant="outline"
            onClick={() => navigate('/campaigns/templates')}
            data-voice-context="Browse professionally designed email templates for newsletters, promotions, announcements, and seasonal campaigns with industry-specific layouts"
            data-voice-action="Opening template library with hundreds of professional designs"
          >
            <Mail className="h-4 w-4 mr-2" />
            Browse Templates
          </Button>
          <Button 
            onClick={handleCreateCampaign}
            className="bg-purple-600 hover:bg-purple-700"
            data-voice-context="Create new email campaign using drag-and-drop builder with personalization, dynamic content, A/B testing, and advanced scheduling options"
            data-voice-action="Launching campaign creation wizard with full design capabilities"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </div>

      {/* Campaign Statistics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <Card 
          data-voice-context={`Total campaigns: ${campaignStats.total} including all types and statuses across your entire email marketing account`}
        >
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{campaignStats.total}</div>
            <div className="text-sm text-gray-600">Total Campaigns</div>
          </CardContent>
        </Card>
        <Card 
          data-voice-context={`Successfully sent campaigns: ${campaignStats.sent} with complete delivery and performance tracking available`}
        >
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{campaignStats.sent}</div>
            <div className="text-sm text-gray-600">Sent</div>
          </CardContent>
        </Card>
        <Card 
          data-voice-context={`Scheduled campaigns: ${campaignStats.scheduled} ready for future delivery with optimal send time features`}
        >
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{campaignStats.scheduled}</div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </CardContent>
        </Card>
        <Card 
          data-voice-context={`Draft campaigns: ${campaignStats.drafts} in progress, ready for editing, testing, and scheduling`}
        >
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{campaignStats.drafts}</div>
            <div className="text-sm text-gray-600">Drafts</div>
          </CardContent>
        </Card>
        <Card 
          data-voice-context={`Average open rate: ${campaignStats.avgOpenRate.toFixed(1)}% across all sent campaigns, indicating strong subject line performance and audience engagement`}
        >
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{campaignStats.avgOpenRate.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Avg Open Rate</div>
          </CardContent>
        </Card>
        <Card 
          data-voice-context={`Total revenue generated: $${campaignStats.totalRevenue.toLocaleString()} from email campaigns through e-commerce tracking and conversion attribution`}
        >
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">${campaignStats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search campaigns, subjects, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
            data-voice-context="Search through all campaigns by name, subject line, content, tags, or recipient segments with real-time filtering"
            data-voice-action="Typing will instantly filter visible campaigns"
          />
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger 
            className="w-48"
            data-voice-context="Sort campaigns by date, name, performance metrics, or recipient count to organize your campaign list"
          >
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastModified">Last Modified</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="openRate">Open Rate</SelectItem>
            <SelectItem value="recipients">Recipients</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline"
          data-voice-context="Advanced filtering options including date ranges, performance thresholds, audience segments, campaign types, and custom field filters"
          data-voice-action="Opening comprehensive filter panel with multiple criteria options"
        >
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* Campaign Tabs and Content */}
      <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
          <TabsTrigger 
            value="all" 
            data-voice-context="View all campaigns regardless of status including drafts, sent, scheduled, and A/B tests with comprehensive overview"
            data-voice-action="Showing all campaigns in your account"
          >
            All ({campaignStats.total})
          </TabsTrigger>
          <TabsTrigger 
            value="draft" 
            data-voice-context="View only draft campaigns that are being created or edited, ready for content development and audience selection"
            data-voice-action="Filtering to show draft campaigns only"
          >
            Drafts ({campaignStats.drafts})
          </TabsTrigger>
          <TabsTrigger 
            value="scheduled" 
            data-voice-context="View campaigns scheduled for future delivery with optimal send time features and automation triggers"
            data-voice-action="Showing scheduled campaigns with delivery dates"
          >
            Scheduled ({campaignStats.scheduled})
          </TabsTrigger>
          <TabsTrigger 
            value="sent" 
            data-voice-context="View successfully delivered campaigns with complete performance metrics including opens, clicks, revenue, and engagement data"
            data-voice-action="Displaying sent campaigns with full analytics"
          >
            Sent ({campaignStats.sent})
          </TabsTrigger>
          <TabsTrigger 
            value="abtesting" 
            data-voice-context="View active A/B tests comparing subject lines, content, send times, or sender names with statistical significance tracking"
            data-voice-action="Showing A/B testing campaigns with progress"
          >
            A/B Tests ({campaignStats.testing})
          </TabsTrigger>
          <TabsTrigger 
            value="automation" 
            data-voice-context="View automated campaigns including welcome series, abandoned cart recovery, behavioral triggers, and date-based automations"
            data-voice-action="Filtering to show automation campaigns"
          >
            Automation
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedFilter} className="space-y-4">
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No campaigns found' : 'No campaigns yet'}
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters to find campaigns' 
                  : 'Create your first email campaign with our drag-and-drop editor and professional templates'
                }
              </p>
              {!searchTerm && (
                <Button 
                  onClick={handleCreateCampaign} 
                  size="lg"
                  data-voice-context="Create your very first email campaign with guided setup, template selection, and audience targeting"
                  data-voice-action="Starting campaign creation process"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Campaign
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => {
                const TypeIcon = getTypeIcon(campaign.type);
                return (
                  <Card key={campaign.id} className="hover:shadow-lg transition-all duration-200 border hover:border-purple-200">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        {/* Campaign Info */}
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="bg-purple-100 p-3 rounded-xl">
                            <TypeIcon className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                              <h3 
                                className="font-semibold text-lg text-gray-900"
                                data-voice-context={`Campaign: ${campaign.name}, type: ${campaign.type}, status: ${campaign.status}`}
                              >
                                {campaign.name}
                              </h3>
                              <Badge className={`${getStatusColor(campaign.status)} border`}>
                                {campaign.status}
                              </Badge>
                              <Badge variant="outline">{campaign.type}</Badge>
                              {campaign.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="space-y-2">
                              <p 
                                className="text-sm text-gray-700 font-medium"
                                data-voice-context={`Subject line: ${campaign.subject}`}
                              >
                                <strong>Subject:</strong> {campaign.subject}
                              </p>
                              <p 
                                className="text-sm text-gray-600"
                                data-voice-context={`Preview text: ${campaign.previewText}`}
                              >
                                <strong>Preview:</strong> {campaign.previewText}
                              </p>
                            </div>

                            {/* A/B Test Progress */}
                            {campaign.status === 'A/B Testing' && campaign.abTestProgress && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-700">A/B Test Progress</span>
                                  <span className="text-sm text-gray-600">{campaign.abTestProgress}%</span>
                                </div>
                                <Progress value={campaign.abTestProgress} className="h-2" />
                              </div>
                            )}
                            
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                              {campaign.sent && (
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {campaign.status === 'Scheduled' ? `Scheduled: ${campaign.sent}` : `Sent: ${campaign.sent}`}
                                </div>
                              )}
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {campaign.recipients > 0 ? `${campaign.recipients.toLocaleString()} recipients` : 'Audience not selected'}
                              </div>
                              <div className="flex items-center">
                                <Target className="h-4 w-4 mr-1" />
                                {campaign.segment}
                              </div>
                              <span>Modified: {campaign.lastModified}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Performance Metrics */}
                        {campaign.status === 'Sent' && (
                          <div className="flex flex-wrap gap-6 text-sm lg:min-w-0 lg:w-80">
                            <div 
                              className="text-center"
                              data-voice-context={`Open rate: ${campaign.openRate} indicating how many recipients opened this email`}
                            >
                              <div className="flex items-center justify-center mb-1">
                                <Eye className="h-4 w-4 mr-1 text-green-600" />
                                <div className="font-semibold text-green-600">{campaign.openRate}</div>
                              </div>
                              <div className="text-gray-600">Opens</div>
                            </div>
                            <div 
                              className="text-center"
                              data-voice-context={`Click rate: ${campaign.clickRate} showing engagement with email content and call-to-action buttons`}
                            >
                              <div className="flex items-center justify-center mb-1">
                                <MousePointer className="h-4 w-4 mr-1 text-blue-600" />
                                <div className="font-semibold text-blue-600">{campaign.clickRate}</div>
                              </div>
                              <div className="text-gray-600">Clicks</div>
                            </div>
                            <div 
                              className="text-center"
                              data-voice-context={`Revenue generated: ${campaign.revenue} from this campaign through tracked conversions and e-commerce integration`}
                            >
                              <div className="flex items-center justify-center mb-1">
                                <DollarSign className="h-4 w-4 mr-1 text-emerald-600" />
                                <div className="font-semibold text-emerald-600">{campaign.revenue}</div>
                              </div>
                              <div className="text-gray-600">Revenue</div>
                            </div>
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 lg:min-w-0">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditCampaign(campaign)}
                            data-voice-context={`Edit ${campaign.name} campaign content, design, audience selection, and delivery settings using the drag-and-drop editor`}
                            data-voice-action={`Opening comprehensive editor for ${campaign.name}`}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDuplicateCampaign(campaign)}
                            data-voice-context={`Create an exact copy of ${campaign.name} to use as a template for new campaigns with same design and settings`}
                            data-voice-action={`Duplicating ${campaign.name} campaign as new draft`}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Duplicate
                          </Button>

                          {campaign.status === 'Sent' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              data-voice-context={`View detailed analytics for ${campaign.name} including click maps, subscriber activity, revenue attribution, and comparative performance`}
                              data-voice-action={`Opening detailed analytics dashboard for ${campaign.name}`}
                            >
                              <BarChart3 className="h-4 w-4 mr-1" />
                              Analytics
                            </Button>
                          )}
                          
                          {campaign.status === 'Draft' && (
                            <Button 
                              size="sm"
                              onClick={() => handleSendCampaign(campaign)}
                              disabled={campaign.recipients === 0}
                              data-voice-context={`Send ${campaign.name} campaign immediately to selected audience with real-time delivery tracking and performance monitoring`}
                              data-voice-action={`Initiating immediate send for ${campaign.name}`}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send Now
                            </Button>
                          )}

                          {campaign.status === 'Scheduled' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              data-voice-context={`Pause scheduled delivery for ${campaign.name} to make additional changes or reschedule for different time`}
                              data-voice-action={`Pausing scheduled campaign ${campaign.name}`}
                            >
                              <Pause className="h-4 w-4 mr-1" />
                              Pause
                            </Button>
                          )}
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                data-voice-context={`Delete ${campaign.name} permanently - this action cannot be undone and will remove all campaign data and analytics`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Campaign</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to permanently delete "{campaign.name}"? 
                                  This will remove all campaign data, analytics, and cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end space-x-2 mt-6">
                                <Button variant="outline">Cancel</Button>
                                <Button 
                                  variant="destructive" 
                                  onClick={() => handleDeleteCampaign(campaign.id)}
                                  data-voice-context="Confirm permanent deletion of this campaign and all associated data"
                                  data-voice-action="Campaign will be permanently deleted with all data"
                                >
                                  Delete Permanently
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
