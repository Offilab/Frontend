"use client"
import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Calendar, Users, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';

const mockAttendanceToday = [
  { name: 'Sarah Chen', avatar: 'SC', checkIn: '9:00 AM', status: 'present', workingHours: '8h 30m' },
  { name: 'Mike Johnson', avatar: 'MJ', checkIn: '8:45 AM', status: 'present', workingHours: '8h 45m' },
  { name: 'Emily Davis', avatar: 'ED', checkIn: null, status: 'absent', workingHours: '0h' },
  { name: 'Alex Kumar', avatar: 'AK', checkIn: '9:15 AM', status: 'late', workingHours: '8h 15m' },
];

export default function AttendanceHR() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState('');

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    setCheckInTime('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Attendance & HR</h1>
        <p className="text-muted-foreground">Track attendance and manage HR activities</p>
      </div>

      {/* Check In/Out */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Check-in</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              {isCheckedIn ? (
                <div>
                  <p className="text-sm">Checked in at <span className="font-medium">{checkInTime}</span></p>
                  <p className="text-xs text-muted-foreground">Working hours: 3h 45m</p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Not checked in today</p>
              )}
            </div>
            <Button
              onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
              variant={isCheckedIn ? "outline" : "default"}
              className="flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              {isCheckedIn ? 'Check Out' : 'Check In'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-1">3/4</div>
            <p className="text-xs text-muted-foreground">75% attendance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-1">18/20</div>
            <p className="text-xs text-muted-foreground">90% attendance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Late Arrivals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-1">1</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Avg Working Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl mb-1">8.2h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Attendance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Today&apos;s Attendance</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockAttendanceToday.map((employee, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{employee.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm">{employee.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {employee.checkIn ? `Checked in: ${employee.checkIn}` : 'Not checked in'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm">{employee.workingHours}</p>
                  <p className="text-xs text-muted-foreground">Working hours</p>
                </div>
                <Badge variant={
                  employee.status === 'present' ? 'default' :
                  employee.status === 'late' ? 'secondary' : 'destructive'
                }>
                  {employee.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}