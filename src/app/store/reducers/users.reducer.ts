import { createReducer, on } from '@ngrx/store';
import {User} from '@models/user.model';
import * as UserActions from '@store/actions/users.action';


export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  searchQuery: ''
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null
  })),
  on(UserActions.loadUsersError, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.sortUsers, (state, { sortBy }) => ({
    ...state,
    users: [...state.users].sort((a, b) =>
      a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0
    )
  })),
  on(UserActions.searchUsers, (state, { searchQuery }) => ({
    ...state,
    searchQuery,
    users: state.users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }))
);
