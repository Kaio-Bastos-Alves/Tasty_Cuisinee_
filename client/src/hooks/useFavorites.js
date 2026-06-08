import React, { useState, useEffect } from 'react';
import { apiCall, API_ENDPOINTS, favoritosAPI } from '../lib/api.ts';

export function normalizeFavoritesResponse(data) {
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.content)
      ? data.content
      : Array.isArray(data?.data)
        ? data.data
        : [];

  const favorites = [];
  const favoritosMap = {};

  list.forEach((item) => {
    const recipeId = item?.receita?.codReceitas?.toString();
    if (!recipeId) return;
    favorites.push(recipeId);
    favoritosMap[recipeId] = item?.codFavoritos;
  });

  return { favorites, favoritosMap, list };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [favoritosMap, setFavoritosMap] = useState({});
  const userId = localStorage.getItem('userId');
  const userType = localStorage.getItem('userType');

  const fetchFavorites = async () => {
    if (userId && userType === 'usuario') {
      try {
        const response = await apiCall(`${API_ENDPOINTS.FAVORITOS}/usuario/${userId}`);
        if (response) {
          const normalized = normalizeFavoritesResponse(response.data);
          setFavorites(normalized.favorites);
          setFavoritosMap(normalized.favoritosMap);
          return normalized;
        }
      } catch (err) {
        console.error("Erro ao carregar favoritos:", err);
        setFavorites([]);
        setFavoritosMap({});
      }
    }
    return { favorites: [], favoritosMap: {}, list: [] };
  };

  useEffect(() => {
    fetchFavorites();
  }, [userId, userType]);

  const toggleFavorite = async (id) => {
    if (!userId || userType !== 'usuario') {
      alert("Você precisa estar logado como usuário comum para favoritar.");
      return;
    }
    const isFavorite = favorites.includes(id);
    try {
      if (!isFavorite) {
        const payload = {
          usuario: { codUser: parseInt(userId) },
          receita: { codReceitas: parseInt(id) }
        };
        const res = await favoritosAPI.create(payload);
        if (res.data) {
          setFavorites(prev => [...prev, id]);
          setFavoritosMap(prev => ({ ...prev, [id]: res.data.codFavoritos }));
        }
      } else {
        const codFavoritos = favoritosMap[id];
        if (codFavoritos) {
          await favoritosAPI.delete(codFavoritos);
          setFavorites(prev => prev.filter(f => f !== id));
          setFavoritosMap(prev => { const updated = { ...prev }; delete updated[id]; return updated; });
        }
      }
      await fetchFavorites();
    } catch (err) { console.error(err); }
  };

  return { favorites, toggleFavorite, refreshFavorites: fetchFavorites };
}

// GARANTINDO A EXPORTAÇÃO DO useHistory
export function useHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('historico');
      setHistory(stored ? JSON.parse(stored) : []);
    } catch (e) {
      setHistory([]);
    }
  }, []);

  const addToHistory = (id) => {
    setHistory(prev => {
      const updated = [id, ...prev.filter(h => h !== id)].slice(0, 20);
      localStorage.setItem('historico', JSON.stringify(updated));
      return updated;
    });
  };

  return { history, addToHistory };
}
