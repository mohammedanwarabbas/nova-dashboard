import { createContext, useState, useEffect, type ReactNode } from 'react';
import { USER_STORAGE_KEY } from '../utils/constants';
import { verifyUser } from '../utils/auth';

// Define the structure of a Google OAuth user response
interface GoogleUser {
  email: string;
  name?: string;
  picture?: string;
}

// Our app's user type - simplified from Google's response
interface User {
  email: string;
  name?: string;
  picture?: string;
}

// Defines what's available through the AuthContext
interface AuthContextType {
  user: User | null;           // Current logged-in user or null if not logged in
  isLoading: boolean;          // True while checking auth state from localStorage
  login: (googleUser: GoogleUser) => Promise<LoginResult>; // Login function
  logout: () => void;          // Logout function
  isAuthenticated: boolean;    // Convenience check for whether user is logged in
}

// The result type for login attempts
interface LoginResult {
  success: boolean;     // Whether login succeeded
  message?: string;     // Optional error message if login failed
}

// Create the context with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Main authentication provider component
// Wraps the app and provides auth state and functions to all children
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On component mount, check if user data exists in localStorage
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          // Parse and set the user from localStorage
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
        // Clear corrupted data from localStorage
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        // Always stop loading indicator, even if there was an error
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Handle login with Google OAuth user data
  const login = async (googleUser: GoogleUser): Promise<LoginResult> => {
    try {
      // Check if this user is authorized to use the app
      const isAuthorized = verifyUser(googleUser);
      
      if (!isAuthorized) {
        return {
          success: false,
          message: 'Your email is not authorized to access this dashboard.'
        };
      }
      
      // Create a simplified user object to store (avoid storing extra Google data)
      const userToStore: User = {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture
      };
      
      // Update state and localStorage
      setUser(userToStore);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userToStore));
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login.'
      };
    }
  };

  // Handle logout - clear user data from state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  // The value provided to all context consumers
  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user, // Converts null to false, user object to true
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;