import "./instrument"; // Sentry must initialize before any other imports
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App.tsx";
import "./index.css";

// Catch unhandled promise rejections globally
window.addEventListener("unhandledrejection", (event) => {
  Sentry.captureException(event.reason);
});

createRoot(document.getElementById("root")!).render(
  <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>}>
    <App />
  </Sentry.ErrorBoundary>
);
