package com.nintendo.api.service;

import com.nintendo.api.entity.Boutique;
import com.nintendo.api.repository.BoutiqueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoutiqueService {

    private final BoutiqueRepository boutiqueRepository;

    public BoutiqueService(BoutiqueRepository boutiqueRepository) {
        this.boutiqueRepository = boutiqueRepository;
    }

    public List<Boutique> findAll() {
        return boutiqueRepository.findAll();
    }

    public Optional<Boutique> findById(Long id) {
        return boutiqueRepository.findById(id);
    }

    public Boutique create(Boutique boutique) {
        return boutiqueRepository.save(boutique);
    }

    public Boutique update(Long id, Boutique boutiqueDetails) {
        return boutiqueRepository.findById(id)
                .map(boutique -> {
                    boutique.setNom(boutiqueDetails.getNom());
                    boutique.setAdresse(boutiqueDetails.getAdresse());
                    return boutiqueRepository.save(boutique);
                })
                .orElseThrow(() -> new RuntimeException("Boutique not found with id: " + id));
    }

    public void delete(Long id) {
        boutiqueRepository.deleteById(id);
    }
}
