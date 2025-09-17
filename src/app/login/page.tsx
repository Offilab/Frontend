"use client"
import React, { useState } from 'react';
import {
  Home,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sun,
  Moon,
  ArrowRight,
  Shield,
  Users,
  BarChart3,
  UserPlus,
  Building,
  Crown,
  Settings as SettingsIcon,
  Briefcase
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

interface LoginPageProps {
  onLogin: (userData: { email: string; role: string; name: string }) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function LoginPage({ onLogin, darkMode, toggleDarkMode }: LoginPageProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
   
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, use default data for login
      onLogin({
        email: loginData.email,
        role: 'manager', // Default role for login
        name: 'John Doe'
      });
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
   
    // Basic validation
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }
   
    if (!signupData.role) {
      alert('Please select a role');
      setIsLoading(false);
      return;
    }
   
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      onLogin({
        email: signupData.email,
        role: signupData.role,
        name: `${signupData.firstName} ${signupData.lastName}`
      });
    }, 1500);
  };

  const handleLoginInputChange = (field: string, value: any) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignupInputChange = (field: string, value: any) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
  };

  const roles = [
    {
      id: 'employee',
      name: 'Employee',
      icon: Users,
      description: 'Standard access for team members',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'techlead',
      name: 'Tech Lead',
      icon: SettingsIcon,
      description: 'Technical leadership and project oversight',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'manager',
      name: 'Manager',
      icon: Crown,
      description: 'Team management and strategic planning',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'hr',
      name: 'HR Manager',
      icon: Briefcase,
      description: 'Human resources and administrative access',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const features = [
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Connect and work seamlessly with your team"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your data"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track progress with powerful analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30 dark:to-slate-900/30 flex items-start lg:items-center justify-center p-4 py-8">
      {/* Dark mode toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400 transition-colors duration-200 z-10"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:items-start items-center">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block space-y-8 lg:sticky lg:top-8">
          {/* Logo & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  OfficeHub
                </h1>
                <p className="text-muted-foreground">Modern Office Management Platform</p>
              </div>
            </div>
          </div>

          {/* Hero Content */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-foreground leading-tight">
                Welcome to the future of
                <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent"> workplace collaboration</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Streamline your team's productivity with our comprehensive suite of tools designed for modern workplaces.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                OfficeHub
              </span>
            </div>
            <p className="text-muted-foreground">Welcome to your workspace</p>
          </div>

          <Card className="shadow-2xl border-border/50 backdrop-blur-sm bg-card/95">
            <CardHeader className="space-y-2 text-center pb-6">
              <CardTitle className="text-2xl font-bold text-foreground">
                {activeTab === 'login' ? 'Sign in to your account' : 'Create your account'}
              </CardTitle>
              <p className="text-muted-foreground">
                {activeTab === 'login'
                  ? 'Enter your credentials to access OfficeHub'
                  : 'Join your team on OfficeHub'
                }
              </p>
            </CardHeader>
           
            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-sm font-medium">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="john.doe@company.com"
                          value={loginData.email}
                          onChange={(e) => handleLoginInputChange('email', e.target.value)}
                          className="pl-10 h-11 bg-input-background border border-border/50 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => handleLoginInputChange('password', e.target.value)}
                          className="pl-10 pr-10 h-11 bg-input-background border border-border/50 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={loginData.rememberMe}
                          onCheckedChange={(checked) => handleLoginInputChange('rememberMe', checked)}
                          className="rounded-md"
                        />
                        <Label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                          Remember me
                        </Label>
                      </div>
                      <Button variant="link" className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700">
                        Forgot password?
                      </Button>
                    </div>

                    {/* Sign In Button */}
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing in...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Sign in
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Signup Form */}
                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignup} className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={signupData.firstName}
                          onChange={(e) => handleSignupInputChange('firstName', e.target.value)}
                          className="h-11 bg-input-background border border-border/50 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={signupData.lastName}
                          onChange={(e) => handleSignupInputChange('lastName', e.target.value)}
                          className="h-11 bg-input-background border border-border/50 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">Email address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="john.doe@company.com"
                          value={signupData.email}
                          onChange={(e) => handleSignupInputChange('email', e.target.value)}
                          className="pl-10 h-11 bg-input-background border border-border/50 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-sm font-medium">Select Your Role</Label>
                      <Select value={signupData.role} onValueChange={(value) => handleSignupInputChange('role', value)}>
                        <SelectTrigger className="h-11 bg-input-background border border-border/50 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                          <SelectValue placeholder="Choose your role..." />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => {
                            const Icon = role.icon;
                            return (
                              <SelectItem key={role.id} value={role.id} className="flex items-start p-3">
                                <div className="flex items-start gap-3 w-full">
                                  <div className={`w-8 h-8 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center flex-shrink-0 mt-1`}>
                                    <Icon className="w-4 h-4 text-white" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium">{role.name}</div>
                                    <div className="text-xs text-muted-foreground">{role.description}</div>
                                  </div>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Password Fields */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={signupData.password}
                            onChange={(e) => handleSignupInputChange('password', e.target.value)}
                            className="pl-10 pr-10 h-11 bg-input-background border border-border/50 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={signupData.confirmPassword}
                            onChange={(e) => handleSignupInputChange('confirmPassword', e.target.value)}
                            className="pl-10 pr-10 h-11 bg-input-background border border-border/50 rounded-xl focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4 text-muted-foreground" />
                            ) : (
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-start space-x-2 pt-2">
                      <Checkbox
                        id="terms"
                        checked={signupData.agreeToTerms}
                        onCheckedChange={(checked) => handleSignupInputChange('agreeToTerms', checked)}
                        className="rounded-md mt-1"
                        required
                      />
                      <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                        I agree to the{' '}
                        <Button variant="link" className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700">
                          Terms of Service
                        </Button>{' '}
                        and{' '}
                        <Button variant="link" className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700">
                          Privacy Policy
                        </Button>
                      </Label>
                    </div>

                    {/* Sign Up Button */}
                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-200 font-medium"
                      disabled={isLoading || !signupData.agreeToTerms}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Creating account...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <UserPlus className="w-4 h-4" />
                          Create Account
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Divider */}
              <div className="relative">
                <Separator className="my-6" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                  or continue with
                </span>
              </div>

              {/* SSO Options */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-11 border-border/50 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  type="button"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-11 border-border/50 hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                  type="button"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.118.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                  Microsoft
                </Button>
              </div>

              {/* Footer */}
              <div className="text-center pt-4">
                <p className="text-sm text-muted-foreground">
                  {activeTab === 'login' ? (
                    <>Need help? Contact your{' '}
                      <Button variant="link" className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700">
                        administrator
                      </Button>
                    </>
                  ) : (
                    <>Already have an account?{' '}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700"
                        onClick={() => setActiveTab('login')}
                      >
                        Sign in here
                      </Button>
                    </>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  {activeTab === 'login' ? 'Secure Login' : 'Role-Based Access'}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  {activeTab === 'login'
                    ? 'Your credentials are protected with enterprise-grade encryption and security protocols.'
                    : 'Different roles provide appropriate access levels and permissions for your organization.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}