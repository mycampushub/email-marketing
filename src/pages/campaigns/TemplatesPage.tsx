import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Mail, ShoppingCart, Heart, Briefcase, Users, Calendar,
  Gift, Megaphone, Star, Eye, Copy, Download, Upload, Plus,
  Filter, Grid3X3, List, Smartphone, Monitor, Edit, Palette, MessageSquare
} from 'lucide-react';

interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  icon: any;
  preview: string;
  htmlContent: string;
  popularity: number;
  rating: number;
  uses: number;
  isCustom: boolean;
  tags: string[];
  industry: string;
  colors: string[];
}

export const TemplatesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const { toast } = useToast();
  const navigate = useNavigate();

  const templates: Template[] = [
    {
      id: 1,
      name: 'Welcome Series - Modern',
      description: 'Clean and welcoming design perfect for onboarding new subscribers with personalized content',
      category: 'Welcome',
      icon: Heart,
      preview: '/api/placeholder/400/300',
      htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff;">
          <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 36px;">👋</span>
            </div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 700; margin-bottom: 10px;">Welcome to Our Community!</h1>
            <p style="margin: 0; font-size: 18px; opacity: 0.9;">We're thrilled to have you on board</p>
          </header>
          <main style="padding: 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #1a202c; font-size: 24px; margin: 0 0 15px;">Here's what you can expect:</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
                <div style="text-align: center; padding: 20px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">📧</div>
                  <h3 style="margin: 0 0 10px; color: #2d3748;">Weekly Updates</h3>
                  <p style="margin: 0; color: #718096; font-size: 14px;">Get the latest news and insights delivered to your inbox</p>
                </div>
                <div style="text-align: center; padding: 20px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">🎁</div>
                  <h3 style="margin: 0 0 10px; color: #2d3748;">Exclusive Offers</h3>
                  <p style="margin: 0; color: #718096; font-size: 14px;">Special discounts and early access to new features</p>
                </div>
              </div>
            </div>
            <div style="text-align: center; margin: 40px 0;">
              <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 18px 36px; text-decoration: none; border-radius: 30px; font-weight: 600; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">Get Started</a>
            </div>
          </main>
          <footer style="background: #f8f9fa; padding: 30px; text-align: center; font-size: 14px; color: #6c757d; border-radius: 0 0 8px 8px;">
            <p style="margin: 0 0 15px;">Follow us on social media for daily tips and updates</p>
            <div style="margin-bottom: 20px;">
              <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Twitter</a>
              <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Facebook</a>
              <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">LinkedIn</a>
            </div>
            <p style="margin: 0;">© 2024 Your Company. All rights reserved.</p>
            <p style="margin: 10px 0 0;"><a href="#" style="color: #6c757d; font-size: 12px;">Unsubscribe</a> | <a href="#" style="color: #6c757d; font-size: 12px;">Update Preferences</a></p>
          </footer>
        </div>
      `,
      popularity: 95,
      rating: 4.8,
      uses: 12543,
      isCustom: false,
      tags: ['welcome', 'onboarding', 'modern', 'clean'],
      industry: 'General',
      colors: ['#667eea', '#764ba2', '#ffffff']
    },
    {
      id: 2,
      name: 'Newsletter - Professional',
      description: 'Clean and professional newsletter design with structured content layout for regular updates',
      category: 'Newsletter',
      icon: Mail,
      preview: '/api/placeholder/400/300',
      htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Georgia, serif; background: #ffffff;">
          <header style="border-bottom: 3px solid #2c5aa0; padding: 30px 40px; background: #ffffff;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h1 style="margin: 0; font-size: 28px; color: #2c5aa0; font-weight: normal;">The Weekly Update</h1>
              <span style="color: #6b7280; font-size: 14px;">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </header>
          
          <main style="padding: 40px;">
            <article style="margin-bottom: 40px; border-bottom: 1px solid #e5e7eb; padding-bottom: 30px;">
              <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 15px; line-height: 1.3;">Featured: Industry Trends and Insights</h2>
              <p style="color: #4b5563; line-height: 1.7; margin: 0 0 20px; font-size: 16px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
              <a href="#" style="color: #2c5aa0; text-decoration: none; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Read Full Article →</a>
            </article>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 40px;">
              <article>
                <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 10px;">Quick Updates</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                    <a href="#" style="color: #2c5aa0; text-decoration: none; font-size: 14px;">Product Feature Release 2.1</a>
                  </li>
                  <li style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                    <a href="#" style="color: #2c5aa0; text-decoration: none; font-size: 14px;">Customer Success Story: TechCorp</a>
                  </li>
                  <li style="padding: 10px 0;">
                    <a href="#" style="color: #2c5aa0; text-decoration: none; font-size: 14px;">Upcoming Webinar: Best Practices</a>
                  </li>
                </ul>
              </article>
              
              <article>
                <h3 style="color: #1f2937; font-size: 18px; margin: 0 0 10px;">This Week's Numbers</h3>
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
                  <div style="margin-bottom: 15px;">
                    <span style="display: block; font-size: 24px; font-weight: bold; color: #2c5aa0;">1,234</span>
                    <span style="font-size: 12px; color: #6b7280; text-transform: uppercase;">New Subscribers</span>
                  </div>
                  <div>
                    <span style="display: block; font-size: 24px; font-weight: bold; color: #059669;">98.5%</span>
                    <span style="font-size: 12px; color: #6b7280; text-transform: uppercase;">Uptime</span>
                  </div>
                </div>
              </article>
            </div>

            <div style="text-align: center; background: #f8fafc; padding: 30px; border-radius: 8px;">
              <h3 style="margin: 0 0 15px; color: #1f2937;">Stay Connected</h3>
              <p style="margin: 0 0 20px; color: #6b7280;">Follow us for daily updates and behind-the-scenes content</p>
              <a href="#" style="background: #2c5aa0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Visit Our Website</a>
            </div>
          </main>

          <footer style="background: #f3f4f6; padding: 30px; text-align: center; font-size: 12px; color: #6b7280;">
            <p style="margin: 0 0 10px;">© 2024 Your Company Name. All rights reserved.</p>
            <p style="margin: 0;">
              <a href="#" style="color: #6b7280; text-decoration: none;">Unsubscribe</a> | 
              <a href="#" style="color: #6b7280; text-decoration: none;">Update Preferences</a> | 
              <a href="#" style="color: #6b7280; text-decoration: none;">View in Browser</a>
            </p>
          </footer>
        </div>
      `,
      popularity: 88,
      rating: 4.6,
      uses: 8901,
      isCustom: false,
      tags: ['newsletter', 'professional', 'news', 'updates'],
      industry: 'Business',
      colors: ['#2c5aa0', '#ffffff', '#f8fafc']
    },
    {
      id: 3,
      name: 'Product Launch - Dynamic',
      description: 'Eye-catching promotional template with dynamic elements perfect for product announcements and launches',
      category: 'Promotional',
      icon: ShoppingCart,
      preview: '/api/placeholder/400/300',
      htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #000000;">
          <header style="background: linear-gradient(45deg, #ff6b6b, #ffa500, #ff6b6b); padding: 20px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: relative; z-index: 2;">
              <h1 style="margin: 0; font-size: 36px; font-weight: 900; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); margin-bottom: 10px;">🚀 NEW LAUNCH</h1>
              <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: white; margin-bottom: 20px;">Revolutionary Product X</h2>
              <div style="background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); padding: 15px 30px; border-radius: 25px; display: inline-block;">
                <span style="color: white; font-weight: bold; font-size: 18px;">LIMITED TIME: 50% OFF</span>
              </div>
            </div>
          </header>

          <main style="background: #ffffff; padding: 0;">
            <div style="padding: 40px; text-align: center;">
              <div style="background: #f8f9fa; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
                <div style="width: 120px; height: 120px; background: linear-gradient(135deg, #ff6b6b, #ffa500); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 48px; color: white;">📱</span>
                </div>
                <h3 style="margin: 0 0 15px; font-size: 24px; color: #333;">Meet Product X</h3>
                <p style="margin: 0; color: #666; line-height: 1.6; font-size: 16px;">The most advanced solution you've been waiting for. Engineered for perfection, designed for you.</p>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin: 40px 0; text-align: center;">
                <div style="padding: 20px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">⚡</div>
                  <h4 style="margin: 0 0 8px; font-size: 16px; color: #333;">Lightning Fast</h4>
                  <p style="margin: 0; font-size: 12px; color: #666;">10x faster performance</p>
                </div>
                <div style="padding: 20px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">🔒</div>
                  <h4 style="margin: 0 0 8px; font-size: 16px; color: #333;">Ultra Secure</h4>
                  <p style="margin: 0; font-size: 12px; color: #666;">Bank-level encryption</p>
                </div>
                <div style="padding: 20px;">
                  <div style="font-size: 32px; margin-bottom: 10px;">🎯</div>
                  <h4 style="margin: 0 0 8px; font-size: 16px; color: #333;">Precision Built</h4>
                  <p style="margin: 0; font-size: 12px; color: #666;">Crafted to perfection</p>
                </div>
              </div>

              <div style="background: linear-gradient(135deg, #ff6b6b, #ffa500); padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center;">
                <h3 style="color: white; margin: 0 0 15px; font-size: 28px; font-weight: bold;">Special Launch Price</h3>
                <div style="margin-bottom: 20px;">
                  <span style="color: rgba(255,255,255,0.8); font-size: 18px; text-decoration: line-through; margin-right: 15px;">$199</span>
                  <span style="color: white; font-size: 36px; font-weight: 900;">$99</span>
                </div>
                <p style="color: rgba(255,255,255,0.9); margin: 0 0 25px; font-size: 14px;">⏰ Limited time only - offer expires in 48 hours</p>
                <a href="#" style="background: white; color: #ff6b6b; padding: 18px 36px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-transform: uppercase; letter-spacing: 1px;">Get Yours Now</a>
              </div>

              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-top: 30px;">
                <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5;">
                  <strong>30-day money-back guarantee</strong> • Free shipping worldwide • 24/7 support
                </p>
              </div>
            </div>
          </main>

          <footer style="background: #1a1a1a; padding: 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <a href="#" style="color: #ff6b6b; text-decoration: none; margin: 0 15px; font-size: 14px;">Instagram</a>
              <a href="#" style="color: #ff6b6b; text-decoration: none; margin: 0 15px; font-size: 14px;">Twitter</a>
              <a href="#" style="color: #ff6b6b; text-decoration: none; margin: 0 15px; font-size: 14px;">Facebook</a>
            </div>
            <p style="margin: 0; color: #888; font-size: 12px;">© 2024 Your Company. All rights reserved.</p>
            <p style="margin: 10px 0 0; font-size: 11px;">
              <a href="#" style="color: #666; text-decoration: none;">Unsubscribe</a> | 
              <a href="#" style="color: #666; text-decoration: none;">Update Preferences</a>
            </p>
          </footer>
        </div>
      `,
      popularity: 92,
      rating: 4.7,
      uses: 15678,
      isCustom: false,
      tags: ['promotional', 'product', 'launch', 'sales', 'ecommerce'],
      industry: 'E-commerce',
      colors: ['#ff6b6b', '#ffa500', '#000000']
    },
    {
      id: 4,
      name: 'Corporate Update - Executive',
      description: 'Professional corporate template for business communications, quarterly updates, and executive announcements',
      category: 'Business',
      icon: Briefcase,
      preview: '/api/placeholder/400/300',
      htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff; border: 1px solid #e5e7eb;">
          <header style="background: #1f2937; color: white; padding: 40px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600; margin-bottom: 10px;">Quarterly Business Update</h1>
            <p style="margin: 0; opacity: 0.8; font-size: 16px;">Q4 2024 • Executive Summary</p>
          </header>

          <main style="padding: 40px;">
            <div style="margin-bottom: 40px;">
              <h2 style="color: #1f2937; font-size: 22px; margin: 0 0 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">CEO Message</h2>
              <p style="color: #4b5563; line-height: 1.7; margin: 0 0 20px; font-size: 16px;">Dear Team and Stakeholders,</p>
              <p style="color: #4b5563; line-height: 1.7; margin: 0 0 20px; font-size: 16px;">I'm pleased to share our Q4 results and outlook for the upcoming year. This quarter has been marked by significant achievements and strategic milestones that position us well for continued growth.</p>
            </div>

            <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 25px; margin-bottom: 30px;">
              <h3 style="color: #1f2937; margin: 0 0 15px; font-size: 18px;">Key Highlights</h3>
              <ul style="color: #4b5563; margin: 0; padding-left: 20px; line-height: 1.6;">
                <li style="margin-bottom: 8px;">Revenue increased by 24% year-over-year</li>
                <li style="margin-bottom: 8px;">Successfully launched three new product lines</li>
                <li style="margin-bottom: 8px;">Expanded into two new international markets</li>
                <li style="margin-bottom: 0;">Team growth of 35% with strategic hires</li>
              </ul>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 40px;">
              <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 25px; border-radius: 8px; text-align: center;">
                <div style="color: #059669; font-size: 32px; font-weight: bold; margin-bottom: 5px;">$2.4M</div>
                <div style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Quarterly Revenue</div>
              </div>
              <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 25px; border-radius: 8px; text-align: center;">
                <div style="color: #3b82f6; font-size: 32px; font-weight: bold; margin-bottom: 5px;">156%</div>
                <div style="color: #6b7280; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Growth Rate</div>
              </div>
            </div>

            <div style="margin-bottom: 40px;">
              <h3 style="color: #1f2937; font-size: 20px; margin: 0 0 20px;">Strategic Initiatives for 2025</h3>
              <div style="border-left: 1px solid #e5e7eb; padding-left: 25px;">
                <div style="margin-bottom: 25px;">
                  <h4 style="color: #1f2937; margin: 0 0 8px; font-size: 16px;">🎯 Market Expansion</h4>
                  <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">Accelerating our presence in European and Asian markets with localized offerings</p>
                </div>
                <div style="margin-bottom: 25px;">
                  <h4 style="color: #1f2937; margin: 0 0 8px; font-size: 16px;">🚀 Innovation Pipeline</h4>
                  <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">Investing $500K in R&D for next-generation product development</p>
                </div>
                <div>
                  <h4 style="color: #1f2937; margin: 0 0 8px; font-size: 16px;">👥 Team Excellence</h4>
                  <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">Comprehensive training programs and leadership development initiatives</p>
                </div>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #3b82f6, #1e40af); padding: 30px; border-radius: 8px; text-align: center; color: white;">
              <h3 style="margin: 0 0 15px; font-size: 20px;">Looking Ahead</h3>
              <p style="margin: 0 0 20px; opacity: 0.9; line-height: 1.6;">Together, we're building something extraordinary. Thank you for your continued dedication and commitment to excellence.</p>
              <div style="font-style: italic; font-size: 16px;">
                <p style="margin: 0;">Best regards,</p>
                <p style="margin: 5px 0 0; font-weight: 600;">John Smith, CEO</p>
              </div>
            </div>
          </main>

          <footer style="background: #f3f4f6; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
            <div style="margin-bottom: 15px;">
              <a href="#" style="color: #3b82f6; text-decoration: none; margin: 0 15px; font-size: 14px;">Company Portal</a>
              <a href="#" style="color: #3b82f6; text-decoration: none; margin: 0 15px; font-size: 14px;">HR Resources</a>
              <a href="#" style="color: #3b82f6; text-decoration: none; margin: 0 15px; font-size: 14px;">Contact</a>
            </div>
            <p style="margin: 0; color: #6b7280; font-size: 12px;">© 2024 Your Company Name. Confidential and Proprietary.</p>
            <p style="margin: 10px 0 0; font-size: 11px;">
              <a href="#" style="color: #9ca3af; text-decoration: none;">Update Preferences</a>
            </p>
          </footer>
        </div>
      `,
      popularity: 78,
      rating: 4.5,
      uses: 5234,
      isCustom: false,
      tags: ['business', 'corporate', 'professional', 'update', 'executive'],
      industry: 'Corporate',
      colors: ['#1f2937', '#3b82f6', '#ffffff']
    },
    {
      id: 5,
      name: 'Event Invitation - Premium',
      description: 'Elegant event invitation template with RSVP functionality and premium styling for special occasions',
      category: 'Event',
      icon: Calendar,
      preview: '/api/placeholder/400/300',
      htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Georgia', serif; background: #ffffff; border: 1px solid #d1d5db;">
          <header style="background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); color: white; padding: 50px 40px; text-align: center; position: relative;">
            <div style="position: absolute; top: 20px; left: 20px; right: 20px; bottom: 20px; border: 2px solid rgba(255,255,255,0.3); border-radius: 8px;"></div>
            <div style="position: relative; z-index: 2;">
              <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
              <h1 style="margin: 0; font-size: 32px; font-weight: normal; margin-bottom: 15px; letter-spacing: 1px;">You're Invited</h1>
              <div style="width: 60px; height: 2px; background: rgba(255,255,255,0.8); margin: 0 auto;"></div>
            </div>
          </header>

          <main style="padding: 50px 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #1f2937; font-size: 28px; margin: 0 0 20px; font-weight: normal;">Annual Gala Dinner</h2>
              <p style="color: #6b7280; font-size: 18px; line-height: 1.6; margin: 0; font-style: italic;">An evening of celebration, networking, and recognition</p>
            </div>

            <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 30px; margin-bottom: 40px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div>
                  <h3 style="color: #8b5cf6; margin: 0 0 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Date & Time</h3>
                  <p style="color: #1f2937; margin: 0; font-size: 18px; font-weight: 500;">Saturday, March 15th</p>
                  <p style="color: #6b7280; margin: 5px 0 0; font-size: 16px;">7:00 PM - 11:00 PM</p>
                </div>
                <div>
                  <h3 style="color: #8b5cf6; margin: 0 0 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Venue</h3>
                  <p style="color: #1f2937; margin: 0; font-size: 18px; font-weight: 500;">Grand Ballroom</p>
                  <p style="color: #6b7280; margin: 5px 0 0; font-size: 16px;">Luxury Hotel Downtown</p>
                </div>
              </div>
              
              <div style="margin-top: 30px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
                <h3 style="color: #8b5cf6; margin: 0 0 15px; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Dress Code</h3>
                <p style="color: #1f2937; margin: 0; font-size: 16px;">Black Tie Optional</p>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%); border-radius: 8px; padding: 30px; margin-bottom: 40px; text-align: center;">
              <h3 style="color: #1f2937; margin: 0 0 20px; font-size: 22px;">Evening Program</h3>
              <div style="text-align: left; max-width: 400px; margin: 0 auto;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%; margin-right: 15px;"></div>
                  <div>
                    <span style="color: #6b7280; font-size: 14px;">7:00 PM</span>
                    <span style="color: #1f2937; font-size: 16px; margin-left: 15px;">Cocktail Reception</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%; margin-right: 15px;"></div>
                  <div>
                    <span style="color: #6b7280; font-size: 14px;">8:00 PM</span>
                    <span style="color: #1f2937; font-size: 16px; margin-left: 15px;">Dinner Service</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%; margin-right: 15px;"></div>
                  <div>
                    <span style="color: #6b7280; font-size: 14px;">9:30 PM</span>
                    <span style="color: #1f2937; font-size: 16px; margin-left: 15px;">Awards Ceremony</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center;">
                  <div style="width: 8px; height: 8px; background: #8b5cf6; border-radius: 50%; margin-right: 15px;"></div>
                  <div>
                    <span style="color: #6b7280; font-size: 14px;">10:00 PM</span>
                    <span style="color: #1f2937; font-size: 16px; margin-left: 15px;">Dancing & Networking</span>
                  </div>
                </div>
              </div>
            </div>

            <div style="text-align: center; background: linear-gradient(135deg, #8b5cf6, #a78bfa); padding: 40px; border-radius: 8px; color: white;">
              <h3 style="margin: 0 0 20px; font-size: 24px; font-weight: normal;">RSVP Required</h3>
              <p style="margin: 0 0 25px; opacity: 0.9; line-height: 1.5;">Please confirm your attendance by March 1st</p>
              <div style="display: flex; gap: 15px; justify-content: center;">
                <a href="#" style="background: white; color: #8b5cf6; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">I'll Attend</a>
                <a href="#" style="background: rgba(255,255,255,0.2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block; border: 1px solid rgba(255,255,255,0.3);">Can't Make It</a>
              </div>
            </div>

            <div style="text-align: center; margin-top: 40px;">
              <p style="color: #6b7280; font-size: 14px; line-height: 1.5; margin: 0;">
                Questions? Contact our event team at <a href="mailto:events@company.com" style="color: #8b5cf6; text-decoration: none;">events@company.com</a> or call (555) 123-4567
              </p>
            </div>
          </main>

          <footer style="background: #1f2937; color: white; padding: 30px; text-align: center;">
            <p style="margin: 0 0 15px; font-size: 16px;">We look forward to celebrating with you!</p>
            <div style="margin-bottom: 20px;">
              <a href="#" style="color: #a78bfa; text-decoration: none; margin: 0 10px; font-size: 14px;">Event Details</a>
              <a href="#" style="color: #a78bfa; text-decoration: none; margin: 0 10px; font-size: 14px;">Hotel Booking</a>
              <a href="#" style="color: #a78bfa; text-decoration: none; margin: 0 10px; font-size: 14px;">Transportation</a>
            </div>
            <p style="margin: 0; opacity: 0.7; font-size: 12px;">© 2024 Your Organization. All rights reserved.</p>
          </footer>
        </div>
      `,
      popularity: 85,
      rating: 4.6,
      uses: 7890,
      isCustom: false,
      tags: ['event', 'invitation', 'premium', 'elegant', 'rsvp'],
      industry: 'Events',
      colors: ['#8b5cf6', '#a78bfa', '#ffffff']
    },
    {
      id: 6,
      name: 'Survey Request - Engaging',
      description: 'Interactive survey template with progress indicators and incentive offers to maximize response rates',
      category: 'Survey',
      icon: MessageSquare,
      preview: '/api/placeholder/400/300',
      htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #ffffff;">
          <header style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="font-size: 64px; margin-bottom: 20px;">📝</div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; margin-bottom: 15px;">Your Opinion Matters!</h1>
            <p style="margin: 0; font-size: 18px; opacity: 0.9;">Help us improve by sharing your thoughts</p>
          </header>

          <main style="padding: 40px;">
            <div style="text-align: center; margin-bottom: 35px;">
              <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 15px;">Quick 2-Minute Survey</h2>
              <p style="color: #6b7280; line-height: 1.6; margin: 0; font-size: 16px;">We'd love to hear about your recent experience with our service. Your feedback helps us serve you better!</p>
            </div>

            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 25px; margin-bottom: 30px; text-align: center;">
              <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 15px;">
                <div style="font-size: 24px; margin-right: 10px;">🎁</div>
                <h3 style="color: #059669; margin: 0; font-size: 18px; font-weight: 600;">Complete & Get Rewarded!</h3>
              </div>
              <p style="color: #16a34a; margin: 0; font-size: 14px; line-height: 1.5;">Finish the survey and get a <strong>20% discount code</strong> for your next purchase + entry into our monthly $100 gift card drawing!</p>
            </div>

            <div style="margin-bottom: 35px;">
              <h3 style="color: #1f2937; margin: 0 0 20px; font-size: 20px; text-align: center;">What We'll Ask About:</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="display: flex; align-items: start; padding: 15px; background: #f8fafc; border-radius: 6px;">
                  <div style="font-size: 20px; margin-right: 12px; margin-top: 2px;">⭐</div>
                  <div>
                    <h4 style="margin: 0 0 5px; color: #1f2937; font-size: 14px; font-weight: 600;">Service Quality</h4>
                    <p style="margin: 0; color: #6b7280; font-size: 12px;">How did we do?</p>
                  </div>
                </div>
                <div style="display: flex; align-items: start; padding: 15px; background: #f8fafc; border-radius: 6px;">
                  <div style="font-size: 20px; margin-right: 12px; margin-top: 2px;">🚀</div>
                  <div>
                    <h4 style="margin: 0 0 5px; color: #1f2937; font-size: 14px; font-weight: 600;">Improvements</h4>
                    <p style="margin: 0; color: #6b7280; font-size: 12px;">What can we do better?</p>
                  </div>
                </div>
                <div style="display: flex; align-items: start; padding: 15px; background: #f8fafc; border-radius: 6px;">
                  <div style="font-size: 20px; margin-right: 12px; margin-top: 2px;">💡</div>
                  <div>
                    <h4 style="margin: 0 0 5px; color: #1f2937; font-size: 14px; font-weight: 600;">New Features</h4>
                    <p style="margin: 0; color: #6b7280; font-size: 12px;">What would you like to see?</p>
                  </div>
                </div>
                <div style="display: flex; align-items: start; padding: 15px; background: #f8fafc; border-radius: 6px;">
                  <div style="font-size: 20px; margin-right: 12px; margin-top: 2px;">👥</div>
                  <div>
                    <h4 style="margin: 0 0 5px; color: #1f2937; font-size: 14px; font-weight: 600;">Recommendations</h4>
                    <p style="margin: 0; color: #6b7280; font-size: 12px;">Would you recommend us?</p>
                  </div>
                </div>
              </div>
            </div>

            <div style="background: #1f2937; border-radius: 8px; padding: 30px; text-align: center; margin-bottom: 30px;">
              <h3 style="color: white; margin: 0 0 15px; font-size: 22px;">Ready to Get Started?</h3>
              <p style="color: #d1d5db; margin: 0 0 25px; line-height: 1.5;">The survey takes less than 2 minutes and your responses are completely anonymous.</p>
              
              <div style="margin-bottom: 25px;">
                <div style="display: inline-flex; align-items: center; background: rgba(16, 185, 129, 0.1); padding: 8px 16px; border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.3);">
                  <div style="font-size: 16px; margin-right: 8px;">⏱️</div>
                  <span style="color: #10b981; font-size: 14px; font-weight: 500;">Estimated time: 2 minutes</span>
                </div>
              </div>

              <a href="#" style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);">Start Survey Now</a>
            </div>

            <div style="text-align: center; padding: 20px; background: #fef3c7; border-radius: 6px; border: 1px solid #fbbf24;">
              <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                <div style="font-size: 20px; margin-right: 8px;">🔒</div>
                <span style="color: #92400e; font-weight: 600; font-size: 14px;">Privacy Protected</span>
              </div>
              <p style="color: #92400e; margin: 0; font-size: 12px; line-height: 1.4;">Your responses are confidential and will only be used to improve our services. We'll never share your personal information.</p>
            </div>

            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Questions about this survey? <a href="mailto:feedback@company.com" style="color: #10b981; text-decoration: none;">Contact our team</a>
              </p>
            </div>
          </main>

          <footer style="background: #f3f4f6; padding: 25px; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="margin: 0 0 10px; color: #6b7280; font-size: 12px;">Thank you for being a valued customer!</p>
            <p style="margin: 0; font-size: 11px;">
              <a href="#" style="color: #9ca3af; text-decoration: none;">Unsubscribe</a> | 
              <a href="#" style="color: #9ca3af; text-decoration: none;">Update Preferences</a>
            </p>
          </footer>
        </div>
      `,
      popularity: 89,
      rating: 4.7,
      uses: 11234,
      isCustom: false,
      tags: ['survey', 'feedback', 'interactive', 'incentive', 'engaging'],
      industry: 'Research',
      colors: ['#10b981', '#059669', '#ffffff']
    }
  ];

  const categories = ['All', 'Welcome', 'Newsletter', 'Promotional', 'Business', 'Event', 'Survey'];
  const industries = ['All', 'General', 'Business', 'E-commerce', 'Corporate', 'Events', 'Research'];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'All' || template.industry === selectedIndustry;
    return matchesSearch && matchesCategory && matchesIndustry;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return b.rating - a.rating;
      case 'uses':
        return b.uses - a.uses;
      case 'newest':
        return b.id - a.id;
      default: // popularity
        return b.popularity - a.popularity;
    }
  });

  const handleUseTemplate = (template: Template) => {
    // This would typically navigate to the campaign creation page with the template pre-loaded
    navigate('/campaigns/create', { state: { template } });
    toast({
      title: "Template Selected",
      description: `${template.name} has been loaded into the campaign builder.`,
    });
  };

  const handlePreviewTemplate = (template: Template) => {
    setPreviewTemplate(template);
  };

  const handleCreateCustomTemplate = () => {
    toast({
      title: "Template Builder Opening",
      description: "Loading advanced template editor with drag-and-drop capabilities...",
    });
    // This would open the advanced template editor
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Professional Email Templates</h1>
            <p className="text-muted-foreground">Choose from expertly designed templates or create your own</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleCreateCustomTemplate}>
              <Plus className="h-4 w-4 mr-2" />
              Create Custom
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Import Template
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{templates.length}</div>
              <div className="text-sm text-muted-foreground">Total Templates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(templates.reduce((acc, t) => acc + t.rating, 0) / templates.length * 10) / 10}</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{templates.filter(t => t.isCustom).length}</div>
              <div className="text-sm text-muted-foreground">Custom Templates</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search templates by name, category, or tags..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="uses">Most Used</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active filters display */}
        {(selectedCategory !== 'All' || selectedIndustry !== 'All' || searchTerm) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedCategory !== 'All' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedCategory}
                <button onClick={() => setSelectedCategory('All')} className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5">×</button>
              </Badge>
            )}
            {selectedIndustry !== 'All' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedIndustry}
                <button onClick={() => setSelectedIndustry('All')} className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5">×</button>
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5">×</button>
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSelectedCategory('All');
                setSelectedIndustry('All');
                setSearchTerm('');
              }}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search terms or filters</p>
          <Button onClick={() => {
            setSearchTerm('');
            setSelectedCategory('All');
            setSelectedIndustry('All');
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredTemplates.map((template) => (
            <Card key={template.id} className={`hover:shadow-lg transition-all duration-200 ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              {viewMode === 'grid' ? (
                <>
                  <CardHeader className="pb-3">
                    <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 rounded-md mb-4 flex items-center justify-center relative overflow-hidden">
                      <template.icon className="h-12 w-12 text-muted-foreground" />
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Badge variant="secondary" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          {template.rating}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{template.category}</Badge>
                          <Badge variant="secondary">{template.industry}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm line-clamp-2 mb-4">
                      {template.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{template.uses.toLocaleString()} uses</span>
                      <span>Popularity: {template.popularity}%</span>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleUseTemplate(template)}
                      >
                        Use Template
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handlePreviewTemplate(template)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast({ title: "Template Copied", description: `${template.name} copied to clipboard` })}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <div className="flex w-full">
                  <div className="w-48 flex-shrink-0">
                    <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 rounded-md m-4 flex items-center justify-center relative">
                      <template.icon className="h-8 w-8 text-muted-foreground" />
                      <Badge variant="secondary" className="absolute top-1 right-1 text-xs">
                        <Star className="h-2 w-2 mr-1" />
                        {template.rating}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{template.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{template.category}</Badge>
                          <Badge variant="secondary" className="text-xs">{template.industry}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleUseTemplate(template)}>Use Template</Button>
                        <Button size="sm" variant="outline" onClick={() => handlePreviewTemplate(template)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{template.uses.toLocaleString()} uses</span>
                      <span>Popularity: {template.popularity}%</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Enhanced Preview Modal */}
      {previewTemplate && (
        <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
          <DialogContent className="max-w-6xl h-[90vh] p-0">
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-80 bg-accent/20 border-r flex flex-col">
                <DialogHeader className="p-6 border-b">
                  <DialogTitle className="flex items-center gap-2">
                    <previewTemplate.icon className="h-5 w-5" />
                    {previewTemplate.name}
                  </DialogTitle>
                  <DialogDescription>{previewTemplate.description}</DialogDescription>
                </DialogHeader>

                <div className="flex-1 p-6 space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Template Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <Badge variant="outline">{previewTemplate.category}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Industry:</span>
                        <span>{previewTemplate.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-500 mr-1" />
                          {previewTemplate.rating}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uses:</span>
                        <span>{previewTemplate.uses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {previewTemplate.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Color Palette</h4>
                    <div className="flex gap-2">
                      {previewTemplate.colors.map(color => (
                        <div 
                          key={color}
                          className="w-6 h-6 rounded border border-border"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Device Preview</h4>
                    <div className="flex gap-2">
                      <Button
                        variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewDevice('desktop')}
                      >
                        <Monitor className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreviewDevice('mobile')}
                      >
                        <Smartphone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t space-y-2">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      handleUseTemplate(previewTemplate);
                      setPreviewTemplate(null);
                    }}
                  >
                    Use This Template
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download HTML
                  </Button>
                </div>
              </div>

              {/* Preview Area */}
              <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900">
                <div className="p-6">
                  <div className={`mx-auto bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ${
                    previewDevice === 'mobile' ? 'max-w-sm' : 'max-w-2xl'
                  }`}>
                    <div 
                      dangerouslySetInnerHTML={{ __html: previewTemplate.htmlContent }}
                      className="min-h-96"
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};