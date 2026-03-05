import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LandingPageBuilder } from '@/components/LandingPageBuilder';
import { useAppContext, LandingPage } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const LandingPagesBuilderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addLandingPage, updateLandingPage, landingPages } = useAppContext();
  
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const state = location.state as any;
    if (state?.pageData) {
      setInitialData(state.pageData);
    } else {
      // If no pageData, create default
      setInitialData({
        name: 'New Landing Page',
        description: '',
        goal: 'lead-generation',
        template: 'blank',
        status: 'Draft',
        sections: [],
        styles: {
          primaryColor: '#8B5CF6',
          backgroundColor: '#FFFFFF',
          fontFamily: 'Inter',
        },
        seo: {
          title: '',
          description: '',
          keywords: '',
        },
        analytics: {
          visitors: 0,
          conversions: 0,
          conversionRate: 0,
        },
        created: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
      });
    }
  }, [location.state]);

  const handleSave = (pageData: LandingPage) => {
    if (initialData?.id) {
      // Update existing
      updateLandingPage(initialData.id, {
        ...pageData,
        lastModified: new Date().toISOString().split('T')[0],
      });
      toast({
        title: "Landing Page Updated",
        description: `"${pageData.name}" has been updated successfully.`,
      });
    } else {
      // Create new
      const newPage = addLandingPage(pageData);
      toast({
        title: "Landing Page Created",
        description: `"${pageData.name}" has been created successfully.`,
      });
      
      // Update URL to indicate editing
      navigate('/forms/landing/builder', { 
        state: { pageData: { ...pageData, id: newPage.id }, isEditing: true },
        replace: true
      });
      setInitialData({ ...pageData, id: newPage.id });
    }
  };

  const handleCancel = () => {
    navigate('/forms/landing');
  };

  if (!initialData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">Loading landing page builder...</p>
          <Button variant="link" onClick={() => navigate('/forms/landing')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Landing Pages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <LandingPageBuilder
      initialData={initialData}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
