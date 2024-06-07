import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketService } from 'src/app/services/market.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-marketview',
  templateUrl: './marketview.component.html',
  styleUrls: ['./marketview.component.scss']
})
export class MarketviewComponent implements OnInit{

  error: undefined | string;
  currency!: string;

  asset:any;
  values:any;

  labels:any;
  datas:any;
  high:any;
  low:any;

  constructor(private usvc: UserService, private svc: MarketService,
              private route:ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.getMarketDailyData("1day");
    this.currency = this.usvc.getCurrency();
  }

  getMarketDailyData(time:string){
    this.route.params
    .subscribe((params:any)=>{
      console.log(params)
      this.svc.getMarketDailyView(params, time).subscribe(
          (data) => {
          console.log(Object.values(data)[0])
          console.log(Object.values(data)[1])
          this.asset = Object.values(data)[0]
          this.values = Object.values(data)[1];
          this.getData();
          if(Object.values(data)[0] == 400){
            this.error = "Asset not available for your plan";
            // this.router.navigate(['/market'])
          }else{
            this.error = undefined;
          }
          },
          (err) => {
          console.log(err.error.message);
          this.error = err.error.message;
      })
    })
  }

  renderChart(){
    let existingChart = Chart.getChart("assetchart");
    if (existingChart) {
      existingChart.destroy();
    }

    const chart = new Chart("assetchart", {
      data: {
        datasets: [
        {
          type: 'line',
          label: 'low',
          data: this.low,
          borderColor: '#FF0100',
          tension: 0.1
        },
        {
          type: 'line',
          label: 'price',
          data: this.datas,
          borderColor: '#cccccc',
          tension: 0.1
        },
        {
          type: 'line',
          label: 'high',
          data: this.high,
          borderColor: '#167a4c',
          tension: 0.1
        }],
      labels: this.labels
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }


  getData(){

    const labelsd = [];
    const datasd = [];
    const highd = [];
    const lowd = [];

    for (const key in this.values) {
      labelsd.push(this.values[key].datetime);
      datasd.push(this.values[key].close);
      highd.push(this.values[key].high);
      lowd.push(this.values[key].low);
    }
    this.low = lowd.reverse();
    this.high = highd.reverse();
    this.labels = labelsd.reverse();
    this.datas = datasd.reverse();
    this.renderChart();
  }

}
