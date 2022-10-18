import { Teacher } from './teacher.model';

export interface Student {
  firstname: string;
  lastname: string;
  mainTeacher: Teacher;
  school: string;
}
