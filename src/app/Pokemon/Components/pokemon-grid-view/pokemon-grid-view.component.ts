import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardDTO } from 'src/app/Shared/Models/card.interface';
import { PokemonDTO } from '../../Models/pokemon.interface';

@Component({
  selector: 'app-pokemon-grid-view',
  templateUrl: './pokemon-grid-view.component.html',
  styleUrls: ['./pokemon-grid-view.component.scss'],
})
export class PokemonGridViewComponent {
  @Input() data: PokemonDTO[] = [];

  cardList: CardDTO[] = [];

  constructor(private titleCasePipe: TitleCasePipe) {}

  ngOnChanges(): void {
    this.cardList = [];

    this.data.forEach((item: PokemonDTO) => {
      this.cardList.push({
        id: item.id,
        image: item.image,
        title: `${item.id}. ${item.name}`,
        link: `/pokemon/${item.id}`,
        description: `<p><strong>Type: </strong> ${this.titleCasePipe.transform(
          item.type
        )}</p><p><strong>Height (in decimetres): </strong> ${
          item.height
        }</p><p><strong>Weight (in hectograms): </strong> ${item.weight}</p>`,
      } as CardDTO);
    });
  }
}
