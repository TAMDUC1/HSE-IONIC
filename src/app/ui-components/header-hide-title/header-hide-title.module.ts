import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HeaderHideTitlePage } from './header-hide-title.page';

const routes: Routes = [
  {
    path: '',
    component: HeaderHideTitlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeaderHideTitlePage]
})
export class HeaderHideTitlePageModule {}
