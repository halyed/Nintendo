export type ConsoleType = 'SALON' | 'PORTABLE' | 'HYBRIDE';

export interface Console {
  id?: number;
  nom: string;
  prix: number;
  dateSortie: string;
  type: ConsoleType;
}
