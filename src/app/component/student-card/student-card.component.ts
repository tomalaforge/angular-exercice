import { Component, OnInit } from '@angular/core';
import { FakeHttpService, randStudent } from 'src/app/data-access/fake-http.service';
import { StudentStore } from 'src/app/data-access/student.store';
import { CardType } from 'src/app/model/card.model';
import { Student } from 'src/app/model/student.model';
import { CardComponent } from 'src/app/ui/card/card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students$ | async"
      [type]="cardType"
      (addNew)="addNewHandler()"
      (delete)="deleteHandler($event)"
      class="bg-light-green"
    >
      <img
        cardHeader
        src="assets/img/student.webp"
        width="200px"
        class="mx-auto"
        alt="student image"
      />
    </app-card>`,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, AsyncPipe],
})
export class StudentCardComponent implements OnInit {
  public readonly cardType = CardType.STUDENT;
  public readonly students$: Observable<Student[]> = this.store.students$;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {
  }

  public ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  public addNewHandler(): void {
    this.store.addOne(randStudent());
  }

  public deleteHandler(id: number): void {
    this.store.deleteOne(id);
  }
}
