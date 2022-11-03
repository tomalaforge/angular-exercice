import { Pipe, PipeTransform } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItem } from '../../model/list-item.model';
import { Student } from '../../model/student.model';
import { Teacher } from '../../model/teacher.model';
import { City } from '../../model/city.model';

@Pipe({
  name: 'listItemTitle'
})
export class ListItemTitlePipe implements PipeTransform {
  public transform(value: ListItem, type: CardType): string {
    switch (type) {
      case CardType.TEACHER:
        return (value as Teacher).firstname;
      case CardType.STUDENT:
        return (value as Student).firstname;
      case CardType.CITY:
        return (value as City).name;
      default:
        return '';
    }
  }
}
