import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageShell from "@/components/site/PageShell";
import Btn from "@/components/fx/Btn";
import CauseRipple from "@/components/fx/CauseRipple";
import ScrambleText from "@/components/fx/ScrambleText";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <PageShell title="404 • Page Not Found" path="/404" noindex>
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="bp-grid bp-fade absolute inset-0" aria-hidden />
        <CauseRipple
          tone="azure"
          className="left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative px-6 py-32 text-center">
          <p className="font-mono text-[0.64rem] uppercase tracking-[0.24em] text-ember">
            <ScrambleText text="ERR // SIGNAL LOST" />
          </p>
          <h1 className="mt-4 font-display text-[clamp(6rem,24vw,13rem)] font-bold leading-none tracking-tight text-bone">
            4<span className="text-solar">0</span>4
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-[0.98rem] leading-relaxed text-bone/55">
            This page slipped outside the system. Let’s get you back to solid
            ground.
          </p>
          <div className="mt-9 flex justify-center">
            <Btn to="/" variant="primary" size="lg">
              Return Home
            </Btn>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default NotFound;
