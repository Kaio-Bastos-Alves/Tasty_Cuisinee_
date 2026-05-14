package com.tastycuisine.TastyCuisineV2.model.service;

import com.tastycuisine.TastyCuisineV2.model.entity.Categoria;
import com.tastycuisine.TastyCuisineV2.model.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> findAll() { return categoriaRepository.findAll(); }

    public Categoria save(Categoria categoria) { return categoriaRepository.save(categoria); }

    public Categoria findById(long codCategoria) {
        return categoriaRepository.findById(codCategoria)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com o código " + codCategoria));
    }

    public Categoria update(long codCategoria, Categoria categoria) {
        Categoria existente = findById(codCategoria);
        existente.setNomeCategoria(categoria.getNomeCategoria());
        existente.setTipoCategoria(categoria.getTipoCategoria());
        existente.setIcone(categoria.getIcone());
        return categoriaRepository.save(existente);
    }

    public void delete(long codCategoria) {
        categoriaRepository.delete(findById(codCategoria));
    }
}
