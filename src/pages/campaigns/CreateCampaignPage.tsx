
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Users, Calendar, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CreateCampaignPage: React.FC = () => {
  const [campaignData, setCampaignData] = useState({
    name: '',
    subject: '',
    fromName: '',
    fromEmail: '',
    audience: '',
    content: ''
  });
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Campaign Saved",
      description: "Your campaign has been saved as a draft.",
    });
  };

  const handleSend = () => {
    toast({
      title: "Campaign Scheduled",
      description: "Your campaign will be sent to your audience.",
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
                placeholder="Write your email content here..."
                className="min-h-64"
                value={campaignData.content}
                onChange={(e) => setCampaignData({...campaignData, content: e.target.value})}
                data-voice-context="Write your email content or use the drag-and-drop editor"
              />
              <div className="mt-4 flex gap-2">
                <Button variant="outline" data-voice-context="Switch to visual drag-and-drop editor">
                  Use Editor
                </Button>
                <Button variant="outline" data-voice-context="Insert pre-designed email templates">
                  Templates
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
    </div>
  );
};
