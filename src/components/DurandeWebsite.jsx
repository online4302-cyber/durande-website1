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
    className={`group inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-[13px] font-medium text-white shadow-[0_10px_40px_-15px_rgba(37,99,235,0.7)] transition-all duration-300[...]`
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
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3[...])",
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
      features: ["Custom web portal", "User roles and permissions", "Admin dashboard", "Customer/client dashboard", "Database integration", "Forms and document uploads", "Email notifications", "M[...]",
      featured: true,
    },
    {
      name: "Advanced Portal & Automation",
      price: "1,999",
      tagline: "For businesses needing automation and advanced database features.",
      features: ["Advanced custom portal", "Full database design", "Automation workflows", "API integrations", "Payment or invoice tracking", "Reports and analytics dashboard", "Email/SMS automat[...]",
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
              className="group inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-[13px] font-medium text-white shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)] ring-1 ring-blue-40[...]
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
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)] ring-1 ri[...]
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
... (file truncated for brevity, full content uploaded)
