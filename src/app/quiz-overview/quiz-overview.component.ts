import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import 'firebase/database';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.css'],
  
})



export class QuizOverviewComponent implements OnInit {
  
  constructor() {
    
    const userId = sessionStorage.getItem('user');
    const db = firebase.database();  

    let ref = db.ref('users/' + userId);
    ref.on('value', readUserQuizes);
  
  }
  
  ngOnInit(): void {
  }
  
}

function readUserQuizes(data: any) {
  console.log(data.val());

}

