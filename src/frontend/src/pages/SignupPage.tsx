import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false); 
   
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
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
          JOIN BEYOND EARTH
        </h1>
        <p className="text-slate-400 text-sm text-center mb-8">
          Create your account and start exploring
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm font-semibold"
            style={{ background: "rgba(255,77,77,0.1)", border: "1px solid rgba(255,77,77,0.35)", color: "#FF4D4D" }}>
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 px-4 py-3 rounded-lg text-sm font-semibold text-center"
              style={{ 
               background: "rgba(0,229,255,0.1)", 
               border: "1px solid rgba(0,229,255,0.35)", 
               color: "#00E5FF" 
            }}>
                 ✅ Check your email to confirm your account!
          </div>
       )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-neon w-full px-4 py-3 text-sm rounded-lg"
              placeholder="Neil Armstrong"
              required
            />
          </div>
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
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="cta-primary w-full py-3.5 font-display font-bold text-sm disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account 🚀"}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-neon-cyan font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
}