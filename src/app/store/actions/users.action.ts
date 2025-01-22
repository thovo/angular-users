import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>(),
);
export const loadUsersError = createAction('[User] Load Users Error', props<{ error: string }>());
