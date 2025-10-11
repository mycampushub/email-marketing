
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { 
  BarChart3, TrendingUp, Users, Mail, MousePointer, 
  DollarSign, Eye, Download, Filter, Calendar
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('overview');

  const overviewStats = [
    { 
      label: 'Total Revenue', 
      value: '$12,345', 
      change: '+15.2%', 
      icon: DollarSign,
      description: 'Revenue generated from email campaigns'
    },
    { 
      label: 'Email Opens', 
      value: '45,123', 
      change: '+8.7%', 
      icon: Mail,
      description: 'Total email opens across all campaigns'
    },
    { 
      label: 'Click Rate', 
      value: '12.4%', 
      change: '+2.1%', 
      icon: MousePointer,
      description: 'Average click-through rate'
    },
    { 
      label: 'Subscribers', 
      value: '8,967', 
      change: '+5.3%', 
      icon: Users,
      description: 'Total active subscribers'
    }
  ];

  const campaignPerformance = [
    {
      name: 'Newsletter #45',
      sent: 2456,
      opens: 1234,
      clicks: 345,
      revenue: '$1,890',
      openRate: '50.2%',
      clickRate: '14.0%',
      date: '2024-01-20'
    },
    {
      name: 'Product Launch',
      sent: 1890,
      opens: 945,
      clicks: 234,
      revenue: '$2,340',
      openRate: '50.0%',
      clickRate: '12.4%',
      date: '2024-01-18'
    },
    {
      name: 'Weekly Digest',
      sent: 3456,
      opens: 1567,
      clicks: 456,
      revenue: '$567',
      openRate: '45.3%',
      clickRate: '13.2%',
      date: '2024-01-15'
    }
  ];

  const audienceInsights = [
    { metric: 'Most Active Time', value: '2:00 PM - 4:00 PM', trend: 'up' },
    { metric: 'Best Day to Send', value: 'Tuesday', trend: 'stable' },
    { metric: 'Top Location', value: 'New York, NY', trend: 'up' },
    { metric: 'Avg. Session Duration', value: '3m 45s', trend: 'up' }
  ];

  const revenueData = [
    { month: 'Jan', email: 4500, total: 8900 },
    { month: 'Feb', email: 5200, total: 9800 },
    { month: 'Mar', email: 4800, total: 9200 },
    { month: 'Apr', email: 6100, total: 11400 },
    { month: 'May', email: 5900, total: 10800 },
    { month: 'Jun', email: 6800, total: 12300 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track performance and gain insights into your email marketing</p>
        </div>
        <div className="flex space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40" data-voice-context="Select date range for analytics: last 7 days, 30 days, 90 days, or custom range">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline"
            data-voice-context="Export analytics data to PDF or CSV format for reporting"
            data-voice-action="Preparing analytics export"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat, index) => (
          <Card key={index} data-voice-context={`${stat.label}: ${stat.value} with ${stat.change} change. ${stat.description}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <stat.icon className="h-8 w-8 text-purple-600 mb-1" />
                  <div className="text-sm text-green-600 font-medium">{stat.change}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" data-voice-context="View comprehensive analytics overview with key metrics and trends">Overview</TabsTrigger>
          <TabsTrigger value="campaigns" data-voice-context="Analyze individual campaign performance with detailed metrics">Campaign Reports</TabsTrigger>
          <TabsTrigger value="audience" data-voice-context="Explore audience insights including demographics and behavior patterns">Audience Insights</TabsTrigger>
          <TabsTrigger value="revenue" data-voice-context="Track revenue attribution and ROI from email marketing efforts">Revenue Reports</TabsTrigger>
          <TabsTrigger value="comparative" data-voice-context="Compare performance across different time periods and campaigns">Comparative Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-voice-context="Email performance trends showing opens, clicks, and engagement over time">
              <CardHeader>
                <CardTitle>Email Performance Trends</CardTitle>
                <CardDescription>Opens and clicks over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart
                  type="line"
                  data={[
                    { month: 'Jan', opens: 2400, clicks: 600 },
                    { month: 'Feb', opens: 3200, clicks: 800 },
                    { month: 'Mar', opens: 2800, clicks: 700 },
                    { month: 'Apr', opens: 3900, clicks: 950 },
                    { month: 'May', opens: 3600, clicks: 900 },
                    { month: 'Jun', opens: 4200, clicks: 1100 }
                  ]}
                  xAxisKey="month"
                  height={240}
                  colors={['#8884d8', '#82ca9d']}
                />
              </CardContent>
            </Card>
            
            <Card data-voice-context="Subscriber growth showing new subscriptions and unsubscribes over time">
              <CardHeader>
                <CardTitle>Subscriber Growth</CardTitle>
                <CardDescription>New subscribers vs unsubscribes</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart
                  type="bar"
                  data={[
                    { month: 'Jan', subscribed: 450, unsubscribed: 23 },
                    { month: 'Feb', subscribed: 620, unsubscribed: 31 },
                    { month: 'Mar', subscribed: 580, unsubscribed: 28 },
                    { month: 'Apr', subscribed: 720, unsubscribed: 35 },
                    { month: 'May', subscribed: 680, unsubscribed: 29 },
                    { month: 'Jun', subscribed: 850, unsubscribed: 42 }
                  ]}
                  xAxisKey="month"
                  height={240}
                  colors={['#10b981', '#ef4444']}
                />
              </CardContent>
            </Card>
          </div>

          <Card data-voice-context="Top performing campaigns ranked by open rate, click rate, and revenue generation">
            <CardHeader>
              <CardTitle>Top Performing Campaigns</CardTitle>
              <CardDescription>Best campaigns from the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignPerformance.slice(0, 3).map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">Sent: {campaign.sent.toLocaleString()} • {campaign.date}</p>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-medium">{campaign.openRate}</div>
                        <div className="text-gray-600">Open Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium">{campaign.clickRate}</div>
                        <div className="text-gray-600">Click Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="font-medium text-green-600">{campaign.revenue}</div>
                        <div className="text-gray-600">Revenue</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48" data-voice-context="Filter campaign reports by type: all campaigns, newsletters, promotional, or automated">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">All Campaigns</SelectItem>
                <SelectItem value="newsletters">Newsletters</SelectItem>
                <SelectItem value="promotional">Promotional</SelectItem>
                <SelectItem value="automated">Automated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {campaignPerformance.map((campaign, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{campaign.name}</h3>
                      <p className="text-gray-600">Sent on {campaign.date} to {campaign.sent.toLocaleString()} subscribers</p>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold">{campaign.opens}</div>
                        <div className="text-gray-600">Opens</div>
                        <div className="text-xs text-green-600">{campaign.openRate}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{campaign.clicks}</div>
                        <div className="text-gray-600">Clicks</div>
                        <div className="text-xs text-green-600">{campaign.clickRate}</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600">{campaign.revenue}</div>
                        <div className="text-gray-600">Revenue</div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        data-voice-context={`View detailed analytics for ${campaign.name} including click maps and subscriber activity`}
                        data-voice-action={`Opening ${campaign.name} detailed report`}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card data-voice-context="Audience demographics breakdown showing age, location, and device preferences">
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>Subscriber breakdown by location and age</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart
                  type="pie"
                  data={[
                    { name: 'US', value: 40 },
                    { name: 'UK', value: 25 },
                    { name: 'Canada', value: 15 },
                    { name: 'Australia', value: 10 },
                    { name: 'Germany', value: 6 },
                    { name: 'Other', value: 4 }
                  ]}
                  height={240}
                  colors={['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0']}
                />
              </CardContent>
            </Card>
            
            <Card data-voice-context="Email client usage showing which email providers your subscribers use most">
              <CardHeader>
                <CardTitle>Email Client Usage</CardTitle>
                <CardDescription>Popular email clients among subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceChart
                  type="pie"
                  data={[
                    { name: 'Gmail', value: 45 },
                    { name: 'Outlook', value: 30 },
                    { name: 'Apple Mail', value: 15 },
                    { name: 'Yahoo', value: 7 },
                    { name: 'Other', value: 3 }
                  ]}
                  height={240}
                  colors={['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1']}
                />
              </CardContent>
            </Card>
          </div>

          <Card data-voice-context="Key audience insights including best send times and engagement patterns">
            <CardHeader>
              <CardTitle>Audience Insights</CardTitle>
              <CardDescription>Key behavioral patterns and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {audienceInsights.map((insight, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <span className="font-medium">{insight.metric}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900">{insight.value}</span>
                      <TrendingUp className={`h-4 w-4 ${insight.trend === 'up' ? 'text-green-500' : 'text-gray-400'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card data-voice-context="Revenue attribution showing income generated from different email campaigns and channels">
            <CardHeader>
              <CardTitle>Revenue Attribution</CardTitle>
              <CardDescription>Revenue generated from email marketing over time</CardDescription>
            </CardHeader>
              <CardContent>
                <PerformanceChart
                  type="bar"
                  data={[
                    { month: 'Jan', email: 4500, total: 8900 },
                    { month: 'Feb', email: 5200, total: 9800 },
                    { month: 'Mar', email: 4800, total: 9200 },
                    { month: 'Apr', email: 6100, total: 11400 },
                    { month: 'May', email: 5900, total: 10800 },
                    { month: 'Jun', email: 6800, total: 12300 }
                  ]}
                  xAxisKey="month"
                  height={240}
                  colors={['#10b981', '#3b82f6']}
                />
              </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card data-voice-context="Revenue per email showing average income generated per email sent">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Revenue per Email</p>
                  <p className="text-2xl font-bold text-gray-900">$2.43</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Customer lifetime value from email marketing campaigns">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Customer LTV</p>
                  <p className="text-2xl font-bold text-gray-900">$156.78</p>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Return on investment for email marketing campaigns and automation">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Email ROI</p>
                  <p className="text-2xl font-bold text-gray-900">4,200%</p>
                  <p className="text-sm text-green-600">+15% from last month</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparative" className="space-y-6">
          <Card data-voice-context="Performance comparison between different time periods to identify trends and improvements">
            <CardHeader>
              <CardTitle>Period Comparison</CardTitle>
              <CardDescription>Compare performance across different time periods</CardDescription>
            </CardHeader>
              <CardContent>
                <PerformanceChart
                  type="line"
                  data={[
                    { period: 'This Month', opens: 3200, clicks: 800, revenue: 12450 },
                    { period: 'Last Month', opens: 2800, clicks: 650, revenue: 9800 },
                    { period: '2 Months Ago', opens: 2400, clicks: 580, revenue: 8900 }
                  ]}
                  xAxisKey="period"
                  height={240}
                  colors={['#8884d8', '#82ca9d', '#ffc658']}
                />
              </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card data-voice-context="Campaign type performance showing which types of emails perform best">
              <CardHeader>
                <CardTitle>Campaign Type Performance</CardTitle>
                <CardDescription>Performance by campaign type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Newsletter</span>
                    <span className="font-medium">18.5% CTR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Promotional</span>
                    <span className="font-medium">22.1% CTR</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Automated</span>
                    <span className="font-medium">25.7% CTR</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card data-voice-context="Industry benchmark comparison showing how your performance compares to industry averages">
              <CardHeader>
                <CardTitle>Industry Benchmarks</CardTitle>
                <CardDescription>Your performance vs industry average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Open Rate</span>
                    <div className="text-right">
                      <div className="font-medium">22.4%</div>
                      <div className="text-xs text-green-600">vs 18.1% avg</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Click Rate</span>
                    <div className="text-right">
                      <div className="font-medium">3.8%</div>
                      <div className="text-xs text-green-600">vs 2.9% avg</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Unsubscribe Rate</span>
                    <div className="text-right">
                      <div className="font-medium">0.2%</div>
                      <div className="text-xs text-green-600">vs 0.4% avg</div>
                    </div>
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
