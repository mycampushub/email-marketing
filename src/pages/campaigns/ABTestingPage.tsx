
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, Mail, TrendingUp } from 'lucide-react';

export const ABTestingPage: React.FC = () => {
  const [testName, setTestName] = useState('');

  const activeTests = [
    {
      id: 1,
      name: 'Subject Line Test',
      status: 'Running',
      progress: 65,
      variantA: { name: 'Original', openRate: '24.5%', clicks: 156 },
      variantB: { name: 'Variation', openRate: '28.1%', clicks: 189 },
      audience: 1000,
      startDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'CTA Button Color',
      status: 'Completed',
      progress: 100,
      variantA: { name: 'Blue Button', openRate: '22.3%', clicks: 134 },
      variantB: { name: 'Green Button', openRate: '26.7%', clicks: 178 },
      audience: 800,
      startDate: '2024-01-10'
    }
  ];

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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Version A (Control)</h4>
                  <Button variant="outline" className="w-full" data-voice-context="Set up the original version of your campaign">
                    Setup Control
                  </Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Version B (Variant)</h4>
                  <Button variant="outline" className="w-full" data-voice-context="Set up the test variation of your campaign">
                    Setup Variant
                  </Button>
                </Card>
              </div>

              <Button className="w-full" data-voice-context="Start your A/B test campaign">
                Start A/B Test
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">{test.variantA.name}</h5>
                        <p className="text-sm text-gray-600">Open Rate: {test.variantA.openRate}</p>
                        <p className="text-sm text-gray-600">Clicks: {test.variantA.clicks}</p>
                      </div>
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">{test.variantB.name}</h5>
                        <p className="text-sm text-gray-600">Open Rate: {test.variantB.openRate}</p>
                        <p className="text-sm text-gray-600">Clicks: {test.variantB.clicks}</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      data-voice-context={`View detailed results for ${test.name} A/B test`}
                    >
                      View Results
                    </Button>
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
