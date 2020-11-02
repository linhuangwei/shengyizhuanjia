import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../shared/services/local-storage.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  shop: any;
  createTime: any;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe((params) => {
      this.shopDataInit();
  });
  }
  shopDataInit() {
    console.log('shop');
    this.shop = this.localStorageService.get('shop', '');
    this.createTime = this.shop.createTime;
    console.log(this.shop);
  }

  onBack() {
    this.router.navigateByUrl('setting');
  }
}