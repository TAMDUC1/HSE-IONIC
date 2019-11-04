
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gallery-viewer-modal',
  templateUrl: './gallery-viewer-modal.page.html',
  styleUrls: ['./gallery-viewer-modal.page.scss'],
})
export class GalleryViewerModalPage implements OnInit {
  @ViewChild('slider', { read: ElementRef })slider: ElementRef;
  imgArray: any=[]; 
 
   //this.img = this.navParams.get('img');
   sliderOpts: any;
 
  
   constructor(
     private navParams: NavParams, 
     private modalController: ModalController) {

       this.imgArray = this.navParams.get('data');
       console.log("_____get index="+this.navParams.get('index'));
       console.log("get data="+this.imgArray);
       console.log("_________this.img  = "+JSON.stringify(this.imgArray)); 
       this.sliderOpts = {
         initialSlide:this.navParams.get('index'), // index image
         //effect:	'cube',
         spaceBetween: 10,
         zoom: {
           maxRatio: 5
         }
       };
    }
  
   ngOnInit() {
    
     
   }
  
   zoom(zoomIn: boolean) {
     console.log("call zoom function");
     let zoom = this.slider.nativeElement.swiper.zoom;
     
     if (zoomIn) {
       zoom.in();
     } else {
       zoom.out();
     }
   }
  
   close() {
     this.modalController.dismiss();
   }
 
 
 }
 