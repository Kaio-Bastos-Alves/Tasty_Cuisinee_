package com.tastycuisine.TastyCuisineV2.model.service;

import com.tastycuisine.TastyCuisineV2.model.entity.Adm;
import com.tastycuisine.TastyCuisineV2.model.repository.AdmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdmService {

    @Autowired
    private AdmRepository admRepository;

    public List<Adm> findAll() { return admRepository.findAll(); }

    public Adm save(Adm adm) { return admRepository.save(adm); }

    public Adm findById(long codModerador) {
        return admRepository.findById(codModerador)
                .orElseThrow(() -> new RuntimeException("Administrador não encontrado com o código " + codModerador));
    }

    public Adm update(long codModerador, Adm adm) {
        Adm existente = findById(codModerador);
        existente.setNomeDoAdm(adm.getNomeDoAdm());
        existente.setGmail(adm.getGmail());
        existente.setSenha(adm.getSenha());
        existente.setUsuario(adm.getUsuario());
        existente.setChefe(adm.getChefe());
        existente.setReceita(adm.getReceita());
        return admRepository.save(existente);
    }

    public void delete(long codModerador) {
        admRepository.delete(findById(codModerador));
    }

    public Adm login(String gmail, String senha) {
        return admRepository.findByGmailAndSenha(gmail, senha)
                .orElseThrow(() -> new RuntimeException("Email ou senha incorretos"));
    }
}
