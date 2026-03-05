import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  DollarSign, TrendingUp, ShoppingCart, CreditCard, 
  Package, Calendar, Download, Filter, ArrowUpRight
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const RevenueReportsPage: React.FC = () => {
  const { campaigns, automations, ecommerceStore, stats } = useAppContext();
  const [dateRange, setDateRange] = useState('30days');

  const monthlyRevenue = [
    { month: 'Oct', revenue: 12500, orders: 125, aov: 100 },
    { month: 'Nov', revenue: 18900, orders: 180, aov: 105 },
    { month: 'Dec', revenue: 28400, orders: 260, aov: 109 },
    { month: 'Jan', revenue: 15600, orders: 150, aov: 104 },
  ];

  const revenueByCampaign = campaigns
    .filter(c => c.revenue > 0)
    .map(c => ({
      name: c.name.substring(0, 25) + (c.name.length > 25 ? '...' : ''),
      revenue: c.revenue,
      roi: ((c.revenue / c.delivered) * 100).toFixed(2),
    }))
    .sort((a, b) => b.revenue - a.revenue);

  const revenueByAutomation = automations
    .filter(a => a.revenue > 0)
    .map(a => ({
      name: a.name,
      revenue: a.revenue,
      subscribers: a.subscribers,
    }));

  const topProducts = [
    { name: 'Premium Plan - Annual', revenue: 45000, orders: 150, growth: 12 },
    { name: 'Premium Plan - Monthly', revenue: 23000, orders: 767, growth: 8 },
    { name: 'Gift Card $50', revenue: 12500, orders: 250, growth: 15 },
    { name: 'Gift Card $100', revenue: 10000, orders: 100, growth: -3 },
    { name: 'Basic Plan - Monthly', revenue: 8500, orders: 851, growth: 5 },
  ];

  const totalRevenue = stats.totalRevenue + ecommerceStore.revenue;
  const avgOrderValue = totalRevenue / monthlyRevenue.reduce((acc, m) => acc + m.orders, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Revenue Reports</h1>
          <p className="text-muted-foreground">Track revenue generated from your marketing campaigns</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
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
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +18% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Campaign Revenue</p>
                <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +15% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">E-commerce Revenue</p>
                <p className="text-2xl font-bold">${ecommerceStore.revenue.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Package className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              +22% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>ROI</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {revenueByCampaign.slice(0, 5).map((campaign, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell>${campaign.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className="text-green-600">{campaign.roi}%</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>${product.revenue.toLocaleString()}</TableCell>
                  <TableCell>{product.orders}</TableCell>
                  <TableCell>
                    <span className={product.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                      {product.growth > 0 ? '+' : ''}{product.growth}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue by Automation</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Automation</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueByAutomation.map((automation, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{automation.name}</TableCell>
                  <TableCell>{automation.subscribers}</TableCell>
                  <TableCell>${automation.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
