import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
// media

// @ts-ignore
import { ImagePicker } from '@ionic-native/image-picker/ngx';
//import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

//******** Angularfire ********/
import { AngularFireModule } from '@angular/fire';

// ******* firebase api key ********//
import { environment } from '../environments/environment';

//******* firebase api key ********//
import { AngularFireAuthModule } from '@angular/fire/auth';

//******* firebase firestore ********//
import { AngularFirestoreModule } from '@angular/fire/firestore';

//******* firebase storage ********//
import { AngularFireStorageModule } from '@angular/fire/storage';


//******* Travel page module ********//
/*import { TravelMapPageModule } from './app-travel/travel-map/travel-map.module';
import { TravelMapModalPageModule } from './app-travel/travel-map-modal/travel-map-modal.module';
import { TravelSearchPageModule } from './app-travel/travel-search/travel-search.module';
import { TravelPlaceReviewAddPageModule } from './app-travel/travel-place-review-add/travel-place-review-add.module';
import { TravelImageZoomPageModule } from './app-travel/travel-image-zoom/travel-image-zoom.module';*/

//******* Audit page module ********//



//******* Food page module ********//
//import { FoodSearchPageModule } from './app-food/food-search/food-search.module';
//import image gallery page module
//import { ImageModalPageModule } from './image-modal/image-modal.module';


//******* Shopping page module ********//
//import { ShoppingSearchPageModule } from './app-shopping/shopping-search/shopping-search.module'



//******* Real estate page module ********//
//import { RealSearchPageModule } from './app-real/real-search/real-search.module'
//import { RealMapPageModule } from './app-real/real-map/real-map.module'


//******* Radio station page module ********//
//import { RadioPlayerPageModule } from './app-radio/radio-player/radio-player.module';


//******* UI-layout / gallery viewer ********//
//import { GalleryViewerModalPageModule } from './ui-layouts/gallery-viewer-modal/gallery-viewer-modal.module';


//******** UI_components / modal detail *********/
//import { ModalDetailPageModule } from './ui-components/modal-detail/modal-detail.module';


//******** ionic4 rating *********/
//import { IonicRatingModule } from 'ionic4-rating/dist';


//******** Shared module *********/
import { SharedModule} from './shared/shared.module';
import {AuditHomePage} from './app-audit/audit-home/audit-home.page';
import {AuditTabsPageModule} from './app-audit/audit-tabs/audit-tabs.module';
import {AuditHomePageModule} from './app-audit/audit-home/audit-home.module';

import { IonicStorageModule, Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import {ApiService} from './services/audit/api.service';
import { DataService } from './services/audit/data.service';

import {AuditItemEvaluateComponent} from './app-audit/audit-item-details/audit-item-evaluate/audit-item-evaluate.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';


export function jwtOptionsFactory(storage) {
    return {
        tokenGetter: () => {
            return storage.get('access_token');
        },
        whitelistedDomains: ['http://54.169.202.105:99']
    }
}
@NgModule({
  declarations: [AppComponent ], // Autosize
  entryComponents: [],
  imports: [
    BrowserModule,
   // IonicRatingModule, // Put ionic-rating module here
    SharedModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      rippleEffect: false,
      mode: 'ios'
    }),
    HttpClientModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
          jwtOptionsProvider: {
              provide: JWT_OPTIONS,
              useFactory: jwtOptionsFactory,
              deps: [Storage],
          }
      }),
    //******* Travel page module ********//
    /*TravelImageZoomPageModule,
    TravelMapPageModule,
    TravelMapModalPageModule,
    TravelSearchPageModule,
    TravelPlaceReviewAddPageModule,*/

    //******* Food page module ********//
    //FoodSearchPageModule,

    //******* Shopping page module ********//
    //ShoppingSearchPageModule,
   // ShoppingImageGalleryPageModule,

    //******* Real estate page module ********//
    //RealSearchPageModule,
    //RealMapPageModule,

    //******* Radio station page module ********//
    //RadioPlayerPageModule,

    //******* UI-components / modal ********//
    //ModalDetailPageModule,

    //******* UI-layout / gallery ********//
    //GalleryViewerModalPageModule,

    FormsModule,
    ReactiveFormsModule ,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicModule.forRoot(),
  ],
  providers: [
    StatusBar,
    HTTP,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      ApiService,
      Network,
      DataService,
      ImagePicker,
      MediaCapture,
      File,
      FileOpener,
      FileTransfer,
      DocumentViewer,
      Media,
      StreamingMedia,
      PhotoViewer,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)["__zone_symbol__originalInstance"];
    return zoneOriginalInstance || fileReader;
}
