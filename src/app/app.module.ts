import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherCardComponent } from './component/teacher-card/teacher-card.component';
import { StudentCardComponent } from './component/student-card/student-card.component';
import { CityCardComponent } from './component/city-card/city-card.component';
import { CardComponent } from './ui/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherCardComponent,
    StudentCardComponent,
    CityCardComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
