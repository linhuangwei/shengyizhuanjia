import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassportRoutingModule } from './passport-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { SignupPage } from './signup/signup.page';

@NgModule({
  declarations: [
     SignupPage
  ],
  imports: [
    // CommonModule,
    SharedModule,
    PassportRoutingModule
  ]
})
export class PassportModule { }
