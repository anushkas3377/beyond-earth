import type { Planet } from "@/types/space";
import { Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const PLANETS: Planet[] = [
  {
    id: "mercury",
    slug: "mercury",
    name: "Mercury",
    image: "/assets/generated/mercury-planet.dim_800x800.jpg",
    description:
      "The smallest and fastest planet, Mercury orbits closest to the Sun with extreme temperature swings and virtually no atmosphere.",
    keyFeature: "Orbital period: 88 Earth days",
    didYouKnow:
      "A day on Mercury (176 Earth days) is longer than its year (88 Earth days)!",
    distanceFromSun: "57.9 million km",
    diameter: "4,879 km",
    moons: 0,
    orbitalPeriod: "88 Earth days",
    temperature: "-173°C to 427°C",
    pressure: "~0 Pa",
    survivable: false,
    tintColor: "rgba(181,181,181,0.08)",
    mass: 0.33,
    radius: 2439,
    gravity: 3.7,
  },
  {
    id: "venus",
    slug: "venus",
    name: "Venus",
    image: "/assets/generated/venus-planet.dim_800x800.jpg",
    description:
      "The hottest planet in our solar system, shrouded in thick clouds of sulfuric acid with a runaway greenhouse effect.",
    keyFeature: "Surface temperature: 462°C",
    didYouKnow:
      "Venus rotates backwards compared to most planets — the Sun rises in the west.",
    distanceFromSun: "108.2 million km",
    diameter: "12,104 km",
    moons: 0,
    orbitalPeriod: "225 Earth days",
    temperature: "465°C average",
    pressure: "9.2 MPa",
    survivable: false,
    tintColor: "rgba(232,200,138,0.08)",
    mass: 4.87,
    radius: 6051,
    gravity: 8.87,
  },
  {
    id: "earth",
    slug: "earth",
    name: "Earth",
    image: "/assets/generated/earth-hero.dim_1200x1200.jpg",
    description:
      "Our home planet — the only known world harboring life, covered in liquid water with a protective magnetic field.",
    keyFeature: "Distance from Sun: 149.6 million km",
    didYouKnow: "Earth is the densest planet in the solar system.",
    distanceFromSun: "149.6 million km",
    diameter: "12,756 km",
    moons: 1,
    orbitalPeriod: "365.25 days",
    temperature: "-88°C to 58°C",
    pressure: "101.3 kPa",
    survivable: true,
    tintColor: "rgba(79,195,247,0.08)",
    mass: 5.97,
    radius: 6371,
    gravity: 9.81,
  },
  {
    id: "mars",
    slug: "mars",
    name: "Mars",
    image: "/assets/generated/mars-planet.dim_800x800.jpg",
    description:
      "The Red Planet — home to the tallest volcano and deepest canyon in the solar system, and humanity's next frontier.",
    keyFeature: "Olympus Mons: 21.9 km high",
    didYouKnow:
      "Mars has two small moons: Phobos and Deimos, likely captured asteroids.",
    distanceFromSun: "227.9 million km",
    diameter: "6,792 km",
    moons: 2,
    orbitalPeriod: "687 Earth days",
    temperature: "-87°C to -5°C",
    pressure: "0.6 kPa",
    survivable: false,
    tintColor: "rgba(224,112,48,0.08)",
    mass: 0.64,
    radius: 3389,
    gravity: 3.72,
  },
  {
    id: "jupiter",
    slug: "jupiter",
    name: "Jupiter",
    image: "/assets/generated/jupiter-planet.dim_800x800.jpg",
    description:
      "The largest planet in our solar system — a gas giant with the Great Red Spot, a storm raging for over 350 years.",
    keyFeature: "Great Red Spot: active for 350+ years",
    didYouKnow: "Jupiter has at least 95 known moons.",
    distanceFromSun: "778.5 million km",
    diameter: "142,984 km",
    moons: 95,
    orbitalPeriod: "11.9 Earth years",
    temperature: "-108°C (cloud tops)",
    pressure: "Extreme",
    survivable: false,
    tintColor: "rgba(200,139,96,0.08)",
    mass: 1898,
    radius: 71492,
    gravity: 24.79,
  },
  {
    id: "saturn",
    slug: "saturn",
    name: "Saturn",
    image: "/assets/generated/saturn-planet.dim_800x800.jpg",
    description:
      "The ringed giant — Saturn has the most spectacular ring system in the solar system spanning 282,000 km.",
    keyFeature: "Ring system spans 282,000 km",
    didYouKnow:
      "Saturn is less dense than water — it would float if placed in a vast enough ocean!",
    distanceFromSun: "1.43 billion km",
    diameter: "120,536 km",
    moons: 146,
    orbitalPeriod: "29.5 Earth years",
    temperature: "-139°C average",
    pressure: "Extreme",
    survivable: false,
    tintColor: "rgba(212,184,150,0.08)",
    mass: 568,
    radius: 60268,
    gravity: 10.44,
  },
  {
    id: "uranus",
    slug: "uranus",
    name: "Uranus",
    image: "/assets/generated/uranus-planet.dim_800x800.jpg",
    description:
      "The tilted ice giant — Uranus orbits the Sun on its side with an axial tilt of 98°, making its poles darker than its equator.",
    keyFeature: "Axial tilt: 97.77° (rotates sideways)",
    didYouKnow:
      "Uranus takes 84 Earth years to orbit the Sun — one season lasts 21 years!",
    distanceFromSun: "2.87 billion km",
    diameter: "51,118 km",
    moons: 27,
    orbitalPeriod: "84 Earth years",
    temperature: "-197°C average",
    pressure: "Extreme",
    survivable: false,
    tintColor: "rgba(148,220,220,0.08)",
    mass: 86.8,
    radius: 25559,
    gravity: 8.69,
  },
  {
    id: "neptune",
    slug: "neptune",
    name: "Neptune",
    image: "/assets/generated/neptune-planet.dim_800x800.jpg",
    description:
      "The windiest planet — Neptune has supersonic winds reaching 2,100 km/h, the fastest in the solar system, fueled by its internal heat source.",
    keyFeature: "Wind speeds: up to 2,100 km/h",
    didYouKnow:
      "Neptune's largest moon Triton orbits backwards — it was likely captured from the Kuiper Belt.",
    distanceFromSun: "4.5 billion km",
    diameter: "49,528 km",
    moons: 16,
    orbitalPeriod: "165 Earth years",
    temperature: "-201°C average",
    pressure: "Extreme",
    survivable: false,
    tintColor: "rgba(63,84,186,0.08)",
    mass: 102,
    radius: 24764,
    gravity: 11.15,
  },
  {
    id: "moon",
    slug: "moon",
    name: "Moon",
    image: "/assets/generated/moon-planet.dim_800x800.jpg",
    description:
      "Earth's only natural satellite — a barren, cratered world with no atmosphere, responsible for our ocean tides and a constant companion across human history.",
    keyFeature: "Only natural satellite of Earth",
    didYouKnow:
      "The Moon is slowly moving away from Earth at about 3.8 cm per year — in billions of years it will appear much smaller in our sky.",
    distanceFromSun: "~384,400 km from Earth",
    diameter: "3,474 km",
    moons: 0,
    orbitalPeriod: "27.3 Earth days",
    temperature: "-173°C to 127°C",
    pressure: "~0 Pa",
    survivable: false,
    tintColor: "rgba(180,180,180,0.08)",
    mass: 0.073,
    radius: 1737,
    gravity: 1.62,
  },
];

export { PLANETS };

const PLANET_SUBTITLES: Record<string, string> = {
  mercury: "Closest to the Sun",
  venus: "Hottest planet",
  earth: "Our home world",
  mars: "The Red Planet",
  jupiter: "The gas giant",
  saturn: "Lord of the rings",
  uranus: "The tilted ice giant",
  neptune: "The windiest planet",
  moon: "Earth's natural satellite",
};

export default function ExplorePage() {
  const _navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(2); // Earth by default
  const planet = PLANETS[selectedIndex];

  const selectPlanet = (index: number) => {
    setSelectedIndex(index);
  };

  const goNext = () => selectPlanet((selectedIndex + 1) % PLANETS.length);
  const goPrev = () =>
    selectPlanet((selectedIndex - 1 + PLANETS.length) % PLANETS.length);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      data-ocid="explore.page"
    >
      {/* Dynamic background tint */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 60% 30%, ${planet.tintColor} 0%, transparent 70%)`,
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-2">
              Solar System Navigator
            </p>
            <h1
              className="font-display text-4xl md:text-6xl font-black"
              style={{
                background: "linear-gradient(135deg, #00e5ff 0%, #6c63ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                filter: "drop-shadow(0 0 20px rgba(0,229,255,0.4))",
              }}
            >
              EXPLORE PLANETS
            </h1>
            <p className="text-slate-400 mt-2">
              Select a world to begin your journey
            </p>
          </motion.div>

          {/* Mobile: horizontal planet strip */}
          <div
            className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 snap-x snap-mandatory scrollbar-hide"
            data-ocid="explore.planet_list_mobile"
          >
            {PLANETS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPlanet(i)}
                data-ocid={`explore.planet_tab.${i + 1}`}
                className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                  i === selectedIndex
                    ? "text-space-black font-bold"
                    : "text-slate-400 border border-white/10 hover:text-white hover:border-cyan-500/30"
                }`}
                style={
                  i === selectedIndex
                    ? {
                        background:
                          "linear-gradient(135deg, #00e5ff 0%, #6c63ff 100%)",
                        boxShadow: "0 0 16px rgba(0,229,255,0.4)",
                      }
                    : {}
                }
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Desktop layout: sidebar + main */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Planet List Sidebar — Desktop only */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="hidden lg:block lg:w-56 flex-shrink-0"
              data-ocid="explore.planet_list"
            >
              <div className="glass-card p-4 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-4 px-1">
                  Solar System
                </p>
                {PLANETS.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => selectPlanet(i)}
                    data-ocid={`explore.planet_tab.${i + 1}`}
                    className={`w-full text-left px-3 py-3 rounded-xl mb-1 transition-all duration-300 group ${
                      i === selectedIndex
                        ? "bg-cyan-500/10 border border-cyan-500/30"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                    style={
                      i === selectedIndex
                        ? { boxShadow: "0 0 16px rgba(0,229,255,0.15)" }
                        : {}
                    }
                  >
                    <p
                      className={`text-sm font-bold font-display transition-colors duration-300 ${
                        i === selectedIndex
                          ? "text-neon-cyan"
                          : "text-slate-300 group-hover:text-white"
                      }`}
                    >
                      {p.name}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {PLANET_SUBTITLES[p.id]}
                    </p>
                  </button>
                ))}
              </div>
            </motion.aside>

            {/* Main Planet Display */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={planet.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="glass-card p-6 md:p-10"
                >
                  <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                    {/* Planet Visual */}
                    <div className="flex-shrink-0 relative flex items-center justify-center">
                      {/* Outer glow ring */}
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background: `radial-gradient(circle, ${planet.tintColor.replace("0.08", "0.3")} 0%, transparent 70%)`,
                          transform: "scale(1.4)",
                        }}
                        aria-hidden="true"
                      />
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 40,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        className="w-44 h-44 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden relative z-10"
                        style={{
                          boxShadow: `0 0 40px ${planet.tintColor.replace("0.08", "0.5")}, 0 0 80px ${planet.tintColor.replace("0.08", "0.2")}, inset 0 0 40px rgba(0,0,0,0.4)`,
                        }}
                      >
                        <img
                          src={planet.image}
                          alt={`${planet.name} - real space photograph`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Image already local — nothing to fallback to
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Planet Info */}
                    <div className="flex-1 min-w-0">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                          {planet.id === "moon"
                            ? "Natural Satellite"
                            : `Planet ${selectedIndex + 1} of ${PLANETS.length - 1}`}
                        </p>
                        <h2
                          className="font-display text-5xl md:text-7xl font-black text-white mb-2 leading-none"
                          style={{
                            textShadow: "0 0 40px rgba(255,255,255,0.25)",
                          }}
                        >
                          {planet.name}
                        </h2>
                        <div
                          className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 font-display"
                          style={{
                            background: "rgba(0,229,255,0.12)",
                            border: "1px solid rgba(0,229,255,0.3)",
                            color: "#00e5ff",
                            boxShadow: "0 0 12px rgba(0,229,255,0.15)",
                          }}
                        >
                          {planet.keyFeature}
                        </div>
                        <p className="text-slate-300 leading-relaxed mb-6 text-base">
                          {planet.description}
                        </p>

                        {/* Stats mini-grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                          {[
                            {
                              label: "Distance",
                              value: planet.distanceFromSun,
                            },
                            { label: "Diameter", value: planet.diameter },
                            {
                              label: "Moons",
                              value: String(planet.moons),
                            },
                            {
                              label: "Orbital Period",
                              value: planet.orbitalPeriod,
                            },
                            {
                              label: "Temperature",
                              value: planet.temperature,
                            },
                            {
                              label: "Gravity",
                              value: `${planet.gravity} m/s²`,
                            },
                          ].map((stat) => (
                            <div
                              key={stat.label}
                              className="bg-white/[0.04] rounded-lg p-3 border border-white/[0.07] hover:border-cyan-500/20 transition-colors duration-200"
                            >
                              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">
                                {stat.label}
                              </p>
                              <p className="text-sm font-semibold text-white truncate">
                                {stat.value}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Did You Know */}
                        <div
                          className="glass-card p-4 mb-6"
                          style={{
                            borderLeft: "2px solid #00e5ff",
                            background: "rgba(0,229,255,0.04)",
                          }}
                        >
                          <p className="text-[11px] uppercase tracking-widest text-neon-cyan mb-1 font-semibold">
                            💡 Did You Know?
                          </p>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {planet.didYouKnow}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-3">
                          <Link
                            to="/planet/$name"
                            params={{ name: planet.slug }}
                            className="cta-primary px-6 py-2.5 rounded-lg font-display font-bold text-sm"
                            data-ocid="explore.view_detail_button"
                          >
                            View in Detail
                          </Link>
                          <Link
                            to="/simulation"
                            className="cta-secondary px-5 py-2.5 rounded-lg text-sm"
                            data-ocid="explore.simulate_astronaut_button"
                          >
                            Simulate as Astronaut
                          </Link>
                          <Link
                            to="/lab"
                            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-neon-purple border border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
                            data-ocid="explore.test_lab_button"
                          >
                            Test in Lab
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Navigation */}
              <div className="flex justify-between mt-4 gap-3">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 border border-white/10 hover:border-cyan-500/30 hover:text-neon-cyan transition-all duration-300 hover:bg-cyan-500/5"
                  data-ocid="explore.prev_planet_button"
                >
                  <span>←</span>
                  <span>
                    {
                      PLANETS[
                        (selectedIndex - 1 + PLANETS.length) % PLANETS.length
                      ].name
                    }
                  </span>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 border border-white/10 hover:border-cyan-500/30 hover:text-neon-cyan transition-all duration-300 hover:bg-cyan-500/5"
                  data-ocid="explore.next_planet_button"
                >
                  <span>
                    {PLANETS[(selectedIndex + 1) % PLANETS.length].name}
                  </span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
