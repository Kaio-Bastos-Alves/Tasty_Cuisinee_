package com.tastycuisine.TastyCuisineV2.model.service;

import com.tastycuisine.TastyCuisineV2.model.entity.Chefe;
import com.tastycuisine.TastyCuisineV2.model.repository.ChefeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChefeService {

    @Autowired
    private ChefeRepository chefeRepository;

    public List<Chefe> findAll() { return chefeRepository.findAll(); }

    public Chefe save(Chefe chefe) { return chefeRepository.save(chefe); }

    public Chefe findById(long codChefe) {
        return chefeRepository.findById(codChefe)
                .orElseThrow(() -> new RuntimeException("Chefe não encontrado com o código " + codChefe));
    }

    public Chefe update(long codChefe, Chefe chefe) {
        Chefe existente = findById(codChefe);
        existente.setNomeUsuario(chefe.getNomeUsuario());
        existente.setNomeCompleto(chefe.getNomeCompleto());
        existente.setIdade(chefe.getIdade());
        existente.setSenha(chefe.getSenha());
        existente.setGmail(chefe.getGmail());
        existente.setFotoPerfil(chefe.getFotoPerfil());
        return chefeRepository.save(existente);
    }

    public void delete(long codChefe) {
        chefeRepository.delete(findById(codChefe));
    }

    public Chefe login(String gmail, String senha) {
        return chefeRepository.findByGmailAndSenha(gmail, senha)
                .orElseThrow(() -> new RuntimeException("Email ou senha incorretos"));
    }

    public List<Chefe> buscar(String termo) {
        return chefeRepository.findByNomeUsuarioContainingIgnoreCase(termo);
    }

    public List<Chefe> populares() {
        return chefeRepository.findAll().stream()
                .limit(10)
                .collect(java.util.stream.Collectors.toList());
    }
}
