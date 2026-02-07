package com.nintendo.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "boutiques")
public class Boutique {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    @Embedded
    private Adresse adresse;

    public Boutique() {
    }

    public Boutique(String nom, Adresse adresse) {
        this.nom = nom;
        this.adresse = adresse;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public Adresse getAdresse() {
        return adresse;
    }

    public void setAdresse(Adresse adresse) {
        this.adresse = adresse;
    }

    @Override
    public String toString() {
        return "Boutique [id=" + id + ", nom=" + nom + ", adresse=" + adresse + "]";
    }
}
