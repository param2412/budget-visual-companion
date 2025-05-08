
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo
const MOCK_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    password: 'password123'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('expenseTracker_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('expenseTracker_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('expenseTracker_user');
    }
  }, [user]);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 800));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    setIsLoading(false);
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword as User);
      toast.success("Login successful");
      return true;
    } else {
      toast.error("Invalid email or password");
      return false;
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 800));
    
    const userExists = MOCK_USERS.some(u => u.email === email);
    
    if (userExists) {
      setIsLoading(false);
      toast.error("Account with this email already exists");
      return false;
    }
    
    // In a real app, we'd create a new user in the database
    // Here we just create a new user object
    const newUser = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email
    };
    
    MOCK_USERS.push({ ...newUser, password });
    setUser(newUser);
    setIsLoading(false);
    toast.success("Account created successfully");
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(r => setTimeout(r, 600));
    
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update in mock DB
      const userIndex = MOCK_USERS.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        MOCK_USERS[userIndex] = { 
          ...MOCK_USERS[userIndex], 
          ...userData 
        };
      }
      
      setIsLoading(false);
      toast.success("Profile updated");
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
