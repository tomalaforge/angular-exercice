import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { FakeHttpService } from 'src/app/data-access/fake-http.service';
import { StudentStore } from 'src/app/data-access/student.store';
import { ListItemComponent } from 'src/app/ui/list-item/list-item.component';
import { randStudent } from './../../data-access/fake-http.service';

@Component({
  selector: 'app-student-card',
  template: `
    <div
      class="border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3 bg-light-red"
    >
      <img src="assets/img/student.webp" width="200px" />

      <section>
        <list-item
          *ngFor="let item of students$ | async"
          [name]="item.firstname"
          [id]="item.id"
          (delete)="deleteStudent($event)"
        >
        </list-item>
      </section>

      <button
        class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
        (click)="addNewItem()"
      >
        Add
      </button>
    </div>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [ListItemComponent, NgForOf, AsyncPipe],
})
export class StudentCardComponent {

  studentStore = inject(StudentStore);
  http = inject(FakeHttpService);
  students$ = this.http.fetchStudents$
  .pipe(
    tap((t) => this.studentStore.addAll(t)),
    switchMap(() => this.studentStore.students$)
  );

  addNewItem() {
    this.studentStore.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.studentStore.deleteOne(id);
  }
}
