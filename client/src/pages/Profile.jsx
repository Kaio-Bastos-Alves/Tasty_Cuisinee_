import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'wouter';
import { receitasAPI, usuariosAPI, chefesAPI, apiCall } from '../lib/api.ts'; 
import RecipeCard from '../components/RecipeCard.jsx';
import { useFavorites } from '../hooks/useFavorites.js';
import '../styles/profile.css';

export default function Profile() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('favoritos');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dbRecipes, setDbRecipes] = useState([]);
  const [dbFavorites, setDbFavorites] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [debugInfo, setDebugInfo] = useState([]);
  const [formData, setFormData] = useState({
    id: 0, nomeCompleto: '', username: '', idade: 14, gmail: '', senha: '', restricoesAlimentares: '', fotoPerfil: null
  });

  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function loadProfile() {
      const debug = [];
      if (!userId) { setLocation('/login'); return; }
      debug.push(`userId=${userId}`);
      debug.push(`userType=${userType}`);

      try {
        const api = userType === 'chefe' ? chefesAPI : usuariosAPI;
        const response = await api.getById(userId);
        debug.push(`profile getById status=${response.status}`);
        if (response.error) {
          debug.push(`profile error=${response.error}`);
        }
        if (response.data) {
          const d = response.data;
          setFormData({
            id: userType === 'chefe' ? d.codChefe : d.codUser,
            nomeCompleto: d.nomeCompleto || '',
            username: userType === 'chefe' ? d.nomeUsuario : d.nomeDeUsuario,
            idade: d.idade || 14, gmail: d.gmail || '', senha: d.senha || '',
            restricoesAlimentares: d.restricoesAlimentares || '', fotoPerfil: d.fotoPerfil || null
          });
        }

        if (userType === 'chefe') {
          const recipesRes = await receitasAPI.getByChef(userId);
          debug.push(`recipes getByChef status=${recipesRes.status}`);
          if (recipesRes.error) {
            debug.push(`recipes error=${recipesRes.error}`);
            setFetchError('Erro ao carregar suas receitas do backend.');
          }

          const recipesData = Array.isArray(recipesRes.data)
            ? recipesRes.data
            : Array.isArray(recipesRes.data?.content)
              ? recipesRes.data.content
              : [];
          debug.push(`recipes returned type=${typeof recipesRes.data} count=${Array.isArray(recipesData) ? recipesData.length : 'n/a'}`);

          if (recipesData.length === 0) {
            debug.push('fallback: carregar todas as receitas e filtrar pelo chefe');
            const allRes = await receitasAPI.getAll();
            debug.push(`getAll status=${allRes.status}`);
            if (allRes.error) {
              debug.push(`getAll error=${allRes.error}`);
            }
            const allData = Array.isArray(allRes.data)
              ? allRes.data
              : Array.isArray(allRes.data?.content)
                ? allRes.data.content
                : [];
            const filtered = allData.filter(recipe =>
              recipe?.chefe?.codChefe === Number(userId)
              || Number(recipe?.chefe?.codChefe) === Number(userId)
            );
            debug.push(`fallback filter count=${filtered.length}`);
            if (filtered.length > 0) {
              setDbRecipes(filtered);
            } else {
              setDbRecipes(recipesData);
              if (!fetchError) {
                setFetchError('Nenhuma receita encontrada para este chefe.');
              }
            }
          } else {
            setDbRecipes(recipesData);
          }
        } else {
          const favsRes = await apiCall(`/favorito/usuario/${userId}`);
          debug.push(`favorites get status=${favsRes.status}`);
          if (favsRes.error) {
            debug.push(`favorites error=${favsRes.error}`);
          }
          if (favsRes.data) {
            setDbFavorites(favsRes.data.map(f => f.receita));
          }
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        debug.push(`catch error=${message}`);
        console.error(error);
        setFetchError('Erro ao carregar o perfil. Veja o debug abaixo para mais detalhes.');
      } finally {
        setDebugInfo(debug);
        setLoading(false);
      }
    }
    loadProfile();
  }, [userId, userType, setLocation]);

  const normalizedChefRecipes = useMemo(() => dbRecipes.map(recipe => ({
    id: recipe.codReceitas.toString(), nome: recipe.nomeReceita, descricao: recipe.descricao,
    imagem: recipe.fotoReceita || '/images/receita1.jpg', tempo: '30 min', chef: formData.nomeCompleto, dificuldade: 'Médio', categoria: 'Geral'
  })), [dbRecipes, formData.nomeCompleto]);

  const normalizedUserFavorites = useMemo(() => dbFavorites.map(recipe => ({
    id: recipe.codReceitas.toString(), nome: recipe.nomeReceita, descricao: recipe.descricao,
    imagem: recipe.fotoReceita || '/images/receita1.jpg', tempo: '30 min', chef: recipe.chefe?.nomeCompleto || 'Chef Tasty', dificuldade: 'Médio', categoria: 'Geral'
  })), [dbFavorites]);

  const handleSaveProfile = async () => {
    const api = userType === 'chefe' ? chefesAPI : usuariosAPI;
    let payload = userType === 'chefe' ? {
      codChefe: Number(userId),
      nomeUsuario: formData.username,
      nomeCompleto: formData.nomeCompleto,
      idade: Number(formData.idade),
      gmail: formData.gmail,
      senha: formData.senha,
      fotoPerfil: formData.fotoPerfil
    } : {
      codUser: Number(userId),
      nomeDeUsuario: formData.username,
      nomeCompleto: formData.nomeCompleto,
      idade: Number(formData.idade),
      gmail: formData.gmail,
      senha: formData.senha,
      restricoesAlimentares: formData.restricoesAlimentares
    };

    const response = await api.update(userId, payload);
    if (!response.error) {
      setIsEditing(false);
      localStorage.setItem('userName', formData.nomeCompleto);
      alert("Perfil atualizado com sucesso!");
    } else {
      alert("Erro ao atualizar perfil.");
    }
  };

   const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm("Tem certeza que deseja excluir esta receita? Isso removerá todos os comentários, avaliações e favoritos vinculados a ela.")) {
      try {
        const safeArray = (value) => Array.isArray(value) ? value : [];

        // 1. Buscar e deletar Comentários vinculados
        const commentsRes = await apiCall('/comentario/findAll');
        const comments = safeArray(commentsRes.data);
        if (commentsRes.error) {
          console.warn('comments fetch error:', commentsRes.error, 'status:', commentsRes.status);
        }
        for (const c of comments.filter(c => c?.receita?.codReceitas?.toString() === recipeId)) {
          await apiCall(`/comentario/${c.codComentarios}`, { method: 'DELETE' });
        }

        // 2. Buscar e deletar Avaliações vinculadas
        const ratingsRes = await apiCall('/avaliacao/findAll');
        const ratings = safeArray(ratingsRes.data);
        if (ratingsRes.error) {
          console.warn('ratings fetch error:', ratingsRes.error, 'status:', ratingsRes.status);
        }
        for (const a of ratings.filter(a => a?.receita?.codReceitas?.toString() === recipeId)) {
          await apiCall(`/avaliacao/${a.codAvaliacao}`, { method: 'DELETE' });
        }

        // 3. Buscar e deletar Favoritos vinculados
        const favsRes = await apiCall('/favorito/findAll');
        const favoritesToDelete = safeArray(favsRes.data);
        if (favsRes.error) {
          console.warn('favorites fetch error:', favsRes.error, 'status:', favsRes.status);
        }
        for (const f of favoritesToDelete.filter(f => f?.receita?.codReceitas?.toString() === recipeId)) {
          await apiCall(`/favorito/${f.codFavoritos}`, { method: 'DELETE' });
        }

        // 4. Finalmente, deletar a Receita
        const response = await receitasAPI.delete(recipeId);
        if (!response.error) {
          setDbRecipes(prev => prev.filter(r => r.codReceitas.toString() !== recipeId));
          alert("Receita excluída com sucesso!");
        } else {
          console.error('delete error:', response.error, 'status:', response.status);
          alert("Não foi possível excluir a receita. Verifique o console para mais detalhes.");
        }
      } catch (error) {
        console.error("Erro na exclusão em cascata:", error);
        alert("Erro ao processar a exclusão.");
      }
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="perfil">Carregando...</div>;

  return (
    <div className="perfil">
      <section className="perfil-header">
        <div className="perfil-info">
          <div className="avatar">{userType === 'chefe' ? '👨‍🍳' : '👤'}</div>
          <div>
            <h1>{formData.nomeCompleto}</h1>
            <p>{formData.gmail} | {userType === 'chefe' ? 'Chef Profissional' : `${formData.idade} anos`}</p>
          </div>
        </div>
        <button className="btn-editar" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancelar' : '✏️ Editar Perfil'}
        </button>
      </section>

      {(fetchError || debugInfo.length > 0) && (
        <section className="perfil-debug" style={{ margin: '16px 0', padding: '14px', borderRadius: '12px', backgroundColor: '#fff4e5', border: '1px solid #ffd8a8' }}>
          {fetchError && <p style={{ margin: 0, color: '#9a3412', fontWeight: 'bold' }}>{fetchError}</p>}
          {debugInfo.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              <strong>Debug de Carregamento</strong>
              <ul style={{ margin: '8px 0 0 16px', padding: 0, listStyleType: 'disc', color: '#6b4226' }}>
                {debugInfo.map((line, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}><code>{line}</code></li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {isEditing && (
        <section className="perfil-edicao">
          <div className="inputs">
            <label>Nome Completo:</label>
            <input name="nomeCompleto" type="text" value={formData.nomeCompleto} onChange={handleChange} />
            <label>E-mail (Gmail):</label>
            <input name="gmail" type="email" value={formData.gmail} onChange={handleChange} />
            <label>Nome de Usuário:</label>
            <input name="username" type="text" value={formData.username} onChange={handleChange} />
            <label>Idade:</label>
            <input name="idade" type="number" value={formData.idade} onChange={handleChange} />
            {userType !== 'chefe' && (
              <>
                <label>Restrições Alimentares:</label>
                <input name="restricoesAlimentares" type="text" value={formData.restricoesAlimentares} onChange={handleChange} />
              </>
            )}
            <button className="btn-salvar" onClick={handleSaveProfile}>Salvar Alterações</button>
          </div>
        </section>
      )}

      <nav className="perfil-tabs">
        <button className={activeTab === 'favoritos' ? 'active' : ''} onClick={() => setActiveTab('favoritos')}>
          {userType === 'chefe' ? '🍴 Minhas Receitas' : '❤️ Favoritos'}
        </button>
        <button className={activeTab === 'preferencias' ? 'active' : ''} onClick={() => setActiveTab('preferencias')}>⚙️ Configurações</button>
      </nav>

      {activeTab === 'favoritos' && (
        <section className="tab-content">
          {userType === 'chefe' && (
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Suas Publicações</h2>
              <Link href="/publicar-receita"><button className="btn-salvar" style={{ padding: '8px 15px' }}>+ Nova Receita</button></Link>
            </div>
          )}
          <div className="recipes-grid">
            {userType === 'chefe' ? (
              normalizedChefRecipes.length > 0 ? (
                normalizedChefRecipes.map(recipe => (
                  <div key={recipe.id} className="recipe-manage-card">
                    <RecipeCard recipe={recipe} id={recipe.id} isFavorite={favorites.includes(recipe.id)} onToggleFavorite={toggleFavorite} />
                    <div className="recipe-actions-admin">
                      <button type="button" className="btn-delete" onClick={() => handleDeleteRecipe(recipe.id)}>🗑️ Excluir</button>
                    </div>
                  </div>
                ))
              ) : <p>Você ainda não publicou nenhuma receita.</p>
            ) : (
              favorites.length > 0 ? favorites.map(id => <RecipeCard key={id} id={id} isFavorite={true} onToggleFavorite={toggleFavorite} />) : <p>Nenhum favorito encontrado.</p>
            )}
          </div>
        </section>
      )}

      {activeTab === 'preferencias' && (
        <section className="tab-content">
          <div className="card-config">
            <h3>Meus Dados</h3>
            <p><strong>Tipo de Conta:</strong> {userType.toUpperCase()}</p>
            <p><strong>Usuário:</strong> {formData.username}</p>
            <button className="btn-outline" onClick={() => { localStorage.clear(); setLocation('/login'); window.location.reload(); }}>Sair da Conta</button>
          </div>
        </section>
      )}
    </div>
  );
}
