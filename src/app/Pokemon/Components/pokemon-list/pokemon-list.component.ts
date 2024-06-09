import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedPokemonDTO } from '../../Models/paginatedPokemon.interface';
import { PokemonDTO } from '../../Models/pokemon.interface';
import { PokemonService } from '../../Services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void => *', animate(1000)),
    ]),
  ],
})
export class PokemonListComponent {
  pokemonList: PokemonDTO[] = [];
  loading: boolean = true;
  viewMode: string = 'list';
  pageSize: number = 20;
  page: number = 0;
  totalResults: number = 0;
  error?: HttpErrorResponse;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.pageSize = params['pageSize'] ?? 20;
      this.page = params['page'] ?? 0;
      this.viewMode = params['view'] ?? 'list';
    });
  }

  ngOnInit() {
    this.loadData();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex;

    this.loadData();
  }

  viewChanged(event: string) {
    this.viewMode = event;

    this.updateUrl();
  }

  loadData() {
    this.loading = true;

    this.updateUrl();

    this.pokemonService
      .getAllPokemonsPaginated(this.page * this.pageSize, this.pageSize)
      .subscribe({
        next: (paginatedData: PaginatedPokemonDTO) => {
          this.totalResults = paginatedData.count;
          this.pokemonList = paginatedData.results;
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.error = err;
          this.loading = false;
        },
      });
  }

  updateUrl() {
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: {
          page: this.page,
          pageSize: this.pageSize,
          view: this.viewMode,
        },
      })
      .toString();

    this.location.replaceState(url);
  }
}
