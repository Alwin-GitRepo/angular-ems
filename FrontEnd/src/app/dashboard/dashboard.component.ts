import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { UserAPIService } from '../modules/users/user-api.service';
import { AdminAPIService } from '../services/admin-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    userCount : string = ""
    adminName : string = ""
    adminPassword : string = ""
    adminDetails : any = {}

  selected: Date | null = new Date();
  showSidebar : boolean = false;
  Highcharts : typeof Highcharts = Highcharts
  chartOptions = {}

  constructor(private api:UserAPIService, private adminAPI : AdminAPIService){
    this.chartOptions = {
      chart: {
        type: 'pie'
    },
    title: {
        text: 'Employee Statistics'
    },
    tooltip: {
        valueSuffix: '%'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    credits : {
      enabled : false
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Performance',
                    y: 55.02
                },
                {
                    name: 'Efficiency',
                    sliced: true,
                    selected: true,
                    y: 26.71
                },
                {
                    name: 'Appraisal',
                    y: 1.09
                },
                {
                    name: 'Ontime Submission',
                    y: 15.5
                },
                {
                    name: 'Pending Work',
                    y: 1.68
                }
            ]
        }
    ]
    }
    HC_exporting(Highcharts);
  }
  btnClicked(){
    this.showSidebar=!this.showSidebar;
  }

  ngOnInit(): void {
      this.getUsersCount()
      this.adminName=localStorage.getItem('adminName')||""
      this.adminPassword=localStorage.getItem('adminPassword')||""
      this.adminAPI.Authenticate().subscribe((admin:any)=>{
        this.adminDetails=admin
      })
  }

    // Get all user API - post 
    getUsersCount(){
        return this.api.getAllUsers().subscribe((users:any) =>{
            this.userCount = users.length;
        })
    }

    updateAdmin(){
        this.adminAPI.updateAdmin(this.adminDetails).subscribe((admin:any)=>{
            alert("Admin updated")
            localStorage.setItem('adminName',admin.name)
            localStorage.setItem('adminPassword',admin.password)
        })
    }
}
