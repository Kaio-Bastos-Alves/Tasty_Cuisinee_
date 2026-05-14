import React, { useState, useMemo, useEffect } from 'react';
import { receitasAPI } from '../lib/api';
import { useFavorites } from '../hooks/useFavorites.js';
import RecipeCard from '../components/RecipeCard.jsx';
import '../styles/recipes.css';

export default function Recipes() {
  const { favorites = [], toggleFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const [dbRecipes, setDbRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await receitasAPI.getAll();
        // VERIFICAÇÃO DE SEGURANÇA: Garante que dbRecipes seja sempre um Array
        if (response && Array.isArray(response.data)) {
          setDbRecipes(response.data);
        } else {
          setDbRecipes([]);
        }
      } catch (err) {
        console.error("Erro ao buscar receitas:", err);
        setDbRecipes([]);
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
    </div>
  );
}
