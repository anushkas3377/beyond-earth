import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const HISTORY_ERAS = [
  {
    id: "bigbang",
    emoji: "💥",
    year: "13.8 Billion Years Ago",
    title: "The Big Bang",
    subtitle: "Everything from Nothing",
    description:
      "The universe began as an infinitely hot, dense point — smaller than an atom. In a fraction of a second, it expanded faster than light itself. Within 3 minutes, hydrogen and helium formed. This was the birth of space, time, energy, and matter.",
    facts: ["Temperature: 10³² degrees", "Size: smaller than an atom", "Duration of expansion: 10⁻³² seconds"],
    bg: "radial-gradient(ellipse at center, #1a0a00 0%, #000000 70%)",
    glow: "#FF6B00",
    particleColor: "#FF8C00",
  },
  {
    id: "stars",
    emoji: "⭐",
    year: "13 Billion Years Ago",
    title: "First Stars & Galaxies",
    subtitle: "Light in the Darkness",
    description:
      "Gravity pulled hydrogen clouds together until nuclear fusion ignited — the first stars blazed to life. These massive stars forged carbon, oxygen, iron inside them. When they exploded as supernovas, they scattered these elements across space — the building blocks of life.",
    facts: ["First stars: 100x larger than our Sun", "Milky Way formed 13.6 billion years ago", "100 billion galaxies exist in observable universe"],
    bg: "radial-gradient(ellipse at center, #0a0a2e 0%, #000000 70%)",
    glow: "#FFD700",
    particleColor: "#FFD700",
  },
  {
    id: "earth",
    emoji: "🌍",
    year: "4.5 Billion Years Ago",
    title: "Earth Is Born",
    subtitle: "Our Pale Blue Dot",
    description:
      "A cloud of gas and dust around our young Sun collapsed and clumped together. Countless collisions formed Earth over millions of years. A Mars-sized object crashed into early Earth — debris from this collision formed our Moon. Slowly, oceans appeared as comets delivered water.",
    facts: ["Earth formed in ~10-20 million years", "Moon formed from giant impact", "First oceans: 4.4 billion years ago"],
    bg: "radial-gradient(ellipse at center, #0a1a2e 0%, #000000 70%)",
    glow: "#00A8FF",
    particleColor: "#00A8FF",
  },
  {
    id: "life",
    emoji: "🦠",
    year: "3.8 Billion Years Ago",
    title: "First Life Appears",
    subtitle: "Chemistry Becomes Biology",
    description:
      "In deep ocean hydrothermal vents, chemical reactions produced the first self-replicating molecules. Single-celled bacteria appeared — invisible yet revolutionary. For 2 billion years, bacteria ruled Earth. Then cyanobacteria invented photosynthesis, filling the atmosphere with oxygen — forever changing the planet.",
    facts: ["First life: single-celled bacteria", "Photosynthesis invented 2.7 billion years ago", "Oxygen atmosphere created 'Great Oxidation Event'"],
    bg: "radial-gradient(ellipse at center, #001a0a 0%, #000000 70%)",
    glow: "#00FF9C",
    particleColor: "#00FF9C",
  },
  {
    id: "dinosaurs",
    emoji: "🦕",
    year: "230 Million Years Ago",
    title: "Age of Dinosaurs",
    subtitle: "Giants Rule the Earth",
    description:
      "After the Permian extinction wiped out 96% of species, dinosaurs emerged and dominated for 165 million years. They ranged from chicken-sized raptors to 30-meter giants. Then 66 million years ago, a 10km asteroid struck Mexico — dust blocked sunlight, temperatures plummeted, and 75% of all species vanished.",
    facts: ["Dinosaurs existed for 165 million years", "Asteroid was 10km wide", "75% of species went extinct"],
    bg: "radial-gradient(ellipse at center, #1a0a1a 0%, #000000 70%)",
    glow: "#9B59B6",
    particleColor: "#9B59B6",
  },
  {
    id: "humans",
    emoji: "🧬",
    year: "300,000 Years Ago",
    title: "Homo Sapiens Emerge",
    subtitle: "The Thinking Animal",
    description:
      "After the dinosaurs, mammals thrived. Primates evolved, then apes, then hominids. Homo sapiens appeared in Africa 300,000 years ago with a unique gift — complex language and abstract thinking. We learned to use fire, create art, bury our dead, and imagine things that don't exist yet. This imagination changed everything.",
    facts: ["Homo sapiens: 300,000 years old", "Language evolved ~100,000 years ago", "We share 98.7% DNA with chimpanzees"],
    bg: "radial-gradient(ellipse at center, #1a1000 0%, #000000 70%)",
    glow: "#FF8C00",
    particleColor: "#FFA500",
  },
  {
    id: "civilization",
    emoji: "🏛️",
    year: "10,000 Years Ago",
    title: "Civilization Begins",
    subtitle: "From Nomads to Cities",
    description:
      "Humans discovered agriculture — suddenly food could be stored. Villages became cities. In Mesopotamia (modern Iraq), the world's first cities like Uruk appeared. Writing was invented to track grain. Laws were written. Rulers emerged. Trade routes connected distant cultures. The Indus Valley civilization built cities with indoor plumbing 4,000 years ago.",
    facts: ["Agriculture began 10,000 years ago", "First city: Uruk, 5,000 years ago", "Indus Valley had indoor plumbing 4,000 years ago"],
    bg: "radial-gradient(ellipse at center, #0a0a1a 0%, #000000 70%)",
    glow: "#F39C12",
    particleColor: "#F39C12",
  },
  {
    id: "inventions",
    emoji: "⚡",
    year: "Last 5,000 Years",
    title: "Age of Inventions",
    subtitle: "Human Genius Unleashed",
    description:
      "The wheel, writing, mathematics, the printing press, steam engine, electricity, telephone, antibiotics, computers, internet — each invention built upon the last. The Industrial Revolution transformed human life in 200 years more than the previous 10,000. Today, AI is beginning another transformation we cannot yet fully imagine.",
    facts: ["Printing press: 1440 AD — democratized knowledge", "Electricity harnessed: 1800s", "Internet connected humanity: 1990s"],
    bg: "radial-gradient(ellipse at center, #00001a 0%, #000000 70%)",
    glow: "#00E5FF",
    particleColor: "#00E5FF",
  },
  {
    id: "religion",
    emoji: "🕌",
    year: "Throughout History",
    title: "Religion & Caste",
    subtitle: "Making Sense of Existence",
    description:
      "Early humans, facing death, disease, and natural disasters, created stories to explain the unknown. Animism — spirits in trees, rivers, animals — was humanity's first religion. This evolved into polytheism, then monotheism. Hinduism (4,000 years), Buddhism (2,500 years), Christianity (2,000 years), Islam (1,400 years) each offered answers to life's deepest questions. The caste system, originally a division of labor, became hereditary and rigid — a complex social structure still debated today.",
    facts: ["Hinduism is world's oldest living religion", "Caste system originally based on occupation", "2.4 billion people identify as Christian today"],
    bg: "radial-gradient(ellipse at center, #1a0505 0%, #000000 70%)",
    glow: "#E74C3C",
    particleColor: "#E74C3C",
  },
  {
    id: "future",
    emoji: "🚀",
    year: "Today & Beyond",
    title: "The Next Chapter",
    subtitle: "Where Are We Going?",
    description:
      "In 100 years, we went from the first airplane to landing on the Moon. Today we face climate change, AI revolution, and the possibility of becoming a multi-planetary species. Mars colonization, quantum computing, genetic engineering — the next century may be the most transformative in human history. The question is no longer 'can we?' but 'should we, and how?'",
    facts: ["Mars mission planned for 2030s", "AI may exceed human intelligence this century", "8 billion humans alive today"],
    bg: "radial-gradient(ellipse at center, #000a1a 0%, #000000 70%)",
    glow: "#6C63FF",
    particleColor: "#6C63FF",
  },
];

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

  {/* 🌌 NEW — History of Everything */}
  <HistoryOfEverything />

  {/* Divider */}
  <div className="py-16 text-center"
    style={{ background: "radial-gradient(ellipse at center, rgba(0,229,255,0.05) 0%, transparent 70%)" }}>
    <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Now witness what humanity did next</p>
    <h2 className="font-display text-3xl font-black text-white">
      Space Exploration <span className="text-neon-cyan">Timeline</span>
    </h2>
  </div>

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
function HistoryOfEverything() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalHeight = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalHeight));
      const index = Math.min(
        Math.floor(progress * HISTORY_ERAS.length),
        HISTORY_ERAS.length - 1
      );
      setActiveIndex(index);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const era = HISTORY_ERAS[activeIndex];

  return (
    <div ref={containerRef} style={{ height: `${HISTORY_ERAS.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Background */}
        <motion.div
          className="absolute inset-0 transition-all duration-1000"
          style={{ background: era.bg }}
          key={era.id + "-bg"}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 50%, ${era.glow}15 0%, transparent 70%)`,
          }}
          key={era.id + "-glow"}
        />

        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          {HISTORY_ERAS.map((e, i) => (
            <div
              key={e.id}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === activeIndex ? era.glow : "rgba(255,255,255,0.2)",
                boxShadow: i === activeIndex ? `0 0 8px ${era.glow}` : "none",
                transform: i === activeIndex ? "scale(1.5)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center max-w-4xl mx-auto">

          {/* Emoji */}
          <motion.div
            key={era.id + "-emoji"}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-7xl sm:text-8xl mb-6"
          >
            {era.emoji}
          </motion.div>

          {/* Year badge */}
          <motion.div
            key={era.id + "-year"}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
            style={{
              backgroundColor: `${era.glow}20`,
              border: `1px solid ${era.glow}50`,
              color: era.glow,
            }}
          >
            {era.year}
          </motion.div>

          {/* Title */}
          <motion.h2
            key={era.id + "-title"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-black text-white mb-2"
            style={{ textShadow: `0 0 40px ${era.glow}60` }}
          >
            {era.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            key={era.id + "-sub"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm font-semibold uppercase tracking-widest mb-6"
            style={{ color: era.glow }}
          >
            {era.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            key={era.id + "-desc"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8"
          >
            {era.description}
          </motion.p>

          {/* Facts */}
          <motion.div
            key={era.id + "-facts"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {era.facts.map((fact) => (
              <div
                key={fact}
                className="px-4 py-2 rounded-lg text-xs font-semibold"
                style={{
                  backgroundColor: `${era.glow}10`,
                  border: `1px solid ${era.glow}30`,
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                ✦ {fact}
              </div>
            ))}
          </motion.div>

          {/* Counter */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-xs text-slate-500">
              {activeIndex + 1} / {HISTORY_ERAS.length}
            </span>
            <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${era.glow}, transparent)` }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}