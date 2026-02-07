package com.nintendo.api.controller;

import com.nintendo.api.entity.Jeu;
import com.nintendo.api.service.JeuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jeux")
public class JeuController {

    private final JeuService jeuService;

    public JeuController(JeuService jeuService) {
        this.jeuService = jeuService;
    }

    @GetMapping
    public List<Jeu> getAllJeux() {
        return jeuService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Jeu> getJeuById(@PathVariable Long id) {
        return jeuService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Jeu> createJeu(@RequestBody Jeu jeu) {
        Jeu created = jeuService.create(jeu);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Jeu> updateJeu(@PathVariable Long id, @RequestBody Jeu jeu) {
        try {
            Jeu updated = jeuService.update(id, jeu);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJeu(@PathVariable Long id) {
        jeuService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
