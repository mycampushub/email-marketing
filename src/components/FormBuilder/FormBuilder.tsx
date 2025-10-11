
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormFieldEditor } from './FormFieldEditor';
import { FormPreview } from './FormPreview';
import { FormSettings } from './FormSettings';
import { FormStyling } from './FormStyling';
import { FormCodeExport } from './FormCodeExport';
import { useFormBuilder } from './useFormBuilder';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, Eye, Code, Settings, Palette, Plus, Undo, Redo,
  Smartphone, Tablet, Monitor, Download, Upload
} from 'lucide-react';

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
  const {
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
  } = useFormBuilder(initialData);

  const { toast } = useToast();

  const handleSave = useCallback(() => {
    const formData = saveForm();
    onSave?.(formData);
    toast({
      title: "Form Saved Successfully",
      description: "Your form has been saved and is ready to use.",
    });
  }, [saveForm, onSave, toast]);

  const handlePreview = useCallback(() => {
    const htmlCode = exportHTML();
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Form Preview</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; }
              .form-container { max-width: 600px; margin: 0 auto; }
            </style>
          </head>
          <body>
            <div class="form-container">
              ${htmlCode}
            </div>
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  }, [exportHTML]);

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const formData = JSON.parse(e.target?.result as string);
          importForm(formData);
          toast({
            title: "Form Imported",
            description: "Form data has been imported successfully.",
          });
        } catch (error) {
          toast({
            title: "Import Failed",
            description: "Invalid form data format.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  }, [importForm, toast]);

  const handleExport = useCallback(() => {
    const formData = saveForm();
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `form-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [saveForm]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Form Builder</h1>
              <p className="text-sm text-muted-foreground">Create professional forms with drag-and-drop</p>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* History Controls */}
              <Button
                variant="outline"
                size="sm"
                disabled={!canUndo}
                onClick={undo}
                data-voice-context="Undo last form builder action"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!canRedo}
                onClick={redo}
                data-voice-context="Redo form builder action"
              >
                <Redo className="h-4 w-4" />
              </Button>
              
              {/* Device Preview */}
              <div className="flex border rounded-md">
                {[
                  { device: 'desktop', icon: Monitor, label: 'Desktop' },
                  { device: 'tablet', icon: Tablet, label: 'Tablet' },
                  { device: 'mobile', icon: Smartphone, label: 'Mobile' }
                ].map(({ device, icon: Icon, label }) => (
                  <Button
                    key={device}
                    variant={previewDevice === device ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPreviewDevice(device as any)}
                    className="rounded-none first:rounded-l-md last:rounded-r-md"
                    data-voice-context={`Preview form in ${label} view`}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              
              {/* Import/Export */}
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
                id="import-form"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('import-form')?.click()}
                data-voice-context="Import form from JSON file"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                data-voice-context="Export form as JSON file"
              >
                <Download className="h-4 w-4" />
              </Button>
              
              {/* Actions */}
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Form
              </Button>
              {onCancel && (
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="styling" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Styling
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6 mt-6">
            <FormFieldEditor
              fields={fields}
              onAddField={addField}
              onRemoveField={removeField}
              onUpdateField={updateField}
              onMoveField={moveField}
            />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6 mt-6">
            <FormSettings
              settings={formSettings}
              onUpdateSettings={updateFormSettings}
            />
          </TabsContent>

          <TabsContent value="styling" className="space-y-6 mt-6">
            <FormStyling
              settings={formSettings}
              onUpdateSettings={updateFormSettings}
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-6 mt-6">
            <FormPreview
              fields={fields}
              settings={formSettings}
              device={previewDevice}
            />
          </TabsContent>

          <TabsContent value="code" className="space-y-6 mt-6">
            <FormCodeExport
              fields={fields}
              settings={formSettings}
              onExport={exportHTML}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
