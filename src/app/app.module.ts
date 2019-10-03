import { AddHeaderInterceptorService } from './services/add-header-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { BranchComponent } from './branch/branch.component';
import { WildcardComponent } from './wildcard/wildcard.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ProgressBarModule } from "angular-progress-bar"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcademicsComponent } from './academics/academics.component';
import { InfrastructureComponent } from './infrastructure/infrastructure.component';
import { EventComponent } from './event/event.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CarouselComponent } from './carousel/carousel.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterGuardService } from './guards/register-guard.service';
import { OfficeComponent } from './office/office.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ResultComponent } from './result/result.component';
import { StudentServComponent } from './student-serv/student-serv.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SyllabusComponent } from './syllabus/syllabus.component';
import { TimetableComponent } from './timetable/timetable.component';
import { StaffComponent } from './staff/staff.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPrintModule } from 'ngx-print';
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    HomeComponent,
    LandingPageComponent,
    AboutComponent,
    BranchComponent,
    WildcardComponent,
    AcademicsComponent,
    InfrastructureComponent,
    EventComponent,
    CarouselComponent,
    RegisterStudentComponent,
    SidebarComponent,
    LoginComponent,
    OfficeComponent,
    StudentProfileComponent,
    AttendanceComponent,
    AccountsComponent,
    ResultComponent,
    StudentServComponent,
    CalendarComponent,
    SyllabusComponent, TimetableComponent, StaffComponent, FooterComponent, DashboardComponent,
  ],
  imports: [
    BrowserModule,
    NgxPrintModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ProgressBarModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },

      { path: 'office/dashboard', component: DashboardComponent, canActivate: [RegisterGuardService] },
      { path: 'office/register-student', component: RegisterStudentComponent, canActivate: [RegisterGuardService] },
      { path: 'office/student-profile', component: StudentProfileComponent, canActivate: [RegisterGuardService] },
      { path: 'office/attendance', component: AttendanceComponent, canActivate: [RegisterGuardService] },
      { path: 'office/accounts', component: AccountsComponent, canActivate: [RegisterGuardService] },
      { path: 'office/result', component: ResultComponent, canActivate: [RegisterGuardService] },
      { path: 'office/student-service', component: StudentServComponent, canActivate: [RegisterGuardService] },
      { path: 'office/calendar', component: CalendarComponent, canActivate: [RegisterGuardService] },
      { path: 'office/syllabus', component: SyllabusComponent, canActivate: [RegisterGuardService] },
      { path: 'office/timetable', component: TimetableComponent, canActivate: [RegisterGuardService] },
      { path: 'office/staff-report', component: StaffComponent, canActivate: [RegisterGuardService] },


      { path: 'landing-page', component: LandingPageComponent },
      { path: 'about', component: AboutComponent },
      { path: 'branch', component: BranchComponent },
      { path: 'academics', component: AcademicsComponent },
      { path: 'infra', component: InfrastructureComponent },
      { path: 'event', component: EventComponent },
      { path: '**', component: WildcardComponent },


    ], { useHash: true }),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptorService,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
