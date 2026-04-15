import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { adminLogin, adminLogout, type AdminLoginRequest, type AdminLoginResponse } from '@/lib/api';
import { toast } from 'sonner';

interface AdminUser {
  id: number;
  email: string;
  name?: string;
  role?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  login: (credentials: AdminLoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_USER_STORAGE_KEY = 'admin_user';
const ADMIN_TOKEN_STORAGE_KEY = 'admin_access_token';
const ADMIN_AUTH_TIMESTAMP_KEY = 'admin_auth_timestamp';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    //---Initialize from localStorage if available
    try {
      const stored = localStorage.getItem(ADMIN_USER_STORAGE_KEY);
      const timestamp = localStorage.getItem(ADMIN_AUTH_TIMESTAMP_KEY);
      const token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);

      if (stored && timestamp && token) {
        const authTime = parseInt(timestamp, 10);
        const now = Date.now();
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

        if (now - authTime < TWENTY_FOUR_HOURS) {
          return JSON.parse(stored);
        } else {
          //---- Session expired, clear storage
          localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
          localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
          localStorage.removeItem(ADMIN_AUTH_TIMESTAMP_KEY);
        }
      }
    } catch (e) {
      console.warn('[AdminAuth] Failed to load user from localStorage:', e);
    }
    return null;
  });

  const [accessToken, setAccessToken] = useState<string | null>(() => {
    //----Initialize token from localStorage if available
    try {
      const token = localStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
      const timestamp = localStorage.getItem(ADMIN_AUTH_TIMESTAMP_KEY);

      if (token && timestamp) {
        const authTime = parseInt(timestamp, 10);
        const now = Date.now();
        const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

        if (now - authTime < TWENTY_FOUR_HOURS) {
          return token;
        } else {
          //---- Session expired, clear storage
          localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
        }
      }
    } catch (e) {
      console.warn('[AdminAuth] Failed to load token from localStorage:', e);
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  //--- Save user and token to localStorage
  useEffect(() => {
    if (user && accessToken) {
      try {
        localStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(user));
        localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, accessToken);
        localStorage.setItem(ADMIN_AUTH_TIMESTAMP_KEY, Date.now().toString());
        //console.log('[AdminAuth] Token saved to localStorage:', accessToken.substring(0, 20) + '...');
      } catch (e) {
        console.warn('[AdminAuth] Failed to save user/token to localStorage:', e);
      }
    } else {
      localStorage.removeItem(ADMIN_USER_STORAGE_KEY);
      localStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
      localStorage.removeItem(ADMIN_AUTH_TIMESTAMP_KEY);
      //console.log('[AdminAuth] Token removed from localStorage');
    }
  }, [user, accessToken]);


  //---login state
  const login = useCallback(async (credentials: AdminLoginRequest) => {
    setIsLoading(true);
    try {
      const response: any = await adminLogin(credentials);

      //console.log('[AdminAuth] Login response:', response);
      //console.log('[AdminAuth] Response structure:', JSON.stringify(response, null, 2));

      const isSuccess = response.success === true || response.status === 'success';

      let token = response.data?.accessToken || response.data?.token || response.accessToken || response.token;

      //console.log('[AdminAuth] Token found:', token ? 'YES' : 'NO');
      //console.log('[AdminAuth] Token value:', token ? token.substring(0, 20) + '...' : 'null');

      if (isSuccess && token) {
        //--- Create user object from credentials
        const userData: AdminUser = {
          id: response.data?.user?.id || 0,
          email: response.data?.user?.email || credentials.email,
          name: response.data?.user?.name || 'Admin User',
          role: response.data?.user?.role || 'ADMIN'
        };

        try {
          localStorage.setItem(ADMIN_USER_STORAGE_KEY, JSON.stringify(userData));
          localStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
          localStorage.setItem(ADMIN_AUTH_TIMESTAMP_KEY, Date.now().toString());
          //console.log('[AdminAuth] Token saved to localStorage IMMEDIATELY:', token.substring(0, 20) + '...');
        } catch (e) {
          console.error('[AdminAuth] Failed to save to localStorage:', e);
          throw new Error('Failed to save authentication data');
        }

        setAccessToken(token);
        setUser(userData);

        toast.success(response.message || 'Login successful');
      } else {
        console.error('[AdminAuth] Login failed - token not found in response');
        throw new Error(response.message || 'Login failed - no access token received');
      }
    } catch (error: any) {
      console.error('[AdminAuth] Login error:', error);
      const message = error?.responseText || error?.message || 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  //-----logout state
  const logout = useCallback(async () => {
    // Do not execute logout when called from inside an iframe (e.g. PDF generation).
    if (window.self !== window.top) {
      console.warn('[AdminAuth] logout() called inside an iframe — ignoring to protect parent session');
      return;
    }
    setIsLoading(true);
    try {
      await adminLogout();
      setUser(null);
      setAccessToken(null);
      toast.success('Logged out successfully');
    } catch (error: any) {
      console.error('[AdminAuth] Logout error:', error);
      setUser(null);
      setAccessToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        accessToken,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
