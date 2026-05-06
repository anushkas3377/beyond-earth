import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  FlaskConical,
  Globe2,
  Rocket,
  Timer,
} from "lucide-react";
import { motion } from "motion/react";

const EARTH_IMG = "/assets/generated/earth-hero.dim_1200x1200.jpg";
const MOON_IMG = "/assets/generated/moon-hero.dim_600x600.jpg";

const FEATURES = [
  {
    icon: Globe2,
    title: "Explore Planets",
    description:
      "Journey through our solar system and discover the secrets of each planet.",
    to: "/explore",
    cta: "Explore Now",
    color: "#00E5FF",
    ocid: "home.explore_planets_card",
    gradient: "rgba(0,229,255,0.12)",
    border: "rgba(0,229,255,0.25)",
  },
  {
    icon: Rocket,
    title: "Meet the Astronauts",
    description:
      "Explore the lives and missions of legendary astronauts who shaped space exploration.",
    to: "/astronauts",
    cta: "View Astronauts",
    color: "#6C63FF",
    ocid: "home.astronaut_card",
    gradient: "rgba(108,99,255,0.12)",
    border: "rgba(108,99,255,0.25)",
  },
  {
    icon: Timer,
    title: "Travel Through Time",
    description:
      "Follow the greatest milestones in the history of human space exploration.",
    to: "/timeline",
    cta: "Start Journey",
    color: "#FFC857",
    ocid: "home.timeline_card",
    gradient: "rgba(255,200,87,0.10)",
    border: "rgba(255,200,87,0.22)",
  },
];

const LAB_TOOLS = [
  { name: "Orbital Velocity", formula: "v = \u221a(GM/r)", color: "#00E5FF" },
  { name: "Escape Velocity", formula: "v = \u221a(2GM/r)", color: "#6C63FF" },
  {
    name: "Rocket Equation",
    formula: "\u0394v = ve\u00b7ln(m\u2080/mf)",
    color: "#FFC857",
  },
];

const STATS = [
  { value: "60+", label: "Years of Exploration" },
  { value: "500+", label: "Humans in Space" },
  { value: "12", label: "Moon Walkers" },
  { value: "3", label: "Active Mars Rovers" },
];

const AGENCIES = [
  {
    name: "NASA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/120px-NASA_logo.svg.png",
    desc: "Pioneering space exploration since 1958, from Apollo to the James Webb Space Telescope.",
    color: "#00E5FF",
  },
  {
    name: "ISRO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Indian_Space_Research_Organisation_Logo.svg/120px-Indian_Space_Research_Organisation_Logo.svg.png",
    desc: "India's space agency leading Chandrayaan and Mangalyaan missions to the Moon and Mars.",
    color: "#6C63FF",
  },
];

export default function HomePage() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div data-ocid="home.page">
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        data-ocid="home.hero_section"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,80,160,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 20% 30%, rgba(108,99,255,0.12) 0%, transparent 60%), #0B0F1A",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left: Text */}
            <div className="flex-1 text-center lg:text-left z-10 min-w-0">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-xs font-semibold uppercase tracking-widest text-neon-cyan mb-5"
              >
                Space Exploration Platform
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
                style={{ textShadow: "0 0 60px rgba(0,229,255,0.35)" }}
              >
                Step Beyond
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Earth
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="text-slate-400 text-lg leading-relaxed max-w-xl mb-10"
              >
                Explore planets, travel through time, and experience the
                universe like never before.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-10"
              >
                <Link
                  to="/explore"
                  className="cta-primary px-9 py-3.5 text-sm"
                  data-ocid="home.start_exploration_button"
                >
                  Start Exploration
                </Link>
                <Link
                  to="/lab"
                  className="cta-secondary px-9 py-3.5 text-sm"
                  data-ocid="home.try_lab_button"
                >
                  Try Interactive Lab
                </Link>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0.4, 0.7] }}
                transition={{
                  delay: 1,
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                onClick={scrollToFeatures}
                type="button"
                className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-neon-cyan transition-colors cursor-pointer group"
                data-ocid="home.scroll_hint_button"
              >
                Scroll to begin your journey
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </motion.button>
            </div>

            {/* Right: Earth */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.15 }}
              className="flex-shrink-0 relative"
            >
              {/* Outer glow rings */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 22,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-40px",
                  border: "1px solid rgba(0,229,255,0.18)",
                  boxShadow: "0 0 20px rgba(0,229,255,0.08) inset",
                }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 38,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: "-70px",
                  border: "1px solid rgba(108,99,255,0.12)",
                }}
              />
              {/* Earth sphere */}
              <div
                className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px] rounded-full overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 80px rgba(0,100,255,0.45), 0 0 160px rgba(0,100,255,0.2), 0 0 260px rgba(0,229,255,0.1)",
                }}
              >
                <motion.img
                  src={EARTH_IMG}
                  alt="Earth from Apollo 17"
                  className="w-full h-full object-cover"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{ willChange: "transform" }}
                />
                {/* Atmosphere overlay */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(circle, transparent 55%, rgba(0,40,120,0.55) 80%, rgba(0,10,40,0.8) 100%)",
                  }}
                />
              </div>
              {/* Atmosphere glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, transparent 42%, rgba(0,100,220,0.18) 65%, rgba(0,229,255,0.06) 80%, transparent 95%)",
                }}
              />

              {/* Moon orbiting Earth */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 18,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="absolute pointer-events-none"
                style={{ inset: "-90px" }}
              >
                <div className="absolute" style={{ top: "10%", right: "6%" }}>
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden"
                    style={{
                      boxShadow:
                        "0 0 20px rgba(180,180,200,0.45), 0 0 40px rgba(180,180,200,0.18)",
                    }}
                  >
                    <img
                      src={MOON_IMG}
                      alt="Moon"
                      className="w-full h-full object-cover"
                      style={{ filter: "brightness(0.92) contrast(1.05)" }}
                    />
                  </div>
                  <p
                    className="text-center text-[9px] font-display font-bold mt-1 tracking-widest"
                    style={{
                      color: "rgba(180,200,230,0.7)",
                      textShadow: "0 0 8px rgba(180,200,230,0.5)",
                    }}
                  >
                    MOON
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #0B0F1A, transparent)",
          }}
        />
      </section>

      {/* ── STATS BAR ── */}
      <section
        className="py-8"
        style={{
          background: "rgba(0,229,255,0.025)",
          borderTop: "1px solid rgba(0,229,255,0.08)",
          borderBottom: "1px solid rgba(0,229,255,0.08)",
        }}
        data-ocid="home.stats_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
                data-ocid={`home.stat.${i + 1}`}
              >
                <p
                  className="font-display text-3xl font-black mb-0.5"
                  style={{
                    background: "linear-gradient(135deg, #00E5FF, #6C63FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500 tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ── */}
      <section
        id="features"
        className="py-28"
        data-ocid="home.features_section"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(108,99,255,0.06) 0%, transparent 70%), #0B0F1A",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              className="font-display text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ textShadow: "0 0 30px rgba(0,229,255,0.2)" }}
            >
              Explore the Universe Like Never Before
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Three immersive tools to explore, simulate, and discover the
              cosmos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14 }}
                  className="flex flex-col gap-5 p-7 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradient} 0%, rgba(255,255,255,0.025) 100%)`,
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: `1px solid ${feature.border}`,
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: `0 0 32px ${feature.color}30, 0 16px 48px rgba(0,0,0,0.5)`,
                  }}
                  data-ocid={feature.ocid}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${feature.color}18`,
                      border: `1px solid ${feature.color}35`,
                      boxShadow: `0 0 16px ${feature.color}20`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{
                        color: feature.color,
                        filter: `drop-shadow(0 0 6px ${feature.color}80)`,
                      }}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-display font-bold text-lg text-white mb-2"
                      style={{ letterSpacing: "0.03em" }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <Link
                    to={feature.to}
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3"
                    style={{ color: feature.color }}
                    data-ocid={`${feature.ocid}.cta`}
                  >
                    {feature.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MISSION BUILDER PREVIEW ── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(108,99,255,0.12) 0%, rgba(0,10,30,0.8) 40%, rgba(108,99,255,0.08) 100%), #080c15",
          borderTop: "1px solid rgba(108,99,255,0.15)",
          borderBottom: "1px solid rgba(108,99,255,0.15)",
        }}
        data-ocid="home.mission_section"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 mx-auto"
              style={{
                background: "rgba(108,99,255,0.15)",
                border: "1px solid rgba(108,99,255,0.35)",
                boxShadow: "0 0 30px rgba(108,99,255,0.3)",
              }}
            >
              <Rocket
                className="w-8 h-8"
                style={{
                  color: "#6C63FF",
                  filter: "drop-shadow(0 0 10px rgba(108,99,255,0.8))",
                }}
                strokeWidth={1.5}
              />
            </div>
            <h2
              className="font-display text-3xl md:text-5xl font-black text-white mb-5"
              style={{ textShadow: "0 0 40px rgba(108,99,255,0.35)" }}
            >
              Build Your Own Space Mission
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              Choose your rocket, destination, and fuel — then launch into the
              cosmos. Will you succeed?
            </p>
            <Link
              to="/missions"
              className="cta-primary px-12 py-4 text-sm"
              data-ocid="home.launch_mission_button"
            >
              Launch a Mission
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── INTERACTIVE LAB PREVIEW ── */}
      <section
        className="py-28"
        data-ocid="home.lab_section"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 50%, rgba(0,229,255,0.05) 0%, transparent 60%), #0B0F1A",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 min-w-0"
            >
              <div
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
                style={{
                  background: "rgba(0,229,255,0.1)",
                  border: "1px solid rgba(0,229,255,0.25)",
                  boxShadow: "0 0 20px rgba(0,229,255,0.2)",
                }}
              >
                <FlaskConical
                  className="w-7 h-7 text-neon-cyan"
                  strokeWidth={1.5}
                  style={{ filter: "drop-shadow(0 0 8px rgba(0,229,255,0.7))" }}
                />
              </div>
              <h2
                className="font-display text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ textShadow: "0 0 24px rgba(0,229,255,0.2)" }}
              >
                Interactive Space Lab
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-md">
                Real physics. Real formulas. Input values and get instant space
                science results — orbital mechanics, escape velocities, and
                more.
              </p>
              <Link
                to="/lab"
                className="cta-primary px-9 py-3.5 text-sm"
                data-ocid="home.open_lab_button"
              >
                Open Lab
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 w-full"
            >
              <div className="flex flex-col gap-4">
                {LAB_TOOLS.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between py-4 px-5 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${tool.color}0A 0%, rgba(255,255,255,0.025) 100%)`,
                      border: `1px solid ${tool.color}20`,
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          background: tool.color,
                          boxShadow: `0 0 8px ${tool.color}`,
                        }}
                      />
                      <span className="text-sm font-semibold text-white">
                        {tool.name}
                      </span>
                    </div>
                    <code
                      className="text-xs font-mono"
                      style={{
                        color: tool.color,
                        textShadow: `0 0 10px ${tool.color}60`,
                      }}
                    >
                      {tool.formula}
                    </code>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SPACE INSPIRATION ── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: "rgba(0,229,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
        data-ocid="home.agencies_section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-display text-2xl md:text-3xl font-bold text-white mb-3"
              style={{ textShadow: "0 0 20px rgba(0,229,255,0.15)" }}
            >
              Inspired by Real Space Exploration
            </h2>
            <p className="text-slate-400 mb-12 max-w-md mx-auto">
              Beyond Earth draws inspiration from real-world mission data and
              discoveries by the world's leading space organizations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {AGENCIES.map((agency, i) => (
                <motion.div
                  key={agency.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="flex flex-col items-center gap-4 p-7 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${agency.color}20`,
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  whileHover={{
                    borderColor: `${agency.color}50`,
                    boxShadow: `0 0 28px ${agency.color}18`,
                    y: -4,
                  }}
                  data-ocid={`home.agency.${i + 1}`}
                >
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center p-3"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: `1px solid ${agency.color}20`,
                    }}
                  >
                    <img
                      src={agency.logo}
                      alt={`${agency.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <h3
                      className="font-display font-bold text-lg mb-2"
                      style={{ color: agency.color }}
                    >
                      {agency.name}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {agency.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/about"
              className="cta-secondary px-9 py-3.5 text-sm"
              data-ocid="home.learn_more_button"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="py-36 relative overflow-hidden"
        data-ocid="home.cta_section"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,229,255,0.1) 0%, rgba(108,99,255,0.08) 40%, transparent 70%), #0B0F1A",
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <div
            style={{
              width: "500px",
              height: "300px",
              background:
                "radial-gradient(ellipse, rgba(0,229,255,0.12) 0%, rgba(108,99,255,0.08) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="font-display text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
              style={{ textShadow: "0 0 60px rgba(0,229,255,0.3)" }}
            >
              Ready to explore
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                beyond Earth?
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-md mx-auto">
              The universe is waiting. Start your journey today.
            </p>
            <Link
              to="/explore"
              className="cta-primary px-14 py-4 text-base"
              data-ocid="home.final_cta_button"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
