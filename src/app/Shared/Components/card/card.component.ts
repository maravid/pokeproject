import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardDTO } from '../../Models/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() data?: CardDTO;

  constructor(private router: Router) {}

  navigate() {
    this.router.navigateByUrl(this.data!.link);
  }
}
