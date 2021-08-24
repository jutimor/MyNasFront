import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 3, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );

  ramStat: number[];
  ramLabels: string[];
  cpu: any;
  system: any;

  constructor(private breakpointObserver: BreakpointObserver, private statsService: StatsService) {
    this.statsService.getStats().subscribe(res => {
      console.log(res);
      this.ramStat = [parseInt(res['totalmem']) - parseInt(res['freemem']), parseInt(res['freemem'])];
      this.ramLabels = ['Used', 'Free'];
      this.cpu = {
        cpuName: res['cpuName'],
        cpuUsage: res['cpuUsage']
      }
      this.system = {
        upTime: this.secondsToTime(res['upTime'])
      }
    });
  }

  secondsToTime = (seconds: number) => {

    var days = parseInt((seconds / (24 * 3600)).toString());

    var Hours = parseInt(((seconds % (24 * 3600)) / 3600).toString());

    var Minutes = parseInt((((seconds % (24 * 3600 * 3600)) / 60) % 60).toString());

    var Seconds = (seconds % 60).toFixed();

    return `${days} jours ${Hours} h ${Minutes} m ${Seconds} s`
  }
}
