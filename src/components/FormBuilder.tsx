import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
// Removed drag and drop for now - can be added later with @dnd-kit
import { 
  Plus, 
  Trash2, 
  Eye, 
  Code, 
  Settings, 
  Type, 
  Mail, 
  Phone, 
  Calendar,
  Hash,
  ToggleLeft,
  CheckSquare,
  MousePointer,
  Palette
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'number';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: string;
}

interface FormBuilderProps {
  onSave?: (formData: any) => void;
  onCancel?: () => void;
  initialData?: any;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({ 
  onSave, 
  onCancel, 
  initialData 
}) => {
  const [fields, setFields] = useState<FormField[]>(initialData?.fields || []);
  const [formSettings, setFormSettings] = useState({
    title: initialData?.title || 'New Form',
    description: initialData?.description || '',
    submitText: initialData?.submitText || 'Submit',
    redirectUrl: initialData?.redirectUrl || '',
    confirmationMessage: initialData?.confirmationMessage || 'Thank you for your submission!',
    styling: {
      backgroundColor: initialData?.styling?.backgroundColor || '#ffffff',
      textColor: initialData?.styling?.textColor || '#000000',
      buttonColor: initialData?.styling?.buttonColor || '#007bff',
      borderRadius: initialData?.styling?.borderRadius || '8',
      fontFamily: initialData?.styling?.fontFamily || 'Inter'
    }
  });
  const [activeTab, setActiveTab] = useState('builder');
  const { toast } = useToast();

  const fieldTypes = [
    { type: 'text', icon: Type, label: 'Text Input', description: 'Single line text field' },
    { type: 'email', icon: Mail, label: 'Email', description: 'Email address field' },
    { type: 'phone', icon: Phone, label: 'Phone', description: 'Phone number field' },
    { type: 'textarea', icon: Type, label: 'Text Area', description: 'Multi-line text field' },
    { type: 'select', icon: ToggleLeft, label: 'Dropdown', description: 'Select from options' },
    { type: 'checkbox', icon: CheckSquare, label: 'Checkbox', description: 'Multiple selections' },
    { type: 'radio', icon: MousePointer, label: 'Radio Button', description: 'Single selection' },
    { type: 'date', icon: Calendar, label: 'Date', description: 'Date picker field' },
    { type: 'number', icon: Hash, label: 'Number', description: 'Numeric input field' }
  ];

  const addField = useCallback((type: FormField['type']) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `New ${type} field`,
      placeholder: `Enter ${type}...`,
      required: false,
      options: type === 'select' || type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : undefined
    };
    setFields(prev => [...prev, newField]);
  }, []);

  const removeField = useCallback((fieldId: string) => {
    setFields(prev => prev.filter(field => field.id !== fieldId));
  }, []);

  const updateField = useCallback((fieldId: string, updates: Partial<FormField>) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  }, []);

  const moveField = useCallback((fromIndex: number, toIndex: number) => {
    const items = Array.from(fields);
    const [reorderedItem] = items.splice(fromIndex, 1);
    items.splice(toIndex, 0, reorderedItem);
    setFields(items);
  }, [fields]);

  const generateHTML = () => {
    const fieldsHTML = fields.map(field => {
      let fieldHTML = '';
      switch (field.type) {
        case 'text':
        case 'email':
        case 'phone':
        case 'date':
        case 'number':
          fieldHTML = `<input type="${field.type}" name="${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''} />`;
          break;
        case 'textarea':
          fieldHTML = `<textarea name="${field.id}" placeholder="${field.placeholder}" ${field.required ? 'required' : ''}></textarea>`;
          break;
        case 'select':
          fieldHTML = `<select name="${field.id}" ${field.required ? 'required' : ''}>
            ${field.options?.map(option => `<option value="${option}">${option}</option>`).join('')}
          </select>`;
          break;
        case 'checkbox':
        case 'radio':
          fieldHTML = field.options?.map(option => 
            `<label><input type="${field.type}" name="${field.id}" value="${option}" ${field.required ? 'required' : ''} /> ${option}</label>`
          ).join('') || '';
          break;
      }
      
      return `
        <div class="form-field">
          <label>${field.label}${field.required ? ' *' : ''}</label>
          ${fieldHTML}
        </div>
      `;
    }).join('');

    return `
      <form class="custom-form" style="
        background-color: ${formSettings.styling.backgroundColor};
        color: ${formSettings.styling.textColor};
        font-family: ${formSettings.styling.fontFamily};
        border-radius: ${formSettings.styling.borderRadius}px;
        padding: 20px;
      ">
        <h2>${formSettings.title}</h2>
        <p>${formSettings.description}</p>
        ${fieldsHTML}
        <button type="submit" style="
          background-color: ${formSettings.styling.buttonColor};
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: ${formSettings.styling.borderRadius}px;
          cursor: pointer;
        ">${formSettings.submitText}</button>
      </form>
    `;
  };

  const handleSave = () => {
    const formData = {
      fields,
      settings: formSettings,
      html: generateHTML(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    onSave?.(formData);
    toast({
      title: "Form Saved",
      description: "Your form has been saved successfully",
    });
  };

  const handlePreview = () => {
    toast({
      title: "Form Preview",
      description: "Opening form preview in new window",
    });
  };

  const renderFieldEditor = (field: FormField, index: number) => (
        <Card
          key={field.id}
          className="mb-4"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{field.type}</Badge>
                <span className="font-medium">{field.label}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeField(field.id)}
                data-voice-context={`Remove ${field.label} field from form`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label>Field Label</Label>
                <Input
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  placeholder="Enter field label"
                />
              </div>
              
              <div>
                <Label>Placeholder</Label>
                <Input
                  value={field.placeholder || ''}
                  onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                  placeholder="Enter placeholder text"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={field.required}
                  onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                />
                <Label>Required field</Label>
              </div>
              
              {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                <div>
                  <Label>Options</Label>
                  <div className="space-y-2">
                    {field.options?.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(field.options || [])];
                            newOptions[optionIndex] = e.target.value;
                            updateField(field.id, { options: newOptions });
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newOptions = field.options?.filter((_, i) => i !== optionIndex);
                            updateField(field.id, { options: newOptions });
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
                        updateField(field.id, { options: newOptions });
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Form Builder</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            Save Form
          </Button>
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="styling">Styling</TabsTrigger>
          <TabsTrigger value="code">HTML Code</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Field Types Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Field Types</CardTitle>
                <CardDescription>Drag or click to add fields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {fieldTypes.map((fieldType) => {
                    const IconComponent = fieldType.icon;
                    return (
                      <Button
                        key={fieldType.type}
                        variant="outline"
                        className="justify-start h-auto p-3"
                        onClick={() => addField(fieldType.type as FormField['type'])}
                        data-voice-context={`Add ${fieldType.label} field to form`}
                      >
                        <IconComponent className="h-4 w-4 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">{fieldType.label}</div>
                          <div className="text-xs text-muted-foreground">{fieldType.description}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Form Builder */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Form Fields</CardTitle>
                  <CardDescription>
                    {fields.length === 0 ? 'Add fields to start building your form' : `${fields.length} field(s) added`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {fields.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Type className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No fields added yet. Select field types from the left panel.</p>
                    </div>
                  ) : (
                    <div>
                      {fields.map((field, index) => renderFieldEditor(field, index))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
              <CardDescription>Configure form behavior and content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="form-title">Form Title</Label>
                <Input
                  id="form-title"
                  value={formSettings.title}
                  onChange={(e) => setFormSettings(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter form title"
                />
              </div>
              
              <div>
                <Label htmlFor="form-description">Description</Label>
                <Textarea
                  id="form-description"
                  value={formSettings.description}
                  onChange={(e) => setFormSettings(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter form description"
                />
              </div>
              
              <div>
                <Label htmlFor="submit-text">Submit Button Text</Label>
                <Input
                  id="submit-text"
                  value={formSettings.submitText}
                  onChange={(e) => setFormSettings(prev => ({ ...prev, submitText: e.target.value }))}
                  placeholder="Submit"
                />
              </div>
              
              <div>
                <Label htmlFor="redirect-url">Redirect URL (Optional)</Label>
                <Input
                  id="redirect-url"
                  value={formSettings.redirectUrl}
                  onChange={(e) => setFormSettings(prev => ({ ...prev, redirectUrl: e.target.value }))}
                  placeholder="https://example.com/thank-you"
                />
              </div>
              
              <div>
                <Label htmlFor="confirmation-message">Confirmation Message</Label>
                <Textarea
                  id="confirmation-message"
                  value={formSettings.confirmationMessage}
                  onChange={(e) => setFormSettings(prev => ({ ...prev, confirmationMessage: e.target.value }))}
                  placeholder="Thank you for your submission!"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="styling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Styling</CardTitle>
              <CardDescription>Customize the appearance of your form</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bg-color">Background Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="bg-color"
                      type="color"
                      value={formSettings.styling.backgroundColor}
                      onChange={(e) => setFormSettings(prev => ({
                        ...prev,
                        styling: { ...prev.styling, backgroundColor: e.target.value }
                      }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={formSettings.styling.backgroundColor}
                      onChange={(e) => setFormSettings(prev => ({
                        ...prev,
                        styling: { ...prev.styling, backgroundColor: e.target.value }
                      }))}
                      placeholder="#ffffff"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="text-color">Text Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="text-color"
                      type="color"
                      value={formSettings.styling.textColor}
                      onChange={(e) => setFormSettings(prev => ({
                        ...prev,
                        styling: { ...prev.styling, textColor: e.target.value }
                      }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={formSettings.styling.textColor}
                      onChange={(e) => setFormSettings(prev => ({
                        ...prev,
                        styling: { ...prev.styling, textColor: e.target.value }
                      }))}
                      placeholder="#000000"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="button-color">Button Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="button-color"
                      type="color"
                      value={formSettings.styling.buttonColor}
                      onChange={(e) => setFormSettings(prev => ({
                        ...prev,
                        styling: { ...prev.styling, buttonColor: e.target.value }
                      }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={formSettings.styling.buttonColor}
                      onChange={(e) => setFormSettings(prev => ({
                        ...prev,
                        styling: { ...prev.styling, buttonColor: e.target.value }
                      }))}
                      placeholder="#007bff"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="border-radius">Border Radius</Label>
                  <Input
                    id="border-radius"
                    type="number"
                    value={formSettings.styling.borderRadius}
                    onChange={(e) => setFormSettings(prev => ({
                      ...prev,
                      styling: { ...prev.styling, borderRadius: e.target.value }
                    }))}
                    placeholder="8"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="font-family">Font Family</Label>
                <Select 
                  value={formSettings.styling.fontFamily} 
                  onValueChange={(value) => setFormSettings(prev => ({
                    ...prev,
                    styling: { ...prev.styling, fontFamily: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generated HTML Code</CardTitle>
              <CardDescription>Copy this code to embed your form</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{generateHTML()}</code>
                </pre>
                <Button
                  className="absolute top-2 right-2"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(generateHTML());
                    toast({
                      title: "Code Copied",
                      description: "HTML code copied to clipboard",
                    });
                  }}
                >
                  <Code className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};