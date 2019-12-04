import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import {ModalController,NavParams} from '@ionic/angular';

@Component({
  selector: 'app-audit-image-zoom',
  templateUrl: './audit-image-zoom.component.html',
  styleUrls: ['./audit-image-zoom.component.scss'],
})
export class AuditImageZoomComponent implements OnInit {
  @ViewChild('slider', { read: ElementRef })slider: ElementRef;
  filesArr;
  index;
  sliderOpts: any;
  nd;

    constructor(
      private modalCtrl : ModalController,
      private navParams: NavParams,

    ) {
        this.sliderOpts = {
            initialSlide:this.navParams.get('index'),
           // initialSlide: this.index, // index image
            //effect:	'cube',
            spaceBetween: 10,
            zoom: {
                maxRatio: 5
            }
        };
    }
    zoom(zoomIn: boolean) {
        console.log('call zoom function');
        let zoom = this.slider.nativeElement.swiper.zoom;

        if (zoomIn) {
            zoom.in();
        } else {
            zoom.out();
        }
    }
    onCancel(){
        this.modalCtrl.dismiss(null,'cancel');

    }
    close() {
        this.modalCtrl.dismiss();
    }

  ngOnInit() {}

}
