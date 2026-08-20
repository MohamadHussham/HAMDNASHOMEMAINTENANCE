import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  Menu,
  X,
  ChevronRight,
  Paintbrush,
  Wrench,
  Package,
  Hammer,
} from "lucide-react";

const services = [
  {
    icon: Paintbrush,
    title: "Painting",
    description:
      "Interior and exterior painting with premium materials. Clean lines, full prep, and a flawless finish every time.",
    features: ["Interior & Exterior", "Trim & Ceilings", "Color Consultation"],
  },
  {
    icon: Wrench,
    title: "Drywall",
    description:
      "Expert drywall installation and repair. Holes, cracks, water damage — we restore surfaces to like-new condition.",
    features: ["Hole & Crack Repair", "New Installation", "Texture Matching"],
  },
  {
    icon: Package,
    title: "Furniture Assembly",
    description:
      "Fast, accurate assembly of all major brands. IKEA, Wayfair, Amazon — we handle the instructions so you don't have to.",
    features: ["All Major Brands", "Same-Day Available", "Clean Setup"],
  },
  {
    icon: Hammer,
    title: "General Installation",
    description:
      "Fixtures, shelving, curtain rods, TV mounts, and more. If it needs to be installed securely, we get it done right.",
    features: ["TV & Wall Mounts", "Shelving & Storage", "Fixtures & Hardware"],
  },
];

const pillars = [
  {
    icon: DollarSign,
    label: "Affordable Pricing",
    desc: "Fair, transparent rates with no hidden fees. You always know exactly what you're paying before work begins.",
  },
  {
    icon: Star,
    label: "Professional & Reliable",
    desc: "Committed to high standards on every job — no matter the size. Your home is treated with full respect.",
  },
  {
    icon: Clock,
    label: "On Time, Every Time",
    desc: "We respect your schedule. Punctual arrivals and efficient work so your day stays on track.",
  },
  {
    icon: CheckCircle,
    label: "Customer Satisfaction",
    desc: "We don't consider a job done until you're completely happy. Your satisfaction is our standard.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Hyde Park, OH",
    rating: 5,
    text: "Hamdan did an amazing job painting our living room. Clean work, showed up right on time, and the price was very fair. Highly recommend!",
  },
  {
    name: "James R.",
    location: "Kenwood, OH",
    rating: 5,
    text: "Had drywall damage from a leak. Hamdan fixed it perfectly — you cannot even tell there was a hole. Professional all the way through.",
  },
  {
    name: "Lisa T.",
    location: "Blue Ash, OH",
    rating: 5,
    text: "Assembled all our new bedroom furniture in under 2 hours. Efficient, careful, and very friendly. Will definitely call again.",
  },
];

const steps = [
  {
    number: "01",
    title: "Contact Us",
    desc: "Call or email for a free estimate. We'll discuss your project and schedule a visit at your convenience.",
  },
  {
    number: "02",
    title: "Get a Quote",
    desc: "We assess the job and provide a clear, upfront quote with no surprises — just honest pricing.",
  },
  {
    number: "03",
    title: "We Get It Done",
    desc: "Our team arrives on time, works efficiently, and cleans up after. You enjoy the finished result.",
  },
];

const navItems = [
  { id: "services", label: "Services" },
  { id: "why-us", label: "Why Us" },
  { id: "process", label: "How It Works" },
  { id: "contact", label: "Contact" },
];

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSending(true);
    setError("");

    try {
      const response = await fetch(
        "https://formspree.io/f/xkjwkeln",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            phone: form.phone,
            email: form.email,
            service: form.service,
            message: form.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.errors?.[0]?.message ||
            data?.error ||
            "Failed to send message"
        );
      }

      setSubmitted(true);

      setForm({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        "We couldn't send your request. Please call us at 617-368-0505."
      );
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-5 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
          <CheckCircle size={32} className="text-accent" />
        </div>

        <h3
          className="text-2xl font-extrabold text-foreground"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Message Sent!
        </h3>

        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
          Thanks for reaching out. We'll get back to you within 24 hours with
          your free estimate.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm font-bold text-primary hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full bg-input-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/40 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
            Full Name
          </label>

          <input
            type="text"
            required
            placeholder="John Smith"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
            Phone
          </label>

          <input
            type="tel"
            placeholder="(513) 000-0000"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
          Email
        </label>

        <input
          type="email"
          required
          placeholder="you@email.com"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
          Service Needed
        </label>

        <select
          value={form.service}
          onChange={(e) =>
            setForm({ ...form, service: e.target.value })
          }
          className={inputClass}
        >
          <option value="">Select a service...</option>
          <option>Painting</option>
          <option>Drywall Repair / Installation</option>
          <option>Furniture Assembly</option>
          <option>General Installation</option>
          <option>Multiple Services</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">
          Project Details
        </label>

        <textarea
          required
          rows={4}
          placeholder="Describe your project — what needs to be done, approximate size, any special requirements..."
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:bg-primary/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {sending ? "Sending..." : "Send Request"}
        {!sending && <ChevronRight size={16} />}
      </button>
    </form>
  );
}


export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="flex flex-col leading-tight text-left"
          >
            <span
              className="text-primary font-extrabold text-base tracking-tight"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              HAMDAN'S
            </span>
            <span className="text-muted-foreground text-[10px] tracking-[0.18em] uppercase">
              Home Maintenance
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:6173680505"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/75 transition-colors"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <Phone size={14} />
              617-368-0505
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="hidden md:block bg-accent text-accent-foreground text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-accent/90 transition-colors"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Free Estimate
            </button>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-5 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-sm text-muted-foreground hover:text-foreground py-1"
              >
                {item.label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <a
                href="tel:0016173680505"
                className="flex items-center gap-2 text-sm font-bold text-primary"
              >
                <Phone size={14} /> +1 (617-368-0505)
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="bg-accent text-accent-foreground text-sm font-bold px-5 py-2.5 rounded-lg w-full"
              >
                Free Estimate
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="pt-16 min-h-screen grid md:grid-cols-[1fr_1fr]"
      >
        {/* Left — copy */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 md:py-0">
          <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-5">
            Cincinnati Area
          </span>
          <h1
            className="text-[clamp(2.8rem,6vw,4.5rem)] font-extrabold text-primary leading-[1.05] mb-6"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Home Repairs<br />
            Done Right.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-9 max-w-md">
            Professional painting, drywall, furniture assembly, and
            installations — delivered on time, at a price that makes sense.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-primary text-primary-foreground font-bold px-8 py-4 rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2 text-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Get a Free Estimate <ChevronRight size={16} />
            </button>
            <a
              href="tel:6173680505"
              className="border-2 border-primary text-primary font-bold px-8 py-4 rounded-lg hover:bg-primary/5 transition-all flex items-center gap-2 text-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <Phone size={15} /> Call Now
            </a>
          </div>
          <div className="flex flex-wrap gap-5">
            {["Licensed & Insured", "Free Estimates", "Satisfaction Guaranteed"].map(
              (tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <CheckCircle size={14} className="text-accent shrink-0" />
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* Right — image split */}
        <div className="relative hidden md:block bg-secondary">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=960&h=1080&fit=crop&auto=format"
            alt="Professional home maintenance worker painting a wall"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/25" />

          {/* Floating stat cards */}
          <div className="absolute bottom-14 left-8 bg-background/95 backdrop-blur-sm rounded-xl p-5 shadow-2xl">
            <p
              className="text-4xl font-extrabold text-primary leading-none"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              5.0
            </p>
            <div className="flex gap-0.5 my-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} className="text-accent fill-accent" />
              ))}
            </div>
            <p className="text-muted-foreground text-xs">Average Rating</p>
          </div>
          <div className="absolute top-14 right-8 bg-background/95 backdrop-blur-sm rounded-xl p-5 shadow-2xl">
            <p
              className="text-4xl font-extrabold text-primary leading-none"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              100%
            </p>
            <p className="text-muted-foreground text-xs mt-1.5">
              Satisfaction Rate
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-secondary/60">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              What We Do
            </span>
            <h2
              className="text-4xl font-extrabold text-primary mt-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Our Services
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed">
              From a single repair to a full room refresh — we handle it all
              with care and precision.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-card rounded-xl p-7 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3
                    className="text-base font-extrabold text-foreground mb-2"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Our Promise
            </span>
            <h2
              className="text-4xl font-extrabold mt-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Why Homeowners Choose Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h3
                    className="text-base font-extrabold"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {p.label}
                  </h3>
                  <p className="text-primary-foreground/65 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="process" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Simple Process
            </span>
            <h2
              className="text-4xl font-extrabold text-primary mt-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              How It Works
            </h2>
            <p className="text-muted-foreground mt-3 text-sm max-w-md leading-relaxed">
              Getting your home fixed up is easier than you think. Three steps
              is all it takes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[55%] right-[-10%] h-px bg-border" />
                )}
                <p
                  className="text-6xl font-extrabold text-muted/70 mb-5 leading-none"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {step.number}
                </p>
                <h3
                  className="text-lg font-extrabold text-foreground mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-secondary/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Happy Clients
            </span>
            <h2
              className="text-4xl font-extrabold text-primary mt-2"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              What People Are Saying
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-card rounded-xl p-7 border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-7">
                  "{t.text}"
                </p>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                    <MapPin size={10} /> {t.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-accent">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-3xl font-extrabold text-white leading-snug"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Ready to get started?
            </h2>
            <p className="text-white/75 mt-2 text-sm">
              Call us or send a message — estimates are always free.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:0016173680505"
              className="bg-white text-accent font-bold px-7 py-4 rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 text-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <Phone size={15} /> +1 (617-368-0505)
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="border-2 border-white text-white font-bold px-7 py-4 rounded-lg hover:bg-white/10 transition-colors text-sm"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Send a Message
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_1.2fr] gap-16">
          <div>
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase">
              Get in Touch
            </span>
            <h2
              className="text-4xl font-extrabold text-primary mt-2 mb-5"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Request a Free Estimate
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-sm">
              Tell us about your project and we'll get back to you within 24
              hours with a clear, no-obligation quote.
            </p>
            <div className="flex flex-col gap-5">
              <a href="tel:6173680505" className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                  <Phone size={17} className="text-accent" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Phone
                  </p>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    617-368-0505
                  </p>
                </div>
              </a>
              <a
                href="mailto:hamdanshomemaintenance@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors shrink-0">
                  <Mail size={17} className="text-accent" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Email
                  </p>
                  <p className="text-sm font-bold text-foreground mt-0.5 break-all">
                    hamdanshomemaintenance@gmail.com
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin size={17} className="text-accent" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                    Service Area
                  </p>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    Cincinnati, OH & Surrounding Areas
                  </p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <p
              className="font-extrabold text-sm tracking-tight"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              HAMDAN'S HOME MAINTENANCE
            </p>
            <p className="text-primary-foreground/50 text-xs mt-1">
              Cincinnati Area · Licensed & Insured
            </p>
          </div>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <a
              href="tel:0016173680505"
              className="hover:text-primary-foreground transition-colors"
            >
              +1 (617-368-0505)
            </a>
            <a
              href="mailto:hamdanshomemaintenance@gmail.com"
              className="hover:text-primary-foreground transition-colors"
            >
              Email Us
            </a>
          </div>
          <p className="text-primary-foreground/35 text-xs">
            © 2025 Hamdan's Home Maintenance
          </p>
        </div>
      </footer>
    </div>
  );
}
