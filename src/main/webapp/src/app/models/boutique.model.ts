export interface Adresse {
  numero: number;
  rue: string;
  ville: string;
}

export interface Boutique {
  id?: number;
  nom: string;
  adresse: Adresse;
}
