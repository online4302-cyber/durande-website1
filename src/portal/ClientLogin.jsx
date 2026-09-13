import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { login } from "./auth";
import useFonts from "./useFonts";

const SERIF = '"Instrument Serif", Georgia, "Times New Roman", serif';
const SANS = '"Geist", ui-sans-serif, system-ui, sans-serif';
const MONO = '"Geist Mono", ui-monospace, "SFMono-Regular", monospace';

export default function ClientLogin() {
  useFonts();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (e) => {
    e?.preventDefault?.();
    setError("");
    setBusy(true);
    // Tiny delay so the interaction feels intentional, not jarring.
    setTimeout(() => {
      const session = login(username, password);
      if (session) {
        navigate("/portal");
      } else {
        setError("Incorrect username or password.");
        setBusy(false);
      }
    }, 250);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#FBFBF9] px-6 text-[#16161A] antialiased"
      style={{ fontFamily: SANS }}
    >
      <div className="w-full max-w-md">
        {/* Brand */}
        <a href="/" className="mb-10 flex items-baseline justify-center gap-0.5">
          <span className="text-[22px] font-semibold tracking-tight text-[#16161A]">
            Durande
          </span>
          <span className="text-[22px] font-semibold tracking-tight text-[#2547E0]">
            .com
          </span>
        </a>

        <div className="rounded-2xl border border-[#E7E5DF] bg-white p-8 shadow-[0_30px_60px_-40px_rgba(22,22,26,0.35)]">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EDF0FE]">
              <Lock className="h-4 w-4 text-[#2547E0]" />
            </span>
            <div>
              <h1
                className="text-[26px] leading-none text-[#16161A]"
                style={{ fontFamily: SERIF }}
              >
                Client Portal
              </h1>
              <p
                className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#6C6C74]"
                style={{ fontFamily: MONO }}
              >
                Secure access
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label
                className="mb-1.5 block text-[12px] font-medium text-[#6C6C74]"
                style={{ fontFamily: MONO }}
              >
                Username
              </label>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-[#E7E5DF] bg-[#FBFBF9] px-3.5 py-2.5 text-[14px] text-[#16161A] outline-none transition-colors focus:border-[#2547E0] focus:bg-white"
                placeholder="client"
              />
            </div>

            <div>
              <label
                className="mb-1.5 block text-[12px] font-medium text-[#6C6C74]"
                style={{ fontFamily: MONO }}
              >
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-[#E7E5DF] bg-[#FBFBF9] px-3.5 py-2.5 text-[14px] text-[#16161A] outline-none transition-colors focus:border-[#2547E0] focus:bg-white"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-[13px] font-medium text-[#D14343]">{error}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#16161A] px-6 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#2547E0] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Sign in"}
              {!busy && (
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              )}
            </button>
          </form>

          <div className="mt-6 flex items-start gap-2 border-t border-[#E7E5DF] pt-5">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6C6C74]" />
            <p className="text-[12px] leading-relaxed text-[#6C6C74]">
              Your project files are shown read-only. You can review the full
              codebase and publish approved changes.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-[12px] text-[#6C6C74]">
          Need access?{" "}
          <a href="/#contact" className="text-[#2547E0] hover:underline">
            Contact Durande
          </a>
        </p>
      </div>
    </div>
  );
}
