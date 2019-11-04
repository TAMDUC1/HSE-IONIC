import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HeaderShrinkingPage } from './header-shrinking.page';
import { SharedModule } from '../../shared/shared.module';
const routes: Routes = [
  {
    path: '',
    component: HeaderShrinkingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HeaderShrinkingPage]
})
export class HeaderShrinkingPageModule {}
