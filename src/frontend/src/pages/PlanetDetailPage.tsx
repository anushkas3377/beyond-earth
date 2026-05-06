import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Globe, Thermometer } from "lucide-react";
import { motion } from "motion/react";
import { PLANETS } from "./ExplorePage";

export default function PlanetDetailPage() {
  const { name } = useParams({ strict: false }) as { name: string };
  const planetIndex = PLANETS.findIndex((p) => p.slug === name);
  const planet = planetIndex !== -1 ? PLANETS[planetIndex] : null;

  // 404 state
  if (!planet) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="planet_detail.not_found"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass-card p-12 max-w-lg"
        >
          <p
            className="font-display text-7xl font-black mb-4"
            style={{ color: "rgba(108,99,255,0.6)" }}
          >
            404
          </p>
          <h2 className="font-display text-2xl text-white mb-3">
            Planet Not Found
          </h2>
          <p className="text-slate-400 mb-8">
            The planet &ldquo;{name}&rdquo; does not exist in our solar system
            database.
          </p>
          <Link
            to="/explore"
            className="cta-primary px-8 py-3 rounded-xl font-display font-bold"
            data-ocid="planet_detail.back_explore_button"
          >
            Back to Explorer
          </Link>
        </motion.div>
      </div>
    );
  }

  const prevPlanet =
    PLANETS[(planetIndex - 1 + PLANETS.length) % PLANETS.length];
  const nextPlanet = PLANETS[(planetIndex + 1) % PLANETS.length];

  return (
    <div className="min-h-screen relative" data-ocid="planet_detail.page">
      {/* Dynamic tint overlay */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${planet.tintColor.replace("0.08", "0.25")} 0%, transparent 60%)`,
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-neon-cyan transition-colors duration-200 text-sm group"
              data-ocid="planet_detail.back_button"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Explorer
            </Link>
          </motion.div>

          {/* Hero section: planet visual + name */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center mb-16">
            {/* Planet Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-shrink-0 relative flex items-center justify-center"
            >
              {/* Outer atmospheric glow */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: "130%",
                  height: "130%",
                  background: `radial-gradient(circle, ${planet.tintColor.replace("0.08", "0.35")} 0%, transparent 70%)`,
                }}
                aria-hidden="true"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 45,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden relative z-10"
                style={{
                  boxShadow: [
                    `0 0 60px ${planet.tintColor.replace("0.08", "0.6")}`,
                    `0 0 120px ${planet.tintColor.replace("0.08", "0.3")}`,
                    "inset 0 0 60px rgba(0,0,0,0.5)",
                  ].join(", "),
                }}
              >
                <img
                  src={planet.image}
                  alt={`${planet.name} — NASA astrophotography`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/assets/generated/earth-hero.dim_1200x1200.jpg";
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Planet title + description */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex-1 min-w-0"
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 mb-2">
                Solar System — Planet {planetIndex + 1} of {PLANETS.length}
              </p>
              <h1
                className="font-display text-6xl md:text-8xl font-black text-white leading-none mb-4"
                style={{ textShadow: "0 0 60px rgba(255,255,255,0.2)" }}
              >
                {planet.name}
              </h1>
              <div
                className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5 font-display"
                style={{
                  background: "rgba(0,229,255,0.1)",
                  border: "1px solid rgba(0,229,255,0.3)",
                  color: "#00e5ff",
                  boxShadow: "0 0 16px rgba(0,229,255,0.15)",
                }}
              >
                ✦ {planet.keyFeature}
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {planet.description}
              </p>
            </motion.div>
          </div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <h2
              className="font-display text-lg font-bold text-neon-cyan mb-4 uppercase tracking-widest"
              style={{ textShadow: "0 0 16px rgba(0,229,255,0.4)" }}
            >
              Planet Data
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                {
                  label: "Radius",
                  value: `${planet.radius.toLocaleString()} km`,
                },
                { label: "Mass", value: `${planet.mass} × 10²⁴ kg` },
                { label: "Distance from Sun", value: planet.distanceFromSun },
                { label: "Orbital Period", value: planet.orbitalPeriod },
                { label: "Surface Temp", value: planet.temperature },
                {
                  label: "Moons",
                  value: planet.moons === 0 ? "None" : String(planet.moons),
                },
                { label: "Diameter", value: planet.diameter },
                { label: "Surface Gravity", value: `${planet.gravity} m/s²` },
                {
                  label: "Survivable",
                  value: planet.survivable ? "✓ Yes" : "✗ No",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 hover:border-cyan-500/25 transition-all duration-300"
                >
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                    {stat.label}
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      stat.label === "Survivable"
                        ? planet.survivable
                          ? "text-green-400"
                          : "text-red-400"
                        : "text-white"
                    }`}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feature cards row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
          >
            {/* Physical + Orbital Data cards */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-neon-cyan" aria-hidden="true" />
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Physical Properties
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { k: "Diameter", v: planet.diameter },
                  { k: "Mass", v: `${planet.mass} × 10²⁴ kg` },
                  { k: "Surface Gravity", v: `${planet.gravity} m/s²` },
                  { k: "Number of Moons", v: String(planet.moons) },
                ].map(({ k, v }) => (
                  <div
                    key={k}
                    className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-slate-400">{k}</span>
                    <span className="text-white font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Thermometer
                  className="w-4 h-4 text-orange-400"
                  aria-hidden="true"
                />
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Environment
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { k: "Distance from Sun", v: planet.distanceFromSun },
                  { k: "Orbital Period", v: planet.orbitalPeriod },
                  { k: "Temperature Range", v: planet.temperature },
                  { k: "Atmospheric Pressure", v: planet.pressure },
                ].map(({ k, v }) => (
                  <div
                    key={k}
                    className="flex justify-between items-center text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-slate-400">{k}</span>
                    <span className="text-white font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Did You Know card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10"
          >
            <div
              className="glass-card p-6"
              style={{
                borderLeft: "3px solid #00e5ff",
                background:
                  "linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(108,99,255,0.03) 100%)",
              }}
            >
              <p className="text-xs uppercase tracking-widest text-neon-cyan mb-2 font-bold">
                💡 Did You Know?
              </p>
              <p className="text-slate-200 text-base leading-relaxed">
                {planet.didYouKnow}
              </p>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <Link
              to="/astronaut"
              className="cta-primary px-6 py-3 rounded-xl font-display font-bold text-sm"
              data-ocid="planet_detail.simulate_button"
            >
              Simulate as Astronaut
            </Link>
            <Link
              to="/lab"
              className="cta-secondary px-6 py-3 rounded-xl text-sm"
              data-ocid="planet_detail.lab_button"
            >
              Test Physics in Lab
            </Link>
            <Link
              to="/missions"
              className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-400 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
              data-ocid="planet_detail.missions_button"
            >
              View Missions
            </Link>
          </motion.div>

          {/* Planet navigation: prev / next */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/planet/$name"
              params={{ name: prevPlanet.slug }}
              className="flex-1 glass-card p-4 flex items-center gap-4 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group"
              data-ocid="planet_detail.prev_planet_link"
            >
              <span className="text-slate-500 group-hover:text-neon-cyan transition-colors duration-200 text-lg">
                ←
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">
                  Previous
                </p>
                <p className="font-display font-bold text-sm text-slate-300 group-hover:text-neon-cyan transition-colors duration-200">
                  {prevPlanet.name}
                </p>
              </div>
            </Link>

            <Link
              to="/explore"
              className="glass-card p-4 flex items-center justify-center gap-2 hover:border-white/20 transition-all duration-300"
              data-ocid="planet_detail.explore_all_link"
            >
              <span className="text-xs text-slate-400 font-display uppercase tracking-widest">
                All Planets
              </span>
            </Link>

            <Link
              to="/planet/$name"
              params={{ name: nextPlanet.slug }}
              className="flex-1 glass-card p-4 flex items-center gap-4 justify-end hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300 group"
              data-ocid="planet_detail.next_planet_link"
            >
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">
                  Next
                </p>
                <p className="font-display font-bold text-sm text-slate-300 group-hover:text-neon-cyan transition-colors duration-200">
                  {nextPlanet.name}
                </p>
              </div>
              <span className="text-slate-500 group-hover:text-neon-cyan transition-colors duration-200 text-lg">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
