import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuditDetailPage } from './audit-detail.page';
import { LvModalComponent } from './lv-modal/lv-modal.component';

const routes: Routes = [
  {
    path: '',
    component: AuditDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuditDetailPage, LvModalComponent],
  entryComponents:[LvModalComponent]
})
export class AuditDetailPageModule {}
