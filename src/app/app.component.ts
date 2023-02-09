import { Component } from '@angular/core';
import { DownloadFileService } from 'server/download-file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  activeStep: number = 1;

  constructor(public service: DownloadFileService){
  }

  clickEvent(calledStep: number){
    this.activeStep = calledStep;       
  }

  public downloadPdf(){
    this.service.download('http://localhost:8000/downloadPdf').subscribe((res: any) => {
      const file = new Blob([res], {
        type: res.type
      });

      const nav = (window.navigator as any);
      if(window.navigator && nav.msSaveOrOpenBlob){
        nav.msSaveOrOpenBlob(file);
        return;
      }

      const blob = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = blob;
      link.download = 'Curriculo.pdf';
      //link.click();
      link.dispatchEvent(new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      }));

      setTimeout(() => {
        window.URL.revokeObjectURL(blob);
        link.remove();
      }, 100);      
    });
  }
}
