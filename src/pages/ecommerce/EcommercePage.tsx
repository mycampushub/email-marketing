import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import { 
  ShoppingCart, Package, DollarSign, TrendingUp, Users, 
  Mail, Clock, BarChart3, Eye, Settings 
} from 'lucide-react';

export const EcommercePage: React.FC = () => {
  const { toast } = useToast();
  const { ecommerceStore } = useAppContext();
  
  const [automations, setAutomations] = useState([
    {
      id: 1,
      name: 'Abandoned Cart Recovery',
      description: 'Recover lost sales with targeted email sequences',
      status: 'Active',
      emails: 3,
      recoveryRate: '23.8%',
      revenue: '$5,420'
    },
    {
      id: 2,
      name: 'Post-Purchase Follow-up',
      description: 'Thank customers and encourage reviews',
      status: 'Active',
      emails: 2,
      openRate: '67.3%',
      revenue: '$1,280'
    },
    {
      id: 3,
      name: 'Product Recommendations',
      description: 'Suggest related products based on purchase history',
      status: 'Draft',
      emails: 1,
      clickRate: '0%',
      revenue: '$0'
    }
  ]);

  // Calculate stats from ecommerceStore data
  const ecommerceStats = useMemo(() => [
    {
      label: 'Total Revenue',
      value: `$${ecommerceStore.revenue.toLocaleString()}`,
      change: '+18.2%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      label: 'Orders Generated',
      value: ecommerceStore.orders.length.toString(),
      change: '+12.4%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      label: 'Cart Recovery Rate',
      value: '23.8%',
      change: '+4.1%',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      label: 'Customers',
      value: ecommerceStore.customers.length.toString(),
      change: '+8.9%',
      icon: Users,
      color: 'text-orange-600'
    }
  ], [ecommerceStore.revenue, ecommerceStore.orders.length, ecommerceStore.customers.length]);

  // Get recent orders from ecommerceStore
  const recentOrders = useMemo(() => {
    return ecommerceStore.orders.slice(0, 5).map(order => {
      const customer = ecommerceStore.customers.find(c => c.id === order.customerId);
      const productName = order.products.length > 0 
        ? ecommerceStore.products.find(p => p.id === order.products[0].productId)?.name || 'Unknown Product'
        : 'No products';
      
      return {
        id: order.id,
        customer: customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer',
        product: productName,
        amount: `$${order.total.toFixed(2)}`,
        status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
        emailSent: 'Order confirmation',
        timestamp: new Date(order.created).toLocaleString()
      };
    });
  }, [ecommerceStore.orders, ecommerceStore.customers, ecommerceStore.products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">E-commerce Integration</h1>
        <p className="text-gray-600">Sync your store data and automate customer communications</p>
      </div>

      {/* Store Connections */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Connected Store
          </CardTitle>
          <CardDescription>Manage your e-commerce platform integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className={`border rounded-lg p-4 transition-colors ${
              ecommerceStore.status === 'connected' ? 'border-green-500 bg-green-50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{ecommerceStore.name}</h3>
              <Badge variant={ecommerceStore.status === 'connected' ? 'default' : 'secondary'}>
                {ecommerceStore.status.charAt(0).toUpperCase() + ecommerceStore.status.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">Platform: {ecommerceStore.platform.charAt(0).toUpperCase() + ecommerceStore.platform.slice(1)}</p>
            <p className="text-xs text-gray-500">Store ID: {ecommerceStore.id}</p>
            <p className="text-xs text-gray-400 mt-2">
              {ecommerceStore.connectedAt ? `Connected: ${new Date(ecommerceStore.connectedAt).toLocaleDateString()}` : 'Not connected'}
            </p>
            <p className="text-xs text-gray-400">
              Last sync: {ecommerceStore.lastSync || 'Never'}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{ecommerceStore.products.length}</p>
              <p className="text-sm text-gray-600">Products</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{ecommerceStore.orders.length}</p>
              <p className="text-sm text-gray-600">Orders</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{ecommerceStore.customers.length}</p>
              <p className="text-sm text-gray-600">Customers</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              toast({
                title: "Store Sync",
                description: "Syncing store data...",
              });
            }}
          >
            <Package className="h-4 w-4 mr-2" />
            Sync Store Data
          </Button>
        </CardContent>
      </Card>

      {/* E-commerce Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {ecommerceStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  <div className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* E-commerce Automations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              E-commerce Automations
            </CardTitle>
            <CardDescription>Automated email sequences for your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automations.map((automation) => (
                <div key={automation.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{automation.name}</h4>
                    <Badge variant={automation.status === 'Active' ? 'default' : 'secondary'}>
                      {automation.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{automation.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Emails</p>
                      <p className="font-semibold">{automation.emails}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Performance</p>
                      <p className="font-semibold">
                        {automation.recoveryRate || automation.openRate || automation.clickRate}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Revenue</p>
                      <p className="font-semibold text-green-600">{automation.revenue}</p>
                    </div>
                  </div>
                    <div className="flex gap-2 mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Opening Automation Details",
                            description: `Viewing ${automation.name} performance metrics and settings`,
                          });
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Opening Editor",
                            description: `Editing ${automation.name} automation workflow`,
                          });
                        }}
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newStatus = automation.status === 'Active' ? 'Paused' : 'Active';
                          setAutomations(automations.map(a => 
                            a.id === automation.id ? { ...a, status: newStatus } : a
                          ));
                          toast({
                            title: `Automation ${newStatus}`,
                            description: `${automation.name} has been ${newStatus.toLowerCase()}`,
                          });
                        }}
                      >
                        {automation.status === 'Active' ? 'Pause' : 'Activate'}
                      </Button>
                    </div>
                </div>
              ))}
            </div>
            <Button 
              className="w-full mt-4"
              onClick={() => {
                const newAutomation = {
                  id: Date.now(),
                  name: 'New E-commerce Automation',
                  description: 'Configure this automation for your needs',
                  status: 'Draft',
                  emails: 1,
                  clickRate: '0%',
                  revenue: '$0'
                };
                setAutomations([...automations, newAutomation]);
                toast({
                  title: "Automation Created",
                  description: "New automation has been created. Configure it to start generating revenue.",
                });
              }}
            >
              Create New Automation
            </Button>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest orders and automated emails</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{order.customer}</h4>
                      <p className="text-sm text-gray-600">{order.product}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.amount}</p>
                      <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-gray-600">{order.emailSent}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-gray-500">{order.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Orders
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};