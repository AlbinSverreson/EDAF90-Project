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

    ngOnInit(): void {
    }

    profileForm = this.fb.group({
        question: [''],
        answer: [''],
    });

    constructor(private fb: FormBuilder) { }

      onSubmit() {
        // TODO: Use EventEmitter with form value
        let q = this.profileForm.value.question;
        let a = this.profileForm.value.answer;
        this.database.ref('users/' + 32).set({
            q : a
        })
      }
}