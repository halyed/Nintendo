package com.nintendo.api.controller;

import com.nintendo.api.entity.Console;
import com.nintendo.api.entity.Hybride;
import com.nintendo.api.entity.Portable;
import com.nintendo.api.entity.Salon;
import com.nintendo.api.service.ConsoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/consoles")
public class ConsoleController {

    private final ConsoleService consoleService;

    public ConsoleController(ConsoleService consoleService) {
        this.consoleService = consoleService;
    }

    @GetMapping
    public List<Console> getAllConsoles() {
        return consoleService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Console> getConsoleById(@PathVariable Long id) {
        return consoleService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/salon")
    public ResponseEntity<Salon> createSalon(@RequestBody Salon salon) {
        Salon created = consoleService.createSalon(salon);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/portable")
    public ResponseEntity<Portable> createPortable(@RequestBody Portable portable) {
        Portable created = consoleService.createPortable(portable);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PostMapping("/hybride")
    public ResponseEntity<Hybride> createHybride(@RequestBody Hybride hybride) {
        Hybride created = consoleService.createHybride(hybride);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Console> updateConsole(@PathVariable Long id, @RequestBody Console console) {
        try {
            Console updated = consoleService.update(id, console);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsole(@PathVariable Long id) {
        consoleService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
