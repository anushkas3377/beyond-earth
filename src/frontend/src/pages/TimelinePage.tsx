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

// Professional SVG Icons
function CinematicIcon({ era }: { era: typeof HISTORY_ERAS[0] }) {
  const icons: Record<string, React.ReactNode> = {
    bigbang: (
      <motion.svg width="80" height="80" viewBox="0 0 80 80"
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 1.5, type: "spring" }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.line
            key={i}
            x1="40" y1="40"
            x2={40 + 35 * Math.cos((i * 30 * Math.PI) / 180)}
            y2={40 + 35 * Math.sin((i * 30 * Math.PI) / 180)}
            stroke={era.glow}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.6] }}
            transition={{ duration: 1, delay: i * 0.05 }}
          />
        ))}
        <motion.circle cx="40" cy="40" r="8"
          fill={era.glow}
          animate={{ r: [8, 12, 8], opacity: [1, 0.7, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ filter: `drop-shadow(0 0 12px ${era.glow})` }}
        />
      </motion.svg>
    ),
    stars: (
      <motion.svg width="80" height="80" viewBox="0 0 80 80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[
          { cx: 40, cy: 40, r: 6 },
          { cx: 15, cy: 20, r: 3 },
          { cx: 65, cy: 15, r: 4 },
          { cx: 20, cy: 60, r: 2.5 },
          { cx: 65, cy: 55, r: 3.5 },
          { cx: 50, cy: 25, r: 2 },
        ].map((s, i) => (
          <motion.circle key={i} cx={s.cx} cy={s.cy} r={s.r}
            fill={era.glow}
            animate={{ opacity: [0.4, 1, 0.4], r: [s.r, s.r * 1.3, s.r] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.2 }}
            style={{ filter: `drop-shadow(0 0 6px ${era.glow})` }}
          />
        ))}
      </motion.svg>
    ),
    earth: (
      <motion.svg width="80" height="80" viewBox="0 0 80 80"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        <circle cx="40" cy="40" r="35" fill="none"
          stroke={era.glow} strokeWidth="1" opacity="0.3" />
        <circle cx="40" cy="40" r="28"
          fill={`${era.glow}20`} stroke={era.glow} strokeWidth="1.5" />
        <ellipse cx="40" cy="40" rx="28" ry="10" fill="none"
          stroke={era.glow} strokeWidth="1" opacity="0.5" />
        <line x1="40" y1="12" x2="40" y2="68"
          stroke={era.glow} strokeWidth="1" opacity="0.4" />
        <motion.circle cx="68" cy="40" r="5"
          fill={era.glow}
          style={{ filter: `drop-shadow(0 0 8px ${era.glow})` }}
        />
      </motion.svg>
    ),
    life: (
      <motion.svg width="80" height="80" viewBox="0 0 80 80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.circle key={i} cx="40" cy="40"
            r={15 + i * 12} fill="none"
            stroke={era.glow} strokeWidth="1"
            animate={{ r: [15 + i * 12, 18 + i * 12, 15 + i * 12], opacity: [0.6, 0.2, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.4 }}
          />
        ))}
        <motion.circle cx="40" cy="40" r="8"
          fill={era.glow}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ filter: `drop-shadow(0 0 10px ${era.glow})` }}
        />
      </motion.svg>
    ),
    dinosaurs: (
      <motion.svg width="80" height="80" viewBox="0 0 80 80"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.ellipse cx="40" cy="55" rx="35" ry="4"
          fill={era.glow} opacity="0.2"
          animate={{ rx: [35, 32, 35], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
        {[20, 35, 50, 65].map((x, i) => (
          <motion.line key={i}
            x1={x} y1="51" x2={x} y2="65"
            stroke={era.glow} strokeWidth="4" strokeLinecap="round"
            animate={{ y1: [51, 48, 51], y2: [65, 62, 65] }}
            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.12 }}
          />
        ))}
        <motion.ellipse cx="40" cy="38" rx="22" ry="14"
          fill={`${era.glow}30`} stroke={era.glow} strokeWidth="1.5" />
        <circle cx="28" cy="33" r="3" fill={era.glow}
          style={{ filter: `drop-shadow(0 0 6px ${era.glow})` }} />
      </motion.svg>
    ),
    humans: (
      <motion.svg width="80" height="80" viewBox="0 0 80 80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <circle cx="40" cy="20" r="10"
          fill={`${era.glow}30`} stroke={era.glow} strokeWidth="1.5" />
        <motion.line x1="40" y1="30" x2="40" y2="55"
          stroke={era.glow} strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.line x1="22" y1="40" x2="58" y2="40"
          stroke={era.glow} strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
        <motion.line x1="40" y1="55" x2="28" y2="70"
          stroke={era.glow} strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        />
        <motion.line x1="40" y1="55" x2="52" y2="70"
          stroke={era.glow} strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        />
      </motion.svg>
    ),
    civilization: (
      <motion.svg width="80" height="80" viewBox="0 0 80 80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[
          { x: 10, w: 12, h: 30 },
          { x: 26, w: 12, h: 45 },
          { x: 42, w: 12, h: 35 },
          { x: 58, w: 12, h: 50 },
        ].map((b, i) => (
          <motion.rect key={i}
            x={b.x} y={70 - b.h} width={b.w} height={b.h}
            fill={`${era.glow}25`} stroke={era.glow} strokeWidth="1"
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: i * 0.15, type: "spring" }}
            style={{ transformOrigin: `${b.x + b.w / 2}px 70px` }}
          />
        ))}
        <line x1="5" y1="70" x2="75" y2="70"
          stroke={era.glow} strokeWidth="1.5" opacity="0.6" />
      </motion.svg>
    ),
    inventions: (
      <motion.svg width="80" height="80" viewBox="0 0 80 80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[
          { x1: 10, y1: 40, x2: 30, y2: 40 },
          { x1: 50, y1: 40, x2: 70, y2: 40 },
          { x1: 40, y1: 10, x2: 40, y2: 30 },
          { x1: 40, y1: 50, x2: 40, y2: 70 },
          { x1: 18, y1: 18, x2: 30, y2: 30 },
          { x1: 50, y1: 50, x2: 62, y2: 62 },
        ].map((l, i) => (
          <motion.line key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={era.glow} strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
        <motion.circle cx="40" cy="40" r="10"
          fill={`${era.glow}30`} stroke={era.glow} strokeWidth="2"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          style={{ filter: `drop-shadow(0 0 10px ${era.glow})` }}
        />
        <circle cx="40" cy="40" r="4" fill={era.glow} />
      </motion.svg>
    ),
    religion: (
      <motion.svg width="80" height="80" viewBox="0 0 80 80"
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.line key={i}
            x1="40" y1="40"
            x2={40 + 32 * Math.cos((angle * Math.PI) / 180)}
            y2={40 + 32 * Math.sin((angle * Math.PI) / 180)}
            stroke={era.glow} strokeWidth="1"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}
        {[12, 22, 32].map((r, i) => (
          <circle key={i} cx="40" cy="40" r={r}
            fill="none" stroke={era.glow}
            strokeWidth="0.8" opacity={0.6 - i * 0.15}
          />
        ))}
        <circle cx="40" cy="40" r="5"
          fill={era.glow}
          style={{ filter: `drop-shadow(0 0 8px ${era.glow})` }}
        />
      </motion.svg>
    ),
    future: (
      <motion.svg width="80" height="80" viewBox="0 0 80 80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.ellipse cx="40" cy="55" rx="30" ry="8"
          fill="none" stroke={era.glow} strokeWidth="1" opacity="0.4"
          animate={{ rx: [30, 28, 30] }}
          transition={{ repeat: Infinity, duration: 3 }}
        />
        <motion.ellipse cx="40" cy="55" rx="20" ry="5"
          fill="none" stroke={era.glow} strokeWidth="1" opacity="0.6"
          animate={{ rx: [20, 18, 20] }}
          transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
        />
        <motion.path
          d="M40 15 L28 45 L40 40 L52 45 Z"
          fill={`${era.glow}40`} stroke={era.glow} strokeWidth="1.5"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          style={{ filter: `drop-shadow(0 0 10px ${era.glow})` }}
        />
        <motion.circle cx="40" cy="42"
          r="3" fill={era.glow}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </motion.svg>
    ),
  };

  return (
    <div style={{ filter: `drop-shadow(0 0 20px ${era.glow}60)` }}>
      {icons[era.id] ?? null}
    </div>
  );
}

// Cinematic particle canvas
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}