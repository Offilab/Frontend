
"use client"
import React, { useState } from 'react';
import { createTask, getAllUsers, updateTaskStatus } from '../apiRequests';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useRouter } from 'next/navigation';
import { fetchTasks } from '../apiRequests';
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
import { set } from 'react-hook-form';

type Task = {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  due_date: string;
  status: 'InProgress' | 'Review' | 'Done';
  assigned_id: string;
  creator_id: string| null;
};

export interface AssignedUser {
  id: string;
  fullname: string;
  email: string;
  role: string;
}

// resTask extends Task and adds extra fields
export interface resTask extends Task {
  task_id: string;
  created_at: string;
  updated_at: string;
  assigned_user: AssignedUser;
}



const columnTitles = {
  'todo': 'To Do',
  'InProgress': 'In Progress',
  'Review': 'Review',
  'Done': 'Done'
};

const priorityColors = {
  High: 'text-red-600 bg-red-50 border-red-200',
  Medium: 'text-yelLow-600 bg-yelLow-50 border-yelLow-200',
  Low: 'text-green-600 bg-green-50 border-green-200'
};
const users=await getAllUsers();

export default function TaskManagement() {
  

  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [tasks, setTasks] = useState<Record< 'InProgress' | 'Review' | 'Done', resTask[]>>({
  "InProgress": [],
  "Review": [],
  "Done": []
});

  const [newTask, setNewTask] = useState<{ title: string; description: string; priority: 'Low' | 'Medium' | 'High'; assigned_id: string; due_date: string; }>({
    title: '',
    description: '',
    priority: 'Medium',
    assigned_id: '',
    due_date: ''
  });
  console.log('New Task:', newTask);
  const router = useRouter();
    const { user,isAuth, rehydrated } = useSelector((state: RootState) => state.auth);
useEffect(() => {
  if (rehydrated && !isAuth) {
    router.push("/");
  }
}, [isAuth, rehydrated, router]);
const handleSendToReview = async (id: string) => {
  try {
    const result = await updateTaskStatus(id, "Review");
    console.log("Updated:", result);

    setTasks((prevTasks) => {
      // Find the task in InProgress
      const inProgressTasks = prevTasks.InProgress.filter((t) => t.task_id !== id);
      const movedTask = prevTasks.InProgress.find((t) => t.task_id === id);

      if (!movedTask) return prevTasks;

      // Explicitly type this as resTask
      const updatedTask: resTask = { ...movedTask, status: "Review" };

      return {
        ...prevTasks,
        InProgress: inProgressTasks,
        Review: [...prevTasks.Review, updatedTask],
      } satisfies Record<"InProgress" | "Review" | "Done", resTask[]>; // ✅ ensures exact type match
    });

  } catch (err) {
    console.error(err);
    alert("Failed to update status");
  }
};
   const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        console.log('Fetched Tasks:', response.data.events);
        const tasks = response.data.events;
        const grouped = tasks.reduce(
        (acc, task) => {
          const statusKey = task.status as keyof typeof acc;
          if (acc[statusKey]) {
            acc[statusKey].push(task);
          }
          return acc;
        },
        {
          Review: [],
          Done: [],
          InProgress: []
        } as Record<"Review" | "Done" | "InProgress", resTask[]>
      );

      setTasks(grouped)
      
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
      }
    };

  useEffect(() => {

    loadTasks();
  }, []);
  console.log('Tasks State:', tasks);
  const handleSubmit = async () => {
    // Validate inputs
    if (!newTask.title || !newTask.description || !newTask.assigned_id || !newTask.due_date) {
      alert('Please fill in all required fields.');
      return;
    }
    const userId: string | null = user ? user.id : null;


    // Create task object
    const taskToCreate: Task = {
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: 'InProgress', // Default status
      due_date: newTask.due_date,
      assigned_id: newTask.assigned_id,
      creator_id: userId // Assuming '1' is the ID of the current user; replace as needed
    };

    console.log ('Creating Task:', taskToCreate);
  const res= await createTask(taskToCreate);
  const refresh =await loadTasks();            
  console.log(tasks)
  setNewTask({ title: '', description: '', priority: 'Medium', assigned_id: '', due_date: '' });
  }

  const TaskCard = ({ task }: { task: resTask }) => (
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

        

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
            </Avatar> */}
            <Badge 
              variant="outline" 
              className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}
            >
              {task.priority}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {/* {task.attachments > 0 && (
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
            )} */}
          </div>
        </div>

        <div className="mt-2 text-xs text-muted-foreground">
          Due: {new Date(task.due_date).toLocaleDateString()}
        </div>
        {task.status === "InProgress" && (
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => handleSendToReview(task.task_id)}
          >
            Send to Review
          </Button>
        )}        

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
              <TaskCard key={task.task_id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-3">
      {Object.values(tasks).flat().map((task) => (
        <Card key={task.task_id}>
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
                
              </div>
              
              <div className="flex items-center gap-4">
                {/* <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-xs">{task.assignee.avatar}</AvatarFallback>
                </Avatar> */}
                <span className="text-xs text-muted-foreground">
                  {new Date(task.due_date).toLocaleDateString()}
                </span>
                
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
          <p className="text-muted-foreground">Manage your team&apos;s work and projects</p>
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
                  <Select value={newTask.priority} onValueChange={(value: 'Low' | 'Medium' | 'High') => setNewTask({ ...newTask, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignee">Assign to</Label>
                <Select value={newTask.assigned_id} onValueChange={(value) => setNewTask({ ...newTask, assigned_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member..." />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.fullname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {setIsCreateModalOpen(false); handleSubmit();}}>
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

        <Tabs value={view} onValueChange={(value) => setView(value as 'kanban' | 'list')} className="w-auto">
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


