"use client"
import React, { useState } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  Monitor, 
  Settings, 
  Users, 
  MessageSquare,
  MoreHorizontal,
  Calendar,
  Clock,
  Plus
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { ScrollArea } from '../components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const mockMeetings = [
  {
    id: 1,
    title: 'Daily Standup',
    time: '10:00 AM - 10:30 AM',
    date: 'Today',
    attendees: [
      { name: 'Sarah Chen', avatar: 'SC', status: 'present' },
      { name: 'Mike Johnson', avatar: 'MJ', status: 'present' },
      { name: 'Emily Davis', avatar: 'ED', status: 'absent' },
      { name: 'Alex Kumar', avatar: 'AK', status: 'present' },
    ],
    status: 'live'
  },
  {
    id: 2,
    title: 'Client Presentation',
    time: '2:00 PM - 3:00 PM',
    date: 'Today',
    attendees: [
      { name: 'John Doe', avatar: 'JD', status: 'present' },
      { name: 'Sarah Chen', avatar: 'SC', status: 'present' },
    ],
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Sprint Planning',
    time: '4:00 PM - 5:00 PM',
    date: 'Today',
    attendees: [
      { name: 'Sarah Chen', avatar: 'SC', status: 'present' },
      { name: 'Mike Johnson', avatar: 'MJ', status: 'present' },
      { name: 'Emily Davis', avatar: 'ED', status: 'present' },
      { name: 'Alex Kumar', avatar: 'AK', status: 'present' },
    ],
    status: 'upcoming'
  }
];

const mockParticipants = [
  { id: 1, name: 'John Doe (You)', avatar: 'JD', isMuted: false, isVideoOn: true, isHost: true },
  { id: 2, name: 'Sarah Chen', avatar: 'SC', isMuted: false, isVideoOn: true, isHost: false },
  { id: 3, name: 'Mike Johnson', avatar: 'MJ', isMuted: true, isVideoOn: false, isHost: false },
  { id: 4, name: 'Alex Kumar', avatar: 'AK', isMuted: false, isVideoOn: true, isHost: false },
];

export default function VideoConferencing() {
  const [inMeeting, setInMeeting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [newMeeting, setNewMeeting] = useState({
    title: '',
    date: '',
    time: '',
    duration: '30',
    attendees: []
  });

  const MeetingRoom = () => (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Video Grid */}
      <div className="flex-1 bg-gray-900 relative">
        <div className="grid grid-cols-2 h-full gap-2 p-4">
          {mockParticipants.map((participant) => (
            <div key={participant.id} className="bg-gray-800 rounded-lg relative overflow-hidden">
              {participant.isVideoOn ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-2xl">{participant.avatar}</AvatarFallback>
                  </Avatar>
                </div>
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-2xl">{participant.avatar}</AvatarFallback>
                  </Avatar>
                </div>
              )}
              
              {/* Participant Info */}
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {participant.name}
                </Badge>
                {participant.isHost && (
                  <Badge variant="outline" className="text-xs">
                    Host
                  </Badge>
                )}
              </div>

              {/* Mute Status */}
              {participant.isMuted && (
                <div className="absolute top-2 right-2">
                  <div className="bg-red-500 rounded-full p-1">
                    <MicOff className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Meeting Controls */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-4 bg-gray-800 rounded-lg p-4">
            <Button
              variant={isMuted ? "destructive" : "secondary"}
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="rounded-full w-12 h-12"
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            
            <Button
              variant={isVideoOn ? "secondary" : "destructive"}
              size="sm"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className="rounded-full w-12 h-12"
            >
              {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>

            <Button
              variant={isScreenSharing ? "default" : "secondary"}
              size="sm"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className="rounded-full w-12 h-12"
            >
              <Monitor className="w-5 h-5" />
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowChat(!showChat)}
              className="rounded-full w-12 h-12"
            >
              <MessageSquare className="w-5 h-5" />
            </Button>

            <Button
              variant="secondary"
              size="sm"
              className="rounded-full w-12 h-12"
            >
              <Users className="w-5 h-5" />
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => setInMeeting(false)}
              className="rounded-full w-12 h-12"
            >
              <Phone className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {showChat && (
        <div className="w-80 bg-card border-l border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="text-sm">Meeting Chat</h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="text-xs text-center text-muted-foreground">
                Chat messages will appear here
              </div>
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border">
            <Input placeholder="Type a message..." />
          </div>
        </div>
      )}
    </div>
  );

  const MeetingList = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Video Conferencing</h1>
          <p className="text-muted-foreground">Join meetings and collaborate with your team</p>
        </div>
        
        <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
              <DialogDescription>
                Create a new meeting and invite team members.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Meeting Title</Label>
                <Input
                  id="title"
                  placeholder="Enter meeting title..."
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={newMeeting.duration} onValueChange={(value) => setNewMeeting({ ...newMeeting, duration: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsScheduleModalOpen(false)}>
                Schedule Meeting
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Video className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="text-sm mb-2">Start Instant Meeting</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Begin a meeting right now
            </p>
            <Button size="sm" onClick={() => setInMeeting(true)}>
              Start Now
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="text-sm mb-2">Schedule Meeting</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Plan a meeting for later
            </p>
            <Button size="sm" variant="outline" onClick={() => setIsScheduleModalOpen(true)}>
              Schedule
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="text-sm mb-2">Join by ID</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Enter meeting ID to join
            </p>
            <Button size="sm" variant="outline">
              Join
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Today's Meetings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Today&apos;s Meetings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockMeetings.map((meeting) => (
            <div key={meeting.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-sm">{meeting.title}</h4>
                  <Badge variant={meeting.status === 'live' ? 'destructive' : 'secondary'}>
                    {meeting.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{meeting.time}</p>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {meeting.attendees.slice(0, 3).map((attendee, index) => (
                      <Avatar key={index} className="w-6 h-6 border-2 border-background">
                        <AvatarFallback className="text-xs">{attendee.avatar}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  {meeting.attendees.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{meeting.attendees.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {meeting.status === 'live' ? (
                  <Button size="sm" onClick={() => setInMeeting(true)}>
                    Join Now
                  </Button>
                ) : (
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return inMeeting ? <MeetingRoom /> : <MeetingList />;
}