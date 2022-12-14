import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit {
  @Input() mode: any;
  //@Input() track!:TrackModel;
  @Input() track: TrackModel = {_id: 0, name: '', album: '', url: '', cover: ''};
  customImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png';
  
  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
  }

  sendTrack(track: TrackModel): void{
    //this.multimediaService.callback.emit(track);
    this.multimediaService.trackInfo$.next(track);
  }

}
