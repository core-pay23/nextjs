import { Home, Music, Radio, Disc, Users, Settings, Plus } from "react-feather";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed lg:relative inset-y-0 left-0 z-40 w-64 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col gap-6 border-r border-white/10 bg-slate-900/50 backdrop-blur-lg p-6`}
    >
      {/* Brand Header */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg grid place-content-center">
          <Music className="h-5 w-5" />
        </div>
        <span className="text-lg font-semibold tracking-tight">SoundForge</span>
      </div>

      {/* New Track Button */}
      <button className="flex items-center justify-between gap-3 text-sm font-medium bg-blue-600/20 hover:bg-blue-600/30 transition p-3 rounded-lg">
        <span className="flex items-center gap-3">
          <Plus className="h-4 w-4" />
          New Track
        </span>
        <kbd className="text-xs text-white/60 hidden sm:block">⌘N</kbd>
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 text-sm">
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
          <Home className="h-4 w-4" />
          Studio
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
          <Music className="h-4 w-4" />
          Beats
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
          <Radio className="h-4 w-4" />
          <span className="flex-1">Streaming</span>
          <span className="ml-auto text-xs bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md">LIVE</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
          <Disc className="h-4 w-4" />
          Samples
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/10">
          <Users className="h-4 w-4" />
          Artists
        </a>
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
          <Settings className="h-4 w-4" />
          Mixer Settings
        </a>
      </nav>

      {/* Upgrade Prompt */}
      <div className="mt-auto bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-4 rounded-xl">
        <p className="text-sm leading-snug">
          Upgrade to Studio PRO for up to{" "}
          <span className="font-semibold text-cyan-400">100GB</span> storage and
          unlimited tracks!
        </p>
        <div className="flex items-center justify-between mt-4 text-sm">
          <button className="hover:underline text-white/70">Maybe Later</button>
          <button className="bg-white/10 hover:bg-white/20 transition px-3 py-1.5 rounded-md font-medium">
            Go Premium
          </button>
        </div>
      </div>
    </aside>
  );
}
