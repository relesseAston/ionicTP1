import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  api_url = 'http://localhost:3000/';

  constructor(private http : HttpClient) { }

  async findAll(): Promise<any> {
    return this.http.get<any>(this.api_url+'students').toPromise();
  }

  findById(studentId: number): Promise<any> {
    return this.http.get<any>(this.api_url+'students/'+studentId).toPromise();
  }
}
