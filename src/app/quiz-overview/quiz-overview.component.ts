import { DoQuizComponent } from './../do-quiz/do-quiz.component';
import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
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

export class QuizOverviewComponent implements OnInit{
  
  @Input() quizes: any;
  @Output() activeQuiz: any;
  userId: any;
  db: any;

  constructor(private router: Router, public authService: AuthService) {
    this.quizes = [];
    this.userId = sessionStorage.getItem('user');
    this.db = firebase.database();  
    
    let ref = this.db.ref('users/' + this.userId);
    ref.on('value', (data) => {
      let user = data.val();
      let userQuizes = Object.keys(user);
      
      for(let i = 0; i < userQuizes.length; i++) {
        this.quizes.push(userQuizes[i]);
        console.log(this.quizes);
      }
      sessionStorage.setItem('Names', JSON.stringify(this.quizes));    
      console.log(this.quizes);
    })
    
  }
  
  ngOnInit(): void {
    //sessionStorage.setItem('Names', JSON.stringify(this.quizes));
  }



  takeQuiz(quiz) {
      this.activeQuiz = quiz;
      /* console.log("quiz = " + quiz);
      console.log("activequiz = " + this.activeQuiz); */
/*       this.router.navigateByUrl('/do-quiz', {
        state: {name: this.activeQuiz}
      }); */
      sessionStorage.setItem('ActiveQuiz', this.activeQuiz);
      this.router.navigateByUrl('/do-quiz');
  };

  removeQuiz(quiz) {
    this.db.ref('users/' + this.userId + "/" + quiz).remove();
    window.location.reload();
  }

}
