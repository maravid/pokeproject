import { CommonModule, TitleCasePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../Shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { PokemonDetailComponent } from './Components/pokemon-detail/pokemon-detail.component';
import { PokemonGridViewComponent } from './Components/pokemon-grid-view/pokemon-grid-view.component';
import { PokemonListViewComponent } from './Components/pokemon-list-view/pokemon-list-view.component';
import { PokemonListComponent } from './Components/pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonListViewComponent,
    PokemonGridViewComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatExpansionModule,
    MatPaginatorModule,
  ],
  exports: [PokemonListComponent, PokemonDetailComponent],
  providers: [TitleCasePipe],
})
export class PokemonModule {}
