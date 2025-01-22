import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { UserPagination } from '@models/user-pagination.model';

describe('UsersService', () => {
  let service: UsersService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UsersService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user pagination', () => {
    // GIVEN
    const mockData: UserPagination = {} as UserPagination;

    // WHEN
    service.getUsers().subscribe((userPagination) => {
      // THEN
      expect(userPagination).toEqual(mockData);
    });

    // THEN
    const req = httpTesting.expectOne(`https://dummyjson.com/users?limit=0`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
