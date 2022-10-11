import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: TrackModel[] = [];
  tracksRandom: TrackModel[] = [];
  listObservers$: Subscription[] = [];

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    // const observer1$ = this.trackService.dataTracksTrending$.subscribe(response => {
    //   this.tracksTrending = response;
    //   this.tracksRandom = response;
    //   console.log('Cancionnes: ', response);
    // })
    // this.listObservers$.push(observer1$);

    // const observer2$ = this.trackService.dataTracksRandom$.subscribe(response => {
    //   //this.tracksRandom = response;
      
    //   //this.tracksRandom.push(response[0])//QUEDE ACA!!!!!!!
    //   this.tracksRandom = [...this.tracksRandom, ...response];

    //   console.log('Cancion random entrando...', response);
    // })
    // this.listObservers$.push(observer2$);

    this.loadAllData();
    this.loadAllRandomData()
  }

  async loadAllData(): Promise<any>{
    // this.trackService.getAllTracks$().subscribe((tracks: TrackModel[]) => {
    //   this.tracksTrending = tracks;
    // });
    
    // this.trackService.getAllTracks$().toPromise()
    // .then(res => {})
    // .catch(err => console.log('Conexion error'))

    this.tracksTrending = await this.trackService.getAllTracks$().toPromise();

  }

  loadAllRandomData():void {
    this.trackService.getAllRandom$().subscribe((tracks: TrackModel[]) => {
      this.tracksRandom = tracks;
    });
  }

  ngOnDestroy(): void {
    //this.listObservers$.forEach(u=>u.unsubscribe());
  }

}
