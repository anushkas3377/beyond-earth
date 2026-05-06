import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Award, Clock, Globe, Rocket, Star } from "lucide-react";
import { motion } from "motion/react";
import { ASTRONAUTS_DATA } from "./AstronautsPage";

export default function AstronautProfilePage() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const astronaut = ASTRONAUTS_DATA.find((a) => a.slug === slug);

  // 404 state
  if (!astronaut) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center py-24 px-4"
        data-ocid="astronaut_profile.not_found"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-6">🧑‍🚀</div>
          <h1
            className="font-display text-2xl font-bold text-white mb-3"
            style={{ textShadow: "0 0 20px rgba(0,229,255,0.4)" }}
          >
            Astronaut Not Found
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            No astronaut profile found for{" "}
            <code className="text-neon-cyan">/{slug}</code>. They may still be
            on their mission.
          </p>
          <Link
            to="/astronaut"
            className="cta-primary px-8 py-3 rounded-xl font-display font-bold text-sm"
            data-ocid="astronaut_profile.back_to_list_button"
          >
            ← Back to Astronauts
          </Link>
        </motion.div>
      </div>
    );
  }

  const stats = [
    { icon: Globe, label: "Nationality", value: astronaut.nationality },
    { icon: Star, label: "Birth Year", value: String(astronaut.birthYear) },
    { icon: Clock, label: "Time in Space", value: astronaut.totalSpaceTime },
    { icon: Rocket, label: "Agency", value: astronaut.agency },
  ];

  return (
    <div
      className="min-h-screen py-12 relative"
      data-ocid="astronaut_profile.page"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/astronaut"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-neon-cyan transition-colors mb-10 text-sm"
            data-ocid="astronaut_profile.back_button"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Astronauts
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left: Photo + quick stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div
              className="relative rounded-2xl overflow-hidden mb-5"
              style={{
                boxShadow:
                  "0 0 50px rgba(0,229,255,0.25), 0 0 100px rgba(108,99,255,0.12)",
              }}
            >
              <img
                src={astronaut.image}
                alt={astronaut.name}
                className="w-full aspect-[3/4] object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-neon-cyan text-xs font-bold uppercase tracking-widest mb-1">
                  {astronaut.agency}
                </p>
                <p className="font-display font-black text-xl text-white leading-tight">
                  {astronaut.name}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div
              className="glass-card p-5 space-y-3"
              data-ocid="astronaut_profile.stats_panel"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between text-sm gap-2"
                >
                  <div className="flex items-center gap-2 text-slate-400">
                    <stat.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{stat.label}</span>
                  </div>
                  <span className="text-white font-medium text-right truncate max-w-[55%]">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            <p className="text-neon-cyan text-xs uppercase tracking-widest font-semibold mb-2">
              {astronaut.role}
            </p>
            <h1
              className="font-display text-4xl md:text-5xl font-black text-white mb-5 leading-tight"
              style={{ textShadow: "0 0 30px rgba(255,255,255,0.15)" }}
            >
              {astronaut.name}
            </h1>

            {/* Achievement badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{
                background: "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.3)",
              }}
            >
              <Award className="w-4 h-4 text-neon-cyan" />
              <span className="text-neon-cyan text-sm font-semibold">
                {astronaut.achievement}
              </span>
            </div>

            {/* Bio */}
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              {astronaut.bio}
            </p>

            {/* Missions */}
            <div
              className="glass-card p-6 mb-6"
              data-ocid="astronaut_profile.missions_panel"
            >
              <div className="flex items-center gap-2 mb-5">
                <Rocket className="w-4 h-4 text-neon-purple" />
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wide">
                  Notable Missions
                </h3>
              </div>
              <div className="space-y-3">
                {astronaut.missions.map((mission, idx) => (
                  <motion.div
                    key={mission}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + idx * 0.1 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{
                        background: "#6C63FF",
                        boxShadow: "0 0 6px rgba(108,99,255,0.8)",
                      }}
                    />
                    <span className="text-slate-300">{mission}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mission stats */}
            <div
              className="grid grid-cols-3 gap-4 mb-8"
              data-ocid="astronaut_profile.mission_stats"
            >
              {[
                {
                  label: "Missions",
                  value: String(astronaut.missions.length),
                  color: "#00E5FF",
                },
                {
                  label: "Birth Year",
                  value: String(astronaut.birthYear),
                  color: "#6C63FF",
                },
                {
                  label: "In Space",
                  value: astronaut.totalSpaceTime.split(",")[0],
                  color: "#FFC857",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 text-center"
                  style={{ borderColor: `${stat.color}25` }}
                >
                  <p
                    className="font-display font-black text-lg mb-1"
                    style={{
                      color: stat.color,
                      textShadow: `0 0 10px ${stat.color}50`,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                to="/explore"
                className="cta-primary px-6 py-2.5 rounded-lg font-display font-bold text-sm"
                data-ocid="astronaut_profile.explore_button"
              >
                Explore Planets
              </Link>
              <Link
                to="/astronaut"
                className="cta-secondary px-6 py-2.5 rounded-lg font-display font-bold text-sm"
                data-ocid="astronaut_profile.all_astronauts_button"
              >
                All Astronauts
              </Link>
              <Link
                to="/lab"
                className="px-5 py-2.5 rounded-lg text-sm font-semibold text-neon-purple border border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300"
                data-ocid="astronaut_profile.lab_button"
              >
                Open Interactive Lab
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
