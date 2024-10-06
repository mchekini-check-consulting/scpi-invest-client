import { Injectable } from '@angular/core';
import { Pays } from '../model/pays.model';

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  private paysList: Pays[] = [
    { nom: 'france', code: 'FR' },
    { nom: 'allemagne', code: 'DE' },
    { nom: 'espagne', code: 'ES' },
    { nom: 'italie', code: 'IT' },
    { nom: 'portugal', code: 'PT' },
    { nom: 'belgique', code: 'BE' },
    { nom: 'pays-bas', code: 'NL' },
    { nom: 'luxembourg', code: 'LU' },
    { nom: 'suisse', code: 'CH' },
    { nom: 'autriche', code: 'AT' },
    { nom: 'irlande', code: 'IE' },
    { nom: 'pologne', code: 'PL' }
  ];

  constructor() {
  }

  getCodeByCountryName(nomPays: string): string | null {
    const pays = this.paysList.find(p => p.nom === nomPays.toLowerCase());
    return pays ? pays.code : null;
  }

}
