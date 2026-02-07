import { Achat } from './achat.model';

export interface Client {
  id?: number;
  nom: string;
  prenom: string;
  achats?: Achat[];
}
