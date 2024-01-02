import { ActionReducerMap } from '@ngrx/store';
import * as fromLevel from './level.reducer';
import * as fromSubject from './subject.reducer';
import * as fromQuestion from './question.reducer';
import * as fromQuiz from './quiz.reducer';
import * as fromAnswer from './answer.reducer';
import * as fromTeacher from './Teacher.reducer';
import * as fromAssignment from './assignment.reducer';
import * as fromMedia from './media.reducer';

export { fromLevel, fromSubject, fromQuiz, fromAnswer, fromTeacher, fromAssignment, fromMedia };

export interface AppState {
    levels: fromLevel.LevelState;
    subjects: fromSubject.SubjectState;
    questions: fromQuestion.QuestionState;
    quizzs: fromQuiz.QuizState;
    answers: fromAnswer.AnswerState,
    teachers: fromTeacher.TeacherState,
    assignments: fromAssignment.AssignmentState,
    medias: fromMedia.MediaState
}

export const reducers: ActionReducerMap<AppState> = {
    levels: fromLevel.levelReducer,
    subjects: fromSubject.subjectReducer,
    questions: fromQuestion.questionReducer,
    quizzs: fromQuiz.quizReducer,
    answers: fromAnswer.answerReducer,
    teachers: fromTeacher.teacherReducer,
    assignments: fromAssignment.assignmentReducer,
    medias: fromMedia.mediaReducer
};