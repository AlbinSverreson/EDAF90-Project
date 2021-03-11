import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AuthService } from "../auth.service";
import 'firebase/database';


@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrls: ['./quiz-overview.component.css'],
  host: { '[class]': 'quiz' },
})


// const rootQuiz = document.getElementById("show-quiz");

export class QuizOverviewComponent implements OnInit {
  
  @Input() quizes: any;



  constructor(private router: Router, public authService: AuthService) {
    this.quizes = [];
  }
  
  ngOnInit(): void {
    const userId = sessionStorage.getItem('user');
    const db = firebase.database();  
    
    let ref = db.ref('users/' + userId);
    ref.on('value', (data) => {

      const rootQuiz = document.getElementById("show-quiz");
      let user = data.val();
      let test = { quiz: data.val()};
      let userQuizes = Object.keys(user);
      
  

      for (let prop in user) {
        if (user.hasOwnProperty(prop)) {
           let innerObj = {};
           innerObj[prop] = user[prop];
           this.quizes.push(innerObj);
        }
     }
      
      console.log(   data.val()  );
      console.log(   userQuizes[0]   );
      console.log(   this.quizes  );
      // for(let i = 0; i < this.quizes.length; i++){
      //   createQuizBox(rootQuiz, data, i);
      // }
    });
    
    // console.log(ref.on('value', readUserQuizes))

    // const readUserQuizes = (data: any) => {
      // const rootQuiz = document.getElementById("show-quiz");
      // let user = data.val();
      // this.quizes = data.val();
      // let quizes = Object.keys(user);
      // console.log(user);
      // for(let i = 0; i < quizes.length; i++){
      //   createQuizBox(rootQuiz, data, i);
      // }
      // console.log(rootQuiz);
    // }
      
    // function createQuizBox(root, data: any, index) {
    //   const div = document.createElement("div");
    //   div.textContent = "Quiz " + index;
    //   div.classList.add("show-quiz");
    //   const button = document.createElement("button");
    //   button.innerHTML = "Take Quiz";
    //   div.appendChild(button);
    //   root.appendChild(div);


    // }
  }
  takeQuiz() {
    this.router.navigateByUrl('/do-quiz');
  };
}


