package com.nintendo.api.controller;

import com.nintendo.api.entity.Achat;
import com.nintendo.api.service.AchatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/achats")
public class AchatController {

    private final AchatService achatService;

    public AchatController(AchatService achatService) {
        this.achatService = achatService;
    }

    @GetMapping
    public List<Achat> getAllAchats() {
        return achatService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Achat> getAchatById(@PathVariable Long id) {
        return achatService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/clients/{clientId}")
    public ResponseEntity<Achat> createAchatForClient(@PathVariable Long clientId, @RequestBody Achat achat) {
        try {
            Achat created = achatService.createForClient(clientId, achat);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Achat> updateAchat(@PathVariable Long id, @RequestBody Achat achat) {
        try {
            Achat updated = achatService.update(id, achat);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAchat(@PathVariable Long id) {
        achatService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
