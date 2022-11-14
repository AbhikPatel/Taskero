import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { taskModule } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public api:string;
  constructor(private http:HttpClient) { 
    this.api = environment.baseURL
  }

  public updateTaskData(data:taskModule, id:number):Observable<taskModule>{
    return this.http.put<taskModule>(`${this.api}/task/${id}`, data)
  }
}
