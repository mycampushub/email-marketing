import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, Users, Calendar, Send, Edit, Eye, Target, TestTube, Clock, 
  Globe, Zap, BarChart3, Settings, PersonStanding, Palette, Type,
  Image, Link, Smartphone, Monitor, Tablet, Play, Pause, Save,
  Archive, Copy, Download, Upload, Filter, SplitSquareHorizontal,
  Timer, TrendingUp, MessageSquare, Star, Rocket, Brain, Shield
} from 'lucide-react';
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
    previewText: '',
    campaignType: 'regular',
    sendTimeOptimization: false,
    timezone: 'UTC',
    trackingEnabled: true,
    googleAnalytics: false,
    socialSharing: true,
    personalizeSubject: false,
    abTestEnabled: false,
    abTestSubjects: [''],
    segmentation: {
      location: '',
      engagement: '',
      purchaseHistory: '',
      demographics: ''
    },
    automation: {
      enabled: false,
      trigger: '',
      delay: 0,
      conditions: []
    },
    deliverability: {
      spamCheck: true,
      preheaderOptimized: false,
      unsubscribeLink: true,
      listCleaningEnabled: true
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');
  const [isABTestSetup, setIsABTestSetup] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [estimatedReach, setEstimatedReach] = useState(1234);
  
  const { toast } = useToast();
  const { addCampaign } = useAppContext();
  const navigate = useNavigate();

  const campaignTypes = [
    { value: 'regular', label: 'Regular Campaign', icon: Mail, desc: 'Send to your entire list or segment' },
    { value: 'abtest', label: 'A/B Test', icon: TestTube, desc: 'Test different versions to optimize performance' },
    { value: 'automation', label: 'Automated Campaign', icon: Zap, desc: 'Trigger-based email sequences' },
    { value: 'rss', label: 'RSS Campaign', icon: Globe, desc: 'Automatically send blog updates' },
    { value: 'drip', label: 'Drip Campaign', icon: Timer, desc: 'Time-based email series' }
  ];

  const audienceEstimates = {
    'all': { count: 12543, engagement: 'High', openRate: '24.5%', clickRate: '3.2%' },
    'segment1': { count: 2456, engagement: 'Very High', openRate: '31.2%', clickRate: '5.1%' },
    'segment2': { count: 8901, engagement: 'Medium', openRate: '19.8%', clickRate: '2.4%' },
    'segment3': { count: 991, engagement: 'Premium', openRate: '42.1%', clickRate: '8.3%' }
  };

  const deliverabilityScore = Math.min(100, 
    (campaignData.subject ? 25 : 0) +
    (campaignData.fromName ? 20 : 0) +
    (campaignData.content ? 30 : 0) +
    (campaignData.deliverability.spamCheck ? 15 : 0) +
    (campaignData.deliverability.unsubscribeLink ? 10 : 0)
  );

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
      type: campaignData.campaignType === 'regular' ? 'Regular' as const : 'A/B Test' as const,
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
      description: "Your campaign has been saved as a draft with all advanced settings.",
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

    // Simulate sending process
    setSendProgress(0);
    const interval = setInterval(() => {
      setSendProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const newCampaign = {
            name: campaignData.name,
            subject: campaignData.subject,
            status: 'Sent' as const,
            type: campaignData.campaignType === 'regular' ? 'Regular' as const : 'A/B Test' as const,
            sent: new Date().toISOString().split('T')[0],
            recipients: estimatedReach,
            openRate: '23.4%',
            clickRate: '3.1%',
            bounceRate: '1.2%',
            unsubscribeRate: '0.3%',
            revenue: '$2,340',
            previewText: campaignData.previewText,
            created: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0],
            tags: [],
            segment: campaignData.audience || 'All Subscribers'
          };

          addCampaign(newCampaign);
          
          toast({
            title: "Campaign Sent Successfully!",
            description: `Your campaign has been delivered to ${estimatedReach.toLocaleString()} recipients.`,
          });
          
          navigate('/campaigns');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
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
      description: `${template.name} template has been applied with professional styling.`,
    });
  };

  const handleContentSave = (content: string) => {
    setCampaignData(prev => ({ ...prev, content }));
    toast({
      title: "Content Saved",
      description: "Your email content has been updated with drag-and-drop changes.",
    });
  };

  const handleNextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const handlePrevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const selectedAudience = audienceEstimates[campaignData.audience as keyof typeof audienceEstimates];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Header with Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Campaign</h1>
            <p className="text-muted-foreground">Build professional email campaigns with enterprise features</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              Deliverability Score: {deliverabilityScore}/100
            </Badge>
            <Badge variant={deliverabilityScore > 80 ? "default" : "secondary"}>
              {deliverabilityScore > 80 ? 'Excellent' : deliverabilityScore > 60 ? 'Good' : 'Needs Work'}
            </Badge>
          </div>
        </div>
        
        {/* Campaign Creation Steps */}
        <div className="flex items-center justify-between mb-8">
          {[
            { step: 1, title: 'Setup', icon: Settings },
            { step: 2, title: 'Design', icon: Palette },
            { step: 3, title: 'Target', icon: Target },
            { step: 4, title: 'Review', icon: Eye }
          ].map(({ step, title, icon: Icon }) => (
            <div key={step} className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : 'bg-background border-border text-muted-foreground'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${currentStep >= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Step {step}
                </p>
                <p className={`text-xs ${currentStep >= step ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {title}
                </p>
              </div>
              {step < 4 && (
                <div className={`flex-1 h-0.5 ml-6 ${
                  currentStep > step ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Tabs value={`step${currentStep}`} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="step1" onClick={() => setCurrentStep(1)}>Campaign Setup</TabsTrigger>
          <TabsTrigger value="step2" onClick={() => setCurrentStep(2)}>Design & Content</TabsTrigger>
          <TabsTrigger value="step3" onClick={() => setCurrentStep(3)}>Audience & Targeting</TabsTrigger>
          <TabsTrigger value="step4" onClick={() => setCurrentStep(4)}>Review & Send</TabsTrigger>
        </TabsList>

        {/* Step 1: Campaign Setup */}
        <TabsContent value="step1" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Campaign Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Rocket className="h-5 w-5 mr-2" />
                    Campaign Type
                  </CardTitle>
                  <CardDescription>Choose the type of campaign that best fits your goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {campaignTypes.map(({ value, label, icon: Icon, desc }) => (
                      <Card 
                        key={value}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          campaignData.campaignType === value 
                            ? 'ring-2 ring-primary bg-primary/5' 
                            : 'hover:bg-accent/50'
                        }`}
                        onClick={() => setCampaignData({...campaignData, campaignType: value})}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <Icon className={`h-6 w-6 mt-0.5 ${
                              campaignData.campaignType === value ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                            <div className="flex-1">
                              <h3 className="font-medium text-sm">{label}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Basic Campaign Details */}
              <Card>
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
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject">Email Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter email subject line"
                        value={campaignData.subject}
                        onChange={(e) => setCampaignData({...campaignData, subject: e.target.value})}
                      />
                      <div className="flex items-center mt-2">
                        <Checkbox 
                          checked={campaignData.personalizeSubject}
                          onCheckedChange={(checked) => setCampaignData({...campaignData, personalizeSubject: checked as boolean})}
                        />
                        <Label className="ml-2 text-sm">Personalize with recipient name</Label>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="previewText">Preview Text</Label>
                      <Input
                        id="previewText"
                        placeholder="Enter preview text"
                        value={campaignData.previewText}
                        onChange={(e) => setCampaignData({...campaignData, previewText: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromName">From Name</Label>
                      <Input
                        id="fromName"
                        placeholder="Your Name"
                        value={campaignData.fromName}
                        onChange={(e) => setCampaignData({...campaignData, fromName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="fromEmail">From Email</Label>
                      <Input
                        id="fromEmail"
                        placeholder="your@email.com"
                        value={campaignData.fromEmail}
                        onChange={(e) => setCampaignData({...campaignData, fromEmail: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* A/B Testing Setup */}
                  {campaignData.campaignType === 'abtest' && (
                    <Card className="bg-accent/10 border-2 border-accent">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center">
                          <TestTube className="h-4 w-4 mr-2" />
                          A/B Test Configuration
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label>Test Subject Lines</Label>
                          <div className="space-y-2 mt-2">
                            <Input 
                              placeholder="Subject A (Current: {campaignData.subject})"
                              value={campaignData.subject}
                              onChange={(e) => setCampaignData({...campaignData, subject: e.target.value})}
                            />
                            <Input 
                              placeholder="Subject B"
                              value={campaignData.abTestSubjects[0]}
                              onChange={(e) => setCampaignData({
                                ...campaignData, 
                                abTestSubjects: [e.target.value]
                              })}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Test Split</p>
                            <p className="text-xs text-muted-foreground">50% / 50% split</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Winner Selection</p>
                            <p className="text-xs text-muted-foreground">Highest open rate after 4 hours</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Advanced Settings Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Advanced Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Send Time Optimization</Label>
                      <p className="text-xs text-muted-foreground">AI-optimized delivery times</p>
                    </div>
                    <Switch 
                      checked={campaignData.sendTimeOptimization}
                      onCheckedChange={(checked) => setCampaignData({...campaignData, sendTimeOptimization: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Tracking & Analytics</Label>
                      <p className="text-xs text-muted-foreground">Open and click tracking</p>
                    </div>
                    <Switch 
                      checked={campaignData.trackingEnabled}
                      onCheckedChange={(checked) => setCampaignData({...campaignData, trackingEnabled: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Google Analytics</Label>
                      <p className="text-xs text-muted-foreground">UTM parameter tracking</p>
                    </div>
                    <Switch 
                      checked={campaignData.googleAnalytics}
                      onCheckedChange={(checked) => setCampaignData({...campaignData, googleAnalytics: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm">Social Sharing</Label>
                      <p className="text-xs text-muted-foreground">Share buttons in email</p>
                    </div>
                    <Switch 
                      checked={campaignData.socialSharing}
                      onCheckedChange={(checked) => setCampaignData({...campaignData, socialSharing: checked})}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Deliverability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Spam Check</Label>
                    <Switch 
                      checked={campaignData.deliverability.spamCheck}
                      onCheckedChange={(checked) => setCampaignData({
                        ...campaignData, 
                        deliverability: {...campaignData.deliverability, spamCheck: checked}
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">List Cleaning</Label>
                    <Switch 
                      checked={campaignData.deliverability.listCleaningEnabled}
                      onCheckedChange={(checked) => setCampaignData({
                        ...campaignData, 
                        deliverability: {...campaignData.deliverability, listCleaningEnabled: checked}
                      })}
                    />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm">Deliverability Score</Label>
                      <Badge variant={deliverabilityScore > 80 ? "default" : "secondary"}>
                        {deliverabilityScore}/100
                      </Badge>
                    </div>
                    <Progress value={deliverabilityScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleNextStep} size="lg">
              Continue to Design
              <Eye className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </TabsContent>

        {/* Step 2: Design & Content */}
        <TabsContent value="step2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Email Design & Content
              </CardTitle>
              <CardDescription>Create beautiful, responsive email content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditorOpen(true)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Drag & Drop Editor
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsTemplateOpen(true)}
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Professional Templates
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsPreviewOpen(true)}
                    disabled={!campaignData.content}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Multi-Device Preview
                  </Button>
                </div>

                <Textarea
                  placeholder="Write your email content here or use the visual editor..."
                  className="min-h-64"
                  value={campaignData.content}
                  onChange={(e) => setCampaignData({...campaignData, content: e.target.value})}
                />

                {campaignData.content && (
                  <div className="mt-4 p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Content Analysis</h4>
                      <Badge variant="outline">AI Powered</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Word Count</p>
                        <p className="font-medium">{campaignData.content.split(' ').length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Read Time</p>
                        <p className="font-medium">{Math.ceil(campaignData.content.split(' ').length / 200)} min</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Links</p>
                        <p className="font-medium">{(campaignData.content.match(/href/g) || []).length}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Images</p>
                        <p className="font-medium">{(campaignData.content.match(/<img/g) || []).length}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              Back to Setup
            </Button>
            <Button onClick={handleNextStep} size="lg">
              Continue to Targeting
              <Target className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </TabsContent>

        {/* Step 3: Audience & Targeting */}
        <TabsContent value="step3" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Audience Selection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={campaignData.audience} onValueChange={(value) => setCampaignData({...campaignData, audience: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience segment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <div className="flex items-center justify-between w-full">
                          <span>All Subscribers</span>
                          <Badge variant="secondary">12,543</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="segment1">
                        <div className="flex items-center justify-between w-full">
                          <span>New Subscribers</span>
                          <Badge variant="secondary">2,456</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="segment2">
                        <div className="flex items-center justify-between w-full">
                          <span>Active Users</span>
                          <Badge variant="secondary">8,901</Badge>
                        </div>
                      </SelectItem>
                      <SelectItem value="segment3">
                        <div className="flex items-center justify-between w-full">
                          <span>VIP Customers</span>
                          <Badge variant="secondary">991</Badge>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Advanced Segmentation */}
                  <Card className="bg-accent/10">
                    <CardHeader>
                      <CardTitle className="text-base">Advanced Segmentation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Location</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Any location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="us">United States</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="ca">Canada</SelectItem>
                              <SelectItem value="au">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Engagement Level</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Any engagement" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High (30+ days)</SelectItem>
                              <SelectItem value="medium">Medium (7-30 days)</SelectItem>
                              <SelectItem value="low">Low (&lt;7 days)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Audience Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedAudience ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{selectedAudience.count.toLocaleString()}</div>
                        <p className="text-sm text-muted-foreground">Recipients</p>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Engagement</span>
                          <Badge variant="outline">{selectedAudience.engagement}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg. Open Rate</span>
                          <span className="text-sm font-medium">{selectedAudience.openRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg. Click Rate</span>
                          <span className="text-sm font-medium">{selectedAudience.clickRate}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">$2,340</div>
                        <p className="text-xs text-muted-foreground">Estimated Revenue</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Users className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Select an audience to see insights</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              Back to Design
            </Button>
            <Button onClick={handleNextStep} size="lg">
              Review & Send
              <Send className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </TabsContent>

        {/* Step 4: Review & Send */}
        <TabsContent value="step4" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Campaign Review
              </CardTitle>
              <CardDescription>Final review before sending your campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Campaign Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span>{campaignData.name || 'Untitled Campaign'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subject:</span>
                        <span>{campaignData.subject || 'No subject'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <Badge variant="outline">{campaignTypes.find(t => t.value === campaignData.campaignType)?.label}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Recipients:</span>
                        <span>{selectedAudience?.count.toLocaleString() || '0'}</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-medium mb-2">Send Options</h4>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start" 
                        onClick={() => setIsScheduleOpen(true)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule for later
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => setIsAnalyticsOpen(true)}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Advanced Analytics
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Deliverability Check</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Spam Score</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Low Risk</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm">Authentication</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Verified</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-purple-600 mr-2" />
                        <span className="text-sm">Performance Prediction</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">Excellent</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {sendProgress > 0 && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center">
                    <Send className="h-8 w-8 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sending Campaign...</h3>
                    <p className="text-sm text-muted-foreground">
                      Delivering to {estimatedReach.toLocaleString()} recipients
                    </p>
                  </div>
                  <Progress value={sendProgress} className="w-full max-w-md mx-auto" />
                  <p className="text-xs text-muted-foreground">{sendProgress}% complete</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevStep}>
              Back to Targeting
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSave} size="lg">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSend} size="lg" disabled={sendProgress > 0}>
                {sendProgress > 0 ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Campaign
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

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

      {/* Enhanced Preview Modal */}
      {isPreviewOpen && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-6xl h-[90vh] p-0">
            <div className="flex h-full">
              <div className="w-80 bg-accent/20 border-r p-6">
                <DialogHeader className="mb-6">
                  <DialogTitle>Multi-Device Preview</DialogTitle>
                  <DialogDescription>
                    Test your email across different devices and email clients
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Device Preview</Label>
                    <div className="flex gap-2 mt-2">
                      {[
                        { device: 'desktop', icon: Monitor, label: 'Desktop' },
                        { device: 'tablet', icon: Tablet, label: 'Tablet' },
                        { device: 'mobile', icon: Smartphone, label: 'Mobile' }
                      ].map(({ device, icon: Icon, label }) => (
                        <Button
                          key={device}
                          variant={previewDevice === device ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPreviewDevice(device as any)}
                          className="flex-1"
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Email Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">From:</span>
                        <p>{campaignData.fromName} &lt;{campaignData.fromEmail}&gt;</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Subject:</span>
                        <p>{campaignData.subject || 'No subject'}</p>
                      </div>
                      {campaignData.previewText && (
                        <div>
                          <span className="text-muted-foreground">Preview:</span>
                          <p className="text-xs">{campaignData.previewText}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
                <div className="p-6">
                  <div className={`mx-auto bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
                    previewDevice === 'mobile' ? 'max-w-sm' : 
                    previewDevice === 'tablet' ? 'max-w-md' : 'max-w-2xl'
                  }`}>
                    {campaignData.content ? (
                      <div 
                        dangerouslySetInnerHTML={{ __html: campaignData.content }}
                        className="min-h-96"
                      />
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <Mail className="h-12 w-12 mx-auto mb-4" />
                        <p>No content to preview</p>
                        <p className="text-sm">Add content using the editor or templates</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};