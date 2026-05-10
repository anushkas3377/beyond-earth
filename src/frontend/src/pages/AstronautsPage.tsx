import { supabase } from "@/supabaseClient";
import { Badge } from "@/components/ui/badge";
import type { Astronaut } from "@/types/space";
import { Link } from "@tanstack/react-router";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const ASTRONAUTS_DATA: Astronaut[] = [
  {
    id: "neil-armstrong",
    slug: "neil-armstrong",
    name: "Neil Armstrong",
    nationality: "American 🇺🇸",
    agency: "NASA",
    role: "Commander, Apollo 11",
    achievement: "First Human to Walk on the Moon",
    bio: "Neil Armstrong was an American astronaut and aeronautical engineer who became the first person to walk on the Moon on July 20, 1969.",
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
    bio: "Kalpana Chawla was an aerospace engineer and NASA astronaut — the first woman of Indian origin to travel to space.",
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
    bio: "Yuri Gagarin was a Soviet Air Forces pilot who became the first human to journey into outer space on April 12, 1961.",
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
    bio: "Sunita Williams is a NASA astronaut who holds the record for total cumulative EVA time among female astronauts.",
    missions: ["STS-116 / Expedition 14–15 (2006–2007)", "Soyuz TMA-05M / Expedition 33 (2012)"],
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
    bio: "Buzz Aldrin is a former astronaut, engineer, and decorated fighter pilot who walked on the Moon on July 20, 1969.",
    missions: ["Gemini 12 (1966)", "Apollo 11 (1969) — Moon Landing"],
    image: "/assets/generated/astronaut-buzz-aldrin.dim_600x750.jpg",
    birthYear: 1930,
    totalSpaceTime: "12 days, 1 hour",
  },
];

interface LiveAstronaut {
  name: string;
  craft: string;
}

interface EnrichedAstronaut extends LiveAstronaut {
  photo?: string;
  description?: string;
  wikiUrl?: string;
}

// Hardcoded Wikipedia photos for current ISS astronauts
const ASTRONAUT_PHOTOS: Record<string, { photo: string; description: string; wikiUrl: string }> = {
  "Oleg Kononenko": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Oleg_Kononenko.jpg/330px-Oleg_Kononenko.jpg",
    description: "Russian cosmonaut, record holder for most time in space",
    wikiUrl: "https://en.wikipedia.org/wiki/Oleg_Kononenko",
  },
  "Nikolai Chub": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Nikolai_Chub.jpg/330px-Nikolai_Chub.jpg",
    description: "Russian cosmonaut aboard the ISS",
    wikiUrl: "https://en.wikipedia.org/wiki/Nikolai_Chub",
  },
  "Tracy Caldwell Dyson": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tracy_Caldwell_Dyson.jpg/330px-Tracy_Caldwell_Dyson.jpg",
    description: "NASA astronaut and chemist",
    wikiUrl: "https://en.wikipedia.org/wiki/Tracy_Caldwell_Dyson",
  },
  "Matthew Dominick": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Matthew_Dominick.jpg/330px-Matthew_Dominick.jpg",
    description: "NASA astronaut and U.S. Navy pilot",
    wikiUrl: "https://en.wikipedia.org/wiki/Matthew_Dominick",
  },
  "Michael Barratt": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Michael_Barratt.jpg/330px-Michael_Barratt.jpg",
    description: "NASA astronaut and physician",
    wikiUrl: "https://en.wikipedia.org/wiki/Michael_Barratt_(astronaut)",
  },
  "Jeanette Epps": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Jeanette_Epps.jpg/330px-Jeanette_Epps.jpg",
    description: "NASA astronaut and aerospace engineer",
    wikiUrl: "https://en.wikipedia.org/wiki/Jeanette_Epps",
  },
  "Alexander Grebenkin": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Alexander_Grebenkin.jpg/330px-Alexander_Grebenkin.jpg",
    description: "Russian cosmonaut aboard the ISS",
    wikiUrl: "https://en.wikipedia.org/wiki/Alexander_Grebenkin",
  },
  "Butch Wilmore": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Butch_Wilmore.jpg/330px-Butch_Wilmore.jpg",
    description: "NASA astronaut and U.S. Navy captain",
    wikiUrl: "https://en.wikipedia.org/wiki/Butch_Wilmore",
  },
  "Sunita Williams": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sunita_Williams_in_2018.jpg/330px-Sunita_Williams_in_2018.jpg",
    description: "NASA astronaut, record holder for spacewalk time among women",
    wikiUrl: "https://en.wikipedia.org/wiki/Sunita_Williams",
  },
  "Li Guangsu": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Li_Guangsu.jpg/330px-Li_Guangsu.jpg",
    description: "Chinese taikonaut aboard Tiangong space station",
    wikiUrl: "https://en.wikipedia.org/wiki/Li_Guangsu",
  },
  "Li Cong": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Li_Cong.jpg/330px-Li_Cong.jpg",
    description: "Chinese taikonaut aboard Tiangong space station",
    wikiUrl: "https://en.wikipedia.org/wiki/Li_Cong_(taikonaut)",
  },
  "Ye Guangfu": {
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Ye_Guangfu.jpg/330px-Ye_Guangfu.jpg",
    description: "Chinese taikonaut and fighter pilot",
    wikiUrl: "https://en.wikipedia.org/wiki/Ye_Guangfu",
  },
};

function LiveAstronautsSection() {
  const [astronauts, setAstronauts] = useState<EnrichedAstronaut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

    useEffect(() => {
        supabase
    .from("astronauts")
    .select("*")
    .then(({ data, error }) => {
      if (error || !data) {
        setLoading(false);
        return;
      }
      const enriched = data.map((person) => ({
        name: person.name,
        craft: person.craft,
        photo: person.photo,
        description: person.description,
        wikiUrl: person.wiki_url,
      }));
      setAstronauts(enriched);
      setLoading(false);
    });
}, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-16"
    >
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span
            className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
            style={{ boxShadow: "0 0 8px #4ade80" }}
          />
          <p className="text-xs font-semibold uppercase tracking-widest text-green-400">
            Live — Right Now in Space
          </p>
        </div>
        <h2
          className="font-display text-2xl sm:text-3xl font-black text-white mb-2"
          style={{ textShadow: "0 0 30px rgba(74,222,128,0.4)" }}
        >
          HUMANS IN SPACE
        </h2>
        <p className="text-slate-400 text-sm">
          Current ISS Crew — Expedition 74
        </p>
      </div>

      {loading && (
        <div className="flex flex-col items-center py-10 gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{
              borderColor: "rgba(74,222,128,0.2)",
              borderTopColor: "#4ade80",
            }}
          />
          <p className="text-slate-400 text-xs">Fetching live data...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10 text-slate-400 text-sm">
          Could not load live data. Please try again later.
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="flex justify-center mb-8">
            <div
              className="px-5 py-2 rounded-full text-sm font-bold"
              style={{
                background: "rgba(74,222,128,0.1)",
                border: "1px solid rgba(74,222,128,0.3)",
                color: "#4ade80",
              }}
            >
              {astronauts.length} humans currently in space 🚀
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {astronauts.map((person, i) => (
              <motion.a
                key={person.name}
                href={person.wikiUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="glass-card overflow-hidden group hover:border-green-500/30 transition-all duration-300"
                style={{ textDecoration: "none" }}
              >
                <div className="h-52 overflow-hidden bg-slate-800/50 relative">
                  {person.photo ? (
                    <img
                      src={person.photo}
                      alt={person.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">
                      🧑‍🚀
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                      style={{
                        background: "rgba(74,222,128,0.15)",
                        border: "1px solid rgba(74,222,128,0.4)",
                        color: "#4ade80",
                      }}
                    >
                      {person.craft}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm mb-1 group-hover:text-green-400 transition-colors duration-300">
                    {person.name}
                  </h3>
                  {person.description && (
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {person.description}
                    </p>
                  )}
                  {person.wikiUrl && (
                    <p className="text-green-400 text-xs mt-2 font-semibold">
                      Read more →
                    </p>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}

export default function AstronautsPage() {
  return (
    <div
      data-ocid="astronauts.page"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
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
            textShadow: "0 0 40px rgba(0,229,255,0.5), 0 0 80px rgba(0,229,255,0.2)",
          }}
        >
          MEET REAL ASTRONAUTS
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
          Extraordinary men and women who left Earth behind and expanded humanity's reach into the cosmos.
        </p>
      </motion.div>

      <LiveAstronautsSection />

      <div className="section-divider mb-12" />

      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-neon-purple mb-2">
          Hall of Fame
        </p>
        <h2 className="font-display text-2xl font-black text-white">
          SPACE LEGENDS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-24" data-ocid="astronauts.list">
        {ASTRONAUTS_DATA.map((astronaut, i) => (
          <motion.article
            key={astronaut.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="glass-card overflow-hidden group flex flex-col"
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src={astronaut.image}
                alt={astronaut.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/assets/generated/astronaut-spacewalk.dim_800x500.jpg";
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
              <h2 className="font-display font-bold text-xl text-white mb-1 leading-tight">{astronaut.name}</h2>
              <p className="text-xs text-slate-400 mb-3 font-medium">{astronaut.nationality}</p>
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
              <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-5 line-clamp-3">{astronaut.bio}</p>
              <Link
                to="/astronauts/$slug"
                params={{ slug: astronaut.slug }}
                className="cta-secondary inline-flex items-center justify-center gap-2 text-xs font-bold font-display px-5 py-2.5 rounded-lg w-full text-center"
              >
                View Profile →
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-purple mb-3">Space Physics</p>
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4" style={{ textShadow: "0 0 30px rgba(108,99,255,0.5)" }}>
            SIMULATE YOUR SPACE EXPERIENCE
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Enter your details to calculate your weight across different worlds.
          </p>
        </div>
        <SimulationPanel />
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4 mt-16">
        <Link to="/explore" className="cta-primary px-8 py-3 rounded-xl font-display font-bold text-sm">
          Explore Planets
        </Link>
        <Link to="/lab" className="cta-secondary px-8 py-3 rounded-xl font-display font-bold text-sm">
          Open Interactive Lab
        </Link>
      </div>
    </div>
  );
}

function AnimatedCount({ target, decimals = 1 }: { target: number; decimals?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(decimals));
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, target, { duration: 1.2, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => {
      if (spanRef.current) spanRef.current.textContent = v;
    });
    return () => { controls.stop(); unsubscribe(); };
  }, [target, count, rounded]);

  return <span ref={spanRef}>0.0</span>;
}

function SimulationPanel() {
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<{
    earth: number; moon: number; mars: number;
    moonKg: number; marsKg: number; jumpHeight: number;
  } | null>(null);
  const [resultKey, setResultKey] = React.useState(0);

  const simulate = () => {
    const h = Number.parseFloat(height);
    const w = Number.parseFloat(weight);
    const a = Number.parseFloat(age);
    if (!height || !weight || !age) { setError("Please fill in all fields before simulating."); return; }
    if (Number.isNaN(h) || h <= 0 || h > 300) { setError("Enter a valid height between 1 and 300 cm."); return; }
    if (Number.isNaN(w) || w <= 0 || w > 500) { setError("Enter a valid weight between 1 and 500 kg."); return; }
    if (Number.isNaN(a) || a <= 0 || a > 130) { setError("Enter a valid age between 1 and 130 years."); return; }
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

  const planets = result ? [
    { label: "Earth", emoji: "🌍", newtons: result.earth, kgEquiv: Number.parseFloat(weight), color: "#00E5FF", gFactor: "9.8 m/s²", extra: null },
    { label: "Moon", emoji: "🌕", newtons: result.moon, kgEquiv: result.moonKg, color: "#FFC857", gFactor: "1.62 m/s²", extra: `Jump height on Moon: ~${result.jumpHeight} cm` },
    { label: "Mars", emoji: "🔴", newtons: result.mars, kgEquiv: result.marsKg, color: "#FF6B6B", gFactor: "3.72 m/s²", extra: null },
  ] : [];

  return (
    <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h3 className="font-display text-base font-bold mb-6 text-neon-cyan">Your Details</h3>
          <div className="space-y-5">
            {[
              { id: "sim-height", label: "Height (cm)", val: height, set: setHeight, max: 300, ph: "e.g. 175" },
              { id: "sim-weight", label: "Weight (kg)", val: weight, set: setWeight, max: 500, ph: "e.g. 70" },
              { id: "sim-age", label: "Age (years)", val: age, set: setAge, max: 130, ph: "e.g. 28" },
            ].map((field) => (
              <div key={field.id}>
                <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2" htmlFor={field.id}>{field.label}</label>
                <input id={field.id} type="number" min="1" max={field.max} value={field.val}
                  onChange={(e) => field.set(e.target.value)}
                  className="input-neon w-full px-4 py-3 text-sm rounded-lg" placeholder={field.ph} />
              </div>
            ))}
            {error && <motion.p key={error} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-error flex items-center gap-2">⚠️ {error}</motion.p>}
            <button type="button" onClick={simulate} className="cta-primary w-full py-3.5 rounded-xl font-display font-bold text-sm mt-2">🚀 Simulate in Space</button>
          </div>
        </div>
        <div>
          <h3 className="font-display text-base font-bold mb-6 text-neon-purple">Gravity Results</h3>
          {result ? (
            <motion.div key={resultKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="space-y-4">
              {planets.map((planet, idx) => (
                <motion.div key={planet.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.12 }}
                  className="glass-card p-4 flex items-center gap-4" style={{ borderColor: `${planet.color}35` }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${planet.color}18`, border: `1px solid ${planet.color}40` }}>{planet.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-display font-bold text-xl" style={{ color: planet.color }}>
                        <AnimatedCount target={planet.newtons} /><span className="text-xs ml-1">N</span>
                      </span>
                      <span className="text-xs text-slate-500">(~<AnimatedCount target={planet.kgEquiv} /> kg eq.)</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{planet.label} · g = {planet.gFactor}</p>
                    {planet.extra && <p className="text-xs mt-1 font-semibold" style={{ color: planet.color }}>🦘 {planet.extra}</p>}
                  </div>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="glass-card p-4 text-sm text-slate-400 leading-relaxed">
                On <span style={{ color: "#FFC857" }}>the Moon</span>, gravity is only <strong style={{ color: "#FFC857" }}>16.5%</strong> of Earth's. On <span style={{ color: "#FF6B6B" }}>Mars</span>, it's <strong style={{ color: "#FF6B6B" }}>38%</strong> of Earth's.
              </motion.div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 glass-card rounded-xl">
              <div className="text-5xl mb-4">🪐</div>
              <p className="text-slate-500 text-sm text-center max-w-xs">Fill in your details and hit Simulate to see your weight across the solar system.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}