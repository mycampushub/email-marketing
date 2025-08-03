
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Plus,
  Home,
  Mail,
  Zap,
  FileText,
  Users,
  BarChart3,
  Globe,
  Palette,
  Settings,
  ChevronRight,
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Create',
    icon: Plus,
    path: '/create',
    context: 'Quick create new campaigns, automations, and forms'
  },
  {
    title: 'Home',
    icon: Home,
    path: '/',
    context: 'Dashboard overview with campaign performance and quick actions'
  },
  {
    title: 'Campaigns',
    icon: Mail,
    path: '/campaigns',
    context: 'Manage email campaigns and newsletters',
    subItems: [
      { title: 'All Campaigns', path: '/campaigns' },
      { title: 'Create Campaign', path: '/campaigns/create' },
      { title: 'Templates', path: '/campaigns/templates' },
      { title: 'A/B Testing', path: '/campaigns/ab-testing' },
    ]
  },
  {
    title: 'Automations',
    icon: Zap,
    path: '/automations',
    context: 'Set up automated email journeys and sequences',
    subItems: [
      { title: 'All Journeys', path: '/automations' },
      { title: 'Pre-built Journeys', path: '/automations/prebuilt' },
      { title: 'Transactional Email', path: '/automations/transactional' },
      { title: 'Customer Journeys', path: '/automations/customer-journeys' },
    ]
  },
  {
    title: 'Forms',
    icon: FileText,
    path: '/forms',
    context: 'Create signup forms and landing pages',
    subItems: [
      { title: 'All Forms', path: '/forms' },
      { title: 'Signup Forms', path: '/forms/signup' },
      { title: 'Landing Pages', path: '/forms/landing' },
      { title: 'Pop-ups', path: '/forms/popups' },
    ]
  },
  {
    title: 'Audience',
    icon: Users,
    path: '/audience',
    context: 'Manage contacts, segments, and subscriber preferences',
    subItems: [
      { title: 'Audience Dashboard', path: '/audience' },
      { title: 'Tags', path: '/audience/tags' },
      { title: 'Segments', path: '/audience/segments' },
      { title: 'Surveys', path: '/audience/surveys' },
      { title: 'Subscriber Preferences', path: '/audience/preferences' },
      { title: 'Inbox', path: '/audience/inbox' },
    ]
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    path: '/analytics',
    context: 'View reports and campaign performance metrics',
    subItems: [
      { title: 'Reports', path: '/analytics' },
      { title: 'Custom Reports', path: '/analytics/custom' },
      { title: 'Revenue Reports', path: '/analytics/revenue' },
      { title: 'Audience Insights', path: '/analytics/audience' },
    ]
  },
  {
    title: 'Website',
    icon: Globe,
    path: '/website',
    context: 'Manage website settings and tracking',
    subItems: [
      { title: 'Settings', path: '/website' },
      { title: 'Reports', path: '/website/reports' },
      { title: 'Connected Sites', path: '/website/sites' },
    ]
  },
  {
    title: 'Content',
    icon: Palette,
    path: '/content',
    context: 'Manage brand assets and email templates',
    subItems: [
      { title: 'Creative Assistant', path: '/content' },
      { title: 'Email Templates', path: '/content/templates' },
      { title: 'Brand Kit', path: '/content/brand' },
      { title: 'Image Library', path: '/content/images' },
    ]
  },
  {
    title: 'Integrations',
    icon: Settings,
    path: '/integrations',
    context: 'Connect with third-party apps and services',
    subItems: [
      { title: 'Manage', path: '/integrations' },
      { title: 'Browse Integrations', path: '/integrations/browse' },
      { title: 'API Keys', path: '/integrations/api' },
    ]
  },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveItem = () => {
    if (location.pathname === '/') return 'Home';
    const pathSegments = location.pathname.split('/').filter(Boolean);
    return pathSegments[0] || 'Home';
  };

  const activeItem = getActiveItem();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">MailChimp Clone</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible
                      defaultOpen={activeItem.toLowerCase() === item.title.toLowerCase()}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className="w-full justify-between"
                          data-voice-context={item.context}
                        >
                          <div className="flex items-center">
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === subItem.path}
                              >
                                <button
                                  onClick={() => navigate(subItem.path)}
                                  data-voice-context={`Navigate to ${subItem.title} in ${item.title}`}
                                  data-voice-action={`Opening ${subItem.title}`}
                                  className="w-full text-left"
                                >
                                  {subItem.title}
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                    >
                      <button
                        onClick={() => navigate(item.path)}
                        data-voice-context={item.context}
                        data-voice-action={`Navigating to ${item.title}`}
                        className="w-full justify-start"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
