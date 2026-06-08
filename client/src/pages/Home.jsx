import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { receitasAPI } from '../lib/api.ts';
import { useFavorites } from '../hooks/useFavorites.js';
import { useAuth } from '../hooks/useAuth.js';
import { useDebugMode } from '../hooks/useDebugMode.js';
import RecipeCard from '../components/RecipeCard.jsx';
import DebugPanel from '../components/DebugPanel.jsx';
import '../styles/home.css';

export default function Home() {
  const { favorites, toggleFavorite } = useFavorites();
  const { isLogged } = useAuth();
  const [receitas, setReceitas] = useState([]);
  const [debugInfo, setDebugInfo] = useState([]);
  const [fetchError, setFetchError] = useState('');
  const { showDebug } = useDebugMode();

  useEffect(() => {
    if (isLogged) {
      receitasAPI.getAll().then(res => {
        const debug = [`isLogged=${isLogged}`, `receitas status=${res.status}`];
        if (res.error) debug.push(`error=${res.error}`);
        if (res.data) {
          setReceitas(res.data.slice(0, 4));
          debug.push(`receitas count=${Array.isArray(res.data) ? res.data.length : 'n/a'}`);
        } else {
          setFetchError('Erro ao carregar receitas em destaque.');
        }
        setDebugInfo(debug);
      });
    } else {
      setDebugInfo([`isLogged=${isLogged}`]);
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
      <DebugPanel visible={showDebug} error={fetchError} lines={debugInfo} />
    </div>
  );
}
