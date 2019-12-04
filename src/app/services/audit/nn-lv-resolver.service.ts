import { Injectable } from '@angular/core';
import {ActivatedRoute, Resolve} from '@angular/router';
import {DataService} from './data.service';
@Injectable({
  providedIn: 'root'
})
export class NnLvResolverService implements Resolve<any>{

  constructor(private dataService:DataService,
              private router: ActivatedRoute) { }
    resolve(){
        console.log('nn and lv)',this.dataService.getObj());
        return this.dataService.getObj();

    }
}
