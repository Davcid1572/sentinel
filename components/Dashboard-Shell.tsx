import { ReactNode } from "react";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      {/* LEFT SIDEBAR: The Fleet */}
      <aside className="w-64 border-r border-border bg-card/50 hidden md:flex flex-col">
        <div className="p-4 font-bold border-b border-border tracking-tight">
          SENTINEL <span className="text-primary text-xs ml-1">v1.0</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 text-sm">
          <div className="text-muted-foreground mb-2 text-[10px] uppercase font-bold tracking-wider">
            Active Agents
          </div>
          <div className="p-2 bg-primary/10 rounded-md border border-primary/20 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Security-Bot-01
          </div>
        </nav>
      </aside>

      {/* CENTER: Main Command Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-zinc-950">
        <header className="h-14 border-b border-border flex items-center px-6 justify-between bg-background/50 backdrop-blur-sm">
          <h1 className="text-sm font-medium">Ops Command Center</h1>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase text-muted-foreground">
              System Status:
            </span>
            <span className="text-[10px] uppercase text-emerald-500 font-bold">
              Optimal
            </span>
          </div>
        </header>

        {/* This is where the chat messages will scroll */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </main>

      {/* RIGHT SIDEBAR: Thought Trace */}
      <aside className="w-80 border-l border-border bg-black hidden lg:flex flex-col">
        <div className="p-4 text-[10px] font-bold uppercase text-muted-foreground border-b border-border">
          Live Agent Thought Trace
        </div>
        <div className="flex-1 p-4 font-mono text-[12px] text-emerald-500/90 overflow-y-auto leading-relaxed">
          <div className="opacity-50 tracking-tighter mb-4 text-white/40 italic">
            -- System Boot Success --
          </div>
          <div>{">"} Standing by for command...</div>
        </div>
      </aside>
    </div>
  );
}
