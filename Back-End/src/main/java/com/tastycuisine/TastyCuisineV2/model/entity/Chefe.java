package com.tastycuisine.TastyCuisineV2.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Chefe")
public class Chefe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Cod_chefe")
    private long codChefe;

    @Column(name = "Nome_usuario", length = 60, nullable = false)
    @NotBlank
    private String nomeUsuario;

    @Column(name = "Nome_completo", length = 300, nullable = false)
    @NotBlank
    private String nomeCompleto;

    @Column(nullable = false)
    @Min(value = 14, message = "A idade mínima permitida é 14 anos")
    @Max(value = 100, message = "A idade máxima permitida é 100 anos")
    private int idade;

    @Column(name = "Senha", length = 250, nullable = false)
    @NotBlank
    private String senha;

    @Column(name = "Gmail", length = 255, nullable = false, unique = true)
    @NotBlank
    private String gmail;

    @Column(name = "foto_perfil")
    private byte[] fotoPerfil;

    @ManyToMany
    @JoinTable(
        name = "Chefe_Categorias",
        joinColumns = @JoinColumn(name = "Cod_chefe"),
        inverseJoinColumns = @JoinColumn(name = "Cod_Categoria")
    )
    private List<Categoria> categorias;
}
