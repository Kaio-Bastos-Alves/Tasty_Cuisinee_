package com.tastycuisine.TastyCuisineV2.controller;

import com.tastycuisine.TastyCuisineV2.model.entity.Avaliacao;
import com.tastycuisine.TastyCuisineV2.model.service.AvaliacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/avaliacao")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Avaliacao>> findAll() {
        return ResponseEntity.ok(avaliacaoService.findAll());
    }

    @PostMapping
    public ResponseEntity<Avaliacao> save(@Valid @RequestBody Avaliacao avaliacao) {
        return ResponseEntity.status(HttpStatus.CREATED).body(avaliacaoService.save(avaliacao));
    }

    @GetMapping("/{codAvaliacao}")
    public ResponseEntity<Object> findById(@PathVariable String codAvaliacao) {
        try {
            return ResponseEntity.ok(avaliacaoService.findById(Long.parseLong(codAvaliacao)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codAvaliacao));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "avaliação não encontrada com o id: " + codAvaliacao));
        }
    }

    @PutMapping("/{codAvaliacao}")
    public ResponseEntity<Object> update(@Valid @RequestBody Avaliacao avaliacao, @PathVariable String codAvaliacao) {
        try {
            return ResponseEntity.ok(avaliacaoService.update(Long.parseLong(codAvaliacao), avaliacao));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codAvaliacao));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "avaliação não encontrada com o id: " + codAvaliacao));
        }
    }

    @DeleteMapping("/{codAvaliacao}")
    public ResponseEntity<Object> delete(@PathVariable String codAvaliacao) {
        try {
            avaliacaoService.delete(Long.parseLong(codAvaliacao));
            return ResponseEntity.ok().body("Avaliação com o id " + codAvaliacao + " foi removida com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codAvaliacao));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "avaliação não encontrada com o id: " + codAvaliacao));
        }
    }
}
