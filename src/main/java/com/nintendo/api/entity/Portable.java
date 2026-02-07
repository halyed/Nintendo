package com.nintendo.api.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("PORTABLE")
public class Portable extends Console {

    public Portable() {
    }

    public Portable(String nom, int prix, LocalDate dateSortie) {
        super(nom, prix, dateSortie);
    }
}
