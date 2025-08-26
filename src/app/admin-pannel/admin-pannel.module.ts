import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminPannelComponent } from './admin-pannel.component';

@NgModule({
  declarations: [AdminPannelComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [AdminPannelComponent] 
})
export class AdminPannelModule {}

