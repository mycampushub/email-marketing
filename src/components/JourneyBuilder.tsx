import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  GitBranch, 
  Plus, 
  Mail, 
  Clock, 
  Users, 
  Settings, 
  Play, 
  Pause,
  X,
  ArrowDown,
  MousePointer
} from 'lucide-react';

interface JourneyStep {
  id: string;
  type: 'email' | 'wait' | 'condition' | 'action';
  title: string;
  description: string;
  config: any;
}

interface JourneyBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  journeyId?: string;
  onSave: (journey: any) => void;
}

export const JourneyBuilder: React.FC<JourneyBuilderProps> = ({
  isOpen,
  onClose,
  journeyId,
  onSave
}) => {
  const [journeyName, setJourneyName] = useState('');
  const [journeyDescription, setJourneyDescription] = useState('');
  const [trigger, setTrigger] = useState('');
  const [steps, setSteps] = useState<JourneyStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [showStepConfig, setShowStepConfig] = useState(false);
  const { toast } = useToast();

  const stepTypes = [
    { 
      type: 'email', 
      title: 'Send Email', 
      description: 'Send an email to the subscriber',
      icon: Mail,
      color: 'blue'
    },
    { 
      type: 'wait', 
      title: 'Wait', 
      description: 'Wait for a specified time period',
      icon: Clock,
      color: 'orange'
    },
    { 
      type: 'condition', 
      title: 'Condition', 
      description: 'Split the journey based on conditions',
      icon: GitBranch,
      color: 'purple'
    },
    { 
      type: 'action', 
      title: 'Action', 
      description: 'Perform an action (tag, segment, etc.)',
      icon: Settings,
      color: 'green'
    }
  ];

  const addStep = (type: string) => {
    const newStep: JourneyStep = {
      id: `step-${Date.now()}`,
      type: type as any,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      description: `Configure this ${type} step`,
      config: {}
    };
    setSteps([...steps, newStep]);
    setSelectedStep(newStep.id);
    setShowStepConfig(true);
  };

  const updateStep = (stepId: string, updates: Partial<JourneyStep>) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  const removeStep = (stepId: string) => {
    setSteps(steps.filter(step => step.id !== stepId));
    if (selectedStep === stepId) {
      setSelectedStep(null);
      setShowStepConfig(false);
    }
  };

  const handleSave = () => {
    if (!journeyName.trim()) {
      toast({
        title: "Error",
        description: "Journey name is required",
        variant: "destructive",
      });
      return;
    }

    const journey = {
      id: journeyId || `journey-${Date.now()}`,
      name: journeyName,
      description: journeyDescription,
      trigger,
      steps,
      status: 'Draft',
      created: new Date().toISOString().split('T')[0],
      participants: 0,
      completionRate: '0%'
    };

    onSave(journey);
    toast({
      title: "Journey Saved",
      description: "Your automation journey has been saved successfully",
    });
    onClose();
  };

  const selectedStepData = steps.find(step => step.id === selectedStep);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <div className="flex h-full">
          {/* Left Sidebar - Journey Config */}
          <div className="w-80 bg-gray-50 border-r overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Journey Settings</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <Label htmlFor="journeyName">Journey Name</Label>
                <Input
                  id="journeyName"
                  value={journeyName}
                  onChange={(e) => setJourneyName(e.target.value)}
                  placeholder="Enter journey name"
                />
              </div>
              
              <div>
                <Label htmlFor="journeyDescription">Description</Label>
                <Textarea
                  id="journeyDescription"
                  value={journeyDescription}
                  onChange={(e) => setJourneyDescription(e.target.value)}
                  placeholder="Describe this journey"
                />
              </div>
              
              <div>
                <Label htmlFor="trigger">Journey Trigger</Label>
                <Select value={trigger} onValueChange={setTrigger}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="signup">New Signup</SelectItem>
                    <SelectItem value="purchase">First Purchase</SelectItem>
                    <SelectItem value="abandoned_cart">Abandoned Cart</SelectItem>
                    <SelectItem value="tag_added">Tag Added</SelectItem>
                    <SelectItem value="date_field">Date Field</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">Add Steps</h3>
                <div className="space-y-2">
                  {stepTypes.map((stepType) => {
                    const IconComponent = stepType.icon;
                    return (
                      <Button
                        key={stepType.type}
                        variant="outline"
                        className="w-full justify-start h-auto p-3"
                        onClick={() => addStep(stepType.type)}
                      >
                        <IconComponent className="h-4 w-4 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">{stepType.title}</div>
                          <div className="text-sm text-gray-500">{stepType.description}</div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Canvas */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <h1 className="text-xl font-semibold">Visual Journey Builder</h1>
              <div className="space-x-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Journey
                </Button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-auto bg-gray-100">
              <div className="max-w-4xl mx-auto">
                {/* Journey Start */}
                <div className="flex flex-col items-center">
                  <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300 mb-4">
                    <div className="flex items-center space-x-2">
                      <Play className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Journey Start</span>
                    </div>
                    <div className="text-sm text-green-600 mt-1">
                      Trigger: {trigger || 'Select a trigger'}
                    </div>
                  </div>

                  {/* Steps */}
                  {steps.map((step, index) => {
                    const stepType = stepTypes.find(t => t.type === step.type);
                    const IconComponent = stepType?.icon || Settings;
                    
                    return (
                      <React.Fragment key={step.id}>
                        <ArrowDown className="h-6 w-6 text-gray-400 mb-4" />
                        
                        <Card 
                          className={`w-full max-w-md mb-4 cursor-pointer transition-all ${
                            selectedStep === step.id ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => {
                            setSelectedStep(step.id);
                            setShowStepConfig(true);
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg bg-${stepType?.color}-100`}>
                                  <IconComponent className={`h-5 w-5 text-${stepType?.color}-600`} />
                                </div>
                                <div>
                                  <h3 className="font-medium">{step.title}</h3>
                                  <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{step.type}</Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeStep(step.id);
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </React.Fragment>
                    );
                  })}

                  {/* Add Step Button */}
                  <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <MousePointer className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Click on a step type from the sidebar to add it here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Step Configuration */}
          {showStepConfig && selectedStepData && (
            <div className="w-80 bg-white border-l overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Configure Step</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowStepConfig(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <Label>Step Title</Label>
                  <Input
                    value={selectedStepData.title}
                    onChange={(e) => updateStep(selectedStepData.id, { title: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={selectedStepData.description}
                    onChange={(e) => updateStep(selectedStepData.id, { description: e.target.value })}
                  />
                </div>

                {/* Step-specific configuration */}
                {selectedStepData.type === 'email' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Email Template</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome Email</SelectItem>
                          <SelectItem value="promotional">Promotional</SelectItem>
                          <SelectItem value="follow-up">Follow-up</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Edit Email Content
                    </Button>
                  </div>
                )}

                {selectedStepData.type === 'wait' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Wait Duration</Label>
                      <div className="flex space-x-2">
                        <Input placeholder="1" className="w-20" />
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minutes">Minutes</SelectItem>
                            <SelectItem value="hours">Hours</SelectItem>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStepData.type === 'condition' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Condition Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email_opened">Email Opened</SelectItem>
                          <SelectItem value="link_clicked">Link Clicked</SelectItem>
                          <SelectItem value="tag_has">Has Tag</SelectItem>
                          <SelectItem value="custom_field">Custom Field</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Condition Value</Label>
                      <Input placeholder="Enter condition value" />
                    </div>
                  </div>
                )}

                {selectedStepData.type === 'action' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Action Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="add_tag">Add Tag</SelectItem>
                          <SelectItem value="remove_tag">Remove Tag</SelectItem>
                          <SelectItem value="add_to_segment">Add to Segment</SelectItem>
                          <SelectItem value="update_field">Update Field</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};