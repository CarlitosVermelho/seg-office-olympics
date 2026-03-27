import { leaderboard } from '../data.js';

const MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };

export default function TeamsGrid() {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span>👥</span> Equipas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {leaderboard.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
          >
            <div className="text-4xl">{team.emoji}</div>
            <h3 className="font-bold text-gray-800 text-center">{team.name}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              {MEDAL[team.position] && (
                <span className="text-lg">{MEDAL[team.position]}</span>
              )}
              <span className="text-brand-blue font-bold text-lg">{team.total} pts</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">
              {team.position}º lugar
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
