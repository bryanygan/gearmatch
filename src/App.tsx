import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
  type NavigationType,
} from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Lazy load quiz and results pages for code splitting
const MouseQuiz = lazy(() => import("./pages/MouseQuiz"));
const AudioQuiz = lazy(() => import("./pages/AudioQuiz"));
const MouseResults = lazy(() => import("./pages/MouseResults"));
const AudioResults = lazy(() => import("./pages/AudioResults"));

// Loading fallback for lazy-loaded pages
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

type RouteChangeListenerProps = {
  onRouteChange: (
    previousPath: string | null,
    currentPath: string,
    navigationType: NavigationType
  ) => void;
};

const RouteChangeListener = ({ onRouteChange }: RouteChangeListenerProps) => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    onRouteChange(previousPathRef.current, location.pathname, navigationType);
    previousPathRef.current = location.pathname;
  }, [location.pathname, navigationType, onRouteChange]);

  return null;
};

const App = () => {
  const [skipLandingAnimations, setSkipLandingAnimations] = useState(false);

  const handleRouteChange = useCallback(
    (previousPath: string | null, currentPath: string) => {
      const cameFromQuiz =
        typeof previousPath === "string" && previousPath.startsWith("/quiz/");
      const isLanding = currentPath === "/";
      setSkipLandingAnimations(isLanding && cameFromQuiz);
    },
    []
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteChangeListener onRouteChange={handleRouteChange} />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route
                  path="/"
                  element={<Index skipAnimations={skipLandingAnimations} />}
                />
                <Route path="/quiz/mouse" element={<MouseQuiz />} />
                <Route path="/quiz/mouse/results" element={<MouseResults />} />
                <Route path="/quiz/audio" element={<AudioQuiz />} />
                <Route path="/quiz/audio/results" element={<AudioResults />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
