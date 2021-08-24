import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloaderService {

  constructor(private http: HttpClient) { }

  postDownload(uri: string): Observable<Object> {
    console.log(uri);
    var body = {
      'uri': uri
    };
    return this.http.post(`${environment.backEnd}/api/v1/downloads`, body);
  }

  getDownloads(): Observable<Object> {
    return this.http.get(`${environment.backEnd}/api/v1/downloads`);
  }


  unPauseDownload(gid: string): Observable<Object> {
    return this.http.put(`${environment.backEnd}/api/v1/downloads?gid=${gid}`, { gid, status: 'unpause' });
  }

  pauseDownload(gid: string): Observable<Object> {
    return this.http.put(`${environment.backEnd}/api/v1/downloads?gid=${gid}`, { gid, status: 'pause' });
  }

  stopDownload(gid: string): Observable<Object> {
    return this.http.put(`${environment.backEnd}/api/v1/downloads?gid=${gid}`, { gid, status: 'remove' });
  }

  removeDownload(gid: string): Observable<Object> {
    return this.http.put(`${environment.backEnd}/api/v1/downloads?gid=${gid}`, { gid, status: 'delete' });
  }
}
