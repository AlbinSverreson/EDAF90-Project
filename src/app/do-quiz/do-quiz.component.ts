import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-do-quiz',
  templateUrl: './do-quiz.component.html',
  styleUrls: ['./do-quiz.component.css']
})


 

export class DoQuizComponent implements OnInit {
  
  constructor() { 
    this.scoreValue = 0;
  }
  
  ngOnInit(): void {
    this.onChangeScore(19);
  }

  public scoreValue;

  onChangeScore(newScore) { 
     this.scoreValue = newScore;
  }

    
}
