import { Component, OnInit } from '@angular/core';
import { StudentServices } from '../services/student-services.service';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  ACTIVE_URL = this.service.PRODUCTION_HEROKU;
  hasPaid = false
  _RecieptNumber
  _studentCurrentCharge;
  _studentPaid;
  _studentTotalAmountDue;
  _studentPaymentToward;
  _updatedBalance;

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
  class;
  previousBalance; currentMonth; outstandingDue; paid;
  section;
  stream;
  firstTimeDeposit
  paymentType
  constructor(private service: StudentServices) { }

  ngOnInit() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.DateTodays = + dd + '/' + mm + '/' + yyyy;
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
      this.section = res.section;
      this.class = res.class;
      this.stream = res.stream;
      this.previousBalance = res.previousBalance;
      if (this.previousBalance == null) {
        this.previousBalance = 0;
      }
      if (res.medium == 'english' && res.boardType == 'cbse') {
        this.schoolCode = "MLMEC"
        this.BRANCH_NAME = "MOTILAL MEMORIAL EDUCATION CENTRE HASANPUR KANPUR"
      } else {
        this.schoolCode = "MLMIC"
        this.BRANCH_NAME = "MOTILAL MEMORIAL INTER COLLEGE HASANPUR KANPUR"
      }
      if (this.stream == null) {
        this.stream = " ";
      }
      this.getFeeChart(this.schoolCode, this.class, this.stream);

      this.RecieptNumber = this.schoolCode + '/' + this.studentID + '/' + Math.round(+new Date() / 1000);
      this.getPreviousBalance(res.studentID);
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
    popupWin.document.write(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,500,700,900&display=swap"
            rel="stylesheet">
        <title>Document</title>
    
        <style>
            .container {
                width: 100%;
                height: 20%;
            }
    
            .row {
                width: 100%;
                display: flex;
            }
    
            .center {
                justify-content: center;
    
            }
    
            .box {
                width: 100%;
                display: flex;
                justify-content: space-between;
                flex-direction: row;
            }
    
            * {
                padding: 0;
                margin: 0;
                font-family: 'Montserrat', sans-serif;
            }
    
            .box-col {
                display: flex;
                flex-direction: column;
            }
    
            table,
            th,
            td {
    
                border: 1px solid black;
            }
    
            td {
                font-weight: 400;
                ;
            }
    
            table {
                width: 100%;
            }
    
            table th td {
                justify-content: center;
                align-content: center;
                padding-left: 10px;
            }
    
            .row-2 {
                display: flex;
                margin-top: 4%;
            }
    
            .push {
                margin-left: auto;
            }
    
            .title {
                font-weight: 900;
            }
    
            strong {
                font-weight: 500;
            }
        </style>
    </head>
    
    <body onload="window.print();>
        <div class="container">
            <div class="row box">
            <div class="">
            <img  alt="Image of Seal" src="../../assets/_logo_edited.png" height="7.5%" />
              </div> 
              <div class="title">
                  ${this.BRANCH_NAME}
              </div>
            </div>
            <div class="row">
                <div class="box">
                    <div class="title">
                        Date:${this.DateTodays}
                    </div>
                    <div class="title">
                        Student Copy
                    </div>
                    <div class="title">
                        Receipt No:${this._RecieptNumber}
                    </div>
                </div>
            </div>
            <div class="row">
                ------------------------------------------------------------------------------------------------------------------
            </div>
            <div class="row">
                <div class="box">
                    <div class="box-col">
                        <div class="vertical">
                            <strong>Student Name<strong>: ${this.fName} ${this.lName}
                        </div>
                        <div class="vertical">
                            <strong>Student ID/Scholar No<strong>:${this.studentID}
                        </div>
                        <div class="vertical">
                            <strong> Father's Name<strong>:${this.fatherName}
                        </div>
                        <div class="vertical">
                            <strong>Class<strong>:${this.class}
                        </div>
                        <div class="vertical">
                            <strong>Section<strong>:${this.section}
                        </div>
                    </div>
                    <div class="box-image">
                        image
                    </div>
                </div>
            </div>
            <div class="row">
                ------------------------------------------------------------------------------------------------------------------
            </div>
            <div class="row-1">
                <table>
                      <tr>
                            <th>SNo.</th>
                            <th>Month</th>
                            <th>Current</th>
                            <th>Previous Due</th>
                            <th>Mode</th>
                            <th>Total Amount</th>
                            <th>Paid</th>
                          </tr>
                         <tr>
                            <td>1</td>
                            <td align="left">${this._studentPaymentToward}</td>
                           <td align="right">${this._studentCurrentCharge}</td>
                                    <td align="right">${this.previousBalance}</td>
                                    <td align="left">Cash</td>
                                    <td align="right">${this._studentTotalAmountDue}</td>
                                    <td align="right">${this._studentPaid}</td>
                    </tr>
                    <tr class="push">
                            <td colspan="7" align="right"><strong>Updated Balance: ${this._updatedBalance}</strong></td>
                    </tr>
                </table>
                <br><br>
    
            </div>
            <div class="row-2">
                <div class="push">School Stamp / Signature</div>
            </div>
        </div>
        <br><br><br>
        <div class="row">
            ------------------------------------------------------------------------------------------------------------------
        </div>
        <br><br><br>
        <div class="container">
            <div class="row box">
                <div class="">
                       <img src="../../assets/_logo_edited.png" height="7.5%" />
                </div> 
                <div class="title">
                    ${this.BRANCH_NAME}
                </div>
            </div>
            <div class="row">
                <div class="box">
                    <div class="title">
                        Date:${this.DateTodays}
                    </div>
                    <div class="title">
                        Office Copy
                    </div>
                    <div class="title">
                        Receipt No:${this.RecieptNumber}
                    </div>
                </div>
            </div>
            <div class="row">
                ------------------------------------------------------------------------------------------------------------------
            </div>
            <div class="row">
                <div class="box">
                    <div class="box-col">
                        <div class="vertical">
                            <strong>Student Name<strong>: ${this.fName} ${this.lName}
                        </div>
                        <div class="vertical">
                            <strong>Student ID/Scholar No<strong>:${this.studentID}
                        </div>
                        <div class="vertical">
                            <strong> Father's Name<strong>:${this.fatherName}
                        </div>
                        <div class="vertical">
                            <strong>Class<strong>:${this.class}
                        </div>
                        <div class="vertical">
                            <strong>Section<strong>:${this.section}
                        </div>
                    </div>
                    <div class="box-image">
                    <img src='${this.ACTIVE_URL}/getImage/${this.img_ref}' height="7.5%" />
                    
                    </div>
                </div>
            </div>
            <div class="row">
                ------------------------------------------------------------------------------------------------------------------
            </div>
            <div class="row-1">
            <table>
              <tr>
                    <th>SNo.</th>
                    <th>Month</th>
                    <th>Current</th>
                    <th>Previous Due</th>
                    <th>Mode</th>
                    <th>Total Amount</th>
                    <th>Paid</th>
                  </tr>
              <tr>
                    <td>1</td>
                    <td align="left">${this._studentPaymentToward}</td>
                   <td align="right">${this._studentCurrentCharge}</td>
                            <td align="right">${this.previousBalance}</td>
                            <td align="left">Cash</td>
                            <td align="right">${this._studentTotalAmountDue}</td>
                            <td align="right">${this._studentPaid}</td>
            </tr>
            <tr class="push">
                    <td colspan="7" align="right"><strong>Updated Balance: ${this._updatedBalance}</strong></td>
            </tr>
        </table>
                <br><br>
    
            </div>
            <div class="row-2">
                <div class="push">School Stamp / Signature</div>
            </div>
        </div>
    </body>
    
    </html>`
    );
    popupWin.document.close();
  }



  /**
   * Determining the predefined Fees
   */
  getFeeChart(_schoolCode, _class, _stream) {
    var feePayload;
    if (_schoolCode = "MLMIC") {
      if (_class == "na" || _class == "nb") {
        feePayload = {
          registration: 300,
          monthly: 250,
          security: 350,
          total: 900

        }
      }
      else if (_class >= 1 && _class <= 5) {
        feePayload = {
          registration: 400,
          monthly: 300,
          security: 400,
          total: 1100

        }
      }
      else if (_class >= 6 && _class <= 8) {
        feePayload = {
          registration: 500,
          monthly: 450,
          security: 600,
          total: 1550

        };
      }
      else if (_class >= 9 && _class <= 10) {
        feePayload = {
          registration: 500,
          monthly: 500,
          security: 1100,
          total: 2100

        };
      }
      else if (_class >= 11 && _class <= 12 && _stream == 'science') {
        feePayload = {
          registration: 1000,
          monthly: 700,
          security: 1600,
          total: 3300

        };
      }
      else if (_class >= 11 && _class <= 12 && _stream == 'arts') {
        feePayload = {
          registration: 1000,
          monthly: 550,
          security: 1500,
          total: 3050

        };
      }
    }
    else if (_schoolCode = "MLMEC") {

      //Implement Fee structure for english Medium

    }

    this.currentMonth = feePayload.monthly;

  }

  getPreviousBalance(sid) {

    this.service.getstudentpreviousBalance(sid).subscribe(data => {
      console.log(data)
      if (data) {
        this.firstTimeDeposit = data.isFirstTimeDeposit
        try {
          const feeDataPayload = data.student.studentFeeReport
          if (this.firstTimeDeposit) {
            this.previousBalance = 0
            console.log('Previous Balance', this.previousBalance)

          }
          else {
            this.previousBalance = feeDataPayload[feeDataPayload.length - 1].updatedBalance
            console.log('Previous Balance', this.previousBalance)
          }
          this.outstandingDue = this.currentMonth + this.previousBalance;
          console.log(this.outstandingDue);
        }
        catch (e) {
          console.log(e)
        }
      }
    })

  }

  paynow() {
    if (this.paid == '' || this.paid <= 0 || this.paid == NaN || this.paid == null) {
      alert('Enter valid payment amount')
      return
    }
    console.log("Paid", this.paid)
    if (this.paid <= this.outstandingDue) {
      const payload = {
        studentID: this.studentID,
        paidAmount: this.paid,
        previousBalance: this.previousBalance,
        currentCharge: this.currentMonth,
        branchCode: this.schoolCode,
        toward: this.paymentType,
        studentName: `${this.fName} ${this.lName}`,
      }
      this.service.payStudentFee(payload).subscribe(data => {
        if (data) {
          this.hasPaid = true;
          const student = data.studentFeeReport;
          console.log(student[student.length - 1])
          this._RecieptNumber = student[student.length - 1].studentReceiptNo;
          this._studentCurrentCharge = student[student.length - 1].studentCurrentCharge;
          this._studentPaid = student[student.length - 1].studentPaid;
          this._studentTotalAmountDue = student[student.length - 1].studentTotalAmountDue;
          this._studentPaymentToward = student[student.length - 1].studentPaymentToward;
          this._updatedBalance = student[student.length - 1].updatedBalance

          console.log('Student Paid from server', this._studentPaid);

          // previousBalance: 100
          // studentCurrentCharge: 250
          // studentPaid: 300
          // studentPaymentToward: "monthly"
          // studentReceiptNo: "MLMIC/1910001/1572414197738"
          // studentTotalAmountDue: 350
          // updatedBalance: 50
        }
      });
    }
    else {
      alert('Payment Amount Cannot Exceed Outstanding Due')
      return
    }
  }

  updateOutstanding() {
    this.outstandingDue = this.currentMonth + this.previousBalance;
  }

}


