import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public token: string = "";
  public agencycount: any = "";
  public targetallot: any = "";
  public availableqty: any = "";


  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.token = localStorage.getItem('token')
  }



  ngOnInit() {
    this.getAgencyCount();
    this.getTargetAllo();
    this.getAvailableQty();
  }


  // agencycount api
  public getAgencyCount() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.http.get('https://dev-ris-backend.epravaha.com/api/group/count?GroupType=Agency', { headers })
      .subscribe(
        (res: any) => {
          this.agencycount = res
        },
        (error) => {
          alert(error?.error?.message)
          console.error('Login failed', error);
        }
      );
  }

  // targetallot api
  public getTargetAllo() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.http.get('https://dev-ris-backend.epravaha.com/api/dashboard/targetallot', { headers })
      .subscribe(
        (res: any) => {
          this.targetallot = res
        },
        (error) => {
          alert(error?.error?.message)
          console.error('Login failed', error);
        }
      );
  }

  // availableqty api
  public getAvailableQty() {
    debugger;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    this.http.get('https://dev-ris-backend.epravaha.com/api/dashboard/rawstock', { headers })
      .subscribe(
        (res: any) => {
          this.availableqty = res
        },
        (error) => {
          alert(error?.error?.message)
          console.error('Login failed', error);
        }
      );
  }



  logout() {
    this.router.navigate(['/login']);
  }
}


