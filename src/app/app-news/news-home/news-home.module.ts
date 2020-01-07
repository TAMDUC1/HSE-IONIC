import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsHomePage } from './news-home.page';
import {AuditHomePage} from '../../app-audit/audit-home/audit-home.page';
import {AuditHomeFilterComponent} from '../../app-audit/audit-home/audit-home-filter/audit-home-filter.component';
import {NewDetailComponent} from './new-detail/new-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NewsHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewsHomePage,NewDetailComponent],
  entryComponents:[NewDetailComponent]

})
export class NewsHomePageModule {}
