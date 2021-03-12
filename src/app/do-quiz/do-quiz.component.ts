import { Router } from '@angular/router';
import { QuizOverviewComponent } from './../quiz-overview/quiz-overview.component';
import { Component, Input, OnInit } from '@angular/core';
//import { FlashCardComponent } from './flash-card/flash-card.component';
import { AuthService } from "../auth.service";
import 'firebase/database';
import firebase from 'firebase/app';


@Component({
  selector: 'app-do-quiz',
  templateUrl: './do-quiz.component.html',
  styleUrls: ['./do-quiz.component.css']
})


export class DoQuizComponent implements OnInit {

  @Input() quiz: any;

  public questionList: any[];
  private answerList: string[];
  public scoreValue: number;
  public questionToCard: string;
  public answerToCard: string;
  public isElementVisible = true;
  private name: any;
  private userID: any;
  private database = firebase.database();

  constructor(public authService: AuthService, private router: Router) { 
    this.scoreValue = 0;
    this.questionToCard = "";
    this.answerToCard = "";
    this.questionList = [];
    this.answerList = [];
    //this.name = this.router.getCurrentNavigation()?.extras.state?.name;
    this.name = sessionStorage.getItem('ActiveQuiz');
    console.log('ActiveQuiz:' + this.name);
    this.userID = sessionStorage.getItem('user');
    console.log(this.userID);
  }
  
  ngOnInit(): void {
    let refString = ('users/' + this.userID + '/' + this.name);
    this.database.ref(refString).on('value', (data) => {
      let quiz = data.val();
      let questions = Object.keys(quiz);
      
      questions.forEach(question => {
        this.questionList.push(quiz[question].q);
        this.answerList.push(quiz[question].a);
      });
      this.questionToCard = this.questionList[0];
      this.answerToCard = this.answerList[0];

    });

  }
  
  public correctOnClick(){
    if(this.questionList.indexOf(this.questionToCard) >= this.questionList.length - 1) {
      this.scoreValue++;
      this.isElementVisible = false;

    } else {
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
    this.questionToCard = this.questionList[0];
    this.answerToCard = this.answerList[0];
    this.scoreValue = 0;
    this.isElementVisible = true;

  }
}



