import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  private citys = new BehaviorSubject<City[]>([]);
  citys$ = this.citys.asObservable();

  addAll(city: City[]) {
    this.citys.next(city);
  }

  addOne(city: City) {
    this.citys.next([...this.citys.value, city]);
  }

  deleteOne(id: number) {
    this.citys.next(this.citys.value.filter((s) => s.id !== id));
  }
}
