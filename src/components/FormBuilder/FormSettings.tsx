
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface FormSettingsProps {
  settings: any;
  onUpdateSettings: (updates: any) => void;
}

export const FormSettings: React.FC<FormSettingsProps> = ({ settings, onUpdateSettings }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="form-title">Form Title</Label>
          <Input
            id="form-title"
            value={settings.title}
            onChange={(e) => onUpdateSettings({ title: e.target.value })}
            placeholder="Enter form title"
          />
        </div>
        
        <div>
          <Label htmlFor="form-description">Description</Label>
          <Textarea
            id="form-description"
            value={settings.description}
            onChange={(e) => onUpdateSettings({ description: e.target.value })}
            placeholder="Enter form description"
          />
        </div>
        
        <div>
          <Label htmlFor="submit-text">Submit Button Text</Label>
          <Input
            id="submit-text"
            value={settings.submitText}
            onChange={(e) => onUpdateSettings({ submitText: e.target.value })}
            placeholder="Submit"
          />
        </div>
        
        <div>
          <Label htmlFor="redirect-url">Redirect URL (Optional)</Label>
          <Input
            id="redirect-url"
            value={settings.redirectUrl}
            onChange={(e) => onUpdateSettings({ redirectUrl: e.target.value })}
            placeholder="https://example.com/thank-you"
          />
        </div>
        
        <div>
          <Label htmlFor="confirmation-message">Confirmation Message</Label>
          <Textarea
            id="confirmation-message"
            value={settings.confirmationMessage}
            onChange={(e) => onUpdateSettings({ confirmationMessage: e.target.value })}
            placeholder="Thank you for your submission!"
          />
        </div>
      </CardContent>
    </Card>
  );
};
