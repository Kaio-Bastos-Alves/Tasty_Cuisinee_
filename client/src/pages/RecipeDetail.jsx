import React, { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { receitasAPI, apiCall, API_ENDPOINTS } from '../lib/api.ts'; 
import { useFavorites, useHistory } from '../hooks/useFavorites.js';
import '../styles/recipe-detail.css';

export default function RecipeDetail() {
  const [match, params] = useRoute('/receita/:id');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const { favorites = [], toggleFavorite } = useFavorites();
  const { addToHistory } = useHistory();

  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');

  const fetchComments = async () => {
    try {
      const response = await apiCall(API_ENDPOINTS.COMENTARIOS_ALL);
      if (response && Array.isArray(response.data)) {
        const recipeComments = response.data.filter(c => 
          c.receita && (c.receita.codReceitas.toString() === params.id)
        );
        setComments(recipeComments);
      }
    } catch (err) { console.error("Erro ao buscar comentários:", err); }
  };

  useEffect(() => {
    async function getDetail() {
      if (!params?.id) return;
      try {
        const response = await receitasAPI.getById(params.id);
        if (response.data) {
          setRecipe(response.data);
          addToHistory(params.id);
          fetchComments();
        }
      } catch (err) { console.error(err); }
      setLoading(false);
    }
    getDetail();
  }, [params?.id]);

  const handleAddCommentAndRating = async (e) => {
    e.preventDefault();
    if (!userId || userType !== 'usuario') { 
      alert("Apenas usuários comuns podem avaliar receitas."); 
      return; 
    }

    try {
      // 1. Enviar Comentário
      const commentRes = await apiCall(API_ENDPOINTS.COMENTARIOS, { 
        method: 'POST', 
        body: JSON.stringify({
          texto: newComment,
          usuario: { codUser: parseInt(userId) },
          receita: { codReceitas: parseInt(params.id) }
        })
      });

      // 2. Enviar Avaliação
      const ratingRes = await apiCall(API_ENDPOINTS.AVALIACOES, { 
        method: 'POST', 
        body: JSON.stringify({
          nota: rating,
          usuario: { codUser: parseInt(userId) },
          receita: { codReceitas: parseInt(params.id) }
        })
      });

      if (!commentRes.error && !ratingRes.error) {
        alert("Sua avaliação foi enviada com sucesso!");
        setNewComment('');
        fetchComments();
      } else {
        alert("Erro ao salvar no banco de dados. Verifique sua conexão.");
      }
    } catch (err) { alert("Erro ao processar sua participação."); }
  };

  if (loading) return <div className="recipe-detail"><p>Carregando...</p></div>;
  if (!recipe) return <div className="recipe-detail"><p>Receita não encontrada.</p></div>;

  return (
    <div className="recipe-detail">
      <div className="recipe-hero">
        <img src={recipe.fotoReceita || recipe.imagem || '/images/receita1.jpg'} alt={recipe.nomeReceita} />
        <div className="recipe-hero-info">
          <h1>{recipe.nomeReceita}</h1>
          <button
            type="button"
            className={`btn-save ${favorites.includes(String(recipe.codReceitas)) ? 'saved' : ''}`}
            onClick={() => toggleFavorite(String(recipe.codReceitas))}
            aria-pressed={favorites.includes(String(recipe.codReceitas))}
            aria-label={favorites.includes(String(recipe.codReceitas)) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <span className="heart">{favorites.includes(String(recipe.codReceitas)) ? '♥' : '♡'}</span>
            <span className="save-label">{favorites.includes(String(recipe.codReceitas)) ? ' Salva' : ' Salvar'}</span>
          </button>
        </div>
      </div>
      <div className="recipe-details">
        <div className="card-config">
          <h3>Ingredientes</h3>
          {(() => {
            try {
              const lista = JSON.parse(recipe.ingredientes);
              return (
                <ul className="lista-verde">
                  {lista.map((ing, i) => (
                    <li key={i}>{ing.quantidade} {ing.unidade} de {ing.nome}</li>
                  ))}
                </ul>
              );
            } catch {
              return <p style={{whiteSpace:'pre-line'}}>{recipe.ingredientes || 'Não informado'}</p>;
            }
          })()}
        </div>
        <div className="card-config">
          <h3>Modo de Preparo</h3>
          {(() => {
            try {
              const passos = JSON.parse(recipe.modoPreparo);
              return (
                <ol className="lista-numerada">
                  {passos.map((passo, i) => <li key={i}>{passo}</li>)}
                </ol>
              );
            } catch {
              return <p style={{whiteSpace:'pre-line'}}>{recipe.modoPreparo}</p>;
            }
          })()}
        </div>
      </div>
      
      <div className="comments-section" style={{ marginTop: '40px', padding: '20px', background: '#fff', borderRadius: '12px' }}>
        <h3>Comentários da Comunidade ({comments.length})</h3>
        {userType === 'usuario' && (
          <form onSubmit={handleAddCommentAndRating} style={{marginBottom:'20px'}}>
            <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))} style={{marginBottom:'10px', padding:'5px'}}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Estrelas</option>)}
            </select>
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Sua opinião..." required style={{width:'100%', minHeight:'80px', padding:'10px'}} />
            <button type="submit" className="btn-salvar" style={{marginTop:'10px'}}>Publicar Avaliação</button>
          </form>
        )}
        <div className="comments-list">
          {comments.map((c, i) => (
            <div key={i} style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
              <strong>{c.usuario?.nomeCompleto || 'Usuário'}</strong>
              <p style={{margin:'5px 0'}}>{c.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
