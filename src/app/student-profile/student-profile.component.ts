import { Component, OnInit } from '@angular/core';
import { StudentServices } from '../services/student-services.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  constructor(private service: StudentServices) { }

  students: any
  ACTIVE_URL = this.service.PRODUCTION_HEROKU;
  ngOnInit() {
    this.service.getAllStudents().subscribe(
      student => { this.students = student; console.log(student) }

    );

  }

}
