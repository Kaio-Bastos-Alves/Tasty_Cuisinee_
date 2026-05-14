/**
 * Serviço de Categorias
 * Gerencia todas as requisições relacionadas a categorias
 */

import { apiGet, apiPost, apiPut, apiDelete } from '../config/api';

const ENDPOINT = '/categoria';

/**
 * Obter todas as categorias
 */
export const getAllCategorias = async () => {
  try {
    const data = await apiGet(`${ENDPOINT}/findAll`);
    return data;
  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    throw error;
  }
};

/**
 * Obter categoria por ID
 */
export const getCategoriaById = async (id) => {
  try {
    const data = await apiGet(`${ENDPOINT}/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter categoria ${id}:`, error);
    throw error;
  }
};

/**
 * Criar nova categoria
 */
export const createCategoria = async (categoriaData) => {
  try {
    const data = await apiPost(`${ENDPOINT}`, categoriaData);
    return data;
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};

/**
 * Atualizar categoria
 */
export const updateCategoria = async (id, categoriaData) => {
  try {
    const data = await apiPut(`${ENDPOINT}/${id}`, categoriaData);
    return data;
  } catch (error) {
    console.error(`Erro ao atualizar categoria ${id}:`, error);
    throw error;
  }
};

/**
 * Deletar categoria
 */
export const deleteCategoria = async (id) => {
  try {
    const data = await apiDelete(`${ENDPOINT}/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao deletar categoria ${id}:`, error);
    throw error;
  }
};
