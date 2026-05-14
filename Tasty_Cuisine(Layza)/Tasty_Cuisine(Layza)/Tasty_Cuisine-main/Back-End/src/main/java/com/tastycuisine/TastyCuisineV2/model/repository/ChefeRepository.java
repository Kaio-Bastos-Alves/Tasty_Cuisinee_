package com.tastycuisine.TastyCuisineV2.model.repository;

import com.tastycuisine.TastyCuisineV2.model.entity.Chefe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChefeRepository extends JpaRepository<Chefe, Long> {
    Optional<Chefe> findByGmailAndSenha(String gmail, String senha);
    List<Chefe> findByNomeUsuarioContainingIgnoreCase(String termo);
}
