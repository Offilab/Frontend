"use client";
import React, { useState } from "react";
import { getUserByEmail } from "./apiRequests";
import { createUser } from "./apiRequests";
 import { RootState } from './configureStore';

import { useSelector } from "react-redux";
import {
  Home,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sun,
  Moon,
  UserPlus,
  Users,
  Settings,
  Crown,
  Briefcase,
  Shield,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { ErrorModal } from "./components/ErrorModal";
import { useRouter } from "next/navigation";
import { loginSuccess } from "./store/authSlice";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Checkbox } from "./components/ui/checkbox";
import { Separator } from "./components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { UserAuth } from "./context/authContext";

interface LoginPageProps {
  onLogin: (userData: { email: string; role: string; name: string }) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}
interface LoginFormData {
  email: string;
  password: string;
}
interface UserRegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    agreeToTerms: false,
  });
  const { signInUser } = UserAuth();
  const { signUpNewUser } = UserAuth();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [darkMode, toggleDarkMode] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginSuccessState, setloginSuccessState] = useState(false);
  const dispatch = useDispatch();
  const handleErrorAction = () => {
    setIsErrorOpen(false);
  };
  // ...existing code...
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const { session, error } = await signInUser(
    loginData.email,
    loginData.password
  );

  if (error) {
    setError(error);
    setIsErrorOpen(true);
    setErrorTitle("Login Failed");
    setErrorDescription("Please check your email and password and try again.");
    setTimeout(() => {
      setError("");
      setIsErrorOpen(false);
    }, 3000);
  } else {
      setIsLoading(true);

      const dataArray = await getUserByEmail(loginData.email);
      
      console.log('fs',dataArray);

    // Dispatch loginSuccess to update Redux state
    const oldUser = {
      id: dataArray.id, // Adjust based on your actual user ID source
      fullname: dataArray.fullname,
      email: loginData.email,
      role: dataArray.role || "", // adjust if you store role elsewhere
    };
    dispatch(loginSuccess({user: oldUser }));
    setIsLoading(false)
    router.push("/dashboard");
  }

  if (session) {
    setError("");
  } else {
    setloginSuccessState(true);
  }

  setTimeout(() => setloginSuccessState(false), 3000);

  setIsLoading(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);
};
// ...existing code...

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (!signupData.role) {
      alert("Please select a role");
      setIsLoading(false);
      return;
    }
    const { session, err } = await signUpNewUser(
      signupData.email,
      signupData.password,
      signupData.firstName + signupData.lastName,
      signupData.role
    ); // Use your signIn function
    if (err) {
      setError(err); // Set the error message if sign-in fails
      setIsErrorOpen(true);
      setErrorTitle("Signup Failed");
      setErrorDescription("This account already exists. Try logging in.");

      // Set a timeout to clear the error message after a specific duration (e.g., 3 seconds)
      setTimeout(() => {
        setError("");
        setIsErrorOpen(false);
      }, 3000); // 3000 milliseconds = 3 seconds
    } else {
      // Redirect or perform any necessary actions after successful sign-in
      const newUser = {
        fullName: signupData.firstName + signupData.lastName,
        email: signupData.email,
        role: signupData.role,
      };
      try {
    const result = await createUser(newUser);
    

    
    if (result.success) {
      console.log("✅ User created:", result);
      const dataTransfer = dispatch(loginSuccess({ user: result.data }));
      console.log(dataTransfer);
  
        router.push("/dashboard");
    } else {
      console.log("⚠️ Failed:", result.message);
    }
  } catch (err) {
    console.error("❌ API Error:", err);
  }
    }
    if (session) {
      setError(""); // Reset the error when there's a session
    }

    setRegisterSuccess(true);
    setTimeout(() => setRegisterSuccess(false), 3000);

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const handleLoginInputChange = (field: string, value: any) => {
    console.log("value is ", value);
    setLoginData((prev) => ({ ...prev, [field]: value }));

    console.log(loginData);
  };

  const handleSignupInputChange = (field: string, value: any) => {
    setSignupData((prev) => ({ ...prev, [field]: value }));
    console.log(signupData);
  };

  const roles = [
    { id: "Employee", name: "Employee", icon: Users },
    { id: "TechLead", name: "Tech Lead", icon: Settings },
    { id: "Manager", name: "Manager", icon: Crown },
    { id: "HR_Manager", name: "HR Manager", icon: Briefcase },
  ];

  return (
    <>
      <ErrorModal
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        title={errorTitle}
        description={errorDescription}
        onAction={handleErrorAction}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 text-foreground flex items-center justify-center p-4">
        {/* Dark mode toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="fixed top-6 right-6 z-50 p-2.5 rounded-xl hover:bg-slate-100 transition-all duration-200 group"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-slate-600 group-hover:text-orange-500 transition-colors" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600 group-hover:text-blue-600 transition-colors" />
          )}
        </Button>

        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/20">
                <Home className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
                OfficeHub
              </h1>
            </div>
            <p className="text-slate-500">Modern Office Management Platform</p>
          </div>

          <Card className="border border-slate-200/50 shadow-2xl shadow-blue-500/5 bg-white/80 backdrop-blur-xl">
            <CardHeader className="space-y-2 text-center pb-6">
              <CardTitle className="text-2xl font-bold text-slate-900">
                {activeTab === "login" ? "Welcome back!" : "Join your team"}
              </CardTitle>
              <p className="text-sm text-slate-500">
                {activeTab === "login"
                  ? "Sign in to access your OfficeHub dashboard"
                  : "Create your account to get started"}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-slate-50/80 p-1 rounded-xl">
                  <TabsTrigger
                    value="login"
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* Login Form */}
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="login-email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="john.doe@company.com"
                          value={loginData.email}
                          onChange={(e) =>
                            handleLoginInputChange("email", e.target.value)
                          }
                          className="pl-10 h-12 bg-input-background border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="login-password"
                        className="text-sm font-medium text-foreground"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) =>
                            handleLoginInputChange("password", e.target.value)
                          }
                          className="pl-10 pr-12 h-12 bg-input-background border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent rounded-lg"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Eye className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={loginData.rememberMe}
                          onCheckedChange={(checked) =>
                            handleLoginInputChange("rememberMe", checked)
                          }
                          className="rounded-md border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <Label
                          htmlFor="remember"
                          className="text-sm text-muted-foreground cursor-pointer"
                        >
                          Remember me
                        </Label>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                      >
                        Forgot password?
                      </Button>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-200 font-medium"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Signing in...
                        </div>
                      ) : (
                        "Sign in to OfficeHub"
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Signup Form */}
                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-sm font-medium text-foreground"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={signupData.firstName}
                          onChange={(e) =>
                            handleSignupInputChange("firstName", e.target.value)
                          }
                          className="h-12 bg-input-background border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-sm font-medium text-foreground"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={signupData.lastName}
                          onChange={(e) =>
                            handleSignupInputChange("lastName", e.target.value)
                          }
                          className="h-12 bg-input-background border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="signup-email"
                        className="text-sm font-medium text-foreground"
                      >
                        Email address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="john.doe@company.com"
                          value={signupData.email}
                          onChange={(e) =>
                            handleSignupInputChange("email", e.target.value)
                          }
                          className="pl-10 h-12 bg-input-background border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="role"
                        className="text-sm font-medium text-foreground"
                      >
                        Select Your Role
                      </Label>
                      <Select
                        value={signupData.role}
                        onValueChange={(value) =>
                          handleSignupInputChange("role", value)
                        }
                      >
                        <SelectTrigger className="h-12 bg-input-background border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200">
                          <SelectValue placeholder="Choose your role..." />
                        </SelectTrigger>
                        <SelectContent className="border-border/50 shadow-xl bg-card">
                          {roles.map((role) => {
                            const Icon = role.icon;
                            return (
                              <SelectItem
                                key={role.id}
                                value={role.id}
                                className="p-4"
                              >
                                <div className="flex items-center gap-3 w-full">
                                  <Icon className="w-4 h-4 text-muted-foreground" />
                                  <span>{role.name}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="signup-password"
                          className="text-sm font-medium text-foreground"
                        >
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={signupData.password}
                            onChange={(e) =>
                              handleSignupInputChange(
                                "password",
                                e.target.value
                              )
                            }
                            className="pl-10 pr-12 h-12 bg-input-background border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent rounded-lg"
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
                        <Label
                          htmlFor="confirm-password"
                          className="text-sm font-medium text-foreground"
                        >
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={signupData.confirmPassword}
                            onChange={(e) =>
                              handleSignupInputChange(
                                "confirmPassword",
                                e.target.value
                              )
                            }
                            className="pl-10 pr-12 h-12 bg-input-background border-border/60 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-transparent rounded-lg"
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
                    <div className="flex items-start space-x-3 pt-2">
                      <Checkbox
                        id="terms"
                        checked={signupData.agreeToTerms}
                        onCheckedChange={(checked) =>
                          handleSignupInputChange("agreeToTerms", checked)
                        }
                        className="rounded-md border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                        required
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                      >
                        I agree to the{" "}
                        <Button
                          variant="link"
                          className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                        >
                          Terms of Service
                        </Button>{" "}
                        and{" "}
                        <Button
                          variant="link"
                          className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                        >
                          Privacy Policy
                        </Button>
                      </Label>
                    </div>

                    {/* Sign Up Button */}
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-success to-success/90 hover:from-success/90 hover:to-success text-success-foreground rounded-xl shadow-lg shadow-success/25 hover:shadow-success/40 transition-all duration-200 font-medium"
                      disabled={isLoading || !signupData.agreeToTerms}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-success-foreground/30 border-t-success-foreground rounded-full animate-spin" />
                          Creating account...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <UserPlus className="w-4 h-4" />
                          Create your account
                        </div>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {/* Divider */}
              <div className="relative">
                <Separator className="my-6" />
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-xs text-muted-foreground font-medium">
                  or continue with
                </span>
              </div>

              {/* SSO Options */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 border-border/60 hover:bg-accent/50 transition-all duration-200 rounded-xl"
                  type="button"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-border/60 hover:bg-accent/50 transition-all duration-200 rounded-xl"
                  type="button"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.118.112.222.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                  Microsoft
                </Button>
              </div>

              {/* Footer */}
              <div className="text-center pt-4 space-y-4">
                <p className="text-sm text-muted-foreground">
                  {activeTab === "login" ? (
                    <>
                      Need help? Contact your{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                      >
                        administrator
                      </Button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                        onClick={() => setActiveTab("login")}
                      >
                        Sign in here
                      </Button>
                    </>
                  )}
                </p>

                {/* Security Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full">
                  <Shield className="w-4 h-4 text-success" />
                  <span className="text-xs font-medium text-success">
                    Enterprise-grade security
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

