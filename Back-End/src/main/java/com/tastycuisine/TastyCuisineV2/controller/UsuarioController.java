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

    @GetMapping("/findAll")
    public ResponseEntity<List<Usuario>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @PostMapping
    public ResponseEntity<Usuario> save(@Valid @RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioService.save(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }

    @GetMapping("/{codUser}")
    public ResponseEntity<Object> findById(@PathVariable Long codUser) {
        try {
            return ResponseEntity.ok(usuarioService.findById(codUser));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + codUser)
            );
        }
    }

    @PutMapping("/{codUser}")
    public ResponseEntity<Object> update(@RequestBody Usuario usuario, @PathVariable Long codUser) {
        try {
            return ResponseEntity.ok(usuarioService.update(codUser, usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + codUser)
            );
        }
    }

    @DeleteMapping("/{codUser}")
    public ResponseEntity<Object> deleteUsuario(@PathVariable Long codUser) {
        try {
            usuarioService.delete(codUser);
            return ResponseEntity.ok().body("Usuario com o id " + codUser + " foi desativado com sucesso");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + codUser)
            );
        }
    }

    @PatchMapping("/{codUser}/status")
    public ResponseEntity<Object> alterarStatus(@PathVariable Long codUser, @RequestParam boolean status) {
        try {
            return ResponseEntity.ok(usuarioService.alterarStatus(codUser, status));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(
                    Map.of("status", 404,
                            "error", "not found",
                            "message", "usuario não encontrado com o id: " + codUser)
            );
        }
    }

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
