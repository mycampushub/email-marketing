
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, Mail, BarChart3, Plus, Zap, 
  Target, Globe, ShoppingCart, PieChart, Calendar,
  Bell, Award, DollarSign, MousePointer, Eye
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'campaign',
      title: 'Welcome Series Automation',
      description: '5 new subscribers entered the welcome flow',
      timestamp: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'campaign',
      title: 'Monthly Newsletter',
      description: 'Sent to 1,234 subscribers - 24.5% open rate',
      timestamp: '1 day ago',
      status: 'sent'
    },
    {
      id: 3,
      type: 'automation',
      title: 'Abandoned Cart Recovery',
      description: 'Recovered $2,450 from 12 customers',
      timestamp: '2 days ago',
      status: 'revenue'
    },
    {
      id: 4,
      type: 'audience',
      title: 'VIP Segment Updated',
      description: '23 new contacts added to VIP customer segment',
      timestamp: '3 days ago',
      status: 'growth'
    }
  ]);

  const quickActions = [
    {
      title: 'Create Campaign',
      description: 'Design beautiful email campaigns with drag-and-drop editor',
      icon: Mail,
      action: () => navigate('/campaigns/create'),
      context: 'Launch the campaign builder with drag-and-drop email editor, pre-designed templates, and advanced personalization features. Create newsletters, promotions, announcements with A/B testing capabilities.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Build Automation',
      description: 'Create automated email sequences and customer journeys',
      icon: Zap,
      action: () => navigate('/automations'),
      context: 'Access automation workflows including welcome series, abandoned cart recovery, birthday emails, and behavioral targeting. Set up triggers based on user actions, dates, and custom conditions.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Manage Audience',
      description: 'Segment contacts, create tags, and import subscribers',
      icon: Users,
      action: () => navigate('/audience'),
      context: 'Comprehensive audience management with segmentation tools, custom fields, tags, and contact profiles. Import contacts, create targeted segments, and manage subscriber preferences.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'View Analytics',
      description: 'Track performance, revenue, and engagement metrics',
      icon: BarChart3,
      action: () => navigate('/analytics'),
      context: 'Detailed analytics dashboard showing campaign performance, revenue tracking, audience insights, comparative reports, and Google Analytics integration. Monitor opens, clicks, conversions, and ROI.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Create Forms',
      description: 'Build signup forms, pop-ups, and landing pages',
      icon: Globe,
      action: () => navigate('/forms'),
      context: 'Form builder for creating embedded signup forms, pop-ups, and landing pages. Customize design, set up double opt-in, and integrate with your website to grow your audience.',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'E-commerce Tools',
      description: 'Product recommendations and abandoned cart recovery',
      icon: ShoppingCart,
      action: () => navigate('/ecommerce'),
      context: 'E-commerce integration tools including product recommendations, abandoned cart emails, purchase tracking, customer lifetime value analysis, and store synchronization with platforms like Shopify.',
      gradient: 'from-teal-500 to-green-500'
    }
  ];

  const stats = [
    { 
      label: 'Total Campaigns', 
      value: '24', 
      change: '+12%', 
      icon: Mail,
      context: 'Total email campaigns created across all types including regular emails, automated sequences, and A/B tests. This includes sent, scheduled, and draft campaigns.',
      color: 'text-blue-600'
    },
    { 
      label: 'Total Subscribers', 
      value: '1,234', 
      change: '+8%', 
      icon: Users,
      context: 'Total active subscribers in your audience including all segments and tags. This number excludes unsubscribed and bounced contacts for accurate deliverability metrics.',
      color: 'text-green-600'
    },
    { 
      label: 'Avg Open Rate', 
      value: '23.5%', 
      change: '+2.1%', 
      icon: Eye,
      context: 'Average email open rate across all campaigns. Industry average is 20-25%. Track this metric to measure subject line effectiveness and audience engagement levels.',
      color: 'text-purple-600'
    },
    { 
      label: 'Avg Click Rate', 
      value: '4.2%', 
      change: '+0.8%', 
      icon: MousePointer,
      context: 'Average click-through rate measuring how many subscribers clicked links in your emails. Industry average is 2-5%. Higher rates indicate compelling content and clear calls-to-action.',
      color: 'text-orange-600'
    },
    { 
      label: 'Revenue Generated', 
      value: '$12,450', 
      change: '+15.3%', 
      icon: DollarSign,
      context: 'Total revenue attributed to email marketing campaigns through e-commerce tracking and conversion monitoring. Includes direct purchases and assisted conversions from email clicks.',
      color: 'text-emerald-600'
    },
    { 
      label: 'Automation ROI', 
      value: '340%', 
      change: '+25%', 
      icon: TrendingUp,
      context: 'Return on investment from automated email sequences. Automation typically generates 300-500% ROI through welcome series, abandoned cart recovery, and behavioral targeting campaigns.',
      color: 'text-indigo-600'
    }
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Review A/B Test Results',
      description: 'Subject line test for newsletter campaign',
      due: 'Today',
      priority: 'high',
      context: 'Analyze A/B test performance data to determine winning subject line variation and apply insights to future campaigns'
    },
    {
      id: 2,
      title: 'Update Welcome Series',
      description: 'Add new onboarding email to automation',
      due: 'Tomorrow',
      priority: 'medium',
      context: 'Enhance welcome automation sequence with additional touchpoint to improve new subscriber engagement and conversion rates'
    },
    {
      id: 3,
      title: 'Clean Email List',
      description: 'Remove inactive subscribers',
      due: 'This Week',
      priority: 'medium',
      context: 'Maintain list hygiene by removing unengaged subscribers to improve deliverability rates and reduce costs'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Section */}
      <div className="text-center md:text-left">
        <h1 
          className="text-4xl font-bold text-gray-900 mb-4"
          data-voice-context="Welcome to your Email Marketing Dashboard - your central command center for creating, managing, and tracking email campaigns, automations, and audience growth"
        >
          Welcome back to your Email Marketing Hub!
        </h1>
        <p 
          className="text-xl text-gray-600 mb-6"
          data-voice-context="Monitor your email marketing performance, manage campaigns and automations, track audience growth, and access all tools needed for successful email marketing"
        >
          Monitor performance, manage campaigns, and grow your audience with powerful email marketing tools.
        </p>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-purple-500"
              data-voice-context={`${stat.label} metric: ${stat.value} with ${stat.change} change. ${stat.context}`}
            >
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

      {/* Quick Actions Grid */}
      <div>
        <h2 
          className="text-2xl font-semibold text-gray-900 mb-6"
          data-voice-context="Quick action cards to access main email marketing features including campaign creation, automation builder, audience management, analytics, forms, and e-commerce tools"
        >
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card 
                key={index} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                onClick={action.action}
                data-voice-context={action.context}
                data-voice-action={`Navigating to ${action.title.toLowerCase()} section with full functionality`}
              >
                <div className={`h-2 bg-gradient-to-r ${action.gradient}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${action.gradient} text-white group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                        {action.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {action.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout for Activity and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle 
              className="flex items-center space-x-2"
              data-voice-context="Recent activity feed showing latest campaign sends, automation triggers, audience changes, and revenue events with real-time updates"
            >
              <Bell className="h-5 w-5 text-purple-600" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>Latest campaigns, automations, and audience updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  data-voice-context={`${activity.title}: ${activity.description}, occurred ${activity.timestamp}`}
                >
                  <div className={`p-2 rounded-full ${
                    activity.status === 'active' ? 'bg-green-100 text-green-600' :
                    activity.status === 'sent' ? 'bg-blue-100 text-blue-600' :
                    activity.status === 'revenue' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {activity.type === 'campaign' && <Mail className="h-4 w-4" />}
                    {activity.type === 'automation' && <Zap className="h-4 w-4" />}
                    {activity.type === 'audience' && <Users className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle 
              className="flex items-center space-x-2"
              data-voice-context="Task management showing upcoming email marketing tasks including A/B test reviews, automation updates, and list maintenance activities"
            >
              <Calendar className="h-5 w-5 text-purple-600" />
              <span>Upcoming Tasks</span>
            </CardTitle>
            <CardDescription>Important email marketing tasks and reminders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                  data-voice-context={`Task: ${task.title} - ${task.description}. Due ${task.due}, priority level ${task.priority}. ${task.context}`}
                >
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900 text-sm">{task.title}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Due: {task.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Section */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 
                className="text-2xl font-bold mb-2"
                data-voice-context="Achievement notification: Monthly goal reached with 125% of target email campaigns sent and 15% increase in subscriber engagement rates"
              >
                🎉 Monthly Goal Achieved!
              </h3>
              <p className="text-purple-100 mb-4">
                You've sent 125% of your target campaigns this month with a 15% increase in engagement!
              </p>
              <Button 
                variant="secondary" 
                className="bg-white text-purple-600 hover:bg-purple-50"
                onClick={() => navigate('/analytics')}
                data-voice-context="View detailed achievement report showing campaign performance metrics, engagement improvements, and recommendations for next month"
                data-voice-action="Opening achievement report with detailed performance analysis"
              >
                View Report
              </Button>
            </div>
            <Award className="h-16 w-16 text-purple-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
