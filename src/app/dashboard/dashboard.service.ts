import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log, Task } from './dashboard.model';
import { Observable } from 'rxjs';
import { baseUrl } from './dashboard.config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getLogs() : Observable<Log[]> {
    return this.http
    .get<Log[]>(`${baseUrl}/log`);
  }

  filterLogs(id: number) : Observable<Log[]> {
    return this.http.get<Log[]>(`${baseUrl}/log?taskId=${id}`)
  }

  getTasks() : Observable<Task[]> {
    return this.http
    .get<Task[]>(`${baseUrl}/task`);
  }

  createLog(log: Log): Observable<Log[]> {
    return this.http
    .post<Log[]>(`${baseUrl}/log`, log);
  }

  search(term: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}/task?name=${term}`);
  }
}
