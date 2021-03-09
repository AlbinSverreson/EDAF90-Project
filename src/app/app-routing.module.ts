import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  {path: 'menubar', component: MenuBarComponent},
  {path: 'quiz', component: QuizComponent},
  {path: '', redirectTo: '/menubar', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
