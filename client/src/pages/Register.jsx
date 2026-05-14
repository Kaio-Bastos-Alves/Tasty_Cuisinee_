import { useState } from 'react';
import { useLocation } from 'wouter';
import { usuariosAPI, chefesAPI } from '../lib/api.ts'; // Certifique-se de ter chefesAPI no seu arquivo de api
import '../styles/register.css'; 

export default function Register() {
  const [, setLocation] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState('usuario'); // 'usuario' ou 'chefe'

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    nomeDeUsuario: '',
    idade: '',
    gmail: '',
    senha: '',
    restricoesAlimentares: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      
      if (userType === 'usuario') {
        const payload = {
          nomeCompleto: formData.nomeCompleto,
          nomeDeUsuario: formData.nomeDeUsuario,
          idade: parseInt(formData.idade),
          gmail: formData.gmail,
          senha: formData.senha,
          restricoesAlimentares: formData.restricoesAlimentares
        };
        response = await usuariosAPI.create(payload);
      } else {
        // Payload para CHEFE (conforme Chefe.java)
        const payload = {
          nomeCompleto: formData.nomeCompleto,
          nomeUsuario: formData.nomeDeUsuario, // Nome do campo no Java do Chefe
          idade: parseInt(formData.idade),
          gmail: formData.gmail,
          senha: formData.senha,
          fotoPerfil: null
        };
        response = await chefesAPI.create(payload);
      }

      if (!response.error) {
        alert(`${userType === 'usuario' ? 'Usuário' : 'Chefe'} cadastrado com sucesso!`);
        setLocation('/login');
      } else {
        setError("Erro: Verifique se os dados já existem no sistema.");
      }
    } catch (err) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        
        {/* ABAS DE SELEÇÃO (Igual ao seu Login) */}
        <div className="register-tabs">
          <button 
            className={`register-tab ${userType === 'usuario' ? 'active' : ''}`}
            onClick={() => setUserType('usuario')}
          >
            Usuário
          </button>
          <button 
            className={`register-tab ${userType === 'chefe' ? 'active' : ''}`}
            onClick={() => setUserType('chefe')}
          >
            Chefe
          </button>
        </div>

        <div className="register-header">
          <h1>{userType === 'usuario' ? 'Criar Conta' : 'Cadastro de Chefe'}</h1>
          <p>{userType === 'usuario' ? 'Junte-se ao Tasty Cuisine' : 'Compartilhe suas receitas profissionais'}</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>
            Nome Completo
            <input type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
          </label>

          <label>
            Nome de Usuário
            <input type="text" name="nomeDeUsuario" value={formData.nomeDeUsuario} onChange={handleChange} required />
          </label>

          <label>
            Idade
            <input type="number" name="idade" value={formData.idade} onChange={handleChange} required min="14" />
          </label>

          <label>
            Gmail
            <input type="email" name="gmail" value={formData.gmail} onChange={handleChange} required />
          </label>

          <label>
            Senha
            <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
          </label>

          {/* Só mostra restrições se for usuário comum */}
          {userType === 'usuario' && (
            <label>
              Restrições (Opcional)
              <input type="text" name="restricoesAlimentares" value={formData.restricoesAlimentares} onChange={handleChange} />
            </label>
          )}

          {error && <p className="register-error">{error}</p>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Finalizar Cadastro'}
          </button>

          <p className="register-footer">
            Já tem conta?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setLocation('/login'); }}>
              Entrar
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}