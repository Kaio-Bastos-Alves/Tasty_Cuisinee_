/**
 * Serviço de Chefes
 * Gerencia todas as requisições relacionadas a chefes
 */

import { apiGet, apiPost, apiPut, apiDelete } from '../config/api';

const ENDPOINT = '/chefe';

/**
 * Obter todos os chefes
 */
export const getAllChefes = async () => {
  try {
    const data = await apiGet(`${ENDPOINT}/findAll`);
    return data;
  } catch (error) {
    console.error('Erro ao obter chefes:', error);
    throw error;
  }
};

/**
 * Obter chefe por ID
 */
export const getChefeById = async (id) => {
  try {
    const data = await apiGet(`${ENDPOINT}/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter chefe ${id}:`, error);
    throw error;
  }
};

/**
 * Buscar chefes por nome
 */
export const searchChefes = async (termo) => {
  try {
    const data = await apiGet(`${ENDPOINT}/buscar?termo=${encodeURIComponent(termo)}`);
    return data;
  } catch (error) {
    console.error(`Erro ao buscar chefes com termo "${termo}":`, error);
    throw error;
  }
};

/**
 * Criar novo chefe
 */
export const createChefe = async (chefeData) => {
  try {
    const data = await apiPost(`${ENDPOINT}`, chefeData);
    return data;
  } catch (error) {
    console.error('Erro ao criar chefe:', error);
    throw error;
  }
};

/**
 * Atualizar chefe
 */
export const updateChefe = async (id, chefeData) => {
  try {
    const data = await apiPut(`${ENDPOINT}/${id}`, chefeData);
    return data;
  } catch (error) {
    console.error(`Erro ao atualizar chefe ${id}:`, error);
    throw error;
  }
};

/**
 * Deletar chefe
 */
export const deleteChefe = async (id) => {
  try {
    const data = await apiDelete(`${ENDPOINT}/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao deletar chefe ${id}:`, error);
    throw error;
  }
};

/**
 * Obter chefes populares
 */
export const getChefePopulares = async () => {
  try {
    const data = await apiGet(`${ENDPOINT}/populares`);
    return data;
  } catch (error) {
    console.error('Erro ao obter chefes populares:', error);
    throw error;
  }
};
