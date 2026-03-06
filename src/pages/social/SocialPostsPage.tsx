import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Share2, Plus, Search, Calendar, Instagram, 
  Facebook, Twitter, Linkedin, Eye, Edit, 
  Trash2, Clock, Heart, MessageCircle, Share, Link, Send
} from 'lucide-react';

interface SocialPost {
  id: string;
  platform: string;
  content: string;
  status: 'Draft' | 'Scheduled' | 'Published';
  engagement: { likes: number; comments: number; shares: number; clicks: number };
  created: string;
  publishedAt?: string;
  scheduledAt?: string;
}

const platformIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook className="h-5 w-5 text-blue-600" />,
  instagram: <Instagram className="h-5 w-5 text-pink-600" />,
  twitter: <Twitter className="h-5 w-5 text-blue-400" />,
  linkedin: <Linkedin className="h-5 w-5 text-blue-700" />,
};

const platformColors: Record<string, string> = {
  facebook: 'bg-blue-100',
  instagram: 'bg-pink-100',
  twitter: 'bg-blue-100',
  linkedin: 'bg-blue-100',
};

export const SocialPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([
    { id: '1', platform: 'facebook', content: 'Excited to announce our new product launch! Check it out.', status: 'Published', engagement: { likes: 45, comments: 12, shares: 8, clicks: 23 }, created: '2024-01-10', publishedAt: '2024-01-10' },
    { id: '2', platform: 'twitter', content: 'Big news coming soon! Stay tuned...', status: 'Scheduled', engagement: { likes: 0, comments: 0, shares: 0, clicks: 0 }, created: '2024-01-12', scheduledAt: '2024-01-20' },
    { id: '3', platform: 'instagram', content: 'Behind the scenes of our latest project', status: 'Draft', engagement: { likes: 0, comments: 0, shares: 0, clicks: 0 }, created: '2024-01-14' },
    { id: '4', platform: 'linkedin', content: 'We are hiring! Join our growing team.', status: 'Published', engagement: { likes: 89, comments: 34, shares: 15, clicks: 56 }, created: '2024-01-08', publishedAt: '2024-01-08' },
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newPost, setNewPost] = useState({ platform: 'facebook', content: '' });
  const [filter, setFilter] = useState('all');
  const [editingPost, setEditingPost] = useState<SocialPost | null>(null);
  const [viewingPost, setViewingPost] = useState<SocialPost | null>(null);
  const { toast } = useToast();

  const handleCreate = () => {
    if (newPost.content) {
      const post: SocialPost = {
        id: Date.now().toString(),
        platform: newPost.platform,
        content: newPost.content,
        status: 'Draft',
        engagement: { likes: 0, comments: 0, shares: 0, clicks: 0 },
        created: new Date().toISOString().split('T')[0],
      };
      setPosts([...posts, post]);
      setNewPost({ platform: 'facebook', content: '' });
      setIsCreateOpen(false);
      toast({ title: "Post Created", description: "Your social post has been created as a draft." });
    }
  };

  const handlePublish = (postId: string) => {
    setPosts(posts.map(p => 
      p.id === postId 
        ? { ...p, status: 'Published', publishedAt: new Date().toISOString().split('T')[0] } 
        : p
    ));
    toast({ title: "Post Published", description: "Your post is now live!" });
  };

  const handleDelete = (postId: string) => {
    if (window.confirm('Delete this post?')) {
      setPosts(posts.filter(p => p.id !== postId));
      toast({ title: "Post Deleted", description: "Social post has been removed." });
    }
  };

  const handleEdit = (post: SocialPost) => {
    setEditingPost(post);
  };

  const handleSaveEdit = () => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? editingPost : p));
      setEditingPost(null);
      toast({ title: "Post Updated", description: "Your changes have been saved." });
    }
  };

  const handleView = (post: SocialPost) => {
    setViewingPost(post);
  };

  const filteredPosts = posts.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'published') return p.status === 'Published';
    if (filter === 'scheduled') return p.status === 'Scheduled';
    if (filter === 'draft') return p.status === 'Draft';
    return p.platform === filter;
  });

  const totalEngagement = posts.reduce((acc, p) => acc + p.engagement.likes + p.engagement.comments + p.engagement.shares, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Social Posts</h1>
          <p className="text-muted-foreground">Create and schedule social media posts</p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Share2 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold">{posts.filter(p => p.status === 'Published').length}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">{posts.filter(p => p.status === 'Scheduled').length}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Engagement</p>
                <p className="text-2xl font-bold">{totalEngagement.toLocaleString()}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Heart className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>All</Button>
        <Button variant={filter === 'facebook' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('facebook')}><Facebook className="h-4 w-4 mr-1" /> Facebook</Button>
        <Button variant={filter === 'instagram' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('instagram')}><Instagram className="h-4 w-4 mr-1" /> Instagram</Button>
        <Button variant={filter === 'twitter' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('twitter')}><Twitter className="h-4 w-4 mr-1" /> Twitter</Button>
        <Button variant={filter === 'linkedin' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('linkedin')}><Linkedin className="h-4 w-4 mr-1" /> LinkedIn</Button>
        <Button variant={filter === 'published' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('published')}>Published</Button>
        <Button variant={filter === 'scheduled' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('scheduled')}>Scheduled</Button>
        <Button variant={filter === 'draft' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('draft')}>Drafts</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${platformColors[post.platform]}`}>
                  {platformIcons[post.platform]}
                </div>
                <Badge variant={post.status === 'Published' ? 'default' : post.status === 'Scheduled' ? 'secondary' : 'outline'}>
                  {post.status}
                </Badge>
              </div>
              <p className="text-sm mb-3 line-clamp-3">{post.content}</p>
              {post.status === 'Published' && (
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1"><Heart className="h-4 w-4" /> {post.engagement.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="h-4 w-4" /> {post.engagement.comments}</span>
                  <span className="flex items-center gap-1"><Share className="h-4 w-4" /> {post.engagement.shares}</span>
                  <span className="flex items-center gap-1"><Link className="h-4 w-4" /> {post.engagement.clicks}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{post.publishedAt || post.scheduledAt || post.created}</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleView(post)}><Eye className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Social Post</DialogTitle>
            <DialogDescription>Create a new social media post to publish</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Platform</Label>
              <Select value={newPost.platform} onValueChange={(v) => setNewPost({...newPost, platform: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook"><div className="flex items-center gap-2"><Facebook className="h-4 w-4 text-blue-600" /> Facebook</div></SelectItem>
                  <SelectItem value="instagram"><div className="flex items-center gap-2"><Instagram className="h-4 w-4 text-pink-600" /> Instagram</div></SelectItem>
                  <SelectItem value="twitter"><div className="flex items-center gap-2"><Twitter className="h-4 w-4 text-blue-400" /> Twitter</div></SelectItem>
                  <SelectItem value="linkedin"><div className="flex items-center gap-2"><Linkedin className="h-4 w-4 text-blue-700" /> LinkedIn</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Content</Label>
              <Textarea placeholder="What do you want to share?" value={newPost.content} onChange={(e) => setNewPost({...newPost, content: e.target.value})} className="min-h-32" />
              <p className="text-sm text-muted-foreground mt-1">{newPost.content.length} characters</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editingPost !== null} onOpenChange={() => setEditingPost(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Social Post</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-4">
              <div>
                <Label>Platform</Label>
                <Select value={editingPost.platform} onValueChange={(v) => setEditingPost({...editingPost, platform: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Content</Label>
                <Textarea value={editingPost.content} onChange={(e) => setEditingPost({...editingPost, content: e.target.value})} className="min-h-32" />
              </div>
              <Button onClick={handleSaveEdit} className="w-full">Save Changes</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={viewingPost !== null} onOpenChange={() => setViewingPost(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {viewingPost && platformIcons[viewingPost.platform]}
              Post Preview
            </DialogTitle>
          </DialogHeader>
          {viewingPost && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p>{viewingPost.content}</p>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Status: {viewingPost.status}</span>
                <span>Created: {viewingPost.created}</span>
              </div>
              {viewingPost.status === 'Draft' && (
                <Button onClick={() => { handlePublish(viewingPost.id); setViewingPost(null); }} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
