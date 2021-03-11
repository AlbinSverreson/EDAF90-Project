import  firebase  from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import "firebase/database";
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'


@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
  public database = firebase.database();
  public questionCounter = 0;
  public QnACounter = 0; //koppla till user?
  private names: String[] = [];

  ngOnInit(): void {
  }

  name = 'Angular';

  profileForm: FormGroup;
   
  constructor(private fb:FormBuilder, public authService: AuthService, private router: Router) {

    this.profileForm = this.fb.group({
      name: '',
      QnAs: this.fb.array([]) 
    });
  }
 
  QnAs() : FormArray {
    return this.profileForm.get("QnAs") as FormArray
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      question: '',
      answer: '',
    })
  }

  addQuestion() {
    this.QnAs().push(this.newQuestion());
    this.questionCounter++;
  }

  removeQuestion(i:number) {
    this.QnAs().removeAt(i);
    this.questionCounter--;
  }

  clearForm(){
    this.profileForm = this.fb.group({
        name: '',
        QnAs: this.fb.array([]) 
      });
    this.questionCounter = 0;
    
   }

   getName(quizName){
      return this.names.includes(quizName);
   }
   
   onSubmit() {
    let userID = sessionStorage.getItem('user');
    let quizName = this.profileForm.value.name;

    if (!this.getName(quizName)){
      for(let i = 0; i<this.questionCounter;i++){
        this.database.ref('users/' + userID + '/' + quizName + '/' + "question" + (i+1)).set({
          q : this.profileForm.value.QnAs[i].question,
          a : this.profileForm.value.QnAs[i].answer
        })    
      }
      this.names.push(quizName)
      this.clearForm();
      this.router.navigateByUrl('/quiz-overview');
    } else {
      alert("You already have a quiz with that name");
    }
    }

}
