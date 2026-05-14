package com.tastycuisine.TastyCuisineV2.controller;

import com.tastycuisine.TastyCuisineV2.model.entity.Comentario;
import com.tastycuisine.TastyCuisineV2.model.service.ComentarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/comentario")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Comentario>> findAll() {
        return ResponseEntity.ok(comentarioService.findAll());
    }

    @PostMapping
    public ResponseEntity<Comentario> save(@Valid @RequestBody Comentario comentario) {
        return ResponseEntity.status(HttpStatus.CREATED).body(comentarioService.save(comentario));
    }

    @GetMapping("/{codComentarios}")
    public ResponseEntity<Object> findById(@PathVariable String codComentarios) {
        try {
            return ResponseEntity.ok(comentarioService.findById(Long.parseLong(codComentarios)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codComentarios));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "comentário não encontrado com o id: " + codComentarios));
        }
    }

    @PutMapping("/{codComentarios}")
    public ResponseEntity<Object> update(@Valid @RequestBody Comentario comentario, @PathVariable String codComentarios) {
        try {
            return ResponseEntity.ok(comentarioService.update(Long.parseLong(codComentarios), comentario));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codComentarios));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "comentário não encontrado com o id: " + codComentarios));
        }
    }

    @DeleteMapping("/{codComentarios}")
    public ResponseEntity<Object> delete(@PathVariable String codComentarios) {
        try {
            comentarioService.delete(Long.parseLong(codComentarios));
            return ResponseEntity.ok().body("Comentário com o id " + codComentarios + " foi removido com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codComentarios));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "comentário não encontrado com o id: " + codComentarios));
        }
    }
}
