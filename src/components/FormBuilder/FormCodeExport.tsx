
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download } from 'lucide-react';

interface FormCodeExportProps {
  fields: any[];
  settings: any;
  onExport: () => string;
}

export const FormCodeExport: React.FC<FormCodeExportProps> = ({ fields, settings, onExport }) => {
  const { toast } = useToast();

  const htmlCode = onExport();
  
  const cssCode = `
.form-container {
  max-width: ${settings.styling.maxWidth};
  margin: 0 auto;
  padding: ${settings.styling.padding};
  background-color: ${settings.styling.backgroundColor};
  color: ${settings.styling.textColor};
  font-family: ${settings.styling.fontFamily};
  border-radius: ${settings.styling.borderRadius}px;
}

.form-field {
  margin-bottom: 1rem;
}

.form-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-field input,
.form-field textarea,
.form-field select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: ${settings.styling.borderRadius}px;
  font-size: 1rem;
}

.form-field input:focus,
.form-field textarea:focus,
.form-field select:focus {
  outline: none;
  border-color: ${settings.styling.buttonColor};
  box-shadow: 0 0 0 2px ${settings.styling.buttonColor}20;
}

.submit-button {
  background-color: ${settings.styling.buttonColor};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${settings.styling.borderRadius}px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.submit-button:hover {
  opacity: 0.9;
}
  `;

  const jsCode = `
// Form submission handler
document.getElementById('custom-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  
  // Validate required fields
  const requiredFields = ${JSON.stringify(fields.filter(f => f.required).map(f => f.id))};
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Submit form data
  console.log('Form data:', data);
  
  // Show confirmation message
  alert('${settings.confirmationMessage}');
  
  // Redirect if URL provided
  ${settings.redirectUrl ? `window.location.href = '${settings.redirectUrl}';` : ''}
});
  `;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Code Copied",
        description: `${type} code copied to clipboard`,
      });
    });
  };

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Export Code</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="html" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
            </TabsList>
            
            <TabsContent value="html" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">HTML Code</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(htmlCode, 'HTML')}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadCode(htmlCode, 'form.html')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>{htmlCode}</code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="css" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">CSS Styles</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(cssCode, 'CSS')}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadCode(cssCode, 'form.css')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>{cssCode}</code>
                </pre>
              </div>
            </TabsContent>
            
            <TabsContent value="js" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">JavaScript</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(jsCode, 'JavaScript')}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadCode(jsCode, 'form.js')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                  <code>{jsCode}</code>
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
