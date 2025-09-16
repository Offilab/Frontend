"use client"
import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar, 
  User, 
  Flag, 
  MoreHorizontal,
  Paperclip,
  MessageCircle,
  Eye,
  LayoutList,
  LayoutGrid
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
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
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const mockTasks = {
  'todo': [
    {
      id: 1,
      title: 'Design new dashboard',
      description: 'Create mockups for the updated dashboard interface',
      priority: 'high',
      assignee: { name: 'Sarah Chen', avatar: 'SC' },
      dueDate: '2024-12-15',
      tags: ['Design', 'UI'],
      attachments: 2,
      comments: 3
    },
    {
      id: 2,
      title: 'API Integration',
      description: 'Integrate third-party payment API',
      priority: 'medium',
      assignee: { name: 'Mike Johnson', avatar: 'MJ' },
      dueDate: '2024-12-20',
      tags: ['Backend', 'API'],
      attachments: 0,
      comments: 1
    }
  ],
  'in-progress': [
    {
      id: 3,
      title: 'User authentication',
      description: 'Implement OAuth 2.0 authentication system',
      priority: 'high',
      assignee: { name: 'Alex Kumar', avatar: 'AK' },
      dueDate: '2024-12-18',
      tags: ['Backend', 'Security'],
      attachments: 1,
      comments: 5
    }
  ],
  'review': [
    {
      id: 4,
      title: 'Mobile responsiveness',
      description: 'Ensure all pages work on mobile devices',
      priority: 'medium',
      assignee: { name: 'Emily Davis', avatar: 'ED' },
      dueDate: '2024-12-16',
      tags: ['Frontend', 'Mobile'],
      attachments: 0,
      comments: 2
    }
  ],
  'done': [
    {
      id: 5,
      title: 'Database setup',
      description: 'Configure PostgreSQL database with proper indexes',
      priority: 'low',
      assignee: { name: 'Mike Johnson', avatar: 'MJ' },
      dueDate: '2024-12-10',
      tags: ['Backend', 'Database'],
      attachments: 1,
      comments: 0
    }
  ]
};

const columnTitles = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'review': 'Review',
  'done': 'Done'
};

const priorityColors = {
  high: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  low: 'text-green-600 bg-green-50 border-green-200'
};

export default function TaskManagement() {
  const [view, setView] = useState('kanban');
  const [tasks, setTasks] = useState(mockTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    tags: []
  });

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-sm line-clamp-2">{task.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {task.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
            </Avatar>
            <Badge 
              variant="outline" 
              className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}
            >
              {task.priority}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {task.attachments > 0 && (
              <span className="flex items-center gap-1">
                <Paperclip className="w-3 h-3" />
                {task.attachments}
              </span>
            )}
            {task.comments > 0 && (
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3 h-3" />
                {task.comments}
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );

  const KanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(tasks).map(([columnId, columnTasks]) => (
        <div key={columnId} className="min-h-[500px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">{columnTitles[columnId as keyof typeof columnTitles]}</h3>
            <Badge variant="secondary" className="text-xs">
              {columnTasks.length}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {columnTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-3">
      {Object.values(tasks).flat().map((task) => (
        <Card key={task.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <h4 className="text-sm">{task.title}</h4>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}
                >
                  {task.priority}
                </Badge>
                <div className="flex gap-1">
                  {task.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {task.attachments > 0 && (
                    <span className="flex items-center gap-1">
                      <Paperclip className="w-3 h-3" />
                      {task.attachments}
                    </span>
                  )}
                  {task.comments > 0 && (
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {task.comments}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Tasks & Projects</h1>
          <p className="text-muted-foreground">Manage your team's work and projects</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your project board.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter task description..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignee">Assign to</Label>
                <Select value={newTask.assignee} onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Chen</SelectItem>
                    <SelectItem value="mike">Mike Johnson</SelectItem>
                    <SelectItem value="emily">Emily Davis</SelectItem>
                    <SelectItem value="alex">Alex Kumar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateModalOpen(false)}>
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search tasks..." className="pl-10 w-64" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>

        <Tabs value={view} onValueChange={setView} className="w-auto">
          <TabsList>
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <LayoutList className="w-4 h-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      {view === 'kanban' ? <KanbanView /> : <ListView />}
    </div>
  );
}