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
import { ChatComponent } from './components/Admin/chat/chat.component';
import { LoginComponent } from './components/Authentification/login/login.component';
import { TeachersComponent } from './components/Admin/teachers/teachers.component';
import { AssignmentComponent } from './components/Admin/assignment/assignment.component';
import { AnswersComponent } from './components/Admin/answers/answers.component';
import { MediasComponent } from './components/Admin/medias/medias.component';

const routes: Routes = [
  // { path: '', component: StatisticsComponent},
  { path: '', component: ContenuComponent},
  { path: 'levels', component: LevelsComponent},
  { path: 'subjects', component: SubjectsComponent},
  { path: 'questions', component: QuestionsComponent },
  { path: 'quizzs', component: QuizComponent},
  { path: 'quizList', component: QuizListComponent},
  { path: 'playQuiz/:id', component: PlayQuizComponent},
  { path: 'validation', component: ValidQuestionComponent },
  // { path: 'chat', component: ChatComponent}
  { path: 'login', component: LoginComponent},
  { path: 'teachers', component: TeachersComponent},
  { path: 'assignments', component: AssignmentComponent},
  { path: 'answers', component: AnswersComponent},
  { path: 'medias', component: MediasComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
