package com.tastycuisine.TastyCuisineV2.controller;

import com.tastycuisine.TastyCuisineV2.model.entity.Acesso;
import com.tastycuisine.TastyCuisineV2.model.service.AcessoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/acesso")
public class AcessoController {

    @Autowired
    private AcessoService acessoService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Acesso>> findAll() {
        return ResponseEntity.ok(acessoService.findAll());
    }

    @PostMapping
    public ResponseEntity<Acesso> save(@Valid @RequestBody Acesso acesso) {
        return ResponseEntity.status(HttpStatus.CREATED).body(acessoService.save(acesso));
    }

    @GetMapping("/{idAcesso}")
    public ResponseEntity<Object> findById(@PathVariable String idAcesso) {
        try {
            return ResponseEntity.ok(acessoService.findById(Long.parseLong(idAcesso)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + idAcesso));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "acesso não encontrado com o id: " + idAcesso));
        }
    }

    @DeleteMapping("/{idAcesso}")
    public ResponseEntity<Object> delete(@PathVariable String idAcesso) {
        try {
            acessoService.delete(Long.parseLong(idAcesso));
            return ResponseEntity.ok().body("Acesso com o id " + idAcesso + " foi removido com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + idAcesso));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "acesso não encontrado com o id: " + idAcesso));
        }
    }
}
