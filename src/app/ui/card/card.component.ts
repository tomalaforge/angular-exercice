import { Component, Input, OnInit } from '@angular/core';
import { CardType } from 'src/app/model/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input() list!: any[];
  @Input() type!: CardType;

  CardType = CardType;

  constructor() {}

  ngOnInit(): void {}

  getTeacherImage;
}
