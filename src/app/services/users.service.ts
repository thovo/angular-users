import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { UserPagination } from '@models/user-pagination.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  #httpClient = inject(HttpClient);

  getUsers(): Observable<UserPagination> {
    return this.#httpClient
      .get<UserPagination>('https://dummyjson.com/users?limit=0')
      .pipe(shareReplay(1));
  }
}
