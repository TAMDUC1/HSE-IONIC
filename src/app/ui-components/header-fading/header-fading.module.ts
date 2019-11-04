import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HeaderFadingPage } from './header-fading.page';

const routes: Routes = [
  {
    path: '',
    component: HeaderFadingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeaderFadingPage]
})
export class HeaderFadingPageModule {}
