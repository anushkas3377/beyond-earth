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

      {/* 🌌 History of Everything */}
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

// ─────────────────────────────────────────────────────────────────────────────
// HistoryOfEverything — scroll-driven cinematic section
// ─────────────────────────────────────────────────────────────────────────────
function HistoryOfEverything() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
    <div ref={containerRef} style={{ height: `${HISTORY_ERAS.length * 120}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background transition */}
        <motion.div
          key={era.id + "-bg"}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ background: era.bg }}
        />

        {/* Canvas particles */}
        <CinematicCanvas era={era} />

        {/* Center glow */}
        <motion.div
          key={era.id + "-glow"}
          className="absolute pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2 }}
          style={{
            width: "80vw",
            height: "80vh",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse at center, ${era.glow}18 0%, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(40px)",
          }}
        />

        {/* Progress indicator */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {HISTORY_ERAS.map((e, i) => (
            <motion.div
              key={e.id}
              animate={{
                height: i === activeIndex ? 32 : 4,
                opacity: i === activeIndex ? 1 : 0.25,
              }}
              transition={{ duration: 0.4 }}
              className="w-0.5 rounded-full"
              style={{
                backgroundColor: i === activeIndex ? era.glow : "white",
                boxShadow: i === activeIndex ? `0 0 8px ${era.glow}` : "none",
              }}
            />
          ))}
        </div>

        {/* Era number */}
        <motion.div
          key={era.id + "-num"}
          className="absolute top-8 right-8 font-display font-black z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.15, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: "clamp(80px, 15vw, 180px)",
            color: era.glow,
            lineHeight: 1,
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </motion.div>

        {/* SVG Icon */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10">
          <CinematicIcon era={era} />
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8 sm:px-16 max-w-5xl mx-auto pt-32">

          {/* Year */}
          <motion.p
            key={era.id + "-year"}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xs font-black uppercase tracking-[0.4em] mb-4"
            style={{ color: era.glow }}
          >
            {era.year}
          </motion.p>

          {/* Title */}
          <motion.h2
            key={era.id + "-title"}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.2 }}
            className="font-display font-black text-white mb-3"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              lineHeight: 1.05,
              textShadow: `0 0 80px ${era.glow}50`,
            }}
          >
            {era.title}
          </motion.h2>

          {/* Subtitle line */}
          <motion.div
            key={era.id + "-line"}
            initial={{ width: 0 }}
            animate={{ width: "4rem" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-0.5 mb-4 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${era.glow}, transparent)`,
              boxShadow: `0 0 12px ${era.glow}`,
            }}
          />

          {/* Subtitle */}
          <motion.p
            key={era.id + "-sub"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.3em] mb-6"
            style={{ color: `${era.glow}cc` }}
          >
            {era.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            key={era.id + "-desc"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-slate-300 leading-relaxed max-w-2xl mb-8"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
          >
            {era.description}
          </motion.p>

          {/* Facts */}
          <motion.div
            key={era.id + "-facts"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col gap-2"
          >
            {era.facts.map((fact, i) => (
              <motion.div
                key={fact}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-3 text-sm"
              >
                <div
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: era.glow,
                    boxShadow: `0 0 6px ${era.glow}`,
                  }}
                />
                <span className="text-slate-400 font-medium">{fact}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom scroll line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
          <motion.span
            className="text-xs font-bold tracking-widest"
            style={{ color: `${era.glow}80` }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {activeIndex + 1} — {HISTORY_ERAS.length}
          </motion.span>
          <motion.div
            className="w-px h-12"
            style={{ background: `linear-gradient(to bottom, ${era.glow}, transparent)` }}
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CinematicIcon — REALISTIC detailed SVG illustrations (replaces old cartoonish icons)
// ─────────────────────────────────────────────────────────────────────────────
function CinematicIcon({ era }: { era: typeof HISTORY_ERAS[0] }) {
  const icons: Record<string, React.ReactNode> = {

    // ── BIG BANG — shockwave rings + 16 plasma jets + white-hot core ──────────
    bigbang: (
      <motion.svg width="100" height="100" viewBox="0 0 100 100"
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, type: "spring", bounce: 0.3 }}
      >
        <defs>
          <radialGradient id="bb-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={era.glow} stopOpacity="1" />
            <stop offset="40%" stopColor={era.glow} stopOpacity="0.6" />
            <stop offset="100%" stopColor={era.glow} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Expanding shockwave rings */}
        {[18, 28, 38, 46].map((r, i) => (
          <motion.circle key={i} cx="50" cy="50" r={r}
            fill="none" stroke={era.glow}
            strokeWidth={2 - i * 0.35}
            opacity={0.7 - i * 0.13}
            animate={{ r: [r, r + 6, r], opacity: [0.7 - i * 0.13, 0.3, 0.7 - i * 0.13] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3, ease: "easeInOut" }}
          />
        ))}
        {/* 16 directional plasma jets */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 22.5 * Math.PI) / 180;
          const len = i % 2 === 0 ? 44 : 30;
          return (
            <motion.line key={i}
              x1={50 + 7 * Math.cos(angle)} y1={50 + 7 * Math.sin(angle)}
              x2={50 + len * Math.cos(angle)} y2={50 + len * Math.sin(angle)}
              stroke={era.glow}
              strokeWidth={i % 2 === 0 ? 1.2 : 0.6}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 0.5], opacity: [0, 1, 0.3] }}
              transition={{ duration: 1.4, delay: 0.1 + i * 0.04, repeat: Infinity, repeatDelay: 1.2 }}
            />
          );
        })}
        {/* Core glow */}
        <motion.circle cx="50" cy="50" r="8"
          fill="url(#bb-core)"
          animate={{ r: [8, 12, 8] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ filter: `drop-shadow(0 0 14px ${era.glow})` }}
        />
        {/* White-hot centre point */}
        <circle cx="50" cy="50" r="3" fill="white" opacity="0.95" />
      </motion.svg>
    ),

    // ── STARS — bright star with diffraction spikes + dim background cluster ──
    stars: (
      <motion.svg width="100" height="100" viewBox="0 0 100 100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Background dim stars */}
        {[[12,18],[80,12],[25,75],[72,68],[88,45],[45,88],[60,30],[18,50]].map(([x,y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="1"
            fill="white"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.4, delay: i * 0.3 }}
          />
        ))}
        {/* Main star — 4 diffraction spikes */}
        <motion.g animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ repeat: Infinity, duration: 2.5 }}>
          {[0, 90, 45, 135].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const len = i < 2 ? 30 : 18;
            return (
              <motion.line key={i}
                x1={50 - len * Math.cos(rad)} y1={50 - len * Math.sin(rad)}
                x2={50 + len * Math.cos(rad)} y2={50 + len * Math.sin(rad)}
                stroke="white" strokeWidth={i < 2 ? 0.9 : 0.4}
                strokeLinecap="round" opacity={0.85}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                style={{ transformOrigin: "50px 50px" }}
              />
            );
          })}
          <circle cx="50" cy="50" r="14" fill={era.glow} opacity="0.2" />
          <circle cx="50" cy="50" r="7" fill={era.glow} opacity="0.5" />
          <circle cx="50" cy="50" r="3.5" fill="white" />
        </motion.g>
        {/* Secondary star */}
        <motion.g animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 3.5, delay: 1 }}>
          <circle cx="22" cy="28" r="4" fill={era.glow} opacity="0.35" />
          <circle cx="22" cy="28" r="2" fill="white" opacity="0.9" />
          <line x1="22" y1="20" x2="22" y2="36" stroke="white" strokeWidth="0.5" opacity="0.6" />
          <line x1="14" y1="28" x2="30" y2="28" stroke="white" strokeWidth="0.5" opacity="0.6" />
        </motion.g>
      </motion.svg>
    ),

    // ── EARTH — realistic globe with continents, atmosphere, specular highlight ─
    earth: (
      <motion.svg width="100" height="100" viewBox="0 0 100 100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <defs>
          <radialGradient id="earth-sphere" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor={era.glow} stopOpacity="0.85" />
            <stop offset="55%" stopColor={era.glow} stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000820" stopOpacity="0.95" />
          </radialGradient>
          <clipPath id="earth-clip"><circle cx="50" cy="50" r="34" /></clipPath>
          <radialGradient id="earth-highlight" cx="30%" cy="25%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Atmosphere rings */}
        <motion.circle cx="50" cy="50" r="40"
          fill="none" stroke={era.glow} strokeWidth="3" opacity="0.12"
          animate={{ opacity: [0.08, 0.18, 0.08] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <circle cx="50" cy="50" r="37" fill="none" stroke={era.glow} strokeWidth="1.5" opacity="0.18" />
        {/* Globe base */}
        <circle cx="50" cy="50" r="34" fill="url(#earth-sphere)" />
        {/* Continents — scrolling */}
        <g clipPath="url(#earth-clip)">
          <motion.g animate={{ x: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}>
            {/* Americas */}
            <path d="M38 26 C34 29 30 34 31 41 C32 47 35 51 33 57 C31 63 34 70 38 72 C41 68 44 61 43 55 C42 49 45 43 44 37 C43 31 40 24 38 26Z"
              fill={era.glow} opacity="0.55" />
            {/* Europe/Africa */}
            <path d="M55 31 C52 33 50 37 51 43 C52 47 55 50 54 56 C53 62 56 68 59 70 C62 66 63 59 62 53 C61 47 64 41 63 35 C62 29 58 27 55 31Z"
              fill={era.glow} opacity="0.5" />
            {/* Asia */}
            <path d="M68 29 C64 31 62 37 65 43 C68 47 72 45 74 51 C76 55 74 62 71 64 C74 60 77 53 76 47 C75 41 78 35 75 30 C73 26 70 26 68 29Z"
              fill={era.glow} opacity="0.52" />
            {/* Ice caps */}
            <ellipse cx="50" cy="17" rx="22" ry="6" fill="white" opacity="0.28" />
            <ellipse cx="50" cy="83" rx="17" ry="5" fill="white" opacity="0.2" />
            {/* Cloud wisps */}
            <path d="M28 40 Q37 36 46 40 Q37 44 28 40Z" fill="white" opacity="0.18" />
            <path d="M55 56 Q63 52 71 56 Q63 60 55 56Z" fill="white" opacity="0.18" />
          </motion.g>
        </g>
        {/* Specular highlight */}
        <circle cx="50" cy="50" r="34" fill="url(#earth-highlight)" />
        {/* Terminator shadow */}
        <ellipse cx="50" cy="50" rx="17" ry="34"
          fill="black" opacity="0.25" clipPath="url(#earth-clip)" />
      </motion.svg>
    ),

    // ── LIFE — realistic DNA double helix with base pairs ─────────────────────
    life: (
      <motion.svg width="100" height="100" viewBox="0 0 100 100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Base-pair rungs */}
        {[...Array(10)].map((_, i) => {
          const t = i / 9;
          const y = 10 + t * 80;
          const wave = Math.sin(t * Math.PI * 3);
          const x1 = 50 + wave * 20;
          const x2 = 50 - wave * 20;
          return (
            <g key={i}>
              <motion.line x1={x1} y1={y} x2={x2} y2={y}
                stroke={era.glow} strokeWidth="1.2" opacity="0.45"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                style={{ transformOrigin: `50px ${y}px` }}
              />
              <motion.circle cx={x1} cy={y} r="2.5"
                fill={era.glow}
                style={{ filter: `drop-shadow(0 0 4px ${era.glow})` }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
              />
              <motion.circle cx={x2} cy={y} r="2.5"
                fill={era.glow} opacity="0.65"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.65 + i * 0.08 }}
              />
            </g>
          );
        })}
        {/* Strand 1 */}
        <motion.path
          d={[...Array(20)].map((_, i) => {
            const t = i / 19;
            const y = 10 + t * 80;
            const x = 50 + Math.sin(t * Math.PI * 3) * 20;
            return `${i === 0 ? "M" : "L"}${x},${y}`;
          }).join(" ")}
          fill="none" stroke={era.glow} strokeWidth="2"
          style={{ filter: `drop-shadow(0 0 3px ${era.glow})` }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        {/* Strand 2 */}
        <motion.path
          d={[...Array(20)].map((_, i) => {
            const t = i / 19;
            const y = 10 + t * 80;
            const x = 50 - Math.sin(t * Math.PI * 3) * 20;
            return `${i === 0 ? "M" : "L"}${x},${y}`;
          }).join(" ")}
          fill="none" stroke={era.glow} strokeWidth="2" opacity="0.65"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        />
      </motion.svg>
    ),

    // ── DINOSAURS — anatomical T-Rex silhouette ───────────────────────────────
    dinosaurs: (
      <motion.svg width="100" height="100" viewBox="0 0 100 100"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, type: "spring", bounce: 0.2 }}
      >
        {/* Ground shadow */}
        <ellipse cx="52" cy="93" rx="30" ry="4" fill={era.glow} opacity="0.1" />
        {/* Body */}
        <motion.path
          d="M60 70 C62 65 65 60 68 58 C72 56 76 57 78 60 C80 63 79 68 76 70 C74 72 70 73 68 72 C66 71 64 70 62 72 C60 74 58 78 56 82 L50 85 C48 86 46 86 45 84 L48 80 C49 77 51 73 52 70 L42 71 C40 74 38 78 36 82 L30 85 C28 86 26 85 26 83 L29 79 C30 76 32 72 33 70 C34 68 34 65 33 62 C32 58 31 54 33 50 C35 46 39 44 44 44 L48 44 C51 43 54 42 56 40 C58 38 59 35 58 32 L57 26 C57 24 58 22 60 22 C64 22 68 26 70 30 C72 34 72 38 70 42 C68 45 65 47 63 50 C61 53 60 57 60 62Z"
          fill={`${era.glow}18`}
          stroke={era.glow}
          strokeWidth="1.5"
          strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 8px ${era.glow}50)` }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        {/* Head */}
        <motion.path
          d="M58 22 C60 18 65 15 70 16 C74 17 77 20 78 24 C79 27 78 30 76 32 C74 34 71 34 70 32 C69 30 70 28 70 26 C70 24 68 22 65 22Z"
          fill={`${era.glow}28`} stroke={era.glow} strokeWidth="1.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        {/* Eye */}
        <motion.circle cx="72" cy="20" r="2.2"
          fill={era.glow}
          style={{ filter: `drop-shadow(0 0 6px ${era.glow})` }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, delay: 2 }}
        />
        <circle cx="72" cy="20" r="0.9" fill="black" />
        {/* Tiny forearms */}
        <path d="M56 42 L51 47 L53 49 L58 44" fill="none" stroke={era.glow} strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
        {/* Tail */}
        <motion.path
          d="M33 62 C28 64 21 66 15 65 C11 64 10 62 12 60 C14 58 18 59 22 60 C26 61 30 62 33 62Z"
          fill={`${era.glow}12`} stroke={era.glow} strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />
        {/* Breathing */}
        <motion.ellipse cx="50" cy="55" rx="7" ry="5"
          fill="none" stroke={era.glow} strokeWidth="0.5" opacity="0.25"
          animate={{ ry: [5, 6.5, 5] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        />
      </motion.svg>
    ),

    // ── HUMANS — Vitruvian proportions with ribcage + anatomy detail ──────────
    humans: (
      <motion.svg width="100" height="100" viewBox="0 0 100 100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <defs>
          <radialGradient id="human-aura" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor={era.glow} stopOpacity="0.25" />
            <stop offset="100%" stopColor={era.glow} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="50" rx="38" ry="46" fill="url(#human-aura)" />
        {/* Head */}
        <motion.path
          d="M50 9 C43 9 38 14 38 20 C38 25 40 29 44 31 C44 34 44 37 46 38 L54 38 C56 37 56 34 56 31 C60 29 62 25 62 20 C62 14 57 9 50 9Z"
          fill={`${era.glow}22`} stroke={era.glow} strokeWidth="1.2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
        {/* Eyes */}
        <circle cx="46" cy="21" r="1.2" fill={era.glow} />
        <circle cx="54" cy="21" r="1.2" fill={era.glow} />
        {/* Neck */}
        <rect x="47" y="37" width="6" height="5" fill={`${era.glow}18`} stroke={era.glow} strokeWidth="0.8" />
        {/* Torso */}
        <motion.path
          d="M35 42 L40 42 C40 42 38 52 38 58 C38 64 40 68 40 68 L60 68 C60 68 62 64 62 58 C62 52 60 42 60 42 L65 42 C65 54 66 62 64 68 L62 74 L38 74 L36 68 C34 62 35 54 35 42Z"
          fill={`${era.glow}18`} stroke={era.glow} strokeWidth="1.2" strokeLinejoin="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        {/* Ribcage */}
        {[48, 53, 58].map((y, i) => (
          <motion.path key={i}
            d={`M40 ${y} C44 ${y + 2} 56 ${y + 2} 60 ${y}`}
            fill="none" stroke={era.glow} strokeWidth="0.7" opacity="0.3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
          />
        ))}
        {/* Arms spread */}
        <motion.line x1="36" y1="46" x2="16" y2="60"
          stroke={era.glow} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
        <motion.line x1="64" y1="46" x2="84" y2="60"
          stroke={era.glow} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        />
        <ellipse cx="15" cy="61" rx="3" ry="2" fill={era.glow} opacity="0.6" />
        <ellipse cx="85" cy="61" rx="3" ry="2" fill={era.glow} opacity="0.6" />
        {/* Legs */}
        <motion.line x1="42" y1="74" x2="36" y2="93"
          stroke={era.glow} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        />
        <motion.line x1="58" y1="74" x2="64" y2="93"
          stroke={era.glow} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        />
        <ellipse cx="34" cy="94" rx="5" ry="2" fill={era.glow} opacity="0.55" />
        <ellipse cx="66" cy="94" rx="5" ry="2" fill={era.glow} opacity="0.55" />
      </motion.svg>
    ),

    // ── CIVILIZATION — pyramid + colosseum arcs + obelisk + moon ─────────────
    civilization: (
      <motion.svg width="100" height="100" viewBox="0 0 100 100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <defs>
          <linearGradient id="civ-sky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={era.glow} stopOpacity="0.04" />
            <stop offset="100%" stopColor={era.glow} stopOpacity="0.18" />
          </linearGradient>
        </defs>
        <rect x="0" y="82" width="100" height="2" fill={era.glow} opacity="0.4" />
        <rect x="0" y="84" width="100" height="16" fill="url(#civ-sky)" />
        {/* Pyramid */}
        <motion.path d="M12 82 L30 44 L48 82Z"
          fill={`${era.glow}12`} stroke={era.glow} strokeWidth="1.2"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 0.9, type: "spring", bounce: 0.1 }}
          style={{ transformOrigin: "30px 82px" }}
        />
        {[0.3, 0.55, 0.78].map((t, i) => (
          <line key={i}
            x1={12 + (30 - 12) * t} y1={82 - (82 - 44) * t}
            x2={48 - (48 - 30) * t} y2={82 - (82 - 44) * t}
            stroke={era.glow} strokeWidth="0.5" opacity="0.3"
          />
        ))}
        {/* Colosseum */}
        <motion.path d="M52 82 C52 70 59 64 67 64 C75 64 82 70 82 82"
          fill={`${era.glow}08`} stroke={era.glow} strokeWidth="1.2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        {[56, 62, 67, 72, 78].map((x, i) => (
          <motion.line key={i} x1={x} y1={78} x2={x} y2={64 + (i === 0 || i === 4 ? 8 : 3)}
            stroke={era.glow} strokeWidth="1" opacity="0.55"
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
            style={{ transformOrigin: `${x}px 78px` }}
          />
        ))}
        {/* Obelisk */}
        <motion.path d="M87 82 L90 49 L93 82Z"
          fill={`${era.glow}18`} stroke={era.glow} strokeWidth="1"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
          style={{ transformOrigin: "90px 82px" }}
        />
        <motion.circle cx="90" cy="49" r="2"
          fill={era.glow}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ filter: `drop-shadow(0 0 6px ${era.glow})` }}
        />
        {/* Moon */}
        <motion.circle cx="20" cy="20" r="8"
          fill="none" stroke={era.glow} strokeWidth="1" opacity="0.4"
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />
        <circle cx="20" cy="20" r="6" fill={era.glow} opacity="0.15" />
      </motion.svg>
    ),

    // ── INVENTIONS — interlocking gears (counter-rotating) + lightbulb ────────
    inventions: (
      <motion.svg width="100" height="100" viewBox="0 0 100 100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Large gear */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          style={{ transformOrigin: "32px 62px" }}
        >
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const ix = 32 + 17 * Math.cos(angle);
            const iy = 62 + 17 * Math.sin(angle);
            return (
              <rect key={i} x={ix - 3} y={iy - 3} width="6" height="6" rx="1"
                fill={`${era.glow}35`} stroke={era.glow} strokeWidth="0.8"
                transform={`rotate(${i * 45} ${ix} ${iy})`}
              />
            );
          })}
          <circle cx="32" cy="62" r="13" fill={`${era.glow}12`} stroke={era.glow} strokeWidth="1.5" />
          <circle cx="32" cy="62" r="5" fill={`${era.glow}30`} stroke={era.glow} strokeWidth="1" />
          <circle cx="32" cy="62" r="2.5" fill={era.glow} />
        </motion.g>
        {/* Small counter-gear */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{ transformOrigin: "57px 62px" }}
        >
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const ix = 57 + 10 * Math.cos(angle);
            const iy = 62 + 10 * Math.sin(angle);
            return (
              <rect key={i} x={ix - 2} y={iy - 2} width="4" height="4" rx="0.5"
                fill={`${era.glow}35`} stroke={era.glow} strokeWidth="0.6"
                transform={`rotate(${i * 60} ${ix} ${iy})`}
              />
            );
          })}
          <circle cx="57" cy="62" r="8" fill={`${era.glow}12`} stroke={era.glow} strokeWidth="1" />
          <circle cx="57" cy="62" r="2.5" fill={`${era.glow}40`} />
          <circle cx="57" cy="62" r="1.2" fill={era.glow} />
        </motion.g>
        {/* Lightbulb */}
        <motion.path
          d="M76 20 C70 20 66 25 66 31 C66 36 69 40 72 42 L72 49 L80 49 L80 42 C83 40 86 36 86 31 C86 25 82 20 76 20Z"
          fill={`${era.glow}18`} stroke={era.glow} strokeWidth="1.2"
          style={{ filter: `drop-shadow(0 0 8px ${era.glow}70)` }}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        {/* Filament */}
        <motion.path d="M72 45 Q74 42 76 45 Q78 42 80 45"
          fill="none" stroke={era.glow} strokeWidth="1"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <line x1="72" y1="49" x2="80" y2="49" stroke={era.glow} strokeWidth="1" opacity="0.7" />
        <line x1="73" y1="53" x2="79" y2="53" stroke={era.glow} strokeWidth="1" opacity="0.5" />
        {/* Glow pulse */}
        <motion.circle cx="76" cy="32" r="7"
          fill={era.glow} opacity="0"
          animate={{ opacity: [0, 0.12, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.svg>
    ),

    // ── RELIGION — 12-petal mandala + 8-petal inner + hexagram + jewel ────────
    religion: (
      <motion.svg width="100" height="100" viewBox="0 0 100 100"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Outer petals — slow rotate */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          style={{ transformOrigin: "50px 50px" }}
        >
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            return (
              <ellipse key={i}
                cx={50 + 36 * Math.cos(angle)} cy={50 + 36 * Math.sin(angle)}
                rx="5" ry="9"
                fill={`${era.glow}10`} stroke={era.glow} strokeWidth="0.5" opacity="0.45"
                transform={`rotate(${i * 30} ${50 + 36 * Math.cos(angle)} ${50 + 36 * Math.sin(angle)})`}
              />
            );
          })}
        </motion.g>
        {/* Inner petals — counter rotate */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          style={{ transformOrigin: "50px 50px" }}
        >
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            return (
              <ellipse key={i}
                cx={50 + 22 * Math.cos(angle)} cy={50 + 22 * Math.sin(angle)}
                rx="3" ry="7"
                fill={`${era.glow}18`} stroke={era.glow} strokeWidth="0.7" opacity="0.65"
                transform={`rotate(${i * 45} ${50 + 22 * Math.cos(angle)} ${50 + 22 * Math.sin(angle)})`}
              />
            );
          })}
        </motion.g>
        {/* Sacred circles */}
        {[40, 28, 18, 10].map((r, i) => (
          <circle key={i} cx="50" cy="50" r={r}
            fill="none" stroke={era.glow}
            strokeWidth={0.6 + i * 0.1}
            opacity={0.2 + i * 0.1}
          />
        ))}
        {/* Hexagram */}
        {[0, 60].map((rot, i) => (
          <motion.path key={i}
            d="M50 33 L44 45 L56 45Z"
            fill={`${era.glow}18`} stroke={era.glow} strokeWidth="0.8"
            transform={`rotate(${rot} 50 50)`}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.3 + i * 0.2 }}
          />
        ))}
        {/* Central jewel */}
        <motion.circle cx="50" cy="50" r="6"
          fill={era.glow} opacity="0.35"
          animate={{ r: [6, 8, 6] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <circle cx="50" cy="50" r="3.5"
          fill={era.glow}
          style={{ filter: `drop-shadow(0 0 10px ${era.glow})` }}
        />
        <circle cx="50" cy="50" r="1.5" fill="white" opacity="0.8" />
      </motion.svg>
    ),

    // ── FUTURE — detailed spacecraft with wings, cockpit, engine plume ────────
    future: (
      <motion.svg width="100" height="100" viewBox="0 0 100 100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <defs>
          <radialGradient id="engine-fire" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor={era.glow} stopOpacity="1" />
            <stop offset="55%" stopColor={era.glow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={era.glow} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Engine exhaust plume */}
        <motion.path
          d="M44 72 C42 80 40 88 38 96 L50 90 L62 96 C60 88 58 80 56 72"
          fill="url(#engine-fire)" opacity="0.65"
          animate={{ scaleY: [1, 1.35, 0.8, 1], opacity: [0.55, 0.9, 0.45, 0.65] }}
          transition={{ repeat: Infinity, duration: 0.85, ease: "easeInOut" }}
          style={{ transformOrigin: "50px 72px" }}
        />
        {/* Wing strakes */}
        <motion.path d="M38 55 L18 72 L32 69 L38 62Z"
          fill={`${era.glow}18`} stroke={era.glow} strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        />
        <motion.path d="M62 55 L82 72 L68 69 L62 62Z"
          fill={`${era.glow}18`} stroke={era.glow} strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        />
        {/* Fuselage */}
        <motion.path
          d="M50 11 C44 17 40 29 40 43 L40 68 C40 70 44 72 50 72 C56 72 60 70 60 68 L60 43 C60 29 56 17 50 11Z"
          fill={`${era.glow}18`} stroke={era.glow} strokeWidth="1.5"
          style={{ filter: `drop-shadow(0 0 8px ${era.glow}55)` }}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        {/* Nose highlight */}
        <motion.path d="M50 11 C47 15 46 22 47 27 C48 27 52 27 53 27 C54 22 53 15 50 11Z"
          fill={era.glow} opacity="0.28"
          initial={{ opacity: 0 }} animate={{ opacity: 0.28 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        {/* Cockpit */}
        <motion.ellipse cx="50" cy="33" rx="5" ry="7"
          fill={`${era.glow}28`} stroke={era.glow} strokeWidth="1"
          style={{ filter: `drop-shadow(0 0 6px ${era.glow})` }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />
        <ellipse cx="48" cy="31" rx="2" ry="3" fill="white" opacity="0.18" />
        {/* Panel lines */}
        <line x1="50" y1="40" x2="50" y2="68" stroke={era.glow} strokeWidth="0.5" opacity="0.35" />
        <line x1="43" y1="50" x2="57" y2="50" stroke={era.glow} strokeWidth="0.5" opacity="0.35" />
        {/* Engine nozzle */}
        <ellipse cx="50" cy="70" rx="8" ry="3" fill={`${era.glow}25`} stroke={era.glow} strokeWidth="1" />
        <motion.ellipse cx="50" cy="70" rx="5" ry="2"
          fill={era.glow}
          animate={{ opacity: [0.55, 1, 0.55], ry: [2, 3, 2] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          style={{ filter: `drop-shadow(0 0 10px ${era.glow})` }}
        />
        {/* Stars */}
        {[[10,15],[85,22],[92,50],[8,70],[88,80]].map(([x,y],i) => (
          <motion.circle key={i} cx={x} cy={y} r="0.8" fill="white"
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.5, delay: i * 0.4 }}
          />
        ))}
      </motion.svg>
    ),
  };

  return (
    <div style={{ filter: `drop-shadow(0 0 24px ${era.glow}50)` }}>
      {icons[era.id] ?? null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CinematicCanvas — particle system per era
// ─────────────────────────────────────────────────────────────────────────────
function CinematicCanvas({ era }: { era: typeof HISTORY_ERAS[0] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; life: number; maxLife: number;
    };

    const particles: Particle[] = [];
    const count =
      era.id === "bigbang" ? 200 :
      era.id === "stars" ? 150 :
      era.id === "future" ? 120 : 60;

    const spawn = (): Particle => ({
      x: era.id === "bigbang" ? canvas.width / 2 : Math.random() * canvas.width,
      y: era.id === "bigbang" ? canvas.height / 2 : Math.random() * canvas.height,
      vx: era.id === "bigbang"
        ? (Math.random() - 0.5) * 6
        : era.id === "future"
        ? (Math.random() - 0.5) * 1.5
        : (Math.random() - 0.5) * 0.4,
      vy: era.id === "bigbang"
        ? (Math.random() - 0.5) * 6
        : era.id === "future"
        ? -Math.random() * 2
        : (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2.5 + 0.5,
      opacity: 0,
      life: 0,
      maxLife: 100 + Math.random() * 100,
    });

    for (let i = 0; i < count; i++) {
      const p = spawn();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let animId: number;

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    };

    const rgb = hexToRgb(era.particleColor.length === 7 ? era.particleColor : "#00E5FF");

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const lifeRatio = p.life / p.maxLife;
        p.opacity = lifeRatio < 0.2
          ? lifeRatio / 0.2
          : lifeRatio > 0.8
          ? (1 - lifeRatio) / 0.2
          : 1;
        if (p.life >= p.maxLife ||
          p.x < -10 || p.x > canvas.width + 10 ||
          p.y < -10 || p.y > canvas.height + 10) {
          Object.assign(p, spawn());
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${p.opacity * 0.7})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [era.id, era.particleColor]);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
  );
}
