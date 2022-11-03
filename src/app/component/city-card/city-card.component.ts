import { Component, OnInit } from '@angular/core';
import { CardType } from '../../model/card.model';
import { Observable } from 'rxjs';
import { FakeHttpService, randomCity } from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CityStore } from '../../data-access/city.store';
import { CardComponent } from '../../ui/card/card.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities$ | async"
      [type]="cardType"
      (addNew)="addNewHandler()"
      (delete)="deleteHandler($event)"
      class="bg-light-blue"
    >
      <img
        cardHeader
        src="assets/img/city.jpeg"
        width="200px"
        class="mx-auto"
        alt="city image"
      />
    </app-card>`,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class CityCardComponent implements OnInit {
  public readonly cardType = CardType.CITY;
  public readonly cities$: Observable<City[]> = this.store.cities$;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {
  }

  public ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  public addNewHandler(): void {
    this.store.addOne(randomCity());
  }

  public deleteHandler(id: number): void {
    this.store.deleteOne(id);
  }
}
