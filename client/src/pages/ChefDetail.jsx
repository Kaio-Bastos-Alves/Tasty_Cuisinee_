import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { chefesAPI, receitasAPI } from '../lib/api.ts';
import { useFavorites } from '../hooks/useFavorites.js';
import RecipeCard from '../components/RecipeCard.jsx';
import '../styles/chef-detail.css';

export default function ChefDetail() {
  const [match, params] = useRoute('/chef/:id');
  const { favorites, toggleFavorite } = useFavorites();
  const [chef, setChef] = useState(null);
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const goBack = () => window.history.back();

  useEffect(() => {
    if (!params?.id) return;
    Promise.all([
      chefesAPI.getById(params.id),
      receitasAPI.getAll()
    ]).then(([chefeRes, receitasRes]) => {
      if (chefeRes.data) setChef(chefeRes.data);
      if (receitasRes.data) {
        const doChefe = receitasRes.data.filter(r => r.chefe?.codChefe === Number(params.id));
        setReceitas(doChefe);
      }
    }).finally(() => setLoading(false));
  }, [params?.id]);

  if (loading) return <div className="chef-detail"><p>Carregando...</p></div>;
  if (!chef) return <div className="chef-detail"><p>Chef não encontrado.</p></div>;

  return (
    <div className="chef-detail">
      <button className="btn-back" onClick={goBack}>← Voltar</button>

      <div className="chef-hero">
        <img src={chef.fotoPerfil || '/images/chefe.jpg'} alt={chef.nomeCompleto} />
        <div className="chef-info-section">
          <h1>{chef.nomeCompleto}</h1>
          <p className="specialty">{chef.nomeUsuario}</p>
          <div className="chef-stats">
            <div className="stat">
              <span className="stat-number">{receitas.length}</span>
              <span className="stat-label">Receitas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chef-recipes">
        <h2>Receitas de {chef.nomeCompleto.split(' ')[0]}</h2>
        <div className="recipes-grid">
          {receitas.map(recipe => (
            <RecipeCard
              key={recipe.codReceitas}
              recipe={{
                nome: recipe.nomeReceita,
                descricao: recipe.descricao,
                imagem: recipe.fotoReceita || '/images/receita1.jpg',
                tempo: '30 min',
                chef: chef.nomeCompleto,
                dificuldade: 'Médio',
                categoria: 'Geral'
              }}
              id={recipe.codReceitas.toString()}
              isFavorite={favorites.includes(recipe.codReceitas.toString())}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
