import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDTO } from '../../Models/pokemon.interface';

@Component({
  selector: 'app-pokemon-list-view',
  templateUrl: './pokemon-list-view.component.html',
  styleUrls: ['./pokemon-list-view.component.scss'],
})
export class PokemonListViewComponent {
  @Input() data: PokemonDTO[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'type',
    'image',
    'height',
    'weight',
  ];

  constructor(private router: Router) {}

  navigateById(id: number): void {
    this.router.navigate(['pokemon', id]);
  }
}
