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
  const [formData, setFormData] = useState({
    id: 0, nomeCompleto: '', username: '', idade: 14, gmail: '', senha: '', restricoesAlimentares: '', fotoPerfil: null
  });

  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function loadProfile() {
      if (!userId) { setLocation('/login'); return; }
      try {
        const api = userType === 'chefe' ? chefesAPI : usuariosAPI;
        const response = await api.getById(userId);
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
          const recipesRes = await apiCall(`/receita/chefe/${userId}`);
          if (recipesRes.data) {
            setDbRecipes(recipesRes.data);
          }
        } else {
          const favsRes = await apiCall(`/favorito/usuario/${userId}`);
          if (favsRes.data) {
            setDbFavorites(favsRes.data.map(f => f.receita));
          }
        }
      } catch (error) { console.error(error); }
      setLoading(false);
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
        // 1. Buscar e deletar Comentários vinculados
        const commentsRes = await apiCall('/comentario/findAll');
        if (commentsRes.data) {
          const toDelete = commentsRes.data.filter(c => c.receita && c.receita.codReceitas.toString() === recipeId);
          for (const c of toDelete) { await apiCall(`/comentario/${c.codComentarios}`, { method: 'DELETE' }); }
        }

        // 2. Buscar e deletar Avaliações vinculadas
        const ratingsRes = await apiCall('/avaliacao/findAll');
        if (ratingsRes.data) {
          const toDelete = ratingsRes.data.filter(a => a.receita && a.receita.codReceitas.toString() === recipeId);
          for (const a of toDelete) { await apiCall(`/avaliacao/${a.codAvaliacao}`, { method: 'DELETE' }); }
        }

        // 3. Buscar e deletar Favoritos vinculados
        const favsRes = await apiCall('/favorito/findAll');
        if (favsRes.data) {
          const toDelete = favsRes.data.filter(f => f.receita && f.receita.codReceitas.toString() === recipeId);
          for (const f of toDelete) { await apiCall(`/favorito/${f.codFavoritos}`, { method: 'DELETE' }); }
        }

        // 4. Finalmente, deletar a Receita
        const response = await receitasAPI.delete(recipeId);
        if (!response.error) {
          setDbRecipes(prev => prev.filter(r => r.codReceitas.toString() !== recipeId));
          alert("Receita e todos os seus dados vinculados foram excluídos com sucesso!");
        } else {
          alert("Erro ao excluir a receita. Verifique o console para mais detalhes.");
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
                      <button className="btn-delete" onClick={() => handleDeleteRecipe(recipe.id)}>🗑️ Excluir</button>
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
