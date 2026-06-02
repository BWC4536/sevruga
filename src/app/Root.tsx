import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <div
      className="min-h-screen bg-[#F9F9F9]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
