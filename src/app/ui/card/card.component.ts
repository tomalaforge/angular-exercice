import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from 'src/app/model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { PipesModule } from '../../infrastructure/pipes/pipes.module';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  standalone: true,
  imports: [ListItemComponent, NgForOf, PipesModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;

  @Output() addNew: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  public addNewItem(): void {
    this.addNew.emit();
  }

  public deleteItemHandler(id: number): void {
    this.delete.emit(id);
  }
}
