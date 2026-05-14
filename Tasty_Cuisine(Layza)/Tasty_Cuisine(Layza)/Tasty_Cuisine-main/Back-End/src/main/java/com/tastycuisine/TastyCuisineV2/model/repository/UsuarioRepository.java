package com.tastycuisine.TastyCuisineV2.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tastycuisine.TastyCuisineV2.model.entity.Usuario;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByGmailAndSenha(String gmail, String senha);
}
