import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import * as ChatActions from '../actions/chat.actions';


@Injectable()
export class ChatEffects {

    constructor(
        private actions$: Actions,
        private chatService: ChatService
    ) { }

    loadLevels$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ChatActions.loadChats),
            exhaustMap(() => {
                return this.chatService.getChats().pipe(
                    tap(chats => console.log('Received chats in effect:', chats)),
                    map((chats) => ChatActions.loadChatsSuccess({ chats })),
                    catchError((error) => {
                        console.error('Error fetching chats:', error);
                        return of(ChatActions.loadChatsFailure({ error }));
                    })
                );
            })
        );
    });
    

}
