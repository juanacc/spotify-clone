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
  mockCover:TrackModel={
    cover:'https://i.ytimg.com/vi/rWZTpOq3whM/mqdefault.jpg',
    album:'Gioli & Assia',
    name:'BEBE (Oficial)',
    url:'http://localhost/track.mp3',
    _id:1
  }

  listObservers$:Array<Subscription> = [];

  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
    // const observer1$: Subscription = this.multimediaService.callback.subscribe((response: TrackModel) => {
    //   console.log('recibiendo cancion...', response);
    //   this.mockCover = response;
    // })
    // this.listObservers$.push(observer1$);

    const observable1$ = this.multimediaService.myObservable1$
    .subscribe(
      (responseOk) => {
        console.log('El agua llega bien', responseOk)
      },
      (responseFail) => {
        console.log('Algo salio mal', responseFail)
      }
    )
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());
  }
}
