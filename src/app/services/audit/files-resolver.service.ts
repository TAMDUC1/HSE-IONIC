import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {Resolve, ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilesResolverService implements Resolve<any>{

  constructor(
      private dataService:DataService,
  ) { }
    resolve(){
        console.log('files from resolve',this.dataService.getFiles());
        return this.dataService.getFiles();

    }


}
