import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuditItemDetailsPage } from './audit-item-details.page';
import {AuditItemEvaluateComponent} from './audit-item-evaluate/audit-item-evaluate.component';
import {LvModalComponent} from '../audit-detail/lv-modal/lv-modal.component';

const routes: Routes = [
  {
    path: '',
    component: AuditItemDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuditItemDetailsPage,AuditItemEvaluateComponent],
    entryComponents:[AuditItemEvaluateComponent]

})
export class AuditItemDetailsPageModule {}
