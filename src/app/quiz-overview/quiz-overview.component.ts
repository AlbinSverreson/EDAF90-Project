import { Component, OnInit, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import 'firebase/database';


@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.css'],
  host: { '[class]': 'quiz' },
})


// const rootQuiz = document.getElementById("show-quiz");

export class QuizOverviewComponent implements OnInit {
  
  constructor(private renderer: Renderer2) {
  }
  
  ngOnInit(): void {
    const userId = sessionStorage.getItem('user');
    const db = firebase.database();  
    
    let ref = db.ref('users/' + userId);
    ref.on('value', readUserQuizes);

    function readUserQuizes(data: any) {
      const rootQuiz = document.getElementById("show-quiz");
      let user = data.val();
      let quizes = Object.keys(user);
      console.log(quizes);
      for(let i = 0; i < quizes.length; i++){
        createQuizBox(rootQuiz, data, i);
      }
      console.log(rootQuiz);
      }
      
    function createQuizBox(root, data: any, index) {
      const div = document.createElement("div");
      div.textContent = "Quiz " + index;
      div.classList.add("show-quiz");
      root.appendChild(div);
    }
  }
  
}


