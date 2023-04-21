import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCardComponent} from "./user-card/user-card.component";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    UserCardComponent
  ]
})
export class UserModule {
}
