import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HeaderTransparentPage } from './header-transparent.page';

const routes: Routes = [
  {
    path: '',
    component: HeaderTransparentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeaderTransparentPage]
})
export class HeaderTransparentPageModule {}
