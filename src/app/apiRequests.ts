interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
}
// types.ts
export interface AssignedUser {
  id: string;
  fullname: string;
  email: string;
  role: string;
}

export interface Task {
   title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  due_date: string;
  status: 'InProgress' | 'Review' | 'Done';
  assigned_id: string;
  creator_id: string| null;
  task_id: string;
  created_at: string;
  updated_at: string;
  assigned_user: AssignedUser;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalTask: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface TaskResponse {
  msg: string;
  data: {
    events: Task[];
    pagination: Pagination;
  };
  status: number;
  success: boolean;
}

interface UserApiResponse {
  data: {
    events: User[];
  };
}

export interface UsersApiResponse {
  data: User[];
}
export interface Tasks {
  title: string;
  description: string;
  status: "InProgress" | "Review" | "Done";
  priority: "Low" | "Medium" | "High";
  due_date: string;
  creator_id: string| null;
  assigned_id: string;
}
// types/UserOnboarding.ts
export interface UserOnboarding {
  fullName: string;
  email: string;
  role: string;
}
export interface UserOnboard {
  id: string; // id may be optional during onboarding
  fullname: string;
  email: string;
  role: string;
}

// This is the expected response from /create
export interface CreateUserResponse {
  message: string;
  success: boolean;
  user: UserOnboard; // user may include an auto-generated id
}


export async function createTask(
  taskData: Tasks,
): Promise<Tasks> {
  const newTask: Tasks = {
    ...taskData,
  };

  const response = await fetch("http://localhost:3001/api/v1/tasks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export async function getUserByEmail(email: string): Promise<User> {
  try {
    const url = new URL("http://localhost:3001/api/v1/users");
    url.searchParams.append("email", email);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    
const dbres: UserApiResponse = await response.json();
const user: User = dbres.data.events[0];
    
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}
export async function createUser(user: UserOnboarding): Promise<CreateUserResponse> {
  try {
    const response = await fetch("http://localhost:3001/api/v1/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.status} ${response.statusText}`);
    }

    const data=await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
export async function getAllUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:3001/api/v1/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result: UserApiResponse = await response.json();
  return result.data.events;
}


export async function fetchTasks(): Promise<TaskResponse> {
  try {
    const response = await fetch("http://localhost:3001/api/v1/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: TaskResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
}

// apiRequests.ts
// apiRequests.ts
export const updateTaskStatus = async (task_id: string, status: "Review" | "InProgress" | "Done") => {
  
  try {
    const response = await fetch(`http://localhost:3001/api/v1/tasks/${task_id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }), // backend expects lowercase
    });
    console.log("Response status:", status);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || "Failed to update task status");
    }

    return data; // returns APIResponse structure
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};
