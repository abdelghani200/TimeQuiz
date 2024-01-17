import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LevelsComponent } from './components/Admin/levels/levels.component';
import { StatisticsComponent } from './components/Admin/statistics/statistics.component';
import { SubjectsComponent } from './components/Admin/subjects/subjects.component';
import { QuestionsComponent } from './components/Admin/questions/questions.component';
import { QuizComponent } from './components/Admin/quiz/quiz.component';
import { ContenuComponent } from './components/Users/contenu/contenu.component';
import { QuizListComponent } from './components/Users/quiz-list/quiz-list.component';
import { PlayQuizComponent } from './components/Users/play-quiz/play-quiz.component';
import { ValidQuestionComponent } from './components/Admin/valid-question/valid-question.component';
import { LoginComponent } from './components/Authentification/login/login.component';
import { TeachersComponent } from './components/Admin/teachers/teachers.component';
import { AssignmentComponent } from './components/Admin/assignment/assignment.component';
import { AnswersComponent } from './components/Admin/answers/answers.component';
import { MediasComponent } from './components/Admin/medias/medias.component';
import { TeacherAuthGuard } from './services/auth/guards/teacher-auth-guard.service';

const routes: Routes = [
  { path: '', component: ContenuComponent},
  { path: 'statistics', redirectTo: '/statistics', pathMatch: 'full' },
  { path: 'statistics', component: StatisticsComponent, canActivate: [TeacherAuthGuard] },
  { path: 'levels', component: LevelsComponent, canActivate: [TeacherAuthGuard]},
  { path: 'subjects', component: SubjectsComponent, canActivate: [TeacherAuthGuard]},
  { path: 'questions', component: QuestionsComponent, canActivate: [TeacherAuthGuard]},
  { path: 'quizzs', component: QuizComponent, canActivate: [TeacherAuthGuard]},
  { path: 'quizList', component: QuizListComponent},
  { path: 'playQuiz/:assignQuizId', component: PlayQuizComponent, },
  { path: 'validation', component: ValidQuestionComponent },
  { path: 'teachers', component: TeachersComponent, canActivate: [TeacherAuthGuard]},
  { path: 'assignments', component: AssignmentComponent},
  { path: 'answers', component: AnswersComponent, canActivate: [TeacherAuthGuard]},
  { path: 'medias', component: MediasComponent, canActivate: [TeacherAuthGuard]},
  { path: 'login', component: LoginComponent},
  
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
