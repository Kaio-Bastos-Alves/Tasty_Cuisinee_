import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { chefesAPI, receitasAPI } from '../lib/api.ts';
import RecipeCard from '../components/RecipeCard.jsx';
import { useFavorites } from '../hooks/useFavorites.js';
import '../styles/chef-profile.css';

export default function ChefProfile() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('receitas');
  const [isEditing, setIsEditing] = useState(false);
  const [chef, setChef] = useState(null);
  const [chefRecipes, setChefRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [debugInfo, setDebugInfo] = useState([]);
  const { favorites } = useFavorites();

  const userType = localStorage.getItem('userType');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userType !== 'chefe' || !userId) {
      setLocation('/login');
      return;
    }

    const chefId = Number(userId);
    const loadChefData = async () => {
      const debug = [];
      debug.push(`userType=${userType}`);
      debug.push(`userId=${userId}`);
      debug.push(`chefId=${chefId}`);

      try {
        const chefRes = await chefesAPI.getById(chefId);
        debug.push(`chefesAPI.getById status=${chefRes.status}`);
        if (chefRes.error) {
          debug.push(`chefRes.error=${chefRes.error}`);
        }
        if (!chefRes.data) {
          setFetchError('Não foi possível carregar o perfil do chefe.');
          setDebugInfo(debug);
          setLocation('/login');
          return;
        }

        setChef(chefRes.data);
        debug.push(`chef encontrado: codChefe=${chefRes.data.codChefe} nome=${chefRes.data.nomeCompleto}`);

        const receitasRes = await receitasAPI.getByChef(chefId);
        debug.push(`receitasAPI.getByChef status=${receitasRes.status}`);
        if (receitasRes.error) {
          debug.push(`receitasRes.error=${receitasRes.error}`);
        }

        let receitas = Array.isArray(receitasRes.data)
          ? receitasRes.data
          : Array.isArray(receitasRes.data?.content)
            ? receitasRes.data.content
            : [];
        debug.push(`receitasRes.data type=${typeof receitasRes.data} count=${Array.isArray(receitasRes.data) ? receitasRes.data.length : Array.isArray(receitasRes.data?.content) ? receitasRes.data.content.length : 'n/a'}`);

        const matchesChef = (recipe) => {
          return recipe?.chefe?.codChefe === chefId
            || recipe?.codChefe === chefId
            || recipe?.chefId === chefId
            || Number(recipe?.chefe?.codChefe) === chefId
            || Number(recipe?.codChefe) === chefId
            || Number(recipe?.chefId) === chefId;
        };

        if (receitasRes.error || receitas.length === 0) {
          debug.push('fallback: buscar todas as receitas e filtrar por chef');
          const allRes = await receitasAPI.getAll();
          debug.push(`receitasAPI.getAll status=${allRes.status}`);
          if (allRes.error) {
            debug.push(`receitasAll.error=${allRes.error}`);
          }
          if (allRes.data && Array.isArray(allRes.data)) {
            receitas = allRes.data.filter(matchesChef);
            debug.push(`fallback receitas filter count=${receitas.length}`);
          } else {
            debug.push('fallback receitas não é array ou está vazio');
          }

          if ((receitasRes.error || receitas.length === 0) && receitas.length === 0) {
            setFetchError('Não foi possível carregar suas receitas. Verifique os detalhes em debug.');
          }
        }

        setChefRecipes(receitas);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        debug.push(`catch error=${message}`);
        setFetchError('Erro ao carregar os dados do chef. Veja o debug abaixo para detalhes.');
      } finally {
        setDebugInfo(debug);
        setLoading(false);
      }
    };

    loadChefData();
  }, [userId, userType, setLocation]);

  if (loading) {
    return <div className="chef-profile"><p>Carregando...</p></div>;
  }

  if (!chef) {
    return <div className="chef-profile"><p>{fetchError || 'Chefe não encontrado.'}</p></div>;
  }

  const favs = favorites;
  const totalReceitas = chefRecipes.length;
  const totalFavs = chefRecipes.filter(item => favs.includes(String(item.codReceitas))).length;

  const receitasComFavs = chefRecipes
    .map(item => ({
      id: item.codReceitas,
      nome: item.nomeReceita || 'Receita',
      favs: favs.includes(String(item.codReceitas)) ? 1 : 0,
      categoria: item.categorias?.[0]?.nomeCategoria || 'Outros'
    }))
    .sort((a, b) => b.favs - a.favs);

  const categorias = {};
  chefRecipes.forEach(item => {
    const cat = item.categorias?.[0]?.nomeCategoria || 'Outros';
    categorias[cat] = (categorias[cat] || 0) + 1;
  });

  const dificuldades = { 'Fácil': 1, 'Médio': 2, 'Difícil': 3 };
  const somaD = chefRecipes.reduce((acc, item) => acc + (dificuldades[item.dificuldade] || 2), 0);
  const mediaD = totalReceitas > 0 ? (somaD / totalReceitas).toFixed(1) : 0;
  const nivelTexto = mediaD <= 1.5 ? 'Fácil' : mediaD <= 2.5 ? 'Médio' : 'Difícil';

  return (
    <div className="chef-profile">
      {/* HEADER PERFIL CHEFE */}
      <section className="perfil-header">
        <div className="perfil-info">
          <div className="avatar">👨‍🍳</div>
          <div>
            <h1>{chef.nomeCompleto}</h1>
            <p>🍽 {chef.nomeUsuario}</p>
            <p style={{ color: '#888', fontSize: '14px' }}>
              {chef.gmail || 'Sem e-mail cadastrado'}
            </p>
          </div>
        </div>
        <button className="btn-editar" onClick={() => setIsEditing(!isEditing)}>
          ✏️ Editar Perfil
        </button>
      </section>

      {(fetchError || debugInfo.length > 0) && (
        <section className="perfil-debug" style={{ margin: '16px 0', padding: '14px', backgroundColor: '#fff4e5', borderRadius: '12px', border: '1px solid #ffd8a8' }}>
          {fetchError && <p style={{ margin: 0, color: '#9a3412', fontWeight: 'bold' }}>{fetchError}</p>}
          {debugInfo.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <strong>Debug API</strong>
              <ul style={{ margin: '8px 0 0 16px', padding: 0, listStyleType: 'disc', color: '#6b4226' }}>
                {debugInfo.map((line, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}><code>{line}</code></li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* EDIÇÃO */}
      {isEditing && (
        <section className="perfil-edicao">
          <div className="perfil-info">
            <div className="avatar">👨‍🍳</div>
            <div className="inputs">
              <input type="text" placeholder="Nome" defaultValue={chef.nomeCompleto} />
              <input type="email" placeholder="E-mail" defaultValue={chef.gmail || ''} />
              <input type="text" placeholder="Usuário" defaultValue={chef.nomeUsuario} />
              <input type="text" placeholder="Idade" defaultValue={chef.idade || ''} />
              <textarea placeholder="Bio" style={{ width: '250px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', resize: 'vertical' }}>
                {chef.bio || ''}
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
                {chefRecipes.map(recipe => {
                  const cardData = {
                    ...recipe,
                    nome: recipe.nomeReceita,
                    descricao: recipe.descricao,
                    imagem: recipe.fotoReceita,
                    chef: chef.nomeCompleto,
                    categoria: recipe.categorias?.[0]?.nomeCategoria || 'Geral',
                    dificuldade: recipe.dificuldade || 'Médio',
                  };
                  return (
                    <RecipeCard
                      key={recipe.codReceitas}
                      recipe={cardData}
                      id={recipe.codReceitas.toString()}
                      isFavorite={favorites.includes(recipe.codReceitas.toString())}
                    />
                  );
                })}
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
