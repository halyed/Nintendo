package com.nintendo.api.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "consoles")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type", discriminatorType = DiscriminatorType.STRING)
public abstract class Console {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private int prix;
    private LocalDate dateSortie;

    public Console() {
    }

    public Console(String nom, int prix, LocalDate dateSortie) {
        this.nom = nom;
        this.prix = prix;
        this.dateSortie = dateSortie;
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

    public int getPrix() {
        return prix;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public LocalDate getDateSortie() {
        return dateSortie;
    }

    public void setDateSortie(LocalDate dateSortie) {
        this.dateSortie = dateSortie;
    }

    @Column(name = "type", insertable = false, updatable = false)
    private String type;

    public String getType() {
        return type;
    }

    @Override
    public String toString() {
        return "Console [id=" + id + ", nom=" + nom + ", prix=" + prix + ", dateSortie=" + dateSortie + "]";
    }
}
