package com.tastycuisine.TastyCuisineV2.model.repository;

import com.tastycuisine.TastyCuisineV2.model.entity.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    List<Receita> findByChefeCodChefe(long codChefe);
    List<Receita> findByNomeReceitaContainingIgnoreCase(String termo);
}
