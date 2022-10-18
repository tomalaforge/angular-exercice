export type Subject = 'Sciences' | 'History' | 'English' | 'Maths' | 'Sport';

export interface Teacher {
  firstname: string;
  lastname: string;
  subject: Subject;
}
