"use client"
import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Hash, 
  Lock, 
  Search, 
  Send, 
  Smile, 
  Paperclip, 
  MoreHorizontal,
  Phone,
  Video,
  Settings,
  Users,
  Pin,
  Star,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Textarea } from '../components/ui/textarea';

const mockChannels = [
  { id: 1, name: 'general', type: 'public', unread: 0, members: 15 },
  { id: 2, name: 'project-alpha', type: 'public', unread: 3, members: 8 },
  { id: 3, name: 'design-team', type: 'private', unread: 1, members: 5 },
  { id: 4, name: 'announcements', type: 'public', unread: 0, members: 15 },
  { id: 5, name: 'random', type: 'public', unread: 2, members: 12 },
];

const mockDirectMessages = [
  { id: 1, name: 'Sarah Chen', status: 'online', unread: 2, avatar: 'SC' },
  { id: 2, name: 'Mike Johnson', status: 'in-meeting', unread: 0, avatar: 'MJ' },
  { id: 3, name: 'Emily Davis', status: 'away', unread: 1, avatar: 'ED' },
  { id: 4, name: 'Alex Kumar', status: 'online', unread: 0, avatar: 'AK' },
];

const mockMessages = [
  {
    id: 1,
    user: { name: 'Sarah Chen', avatar: 'SC' },
    message: 'Hey team! Just finished the new dashboard mockups. Would love to get your feedback 🎨',
    timestamp: '10:30 AM',
    reactions: [{ emoji: '👍', count: 3 }, { emoji: '🎉', count: 1 }]
  },
  {
    id: 2,
    user: { name: 'Mike Johnson', avatar: 'MJ' },
    message: 'Looks amazing! The color scheme really works well with our brand guidelines.',
    timestamp: '10:32 AM',
    reactions: []
  },
  {
    id: 3,
    user: { name: 'Emily Davis', avatar: 'ED' },
    message: 'I love the new layout! One small suggestion - could we make the sidebar a bit wider?',
    timestamp: '10:35 AM',
    reactions: [{ emoji: '👍', count: 2 }]
  },
  {
    id: 4,
    user: { name: 'Alex Kumar', avatar: 'AK' },
    message: 'Great work Sarah! This will really improve the user experience. When can we start implementation?',
    timestamp: '10:38 AM',
    reactions: []
  },
];

const mockPinnedMessages = [
  {
    id: 1,
    user: { name: 'John Doe', avatar: 'JD' },
    message: 'Team standup every day at 9:00 AM. Please be on time! 📅',
    timestamp: '2 days ago'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-500';
    case 'in-meeting': return 'bg-yellow-500';
    case 'away': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};

export default function ChatCommunication() {
  const [selectedChannel, setSelectedChannel] = useState(mockChannels[0]);
  const [selectedDM, setSelectedDM] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showPinned, setShowPinned] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showChatView, setShowChatView] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const isChannelSelected = selectedChannel && !selectedDM;
  const currentChat = selectedDM || selectedChannel;

  const handleChatSelect = (type: 'channel' | 'dm', chat: any) => {
    if (type === 'channel') {
      setSelectedChannel(chat);
      setSelectedDM(null);
    } else {
      setSelectedDM(chat);
      setSelectedChannel(null);
    }
    
    // On mobile, switch to chat view when a chat is selected
    if (isMobile) {
      setShowChatView(true);
    }
  };

  const handleBackToChannels = () => {
    setShowChatView(false);
  };

  // Sidebar Component
  const Sidebar = () => (
    <div className={`${isMobile ? 'w-full' : 'w-64'} bg-card border-r border-border flex flex-col`}>
        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search channels..." className="pl-10" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {/* Channels */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-muted-foreground">Channels</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {mockChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => handleChatSelect('channel', channel)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors ${
                    isChannelSelected && selectedChannel.id === channel.id
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {channel.type === 'private' ? (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Hash className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="flex-1 text-sm">{channel.name}</span>
                  {channel.unread > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {channel.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Direct Messages */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm text-muted-foreground">Direct Messages</h3>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {mockDirectMessages.map((dm) => (
                <button
                  key={dm.id}
                  onClick={() => handleChatSelect('dm', dm)}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors ${
                    selectedDM?.id === dm.id
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <div className="relative">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{dm.avatar}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(dm.status)}`} />
                  </div>
                  <span className="flex-1 text-sm">{dm.name}</span>
                  {dm.unread > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {dm.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
    </div>
  );

  // Main Chat Area Component
  const ChatArea = () => (
    <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 bg-card border-b border-border px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile back button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToChannels}
                className="p-2 mr-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            {selectedDM ? (
              <>
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{selectedDM.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-sm">{selectedDM.name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedDM.status}</p>
                </div>
              </>
            ) : (
              <>
                {selectedChannel.type === 'private' ? (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Hash className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <h2 className="text-sm">{selectedChannel.name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedChannel.members} members</p>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant={showPinned ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowPinned(!showPinned)}
              className={isMobile ? "h-8 w-8 p-0" : ""}
            >
              <Pin className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className={isMobile ? "h-8 w-8 p-0" : ""}>
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className={isMobile ? "h-8 w-8 p-0" : ""}>
              <Video className="w-4 h-4" />
            </Button>
            {!isMobile && (
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4" />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Channel Settings</DropdownMenuItem>
                <DropdownMenuItem>Notification Settings</DropdownMenuItem>
                <DropdownMenuItem>View Files</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Pinned Messages */}
        {showPinned && (
          <div className="bg-muted/50 border-b border-border p-4">
            <h3 className="text-sm mb-2">Pinned Messages</h3>
            {mockPinnedMessages.map((message) => (
              <div key={message.id} className="flex items-start gap-3 p-2 bg-background rounded-md">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">{message.user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{message.user.name}</span>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 md:p-6">
          <div className="space-y-4 md:space-y-6">
            {mockMessages.map((message) => (
              <div key={message.id} className="flex items-start gap-3 group">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{message.user.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{message.user.name}</span>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.message}</p>
                  {message.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {message.reactions.map((reaction, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-6 px-2 text-xs"
                        >
                          {reaction.emoji} {reaction.count}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>React</DropdownMenuItem>
                      <DropdownMenuItem>Reply</DropdownMenuItem>
                      <DropdownMenuItem>Pin Message</DropdownMenuItem>
                      <DropdownMenuItem>Copy Link</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-end gap-3">
            <Button variant="ghost" size="sm" className="mb-2">
              <Paperclip className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <Textarea
                placeholder={`Message ${currentChat.name}...`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="min-h-[40px] max-h-32 resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    // Send message logic here
                    setMessageInput('');
                  }
                }}
              />
            </div>
            <Button variant="ghost" size="sm" className="mb-2">
              <Smile className="w-4 h-4" />
            </Button>
            <Button size="sm" className="mb-2">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
  );

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Desktop: Always show both sidebar and chat */}
      {!isMobile && (
        <>
          <Sidebar />
          <ChatArea />
        </>
      )}
      
      {/* Mobile: Conditional rendering based on showChatView */}
      {isMobile && (
        <>
          {!showChatView ? (
            <Sidebar />
          ) : (
            <ChatArea />
          )}
        </>
      )}
    </div>
  );
}