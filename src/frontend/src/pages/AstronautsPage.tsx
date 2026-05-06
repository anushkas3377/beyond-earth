import { Badge } from "@/components/ui/badge";
import type { Astronaut } from "@/types/space";
import { Link } from "@tanstack/react-router";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useRef } from "react";

export const ASTRONAUTS_DATA: Astronaut[] = [
  {
    id: "neil-armstrong",
    slug: "neil-armstrong",
    name: "Neil Armstrong",
    nationality: "American 🇺🇸",
    agency: "NASA",
    role: "Commander, Apollo 11",
    achievement: "First Human to Walk on the Moon",
    bio: "Neil Armstrong was an American astronaut and aeronautical engineer who became the first person to walk on the Moon on July 20, 1969. His iconic words — 'That's one small step for man, one giant leap for mankind' — echoed across history.",
    missions: ["Gemini 8 (1966)", "Apollo 11 (1969) — Moon Landing"],
    image: "/assets/generated/astronaut-neil-armstrong.dim_600x750.jpg",
    birthYear: 1930,
    totalSpaceTime: "8 days, 14 hours",
  },
  {
    id: "kalpana-chawla",
    slug: "kalpana-chawla",
    name: "Kalpana Chawla",
    nationality: "Indian-American 🇮🇳🇺🇸",
    agency: "NASA",
    role: "Mission Specialist",
    achievement: "First Woman of Indian Origin in Space",
    bio: "Kalpana Chawla was an aerospace engineer and NASA astronaut — the first woman of Indian origin to travel to space. She flew her first mission in 1997 and perished heroically during the STS-107 re-entry in 2003.",
    missions: ["STS-87 (1997)", "STS-107 (2003) — Final Mission"],
    image: "/assets/generated/astronaut-kalpana-chawla.dim_600x750.jpg",
    birthYear: 1962,
    totalSpaceTime: "30 days, 22 hours",
  },
  {
    id: "yuri-gagarin",
    slug: "yuri-gagarin",
    name: "Yuri Gagarin",
    nationality: "Soviet 🇷🇺",
    agency: "Roscosmos (USSR)",
    role: "Pilot, Vostok 1",
    achievement: "First Human in Space",
    bio: "Yuri Gagarin was a Soviet Air Forces pilot who became the first human to journey into outer space on April 12, 1961. His spacecraft Vostok 1 completed one full orbit of Earth — a defining moment for all humanity.",
    missions: ["Vostok 1 (1961) — First Human Spaceflight"],
    image: "/assets/generated/astronaut-yuri-gagarin.dim_600x750.jpg",
    birthYear: 1934,
    totalSpaceTime: "1 hour, 48 minutes",
  },
  {
    id: "sunita-williams",
    slug: "sunita-williams",
    name: "Sunita Williams",
    nationality: "American 🇺🇸",
    agency: "NASA",
    role: "Flight Engineer & Commander",
    achievement: "Record Holder — Most Spacewalk Time (Female)",
    bio: "Sunita Williams is a NASA astronaut and U.S. Navy officer who holds the record for total cumulative EVA time among female astronauts at 50 hours, 40 minutes. She famously ran the Boston Marathon while orbiting Earth.",
    missions: [
      "STS-116 / Expedition 14–15 (2006–2007)",
      "Soyuz TMA-05M / Expedition 33 (2012)",
    ],
    image: "/assets/generated/astronaut-sunita-williams.dim_600x750.jpg",
    birthYear: 1965,
    totalSpaceTime: "321 days, 17 hours",
  },
  {
    id: "buzz-aldrin",
    slug: "buzz-aldrin",
    name: "Buzz Aldrin",
    nationality: "American 🇺🇸",
    agency: "NASA",
    role: "Lunar Module Pilot, Apollo 11",
    achievement: "Second Human to Walk on the Moon",
    bio: "Buzz Aldrin is a former astronaut, engineer, and decorated fighter pilot. On Apollo 11, he and Neil Armstrong became the first humans to walk on the lunar surface on July 20, 1969 — watched by over 600 million people worldwide.",
    missions: ["Gemini 12 (1966)", "Apollo 11 (1969) — Moon Landing"],
    image: "/assets/generated/astronaut-buzz-aldrin.dim_600x750.jpg",
    birthYear: 1930,
    totalSpaceTime: "12 days, 1 hour",
  },
];

export default function AstronautsPage() {
  return (
    <div
      data-ocid="astronauts.page"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      {/* Section 1: Astronaut Profiles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-cyan mb-3">
          Human Achievement
        </p>
        <h1
          className="font-display text-4xl sm:text-5xl font-black text-white mb-4"
          style={{
            textShadow:
              "0 0 40px rgba(0,229,255,0.5), 0 0 80px rgba(0,229,255,0.2)",
          }}
        >
          MEET REAL ASTRONAUTS
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          Extraordinary men and women who left Earth behind and expanded
          humanity's reach into the cosmos.
        </p>
      </motion.div>

      {/* Astronaut Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-24"
        data-ocid="astronauts.list"
      >
        {ASTRONAUTS_DATA.map((astronaut, i) => (
          <motion.article
            key={astronaut.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card overflow-hidden group flex flex-col"
            data-ocid={`astronauts.item.${i + 1}`}
          >
            {/* Image */}
            <div className="relative h-72 overflow-hidden">
              <img
                src={astronaut.image}
                alt={astronaut.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "/assets/generated/astronaut-spacewalk.dim_800x500.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/20 to-transparent" />
              <div className="absolute top-3 right-3">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-bold tracking-wider uppercase"
                  style={{
                    background: "rgba(0,229,255,0.12)",
                    color: "#00E5FF",
                    border: "1px solid rgba(0,229,255,0.35)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {astronaut.agency}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h2 className="font-display font-bold text-xl text-white mb-1 leading-tight">
                {astronaut.name}
              </h2>
              <p className="text-xs text-slate-400 mb-3 font-medium">
                {astronaut.nationality}
              </p>

              <Badge
                variant="outline"
                className="w-fit mb-4 text-xs py-0.5 leading-snug"
                style={{
                  background: "rgba(108,99,255,0.1)",
                  color: "#6C63FF",
                  borderColor: "rgba(108,99,255,0.35)",
                }}
              >
                {astronaut.achievement}
              </Badge>

              <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-5 line-clamp-3">
                {astronaut.bio}
              </p>

              <Link
                to="/astronauts/$slug"
                params={{ slug: astronaut.slug }}
                className="cta-secondary inline-flex items-center justify-center gap-2 text-xs font-bold font-display px-5 py-2.5 rounded-lg w-full text-center"
                data-ocid={`astronauts.view_profile_button.${i + 1}`}
              >
                View Profile →
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Divider */}
      <div className="section-divider mb-20" />

      {/* Section 2: Simulation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        data-ocid="astronauts.simulation_section"
      >
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-purple mb-3">
            Space Physics
          </p>
          <h2
            className="font-display text-3xl sm:text-4xl font-black text-white mb-4"
            style={{ textShadow: "0 0 30px rgba(108,99,255,0.5)" }}
          >
            SIMULATE YOUR SPACE EXPERIENCE
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Enter your details to calculate your weight across different worlds
            using real gravitational constants.
          </p>
        </div>
        <SimulationPanel />
      </motion.div>

      {/* Bottom nav buttons */}
      <div
        className="flex flex-wrap justify-center gap-4 mt-16"
        data-ocid="astronauts.nav_buttons"
      >
        <Link
          to="/explore"
          className="cta-primary px-8 py-3 rounded-xl font-display font-bold text-sm"
          data-ocid="astronauts.explore_planets_button"
        >
          Explore Planets
        </Link>
        <Link
          to="/lab"
          className="cta-secondary px-8 py-3 rounded-xl font-display font-bold text-sm"
          data-ocid="astronauts.open_lab_button"
        >
          Open Interactive Lab
        </Link>
      </div>
    </div>
  );
}

function AnimatedCount({
  target,
  decimals = 1,
}: { target: number; decimals?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, target, { duration: 1.2, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => {
      if (spanRef.current) spanRef.current.textContent = v;
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [target, count, rounded]);

  return <span ref={spanRef}>0.0</span>;
}

function SimulationPanel() {
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<{
    earth: number;
    moon: number;
    mars: number;
    moonKg: number;
    marsKg: number;
    jumpHeight: number;
  } | null>(null);
  const [resultKey, setResultKey] = React.useState(0);

  const simulate = () => {
    const h = Number.parseFloat(height);
    const w = Number.parseFloat(weight);
    const a = Number.parseFloat(age);

    if (!height || !weight || !age) {
      setError("Please fill in all fields before simulating.");
      return;
    }
    if (Number.isNaN(h) || h <= 0 || h > 300) {
      setError("Enter a valid height between 1 and 300 cm.");
      return;
    }
    if (Number.isNaN(w) || w <= 0 || w > 500) {
      setError("Enter a valid weight between 1 and 500 kg.");
      return;
    }
    if (Number.isNaN(a) || a <= 0 || a > 130) {
      setError("Enter a valid age between 1 and 130 years.");
      return;
    }

    setError("");
    setResult({
      earth: Math.round(w * 9.8 * 10) / 10,
      moon: Math.round(w * 1.62 * 10) / 10,
      mars: Math.round(w * 3.72 * 10) / 10,
      moonKg: Math.round(((w * 1.62) / 9.8) * 10) / 10,
      marsKg: Math.round(((w * 3.72) / 9.8) * 10) / 10,
      jumpHeight: Math.round(h * 6),
    });
    setResultKey((k) => k + 1);
  };

  const planets = result
    ? [
        {
          label: "Earth",
          emoji: "🌍",
          newtons: result.earth,
          kgEquiv: Number.parseFloat(weight),
          color: "#00E5FF",
          gFactor: "9.8 m/s²",
          extra: null,
        },
        {
          label: "Moon",
          emoji: "🌕",
          newtons: result.moon,
          kgEquiv: result.moonKg,
          color: "#FFC857",
          gFactor: "1.62 m/s²",
          extra: `Jump height on Moon: ~${result.jumpHeight} cm`,
        },
        {
          label: "Mars",
          emoji: "🔴",
          newtons: result.mars,
          kgEquiv: result.marsKg,
          color: "#FF6B6B",
          gFactor: "3.72 m/s²",
          extra: null,
        },
      ]
    : [];

  return (
    <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Input Panel */}
        <div>
          <h3 className="font-display text-base font-bold mb-6 text-neon-cyan">
            Your Details
          </h3>
          <div className="space-y-5">
            <div>
              <label
                className="block text-xs uppercase tracking-widest text-slate-400 mb-2"
                htmlFor="sim-height"
              >
                Height (cm)
              </label>
              <input
                id="sim-height"
                type="number"
                min="1"
                max="300"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="input-neon w-full px-4 py-3 text-sm rounded-lg"
                placeholder="e.g. 175"
                data-ocid="astronauts.simulation.height_input"
              />
            </div>
            <div>
              <label
                className="block text-xs uppercase tracking-widest text-slate-400 mb-2"
                htmlFor="sim-weight"
              >
                Weight (kg)
              </label>
              <input
                id="sim-weight"
                type="number"
                min="1"
                max="500"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="input-neon w-full px-4 py-3 text-sm rounded-lg"
                placeholder="e.g. 70"
                data-ocid="astronauts.simulation.weight_input"
              />
            </div>
            <div>
              <label
                className="block text-xs uppercase tracking-widest text-slate-400 mb-2"
                htmlFor="sim-age"
              >
                Age (years)
              </label>
              <input
                id="sim-age"
                type="number"
                min="1"
                max="130"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input-neon w-full px-4 py-3 text-sm rounded-lg"
                placeholder="e.g. 28"
                data-ocid="astronauts.simulation.age_input"
              />
            </div>

            {error && (
              <motion.p
                key={error}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-error flex items-center gap-2"
                data-ocid="astronauts.simulation.error_state"
              >
                ⚠️ {error}
              </motion.p>
            )}

            <button
              type="button"
              onClick={simulate}
              className="cta-primary w-full py-3.5 rounded-xl font-display font-bold text-sm mt-2"
              data-ocid="astronauts.simulation.submit_button"
            >
              🚀 Simulate in Space
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div>
          <h3 className="font-display text-base font-bold mb-6 text-neon-purple">
            Gravity Results
          </h3>
          {result ? (
            <motion.div
              key={resultKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
              data-ocid="astronauts.simulation.success_state"
            >
              {planets.map((planet, idx) => (
                <motion.div
                  key={planet.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.12, duration: 0.45 }}
                  className="glass-card p-4 flex items-center gap-4"
                  style={{ borderColor: `${planet.color}35` }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: `${planet.color}18`,
                      border: `1px solid ${planet.color}40`,
                    }}
                  >
                    {planet.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span
                        className="font-display font-bold text-xl"
                        style={{
                          color: planet.color,
                          textShadow: `0 0 12px ${planet.color}60`,
                        }}
                      >
                        <AnimatedCount target={planet.newtons} />
                        <span className="text-xs ml-1">N</span>
                      </span>
                      <span className="text-xs text-slate-500">
                        (~
                        <AnimatedCount target={planet.kgEquiv} /> kg eq.)
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {planet.label} · g = {planet.gFactor}
                    </p>
                    {planet.extra && (
                      <p
                        className="text-xs mt-1 font-semibold"
                        style={{ color: planet.color }}
                      >
                        🦘 {planet.extra}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="glass-card p-4 text-sm text-slate-400 leading-relaxed"
              >
                On <span style={{ color: "#FFC857" }}>the Moon</span>, gravity
                is only <strong style={{ color: "#FFC857" }}>16.5%</strong> of
                Earth's — you'd feel nearly weightless. On{" "}
                <span style={{ color: "#FF6B6B" }}>Mars</span>, it's{" "}
                <strong style={{ color: "#FF6B6B" }}>38%</strong> of Earth's —
                challenging but survivable.
              </motion.div>
            </motion.div>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-64 glass-card rounded-xl"
              data-ocid="astronauts.simulation.empty_state"
            >
              <div className="text-5xl mb-4">🪐</div>
              <p className="text-slate-500 text-sm text-center max-w-xs">
                Fill in your details and hit Simulate to see your weight across
                the solar system.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
