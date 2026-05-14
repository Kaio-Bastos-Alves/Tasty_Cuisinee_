package com.tastycuisine.TastyCuisineV2.controller;

import com.tastycuisine.TastyCuisineV2.model.entity.Usuario;
import com.tastycuisine.TastyCuisineV2.model.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    //listando usuarios
    @GetMapping("/findAll")
    public ResponseEntity<List<Usuario>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());

    }

    //salvando ou cadastrando um usuario
    @PostMapping
    public ResponseEntity<Usuario> save(@Valid @RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);

    }

    //procurando usuario por ID
    @GetMapping("/{codUser}")
    public ResponseEntity<Object> findById(@PathVariable String codUser) {
        try {
            return ResponseEntity.ok(usuarioService.findById(Long.parseLong(codUser)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of(
                            "status", 400,
                            "error", "bad request",
                            "message", "o id informado não é válido: " + codUser
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + codUser
                    )
            );
        }
    }

    //atualizar um usuario
    @PutMapping("/{codUser}")
    public ResponseEntity<Object> update(@Valid @RequestBody Usuario usuario, @PathVariable String codUser) {
        try{
            return ResponseEntity.ok(usuarioService.update(Long.parseLong(codUser), usuario));
        }catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of(
                            "status", 400,
                            "error", "bad request",
                            "message", "o id informado não é válido: " + codUser
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + codUser
                    )
            );
        }
    }

    //excluir um usuario
    @DeleteMapping("/{codUser}")
    public ResponseEntity<Object> deleteUsuario(@PathVariable String codUser) {
        try {
            usuarioService.delete(Long.parseLong(codUser));
            return ResponseEntity.ok().body("Usuario com o id " + codUser + " foi desativado com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of(
                            "status", 400,
                            "error", "bad request",
                            "message", "o id informado não é válido: " + codUser
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + codUser
                    )
            );
        }
    }

    //banir ou reativar usuario
    @PatchMapping("/{codUser}/status")
    public ResponseEntity<Object> alterarStatus(@PathVariable String codUser, @RequestParam boolean status) {
        try {
            return ResponseEntity.ok(usuarioService.alterarStatus(Long.parseLong(codUser), status));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of(
                            "status", 400,
                            "error", "bad request",
                            "message", "o id informado não é válido: " + codUser
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + codUser
                    )
            );
        }
    }

    //login de usuario
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> body) {
        try {
            String gmail = body.get("email");
            String senha = body.get("senha");
            return ResponseEntity.ok(usuarioService.login(gmail, senha));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of(
                    "status", 401,
                    "error", "unauthorized",
                    "message", "Email ou senha incorretos"
            ));
        }
    }

}
