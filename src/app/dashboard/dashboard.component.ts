import { Component, OnInit , ViewChild } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
//import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  userImage:String ='';
  userName: String  = '';
  activeCount: Number = 0;
  wonCount:Number=0;
  lostCount:Number=0;
  medium_percent:Number =0;
  low_percent:Number =0;
  high_percent:Number =0;
  mediumCount:Number =0;
  lowCount:Number =0;
  highCount:Number =0;
  graphValues:any = [];
  barChartData: ChartData ={
    labels :[],
    datasets:[]
  }
  activeLeads:any =[]
  contactMadeCount:Number = 0;
  initialInterCount:Number = 0;
  firstIntroCount:Number = 0;
  followUpCount:Number = 0;
  workshopCount:Number = 0;
  recentLeads:any =[];
  tabIndex:Number =0;
  constructor(private apiService: ApicallService, private router:Router){

  }

 

  ngOnInit(){
    this.apiService.getUserDetails().subscribe((result)=>{
      //console.log(result)
      this.userImage = result.data.image;
      this.userName = result.data.first_name+ ' ' + result.data.last_name
    })
    this.apiService.getGraphandStageCounts('active').subscribe((result)=>{
      //console.log(result)
      this.activeCount = result.data.stage_type_count[1].value;
      this.wonCount = result.data.stage_type_count[0].value;
      this.lostCount = result.data.stage_type_count[2].value;
      for (let i=0;i<result.data.graph.length;i++){
        //console.log( result.data.graph[i])
        this.graphValues.push(result.data.graph[i].leads)
      }
      this.barChartData= {
        labels: ['Contact made', 'Initial interest', 'First intro meeting', 'Follow up meeting', 'Workshop stage'],
        datasets: [
          { data: this.graphValues,
          label:'' },
        ],
      };
    })
    this.apiService.getProbability('active').subscribe((result)=>{
      //console.log(result)
      this.low_percent = result.data.low_percent;
      this.high_percent = result.data.high_percent;
      this.medium_percent = result.data.medium_percent;
      this.highCount = result.data.high_count;
      this.lowCount = result.data.low_count;
      this.mediumCount = result.data.medium_count;
    })

    this.apiService.getActiveLeadStatus().subscribe((result)=>{
      //console.log(result)
      this.activeLeads = result.data.results;
      this.contactMadeCount = result.data.results[0].lead_count;
      this.initialInterCount = result.data.results[1].lead_count;
      this.firstIntroCount = result.data.results[2].lead_count;
      this.followUpCount = result.data.results[3].lead_count;
      this.workshopCount = result.data.results[3].lead_count;
    })

    this.apiService.getLeadsList('active').subscribe((result)=>{
      console.log(result)
      this.recentLeads = result.data.results
    })
  }

  tabchange(tabIndex:Number){
    console.log(tabIndex)
    this.tabIndex = tabIndex
    if(tabIndex == 0){
      this.apiService.getGraphandStageCounts('active').subscribe((result)=>{
        //console.log(result)
        this.activeCount = result.data.stage_type_count[1].value;
        this.wonCount = result.data.stage_type_count[0].value;
        this.lostCount = result.data.stage_type_count[2].value;
        for (let i=0;i<result.data.graph.length;i++){
          //console.log( result.data.graph[i])
          this.graphValues.push(result.data.graph[i].leads)
        }
        this.barChartData= {
          labels: ['Contact made', 'Initial interest', 'First intro meeting', 'Follow up meeting', 'Workshop stage'],
          datasets: [
            { data: this.graphValues,
            label:'' },
          ],
        };
      })
      this.apiService.getProbability('active').subscribe((result)=>{
        //console.log(result)
        this.low_percent = result.data.low_percent;
        this.high_percent = result.data.high_percent;
        this.medium_percent = result.data.medium_percent;
        this.highCount = result.data.high_count;
        this.lowCount = result.data.low_count;
        this.mediumCount = result.data.medium_count;
      })
      this.apiService.getActiveLeadStatus().subscribe((result)=>{
        //console.log(result)
        this.activeLeads = result.data.results;
        this.contactMadeCount = result.data.results[0].lead_count;
        this.initialInterCount = result.data.results[1].lead_count;
        this.firstIntroCount = result.data.results[2].lead_count;
        this.followUpCount = result.data.results[3].lead_count;
        this.workshopCount = result.data.results[3].lead_count;
      })
  
      this.apiService.getLeadsList('active').subscribe((result)=>{
        console.log(result)
        this.recentLeads = result.data.results
      })

    }else if(tabIndex == 1){
      this.apiService.getGraphandStageCounts('won').subscribe((result)=>{
        //console.log(result)
        this.activeCount = result.data.stage_type_count[1].value;
        this.wonCount = result.data.stage_type_count[0].value;
        this.lostCount = result.data.stage_type_count[2].value;
        for (let i=0;i<result.data.graph.length;i++){
          //console.log( result.data.graph[i])
          this.graphValues.push(result.data.graph[i].leads)
        }
        this.barChartData= {
          labels: ['Contact made', 'Initial interest', 'First intro meeting', 'Follow up meeting', 'Workshop stage'],
          datasets: [
            { data: this.graphValues,
            label:'' },
          ],
        };
      })
      this.apiService.getProbability('won').subscribe((result)=>{
        //console.log(result)
        this.low_percent = result.data.low_percent;
        this.high_percent = result.data.high_percent;
        this.medium_percent = result.data.medium_percent;
        this.highCount = result.data.high_count;
        this.lowCount = result.data.low_count;
        this.mediumCount = result.data.medium_count;
      })
      
  
      this.apiService.getLeadsList('won').subscribe((result)=>{
        console.log(result)
        this.recentLeads = result.data.results
      })

    }else if(tabIndex == 2){
      this.apiService.getGraphandStageCounts('lost').subscribe((result)=>{
        //console.log(result)
        this.activeCount = result.data.stage_type_count[1].value;
        this.wonCount = result.data.stage_type_count[0].value;
        this.lostCount = result.data.stage_type_count[2].value;
        for (let i=0;i<result.data.graph.length;i++){
          //console.log( result.data.graph[i])
          this.graphValues.push(result.data.graph[i].leads)
        }
        this.barChartData= {
          labels: ['Contact made', 'Initial interest', 'First intro meeting', 'Follow up meeting', 'Workshop stage'],
          datasets: [
            { data: this.graphValues,
            label:'',
            },
          ],
        };
      })
      this.apiService.getProbability('lost').subscribe((result)=>{
        //console.log(result)
        this.low_percent = result.data.low_percent;
        this.high_percent = result.data.high_percent;
        this.medium_percent = result.data.medium_percent;
        this.highCount = result.data.high_count;
        this.lowCount = result.data.low_count;
        this.mediumCount = result.data.medium_count;
      })
      
  
      this.apiService.getLeadsList('lost').subscribe((result)=>{
        console.log(result)
        this.recentLeads = result.data.results
      })
    }
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    
  };
  public barChartType: ChartType = 'bar';
  

  
  logout(){
    localStorage.setItem("token", "");
    localStorage.setItem("userId","");
    this.router.navigate(['']);
  }
}
