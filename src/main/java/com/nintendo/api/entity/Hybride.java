package com.nintendo.api.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("HYBRIDE")
public class Hybride extends Console {

    public Hybride() {
    }

    public Hybride(String nom, int prix, LocalDate dateSortie) {
        super(nom, prix, dateSortie);
    }
}
