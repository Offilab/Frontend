"use client"
import React from 'react';
import { 
  CheckSquare, 
  Calendar, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  MessageSquare,
  Video,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Progress } from './components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const mockTaskData = [
  { name: 'Mon', completed: 12, pending: 8 },
  { name: 'Tue', completed: 15, pending: 5 },
  { name: 'Wed', completed: 8, pending: 12 },
  { name: 'Thu', completed: 18, pending: 3 },
  { name: 'Fri', completed: 14, pending: 7 },
];

const mockAttendanceData = [
  { name: 'Week 1', present: 95, absent: 5 },
  { name: 'Week 2', present: 88, absent: 12 },
  { name: 'Week 3', present: 92, absent: 8 },
  { name: 'Week 4', present: 97, absent: 3 },
];

const mockRecentActivity = [
  { user: 'Sarah Chen', action: 'completed task', item: 'Website Redesign', time: '2 minutes ago', avatar: 'SC' },
  { user: 'Mike Johnson', action: 'joined meeting', item: 'Daily Standup', time: '15 minutes ago', avatar: 'MJ' },
  { user: 'Emily Davis', action: 'created project', item: 'Mobile App MVP', time: '1 hour ago', avatar: 'ED' },
  { user: 'Alex Kumar', action: 'submitted leave', item: 'Vacation Request', time: '2 hours ago', avatar: 'AK' },
];

const mockUpcomingMeetings = [
  { title: 'Daily Standup', time: '10:00 AM', attendees: 8, type: 'team' },
  { title: 'Client Presentation', time: '2:00 PM', attendees: 5, type: 'client' },
  { title: 'Sprint Planning', time: '4:00 PM', attendees: 12, type: 'planning' },
];

const mockTeamStatus = [
  { name: 'Sarah Chen', status: 'online', role: 'Frontend Dev', avatar: 'SC' },
  { name: 'Mike Johnson', status: 'in-meeting', role: 'Backend Dev', avatar: 'MJ' },
  { name: 'Emily Davis', status: 'away', role: 'UI Designer', avatar: 'ED' },
  { name: 'Alex Kumar', status: 'online', role: 'Product Manager', avatar: 'AK' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-500';
    case 'in-meeting': return 'bg-yellow-500';
    case 'away': return 'bg-gray-400';
    default: return 'bg-gray-400';
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Welcome Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="mb-2">Good morning, John! 👋</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your team today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-blue-900">Tasks Due Today</CardTitle>
            <div className="p-2 bg-blue-500 rounded-lg">
              <CheckSquare className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 mb-1">8</div>
            <div className="flex items-center gap-2">
              <Progress value={65} className="flex-1 bg-blue-200" />
              <span className="text-xs text-blue-700 font-medium">65%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-green-900">Upcoming Meetings</CardTitle>
            <div className="p-2 bg-green-500 rounded-lg">
              <Video className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 mb-1">3</div>
            <p className="text-xs text-green-700 font-medium">Next: Daily Standup (10:00 AM)</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-purple-900">Team Online</CardTitle>
            <div className="p-2 bg-purple-500 rounded-lg">
              <Users className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 mb-1">12/15</div>
            <p className="text-xs text-purple-700 font-medium">80% attendance</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm text-orange-900">Unread Messages</CardTitle>
            <div className="p-2 bg-orange-500 rounded-lg">
              <MessageSquare className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 mb-1">7</div>
            <p className="text-xs text-orange-700 font-medium">3 urgent</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Task Completion Chart */}
        <Card className="lg:col-span-2 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Weekly Task Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockTaskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Bar dataKey="completed" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pending" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Team Status */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Team Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6">
            {mockTeamStatus.map((member, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="relative">
                  <Avatar className="w-10 h-10 ring-2 ring-gray-200">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)} shadow-sm`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs font-medium ${
                    member.status === 'online' ? 'border-green-200 text-green-700 bg-green-50' :
                    member.status === 'in-meeting' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                    'border-gray-200 text-gray-700 bg-gray-50'
                  }`}
                >
                  {member.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Today&apos;s Meetings</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUpcomingMeetings.map((meeting, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="font-medium text-sm">{meeting.title}</p>
                  <p className="text-xs text-muted-foreground">{meeting.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{meeting.attendees} attendees</p>
                  <Button size="sm" variant="ghost" className="h-6 text-xs">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{activity.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span>{activity.user}</span>
                    <span className="text-muted-foreground"> {activity.action} </span>
                    <span>{activity.item}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
          <CardTitle className="text-gray-800 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-purple-600" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Button variant="outline" className="h-24 flex flex-col gap-3 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md transition-all duration-200 group">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <CheckSquare className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-700">Create Task</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-3 border-2 border-green-200 hover:border-green-300 hover:bg-green-50 hover:shadow-md transition-all duration-200 group">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Video className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-green-700">Start Meeting</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-3 border-2 border-orange-200 hover:border-orange-300 hover:bg-orange-50 hover:shadow-md transition-all duration-200 group">
              <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-orange-700">Request Leave</span>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-3 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 hover:shadow-md transition-all duration-200 group">
              <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-purple-700">New Document</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}