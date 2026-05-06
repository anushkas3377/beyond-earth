import { Outlet } from "@tanstack/react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import StarfieldCanvas from "./StarfieldCanvas";

export default function Layout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0B0F1A", colorScheme: "dark" }}
    >
      {/* Animated starfield canvas — fixed behind everything */}
      <StarfieldCanvas />

      {/* Subtle nebula gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(108,99,255,0.08) 0%, transparent 60%), " +
            "radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0,229,255,0.05) 0%, transparent 50%)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <Navbar />
      <main className="flex-1 relative" style={{ zIndex: 2 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
