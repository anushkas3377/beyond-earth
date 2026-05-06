import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },
  { label: "Timeline", to: "/timeline" },
  { label: "Missions", to: "/missions" },
  { label: "Astronauts", to: "/astronauts" },
  { label: "Lab", to: "/lab" },
  { label: "Agencies", to: "/agencies" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5,7,13,0.92)" : "rgba(11,15,26,0.75)",
        backdropFilter: `blur(${scrolled ? 20 : 12}px)`,
        WebkitBackdropFilter: `blur(${scrolled ? 20 : 12}px)`,
        borderBottom: "1px solid rgba(0,229,255,0.12)",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="navbar.logo_link"
          >
            <img
              src="/assets/logo.png"
              alt="Beyond Earth logo"
              className="h-10 w-auto flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.5))" }}
            />
            <span
              className="hidden sm:block font-display font-bold text-lg tracking-wide"
              style={{
                color: "#00E5FF",
                textShadow: "0 0 12px rgba(0,229,255,0.5)",
                letterSpacing: "0.06em",
              }}
            >
              Beyond Earth
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-0.5"
            data-ocid="navbar.desktop_nav"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.to === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link px-3 py-2 text-sm font-medium ${
                    isActive
                      ? "active text-neon-cyan"
                      : "text-slate-400 hover:text-white"
                  }`}
                  data-ocid={`navbar.${link.label.toLowerCase()}_link`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Start Journey CTA */}
          <div className="hidden lg:block">
            <Link
              to="/explore"
              className="cta-primary px-5 py-2 text-sm"
              data-ocid="navbar.start_journey_button"
            >
              Start Journey
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            className="lg:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: mobileOpen ? "#00E5FF" : "#94a3b8" }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="navbar.mobile_menu_toggle"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden animate-slide-down"
          style={{
            background: "rgba(5,7,13,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(0,229,255,0.1)",
          }}
          data-ocid="navbar.mobile_menu"
        >
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.to === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "text-neon-cyan bg-cyan-500/10 border border-cyan-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  data-ocid={`navbar.mobile_${link.label.toLowerCase()}_link`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/explore"
              onClick={() => setMobileOpen(false)}
              className="cta-primary mt-4 py-3 text-center text-sm"
              data-ocid="navbar.mobile_start_journey_button"
            >
              Start Journey
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
