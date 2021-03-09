import { Component, Input, OnInit } from '@angular/core';
import { FlashCardComponent } from './flash-card/flash-card.component';

const questions = ["test 1", "test 2", "test 3", "test 4"];
const answers = ["Svar 1", "svar 2", "svar 3", "svar 4"];

@Component({
  selector: 'app-do-quiz',
  templateUrl: './do-quiz.component.html',
  styleUrls: ['./do-quiz.component.css']
})

export class DoQuizComponent implements OnInit {
  public scoreValue: number;
  public questionToCard: string;
  public answerToCard: string;
  private questionList: string[];
  private answerList: string[];
  private whereInList: number;


  constructor() { 
    this.scoreValue = 0;
    this.questionToCard = "";
    this.answerToCard = "";
    this.questionList = [];
    this.answerList = [];
    this.whereInList = 0;
  }
  
  ngOnInit(): void {
    this.whereInList = 0;
    this.scoreValue = this.whereInList;
    this.questionList = questions;
    this.answerList = answers;
    this.questionToCard = this.questionList[this.whereInList];
    this.answerToCard = this.answerList[this.whereInList];
  }

  public correctOnClick(){
    if(this.whereInList >= this.questionList.length - 1) {
      //Display retry knapp
      this.scoreValue++;
      alert("Nu har du nått slutet");
    } else {
      this.whereInList++;
      this.questionToCard = this.questionList[this.whereInList];
      this.scoreValue++;
      setTimeout(() => {
        this.answerToCard = this.answerList[this.questionList.indexOf(this.questionToCard)];
      }, 400);
    }

  }

  public wrongOnClick() {
    if(this.whereInList >= this.questionList.length - 1) {
      //Display retry knapp
      alert("Nu har du nått slutet");
    } else {
      this.whereInList++;
      this.questionToCard = this.questionList[this.whereInList];
      setTimeout(() => {
        this.answerToCard = this.answerList[this.questionList.indexOf(this.questionToCard)];
      }, 400);
    }
  }

  //Lägg till knapp som dyker upp när man är klar om att börja om.
    
}
