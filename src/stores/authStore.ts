import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address } from '../types';
import * as mockApi from '../services/mockApi';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  sendOtp: (phone: string) => Promise<void>;
  logout: () => void;
  setLocation: (address: Address) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await mockApi.login(email, password);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Login failed';
          set({ error: message, isLoading: false });
        }
      },

      signup: async (username: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await mockApi.signup(username, email, password);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Signup failed';
          set({ error: message, isLoading: false });
        }
      },

      verifyOtp: async (otp: string) => {
        set({ isLoading: true, error: null });
        const isValid = /^\d{4}$/.test(otp);
        if (isValid) {
          set({ isLoading: false });
          return true;
        }
        set({ error: 'Invalid OTP', isLoading: false });
        return false;
      },

      sendOtp: async (_phone: string) => {
        set({ isLoading: true, error: null });
        await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));
        set({ isLoading: false });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      setLocation: (address: Address) => {
        set((state) => {
          if (!state.user) return state;
          return { user: { ...state.user, address } };
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
