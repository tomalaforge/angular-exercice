import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { FakeHttpService, randTeacher } from 'src/app/data-access/fake-http.service';
import { TeacherStore } from 'src/app/data-access/teacher.store';
import { ListItemComponent } from './../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <div class="border-2 border-black rounded-md p-4 w-fit flex flex-col gap-3 bg-light-red">
        <img
          src="assets/img/teacher.png"
          width="200px"
        />

        <section>
          <list-item
            *ngFor="let item of (teachers$ | async)"
            [name]="item.firstname"
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
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [ListItemComponent, NgForOf, AsyncPipe],
})
export class TeacherCardComponent {

  teacherStore = inject(TeacherStore);
  http = inject(FakeHttpService);
  teachers$ = this.http.fetchTeachers$
  .pipe(
    tap((t) => this.teacherStore.addAll(t)),
    switchMap(() => this.teacherStore.teachers$)
  );

  addNewItem() {
    this.teacherStore.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.teacherStore.deleteOne(id);
  }

}
