/**
 * API Configuration
 * Centralized API endpoints and utilities for communicating with the Tasty Cuisine backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Endpoints
export const API_ENDPOINTS = {
  // Receitas
  RECEITAS_ALL: `${API_BASE_URL}/receita/findAll`,
  RECEITAS: `${API_BASE_URL}/receita`,
  RECEITA_BY_ID: (id: string | number) => `${API_BASE_URL}/receita/${id}`,
  RECEITAS_BY_CHEFE: (codChefe: string | number) => `${API_BASE_URL}/receita/chefe/${codChefe}`,
  
  // Usuários
  USUARIOS_ALL: `${API_BASE_URL}/usuario/findAll`,
  USUARIOS: `${API_BASE_URL}/usuario`,
  USUARIO_BY_ID: (id: string | number) => `${API_BASE_URL}/usuario/${id}`,
  
  // Chefes
  CHEFES_ALL: `${API_BASE_URL}/chefe/findAll`,
  CHEFES: `${API_BASE_URL}/chefe`,
  CHEFE_BY_ID: (id: string | number) => `${API_BASE_URL}/chefe/${id}`,
  
  // Favoritos
  FAVORITOS_ALL: `${API_BASE_URL}/favorito/findAll`,
  FAVORITOS: `${API_BASE_URL}/favorito`,
  FAVORITO_BY_ID: (id: string | number) => `${API_BASE_URL}/favorito/${id}`,
  
  // Avaliações
  AVALIACOES_ALL: `${API_BASE_URL}/avaliacao/findAll`,
  AVALIACOES: `${API_BASE_URL}/avaliacao`,
  AVALIACAO_BY_ID: (id: string | number) => `${API_BASE_URL}/avaliacao/${id}`,
  
  // Comentários
  COMENTARIOS_ALL: `${API_BASE_URL}/comentario/findAll`,
  COMENTARIOS: `${API_BASE_URL}/comentario`,
  COMENTARIO_BY_ID: (id: string | number) => `${API_BASE_URL}/comentario/${id}`,
  
  // Acesso (CRUD de acessos)
  ACESSOS_ALL: `${API_BASE_URL}/acesso/findAll`,
  ACESSOS: `${API_BASE_URL}/acesso`,
  ACESSO_BY_ID: (id: string | number) => `${API_BASE_URL}/acesso/${id}`,
  
  // Categorias
  CATEGORIAS_ALL: `${API_BASE_URL}/categoria/findAll`,
  CATEGORIAS: `${API_BASE_URL}/categoria`,
  CATEGORIA_BY_ID: (id: string | number) => `${API_BASE_URL}/categoria/${id}`,
}

// Utility function to make API calls with error handling
export async function apiCall<T>(
  url: string,
  options?: RequestInit
): Promise<{ data?: T; error?: string; status: number }> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.text()
      return { error, status: response.status }
    }

    if (response.status === 204) {
      return { data: undefined as unknown as T, status: response.status }
    }

    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const data = await response.json()
      return { data, status: response.status }
    }

    const text = await response.text()
    return { data: text as unknown as T, status: response.status }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 0,
    }
  }
}

// Receitas API
export const receitasAPI = {
  getAll: () => apiCall(API_ENDPOINTS.RECEITAS_ALL),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.RECEITA_BY_ID(id)),
  getByChef: (codChefe: string | number) => apiCall(API_ENDPOINTS.RECEITAS_BY_CHEFE(codChefe)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.RECEITAS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.RECEITA_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.RECEITA_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Usuários API
export const usuariosAPI = {
  getAll: () => apiCall(API_ENDPOINTS.USUARIOS_ALL),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.USUARIO_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.USUARIOS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.USUARIO_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.USUARIO_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Chefes API
export const chefesAPI = {
  getAll: () => apiCall(API_ENDPOINTS.CHEFES_ALL),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.CHEFE_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.CHEFES, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.CHEFE_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.CHEFE_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Favoritos API
export const favoritosAPI = {
  getAll: () => apiCall(API_ENDPOINTS.FAVORITOS_ALL),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.FAVORITO_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.FAVORITOS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.FAVORITO_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.FAVORITO_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Avaliações API
export const avaliacoesAPI = {
  getAll: () => apiCall(API_ENDPOINTS.AVALIACOES_ALL),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.AVALIACAO_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.AVALIACOES, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.AVALIACAO_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.AVALIACAO_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Comentários API
export const comentariosAPI = {
  getAll: () => apiCall(API_ENDPOINTS.COMENTARIOS_ALL),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.COMENTARIO_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.COMENTARIOS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.COMENTARIO_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.COMENTARIO_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Acessos API
export const acessosAPI = {
  getAll: () => apiCall(API_ENDPOINTS.ACESSOS_ALL),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.ACESSO_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.ACESSOS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.ACESSO_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.ACESSO_BY_ID(id), {
      method: 'DELETE',
    }),
}

// Categorias API
export const categoriasAPI = {
  getAll: () => apiCall(API_ENDPOINTS.CATEGORIAS_ALL),
  getById: (id: string | number) => apiCall(API_ENDPOINTS.CATEGORIA_BY_ID(id)),
  create: (data: any) =>
    apiCall(API_ENDPOINTS.CATEGORIAS, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string | number, data: any) =>
    apiCall(API_ENDPOINTS.CATEGORIA_BY_ID(id), {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: (id: string | number) =>
    apiCall(API_ENDPOINTS.CATEGORIA_BY_ID(id), {
      method: 'DELETE',
    }),
}
