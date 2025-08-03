import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, Users, MousePointer, Globe, Calendar } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-30-days');

  const overviewStats = [
    { label: 'Total Visitors', value: '45,234', change: '+12%', icon: Users },
    { label: 'Page Views', value: '89,567', change: '+8%', icon: MousePointer },
    { label: 'Conversion Rate', value: '3.45%', change: '+0.2%', icon: TrendingUp },
    { label: 'Avg. Session Duration', value: '4m 32s', change: '+15s', icon: Calendar },
  ];

  const topPages = [
    { page: '/home', views: 12450, conversions: 234, rate: '1.88%' },
    { page: '/products', views: 8920, conversions: 445, rate: '4.99%' },
    { page: '/about', views: 6780, conversions: 89, rate: '1.31%' },
    { page: '/contact', views: 4560, conversions: 123, rate: '2.70%' },
    { page: '/blog', views: 3890, conversions: 67, rate: '1.72%' },
  ];

  const trafficSources = [
    { source: 'Direct Traffic', visitors: 18234, percentage: 40.3 },
    { source: 'Search Engines', visitors: 13567, percentage: 30.0 },
    { source: 'Social Media', visitors: 8901, percentage: 19.7 },
    { source: 'Email Campaigns', visitors: 2890, percentage: 6.4 },
    { source: 'Referral Sites', visitors: 1642, percentage: 3.6 },
  ];

  const emailCampaignPerformance = [
    { campaign: 'Monthly Newsletter', clicks: 1234, conversions: 89, revenue: '$2,450' },
    { campaign: 'Product Launch', clicks: 890, conversions: 156, revenue: '$4,230' },
    { campaign: 'Welcome Series', clicks: 567, conversions: 234, revenue: '$1,890' },
    { campaign: 'Abandoned Cart', clicks: 445, conversions: 123, revenue: '$3,450' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website Reports</h1>
          <p className="text-gray-600">Analyze your website performance and email campaign impact</p>
        </div>
        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-48" data-voice-context="Select date range for reports">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-7-days">Last 7 days</SelectItem>
            <SelectItem value="last-30-days">Last 30 days</SelectItem>
            <SelectItem value="last-90-days">Last 90 days</SelectItem>
            <SelectItem value="last-year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" data-voice-context="View overall website performance metrics">Overview</TabsTrigger>
          <TabsTrigger value="traffic" data-voice-context="Analyze traffic sources and visitor behavior">Traffic Analysis</TabsTrigger>
          <TabsTrigger value="conversions" data-voice-context="Track conversion rates and goals">Conversions</TabsTrigger>
          <TabsTrigger value="email-impact" data-voice-context="See how email campaigns drive website traffic">Email Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewStats.map((stat, index) => (
              <Card key={index} data-voice-context={`${stat.label}: ${stat.value} with ${stat.change} change`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <stat.icon className="h-6 w-6 text-gray-400 mb-2" />
                      <div className="text-sm text-green-600 font-medium">{stat.change}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Pages</CardTitle>
                <CardDescription>Pages with the highest traffic and conversions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{page.page}</h4>
                        <p className="text-sm text-gray-600">{page.views.toLocaleString()} views</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{page.conversions} conversions</div>
                        <div className="text-sm text-gray-600">{page.rate} rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{source.source}</span>
                        <span className="text-sm text-gray-600">{source.visitors.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Traffic Analytics
              </CardTitle>
              <CardDescription>Detailed breakdown of your website traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">67%</div>
                  <div className="text-sm text-gray-600">Returning Visitors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">4.2</div>
                  <div className="text-sm text-gray-600">Pages per Session</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">2.1%</div>
                  <div className="text-sm text-gray-600">Bounce Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Where your visitors are located</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany'].map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{country}</span>
                      <span className="text-sm font-medium">{Math.floor(Math.random() * 5000 + 1000).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>How visitors access your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Desktop</span>
                    <span className="text-sm font-medium">58%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mobile</span>
                    <span className="text-sm font-medium">34%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tablet</span>
                    <span className="text-sm font-medium">8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Goals</CardTitle>
              <CardDescription>Track your website conversion objectives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1,234</div>
                  <div className="text-sm text-gray-600">Newsletter Signups</div>
                  <div className="text-xs text-green-600">+12% this month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">567</div>
                  <div className="text-sm text-gray-600">Form Submissions</div>
                  <div className="text-xs text-blue-600">+8% this month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">89</div>
                  <div className="text-sm text-gray-600">Sales Conversions</div>
                  <div className="text-xs text-purple-600">+15% this month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Visitor journey from landing to conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium">Page Views</span>
                  <span className="font-bold">45,234</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="font-medium">Engaged Visitors</span>
                  <span className="font-bold">12,567 (27.8%)</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <span className="font-medium">Form Started</span>
                  <span className="font-bold">3,456 (27.5%)</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <span className="font-medium">Conversions</span>
                  <span className="font-bold">1,234 (35.7%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email-impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Campaign Traffic</CardTitle>
              <CardDescription>How your email campaigns drive website visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailCampaignPerformance.map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{campaign.campaign}</h4>
                      <p className="text-sm text-gray-600">{campaign.clicks} website clicks</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{campaign.conversions} conversions</div>
                      <div className="text-sm text-green-600">{campaign.revenue} revenue</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Email vs. Other Traffic</CardTitle>
                <CardDescription>Email-driven traffic performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Traffic</span>
                    <span className="text-sm font-medium">2,890 visitors (6.4%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="text-sm font-medium text-green-600">8.2% (vs 3.4% avg)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Revenue per Visitor</span>
                    <span className="text-sm font-medium text-green-600">$12.45 (vs $4.20 avg)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Performing Campaigns</CardTitle>
                <CardDescription>Top email campaigns by website impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Product Launch</span>
                    <span className="text-sm font-medium">17.5% CTR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Welcome Series</span>
                    <span className="text-sm font-medium">12.3% CTR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Abandoned Cart</span>
                    <span className="text-sm font-medium">9.8% CTR</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};