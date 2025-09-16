"use client"
import React, { useState } from 'react';
import { Calendar, Plus, Filter, Check, X, Clock, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const mockLeaveRequests = [
  {
    id: 1,
    employee: { name: 'Sarah Chen', avatar: 'SC' },
    type: 'Vacation',
    startDate: '2024-12-20',
    endDate: '2024-12-24',
    days: 5,
    reason: 'Christmas vacation with family',
    status: 'pending',
    appliedDate: '2024-12-10'
  },
  {
    id: 2,
    employee: { name: 'Mike Johnson', avatar: 'MJ' },
    type: 'Sick Leave',
    startDate: '2024-12-15',
    endDate: '2024-12-15',
    days: 1,
    reason: 'Medical appointment',
    status: 'approved',
    appliedDate: '2024-12-12'
  }
];

const mockLeaveBalance = {
  vacation: { used: 8, total: 20 },
  sick: { used: 3, total: 10 },
  personal: { used: 2, total: 5 }
};

export default function LeaveTracker() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    type: 'Vacation',
    startDate: '',
    endDate: '',
    reason: ''
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Leave Tracker</h1>
          <p className="text-muted-foreground">Manage time off and leave requests</p>
        </div>
        <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Request Leave
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Leave Request</DialogTitle>
              <DialogDescription>Fill out the details for your time off request.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Leave Type</Label>
                <Select value={newRequest.type} onValueChange={(value) => setNewRequest({ ...newRequest, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vacation">Vacation</SelectItem>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newRequest.startDate}
                    onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newRequest.endDate}
                    onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Brief reason for leave..."
                  value={newRequest.reason}
                  onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRequestModalOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsRequestModalOpen(false)}>Submit Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Leave Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(mockLeaveBalance).map(([type, balance]) => (
          <Card key={type}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm capitalize">{type} Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{balance.total - balance.used}</span>
                <span className="text-sm text-muted-foreground">/{balance.total}</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(balance.used / balance.total) * 100}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{balance.used} days used</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leave Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockLeaveRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 rounded-lg border">
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{request.employee.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-sm">{request.employee.name}</h4>
                  <p className="text-xs text-muted-foreground">{request.type}</p>
                </div>
                <div>
                  <p className="text-sm">{request.startDate} - {request.endDate}</p>
                  <p className="text-xs text-muted-foreground">{request.days} days</p>
                </div>
                <div className="max-w-xs">
                  <p className="text-sm truncate">{request.reason}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  request.status === 'approved' ? 'default' : 
                  request.status === 'rejected' ? 'destructive' : 'secondary'
                }>
                  {request.status}
                </Badge>
                {request.status === 'pending' && (
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}