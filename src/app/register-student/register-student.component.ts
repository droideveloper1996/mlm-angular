import { StudentServices } from './../services/student-services.service';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType } from '@angular/common/http';

import { Form } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface UploadEvent {
  message: string;
  status: number;
  _id?: string;
}
@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {

  PRODUCTION_URL = 'http://13.232.193.81:4000';
  PRODUCTION_HEROKU = 'https://mlm-api.herokuapp.com'
  STAGING_URL = 'http://localhost:4000'
  hasErrorOccured = false;
  successfulSubmission = false;

  ACTIVE_URL = this.PRODUCTION_HEROKU;

  password = 'MLM1234'
  progress
  selectedStudentPictureFile: File = null
  selectedStudentSignatureFile: File = null
  photo_id;
  signature_id;
  pictureUploaded = false;
  signatureUploaded = false;
  sign_status;
  pic_status;
  errorOccured;
  headers = new HttpHeaders().set('Content-Type', 'application/json')
    .set('authorization', 'Bearer ' + "token");

  constructor(private http: HttpClient, private studentService: StudentServices,
    public dialog: MatDialog) { }

  ngOnInit() {
    // this.http.post('http://localhost:4000/test-route', { name: 'Abhishek Kushwaha' }, {
    //   headers: this.headers,
    //   reportProgress: true,
    //   observe: 'events'
    // }).subscribe(event => {
    //   console.log(event)
    // })
  }

  selectStudentPicture(file) {
    console.log(file)
    this.selectedStudentPictureFile = file.target.files[0];
    this.uploadImage();
  }
  selectStudentSignature(event) {
    this.selectedStudentSignatureFile = event.target.files[0];
    this.uploadSignature();
  }

  uploadImage() {
    const fd = new FormData();
    fd.append('image', this.selectedStudentPictureFile, this.selectedStudentPictureFile.name)
    this.http.post<UploadEvent>(`${this.ACTIVE_URL}/upload`, fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else {
        if (event.type == HttpEventType.Response) {
          this.photo_id = event.body._id;
          this.pictureUploaded = true;
          this.pic_status = event.body.status;
        }
      }
    })
  }

  uploadSignature() {
    const fd = new FormData();
    fd.append('image', this.selectedStudentSignatureFile, this.selectedStudentSignatureFile.name)
    this.http.post<UploadEvent>(`${this.ACTIVE_URL}/upload`, fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type == HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else {
        if (event.type == HttpEventType.Response) {
          this.signature_id = event.body._id;
          this.signatureUploaded = true;
          this.sign_status = event.body.status;
          console.log(event)
        }
      }
    })
  }


  registerStudent(form) {
    const token = localStorage.getItem('auth-token');
    var studentObject = form.value;
    var personalDetail = {
      category: studentObject.category,
      subCategory: studentObject.subCategory,
      fatherName: studentObject.fatherName,
      motherName: studentObject.motherName,
      guardianName: studentObject.guardianName,
      guardianRelation: studentObject.guardianRelation,
      address: studentObject.address
    }

    var payload = {
      profilePictureRef: this.photo_id,
      primaryMobile: studentObject.primaryMobile,
      secondaryMobile: studentObject.secondaryMobile,
      signatureRef: this.signature_id,
      religion: studentObject.religion,
      medium: studentObject.medium,
      boardType: studentObject.boardType,
      wingType: studentObject.wingType,
      boardRollNo: studentObject.boardRollNo,
      dateOfBirth: (studentObject.dateOfBirth.year + "-" + studentObject.dateOfBirth.month + "-" + studentObject.dateOfBirth.day),
      studentID: studentObject.studentID,
      password: studentObject.password,
      gender: studentObject.gender,
      dateOfAdmission: (studentObject.dateOfAdmission.year + "-" + studentObject.dateOfAdmission.month + "-" + studentObject.dateOfAdmission.day),
      studentLastName: studentObject.studentLastName,
      studentFirstName: studentObject.studentFirstName,
      personalDetail: personalDetail,
      adhaarNumber: studentObject.adhaarNumber+"",
      conveyance: studentObject.conveyance,
      disability: studentObject.disability,
      admissionType: studentObject.admissionType,
      registeredBy: token
    }

    console.log(payload);
    this.studentService.registerStudent(payload).subscribe(res => {

      if (res._id && res._id != null) {
        console.log(res)
        form.reset();
        this.signature_id = null;
        this.signatureUploaded = false;
        this.photo_id = null;
        this.pictureUploaded = false;
        this.successfulSubmission = true;

      }
      else {
        console.log('Error Occured')
      }
    }, error => {
      this.hasErrorOccured = true;
      this.errorOccured = error.error.message
    })

  }
  close() {
    this.hasErrorOccured = false;
  }

}
