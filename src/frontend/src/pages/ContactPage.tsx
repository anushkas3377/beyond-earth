import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Send,
  Twitter,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const SOCIAL_LINKS = [
  {
    icon: Mail,
    ocid: "contact.email_icon",
    color: "#00E5FF",
  },
  {
    icon: Github,
    ocid: "contact.github_icon",
    color: "#6C63FF",
  },
  {
    icon: Linkedin,
    ocid: "contact.linkedin_icon",
    color: "#00FF9C",
  },
  {
    icon: Instagram,
    ocid: "contact.instagram_icon",
    color: "#FF6B6B",
  },
  {
    icon: Twitter,
    ocid: "contact.twitter_icon",
    color: "#FFC857",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email address.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.trim().length < 10)
      errs.message = "Message must be at least 10 characters.";
    return errs;
  }

  function handleBlur(field: keyof FormState) {
    const errs = validate();
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setGlobalError(true);
      setTimeout(() => setGlobalError(false), 600);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase
      .from("contacts")
      .insert([{ name: form.name, email: form.email, message: form.message }]);
    setSubmitting(false);
    if (error) {
  console.log("SUPABASE ERROR:", error);
  alert(error.message);

  setGlobalError(true);
  setTimeout(() => setGlobalError(false), 600);
} else {
  console.log("Inserted successfully");
  setSubmitted(true);
} 
  }

  return (
    <div data-ocid="contact.page" className="min-h-screen">
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
          className="max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neon-cyan mb-4">
            Contact
          </p>
          <h1
            className="font-display text-4xl sm:text-6xl font-black mb-5 text-white"
            style={{ textShadow: "0 0 40px rgba(0,229,255,0.5)" }}
          >
            GET IN TOUCH
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Have ideas, feedback, or questions? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Connect links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-6 mb-10"
          data-ocid="contact.connect_section"
        >
          {SOCIAL_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.ocid}
                data-ocid={item.ocid}
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: `${item.color}14`,
                  border: `1px solid ${item.color}40`,
                  boxShadow: `0 0 20px ${item.color}18`,
                }}
              >
                <Icon
                  className="w-6 h-6"
                  style={{ color: item.color }}
                  strokeWidth={1.5}
                />
              </div>
            );
          })}
        </motion.div>
         <p className="text-center text-slate-500 text-xs tracking-widest uppercase mb-10 -mt-6">
             — Launching on these platforms soon —
        </p>

        {/* Form / Success */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-14 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,255,156,0.06) 0%, rgba(0,229,255,0.06) 100%)",
                borderColor: "rgba(0,255,156,0.3)",
                boxShadow: "0 0 40px rgba(0,255,156,0.15)",
              }}
              data-ocid="contact.success_state"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: "rgba(0,255,156,0.1)",
                  border: "1px solid rgba(0,255,156,0.4)",
                  boxShadow: "0 0 30px rgba(0,255,156,0.25)",
                }}
              >
                <CheckCircle
                  className="w-10 h-10"
                  style={{ color: "#00FF9C" }}
                  strokeWidth={1.5}
                />
              </div>
              <h2
                className="font-display text-2xl font-black text-white mb-3"
                style={{ textShadow: "0 0 20px rgba(0,255,156,0.5)" }}
              >
                Message Sent Successfully 🚀
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8 max-w-sm mx-auto">
                Thank you for reaching out! We will get back to you within 48
                hours. In the meantime, explore the cosmos.
              </p>
              <Button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", message: "" });
                  setErrors({});
                }}
                className="cta-secondary px-8 py-2.5 text-sm"
                data-ocid="contact.send_another_button"
              >
                Send Another Message
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={
                globalError ? { x: [-6, 6, -4, 4, 0] } : { opacity: 1, y: 0 }
              }
              transition={{ duration: globalError ? 0.3 : 0.5 }}
              className="glass-card p-8 sm:p-10"
              style={{
                borderColor: globalError
                  ? "rgba(255,77,77,0.4)"
                  : "rgba(0,229,255,0.15)",
                boxShadow: globalError
                  ? "0 0 30px rgba(255,77,77,0.15)"
                  : undefined,
              }}
              data-ocid="contact.form_panel"
            >
              {globalError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 px-4 py-3 rounded-lg text-sm font-semibold"
                  style={{
                    background: "rgba(255,77,77,0.1)",
                    border: "1px solid rgba(255,77,77,0.35)",
                    color: "#FF4D4D",
                    boxShadow: "0 0 20px rgba(255,77,77,0.15)",
                  }}
                  data-ocid="contact.error_state"
                >
                  Please fill all fields correctly.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <Label
                    htmlFor="contact-name"
                    className="text-sm text-slate-300 mb-2 block font-semibold"
                  >
                    Full Name <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Neil Armstrong"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    onBlur={() => handleBlur("name")}
                    className="input-neon w-full h-11 px-4"
                    style={{
                      borderColor: errors.name
                        ? "rgba(255,77,77,0.5)"
                        : undefined,
                    }}
                    data-ocid="contact.name_input"
                  />
                  {errors.name && (
                    <p
                      className="text-xs mt-1.5 text-error"
                      data-ocid="contact.name_field_error"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="contact-email"
                    className="text-sm text-slate-300 mb-2 block font-semibold"
                  >
                    Email Address <span className="text-error">*</span>
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="neil@nasa.gov"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    onBlur={() => handleBlur("email")}
                    className="input-neon w-full h-11 px-4"
                    style={{
                      borderColor: errors.email
                        ? "rgba(255,77,77,0.5)"
                        : undefined,
                    }}
                    data-ocid="contact.email_input"
                  />
                  {errors.email && (
                    <p
                      className="text-xs mt-1.5 text-error"
                      data-ocid="contact.email_field_error"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="contact-message"
                    className="text-sm text-slate-300 mb-2 block font-semibold"
                  >
                    Message <span className="text-error">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us about your idea or question..."
                    rows={6}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    onBlur={() => handleBlur("message")}
                    className="input-neon w-full px-4 py-3 resize-none"
                    style={{
                      borderColor: errors.message
                        ? "rgba(255,77,77,0.5)"
                        : undefined,
                    }}
                    data-ocid="contact.message_textarea"
                  />
                  {errors.message && (
                    <p
                      className="text-xs mt-1.5 text-error"
                      data-ocid="contact.message_field_error"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="cta-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  data-ocid="contact.submit_button"
                >
                  {submitting ? (
                    <>
                      <span
                        className="w-4 h-4 rounded-full border-2 animate-spin"
                        style={{
                          borderColor: "rgba(11,15,26,0.3)",
                          borderTopColor: "#0b0f1a",
                        }}
                      />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
