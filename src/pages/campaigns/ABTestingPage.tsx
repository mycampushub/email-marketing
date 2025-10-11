
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Users, Mail, TrendingUp, TestTube, Pause, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

export const ABTestingPage: React.FC = () => {
  const [testName, setTestName] = useState('');
  const [testType, setTestType] = useState('subject');
  const [audienceSize, setAudienceSize] = useState('1000');
  const [splitPercentage, setSplitPercentage] = useState('50');
  const [variantAContent, setVariantAContent] = useState('');
  const [variantBContent, setVariantBContent] = useState('');
  const [isCreatingTest, setIsCreatingTest] = useState(false);
  const { toast } = useToast();

  const [activeTests, setActiveTests] = useState([
    {
      id: 1,
      name: 'Subject Line Test',
      status: 'Running',
      progress: 65,
      variantA: { name: 'Original', content: 'Welcome to our newsletter!', openRate: '24.5%', clicks: 156 },
      variantB: { name: 'Variation', content: 'Your weekly dose of inspiration awaits!', openRate: '28.1%', clicks: 189 },
      audience: 1000,
      startDate: '2024-01-15',
      testType: 'subject',
      winner: null,
      significance: '95%'
    },
    {
      id: 2,
      name: 'CTA Button Color',
      status: 'Completed',
      progress: 100,
      variantA: { name: 'Blue Button', content: 'Shop Now', openRate: '22.3%', clicks: 134 },
      variantB: { name: 'Green Button', content: 'Shop Now', openRate: '26.7%', clicks: 178 },
      audience: 800,
      startDate: '2024-01-10',
      testType: 'content',
      winner: 'B',
      significance: '98%'
    }
  ]);

  const createABTest = () => {
    if (!testName.trim() || !variantAContent.trim() || !variantBContent.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to create your A/B test.",
        variant: "destructive",
      });
      return;
    }

    const newTest = {
      id: Date.now(),
      name: testName,
      status: 'Running' as const,
      progress: 0,
      variantA: { 
        name: 'Version A', 
        content: variantAContent, 
        openRate: '0%', 
        clicks: 0 
      },
      variantB: { 
        name: 'Version B', 
        content: variantBContent, 
        openRate: '0%', 
        clicks: 0 
      },
      audience: parseInt(audienceSize),
      startDate: new Date().toISOString().split('T')[0],
      testType,
      winner: null,
      significance: '0%'
    };

    setActiveTests([...activeTests, newTest]);
    setTestName('');
    setVariantAContent('');
    setVariantBContent('');
    setIsCreatingTest(false);

    toast({
      title: "A/B Test Created",
      description: `"${newTest.name}" has been created and is now running with ${newTest.audience} recipients.`,
    });
  };

  const stopTest = (testId: number) => {
    setActiveTests(activeTests.map(test => 
      test.id === testId ? { ...test, status: 'Stopped' as const } : test
    ));
    toast({
      title: "Test Stopped",
      description: "A/B test has been stopped and results are being calculated.",
    });
  };

  const declareWinner = (testId: number, winner: 'A' | 'B') => {
    setActiveTests(activeTests.map(test => 
      test.id === testId ? { ...test, status: 'Completed' as const, winner, progress: 100 } : test
    ));
    toast({
      title: "Winner Declared",
      description: `Version ${winner} has been declared the winner and will be used for future sends.`,
    });
  };

  const deleteTest = (testId: number) => {
    setActiveTests(activeTests.filter(test => test.id !== testId));
    toast({
      title: "Test Deleted",
      description: "A/B test has been permanently deleted.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">A/B Testing</h1>
        <p className="text-gray-600">Test different versions of your campaigns to optimize performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card data-voice-context="Create new A/B test to compare campaign variations">
            <CardHeader>
              <CardTitle>Create New A/B Test</CardTitle>
              <CardDescription>Test different versions of your campaign</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="testName">Test Name</Label>
                <Input
                  id="testName"
                  placeholder="Enter test name"
                  value={testName}
                  onChange={(e) => setTestName(e.target.value)}
                  data-voice-context="Name your A/B test for easy identification"
                />
              </div>

              <div>
                <Label htmlFor="testType">Test Type</Label>
                <Select value={testType} onValueChange={setTestType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subject">Subject Line</SelectItem>
                    <SelectItem value="content">Email Content</SelectItem>
                    <SelectItem value="sender">Sender Name</SelectItem>
                    <SelectItem value="time">Send Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Audience Size</Label>
                  <Input 
                    value={audienceSize}
                    onChange={(e) => setAudienceSize(e.target.value)}
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label>Split %</Label>
                  <Input 
                    value={splitPercentage}
                    onChange={(e) => setSplitPercentage(e.target.value)}
                    placeholder="50"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Version A (Control)</Label>
                  <Textarea
                    placeholder={testType === 'subject' ? 'Original subject line' : 'Original content'}
                    value={variantAContent}
                    onChange={(e) => setVariantAContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Version B (Variant)</Label>
                  <Textarea
                    placeholder={testType === 'subject' ? 'Test subject line' : 'Test content'}
                    value={variantBContent}
                    onChange={(e) => setVariantBContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <Button className="w-full" onClick={createABTest}>
                <TestTube className="h-4 w-4 mr-2" />
                Create & Start A/B Test
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Tests</CardTitle>
              <CardDescription>Monitor your running A/B tests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTests.map((test) => (
                  <div key={test.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">{test.name}</h4>
                      <Badge variant={test.status === 'Running' ? 'default' : 'secondary'}>
                        {test.status}
                      </Badge>
                    </div>
                    
                    <Progress value={test.progress} className="mb-4" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2 p-3 border rounded-lg">
                        <h5 className="font-medium text-sm flex items-center justify-between">
                          {test.variantA.name}
                          {test.winner === 'A' && <Badge className="bg-green-100 text-green-800">Winner</Badge>}
                        </h5>
                        <p className="text-xs text-gray-600">Content: "{test.variantA.content}"</p>
                        <p className="text-sm text-gray-600">Open Rate: {test.variantA.openRate}</p>
                        <p className="text-sm text-gray-600">Clicks: {test.variantA.clicks}</p>
                        {test.status === 'Running' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => declareWinner(test.id, 'A')}
                          >
                            Declare Winner
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2 p-3 border rounded-lg">
                        <h5 className="font-medium text-sm flex items-center justify-between">
                          {test.variantB.name}
                          {test.winner === 'B' && <Badge className="bg-green-100 text-green-800">Winner</Badge>}
                        </h5>
                        <p className="text-xs text-gray-600">Content: "{test.variantB.content}"</p>
                        <p className="text-sm text-gray-600">Open Rate: {test.variantB.openRate}</p>
                        <p className="text-sm text-gray-600">Clicks: {test.variantB.clicks}</p>
                        {test.status === 'Running' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => declareWinner(test.id, 'B')}
                          >
                            Declare Winner
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      {test.status === 'Running' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => stopTest(test.id)}
                        >
                          <Pause className="h-4 w-4 mr-1" />
                          Stop Test
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        <BarChart3 className="h-4 w-4 mr-1" />
                        View Analytics
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteTest(test.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card data-voice-context="A/B testing statistics and performance overview">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Test Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Tests</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Completed Tests</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg. Improvement</span>
                <span className="font-medium text-green-600">+15.3%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p>• Test one element at a time</p>
              <p>• Use statistical significance</p>
              <p>• Test with adequate sample size</p>
              <p>• Run tests for full business cycles</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
