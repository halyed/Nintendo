package com.nintendo.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "jeux")
public class Jeu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titre;

    @ManyToOne
    @JoinColumn(name = "console_id")
    private Console console;

    @ManyToOne
    @JoinColumn(name = "boutique_id")
    private Boutique boutique;

    public Jeu() {
    }

    public Jeu(String titre, Console console, Boutique boutique) {
        this.titre = titre;
        this.console = console;
        this.boutique = boutique;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public Console getConsole() {
        return console;
    }

    public void setConsole(Console console) {
        this.console = console;
    }

    public Boutique getBoutique() {
        return boutique;
    }

    public void setBoutique(Boutique boutique) {
        this.boutique = boutique;
    }

    @Override
    public String toString() {
        return "Jeu [id=" + id + ", titre=" + titre + ", console=" + console + ", boutique=" + boutique + "]";
    }
}
