package com.tastycuisine.TastyCuisineV2.model.service;

import com.tastycuisine.TastyCuisineV2.model.entity.Avaliacao;
import com.tastycuisine.TastyCuisineV2.model.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    public List<Avaliacao> findAll() { return avaliacaoRepository.findAll(); }

    public Avaliacao save(Avaliacao avaliacao) { return avaliacaoRepository.save(avaliacao); }

    public Avaliacao findById(long codAvaliacao) {
        return avaliacaoRepository.findById(codAvaliacao)
                .orElseThrow(() -> new RuntimeException("Avaliação não encontrada com o código " + codAvaliacao));
    }

    public Avaliacao update(long codAvaliacao, Avaliacao avaliacao) {
        Avaliacao existente = findById(codAvaliacao);
        existente.setUsuario(avaliacao.getUsuario());
        existente.setReceita(avaliacao.getReceita());
        existente.setNota(avaliacao.getNota());
        return avaliacaoRepository.save(existente);
    }

    public void delete(long codAvaliacao) {
        avaliacaoRepository.delete(findById(codAvaliacao));
    }
}
