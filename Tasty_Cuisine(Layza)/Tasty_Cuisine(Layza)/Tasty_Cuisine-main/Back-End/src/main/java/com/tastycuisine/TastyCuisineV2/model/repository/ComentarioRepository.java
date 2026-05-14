package com.tastycuisine.TastyCuisineV2.model.repository;

import com.tastycuisine.TastyCuisineV2.model.entity.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
}
