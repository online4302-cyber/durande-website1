import React, { useState, useEffect, useRef } from "react";
import {
  Server,
  Code2,
  Users,
  Workflow,
  Sparkles,
  Globe,
  LayoutDashboard,
  Plug,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  X,
  Mail,
  MapPin,
  Building2,
  Home,
  ShoppingBag,
  Briefcase,
  Rocket,
  Store,
  FileSpreadsheet,
  Shield,
  Zap,
  Palette,
  Bell,
  Calendar,
  Receipt,
  UserCog,
  Headphones,
  Terminal,
  Cpu,
  Phone,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Atoms                                                                     */
/* -------------------------------------------------------------------------- */
const Mono = ({ children, className = "" }) => (
  <span
    className={className}
    style={{ fontFamily: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace' }}
  >
    {children}
  </span>
);

const SectionLabel = ({ number, children, light = false }) => (
  <Mono
    className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] ${
      light ? "text-zinc-500" : "text-zinc-500"
    }`}
  >
    <span className={light ? "text-blue-600" : "text-blue-400"}>//</span>
    <span>{number}</span>
    <span className={light ? "text-zinc-300" : "text-zinc-700"}>—</span>
    <span className={light ? "text-zinc-700" : "text-zinc-400"}>{children}</span>
  </Mono>
);

const StatusDot = ({ color = "emerald" }) => (
  <span className="relative flex h-1.5 w-1.5">
    <span
      className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
        color === "emerald" ? "bg-emerald-500" : "bg-blue-500"
      }`}
    />
    <span
      className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
        color === "emerald" ? "bg-emerald-500" : "bg-blue-500"
      }`}
    />
  </span>
);

const PrimaryButton = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`group inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-[13px] font-medium text-white shadow-[0_10px_40px_-15px_rgba(37,99,235,0.7)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_15px_50px_-15px_rgba(37,99,235,0.85)] hover:-translate-y-0.5 ${className}`}
  >
    {children}
    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
  </button>
);

const GhostButton = ({ children, onClick, light = false, className = "" }) => (
  <button
    onClick={onClick}
    className={`group inline-flex items-center gap-2 rounded-md border px-5 py-3 text-[13px] font-medium backdrop-blur transition-all duration-300 hover:-translate-y-0.5 ${
      light
        ? "border-zinc-300 bg-white text-zinc-900 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
        : "border-white/10 bg-white/[0.02] text-zinc-200 hover:border-white/30 hover:bg-white/[0.05]"
    } ${className}`}
  >
    {children}
    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </button>
);

/* -------------------------------------------------------------------------- */
/*  Decoration                                                                */
/* -------------------------------------------------------------------------- */
const GridBg = ({ opacity = 0.06 }) => (
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      opacity,
      backgroundImage:
        "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
      backgroundSize: "56px 56px",
      maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
    }}
  />
);

const GridBgLight = ({ opacity = 0.5 }) => (
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      opacity,
      backgroundImage:
        "linear-gradient(rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.05) 1px, transparent 1px)",
      backgroundSize: "56px 56px",
      maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
      WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
    }}
  />
);

const Glow = ({ className = "" }) => (
  <div className={`pointer-events-none absolute rounded-full blur-[140px] ${className}`} />
);

const Noise = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />
);

/* -------------------------------------------------------------------------- */
/*  Main                                                                      */
/* -------------------------------------------------------------------------- */
export default function DurandeWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!form.name || !form.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    }, 3500);
  };

  /* ------------------------------ data ------------------------------ */
  const navItems = [
    { label: "services", id: "services", n: "01" },
    { label: "process", id: "process", n: "02" },
    { label: "solutions", id: "solutions", n: "03" },
    { label: "pricing", id: "pricing", n: "04" },
    { label: "contact", id: "contact", n: "05" },
  ];

  const services = [
    { icon: Server, title: "Hosting Consultancy", file: "hosting.ts", desc: "Pick the right infrastructure for your scale. Performance, security and cost reviewed end-to-end." },
    { icon: Code2, title: "Web App Development", file: "web-app.ts", desc: "Modern, secure web applications built around your business logic — fast, maintainable, ready to scale." },
    { icon: Users, title: "Client Portals", file: "portal.ts", desc: "Branded portals where customers log in, view information, upload documents and self-serve 24/7." },
    { icon: Workflow, title: "Business Automation", file: "automate.ts", desc: "Replace repetitive admin with automated workflows that save hours every week and remove human error." },
    { icon: Sparkles, title: "Custom Software", file: "custom.ts", desc: "Bespoke software shaped to exactly how your business operates — no compromises, no bloat." },
    { icon: Globe, title: "Website Development", file: "website.ts", desc: "Polished marketing sites that convert visitors and properly represent your brand." },
    { icon: LayoutDashboard, title: "CRM & Dashboards", file: "dashboard.ts", desc: "Centralised dashboards that give you a single source of truth for your operations." },
    { icon: Plug, title: "API Integrations", file: "integrate.ts", desc: "Connect payments, email, accounting and CRM tools into one smooth, unified workflow." },
  ];

  const whyUs = [
    { icon: Palette, title: "Tailored Solutions", desc: "Software shaped to your workflow — not the other way around." },
    { icon: Shield, title: "Secure & Scalable", desc: "Built on robust foundations that grow as your business grows." },
    { icon: Headphones, title: "Fast, Reliable Support", desc: "Real humans, quick replies, and proactive maintenance." },
    { icon: Briefcase, title: "Business-Focused", desc: "We think outcomes first — technology is the tool, not the point." },
    { icon: Cpu, title: "Clean Interfaces", desc: "UI your team and customers actually enjoy using." },
    { icon: Zap, title: "Automation by Default", desc: "Reclaim hours every week by removing manual, repetitive work." },
  ];

  const steps = [
    { n: "01", cmd: "consultation", title: "Discovery", desc: "We listen to your goals, map your current systems, and identify where software will create the biggest impact." },
    { n: "02", cmd: "design", title: "Planning & Design", desc: "Clear scope, sensible architecture and clean interface designs — agreed with you before we build." },
    { n: "03", cmd: "build", title: "Development", desc: "We build in iterative sprints with regular previews so nothing is ever a surprise at the end." },
    { n: "04", cmd: "deploy", title: "Launch & Support", desc: "We deploy, train your team, and stay on hand for ongoing improvements as your business evolves." },
  ];

  const industries = [
    { icon: Building2, label: "Property" },
    { icon: Home, label: "Estate Agents" },
    { icon: ShoppingBag, label: "Retail" },
    { icon: Briefcase, label: "Services" },
    { icon: Rocket, label: "Startups" },
    { icon: Store, label: "Local Business" },
    { icon: FileSpreadsheet, label: "Admin-Heavy Ops" },
  ];

  const solutions = [
    { icon: Building2, name: "PropertyPortal", desc: "End-to-end systems for properties, tenancies and maintenance." },
    { icon: Receipt, name: "InvoiceDashboard", desc: "Track invoices, reconcile payments and view balances at a glance." },
    { icon: Users, name: "TenantLandlordSuite", desc: "Branded portals with role-based access for owners and renters." },
    { icon: UserCog, name: "StaffManager", desc: "Rotas, tasks, permissions and internal comms in one place." },
    { icon: Calendar, name: "BookingEngine", desc: "Take bookings, manage availability and automate confirmations." },
    { icon: Bell, name: "NotifyFlow", desc: "Trigger reminders, alerts and follow-ups without lifting a finger." },
  ];

  const pricing = [
    {
      name: "Starter Web Portal",
      price: "499",
      tagline: "For small businesses needing a simple online portal.",
      features: ["Basic client or admin portal", "Login system", "Simple dashboard", "Up to 5 main pages", "Basic database setup", "Mobile responsive design", "1 round of revisions"],
      featured: false,
    },
    {
      name: "Business Web Portal",
      price: "999",
      tagline: "For growing businesses needing a more complete portal system.",
      features: ["Custom web portal", "User roles and permissions", "Admin dashboard", "Customer/client dashboard", "Database integration", "Forms and document uploads", "Email notifications", "Mobile responsive design", "2 rounds of revisions"],
      featured: true,
    },
    {
      name: "Advanced Portal & Automation",
      price: "1,999",
      tagline: "For businesses needing automation and advanced database features.",
      features: ["Advanced custom portal", "Full database design", "Automation workflows", "API integrations", "Payment or invoice tracking", "Reports and analytics dashboard", "Email/SMS automation", "Ongoing support options"],
      featured: false,
    },
    {
      name: "Database Services",
      price: "299",
      tagline: "For businesses needing database setup, cleanup, or management.",
      features: ["Database design", "Data migration", "Database optimisation", "Secure data storage structure", "Backup planning", "Admin reporting tables", "Database consultation"],
      featured: false,
    },
  ];

  const stack = [
    "React", "TypeScript", "Next.js", "Node.js", "Postgres", "Supabase",
    "Vercel", "AWS", "Docker", "Stripe", "Tailwind", "Python",
    "TanStack", "Prisma", "Redis", "GraphQL",
  ];

  return (
    <div
      className="min-h-screen bg-[#08080a] text-zinc-100 antialiased selection:bg-blue-500/30 selection:text-white"
      style={{ fontFamily: '"Geist", system-ui, sans-serif' }}
    >
      {/* ===================================================================
          NAV
          =================================================================== */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#08080a]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 group">
            <div className="relative h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-transform duration-500 group-hover:rotate-6">
              <div className="absolute inset-[2px] rounded-[5px] bg-[#08080a] flex items-center justify-center">
                <Mono className="text-blue-400 text-sm font-medium">D</Mono>
              </div>
            </div>
            <Mono className="text-[14px] tracking-tight text-zinc-100">
              durande<span className="text-blue-400">.</span>com
            </Mono>
          </button>

          <div className="hidden lg:flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.02] p-1 backdrop-blur">
            {navItems.map((it) => (
              <button
                key={it.id}
                onClick={() => scrollTo(it.id)}
                className="group rounded-full px-3.5 py-1.5 text-[13px] text-zinc-400 transition-all hover:bg-white/[0.05] hover:text-white"
              >
                <Mono className="text-blue-400/70 mr-1.5 text-[11px]">{it.n}</Mono>
                {it.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
              <StatusDot />
              <Mono className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                all systems operational
              </Mono>
            </div>
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-[13px] font-medium text-white shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)] ring-1 ring-blue-400/20 transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.8)]"
            >
              Get in touch
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <button
            className="lg:hidden p-2 rounded-md text-zinc-300 hover:bg-white/[0.05]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-white/[0.06] bg-[#08080a]/95 backdrop-blur-xl">
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((it) => (
                <button
                  key={it.id}
                  onClick={() => scrollTo(it.id)}
                  className="rounded-md px-4 py-3 text-left text-sm text-zinc-300 hover:bg-white/[0.05]"
                >
                  <Mono className="text-blue-400/70 mr-2 text-[11px]">{it.n}</Mono>
                  {it.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)] ring-1 ring-blue-400/20"
              >
                Get in touch
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ===================================================================
          HERO  ·  DARK
          =================================================================== */}
      <section id="hero" className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] via-[#0a0d1a] to-[#08080a]" />
        <Glow className="-top-40 -left-40 h-[600px] w-[600px] bg-blue-600/25" />
        <Glow className="top-10 right-0 h-[500px] w-[500px] bg-cyan-500/10" />
        <GridBg opacity={0.08} />
        <Noise />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 backdrop-blur">
              <StatusDot />
              <Mono className="text-[11px] uppercase tracking-[0.2em] text-zinc-300">
                v.2026 · uk software studio
              </Mono>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1
              className="mt-8 max-w-5xl text-5xl leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[88px]"
              style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
            >
              Smart software solutions
              <br />
              for{" "}
              <span
                className="italic text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-300"
                style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400 }}
              >
                modern businesses
              </span>
              <span className="text-blue-400">.</span>
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Durande.com helps businesses ship powerful web apps, secure hosting,
              automation systems and custom software — built in the UK, engineered
              to last.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton onClick={() => scrollTo("contact")}>
                Get a Free Consultation
              </PrimaryButton>
              <GhostButton onClick={() => scrollTo("services")}>
                View Our Services
              </GhostButton>
            </div>
          </Reveal>

          {/* terminal block */}
          <Reveal delay={500}>
            <div className="mt-20 max-w-2xl">
              <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c10] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  </div>
                  <Mono className="text-[11px] text-zinc-500">~/durande/new-project</Mono>
                  <Terminal className="h-3.5 w-3.5 text-zinc-600" />
                </div>
                <div className="p-5 text-[13px] leading-relaxed">
                  <Mono className="block text-zinc-500">
                    <span className="text-blue-400">$</span> durande init{" "}
                    <span className="text-zinc-300">--scope=business</span>
                  </Mono>
                  <Mono className="mt-2 block text-zinc-500">
                    <span className="text-emerald-400">✓</span>{" "}
                    <span className="text-zinc-300">listening to your goals</span>
                  </Mono>
                  <Mono className="mt-1 block text-zinc-500">
                    <span className="text-emerald-400">✓</span>{" "}
                    <span className="text-zinc-300">mapping current systems</span>
                  </Mono>
                  <Mono className="mt-1 block text-zinc-500">
                    <span className="text-emerald-400">✓</span>{" "}
                    <span className="text-zinc-300">scoping the build</span>
                  </Mono>
                  <Mono className="mt-2 block text-zinc-500">
                    <span className="text-blue-400">$</span> durande deploy{" "}
                    <span className="inline-block h-3.5 w-1.5 translate-y-0.5 bg-blue-400 animate-pulse" />
                  </Mono>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================================
          STACK MARQUEE  ·  DARK
          =================================================================== */}
      <section className="relative border-y border-white/[0.06] bg-[#0a0a0c] py-6 overflow-hidden">
        <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent" />
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...stack, ...stack, ...stack].map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-zinc-500">
              <span className="h-1 w-1 rounded-full bg-blue-400/60" />
              <Mono className="text-[13px] uppercase tracking-[0.18em]">{s}</Mono>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-33.333%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
        `}</style>
      </section>

      {/* ===================================================================
          ABOUT  ·  LIGHT
          =================================================================== */}
      <section id="about" className="relative bg-[#fafafa] text-zinc-900 py-24 lg:py-32 overflow-hidden">
        <Glow className="top-1/3 -left-32 h-[400px] w-[400px] bg-blue-500/10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel number="00" light>about</SectionLabel>
              </Reveal>
              <Reveal delay={100}>
                <h2
                  className="mt-5 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl text-zinc-900"
                  style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
                >
                  Reliable digital systems,{" "}
                  <span
                    className="italic text-blue-600"
                    style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400 }}
                  >
                    built around you.
                  </span>
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7 lg:pt-4">
              <Reveal delay={200}>
                <p className="text-lg leading-relaxed text-zinc-700">
                  Durande.com is a UK-based software studio that designs and
                  builds the digital systems modern businesses actually need —
                  client portals, automation workflows, dashboards, hosting
                  advice and bespoke software made to fit the way you work.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="mt-5 text-lg leading-relaxed text-zinc-600">
                  We focus on practical outcomes: removing manual admin,
                  centralising information, and giving you and your customers a
                  cleaner, faster way to get things done. Every project is shaped
                  around your business — not a template.
                </p>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-10 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
                  {[
                    { v: "100%", k: "bespoke" },
                    { v: "UK", k: "based" },
                    { v: "e2e", k: "delivery" },
                  ].map((s) => (
                    <div key={s.k}>
                      <Mono className="text-3xl text-zinc-900 font-medium">{s.v}</Mono>
                      <Mono className="mt-2 block text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                        {s.k}
                      </Mono>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SERVICES  ·  DARK
          =================================================================== */}
      <section
        id="services"
        className="relative overflow-hidden bg-[#0a0a0c] py-24 lg:py-32"
      >
        <Glow className="-top-32 right-1/4 h-[420px] w-[420px] bg-blue-600/15" />
        <GridBg opacity={0.05} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Reveal>
                <SectionLabel number="01">services</SectionLabel>
              </Reveal>
              <Reveal delay={100}>
                <h2
                  className="mt-5 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
                >
                  Eight ways we ship —{" "}
                  <span className="text-zinc-500">all under one roof.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <p className="max-w-md text-zinc-400">
                From quick websites to complex automation platforms, every
                service is delivered with the same engineering rigour.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 60}>
                  <div className="group relative h-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#0c0c10] transition-all duration-500 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(59,130,246,0.5)]">
                    <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.015] px-4 py-2.5">
                      <Mono className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                        {String(i + 1).padStart(2, "0")} · {s.file}
                      </Mono>
                      <div className="h-1 w-1 rounded-full bg-zinc-700 group-hover:bg-emerald-400 transition-colors" />
                    </div>

                    <div className="p-6">
                      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 ring-1 ring-blue-500/20 transition-all group-hover:bg-blue-500/20 group-hover:ring-blue-400/40">
                        <Icon className="h-4.5 w-4.5 text-blue-300" />
                      </div>
                      <h3 className="text-[15px] font-medium text-white">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-400">
                        {s.desc}
                      </p>
                      <div className="mt-5 flex items-center gap-1.5 text-blue-400 opacity-0 transition-opacity group-hover:opacity-100">
                        <Mono className="text-[11px] uppercase tracking-[0.16em]">
                          learn more
                        </Mono>
                        <ArrowUpRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          WHY US  ·  LIGHT
          =================================================================== */}
      <section id="why" className="relative bg-[#fafafa] text-zinc-900 py-24 lg:py-32 overflow-hidden">
        <GridBgLight opacity={0.6} />
        <Glow className="bottom-0 right-1/4 h-[400px] w-[400px] bg-blue-500/8" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <Reveal>
              <SectionLabel number="02" light>why durande</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="mt-5 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl text-zinc-900"
                style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
              >
                Software that feels considered —{" "}
                <span className="text-zinc-500">from first click to long-term support.</span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.title} delay={i * 50}>
                  <div className="group relative h-full bg-white p-8 transition-colors duration-300 hover:bg-zinc-50">
                    <Mono className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                      0{i + 1}
                    </Mono>
                    <div className="mt-4 mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-blue-100 transition-all group-hover:bg-blue-100 group-hover:ring-blue-200">
                      <Icon className="h-4.5 w-4.5 text-blue-600" />
                    </div>
                    <h3 className="text-[16px] font-medium text-zinc-900">{w.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-600">
                      {w.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          PROCESS  ·  DARK
          =================================================================== */}
      <section
        id="process"
        className="relative overflow-hidden bg-[#0a0a0c] py-24 lg:py-32"
      >
        <Glow className="top-1/3 left-1/2 -translate-x-1/2 h-[500px] w-[700px] bg-blue-700/15" />
        <GridBg opacity={0.05} />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <Reveal>
              <SectionLabel number="03">process</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="mt-5 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
              >
                A clear path from idea{" "}
                <span className="text-zinc-500">to launch.</span>
              </h2>
            </Reveal>
          </div>

          <div className="relative mt-20">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block" />
            <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
              {steps.map((step, i) => (
                <Reveal key={step.n} delay={i * 120}>
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/[0.08] bg-[#0c0c10] ring-4 ring-[#0a0a0c]">
                      <Mono className="text-blue-300 text-[15px]">{step.n}</Mono>
                    </div>

                    <div className="mt-7">
                      <Mono className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                        <span className="text-blue-400">$</span> {step.cmd}
                      </Mono>
                      <h3
                        className="mt-3 text-2xl text-white"
                        style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
                      >
                        {step.title}
                      </h3>
                      <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          INDUSTRIES  ·  LIGHT
          =================================================================== */}
      <section id="industries" className="relative bg-[#fafafa] text-zinc-900 py-24 lg:py-32 overflow-hidden">
        <Glow className="top-1/3 right-0 h-[400px] w-[400px] bg-blue-500/8" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel number="04" light>industries</SectionLabel>
              </Reveal>
              <Reveal delay={100}>
                <h2
                  className="mt-5 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl text-zinc-900"
                  style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
                >
                  Built for the businesses{" "}
                  <span className="text-zinc-500">that run Britain.</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 text-lg text-zinc-600">
                  Wherever there's paperwork, repetitive admin, or a workflow
                  begging to be digitised — we fit right in.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2.5">
                {industries.map((ind, i) => {
                  const Icon = ind.icon;
                  return (
                    <Reveal key={ind.label} delay={i * 50}>
                      <div className="group inline-flex items-center gap-2.5 rounded-md border border-zinc-200 bg-white px-4 py-2.5 transition-all hover:border-blue-500/50 hover:bg-blue-50 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(37,99,235,0.4)]">
                        <Icon className="h-3.5 w-3.5 text-blue-600" />
                        <Mono className="text-[12px] uppercase tracking-[0.14em] text-zinc-700">
                          {ind.label}
                        </Mono>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SOLUTIONS  ·  DARK
          =================================================================== */}
      <section
        id="solutions"
        className="relative overflow-hidden bg-[#0a0a0c] py-24 lg:py-32"
      >
        <GridBg opacity={0.05} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <Reveal>
              <SectionLabel number="05">featured solutions</SectionLabel>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="mt-5 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl"
                style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
              >
                Real systems we{" "}
                <span
                  className="italic text-blue-400"
                  style={{ fontFamily: '"Instrument Serif", serif' }}
                >
                  love to build.
                </span>
              </h2>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol, i) => {
              const Icon = sol.icon;
              return (
                <Reveal key={sol.name} delay={i * 80}>
                  <div className="group relative h-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#0c0c10] p-7 transition-all duration-500 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(59,130,246,0.5)]">
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/0 blur-2xl transition-all duration-700 group-hover:bg-blue-500/15" />
                    <div className="relative">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]">
                        <Icon className="h-4.5 w-4.5 text-white" />
                      </div>
                      <div className="mt-6">
                        <Mono className="text-[15px] text-white">
                          <span className="text-zinc-600">&lt;</span>
                          {sol.name}
                          <span className="text-blue-400"> /</span>
                          <span className="text-zinc-600">&gt;</span>
                        </Mono>
                      </div>
                      <p className="mt-3 text-[13px] leading-relaxed text-zinc-400">
                        {sol.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================================
          PRICING  ·  LIGHT (featured card stays dark for contrast)
          =================================================================== */}
      <section id="pricing" className="relative bg-[#fafafa] text-zinc-900 py-24 lg:py-32 overflow-hidden">
        <GridBgLight opacity={0.5} />
        <Glow className="top-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] bg-blue-500/8" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center">
            <Reveal>
              <div className="inline-block">
                <SectionLabel number="06" light>pricing</SectionLabel>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2
                className="mx-auto mt-5 max-w-3xl text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl text-zinc-900"
                style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
              >
                Transparent pricing,{" "}
                <span className="text-zinc-500">flexible scope.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mx-auto mt-5 max-w-xl text-zinc-600">
                Starting estimates designed to give you a real benchmark before
                we shape a final quote around your project.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {pricing.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 90}>
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 ${
                    plan.featured
                      ? "border border-blue-500/40 bg-gradient-to-b from-[#0c0c10] to-[#08080a] text-zinc-100 shadow-[0_40px_80px_-30px_rgba(59,130,246,0.5)]"
                      : "border border-zinc-200 bg-white text-zinc-900 hover:border-blue-500/40 hover:shadow-[0_30px_60px_-20px_rgba(37,99,235,0.18)]"
                  }`}
                >
                  {plan.featured && (
                    <>
                      <Glow className="-top-20 -right-20 h-60 w-60 bg-blue-600/30" />
                      <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/15 px-2.5 py-1">
                        <StatusDot color="blue" />
                        <Mono className="text-[9px] uppercase tracking-[0.2em] text-blue-200">
                          most popular
                        </Mono>
                      </div>
                    </>
                  )}

                  <div className="relative">
                    <Mono
                      className={`text-[10px] uppercase tracking-[0.18em] ${
                        plan.featured ? "text-zinc-500" : "text-zinc-500"
                      }`}
                    >
                      plan / 0{i + 1}
                    </Mono>
                    <h3
                      className={`mt-4 text-xl ${
                        plan.featured ? "text-white" : "text-zinc-900"
                      }`}
                      style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mt-2 text-[13px] leading-relaxed ${
                        plan.featured ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {plan.tagline}
                    </p>

                    <div className="mt-6 flex items-baseline gap-1">
                      <Mono
                        className={`text-[11px] uppercase tracking-[0.18em] ${
                          plan.featured ? "text-zinc-500" : "text-zinc-500"
                        }`}
                      >
                        from
                      </Mono>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <Mono
                        className={`text-2xl ${
                          plan.featured ? "text-zinc-400" : "text-zinc-500"
                        }`}
                      >
                        £
                      </Mono>
                      <Mono
                        className={`text-5xl font-medium ${
                          plan.featured ? "text-white" : "text-zinc-900"
                        }`}
                      >
                        {plan.price}
                      </Mono>
                    </div>

                    <button
                      onClick={() => scrollTo("contact")}
                      className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[13px] font-medium transition-all ${
                        plan.featured
                          ? "bg-blue-500 text-white hover:bg-blue-400"
                          : "bg-zinc-900 text-white hover:bg-blue-600"
                      }`}
                    >
                      Enquire
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <div
                      className={`mt-7 h-px ${
                        plan.featured ? "bg-white/[0.06]" : "bg-zinc-200"
                      }`}
                    />

                    <ul className="mt-5 space-y-2.5">
                      {plan.features.map((f) => (
                        <li
                          key={f}
                          className={`flex items-start gap-2.5 text-[13px] ${
                            plan.featured ? "text-zinc-300" : "text-zinc-700"
                          }`}
                        >
                          <Check
                            className={`mt-0.5 h-3.5 w-3.5 flex-shrink-0 ${
                              plan.featured ? "text-blue-400" : "text-blue-600"
                            }`}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mx-auto mt-12 max-w-2xl text-center text-[13px] italic text-zinc-500">
              Prices are starting estimates and may vary depending on project
              size, features, integrations, and support requirements.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0c0c10] to-[#0a0d1a] px-8 py-10 text-center sm:px-12">
              <h3
                className="max-w-2xl text-2xl leading-tight text-white sm:text-3xl"
                style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
              >
                Not sure which package is right for you?{" "}
                <span
                  className="italic text-blue-400"
                  style={{ fontFamily: '"Instrument Serif", serif' }}
                >
                  Contact us for a free consultation.
                </span>
              </h3>
              <PrimaryButton onClick={() => scrollTo("contact")}>
                Get Pricing Advice
              </PrimaryButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================================
          MAIN CTA  ·  DARK
          =================================================================== */}
      <section className="relative overflow-hidden py-28 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/20 via-[#08080a] to-[#08080a]" />
        <Glow className="top-0 left-1/4 h-[500px] w-[500px] bg-blue-500/25" />
        <Glow className="bottom-0 right-1/4 h-[400px] w-[400px] bg-cyan-500/15" />
        <GridBg opacity={0.07} />

        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <SectionLabel number="07">let's build</SectionLabel>
          </Reveal>
          <Reveal delay={150}>
            <h2
              className="mt-6 text-5xl leading-[1.02] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl"
              style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
            >
              Ready to build your next{" "}
              <span
                className="italic text-blue-300"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                digital system?
              </span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mx-auto mt-7 max-w-xl text-lg text-blue-100/70">
              Let Durande.com help you turn your business idea into a powerful
              online platform — secure, scalable, and made for the way you work.
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => scrollTo("contact")}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-4 text-[13px] font-medium text-white shadow-[0_0_40px_-5px_rgba(59,130,246,0.7)] ring-1 ring-blue-400/30 transition-all hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-500 hover:shadow-[0_0_60px_-5px_rgba(59,130,246,0.9)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Mono className="text-blue-200/80 text-[11px]">$</Mono>
                  Start Your Project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================================================================
          CONTACT  ·  LIGHT
          =================================================================== */}
      <section id="contact" className="relative bg-[#fafafa] text-zinc-900 py-24 lg:py-32 overflow-hidden">
        <Glow className="top-1/4 -right-32 h-[400px] w-[400px] bg-blue-500/8" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel number="08" light>contact</SectionLabel>
              </Reveal>
              <Reveal delay={100}>
                <h2
                  className="mt-5 text-4xl leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl text-zinc-900"
                  style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
                >
                  Tell us about your{" "}
                  <span
                    className="italic text-blue-600"
                    style={{ fontFamily: '"Instrument Serif", serif' }}
                  >
                    project.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-6 text-lg text-zinc-600">
                  Share a few details and we'll come back with a free,
                  no-obligation consultation — typically within one working day.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-10 space-y-3">
                  {[
                    { icon: Mail, label: "info@durande.com" },
                    { icon: Phone, label: "+44 (0) 20 00100111" },
                    { icon: MapPin, label: "85 Station Road, North Harrow,Harrow, HA2 7SW United Kingdom" },
                  ].map((c) => {
                    const Icon = c.icon;
                    return (
                      <div
                        key={c.label}
                        className="flex items-center gap-3 rounded-md border border-zinc-200 bg-white px-4 py-3"
                      >
                        <Icon className="h-4 w-4 text-blue-600" />
                        <Mono className="text-[13px] text-zinc-700">{c.label}</Mono>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.15)]">
                  {/* form header bar */}
                  <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <StatusDot />
                      <Mono className="text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                        new enquiry
                      </Mono>
                    </div>
                    <Mono className="text-[11px] text-zinc-400">~/contact</Mono>
                  </div>

                  <div className="p-8 sm:p-10">
                    {submitted ? (
                      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
                          <Check className="h-7 w-7 text-blue-600" />
                        </div>
                        <h3
                          className="mt-6 text-3xl text-zinc-900"
                          style={{ fontFamily: '"Geist", sans-serif', fontWeight: 500 }}
                        >
                          Message received.
                        </h3>
                        <Mono className="mt-3 text-[12px] uppercase tracking-[0.18em] text-emerald-600">
                          ✓ status: queued
                        </Mono>
                        <p className="mt-3 max-w-sm text-zinc-600">
                          Thanks for reaching out — we'll be in touch shortly
                          with next steps.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field
                            label="name"
                            value={form.name}
                            onChange={(v) => setForm({ ...form, name: v })}
                            placeholder="your full name"
                            required
                          />
                          <Field
                            label="email"
                            type="email"
                            value={form.email}
                            onChange={(v) => setForm({ ...form, email: v })}
                            placeholder="name@business.com"
                            required
                          />
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                          <Field
                            label="phone"
                            type="tel"
                            value={form.phone}
                            onChange={(v) => setForm({ ...form, phone: v })}
                            placeholder="+44 0000 000 000"
                          />
                          <div>
                            <Mono className="block text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                              <span className="text-blue-600">$</span> service
                            </Mono>
                            <select
                              value={form.service}
                              onChange={(e) => setForm({ ...form, service: e.target.value })}
                              className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-[13px] text-zinc-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                              style={{
                                fontFamily: '"Geist Mono", "JetBrains Mono", monospace',
                              }}
                            >
                              <option value="">select a service…</option>
                              {services.map((s) => (
                                <option key={s.title} value={s.title}>
                                  {s.title}
                                </option>
                              ))}
                              <option value="Not sure / multiple">not sure / multiple</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <Mono className="block text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                            <span className="text-blue-600">$</span> message
                          </Mono>
                          <textarea
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            placeholder="a few lines about what you're building or trying to solve…"
                            className="mt-2 w-full resize-none rounded-md border border-zinc-200 bg-white px-4 py-3 text-[13px] text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            style={{
                              fontFamily: '"Geist Mono", "JetBrains Mono", monospace',
                            }}
                          />
                        </div>

                        <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                          <Mono className="text-[11px] text-zinc-500">
                            by submitting, you agree to be contacted.
                          </Mono>
                          <PrimaryButton onClick={handleSubmit}>Submit Enquiry</PrimaryButton>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FOOTER  ·  DARK
          =================================================================== */}
      <footer className="relative overflow-hidden bg-[#08080a]">
        <GridBg opacity={0.04} />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2.5">
                <div className="relative h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-700">
                  <div className="absolute inset-[2px] rounded-[5px] bg-[#08080a] flex items-center justify-center">
                    <Mono className="text-blue-400 text-sm">D</Mono>
                  </div>
                </div>
                <Mono className="text-[14px] tracking-tight text-zinc-100">
                  durande<span className="text-blue-400">.</span>com
                </Mono>
              </div>

              <p className="mt-6 max-w-sm text-[13px] leading-relaxed text-zinc-500">
                Software Development · Web Apps · Hosting Consultancy · Automation
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5">
                <StatusDot />
                <Mono className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                  taking on new projects
                </Mono>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
              <FooterCol title="services" items={services.slice(0, 4).map((s) => s.title)} />
              <FooterCol title="more" items={services.slice(4).map((s) => s.title)} />
              <FooterCol title="company" items={["About", "Process", "Pricing", "Contact"]} />
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
            <Mono className="text-[11px] text-zinc-600">
              © 2026 durande.com · all rights reserved
            </Mono>
            <Mono className="text-[11px] text-zinc-600">
              crafted in the united kingdom · v.2026.05
            </Mono>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small components                                                          */
/* -------------------------------------------------------------------------- */
function Field({ label, value, onChange, type = "text", placeholder, required }) {
  return (
    <div>
      <Mono className="block text-[11px] uppercase tracking-[0.18em] text-zinc-500">
        <span className="text-blue-600">$</span> {label}
        {required && <span className="ml-1 text-blue-600">*</span>}
      </Mono>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-4 py-3 text-[13px] text-zinc-900 placeholder:text-zinc-400 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        style={{ fontFamily: '"Geist Mono", "JetBrains Mono", monospace' }}
      />
    </div>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <Mono className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        // {title}
      </Mono>
      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="text-[13px] text-zinc-400 transition-colors hover:text-blue-300">
              {it}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
