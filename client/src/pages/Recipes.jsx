import React, { useMemo, useState, useEffect } from 'react';
import { receitasAPI } from '../lib/api';
import { useFavorites } from '../hooks/useFavorites.js';
import { useDebugMode } from '../hooks/useDebugMode.js';
import RecipeCard from '../components/RecipeCard.jsx';
import DebugPanel from '../components/DebugPanel.jsx';
import '../styles/recipes.css';

export default function Recipes() {
  const { favorites = [], toggleFavorite } = useFavorites();
  const { showDebug } = useDebugMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [dbRecipes, setDbRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState([]);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await receitasAPI.getAll();
        const debug = [`receitas status=${response.status}`];

        if (response && Array.isArray(response.data)) {
          setDbRecipes(response.data);
          debug.push(`receitas count=${response.data.length}`);
        } else {
          setDbRecipes([]);
          setFetchError('Nenhuma receita foi carregada do backend.');
        }

        if (response.error) {
          debug.push(`error=${response.error}`);
        }

        setDebugInfo(debug);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('Erro ao buscar receitas:', err);
        setDbRecipes([]);
        setFetchError(`Erro ao buscar receitas: ${message}`);
        setDebugInfo([`catch=${message}`]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const normalizedRecipes = useMemo(() => {
    if (!Array.isArray(dbRecipes)) return [];
    return dbRecipes.map(recipe => ({
      id: recipe.codReceitas?.toString() || Math.random().toString(),
      nome: recipe.nomeReceita || 'Sem nome',
      descricao: recipe.descricao || '',
      imagem: recipe.fotoReceita || '/images/receita1.jpg',
      tempo: '30 min',
      chef: recipe.chefe?.nomeCompleto || 'Chef Tasty',
      dificuldade: 'Médio',
      categoria: 'Geral'
    }));
  }, [dbRecipes]);

  const filteredRecipes = useMemo(() => {
    return normalizedRecipes.filter(r =>
      r.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.chef.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, normalizedRecipes]);

  if (loading) return <div className="recipes-page">Carregando receitas...</div>;

  return (
    <div className="recipes-page">
      <div className="recipes-header">
        <h1>Nossas Receitas</h1>
        <p>Explore nossa coleção de receitas saudáveis.</p>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nome ou chef..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="recipes-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              id={recipe.id}
              isFavorite={Array.isArray(favorites) && favorites.includes(recipe.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))
        ) : (
          <div className="no-results"><p>Nenhuma receita encontrada.</p></div>
        )}
      </div>
      <DebugPanel visible={showDebug} error={fetchError} lines={debugInfo} />
    </div>
  );
}
