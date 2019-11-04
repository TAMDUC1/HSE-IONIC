import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {ActivatedRoute, Resolve} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SingleAuditResolverService implements Resolve<any>{

    constructor(private dataService:DataService,
                private router: ActivatedRoute) { }

    resolve(){
        console.log('data resolved 2 :)',this.dataService.getData(2));
        return this.dataService.getData(2);

    }
}
