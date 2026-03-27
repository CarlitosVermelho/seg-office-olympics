// ============================================================
//  OFFICE OLYMPICS 2026 — FICHEIRO DE DADOS
//  Edita este ficheiro para atualizar equipas, atividades e pontos.
// ============================================================

export const teams = [
  { id: 1, name: "Ctrl + Alt + Elite",  emoji: "💻" },
  { id: 2, name: "The Rolling Chairs",  emoji: "🪑" },
  { id: 3, name: "Paper Jam Warriors",  emoji: "📄" },
];

export const activities = [
  {
    id: 1,
    name: "Chair Race",
    description: "Sprint de cadeiras de escritório pelo corredor",
    icon: "🪑",
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: 2,
    name: "Trash Basket",
    description: "Pontaria ao cesto do lixo com bolas de papel",
    icon: "🗑️",
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: 3,
    name: "Stapler Toss",
    description: "Lançamento de agrafador ao alvo",
    icon: "📎",
    color: "bg-green-50 border-green-200",
  },
];

// Pontuações por equipa em cada atividade
// scores[teamId][activityId] = pontos
export const scores = {
  1: { 1: 120, 2: 85,  3: 100 }, // Ctrl + Alt + Elite
  2: { 1: 95,  2: 110, 3: 75  }, // The Rolling Chairs
  3: { 1: 80,  2: 90,  3: 60  }, // Paper Jam Warriors
};

// ============================================================
//  Cálculo automático do total — não precisas de editar abaixo
// ============================================================
export const leaderboard = teams
  .map((team) => {
    const teamScores = scores[team.id] || {};
    const total = Object.values(teamScores).reduce((sum, pts) => sum + pts, 0);
    return { ...team, total, scores: teamScores };
  })
  .sort((a, b) => b.total - a.total)
  .map((team, index) => ({ ...team, position: index + 1 }));
