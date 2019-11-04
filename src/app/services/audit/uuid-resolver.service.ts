import { Injectable } from '@angular/core';
import {ActivatedRoute, Resolve} from '@angular/router';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UuidResolverService implements Resolve<any>{

    constructor(private dataService:DataService,
                private router: ActivatedRoute) { }

    resolve(){
        console.log('uuid from resolve)',this.dataService.getUuid());
        return this.dataService.getUuid();

    }
}
