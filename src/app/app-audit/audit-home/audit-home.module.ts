import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AuditHomePage } from './audit-home.page';
import {AuditHomeFilterComponent} from './audit-home-filter/audit-home-filter.component';
import {AuditItemEvaluateComponent} from '../audit-item-details/audit-item-evaluate/audit-item-evaluate.component';

const routes: Routes = [
  {
    path: '',
    component: AuditHomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuditHomePage,AuditHomeFilterComponent],
  entryComponents:[AuditHomeFilterComponent]

})
export class AuditHomePageModule {}
