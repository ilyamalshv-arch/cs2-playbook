import Link from "next/link";

export default function NotFound() {
  return (
    <div className="cs2-scan cs2-flicker min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="cs2-reveal cs2-mono text-xs tracking-[0.4em] text-[#D0021B]">
          // SIGNAL LOST
        </div>
        <div className="cs2-display text-[120px] sm:text-[200px] leading-none mt-4"
          style={{ color: "#F5A623", letterSpacing: "-0.02em" }}>
          404
        </div>
        <div className="cs2-display text-2xl sm:text-4xl text-white mt-2">
          ENEMY SPOTTED AT 404
        </div>
        <div className="cs2-mono text-base sm:text-lg max-w-xl mt-6 text-[#aaa]">
          This page is not in the Active Duty map pool. Either it got retired (RIP Train), or you followed a dead link. Either way — head back to spawn.
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/"
            className="cs2-mono text-sm tracking-widest px-6 py-3 transition-all hover:scale-105"
            style={{ background: "#F5A623", color: "#0a0a0a" }}>
            ◂ BACK TO SPAWN
          </Link>
          <Link href="/en/callouts"
            className="cs2-mono text-sm tracking-widest px-6 py-3 hover:text-white transition-colors text-[#888]"
            style={{ border: "1px solid #333" }}>
            MAP ARSENAL
          </Link>
        </div>

        <div className="cs2-mono text-xs mt-12 text-[#444]">
          « rush B, cyka blyat — wrong URL edition »
        </div>
      </div>
    </div>
  );
}
