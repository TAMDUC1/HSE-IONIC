import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import {Resolve, ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any>{

  constructor(private dataService:DataService,
              private router: ActivatedRoute) { }

  resolve(){
    console.log('data resolved :)');
    return this.dataService.getData(1);

  }
}
