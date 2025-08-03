
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Users, Calendar, Send, Edit, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EmailEditor } from '@/components/EmailEditor';
import { TemplateSelector } from '@/components/TemplateSelector';
import { useAppContext } from '@/contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export const CreateCampaignPage: React.FC = () => {
  const [campaignData, setCampaignData] = useState({
    name: '',
    subject: '',
    fromName: '',
    fromEmail: '',
    audience: '',
    content: '',
    previewText: ''
  });
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const { toast } = useToast();
  const { addCampaign } = useAppContext();
  const navigate = useNavigate();

  const handleSave = () => {
    if (!campaignData.name || !campaignData.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in campaign name and subject line.",
        variant: "destructive"
      });
      return;
    }

    const newCampaign = {
      name: campaignData.name,
      subject: campaignData.subject,
      status: 'Draft' as const,
      type: 'Regular' as const,
      sent: null,
      recipients: 0,
      openRate: '-',
      clickRate: '-',
      bounceRate: '-',
      unsubscribeRate: '-',
      revenue: '-',
      previewText: campaignData.previewText,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      tags: [],
      segment: campaignData.audience || 'All Subscribers'
    };

    addCampaign(newCampaign);
    
    toast({
      title: "Campaign Saved",
      description: "Your campaign has been saved as a draft.",
    });
    
    navigate('/campaigns');
  };

  const handleSend = () => {
    if (!campaignData.name || !campaignData.subject || !campaignData.content) {
      toast({
        title: "Campaign Incomplete",
        description: "Please complete all required fields before sending.",
        variant: "destructive"
      });
      return;
    }

    const newCampaign = {
      name: campaignData.name,
      subject: campaignData.subject,
      status: 'Sending' as const,
      type: 'Regular' as const,
      sent: new Date().toISOString().split('T')[0],
      recipients: 1234, // This would be calculated based on selected audience
      openRate: '-',
      clickRate: '-',
      bounceRate: '-',
      unsubscribeRate: '-',
      revenue: '-',
      previewText: campaignData.previewText,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      tags: [],
      segment: campaignData.audience || 'All Subscribers'
    };

    addCampaign(newCampaign);
    
    toast({
      title: "Campaign Sending",
      description: "Your campaign is being sent to your audience.",
    });
    
    navigate('/campaigns');
  };

  const handleTemplateSelect = (template: any) => {
    setCampaignData(prev => ({
      ...prev,
      content: template.htmlContent,
      name: prev.name || template.name,
      subject: prev.subject || `${template.name} Campaign`
    }));
    
    toast({
      title: "Template Applied",
      description: `${template.name} template has been applied to your campaign.`,
    });
  };

  const handleContentSave = (content: string) => {
    setCampaignData(prev => ({ ...prev, content }));
    toast({
      title: "Content Saved",
      description: "Your email content has been updated.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Email Campaign</h1>
        <p className="text-gray-600">Design and send beautiful email campaigns to your audience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card data-voice-context="Campaign setup form - configure your email details">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Campaign Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="Enter campaign name"
                  value={campaignData.name}
                  onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                  data-voice-context="Name your campaign for internal reference"
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject line"
                  value={campaignData.subject}
                  onChange={(e) => setCampaignData({...campaignData, subject: e.target.value})}
                  data-voice-context="Write a compelling subject line to increase open rates"
                />
              </div>

              <div>
                <Label htmlFor="previewText">Preview Text</Label>
                <Input
                  id="previewText"
                  placeholder="Enter preview text that appears after subject line"
                  value={campaignData.previewText}
                  onChange={(e) => setCampaignData({...campaignData, previewText: e.target.value})}
                  data-voice-context="Add preview text to complement your subject line"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    placeholder="Your Name"
                    value={campaignData.fromName}
                    onChange={(e) => setCampaignData({...campaignData, fromName: e.target.value})}
                    data-voice-context="Set the sender name that recipients will see"
                  />
                </div>
                <div>
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    placeholder="your@email.com"
                    value={campaignData.fromEmail}
                    onChange={(e) => setCampaignData({...campaignData, fromEmail: e.target.value})}
                    data-voice-context="Set the sender email address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-voice-context="Email content editor - design your email message">
            <CardHeader>
              <CardTitle>Email Content</CardTitle>
              <CardDescription>Design your email message</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your email content here or use templates and editor..."
                className="min-h-64"
                value={campaignData.content}
                onChange={(e) => setCampaignData({...campaignData, content: e.target.value})}
                data-voice-context="Write your email content or use the drag-and-drop editor"
              />
              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditorOpen(true)}
                  data-voice-context="Switch to visual drag-and-drop editor"
                  data-voice-action="Opening email editor"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Use Editor
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsTemplateOpen(true)}
                  data-voice-context="Choose from pre-designed email templates"
                  data-voice-action="Opening template gallery"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Templates
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsPreviewOpen(true)}
                  disabled={!campaignData.content}
                  data-voice-context="Preview your email as recipients will see it"
                  data-voice-action="Opening email preview"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card data-voice-context="Audience selection - choose who receives this campaign">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Audience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={campaignData.audience} onValueChange={(value) => setCampaignData({...campaignData, audience: value})}>
                <SelectTrigger data-voice-context="Select which audience segment to send to">
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subscribers (1,234)</SelectItem>
                  <SelectItem value="segment1">New Subscribers (245)</SelectItem>
                  <SelectItem value="segment2">Active Users (890)</SelectItem>
                  <SelectItem value="segment3">VIP Customers (99)</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card data-voice-context="Scheduling options - set when to send your campaign">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" data-voice-context="Send campaign immediately">
                <Send className="h-4 w-4 mr-2" />
                Send Now
              </Button>
              <Button variant="outline" className="w-full justify-start" data-voice-context="Schedule campaign for later">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Send
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Button 
              onClick={handleSave} 
              variant="outline" 
              className="w-full"
              data-voice-context="Save campaign as draft"
              data-voice-action="Saving campaign draft"
            >
              Save Draft
            </Button>
            <Button 
              onClick={handleSend} 
              className="w-full"
              data-voice-context="Send campaign to selected audience"
              data-voice-action="Sending campaign"
            >
              Send Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Email Editor Modal */}
      <EmailEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        initialContent={campaignData.content}
        onSave={handleContentSave}
      />

      {/* Template Selector Modal */}
      <TemplateSelector
        isOpen={isTemplateOpen}
        onClose={() => setIsTemplateOpen(false)}
        onSelectTemplate={handleTemplateSelect}
      />

      {/* Email Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Email Preview</h2>
                <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                  Close Preview
                </Button>
              </div>
              <p className="text-gray-600 mt-2">Subject: {campaignData.subject || 'No subject'}</p>
              {campaignData.previewText && (
                <p className="text-sm text-gray-500">Preview: {campaignData.previewText}</p>
              )}
            </div>
            <div className="p-6">
              <div className="max-w-2xl mx-auto bg-white border shadow-lg">
                {campaignData.content ? (
                  <div dangerouslySetInnerHTML={{ __html: campaignData.content }} />
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No content to preview. Add content using the editor or templates.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
