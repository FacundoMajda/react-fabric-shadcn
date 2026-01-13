import { useNavigate, type NavigateOptions } from "react-router-dom";

export const useNavigateTo = () => {
  const navigate = useNavigate();
  return (to: string | { pathname: string; search?: string; }, options?: NavigateOptions) => {
    navigate(to, options);
  };
};
