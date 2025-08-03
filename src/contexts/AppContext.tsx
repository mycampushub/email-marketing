import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Campaign {
  id: number;
  name: string;
  status: 'Draft' | 'Sent' | 'Scheduled' | 'Sending' | 'A/B Testing';
  type: 'Regular' | 'A/B Test' | 'Automation' | 'RSS' | 'Welcome Series';
  sent: string | null;
  recipients: number;
  openRate: string;
  clickRate: string;
  bounceRate: string;
  unsubscribeRate: string;
  revenue: string;
  subject: string;
  previewText: string;
  created: string;
  lastModified: string;
  tags: string[];
  segment: string;
  abTestProgress?: number;
}

export interface Automation {
  id: number;
  name: string;
  status: 'Active' | 'Paused' | 'Draft';
  trigger: string;
  emails: number;
  subscribers: number;
  performance: string;
  opens: number;
  clicks: number;
  revenue: string;
  created: string;
  lastRun: string;
}

export interface Contact {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  status: 'Subscribed' | 'Unsubscribed' | 'Pending';
  tags: string[];
  segments: string[];
  joined: string;
  lastActive: string;
  location?: string;
  source?: string;
}

export interface Tag {
  id: number;
  name: string;
  color: string;
  contactCount: number;
  created: string;
  description?: string;
}

export interface Segment {
  id: number;
  name: string;
  description: string;
  contactCount: number;
  conditions: any[];
  created: string;
  lastUpdated: string;
}

export interface Form {
  id: number;
  name: string;
  type: 'Embedded' | 'Pop-up' | 'Landing Page' | 'Inline';
  status: 'Active' | 'Draft' | 'Paused';
  submissions: number;
  conversionRate: string;
  created: string;
  lastModified: string;
  audience: string;
}

// Context
interface AppContextType {
  // Campaigns
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  addCampaign: (campaign: Omit<Campaign, 'id'>) => void;
  updateCampaign: (id: number, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: number) => void;
  
  // Automations
  automations: Automation[];
  setAutomations: React.Dispatch<React.SetStateAction<Automation[]>>;
  addAutomation: (automation: Omit<Automation, 'id'>) => void;
  updateAutomation: (id: number, updates: Partial<Automation>) => void;
  deleteAutomation: (id: number) => void;
  
  // Contacts
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (id: number, updates: Partial<Contact>) => void;
  deleteContact: (id: number) => void;
  
  // Tags
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  addTag: (tag: Omit<Tag, 'id'>) => void;
  updateTag: (id: number, updates: Partial<Tag>) => void;
  deleteTag: (id: number) => void;
  
  // Segments
  segments: Segment[];
  setSegments: React.Dispatch<React.SetStateAction<Segment[]>>;
  addSegment: (segment: Omit<Segment, 'id'>) => void;
  updateSegment: (id: number, updates: Partial<Segment>) => void;
  deleteSegment: (id: number) => void;
  
  // Forms
  forms: Form[];
  setForms: React.Dispatch<React.SetStateAction<Form[]>>;
  addForm: (form: Omit<Form, 'id'>) => void;
  updateForm: (id: number, updates: Partial<Form>) => void;
  deleteForm: (id: number) => void;
  
  // Stats
  stats: {
    totalSubscribers: number;
    totalCampaigns: number;
    avgOpenRate: number;
    totalRevenue: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial data
const initialCampaigns: Campaign[] = [
  {
    id: 1,
    name: 'Monthly Newsletter - January 2024',
    status: 'Sent',
    type: 'Regular',
    sent: '2024-01-15',
    recipients: 1234,
    openRate: '24.5%',
    clickRate: '4.2%',
    bounceRate: '1.2%',
    unsubscribeRate: '0.3%',
    revenue: '$2,450',
    subject: 'Your January Newsletter is Here! 📧',
    previewText: 'Discover our latest updates, tips, and exclusive offers...',
    created: '2024-01-10',
    lastModified: '2024-01-14',
    tags: ['Newsletter', 'Monthly'],
    segment: 'All Subscribers'
  },
  {
    id: 2,
    name: 'Product Launch Campaign - New Features',
    status: 'A/B Testing',
    type: 'A/B Test',
    sent: null,
    recipients: 500,
    openRate: '28.3%',
    clickRate: '5.1%',
    bounceRate: '0.8%',
    unsubscribeRate: '0.2%',
    revenue: '$1,250',
    subject: 'Introducing Our Amazing New Features',
    previewText: 'Be the first to experience our latest innovations...',
    created: '2024-01-18',
    lastModified: '2024-01-20',
    tags: ['Product Launch', 'A/B Test'],
    segment: 'Active Users',
    abTestProgress: 65
  }
];

const initialAutomations: Automation[] = [
  {
    id: 1,
    name: 'Welcome Series',
    status: 'Active',
    trigger: 'New Subscriber',
    emails: 3,
    subscribers: 156,
    performance: '89% completion',
    opens: 1234,
    clicks: 456,
    revenue: '$2,340',
    created: '2024-01-15',
    lastRun: '2 hours ago'
  },
  {
    id: 2,
    name: 'Abandoned Cart Recovery',
    status: 'Active',
    trigger: 'Cart Abandonment',
    emails: 2,
    subscribers: 89,
    performance: '65% completion',
    opens: 567,
    clicks: 234,
    revenue: '$1,890',
    created: '2024-01-10',
    lastRun: '30 minutes ago'
  }
];

const initialContacts: Contact[] = [
  {
    id: 1,
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    status: 'Subscribed',
    tags: ['VIP', 'Newsletter'],
    segments: ['Active Users', 'High Value'],
    joined: '2024-01-10',
    lastActive: '2024-01-15',
    location: 'New York, NY',
    source: 'Website Signup'
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    status: 'Subscribed',
    tags: ['Newsletter'],
    segments: ['New Subscribers'],
    joined: '2024-01-12',
    lastActive: '2024-01-14',
    location: 'Los Angeles, CA',
    source: 'Social Media'
  }
];

const initialTags: Tag[] = [
  {
    id: 1,
    name: 'VIP',
    color: '#8B5CF6',
    contactCount: 89,
    created: '2024-01-01',
    description: 'High-value customers'
  },
  {
    id: 2,
    name: 'Newsletter',
    color: '#3B82F6',
    contactCount: 1234,
    created: '2024-01-01',
    description: 'Newsletter subscribers'
  }
];

const initialSegments: Segment[] = [
  {
    id: 1,
    name: 'Active Users',
    description: 'Users who have engaged in the last 30 days',
    contactCount: 856,
    conditions: [{ field: 'lastActive', operator: 'within', value: '30 days' }],
    created: '2024-01-01',
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    name: 'High Value',
    description: 'Customers with lifetime value > $500',
    contactCount: 234,
    conditions: [{ field: 'lifetimeValue', operator: 'greater', value: 500 }],
    created: '2024-01-01',
    lastUpdated: '2024-01-10'
  }
];

const initialForms: Form[] = [
  {
    id: 1,
    name: 'Newsletter Signup',
    type: 'Embedded',
    status: 'Active',
    submissions: 245,
    conversionRate: '3.2%',
    created: '2024-01-01',
    lastModified: '2024-01-10',
    audience: 'All Subscribers'
  },
  {
    id: 2,
    name: 'Exit Intent Pop-up',
    type: 'Pop-up',
    status: 'Active',
    submissions: 89,
    conversionRate: '8.5%',
    created: '2024-01-05',
    lastModified: '2024-01-12',
    audience: 'Website Visitors'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [automations, setAutomations] = useState<Automation[]>(initialAutomations);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [segments, setSegments] = useState<Segment[]>(initialSegments);
  const [forms, setForms] = useState<Form[]>(initialForms);

  // Helper functions
  const getNextId = (items: any[]) => Math.max(...items.map(item => item.id), 0) + 1;

  // Campaign operations
  const addCampaign = (campaign: Omit<Campaign, 'id'>) => {
    const newCampaign = { ...campaign, id: getNextId(campaigns) };
    setCampaigns(prev => [...prev, newCampaign]);
  };

  const updateCampaign = (id: number, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === id ? { ...campaign, ...updates } : campaign
    ));
  };

  const deleteCampaign = (id: number) => {
    setCampaigns(prev => prev.filter(campaign => campaign.id !== id));
  };

  // Automation operations
  const addAutomation = (automation: Omit<Automation, 'id'>) => {
    const newAutomation = { ...automation, id: getNextId(automations) };
    setAutomations(prev => [...prev, newAutomation]);
  };

  const updateAutomation = (id: number, updates: Partial<Automation>) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === id ? { ...automation, ...updates } : automation
    ));
  };

  const deleteAutomation = (id: number) => {
    setAutomations(prev => prev.filter(automation => automation.id !== id));
  };

  // Contact operations
  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = { ...contact, id: getNextId(contacts) };
    setContacts(prev => [...prev, newContact]);
  };

  const updateContact = (id: number, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, ...updates } : contact
    ));
  };

  const deleteContact = (id: number) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  // Tag operations
  const addTag = (tag: Omit<Tag, 'id'>) => {
    const newTag = { ...tag, id: getNextId(tags) };
    setTags(prev => [...prev, newTag]);
  };

  const updateTag = (id: number, updates: Partial<Tag>) => {
    setTags(prev => prev.map(tag => 
      tag.id === id ? { ...tag, ...updates } : tag
    ));
  };

  const deleteTag = (id: number) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
  };

  // Segment operations
  const addSegment = (segment: Omit<Segment, 'id'>) => {
    const newSegment = { ...segment, id: getNextId(segments) };
    setSegments(prev => [...prev, newSegment]);
  };

  const updateSegment = (id: number, updates: Partial<Segment>) => {
    setSegments(prev => prev.map(segment => 
      segment.id === id ? { ...segment, ...updates } : segment
    ));
  };

  const deleteSegment = (id: number) => {
    setSegments(prev => prev.filter(segment => segment.id !== id));
  };

  // Form operations
  const addForm = (form: Omit<Form, 'id'>) => {
    const newForm = { ...form, id: getNextId(forms) };
    setForms(prev => [...prev, newForm]);
  };

  const updateForm = (id: number, updates: Partial<Form>) => {
    setForms(prev => prev.map(form => 
      form.id === id ? { ...form, ...updates } : form
    ));
  };

  const deleteForm = (id: number) => {
    setForms(prev => prev.filter(form => form.id !== id));
  };

  // Calculate stats
  const stats = {
    totalSubscribers: contacts.filter(c => c.status === 'Subscribed').length,
    totalCampaigns: campaigns.length,
    avgOpenRate: campaigns.filter(c => c.openRate !== '-').reduce((acc, c) => acc + parseFloat(c.openRate), 0) / campaigns.filter(c => c.openRate !== '-').length || 0,
    totalRevenue: campaigns.filter(c => c.revenue !== '-').reduce((acc, c) => acc + parseFloat(c.revenue.replace('$', '').replace(',', '')), 0)
  };

  const value: AppContextType = {
    campaigns, setCampaigns, addCampaign, updateCampaign, deleteCampaign,
    automations, setAutomations, addAutomation, updateAutomation, deleteAutomation,
    contacts, setContacts, addContact, updateContact, deleteContact,
    tags, setTags, addTag, updateTag, deleteTag,
    segments, setSegments, addSegment, updateSegment, deleteSegment,
    forms, setForms, addForm, updateForm, deleteForm,
    stats
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};