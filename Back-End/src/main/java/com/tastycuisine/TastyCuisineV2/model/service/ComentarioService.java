package com.tastycuisine.TastyCuisineV2.model.service;

import com.tastycuisine.TastyCuisineV2.model.entity.Comentario;
import com.tastycuisine.TastyCuisineV2.model.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComentarioService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public List<Comentario> findAll() { return comentarioRepository.findAll(); }

    public Comentario save(Comentario comentario) { return comentarioRepository.save(comentario); }

    public Comentario findById(long codComentarios) {
        return comentarioRepository.findById(codComentarios)
                .orElseThrow(() -> new RuntimeException("Comentário não encontrado com o código " + codComentarios));
    }

    public Comentario update(long codComentarios, Comentario comentario) {
        Comentario existente = findById(codComentarios);
        existente.setUsuario(comentario.getUsuario());
        existente.setReceita(comentario.getReceita());
        existente.setTexto(comentario.getTexto());
        return comentarioRepository.save(existente);
    }

    public void delete(long codComentarios) {
        comentarioRepository.delete(findById(codComentarios));
    }
}
