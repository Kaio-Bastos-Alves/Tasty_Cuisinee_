package com.tastycuisine.TastyCuisineV2.controller;

import com.tastycuisine.TastyCuisineV2.model.entity.Premiacao;
import com.tastycuisine.TastyCuisineV2.model.service.PremiacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/premiacao")
public class PremiacaoController {

    @Autowired
    private PremiacaoService premiacaoService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Premiacao>> findAll() {
        return ResponseEntity.ok(premiacaoService.findAll());
    }

    @PostMapping
    public ResponseEntity<Premiacao> save(@Valid @RequestBody Premiacao premiacao) {
        return ResponseEntity.status(HttpStatus.CREATED).body(premiacaoService.save(premiacao));
    }

    @GetMapping("/{codPremiacao}")
    public ResponseEntity<Object> findById(@PathVariable String codPremiacao) {
        try {
            return ResponseEntity.ok(premiacaoService.findById(Long.parseLong(codPremiacao)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codPremiacao));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "premiação não encontrada com o id: " + codPremiacao));
        }
    }

    @PutMapping("/{codPremiacao}")
    public ResponseEntity<Object> update(@Valid @RequestBody Premiacao premiacao, @PathVariable String codPremiacao) {
        try {
            return ResponseEntity.ok(premiacaoService.update(Long.parseLong(codPremiacao), premiacao));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codPremiacao));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "premiação não encontrada com o id: " + codPremiacao));
        }
    }

    @DeleteMapping("/{codPremiacao}")
    public ResponseEntity<Object> delete(@PathVariable String codPremiacao) {
        try {
            premiacaoService.delete(Long.parseLong(codPremiacao));
            return ResponseEntity.ok().body("Premiação com o id " + codPremiacao + " foi removida com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codPremiacao));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "premiação não encontrada com o id: " + codPremiacao));
        }
    }
}
