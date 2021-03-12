import { Router } from '@angular/router';
import { QuizOverviewComponent } from './../quiz-overview/quiz-overview.component';
import { Component, Input, OnInit } from '@angular/core';
//import { FlashCardComponent } from './flash-card/flash-card.component';
import { AuthService } from "../auth.service";
import 'firebase/database';
import firebase from 'firebase/app';



/* //hämta lista från quiz-overview
const questions = ["test 1", "test 2", "test 3", "test 4"];
//hämta lista från quiz-overview
const answers = ["Svar 1", "svar 2", "svar 3", "svar 4"]; */



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
    this.name = this.router.getCurrentNavigation()?.extras.state?.name;
    this.userID = sessionStorage.getItem('user');
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
      // questions.forEach(question =>{
      //   this.database.ref(refString + '/' + question).on('value', (data2) =>{
      //     let qstNbr = data2.val();
      //     // console.log("här nu  " + Object.keys(qstNbr)[0])
      //     this.questionList.push(Object.keys(qstNbr)[0]);
      //     this.answerList.push(Object.keys(qstNbr)[1]);
      //   })

      // });

    });
    // console.log("frågor" + this.questionList)

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



