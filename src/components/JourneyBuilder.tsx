import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAppContext, Automation, AutomationEmail } from '@/contexts/AppContext';
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
  MousePointer,
  Copy,
  Trash2,
  GripVertical
} from 'lucide-react';

interface JourneyStep {
  id: string;
  type: 'email' | 'wait' | 'condition' | 'action';
  title: string;
  description: string;
  config: {
    templateId?: string;
    templateName?: string;
    duration?: number;
    durationUnit?: 'minutes' | 'hours' | 'days' | 'weeks';
    conditionType?: string;
    conditionValue?: string;
    actionType?: string;
    actionValue?: string;
  };
}

interface JourneyBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  journeyId?: string;
  onSave?: (journey: any) => void;
  editMode?: boolean;
  initialData?: Partial<Automation>;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const JourneyBuilder: React.FC<JourneyBuilderProps> = ({
  isOpen,
  onClose,
  journeyId,
  onSave,
  editMode = false,
  initialData
}) => {
  const { templates, automations, addAutomation, updateAutomation } = useAppContext();
  const [journeyName, setJourneyName] = useState(initialData?.name || '');
  const [journeyDescription, setJourneyDescription] = useState(initialData?.name || '');
  const [trigger, setTrigger] = useState(initialData?.triggerType || '');
  const [steps, setSteps] = useState<JourneyStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [showStepConfig, setShowStepConfig] = useState(false);
  const [isEditing, setIsEditing] = useState(editMode && !!initialData);
  const { toast } = useToast();

  useEffect(() => {
    if (initialData && isOpen) {
      setJourneyName(initialData.name || '');
      setJourneyDescription(initialData.name || '');
      setTrigger(initialData.triggerType || '');
      
      if (initialData.emails && initialData.emails.length > 0) {
        const convertedSteps: JourneyStep[] = initialData.emails.map((email, index) => ({
          id: email.id || `step-${index}`,
          type: 'email' as const,
          title: email.name,
          description: `Send email: ${email.subject}`,
          config: {
            templateId: email.id,
            templateName: email.name,
            duration: email.delay,
            durationUnit: email.delayUnit
          }
        }));
        setSteps(convertedSteps);
      }
    }
  }, [initialData, isOpen]);

  const getTriggerType = (triggerValue: string): Automation['triggerType'] => {
    switch (triggerValue) {
      case 'signup': return 'signup';
      case 'purchase': return 'purchase';
      case 'date': return 'date';
      case 'inactivity': return 'inactivity';
      case 'tag': return 'tag';
      case 'segment': return 'segment';
      case 'api': return 'api';
      default: return 'signup';
    }
  };

  const stepTypes = [
    {
      type: 'email',
      title: 'Send Email',
      description: 'Send an email to the subscriber',
      icon: Mail,
      color: 'blue',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      type: 'wait',
      title: 'Wait',
      description: 'Wait for a specified time period',
      icon: Clock,
      color: 'orange',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      type: 'condition',
      title: 'Condition',
      description: 'Split the journey based on conditions',
      icon: GitBranch,
      color: 'purple',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      type: 'action',
      title: 'Action',
      description: 'Perform an action (tag, segment, etc.)',
      icon: Settings,
      color: 'green',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    }
  ];

  const addStep = (type: string) => {
    const stepConfigs: Record<string, any> = {
      email: { templateId: '', templateName: '' },
      wait: { duration: 1, durationUnit: 'days' },
      condition: { conditionType: '', conditionValue: '' },
      action: { actionType: '', actionValue: '' }
    };
    
    const newStep: JourneyStep = {
      id: `step-${Date.now()}`,
      type: type as any,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      description: `Configure this ${type} step`,
      config: stepConfigs[type] || {}
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

  const moveStep = (stepId: string, direction: 'up' | 'down') => {
    const index = steps.findIndex(step => step.id === stepId);
    if (index === -1) return;

    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < steps.length) {
      [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
      setSteps(newSteps);
    }
  };

  const duplicateStep = (stepId: string) => {
    const step = steps.find(s => s.id === stepId);
    if (!step) return;

    const index = steps.findIndex(s => s.id === stepId);
    const newStep = {
      ...step,
      id: `step-${Date.now()}`,
      title: `${step.title} (Copy)`
    };

    const newSteps = [...steps];
    newSteps.splice(index + 1, 0, newStep);
    setSteps(newSteps);
    setSelectedStep(newStep.id);
    setShowStepConfig(true);
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

    const automationEmails: AutomationEmail[] = steps
      .filter(step => step.type === 'email')
      .map((step, index) => ({
        id: step.id,
        name: step.title,
        subject: step.config.templateName || step.title,
        delay: step.config.duration || (index + 1) * 24,
        delayUnit: step.config.durationUnit || 'hours',
        sendCount: 0,
        openRate: 0,
        clickRate: 0
      }));

    const automationData: Omit<Automation, 'id'> = {
      name: journeyName,
      status: 'Draft',
      trigger: trigger || 'New Subscriber',
      triggerType: getTriggerType(trigger),
      emails: automationEmails,
      subscribers: 0,
      completed: 0,
      performance: '0% completion',
      opens: 0,
      clicks: 0,
      revenue: 0,
      created: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      lastRun: 'Never',
      settings: {
        exitOnPurchase: true,
        exitOnUnsubscribe: true,
        reEnter: false
      }
    };

    if (isEditing && journeyId) {
      updateAutomation(journeyId, {
        ...automationData,
        lastModified: new Date().toISOString().split('T')[0],
        lastRun: 'Just now'
      });
      toast({
        title: "Journey Updated",
        description: "Your automation journey has been updated successfully",
      });
    } else {
      addAutomation(automationData);
      toast({
        title: "Journey Created",
        description: "Your automation journey has been created successfully",
      });
    }

    if (onSave) {
      onSave({ id: journeyId, ...automationData });
    }
    onClose();
  };

  const selectedStepData = steps.find(step => step.id === selectedStep);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 overflow-hidden flex flex-col">
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
              <div>
                <h1 className="text-xl font-semibold">Visual Journey Builder</h1>
                <p className="text-sm text-gray-600">{steps.length} step{steps.length !== 1 ? 's' : ''}</p>
              </div>
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
                                <div className={`p-2 rounded-lg ${stepType?.bgColor || 'bg-gray-100'}`}>
                                  <IconComponent className={`h-5 w-5 ${stepType?.iconColor || 'text-gray-600'}`} />
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h3 className="font-medium">{step.title}</h3>
                                    <span className="text-xs text-gray-400">Step {index + 1}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">{step.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveStep(step.id, 'up');
                                  }}
                                  disabled={index === 0}
                                  title="Move up"
                                  className="h-8 w-8 p-0"
                                >
                                  ↑
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    moveStep(step.id, 'down');
                                  }}
                                  disabled={index === steps.length - 1}
                                  title="Move down"
                                  className="h-8 w-8 p-0"
                                >
                                  ↓
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    duplicateStep(step.id);
                                  }}
                                  title="Duplicate step"
                                  className="h-8 w-8 p-0"
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                                <Badge variant="outline">{step.type}</Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeStep(step.id);
                                  }}
                                  title="Delete step"
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
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
                  {steps.length === 0 ? (
                    <div className="mt-8 p-12 border-2 border-dashed border-gray-300 rounded-lg text-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <MousePointer className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Start Building Your Journey</h3>
                      <p className="text-gray-500 mb-6">Add steps from the left sidebar to create your automation flow</p>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addStep('email')}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Add Email
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addStep('wait')}
                        >
                          <Clock className="h-4 w-4 mr-2" />
                          Add Wait
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                      <MousePointer className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Click on a step type from the sidebar to add it here</p>
                    </div>
                  )}
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
                      <Select 
                        value={selectedStepData.config.templateId || ''} 
                        onValueChange={(value) => {
                          const template = templates.find(t => t.id === value);
                          updateStep(selectedStepData.id, { 
                            config: { 
                              ...selectedStepData.config, 
                              templateId: value,
                              templateName: template?.name || ''
                            } 
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          {templates.slice(0, 10).map((template) => (
                            <SelectItem key={template.id} value={template.id}>
                              {template.name}
                            </SelectItem>
                          ))}
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
                        <Input 
                          type="number"
                          value={selectedStepData.config.duration || 1} 
                          onChange={(e) => updateStep(selectedStepData.id, { 
                            config: { 
                              ...selectedStepData.config, 
                              duration: parseInt(e.target.value) || 1
                            } 
                          })}
                          className="w-20" 
                        />
                        <Select 
                          value={selectedStepData.config.durationUnit || 'days'}
                          onValueChange={(value: 'minutes' | 'hours' | 'days' | 'weeks') => updateStep(selectedStepData.id, { 
                            config: { 
                              ...selectedStepData.config, 
                              durationUnit: value
                            } 
                          })}
                        >
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
                      <Select 
                        value={selectedStepData.config.conditionType || ''}
                        onValueChange={(value) => updateStep(selectedStepData.id, { 
                          config: { 
                            ...selectedStepData.config, 
                            conditionType: value
                          } 
                        })}
                      >
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
                      <Input 
                        value={selectedStepData.config.conditionValue || ''}
                        onChange={(e) => updateStep(selectedStepData.id, { 
                          config: { 
                            ...selectedStepData.config, 
                            conditionValue: e.target.value
                          } 
                        })}
                        placeholder="Enter condition value" 
                      />
                    </div>
                  </div>
                )}

                {selectedStepData.type === 'action' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Action Type</Label>
                      <Select 
                        value={selectedStepData.config.actionType || ''}
                        onValueChange={(value) => updateStep(selectedStepData.id, { 
                          config: { 
                            ...selectedStepData.config, 
                            actionType: value
                          } 
                        })}
                      >
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
                    {selectedStepData.config.actionType === 'add_tag' || selectedStepData.config.actionType === 'remove_tag' ? (
                      <div>
                        <Label>Tag Name</Label>
                        <Input 
                          value={selectedStepData.config.actionValue || ''}
                          onChange={(e) => updateStep(selectedStepData.id, { 
                            config: { 
                              ...selectedStepData.config, 
                              actionValue: e.target.value
                            } 
                          })}
                          placeholder="Enter tag name" 
                        />
                      </div>
                    ) : null}
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