package com.tastycuisine.TastyCuisineV2.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Acessos")
public class Acesso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id_Acesso")
    private long idAcesso;

    @ManyToOne
    @JoinColumn(name = "Cod_user", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "Cod_receitas")
    private Receita receita;

    @ManyToOne
    @JoinColumn(name = "Cod_chefe")
    private Chefe chefe;

    @CreationTimestamp
    @Column(name = "Data_Acesso", updatable = false)
    private LocalDateTime dataAcesso;
}
