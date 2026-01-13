import { BreadcrumbsProvider } from "@/hooks/use-breadcrumbs";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, useLocation } from "react-router-dom";
import { queryClient } from "./api/config";
import Layout from "./layout";
import { AppRouter } from "./routes/AppRouter";

interface IAppProps {
  children: React.ReactNode;
}

function AppContent({ children }: IAppProps) {
  const location = useLocation();
  const isAuthRoute =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  return isAuthRoute ? (
    children
  ) : (
    <Layout>
      <AppRouter />
    </Layout>
  );
}

function Providers({ children }: IAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BreadcrumbsProvider>
          <BrowserRouter>
            <AppContent>{children}</AppContent>
          </BrowserRouter>
        </BreadcrumbsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
