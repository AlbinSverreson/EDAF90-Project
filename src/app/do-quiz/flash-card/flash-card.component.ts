import { Component, Input, OnChanges, OnInit, Output, SimpleChange, ɵɵNgOnChangesFeature } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-flash-card',
  templateUrl: './flash-card.component.html',
  styleUrls: ['./flash-card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none'
      })),
      state('flipped', style({
        transform: 'rotateX(180deg)'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ])
    ])
  ]
})
export class FlashCardComponent implements OnInit, OnChanges {
  @Input() question: string;
  @Input() answer: string;
  

  constructor(){
    this.question = "";
    this.answer = "";
    
  }

  data: CardData = {
    state: "default"
  };
  
    ngOnChanges() {
      this.data.state = "default";
    }


  ngOnInit(): void {

  }

  cardClicked() {
    if (this.data.state === "default") {
      this.data.state = "flipped";
    } else {
      this.data.state = "default";
    }
  }

}




export interface CardData {
  state: 'default' | 'flipped' | 'matched';
}