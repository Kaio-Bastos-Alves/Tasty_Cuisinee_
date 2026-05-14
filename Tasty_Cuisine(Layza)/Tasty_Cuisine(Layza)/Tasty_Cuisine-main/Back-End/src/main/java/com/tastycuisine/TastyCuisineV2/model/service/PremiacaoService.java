package com.tastycuisine.TastyCuisineV2.model.service;

import com.tastycuisine.TastyCuisineV2.model.entity.Premiacao;
import com.tastycuisine.TastyCuisineV2.model.repository.PremiacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PremiacaoService {

    @Autowired
    private PremiacaoRepository premiacaoRepository;

    public List<Premiacao> findAll() { return premiacaoRepository.findAll(); }

    public Premiacao save(Premiacao premiacao) { return premiacaoRepository.save(premiacao); }

    public Premiacao findById(long codPremiacao) {
        return premiacaoRepository.findById(codPremiacao)
                .orElseThrow(() -> new RuntimeException("Premiação não encontrada com o código " + codPremiacao));
    }

    public Premiacao update(long codPremiacao, Premiacao premiacao) {
        Premiacao existente = findById(codPremiacao);
        existente.setChefe(premiacao.getChefe());
        existente.setNomePremiacao(premiacao.getNomePremiacao());
        existente.setAno(premiacao.getAno());
        existente.setDescricao(premiacao.getDescricao());
        existente.setFotoCertificado(premiacao.getFotoCertificado());
        return premiacaoRepository.save(existente);
    }

    public void delete(long codPremiacao) {
        premiacaoRepository.delete(findById(codPremiacao));
    }
}
