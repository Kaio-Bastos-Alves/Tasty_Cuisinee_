package com.tastycuisine.TastyCuisineV2.controller;

import com.tastycuisine.TastyCuisineV2.model.entity.Receita;
import com.tastycuisine.TastyCuisineV2.model.service.ReceitaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/receita")
public class ReceitaController {

    @Autowired
    private ReceitaService receitaService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Receita>> findAll() {
        return ResponseEntity.ok(receitaService.findAll());
    }

    @PostMapping
    public ResponseEntity<Receita> save(@Valid @RequestBody Receita receita) {
        return ResponseEntity.status(HttpStatus.CREATED).body(receitaService.save(receita));
    }

    @GetMapping("/{codReceita}")
    public ResponseEntity<Object> findById(@PathVariable String codReceita) {
        try {
            return ResponseEntity.ok(receitaService.findById(Long.parseLong(codReceita)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codReceita));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "receita não encontrada com o id: " + codReceita));
        }
    }

    @PutMapping("/{codReceita}")
    public ResponseEntity<Object> update(@Valid @RequestBody Receita receita, @PathVariable String codReceita) {
        try {
            return ResponseEntity.ok(receitaService.update(Long.parseLong(codReceita), receita));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codReceita));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "receita não encontrada com o id: " + codReceita));
        }
    }

    @GetMapping("/chefe/{codChefe}")
    public ResponseEntity<Object> findByChefe(@PathVariable String codChefe) {
        try {
            return ResponseEntity.ok(receitaService.findByChefe(Long.parseLong(codChefe)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codChefe));
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Receita>> buscar(@RequestParam String termo) {
        return ResponseEntity.ok(receitaService.buscar(termo));
    }

    @GetMapping("/populares")
    public ResponseEntity<List<Receita>> populares() {
        return ResponseEntity.ok(receitaService.populares());
    }

    @GetMapping("/categoria/{codCategoria}")
    public ResponseEntity<Object> findByCategoria(@PathVariable String codCategoria) {
        try {
            return ResponseEntity.ok(receitaService.findByCategoria(Long.parseLong(codCategoria)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codCategoria));
        }
    }

    @DeleteMapping("/{codReceita}")
    public ResponseEntity<Object> delete(@PathVariable String codReceita) {
        try {
            receitaService.delete(Long.parseLong(codReceita));
            return ResponseEntity.ok().body("Receita com o id " + codReceita + " foi removida com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codReceita));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "receita não encontrada com o id: " + codReceita));
        }
    }
}
