
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceTrainerProps {}

export const VoiceTrainer: React.FC<VoiceTrainerProps> = () => {
  const [isEnabled, setIsEnabled] = useState(() => {
    return localStorage.getItem('voiceTrainerEnabled') === 'true';
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentContext, setCurrentContext] = useState<string | null>(null);
  const { toast } = useToast();

  // Refs for managing timers and preventing rapid firing
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSpokenRef = useRef<string | null>(null);
  const speakingRef = useRef(false);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Enhanced speak function with better controls
  const speak = useCallback((text: string, priority: 'high' | 'normal' = 'normal') => {
    if (!isEnabled || !('speechSynthesis' in window) || !text.trim()) return;

    // Prevent duplicate speech
    if (lastSpokenRef.current === text && speakingRef.current) return;

    // Cancel previous speech for high priority or different text
    if (priority === 'high' || (speakingRef.current && lastSpokenRef.current !== text)) {
      window.speechSynthesis.cancel();
      if (speechUtteranceRef.current) {
        speechUtteranceRef.current.onend = null;
        speechUtteranceRef.current.onerror = null;
      }
    }

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      speakingRef.current = true;
      setCurrentContext(text);
      lastSpokenRef.current = text;
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      speakingRef.current = false;
      setCurrentContext(null);
      lastSpokenRef.current = null;
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      speakingRef.current = false;
      setCurrentContext(null);
      lastSpokenRef.current = null;
    };
    
    speechUtteranceRef.current = utterance;
    console.log('🎤 Voice Guide:', text);
    window.speechSynthesis.speak(utterance);
  }, [isEnabled]);

  // Toggle voice trainer
  const toggleVoiceTrainer = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('voiceTrainerEnabled', newState.toString());
    
    // Clear any existing timeouts
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (newState) {
      // Cancel any existing speech before starting new one
      window.speechSynthesis.cancel();
      setTimeout(() => {
        speak("Voice Guide activated! I'll help you navigate this MailChimp-style email marketing platform. Hover over elements to learn about their functionality.", 'high');
      }, 100);
      
      toast({
        title: "Voice Guide Enabled",
        description: "Hover over elements to hear detailed descriptions and learn functionality.",
      });
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      speakingRef.current = false;
      setCurrentContext(null);
      lastSpokenRef.current = null;
      toast({
        title: "Voice Guide Disabled",
        description: "Voice guidance has been turned off.",
      });
    }
  };

  // Enhanced hover handling with proper debouncing
  useEffect(() => {
    if (!isEnabled) return;

    const handleElementHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const voiceContext = target.getAttribute('data-voice-context') || 
                         target.closest('[data-voice-context]')?.getAttribute('data-voice-context');
      
      if (voiceContext && voiceContext !== currentContext && voiceContext !== lastSpokenRef.current) {
        // Clear existing timeout
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        
        // Set debounced timeout
        hoverTimeoutRef.current = setTimeout(() => {
          if (!speakingRef.current || lastSpokenRef.current !== voiceContext) {
            speak(voiceContext);
          }
        }, 500); // Increased delay to prevent rapid firing
      }
    };

    const handleElementLeave = () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };

    const handleElementClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const voiceAction = target.getAttribute('data-voice-action') || 
                        target.closest('[data-voice-action]')?.getAttribute('data-voice-action');
      
      if (voiceAction) {
        // Clear hover timeout and cancel speech
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        window.speechSynthesis.cancel();
        
        // Speak action with slight delay
        setTimeout(() => speak(voiceAction, 'high'), 150);
      }
    };

    document.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleElementLeave);
    document.addEventListener('click', handleElementClick);

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      document.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleElementLeave);
      document.removeEventListener('click', handleElementClick);
    };
  }, [isEnabled, currentContext, speak]);

  // Enhanced page load guidance
  useEffect(() => {
    if (!isEnabled) return;

    const currentPath = window.location.pathname;
    let guidance = "";

    switch (currentPath) {
      case '/':
        guidance = "Welcome to your Email Marketing Dashboard! View campaign performance, audience growth, and create new campaigns. This is your central hub for all email marketing activities.";
        break;
      case '/campaigns':
        guidance = "Campaigns Center - Create, manage, and analyze your email campaigns. Use templates, A/B testing, and automation features. Track opens, clicks, and conversions.";
        break;
      case '/campaigns/create':
        guidance = "Campaign Builder - Design professional emails with our drag-and-drop editor. Choose templates, customize content, select audiences, and schedule delivery.";
        break;
      case '/campaigns/templates':
        guidance = "Template Library - Browse professionally designed email templates for newsletters, promotions, announcements, and more. Customize to match your brand.";
        break;
      case '/automations':
        guidance = "Automation Hub - Create automated email sequences and customer journeys. Set up welcome series, abandoned cart recovery, and behavioral triggers.";
        break;
      case '/audience':
        guidance = "Audience Management - Import contacts, create segments, manage subscriber preferences, and track audience growth. Organize with tags and custom fields.";
        break;
      case '/forms':
        guidance = "Forms and Landing Pages - Create signup forms, pop-ups, and landing pages to grow your audience. Embed on your website or share directly.";
        break;
      case '/analytics':
        guidance = "Analytics Dashboard - View detailed reports on campaign performance, audience insights, revenue tracking, and engagement metrics. Compare results over time.";
        break;
      case '/integrations':
        guidance = "Integrations Center - Connect with your favorite tools including e-commerce platforms, CRM systems, social media, and hundreds of other apps.";
        break;
      case '/content':
        guidance = "Content Studio - Manage your brand assets, images, templates, and creative materials. Keep everything organized in one central location.";
        break;
      default:
        guidance = `You're in the ${currentPath.split('/').pop() || 'main'} section. Hover over elements to learn about available features and take actions.`;
    }

    const timer = setTimeout(() => {
      speak(guidance, 'high');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isEnabled, speak]);

  // Keyboard shortcut (Ctrl+Shift+V)
  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'V') {
        event.preventDefault();
        toggleVoiceTrainer();
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50">
      <Button
        onClick={toggleVoiceTrainer}
        variant={isEnabled ? "default" : "outline"}
        size="icon"
        className={`rounded-full h-12 w-12 shadow-lg transition-all duration-300 ${
          isSpeaking ? 'animate-pulse scale-110 ring-2 ring-purple-300' : ''
        } ${isEnabled ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-gray-100'}`}
        title={`Voice Guide: ${isEnabled ? 'ON' : 'OFF'} (Ctrl+Shift+V)`}
        data-voice-context={isEnabled ? "Voice Guide is active - click to disable audio assistance and stop voice guidance throughout the platform" : "Voice Guide is disabled - click to enable comprehensive audio assistance that will guide you through every feature and functionality"}
      >
        {isEnabled ? (
          <Mic className={`h-5 w-5 transition-colors ${isSpeaking ? 'text-green-300' : 'text-white'}`} />
        ) : (
          <MicOff className="h-5 w-5 text-gray-600" />
        )}
      </Button>
      
      {isEnabled && (
        <div className={`absolute top-14 right-0 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
          isSpeaking 
            ? 'bg-green-600 text-white shadow-lg' 
            : 'bg-gray-800 text-gray-200'
        }`}>
          {isSpeaking ? (
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <span>Speaking...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1">
              <Mic className="w-3 h-3" />
              <span>Voice Guide Active</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
