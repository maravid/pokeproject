import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { PokemonDTO } from '../../Models/pokemon.interface';
import { PokemonService } from '../../Services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent {
  pokemon?: PokemonDTO;
  loading: boolean = true;
  hideExtraDetails: boolean = true;
  error?: HttpErrorResponse;

  constructor(
    private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (id) {
      this.pokemonService.getPokemonById(id).subscribe({
        next: (data) => {
          this.pokemon = data;
          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.error = err;
          this.loading = false;
        },
      });
    } else {
      this.router.navigateByUrl('/');
    }
  }

  toggleExtraDetails() {
    this.hideExtraDetails = !this.hideExtraDetails;
  }

  getErrorPhrase() {
    if (this.error?.status) {
      return getReasonPhrase(this.error?.status);
    }
    return getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
