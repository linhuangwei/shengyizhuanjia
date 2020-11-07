
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController, AlertController, ModalController, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/class/product';
import { CategoryListService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})


export class AddProductPage implements OnInit, OnDestroy {


  subscription: Subscription;
  product: Product;
  constructor(private actionSheetCtrl: ActionSheetController,
              private productService: ProductService,
              private navCtrl: NavController,
              private menuController: MenuController,
          //    private camera: Camera,
              private categoryService: CategoryListService,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private zone: NgZone,
          //    private barcodeScanner: BarcodeScanner,
          //    private imagePicker: ImagePicker,
              private router: Router) {
    this.product = this.initProduct();
    this.product.categoryName = '默认分类';


    // 观察者
    this.subscription = categoryService.watchCategory().subscribe(
      (activeCategory) => {
        console.log(activeCategory);
        this.product.categoryName = activeCategory.name;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * 上传图片
   * @returns {Promise<void>}
   */
  async onPresentActiveSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '选择您的操作',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('进入相机');
          //  this.onCamera();
          }
        }, {
            text: '相册',
              handler: () => {
              console.log('进入相册');
           //   this.onImagePicker();
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async onSave(ct: boolean = false) {
    this.productService.insert(this.product).then(async (data) => {
      if (data.success) {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加成功',
          buttons: ['确定']
        });
        alert.present();
        if (ct) {
          this.product = this.initProduct();
          this.product.categoryName = '默认分类';

        } else {
          this.router.navigateByUrl('/product-list');
        }
      } else {
        const alert = await this.alertCtrl.create({
          header: '提示',
          message: '添加失败',
          buttons: ['确定']
        });
        alert.present();
      }
    });
  }


  // onScan() {
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     console.log('Barcode data', barcodeData);
  //     this.product.barcode = barcodeData.text;
  //   }).catch(err => {
  //     console.log('Error', err);
  //   });
  // }

  /**
   * 拍照
   */
  // onCamera() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   };

  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     const base64Image = 'data:image/jpeg;base64,' + imageData;
  //     this.product.images.push(base64Image);
  //   }, (err) => {
  //     // Handle error
  //   });
  // }

  /**
   * 从相册中选取
   */
  // onImagePicker() {
  //   const options: ImagePickerOptions = {
  //     maximumImagesCount: 4,
  //     quality: 100
  //   };
  //   this.imagePicker.getPictures(options).then((results) => {
  //     for (let i = 0; i < results.length; i++) {
  //       console.log('Image URI: ' + results[i]);
  //       this.product.images.push(results[i]);
  //     }
  //   }, (err) => { });
  // }

  /**
   * 转跳到商品类别界面
   */
  gotoCategyList() {
    this.router.navigateByUrl('/category-list');
  }

  /**
   * 初始化商品
   * @returns {Product}
   */
  initProduct(): Product {
    return {
      id: '',
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '', // 条码
      images: [],
      price: null, // 售价
      purchasePrice: null, // 进价
      inventory: null, // 库存
      standard: null, // 规格
      remark: null
    };
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
  }
}

