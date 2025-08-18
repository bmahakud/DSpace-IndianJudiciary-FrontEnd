// import { NgModule } from "@angular/core"
// import { CommonModule } from "@angular/common"
// import { ReactiveFormsModule } from "@angular/forms"
// import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
// import { SharedModule } from "../shared/shared.module"
// import { PetitionerRespondentSearchComponent } from "./petitioner-respondent-search.component" 


// @NgModule({
//   imports: [CommonModule, ReactiveFormsModule, NgbModule, SharedModule, PetitionerRespondentSearchComponent],
//   declarations: [PetitionerRespondentSearchComponent],
//   exports: [PetitionerRespondentSearchComponent],
// })
// export class PetitionerRespondentSearchModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// import { PetitionerRespondentSearchComponent3 } from "./petitioner-respondent-search3.component" 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
import { PetitionerRespondentSearchComponent3 } from "./petitioner-respondent-search3.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,ReactiveFormsModule,SharedModule
  ],
  declarations: [
    PetitionerRespondentSearchComponent3,
  ],
  exports: [
    PetitionerRespondentSearchComponent3,
  ],
})
export class PetitionerRespondentSearchModule3 {}
