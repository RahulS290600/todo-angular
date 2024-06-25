import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, CommonModule,MatIconModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  displayedColumns: string[] = ['select', 'id', 'todo', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>([]); // Initialize with an empty array
  selection = new SelectionModel<any>(true, []);

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.fetchTodos().subscribe(
      (res: any) => {
        console.log(res);
        this.dataSource.data = res.todos; // Adjust this based on the actual structure of your API response
        // Automatically select completed todos
        res.todos.forEach((todo: any) => {
          if (todo.completed) {
            this.selection.select(todo);
          }
        });
      },
      (error: any) => {
        console.error('Error fetching todos', error);
      }
    );
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onRowClick(row: any): void {
    if (!row.completed) {
      this.selection.toggle(row);
    }
  }
}
