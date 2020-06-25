import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuditDetailPage } from './audit-detail.page';
import { LvModalComponent } from './lv-modal/lv-modal.component';
import { AuditItemEvaluateComponent } from './audit-item-evaluate/audit-item-evaluate.component';
import { AuditImageZoomComponent } from './audit-image-zoom/audit-image-zoom.component';
import { LvMediaComponent} from './lv-media/lv-media.component';

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
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuditDetailPage, LvModalComponent,AuditItemEvaluateComponent,AuditImageZoomComponent,LvMediaComponent],
  entryComponents:[LvModalComponent,AuditItemEvaluateComponent,AuditImageZoomComponent,LvMediaComponent]
})
export class AuditDetailPageModule {}
