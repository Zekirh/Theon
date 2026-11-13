import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "next-themes";

import SmoothScroll from "@/components/fx/SmoothScroll";
import Nav from "@/components/site/Nav";
import IntroLoader from "@/components/site/IntroLoader";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import SolutionsPage from "./pages/SolutionsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type IntroPhase = "intro" | "reveal" | "done";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const initialPhase = (): IntroPhase => {
  if (typeof window === "undefined") return "done";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "done";
  try {
    if (sessionStorage.getItem("cs-intro-played") === "1") return "done";
  } catch {
    return "done";
  }
  return "intro";
};

const App = () => {
  const [phase, setPhase] = useState<IntroPhase>(initialPhase);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div>
        <SmoothScroll />
        {phase !== "intro" && (
          <>
            <Nav />
            <AnimatedRoutes />
          </>
        )}
        {phase !== "done" && (
          <IntroLoader onReveal={() => setPhase("reveal")} onDone={() => setPhase("done")} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
