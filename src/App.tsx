import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
  type NavigationType,
} from "react-router-dom";
import Index from "./pages/Index";
import MouseQuiz from "./pages/MouseQuiz";
import AudioQuiz from "./pages/AudioQuiz";
import NotFound from "./pages/NotFound";

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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteChangeListener onRouteChange={handleRouteChange} />
          <Routes>
            <Route
              path="/"
              element={<Index skipAnimations={skipLandingAnimations} />}
            />
            <Route path="/quiz/mouse" element={<MouseQuiz />} />
            <Route path="/quiz/audio" element={<AudioQuiz />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
