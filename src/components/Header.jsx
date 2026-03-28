export default function Header() {
  return (
    <header className="glass sticky top-0 z-50" style={{
      background: 'rgba(255, 255, 255, 0.88)',
      borderBottom: '1px solid rgba(212, 160, 23, 0.18)',
      boxShadow: '0 2px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)'
    }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-5">

        {/* Emblem */}
        <div className="emblem w-[52px] h-[52px] rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-3xl leading-none select-none filter drop-shadow-lg">🏆</span>
        </div>

        {/* Title block */}
        <div>
          <div className="flex items-baseline gap-3 leading-tight">
            <h1 className="text-xl font-black tracking-tight text-[#0A1628]">
              Office Olympics
            </h1>
            <span className="text-[#0A1628]/35 text-sm italic font-medium">
              Where office legends become immortal.
            </span>
          </div>
          <p className="text-[#0A1628]/40 text-xs font-medium tracking-[0.15em] uppercase mt-0.5">
            Official Rankings
          </p>
        </div>

        {/* Powered by */}
        <p className="ml-auto text-[#0A1628]/25 text-xs font-medium tracking-wide flex-shrink-0">
          Powered by People Squad
        </p>
      </div>

      {/* Gold hairline at bottom */}
      <div className="divider-gold" />
    </header>
  );
}
