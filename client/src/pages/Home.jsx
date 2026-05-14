import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { receitasAPI } from '../lib/api.ts';
import { useFavorites } from '../hooks/useFavorites.js';
import { useAuth } from '../hooks/useAuth.js';
import RecipeCard from '../components/RecipeCard.jsx';
import '../styles/home.css';

export default function Home() {
  const { favorites, toggleFavorite } = useFavorites();
  const { isLogged } = useAuth();
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    if (isLogged) {
      receitasAPI.getAll().then(res => {
        if (res.data) setReceitas(res.data.slice(0, 4));
      });
    }
  }, [isLogged]);

  const normalizedReceitas = receitas.map(r => ({
    id: r.codReceitas.toString(),
    nome: r.nomeReceita,
    descricao: r.descricao,
    imagem: r.fotoReceita || '/images/receita1.jpg',
    tempo: '30 min',
    chef: r.chefe?.nomeCompleto || 'Chef Tasty',
    dificuldade: 'Médio',
    categoria: 'Geral'
  }));

  return (
    <div className="home">
      <section className="presentation">
        <div className="presentation-text">
          <div className="tag-intro">Receitas Saudáveis</div>
          <h1>Bem-vindos à Tasty Cuisine!</h1>
          <p>Descubra receitas saudáveis que elevam o simples ao especial. Feitas para tornar cada momento mais especial.</p>
          <div className="button-group">
            <Link
              href={isLogged ? "/receitas" : "/login"}
              className={`btn btn-primary${!isLogged ? ' btn-locked' : ''}`}
            >
              Explorar Receitas
            </Link>
            <Link
              href={isLogged ? "/chefes" : "/login"}
              className={`btn btn-secondary${!isLogged ? ' btn-locked' : ''}`}
            >
              Conhecer Chefes
            </Link>
          </div>
        </div>
        <div className="presentation-images">
          <img src="/images/receita1.jpg" alt="Receita Saudável" />
          <img src="/images/receita2.jpg" alt="Receita Saudável" />
          <img src="/images/receita3.jpg" alt="Vitrine de doces" />
        </div>
      </section>

      <section className="highlights">
        <div className="highlights-header">
          <h2>Receitas em Destaque</h2>
          <p>As mais populares da nossa comunidade.</p>
        </div>
        {isLogged ? (
          <div className="recipes-grid">
            {normalizedReceitas.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                id={recipe.id}
                isFavorite={favorites.includes(recipe.id)}
                onToggleFavorite={toggleFavorite}
                isHighlight={true}
              />
            ))}
          </div>
        ) : (
          <div className="recipes-grid">
            {[1,2,3,4].map(i => (
              <a key={i} href="/login" className="locked-card">
                <div className="locked-overlay">
                  <span>🔒</span>
                  <p>Faça login para ver</p>
                </div>
                <div className="recipe-card-image">
                  <img src={`/images/receita${i <= 3 ? i : 1}.jpg`} alt="Receita" />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
