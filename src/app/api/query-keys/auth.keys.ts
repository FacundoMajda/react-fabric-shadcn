export const AUTH_QUERY_KEYS = {
  all: ["auth"] as const,
  user: () => [...AUTH_QUERY_KEYS.all, "user"] as const,
  profile: () => [...AUTH_QUERY_KEYS.all, "profile"] as const,
  session: () => [...AUTH_QUERY_KEYS.all, "session"] as const,
  login: () => [...AUTH_QUERY_KEYS.all, "login"] as const,
  register: () => [...AUTH_QUERY_KEYS.all, "register"] as const,
  logout: () => [...AUTH_QUERY_KEYS.all, "logout"] as const,
  refresh: () => [...AUTH_QUERY_KEYS.all, "refresh"] as const,
} as const;
