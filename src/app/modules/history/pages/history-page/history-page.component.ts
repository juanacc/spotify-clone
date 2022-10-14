import { Component, EventEmitter, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  //listResults: TrackModel[] = [];
  //listResults$: Observable<any> = of([]); //para poder usar el pipe async en el html de este componente
  listResults$ = new Observable<any>();
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  receiveData(term: string): void{
    // this.searchService.searchTracks$(term).subscribe(({data}) => {
    //   this.listResults = data;
    // })
    this.listResults$ = this.searchService.searchTracks$(term);
    console.log(this.listResults$);
  }

}
