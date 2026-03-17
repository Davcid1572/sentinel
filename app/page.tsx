// app/page.tsx
import { DashboardShell } from "@/components/Dashboard-Shell";

export default function Home() {
  return (
    <DashboardShell>
      <div className="max-w-3xl mx-auto space-y-4 text-white">
        {/* We will put the chat messages and input here next */}
        <p className="text-zinc-500 text-center mt-20">
          Awaiting input to begin infrastructure scan...
        </p>
      </div>
    </DashboardShell>
  );
}
