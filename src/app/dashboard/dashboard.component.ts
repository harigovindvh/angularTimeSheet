import { Component } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';

import { Log, Task } from './dashboard.model';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  start: string = '';
  end: string = '';
  task: Task = {
    id: '',
    createdAt: '',
    name: '',
  };
  logs: Log[] = [];
  taskList: Task[] = [];
  selectedTaskId: number | null = null;

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit() {
    this.getLogs();
    this.getTasks();
  }

  getTasks(): void {
    this._dashboardService.getTasks().subscribe((data) => {
      this.taskList = data;
    });
  }

  getLogs(): void {
    this._dashboardService.getLogs().subscribe((data) => {
      this.logs = data;
    });
  }

  filterLogs(): void {
    if (this.selectedTaskId) {
      this._dashboardService
        .filterLogs(this.selectedTaskId)
        .subscribe((data) => {
          this.logs = data;
        });
    }
  }

  onSubmit(): void {
    const log = {
      task: this.task,
      start: this.start,
      end: this.end,
    };

    this._dashboardService.createLog(log).subscribe(
      (response) => {
        this.logs.push(response as Log);
      },
      (error) => {
        //should be a notification to the user
        throw error;
      }
    );
  }

  /**
   * Helper functions
   * @param text$ search key
   * @returns Task list
   */
  search = (text$: Observable<string>): Observable<Task[]> =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) =>
        term.length < 2
          ? of([])
          : this._dashboardService.search(term).pipe(catchError(() => of([])))
      )
    );

  formatter = (x: { name: string }) => x.name;
}
