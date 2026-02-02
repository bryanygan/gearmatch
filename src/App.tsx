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
const KeyboardQuiz = lazy(() => import("./pages/KeyboardQuiz"));
const MonitorQuiz = lazy(() => import("./pages/MonitorQuiz"));
const MouseResults = lazy(() => import("./pages/MouseResults"));
const AudioResults = lazy(() => import("./pages/AudioResults"));
const KeyboardResults = lazy(() => import("./pages/KeyboardResults"));
const MonitorResults = lazy(() => import("./pages/MonitorResults"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AffiliateDisclosurePage = lazy(() => import("./pages/AffiliateDisclosurePage"));

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
                <Route path="/quiz/keyboard" element={<KeyboardQuiz />} />
                <Route path="/quiz/keyboard/results" element={<KeyboardResults />} />
                <Route path="/quiz/monitor" element={<MonitorQuiz />} />
                <Route path="/quiz/monitor/results" element={<MonitorResults />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/affiliate-disclosure" element={<AffiliateDisclosurePage />} />
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
