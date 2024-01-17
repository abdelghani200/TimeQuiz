import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, EMPTY } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat/chat.service';
import * as ChatActions from '../actions/chat.actions';


@Injectable()
export class ChatEffects {

    constructor(
        private actions$: Actions,
        private chatService: ChatService
    ) { }

    // loadChats$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(ChatActions.loadChats),
    //         exhaustMap(() => {
    //             return this.chatService.getChats().pipe(
    //                 tap(chats => console.log('Received chats in effect:', chats)),
    //                 map((chats) => ChatActions.loadChatsSuccess({ chats })),
    //                 catchError((error) => {
    //                     console.error('Error fetching chats:', error);
    //                     return of(ChatActions.loadChatsFailure({ error }));
    //                 })
    //             );
    //         })
    //     );
    // });

    // loadSelectedStudentChat$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(ChatActions.selectStudent),
    //         mergeMap(action => {
    //             const studentId = action.studentId;

    //             return this.chatService.getChatById(studentId).pipe(
    //                 map(chats => ChatActions.loadChatsSuccess({ chats })),
    //                 catchError(error =>
    //                     of(ChatActions.loadChatsFailure({ error }))
    //                 )
    //             );
    //         })
    //     );
    // });

    // sendMessage$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(ChatActions.sendMessage),
    //         exhaustMap((action) => {
    //             const message = action.message;

    //             return this.chatService.sendMessage(message).pipe(
    //                 tap(() => console.log('Message sent in effect:', message)),
    //                 map(() => ChatActions.sendMessageSuccess({ message })),
    //                 catchError((error) => {
    //                     console.error('Error sending message:', error);
    //                     return of(ChatActions.sendMessageFailure({ error }));
    //                 })
    //             );
    //         })
    //     );
    // });

    sendMessage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(ChatActions.sendMessage),
                tap(({ message }) => {
                    this.chatService.sendMessage(message);
                }),
                catchError(() => of({ type: 'SEND_MESSAGE_ERROR' }))
            ),
        { dispatch: false }
    );

    receiveMessage$ = createEffect(() =>
        this.chatService.listenForMessages().pipe(
            map((message) => ChatActions.receiveMessage({ message }))
        )
    );

}
