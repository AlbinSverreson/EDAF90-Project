import  firebase  from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import "firebase/database";
import { CloseScrollStrategy } from '@angular/cdk/overlay';

import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'


@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {
public database = firebase.database();
  public questionCounter = 0;
  public QnACounter = 0;

  ngOnInit(): void {
  }

  name = 'Angular';

  profileForm: FormGroup;
   
  constructor(private fb:FormBuilder) {

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
  }

  removeQuestion(i:number) {
    this.QnAs().removeAt(i);
  }
  
  onSubmit() {
    let question = this.profileForm.value.question;
    let answer = this.profileForm.value.answer;
    let userID = sessionStorage.getItem('user');
    this.database.ref('users/' + userID + '/' + "quiz" + this.QnACounter + '/' + "question" + this.questionCounter).set({
       q : question,
        a : answer
    })
    this.questionCounter++;
    if(this.questionCounter>4){
        this.QnACounter++;
        this.questionCounter=0;
    }
}

}
