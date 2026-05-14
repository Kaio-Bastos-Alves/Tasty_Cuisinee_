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
@Table(name = "Premiacoes")
public class Premiacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cod_premiacao")
    private long codPremiacao;

    @ManyToOne
    @JoinColumn(name = "Cod_chefe", nullable = false)
    private Chefe chefe;

    @Column(name = "Nome_premiacao", length = 100, nullable = false)
    @NotBlank
    private String nomePremiacao;

    @Column(name = "Ano")
    private Integer ano;

    @Column(name = "Descricao", length = 255)
    private String descricao;

    @Column(name = "Foto_certificado")
    private byte[] fotoCertificado;
}
