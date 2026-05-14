package com.tastycuisine.TastyCuisineV2.model.repository;

import com.tastycuisine.TastyCuisineV2.model.entity.Premiacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PremiacaoRepository extends JpaRepository<Premiacao, Long> {
}
