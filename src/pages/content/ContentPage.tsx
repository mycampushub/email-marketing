
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Palette, Image, FileText, Upload, Plus, Search, Wand2, Sparkles, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';

export const ContentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const context = useAppContext();
  // Use sample templates for now since templates aren't in context yet
  const templates = [];

  const brandAssets = [
    { type: 'Logo', name: 'Primary Logo', format: 'PNG', size: '1.2 MB' },
    { type: 'Logo', name: 'Logo White', format: 'SVG', size: '45 KB' },
    { type: 'Color', name: 'Primary Blue', hex: '#3B82F6', usage: 'Primary brand color' },
    { type: 'Color', name: 'Secondary Gray', hex: '#6B7280', usage: 'Text and accents' },
    { type: 'Font', name: 'Inter', weight: 'Regular', usage: 'Body text' },
    { type: 'Font', name: 'Inter Bold', weight: 'Bold', usage: 'Headlines' }
  ];

  const [imageLibrary, setImageLibrary] = useState([
    { id: 1, name: 'hero-banner.jpg', size: '2.1 MB', dimensions: '1920x1080', tags: ['banner', 'hero'] },
    { id: 2, name: 'product-photo.png', size: '850 KB', dimensions: '800x600', tags: ['product', 'showcase'] },
    { id: 3, name: 'team-photo.jpg', size: '1.5 MB', dimensions: '1200x800', tags: ['team', 'about'] },
    { id: 4, name: 'office-space.jpg', size: '980 KB', dimensions: '1000x667', tags: ['office', 'workspace'] }
  ]);

  const handleGenerateContent = (type: string) => {
    const prompts = {
      'Subject Lines': 'Generate 5 compelling email subject lines for a summer sale campaign',
      'Email Copy': 'Create engaging email content for a product launch announcement',
      'Campaign Ideas': 'Suggest 3 creative campaign concepts for increasing customer engagement'
    };
    
    const mockGenerated = {
      'Subject Lines': [
        "🌞 Summer Sale: 50% Off Everything!",
        "Last Chance: Summer Deals End Tonight",
        "Your Summer Wishlist is 50% Off",
        "Beat the Heat with Cool Summer Savings",
        "Summer Sale Alert: Your Favorites on Sale"
      ],
      'Email Copy': `Subject: Introducing Our Game-Changing New Product!

Hey [First Name],

We're thrilled to share something special with you today. After months of development and testing, we're finally ready to unveil our latest innovation that's about to revolutionize your daily routine.

[Product Name] is here, and it's everything you've been waiting for.

✅ Easy to use
✅ Saves you time
✅ Delivers real results
✅ Backed by our guarantee

Ready to be among the first to experience this breakthrough? 

[CTA Button: Get Early Access]

Best regards,
The Team`,
      'Campaign Ideas': [
        "User-Generated Content Campaign: Encourage customers to share photos using your product with a branded hashtag",
        "Email Series: 7-day challenge that helps customers get maximum value from your product",
        "Seasonal Promotion: Limited-time bundle offers that create urgency and increase average order value"
      ]
    };

    const newContent = {
      id: Date.now(),
      type,
      content: mockGenerated[type],
      generated: new Date().toLocaleDateString(),
      prompt: prompts[type]
    };

    setGeneratedContent(prev => [newContent, ...prev]);
    toast({
      title: "Content Generated!",
      description: `AI has generated new ${type.toLowerCase()} for your campaigns`,
    });
  };

  const handleUseContent = (content: any) => {
    toast({
      title: "Content Applied",
      description: `${content.type} has been applied to your campaign`,
    });
  };

  const handleUploadAsset = () => {
    toast({
      title: "Upload Started",
      description: "Asset upload functionality would be implemented here",
    });
    setIsUploadDialogOpen(false);
  };

  const handleUploadImages = () => {
    const newImage = {
      id: Math.max(...imageLibrary.map(i => i.id)) + 1,
      name: 'new-upload.jpg',
      size: '1.2 MB',
      dimensions: '1200x800',
      tags: ['new', 'upload']
    };
    setImageLibrary(prev => [...prev, newImage]);
    toast({
      title: "Image Uploaded",
      description: "New image has been added to your library",
    });
  };

  const handleBrowseTemplates = () => {
    navigate('/campaigns/templates');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Studio</h1>
          <p className="text-gray-600">Manage your brand assets, templates, and creative content</p>
        </div>
        <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-primary hover:bg-primary-dark"
              data-voice-context="Use AI to generate new content ideas and copy"
              data-voice-action="Opening AI content assistant"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>AI Content Generator</DialogTitle>
              <DialogDescription>
                Describe what type of content you need and our AI will generate it for you
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="ai-prompt">Content Request</Label>
                <Textarea
                  id="ai-prompt"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., Generate 5 subject lines for a Black Friday sale..."
                  data-voice-context="Describe the content you want AI to generate"
                />
              </div>
              <Button 
                onClick={() => {
                  handleGenerateContent('Custom');
                  setIsAIDialogOpen(false);
                  setAiPrompt('');
                }}
                className="w-full"
                disabled={!aiPrompt.trim()}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Content
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="assistant" className="space-y-6">
        <TabsList>
          <TabsTrigger value="assistant" data-voice-context="AI-powered content creation assistant">Creative Assistant</TabsTrigger>
          <TabsTrigger value="brand" data-voice-context="Manage brand colors, fonts, and logos">Brand Kit</TabsTrigger>
          <TabsTrigger value="images" data-voice-context="Upload and manage image library">Image Library</TabsTrigger>
          <TabsTrigger value="templates" data-voice-context="Browse email and content templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="assistant" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-purple-600" />
                AI Creative Assistant
              </CardTitle>
              <CardDescription>Generate subject lines, email copy, and creative ideas with AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Subject Lines</h3>
                    <p className="text-sm text-gray-600 mb-4">Generate compelling subject lines that boost open rates</p>
                    <Button 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleGenerateContent('Subject Lines')}
                      data-voice-context="Generate email subject lines using AI"
                    >
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Email Copy</h3>
                    <p className="text-sm text-gray-600 mb-4">Create engaging email content for any campaign</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleGenerateContent('Email Copy')}
                      data-voice-context="Generate email body content using AI"
                    >
                      Generate
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <Wand2 className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Campaign Ideas</h3>
                    <p className="text-sm text-gray-600 mb-4">Get creative campaign concepts and strategies</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleGenerateContent('Campaign Ideas')}
                      data-voice-context="Generate campaign ideas and strategies"
                    >
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent AI Generations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {generatedContent.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No content generated yet. Use the buttons above to generate content.</p>
                      </div>
                    ) : (
                      generatedContent.map((content) => (
                        <div key={content.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex-1 mr-4">
                            <h4 className="font-medium truncate">
                              {content.type}: {Array.isArray(content.content) ? content.content[0] : content.content.split('\n')[0]}
                            </h4>
                            <p className="text-sm text-muted-foreground">Generated on {content.generated}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUseContent(content)}
                              data-voice-context="Use this AI-generated content in your campaigns"
                            >
                              Use
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              data-voice-context="Preview the full generated content"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brand" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Brand Assets</h2>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline"
                  data-voice-context="Upload new brand assets like logos and fonts"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Asset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Brand Asset</DialogTitle>
                  <DialogDescription>
                    Add logos, fonts, or color palettes to your brand kit
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="asset-file">Choose File</Label>
                    <Input id="asset-file" type="file" accept="image/*,.ttf,.otf,.woff,.woff2" />
                  </div>
                  <div>
                    <Label htmlFor="asset-name">Asset Name</Label>
                    <Input id="asset-name" placeholder="Enter asset name" />
                  </div>
                  <div>
                    <Label htmlFor="asset-usage">Usage Description</Label>
                    <Textarea id="asset-usage" placeholder="Describe how this asset should be used" />
                  </div>
                  <Button onClick={handleUploadAsset} className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Asset
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandAssets.map((asset, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{asset.type}</Badge>
                    {asset.type === 'Color' && (
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: asset.hex }}
                      />
                    )}
                  </div>
                  <h3 className="font-semibold mb-1">{asset.name}</h3>
                  {asset.format && (
                    <p className="text-sm text-gray-600">{asset.format} • {asset.size}</p>
                  )}
                  {asset.hex && (
                    <p className="text-sm text-gray-600">{asset.hex}</p>
                  )}
                  {asset.weight && (
                    <p className="text-sm text-gray-600">{asset.weight}</p>
                  )}
                  {asset.usage && (
                    <p className="text-xs text-gray-500 mt-2">{asset.usage}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Brand Guidelines</CardTitle>
              <CardDescription>Keep your brand consistent across all campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Color Palette</h4>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded"></div>
                    <div className="w-8 h-8 bg-gray-600 rounded"></div>
                    <div className="w-8 h-8 bg-green-500 rounded"></div>
                    <div className="w-8 h-8 bg-orange-500 rounded"></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Typography</h4>
                  <p className="text-sm text-gray-600">Primary: Inter (Headings)</p>
                  <p className="text-sm text-gray-600">Secondary: Inter Regular (Body)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search images..."
                className="pl-10 max-w-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-voice-context="Search through your image library"
              />
            </div>
            <Button 
              className="bg-primary hover:bg-primary-dark"
              onClick={handleUploadImages}
              data-voice-context="Upload new images to your library"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {imageLibrary.map((image) => (
              <Card key={image.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                    <Image className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold mb-1 truncate">{image.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{image.dimensions} • {image.size}</p>
                  <div className="flex flex-wrap gap-1">
                    {image.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
              <CardDescription>Manage your image library storage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Used: 8.5 GB</span>
                <span className="text-sm">Available: 15 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '57%' }}></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Email Templates</h2>
            <Button onClick={handleBrowseTemplates} data-voice-context="Browse and customize email templates">
              Browse All Templates
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates && templates.length > 0 ? (
              templates.slice(0, 6).map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 rounded-md mb-3 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{template.category}</Badge>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate('/campaigns/templates')}
                          data-voice-context={`Preview ${template.name} template`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Template Selected",
                              description: `${template.name} template is ready for editing`,
                            });
                            navigate('/campaigns/create', { state: { template } });
                          }}
                          data-voice-context={`Use ${template.name} template for new campaign`}
                        >
                          Use
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Sample templates when none exist
              [
                { id: 1, name: 'Welcome Email', description: 'Greet new subscribers', category: 'Onboarding' },
                { id: 2, name: 'Newsletter', description: 'Weekly newsletter template', category: 'Newsletter' },
                { id: 3, name: 'Promotion', description: 'Product promotion template', category: 'Marketing' },
                { id: 4, name: 'Cart Recovery', description: 'Recover abandoned carts', category: 'E-commerce' },
                { id: 5, name: 'Event Invite', description: 'Event invitation template', category: 'Event' },
                { id: 6, name: 'Survey', description: 'Customer feedback survey', category: 'Feedback' }
              ].map((template) => (
                <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/20 rounded-md mb-3 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{template.category}</Badge>
                      <div className="flex space-x-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate('/campaigns/templates')}
                          data-voice-context={`Preview ${template.name} template`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Template Selected",
                              description: `${template.name} template is ready for editing`,
                            });
                            navigate('/campaigns/create', { state: { template } });
                          }}
                          data-voice-context={`Use ${template.name} template for new campaign`}
                        >
                          Use
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
