/**
 * Configuração da API
 * Define a URL base do backend e configurações globais
 */

// URL base do backend - Ajuste conforme necessário
// Para desenvolvimento local: http://localhost:8080
// Para produção: https://seu-dominio.com
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API_CONFIG = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Função auxiliar para fazer requisições GET
 */
export const apiGet = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: API_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao fazer GET para ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Função auxiliar para fazer requisições POST
 */
export const apiPost = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao fazer POST para ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Função auxiliar para fazer requisições PUT
 */
export const apiPut = async (endpoint, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: API_CONFIG.headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao fazer PUT para ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Função auxiliar para fazer requisições DELETE
 */
export const apiDelete = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: API_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao fazer DELETE para ${endpoint}:`, error);
    throw error;
  }
};
