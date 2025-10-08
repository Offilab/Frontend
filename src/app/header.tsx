"use client"
import React, { useState, useEffect, Children } from 'react';
import { 
  Home, 
  CheckSquare, 
  MessageSquare, 
  Video, 
  FileText, 
  Calendar, 
  Clock, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  User,
  Sun,
  Moon,
  Menu,
  X,
  Router
} from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { Badge } from './components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from "react-redux";
 // adjust path
 import { RootState } from './configureStore';
import { logout } from "./store/authSlice";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';

import { ChildProcess } from 'child_process';

const navigation = [
  {href: "/dashboard", name: 'Dashboard', icon: Home, id: 'dashboard' },
  {href: "/taskmanagement", name: 'Tasks & Projects', icon: CheckSquare, id: 'tasks' },
  {href: "/chat", name: 'Chat', icon: MessageSquare, id: 'chat', badge: 3 },
  {href: "/videoconferencing", name: 'Video Calls', icon: Video, id: 'video' },
  {href: "/notepad", name: 'Notepad', icon: FileText, id: 'notepad' },
  {href: "/leavetracker", name: 'Leave Tracker', icon: Calendar, id: 'leave' },
  {href: "/attendancehr", name: 'Attendance', icon: Clock, id: 'attendance' },
  {href: "/analytics", name: 'Analytics', icon: BarChart3, id: 'analytics' },
  {href: "/adminsetting", name: 'Admin', icon: Settings, id: 'admin' },
];
export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isAuth } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string; name: string } | null>(null);

  const handleLogin = (userData: { email: string; role: string; name: string }) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    
      dispatch(logout());
      router.push("/");
    
  };
  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const router =useRouter()
  const handleRoute=(link:string)=>{
    router.push(link)
  
  
  
  }

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };




  // Desktop Sidebar Component
  const DesktopSidebar = () => (
    <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 shadow-xl hidden md:flex`}>
      {/* Logo/Brand */}
      <div className="p-4 border-b border-sidebar-border bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
            <Home className="w-5 h-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <span className="text-white text-lg font-semibold">OfficeHub</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {{handleNavClick(item.id); handleRoute(item.href)}; handleRoute(item.href)}}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:scale-[1.01] hover:shadow-md'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-sidebar-foreground group-hover:text-blue-400'}`} />
              {!sidebarCollapsed && (
                <>
                  <span className="flex-1 text-left text-sm font-medium">{item.name}</span>
                  {item.badge && (
                    <Badge variant={isActive ? "secondary" : "outline"} className={`text-xs ${isActive ? 'bg-white/20 text-white border-white/20' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Sidebar toggle */}
      <div className="p-4 border-t border-sidebar-border/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-white transition-all duration-200"
        >
          <Menu className="w-4 h-4" />
          {!sidebarCollapsed && <span className="ml-2 text-sm">Collapse</span>}
        </Button>
      </div>
    </div>
  );

  // Mobile Sidebar Component
  const MobileSidebar = () => (
    <div className="bg-sidebar border-r border-sidebar-border flex flex-col h-full shadow-xl">
      {/* Logo/Brand */}
      <div className="p-4 border-b border-sidebar-border bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-lg font-semibold">OfficeHub</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {handleNavClick(item.id); handleRoute(item.href)}}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-md'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-white' : 'text-sidebar-foreground group-hover:text-blue-400'}`} />
              <span className="flex-1 text-left text-sm font-medium">{item.name}</span>
              {item.badge && (
                <Badge variant={isActive ? "secondary" : "outline"} className={`text-xs ${isActive ? 'bg-white/20 text-white border-white/20' : 'bg-blue-100 text-blue-700 border-blue-200'}`}>
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="h-screen bg-background text-foreground flex">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 md:h-16 bg-card border-b border-border px-3 md:px-6 flex items-center justify-between shadow-sm backdrop-blur-sm">
          {/* Left side - Mobile menu + Search */}
          <div className="flex items-center gap-3 flex-1">
            {/* Mobile menu trigger */}
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2 md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <MobileSidebar />
                </SheetContent>
              </Sheet>
            )}

            {/* Search */}
            <div className="flex-1 max-w-sm md:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={isMobile ? "Search..." : "Search tasks, chats, employees..."}
                  className="pl-10 bg-input-background border border-border/50 rounded-xl shadow-sm focus:shadow-md focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
              )}
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="p-2 relative rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-red-600 border-0 shadow-lg">
                5
              </Badge>
            </Button>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 rounded-lg hover:ring-2 hover:ring-blue-500/20 transition-all duration-200">
                  <Avatar className="w-7 h-7 md:w-8 md:h-8 ring-2 ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-200">
                    <AvatarImage src="/api/placeholder/32/32" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 shadow-xl border border-border/50">
                <DropdownMenuLabel className="text-sm font-semibold">John Doe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50 transition-colors">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-3 md:p-6 bg-gradient-to-br from-background via-background to-blue-50/30">
          <div className="animate-in slide-in-from-right-5 duration-300 max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}