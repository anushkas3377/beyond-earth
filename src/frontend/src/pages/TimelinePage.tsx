import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  agency: string;
  category: "launch" | "landing" | "discovery" | "milestone";
  emoji: string;
}

const TIMELINE: TimelineEvent[] = [
  {
    year: "1957",
    title: "Sputnik 1 Launched",
    description:
      "The Soviet Union launches the world's first artificial satellite, Sputnik 1, igniting the Space Age and proving orbit was achievable for humanity.",
    agency: "USSR",
    category: "launch",
    emoji: "🛰️",
  },
  {
    year: "1961",
    title: "Yuri Gagarin — First Human in Space",
    description:
      "Cosmonaut Yuri Gagarin becomes the first human to journey into outer space, completing one orbit around Earth aboard Vostok 1 in 108 minutes.",
    agency: "USSR",
    category: "milestone",
    emoji: "👨‍🚀",
  },
  {
    year: "1963",
    title: "Valentina Tereshkova — First Woman in Space",
    description:
      "Soviet cosmonaut Valentina Tereshkova becomes the first woman to travel to space, spending nearly three days in orbit aboard Vostok 6.",
    agency: "USSR",
    category: "milestone",
    emoji: "👩‍🚀",
  },
  {
    year: "1965",
    title: "Alexei Leonov — First Spacewalk",
    description:
      "Soviet cosmonaut Alexei Leonov performs the first-ever spacewalk (EVA), floating freely in space for 12 minutes outside the Voskhod 2 spacecraft.",
    agency: "USSR",
    category: "milestone",
    emoji: "🧑‍🚀",
  },
  {
    year: "1969",
    title: "Apollo 11 — Humans Walk on the Moon",
    description:
      "Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon. Armstrong's words — 'One small step for man, one giant leap for mankind' — echo through history.",
    agency: "NASA",
    category: "landing",
    emoji: "🌕",
  },
  {
    year: "1971",
    title: "Mariner 9 — First Mars Orbiter",
    description:
      "NASA's Mariner 9 becomes the first spacecraft to successfully orbit another planet, mapping 85% of the Martian surface and discovering Olympus Mons.",
    agency: "NASA",
    category: "discovery",
    emoji: "🔴",
  },
  {
    year: "1977",
    title: "Voyager 1 & 2 — Deep Space Explorers",
    description:
      "NASA launches twin Voyager spacecraft to explore the outer solar system. Both are now in interstellar space, the most distant human-made objects ever.",
    agency: "NASA",
    category: "launch",
    emoji: "🚀",
  },
  {
    year: "1981",
    title: "Space Shuttle — First Reusable Spacecraft",
    description:
      "NASA's Space Shuttle Columbia makes its maiden flight, inaugurating the era of reusable spacecraft and launching 135 missions over 30 years.",
    agency: "NASA",
    category: "launch",
    emoji: "✈️",
  },
  {
    year: "1990",
    title: "Hubble Space Telescope Deployed",
    description:
      "The Hubble Space Telescope is deployed from Space Shuttle Discovery, revolutionizing our understanding of the cosmos with images spanning billions of years.",
    agency: "NASA / ESA",
    category: "discovery",
    emoji: "🔭",
  },
  {
    year: "1998",
    title: "ISS Construction Begins",
    description:
      "Construction of the International Space Station begins with the launch of Russia's Zarya module — a symbol of global cooperation 400 km above Earth.",
    agency: "NASA / Roscosmos",
    category: "milestone",
    emoji: "🌍",
  },
  {
    year: "2004",
    title: "Mars Rovers Spirit & Opportunity",
    description:
      "NASA's twin rovers Spirit and Opportunity land on Mars, conducting geological surveys and discovering compelling evidence that Mars once had liquid water.",
    agency: "NASA",
    category: "landing",
    emoji: "🤖",
  },
  {
    year: "2012",
    title: "Curiosity Rover — Nuclear Mars Explorer",
    description:
      "NASA's Curiosity rover lands in Gale Crater using the 'skycrane' system. Nuclear-powered, it has driven over 30 km and confirmed Mars could have supported life.",
    agency: "NASA",
    category: "landing",
    emoji: "☢️",
  },
  {
    year: "2021",
    title: "Perseverance + Ingenuity — First Mars Flight",
    description:
      "NASA's Perseverance rover and Ingenuity helicopter land on Mars. Ingenuity makes the first-ever powered, controlled flight on another planet.",
    agency: "NASA",
    category: "discovery",
    emoji: "🚁",
  },
  {
    year: "2022",
    title: "James Webb Space Telescope — Deepest Images Ever",
    description:
      "JWST releases its first full-color images — the deepest and sharpest infrared images of the universe ever captured, seeing galaxies formed just 400 million years after the Big Bang.",
    agency: "NASA / ESA",
    category: "discovery",
    emoji: "🌌",
  },
  {
    year: "2023",
    title: "Chandrayaan-3 — India on the Moon's South Pole",
    description:
      "India's Chandrayaan-3 mission achieves a historic soft landing near the Moon's south pole — the first nation to do so, unlocking new insights about lunar water ice.",
    agency: "ISRO",
    category: "landing",
    emoji: "🇮🇳",
  },
  {
    year: "2025+",
    title: "Artemis Program — Return to the Moon",
    description:
      "NASA's Artemis program aims to return humans to the Moon — including the first woman and first person of color — and establish a sustainable lunar base as a gateway to Mars.",
    agency: "NASA",
    category: "launch",
    emoji: "🌙",
  },
];

const CATEGORY_STYLES: Record<
  TimelineEvent["category"],
  { color: string; label: string }
> = {
  launch: { color: "#00E5FF", label: "Launch" },
  landing: { color: "#6C63FF", label: "Landing" },
  discovery: { color: "#FFC857", label: "Discovery" },
  milestone: { color: "#00FF9C", label: "Milestone" },
};

export default function TimelinePage() {
  return (
    <div className="min-h-screen" data-ocid="timeline.page">
      {/* Header */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,255,0.1) 0%, transparent 70%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan mb-4">
            History in the Making
          </p>
          <h1
            className="font-display text-4xl sm:text-6xl font-black mb-5 text-white"
            style={{ textShadow: "0 0 40px rgba(0,229,255,0.5)" }}
          >
            SPACE EXPLORATION
            <span className="block text-glow-cyan">TIMELINE</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Journey through the greatest milestones in human space history.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {(Object.keys(CATEGORY_STYLES) as TimelineEvent["category"][]).map(
              (cat) => (
                <div key={cat} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: CATEGORY_STYLES[cat].color,
                      boxShadow: `0 0 8px ${CATEGORY_STYLES[cat].color}`,
                    }}
                  />
                  <span className="text-xs text-slate-400 font-semibold">
                    {CATEGORY_STYLES[cat].label}
                  </span>
                </div>
              ),
            )}
          </div>
        </motion.div>
      </section>

      {/* Timeline */}
      <section
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        data-ocid="timeline.list"
      >
        <div className="relative">
          {/* Center line */}
          <div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,229,255,0.7) 0%, rgba(108,99,255,0.5) 50%, rgba(0,229,255,0.2) 100%)",
              boxShadow: "0 0 8px rgba(0,229,255,0.4)",
              transform: "translateX(-50%)",
            }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {TIMELINE.map((event, i) => (
              <TimelineItem key={event.year} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card max-w-2xl mx-auto p-10"
        >
          <h2 className="font-display text-2xl font-black text-white mb-3">
            The Journey Continues
          </h2>
          <p className="text-slate-400 mb-6">
            Explore the worlds that define our history and future.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/explore"
              className="cta-primary px-6 py-3 text-sm"
              data-ocid="timeline.explore_button"
            >
              Explore Planets
            </Link>
            <Link
              to="/missions"
              className="cta-secondary px-6 py-3 text-sm"
              data-ocid="timeline.missions_button"
            >
              View Missions
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function TimelineItem({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isRight = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = CATEGORY_STYLES[event.category];

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0 sm:gap-6 ${
        isRight ? "sm:flex-row" : "sm:flex-row-reverse"
      } pl-12 sm:pl-0`}
      data-ocid={`timeline.item.${index + 1}`}
    >
      {/* Dot on center line */}
      <div
        className="absolute left-2 sm:left-1/2 top-5 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10"
        style={{
          borderColor: style.color,
          backgroundColor: `${style.color}20`,
          boxShadow: `0 0 16px ${style.color}60`,
          transform: "translateX(-50%)",
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: style.color }}
        />
      </div>

      {/* Card */}
      <div
        className={`w-full sm:w-[calc(50%-2rem)] transition-all duration-700 ${
          visible
            ? "opacity-100 translate-x-0"
            : isRight
              ? "opacity-0 -translate-x-8"
              : "opacity-0 translate-x-8"
        }`}
      >
        <div className="glass-card p-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-2xl">{event.emoji}</span>
            <span
              className="font-display font-black text-xl"
              style={{
                color: style.color,
                textShadow: `0 0 16px ${style.color}60`,
              }}
            >
              {event.year}
            </span>
            <span
              className="text-xs px-2.5 py-0.5 rounded-full font-bold"
              style={{
                backgroundColor: `${style.color}18`,
                color: style.color,
                border: `1px solid ${style.color}40`,
              }}
            >
              {style.label}
            </span>
            <span className="text-xs text-slate-500 ml-auto">
              {event.agency}
            </span>
          </div>
          <h3 className="font-display font-bold text-white text-sm mb-2">
            {event.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden sm:block w-[calc(50%-2rem)]" />
    </div>
  );
}
