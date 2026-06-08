import { useEffect, useMemo, useState } from 'react';
import { useRoute } from 'wouter';
import { chefesAPI, receitasAPI } from '../lib/api.ts';
import { useFavorites } from '../hooks/useFavorites.js';
import RecipeCard from '../components/RecipeCard.jsx';
import '../styles/chef-detail.css';

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export default function ChefDetail() {
  const [match, params] = useRoute('/chef/:id');
  const { favorites, toggleFavorite } = useFavorites();
  const [chef, setChef] = useState(null);
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    let mounted = true;

    const loadChefDetail = async () => {
      setLoading(true);
      try {
        const [chefRes, receitasRes] = await Promise.all([
          chefesAPI.getById(params.id),
          receitasAPI.getAll(),
        ]);

        const allReceitas = normalizeList(receitasRes.data);
        const chefReceitas = allReceitas.filter((receita) => Number(receita?.chefe?.codChefe) === Number(params.id));

        if (mounted) {
          setChef(chefRes.data || null);
          setReceitas(chefReceitas);
        }
      } catch (error) {
        if (mounted) {
          setChef(null);
          setReceitas([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadChefDetail();
    return () => {
      mounted = false;
    };
  }, [params?.id]);

  const chefPhoto = chef?.fotoPerfil || chef?.imagem || '/images/Chefe.png';
  const chefName = chef?.nomeCompleto || chef?.nome || 'Chef';
  const totalReceitas = receitas.length;
  const firstName = chefName.split(' ')[0];

  const normalizedRecipes = useMemo(() => {
    return receitas.map((recipe) => ({
      id: recipe.codReceitas.toString(),
      nome: recipe.nomeReceita,
      descricao: recipe.descricao,
      imagem: recipe.fotoReceita || '/images/receita1.jpg',
      tempo: '30 min',
      chef: chefName,
      dificuldade: 'Médio',
      categoria: 'Geral',
    }));
  }, [receitas, chefName]);

  if (loading) return <div className="chef-detail"><p>Carregando...</p></div>;
  if (!chef) return <div className="chef-detail"><p>Chef não encontrado.</p></div>;

  return (
    <div className="chef-detail">
      <button className="btn-back" onClick={() => window.history.back()}>← Voltar</button>

      <div className="chef-hero">
        <img
          src={chefPhoto}
          alt={chefName}
          onError={(e) => {
            e.currentTarget.src = '/images/Chefe.png';
          }}
        />
        <div className="chef-info-section">
          <h1>{chefName}</h1>
          <p className="specialty">{chef.nomeUsuario || chef.especialidade || 'Chef profissional'}</p>
          <div className="chef-stats">
            <div className="stat">
              <span className="stat-number">{totalReceitas}</span>
              <span className="stat-label">Receitas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="chef-recipes">
        <h2>Receitas de {firstName}</h2>
        {totalReceitas === 0 ? (
          <p style={{ padding: '16px', background: '#fff3e8', borderRadius: '12px', color: '#9a3412', fontWeight: 600 }}>
            No recipes publicated
          </p>
        ) : (
          <div className="recipes-grid">
            {normalizedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                id={recipe.id}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
