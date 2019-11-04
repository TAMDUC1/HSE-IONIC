import { Component, OnInit } from '@angular/core';
import {IAudit} from '../audit';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalController, NavController} from '@ionic/angular';
import {IonicComponentService} from '../../services/ionic-component.service';
import { ApiService } from '../../services/audit/api.service';
import { FoodService } from '../../services/food.service';
import { NetworkService} from '../../services/network.service';
import { DataService } from '../../services/audit/data.service';

@Component({
  selector: 'app-audit-home',
  templateUrl: './audit-home.page.html',
  styleUrls: ['./audit-home.page.scss'],
})
export class AuditHomePage implements OnInit {
    public http;
    public audits;
    public audit:IAudit;
    public CompArrs = [];
    page = 0;
  constructor(
      private activatedRoute: ActivatedRoute,
      private navController: NavController,
      public router: Router,
      private modalController: ModalController,
      private ionicComponentService: IonicComponentService,
      private apiService: ApiService,
      private dataService: DataService
  ) { }

  ngOnInit() {
    this.loadData(true);
  }
    toggleSideMenu() {
        this.ionicComponentService.sideMenu();
       // this.test.getapiServiceHse();

        //this.menuCtrl.toggle(); //Add this method to your button click function
    }
    openDetail(url,uuid){
        this.audits.forEach((e)=>{
            if(e.uuid == uuid){
                this.dataService.setData(2,this.audits);
            }
        });
        this.router.navigateByUrl('/'+url+'/'+uuid);
    }
    loadData(refresh = false, refresher?) {
        this.apiService.getAllAudits().subscribe((res: IAudit[]) => {
            console.log('data',res);
            var temp =[];
            res.forEach((e)=>{
                //  console.log(e.uuid);
               // this.audit = e;
                e.data = JSON.parse(e.data);
                if(e.kind == 1){
                    temp.push(e);
                    this.CompArrs.push(e);
                }

            });
           // console.log('temp',temp);
            this.audits = res;
            this.dataService.setData(1,this.audits);

           // console.log('data2',this.audits);

            if(refresher){
                refresher.target.complete();
            }
        })
    }


}
