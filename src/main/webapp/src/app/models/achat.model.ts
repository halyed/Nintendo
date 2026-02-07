import { Jeu } from './jeu.model';

export interface Achat {
  id?: number;
  jeu?: Jeu;
  date: string;
  prix: number;
  client?: { id: number; nom: string; prenom: string };
}
