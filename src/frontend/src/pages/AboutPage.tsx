import { Link } from "@tanstack/react-router";
import {
  Atom,
  Clock,
  FlaskConical,
  Globe,
  Rocket,
  Satellite,
  Telescope,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const VISION_PURPOSE = [
  {
    title: "Our Vision",
    text: "To make space exploration interactive, immersive, and accessible for everyone — transforming passive learning into an active journey through the cosmos.",
    icon: Telescope,
    accent: "#00E5FF",
  },
  {
    title: "Our Purpose",
    text: "Beyond Earth transforms curiosity into experience through simulations, missions, and real-world inspired space interactions that feel authentic and scientifically grounded.",
    icon: Rocket,
    accent: "#6C63FF",
  },
];

const FEATURES = [
  {
    emoji: "🪐",
    title: "Explore Planets",
    desc: "Navigate through realistic planetary data with orbital dynamics and surface conditions.",
    to: "/explore" as const,
    label: "Explore Now",
  },
  {
    emoji: "🧑‍🚀",
    title: "Astronaut Profiles",
    desc: "Explore the lives and missions of legendary astronauts who shaped space exploration.",
    to: "/astronauts" as const,
    label: "View Astronauts",
  },
  {
    emoji: "⏳",
    title: "Timeline Journey",
    desc: "Relive 70+ years of space milestones — from Sputnik to the James Webb Telescope.",
    to: "/timeline" as const,
    label: "View Timeline",
  },
  {
    emoji: "🚀",
    title: "Mission Builder",
    desc: "Build your own space mission — choose rocket, destination, and fuel strategy.",
    to: "/missions" as const,
    label: "Build Mission",
  },
  {
    emoji: "🔬",
    title: "Interactive Lab",
    desc: "Run real physics calculations: orbital velocity, escape velocity, and the rocket equation.",
    to: "/lab" as const,
    label: "Open Lab",
  },
];

const WHY_PLATFORM = [
  {
    icon: Atom,
    title: "Interactive Learning",
    text: "Every section is built to engage, not just inform — calculators, simulations, and mission builders make learning tactile.",
  },
  {
    icon: Satellite,
    title: "Real-world Science",
    text: "All formulas and data are sourced from actual space science — NASA standards, real planetary constants, true mission facts.",
  },
  {
    icon: Globe,
    title: "Immersive UI/UX",
    text: "Deep space aesthetics, glassmorphism cards, and cinematic animations create an interface that feels like mission control.",
  },
  {
    icon: FlaskConical,
    title: "Futuristic Design",
    text: "Orbitron typography, neon glow accents, and animated starfields build an atmosphere that transports you beyond Earth.",
  },
];

const AGENCIES_MINI = [
  {
    name: "NASA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png",
    desc: "National Aeronautics and Space Administration",
  },
  {
    name: "ISRO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/1200px-Indian_Space_Research_Organisation_Logo.svg.png",
    desc: "Indian Space Research Organisation",
  },
];

export default function AboutPage() {
  return (
    <div data-ocid="about.page" className="min-h-screen">
      {/* SECTION 1: Hero */}
      <section
        className="relative py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(0,229,255,0.08) 0%, transparent 70%)",
        }}
        data-ocid="about.hero_section"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan mb-4">
            About the Platform
          </p>
          <h1
            className="font-display text-5xl sm:text-7xl font-black mb-6 text-white"
            style={{ textShadow: "0 0 60px rgba(0,229,255,0.4)" }}
          >
            BEYOND
            <span className="block text-glow-cyan">EARTH</span>
          </h1>
          <p className="text-xl text-slate-300 mb-4 font-light tracking-wide">
            Exploring the universe beyond imagination.
          </p>
          <p className="text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto">
            Beyond Earth is a futuristic space exploration platform designed to
            make the cosmos feel tangible — through interactive tools, real
            science, and cinematic immersion.
          </p>
          <Link
            to="/explore"
            className="cta-primary px-8 py-3 text-sm"
            data-ocid="about.hero_cta"
          >
            Start Exploring
          </Link>
        </motion.div>
      </section>

      {/* SECTION 2: Vision & Purpose */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        data-ocid="about.vision_section"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="font-display text-3xl sm:text-4xl font-black text-white"
            style={{ textShadow: "0 0 30px rgba(0,229,255,0.3)" }}
          >
            Vision &amp; Purpose
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VISION_PURPOSE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="glass-card p-8"
                style={{ borderColor: `${item.accent}20` }}
                data-ocid={`about.vision_item.${i + 1}`}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `${item.accent}12`,
                    border: `1px solid ${item.accent}40`,
                    boxShadow: `0 0 24px ${item.accent}20`,
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: item.accent }}
                    strokeWidth={1.5}
                  />
                </div>
                <h3
                  className="font-display font-black text-xl mb-3"
                  style={{ color: item.accent }}
                >
                  {item.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: Inspiration */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(108,99,255,0.06), transparent)",
        }}
        data-ocid="about.inspiration_section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-display text-3xl sm:text-4xl font-black text-white mb-4"
              style={{ textShadow: "0 0 30px rgba(108,99,255,0.5)" }}
            >
              Inspired by Real Space Exploration
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Every mission, calculation, and milestone on this platform is
              grounded in actual space science from the world's leading
              agencies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {AGENCIES_MINI.map((ag, i) => (
              <MiniAgencyCard key={ag.name} agency={ag} index={i} />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/explore"
              className="cta-secondary px-8 py-3 text-sm"
              data-ocid="about.inspiration_cta"
            >
              Explore Space
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: What You Can Do */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        data-ocid="about.features_section"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="font-display text-3xl sm:text-4xl font-black text-white"
            style={{ textShadow: "0 0 30px rgba(0,229,255,0.4)" }}
          >
            What You Can Do
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-6 flex flex-col items-center text-center"
              data-ocid={`about.feature_item.${i + 1}`}
            >
              <span className="text-4xl mb-4">{feat.emoji}</span>
              <h3 className="font-display font-bold text-white text-sm mb-2">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed flex-1 mb-4">
                {feat.desc}
              </p>
              <Link
                to={feat.to}
                className="cta-primary text-xs px-4 py-2"
                data-ocid={`about.feature_link.${i + 1}`}
              >
                {feat.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Why this platform */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(0,229,255,0.05), transparent)",
        }}
        data-ocid="about.why_section"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-display text-3xl sm:text-4xl font-black text-white"
              style={{ textShadow: "0 0 30px rgba(0,229,255,0.3)" }}
            >
              Why Beyond Earth?
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_PLATFORM.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                  data-ocid={`about.why_item.${i + 1}`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: "rgba(0,229,255,0.08)",
                      border: "1px solid rgba(0,229,255,0.25)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5 text-neon-cyan"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-display font-bold text-white text-sm mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6: Closing CTA */}
      <section
        className="py-24 px-4 sm:px-6 lg:px-8 text-center"
        data-ocid="about.closing_section"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card max-w-3xl mx-auto p-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,229,255,0.06) 0%, rgba(108,99,255,0.06) 100%)",
          }}
        >
          <Clock
            className="w-10 h-10 text-neon-cyan mx-auto mb-6"
            strokeWidth={1.5}
          />
          <blockquote
            className="font-display text-xl sm:text-2xl font-bold text-white mb-6 leading-relaxed"
            style={{ textShadow: "0 0 30px rgba(0,229,255,0.3)" }}
          >
            "Space is not just something you study.
            <br />
            It's something you{" "}
            <span className="text-glow-cyan">experience</span>."
          </blockquote>
          <Link
            to="/explore"
            className="cta-primary px-10 py-3.5"
            data-ocid="about.closing_cta"
          >
            Start Your Journey
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

function MiniAgencyCard({
  agency,
  index,
}: {
  agency: { name: string; logo: string; desc: string };
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="glass-card p-6 flex items-center gap-5"
      data-ocid={`about.agency_ref.${index + 1}`}
    >
      {imgError ? (
        <span className="font-display font-black text-2xl text-neon-cyan w-16 text-center">
          {agency.name}
        </span>
      ) : (
        <img
          src={agency.logo}
          alt={`${agency.name} logo`}
          className="h-12 w-16 object-contain"
          style={{
            filter: "brightness(1.1) drop-shadow(0 0 6px rgba(0,229,255,0.3))",
          }}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      )}
      <div>
        <p className="font-display font-bold text-white text-base">
          {agency.name}
        </p>
        <p className="text-xs text-slate-400 mt-1">{agency.desc}</p>
      </div>
    </motion.div>
  );
}
