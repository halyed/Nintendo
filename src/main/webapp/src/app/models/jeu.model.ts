import { Console } from './console.model';
import { Boutique } from './boutique.model';

export interface Jeu {
  id?: number;
  titre: string;
  console?: Console;
  boutique?: Boutique;
}
