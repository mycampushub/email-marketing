import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// ==================== DATA MODELS ====================

export interface Campaign {
  id: string;
  name: string;
  status: 'Draft' | 'Scheduled' | 'Sending' | 'Sent' | 'A/B Testing' | 'Paused';
  type: 'Regular' | 'A/B Test' | 'Automation' | 'RSS' | 'Welcome Series' | 'Drip';
  sent: string | null;
  scheduledAt?: string;
  recipients: number;
  delivered: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  revenue: number;
  subject: string;
  previewText: string;
  fromName: string;
  fromEmail: string;
  content: string;
  htmlContent: string;
  created: string;
  lastModified: string;
  tags: string[];
  segment: string;
  abTestProgress?: number;
  abTestWinner?: 'A' | 'B';
  abTestType?: 'subject' | 'content' | 'sendTime';
  abTestSubjectA?: string;
  abTestSubjectB?: string;
  opens: number;
  uniqueOpens: number;
  clicks: number;
  uniqueClicks: number;
  bounces: number;
  unsubscribes: number;
  socialClicks: number;
  forwards: number;
  forwardOpens: number;
  emailsSent: EmailEvent[];
}

export interface EmailEvent {
  id: string;
  contactId: string;
  emailId: string;
  type: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'unsubscribed' | 'forwarded';
  timestamp: string;
  url?: string;
  country?: string;
  city?: string;
}

export interface Automation {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Draft';
  trigger: string;
  triggerType: 'signup' | 'purchase' | 'date' | 'inactivity' | 'tag' | 'segment' | 'api';
  emails: AutomationEmail[];
  subscribers: number;
  completed: number;
  performance: string;
  opens: number;
  clicks: number;
  revenue: number;
  created: string;
  lastModified: string;
  lastRun: string;
  settings: AutomationSettings;
}

export interface AutomationEmail {
  id: string;
  name: string;
  subject: string;
  delay: number;
  delayUnit: 'minutes' | 'hours' | 'days' | 'weeks';
  sendCount: number;
  openRate: number;
  clickRate: number;
}

export interface AutomationSettings {
  exitOnPurchase: boolean;
  exitOnUnsubscribe: boolean;
  reEnter: boolean;
  contactFilter?: string[];
}

export interface Contact {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  status: 'Subscribed' | 'Unsubscribed' | 'Pending' | 'Cleaned';
  tags: string[];
  segments: string[];
  joined: string;
  lastActive: string;
  location: string;
  city?: string;
  country?: string;
  timezone?: string;
  source: string;
  lifetimeValue: number;
  totalPurchases: number;
  avgOrderValue: number;
  lastPurchase?: string;
  emailClient?: string;
  browser?: string;
  consent: {
    email: boolean;
    sms: boolean;
  };
  customFields: Record<string, string>;
  activity: ActivityEvent[];
}

export interface ActivityEvent {
  id: string;
  type: 'subscribed' | 'opened' | 'clicked' | 'purchased' | 'unsubscribed' | 'tagged' | 'segmented';
  timestamp: string;
  details?: string;
  campaignId?: string;
  automationId?: string;
  amount?: number;
  productName?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  contactCount: number;
  created: string;
  description?: string;
  autoAdd?: boolean;
  autoRemove?: boolean;
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  contactCount: number;
  conditions: SegmentCondition[];
  created: string;
  lastUpdated: string;
  status: 'Active' | 'Draft';
}

export interface SegmentCondition {
  id: string;
  field: string;
  operator: 'is' | 'is_not' | 'contains' | 'not_contains' | 'starts_with' | 'ends_with' | 'greater' | 'less' | 'between' | 'before' | 'after' | 'within' | 'not_within';
  value: string | number | string[];
  logicalOperator?: 'AND' | 'OR';
}

export interface Form {
  id: string;
  name: string;
  type: 'Embedded' | 'Pop-up' | 'Landing Page' | 'Inline';
  status: 'Active' | 'Draft' | 'Paused';
  submissions: number;
  conversionRate: number;
  created: string;
  lastModified: string;
  audience: string;
  fields: FormField[];
  settings: FormSettings;
  design: FormDesign;
  submissionsData: FormSubmission[];
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'phone' | 'date' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'submit';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  width?: 'full' | 'half';
}

export interface FormSettings {
  redirectUrl?: string;
  storeResponses: boolean;
  notifyEmail?: string;
  addToList: boolean;
  addToSegment?: string;
  addTag?: string;
  showOncePerSession: boolean;
  trigger?: 'page_load' | 'exit_intent' | 'scroll' | 'click' | 'time';
  triggerDelay?: number;
}

export interface FormDesign {
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  borderRadius: number;
  fontFamily: string;
  width?: number;
}

export interface FormSubmission {
  id: string;
  timestamp: string;
  data: Record<string, string>;
  ip?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  htmlContent: string;
  created: string;
  lastModified: string;
  uses: number;
}

export interface AnalyticsReport {
  id: string;
  name: string;
  type: 'campaign' | 'automation' | 'audience' | 'revenue' | 'custom';
  dateRange: { start: string; end: string };
  data: Record<string, any>;
  created: string;
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: 'ecommerce' | 'crm' | 'analytics' | 'social' | 'productivity' | 'other';
  status: 'connected' | 'available' | 'disconnected';
  connectedAt?: string;
  lastSync?: string;
  settings?: Record<string, any>;
}

export interface EcommerceStore {
  id: string;
  platform: 'shopify' | 'woocommerce' | 'magento' | 'bigcommerce' | 'other';
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  connectedAt?: string;
  lastSync?: string;
  products: Product[];
  orders: EcommerceOrder[];
  customers: EcommerceCustomer[];
  revenue: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  sku?: string;
}

export interface EcommerceOrder {
  id: string;
  customerId: string;
  email: string;
  total: number;
  currency: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  products: { productId: string; quantity: number; price: number }[];
  created: string;
  shippingAddress?: Address;
}

export interface EcommerceCustomer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder?: string;
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export interface BrandKit {
  id: string;
  name: string;
  logo?: string;
  colors: { name: string; hex: string }[];
  fonts: { heading: string; body: string };
  businessInfo?: {
    name: string;
    address: string;
    phone: string;
    website: string;
  };
}

export interface SMSCampaign {
  id: string;
  name: string;
  status: 'Draft' | 'Scheduled' | 'Sent';
  content: string;
  recipients: number;
  delivered: number;
  clicks: number;
  revenue: number;
  scheduledAt?: string;
  sent: string | null;
  created: string;
}

export interface SocialPost {
  id: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
  content: string;
  media?: string[];
  status: 'Draft' | 'Scheduled' | 'Published';
  scheduledAt?: string;
  publishedAt?: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
  };
  created: string;
}

export interface LandingPageSection {
  id: string;
  type: 'hero' | 'features' | 'about' | 'cta' | 'form' | 'testimonials' | 'footer' | 'spacer';
  content: Record<string, any>;
  styles: Record<string, any>;
}

export interface LandingPage {
  id: string;
  name: string;
  description: string;
  goal: string;
  template: string;
  status: 'Draft' | 'Published';
  url?: string;
  sections: LandingPageSection[];
  styles: {
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  analytics: {
    visitors: number;
    conversions: number;
    conversionRate: number;
  };
  created: string;
  lastModified: string;
}

export interface Website {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'paused';
  connectedAt: string;
  trackingCode: string;
  pages: { path: string; title: string; visits: number }[];
  totalVisits: number;
  subscribers: number;
}

// ==================== UTILITY FUNCTIONS ====================

const generateId = () => Math.random().toString(36).substr(2, 9);

const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const generatePhone = () => `+1${randomInt(200, 999)}${randomInt(100, 999)}${randomInt(1000, 9999)}`;

// ==================== REALISTIC SAMPLE DATA ====================

const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Lisa', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle', 'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa', 'Timothy', 'Deborah'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];

const cities = [
  { city: 'New York', country: 'USA', timezone: 'America/New_York' },
  { city: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles' },
  { city: 'Chicago', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Houston', country: 'USA', timezone: 'America/Chicago' },
  { city: 'Phoenix', country: 'USA', timezone: 'America/Phoenix' },
  { city: 'London', country: 'UK', timezone: 'Europe/London' },
  { city: 'Manchester', country: 'UK', timezone: 'Europe/London' },
  { city: 'Paris', country: 'France', timezone: 'Europe/Paris' },
  { city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney' },
  { city: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne' },
  { city: 'Toronto', country: 'Canada', timezone: 'America/Toronto' },
  { city: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver' },
  { city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
  { city: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore' },
];

const emailClients = ['Gmail', 'Apple Mail', 'Outlook', 'Yahoo Mail', 'Google Chrome', 'Samsung Mail', 'Windows Mail', 'Thunderbird', 'iPad', 'iPhone'];
const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Samsung Internet', 'Opera'];
const sources = ['Website Signup', 'Social Media', 'Referral', 'Event', 'Import', 'Checkout', 'Landing Page', 'Pop-up Form', 'Contest'];
const tags = ['VIP', 'Newsletter', 'Product Launch', 'VIP Customer', 'New Subscriber', 'At Risk', 'Inactive', 'High Value', 'First Time Buyer', 'Repeat Customer', 'Newsletter', 'Blog Reader', 'Social Follower', 'Event Attendee'];

const generateContacts = (count: number): Contact[] => {
  const contacts: Contact[] = [];
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);

  for (let i = 0; i < count; i++) {
    const firstName = pickRandom(firstNames);
    const lastName = pickRandom(lastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomInt(1, 999)}@${pickRandom(['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'company.com', 'business.org'])}`;
    const location = pickRandom(cities);
    const status = Math.random() > 0.1 ? 'Subscribed' : Math.random() > 0.5 ? 'Unsubscribed' : 'Pending';
    const joinedDate = randomDate(sixMonthsAgo, now);
    const lastActive = randomDate(joinedDate, now);
    const lifetimeValue = status === 'Subscribed' ? randomInt(0, 5000) : 0;
    const totalPurchases = randomInt(0, 20);
    
    const contactTags: string[] = [];
    const numTags = randomInt(0, 3);
    for (let j = 0; j < numTags; j++) {
      const tag = pickRandom(tags);
      if (!contactTags.includes(tag)) contactTags.push(tag);
    }
    if (lifetimeValue > 1000 && !contactTags.includes('VIP')) contactTags.push('VIP');
    if (totalPurchases > 5 && !contactTags.includes('Repeat Customer')) contactTags.push('Repeat Customer');

    const activity: ActivityEvent[] = [];
    const numActivities = randomInt(1, 10);
    for (let k = 0; k < numActivities; k++) {
      const actDate = randomDate(joinedDate, now);
      const actType = pickRandom(['subscribed', 'opened', 'clicked', 'purchased', 'tagged']);
      activity.push({
        id: generateId(),
        type: actType,
        timestamp: actDate.toISOString(),
        details: actType === 'opened' ? 'Campaign opened' : actType === 'clicked' ? 'Link clicked' : undefined,
        amount: actType === 'purchased' ? randomInt(10, 500) : undefined,
        productName: actType === 'purchased' ? pickRandom(['Premium Plan', 'Basic Plan', 'Add-on', 'Gift Card']) : undefined,
      });
    }
    activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    contacts.push({
      id: generateId(),
      email,
      firstName,
      lastName,
      phone: status === 'Subscribed' ? generatePhone() : undefined,
      status,
      tags: contactTags,
      segments: [],
      joined: joinedDate.toISOString().split('T')[0],
      lastActive: lastActive.toISOString().split('T')[0],
      location: `${location.city}, ${location.country}`,
      city: location.city,
      country: location.country,
      timezone: location.timezone,
      source: pickRandom(sources),
      lifetimeValue,
      totalPurchases,
      avgOrderValue: totalPurchases > 0 ? Math.round(lifetimeValue / totalPurchases) : 0,
      lastPurchase: totalPurchases > 0 ? lastActive.toISOString().split('T')[0] : undefined,
      emailClient: pickRandom(emailClients),
      browser: pickRandom(browsers),
      consent: { email: true, sms: Math.random() > 0.7 },
      customFields: {},
      activity,
    });
  }
  return contacts;
};

const generateCampaigns = (contacts: Contact[]): Campaign[] => {
  const campaigns: Campaign[] = [];
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  const campaignNames = [
    { name: 'Monthly Newsletter - January 2024', type: 'Regular' as const, subject: 'Your January Newsletter is Here!' },
    { name: 'Product Launch - Spring Collection', type: 'Regular' as const, subject: 'Introducing Our Stunning New Collection' },
    { name: 'Exclusive Sale Announcement', type: 'Regular' as const, subject: '48-Hour Exclusive Sale - Members Only!' },
    { name: 'Customer Feedback Survey', type: 'Regular' as const, subject: 'We Value Your Feedback' },
    { name: 'Holiday Gift Guide', type: 'Regular' as const, subject: 'Perfect Gifts for Everyone on Your List' },
    { name: 'Welcome to Our Family!', type: 'Welcome Series' as const, subject: 'Welcome! Here\'s What to Expect' },
    { name: 'Abandoned Cart Reminder', type: 'Automation' as const, subject: 'You Left Something Behind...' },
    { name: 'Post-Purchase Thank You', type: 'Automation' as const, subject: 'Thank You for Your Order!' },
    { name: 'Re-engagement Campaign', type: 'Regular' as const, subject: 'We Miss You! Come Back for 20% Off' },
    { name: 'A/B Test - Subject Lines', type: 'A/B Test' as const, subject: 'Test: Short vs Long Subject' },
    { name: 'Weekly Tips & Tricks', type: 'RSS' as const, subject: 'This Week\'s Top Tips' },
    { name: 'Drip Course - Day 1', type: 'Drip' as const, subject: 'Day 1: Getting Started' },
  ];

  campaignNames.forEach((camp, index) => {
    const sentDate = randomDate(threeMonthsAgo, now);
    const recipients = randomInt(5000, 15000);
    const delivered = Math.floor(recipients * (0.95 + Math.random() * 0.04));
    const opens = Math.floor(delivered * (0.15 + Math.random() * 0.25));
    const uniqueOpens = Math.floor(opens * (0.7 + Math.random() * 0.2));
    const clicks = Math.floor(uniqueOpens * (0.1 + Math.random() * 0.2));
    const uniqueClicks = Math.floor(clicks * 0.8);
    const bounces = recipients - delivered;
    const unsubscribes = Math.floor(delivered * Math.random() * 0.005);

    const emailEvents: EmailEvent[] = [];
    contacts.slice(0, 100).forEach(contact => {
      if (Math.random() < 0.3) {
        emailEvents.push({
          id: generateId(),
          contactId: contact.id,
          emailId: generateId(),
          type: 'opened',
          timestamp: randomDate(sentDate, now).toISOString(),
          country: contact.country,
          city: contact.city,
        });
      }
    });

    campaigns.push({
      id: generateId(),
      name: camp.name,
      status: index < 9 ? 'Sent' : index === 9 ? 'A/B Testing' : 'Draft',
      type: camp.type,
      sent: index < 10 ? sentDate.toISOString().split('T')[0] : null,
      recipients,
      delivered,
      openRate: Number(((opens / delivered) * 100).toFixed(1)),
      clickRate: Number(((uniqueClicks / delivered) * 100).toFixed(1)),
      bounceRate: Number(((bounces / recipients) * 100).toFixed(1)),
      unsubscribeRate: Number(((unsubscribes / delivered) * 100).toFixed(1)),
      revenue: Math.floor(delivered * (Math.random() * 0.5)),
      subject: camp.subject,
      previewText: 'Discover our latest updates, tips, and exclusive offers...',
      fromName: 'Your Brand',
      fromEmail: 'newsletter@yourbrand.com',
      content: `<html><body><h1>${camp.subject}</h1><p>This is the email content...</p></body></html>`,
      htmlContent: `<html><body><h1>${camp.subject}</h1><p>This is the email content...</p></body></html>`,
      created: new Date(sentDate.getTime() - randomInt(1, 7) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastModified: sentDate.toISOString().split('T')[0],
      tags: pickRandom([['Newsletter'], ['Product Launch'], ['Sale'], ['Automation'], ['Welcome']]),
      segment: 'All Subscribers',
      abTestProgress: index === 9 ? randomInt(50, 90) : undefined,
      opens,
      uniqueOpens,
      clicks,
      uniqueClicks,
      bounces,
      unsubscribes,
      socialClicks: randomInt(50, 500),
      forwards: randomInt(10, 100),
      forwardOpens: randomInt(5, 50),
      emailsSent: emailEvents,
    });
  });

  return campaigns;
};

const generateAutomations = (): Automation[] => {
  return [
    {
      id: generateId(),
      name: 'Welcome Series',
      status: 'Active',
      trigger: 'New Subscriber',
      triggerType: 'signup',
      emails: [
        { id: generateId(), name: 'Welcome Email', subject: 'Welcome to Our Family!', delay: 0, delayUnit: 'minutes', sendCount: 1234, openRate: 45.2, clickRate: 12.3 },
        { id: generateId(), name: 'What to Expect', subject: 'Here\'s What You\'ll Receive', delay: 1, delayUnit: 'days', sendCount: 1180, openRate: 38.5, clickRate: 8.7 },
        { id: generateId(), name: 'First Offer', subject: 'Special Offer Just for You!', delay: 3, delayUnit: 'days', sendCount: 1056, openRate: 32.1, clickRate: 15.4 },
      ],
      subscribers: 156,
      completed: 1234,
      performance: '89% completion',
      opens: 4567,
      clicks: 1234,
      revenue: 12340,
      created: '2024-01-15',
      lastModified: '2024-01-20',
      lastRun: '2 hours ago',
      settings: { exitOnPurchase: true, exitOnUnsubscribe: true, reEnter: false },
    },
    {
      id: generateId(),
      name: 'Abandoned Cart Recovery',
      status: 'Active',
      trigger: 'Cart Abandonment',
      triggerType: 'purchase',
      emails: [
        { id: generateId(), name: 'Cart Reminder', subject: 'You Left Something Behind...', delay: 1, delayUnit: 'hours', sendCount: 456, openRate: 52.3, clickRate: 28.7 },
        { id: generateId(), name: 'Last Chance', subject: 'Your Cart Expires Soon!', delay: 24, delayUnit: 'hours', sendCount: 312, openRate: 41.2, clickRate: 22.1 },
      ],
      subscribers: 89,
      completed: 234,
      performance: '65% completion',
      opens: 1234,
      clicks: 567,
      revenue: 8900,
      created: '2024-01-10',
      lastModified: '2024-01-18',
      lastRun: '30 minutes ago',
      settings: { exitOnPurchase: true, exitOnUnsubscribe: true, reEnter: true },
    },
    {
      id: generateId(),
      name: 'Post-Purchase Follow-up',
      status: 'Active',
      trigger: 'Purchase',
      triggerType: 'purchase',
      emails: [
        { id: generateId(), name: 'Order Confirmation', subject: 'Thank You for Your Order!', delay: 0, delayUnit: 'minutes', sendCount: 2345, openRate: 68.5, clickRate: 15.2 },
        { id: generateId(), name: 'Shipping Update', subject: 'Your Order Has Shipped!', delay: 2, delayUnit: 'days', sendCount: 2289, openRate: 55.3, clickRate: 8.9 },
        { id: generateId(), name: 'Review Request', subject: 'How Was Your Experience?', delay: 5, delayUnit: 'days', sendCount: 2156, openRate: 42.1, clickRate: 18.5 },
        { id: generateId(), name: 'Related Products', subject: 'You Might Also Like...', delay: 7, delayUnit: 'days', sendCount: 1987, openRate: 35.6, clickRate: 22.3 },
      ],
      subscribers: 2345,
      completed: 1876,
      performance: '80% completion',
      opens: 12345,
      clicks: 4567,
      revenue: 45670,
      created: '2024-01-05',
      lastModified: '2024-01-22',
      lastRun: '1 hour ago',
      settings: { exitOnPurchase: false, exitOnUnsubscribe: true, reEnter: true },
    },
    {
      id: generateId(),
      name: 'Birthday Emails',
      status: 'Active',
      trigger: 'Birthday',
      triggerType: 'date',
      emails: [
        { id: generateId(), name: 'Birthday Wish', subject: 'Happy Birthday! Here\'s Your Gift!', delay: 0, delayUnit: 'minutes', sendCount: 456, openRate: 72.3, clickRate: 25.6 },
      ],
      subscribers: 456,
      completed: 412,
      performance: '90% completion',
      opens: 345,
      clicks: 123,
      revenue: 5670,
      created: '2024-01-01',
      lastModified: '2024-01-15',
      lastRun: '1 day ago',
      settings: { exitOnPurchase: false, exitOnUnsubscribe: false, reEnter: true },
    },
    {
      id: generateId(),
      name: 'Re-engagement Campaign',
      status: 'Paused',
      trigger: 'Inactive for 60 days',
      triggerType: 'inactivity',
      emails: [
        { id: generateId(), name: 'We Miss You', subject: 'We Miss You!', delay: 0, delayUnit: 'minutes', sendCount: 0, openRate: 0, clickRate: 0 },
        { id: generateId(), name: 'Special Comeback Offer', subject: '20% Off Just for You!', delay: 3, delayUnit: 'days', sendCount: 0, openRate: 0, clickRate: 0 },
      ],
      subscribers: 0,
      completed: 0,
      performance: '0% completion',
      opens: 0,
      clicks: 0,
      revenue: 0,
      created: '2024-01-20',
      lastModified: '2024-01-25',
      lastRun: 'Never',
      settings: { exitOnPurchase: true, exitOnUnsubscribe: true, reEnter: false },
    },
  ];
};

const generateTags = (): Tag[] => {
  const tagColors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#84CC16'];
  return [
    { id: generateId(), name: 'VIP', color: '#8B5CF6', contactCount: 89, created: '2024-01-01', description: 'High-value customers', autoAdd: true },
    { id: generateId(), name: 'Newsletter', color: '#3B82F6', contactCount: 1234, created: '2024-01-01', description: 'Newsletter subscribers' },
    { id: generateId(), name: 'New Subscriber', color: '#10B981', contactCount: 456, created: '2024-01-05', description: 'Recently subscribed' },
    { id: generateId(), name: 'At Risk', color: '#F59E0B', contactCount: 234, created: '2024-01-10', description: 'Inactive for 60+ days' },
    { id: generateId(), name: 'Repeat Customer', color: '#6366F1', contactCount: 567, created: '2024-01-12', description: 'Made multiple purchases' },
    { id: generateId(), name: 'First Time Buyer', color: '#14B8A6', contactCount: 345, created: '2024-01-15', description: 'First purchase made' },
    { id: generateId(), name: 'Product Launch', color: '#EC4899', contactCount: 678, created: '2024-01-18', description: 'Interested in new products' },
    { id: generateId(), name: 'Sale Hunter', color: '#EF4444', contactCount: 890, created: '2024-01-20', description: 'Frequently purchases on sale' },
    { id: generateId(), name: 'Blog Reader', color: '#84CC16', contactCount: 2345, created: '2024-01-22', description: 'Engaged with blog content' },
    { id: generateId(), name: 'Event Attendee', color: '#F97316', contactCount: 123, created: '2024-01-25', description: 'Attended our events' },
  ];
};

const generateSegments = (contacts: Contact[]): Segment[] => {
  return [
    {
      id: generateId(),
      name: 'Active Users',
      description: 'Users who have engaged in the last 30 days',
      contactCount: contacts.filter(c => c.status === 'Subscribed' && new Date(c.lastActive) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
      conditions: [{ id: generateId(), field: 'lastActive', operator: 'within', value: '30 days' }],
      created: '2024-01-01',
      lastUpdated: '2024-01-15',
      status: 'Active',
    },
    {
      id: generateId(),
      name: 'High Value',
      description: 'Customers with lifetime value > $500',
      contactCount: contacts.filter(c => c.lifetimeValue > 500).length,
      conditions: [{ id: generateId(), field: 'lifetimeValue', operator: 'greater', value: 500 }],
      created: '2024-01-01',
      lastUpdated: '2024-01-10',
      status: 'Active',
    },
    {
      id: generateId(),
      name: 'New Subscribers',
      description: 'Subscribed in the last 7 days',
      contactCount: contacts.filter(c => c.status === 'Subscribed' && new Date(c.joined) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
      conditions: [{ id: generateId(), field: 'joined', operator: 'within', value: '7 days' }],
      created: '2024-01-05',
      lastUpdated: '2024-01-22',
      status: 'Active',
    },
    {
      id: generateId(),
      name: 'At Risk',
      description: 'No engagement in 60+ days',
      contactCount: contacts.filter(c => c.status === 'Subscribed' && new Date(c.lastActive) < new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)).length,
      conditions: [{ id: generateId(), field: 'lastActive', operator: 'not_within', value: '60 days' }],
      created: '2024-01-10',
      lastUpdated: '2024-01-20',
      status: 'Active',
    },
    {
      id: generateId(),
      name: 'US Customers',
      description: 'Located in United States',
      contactCount: contacts.filter(c => c.country === 'USA').length,
      conditions: [{ id: generateId(), field: 'country', operator: 'is', value: 'USA' }],
      created: '2024-01-12',
      lastUpdated: '2024-01-18',
      status: 'Active',
    },
  ];
};

const generateForms = (): Form[] => {
  return [
    {
      id: generateId(),
      name: 'Newsletter Signup',
      type: 'Embedded',
      status: 'Active',
      submissions: 245,
      conversionRate: 3.2,
      created: '2024-01-01',
      lastModified: '2024-01-10',
      audience: 'All Subscribers',
      fields: [
        { id: generateId(), type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true, width: 'full' },
        { id: generateId(), type: 'text', label: 'First Name', placeholder: 'Enter your first name', required: false, width: 'half' },
        { id: generateId(), type: 'text', label: 'Last Name', placeholder: 'Enter your last name', required: false, width: 'half' },
      ],
      settings: { storeResponses: true, addToList: true, showOncePerSession: true },
      design: { backgroundColor: '#FFFFFF', textColor: '#1F2937', buttonColor: '#8B5CF6', buttonTextColor: '#FFFFFF', borderRadius: 8, fontFamily: 'Inter' },
      submissionsData: [],
    },
    {
      id: generateId(),
      name: 'Exit Intent Pop-up',
      type: 'Pop-up',
      status: 'Active',
      submissions: 89,
      conversionRate: 8.5,
      created: '2024-01-05',
      lastModified: '2024-01-12',
      audience: 'Website Visitors',
      fields: [
        { id: generateId(), type: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true, width: 'full' },
      ],
      settings: { storeResponses: true, addToList: true, showOncePerSession: true, trigger: 'exit_intent' },
      design: { backgroundColor: '#1F2937', textColor: '#FFFFFF', buttonColor: '#10B981', buttonTextColor: '#FFFFFF', borderRadius: 12, fontFamily: 'Inter' },
      submissionsData: [],
    },
    {
      id: generateId(),
      name: 'Contact Us Form',
      type: 'Embedded',
      status: 'Active',
      submissions: 156,
      conversionRate: 5.2,
      created: '2024-01-08',
      lastModified: '2024-01-15',
      audience: 'All Subscribers',
      fields: [
        { id: generateId(), type: 'text', label: 'Name', placeholder: 'Your name', required: true, width: 'full' },
        { id: generateId(), type: 'email', label: 'Email', placeholder: 'Your email', required: true, width: 'full' },
        { id: generateId(), type: 'textarea', label: 'Message', placeholder: 'Your message', required: true, width: 'full' },
      ],
      settings: { storeResponses: true, notifyEmail: 'support@yourbrand.com' },
      design: { backgroundColor: '#F9FAFB', textColor: '#1F2937', buttonColor: '#3B82F6', buttonTextColor: '#FFFFFF', borderRadius: 6, fontFamily: 'Inter' },
      submissionsData: [],
    },
  ];
};

const generateTemplates = (): Template[] => {
  return [
    { id: generateId(), name: 'Monthly Newsletter', category: 'Newsletter', thumbnail: '', htmlContent: '<html><body><h1>Newsletter</h1><p>Your content here...</p></body></html>', created: '2024-01-01', lastModified: '2024-01-15', uses: 234 },
    { id: generateId(), name: 'Product Launch', category: 'Announcement', thumbnail: '', htmlContent: '<html><body><h1>New Product!</h1><p>Introducing...</p></body></html>', created: '2024-01-05', lastModified: '2024-01-20', uses: 89 },
    { id: generateId(), name: 'Welcome Email', category: 'Welcome', thumbnail: '', htmlContent: '<html><body><h1>Welcome!</h1><p>Thank you for joining...</p></body></html>', created: '2024-01-10', lastModified: '2024-01-18', uses: 567 },
    { id: generateId(), name: 'Promotional Sale', category: 'Promotional', thumbnail: '', htmlContent: '<html><body><h1>SALE!</h1><p>Don\'t miss out...</p></body></html>', created: '2024-01-12', lastModified: '2024-01-22', uses: 123 },
    { id: generateId(), name: 'Event Invitation', category: 'Events', thumbnail: '', htmlContent: '<html><body><h1>You\'re Invited!</h1><p>Join us for...</p></body></html>', created: '2024-01-15', lastModified: '2024-01-25', uses: 45 },
    { id: generateId(), name: 'Thank You', category: 'General', thumbnail: '', htmlContent: '<html><body><h1>Thank You!</h1><p>We appreciate...</p></body></html>', created: '2024-01-18', lastModified: '2024-01-28', uses: 234 },
  ];
};

const generateIntegrations = (): Integration[] => {
  return [
    { id: generateId(), name: 'Shopify', description: 'E-commerce platform', logo: '', category: 'ecommerce', status: 'connected', connectedAt: '2024-01-10', lastSync: '2 hours ago' },
    { id: generateId(), name: 'WooCommerce', description: 'WordPress e-commerce', logo: '', category: 'ecommerce', status: 'available' },
    { id: generateId(), name: 'Google Analytics', description: 'Website analytics', logo: '', category: 'analytics', status: 'connected', connectedAt: '2024-01-05', lastSync: '1 hour ago' },
    { id: generateId(), name: 'Zapier', description: 'Automation platform', logo: '', category: 'productivity', status: 'available' },
    { id: generateId(), name: 'Salesforce', description: 'CRM platform', logo: '', category: 'crm', status: 'available' },
    { id: generateId(), name: 'Facebook', description: 'Social media integration', logo: '', category: 'social', status: 'connected', connectedAt: '2024-01-15', lastSync: '30 minutes ago' },
    { id: generateId(), name: 'Instagram', description: 'Social media integration', logo: '', category: 'social', status: 'connected', connectedAt: '2024-01-15', lastSync: '30 minutes ago' },
    { id: generateId(), name: 'Slack', description: 'Team communication', logo: '', category: 'productivity', status: 'available' },
    { id: generateId(), name: 'Stripe', description: 'Payment processing', logo: '', category: 'ecommerce', status: 'available' },
    { id: generateId(), name: 'HubSpot', description: 'Marketing automation', logo: '', category: 'crm', status: 'available' },
  ];
};

const generateEcommerceStore = (): EcommerceStore => {
  const products: Product[] = [
    { id: generateId(), name: 'Premium Plan - Monthly', price: 29.99, category: 'Subscription' },
    { id: generateId(), name: 'Premium Plan - Annual', price: 299.99, category: 'Subscription' },
    { id: generateId(), name: 'Basic Plan - Monthly', price: 9.99, category: 'Subscription' },
    { id: generateId(), name: 'Add-on: Extra Storage', price: 4.99, category: 'Add-on' },
    { id: generateId(), name: 'Gift Card $25', price: 25.00, category: 'Gift Card' },
    { id: generateId(), name: 'Gift Card $50', price: 50.00, category: 'Gift Card' },
    { id: generateId(), name: 'Gift Card $100', price: 100.00, category: 'Gift Card' },
    { id: generateId(), name: 'Consultation Session', price: 149.99, category: 'Service' },
  ];

  return {
    id: generateId(),
    platform: 'shopify',
    name: 'My Online Store',
    status: 'connected',
    connectedAt: '2024-01-10',
    lastSync: '2 hours ago',
    products,
    orders: [],
    customers: [],
    revenue: 45678.90,
  };
};

const generateBrandKit = (): BrandKit => ({
  id: generateId(),
  name: 'Default Brand',
  logo: '',
  colors: [
    { name: 'Primary', hex: '#8B5CF6' },
    { name: 'Secondary', hex: '#3B82F6' },
    { name: 'Accent', hex: '#10B981' },
    { name: 'Background', hex: '#FFFFFF' },
    { name: 'Text', hex: '#1F2937' },
  ],
  fonts: { heading: 'Inter', body: 'Inter' },
  businessInfo: {
    name: 'Your Company',
    address: '123 Business St, City, State 12345',
    phone: '+1 (555) 123-4567',
    website: 'www.yourcompany.com',
  },
});

const generateSMSCampaigns = (): SMSCampaign[] => {
  return [
    { id: generateId(), name: 'Flash Sale Alert', status: 'Sent', content: '🔥 FLASH SALE! 50% off everything for the next 2 hours only! Shop now: [link]', recipients: 5000, delivered: 4850, clicks: 234, revenue: 5670, sent: '2024-01-20' },
    { id: generateId(), name: 'Order Confirmation', status: 'Sent', content: '✅ Your order #12345 has been confirmed! Thank you for your purchase.', recipients: 150, delivered: 148, clicks: 12, revenue: 0, sent: '2024-01-18' },
    { id: generateId(), name: 'Cart Reminder', status: 'Scheduled', content: '⏰ You have items waiting in your cart! Complete your purchase: [link]', recipients: 0, delivered: 0, clicks: 0, revenue: 0, scheduledAt: '2024-01-25' },
  ];
};

const generateSocialPosts = (): SocialPost[] => {
  return [
    { id: generateId(), platform: 'facebook', content: 'Excited to announce our new product line! 🎉 Check it out at our website.', status: 'Published', publishedAt: '2024-01-20', engagement: { likes: 234, comments: 45, shares: 67, clicks: 123 }, created: '2024-01-19' },
    { id: generateId(), platform: 'instagram', content: 'New collection dropping tomorrow! Stay tuned... 📸', status: 'Scheduled', scheduledAt: '2024-01-25', engagement: { likes: 0, comments: 0, shares: 0, clicks: 0 }, created: '2024-01-22' },
    { id: generateId(), platform: 'twitter', content: 'Flash sale this weekend! Don\'t miss out on amazing deals. Link in bio!', status: 'Draft', engagement: { likes: 0, comments: 0, shares: 0, clicks: 0 }, created: '2024-01-23' },
  ];
}

const generateWebsites = (): Website[] => {
  return [
    { id: generateId(), name: 'Main Website', domain: 'www.yourcompany.com', status: 'active', connectedAt: '2024-01-01', trackingCode: 'UA-XXXXX-1', pages: [{ path: '/', title: 'Home', visits: 15000 }, { path: '/products', title: 'Products', visits: 8000 }, { path: '/about', title: 'About', visits: 3000 }, { path: '/contact', title: 'Contact', visits: 2000 }], totalVisits: 28000, subscribers: 1234 },
    { id: generateId(), name: 'Blog', domain: 'blog.yourcompany.com', status: 'active', connectedAt: '2024-01-05', trackingCode: 'UA-XXXXX-2', pages: [{ path: '/', title: 'Blog Home', visits: 5000 }, { path: '/tips', title: 'Tips & Tricks', visits: 3000 }, { path: '/news', title: 'News', visits: 2000 }], totalVisits: 10000, subscribers: 567 },
  ];
};

const generateLandingPages = (): LandingPage[] => {
  return [
    {
      id: generateId(),
      name: 'Product Launch Landing Page',
      description: 'Showcase our new product with hero section, features, and call to action',
      goal: 'product-sales',
      template: 'product-launch',
      status: 'Published',
      url: '/product-launch',
      sections: [
        { id: generateId(), type: 'hero', content: { title: 'Introducing Our Amazing New Product', subtitle: 'The solution you\'ve been waiting for is finally here!', ctaText: 'Get Started Now', ctaLink: '#signup' }, styles: {} },
        { id: generateId(), type: 'features', content: { title: 'Key Features', items: ['Easy to Use', 'Powerful & Fast', 'Secure & Reliable'] }, styles: {} },
        { id: generateId(), type: 'cta', content: { title: 'Ready to Get Started?', subtitle: 'Join thousands of happy customers today', ctaText: 'Sign Up Free', ctaLink: '#signup' }, styles: {} },
        { id: generateId(), type: 'footer', content: { text: '© 2024 Your Company. All rights reserved.' }, styles: {} },
      ],
      styles: { primaryColor: '#8B5CF6', backgroundColor: '#FFFFFF', fontFamily: 'Inter' },
      seo: { title: 'Product Launch - Your Company', description: 'Discover our amazing new product', keywords: 'product, launch, new, features' },
      analytics: { visitors: 3456, conversions: 234, conversionRate: 6.8 },
      created: '2024-01-10',
      lastModified: '2024-01-15',
    },
    {
      id: generateId(),
      name: 'Newsletter Signup',
      description: 'Capture email subscribers with a clean signup form',
      goal: 'email-signup',
      template: 'newsletter',
      status: 'Published',
      url: '/newsletter-signup',
      sections: [
        { id: generateId(), type: 'hero', content: { title: 'Stay Updated with Our Newsletter', subtitle: 'Get the latest news, tips, and exclusive offers delivered to your inbox', ctaText: 'Subscribe Now', ctaLink: '#form' }, styles: {} },
        { id: generateId(), type: 'testimonials', content: { title: 'What Subscribers Say', items: ['Great content every week!', 'Never miss an update!', 'Love the exclusive offers!'] }, styles: {} },
        { id: generateId(), type: 'footer', content: { text: '© 2024 Your Company. All rights reserved.' }, styles: {} },
      ],
      styles: { primaryColor: '#3B82F6', backgroundColor: '#FFFFFF', fontFamily: 'Inter' },
      seo: { title: 'Subscribe to Our Newsletter', description: 'Get updates delivered to your inbox', keywords: 'newsletter, subscribe, email, updates' },
      analytics: { visitors: 5678, conversions: 890, conversionRate: 15.7 },
      created: '2024-01-05',
      lastModified: '2024-01-20',
    },
    {
      id: generateId(),
      name: 'Free Webinar Registration',
      description: 'Promote and register attendees for our free webinar',
      goal: 'event-registration',
      template: 'webinar',
      status: 'Draft',
      url: '/webinar-registration',
      sections: [
        { id: generateId(), type: 'hero', content: { title: 'Free Webinar: Master Your Skills', subtitle: 'Join us for an exclusive free training session', date: 'February 15, 2024', time: '2:00 PM EST', ctaText: 'Register Now', ctaLink: '#form' }, styles: {} },
        { id: generateId(), type: 'features', content: { title: 'What You\'ll Learn', items: ['Powerful strategies', 'Proven techniques', 'Real-world examples', 'Q&A session'] }, styles: {} },
        { id: generateId(), type: 'cta', content: { title: 'Reserve Your Spot!', subtitle: 'Limited seats available', ctaText: 'Sign Up Free', ctaLink: '#form' }, styles: {} },
        { id: generateId(), type: 'footer', content: { text: '© 2024 Your Company. All rights reserved.' }, styles: {} },
      ],
      styles: { primaryColor: '#10B981', backgroundColor: '#FFFFFF', fontFamily: 'Inter' },
      seo: { title: 'Free Webinar Registration', description: 'Register for our free webinar', keywords: 'webinar, free, training, registration' },
      analytics: { visitors: 0, conversions: 0, conversionRate: 0 },
      created: '2024-01-20',
      lastModified: '2024-01-22',
    },
  ];
};

// ==================== CONTEXT ====================

interface AppContextType {
  // Data
  campaigns: Campaign[];
  automations: Automation[];
  contacts: Contact[];
  tags: Tag[];
  segments: Segment[];
  forms: Form[];
  templates: Template[];
  integrations: Integration[];
  ecommerceStore: EcommerceStore;
  brandKit: BrandKit;
  smsCampaigns: SMSCampaign[];
  socialPosts: SocialPost[];
  websites: Website[];
  landingPages: LandingPage[];

  // Campaign operations
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  addCampaign: (campaign: Omit<Campaign, 'id'>) => Campaign;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  duplicateCampaign: (id: string) => Campaign;

  // Automation operations
  setAutomations: React.Dispatch<React.SetStateAction<Automation[]>>;
  addAutomation: (automation: Omit<Automation, 'id'>) => Automation;
  updateAutomation: (id: string, updates: Partial<Automation>) => void;
  deleteAutomation: (id: string) => void;
  toggleAutomation: (id: string) => void;

  // Contact operations
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  addContact: (contact: Omit<Contact, 'id'>) => Contact;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  importContacts: (contacts: Omit<Contact, 'id'>[]) => void;
  addActivityToContact: (contactId: string, activity: Omit<ActivityEvent, 'id'>) => void;

  // Tag operations
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  addTag: (tag: Omit<Tag, 'id'>) => Tag;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  deleteTag: (id: string) => void;

  // Segment operations
  setSegments: React.Dispatch<React.SetStateAction<Segment[]>>;
  addSegment: (segment: Omit<Segment, 'id'>) => Segment;
  updateSegment: (id: string, updates: Partial<Segment>) => void;
  deleteSegment: (id: string) => void;

  // Form operations
  setForms: React.Dispatch<React.SetStateAction<Form[]>>;
  addForm: (form: Omit<Form, 'id'>) => Form;
  updateForm: (id: string, updates: Partial<Form>) => void;
  deleteForm: (id: string) => void;
  addFormSubmission: (formId: string, submission: Omit<FormSubmission, 'id'>) => void;

  // Template operations
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
  addTemplate: (template: Omit<Template, 'id'>) => Template;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;

  // Integration operations
  setIntegrations: React.Dispatch<React.SetStateAction<Integration[]>>;
  connectIntegration: (id: string) => void;
  disconnectIntegration: (id: string) => void;

  // E-commerce operations
  setEcommerceStore: React.Dispatch<React.SetStateAction<EcommerceStore>>;
  addOrder: (order: Omit<EcommerceOrder, 'id'>) => void;
  addCustomer: (customer: Omit<EcommerceCustomer, 'id'>) => void;

  // SMS operations
  setSmsCampaigns: React.Dispatch<React.SetStateAction<SMSCampaign[]>>;
  addSmsCampaign: (campaign: Omit<SMSCampaign, 'id'>) => SMSCampaign;
  updateSmsCampaign: (id: string, updates: Partial<SMSCampaign>) => void;
  deleteSmsCampaign: (id: string) => void;

  // Social operations
  setSocialPosts: React.Dispatch<React.SetStateAction<SocialPost[]>>;
  addSocialPost: (post: Omit<SocialPost, 'id'>) => SocialPost;
  updateSocialPost: (id: string, updates: Partial<SocialPost>) => void;
  deleteSocialPost: (id: string) => void;

  // Website operations
  setWebsites: React.Dispatch<React.SetStateAction<Website[]>>;
  addWebsite: (website: Omit<Website, 'id'>) => void;
  updateWebsite: (id: string, updates: Partial<Website>) => void;
  deleteWebsite: (id: string) => void;

  // Landing Page operations
  setLandingPages: React.Dispatch<React.SetStateAction<LandingPage[]>>;
  addLandingPage: (page: Omit<LandingPage, 'id'>) => LandingPage;
  updateLandingPage: (id: string, updates: Partial<LandingPage>) => void;
  deleteLandingPage: (id: string) => void;

  // Brand Kit operations
  setBrandKit: React.Dispatch<React.SetStateAction<BrandKit>>;
  updateBrandKit: (updates: Partial<BrandKit>) => void;

  // Stats
  stats: {
    totalSubscribers: number;
    totalContacts: number;
    activeSubscribers: number;
    unsubscribed: number;
    totalCampaigns: number;
    sentCampaigns: number;
    avgOpenRate: number;
    avgClickRate: number;
    totalRevenue: number;
    totalEmailsSent: number;
    engagementScore: number;
  };

  // Search
  search: (query: string) => {
    campaigns: Campaign[];
    contacts: Contact[];
    automations: Automation[];
    forms: Form[];
  };

  // Event simulation
  simulateCampaignEvents: (campaignId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with realistic data
  const initialContacts = generateContacts(2500);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [campaigns, setCampaigns] = useState<Campaign[]>(generateCampaigns(initialContacts));
  const [automations, setAutomations] = useState<Automation[]>(generateAutomations());
  const [tags, setTags] = useState<Tag[]>(generateTags());
  const [segments, setSegments] = useState<Segment[]>(generateSegments(initialContacts));
  const [forms, setForms] = useState<Form[]>(generateForms());
  const [templates, setTemplates] = useState<Template[]>(generateTemplates());
  const [integrations, setIntegrations] = useState<Integration[]>(generateIntegrations());
  const [ecommerceStore, setEcommerceStore] = useState<EcommerceStore>(generateEcommerceStore());
  const [brandKit, setBrandKit] = useState<BrandKit>(generateBrandKit());
  const [smsCampaigns, setSmsCampaigns] = useState<SMSCampaign[]>(generateSMSCampaigns());
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>(generateSocialPosts());
  const [websites, setWebsites] = useState<Website[]>(generateWebsites());
  const [landingPages, setLandingPages] = useState<LandingPage[]>(generateLandingPages());

  // Update segments with actual contact counts
  useEffect(() => {
    setSegments(prev => prev.map(seg => {
      let count = 0;
      seg.conditions.forEach(cond => {
        const filtered = contacts.filter(c => {
          switch (cond.field) {
            case 'lastActive':
              const days = parseInt(cond.value as string);
              return c.lastActive && new Date(c.lastActive) > new Date(Date.now() - days * 24 * 60 * 60 * 1000);
            case 'lifetimeValue':
              return c.lifetimeValue > (cond.value as number);
            case 'country':
              return c.country === cond.value;
            case 'joined':
              const joinDays = parseInt(cond.value as string);
              return c.joined && new Date(c.joined) > new Date(Date.now() - joinDays * 24 * 60 * 60 * 1000);
            default:
              return true;
          }
        });
        count = filtered.length;
      });
      return { ...seg, contactCount: count };
    }));
  }, [contacts]);

  // Campaign operations
  const addCampaign = useCallback((campaign: Omit<Campaign, 'id'>): Campaign => {
    const newCampaign = { ...campaign, id: generateId() };
    setCampaigns(prev => [newCampaign, ...prev]);
    return newCampaign;
  }, []);

  const updateCampaign = useCallback((id: string, updates: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteCampaign = useCallback((id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
  }, []);

  const duplicateCampaign = useCallback((id: string): Campaign => {
    const original = campaigns.find(c => c.id === id);
    if (!original) throw new Error('Campaign not found');
    const duplicate: Omit<Campaign, 'id'> = {
      ...original,
      name: `${original.name} (Copy)`,
      status: 'Draft',
      sent: null,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
    };
    return addCampaign(duplicate);
  }, [campaigns, addCampaign]);

  // Automation operations
  const addAutomation = useCallback((automation: Omit<Automation, 'id'>): Automation => {
    const newAutomation = { ...automation, id: generateId() };
    setAutomations(prev => [newAutomation, ...prev]);
    return newAutomation;
  }, []);

  const updateAutomation = useCallback((id: string, updates: Partial<Automation>) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  }, []);

  const deleteAutomation = useCallback((id: string) => {
    setAutomations(prev => prev.filter(a => a.id !== id));
  }, []);

  const toggleAutomation = useCallback((id: string) => {
    setAutomations(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status: a.status === 'Active' ? 'Paused' : 'Active' };
      }
      return a;
    }));
  }, []);

  // Contact operations
  const addContact = useCallback((contact: Omit<Contact, 'id'>): Contact => {
    const newContact = { ...contact, id: generateId() };
    setContacts(prev => [newContact, ...prev]);
    return newContact;
  }, []);

  const updateContact = useCallback((id: string, updates: Partial<Contact>) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteContact = useCallback((id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  }, []);

  const importContacts = useCallback((newContacts: Omit<Contact, 'id'>[]) => {
    const imported = newContacts.map(c => ({ ...c, id: generateId() }));
    setContacts(prev => [...imported, ...prev]);
  }, []);

  const addActivityToContact = useCallback((contactId: string, activity: Omit<ActivityEvent, 'id'>) => {
    setContacts(prev => prev.map(c => {
      if (c.id === contactId) {
        return { ...c, activity: [{ ...activity, id: generateId() }, ...c.activity] };
      }
      return c;
    }));
  }, []);

  // Tag operations
  const addTag = useCallback((tag: Omit<Tag, 'id'>): Tag => {
    const newTag = { ...tag, id: generateId() };
    setTags(prev => [newTag, ...prev]);
    return newTag;
  }, []);

  const updateTag = useCallback((id: string, updates: Partial<Tag>) => {
    setTags(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTag = useCallback((id: string) => {
    setTags(prev => prev.filter(t => t.id !== id));
  }, []);

  // Segment operations
  const addSegment = useCallback((segment: Omit<Segment, 'id'>): Segment => {
    const newSegment = { ...segment, id: generateId() };
    setSegments(prev => [newSegment, ...prev]);
    return newSegment;
  }, []);

  const updateSegment = useCallback((id: string, updates: Partial<Segment>) => {
    setSegments(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const deleteSegment = useCallback((id: string) => {
    setSegments(prev => prev.filter(s => s.id !== id));
  }, []);

  // Form operations
  const addForm = useCallback((form: Omit<Form, 'id'>): Form => {
    const newForm = { ...form, id: generateId() };
    setForms(prev => [newForm, ...prev]);
    return newForm;
  }, []);

  const updateForm = useCallback((id: string, updates: Partial<Form>) => {
    setForms(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  }, []);

  const deleteForm = useCallback((id: string) => {
    setForms(prev => prev.filter(f => f.id !== id));
  }, []);

  const addFormSubmission = useCallback((formId: string, submission: Omit<FormSubmission, 'id'>) => {
    setForms(prev => prev.map(f => {
      if (f.id === formId) {
        const newSubmission = { ...submission, id: generateId() };
        const newSubmissions = [...f.submissionsData, newSubmission];
        const conversionRate = (newSubmissions.length / (newSubmissions.length + 100)) * 100;
        return {
          ...f,
          submissionsData: newSubmissions,
          submissions: newSubmissions.length,
          conversionRate: Number(conversionRate.toFixed(1)),
        };
      }
      return f;
    }));
  }, []);

  // Template operations
  const addTemplate = useCallback((template: Omit<Template, 'id'>): Template => {
    const newTemplate = { ...template, id: generateId() };
    setTemplates(prev => [newTemplate, ...prev]);
    return newTemplate;
  }, []);

  const updateTemplate = useCallback((id: string, updates: Partial<Template>) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTemplate = useCallback((id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  }, []);

  // Integration operations
  const connectIntegration = useCallback((id: string) => {
    setIntegrations(prev => prev.map(i => {
      if (i.id === id) {
        return {
          ...i,
          status: 'connected' as const,
          connectedAt: new Date().toISOString().split('T')[0],
          lastSync: 'Just now',
        };
      }
      return i;
    }));
  }, []);

  const disconnectIntegration = useCallback((id: string) => {
    setIntegrations(prev => prev.map(i => {
      if (i.id === id) {
        return { ...i, status: 'disconnected' as const };
      }
      return i;
    }));
  }, []);

  // E-commerce operations
  const addOrder = useCallback((order: Omit<EcommerceOrder, 'id'>) => {
    const newOrder = { ...order, id: generateId() };
    setEcommerceStore(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders],
      revenue: prev.revenue + order.total,
    }));
  }, []);

  const addCustomer = useCallback((customer: Omit<EcommerceCustomer, 'id'>) => {
    const newCustomer = { ...customer, id: generateId() };
    setEcommerceStore(prev => ({
      ...prev,
      customers: [newCustomer, ...prev.customers],
    }));
  }, []);

  // SMS operations
  const addSmsCampaign = useCallback((campaign: Omit<SMSCampaign, 'id'>): SMSCampaign => {
    const newCampaign = { ...campaign, id: generateId() };
    setSmsCampaigns(prev => [newCampaign, ...prev]);
    return newCampaign;
  }, []);

  const updateSmsCampaign = useCallback((id: string, updates: Partial<SMSCampaign>) => {
    setSmsCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const deleteSmsCampaign = useCallback((id: string) => {
    setSmsCampaigns(prev => prev.filter(c => c.id !== id));
  }, []);

  // Social operations
  const addSocialPost = useCallback((post: Omit<SocialPost, 'id'>): SocialPost => {
    const newPost = { ...post, id: generateId() };
    setSocialPosts(prev => [newPost, ...prev]);
    return newPost;
  }, []);

  const updateSocialPost = useCallback((id: string, updates: Partial<SocialPost>) => {
    setSocialPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteSocialPost = useCallback((id: string) => {
    setSocialPosts(prev => prev.filter(p => p.id !== id));
  }, []);

  // Website operations
  const addWebsite = useCallback((website: Omit<Website, 'id'>) => {
    const newWebsite = { ...website, id: generateId() };
    setWebsites(prev => [...prev, newWebsite]);
  }, []);

  const updateWebsite = useCallback((id: string, updates: Partial<Website>) => {
    setWebsites(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  }, []);

  const deleteWebsite = useCallback((id: string) => {
    setWebsites(prev => prev.filter(w => w.id !== id));
  }, []);

  // Landing Page operations
  const addLandingPage = useCallback((page: Omit<LandingPage, 'id'>): LandingPage => {
    const newPage = { ...page, id: generateId() };
    setLandingPages(prev => [newPage, ...prev]);
    return newPage;
  }, []);

  const updateLandingPage = useCallback((id: string, updates: Partial<LandingPage>) => {
    setLandingPages(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteLandingPage = useCallback((id: string) => {
    setLandingPages(prev => prev.filter(p => p.id !== id));
  }, []);

  // Brand Kit operations
  const updateBrandKit = useCallback((updates: Partial<BrandKit>) => {
    setBrandKit(prev => ({ ...prev, ...updates }));
  }, []);

  // Stats calculation
  const stats = {
    totalSubscribers: contacts.filter(c => c.status === 'Subscribed').length,
    totalContacts: contacts.length,
    activeSubscribers: contacts.filter(c => c.status === 'Subscribed' && new Date(c.lastActive) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
    unsubscribed: contacts.filter(c => c.status === 'Unsubscribed').length,
    totalCampaigns: campaigns.length,
    sentCampaigns: campaigns.filter(c => c.status === 'Sent').length,
    avgOpenRate: campaigns.filter(c => c.status === 'Sent').reduce((acc, c) => acc + c.openRate, 0) / campaigns.filter(c => c.status === 'Sent').length || 0,
    avgClickRate: campaigns.filter(c => c.status === 'Sent').reduce((acc, c) => acc + c.clickRate, 0) / campaigns.filter(c => c.status === 'Sent').length || 0,
    totalRevenue: campaigns.reduce((acc, c) => acc + c.revenue, 0),
    totalEmailsSent: campaigns.reduce((acc, c) => acc + c.delivered, 0),
    engagementScore: Math.round((contacts.filter(c => c.status === 'Subscribed').length / contacts.length) * 100),
  };

  // Search function
  const search = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return {
      campaigns: campaigns.filter(c => 
        c.name.toLowerCase().includes(lowerQuery) || 
        c.subject.toLowerCase().includes(lowerQuery)
      ),
      contacts: contacts.filter(c => 
        c.email.toLowerCase().includes(lowerQuery) ||
        c.firstName.toLowerCase().includes(lowerQuery) ||
        c.lastName.toLowerCase().includes(lowerQuery)
      ),
      automations: automations.filter(a => 
        a.name.toLowerCase().includes(lowerQuery)
      ),
      forms: forms.filter(f => 
        f.name.toLowerCase().includes(lowerQuery)
      ),
    };
  }, [campaigns, contacts, automations, forms]);

  // Event simulation for campaigns
  const simulateCampaignEvents = useCallback((campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    const interval = setInterval(() => {
      setCampaigns(prev => prev.map(c => {
        if (c.id !== campaignId || c.status !== 'Sending') return c;

        const newOpens = Math.floor(c.delivered * 0.01);
        const newClicks = Math.floor(newOpens * 0.15);
        const newRevenue = Math.floor(Math.random() * 100);

        return {
          ...c,
          opens: c.opens + newOpens,
          uniqueOpens: c.uniqueOpens + Math.floor(newOpens * 0.8),
          clicks: c.clicks + newClicks,
          uniqueClicks: c.uniqueClicks + Math.floor(newClicks * 0.7),
          openRate: Number(((c.opens + newOpens) / c.delivered * 100).toFixed(1)),
          clickRate: Number(((c.uniqueClicks + newClicks) / c.delivered * 100).toFixed(1)),
          revenue: c.revenue + newRevenue,
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [campaigns]);

  const value: AppContextType = {
    campaigns,
    automations,
    contacts,
    tags,
    segments,
    forms,
    templates,
    integrations,
    ecommerceStore,
    brandKit,
    smsCampaigns,
    socialPosts,
    websites,
    setCampaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    duplicateCampaign,
    setAutomations,
    addAutomation,
    updateAutomation,
    deleteAutomation,
    toggleAutomation,
    setContacts,
    addContact,
    updateContact,
    deleteContact,
    importContacts,
    addActivityToContact,
    setTags,
    addTag,
    updateTag,
    deleteTag,
    setSegments,
    addSegment,
    updateSegment,
    deleteSegment,
    setForms,
    addForm,
    updateForm,
    deleteForm,
    addFormSubmission,
    setTemplates,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    setIntegrations,
    connectIntegration,
    disconnectIntegration,
    setEcommerceStore,
    addOrder,
    addCustomer,
    setSmsCampaigns,
    addSmsCampaign,
    updateSmsCampaign,
    deleteSmsCampaign,
    setSocialPosts,
    addSocialPost,
    updateSocialPost,
    deleteSocialPost,
    setWebsites,
    addWebsite,
    updateWebsite,
    deleteWebsite,
    landingPages,
    setLandingPages,
    addLandingPage,
    updateLandingPage,
    deleteLandingPage,
    setBrandKit,
    updateBrandKit,
    stats,
    search,
    simulateCampaignEvents,
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
