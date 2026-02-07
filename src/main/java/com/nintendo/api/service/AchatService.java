package com.nintendo.api.service;

import com.nintendo.api.entity.Achat;
import com.nintendo.api.entity.Client;
import com.nintendo.api.repository.AchatRepository;
import com.nintendo.api.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AchatService {

    private final AchatRepository achatRepository;
    private final ClientRepository clientRepository;

    public AchatService(AchatRepository achatRepository, ClientRepository clientRepository) {
        this.achatRepository = achatRepository;
        this.clientRepository = clientRepository;
    }

    public List<Achat> findAll() {
        return achatRepository.findAll();
    }

    public Optional<Achat> findById(Long id) {
        return achatRepository.findById(id);
    }

    public Achat createForClient(Long clientId, Achat achat) {
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + clientId));
        achat.setClient(client);
        return achatRepository.save(achat);
    }

    public Achat update(Long id, Achat achatDetails) {
        return achatRepository.findById(id)
                .map(achat -> {
                    achat.setJeu(achatDetails.getJeu());
                    achat.setDate(achatDetails.getDate());
                    achat.setPrix(achatDetails.getPrix());
                    return achatRepository.save(achat);
                })
                .orElseThrow(() -> new RuntimeException("Achat not found with id: " + id));
    }

    public void delete(Long id) {
        achatRepository.deleteById(id);
    }
}
