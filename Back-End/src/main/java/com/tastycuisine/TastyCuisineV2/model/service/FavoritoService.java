package com.tastycuisine.TastyCuisineV2.model.service;

import com.tastycuisine.TastyCuisineV2.model.entity.Favorito;
import com.tastycuisine.TastyCuisineV2.model.repository.FavoritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritoService {

    @Autowired
    private FavoritoRepository favoritoRepository;

    public List<Favorito> findAll() { return favoritoRepository.findAll(); }

    public Favorito save(Favorito favorito) { return favoritoRepository.save(favorito); }

    public Favorito findById(long codFavoritos) {
        return favoritoRepository.findById(codFavoritos)
                .orElseThrow(() -> new RuntimeException("Favorito não encontrado com o código " + codFavoritos));
    }

    public List<Favorito> findByUsuario(long codUser) {
        return favoritoRepository.findByUsuarioCodUser(codUser);
    }

    public boolean verificar(long codUser, long codReceitas) {
        return favoritoRepository.findByUsuarioCodUserAndReceitaCodReceitas(codUser, codReceitas).isPresent();
    }

    public void delete(long codFavoritos) {
        favoritoRepository.delete(findById(codFavoritos));
    }
}
