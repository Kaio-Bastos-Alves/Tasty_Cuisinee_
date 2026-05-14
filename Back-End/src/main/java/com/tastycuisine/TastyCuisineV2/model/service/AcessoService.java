package com.tastycuisine.TastyCuisineV2.model.service;

import com.tastycuisine.TastyCuisineV2.model.entity.Acesso;
import com.tastycuisine.TastyCuisineV2.model.repository.AcessoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcessoService {

    @Autowired
    private AcessoRepository acessoRepository;

    public List<Acesso> findAll() { return acessoRepository.findAll(); }

    public Acesso save(Acesso acesso) { return acessoRepository.save(acesso); }

    public Acesso findById(long idAcesso) {
        return acessoRepository.findById(idAcesso)
                .orElseThrow(() -> new RuntimeException("Acesso não encontrado com o código " + idAcesso));
    }

    public void delete(long idAcesso) {
        acessoRepository.delete(findById(idAcesso));
    }
}
