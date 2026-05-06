import { Link } from "@tanstack/react-router";

const FOOTER_SECTIONS = [
  {
    title: "Explore",
    links: [
      { label: "Planets", to: "/explore" },
      { label: "Timeline", to: "/timeline" },
      { label: "Missions", to: "/missions" },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Astronaut", to: "/astronaut" },
      { label: "Interactive Lab", to: "/lab" },
      { label: "Space Agencies", to: "/agencies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <footer
      className="relative"
      style={{
        background: "rgba(5,7,13,0.9)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(0,229,255,0.1)",
        zIndex: 2,
      }}
      data-ocid="footer.section"
    >
      <div className="section-divider" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand col — spans 2 */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 w-fit group">
              <img
                src="/assets/logo.png"
                alt="Beyond Earth logo"
                className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
                style={{ filter: "drop-shadow(0 0 6px rgba(0,229,255,0.45))" }}
              />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Exploring the universe through science, simulation, and immersive
              space experiences inspired by real missions.
            </p>
          </div>

          {/* Nav sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-neon-cyan mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                      data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span>© {year} Beyond Earth. All rights reserved.</span>
          <span>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neon-cyan transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
