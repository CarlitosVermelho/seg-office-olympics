import { leaderboard, activities, scores } from '../data.js';

const POSITION_STYLE = {
  1: { dot: 'bg-yellow-400 shadow-[0_0_6px_rgba(255,215,0,0.6)]' },
  2: { dot: 'bg-gray-400  shadow-[0_0_6px_rgba(192,192,192,0.5)]' },
  3: { dot: 'bg-orange-400 shadow-[0_0_6px_rgba(205,127,50,0.5)]' },
};

export default function ScoreBreakdown() {
  // Best score per activity column (to highlight winner)
  const maxPerActivity = {};
  activities.forEach((act) => {
    maxPerActivity[act.id] = Math.max(
      ...leaderboard.map((t) => scores[t.id]?.[act.id] ?? 0)
    );
  });

  return (
    <section>
      {/* Section title */}
      <div className="flex items-center gap-4 mb-10">
        <div className="section-bar h-10" />
        <div>
          <p className="text-gold text-xs font-bold uppercase tracking-[0.25em] mb-0.5">Detalhes</p>
          <h2 className="text-white text-2xl font-black tracking-tight">Pontos por Equipa</h2>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[480px] text-sm border-collapse">

          {/* Header */}
          <thead>
            <tr>
              <th className="text-left px-6 py-4 text-gold font-bold uppercase tracking-[0.18em] text-xs border-b border-white/5">
                Equipa
              </th>
              {activities.map((act) => (
                <th
                  key={act.id}
                  className="text-center px-5 py-4 text-white/50 font-semibold uppercase tracking-[0.15em] text-xs border-b border-white/5"
                >
                  <span className="mr-1.5">{act.icon}</span>{act.name}
                </th>
              ))}
              <th className="text-right px-6 py-4 text-gold font-bold uppercase tracking-[0.18em] text-xs border-b border-white/5">
                Total
              </th>
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {leaderboard.map((team, i) => {
              const posCfg = POSITION_STYLE[team.position] || {};
              return (
                <tr
                  key={team.id}
                  className={`score-row border-b border-white/5 last:border-0 ${i % 2 === 1 ? 'bg-white/[0.025]' : ''}`}
                >
                  {/* Team */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {posCfg.dot
                        ? <span className={`inline-block w-2 h-2 rounded-full flex-shrink-0 ${posCfg.dot}`} />
                        : <span className="inline-block w-2 h-2 rounded-full flex-shrink-0 bg-white/15" />
                      }
                      <span className="text-xl">{team.emoji}</span>
                      <span className="text-white/85 font-semibold">{team.name}</span>
                    </div>
                  </td>

                  {/* Score per activity */}
                  {activities.map((act) => {
                    const pts   = scores[team.id]?.[act.id] ?? 0;
                    const isMax = pts === maxPerActivity[act.id];
                    return (
                      <td key={act.id} className="text-center px-5 py-5">
                        {isMax ? (
                          <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/30 text-gold font-black px-3 py-1 rounded-full text-sm">
                            {pts}
                            <span className="text-xs opacity-70">★</span>
                          </span>
                        ) : (
                          <span className="text-white/40 font-medium">{pts}</span>
                        )}
                      </td>
                    );
                  })}

                  {/* Total */}
                  <td className="text-right px-6 py-5">
                    <span className="text-gold font-black text-lg tabular-nums">{team.total}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="px-6 py-3 text-white/20 text-xs border-t border-white/5">
          ★ Melhor resultado em cada atividade
        </p>
      </div>
    </section>
  );
}
