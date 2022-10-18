import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  listObservers$:Array<Subscription> = [];
  state: string = 'paused';

  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {
    // const observer1$: Subscription = this.multimediaService.callback.subscribe((response: TrackModel) => {
    //   console.log('recibiendo cancion...', response);
    //   this.mockCover = response;
    // })
    // this.listObservers$.push(observer1$);
    
    //Explicacion de observables, subject y behaviorSubject
    // const observable1$ = this.multimediaService.myObservable1$
    // .subscribe(
    //   (responseOk) => {
    //     console.log('El agua llega bien', responseOk)
    //   },
    //   (responseFail) => {
    //     console.log('Algo salio mal', responseFail)
    //   }
    // )
    const observer1$ = this.multimediaService.playerStatus$.subscribe(status => this.state = status);
    this.listObservers$.push(observer1$);
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());
  }
}
