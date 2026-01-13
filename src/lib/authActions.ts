import { useAuthStore } from "@/stores";

export const logoutAndRedirect = () => {
  useAuthStore.getState().logout();
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};
