import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';
import { Task } from './task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  start: string = '';
  end: string = '';
  task: string = '';
  logs: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any[]>('https://63d74fd85c4274b136f1fda5.mockapi.io/api/v1/log')
      .subscribe((data) => {
        this.logs = data;
      });
  }

  onSubmit() {
    const log = {
      task: this.task,
      start: this.start,
      end: this.end,
    };

    this.http
      .post('https://63d74fd85c4274b136f1fda5.mockapi.io/api/v1/log', log)
      .subscribe((response) => {
        this.logs.push(response);
      });
  }

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term =>term.length<2 ? of([]) : this.http.get<Task[]>(`https://63d74fd85c4274b136f1fda5.mockapi.io/api/v1/task?name=${term}`).pipe(
      map(response => response.map(responseItem => responseItem.name) || []),
      catchError(() => of([]))
    )
    ))
}
