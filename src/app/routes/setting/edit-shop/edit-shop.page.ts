import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LocalStorageService } from '../../../shared/services/local-storage.service';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.page.html',
  styleUrls: ['./edit-shop.page.scss'],
})
export class EditShopPage implements OnInit {
  property: any;
  title: any;
  shop: any;
  value: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private toastController: ToastController,
    private router: Router
  ) {
    activatedRoute.queryParams.subscribe((queryParams) => {
      this.property = queryParams.property;
      this.title = queryParams.title;
    });
  }

  ngOnInit() {}
  async onSave() {
    this.shop = this.localStorageService.get("shop", "");

    this.shop[this.property] = this.value;
    this.localStorageService.set("shop", this.shop);
    this.value = "";
    const toast = await this.toastController.create({
      message: "保存成功",
      duration: 3000,
    });
    toast.present();
    this.router.navigateByUrl("/shop", { skipLocationChange: false });
  }

}
