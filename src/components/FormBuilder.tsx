
import React from 'react';
import { FormBuilder as NewFormBuilder } from './FormBuilder/FormBuilder';

interface FormBuilderProps {
  onSave?: (formData: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

export const FormBuilder: React.FC<FormBuilderProps> = (props) => {
  return <NewFormBuilder {...props} />;
};
