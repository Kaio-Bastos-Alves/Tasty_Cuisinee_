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
@Table(name = "Adm")
public class Adm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cod_moderador")
    private long codModerador;

    @Column(name = "Nome_do_adm", length = 250, nullable = false)
    @NotBlank
    private String nomeDoAdm;

    @Column(name = "Gmail", length = 250, nullable = false)
    @NotBlank
    private String gmail;

    @Column(name = "Senha", length = 250, nullable = false)
    @NotBlank
    private String senha;

    @ManyToOne
    @JoinColumn(name = "Cod_user")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "Cod_chefe")
    private Chefe chefe;

    @ManyToOne
    @JoinColumn(name = "Cod_receitas")
    private Receita receita;
}
