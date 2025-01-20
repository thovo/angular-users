import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '@services/users.service';
import { Observable, of } from 'rxjs';
import { User } from '@models/user.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-user-list',
  imports: [
    MatProgressSpinner,
    MatTable,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatNoDataRow,
    MatPaginator,
    MatSort,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  templateUrl: './user-list.component.html',
  standalone: true,
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit, AfterViewInit {
  usersObservable: Observable<User[]> = of([]);
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'address'];
  dataSource!: MatTableDataSource<User>;
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  #userService = inject(UsersService);

  constructor() {
    this.#userService.getUsers().subscribe((userPagination) => {
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(userPagination.users);
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.paginator && this.sort && this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  search(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
