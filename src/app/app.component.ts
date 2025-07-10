import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ClockComponent } from './components/clock/clock.component';
import { GithubLinkComponent } from './components/github-link/github-link.component';
import { TimerComponent } from './components/timer/timer.component';
import { ExamInfoComponent } from './components/exam-info/exam-info.component';
import { StatusDisplayComponent } from './components/status-display/status-display.component';
import { TimerControlsComponent } from './components/timer-controls/timer-controls.component';
import { ModalComponent } from './components/modal/modal.component';
import { ExamSettingsComponent } from './components/exam-settings/exam-settings.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { NgIf } from '@angular/common';
import { ViewService } from './services/view.service';
import { WindowType } from './models/window-type';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClockComponent, GithubLinkComponent, TimerComponent, ExamInfoComponent, StatusDisplayComponent, TimerControlsComponent, ModalComponent, ExamSettingsComponent, SettingsModalComponent, NgIf, LanguageSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit{
  @ViewChild('settingsModal') settingsModal!: ModalComponent;

  windowType: WindowType = WindowType.ALL_IN_ONE;

  constructor(private router: Router, private viewService: ViewService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.viewService.windowTypeSubject.subscribe(windowType => {
      this.windowType = windowType;
    });
  }

  ngAfterViewInit(): void {
    if(this.windowType === WindowType.ALL_IN_ONE){
      this.openSettings();
    }
  }

  openSettings(): void{
    this.settingsModal.open();
  }

  openControlPage():void {
    this.exitFullScreen();
    window.open(this.router.serializeUrl(this.router.createUrlTree( [window.location.pathname],{queryParams: {billboard: true}})), '_blank', 'popup=true');
    this.router.navigate(['control']);
  }

  closeControlPage(): void{
    this.router.navigate(['']);
    this.viewService.setWindowType(WindowType.ALL_IN_ONE);
  }

  initiateFullScreen(): void {
    void document.body.requestFullscreen();
  }

  exitFullScreen(): void {
    void document.exitFullscreen();
  }

  isFullscreenEnabled(): boolean {
    return !!document.fullscreenElement;
  }

  protected readonly WindowType = WindowType;
}
