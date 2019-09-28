import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface UploadEvent {
  message: string;
  status: number;
  _id?: string;
}
@Injectable({
  providedIn: 'root'
})
export class StudentServices {

  PRODUCTION_HEROKU = 'https://mlm-api.herokuapp.com'

  PRODUCTION_URL = 'http://13.232.193.81:4000';
  DEVELOPMENT_URL = 'http://localhost:4000'
  CURRENT_URL = this.PRODUCTION_HEROKU;


  constructor(private http: HttpClient) { }

  registerStudent(payload) {
    return this.http.post<UploadEvent>(`${this.CURRENT_URL}/api/student/register-student`, payload)
      .pipe(map(response => response))
  }

  getAllStudents() {

    return this.http.get(`${this.CURRENT_URL}/api/office/getAllStudents`).pipe(map(res => res));
  }

}
  // getDetailsGeneralRoute(endpoint, payload) {
  //   return this.http.post<UploadEvent>(`${this.CURRENT_URL}/api/office/${endpoint}`, payload)
  //     .pipe(map(response => response))
  // }

