import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any>= new EventEmitter<any>();
  //myObservable1$: Observable<any> = new Observable();
  // myObservable1$: Subject<any> = new Subject();
  //myObservable1$: BehaviorSubject<any> = new BehaviorSubject('Enviando agua');// al BehaviorSubject es necesario inicializarlo

  public  audio!: HTMLAudioElement; //Poniendo el ! al final de la variable estoy diciendo que no quiero inicializarla
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    //Observable: se necesita el uso del observer 
    // this.myObservable1$ = new Observable(
    //   (observer: Observer<any>) => {
    //     observer.next('Enviando agua');
        
    //     setTimeout(() => {
    //       observer.complete();
    //     }, 1000);

    //     setTimeout(() => {
    //       observer.next('Enviando agua');
    //     }, 2500);

    //     setTimeout(() => {
    //       observer.error('Se tapo la tuberia');
    //     }, 4500)
    //   }
    // );

    //Subject: es un observable y un observer a la vez. No se usa el observer.
    //Para hacer uso del subject, primero me debo subscribir y luego usarlo
    // setTimeout(() => {
    //   this.myObservable1$.next('Enviando agua');
    // }, 1000)

    // setTimeout(() => {
    //   this.myObservable1$.error('Se tapo la tuberia');
    // }, 2000)

    //BehaviorSubject: es un observable y un observer a la vez. No se usa el observer.
    //Funciona de forma similar al subject, pero debo inicializarlo en la definicion
    // setTimeout(() => {
    //   this.myObservable1$.next('Enviando agua');
    // }, 1000)

    // setTimeout(() => {
    //   this.myObservable1$.error('Se tapo la tuberia');
    // }, 2000)

    this.audio = new Audio();
    this.trackInfo$.subscribe(responseOk => {
      //La emision se hace desde card-player.component
      if(responseOk)
        this.setAudio(responseOk);
    })

    this.listenAllEvents();
  }

  public setAudio(track: TrackModel){
    console.log('URL TRACK', track.url);
    this.audio.src = track.url;
    this.audio.play();
  }

  private calculateTime = () => {
    console.log('Disparando evento');
    const {duration, currentTime} = this.audio;
    console.table([duration, currentTime]);
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(currentTime, duration);
    this.setPercentage(currentTime, duration);
  }

  private setPercentage(currentTime: number, duration: number){
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }

  private setPlayerStatus = (state: any) => {
    switch(state.type) {
      case 'play':
        this.playerStatus$.next('play');
        break;
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'ended':
        this.playerStatus$.next('ended');
        break;
      default:
          this.playerStatus$.next('paused');
          break;
    }
  }

  public togglePlayer(){
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }

  private setTimeElapsed(currentTime: number){
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinuntes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `${displayMinuntes}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(currentTime: number, duration: number){
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds;
    const displayMinuntes = (minutes < 10) ? `0${minutes}` : minutes;

    const displayFormat = `-${displayMinuntes}:${displaySeconds}`;
    this.timeRemaining$.next(displayFormat);
  }

  private listenAllEvents(){
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('play', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }
}
