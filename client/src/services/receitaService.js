/**
 * Serviço de Receitas
 * Gerencia todas as requisições relacionadas a receitas
 */

import { apiGet, apiPost, apiPut, apiDelete } from '../config/api';

const ENDPOINT = '/receita';

/**
 * Obter todas as receitas
 */
export const getAllReceitas = async () => {
  try {
    const data = await apiGet(`${ENDPOINT}/findAll`);
    return data;
  } catch (error) {
    console.error('Erro ao obter receitas:', error);
    throw error;
  }
};

/**
 * Obter receita por ID
 */
export const getReceitaById = async (id) => {
  try {
    const data = await apiGet(`${ENDPOINT}/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter receita ${id}:`, error);
    throw error;
  }
};

/**
 * Obter receitas por categoria
 */
export const getReceitasByCategoria = async (categoriaId) => {
  try {
    const data = await apiGet(`${ENDPOINT}/categoria/${categoriaId}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter receitas da categoria ${categoriaId}:`, error);
    throw error;
  }
};

/**
 * Obter receitas por chefe
 */
export const getReceitasByChefe = async (chefeId) => {
  try {
    const data = await apiGet(`${ENDPOINT}/chefe/${chefeId}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter receitas do chefe ${chefeId}:`, error);
    throw error;
  }
};

/**
 * Buscar receitas por nome
 */
export const searchReceitas = async (termo) => {
  try {
    const data = await apiGet(`${ENDPOINT}/buscar?termo=${encodeURIComponent(termo)}`);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar receitas com termo "${termo}":`, error);
    throw error;
  }
};

/**
 * Criar nova receita
 */
export const createReceita = async (receitaData) => {
  try {
    const data = await apiPost(`${ENDPOINT}`, receitaData);
    return data;
  } catch (error) {
    console.error('Erro ao criar receita:', error);
    throw error;
  }
};

/**
 * Atualizar receita
 */
export const updateReceita = async (id, receitaData) => {
  try {
    const data = await apiPut(`${ENDPOINT}/${id}`, receitaData);
    return data;
  } catch (error) {
    console.error(`Erro ao atualizar receita ${id}:`, error);
    throw error;
  }
};

/**
 * Deletar receita
 */
export const deleteReceita = async (id) => {
  try {
    const data = await apiDelete(`${ENDPOINT}/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao deletar receita ${id}:`, error);
    throw error;
  }
};

/**
 * Obter receitas populares
 */
export const getReceitasPopulares = async () => {
  try {
    const data = await apiGet(`${ENDPOINT}/populares`);
    return data;
  } catch (error) {
    console.error('Erro ao obter receitas populares:', error);
    throw error;
  }
};
