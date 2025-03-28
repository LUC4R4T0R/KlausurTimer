import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { HttpClient } from '@angular/common/http';
import autoTable from 'jspdf-autotable';
import { ParticipantManagementService } from './participant-management.service';
import { ParticipantEventService } from './participant-event.service';
import { SettingsService } from './settings.service';
import { ExamConfig } from '../models/exam-config';
import { ParticipantEvent } from '../models/participant-event';
import { ParticipantEventType } from '../models/participant-event-type';
import { Participant } from '../models/participant';
import { padZeros } from '../lib/util';

const margins: number = 10;
const headLogoHeight: number = 12;
const watermarkHeight: number = 5;
const textColor: string = '#000000';
const fontSize: number = 10;
const gap: number = 2.5;

const logColumnNames: string[] = [
  $localize`Name, Vorname`,
  $localize`Raum/Platz`,
  $localize`Ankunft`,
  $localize`WC`,
  $localize`Abgabe`,
  $localize`Info`,
];

const title: string = $localize`Aufsichtsprotokoll Prüfung`;

@Injectable({
  providedIn: 'root'
})
export class LogExportService {

  private examConfig!: ExamConfig;

  constructor(private http: HttpClient, private participantManagementService: ParticipantManagementService, private participantEventService: ParticipantEventService, private settingsService: SettingsService) {
    this.settingsService.getExamConfig().subscribe(examConfig => {
      this.examConfig = examConfig;
    })
  }

  async printLog(){
    const doc: jsPDF = this.initDocument();
    await this.addDocumentHead(doc);
    this.addExamInfo(doc);
    autoTable(doc, {
      head: [logColumnNames],
      body: this.getLogRows(),
      pageBreak: 'auto',
      headStyles: {fillColor: '#DDDDDD', textColor: textColor, fontSize: fontSize},
      bodyStyles: {fontSize: fontSize},
      margin: {
        right: margins,
        left: margins,
        bottom: margins + fontSize
      }
    });
    await this.addWaterMark(doc);
    this.addPageNumbering(doc);
    doc.save('log.pdf');
  }

  private initDocument(): jsPDF{
    return new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    });
  }

  async addWaterMark(doc: jsPDF): Promise<void> {
    await this.fetchImg(window.location.origin + '/icon.png')
      .then(({data: imgData, dimensions: imgDimensions} : {data: string, dimensions: {w: number, h: number}})=> {
        const logoWidth = (watermarkHeight / imgDimensions.h) * imgDimensions.w;
        for(let pageNumber = 2; pageNumber < doc.internal.pages.length; pageNumber++) {
          doc.setPage(pageNumber);
          doc.addImage({
            imageData: imgData,
            x: margins,
            y: margins,
            width: logoWidth,
            height: watermarkHeight
          });
        }
      })
      .then(() => {
        doc.setFontSize(fontSize + 2);
        doc.text(title, doc.internal.pageSize.width / 2, margins + headLogoHeight + 2*gap, {align: 'center'});
        doc.setFontSize(fontSize);
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
    return this.participantManagementService.getParticipantsSorted().map((participant: Participant): string[] => {
      const participantEvents: ParticipantEvent[] = this.participantEventService.getEventsByParticipant(participant.id as string);
      const toiletStarts: ParticipantEvent[] = participantEvents.filter(event => event.type === ParticipantEventType.TOILET_VISIT_START);
      const toiletEnds: ParticipantEvent[] = participantEvents.filter(event => event.type === ParticipantEventType.TOILET_VISIT_END);
      let toiletVisits: string[] = [];
      const abort: ParticipantEvent | undefined = participantEvents.find(event => event.type === ParticipantEventType.EXAM_ABORT);
      for(let i = 0; i < Math.max(toiletStarts.length, toiletEnds.length); i++){
        toiletVisits.push(`${this.asTime(toiletStarts[i]?.timestamp)} - ${this.asTime(toiletEnds[i]?.timestamp)}`);
      }
      return [
        `${participant.lastName}, ${participant.firstName}`,
        `${this.examConfig.room ?? ''}-${participant.seatNumber ?? ''}`,
        this.asTime(participantEvents.find(event => event.type === ParticipantEventType.EXAM_ENTRY)?.timestamp),
        toiletVisits.join('\n'),
        this.asTime(participantEvents.find(event => event.type === ParticipantEventType.EXAM_SUBMISSION)?.timestamp),
        (abort ? [`${this.asTime(abort.timestamp)} Klausurabbruch`] : []).concat(participant.comment ? [participant.comment] : []).join('\n'),
      ]
    });
  }

  private async addDocumentHead(doc: jsPDF): Promise<void>{
    await this.fetchImg(window.location.origin + '/logo.png')
        .then(({data: imgData, dimensions: imgDimensions} : {data: string, dimensions: {w: number, h: number}})=> {
            const logoWidth = (headLogoHeight / imgDimensions.h) * imgDimensions.w;
            doc.addImage({
              imageData: imgData,
              x: margins,
              y: margins,
              width: logoWidth,
              height: headLogoHeight
            });
        })
        .then(() => {
          doc.setFontSize(fontSize + 2);
          doc.text(title, doc.internal.pageSize.width / 2, margins + headLogoHeight + 2*gap, {align: 'center'});
          doc.setFontSize(fontSize);
        });
  }


  private addExamInfo(doc: jsPDF): void {
    autoTable(doc, {
      body: [
        [{content: $localize`Modulprüfung`, styles: {cellWidth: 30}}, {content: this.examConfig.title, colSpan: 3}],
        [$localize`Datum`, new Date().toLocaleDateString(), {content: $localize`Raum`, styles: {cellWidth: 35}}, this.examConfig.room],
        [$localize`Erstprüfer:in`, this.examConfig.primaryExaminer ?? '', {content: $localize`Aufsichtsperson(en)`, rowSpan: 2}, {content: (this.examConfig.attendants ?? []).join('\n'), rowSpan: 2}],
        [$localize`Zweitprüfer:in`, this.examConfig.secondaryExaminer ?? '']
      ],
      pageBreak: 'auto',
      margin: {
        top: margins + headLogoHeight + fontSize + 2,
        right: margins,
        left: margins,
        bottom: margins
      },
      theme: 'plain'
    });
  }

  private asTime(timestamp: Date | undefined): string{
    if(!timestamp) return '';
    return padZeros(timestamp.getHours().toString(), 2) + ':' + padZeros(timestamp.getMinutes().toString(), 2);
  }

  private async fetchImg(url: string): Promise<{data: string, dimensions: {w: number, h: number}}> {
    return new Promise<{ data: string, dimensions: { w: number, h: number } }>((resolve, reject) => {
      this.http.get(url, {
        observe: 'response',
        responseType: 'blob'
      }).subscribe({
        next: response => {
          if (response.status === 200) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const img = new Image();
              img.src = reader.result as string;
              img.onload = () => {
                resolve({ data: reader.result as string, dimensions: { w: img.width, h: img.height } });
              }
            }
            reader.readAsDataURL(response.body as Blob);
          } else reject();
        },
        error: err => reject(err)
      });
    });
  }
}
