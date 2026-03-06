import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import { 
  Image as ImageIcon, Upload, Search, Grid, List,
  Folder, Copy, Download, Trash2, Eye, X
} from 'lucide-react';

interface ImageAsset {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  dimensions?: { width: number; height: number };
  uploadedAt: string;
  usedIn: number;
}

const defaultImages: ImageAsset[] = [
  { id: '1', name: 'logo.png', url: '/images/logo.png', type: 'image/png', size: 245000, dimensions: { width: 200, height: 100 }, uploadedAt: '2024-01-15', usedIn: 12 },
  { id: '2', name: 'hero-banner.jpg', url: '/images/hero-banner.jpg', type: 'image/jpeg', size: 520000, dimensions: { width: 1200, height: 600 }, uploadedAt: '2024-01-10', usedIn: 5 },
  { id: '3', name: 'product-1.png', url: '/images/product-1.png', type: 'image/png', size: 180000, dimensions: { width: 800, height: 800 }, uploadedAt: '2024-01-08', usedIn: 8 },
  { id: '4', name: 'testimonial-bg.jpg', url: '/images/testimonial-bg.jpg', type: 'image/jpeg', size: 320000, dimensions: { width: 1000, height: 667 }, uploadedAt: '2024-01-05', usedIn: 3 },
  { id: '5', name: 'social-icon-set.png', url: '/images/social-icons.png', type: 'image/png', size: 95000, dimensions: { width: 400, height: 100 }, uploadedAt: '2024-01-02', usedIn: 15 },
];

const folders = [
  { id: '1', name: 'Logos', count: 2 },
  { id: '2', name: 'Banners', count: 1 },
  { id: '3', name: 'Products', count: 1 },
  { id: '4', name: 'Testimonials', count: 1 },
  { id: '5', name: 'Social Media', count: 1 },
];

export const ImageLibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [images, setImages] = useState<ImageAsset[]>(defaultImages);
  const [previewImage, setPreviewImage] = useState<ImageAsset | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const { toast } = useToast();

  const filteredImages = images.filter(img => {
    const matchesSearch = img.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === null || (selectedFolder === '1' && img.name.includes('logo')) ||
      (selectedFolder === '2' && img.name.includes('banner')) ||
      (selectedFolder === '3' && img.name.includes('product')) ||
      (selectedFolder === '4' && img.name.includes('testimonial')) ||
      (selectedFolder === '5' && img.name.includes('social'));
    const matchesType = filterType === 'all' || img.type.includes(filterType);
    return matchesSearch && matchesFolder && matchesType;
  });

  const handleViewImage = (image: ImageAsset) => {
    setPreviewImage(image);
  };

  const handleClosePreview = () => {
    setPreviewImage(null);
  };

  const handleCopyUrl = (image: ImageAsset) => {
    const url = image.url || `https://example.com/images/${image.name}`;
    navigator.clipboard.writeText(url);
    toast({ title: "URL Copied", description: `${url} copied to clipboard` });
  };

  const handleDeleteImage = (imageId: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setImages(images.filter(img => img.id !== imageId));
      toast({ title: "Image Deleted", description: "Image has been removed from your library." });
    }
  };

  const handleUploadImages = () => {
    const newImage: ImageAsset = {
      id: Date.now().toString(),
      name: `uploaded-image-${images.length + 1}.png`,
      url: `/images/uploaded-${Date.now()}.png`,
      type: 'image/png',
      size: Math.floor(Math.random() * 500000) + 50000,
      dimensions: { width: 800, height: 600 },
      uploadedAt: new Date().toISOString().split('T')[0],
      usedIn: 0
    };
    setImages([...images, newImage]);
    toast({ title: "Image Uploaded", description: `${newImage.name} has been added to your library.` });
  };

  const handleDownload = (image: ImageAsset) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = image.name;
    link.click();
    toast({ title: "Download Started", description: `Downloading ${image.name}...` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Image Library</h1>
          <p className="text-muted-foreground">Manage your images and assets</p>
        </div>
        <Button onClick={handleUploadImages}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Images
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Folder className="h-5 w-5 mr-2" />
              Folders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant={selectedFolder === null ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedFolder(null)}
              >
                All Images
                <Badge variant="secondary" className="ml-auto">{images.length}</Badge>
              </Button>
              {folders.map((folder) => (
                <Button
                  key={folder.id}
                  variant={selectedFolder === folder.id ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedFolder(folder.id)}
                >
                  {folder.name}
                  <Badge variant="secondary" className="ml-auto">{folder.count}</Badge>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={() => setFilterType(filterType === 'all' ? 'jpeg' : filterType === 'jpeg' ? 'png' : 'all')}>
              {filterType === 'all' ? 'All Types' : filterType.toUpperCase()}
            </Button>
            <div className="flex gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <Card key={image.id} className="overflow-hidden group">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium truncate text-sm">{image.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(image.size / 1000).toFixed(0)} KB
                    </p>
                    <div className="mt-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleViewImage(image)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleCopyUrl(image)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleDeleteImage(image.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredImages.map((image) => (
                <Card key={image.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">{image.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(image.size / 1000).toFixed(0)} KB • {image.dimensions?.width}x{image.dimensions?.height} • Uploaded {image.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">{image.usedIn} uses</Badge>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleViewImage(image)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleCopyUrl(image)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDownload(image)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteImage(image.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={previewImage !== null} onOpenChange={handleClosePreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {previewImage?.name}
              <Button variant="ghost" size="sm" onClick={handleClosePreview}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <div className="w-full max-w-2xl aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="h-24 w-24 text-gray-400" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              {previewImage?.dimensions?.width}x{previewImage?.dimensions?.height} • {(previewImage?.size || 0) / 1000}KB
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => previewImage && handleCopyUrl(previewImage)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy URL
              </Button>
              <Button variant="outline" onClick={() => previewImage && handleDownload(previewImage)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
