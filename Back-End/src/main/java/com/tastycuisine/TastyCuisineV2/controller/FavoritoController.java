package com.tastycuisine.TastyCuisineV2.controller;

import com.tastycuisine.TastyCuisineV2.model.entity.Favorito;
import com.tastycuisine.TastyCuisineV2.model.service.FavoritoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/favorito")
public class FavoritoController {

    @Autowired
    private FavoritoService favoritoService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Favorito>> findAll() {
        return ResponseEntity.ok(favoritoService.findAll());
    }

    @PostMapping
    public ResponseEntity<Favorito> save(@Valid @RequestBody Favorito favorito) {
        return ResponseEntity.status(HttpStatus.CREATED).body(favoritoService.save(favorito));
    }

    @GetMapping("/{codFavoritos}")
    public ResponseEntity<Object> findById(@PathVariable String codFavoritos) {
        try {
            return ResponseEntity.ok(favoritoService.findById(Long.parseLong(codFavoritos)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codFavoritos));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "favorito não encontrado com o id: " + codFavoritos));
        }
    }

    @GetMapping("/usuario/{codUser}")
    public ResponseEntity<Object> findByUsuario(@PathVariable String codUser) {
        try {
            return ResponseEntity.ok(favoritoService.findByUsuario(Long.parseLong(codUser)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codUser));
        }
    }

    @GetMapping("/verificar/{codUser}/{codReceitas}")
    public ResponseEntity<Object> verificar(@PathVariable String codUser, @PathVariable String codReceitas) {
        try {
            boolean isFavorito = favoritoService.verificar(Long.parseLong(codUser), Long.parseLong(codReceitas));
            return ResponseEntity.ok(Map.of("isFavorito", isFavorito));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "id informado não é válido"));
        }
    }

    @DeleteMapping("/{codFavoritos}")
    public ResponseEntity<Object> delete(@PathVariable String codFavoritos) {
        try {
            favoritoService.delete(Long.parseLong(codFavoritos));
            return ResponseEntity.ok().body("Favorito com o id " + codFavoritos + " foi removido com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codFavoritos));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "favorito não encontrado com o id: " + codFavoritos));
        }
    }
}
