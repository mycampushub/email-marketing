
import { useState, useCallback, useMemo } from 'react';
import { FormField } from './FormFieldEditor';

interface FormSettings {
  title: string;
  description: string;
  submitText: string;
  redirectUrl: string;
  confirmationMessage: string;
  styling: {
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    borderRadius: string;
    fontFamily: string;
    maxWidth: string;
    padding: string;
  };
}

interface HistoryState {
  fields: FormField[];
  settings: FormSettings;
}

export const useFormBuilder = (initialData?: any) => {
  const [fields, setFields] = useState<FormField[]>(initialData?.fields || []);
  const [formSettings, setFormSettings] = useState<FormSettings>(
    initialData?.settings || {
      title: 'New Form',
      description: '',
      submitText: 'Submit',
      redirectUrl: '',
      confirmationMessage: 'Thank you for your submission!',
      styling: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        buttonColor: '#007bff',
        borderRadius: '8',
        fontFamily: 'Inter',
        maxWidth: '600px',
        padding: '24px'
      }
    }
  );
  
  const [activeTab, setActiveTab] = useState('builder');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  // History management
  const [history, setHistory] = useState<HistoryState[]>([{ fields, settings: formSettings }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const addToHistory = useCallback((newFields: FormField[], newSettings: FormSettings) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ fields: newFields, settings: newSettings });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (canUndo) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      setFields(state.fields);
      setFormSettings(state.settings);
      setHistoryIndex(newIndex);
    }
  }, [canUndo, historyIndex, history]);

  const redo = useCallback(() => {
    if (canRedo) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      setFields(state.fields);
      setFormSettings(state.settings);
      setHistoryIndex(newIndex);
    }
  }, [canRedo, historyIndex, history]);

  const addField = useCallback((type: FormField['type']) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `New ${type} field`,
      placeholder: type === 'email' ? 'Enter your email' : `Enter ${type}...`,
      required: false,
      width: 'full',
      options: ['select', 'radio', 'checkbox'].includes(type) ? ['Option 1', 'Option 2'] : undefined
    };
    
    const newFields = [...fields, newField];
    setFields(newFields);
    addToHistory(newFields, formSettings);
  }, [fields, formSettings, addToHistory]);

  const removeField = useCallback((fieldId: string) => {
    const newFields = fields.filter(field => field.id !== fieldId);
    setFields(newFields);
    addToHistory(newFields, formSettings);
  }, [fields, formSettings, addToHistory]);

  const updateField = useCallback((fieldId: string, updates: Partial<FormField>) => {
    const newFields = fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    );
    setFields(newFields);
    addToHistory(newFields, formSettings);
  }, [fields, formSettings, addToHistory]);

  const moveField = useCallback((fromIndex: number, toIndex: number) => {
    const newFields = [...fields];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    setFields(newFields);
    addToHistory(newFields, formSettings);
  }, [fields, formSettings, addToHistory]);

  const updateFormSettings = useCallback((updates: Partial<FormSettings>) => {
    const newSettings = { ...formSettings, ...updates };
    setFormSettings(newSettings);
    addToHistory(fields, newSettings);
  }, [formSettings, fields, addToHistory]);

  const exportHTML = useCallback(() => {
    const fieldsHTML = fields.map(field => {
      const widthClass = field.width === 'half' ? 'w-1/2' : field.width === 'third' ? 'w-1/3' : 'w-full';
      let fieldHTML = '';
      
      switch (field.type) {
        case 'text':
        case 'email':
        case 'phone':
        case 'date':
        case 'number':
          fieldHTML = `
            <input 
              type="${field.type}" 
              name="${field.id}" 
              placeholder="${field.placeholder || ''}" 
              ${field.required ? 'required' : ''} 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          `;
          break;
        case 'textarea':
          fieldHTML = `
            <textarea 
              name="${field.id}" 
              placeholder="${field.placeholder || ''}" 
              ${field.required ? 'required' : ''}
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          `;
          break;
        case 'select':
          fieldHTML = `
            <select 
              name="${field.id}" 
              ${field.required ? 'required' : ''}
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose an option</option>
              ${field.options?.map(option => `<option value="${option}">${option}</option>`).join('') || ''}
            </select>
          `;
          break;
        case 'checkbox':
        case 'radio':
          fieldHTML = `
            <div class="space-y-2">
              ${field.options?.map(option => `
                <label class="flex items-center space-x-2">
                  <input 
                    type="${field.type}" 
                    name="${field.id}" 
                    value="${option}" 
                    ${field.required ? 'required' : ''}
                    class="text-blue-600"
                  />
                  <span>${option}</span>
                </label>
              `).join('') || ''}
            </div>
          `;
          break;
      }
      
      return `
        <div class="${widthClass} mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            ${field.label}${field.required ? ' *' : ''}
          </label>
          ${fieldHTML}
          ${field.helpText ? `<p class="text-xs text-gray-500 mt-1">${field.helpText}</p>` : ''}
        </div>
      `;
    }).join('');

    return `
      <form 
        class="form-container" 
        style="
          background-color: ${formSettings.styling.backgroundColor};
          color: ${formSettings.styling.textColor};
          font-family: ${formSettings.styling.fontFamily};
          border-radius: ${formSettings.styling.borderRadius}px;
          padding: ${formSettings.styling.padding};
          max-width: ${formSettings.styling.maxWidth};
          margin: 0 auto;
        "
      >
        ${formSettings.title ? `<h2 class="text-2xl font-bold mb-4">${formSettings.title}</h2>` : ''}
        ${formSettings.description ? `<p class="text-gray-600 mb-6">${formSettings.description}</p>` : ''}
        
        <div class="flex flex-wrap -mx-2">
          ${fieldsHTML}
        </div>
        
        <button 
          type="submit" 
          style="
            background-color: ${formSettings.styling.buttonColor};
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: ${formSettings.styling.borderRadius}px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            margin-top: 16px;
          "
          class="hover:opacity-90 transition-opacity"
        >
          ${formSettings.submitText}
        </button>
      </form>
    `;
  }, [fields, formSettings]);

  const saveForm = useCallback(() => {
    return {
      id: Date.now(),
      fields,
      settings: formSettings,
      html: exportHTML(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
  }, [fields, formSettings, exportHTML]);

  const importForm = useCallback((formData: any) => {
    if (formData.fields && formData.settings) {
      setFields(formData.fields);
      setFormSettings(formData.settings);
      addToHistory(formData.fields, formData.settings);
    }
  }, [addToHistory]);

  return {
    fields,
    formSettings,
    activeTab,
    previewDevice,
    history,
    canUndo,
    canRedo,
    addField,
    removeField,
    updateField,
    moveField,
    updateFormSettings,
    setActiveTab,
    setPreviewDevice,
    undo,
    redo,
    saveForm,
    exportHTML,
    importForm
  };
};
