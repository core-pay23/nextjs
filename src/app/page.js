"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Wallet,
  Coins,
  ArrowRight,
  BarChart3,
  Plug,
  Rocket,
  CheckCircle2,
} from "lucide-react";

// NOTE: This file is JavaScript (not TypeScript), per request.
// Drop this file at `app/page.js` in a Next.js 13+ project with Tailwind configured.
// Tailwind suggestions: dark mode enabled, font-sans mapped to Inter in globals.css.

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function GradientBG() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,#db582710,transparent_60%),radial-gradient(1200px_600px_at_80%_-10%,#8b5cf610,transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0c1425]" />
      <div className="absolute inset-0 mix-blend-overlay opacity-20" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 40 40\"><path fill=\"rgba(255,255,255,0.08)\" d=\"M0 39h40v1H0zM39 0h1v40h-1z\"/></svg>')" }} />
    </div>
  );
}

function GlassCard({ className = "", children }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-2xl shadow-black/20 ${className}`}>
      {children}
    </div>
  );
}

function PrimaryButton({ href = "#", children, icon = <ArrowRight className="h-4 w-4" />, showIcon = true }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#db5827] to-[#e78137] px-5 py-3 font-medium text-white transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      {children}
      {showIcon && icon &&(
          <span className="flex-shrink-0">
            {icon}
          </span>
      )}
    </Link>
  );
}

function SecondaryButton({ href = "#", children }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white/90 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      {children}
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="relative min-h-screen text-white">
      <GradientBG />

      {/* NAVBAR */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-900/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="#" className="group flex items-center gap-3">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-inset ring-white/10">
              <div className="h-5 w-5 rounded-sm bg-gradient-to-br from-[#db5827] to-[#e78137]" />
              <div className="absolute inset-0 rounded-xl shadow-[0_0_60px_#db582733]" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              CorePay
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            <Link className="hover:text-white" href="#features">Features</Link>
            <Link className="hover:text-white" href="#how">How it works</Link>
            <Link className="hover:text-white" href="#integrations">Integrations</Link>
            <Link className="hover:text-white" href="#roadmap">Roadmap</Link>
            <Link className="hover:text-white" href="#faq">FAQ</Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <SecondaryButton href="#docs">View Docs</SecondaryButton>
            <PrimaryButton href="/dashboard">Apps</PrimaryButton>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:py-28">
          <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-3xl text-center">
            <motion.h1 variants={item} className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Seamless Crypto Payments for the Web
            </motion.h1>
            <motion.p variants={item} className="mt-5 text-pretty text-white/70">
              Accept BTC, USDT, and CORE with ultra‑low fees (0.5% + gas) and instant settlement
              straight to your wallet. CorePay bridges Web2 checkouts to the Web3 economy.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton href="/dashboard" showIcon={false}>Apps</PrimaryButton>
              <SecondaryButton href="#demo">Watch Demo</SecondaryButton>
            </motion.div>
          </motion.div>

          {/* Hero metrics */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Fees", value: "0.5% + gas" },
              { label: "Settlement", value: "Instant" },
              { label: "Supported", value: "BTC · USDT · CORE" },
              { label: "Availability", value: "Core DAO" },
            ].map((m) => (
              <GlassCard key={m.label} className="p-4 text-center">
                <div className="text-xs uppercase text-white/60">{m.label}</div>
                <div className="mt-1 text-lg font-semibold tracking-wide">{m.value}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built for merchants & developers</h2>
            <p className="mt-3 text-white/70">A simple checkout for shoppers, powerful APIs and a real‑time dashboard for teams.</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <ShieldCheck className="h-5 w-5" />, title: "Non‑custodial & secure",
                desc: "Funds settle directly to your wallet via audited smart contracts.",
              },
              {
                icon: <Zap className="h-5 w-5" />, title: "Instant settlement",
                desc: "No holds or batching—payments clear on‑chain in seconds.",
              },
              {
                icon: <Wallet className="h-5 w-5" />, title: "Wallet‑native",
                desc: "MetaMask support out of the box with smooth, guided UX.",
              },
              {
                icon: <BarChart3 className="h-5 w-5" />, title: "Merchant dashboard",
                desc: "Track revenue, activity, and payouts in a modern, glass UI.",
              },
              {
                icon: <Plug className="h-5 w-5" />, title: "Simple API",
                desc: "Create and verify payments with clean REST endpoints.",
              },
              {
                icon: <Coins className="h-5 w-5" />, title: "Multi‑token",
                desc: "Accept CORE today; add USDT & wBTC with seamless upgrades.",
              },
            ].map((f) => (
              <GlassCard key={f.title} className="p-5">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[#db5827]/20 to-[#e78137]/20 text-white">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold">Checkout flow</h3>
              <ol className="mt-4 space-y-3 text-sm text-white/80">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
                  Shopper selects “Pay with CorePay” at checkout.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
                  MetaMask opens with pre‑filled payment details.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
                  Smart contract processes payment and routes funds to merchant.
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-400" />
                  Merchant dashboard reflects status in real time.
                </li>
              </ol>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold">Merchant API (preview)</h3>
              <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-xs text-white/80">
                <pre className="whitespace-pre-wrap">
{`POST /v1/payment\n→ returns { paymentId, amountCrypto }\n\nGET /v1/payment/{paymentId}\n→ returns { status: Pending | Complete | Failed }`}
                </pre>
              </div>
              <p className="mt-3 text-sm text-white/70">
                Designed to abstract blockchain complexity while keeping you fully in control.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section id="integrations" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <GlassCard className="p-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h3 className="text-xl font-semibold">E‑commerce ready</h3>
                <p className="mt-2 max-w-2xl text-sm text-white/70">
                  WooCommerce plugin in progress, with Shopify and Magento on the roadmap. Bring crypto to your existing storefront—no blockchain expertise required.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <SecondaryButton href="#docs">Integration Guide</SecondaryButton>
                <PrimaryButton href="#get-started">Join Beta</PrimaryButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ROADMAP */}
      <section id="roadmap" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">2025 Roadmap</h2>
            <p className="mt-3 text-white/70">Concrete milestones as we expand CorePay across the Core DAO ecosystem and beyond.</p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[{
              quarter: "Q3 2025",
              points: [
                "Smart contract upgrade: processAndSwapPayment()",
                "DEX integration for token swaps to USDT",
                "Launch Merchant REST API & keys",
                "Merchant dashboard (beta)",
              ],
            },{
              quarter: "Q4 2025",
              points: [
                "WooCommerce plugin release",
                "Auto order status updates",
                "Begin Shopify & Magento integrations",
              ],
            },{
              quarter: "Hackathon MVP",
              points: [
                "Core DAO Testnet deployment",
                "MetaMask‑based checkout demo",
                "End‑to‑end payment flow",
              ],
            }].map((r) => (
              <GlassCard key={r.quarter} className="flex flex-col p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-[#e78137]" />
                  <h3 className="text-lg font-semibold">{r.quarter}</h3>
                </div>
                <ul className="mt-2 space-y-2 text-sm text-white/80">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/30" />{p}</li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked</h2>
            <div className="mt-6 grid gap-4">
              {[{
                q: "What are your fees?",
                a: "A simple 0.5% protocol fee plus network gas. No hidden costs.",
              },{
                q: "Where do funds settle?",
                a: "Directly to the merchant wallet you configure—CorePay is non‑custodial.",
              },{
                q: "Which tokens do you support?",
                a: "CORE today; USDT and wBTC next, with automatic conversion to USDT planned.",
              },{
                q: "Do I need prior Web3 experience?",
                a: "No. Our wallet‑guided checkout and REST API abstract the complexity.",
              }].map((f) => (
                <GlassCard key={f.q} className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-md bg-white/5">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{f.q}</h3>
                      <p className="mt-1 text-sm text-white/70">{f.a}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="get-started" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <GlassCard className="p-8 text-center">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-2xl font-semibold">Bring crypto to your checkout today</h3>
              <p className="mt-2 text-white/70">Sign up for the beta to receive API keys, sandbox access, and implementation support.</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <PrimaryButton href="#">Request Access</PrimaryButton>
                <SecondaryButton href="#docs">Read Documentation</SecondaryButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-white/60">© {new Date().getFullYear()} CorePay. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm text-white/70">
              <Link href="#">Privacy</Link>
              <Link href="#">Terms</Link>
              <Link href="#">Status</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
