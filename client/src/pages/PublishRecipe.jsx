import { useState } from 'react';
import { useLocation } from 'wouter';
import { receitasAPI, chefesAPI } from '../lib/api.ts';
import '../styles/publish-recipe.css';

const UNIDADES = ['unidades', 'gramas', 'kg', 'ml', 'litros', 'xícaras', 'colheres', 'fatias', 'pitadas'];

export default function PublishRecipe() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({ nomeReceita: '', descricao: '', imagem: ''});
  const [ingredientes, setIngredientes] = useState([]);
  const [passos, setPassos] = useState([]);
  const [novoIngrediente, setNovoIngrediente] = useState({ quantidade: '', unidade: 'unidades', nome: '' });
  const [novoPasso, setNovoPasso] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const adicionarIngrediente = () => {
    if (!novoIngrediente.quantidade || !novoIngrediente.nome) return;
    setIngredientes(prev => [...prev, { ...novoIngrediente }]);
    setNovoIngrediente({ quantidade: '', unidade: 'unidades', nome: '' });
  };

  const removerIngrediente = (index) => {
    setIngredientes(prev => prev.filter((_, i) => i !== index));
  };

  const adicionarPasso = () => {
    if (!novoPasso.trim()) return;
    setPassos(prev => [...prev, novoPasso.trim()]);
    setNovoPasso('');
  };

  const removerPasso = (index) => {
    setPassos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passos.length === 0) { setError('Adicione ao menos um passo no modo de preparo.'); return; }
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const userId = localStorage.getItem('userId');
      const chefResponse = await chefesAPI.getById(userId);

      if (!chefResponse.data) {
        setError('Erro ao carregar dados do chef');
        setLoading(false);
        return;
      }

      const payload = {
        nomeReceita: formData.nomeReceita,
        descricao: formData.descricao,
        modoPreparo: JSON.stringify(passos),
        ingredientes: JSON.stringify(ingredientes),
        chefe: chefResponse.data,
        fotoReceita: formData.imagem
      };

      const response = await receitasAPI.create(payload);

      if (response.data) {
        setSuccess(true);
        alert('✅ Receita publicada com sucesso!');
        setFormData({ nomeReceita: '', descricao: '', imagem: '' });
        setIngredientes([]);
        setPassos([]);
        setTimeout(() => setLocation('/receitas'), 2000);
      } else {
        setError(response.error || 'Erro ao publicar receita');
      }
    } catch (err) {
      setError('Erro ao publicar receita: ' + (err instanceof Error ? err.message : 'Desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="publish-page">
      <div className="publish-container">
        <h1>Publicar Sua Receita</h1>
        <p>Compartilhe sua receita favorita com nossa comunidade</p>

        {error && <div className="error-message" style={{color:'#d32f2f',padding:'10px',marginBottom:'20px',backgroundColor:'#ffebee',borderRadius:'8px'}}>{error}</div>}
        {success && <div className="success-message" style={{color:'#388e3c',padding:'10px',marginBottom:'20px',backgroundColor:'#e8f5e9',borderRadius:'8px'}}>✅ Receita publicada com sucesso!</div>}

        <form onSubmit={handleSubmit} className="publish-form">
          <div className="form-group">
            <label htmlFor="nomeReceita">Nome da Receita *</label>
            <input type="text" id="nomeReceita" name="nomeReceita" value={formData.nomeReceita} onChange={handleChange} placeholder="Ex: Bolo de Chocolate" required />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição *</label>
            <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} placeholder="Descreva sua receita..." rows={4} required />
          </div>

          {/* INGREDIENTES */}
          <div className="form-group">
            <label>Ingredientes</label>
            <div className="ingrediente-input-row">
              <input
                type="text"
                placeholder="Quantidade"
                value={novoIngrediente.quantidade}
                onChange={e => setNovoIngrediente(prev => ({ ...prev, quantidade: e.target.value }))}
                className="ingrediente-quantidade"
              />
              <select
                value={novoIngrediente.unidade}
                onChange={e => setNovoIngrediente(prev => ({ ...prev, unidade: e.target.value }))}
              >
                {UNIDADES.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
              <input
                type="text"
                placeholder="Nome do ingrediente"
                value={novoIngrediente.nome}
                onChange={e => setNovoIngrediente(prev => ({ ...prev, nome: e.target.value }))}
                className="ingrediente-nome"
              />
              <button type="button" className="btn-adicionar" onClick={adicionarIngrediente}>+ Adicionar</button>
            </div>
            {ingredientes.length > 0 && (
              <ul className="lista-adicionados">
                {ingredientes.map((ing, i) => (
                  <li key={i}>
                    <span>✓ {ing.quantidade} {ing.unidade} de {ing.nome}</span>
                    <button type="button" className="btn-remover" onClick={() => removerIngrediente(i)}>✕</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* MODO DE PREPARO */}
          <div className="form-group">
            <label>Modo de Preparo *</label>
            <div className="passo-input-row">
              <input
                type="text"
                placeholder={`Passo ${passos.length + 1}...`}
                value={novoPasso}
                onChange={e => setNovoPasso(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), adicionarPasso())}
              />
              <button type="button" className="btn-adicionar" onClick={adicionarPasso}>+ Adicionar</button>
            </div>
            {passos.length > 0 && (
              <ol className="lista-adicionados lista-passos">
                {passos.map((passo, i) => (
                  <li key={i}>
                    <span>{passo}</span>
                    <button type="button" className="btn-remover" onClick={() => removerPasso(i)}>✕</button>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="imagem">URL da Imagem *</label>
            <input type="url" id="imagem" name="imagem" value={formData.imagem} onChange={handleChange} placeholder="Ex: https://example.com/imagem.jpg" required />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Publicando...' : 'Publicar Receita'}
          </button>
        </form>
      </div>
    </div>
  );
}