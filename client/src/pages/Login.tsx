import { useState } from 'react';
import { useLocation } from 'wouter';
import '../styles/login.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function Login() {
  const [location, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    nomeDeUsuario: '',
    senha: ''
  });
  const [userType, setUserType] = useState<'usuario' | 'chefe'>('usuario');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = userType === 'usuario' ? '/usuario/login' : '/chefe/login';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.nomeDeUsuario, senha: formData.senha })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Email ou senha incorretos');
        return;
      }

      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('userId', String(userType === 'usuario' ? data.codUser : data.codChefe));
      localStorage.setItem('userType', userType);
      localStorage.setItem('userName', data.nomeCompleto);
      localStorage.setItem('userEmail', data.gmail);
      window.location.href = '/';
    } catch (err) {
      setError('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-tabs">
          <button
            className={`login-tab ${userType === 'usuario' ? 'active' : ''}`}
            onClick={() => {
              setUserType('usuario');
              setError(null);
            }}
          >
            Usuário
          </button>
          <button
            className={`login-tab ${userType === 'chefe' ? 'active' : ''}`}
            onClick={() => {
              setUserType('chefe');
              setError(null);
            }}
          >
            Chefe
          </button>
        </div>

        <div className={`painel-${userType}`}>
          { (
            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-avatar">{userType === 'usuario' ? '👤' : '👨‍🍳'}</div>
              <h2>{userType === 'usuario' ? 'Bem-vindo de volta' : 'Área do Chefe'}</h2>
              <p className="login-sub">
                {userType === 'usuario' 
                  ? 'Acesse sua conta para salvar receitas favoritas' 
                  : 'Acesse para gerenciar suas receitas e perfil'}
              </p>

              <label htmlFor="nomeDeUsuario">
                {userType === 'usuario' ? 'Nome de Usuário' : 'E-mail profissional'}
              </label>
              <input
                type="text"
                name="nomeDeUsuario"
                id="nomeDeUsuario"
                value={formData.nomeDeUsuario}
                onChange={handleChange}
                required
                disabled={loading}
              />

              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                name="senha"
                id="senha"
                value={formData.senha}
                onChange={handleChange}
                required
                disabled={loading}
              />

              {error && <p className="login-erro">{error}</p>}

              <button type="submit" className="sign" disabled={loading}>
                {loading ? 'Entrando...' : userType === 'usuario' ? 'Login' : 'Entrar como Chefe'}
              </button>

              <p className="login-rodape">
                {userType === 'usuario' ? 'Não tem conta?' : 'Ainda não é cadastrado?'}{' '}
                <a href="#" onClick={(e) => { setLocation("/cadastro") }}>
                  {userType === 'usuario' ? 'Cadastre-se' : 'Registre-se'}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}