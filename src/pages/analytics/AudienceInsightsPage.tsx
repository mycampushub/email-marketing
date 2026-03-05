import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, TrendingUp, MapPin, Globe, Mail, Smartphone,
  Calendar, Download, Filter, BarChart3, Activity
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1'];

export const AudienceInsightsPage: React.FC = () => {
  const { contacts, stats, segments } = useAppContext();
  const [timeRange, setTimeRange] = useState('30days');

  const countryData = [
    { name: 'USA', value: 45, count: 1125 },
    { name: 'UK', value: 20, count: 500 },
    { name: 'Canada', value: 15, count: 375 },
    { name: 'Australia', value: 10, count: 250 },
    { name: 'Germany', value: 5, count: 125 },
    { name: 'Other', value: 5, count: 125 },
  ];

  const emailClientData = [
    { name: 'Gmail', value: 42, count: 1050 },
    { name: 'Apple Mail', value: 25, count: 625 },
    { name: 'Outlook', value: 18, count: 450 },
    { name: 'Yahoo', value: 10, count: 250 },
    { name: 'Other', value: 5, count: 125 },
  ];

  const browserData = [
    { name: 'Chrome', value: 58, count: 1450 },
    { name: 'Safari', value: 28, count: 700 },
    { name: 'Firefox', value: 8, count: 200 },
    { name: 'Edge', value: 4, count: 100 },
    { name: 'Other', value: 2, count: 50 },
  ];

  const monthlyGrowth = [
    { month: 'Aug', subscribers: 1800, active: 1200 },
    { month: 'Sep', subscribers: 1950, active: 1350 },
    { month: 'Oct', subscribers: 2100, active: 1500 },
    { month: 'Nov', subscribers: 2280, active: 1680 },
    { month: 'Dec', subscribers: 2420, active: 1750 },
    { month: 'Jan', subscribers: 2500, active: 1850 },
  ];

  const engagementData = [
    { level: 'Highly Engaged', count: 625, percentage: 25 },
    { level: 'Active', count: 875, percentage: 35 },
    { level: 'Moderate', count: 500, percentage: 20 },
    { level: 'At Risk', count: 375, percentage: 15 },
    { level: 'Inactive', count: 125, percentage: 5 },
  ];

  const sourceData = [
    { source: 'Website Signup', count: 850, percentage: 34 },
    { source: 'Social Media', count: 525, percentage: 21 },
    { source: 'Import', count: 400, percentage: 16 },
    { source: 'Checkout', count: 350, percentage: 14 },
    { source: 'Landing Page', count: 250, percentage: 10 },
    { source: 'Other', count: 125, percentage: 5 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audience Insights</h1>
          <p className="text-muted-foreground">Understand your audience demographics and behavior</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Contacts</p>
                <p className="text-2xl font-bold">{stats.totalContacts.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Subscribers</p>
                <p className="text-2xl font-bold">{stats.activeSubscribers.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Open Rate</p>
                <p className="text-2xl font-bold">{stats.avgOpenRate.toFixed(1)}%</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +2.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mobile Opens</p>
                <p className="text-2xl font-bold">42%</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Smartphone className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +5% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscriber Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="subscribers" stroke="#8B5CF6" name="Total" />
                <Line type="monotone" dataKey="active" stroke="#10B981" name="Active" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPie>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Email Client Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emailClientData.map((client, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{client.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${client.value}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16">{client.count}</span>
                    <Badge variant="outline" className="w-12 justify-center">{client.value}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Browser Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {browserData.map((browser, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{browser.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${browser.value}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16">{browser.count}</span>
                    <Badge variant="outline" className="w-12 justify-center">{browser.value}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {engagementData.map((level, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{level.level}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ width: `${level.percentage}%`, backgroundColor: COLORS[index % COLORS.length] }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-20">{level.count} contacts</span>
                    <Badge variant="outline" className="w-12 justify-center">{level.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acquisition Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sourceData.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{source.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-20">{source.count} contacts</span>
                    <Badge variant="outline" className="w-12 justify-center">{source.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Segments Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {segments.map((segment) => (
              <div key={segment.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{segment.name}</h3>
                  <Badge variant={segment.status === 'Active' ? 'default' : 'secondary'}>
                    {segment.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{segment.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{segment.contactCount}</span>
                  <span className="text-sm text-muted-foreground">contacts</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
