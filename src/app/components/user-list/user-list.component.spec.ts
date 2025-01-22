import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '@models/user.model';
import { UserState } from '@store/reducers/users.reducer';
import { provideMockStore } from '@ngrx/store/testing';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  const initialState: UserState = {
    error: null,
    loading: false,
    searchQuery: '',
    users: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent, BrowserAnimationsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign search value into dataSource and go back to first page', () => {
    // GIVEN
    component.dataSource = {
      filter: '',
      filterPredicate: jest.fn(),
      paginator: {
        firstPage: jest.fn(),
      },
    } as unknown as MatTableDataSource<User>;
    const event = { target: { value: 'test' } } as unknown as Event;

    // WHEN
    component.search(event);

    // THEN
    expect(component.dataSource.filter).toBe('test');
    expect(component.dataSource.paginator?.firstPage).toHaveBeenCalled();
  });

  it('should filter users correctly', () => {
    // GIVEN
    const user: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      address: {
        address: '',
        city: '',
        coordinates: {
          lat: 0,
          lng: 0,
        },
        country: '',
        state: '',
        stateCode: '',
      },
    };

    // WHEN
    const result1 = component.filterData(user, 'john');
    const result2 = component.filterData(user, 'doe');
    const result3 = component.filterData(user, 'Smith');

    // THEN
    expect(result1).toBeTruthy();
    expect(result2).toBeTruthy();
    expect(result3).toBeFalsy();
  });
});
