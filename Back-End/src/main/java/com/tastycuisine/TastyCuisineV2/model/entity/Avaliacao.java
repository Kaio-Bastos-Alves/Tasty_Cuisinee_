package com.tastycuisine.TastyCuisineV2.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Avaliacoes")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cod_avaliacao")
    private long codAvaliacao;

    @ManyToOne
    @JoinColumn(name = "Cod_user", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "Cod_receitas")
    private Receita receita;

    @Column(name = "Nota", nullable = false)
    @Min(value = 1, message = "Nota mínima é 1")
    @Max(value = 5, message = "Nota máxima é 5")
    private int nota;

    @CreationTimestamp
    @Column(name = "Data_Avaliacao", updatable = false)
    private LocalDateTime dataAvaliacao;
}
