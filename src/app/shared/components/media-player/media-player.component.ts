import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {
  mockCover:TrackModel={
    cover:'https://i.ytimg.com/vi/rWZTpOq3whM/mqdefault.jpg',
    album:'Gioli & Assia',
    name:'BEBE (Oficial)',
    url:'http://localhost/track.mp3',
    _id:1
  }
  constructor() { }

  ngOnInit(): void {
  }

}
