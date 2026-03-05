import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FormBuilder } from '@/components/FormBuilder/FormBuilder';
import { useAppContext, Form } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const FormsBuilderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addForm, updateForm, forms, addFormSubmission } = useAppContext();
  
  const [initialData, setInitialData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const state = location.state as any;
    if (state?.formData) {
      setInitialData(state.formData);
      setIsEditing(state.isEditing || false);
    } else {
      // If no formData, create default
      setInitialData({
        name: 'New Form',
        type: 'Embedded',
        status: 'Draft',
        submissions: 0,
        conversionRate: 0,
        created: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        audience: 'All Subscribers',
        fields: [],
        settings: {
          storeResponses: true,
          addToList: true,
          showOncePerSession: true,
        },
        design: {
          backgroundColor: '#FFFFFF',
          textColor: '#1F2937',
          buttonColor: '#8B5CF6',
          buttonTextColor: '#FFFFFF',
          borderRadius: 8,
          fontFamily: 'Inter',
        },
        submissionsData: [],
      });
    }
  }, [location.state]);

  const handleSave = (formData: any) => {
    if (isEditing && initialData?.id) {
      // Update existing form
      updateForm(initialData.id, {
        name: formData.name || initialData.name,
        lastModified: new Date().toISOString().split('T')[0],
        fields: formData.fields || [],
        settings: formData.settings || initialData.settings,
        design: formData.design || initialData.design,
      });
      toast({
        title: "Form Updated",
        description: `"${formData.name || initialData.name}" has been updated successfully.`,
      });
    } else {
      // Create new form
      const newForm = {
        name: formData.name || 'New Form',
        type: initialData?.type || 'Embedded',
        status: 'Draft' as const,
        submissions: 0,
        conversionRate: 0,
        created: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        audience: initialData?.audience || 'All Subscribers',
        fields: formData.fields || [],
        settings: formData.settings || {
          storeResponses: true,
          addToList: true,
          showOncePerSession: true,
        },
        design: formData.design || {
          backgroundColor: '#FFFFFF',
          textColor: '#1F2937',
          buttonColor: '#8B5CF6',
          buttonTextColor: '#FFFFFF',
          borderRadius: 8,
          fontFamily: 'Inter',
        },
        submissionsData: [],
      };
      
      const addedForm = addForm(newForm);
      
      toast({
        title: "Form Created",
        description: `"${newForm.name}" has been created successfully.`,
      });
      
      // Update URL to indicate editing
      navigate('/forms/builder', { 
        state: { 
          formData: { ...newForm, id: addedForm.id }, 
          isEditing: true 
        },
        replace: true
      });
      setIsEditing(true);
      setInitialData({ ...newForm, id: addedForm.id });
    }
  };

  const handleCancel = () => {
    navigate('/forms');
  };

  if (!initialData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-muted-foreground">Loading form builder...</p>
          <Button variant="link" onClick={() => navigate('/forms')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forms
          </Button>
        </div>
      </div>
    );
  }

  return (
    <FormBuilder
      initialData={initialData}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};
