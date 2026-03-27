import { useState, useEffect, useRef } from 'react';

const fmt = (n) => Number(n).toFixed(2);

// ── IntersectionObserver hook ──────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── Counter hook ───────────────────────────────────────────────
function useCountUp(target, duration = 1200, delay = 0, trigger = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf;
    const timeout = setTimeout(() => {
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(target * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setValue(target);
      }
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [target, duration, delay, trigger]);
  return value;
}

// ── Podium visual config ───────────────────────────────────────
const PODIUM = {
  1: {
    podiumClass:  'podium-gold glow-gold',
    medalClass:   'medal-gold-3d',
    textScore:    'text-gold',
    textName:     'text-gold',
    labelColor:   'text-[#B8860B]/60',
    label:        'Ouro',
    minH:         'min-h-[420px]',
    topPad:       'pt-2',
    width:        'w-[260px]',
    zIdx:         'z-10',
    scoreSize:    'text-4xl',
    nameSize:     'text-lg',
    medalSize:    'w-20 h-20',
    logoSize:     'w-20 h-20',
    medalEmoji:   'text-4xl',
    growDuration: 1200,
    growDelay:    300,
  },
  2: {
    podiumClass:  'podium-silver',
    medalClass:   'medal-silver-3d',
    textScore:    'text-silver',
    textName:     'text-silver',
    labelColor:   'text-[#606060]/80',
    label:        'Prata',
    minH:         'min-h-[300px]',
    topPad:       'pt-8',
    width:        'w-[220px]',
    zIdx:         'z-0',
    scoreSize:    'text-3xl',
    nameSize:     'text-base',
    medalSize:    'w-16 h-16',
    logoSize:     'w-16 h-16',
    medalEmoji:   'text-3xl',
    growDuration: 1000,
    growDelay:    300,
  },
  3: {
    podiumClass:  'podium-bronze',
    medalClass:   'medal-bronze-3d',
    textScore:    'text-bronze',
    textName:     'text-bronze',
    labelColor:   'text-[#7A3B10]/75',
    label:        'Bronze',
    minH:         'min-h-[240px]',
    topPad:       'pt-14',
    width:        'w-[200px]',
    zIdx:         'z-0',
    scoreSize:    'text-3xl',
    nameSize:     'text-base',
    medalSize:    'w-14 h-14',
    logoSize:     'w-14 h-14',
    medalEmoji:   'text-3xl',
    growDuration: 850,
    growDelay:    300,
  },
};

// ── Team logo with metallic crest fallback ─────────────────────
function TeamLogo({ team, year, sizeClass }) {
  const [imgError, setImgError] = useState(false);
  const logoPath = `/logos/${year}/${encodeURIComponent(team.nome).replace(/%2B/g, '+')}.png`;

  if (!imgError) {
    return (
      <img
        src={logoPath}
        alt={team.nome}
        className={`${sizeClass} object-contain rounded-xl`}
        onError={() => setImgError(true)}
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))' }}
      />
    );
  }

  return (
    <div className={`${sizeClass} crest-fallback rounded-xl flex items-center justify-center`}>
      <svg viewBox="0 0 24 24" className="w-3/5 h-3/5" fill="none" aria-hidden="true">
        <path
          d="M12 2L4 5v6c0 5.55 3.84 10.74 8 11.93C16.16 21.74 20 16.55 20 11V5L12 2z"
          fill="url(#shieldGrad)"
          stroke="rgba(160,160,160,0.5)"
          strokeWidth="0.5"
        />
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#D8D8D8" />
            <stop offset="50%"  stopColor="#F5F5F5" />
            <stop offset="100%" stopColor="#A8A8A8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ── Podium Card (animates on mount — already visible) ──────────
function PodiumCard({ team, year }) {
  const cfg   = PODIUM[team.position];
  const score = useCountUp(team.pontosFinais, cfg.growDuration, cfg.growDelay);
  const floatDelay = cfg.growDuration + cfg.growDelay;

  return (
    <div
      className={`${cfg.width} ${cfg.zIdx}`}
      style={{
        transformOrigin: 'center bottom',
        animation: `growPodium ${cfg.growDuration}ms cubic-bezier(0.22,1,0.36,1) ${cfg.growDelay}ms both`,
      }}
    >
      <div
        className={`
          ${cfg.podiumClass} ${cfg.minH} ${cfg.topPad}
          rounded-2xl p-6 flex flex-col items-center gap-4
          transition-transform duration-300 hover:-translate-y-1
          ${team.position === 1 ? 'float' : ''}
        `}
        style={team.position === 1 ? { animationDelay: `${floatDelay}ms` } : {}}
      >
        {/* 3D Medal */}
        <div className={`${cfg.medalClass} ${cfg.medalSize} rounded-full flex items-center justify-center flex-shrink-0`}>
          <span className={`${cfg.medalEmoji} filter drop-shadow-lg select-none`}>
            {['🥇', '🥈', '🥉'][team.position - 1]}
          </span>
        </div>

        <TeamLogo team={team} year={year} sizeClass={cfg.logoSize} />

        <p className={`${cfg.textName} font-black text-center leading-tight ${cfg.nameSize}`}>
          {team.nome}
        </p>

        <div className="mt-auto text-center">
          <span className={`${cfg.textScore} ${cfg.scoreSize} font-black tabular-nums`}>
            {fmt(score)}
          </span>
          <p className="text-[#0A1628]/25 text-xs font-semibold tracking-widest uppercase mt-0.5">pontos</p>
        </div>

        <span className={`${cfg.labelColor} text-xs font-bold uppercase tracking-[0.3em]`}>{cfg.label}</span>
      </div>
    </div>
  );
}

// ── Rest list row — animates only when scrolled into view ──────
function RestRow({ team, year, index }) {
  const [ref, inView] = useInView(0.3);
  const delay = index * 80;
  const score = useCountUp(team.pontosFinais, 800, delay, inView);

  return (
    <div
      ref={ref}
      className="glass rounded-xl px-6 py-4 flex items-center gap-4 hover:shadow-md transition-shadow"
      style={inView
        ? { animation: `fadeSlideIn 0.45s ease-out ${delay}ms both` }
        : { opacity: 0 }
      }
    >
      <span className="text-[#0A1628]/30 font-black text-lg w-8 text-center tabular-nums">
        {team.position}
      </span>

      <TeamLogo team={team} year={year} sizeClass="w-9 h-9" />

      <span className="text-[#0A1628]/80 font-semibold flex-1">{team.nome}</span>
      <span className="text-gold font-black text-xl tabular-nums">{fmt(score)}</span>
      <span className="text-[#0A1628]/25 text-xs font-semibold uppercase tracking-widest">pts</span>
    </div>
  );
}

// ── Main Leaderboard ───────────────────────────────────────────
export default function Leaderboard({ equipas, titulo, year }) {
  const top3 = equipas.slice(0, 3);
  const rest  = equipas.slice(3);

  // Visual podium order: 2nd · 1st · 3rd
  const podiumOrder = [
    top3.find(t => t.position === 2),
    top3.find(t => t.position === 1),
    top3.find(t => t.position === 3),
  ].filter(Boolean);

  return (
    <section>
      {/* Section title */}
      <div className="flex items-center gap-4 mb-10">
        <div className="section-bar h-10" />
        <div>
          <p className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-0.5">{titulo}</p>
          <h2 className="text-[#0A1628] text-2xl font-black tracking-tight">Classificação Geral</h2>
        </div>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-4 flex-wrap">
        {podiumOrder.map(team => (
          <PodiumCard key={team.nome} team={team} year={year} />
        ))}
      </div>

      {/* 4th place and beyond */}
      {rest.length > 0 && (
        <div className="mt-8 flex flex-col gap-2">
          {rest.map((team, idx) => (
            <RestRow key={team.nome} team={team} year={year} index={idx} />
          ))}
        </div>
      )}
    </section>
  );
}
