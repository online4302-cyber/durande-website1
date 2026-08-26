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
  Briefcase,
  Rocket,
  ShoppingBag,
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
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Type tokens                                                               */
/* -------------------------------------------------------------------------- */
const SERIF = '"Instrument Serif", Georgia, "Times New Roman", serif';
const SANS = '"Geist", ui-sans-serif, system-ui, sans-serif';
const MONO = '"Geist Mono", ui-monospace, "SFMono-Regular", monospace';

/* Palette: paper #FBFBF9 · panel #FFFFFF · ink #16161A · muted #6C6C74
   line #E7E5DF · accent #2547E0 · tint #EDF0FE                            */

/* -------------------------------------------------------------------------- */
/*  Reveal on scroll                                                          */
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
      { threshold: 0.12 }
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
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                */
/* -------------------------------------------------------------------------- */
const Eyebrow = ({ index, children }) => (
  <span
    className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.22em] text-[#6C6C74]"
    style={{ fontFamily: MONO }}
  >
    <span className="text-[#2547E0]">{index}</span>
    <span className="h-px w-6 bg-[#D9D7CF]" />
    <span>{children}</span>
  </span>
);

const Primary = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`group inline-flex items-center justify-center gap-2 rounded-full bg-[#16161A] px-6 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#2547E0] motion-reduce:transition-none ${className}`}
  >
    {children}
    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
  </button>
);

const Ghost = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`group inline-flex items-center justify-center gap-2 rounded-full border border-[#D9D7CF] bg-transparent px-6 py-3 text-[14px] font-medium text-[#16161A] transition-colors duration-200 hover:border-[#16161A] motion-reduce:transition-none ${className}`}
  >
    {children}
    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
  </button>
);

const Dot = () => (
  <span className="relative flex h-2 w-2">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2547E0] opacity-60 motion-reduce:hidden" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2547E0]" />
  </span>
);

/* -------------------------------------------------------------------------- */
/*  Main                                                                      */
/* -------------------------------------------------------------------------- */
export default function DurandeWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
      setForm({ name: "", email: "", service: "", message: "" });
    }, 3500);
  };

  /* ------------------------------ data ------------------------------ */
  const navItems = [
    { label: "Services", id: "services" },
    { label: "Process", id: "process" },
    { label: "Systems", id: "solutions" },
    { label: "Pricing", id: "pricing" },
    { label: "Contact", id: "contact" },
  ];

  const services = [
    { icon: Code2, title: "Web App Development", file: "web-app", desc: "Modern, secure web applications built around your business logic — fast, maintainable, ready to scale." },
    { icon: Users, title: "Client Portals", file: "portals", desc: "Branded portals where customers log in, view information, upload documents and self-serve around the clock." },
    { icon: Workflow, title: "Business Automation", file: "automation", desc: "Replace repetitive admin with automated workflows that save hours every week and remove human error." },
    { icon: Sparkles, title: "Custom Software", file: "custom", desc: "Bespoke software shaped to exactly how your business operates — no compromises, no bloat." },
    { icon: LayoutDashboard, title: "CRM & Dashboards", file: "dashboards", desc: "Centralised dashboards that give you a single source of truth for your operations." },
    { icon: Plug, title: "API Integrations", file: "integrations", desc: "Connect payments, email, accounting and CRM tools into one smooth, unified workflow." },
    { icon: Globe, title: "Website Development", file: "websites", desc: "Polished marketing sites that convert visitors and properly represent your brand." },
    { icon: Server, title: "Hosting Consultancy", file: "hosting", desc: "Pick the right infrastructure for your scale. Performance, security and cost reviewed end-to-end." },
  ];

  const whyUs = [
    { icon: Palette, title: "Tailored Solutions", desc: "Software shaped to your workflow — not the other way around." },
    { icon: Shield, title: "Secure & Scalable", desc: "Built on robust foundations that grow as your business grows." },
    { icon: Headphones, title: "Reliable Support", desc: "Real humans, quick replies, and proactive maintenance." },
    { icon: Briefcase, title: "Business-Focused", desc: "We think outcomes first — technology is the tool, not the point." },
    { icon: Cpu, title: "Clean Interfaces", desc: "UI your team and customers actually enjoy using." },
    { icon: Zap, title: "Automation by Default", desc: "Reclaim hours every week by removing manual, repetitive work." },
  ];

  const steps = [
    { n: "01", cmd: "discovery", title: "Discovery", desc: "We listen to your goals, map your current systems, and identify where software will create the biggest impact." },
    { n: "02", cmd: "design", title: "Planning & Design", desc: "Clear scope, sensible architecture and clean interface designs — agreed with you before we build." },
    { n: "03", cmd: "build", title: "Development", desc: "We build in iterative sprints with regular previews, so nothing is ever a surprise at the end." },
    { n: "04", cmd: "launch", title: "Launch & Support", desc: "We deploy, train your team, and stay on hand for ongoing improvements as your business evolves." },
  ];

  const industries = ["SaaS", "Fintech", "E-commerce", "Professional Services", "Startups", "Dev Tools", "Data & Ops"];

  const solutions = [
    { icon: Server, name: "CloudInfra", desc: "Scalable cloud infrastructure, CI/CD pipelines and zero-downtime deploys." },
    { icon: Receipt, name: "InvoiceDashboard", desc: "Track invoices, reconcile payments and view balances at a glance." },
    { icon: Shield, name: "AuthGateway", desc: "Secure authentication, role-based access and SSO across your apps." },
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
      features: ["Custom web portal", "User roles and permissions", "Admin dashboard", "Customer / client dashboard", "Database integration", "Forms and document uploads", "Email notifications", "Mobile responsive"],
      featured: true,
    },
    {
      name: "Advanced Portal & Automation",
      price: "1,999",
      tagline: "For businesses needing automation and advanced database features.",
      features: ["Advanced custom portal", "Full database design", "Automation workflows", "API integrations", "Payment or invoice tracking", "Reports and analytics dashboard", "Email / SMS automation"],
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

  /* ------------------------------ render ------------------------------ */
  return (
    <div
      className="min-h-screen bg-[#FBFBF9] text-[#16161A] antialiased selection:bg-[#2547E0] selection:text-white"
      style={{ fontFamily: SANS }}
    >
      {/* ===================== NAV ===================== */}
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-b border-[#E7E5DF] bg-[#FBFBF9]/95 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <button onClick={() => scrollTo("top")} className="flex items-baseline gap-0.5">
            <span className="text-[19px] font-semibold tracking-tight text-[#16161A]">Durande</span>
            <span className="text-[19px] font-semibold tracking-tight text-[#2547E0]">.com</span>
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((it) => (
              <button
                key={it.id}
                onClick={() => scrollTo(it.id)}
                className="text-[14px] text-[#6C6C74] transition-colors hover:text-[#16161A]"
              >
                {it.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <Primary onClick={() => scrollTo("contact")} className="px-5 py-2.5 text-[13px]">
              Start a project
            </Primary>
          </div>

          <button
            className="p-2 text-[#16161A] lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#E7E5DF] bg-[#FBFBF9] shadow-[0_20px_40px_-24px_rgba(22,22,26,0.3)] lg:hidden">
            <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
              {navItems.map((it) => (
                <button
                  key={it.id}
                  onClick={() => scrollTo(it.id)}
                  className="py-3 text-left text-[15px] text-[#16161A]"
                >
                  {it.label}
                </button>
              ))}
              <Primary onClick={() => scrollTo("contact")} className="mt-3">
                Start a project
              </Primary>
            </div>
          </div>
        )}
      </nav>

      {/* ===================== HERO ===================== */}
      <section id="top" className="relative overflow-hidden px-6 pt-36 pb-20 lg:px-8 lg:pt-44 lg:pb-28">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(22,22,26,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(22,22,26,0.04) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, black 5%, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 0%, black 5%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <Reveal>
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#E7E5DF] bg-white px-3.5 py-1.5">
                <Dot />
                <span className="text-[12px] tracking-tight text-[#6C6C74]" style={{ fontFamily: MONO }}>
                  Accepting new projects — 2026
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1
                className="text-[44px] leading-[1.04] tracking-[-0.01em] text-[#16161A] sm:text-[58px] lg:text-[68px]"
                style={{ fontFamily: SERIF }}
              >
                We design and build
                <br className="hidden sm:block" /> the software your
                <br className="hidden sm:block" /> business{" "}
                <span className="italic text-[#2547E0]">actually runs on.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-[#5A5A62]">
                Durande.com is a UK software studio building web apps, client portals,
                automation and custom systems for growing businesses. We turn manual,
                messy operations into clean software that scales.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Primary onClick={() => scrollTo("contact")}>Start a project</Primary>
                <Ghost onClick={() => scrollTo("services")}>Explore services</Ghost>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-[#9A9AA0]"
                style={{ fontFamily: MONO }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> United Kingdom
                </span>
                <span>Web · Portals · Automation · APIs</span>
              </div>
            </Reveal>
          </div>

          {/* Signature: build manifest panel */}
          <Reveal delay={200}>
            <div className="rounded-xl border border-[#E7E5DF] bg-white shadow-[0_1px_0_rgba(22,22,26,0.02),0_20px_50px_-30px_rgba(22,22,26,0.25)]">
              <div className="flex items-center justify-between border-b border-[#EDEBE5] px-4 py-3">
                <span className="text-[12px] text-[#9A9AA0]" style={{ fontFamily: MONO }}>
                  durande.manifest
                </span>
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E7E5DF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#E7E5DF]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2547E0]/70" />
                </div>
              </div>
              <div className="space-y-2.5 px-5 py-5 text-[13px]" style={{ fontFamily: MONO }}>
                <ManifestLine k="studio" v="durande.com" />
                <ManifestLine k="services" v="8 capabilities" />
                <ManifestLine k="systems" v="6 shipped products" />
                <ManifestLine k="stack" v="react · node · postgres" />
                <ManifestLine k="delivery" v="iterative sprints" />
                <ManifestLine k="status" v="accepting projects" accent />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== INDUSTRIES STRIP ===================== */}
      <section className="border-y border-[#E7E5DF] bg-white/60 px-6 py-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#9A9AA0]" style={{ fontFamily: MONO }}>
            Built for
          </span>
          {industries.map((it) => (
            <span key={it} className="text-[14px] text-[#6C6C74]">
              {it}
            </span>
          ))}
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section id="services" className="px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow index="01">Services</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-2xl text-[34px] leading-tight tracking-tight lg:text-[44px]" style={{ fontFamily: SERIF }}>
                Everything you need to ship, run and scale software.
              </h2>
              <p className="max-w-sm text-[15px] leading-relaxed text-[#6C6C74]">
                Eight core capabilities — combine them into whatever your business needs.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[#E7E5DF] bg-[#E7E5DF] sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 4) * 60}>
                <div className="group h-full bg-white p-6 transition-colors duration-200 hover:bg-[#FAFAFE]">
                  <div className="flex items-center justify-between">
                    <s.icon className="h-5 w-5 text-[#2547E0]" strokeWidth={1.6} />
                    <span className="text-[11px] text-[#B8B8BE]" style={{ fontFamily: MONO }}>
                      {s.file}.ts
                    </span>
                  </div>
                  <h3 className="mt-5 text-[16px] font-semibold tracking-tight text-[#16161A]">{s.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#6C6C74]">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section id="process" className="border-t border-[#E7E5DF] bg-white px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow index="02">Process</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 max-w-2xl text-[34px] leading-tight tracking-tight lg:text-[44px]" style={{ fontFamily: SERIF }}>
              A clear path from idea to launch.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, i) => (
              <Reveal key={st.n} delay={i * 70}>
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] text-[#2547E0]" style={{ fontFamily: MONO }}>
                      {st.n}
                    </span>
                    <span className="h-px flex-1 bg-[#E7E5DF]" />
                  </div>
                  <span className="mt-4 block text-[12px] text-[#B8B8BE]" style={{ fontFamily: MONO }}>
                    $ {st.cmd}
                  </span>
                  <h3 className="mt-2 text-[19px] font-semibold tracking-tight text-[#16161A]">{st.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-[#6C6C74]">{st.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SYSTEMS ===================== */}
      <section id="solutions" className="px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow index="03">Systems we ship</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-2xl text-[34px] leading-tight tracking-tight lg:text-[44px]" style={{ fontFamily: SERIF }}>
                Proven building blocks, tailored to you.
              </h2>
              <p className="max-w-sm text-[15px] leading-relaxed text-[#6C6C74]">
                Battle-tested modules we assemble and customise, so you don't start from zero.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol, i) => (
              <Reveal key={sol.name} delay={(i % 3) * 60}>
                <div className="group h-full rounded-xl border border-[#E7E5DF] bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C9C7BF] hover:shadow-[0_16px_40px_-28px_rgba(22,22,26,0.4)] motion-reduce:hover:translate-y-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EDF0FE]">
                    <sol.icon className="h-5 w-5 text-[#2547E0]" strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-5 text-[16px] font-semibold tracking-tight" style={{ fontFamily: MONO }}>
                    {sol.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[#6C6C74]">{sol.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHY US ===================== */}
      <section className="border-y border-[#E7E5DF] bg-white px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow index="04">Why Durande</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="mt-5 max-w-2xl text-[34px] leading-tight tracking-tight lg:text-[44px]" style={{ fontFamily: SERIF }}>
              An engineering partner, not just a vendor.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 60}>
                <div className="flex gap-4">
                  <div className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-[#E7E5DF]">
                    <w.icon className="h-[18px] w-[18px] text-[#16161A]" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-tight">{w.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6C6C74]">{w.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== STACK ===================== */}
      <section className="overflow-hidden py-14">
        <div className="mx-auto mb-8 max-w-6xl px-6 lg:px-8">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#9A9AA0]" style={{ fontFamily: MONO }}>
            Our toolkit
          </span>
        </div>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="flex animate-[marquee_38s_linear_infinite] gap-3 pr-3 motion-reduce:animate-none">
            {[...stack, ...stack].map((t, i) => (
              <span
                key={i}
                className="whitespace-nowrap rounded-full border border-[#E7E5DF] bg-white px-4 py-2 text-[13px] text-[#4A4A52]"
                style={{ fontFamily: MONO }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section id="pricing" className="border-t border-[#E7E5DF] px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow index="05">Pricing</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-2xl text-[34px] leading-tight tracking-tight lg:text-[44px]" style={{ fontFamily: SERIF }}>
                Transparent starting points.
              </h2>
              <p className="max-w-sm text-[15px] leading-relaxed text-[#6C6C74]">
                Fixed-scope packages to begin with — every project is quoted to fit. Prices in GBP.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pricing.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) * 60}>
                <div
                  className={`flex h-full flex-col rounded-xl border p-6 ${
                    p.featured
                      ? "border-[#16161A] bg-[#16161A] text-white"
                      : "border-[#E7E5DF] bg-white text-[#16161A]"
                  }`}
                >
                  {p.featured && (
                    <span
                      className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#2547E0] px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-white"
                      style={{ fontFamily: MONO }}
                    >
                      Most popular
                    </span>
                  )}
                  <h3 className="text-[15px] font-semibold tracking-tight">{p.name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className={`text-[15px] ${p.featured ? "text-zinc-400" : "text-[#9A9AA0]"}`}>£</span>
                    <span className="text-[38px] font-semibold tracking-tight" style={{ fontFamily: SERIF }}>
                      {p.price}
                    </span>
                  </div>
                  <p className={`mt-3 text-[13px] leading-relaxed ${p.featured ? "text-zinc-400" : "text-[#6C6C74]"}`}>
                    {p.tagline}
                  </p>
                  <div className={`my-5 h-px w-full ${p.featured ? "bg-white/10" : "bg-[#E7E5DF]"}`} />
                  <ul className="flex-1 space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-[13px] leading-snug">
                        <Check
                          className={`mt-0.5 h-3.5 w-3.5 flex-none ${p.featured ? "text-[#7C93FF]" : "text-[#2547E0]"}`}
                          strokeWidth={2.5}
                        />
                        <span className={p.featured ? "text-zinc-200" : "text-[#4A4A52]"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollTo("contact")}
                    className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors duration-200 ${
                      p.featured
                        ? "bg-white text-[#16161A] hover:bg-[#2547E0] hover:text-white"
                        : "border border-[#D9D7CF] text-[#16161A] hover:border-[#16161A]"
                    }`}
                  >
                    Get started
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" className="border-t border-[#E7E5DF] bg-white px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <Eyebrow index="06">Contact</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 text-[34px] leading-tight tracking-tight lg:text-[44px]" style={{ fontFamily: SERIF }}>
                Tell us what you're building.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#6C6C74]">
                Send a message with a little about your project and we'll get back to you with
                honest next steps — no obligation, no jargon.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <a
                href="mailto:info@durande.com"
                className="mt-8 inline-flex items-center gap-2.5 text-[14px] text-[#16161A] transition-colors hover:text-[#2547E0]"
                style={{ fontFamily: MONO }}
              >
                <Mail className="h-4 w-4 text-[#2547E0]" />
                info@durande.com
              </a>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="rounded-xl border border-[#E7E5DF] bg-[#FBFBF9] p-6 lg:p-8">
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name">
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full rounded-lg border border-[#E7E5DF] bg-white px-4 py-3 text-[14px] text-[#16161A] placeholder-[#B8B8BE] outline-none transition-colors focus:border-[#2547E0]"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      className="w-full rounded-lg border border-[#E7E5DF] bg-white px-4 py-3 text-[14px] text-[#16161A] placeholder-[#B8B8BE] outline-none transition-colors focus:border-[#2547E0]"
                    />
                  </Field>
                </div>

                <Field label="Service of interest">
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="w-full rounded-lg border border-[#E7E5DF] bg-white px-4 py-3 text-[14px] text-[#16161A] outline-none transition-colors focus:border-[#2547E0]"
                  >
                    <option value="">Select a service</option>
                    <option value="web-app">Web App Development</option>
                    <option value="portal">Client Portal</option>
                    <option value="automation">Business Automation</option>
                    <option value="custom">Custom Software</option>
                    <option value="website">Website Development</option>
                    <option value="dashboard">CRM &amp; Dashboards</option>
                    <option value="integration">API Integration</option>
                    <option value="hosting">Hosting Consultancy</option>
                  </select>
                </Field>

                <Field label="Message">
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="w-full resize-none rounded-lg border border-[#E7E5DF] bg-white px-4 py-3 text-[14px] text-[#16161A] placeholder-[#B8B8BE] outline-none transition-colors focus:border-[#2547E0]"
                  />
                </Field>

                <button
                  onClick={handleSubmit}
                  disabled={submitted}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#16161A] px-6 py-3.5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#2547E0] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitted ? "Message sent — we'll be in touch soon." : "Send message"}
                  {!submitted && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-[#E7E5DF] px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-baseline gap-0.5">
              <span className="text-[16px] font-semibold tracking-tight">Durande</span>
              <span className="text-[16px] font-semibold tracking-tight text-[#2547E0]">.com</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {navItems.map((it) => (
                <button
                  key={it.id}
                  onClick={() => scrollTo(it.id)}
                  className="text-[13px] text-[#6C6C74] transition-colors hover:text-[#16161A]"
                >
                  {it.label}
                </button>
              ))}
              <a
                href="mailto:info@durande.com"
                className="text-[13px] text-[#6C6C74] transition-colors hover:text-[#16161A]"
              >
                info@durande.com
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-[#EDEBE5] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-[12px] text-[#9A9AA0]" style={{ fontFamily: MONO }}>
              Durande Limited · Registered in England &amp; Wales · Company No. 16680027
            </span>
            <span className="text-[12px] text-[#9A9AA0]" style={{ fontFamily: MONO }}>
              © 2026 Durande Limited
            </span>
          </div>
        </div>
      </footer>

      {/* marquee keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Small local components                                                    */
/* -------------------------------------------------------------------------- */
function ManifestLine({ k, v, accent = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#B8B8BE]">{k}</span>
      <span className={accent ? "text-[#2547E0]" : "text-[#16161A]"}>{v}</span>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label
        className="mb-2 block text-[12px] font-medium uppercase tracking-[0.12em] text-[#6C6C74]"
        style={{ fontFamily: MONO }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
