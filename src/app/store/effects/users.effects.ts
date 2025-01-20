import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {UsersService} from '@services/users.service';
import * as UserActions from '@store/actions/users.action';



@Injectable()
export class UsersEffects {
  #actions = inject(Actions);
  #usersService = inject(UsersService);

  loadUsers = createEffect(() =>
    this.#actions.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.#usersService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UserActions.loadUsersError({ error: error.message }))
          )
        )
      )
    )
  );
}
