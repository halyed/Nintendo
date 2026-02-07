package com.nintendo.api.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDate;

@Entity
@DiscriminatorValue("SALON")
public class Salon extends Console {

    public Salon() {
    }

    public Salon(String nom, int prix, LocalDate dateSortie) {
        super(nom, prix, dateSortie);
    }
}
