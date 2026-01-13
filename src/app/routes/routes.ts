import {
  HomePage,
  FeaturePage,
  DashboardPage,
  ContainerDemoPage,
  DesignEditorPage,
  FabricTestPage,
} from "../pages";

export interface IRoute {
  path?: string;
  Component: React.LazyExoticComponent<React.FC> | React.FC;
  children?: IRoute[];
  index?: boolean;
  requiresAuth?: boolean;
}

const AppRoutes: IRoute[] = [
  {
    path: "/",
    index: true,
    Component: HomePage,
    requiresAuth: true,
  },

  {
    path: "/feature",
    Component: FeaturePage,
    requiresAuth: true,
  },
  {
    path: "/dashboard",
    Component: DashboardPage,
    requiresAuth: true,
  },
  {
    path: "/container-demo",
    Component: ContainerDemoPage,
    requiresAuth: true,
  },
  {
    path: "/design-editor",
    Component: DesignEditorPage,
    requiresAuth: true,
  },
  {
    path: "/fabric-test",
    Component: FabricTestPage,
    requiresAuth: false,
  },
];

export default AppRoutes;
