/**
 * Serviço de Usuários
 * Gerencia todas as requisições relacionadas a usuários e autenticação
 */

import { apiGet, apiPost, apiPut, apiDelete } from '../config/api';

const ENDPOINT = '/usuario';

/**
 * Registrar novo usuário
 */
export const registerUsuario = async (usuarioData) => {
  try {
    const data = await apiPost(`${ENDPOINT}`, usuarioData);
    return data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

/**
 * Login de usuário
 */
export const loginUsuario = async (email, senha) => {
  try {
    const data = await apiPost(`${ENDPOINT}/login`, { email, senha });
    // Salvar token se retornado
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    return data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

/**
 * Logout do usuário
 */
export const logoutUsuario = () => {
  localStorage.removeItem('authToken');
};

/**
 * Verificar se usuário está autenticado
 */
export const isAutenticado = () => {
  return !!localStorage.getItem('authToken');
};

/**
 * Obter token de autenticação
 */
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};
