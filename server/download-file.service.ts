import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor(public http: HttpClient){

  }

  download(url: string){
    return this.http.get(url, {
      responseType: 'blob' as 'json'
    });
  }
}
