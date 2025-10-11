
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from './FormFieldEditor';

interface FormPreviewProps {
  fields: FormField[];
  settings: any;
  device: 'desktop' | 'tablet' | 'mobile';
}

export const FormPreview: React.FC<FormPreviewProps> = ({ fields, settings, device }) => {
  const getDeviceWidth = () => {
    switch (device) {
      case 'mobile': return 'max-w-sm';
      case 'tablet': return 'max-w-md';
      default: return 'max-w-2xl';
    }
  };

  const renderField = (field: FormField) => {
    const widthClass = field.width === 'half' ? 'w-1/2' : field.width === 'third' ? 'w-1/3' : 'w-full';
    
    return (
      <div key={field.id} className={`${widthClass} p-2`}>
        <label className="block text-sm font-medium mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {field.type === 'textarea' ? (
          <textarea
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            disabled
          />
        ) : field.type === 'select' ? (
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" disabled>
            <option>Choose an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        ) : field.type === 'checkbox' || field.type === 'radio' ? (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type={field.type}
                  name={field.id}
                  value={option}
                  className="text-blue-600"
                  disabled
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        )}
        
        {field.helpText && (
          <p className="text-xs text-gray-500 mt-1">{field.helpText}</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Form Preview - {device.charAt(0).toUpperCase() + device.slice(1)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`mx-auto ${getDeviceWidth()}`}>
            <div 
              className="p-6 rounded-lg shadow-sm border"
              style={{
                backgroundColor: settings.styling.backgroundColor,
                color: settings.styling.textColor,
                fontFamily: settings.styling.fontFamily,
                borderRadius: `${settings.styling.borderRadius}px`
              }}
            >
              {settings.title && (
                <h2 className="text-2xl font-bold mb-4">{settings.title}</h2>
              )}
              {settings.description && (
                <p className="text-gray-600 mb-6">{settings.description}</p>
              )}
              
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-wrap -mx-2">
                  {fields.map(renderField)}
                </div>
                
                <button
                  type="submit"
                  className="mt-6 px-6 py-3 rounded font-medium transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: settings.styling.buttonColor,
                    color: 'white',
                    borderRadius: `${settings.styling.borderRadius}px`
                  }}
                  disabled
                >
                  {settings.submitText}
                </button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
