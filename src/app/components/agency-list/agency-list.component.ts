import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonServiceService } from '../../common-service.service';

export interface seachData {
  sno: string;
  agency: string;
  state: string;
}


@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrl: './agency-list.component.scss'
})
export class AgencyListComponent {
  dataInfo: any[] = [];
  searchString = ''


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
    })
  }

}

