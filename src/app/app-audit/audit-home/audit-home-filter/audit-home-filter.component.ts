import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-audit-home-filter',
  templateUrl: './audit-home-filter.component.html',
  styleUrls: ['./audit-home-filter.component.scss'],
})
export class AuditHomeFilterComponent {
    form : FormGroup;
    year : number;
    filterDate;
    //Get value on ionChange on IonRadioGroup
    selectedRadioGroup:any;
    //Get value on ionSelect on IonRadio item
    selectedRadioItem:any;
    finalSelect = {
        year :'' ,
        status :''
    };
    radio_list = [
        {
            id: '1',
            name: 'radio_list',
            value: 0,
            text: 'Tất cả',
            disabled: false,
            checked: true,
            color: 'primary'
        }, {
            id: '2',
            name: 'radio_list',
            value: 4,
            text: 'Kết thúc',
            disabled: false,
            checked: false,
            color: 'secondary'
        }, {
            id: '3',
            name: 'radio_list',
            value: 3,
            text: 'Theo dõi khắc phục',
            disabled: false,
            checked: false,
            color: 'danger'
        },
        {
            id: '4',
            name: 'radio_list',
            value: 2,
            text: 'Thực hiện kiểm tra',
            disabled: false,
            checked: false,
            color: 'brown'
        },
        {
            id: '5',
            name: 'radio_list',
            value: 1,
            text: 'Lập kế hoạch',
            disabled: false,
            checked: false,
            color: 'brown'
        },
    ];
    radioGroupChange(event) {
        console.log("Status",event.detail.value);
        this.finalSelect.status = event.detail.value || 0;
        console.log("finalSelect",this.finalSelect);

        //  this.selectedRadioGroup = event.detail;
    }
    radioGroupChangeYear(event) {
        console.log("Year",event.detail.value);
        this.finalSelect.year = event.detail.value || 'all';
        console.log("finalSelect",this.finalSelect);
    }

    radioFocus() {
        console.log("radioFocus");
    }
    radioSelect(event) {
        console.log("radioSelect",event.detail);
    //    this.selectedRadioItem = event.detail;
    }
    radioBlur() {
        console.log("radioBlur");
    }
    constructor(private modalCtrl: ModalController,
            //  private HTTP :HTTP,
    ) { }

    ngOnInit() {

    }
    onCancel(){
        this.modalCtrl.dismiss(null,'cancel');
    }
    onSubmit(){
        this.modalCtrl.dismiss(this.finalSelect,'save');
    }
}
