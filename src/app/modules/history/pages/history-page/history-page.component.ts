import { Component, EventEmitter, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/track.model';
import { SearchService } from '@modules/history/services/search.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  listResults: TrackModel[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  receiveData(term: string){
    this.searchService.searchTracks$(term).subscribe(({data}) => {
      this.listResults = data;
    })
  }

}
