import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate({ to: "/" });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <h1 className="font-display text-3xl font-black text-white mb-2 text-center">
          WELCOME BACK
        </h1>
        <p className="text-slate-400 text-sm text-center mb-8">
          Sign in to your Beyond Earth account
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm font-semibold"
            style={{ background: "rgba(255,77,77,0.1)", border: "1px solid rgba(255,77,77,0.35)", color: "#FF4D4D" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-neon w-full px-4 py-3 text-sm rounded-lg"
              placeholder="neil@nasa.gov"
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-neon w-full px-4 py-3 text-sm rounded-lg"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="cta-primary w-full py-3.5 font-display font-bold text-sm disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In 🚀"}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Don't have an account?{" "}
          <a href="/signup" className="text-neon-cyan font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
export default LoginPage;