import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {
  mockCover:any={
    cover:'https://i.ytimg.com/vi/rWZTpOq3whM/mqdefault.jpg',
    album:'Gioli & Assia',
    name:'BEBE (Oficial)',
  }
  constructor() { }

  ngOnInit(): void {
  }

}
