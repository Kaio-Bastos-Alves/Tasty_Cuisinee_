import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { receitas, chefes } from '../data/recipes.js';
import RecipeCard from '../components/RecipeCard.jsx';
import { useFavorites } from '../hooks/useFavorites.js';
import '../styles/chef-profile.css';

export default function ChefProfile() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('receitas');
  const [isEditing, setIsEditing] = useState(false);

  // Simular chefe logado (primeiro chefe)
  const chefeId = 'marie';
  const chefe = chefes[chefeId];
  const { favorites } = useFavorites();

  useEffect(() => {
    if (!chefe) {
      setLocation('/login');
    }
  }, [chefe, setLocation]);

  if (!chefe) {
    return <div className="chef-profile"><p>Carregando...</p></div>;
  }

  const chefRecipes = chefe.receitas
    .map(id => ({ id, recipe: receitas[id] }))
    .filter(item => item.recipe);

  const favs = favorites;
  const receitasFavoritadas = chefRecipes.filter(item => favs.includes(item.id));
  const totalReceitas = chefRecipes.length;
  const totalFavs = receitasFavoritadas.length;

  // Calcular média de dificuldade
  const dificuldades = { 'Fácil': 1, 'Médio': 2, 'Difícil': 3 };
  const somaD = chefRecipes.reduce((acc, item) => acc + (dificuldades[item.recipe?.dificuldade] || 1), 0);
  const mediaD = totalReceitas > 0 ? (somaD / totalReceitas).toFixed(1) : 0;
  const nivelTexto = mediaD <= 1.5 ? 'Fácil' : mediaD <= 2.5 ? 'Médio' : 'Difícil';

  // Ranking de receitas
  const receitasComFavs = chefRecipes
    .map(item => ({
      id: item.id,
      nome: item.recipe?.nome || 'Receita',
      favs: favs.includes(item.id) ? 1 : 0,
      categoria: item.recipe?.categoria || 'Outros'
    }))
    .sort((a, b) => b.favs - a.favs);

  // Distribuição por categoria
  const categorias = {};
  chefRecipes.forEach(item => {
    const cat = item.recipe?.categoria || 'Outros';
    categorias[cat] = (categorias[cat] || 0) + 1;
  });

  return (
    <div className="chef-profile">
      {/* HEADER PERFIL CHEFE */}
      <section className="perfil-header">
        <div className="perfil-info">
          <div className="avatar">👨‍🍳</div>
          <div>
            <h1>{chefe.nome}</h1>
            <p>🍽 {chefe.especialidade}</p>
            <p style={{ color: '#888', fontSize: '14px' }}>📍 {chefe.localizacao}</p>
          </div>
        </div>
        <button className="btn-editar" onClick={() => setIsEditing(!isEditing)}>
          ✏️ Editar Perfil
        </button>
      </section>

      {/* EDIÇÃO */}
      {isEditing && (
        <section className="perfil-edicao">
          <div className="perfil-info">
            <div className="avatar">👨‍🍳</div>
            <div className="inputs">
              <input type="text" placeholder="Nome" defaultValue={chefe.nome} />
              <input type="email" placeholder="E-mail" defaultValue={chefe.email || ''} />
              <input type="text" placeholder="Especialidade" defaultValue={chefe.especialidade} />
              <input type="text" placeholder="Localização" defaultValue={chefe.localizacao} />
              <textarea placeholder="Bio" style={{ width: '250px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }}>
                {chefe.bio || ''}
              </textarea>
            </div>
          </div>
          <button className="btn-salvar" onClick={() => setIsEditing(false)}>Salvar</button>
        </section>
      )}

      {/* ABAS */}
      <nav className="perfil-tabs">
        <button
          className={activeTab === 'receitas' ? 'active' : ''}
          onClick={() => setActiveTab('receitas')}
        >
          🍴 Minhas Receitas
        </button>
        <button
          className={activeTab === 'stats' ? 'active' : ''}
          onClick={() => setActiveTab('stats')}
        >
          📊 Estatísticas
        </button>
        <button
          className={activeTab === 'config' ? 'active' : ''}
          onClick={() => setActiveTab('config')}
        >
          ⚙️ Configurações
        </button>
      </nav>

      {/* MINHAS RECEITAS */}
      {activeTab === 'receitas' && (
        <section className="tab-content">
          <div className="titulo">
            <h2>Minhas Receitas Publicadas</h2>
            <a href="/publicar-receita">
              <button className="btn-salvar" style={{ padding: '10px 16px' }}>+ Nova Receita</button>
            </a>
          </div>
          {chefRecipes.length > 0 ? (
            <div className="recipes-grid">
                {chefRecipes.map(({ id, recipe }) => (
                  <RecipeCard
                    key={id}
                    recipe={recipe}
                    id={id}
                    isFavorite={favorites.includes(id)}
                  />
                ))}
            </div>
          ) : (
            <p style={{ color: '#888' }}>Nenhuma receita publicada ainda.</p>
          )}
        </section>
      )}

      {/* ESTATÍSTICAS */}
      {activeTab === 'stats' && (
        <section className="tab-content">
          <div className="configuracoes" style={{ marginTop: '20px' }}>
            <div className="card-config">
              <h3>📈 Visão Geral</h3>
              <div className="linha">
                <div>
                  <strong>Receitas publicadas</strong>
                  <p>Total de receitas no ar</p>
                </div>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2f6b3f' }}>{totalReceitas}</span>
              </div>
              <div className="linha">
                <div>
                  <strong>Receitas favoritadas</strong>
                  <p>Salvas por usuários</p>
                </div>
                <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2f6b3f' }}>{totalFavs}</span>
              </div>
              <div className="linha">
                <div>
                  <strong>Média de dificuldade</strong>
                  <p>Nível das suas receitas</p>
                </div>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2f6b3f' }}>{nivelTexto}</span>
              </div>
            </div>

            <div className="card-config">
              <h3>🏆 Receitas Mais Populares</h3>
              <div style={{ marginTop: '15px' }}>
                {receitasComFavs.length > 0 ? (
                  receitasComFavs.slice(0, 3).map((receita, index) => {
                    const medalha = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`;
                    return (
                      <div key={receita.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', margin: '8px 0', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                        <span>
                          {medalha} <strong>{receita.nome}</strong>
                        </span>
                        <span style={{ color: '#2f6b3f', fontWeight: 'bold' }}>{receita.favs} ♥</span>
                      </div>
                    );
                  })
                ) : (
                  <p style={{ color: '#888', fontStyle: 'italic' }}>Nenhuma receita publicada ainda.</p>
                )}
              </div>
            </div>

            <div className="card-config">
              <h3>📊 Distribuição por Categoria</h3>
              <div style={{ marginTop: '15px' }}>
                {Object.entries(categorias).length > 0 ? (
                  Object.entries(categorias).map(([cat, count]) => (
                    <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0' }}>
                      <span>{cat}</span>
                      <strong>{count}</strong>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#888' }}>Nenhuma receita publicada.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CONFIGURAÇÕES */}
      {activeTab === 'config' && (
        <section className="configuracoes tab-content">
          <div className="card-config">
            <h3>Notificações</h3>
            <div className="linha">
              <div>
                <strong>Novos comentários</strong>
                <p>Receba alertas nas suas receitas</p>
              </div>
              <button className="btn-outline">Ativar</button>
            </div>
            <div className="linha">
              <div>
                <strong>Receitas favoritadas</strong>
                <p>Saiba quando salvam suas receitas</p>
              </div>
              <button className="btn-outline">Ativar</button>
            </div>
          </div>
          <div className="card-config full">
            <h3>Conta</h3>
            <button className="btn-outline">Alterar Senha</button>
            <button className="btn-danger" onClick={() => {
              localStorage.removeItem('usuarioLogado');
              setLocation('/login');
            }}>
              Sair da Conta
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
