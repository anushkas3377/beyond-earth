import { Calendar, Clock, Timer } from "lucide-react";
import { motion } from "framer-motion";
import type { ElementType } from "react";

interface TimelineSection {
  number: string;
  time: string;
  title: string;
  Icon: ElementType;
  image: string;
  accentFrom: string;
  accentTo: string;
  borderColor: string;
  paragraphs: string[];
}

const SCENARIOS: TimelineSection[] = [
  {
    number: "01",
    time: "1 Minute Later",
    title: "The First Sixty Seconds",
    Icon: Timer,
    image: "/assets/generated/hero-earth-space.dim_1600x900.jpg",
    accentFrom: "oklch(0.11 0.025 245)",
    accentTo: "oklch(0.08 0.018 255)",
    borderColor: "oklch(0.65 0.22 257 / 0.3)",
    paragraphs: [
      "The Sun's light would continue to travel toward where Earth once stood for another 8 minutes — a ghostly afterimage of sunlight reaching empty space. For 8 minutes, the solar system would appear unchanged to a distant observer.",
      "The Moon, no longer bound by Earth's gravitational embrace, would be flung into a new trajectory — a straight line tangent to its former circular orbit. This cold, grey satellite would begin its silent journey through the solar system, a rogue body adrift.",
      "Every satellite in Earth orbit — GPS constellations, weather stations, the International Space Station — would scatter into space. Spacecraft en route to other planets would continue on their trajectories, now carrying no mission home.",
    ],
  },
  {
    number: "02",
    time: "1 Day Later",
    title: "Twenty-Four Hours of Absence",
    Icon: Clock,
    image: "/assets/generated/mars-rover.dim_800x500.jpg",
    accentFrom: "oklch(0.10 0.022 240)",
    accentTo: "oklch(0.07 0.015 250)",
    borderColor: "oklch(0.62 0.2 265 / 0.3)",
    paragraphs: [
      "The gravitational balance of the inner solar system would begin to shift. Earth's absence removes a stabilizing influence that has persisted for 4.5 billion years. Mercury and Venus would begin imperceptibly adjusting their orbits — changes that would amplify over millennia.",
      "Earth's gravity had quietly acted as a comet shield, deflecting thousands of objects away from the inner solar system. Without it, new cometary trajectories would open. Some comets previously kept at bay would become sun-grazers over long timescales.",
      "Tidal forces exerted by Earth on the Moon were gradually slowing Earth's rotation and pushing the Moon outward. Without this interaction, the Moon — now adrift — would lose this gentle push and drift silently into the deep solar system.",
    ],
  },
  {
    number: "03",
    time: "1 Year Later",
    title: "A Year Beyond the Blue Dot",
    Icon: Calendar,
    image: "/assets/generated/astronaut-spacewalk.dim_800x500.jpg",
    accentFrom: "oklch(0.09 0.020 235)",
    accentTo: "oklch(0.06 0.012 245)",
    borderColor: "oklch(0.58 0.18 265 / 0.3)",
    paragraphs: [
      "The Sun would barely notice. Earth represents only 0.0003% of the solar system's total mass. The Sun's own orbit around the solar system's center of mass would shift by a fraction — Jupiter and Saturn's gravitational dance would continue to dominate.",
      "The Moon would have settled into a new orbit around the Sun somewhere between Mars and Jupiter, a lonely satellite circling a star that never knew it was its moon. The asteroid belt dynamics would slowly shift over millions of years.",
      "In the grand sweep of the cosmos, Earth's absence changes our solar system profoundly — yet the universe at large continues indifferent and vast. Billions of other stars, countless other worlds. The experiment ends here: Earth is irreplaceable, and its loss would be catastrophic for all life within it.",
    ],
  },
];

export default function SimulationPage() {
  return (
    <div data-ocid="simulation.page">
      {/* Hero */}
      <section
        className="relative py-28 flex items-center justify-center overflow-hidden"
        data-ocid="simulation.hero_section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/generated/hero-earth-space.dim_1600x900.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
              Simulation
            </p>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
              If Earth Disappeared
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              What would happen to our solar system if Earth suddenly ceased to
              exist? Let's explore the dramatic chain of events across different
              time scales — from the first terrifying minute to a full year of
              absence.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Timeline Sections */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Vertical connector line (desktop) */}
        <div className="relative">
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.65 0.22 257 / 0.4), oklch(0.62 0.2 265 / 0.2), oklch(0.58 0.18 265 / 0.1))",
            }}
            aria-hidden="true"
          />

          {SCENARIOS.map((scenario, si) => {
            const isEven = si % 2 === 0;
            return (
              <section
                key={scenario.number}
                data-ocid={`simulation.scenario.${si + 1}`}
                className="relative mb-24 last:mb-0"
              >
                {/* Center dot on timeline */}
                <div
                  className="hidden lg:flex absolute left-1/2 top-10 -translate-x-1/2 w-4 h-4 rounded-full border-2 items-center justify-center z-10"
                  style={{
                    background: scenario.accentFrom,
                    borderColor: scenario.borderColor,
                  }}
                  aria-hidden="true"
                />

                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
                    !isEven ? "lg:rtl" : ""
                  }`}
                >
                  {/* Image column */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -28 : 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                    className="lg:ltr"
                  >
                    <div className="relative rounded-lg overflow-hidden">
                      <img
                        src={scenario.image}
                        alt={scenario.title}
                        className="w-full h-72 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                        <span
                          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm backdrop-blur-sm"
                          style={{
                            background: "oklch(0.09 0.02 245 / 0.75)",
                            color: "oklch(var(--primary))",
                            border: `1px solid ${scenario.borderColor}`,
                          }}
                        >
                          {scenario.time}
                        </span>
                        <scenario.Icon
                          className="w-6 h-6 opacity-60"
                          style={{ color: "oklch(var(--primary))" }}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Content column */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.12 }}
                    className="lg:ltr"
                  >
                    {/* Section number */}
                    <p
                      className="font-display text-7xl font-black mb-3 leading-none select-none"
                      style={{
                        background: `linear-gradient(135deg, ${scenario.accentFrom}, transparent)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                        opacity: 0.5,
                      }}
                      aria-hidden="true"
                    >
                      {scenario.number}
                    </p>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
                      {scenario.title}
                    </h2>

                    <div className="space-y-4">
                      {scenario.paragraphs.map((para) => (
                        <p
                          key={para.slice(0, 30)}
                          className="text-muted-foreground leading-relaxed text-sm sm:text-base"
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Color-coded accent bar */}
                    <div
                      className="mt-6 h-0.5 w-16 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${scenario.borderColor}, transparent)`,
                      }}
                    />
                  </motion.div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center pt-16 border-t"
          style={{ borderColor: "oklch(var(--border) / 0.3)" }}
          data-ocid="simulation.conclusion_section"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl"
            style={{
              background: "oklch(0.11 0.025 245)",
              border: "1px solid oklch(0.65 0.22 257 / 0.2)",
            }}
          >
            🌍
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-5">
            Earth Is Irreplaceable
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            This thought experiment underscores just how finely balanced our
            solar system truly is — and how precious our pale blue dot remains.
            Earth is the only planet we know of that harbors life. That is
            reason enough to explore, protect, and cherish it with everything we
            have.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
