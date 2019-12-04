import { Injectable } from '@angular/core';
import {ActivatedRoute, Resolve} from '@angular/router';
import {DataService} from './data.service';
@Injectable({
  providedIn: 'root'
})
export class NdResolverService implements Resolve<any>{

  constructor(private dataService:DataService,
              private router: ActivatedRoute) { }
  resolve(){
      console.log('nd)',this.dataService.getNd());
      return this.dataService.getNd();

  }
}
