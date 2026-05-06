import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Tab = "physics" | "simulations" | "environment";

const G = 6.674e-11;

// ── Physics Calculators ────────────────────────────────────────────────
function OrbitalVelocityCalc() {
  const [mass, setMass] = useState("");
  const [radius, setRadius] = useState("");
  const [result, setResult] = useState<{ ms: number; kms: number } | null>(
    null,
  );
  const [error, setError] = useState("");

  function calculate() {
    const M = Number(mass);
    const r = Number(radius);
    if (!mass || !radius || M <= 0 || r <= 0) {
      setError("Please fill all fields with positive values.");
      setResult(null);
      return;
    }
    setError("");
    const v = Math.sqrt((G * M) / r);
    setResult({ ms: Math.round(v), kms: Math.round(v / 1000) });
  }

  return (
    <div className="glass-card p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg text-neon-cyan mb-1">
          Orbital Velocity
        </h3>
        <p className="font-mono text-sm text-muted-foreground">v = √(GM / r)</p>
        <p className="text-xs text-muted-foreground mt-1">
          G = 6.674×10⁻¹¹ N·m²/kg²
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Planet Mass (kg)
          </Label>
          <Input
            data-ocid="lab.orbital_mass_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 5.972e24"
            value={mass}
            onChange={(e) => {
              setMass(e.target.value);
              setError("");
            }}
          />
        </div>
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Orbital Radius (m)
          </Label>
          <Input
            data-ocid="lab.orbital_radius_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 6.371e6"
            value={radius}
            onChange={(e) => {
              setRadius(e.target.value);
              setError("");
            }}
          />
        </div>
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
      <button
        type="button"
        className="cta-primary text-sm px-6 py-2"
        onClick={calculate}
        data-ocid="lab.orbital_calculate_button"
      >
        Calculate
      </button>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card-purple p-4 rounded-xl"
          >
            <p className="text-xs text-muted-foreground mb-2">
              Orbital Velocity
            </p>
            <p className="font-display text-3xl text-neon-cyan">
              {result.ms.toLocaleString()} <span className="text-lg">m/s</span>
            </p>
            <p className="text-neon-purple font-semibold mt-1">
              {result.kms.toLocaleString()} km/s
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EscapeVelocityCalc() {
  const [mass, setMass] = useState("");
  const [radius, setRadius] = useState("");
  const [result, setResult] = useState<{ ms: number; kms: number } | null>(
    null,
  );
  const [error, setError] = useState("");

  function calculate() {
    const M = Number(mass);
    const r = Number(radius);
    if (!mass || !radius || M <= 0 || r <= 0) {
      setError("Please fill all fields with positive values.");
      setResult(null);
      return;
    }
    setError("");
    const v = Math.sqrt((2 * G * M) / r);
    setResult({ ms: Math.round(v), kms: Math.round(v / 1000) });
  }

  return (
    <div className="glass-card p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg text-neon-cyan mb-1">
          Escape Velocity
        </h3>
        <p className="font-mono text-sm text-muted-foreground">
          v = √(2GM / r)
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Planet Mass (kg)
          </Label>
          <Input
            data-ocid="lab.escape_mass_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 5.972e24"
            value={mass}
            onChange={(e) => {
              setMass(e.target.value);
              setError("");
            }}
          />
        </div>
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Radius (m)
          </Label>
          <Input
            data-ocid="lab.escape_radius_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 6.371e6"
            value={radius}
            onChange={(e) => {
              setRadius(e.target.value);
              setError("");
            }}
          />
        </div>
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
      <button
        type="button"
        className="cta-primary text-sm px-6 py-2"
        onClick={calculate}
        data-ocid="lab.escape_calculate_button"
      >
        Calculate
      </button>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card-purple p-4 rounded-xl"
          >
            <p className="text-xs text-muted-foreground mb-2">
              Escape Velocity
            </p>
            <p className="font-display text-3xl text-neon-cyan">
              {result.ms.toLocaleString()} <span className="text-lg">m/s</span>
            </p>
            <p className="text-neon-purple font-semibold mt-1">
              {result.kms.toLocaleString()} km/s
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RocketEquationCalc() {
  const [ve, setVe] = useState("");
  const [m0, setM0] = useState("");
  const [mf, setMf] = useState("");
  const [result, setResult] = useState<{ ms: number; kms: number } | null>(
    null,
  );
  const [error, setError] = useState("");

  function calculate() {
    const veN = Number(ve);
    const m0N = Number(m0);
    const mfN = Number(mf);
    if (!ve || !m0 || !mf || veN <= 0 || m0N <= 0 || mfN <= 0) {
      setError("Please fill all fields with positive values.");
      setResult(null);
      return;
    }
    if (m0N <= mfN) {
      setError("Initial mass m₀ must be greater than final mass mf.");
      setResult(null);
      return;
    }
    setError("");
    const dv = veN * Math.log(m0N / mfN);
    setResult({ ms: Math.round(dv), kms: Math.round(dv / 1000) });
  }

  return (
    <div className="glass-card p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg text-neon-cyan mb-1">
          Rocket Equation
        </h3>
        <p className="font-mono text-sm text-muted-foreground">
          Δv = vₑ × ln(m₀ / mf)
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Tsiolkovsky Rocket Equation
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Exhaust Velocity vₑ (m/s)
          </Label>
          <Input
            data-ocid="lab.rocket_ve_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 4500"
            value={ve}
            onChange={(e) => {
              setVe(e.target.value);
              setError("");
            }}
          />
        </div>
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Initial Mass m₀ (kg)
          </Label>
          <Input
            data-ocid="lab.rocket_m0_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 500000"
            value={m0}
            onChange={(e) => {
              setM0(e.target.value);
              setError("");
            }}
          />
        </div>
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Final Mass mf (kg)
          </Label>
          <Input
            data-ocid="lab.rocket_mf_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 50000"
            value={mf}
            onChange={(e) => {
              setMf(e.target.value);
              setError("");
            }}
          />
        </div>
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
      <button
        type="button"
        className="cta-primary text-sm px-6 py-2"
        onClick={calculate}
        data-ocid="lab.rocket_calculate_button"
      >
        Calculate
      </button>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card-purple p-4 rounded-xl"
          >
            <p className="text-xs text-muted-foreground mb-2">
              Delta-v (Velocity Change)
            </p>
            <p className="font-display text-3xl text-neon-cyan">
              {result.ms.toLocaleString()} <span className="text-lg">m/s</span>
            </p>
            <p className="text-neon-purple font-semibold mt-1">
              {result.kms.toLocaleString()} km/s
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Simulations ────────────────────────────────────────────────────────
const GRAVITY_PLANETS = [
  { name: "Earth", g: 9.8, msg: "" },
  { name: "Moon", g: 1.62, msg: "You would feel incredibly light!" },
  { name: "Mars", g: 3.72, msg: "You'd feel lighter but still walk normally." },
  { name: "Jupiter", g: 24.79, msg: "You would barely be able to stand!" },
];

function GravitySimulator() {
  const [planet, setPlanet] = useState("Earth");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<{
    N: number;
    kg: number;
    msg: string;
  } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    const w = Number(weight);
    if (!weight || w <= 0) {
      setError("Please enter a valid weight.");
      setResult(null);
      return;
    }
    setError("");
    const p =
      GRAVITY_PLANETS.find((x) => x.name === planet) ?? GRAVITY_PLANETS[0];
    const force = w * p.g;
    setResult({
      N: Math.round(force * 10) / 10,
      kg: Math.round((force / 9.8) * 10) / 10,
      msg: p.msg,
    });
  }

  return (
    <div className="glass-card p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg text-neon-cyan mb-1">
          Gravity Simulator
        </h3>
        <p className="text-xs text-muted-foreground">
          Calculate your weight on different planets
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Select Planet
          </Label>
          <select
            data-ocid="lab.gravity_planet_select"
            className="input-neon w-full px-3 py-2 rounded-lg text-foreground bg-transparent"
            value={planet}
            onChange={(e) => setPlanet(e.target.value)}
          >
            {GRAVITY_PLANETS.map((p) => (
              <option key={p.name} value={p.name} className="bg-[#0b0f1a]">
                {p.name} ({p.g} m/s²)
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Your Weight (kg)
          </Label>
          <Input
            data-ocid="lab.gravity_weight_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 70"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
              setError("");
            }}
          />
        </div>
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
      <button
        type="button"
        className="cta-primary text-sm px-6 py-2"
        onClick={calculate}
        data-ocid="lab.gravity_calculate_button"
      >
        Simulate
      </button>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card-purple p-4 rounded-xl space-y-2"
          >
            <p className="text-xs text-muted-foreground">Weight on {planet}</p>
            <p className="font-display text-3xl text-neon-cyan">
              {result.N} <span className="text-lg">N</span>
            </p>
            <p className="text-neon-purple font-semibold">
              {result.kg} kg equivalent
            </p>
            {result.msg && (
              <p className="text-warning text-sm mt-2">✨ {result.msg}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LaunchAngleSimulator() {
  const [angle, setAngle] = useState(45);
  const [velocity, setVelocity] = useState("");
  const [result, setResult] = useState<{
    range: number;
    height: number;
    time: number;
  } | null>(null);
  const [error, setError] = useState("");
  const g = 9.8;

  function calculate() {
    const v = Number(velocity);
    if (!velocity || v <= 0) {
      setError("Please enter a valid initial velocity.");
      setResult(null);
      return;
    }
    setError("");
    const rad = (angle * Math.PI) / 180;
    const range = (v * v * Math.sin(2 * rad)) / g;
    const height = (v * v * Math.sin(rad) * Math.sin(rad)) / (2 * g);
    const time = (2 * v * Math.sin(rad)) / g;
    setResult({
      range: Math.round(range * 10) / 10,
      height: Math.round(height * 10) / 10,
      time: Math.round(time * 100) / 100,
    });
  }

  // SVG parabola
  const svgW = 300;
  const svgH = 120;
  const arcPath = (() => {
    if (!result || result.range === 0) return "";
    const pts: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const t =
        (i / 40) *
        ((2 * Number(velocity) * Math.sin((angle * Math.PI) / 180)) / g);
      const x = Number(velocity) * Math.cos((angle * Math.PI) / 180) * t;
      const y =
        Number(velocity) * Math.sin((angle * Math.PI) / 180) * t -
        0.5 * g * t * t;
      const sx = (x / result.range) * (svgW - 20) + 10;
      const sy = svgH - 10 - (y / result.height) * (svgH - 20);
      pts.push(`${i === 0 ? "M" : "L"}${sx.toFixed(1)},${sy.toFixed(1)}`);
    }
    return pts.join(" ");
  })();

  return (
    <div className="glass-card p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg text-neon-cyan mb-1">
          Launch Angle Simulator
        </h3>
        <p className="text-xs text-muted-foreground">
          Projectile motion on Earth (g = 9.8 m/s²)
        </p>
      </div>
      <div className="space-y-3">
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Launch Angle: <span className="text-neon-cyan">{angle}°</span>
          </Label>
          <input
            type="range"
            min={0}
            max={90}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: "#00e5ff" }}
            data-ocid="lab.angle_slider"
          />
        </div>
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Initial Velocity (m/s)
          </Label>
          <Input
            data-ocid="lab.angle_velocity_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 50"
            value={velocity}
            onChange={(e) => {
              setVelocity(e.target.value);
              setError("");
            }}
          />
        </div>
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
      <button
        type="button"
        className="cta-primary text-sm px-6 py-2"
        onClick={calculate}
        data-ocid="lab.angle_calculate_button"
      >
        Calculate
      </button>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <svg
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full rounded-xl border"
              aria-label="Projectile trajectory arc"
              role="img"
              style={{
                borderColor: "rgba(0,229,255,0.2)",
                background: "rgba(0,229,255,0.03)",
              }}
            >
              <path
                d={arcPath}
                fill="none"
                stroke="#00e5ff"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <circle cx="10" cy={svgH - 10} r="3" fill="#6c63ff" />
            </svg>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Range", value: `${result.range} m` },
                { label: "Max Height", value: `${result.height} m` },
                { label: "Flight Time", value: `${result.time} s` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-card-purple p-3 text-center rounded-xl"
                >
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-display text-neon-cyan text-sm font-bold">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ImpactEnergyCalc() {
  const [mass, setMass] = useState("");
  const [vel, setVel] = useState("");
  const [result, setResult] = useState<{ joules: number; tnt: number } | null>(
    null,
  );
  const [error, setError] = useState("");

  function calculate() {
    const m = Number(mass);
    const v = Number(vel);
    if (!mass || !vel || m <= 0 || v <= 0) {
      setError("Please fill all fields with positive values.");
      setResult(null);
      return;
    }
    setError("");
    const ke = 0.5 * m * v * v;
    setResult({ joules: ke, tnt: ke / 4.184e9 });
  }

  function fmt(n: number): string {
    if (n >= 1e12) return `${(n / 1e12).toFixed(2)} TJ`;
    if (n >= 1e9) return `${(n / 1e9).toFixed(2)} GJ`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(2)} MJ`;
    return `${Math.round(n).toLocaleString()} J`;
  }

  return (
    <div className="glass-card p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg text-neon-cyan mb-1">
          Impact Energy Calculator
        </h3>
        <p className="font-mono text-sm text-muted-foreground">KE = ½mv²</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Mass (kg)
          </Label>
          <Input
            data-ocid="lab.impact_mass_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 10000"
            value={mass}
            onChange={(e) => {
              setMass(e.target.value);
              setError("");
            }}
          />
        </div>
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Velocity (m/s)
          </Label>
          <Input
            data-ocid="lab.impact_velocity_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 20000"
            value={vel}
            onChange={(e) => {
              setVel(e.target.value);
              setError("");
            }}
          />
        </div>
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
      <button
        type="button"
        className="cta-primary text-sm px-6 py-2"
        onClick={calculate}
        data-ocid="lab.impact_calculate_button"
      >
        Calculate
      </button>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card-purple p-4 rounded-xl"
          >
            <p className="text-xs text-muted-foreground mb-2">Impact Energy</p>
            <p className="font-display text-3xl text-neon-cyan">
              {fmt(result.joules)}
            </p>
            <p className="text-neon-purple font-semibold mt-1">
              {result.tnt < 0.001
                ? `${(result.tnt * 1000).toFixed(3)} kg TNT`
                : `${result.tnt.toFixed(3)} tons of TNT`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Environment ────────────────────────────────────────────────────────
const ENV_PLANETS = [
  {
    name: "Mercury",
    temp: 167,
    pressure: "~0 (trace)",
    survivable: false,
    reason: "Extreme temperature swings, virtually no atmosphere",
  },
  {
    name: "Venus",
    temp: 462,
    pressure: "92",
    survivable: false,
    reason: "Crushing pressure and extreme heat",
  },
  { name: "Earth", temp: 15, pressure: "1", survivable: true, reason: "" },
  {
    name: "Mars",
    temp: -63,
    pressure: "0.006",
    survivable: false,
    reason: "Thin atmosphere, intense radiation, extreme cold",
  },
  {
    name: "Jupiter",
    temp: -110,
    pressure: "N/A (gas)",
    survivable: false,
    reason: "Gas giant — no solid surface, crushing pressure",
  },
  {
    name: "Saturn",
    temp: -140,
    pressure: "N/A (gas)",
    survivable: false,
    reason: "Gas giant — no solid surface, extreme cold",
  },
];

function PlanetEnvironmentSimulator() {
  const [planet, setPlanet] = useState("Earth");
  const data = ENV_PLANETS.find((p) => p.name === planet) ?? ENV_PLANETS[2];

  return (
    <div className="glass-card p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg text-neon-cyan mb-1">
          Planet Environment Simulator
        </h3>
        <p className="text-xs text-muted-foreground">
          Explore atmospheric conditions on each planet
        </p>
      </div>
      <div>
        <Label className="text-foreground text-xs mb-1 block">
          Select Planet
        </Label>
        <select
          data-ocid="lab.env_planet_select"
          className="input-neon w-full px-3 py-2 rounded-lg text-foreground bg-transparent"
          value={planet}
          onChange={(e) => setPlanet(e.target.value)}
        >
          {ENV_PLANETS.map((p) => (
            <option key={p.name} value={p.name} className="bg-[#0b0f1a]">
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={planet}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-card-purple p-4 rounded-xl text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Avg Surface Temp
              </p>
              <p
                className="font-display text-2xl"
                style={{
                  color:
                    data.temp > 50
                      ? "#ff4d4d"
                      : data.temp < 0
                        ? "#00e5ff"
                        : "#00ff9c",
                }}
              >
                {data.temp}°C
              </p>
            </div>
            <div className="glass-card-purple p-4 rounded-xl text-center">
              <p className="text-xs text-muted-foreground mb-1">
                Atmospheric Pressure
              </p>
              <p className="font-display text-2xl text-neon-purple">
                {data.pressure} <span className="text-xs">bar</span>
              </p>
            </div>
          </div>
          <div
            className="rounded-xl p-4 border text-center"
            style={{
              background: data.survivable
                ? "rgba(0,255,156,0.07)"
                : "rgba(255,77,77,0.07)",
              borderColor: data.survivable
                ? "rgba(0,255,156,0.3)"
                : "rgba(255,77,77,0.3)",
            }}
          >
            <p
              className="font-display text-lg"
              style={{ color: data.survivable ? "#00ff9c" : "#ff4d4d" }}
            >
              {data.survivable ? "Survivable ✅" : "Not Survivable ❌"}
            </p>
            {!data.survivable && (
              <p className="text-xs text-muted-foreground mt-1">
                {data.reason}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function OrbitalPeriodCalc() {
  const [radius, setRadius] = useState("");
  const [mass, setMass] = useState("");
  const [result, setResult] = useState<{
    sec: number;
    days: number;
    years: number;
  } | null>(null);
  const [error, setError] = useState("");

  function calculate() {
    const r = Number(radius);
    const M = Number(mass);
    if (!radius || !mass || r <= 0 || M <= 0) {
      setError("Please fill all fields with positive values.");
      setResult(null);
      return;
    }
    setError("");
    const T = 2 * Math.PI * Math.sqrt((r * r * r) / (G * M));
    setResult({
      sec: Math.round(T),
      days: Math.round((T / 86400) * 100) / 100,
      years: Math.round((T / (365.25 * 86400)) * 1000) / 1000,
    });
  }

  return (
    <div className="glass-card p-6 space-y-5">
      <div>
        <h3 className="font-display text-lg text-neon-cyan mb-1">
          Orbital Period Calculator
        </h3>
        <p className="font-mono text-sm text-muted-foreground">
          T = 2π × √(r³ / GM)
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Orbital Radius (m)
          </Label>
          <Input
            data-ocid="lab.period_radius_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 3.844e8"
            value={radius}
            onChange={(e) => {
              setRadius(e.target.value);
              setError("");
            }}
          />
        </div>
        <div>
          <Label className="text-foreground text-xs mb-1 block">
            Planet Mass (kg)
          </Label>
          <Input
            data-ocid="lab.period_mass_input"
            className="input-neon bg-transparent"
            placeholder="e.g. 5.972e24"
            value={mass}
            onChange={(e) => {
              setMass(e.target.value);
              setError("");
            }}
          />
        </div>
      </div>
      {error && <p className="text-error text-xs">{error}</p>}
      <button
        type="button"
        className="cta-primary text-sm px-6 py-2"
        onClick={calculate}
        data-ocid="lab.period_calculate_button"
      >
        Calculate
      </button>
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { label: "Seconds", value: result.sec.toLocaleString() },
              { label: "Days", value: result.days.toLocaleString() },
              { label: "Years", value: result.years.toLocaleString() },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card-purple p-3 text-center rounded-xl"
              >
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-display text-neon-cyan text-sm font-bold">
                  {item.value}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────
// Stable star data (generated once, never re-randomised)
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: `s${i}`,
  w: ((i * 37 + 11) % 20) / 10 + 1,
  h: ((i * 53 + 7) % 20) / 10 + 1,
  top: ((i * 91 + 17) % 1000) / 10,
  left: ((i * 73 + 29) % 1000) / 10,
  opacity: ((i * 61 + 3) % 70) / 100 + 0.1,
  dur: ((i * 43 + 5) % 40) / 10 + 3,
}));

export default function InteractiveLabPage() {
  const [activeTab, setActiveTab] = useState<Tab>("physics");
  const navigate = useNavigate();

  const tabs: { id: Tab; label: string }[] = [
    { id: "physics", label: "Physics Calculators" },
    { id: "simulations", label: "Simulations" },
    { id: "environment", label: "Environment" },
  ];

  return (
    <div data-ocid="lab.page" className="min-h-screen bg-space-deep">
      {/* Starfield */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.w}px`,
              height: `${star.h}px`,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
              animation: `pulse ${star.dur}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-neon-purple mb-3">
            Beyond Earth
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-glow-cyan mb-4">
            Interactive Space Lab
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Explore real space physics through interactive tools and
            simulations.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
          role="tablist"
          aria-label="Lab sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-ocid={`lab.${tab.id}_tab`}
              className="font-display text-sm px-5 py-2.5 rounded-xl transition-smooth relative"
              style={{
                background:
                  activeTab === tab.id
                    ? "rgba(0,229,255,0.08)"
                    : "rgba(255,255,255,0.03)",
                border:
                  activeTab === tab.id
                    ? "1px solid rgba(0,229,255,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                color: activeTab === tab.id ? "#00e5ff" : "#94a3b8",
                boxShadow:
                  activeTab === tab.id
                    ? "0 0 16px rgba(0,229,255,0.2)"
                    : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === "physics" && (
              <div className="space-y-6">
                <OrbitalVelocityCalc />
                <EscapeVelocityCalc />
                <RocketEquationCalc />
              </div>
            )}
            {activeTab === "simulations" && (
              <div className="space-y-6">
                <GravitySimulator />
                <LaunchAngleSimulator />
                <ImpactEnergyCalc />
              </div>
            )}
            {activeTab === "environment" && (
              <div className="space-y-6">
                <PlanetEnvironmentSimulator />
                <OrbitalPeriodCalc />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 pt-8"
          style={{ borderTop: "1px solid rgba(0,229,255,0.12)" }}
        >
          <p className="text-center text-xs text-muted-foreground mb-6 uppercase tracking-widest">
            Continue Your Journey
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              className="cta-secondary text-sm"
              onClick={() => navigate({ to: "/explore" })}
              data-ocid="lab.explore_planets_button"
            >
              🪐 Explore Planets
            </button>
            <button
              type="button"
              className="cta-secondary text-sm"
              onClick={() => navigate({ to: "/missions" })}
              data-ocid="lab.build_mission_button"
            >
              🚀 Build Mission
            </button>
            <button
              type="button"
              className="cta-secondary text-sm"
              onClick={() => navigate({ to: "/astronauts" })}
              data-ocid="lab.simulate_yourself_button"
            >
              🧑‍🚀 View Astronauts
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
