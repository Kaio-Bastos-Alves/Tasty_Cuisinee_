package com.tastycuisine.TastyCuisineV2.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tastycuisine.TastyCuisineV2.model.entity.Adm;
import com.tastycuisine.TastyCuisineV2.model.service.AdmService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/adm")
public class AdmController {

    @Autowired
    private AdmService admService;

    @GetMapping("/findAll")
    public ResponseEntity<List<Adm>> findAll() {
        return ResponseEntity.ok(admService.findAll());
    }

    @PostMapping
    public ResponseEntity<Adm> save(@Valid @RequestBody Adm adm) {
        return ResponseEntity.status(HttpStatus.CREATED).body(admService.save(adm));
    }

    @GetMapping("/{codModerador}")
    public ResponseEntity<Object> findById(@PathVariable String codModerador) {
        try {
            return ResponseEntity.ok(admService.findById(Long.parseLong(codModerador)));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codModerador));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "administrador não encontrado com o id: " + codModerador));
        }
    }

    @PutMapping("/{codModerador}")
    public ResponseEntity<Object> update(@Valid @RequestBody Adm adm, @PathVariable String codModerador) {
        try {
            return ResponseEntity.ok(admService.update(Long.parseLong(codModerador), adm));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codModerador));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "administrador não encontrado com o id: " + codModerador));
        }
    }

    @DeleteMapping("/{codModerador}")
    public ResponseEntity<Object> delete(@PathVariable String codModerador) {
        try {
            admService.delete(Long.parseLong(codModerador));
            return ResponseEntity.ok().body("Administrador com o id " + codModerador + " foi removido com sucesso");
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("status", 400, "error", "bad request", "message", "o id informado não é válido: " + codModerador));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(Map.of("status", 404, "error", "not found", "message", "administrador não encontrado com o id: " + codModerador));
        }
    }

    //login de administrador
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String, String> body) {
        try {
            String gmail = body.get("email");
            String senha = body.get("senha");
            return ResponseEntity.ok(admService.login(gmail, senha));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of(
                    "status", 401,
                    "error", "unauthorized",
                    "message", "Email ou senha incorretos"
            ));
        }
    }
}
