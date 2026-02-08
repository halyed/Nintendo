package com.nintendo.api.config;

import com.nintendo.api.entity.*;
import com.nintendo.api.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ConsoleRepository consoleRepository;
    private final BoutiqueRepository boutiqueRepository;
    private final JeuRepository jeuRepository;
    private final ClientRepository clientRepository;
    private final AchatRepository achatRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(ConsoleRepository consoleRepository,
                           BoutiqueRepository boutiqueRepository,
                           JeuRepository jeuRepository,
                           ClientRepository clientRepository,
                           AchatRepository achatRepository,
                           UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.consoleRepository = consoleRepository;
        this.boutiqueRepository = boutiqueRepository;
        this.jeuRepository = jeuRepository;
        this.clientRepository = clientRepository;
        this.achatRepository = achatRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Create Consoles
        Salon nes = new Salon("NES", 199, LocalDate.of(1985, 10, 18));
        Salon snes = new Salon("Super NES", 249, LocalDate.of(1990, 11, 21));
        Salon n64 = new Salon("Nintendo 64", 299, LocalDate.of(1996, 6, 23));
        Salon gamecube = new Salon("GameCube", 249, LocalDate.of(2001, 9, 14));
        Salon wii = new Salon("Wii", 249, LocalDate.of(2006, 11, 19));
        Salon wiiu = new Salon("Wii U", 349, LocalDate.of(2012, 11, 18));

        Portable gameboy = new Portable("Game Boy", 89, LocalDate.of(1989, 4, 21));
        Portable gba = new Portable("Game Boy Advance", 99, LocalDate.of(2001, 3, 21));
        Portable ds = new Portable("Nintendo DS", 149, LocalDate.of(2004, 11, 21));
        Portable ds3 = new Portable("Nintendo 3DS", 249, LocalDate.of(2011, 2, 26));

        Hybride switchConsole = new Hybride("Nintendo Switch", 299, LocalDate.of(2017, 3, 3));
        Hybride switchLite = new Hybride("Nintendo Switch Lite", 199, LocalDate.of(2019, 9, 20));
        Hybride switchOled = new Hybride("Nintendo Switch OLED", 349, LocalDate.of(2021, 10, 8));

        consoleRepository.save(nes);
        consoleRepository.save(snes);
        consoleRepository.save(n64);
        consoleRepository.save(gamecube);
        consoleRepository.save(wii);
        consoleRepository.save(wiiu);
        consoleRepository.save(gameboy);
        consoleRepository.save(gba);
        consoleRepository.save(ds);
        consoleRepository.save(ds3);
        consoleRepository.save(switchConsole);
        consoleRepository.save(switchLite);
        consoleRepository.save(switchOled);

        // Create Boutiques
        Boutique boutiqueParis = new Boutique("Nintendo Store Paris",
                new Adresse(10, "Avenue des Champs-Elysees", "Paris"));
        Boutique boutiqueLyon = new Boutique("Nintendo Store Lyon",
                new Adresse(25, "Rue de la Republique", "Lyon"));
        Boutique boutiqueMarseille = new Boutique("Nintendo Store Marseille",
                new Adresse(15, "La Canebiere", "Marseille"));

        boutiqueRepository.save(boutiqueParis);
        boutiqueRepository.save(boutiqueLyon);
        boutiqueRepository.save(boutiqueMarseille);

        // Create Jeux
        Jeu zelda = new Jeu("The Legend of Zelda: Breath of the Wild", switchConsole, boutiqueParis);
        Jeu mario = new Jeu("Super Mario Odyssey", switchConsole, boutiqueParis);
        Jeu pokemon = new Jeu("Pokemon Scarlet", switchConsole, boutiqueLyon);
        Jeu mariokart = new Jeu("Mario Kart 8 Deluxe", switchConsole, boutiqueLyon);
        Jeu smash = new Jeu("Super Smash Bros. Ultimate", switchConsole, boutiqueMarseille);
        Jeu animalCrossing = new Jeu("Animal Crossing: New Horizons", switchConsole, boutiqueMarseille);
        Jeu splatoon = new Jeu("Splatoon 3", switchConsole, boutiqueParis);

        jeuRepository.save(zelda);
        jeuRepository.save(mario);
        jeuRepository.save(pokemon);
        jeuRepository.save(mariokart);
        jeuRepository.save(smash);
        jeuRepository.save(animalCrossing);
        jeuRepository.save(splatoon);

        // Create Clients
        Client client1 = new Client("Dupont", "Jean");
        Client client2 = new Client("Martin", "Marie");
        Client client3 = new Client("Bernard", "Pierre");

        clientRepository.save(client1);
        clientRepository.save(client2);
        clientRepository.save(client3);

        // Create Achats
        Achat achat1 = new Achat(zelda, LocalDate.of(2023, 1, 15), 59.99);
        achat1.setClient(client1);
        Achat achat2 = new Achat(mario, LocalDate.of(2023, 2, 20), 49.99);
        achat2.setClient(client1);

        Achat achat3 = new Achat(pokemon, LocalDate.of(2023, 3, 10), 59.99);
        achat3.setClient(client2);
        Achat achat4 = new Achat(mariokart, LocalDate.of(2023, 4, 5), 49.99);
        achat4.setClient(client2);
        Achat achat5 = new Achat(smash, LocalDate.of(2023, 5, 12), 59.99);
        achat5.setClient(client2);

        Achat achat6 = new Achat(animalCrossing, LocalDate.of(2023, 6, 1), 49.99);
        achat6.setClient(client3);

        achatRepository.save(achat1);
        achatRepository.save(achat2);
        achatRepository.save(achat3);
        achatRepository.save(achat4);
        achatRepository.save(achat5);
        achatRepository.save(achat6);

        // Create default admin user
        if (!userRepository.existsByUsername("admin")) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
        }

        System.out.println("Sample data initialized successfully!");
        System.out.println("Consoles: " + consoleRepository.count());
        System.out.println("Boutiques: " + boutiqueRepository.count());
        System.out.println("Jeux: " + jeuRepository.count());
        System.out.println("Clients: " + clientRepository.count());
        System.out.println("Achats: " + achatRepository.count());
        System.out.println("Users: " + userRepository.count());
    }
}
