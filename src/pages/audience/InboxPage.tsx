
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Reply, Archive, Star, Trash2, Mail, MessageSquare, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const InboxPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<any>(null);
  const [reply, setReply] = useState({ subject: '', message: '' });
  const { toast } = useToast();

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'john.doe@example.com',
      subject: 'Question about your newsletter',
      message: 'Hi, I really enjoy your weekly newsletter. Could you tell me more about your content creation process?',
      type: 'inquiry',
      status: 'unread',
      starred: false,
      timestamp: '2024-01-20 14:30',
      source: 'Contact Form'
    },
    {
      id: 2,
      from: 'sarah.smith@example.com',
      subject: 'Unsubscribe request',
      message: 'Please remove me from your mailing list. I am no longer interested in receiving emails.',
      type: 'unsubscribe',
      status: 'read',
      starred: false,
      timestamp: '2024-01-20 10:15',
      source: 'Email Reply'
    },
    {
      id: 3,
      from: 'mike.johnson@example.com',
      subject: 'Love your recent article!',
      message: 'The article about email marketing best practices was fantastic. Thank you for sharing such valuable insights.',
      type: 'feedback',
      status: 'replied',
      starred: true,
      timestamp: '2024-01-19 16:45',
      source: 'Blog Comment'
    },
    {
      id: 4,
      from: 'emma.wilson@example.com',
      subject: 'Partnership opportunity',
      message: 'I represent a company that would like to explore partnership opportunities with your business. Could we schedule a call?',
      type: 'business',
      status: 'unread',
      starred: true,
      timestamp: '2024-01-19 09:20',
      source: 'Contact Form'
    }
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = selectedTab === 'all' ||
                      (selectedTab === 'unread' && message.status === 'unread') ||
                      (selectedTab === 'starred' && message.starred) ||
                      (selectedTab === 'archived' && message.status === 'archived');
    
    return matchesSearch && matchesTab;
  });

  const handleReply = (message: any) => {
    setReplyingTo(message);
    setReply({
      subject: `Re: ${message.subject}`,
      message: ''
    });
    setIsReplyDialogOpen(true);
  };

  const handleSendReply = () => {
    if (!reply.message.trim()) {
      toast({
        title: "Error",
        description: "Reply message is required",
        variant: "destructive",
      });
      return;
    }

    setMessages(messages.map(msg =>
      msg.id === replyingTo.id
        ? { ...msg, status: 'replied' as const }
        : msg
    ));

    setIsReplyDialogOpen(false);
    setReply({ subject: '', message: '' });
    setReplyingTo(null);

    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully",
    });
  };

  const handleStarMessage = (id: number) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, starred: !msg.starred } : msg
    ));
  };

  const handleArchiveMessage = (id: number) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, status: 'archived' as const } : msg
    ));
    toast({
      title: "Message Archived",
      description: "Message has been archived successfully",
    });
  };

  const handleDeleteMessage = (id: number) => {
    const message = messages.find(m => m.id === id);
    setMessages(messages.filter(m => m.id !== id));
    toast({
      title: "Message Deleted",
      description: `Message from ${message?.from} has been deleted`,
    });
  };

  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, status: 'read' as const } : msg
    ));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'inquiry': return 'bg-blue-100 text-blue-800';
      case 'unsubscribe': return 'bg-red-100 text-red-800';
      case 'feedback': return 'bg-green-100 text-green-800';
      case 'business': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inbox</h1>
          <p className="text-gray-600">Manage subscriber messages and communication</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card data-voice-context="Total number of unread messages in your inbox requiring attention">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-2xl font-bold text-gray-900">{messages.filter(m => m.status === 'unread').length}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Number of starred messages marked as important or requiring follow-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Starred</p>
                <p className="text-2xl font-bold text-gray-900">{messages.filter(m => m.starred).length}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Total number of messages received today from subscribers and visitors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Messages</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card data-voice-context="Average response time for replying to subscriber messages and inquiries">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
                <p className="text-2xl font-bold text-gray-900">2.3h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all" data-voice-context="View all messages in your inbox regardless of status">All Messages</TabsTrigger>
            <TabsTrigger value="unread" data-voice-context="Filter to show only unread messages requiring attention">Unread</TabsTrigger>
            <TabsTrigger value="starred" data-voice-context="Show only starred messages marked as important">Starred</TabsTrigger>
            <TabsTrigger value="archived" data-voice-context="View archived messages that have been stored for reference">Archived</TabsTrigger>
          </TabsList>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search messages..."
              className="pl-10 w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-voice-context="Search through your inbox messages by sender, subject, content, or message type to quickly find specific communications"
            />
          </div>
        </div>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredMessages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages found</h3>
                <p className="text-gray-600">
                  {selectedTab === 'all' ? 'Your inbox is empty.' : 
                   selectedTab === 'unread' ? 'No unread messages.' :
                   selectedTab === 'starred' ? 'No starred messages.' : 'No archived messages.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredMessages.map((message) => (
                <Card key={message.id} className={`hover:shadow-md transition-shadow ${message.status === 'unread' ? 'border-l-4 border-l-blue-600' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className={`font-semibold ${message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                              {message.from}
                            </h3>
                            <Badge className={getTypeColor(message.type)}>
                              {message.type}
                            </Badge>
                            <Badge variant="outline">
                              {message.source}
                            </Badge>
                            {message.status === 'unread' && (
                              <Badge variant="default" className="bg-blue-600">
                                New
                              </Badge>
                            )}
                          </div>
                          <h4 className={`font-medium mb-2 ${message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.subject}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {message.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStarMessage(message.id)}
                                data-voice-context={`${message.starred ? 'Remove star from' : 'Star'} message from ${message.from}`}
                                data-voice-action={`${message.starred ? 'Removing star from' : 'Starring'} message`}
                              >
                                <Star className={`h-4 w-4 ${message.starred ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                              </Button>
                              {message.status === 'unread' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleMarkAsRead(message.id)}
                                  data-voice-context={`Mark message from ${message.from} as read`}
                                  data-voice-action={`Marking message as read`}
                                >
                                  Mark Read
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleReply(message)}
                                data-voice-context={`Reply to message from ${message.from} about ${message.subject}`}
                                data-voice-action={`Opening reply composer for ${message.from}`}
                              >
                                <Reply className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleArchiveMessage(message.id)}
                                data-voice-context={`Archive message from ${message.from} to move it out of active inbox`}
                                data-voice-action={`Archiving message from ${message.from}`}
                              >
                                <Archive className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteMessage(message.id)}
                                data-voice-context={`Delete message from ${message.from} permanently`}
                                data-voice-action={`Deleting message from ${message.from}`}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>
              Compose your reply to {replyingTo?.from}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reply-subject">Subject</Label>
              <Input
                id="reply-subject"
                value={reply.subject}
                onChange={(e) => setReply({ ...reply, subject: e.target.value })}
                data-voice-context="Subject line for your reply message"
              />
            </div>
            <div>
              <Label htmlFor="reply-message">Message</Label>
              <Textarea
                id="reply-message"
                value={reply.message}
                onChange={(e) => setReply({ ...reply, message: e.target.value })}
                placeholder="Type your reply..."
                rows={8}
                data-voice-context="Compose your reply message to the subscriber"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSendReply} className="flex-1" data-voice-context="Send your reply to the subscriber">
                Send Reply
              </Button>
              <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)} data-voice-context="Cancel reply and close dialog">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
