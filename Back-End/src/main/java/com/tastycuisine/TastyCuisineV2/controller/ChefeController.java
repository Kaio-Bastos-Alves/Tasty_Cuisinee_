package com.tastycuisine.TastyCuisineV2.controller;

import com.tastycuisine.TastyCuisineV2.model.entity.Chefe;
import com.tastycuisine.TastyCuisineV2.model.service.ChefeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/chefe")
public class ChefeController {

    @Autowired
    private ChefeService chefeService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Chefe>> findAll() {
        return ResponseEntity.ok(chefeService.findAll());
    }

    @PostMapping
    public ResponseEntity<Chefe> save(@Valid @RequestBody Chefe chefe) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chefeService.save(chefe));
    }

    @GetMapping("/{codChefe}")
    public ResponseEntity<Object> findById(@PathVariable String codChefe) {
        try {
            return ResponseEntity.ok(chefeService.findById(Long.parseLong(codChefe)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codChefe));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "chefe não encontrado com o id: " + codChefe));
        }
    }

    @PutMapping("/{codChefe}")
    public ResponseEntity<Object> update(@Valid @RequestBody Chefe chefe, @PathVariable String codChefe) {
        try {
            return ResponseEntity.ok(chefeService.update(Long.parseLong(codChefe), chefe));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codChefe));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "chefe não encontrado com o id: " + codChefe));
        }
    }

    @DeleteMapping("/{codChefe}")
    public ResponseEntity<Object> delete(@PathVariable String codChefe) {
        try {
            chefeService.delete(Long.parseLong(codChefe));
            return ResponseEntity.ok().body("Chefe com o id " + codChefe + " foi removido com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codChefe));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "chefe não encontrado com o id: " + codChefe));
        }
    }

    //login de chefe
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> body) {
        try {
            String gmail = body.get("email");
            String senha = body.get("senha");
            return ResponseEntity.ok(chefeService.login(gmail, senha));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of(
                    "status", 401,
                    "error", "unauthorized",
                    "message", "Email ou senha incorretos"
            ));
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Chefe>> buscar(@RequestParam String termo) {
        return ResponseEntity.ok(chefeService.buscar(termo));
    }

    @GetMapping("/populares")
    public ResponseEntity<List<Chefe>> populares() {
        return ResponseEntity.ok(chefeService.populares());
    }
}
