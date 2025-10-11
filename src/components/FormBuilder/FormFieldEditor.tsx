
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Type, Mail, Phone, Calendar, Hash, ToggleLeft, CheckSquare, 
  MousePointer, Plus, Trash2, GripVertical, Settings, Copy
} from 'lucide-react';

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'number';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: string;
  width?: 'full' | 'half' | 'third';
  helpText?: string;
}

interface FormFieldEditorProps {
  fields: FormField[];
  onAddField: (type: FormField['type']) => void;
  onRemoveField: (fieldId: string) => void;
  onUpdateField: (fieldId: string, updates: Partial<FormField>) => void;
  onMoveField: (fromIndex: number, toIndex: number) => void;
}

const fieldTypes = [
  { type: 'text', icon: Type, label: 'Text Input', description: 'Single line text' },
  { type: 'email', icon: Mail, label: 'Email', description: 'Email address' },
  { type: 'phone', icon: Phone, label: 'Phone', description: 'Phone number' },
  { type: 'textarea', icon: Type, label: 'Text Area', description: 'Multi-line text' },
  { type: 'select', icon: ToggleLeft, label: 'Select', description: 'Dropdown list' },
  { type: 'checkbox', icon: CheckSquare, label: 'Checkbox', description: 'Multiple choice' },
  { type: 'radio', icon: MousePointer, label: 'Radio', description: 'Single choice' },
  { type: 'date', icon: Calendar, label: 'Date', description: 'Date picker' },
  { type: 'number', icon: Hash, label: 'Number', description: 'Numeric input' }
];

export const FormFieldEditor: React.FC<FormFieldEditorProps> = ({
  fields,
  onAddField,
  onRemoveField,
  onUpdateField,
  onMoveField
}) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [draggedField, setDraggedField] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedField(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedField !== null && draggedField !== dropIndex) {
      onMoveField(draggedField, dropIndex);
    }
    setDraggedField(null);
  };

  const duplicateField = (field: FormField) => {
    const newField = {
      ...field,
      id: `field_${Date.now()}`,
      label: `${field.label} (Copy)`
    };
    onAddField(field.type);
    // Update the new field with copied properties
    setTimeout(() => {
      onUpdateField(newField.id, newField);
    }, 100);
  };

  const addOption = (fieldId: string, field: FormField) => {
    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
    onUpdateField(fieldId, { options: newOptions });
  };

  const removeOption = (fieldId: string, field: FormField, optionIndex: number) => {
    const newOptions = field.options?.filter((_, i) => i !== optionIndex);
    onUpdateField(fieldId, { options: newOptions });
  };

  const updateOption = (fieldId: string, field: FormField, optionIndex: number, value: string) => {
    const newOptions = [...(field.options || [])];
    newOptions[optionIndex] = value;
    onUpdateField(fieldId, { options: newOptions });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-300px)]">
      {/* Field Types Panel */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg">Field Types</CardTitle>
          <CardDescription>Drag or click to add fields</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {fieldTypes.map((fieldType) => {
                const IconComponent = fieldType.icon;
                return (
                  <Button
                    key={fieldType.type}
                    variant="outline"
                    className="w-full justify-start h-auto p-3 hover:bg-accent"
                    onClick={() => onAddField(fieldType.type as FormField['type'])}
                    data-voice-context={`Add ${fieldType.label} field to form`}
                  >
                    <IconComponent className="h-5 w-5 mr-3 text-primary" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{fieldType.label}</div>
                      <div className="text-xs text-muted-foreground">{fieldType.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Form Builder */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            Form Fields
            <Badge variant="secondary">{fields.length} field(s)</Badge>
          </CardTitle>
          <CardDescription>
            {fields.length === 0 ? 'Add fields to start building your form' : 'Drag to reorder, click to edit'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            {fields.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Type className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No fields added yet</p>
                <p className="text-sm">Select field types from the left panel to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <Card
                    key={field.id}
                    className={`transition-all cursor-pointer border-2 ${
                      selectedField === field.id 
                        ? 'border-primary bg-accent/50' 
                        : 'border-border hover:border-accent-foreground/20'
                    } ${draggedField === index ? 'opacity-50' : ''}`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    onClick={() => setSelectedField(selectedField === field.id ? null : field.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                          <Badge variant="outline">{field.type}</Badge>
                          <span className="font-medium">{field.label}</span>
                          {field.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateField(field);
                            }}
                            data-voice-context={`Duplicate ${field.label} field`}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveField(field.id);
                            }}
                            data-voice-context={`Remove ${field.label} field`}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                      
                      {selectedField === field.id && (
                        <div className="space-y-4 pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`label-${field.id}`}>Field Label</Label>
                              <Input
                                id={`label-${field.id}`}
                                value={field.label}
                                onChange={(e) => onUpdateField(field.id, { label: e.target.value })}
                                placeholder="Enter field label"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`placeholder-${field.id}`}>Placeholder</Label>
                              <Input
                                id={`placeholder-${field.id}`}
                                value={field.placeholder || ''}
                                onChange={(e) => onUpdateField(field.id, { placeholder: e.target.value })}
                                placeholder="Enter placeholder text"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor={`help-${field.id}`}>Help Text</Label>
                            <Input
                              id={`help-${field.id}`}
                              value={field.helpText || ''}
                              onChange={(e) => onUpdateField(field.id, { helpText: e.target.value })}
                              placeholder="Optional help text"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={field.required}
                                onCheckedChange={(checked) => onUpdateField(field.id, { required: checked })}
                              />
                              <Label>Required field</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Label>Width:</Label>
                              <select
                                value={field.width || 'full'}
                                onChange={(e) => onUpdateField(field.id, { width: e.target.value as any })}
                                className="px-2 py-1 border rounded text-sm"
                              >
                                <option value="full">Full Width</option>
                                <option value="half">Half Width</option>
                                <option value="third">Third Width</option>
                              </select>
                            </div>
                          </div>
                          
                          {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                            <div>
                              <Label>Options</Label>
                              <div className="space-y-2 mt-2">
                                {field.options?.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center space-x-2">
                                    <Input
                                      value={option}
                                      onChange={(e) => updateOption(field.id, field, optionIndex, e.target.value)}
                                      className="flex-1"
                                    />
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeOption(field.id, field, optionIndex)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addOption(field.id, field)}
                                  className="w-full"
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Option
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Properties Panel */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Properties
          </CardTitle>
          <CardDescription>
            {selectedField ? 'Edit field properties' : 'Select a field to edit'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedField ? (
            <div className="space-y-4">
              <div className="p-3 bg-accent/50 rounded-lg">
                <p className="text-sm font-medium">Selected Field</p>
                <p className="text-xs text-muted-foreground">
                  {fields.find(f => f.id === selectedField)?.label}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Click on the field in the center panel to edit its properties inline.
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Select a field to view and edit its properties</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
