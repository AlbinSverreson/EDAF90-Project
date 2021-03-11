import { Component, Input, OnInit } from '@angular/core';
//import { FlashCardComponent } from './flash-card/flash-card.component';
import { AuthService } from "../auth.service";
import 'firebase/database';
import firebase from 'firebase/app';


//hämta lista från quiz-overview
const questions = ["test 1", "test 2", "test 3", "test 4"];
//hämta lista från quiz-overview
const answers = ["Svar 1", "svar 2", "svar 3", "svar 4"];



@Component({
  selector: 'app-do-quiz',
  templateUrl: './do-quiz.component.html',
  styleUrls: ['./do-quiz.component.css']
})


export class DoQuizComponent implements OnInit {
  public questionList: string[];
  private answerList: string[];
  public scoreValue: number;
  public questionToCard: string;
  public answerToCard: string;
  public isElementVisible = true;

  constructor(public authService: AuthService) { 
    this.scoreValue = 0;
    this.questionToCard = "";
    this.answerToCard = "";
    this.questionList = [];
    this.answerList = [];
  }
  
  ngOnInit(): void {
    this.questionList = questions;
    this.answerList = answers;
    this.questionToCard = this.questionList[0];
    this.answerToCard = this.answerList[0];

  }
  
  public correctOnClick(){
    if(this.questionList.indexOf(this.questionToCard) >= this.questionList.length - 1) {
      //Display retry knapp
      this.scoreValue++;
      this.isElementVisible = false;

    } else {
      //this.whereInList++;
      this.questionToCard = this.questionList[this.questionList.indexOf(this.questionToCard) + 1];
      this.scoreValue++;
      setTimeout(() => {
        this.answerToCard = this.answerList[this.questionList.indexOf(this.questionToCard)];
      }, 400);
    }
  }

  public wrongOnClick() {
    if(this.questionList.indexOf(this.questionToCard) >= this.questionList.length - 1) {
      this.isElementVisible = false;
 
    } else {
      this.questionToCard = this.questionList[this.questionList.indexOf(this.questionToCard) + 1];
      setTimeout(() => {
        this.answerToCard = this.answerList[this.questionList.indexOf(this.questionToCard)];
      }, 400);
    }
  }

  public retryOnClick() {
    window.location.reload()
  }
}



