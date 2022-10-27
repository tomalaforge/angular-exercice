import { NgForOf, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { randCity } from '@ngneat/falso';
import { tap, switchMap } from 'rxjs';
import { CityStore } from 'src/app/data-access/city.store';
import { FakeHttpService, randomCity, randTeacher } from 'src/app/data-access/fake-http.service';
import { ListItemComponent } from 'src/app/ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <div class="border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3 bg-light-red">
        <img
          src="https://assets.weforum.org/article/image/large_oJiIJtxAsQSP1eYnpNTTIMzjYoCmJo1oiC1mx2jWlN4.jpg"
          width="200px"
        />

        <section>
          <list-item
            *ngFor="let item of (cities$ | async)"
            [name]="item.name"
            [id]="item.id"
            (delete)="deleteTeacher($event)"
          >
          </list-item>
        </section>

        <button
          class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
          (click)="addNewItem()">
          Add
        </button>
    </div>
  `,
  styles: [
    `
      .bg-light-yellow {
        background-color: yellow;
      }
    `,
  ],
  standalone: true,
  imports: [ListItemComponent, NgForOf, AsyncPipe],
})
export class CityCardComponent {

  cityStore = inject(CityStore);
  http = inject(FakeHttpService);
  cities$ = this.http.fetchCities$
  .pipe(
    tap((t) => this.cityStore.addAll(t)),
    switchMap(() => this.cityStore.citys$)
  );

  addNewItem() {
    this.cityStore.addOne(randomCity());
  }

  deleteTeacher(id: number) {
    this.cityStore.deleteOne(id);
  }

}
