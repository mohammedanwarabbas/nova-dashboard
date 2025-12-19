import { createContext, useState, useEffect, type ReactNode } from 'react';
import { USER_STORAGE_KEY } from '../utils/constants';
import { verifyUser } from '../utils/auth';

interface User {
  email: string;
  name?: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (googleUser: any) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
        localStorage.removeItem(USER_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (googleUser: any): Promise<{ success: boolean; message?: string }> => {
    try {
      const isAuthorized = verifyUser(googleUser);
      
      if (!isAuthorized) {
        return {
          success: false,
          message: 'Your email is not authorized to access this dashboard.'
        };
      }
      
      const userToStore: User = {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture
      };
      
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;