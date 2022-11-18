import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportsService } from 'src/app/service/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  url:any;
  isLoadFile:boolean = true
  private _getReportsSubscription:Subscription = new Subscription()

  constructor(
    private _reportService:ReportsService
  ) {
    this.load()
  }

  load(){
    this._getReportsSubscription = this._reportService.getReports().subscribe(data => this.downloadFile(data)),//console.log(data),
    (_error:any)=> console.log('Error downloading the file.'),
    () => console.info('OK');
  }

  downloadFile(data:any) {
    const blob = new Blob([data], { type: 'application/pdf' });
    this.url= window.URL.createObjectURL(blob);
    this.isLoadFile = false
  }

  clickDownLoadFile(){
    window.open(this.url);
  }


  ngOnInit(): void {

  }

  ngOnDestroy() {
    this._getReportsSubscription.unsubscribe()
  }

}
