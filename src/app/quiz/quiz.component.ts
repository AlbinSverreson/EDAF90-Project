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
  public QnACounter = 0; //koppla till user?

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
  
  onSubmit() {
    let formData = this.profileForm.value.get(this.QnAs);
    let qcounter = this.questionCounter;
    let userQnACounter = this.QnACounter;

    //this.questionCounter++;
    //if(this.questionCounter>4){
       // this.QnACounter++;
        //this.questionCounter=0;
   // }

    this.clearForm(); //funkar inte att ha den längst ner idk why

    let questions: string [] = [];
    let answers: string [] = [];

    formData.array.forEach(element => {
      if (questions == null) {
        questions = element[0];
      } 
      questions.push(element[0]);

      if (answers == null) {
        answers = element[1];
      } 
      answers.push(element[1]);
    });
  

    let userID = sessionStorage.getItem('user');
    this.database.ref('users/' + userID + '/' + "quiz" + userQnACounter + '/' + "question" + qcounter).set({
       q : questions,
        a : answers
    })
    
}

}
