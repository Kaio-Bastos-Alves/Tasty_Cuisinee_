const basePopularidade = {
  'ratatouille': 95,
  'risotto': 88,
  'frango-tikka': 82,
  'salmao-crosta': 79,
  'salade': 76,
  'pasta': 73,
  'poke-atum': 71,
  'curry-grao': 68,
  'bowl-quinoa': 65,
  'lasanha-abobrinha': 62,
  'frango-limao': 58,
  'bacalhau-forno': 55,
  'tacos-peixe': 52,
  'sopa-lentilha': 49,
  'omelete-espinafre': 46,
  'stir-fry': 43,
  'wrap-peru': 40,
  'panqueca-aveia': 37,
  'smoothie-bowl': 34,
  'carne-legumes': 31,
  'camarao-alho': 28,
  'arroz-integral': 25,
  'sopa-abobora': 22,
  'muffin-proteico': 19
};

export function getPopularidadeReceita(id, favorites) {
  const base = basePopularidade[id] || 10;
  const bonus = favorites.includes(id) ? 5 : 0;
  return base + bonus;
}

export function getReceitasMaisPopulares(limite = 4, favorites) {
  return Object.keys(basePopularidade)
    .map(id => ({ id, popularidade: getPopularidadeReceita(id, favorites) }))
    .sort((a, b) => b.popularidade - a.popularidade)
    .slice(0, limite)
    .map(item => item.id);
}
