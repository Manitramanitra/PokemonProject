import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient){}


  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => this.log(response)),
      catchError((error)=> {
        return this.handleError(error,[])
      })
    )
  }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemon/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => {
        return this.handleError(error,undefined)
      })
    )
  }

  private log(response: Pokemon[] | Pokemon | undefined){
    console.table(response);
  }
  
  private handleError(error: Error, errorValue: any){
    console.error(error);
    return of(errorValue)
  }
  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Fée',
      'Vol',
      'Combat',
      'Psy',
      'Poison',
    ];
  }
}