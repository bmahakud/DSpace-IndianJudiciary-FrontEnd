import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuditRoutingModule } from './admin-audit-routing.module';
import { AuditUserListComponent } from './audit-user-list.component';
import { AuditUserDetailsComponent } from './audit-user-details.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuditUserListComponent,
    AuditUserDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminAuditRoutingModule
  ]
})
export class AdminAuditModule {}
