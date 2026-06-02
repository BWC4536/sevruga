import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const onDark = isHome && !scrolled;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(249,249,249,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col items-start group">
          <span
            className="tracking-[0.3em] transition-colors duration-500"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.35rem",
              fontWeight: 600,
              color: onDark ? "#ffffff" : "#1A1A1A",
            }}
          >
            SEVRUGA
          </span>
          <span
            className="text-[0.58rem] tracking-[0.22em] uppercase transition-colors duration-500"
            style={{ color: onDark ? "rgba(255,255,255,0.7)" : "#C4714A" }}
          >
            Coria del Río · Sevilla
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { to: "/carta", label: "La Carta" },
            { to: "/cerveceria", label: "Cervecería" },
            { to: "/contactanos", label: "Contacto" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative text-[0.7rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 group ${
                  isActive ? "text-[#C4714A]" : ""
                }`
              }
              style={({ isActive }) => ({
                color: isActive
                  ? "#C4714A"
                  : onDark
                  ? "rgba(255,255,255,0.88)"
                  : "#1A1A1A",
              })}
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span
                    className="absolute -bottom-1 left-0 h-px bg-[#C4714A] transition-all duration-300"
                    style={{ width: isActive ? "100%" : "0%" }}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/reservas"
            className="hidden md:inline-flex items-center px-7 py-2.5 text-white text-[0.7rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "#C4714A" }}
          >
            Reservar Mesa
          </Link>

          <button
            className="md:hidden p-1 transition-colors duration-300"
            style={{ color: onDark ? "#ffffff" : "#1A1A1A" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: mobileOpen ? "400px" : "0",
          backgroundColor: "rgba(249,249,249,0.98)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="px-8 py-6 flex flex-col gap-6 border-t border-black/5">
          {[
            { to: "/carta", label: "La Carta" },
            { to: "/cerveceria", label: "Cervecería" },
            { to: "/contactanos", label: "Contacto" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-[0.75rem] tracking-[0.18em] uppercase font-medium transition-colors ${
                  isActive ? "text-[#C4714A]" : "text-[#1A1A1A]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/reservas"
            className="inline-flex items-center justify-center px-6 py-3 text-white text-[0.7rem] tracking-[0.18em] uppercase font-medium"
            style={{ backgroundColor: "#C4714A" }}
          >
            Reservar Mesa
          </Link>
        </div>
      </div>
    </nav>
  );
}
