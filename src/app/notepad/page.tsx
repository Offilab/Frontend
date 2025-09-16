"use client"
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Save, 
  Share, 
  Download, 
  History, 
  Bold, 
  Italic, 
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  Quote,
  Undo,
  Redo,
  Users,
  Eye,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Label } from '../components/ui/label';

const mockDocuments = [
  {
    id: 1,
    title: 'Project Requirements Document',
    lastModified: '2 hours ago',
    collaborators: [
      { name: 'Sarah Chen', avatar: 'SC' },
      { name: 'Mike Johnson', avatar: 'MJ' },
    ],
    status: 'active'
  },
  {
    id: 2,
    title: 'Sprint Planning Notes',
    lastModified: '1 day ago',
    collaborators: [
      { name: 'Emily Davis', avatar: 'ED' },
      { name: 'Alex Kumar', avatar: 'AK' },
    ],
    status: 'inactive'
  },
  {
    id: 3,
    title: 'API Documentation',
    lastModified: '3 days ago',
    collaborators: [
      { name: 'Mike Johnson', avatar: 'MJ' },
    ],
    status: 'inactive'
  }
];

const mockActiveUsers = [
  { name: 'Sarah Chen', avatar: 'SC', color: 'bg-blue-500', cursor: { x: 45, y: 12 } },
  { name: 'Mike Johnson', avatar: 'MJ', color: 'bg-green-500', cursor: { x: 78, y: 25 } },
];

const sampleContent = `# Project Requirements Document

## Overview
This document outlines the requirements for our upcoming project management platform.

## Key Features
- **Task Management**: Create, assign, and track tasks
- **Team Collaboration**: Real-time chat and video calls
- **File Sharing**: Secure document management
- **Analytics**: Comprehensive reporting and insights

## Technical Requirements
### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- State management with Zustand

### Backend
- Node.js with Express
- PostgreSQL database
- Redis for caching

## Timeline
1. Phase 1: Core functionality (4 weeks)
2. Phase 2: Advanced features (3 weeks)
3. Phase 3: Testing and deployment (2 weeks)

## Acceptance Criteria
- [ ] User authentication system
- [ ] Task CRUD operations
- [ ] Real-time notifications
- [ ] Mobile responsive design
- [x] Initial wireframes completed
- [x] Database schema defined

---
*Last updated: December 12, 2024 by Sarah Chen*`;

export default function CollaborativeNotepad() {
  const [selectedDocument, setSelectedDocument] = useState(mockDocuments[0]);
  const [content, setContent] = useState(sampleContent);
  const [isNewDocModalOpen, setIsNewDocModalOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('c');
  const [isMobile, setIsMobile] = useState(false);
  const [showDocumentView, setShowDocumentView] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleDocumentSelect = (doc: any) => {
    setSelectedDocument(doc);
    
    // On mobile, switch to document view when a document is selected
    if (isMobile) {
      setShowDocumentView(true);
    }
  };

  const handleBackToDocuments = () => {
    setShowDocumentView(false);
  };

  const DocumentList = () => (
    <div className={`${isMobile ? 'w-full' : 'w-80'} bg-card border-r border-border p-4`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm">Documents</h2>
        <Dialog open={isNewDocModalOpen} onOpenChange={setIsNewDocModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Document</DialogTitle>
              <DialogDescription>
                Start a new collaborative document.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Document Title</Label>
                <input className='flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50' type="text" id='title' placeholder='Enter document title...' value={newDocTitle} onChange={(e)=>setNewDocTitle(e.target.value)} />

                {/* <Input
                  id="title"
                  placeholder="Enter document title..."
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                /> */}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNewDocModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsNewDocModalOpen(false)}>
                Create Document
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {mockDocuments.map((doc) => (
          <div
            key={doc.id}
            onClick={() => handleDocumentSelect(doc)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedDocument.id === doc.id
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm line-clamp-2">{doc.title}</h3>
              {doc.status === 'active' && (
                <Badge variant="secondary" className="text-xs">
                  Live
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-2">{doc.lastModified}</p>
            <div className="flex items-center gap-1">
              <div className="flex -space-x-1">
                {doc.collaborators.map((collaborator, index) => (
                  <Avatar key={index} className="w-5 h-5 border border-background">
                    <AvatarFallback className="text-xs">{collaborator.avatar}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ToolBar = () => (
    <div className="h-12 bg-card border-b border-border px-3 md:px-4 flex items-center gap-1 md:gap-2">
      {/* Mobile back button */}
      {isMobile && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToDocuments}
            className="p-2 mr-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
        </>
      )}
      
      <Button variant="ghost" size="sm" className={isMobile ? "h-8 w-8 p-0" : ""}>
        <Undo className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" className={isMobile ? "h-8 w-8 p-0" : ""}>
        <Redo className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" className="h-6" />
      <Button variant="ghost" size="sm" className={isMobile ? "h-8 w-8 p-0" : ""}>
        <Bold className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" className={isMobile ? "h-8 w-8 p-0" : ""}>
        <Italic className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" className={isMobile ? "h-8 w-8 p-0" : ""}>
        <Underline className="w-4 h-4" />
      </Button>
      {!isMobile && (
        <>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm">
            <List className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ListOrdered className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="ghost" size="sm">
            <Link className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Image className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Code className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Quote className="w-4 h-4" />
          </Button>
        </>
      )}
      
      <div className="ml-auto flex items-center gap-1 md:gap-2">
        {/* Collaborators - show on desktop, compact on mobile */}
        {!isMobile && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Collaborators:</span>
              <div className="flex -space-x-1">
                {mockActiveUsers.map((user, index) => (
                  <div key={index} className="relative">
                    <Avatar className="w-6 h-6 border border-background">
                      <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-background ${user.color}`} />
                  </div>
                ))}
              </div>
            </div>
            <Separator orientation="vertical" className="h-6" />
          </>
        )}
        
        {/* Mobile: Just show collaborators count */}
        {isMobile && (
          <div className="flex -space-x-1 mr-2">
            {mockActiveUsers.slice(0, 2).map((user, index) => (
              <div key={index} className="relative">
                <Avatar className="w-6 h-6 border border-background">
                  <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-background ${user.color}`} />
              </div>
            ))}
          </div>
        )}
        
        {/* Mobile: Show only essential buttons */}
        {isMobile ? (
          <>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Share className="w-4 h-4" />
            </Button>
            <Button size="sm" className="h-8 px-3">
              <Save className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <History className="w-4 h-4 mr-2" />
                  History
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Version History</DropdownMenuItem>
                <DropdownMenuItem>Restore Previous Version</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );

  const Editor = () => (
    <div className="flex-1 flex flex-col relative">
      {/* Active user cursors */}
      {mockActiveUsers.map((user, index) => (
        <div
          key={index}
          className="absolute pointer-events-none z-10"
          style={{
            left: `${user.cursor.x}%`,
            top: `${user.cursor.y}%`,
          }}
        >
          <div className="flex items-center gap-1">
            <div className={`w-0.5 h-6 ${user.color}`} />
            <div className={`px-2 py-1 rounded text-xs text-white ${user.color}`}>
              {user.name}
            </div>
          </div>
        </div>
      ))}
      
      <div className={`flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full`}>
        <div className="mb-4 md:mb-6">
          {/* <Input
            value={selectedDocument.title}
            className="text-xl md:text-2xl border-none p-0 bg-transparent"
            placeholder="Document title..."
          /> */}
        </div>
        
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`${isMobile ? 'min-h-[400px]' : 'min-h-[600px]'} border-none resize-none p-0 bg-transparent text-sm md:text-base leading-relaxed`}
          placeholder="Start writing..."
        />
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Desktop: Always show both document list and editor */}
      {!isMobile && (
        <>
          <DocumentList />
          <div className="flex-1 flex flex-col">
            <ToolBar />
            <Editor />
          </div>
        </>
      )}
      
      {/* Mobile: Conditional rendering based on showDocumentView */}
      {isMobile && (
        <>
          {!showDocumentView ? (
            <DocumentList />
          ) : (
            <div className="flex-1 flex flex-col">
              <ToolBar />
              <Editor />
            </div>
          )}
        </>
      )}
    </div>
  );
}