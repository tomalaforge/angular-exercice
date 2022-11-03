import { Component, OnInit } from '@angular/core';
import { FakeHttpService, randTeacher } from 'src/app/data-access/fake-http.service';
import { TeacherStore } from 'src/app/data-access/teacher.store';
import { CardType } from 'src/app/model/card.model';
import { Teacher } from 'src/app/model/teacher.model';
import { CardComponent } from 'src/app/ui/card/card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers$ | async"
      [type]="cardType"
      (addNew)="addNewHandler()"
      (delete)="deleteHandler($event)"
      class="bg-light-red"
    >
      <img
        cardHeader
        src="assets/img/teacher.png"
        width="200px"
        class="mx-auto"
        alt="teacher image"
      />
    </app-card>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class TeacherCardComponent implements OnInit {
  public readonly cardType = CardType.TEACHER;
  public readonly teachers$: Observable<Teacher[]> = this.store.teachers$;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {
  }

  public ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  public addNewHandler(): void {
    this.store.addOne(randTeacher());
  }

  public deleteHandler(id: number): void {
    this.store.deleteOne(id);
  }
}
