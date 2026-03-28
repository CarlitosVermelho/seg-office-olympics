import { useState } from 'react';
import data from './data.json';
import { TEAM_EMOJIS, DEFAULT_ICON } from './config.js';
import Header from './components/Header.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import ActivitiesGrid from './components/ActivitiesGrid.jsx';

const editions = Object.keys(data); // ['2025', '2026']

function enrichTeams(equipas) {
  return [...equipas]
    .sort((a, b) => b.pontosFinais - a.pontosFinais)
    .map((team, i) => ({
      ...team,
      position: i + 1,
      emoji: TEAM_EMOJIS[team.nome] ?? DEFAULT_ICON,
    }));
}

export default function App() {
  const [activeEdition, setActiveEdition] = useState('2026');

  const edition       = data[activeEdition];
  const enrichedTeams = enrichTeams(edition.equipas);
  const winner        = enrichedTeams[0];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero + Edition Tabs */}
      <div className="text-center py-14 px-6">
        <h2 className="text-[#0A1628] text-3xl sm:text-4xl font-black tracking-tight mb-10">
          🥇 {winner.nome} · Champions {activeEdition}
        </h2>

        {/* Tab switcher */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[#0A1628]/25 text-xs font-bold uppercase tracking-[0.25em]">Editions</p>
          <div className="glass rounded-2xl p-1.5 inline-flex gap-1">
            {editions.map(year => (
              <button
                key={year}
                onClick={() => setActiveEdition(year)}
                className={`tab-btn ${activeEdition === year ? 'tab-btn-active' : 'tab-btn-inactive'}`}
              >
                {year}
              </button>
            ))}
          </div>
          <p className="text-[#0A1628]/35 text-xs font-medium tracking-wide">
            Showing results for <span className="font-black text-gold">{activeEdition}</span>
          </p>
        </div>
      </div>

      <div className="divider-gold max-w-2xl mx-auto opacity-50" />

      {/* Edition content — key forces re-mount (fade-in animation) */}
      <div key={activeEdition} className="edition-content">

        {/* Leaderboard */}
        <div className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <Leaderboard equipas={enrichedTeams} titulo={edition.titulo} year={activeEdition} />
          </div>
        </div>

        <div className="divider-gold max-w-4xl mx-auto" />

        {/* Activities */}
        <div className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <ActivitiesGrid atividades={edition.atividades} equipas={enrichedTeams} year={activeEdition} />
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="glass border-t border-[#D4A017]/15 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow-lg">🏆</span>
            <div>
              <p className="text-[#0A1628]/35 text-xs uppercase tracking-[0.2em]">
                Champion · {edition.titulo}
              </p>
              <p className="text-gold font-black text-base">
                🥇 {winner.nome}
              </p>
            </div>
          </div>
          <p className="text-[#0A1628]/25 text-xs text-center sm:text-right">
            Office Olympics · Official Rankings
          </p>
        </div>
        <div className="divider-gold opacity-40" />
      </footer>
    </div>
  );
}
