import  firebase  from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import "firebase/database";
import { CloseScrollStrategy } from '@angular/cdk/overlay';


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

    profileForm = this.fb.group({
        question: [''],
        answer: [''],
    });

    constructor(private fb: FormBuilder) { }

    addQuestion(){
        console.log('här nu');
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