package com.nintendo.api.service;

import com.nintendo.api.entity.Console;
import com.nintendo.api.entity.Hybride;
import com.nintendo.api.entity.Portable;
import com.nintendo.api.entity.Salon;
import com.nintendo.api.repository.ConsoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConsoleService {

    private final ConsoleRepository consoleRepository;

    public ConsoleService(ConsoleRepository consoleRepository) {
        this.consoleRepository = consoleRepository;
    }

    public List<Console> findAll() {
        return consoleRepository.findAll();
    }

    public Optional<Console> findById(Long id) {
        return consoleRepository.findById(id);
    }

    public Salon createSalon(Salon salon) {
        return consoleRepository.save(salon);
    }

    public Portable createPortable(Portable portable) {
        return consoleRepository.save(portable);
    }

    public Hybride createHybride(Hybride hybride) {
        return consoleRepository.save(hybride);
    }

    public Console update(Long id, Console consoleDetails) {
        return consoleRepository.findById(id)
                .map(console -> {
                    console.setNom(consoleDetails.getNom());
                    console.setPrix(consoleDetails.getPrix());
                    console.setDateSortie(consoleDetails.getDateSortie());
                    return consoleRepository.save(console);
                })
                .orElseThrow(() -> new RuntimeException("Console not found with id: " + id));
    }

    public void delete(Long id) {
        consoleRepository.deleteById(id);
    }
}
