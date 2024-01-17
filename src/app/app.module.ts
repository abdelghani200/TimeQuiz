import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LevelsComponent } from './components/Admin/levels/levels.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { LevelEffects } from './store/effects/levels.effects';
import { levelReducer } from './store/reducers/level.reducer';
import { SidebarComponent } from './components/Admin/sidebar/sidebar.component';
import { StatisticsComponent } from './components/Admin/statistics/statistics.component';
import { FormCommunComponent } from './shared/Form/form-commun/form-commun.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectsComponent } from './components/Admin/subjects/subjects.component';
import { subjectReducer } from './store/reducers/subject.reducer';
import { SubjectEffects } from './store/effects/subjects.effects';
import { QuestionsComponent } from './components/Admin/questions/questions.component';
import { questionReducer } from './store/reducers/question.reducer';
import { QuestionEffects } from './store/effects/questions.effects';
import { QuizComponent } from './components/Admin/quiz/quiz.component';
import { quizReducer } from './store/reducers/quiz.reducer';
import { QuizEffects } from './store/effects/quiz.effects';
import { HomeComponent } from './components/Users/home/home.component';
import { ContenuComponent } from './components/Users/contenu/contenu.component';
import { FooterComponent } from './components/Users/footer/footer.component';
import { QuizListComponent } from './components/Users/quiz-list/quiz-list.component';
import { PlayQuizComponent } from './components/Users/play-quiz/play-quiz.component';
import { validationReducer } from './store/reducers/validation.reducer';
import { ValidationEffects } from './store/effects/validation.effects';
import { questionAndQuizReducer } from './store/reducers/questionQuiz.reducer';
import { QuestionQuizEffects } from './store/effects/questionQuiz';
import { ValidQuestionComponent } from './components/Admin/valid-question/valid-question.component';
import { AnswersComponent } from './components/Admin/answers/answers.component';
import { answerReducer } from './store/reducers/answer.reducer';
import { AnswerEffects } from './store/effects/answers.affects';
import { QuestionToQuizComponent } from './components/Admin/question-to-quiz/question-to-quiz.component';
import { ListValidationsComponent } from './components/Admin/list-validations/list-validations.component';
import { ChatComponent } from './components/Admin/chat/chat.component';
import { chatReducer } from './store/reducers/chat.reducer';
import { ChatEffects } from './store/effects/chats.effects';
import { LoginComponent } from './components/Authentification/login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { teacherReducer } from './store/reducers/Teacher.reducer';
import { TeacherEffects } from './store/effects/teacher.effects';
import { TeachersComponent } from './components/Admin/teachers/teachers.component';
import { AssignmentComponent } from './components/Admin/assignment/assignment.component';
import { assignmentReducer } from './store/reducers/assignment.reducer';
import { AssignmentEffects } from './store/effects/assignment.effects';
import { MediasComponent } from './components/Admin/medias/medias.component';
import { mediaReducer } from './store/reducers/media.reducer';
import { MediaEffects } from './store/effects/media.effects';
import { RoomsComponent } from './components/Admin/chat/rooms/rooms.component';
import { responseReducer } from './store/reducers/reponse.reducer';
import { ResponseEffects } from './store/effects/reponse.effects';
import { FormQuestionComponent } from './shared/Form/form-question/form-question.component';



@NgModule({
  declarations: [
    AppComponent,
    LevelsComponent,
    SidebarComponent,
    StatisticsComponent,
    FormCommunComponent,
    SubjectsComponent,
    QuestionsComponent,
    QuizComponent,
    HomeComponent,
    ContenuComponent,
    FooterComponent,
    QuizListComponent,
    PlayQuizComponent,
    ValidQuestionComponent,
    AnswersComponent,
    QuestionToQuizComponent,
    ListValidationsComponent,
    ChatComponent,
    LoginComponent,
    PaginationComponent,
    TeachersComponent,
    AssignmentComponent,
    MediasComponent,
    RoomsComponent,
    FormQuestionComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature('levels', levelReducer),
    StoreModule.forFeature('subjects', subjectReducer),
    StoreModule.forFeature('questions', questionReducer),
    StoreModule.forFeature('quizzs', quizReducer),
    StoreModule.forFeature('questionsAndQuiz', questionAndQuizReducer),
    StoreModule.forFeature('validation', validationReducer),
    StoreModule.forFeature('answers', answerReducer),
    StoreModule.forFeature('chats', chatReducer),
    StoreModule.forFeature('teachers', teacherReducer),
    StoreModule.forFeature('assignments', assignmentReducer),
    StoreModule.forFeature('medias', mediaReducer),
    StoreModule.forFeature('responses', responseReducer),
    EffectsModule.forRoot([LevelEffects, SubjectEffects, QuestionEffects, QuizEffects, ValidationEffects, QuestionQuizEffects, AnswerEffects, ChatEffects, TeacherEffects, AssignmentEffects, MediaEffects, ResponseEffects]),
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
