import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Globe,
  Layers,
  Rocket as RocketIcon,
  RotateCcw,
  Shield,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { useState, useEffect } from "react";

type RocketId = "light" | "heavy" | "advanced";
type DestinationId = "moon" | "mars" | "jupiter" | "saturn" | "uranus" | "neptune";
type FuelLabel = "Low" | "Optimal" | "High";
type Step = 1 | 2 | 3 | "result";
type MissionResult = "success" | "fail";

interface Rocket {
  id: RocketId;
  name: string;
  icon: React.ElementType;
  iconColor: string;
  stats: { speed: string; power: string; fuelEff: string; bestFor: string };
}

interface Destination {
  id: DestinationId;
  name: string;
  image: string;
  distance: string;
  difficulty: string;
  glow: string;
}

const ROCKETS: Rocket[] = [
  { id: "light", name: "Light Rocket", icon: RocketIcon, iconColor: "#00E5FF", stats: { speed: "Fast", power: "Low", fuelEff: "High", bestFor: "Short range missions" } },
  { id: "heavy", name: "Heavy Rocket", icon: Shield, iconColor: "#6C63FF", stats: { speed: "Slow", power: "High", fuelEff: "Low", bestFor: "Heavy payloads" } },
  { id: "advanced", name: "Advanced Rocket", icon: Layers, iconColor: "#00FF9C", stats: { speed: "Medium", power: "High", fuelEff: "Medium", bestFor: "Any mission" } },
];

const DESTINATIONS: Destination[] = [
  { id: "moon", name: "Moon", image: "/assets/generated/moon-planet.dim_800x800.jpg", distance: "384,400 km", difficulty: "Easy", glow: "rgba(200,210,230,0.25)" },
  { id: "mars", name: "Mars", image: "/assets/generated/mars-planet.dim_800x800.jpg", distance: "225 million km", difficulty: "Medium", glow: "rgba(210,80,50,0.3)" },
  { id: "jupiter", name: "Jupiter", image: "/assets/generated/jupiter-planet.dim_800x800.jpg", distance: "778 million km", difficulty: "Hard", glow: "rgba(200,130,60,0.3)" },
  { id: "saturn", name: "Saturn", image: "/assets/generated/saturn-planet.dim_800x800.jpg", distance: "1.4 billion km", difficulty: "Very Hard", glow: "rgba(200,170,80,0.3)" },
  { id: "uranus", name: "Uranus", image: "/assets/generated/uranus-planet.dim_800x800.jpg", distance: "2.87 billion km", difficulty: "Very Hard", glow: "rgba(148,220,220,0.3)" },
  { id: "neptune", name: "Neptune", image: "/assets/generated/neptune-planet.dim_800x800.jpg", distance: "4.5 billion km", difficulty: "Very Hard", glow: "rgba(63,84,186,0.3)" },
];

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: "#00ff9c", Medium: "#ffc857", Hard: "#ff9a3c", "Very Hard": "#ff4d4d",
};

function getFuelLabel(v: number): FuelLabel {
  if (v <= 33) return "Low";
  if (v <= 66) return "Optimal";
  return "High";
}

function calcResult(rocket: RocketId, dest: DestinationId, fuel: number): MissionResult {
  const fl = getFuelLabel(fuel);
  if (rocket === "light") {
    if (dest === "moon") return "success";
    if (dest === "mars") return fl === "Low" ? "fail" : "success";
    return "fail";
  }
  if (rocket === "heavy") {
    if (dest === "moon" || dest === "mars") return "success";
    if (dest === "jupiter") return fl === "High" ? "success" : "fail";
    return "fail";
  }
  if (dest === "moon" || dest === "mars") return "success";
  if (dest === "jupiter") return fl === "Low" ? "fail" : "success";
  if (dest === "saturn") return fl === "High" ? "success" : "fail";
  return "fail";
}

function getFailReason(rocket: RocketId, dest: DestinationId, fuel: number): string {
  const fl = getFuelLabel(fuel);
  if (rocket === "light" && ["jupiter", "saturn", "uranus", "neptune"].includes(dest))
    return "Light Rocket lacks the thrust for outer planets.";
  if (rocket === "heavy" && ["saturn", "uranus", "neptune"].includes(dest))
    return "Heavy Rocket fuel efficiency is too low for this distance.";
  if (["uranus", "neptune"].includes(dest) && rocket === "advanced")
    return "No current rocket technology can reach the ice giants with crewed missions.";
  if (fl === "Low") return "Insufficient fuel for the journey.";
  return "Mission parameters outside safe flight envelope.";
}

function getMissionStats(dest: DestinationId, fuel: number) {
  const d = DESTINATIONS.find((x) => x.id === dest)!;
  const fl = getFuelLabel(fuel);
  const difficultyMap: Record<string, string> = { Easy: "Easy", Medium: "Medium", Hard: "Hard", "Very Hard": "Extreme" };
  return { distance: d.distance, fuelEfficiency: fl, difficulty: difficultyMap[d.difficulty] };
}

export default function MissionsPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedRocket, setSelectedRocket] = useState<RocketId | null>(null);
  const [selectedDest, setSelectedDest] = useState<DestinationId | null>(null);
  const [fuelLevel, setFuelLevel] = useState(50);
  const [missionResult, setMissionResult] = useState<MissionResult | null>(null);

  function handleLaunch() {
    if (!selectedRocket || !selectedDest) return;
    setMissionResult(calcResult(selectedRocket, selectedDest, fuelLevel));
    setStep("result");
  }

  function handleReset() {
    setStep(1);
    setSelectedRocket(null);
    setSelectedDest(null);
    setFuelLevel(50);
    setMissionResult(null);
  }

  const fuelLabel = getFuelLabel(fuelLevel);
  const destObj = DESTINATIONS.find((d) => d.id === selectedDest);
  const stats = selectedDest ? getMissionStats(selectedDest, fuelLevel) : null;

  return (
    <div data-ocid="missions.page" className="min-h-screen bg-space-deep px-4 sm:px-6 lg:px-8 py-16">
      <LiveLaunches />
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan mb-3">Mission Control</p>
          <h1 className="text-glow-cyan text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>Mission Builder</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Build your own space mission and see if you have what it takes.</p>
        </motion.div>

        {step !== "result" && <StepIndicator current={step as 1 | 2 | 3} />}

        <AnimatePresence mode="wait">
          {step === 1 && <StepOne key="step1" selected={selectedRocket} onSelect={setSelectedRocket} onNext={() => setStep(2)} />}
          {step === 2 && <StepTwo key="step2" selected={selectedDest} onSelect={setSelectedDest} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <StepThree key="step3" fuelLevel={fuelLevel} fuelLabel={fuelLabel} onFuelChange={setFuelLevel} onLaunch={handleLaunch} onBack={() => setStep(2)} />}
          {step === "result" && missionResult && selectedDest && selectedRocket && (
            <ResultScreen key="result" result={missionResult} destination={destObj!} rocket={selectedRocket} fuelLevel={fuelLevel} stats={stats!}
              failReason={getFailReason(selectedRocket, selectedDest, fuelLevel)} onReset={handleReset} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepIndicator({ current }: { current: 1 | 2 | 3 }) {
  const steps = [{ n: 1, label: "Choose Rocket" }, { n: 2, label: "Select Destination" }, { n: 3, label: "Configure Fuel" }];
  return (
    <div className="flex items-center justify-center gap-0 mb-10" data-ocid="missions.step_indicator">
      {steps.map((s, i) => {
        const isDone = current > s.n;
        const isActive = current === s.n;
        return (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-smooth"
                style={{
                  background: isDone ? "rgba(108,99,255,0.3)" : isActive ? "rgba(0,229,255,0.2)" : "rgba(255,255,255,0.06)",
                  border: `2px solid ${isDone ? "#6c63ff" : isActive ? "#00e5ff" : "rgba(255,255,255,0.15)"}`,
                  boxShadow: isDone ? "0 0 12px rgba(108,99,255,0.5)" : isActive ? "0 0 14px rgba(0,229,255,0.6)" : "none",
                  color: isDone ? "#6c63ff" : isActive ? "#00e5ff" : "rgba(255,255,255,0.35)",
                }}>
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.n}
              </div>
              <span className="text-xs mt-1.5 hidden sm:block" style={{ color: isDone ? "#6c63ff" : isActive ? "#00e5ff" : "rgba(255,255,255,0.35)" }}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-16 sm:w-24 h-px mx-2 sm:mx-3 mb-4 sm:mb-0"
                style={{ background: isDone ? "linear-gradient(90deg, #6c63ff, rgba(0,229,255,0.3))" : "rgba(255,255,255,0.1)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepOne({ selected, onSelect, onNext }: { selected: RocketId | null; onSelect: (id: RocketId) => void; onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} data-ocid="missions.step1.section">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-neon-cyan mb-8" style={{ fontFamily: "Orbitron, sans-serif" }}>Step 1: Choose Your Rocket</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {ROCKETS.map((rocket) => {
          const isSelected = selected === rocket.id;
          return (
            <button key={rocket.id} type="button" data-ocid={`missions.rocket.${rocket.id}`} onClick={() => onSelect(rocket.id)}
              className="glass-card p-6 text-left transition-smooth cursor-pointer"
              style={{ borderColor: isSelected ? "#00e5ff" : undefined, boxShadow: isSelected ? "0 0 28px rgba(0,229,255,0.4)" : undefined, transform: isSelected ? "scale(1.03)" : undefined }}>
              <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-xl"
                style={{ background: `${rocket.iconColor}14`, border: `1px solid ${rocket.iconColor}35`, boxShadow: `0 0 18px ${rocket.iconColor}25` }}>
                <rocket.icon size={32} style={{ color: rocket.iconColor }} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "Orbitron, sans-serif", color: isSelected ? "#00e5ff" : "#e2e8f0" }}>{rocket.name}</h3>
              <div className="space-y-1.5 text-sm">
                <StatRow label="Speed" value={rocket.stats.speed} />
                <StatRow label="Power" value={rocket.stats.power} />
                <StatRow label="Fuel Eff." value={rocket.stats.fuelEff} />
                <div className="pt-2 mt-2 border-t border-white/10">
                  <span className="text-muted-foreground text-xs">Best for: </span>
                  <span className="text-xs" style={{ color: "#6c63ff" }}>{rocket.stats.bestFor}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button type="button" data-ocid="missions.step1.next_button" className="cta-primary px-8 py-3 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed" disabled={!selected} onClick={onNext}>
          Next: Select Destination <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function StepTwo({ selected, onSelect, onNext, onBack }: { selected: DestinationId | null; onSelect: (id: DestinationId) => void; onNext: () => void; onBack: () => void }) {
  const activeDest = DESTINATIONS.find((d) => d.id === selected);
  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} data-ocid="missions.step2.section">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-neon-cyan mb-8" style={{ fontFamily: "Orbitron, sans-serif" }}>Step 2: Select Destination</h2>
      {activeDest && <div className="pointer-events-none fixed inset-0 transition-smooth" style={{ background: `radial-gradient(ellipse at 70% 40%, ${activeDest.glow} 0%, transparent 60%)`, zIndex: 0 }} />}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {DESTINATIONS.map((dest) => {
          const isSelected = selected === dest.id;
          return (
            <button key={dest.id} type="button" data-ocid={`missions.destination.${dest.id}`} onClick={() => onSelect(dest.id)}
              className="glass-card overflow-hidden p-0 text-left transition-smooth cursor-pointer"
              style={{ borderColor: isSelected ? "#00e5ff" : undefined, boxShadow: isSelected ? `0 0 30px ${dest.glow}` : undefined, transform: isSelected ? "scale(1.04)" : undefined }}>
              <div className="h-40 overflow-hidden bg-space-deep/60">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  style={{ filter: isSelected ? "brightness(1.15) saturate(1.2)" : "brightness(0.85)" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm mb-1" style={{ fontFamily: "Orbitron, sans-serif", color: isSelected ? "#00e5ff" : "#e2e8f0" }}>{dest.name}</h3>
                <p className="text-xs text-muted-foreground mb-1">{dest.distance}</p>
                <span className="text-xs font-semibold" style={{ color: DIFFICULTY_COLOR[dest.difficulty] }}>{dest.difficulty}</span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="relative z-10 flex justify-center gap-3">
        <button type="button" data-ocid="missions.step2.back_button" className="cta-secondary px-6 py-3" onClick={onBack}>Back</button>
        <button type="button" data-ocid="missions.step2.next_button" className="cta-primary px-8 py-3 flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed" disabled={!selected} onClick={onNext}>
          Next: Configure Fuel <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function StepThree({ fuelLevel, fuelLabel, onFuelChange, onLaunch, onBack }: { fuelLevel: number; fuelLabel: FuelLabel; onFuelChange: (v: number) => void; onLaunch: () => void; onBack: () => void }) {
  const fuelGlow = fuelLabel === "Low" ? "rgba(255,77,77,0.6)" : fuelLabel === "Optimal" ? "rgba(255,200,87,0.6)" : "rgba(0,255,156,0.6)";
  const fuelColor = fuelLabel === "Low" ? "#ff4d4d" : fuelLabel === "Optimal" ? "#ffc857" : "#00ff9c";
  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} data-ocid="missions.step3.section" className="max-w-xl mx-auto">
      <h2 className="text-center text-2xl sm:text-3xl font-bold text-neon-cyan mb-8" style={{ fontFamily: "Orbitron, sans-serif" }}>Step 3: Configure Fuel</h2>
      <div className="glass-card p-8">
        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-muted-foreground">Fuel Level</span>
          <span className="text-xl font-bold" style={{ fontFamily: "Orbitron, sans-serif", color: fuelColor, textShadow: `0 0 12px ${fuelGlow}` }}>{fuelLevel}% — {fuelLabel} Fuel</span>
        </div>
        <div className="relative mb-4">
          <input type="range" min={0} max={100} value={fuelLevel} data-ocid="missions.fuel.slider" onChange={(e) => onFuelChange(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{ background: `linear-gradient(90deg, ${fuelColor} 0%, ${fuelColor} ${fuelLevel}%, rgba(255,255,255,0.1) ${fuelLevel}%, rgba(255,255,255,0.1) 100%)`, boxShadow: `0 0 8px ${fuelGlow}` }} />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mb-8">
          <span style={{ color: fuelLabel === "Low" ? fuelColor : undefined }}>Low (0–33)</span>
          <span style={{ color: fuelLabel === "Optimal" ? fuelColor : undefined }}>Optimal (34–66)</span>
          <span style={{ color: fuelLabel === "High" ? fuelColor : undefined }}>High (67–100)</span>
        </div>
        <div className="rounded-lg h-6 overflow-hidden mb-8" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="h-full transition-all duration-300 rounded-lg" style={{ width: `${fuelLevel}%`, background: `linear-gradient(90deg, ${fuelColor}80, ${fuelColor})`, boxShadow: `0 0 10px ${fuelGlow}` }} />
        </div>
        {fuelLabel === "Low" && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-sm mb-4" style={{ color: "#ff4d4d" }}>⚠️ Low fuel may result in mission failure</motion.p>}
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <button type="button" data-ocid="missions.step3.back_button" className="cta-secondary px-6 py-3" onClick={onBack}>Back</button>
        <button type="button" data-ocid="missions.step3.launch_button" className="cta-primary px-8 py-3 text-base" onClick={onLaunch}>Launch Mission 🚀</button>
      </div>
    </motion.div>
  );
}

function ResultScreen({ result, destination, stats, failReason, onReset }: { result: MissionResult; destination: Destination; rocket: RocketId; fuelLevel: number; stats: { distance: string; fuelEfficiency: string; difficulty: string }; failReason: string; onReset: () => void }) {
  const isSuccess = result === "success";
  const glowColor = isSuccess ? "rgba(0,255,156,0.25)" : "rgba(255,77,77,0.25)";
  const borderColor = isSuccess ? "rgba(0,255,156,0.4)" : "rgba(255,77,77,0.4)";
  const accentColor = isSuccess ? "#00ff9c" : "#ff4d4d";
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} data-ocid="missions.result.section" className="relative max-w-2xl mx-auto">
      <div className="pointer-events-none fixed inset-0" style={{ background: `radial-gradient(ellipse at 50% 50%, ${glowColor} 0%, transparent 65%)`, zIndex: 0 }} />
      <div className="relative z-10 rounded-2xl overflow-hidden" style={{ background: "rgba(11,15,26,0.85)", backdropFilter: "blur(16px)", border: `1px solid ${borderColor}`, boxShadow: `0 0 50px ${glowColor}` }}>
        <div className="relative h-48 overflow-hidden">
          <img src={destination.image} alt={destination.name} className="w-full h-full object-cover"
            style={{ filter: isSuccess ? "brightness(0.9) saturate(1.3)" : "brightness(0.5) saturate(0.4) hue-rotate(340deg)" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            {isSuccess ? <CheckCircle2 className="w-20 h-20" style={{ color: "#00ff9c", filter: "drop-shadow(0 0 20px #00ff9c)" }} />
              : <XCircle className="w-20 h-20" style={{ color: "#ff4d4d", filter: "drop-shadow(0 0 20px #ff4d4d)" }} />}
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-center text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: "Orbitron, sans-serif", color: accentColor, textShadow: `0 0 20px ${accentColor}80` }}>
            {isSuccess ? "✅ Mission Successful!" : "❌ Mission Failed"}
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            {isSuccess ? `Your crew has safely reached ${destination.name}!` : `Your mission encountered critical failure before reaching ${destination.name}.`}
          </p>
          {isSuccess ? (
            <div className="grid grid-cols-3 gap-3 mb-8">
              <StatCard label="Distance Traveled" value={stats.distance} color={accentColor} />
              <StatCard label="Fuel Efficiency" value={stats.fuelEfficiency} color="#ffc857" />
              <StatCard label="Mission Difficulty" value={stats.difficulty} color={DIFFICULTY_COLOR[destination.difficulty] ?? accentColor} />
            </div>
          ) : (
            <div className="rounded-xl p-4 mb-8 text-center" style={{ background: "rgba(255,77,77,0.08)", border: "1px solid rgba(255,77,77,0.3)" }}>
              <p className="text-sm" style={{ color: "#ff8080" }}><span className="font-bold">Failure reason:</span> {failReason}</p>
            </div>
          )}
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" data-ocid="missions.result.try_again_button" className="cta-primary flex items-center gap-2 px-6 py-3" onClick={onReset}>
              <RotateCcw className="w-4 h-4" /> Try Again
            </button>
            <Link to="/planet/$name" params={{ name: destination.id }} className="cta-secondary flex items-center gap-2 px-6 py-3">
              <Globe className="w-4 h-4" /> Explore {destination.name}
            </Link>
            <Link to="/lab" className="cta-secondary flex items-center gap-2 px-6 py-3">
              <FlaskConical className="w-4 h-4" /> Test in Lab
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}40`, boxShadow: `0 0 16px ${color}20` }}>
      <p className="text-lg font-bold mb-1" style={{ fontFamily: "Orbitron, sans-serif", color }}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function LiveLaunches() {
  const [launches, setLaunches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=6&format=json")
      .then((res) => res.json())
      .then((data) => { setLaunches(data.results); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  return (
    <section className="mb-20" data-ocid="missions.live_launches">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neon-cyan mb-3">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Live Data
        </span>
        <h2 className="font-display text-3xl font-bold text-white" style={{ textShadow: "0 0 30px rgba(0,229,255,0.2)" }}>
          Upcoming Launches
        </h2>
      </div>
      {loading && <div className="text-center text-slate-400 py-10">Loading launches...</div>}
      {error && <div className="text-center text-red-400 py-10">Failed to load launches.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {launches.map((launch) => (
          <motion.div key={launch.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,229,255,0.12)", backdropFilter: "blur(12px)" }}>
            {launch.image && <img src={launch.image} alt={launch.name} className="w-full h-36 object-cover rounded-xl" />}
            <div>
              <p className="text-xs text-neon-cyan font-semibold uppercase tracking-widest mb-1">{launch.launch_service_provider?.name}</p>
              <h3 className="text-white font-bold text-sm leading-snug mb-1">{launch.name}</h3>
              <p className="text-xs text-slate-400">🕐 {launch.net ? new Date(launch.net).toLocaleString() : "TBD"}</p>
              <p className="text-xs text-slate-500 mt-1">{launch.pad?.location?.name}</p>
            </div>
            <div className="flex items-center justify-between">
            
              <a
               href={`https://www.google.com/search?q=${encodeURIComponent(launch.name + " space launch")}`}
               target="_blank"
               rel="noopener noreferrer"
               className="text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-300"
               style={{ background: "rgba(0,229,255,0.15)", color: "#00E5FF", border: "1px solid rgba(0,229,255,0.3)" }}>
                  Go for Launch →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
          