import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="border border-grey-300 py-1 px-2 flex justify-between">
      <ng-content select="[itemName]"></ng-content>
      <button (click)="delete(id)">
        <img class="h-5" src="assets/svg/trash.svg" alt="delete icon"/>
      </button>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Input() id!: number;

  @Output() deleteItem: EventEmitter<number> = new EventEmitter<number>();

  public delete(id: number): void {
    this.deleteItem.emit(id);
  }
}
