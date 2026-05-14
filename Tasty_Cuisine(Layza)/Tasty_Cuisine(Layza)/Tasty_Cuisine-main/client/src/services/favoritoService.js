/**
 * Serviço de Favoritos
 * Gerencia todas as requisições relacionadas a favoritos
 */

import { apiGet, apiPost, apiDelete } from '../config/api';

const ENDPOINT = '/favorito';

/**
 * Obter favoritos do usuário
 */
export const getFavoritosUsuario = async (usuarioId) => {
  try {
    const data = await apiGet(`${ENDPOINT}/usuario/${usuarioId}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter favoritos do usuário ${usuarioId}:`, error);
    throw error;
  }
};

/**
 * Adicionar receita aos favoritos
 */
export const addFavorito = async (favoritoData) => {
  try {
    const data = await apiPost(`${ENDPOINT}`, favoritoData);
    return data;
  } catch (error) {
    console.error(`Erro ao adicionar favorito:`, error);
    throw error;
  }
};

/**
 * Remover receita dos favoritos
 */
export const removeFavorito = async (codFavoritos) => {
  try {
    const data = await apiDelete(`${ENDPOINT}/${codFavoritos}`);
    return data;
  } catch (error) {
    console.error(`Erro ao remover favorito:`, error);
    throw error;
  }
};

/**
 * Verificar se receita é favorita
 */
export const isFavorito = async (usuarioId, receitaId) => {
  try {
    const data = await apiGet(`${ENDPOINT}/verificar/${usuarioId}/${receitaId}`);
    return data.isFavorito;
  } catch (error) {
    console.error(`Erro ao verificar favorito:`, error);
    return false;
  }
};
