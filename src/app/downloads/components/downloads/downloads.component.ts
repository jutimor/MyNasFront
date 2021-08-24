import { Component, OnInit } from '@angular/core';
import { DownloaderService } from '../../services/downloader.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDownloadComponent } from '../add-download/add-download.component';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {

  displayedColumns: string[] = ['identifiant', 'uri', 'status', 'vitesse', 'avancement', 'termine', 'total', 'actions'];
  dataSource = [];

  constructor(private downloadService: DownloaderService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    // setInterval(() => {
    //   console.log('interval');
    this.downloadService.getDownloads().subscribe(res => this.dataSource = (res as DownloadResponse).items);
    // }, 1000);
  }

  getFile(uri) {
    var tab = uri.split('/');
    var name = tab[tab.length - 1];
    if (name.length > 30) {
      name = name.substring(0, 27) + '...';
    }
    return name;
  }

  toTime(element) {
    if (element.downloadSpeed > 0) {
      return new Date((((element.totalLength -
        element.completedLength) / element.downloadSpeed)) * 1000).toISOString().substr(9, 10).replace('T', 'j ');
    }
    else {
      return '-';
    }
  }

  vitesseLisible(valeur: number): string {
    if (valeur > 0) {
      return this.tailleLisible(valeur) + '/s';
    } else {
      return '-';
    }

  }

  tailleLisible(valeur: number): string {
    const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
    var index = 0;
    while (valeur > 1000) {
      index++;
      valeur = valeur / 1000;
    }

    return isNaN(valeur) ? '-' : `${new Intl.NumberFormat('fr-FR', { maximumSignificantDigits: 3 }).format(valeur)} ${units[index]}`;
  }


  unPause(element) {
    this.downloadService.unPauseDownload(element.gid).subscribe(res => this.dataSource = (res as DownloadResponse).items);
  }

  pause(element) {
    this.downloadService.pauseDownload(element.gid).subscribe(res => this.dataSource = (res as DownloadResponse).items);
  }

  stop(element) {
    this.downloadService.stopDownload(element.gid).subscribe(res => this.dataSource = (res as DownloadResponse).items);
  }

  remove(element) {
    this.downloadService.removeDownload(element.gid).subscribe(res => this.dataSource = (res as DownloadResponse).items);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDownloadComponent, {
      width: '800px',
      data: { link: null, unrar: false, unrarPassword: null, finalFileName: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result && result.link) {
        console.log(result.link);
        this.downloadService.postDownload(result.link).subscribe(res => console.log(res));
      }
    });
  }



  download() {

  }
}

export class DownloadResponse {
  items: any[];
  totalItems: number;
}