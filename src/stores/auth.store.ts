import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { type IUser } from "../schemas/user.schema";

type AuthState = {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  login: (user: IUser, accessToken: string | undefined) => void;
  logout: () => void;
  updateUser: (user: Partial<IUser>) => void;
};

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user, accessToken) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
        }),

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
        localStorage.removeItem("auth-storage");
      },

      updateUser: (user) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...user } : null,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export { useAuthStore };
