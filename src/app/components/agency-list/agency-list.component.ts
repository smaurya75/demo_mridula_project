import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonServiceService } from '../../common-service.service';


interface MyData {
  id: number;
  grouptype: string;
  motherdairy: number;
}

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrl: './agency-list.component.scss'
})
export class AgencyListComponent {
 dataInfo: any [] = [];



  constructor(
    private _commonService: CommonServiceService,    // create object of service to inject service file
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    
    this._commonService.getUserData().subscribe((res) => {
      this.dataInfo = res;
      console.log(res, "result")
      console.log("sv", this.dataInfo)
    })
  }


  logout() {
    this.router.navigate(['']);
  }
  
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}

