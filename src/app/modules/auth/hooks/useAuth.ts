import { queryClient } from "@/app/api/config";
import { AUTH_QUERY_KEYS } from "@/app/api/query-keys/auth.keys";
import { AuthService } from "@/app/api/services";
import { useAuthStore } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { ILogin, ILoginResponse } from "../schemas/login.schema";
import type { IRegister, IRegisterResponse } from "../schemas/register.schema";

export const useLogin = () => {
  return useMutation<AxiosResponse<ILoginResponse>, Error, ILogin>({
    mutationFn: AuthService.loginUser,
    onSuccess: (response) => {
      useAuthStore
        .getState()
        .login(response.data.currentUser, response.data.accessToken);
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.user() });
    },
  });
};

export const useRegister = () => {
  return useMutation<AxiosResponse<IRegisterResponse>, Error, IRegister>({
    mutationFn: AuthService.registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.user() });
    },
  });
};

export const useLogout = () => {
  return useMutation<AxiosResponse<void>, Error>({
    mutationFn: AuthService.logoutUser,
    onSuccess: () => {
      useAuthStore.getState().logout();
      queryClient.clear();
    },
  });
};
