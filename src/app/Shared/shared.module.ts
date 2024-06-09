import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from '../app-routing.module';
import { CardComponent } from './Components/card/card.component';
import { HeaderComponent } from './Components/header/header.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent, HeaderComponent, CardComponent],
  imports: [
    AppRoutingModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatCardModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  exports: [SpinnerComponent, HeaderComponent, CardComponent],
})
export class SharedModule {}
