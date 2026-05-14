package com.tastycuisine.TastyCuisineV2.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Favoritos")
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cod_favoritos")
    private long codFavoritos;

    @ManyToOne
    @JoinColumn(name = "Cod_user", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "Cod_receitas")
    private Receita receita;
}
