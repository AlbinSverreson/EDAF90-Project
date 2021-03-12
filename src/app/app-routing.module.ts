import { QuizOverviewComponent } from './quiz-overview/quiz-overview.component';
import { DoQuizComponent } from './do-quiz/do-quiz.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {path: 'quiz', component: QuizComponent},
  {path: 'do-quiz', component: DoQuizComponent},
  {path: 'quiz-overview', component: QuizOverviewComponent},
  {path: '', redirectTo: '/quiz-overview', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
