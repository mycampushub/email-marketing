
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormStylingProps {
  settings: any;
  onUpdateSettings: (updates: any) => void;
}

export const FormStyling: React.FC<FormStylingProps> = ({ settings, onUpdateSettings }) => {
  const updateStyling = (key: string, value: string) => {
    onUpdateSettings({
      styling: {
        ...settings.styling,
        [key]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Styling</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bg-color">Background Color</Label>
            <div className="flex space-x-2">
              <Input
                type="color"
                value={settings.styling.backgroundColor}
                onChange={(e) => updateStyling('backgroundColor', e.target.value)}
                className="w-16 h-10"
              />
              <Input
                value={settings.styling.backgroundColor}
                onChange={(e) => updateStyling('backgroundColor', e.target.value)}
                placeholder="#ffffff"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="text-color">Text Color</Label>
            <div className="flex space-x-2">
              <Input
                type="color"
                value={settings.styling.textColor}
                onChange={(e) => updateStyling('textColor', e.target.value)}
                className="w-16 h-10"
              />
              <Input
                value={settings.styling.textColor}
                onChange={(e) => updateStyling('textColor', e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="button-color">Button Color</Label>
            <div className="flex space-x-2">
              <Input
                type="color"
                value={settings.styling.buttonColor}
                onChange={(e) => updateStyling('buttonColor', e.target.value)}
                className="w-16 h-10"
              />
              <Input
                value={settings.styling.buttonColor}
                onChange={(e) => updateStyling('buttonColor', e.target.value)}
                placeholder="#007bff"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="border-radius">Border Radius</Label>
            <Input
              type="number"
              value={settings.styling.borderRadius}
              onChange={(e) => updateStyling('borderRadius', e.target.value)}
              placeholder="8"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="font-family">Font Family</Label>
          <Select 
            value={settings.styling.fontFamily} 
            onValueChange={(value) => updateStyling('fontFamily', value)}
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
        
        <div>
          <Label htmlFor="max-width">Maximum Width</Label>
          <Input
            value={settings.styling.maxWidth}
            onChange={(e) => updateStyling('maxWidth', e.target.value)}
            placeholder="600px"
          />
        </div>
        
        <div>
          <Label htmlFor="padding">Padding</Label>
          <Input
            value={settings.styling.padding}
            onChange={(e) => updateStyling('padding', e.target.value)}
            placeholder="24px"
          />
        </div>
      </CardContent>
    </Card>
  );
};
