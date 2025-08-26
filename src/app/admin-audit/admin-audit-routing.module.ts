import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditUserListComponent } from './audit-user-list.component';
import { AuditUserDetailsComponent } from './audit-user-details.component';

const routes: Routes = [
  { path: '', component: AuditUserListComponent },
  { path: 'user/:userId', component: AuditUserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuditRoutingModule {}
