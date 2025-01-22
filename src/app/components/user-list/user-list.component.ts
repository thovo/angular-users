import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { UsersService } from '@services/users.service';
import { User } from '@models/user.model';
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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-user-list',
  imports: [
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
    MatProgressBar,
    MatList,
    MatListItem,
    MatSortModule,
  ],
  templateUrl: './user-list.component.html',
  standalone: true,
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements AfterViewInit {
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
      this.dataSource.filterPredicate = this.filterData;
    });
  }

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

  filterData(data: User, filterValue: string): boolean {
    const trimValue = filterValue.trim().toLowerCase();
    return (
      data.firstName.toLowerCase().includes(trimValue) ||
      data.lastName.toLowerCase().includes(trimValue)
    );
  }
}
