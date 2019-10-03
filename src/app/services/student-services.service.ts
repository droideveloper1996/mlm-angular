import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface StudentResponse {
  studentFirstName: string;
  adhaarNumber: string;
  admissionType: string;
  boardRollNo: string;
  boardType: string;
  conveyance: string;
  created_At: string;
  date: string;
  dateOfAdmission: string;
  dateOfBirth: string;
  disability: string;
  gender: string;
  medium: string;
  password: string;
  primaryMobile: number;
  profilePictureRef: string;
  registeredBy: string;
  religion: string;
  secondaryMobile: number;
  signatureRef: string;
  studentID: string;
  studentLastName: string;
  updated_At: string;
  wingType: string;
  __v: 0
  _id: string;
  section: string;
  class: string;
  personalDetail: custom;
  stream: string;
  previousBalance: string;

}

interface custom {
  address: string;
  category: string;
  fatherName: string;
  guardianName: string;
  guardianRelation: string;
  motherName: string;
  subCategory: string;
}

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

  getStudentById(payload) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let params = new HttpParams().set("studentID", payload)
    return this.http.get<StudentResponse>(`${this.CURRENT_URL}/api/office/getStudentById`, {
      headers: headers, params: params
    }).pipe(map(res => res));
  }

}
  // getDetailsGeneralRoute(endpoint, payload) {
  //   return this.http.post<UploadEvent>(`${this.CURRENT_URL}/api/office/${endpoint}`, payload)
  //     .pipe(map(response => response))
  // }

