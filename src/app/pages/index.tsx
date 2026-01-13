import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const FeaturePage = lazy(() => import("./FeaturePage"));
const DashboardPage = lazy(() => import("./DashboardPage"));
const AuthPage = lazy(() => import("./AuthPage"));
const ContainerDemoPage = lazy(() => import("./ContainerDemoPage"));
const DesignEditorPage = lazy(() => import("./DesignEditor"));
const FabricTestPage = lazy(() => import("./FabricTestPage"));

export {
  HomePage,
  FeaturePage,
  DashboardPage,
  ContainerDemoPage,
  AuthPage,
  DesignEditorPage,
  FabricTestPage,
};
