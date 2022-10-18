import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any>= new EventEmitter<any>();
  //myObservable1$: Observable<any> = new Observable();
  // myObservable1$: Subject<any> = new Subject();
  myObservable1$: BehaviorSubject<any> = new BehaviorSubject('Enviando agua');// al BehaviorSubject es necesario inicializarlo

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
  }
}
