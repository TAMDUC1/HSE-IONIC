import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GalleryViewerModalPage } from './gallery-viewer-modal.page';

const routes: Routes = [
  {
    path: '',
    component: GalleryViewerModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GalleryViewerModalPage]
})
export class GalleryViewerModalPageModule {}
