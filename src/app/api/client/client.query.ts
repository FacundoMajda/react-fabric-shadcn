import { logger } from "@/utils/api.logger";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      retry: false,
      onError: (error, variables, context) => {
        logger.error("Query Mutation Error", error, { variables, context });
      },
    },
  },
});
