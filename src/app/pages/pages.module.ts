import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AngularMaterialModule } from '../modules/angular-material.module';


@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    AngularMaterialModule
  ]
})
export class PagesModule {
}
