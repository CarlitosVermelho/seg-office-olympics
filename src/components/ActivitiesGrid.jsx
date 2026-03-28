import { ACTIVITY_CONFIG, DEFAULT_ICON, DEFAULT_ACCENT } from '../config.js';

const fmt = (n) => Number(n).toFixed(2);

const MEDAL = ['🥇', '🥈', '🥉'];

function getRank(sorted, idx) {
  const score = sorted[idx].actScore;
  return sorted.filter(t => t.actScore > score).length + 1;
}

export default function ActivitiesGrid({ atividades, equipas, year }) {
  return (
    <section>
      {/* Section title */}
      <div className="flex items-center gap-4 mb-10">
        <div className="section-bar h-10" />
        <div>
          <p className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-0.5">Events</p>
          <h2 className="text-[#0A1628] text-2xl font-black tracking-tight">Activities</h2>
        </div>
      </div>

      {/* Compact grid — 2 cols on mobile, 3 on md, 4 on xl */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {atividades.map((actName) => {
          const cfg = ACTIVITY_CONFIG[actName] ?? { icon: DEFAULT_ICON, accentRgb: DEFAULT_ACCENT };

          // Sort teams by score in this activity (desc)
          const sorted = [...equipas]
            .map(team => ({ ...team, actScore: team.detalhes?.[actName] ?? 0 }))
            .sort((a, b) => b.actScore - a.actScore);

          return (
            <div
              key={actName}
              className="act-card rounded-xl p-4 flex flex-col gap-3"
              style={{ '--accent-rgb': cfg.accentRgb }}
            >
              {/* Header: icon + name */}
              <div className="flex items-center gap-3">
                <div
                  className="icon-case w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ boxShadow: `0 0 12px rgb(${cfg.accentRgb} / 0.15), 0 2px 8px rgba(0,0,0,0.06)` }}
                >
                  <span
                    className="text-xl leading-none select-none"
                    style={{ filter: `drop-shadow(0 1px 4px rgb(${cfg.accentRgb} / 0.4))` }}
                  >
                    {cfg.icon}
                  </span>
                </div>
                <h3
                  className="font-bold text-xs leading-tight"
                  style={{ color: `rgb(${cfg.accentRgb})` }}
                >
                  {actName}
                </h3>
              </div>

              {/* Gold divider */}
              <div className="divider-gold opacity-40" />

              {/* Mini-leaderboard */}
              <div className="flex flex-col gap-1.5">
                {sorted.map((team, idx) => {
                  const rank    = getRank(sorted, idx);
                  const isTop3  = rank <= 3;
                  const isFirst = rank === 1;

                  return (
                    <div key={team.nome} className="flex items-center gap-1.5">
                      {/* Medal or spacer */}
                      <span className="text-sm w-4 text-center flex-shrink-0">
                        {isTop3 ? MEDAL[rank - 1] : ''}
                      </span>

                      {/* Team name */}
                      <span
                        className={`flex-1 text-xs sm:text-sm truncate ${
                          isFirst
                            ? 'text-[#0A1628]/90 font-bold'
                            : 'text-[#0A1628]/45 font-medium'
                        }`}
                        title={team.nome}
                      >
                        {team.nome}
                      </span>

                      {/* Score */}
                      <span
                        className={`text-xs sm:text-sm tabular-nums font-black flex-shrink-0 ${
                          isFirst
                            ? 'text-gold'
                            : team.actScore < 0
                            ? 'text-red-500/70'
                            : 'text-[#0A1628]/30'
                        }`}
                      >
                        {fmt(team.actScore)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
