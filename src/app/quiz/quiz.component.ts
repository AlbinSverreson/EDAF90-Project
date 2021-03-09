import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

    ngOnInit(): void {
    }

    profileForm = this.fb.group({
        firstName: [''],
        lastName: [''],
    });

    constructor(private fb: FormBuilder) { }
    
    //name = new FormControl('');
    //updateName() {
    //this.name.setValue('Nancy');
    //}

    //profileForm = new FormGroup({
        //firstName: new FormControl(''),
        //lastName: new FormControl(''),
    //});

      onSubmit() {
        // TODO: Use EventEmitter with form value
        console.warn(this.profileForm.value);
      }
}