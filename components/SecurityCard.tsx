"use client";

import { AlertTriangle, ShieldCheck, Zap } from "lucide-react";

interface SecurityCardProps {
  riskLevel: "Critical" | "High" | "Low";
  issue: string;
  resource: string;
  recommendation: string;
}

export function SecurityCard({
  riskLevel,
  issue,
  resource,
  recommendation,
}: SecurityCardProps) {
  const colorMap = {
    Critical: "border-red-500 bg-red-500/10 text-red-500",
    High: "border-amber-500 bg-amber-500/10 text-amber-500",
    Low: "border-blue-500 bg-blue-500/10 text-blue-500",
  };

  return (
    <div
      className={`mt-4 border rounded-xl p-5 space-y-4 ${colorMap[riskLevel]}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
          <AlertTriangle size={16} />
          {riskLevel} Security Risk Detected
        </div>
        <div className="text-[10px] opacity-70 font-mono">{resource}</div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white">{issue}</h3>
        <p className="text-sm opacity-80 text-zinc-300 mt-1">
          {recommendation}
        </p>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 bg-white text-black text-xs font-bold py-2 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
          <Zap size={14} />
          Auto-Patch Resource
        </button>
        <button className="px-4 py-2 border border-white/20 text-white text-xs font-medium rounded-lg hover:bg-white/5 transition-colors">
          Ignore
        </button>
      </div>
    </div>
  );
}
