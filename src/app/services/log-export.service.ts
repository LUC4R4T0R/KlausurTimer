import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import autoTable from 'jspdf-autotable';

const margins: number = 10;
const watermarkLogoHeight: number = 15;
const textColor: string = '#000000';
const fontSize: number = 12;

const logColumnNames: string[] = [
  $localize`Name, Vorname`,
  $localize`Raum/Platz`,
  $localize`Ankunft`,
  $localize`WC`,
  $localize`Abgabe`,
  $localize`Info`,
];

@Injectable({
  providedIn: 'root'
})
export class LogExportService {

  constructor(private http: HttpClient) { }

  async printLog(){
    const doc: jsPDF = await this.createDocument();
    autoTable(doc, {
      head: [logColumnNames],
      body: this.getLogRows(),
      pageBreak: 'auto',
      headStyles: {fillColor: '#DDDDDD'},
      margin: {
        top: watermarkLogoHeight + margins,
        right: margins,
        left: margins,
        bottom: fontSize + margins
      }
    });
    this.addPageNumbering(doc);
  }

  initDocument(): jsPDF{
    const document: jsPDF = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    });
    return document;
  }

  async createDocument(): Promise<jsPDF> {
    const doc = this.initDocument();
    await this.addWaterMark(doc);
    return doc;
  }

  async addWaterMark(doc: jsPDF): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get('logo.svg', {
        observe: 'response',
        responseType: 'blob'
      }).subscribe(response => {
        if (response.status === 200) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result as string;
            img.onload = () => {
              const logoWidth = (watermarkLogoHeight / img.height) * img.width;

              for(let pageNumber = 1; pageNumber < doc.internal.pages.length; pageNumber++) {
                doc.setPage(pageNumber);

                doc.addImage({
                  imageData: reader.result as string,
                  x: margins,
                  y: (doc.internal.pageSize.getHeight() - watermarkLogoHeight),
                  width: logoWidth,
                  height: watermarkLogoHeight
                });
              }

              resolve();
            }
          }
          reader.readAsDataURL(response.body as Blob);
        }
      })
    });
  }

  addPageNumbering(doc: jsPDF): void{
    doc.setTextColor(textColor);
    doc.setFontSize(fontSize);
    for(let pageNumber = 1; pageNumber < doc.internal.pages.length; pageNumber++) {
      doc.setPage(pageNumber);

      const pageNumberText = pageNumber + ' / ' + (doc.internal.pages.length - 1);
      const dim = doc.getTextDimensions(pageNumberText);
      doc.text(pageNumberText, ((doc.internal.pageSize.getWidth() / 2) - (dim.w / 2)), (doc.internal.pageSize.getHeight() - margins));
    }
  }

  private getLogRows(): string[][]{

  }
}
