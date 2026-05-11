import { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

interface Message {
  id: number;
  created_at: string;
  name: string;
  email: string;
  message: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate({ to: "/login" });
        return;
      }
      setUser(data.user);
      setName(data.user.user_metadata?.full_name || "");

      // Fetch messages by this user's email
      supabase
        .from("contacts")
        .select("*")
        .eq("email", data.user.email)
        .order("created_at", { ascending: false })
        .then(({ data: msgs }) => {
          if (msgs) setMessages(msgs);
        });
    });
  }, []);

  async function handleSaveName() {
    setSaving(true);
    await supabase.auth.updateUser({
      data: { full_name: name },
    });
    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (!user) return null;

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl"
            style={{
              background: "rgba(0,229,255,0.1)",
              border: "2px solid rgba(0,229,255,0.4)",
              boxShadow: "0 0 30px rgba(0,229,255,0.2)",
            }}
          >
            🧑‍🚀
          </div>
          <h1 className="font-display text-3xl font-black text-white mb-1">
            {user.user_metadata?.full_name || "Space Explorer"}
          </h1>
          <p className="text-slate-400 text-sm">{user.email}</p>
          <div
            className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: "rgba(108,99,255,0.1)",
              border: "1px solid rgba(108,99,255,0.3)",
              color: "#6C63FF",
            }}
          >
            🚀 Space Explorer
          </div>
        </motion.div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-6"
        >
          <h2 className="font-display text-lg font-bold text-white mb-4">Profile Info</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
              {editing ? (
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-neon flex-1 px-4 py-2 text-sm rounded-lg"
                  />
                  <button
                    onClick={handleSaveName}
                    disabled={saving}
                    className="cta-primary px-4 py-2 text-sm rounded-lg"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="cta-secondary px-4 py-2 text-sm rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold">
                    {user.user_metadata?.full_name || "Not set"}
                  </p>
                  <button
                    onClick={() => setEditing(true)}
                    className="text-neon-cyan text-xs font-semibold hover:underline"
                  >
                    Edit ✏️
                  </button>
                </div>
              )}
              {saved && <p className="text-green-400 text-xs mt-1">✅ Name updated!</p>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Email</label>
              <p className="text-white font-semibold">{user.email}</p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-slate-400 mb-2">Member Since</label>
              <p className="text-white font-semibold">
                {new Date(user.created_at).toLocaleDateString("en-IN", {
                  year: "numeric", month: "long", day: "numeric"
                })}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 mb-6"
        >
          <h2 className="font-display text-lg font-bold text-white mb-4">
            Your Messages ({messages.length})
          </h2>
          {messages.length === 0 ? (
            <p className="text-slate-400 text-sm">No messages sent yet.</p>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(0,229,255,0.04)",
                    border: "1px solid rgba(0,229,255,0.15)",
                  }}
                >
                  <p className="text-white text-sm mb-1">{msg.message}</p>
                  <p className="text-slate-500 text-xs">
                    {new Date(msg.created_at).toLocaleDateString("en-IN", {
                      year: "numeric", month: "short", day: "numeric"
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Logout */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="px-8 py-3 rounded-xl font-display font-bold text-sm"
            style={{
              background: "rgba(255,77,77,0.1)",
              border: "1px solid rgba(255,77,77,0.3)",
              color: "#FF4D4D",
            }}
          >
            Logout 🚪
          </button>
        </div>
      </div>
    </div>
  );
}