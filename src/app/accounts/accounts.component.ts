import { Component, OnInit } from '@angular/core';
import { StudentServices } from '../services/student-services.service';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  ACTIVE_URL = this.service.PRODUCTION_HEROKU;
  studentID
  fName
  lName
  motherName
  fatherName
  hasErrorOccured = false;
  errorMessage;
  img_ref
  hasSubmitted = false;
  RecieptNumber;
  schoolCode;
  BRANCH_NAME
  DateTodays

  constructor(private service: StudentServices) { }

  ngOnInit() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.DateTodays = + dd + '/' + mm + '/' + yyyy;
  }

  findStudent(form) {
    this.service.getStudentById(form.studentId).subscribe(res => {
      console.log(res);
      this.hasSubmitted = true;
      this.studentID = res.studentID;
      this.fName = res.studentFirstName;
      this.lName = res.studentLastName;
      this.motherName = res.personalDetail.motherName;
      this.fatherName = res.personalDetail.fatherName;
      this.img_ref = res.profilePictureRef;

      if (res.medium == 'english' && res.boardType == 'cbse') {
        this.schoolCode = "MLMEC"
        this.BRANCH_NAME = "MOTILAL MEMORIAL EDUCATION CENTRE HASANPUR KANPUR"
      } else {
        this.schoolCode = "MLMIC"
        this.BRANCH_NAME = "MOTILAL MEMORIAL INTER COLLEGE HASANPUR KANPUR"
      }

      this.RecieptNumber = this.schoolCode + '/' + this.studentID + '/' + Math.round(+new Date() / 1000);
    }, err => {
      this.hasErrorOccured = true;
      this.errorMessage = err.error.message;

    })

  }
  close() {
    this.hasErrorOccured = false;
  }

  print(): void {
    let printContentsReceipt, printContentsInfo, popupWin;
    printContentsReceipt = document.getElementById('print-section-receipt').innerHTML;
    printContentsInfo = document.getElementById('print-section-info').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Fees Receipt</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
          
          <style>
          *{
            font-family: 'Montserrat', sans-serif;
            padding:1px;
            margin:0px;
          }
 
            h4{
              font-weight:300;
              font-family:'Montserrat'
            }
            .custom-img img{
              height:70px;
              width:70px;
            }
            .title{
              display:flex;
              position:inline-block;
              justify-content:space-between;
            }
            .custom-heading{
              display:flex;
              justify-content:flex-end;
              float:right;
            }
            .custom-img{
              display:flex;
              justify-content:flex-start;
              float:left;
            }

        
            img{
             height:100px;
             width:80px;
             display:flex;
             justify-content:flex-end;
           }
           
           .custom-style{
             position:relative;
             top:-85px;
           }
           .custom-style2{
            position:relative;
            //top:-120px;
          }
          table, th, td {
            border: 1px solid black;
          }
          table th td{
            justify-content:center;
            align-content:center;
            padding-left:10px;
          }
          </style>

          
        </head>
        
    <body onload="window.print();window.close()">
    <div class="row">
      <div class="title">
          <div class="custom-img">
              <img src="../../assets/_logo_edited.png"/>  
          </div> 
          <div class="custom-heading">
              <h3>${this.BRANCH_NAME}</h3>
          </div> 
      </div>
      <div class="title">
          <div class="custom-img">
              <h5>Date:${this.DateTodays}</h5>  
          </div> 
          <div class="flex-item">
            <h5> &nbsp;&nbsp;&nbsp;&nbsp;Student Copy</h5>
          </div>
          <div class="custom-heading">
              <h5>Receipt No:${this.RecieptNumber}</h5>  
          </div> 
      </div>

    <br><hr>
  <div class="title">
      <div class="custom-img">
        <h5>Student Name: ${this.fName} ${this.lName}</h5>
      </div> 
       
      <div class="custom-heading">
        <img  src="${this.ACTIVE_URL}/getImage/${this.img_ref}"/> 
      </div> 
  </div>

  <div class="custom-style">
      <div class="title">
        <div class="custom-img">
          <h5>Student ID/Scholar No:${this.studentID}</h5> 
        </div>  
      </div>
      <div class="title">
        <div class="custom-img">
          <h5> Father's Name:${this.fatherName}</h5>
        </div>  
      </div>
      <div class="title custom-style2">
        <div class="custom-img">
          <h5> Class:${this.fatherName}</h5>
        </div>  
      </div>
  </div>

  <br><br>
<table style="width:100%">
  <tr>
    <th>SNo.</th>
    <th>Month</th>
    <th>Current</th>
    <th>Previous Due</th>
    <th>Mode</th>
    <th>Balance</th>
    <th>Total Amount</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Aug-Oct</td>
    <td>0</td>
    <td>350</td>
    <td>Cash</td>
    <td>350</td>
  </tr>
  
</table>
<br><br><br><br>
<div class="custom-heading">
  School Stamp/Signature
</div >
      <br><br>
      ------------------------------------------------------------------------------------------------------------------
    </body>
      </html>`
    );
    popupWin.document.close();
  }
}
