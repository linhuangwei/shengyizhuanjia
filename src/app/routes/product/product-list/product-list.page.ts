import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, LoadingController, ToastController } from '@ionic/angular';
import { AjaxResult } from '../../../shared/class/ajax-result';
import { Product } from '../../../shared/class/product';
import { CategoryListService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  constructor(private loadingCtroller: LoadingController, private productService: ProductService,
              private toastCtrl: ToastController,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryListService) {

    this.categoryName = '';

    this.subscription = categoryService.watchCategory().subscribe(
      (activeCategory) => {
        console.log(activeCategory);
        this.categoryName = activeCategory.name;
        console.log(this.categoryName);

      },
      (error) => {
        console.log(error);
      }
    );

  }

  currentIndex: number; // 当前页码，显示哪一页的商品数据
  products: Product[]; // 存放商品数据
  total: number; // 商品总记录数
  inventory: number; // 总正库存
  price: number;
  queryTerm: string; // 查询条件
  categoryId: number; // 类别编号用于保存用户选择的类别，初始值威-1
  subscription: any;
  product: Product;
  categoryName: any;



  @ViewChild(IonInfiniteScroll) ioninfiniteScroll: IonInfiniteScroll;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  async ngOnInit() {
    const loading = await this.loadingCtroller.create({
      message: '正在加载数据，请稍候...',
      spinner: 'bubbles',
    });
    loading.present();
    this.activatedRoute.url.subscribe((params) => {
      this.chushihua();
    });
    loading.dismiss();
    // try {
    //   this.chushihua();
    //   loading.dismiss();

    // } catch (error) {
    //   console.log(error);
    // }

  }
  async chushihua() {
    console.log(this.categoryName);

    if (this.categoryName == ''){

      this.currentIndex = 1;
      this.inventory = 0;
      this.price = 0;
      const ajaxResult: AjaxResult = await this.productService.getList(this.currentIndex, 10);
      this.products = ajaxResult.result;
      for (const product of this.products) {
        this.inventory += product.inventory;
        this.price += product.price;
     }
      this.total = this.products.length;

    }

    else {
        this.currentIndex = 1;
        this.inventory = 0;
        this.price = 0;
        const ajaxResult: AjaxResult = await this.productService.getListByCategoryName(this.currentIndex, 10, this.categoryName);
        this.products = ajaxResult.result;
        console.log(this.products)
        for (const product of this.products) {
          this.inventory += product.inventory;
          this.price += product.price;
        }
        this.total = this.products.length;

    }

  }
  /**
   * 查询商品数据
   */
  async onInput(event) {

    const condition = event.target.value;
    try {
      if (condition == '') {
        this.chushihua();
    } else {
        this.currentIndex = 1;
        this.inventory = 0;
        this.price = 0;
        const ajaxResult: AjaxResult = await this.productService.getListByCondition(this.currentIndex, 10, condition);
        this.products = ajaxResult.result;
        for (const product of this.products) {
          this.inventory += product.inventory;
          this.price += product.price;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  gotoCategyList() {
    this.router.navigateByUrl('/category-list');
  }


  async onRefresh(event) {
    const refresh = event.target;
    this.categoryName = '';
    console.log(this.categoryName);

    this.currentIndex = 1;

    try {
      this.inventory = 0;
      this.price = 0;

      const ajaxResult: AjaxResult = await this.productService.getList(this.currentIndex, 10);
      this.products = ajaxResult.result;
      for (const product of this.products) {
        this.inventory += product.inventory;
        this.price += product.price;
      }
      this.total = this.products.length;

    } catch (error) {
      console.log('出现错误');
      console.log(error);
    }
    refresh.complete();
  }

  async onInfinite(event) {
    setTimeout(async () => {
    
    const infiniteScroll = event.target;
    this.currentIndex++;
    console.log(this.currentIndex);
    console.log(this.total);
    const ajaxResult: AjaxResult = await this.productService.getList(this.currentIndex, 10);
    if (this.total - (this.currentIndex - 1) * 10) {
      const toast = await this.toastCtrl.create({
        message: '已是最后一页',
        duration: 3000
      });
      toast.present();
    } else {
      // this.inventory = 0;
      // this.price = 0;
      // this.products = ajaxResult.result;
      for (const product of  ajaxResult.result) {
        this.inventory += product.inventory;
        this.price += product.price;
        this.products.push(product)
      }
      this.total = this.products.length;
    }
    infiniteScroll.complete();
  }, 1000);
  }

}
