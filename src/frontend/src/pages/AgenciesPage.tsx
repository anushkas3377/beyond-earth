import { Link } from "@tanstack/react-router";
import { ExternalLink, Globe, Microscope, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Agency {
  name: string;
  description: string;
  website: string;
  logoUrl: string;
  founded: string;
  country: string;
  missions: string[];
  accentColor: string;
}

const AGENCIES: Agency[] = [
  {
    name: "NASA",
    description:
      "NASA leads the US space program with landmark missions including Apollo, Hubble, Mars rovers, and the International Space Station. With over 60 years of spaceflight experience, NASA continues to push the boundaries of human knowledge.",
    website: "https://www.nasa.gov",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg",
    founded: "1958",
    country: "🇺🇸 United States",
    missions: [
      "Apollo 11",
      "Hubble Space Telescope",
      "Mars Perseverance",
      "James Webb Space Telescope",
    ],
    accentColor: "#0B3D91",
  },
  {
    name: "ISRO",
    description:
      "India's space agency known for cost-effective missions including Chandrayaan moon missions and Mangalyaan Mars Orbiter. ISRO made history in 2023 by landing near the Moon's south pole with Chandrayaan-3.",
    website: "https://www.isro.gov.in",
    logoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg",
    founded: "1969",
    country: "🇮🇳 India",
    missions: ["Chandrayaan-3", "Mangalyaan", "Aditya-L1", "PSLV-C37"],
    accentColor: "#FF6B00",
  },
  {
    name: "ESA",
    description:
      "The European Space Agency coordinates Europe's space activities, operating Earth observation satellites, deep space probes, and contributing to the International Space Station.",
    website: "https://www.esa.int",
    logoUrl:
      "/assets/images/esa.png",
    founded: "1975",
    country: "🇪🇺 Europe",
    missions: ["Rosetta", "Gaia", "Mars Express", "Sentinel Earth Observation"],
    accentColor: "#003399",
  },
  {
    name: "Roscosmos",
    description:
      "Russia's space agency with a legacy going back to Sputnik and Yuri Gagarin. Roscosmos has been pivotal in human spaceflight, operating the Soyuz launch vehicles that served as the main crew transport to the ISS.",
    website: "https://en.wikipedia.org/wiki/Roscosmos",
    logoUrl:
     "/assets/images/roscosmos.png",
    founded: "1992",
    country: "🇷🇺 Russia",
    missions: ["Sputnik 1", "Vostok 1", "Soyuz", "Progress Cargo"],
    accentColor: "#CC0000",
  },
  {
    name: "CNSA",
    description:
      "China's rapidly growing space program with lunar exploration, the Tiangong space station, and the Tianwen Mars mission. CNSA has become a major force in global space exploration.",
    website: "http://www.cnsa.gov.cn",
    logoUrl:
      "/assets/images/cnsa.png",
    founded: "1993",
    country: "🇨🇳 China",
    missions: [
      "Chang'e Lunar",
      "Tianwen-1 Mars",
      "Tiangong Station",
      "Shenzhou Crewed",
    ],
    accentColor: "#DE2910",
  },
];

const WHY_MATTERS = [
  {
    icon: Microscope,
    title: "Scientific Discovery",
    text: "Space agencies push the boundaries of human knowledge — from understanding black holes to discovering potential signs of life beyond Earth.",
  },
  {
    icon: Globe,
    title: "Future of Humanity",
    text: "Establishing sustainable human presence beyond Earth is the ultimate insurance for the long-term survival of our civilization.",
  },
  {
    icon: Users,
    title: "Global Cooperation",
    text: "The ISS demonstrates that even rival nations can collaborate when the mission is humanity's advancement into the cosmos.",
  },
  {
    icon: Zap,
    title: "Technology Innovation",
    text: "From GPS to memory foam, NASA-derived technologies permeate modern life — space investment pays dividends on Earth.",
  },
];

const FEATURED_MISSIONS = [
  {
    title: "Apollo Moon Landing",
    desc: "July 20, 1969 — Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon in humanity's greatest technological achievement.",
    agency: "NASA",
    link: "https://www.nasa.gov/mission/apollo-11/",
    year: "1969",
  },
  {
    title: "Mars Perseverance",
    desc: "Currently exploring Jezero Crater, NASA's most advanced Mars rover searches for signs of ancient microbial life and collects rock samples.",
    agency: "NASA",
    link: "https://mars.nasa.gov/mars2020/",
    year: "2021–now",
  },
  {
    title: "Chandrayaan-3",
    desc: "India's historic mission that achieved a successful soft landing near the Moon's south pole in August 2023 — a first for any nation.",
    agency: "ISRO",
    link: "https://www.isro.gov.in/Chandrayaan3_New.html",
    year: "2023",
  },
];

export default function AgenciesPage() {
  return (
    <div data-ocid="agencies.page" className="min-h-screen">
      {/* Hero Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(108,99,255,0.18) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan mb-4">
            Global Organizations
          </p>
          <h1
            className="font-display text-4xl sm:text-6xl font-black mb-5 text-white"
            style={{ textShadow: "0 0 40px rgba(108,99,255,0.6)" }}
          >
            GLOBAL SPACE
            <span className="block text-glow-cyan">AGENCIES</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Meet the organizations shaping humanity's journey beyond Earth.
          </p>
        </motion.div>
      </section>

      {/* Agencies Grid */}
      <section
        className="px-4 sm:px-6 lg:px-8 pb-20 max-w-7xl mx-auto"
        data-ocid="agencies.grid"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {AGENCIES.map((agency, i) => (
            <AgencyCard key={agency.name} agency={agency} index={i} />
          ))}
        </div>
      </section>

      {/* Why Space Agencies Matter */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(108,99,255,0.06) 50%, transparent 100%)",
        }}
        data-ocid="agencies.why_section"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="font-display text-3xl sm:text-4xl font-black text-white mb-4"
              style={{ textShadow: "0 0 30px rgba(0,229,255,0.4)" }}
            >
              Why Space Agencies Matter
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              From scientific breakthroughs to global cooperation, space
              agencies drive progress for all of humanity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_MATTERS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 text-center"
                  data-ocid={`agencies.why_item.${i + 1}`}
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{
                      background: "rgba(0,229,255,0.1)",
                      border: "1px solid rgba(0,229,255,0.3)",
                      boxShadow: "0 0 20px rgba(0,229,255,0.15)",
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

      {/* Featured Missions */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        data-ocid="agencies.missions_section"
      >
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
            Featured Missions
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Landmark achievements that redefined what humanity is capable of.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_MISSIONS.map((mission, i) => (
            <motion.div
              key={mission.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="glass-card-purple p-6 flex flex-col"
              data-ocid={`agencies.mission_item.${i + 1}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-display font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(108,99,255,0.2)",
                    border: "1px solid rgba(108,99,255,0.4)",
                    color: "#6C63FF",
                  }}
                >
                  {mission.year}
                </span>
                <span className="text-xs text-neon-cyan font-semibold">
                  {mission.agency}
                </span>
              </div>
              <h3 className="font-display font-bold text-white text-base mb-3">
                {mission.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">
                {mission.desc}
              </p>
              <a
                href={mission.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary text-sm inline-flex items-center justify-center gap-2 w-full"
                data-ocid={`agencies.mission_link.${i + 1}`}
              >
                Learn More <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
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
          <h2 className="font-display text-2xl font-black text-white mb-4">
            Ready to Explore the Planets?
          </h2>
          <p className="text-slate-400 mb-6">
            Discover the worlds these agencies study and explore.
          </p>
          <Link
            to="/explore"
            className="cta-primary px-8 py-3"
            data-ocid="agencies.explore_button"
          >
            Explore Planets
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

function AgencyCard({
  agency,
  index,
}: {
  agency: Agency;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card flex flex-col overflow-hidden group"
      data-ocid={`agencies.${agency.name.toLowerCase()}.card`}
    >
      {/* Logo area — clickable to website */}
      <a
        href={agency.website}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-8 border-b transition-all duration-300 hover:bg-white/5"
        style={{ borderColor: "rgba(0,229,255,0.1)" }}
        aria-label={`Visit ${agency.name} official website`}
        data-ocid={`agencies.${agency.name.toLowerCase()}.logo_link`}
      >
        {imgError ? (
          <span
            className="font-display font-black text-4xl tracking-wider"
            style={{
              color: agency.accentColor,
              textShadow: `0 0 20px ${agency.accentColor}99`,
            }}
          >
            {agency.name}
          </span>
        ) : (
          <img
            src={agency.logoUrl}
            alt={`${agency.name} logo`}
            className="h-20 w-auto object-contain group-hover:scale-105 transition-smooth"
            style={{
              filter:
                "brightness(1.15) drop-shadow(0 0 10px rgba(255,255,255,0.2))",
              maxWidth: "200px",
            }}
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}
      </a>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2 gap-2">
          <a
            href={agency.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-black text-xl text-white hover:text-neon-cyan transition-colors duration-200"
            data-ocid={`agencies.${agency.name.toLowerCase()}.name_link`}
          >
            {agency.name}
          </a>
          <span className="text-xs text-slate-400 shrink-0">
            {agency.country}
          </span>
        </div>

        <p className="text-xs text-slate-500 mb-3">Est. {agency.founded}</p>

        <p className="text-sm text-slate-300 leading-relaxed mb-4">
          {agency.description}
        </p>

        {/* Notable missions */}
        <div className="mb-5">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 font-semibold">
            Notable Missions
          </p>
          <div className="flex flex-wrap gap-1.5">
            {agency.missions.map((mission) => (
              <span
                key={mission}
                className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold"
                style={{
                  background: `${agency.accentColor}18`,
                  border: `1px solid ${agency.accentColor}44`,
                  color: agency.accentColor,
                }}
              >
                {mission}
              </span>
            ))}
          </div>
        </div>

        <a
          href={agency.website}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-primary text-sm inline-flex items-center justify-center gap-2 mt-auto"
          data-ocid={`agencies.${agency.name.toLowerCase()}.visit_button`}
        >
          Visit Official Website <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.article>
  );
}
