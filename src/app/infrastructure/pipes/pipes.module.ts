import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemTitlePipe } from './list-item-title.pipe';


@NgModule({
  declarations: [ListItemTitlePipe],
  exports: [ListItemTitlePipe],
  imports: [CommonModule],
})
export class PipesModule {
}
