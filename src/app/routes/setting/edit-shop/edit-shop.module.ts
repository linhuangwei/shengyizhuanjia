import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditShopPageRoutingModule } from './edit-shop-routing.module';

import { EditShopPage } from './edit-shop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditShopPageRoutingModule
  ],
  declarations: [EditShopPage]
})
export class EditShopPageModule {}
