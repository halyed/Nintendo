package com.nintendo.api.service;

import com.nintendo.api.entity.Achat;
import com.nintendo.api.entity.Client;
import com.nintendo.api.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> findAll() {
        return clientRepository.findAll();
    }

    public Optional<Client> findById(Long id) {
        return clientRepository.findById(id);
    }

    public List<Achat> findAchatsByClientId(Long id) {
        return clientRepository.findById(id)
                .map(Client::getAchats)
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
    }

    public Client create(Client client) {
        return clientRepository.save(client);
    }

    public Client update(Long id, Client clientDetails) {
        return clientRepository.findById(id)
                .map(client -> {
                    client.setNom(clientDetails.getNom());
                    client.setPrenom(clientDetails.getPrenom());
                    return clientRepository.save(client);
                })
                .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));
    }

    public void delete(Long id) {
        clientRepository.deleteById(id);
    }
}
