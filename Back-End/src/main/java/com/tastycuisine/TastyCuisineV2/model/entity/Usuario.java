package com.tastycuisine.TastyCuisineV2.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table (name = "Usuario")
@Entity
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cod_user")
    private long codUser;

    @Column(name = "Status_User")
    private Boolean statusUser;

    @Column(name = "nome_completo", length = 300, nullable = false)
    @NotBlank
    private String nomeCompleto;

    @Column(name = "nome_de_usuario", length = 60, nullable = false)
    @NotBlank
    private String nomeDeUsuario;

    @Column(nullable = false)
    @Min(value = 14, message = "A idade mínima permitida é 14 anos")
    @Max(value = 100, message = "A idade máxima permitida é 100 anos")
    private int idade;

    @Column(length = 255, nullable = false, unique = true)
    @NotBlank
    private String gmail;

    @Column(length = 250, nullable = false)
    @NotBlank
    private String senha;

    @Column(name = "Restricoes_alimentares", nullable = true, columnDefinition = "NVARCHAR(MAX)")
    private String restricoesAlimentares;
}
