
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Mail, Zap, FileText, BarChart3, Palette, Globe } from 'lucide-react';

export const CreatePage: React.FC = () => {
  const navigate = useNavigate();

  const createOptions = [
    {
      title: 'Email Campaign',
      description: 'Create and send beautiful email campaigns',
      icon: Mail,
      action: () => navigate('/campaigns/create'),
      context: 'Start a new email campaign with drag-and-drop editor'
    },
    {
      title: 'Automation',
      description: 'Set up automated email journeys',
      icon: Zap,
      action: () => navigate('/automations/prebuilt'),
      context: 'Create automated email sequences and customer journeys'
    },
    {
      title: 'Signup Form',
      description: 'Capture new subscribers',
      icon: FileText,
      action: () => navigate('/forms/signup'),
      context: 'Design forms to grow your email list'
    },
    {
      title: 'Landing Page',
      description: 'Build conversion-focused pages',
      icon: Globe,
      action: () => navigate('/forms/landing'),
      context: 'Create landing pages that convert visitors to subscribers'
    },
    {
      title: 'Survey',
      description: 'Gather feedback from your audience',
      icon: BarChart3,
      action: () => navigate('/audience/surveys'),
      context: 'Create surveys to understand your audience better'
    },
    {
      title: 'Brand Kit',
      description: 'Organize your brand assets',
      icon: Palette,
      action: () => navigate('/content/brand'),
      context: 'Upload and organize your logos, colors, and fonts'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Something New</h1>
        <p className="text-gray-600">Choose what you'd like to create to get started.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {createOptions.map((option, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={option.action}
            data-voice-context={option.context}
            data-voice-action={`Creating ${option.title.toLowerCase()}`}
          >
            <CardHeader className="text-center">
              <option.icon className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <CardTitle className="text-xl">{option.title}</CardTitle>
              <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full" data-voice-context={`Start creating ${option.title.toLowerCase()}`}>
                Create {option.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
