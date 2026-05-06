import Layout from "@/components/Layout";
import AIAssistantPage from "@/pages/AIAssistantPage";
import AboutPage from "@/pages/AboutPage";
import AgenciesPage from "@/pages/AgenciesPage";
import AstronautProfilePage from "@/pages/AstronautProfilePage";
import AstronautsPage from "@/pages/AstronautsPage";
import ContactPage from "@/pages/ContactPage";
import ExplorePage from "@/pages/ExplorePage";
import HomePage from "@/pages/HomePage";
import InteractiveLabPage from "@/pages/InteractiveLabPage";
import MissionsPage from "@/pages/MissionsPage";
import PlanetDetailPage from "@/pages/PlanetDetailPage";
import SimulationPage from "@/pages/SimulationPage";
import TimelinePage from "@/pages/TimelinePage";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const exploreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/explore",
  component: ExplorePage,
});
const planetDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/planet/$name",
  component: PlanetDetailPage,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});
const missionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/missions",
  component: MissionsPage,
});
const agenciesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agencies",
  component: AgenciesPage,
});
const astronautRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astronauts",
  component: AstronautsPage,
});
const astronautProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/astronauts/$slug",
  component: AstronautProfilePage,
});
const labRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lab",
  component: InteractiveLabPage,
});
const simulationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/simulation",
  component: SimulationPage,
});
const timelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timeline",
  component: TimelinePage,
});
const aiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ai-assistant",
  component: AIAssistantPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  exploreRoute,
  planetDetailRoute,
  aboutRoute,
  missionsRoute,
  agenciesRoute,
  astronautRoute,
  astronautProfileRoute,
  labRoute,
  simulationRoute,
  timelineRoute,
  aiRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
