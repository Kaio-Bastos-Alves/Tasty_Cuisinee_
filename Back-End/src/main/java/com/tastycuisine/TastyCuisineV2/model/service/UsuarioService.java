package com.tastycuisine.TastyCuisineV2.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tastycuisine.TastyCuisineV2.model.entity.Usuario;
import com.tastycuisine.TastyCuisineV2.model.repository.UsuarioRepository;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Listar todos os usuários
    public List<Usuario> findAll() { return usuarioRepository.findAll(); }

    // Salvar usuario
    public Usuario save(Usuario usuario) {
        usuario.setStatusUser(true);
        return usuarioRepository.save(usuario);
    }

    // Listar usuario por Id
    public Usuario findById(long codUser) {
        return usuarioRepository.findById(codUser)
                .orElseThrow(()-> new RuntimeException("Usuario não encontrado com o código " + codUser));
    }

    //atualizar usuario
    public Usuario update(long codUser, Usuario usuario) {
        Usuario usuarioExistente = findById(codUser);
        if (usuario.getNomeCompleto() != null && !usuario.getNomeCompleto().isBlank()) {
            usuarioExistente.setNomeCompleto(usuario.getNomeCompleto());
        }
        if (usuario.getNomeDeUsuario() != null && !usuario.getNomeDeUsuario().isBlank()) {
            usuarioExistente.setNomeDeUsuario(usuario.getNomeDeUsuario());
        }
        if (usuario.getGmail() != null && !usuario.getGmail().isBlank()) {
            usuarioExistente.setGmail(usuario.getGmail());
        }
        if (usuario.getIdade() > 0) {
            usuarioExistente.setIdade(usuario.getIdade());
        }
        if (usuario.getSenha() != null && !usuario.getSenha().isBlank()) {
            usuarioExistente.setSenha(usuario.getSenha());
        }
        if (usuario.getRestricoesAlimentares() != null) {
            usuarioExistente.setRestricoesAlimentares(usuario.getRestricoesAlimentares());
        }
        return usuarioRepository.save(usuarioExistente);
    }
    

    //desativar usuario (delete lógico)
    public void delete(Long codUser) {
        Usuario usuarioExistente = findById(codUser);
        usuarioExistente.setStatusUser(false);
        usuarioRepository.save(usuarioExistente);
    }

    //alterar status do usuario (banir/reativar)
    public Usuario alterarStatus(Long codUser, boolean status) {
        Usuario usuarioExistente = findById(codUser);
        usuarioExistente.setStatusUser(status);
        return usuarioRepository.save(usuarioExistente);
    }

    //login de usuario
    public Usuario login(String gmail, String senha) {
        Usuario usuario = usuarioRepository.findByGmailAndSenha(gmail, senha)
                .orElseThrow(() -> new RuntimeException("Email ou senha incorretos"));
        if (Boolean.FALSE.equals(usuario.getStatusUser())) {
            throw new RuntimeException("Usuário banido ou inativo");
        }
        return usuario;
    }




}
