package com.tastycuisine.TastyCuisineV2.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cod_Categoria")
    private long codCategoria;

    @Column(name = "Nome_Categoria", length = 100, nullable = false)
    @NotBlank
    private String nomeCategoria;

    @Column(name = "Tipo_Categoria", length = 50, nullable = false)
    @NotBlank
    private String tipoCategoria;

    @Column(name = "icone")
    private byte[] icone;
}
