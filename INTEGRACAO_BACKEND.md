# Integração com Backend - Tasty Cuisine React

## Visão Geral

Este documento descreve como o frontend React está configurado para se conectar com o backend Java.

## Estrutura de Serviços

Os serviços de API estão organizados em `/client/src/services/`:

### 1. **receitaService.js**
Gerencia todas as requisições relacionadas a receitas:
- `getAllReceitas()` - Obter todas as receitas
- `getReceitaById(id)` - Obter receita por ID
- `getReceitasByCategoria(categoriaId)` - Obter receitas por categoria
- `getReceitasByChefe(chefeId)` - Obter receitas por chefe
- `searchReceitas(termo)` - Buscar receitas por termo
- `createReceita(receitaData)` - Criar nova receita
- `updateReceita(id, receitaData)` - Atualizar receita
- `deleteReceita(id)` - Deletar receita
- `getReceitasPopulares()` - Obter receitas populares

### 2. **chefeService.js**
Gerencia todas as requisições relacionadas a chefes:
- `getAllChefes()` - Obter todos os chefes
- `getChefeById(id)` - Obter chefe por ID
- `searchChefes(termo)` - Buscar chefes por termo
- `createChefe(chefeData)` - Criar novo chefe
- `updateChefe(id, chefeData)` - Atualizar chefe
- `deleteChefe(id)` - Deletar chefe
- `getChefePopulares()` - Obter chefes populares

### 3. **usuarioService.js**
Gerencia autenticação e dados de usuários:
- `registerUsuario(usuarioData)` - Registrar novo usuário
- `loginUsuario(email, senha)` - Login de usuário
- `getUsuarioLogado()` - Obter dados do usuário autenticado
- `getUsuarioById(id)` - Obter usuário por ID
- `updatePerfilUsuario(usuarioData)` - Atualizar perfil
- `updatePreferenciasAlimentares(preferencias)` - Atualizar preferências
- `logoutUsuario()` - Logout
- `isAutenticado()` - Verificar autenticação
- `getAuthToken()` - Obter token de autenticação

### 4. **favoritoService.js**
Gerencia favoritos do usuário:
- `getFavoritosUsuario(usuarioId)` - Obter favoritos
- `addFavorito(usuarioId, receitaId)` - Adicionar aos favoritos
- `removeFavorito(usuarioId, receitaId)` - Remover dos favoritos
- `isFavorito(usuarioId, receitaId)` - Verificar se é favorito

### 5. **categoriaService.js**
Gerencia categorias:
- `getAllCategorias()` - Obter todas as categorias
- `getCategoriaById(id)` - Obter categoria por ID
- `createCategoria(categoriaData)` - Criar categoria
- `updateCategoria(id, categoriaData)` - Atualizar categoria
- `deleteCategoria(id)` - Deletar categoria

## Configuração da API

### Arquivo: `/client/src/config/api.js`

Define a URL base do backend e funções auxiliares para requisições HTTP:
- `apiGet(endpoint)` - Fazer requisição GET
- `apiPost(endpoint, data)` - Fazer requisição POST
- `apiPut(endpoint, data)` - Fazer requisição PUT
- `apiDelete(endpoint)` - Fazer requisição DELETE

### URL Base do Backend

A URL base é definida pela variável de ambiente `VITE_API_URL`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
```

## Configuração do Ambiente

### Desenvolvimento Local

1. Certifique-se de que o backend Java está rodando em `http://localhost:8080`

2. Se necessário, defina a variável de ambiente no arquivo `.env`:
   ```
   VITE_API_URL=http://localhost:8080
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Produção

Para produção, defina a URL do backend:
```
VITE_API_URL=https://seu-dominio-backend.com
```

## Exemplo de Uso

### Importar um serviço

```javascript
import { getAllReceitas, getReceitaById } from '../services/receitaService';
```

### Usar em um componente React

```javascript
import { useState, useEffect } from 'react';
import { getAllReceitas } from '../services/receitaService';

export default function Recipes() {
  const [receitas, setReceitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReceitas = async () => {
      try {
        setLoading(true);
        const data = await getAllReceitas();
        setReceitas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReceitas();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      {receitas.map(receita => (
        <div key={receita.id}>{receita.nome}</div>
      ))}
    </div>
  );
}
```

## Tratamento de Erros

Todos os serviços incluem tratamento de erros básico. Para melhor UX, você pode:

1. Usar a biblioteca `sonner` para exibir toasts de erro
2. Implementar um ErrorBoundary para capturar erros globais
3. Adicionar retry logic para requisições que falharam

## Autenticação

O token de autenticação é armazenado em `localStorage` com a chave `authToken`:

```javascript
import { loginUsuario, isAutenticado, getAuthToken } from '../services/usuarioService';

// Login
const response = await loginUsuario('email@example.com', 'senha');
// Token é automaticamente salvo em localStorage

// Verificar autenticação
if (isAutenticado()) {
  const token = getAuthToken();
  // Usar token para requisições autenticadas
}
```

## Próximos Passos

1. **Integrar serviços nos componentes**: Substitua os dados mockados pelos dados do backend
2. **Adicionar interceptadores**: Implementar interceptadores para adicionar token de autenticação automaticamente
3. **Implementar refresh token**: Adicionar lógica para renovar tokens expirados
4. **Adicionar loading states**: Mostrar spinners durante o carregamento
5. **Melhorar tratamento de erros**: Implementar retry logic e error boundaries

## Endpoints Esperados do Backend

Com base na estrutura Java explorada, os endpoints esperados são:

### Receitas
- `GET /receita/listar` - Listar todas
- `GET /receita/{id}` - Obter por ID
- `GET /receita/categoria/{id}` - Por categoria
- `GET /receita/chefe/{id}` - Por chefe
- `POST /receita/criar` - Criar
- `PUT /receita/{id}` - Atualizar
- `DELETE /receita/{id}` - Deletar

### Chefes
- `GET /chefe/listar` - Listar todos
- `GET /chefe/{id}` - Obter por ID
- `POST /chefe/criar` - Criar
- `PUT /chefe/{id}` - Atualizar
- `DELETE /chefe/{id}` - Deletar

### Usuários
- `POST /usuario/registrar` - Registrar
- `POST /usuario/login` - Login
- `GET /usuario/perfil` - Perfil do usuário logado
- `PUT /usuario/perfil` - Atualizar perfil
- `PUT /usuario/preferencias` - Atualizar preferências

### Favoritos
- `GET /favorito/usuario/{id}` - Obter favoritos
- `POST /favorito/adicionar` - Adicionar
- `DELETE /favorito/remover/{usuarioId}/{receitaId}` - Remover

### Categorias
- `GET /categoria/listar` - Listar todas
- `GET /categoria/{id}` - Obter por ID
- `POST /categoria/criar` - Criar
- `PUT /categoria/{id}` - Atualizar
- `DELETE /categoria/{id}` - Deletar
