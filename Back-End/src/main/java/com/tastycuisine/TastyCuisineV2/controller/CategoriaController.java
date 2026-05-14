package com.tastycuisine.TastyCuisineV2.controller;

import com.tastycuisine.TastyCuisineV2.model.entity.Categoria;
import com.tastycuisine.TastyCuisineV2.model.service.CategoriaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Categoria>> findAll() {
        return ResponseEntity.ok(categoriaService.findAll());
    }

    @PostMapping
    public ResponseEntity<Categoria> save(@Valid @RequestBody Categoria categoria) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.save(categoria));
    }

    @GetMapping("/{codCategoria}")
    public ResponseEntity<Object> findById(@PathVariable String codCategoria) {
        try {
            return ResponseEntity.ok(categoriaService.findById(Long.parseLong(codCategoria)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codCategoria));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "categoria não encontrada com o id: " + codCategoria));
        }
    }

    @PutMapping("/{codCategoria}")
    public ResponseEntity<Object> update(@Valid @RequestBody Categoria categoria, @PathVariable String codCategoria) {
        try {
            return ResponseEntity.ok(categoriaService.update(Long.parseLong(codCategoria), categoria));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codCategoria));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "categoria não encontrada com o id: " + codCategoria));
        }
    }

    @DeleteMapping("/{codCategoria}")
    public ResponseEntity<Object> delete(@PathVariable String codCategoria) {
        try {
            categoriaService.delete(Long.parseLong(codCategoria));
            return ResponseEntity.ok().body("Categoria com o id " + codCategoria + " foi removida com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codCategoria));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "categoria não encontrada com o id: " + codCategoria));
        }
    }
}
