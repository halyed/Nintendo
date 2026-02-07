package com.nintendo.api.service;

import com.nintendo.api.entity.Jeu;
import com.nintendo.api.repository.JeuRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JeuService {

    private final JeuRepository jeuRepository;

    public JeuService(JeuRepository jeuRepository) {
        this.jeuRepository = jeuRepository;
    }

    public List<Jeu> findAll() {
        return jeuRepository.findAll();
    }

    public Optional<Jeu> findById(Long id) {
        return jeuRepository.findById(id);
    }

    public Jeu create(Jeu jeu) {
        return jeuRepository.save(jeu);
    }

    public Jeu update(Long id, Jeu jeuDetails) {
        return jeuRepository.findById(id)
                .map(jeu -> {
                    jeu.setTitre(jeuDetails.getTitre());
                    jeu.setConsole(jeuDetails.getConsole());
                    jeu.setBoutique(jeuDetails.getBoutique());
                    return jeuRepository.save(jeu);
                })
                .orElseThrow(() -> new RuntimeException("Jeu not found with id: " + id));
    }

    public void delete(Long id) {
        jeuRepository.deleteById(id);
    }
}
