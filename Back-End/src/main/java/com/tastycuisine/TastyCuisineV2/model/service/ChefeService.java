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
        if (chefe.getNomeUsuario() != null && !chefe.getNomeUsuario().isBlank()) {
            existente.setNomeUsuario(chefe.getNomeUsuario());
        }
        if (chefe.getNomeCompleto() != null && !chefe.getNomeCompleto().isBlank()) {
            existente.setNomeCompleto(chefe.getNomeCompleto());
        }
        if (chefe.getIdade() > 0) {
            existente.setIdade(chefe.getIdade());
        }
        if (chefe.getSenha() != null && !chefe.getSenha().isBlank()) {
            existente.setSenha(chefe.getSenha());
        }
        if (chefe.getGmail() != null && !chefe.getGmail().isBlank()) {
            existente.setGmail(chefe.getGmail());
        }
        if (chefe.getFotoPerfil() != null) {
            existente.setFotoPerfil(chefe.getFotoPerfil());
        }
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
