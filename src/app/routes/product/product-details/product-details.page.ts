import { PassportServiceService } from './../../../shared/services/passport-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController, AlertController, ToastController, NavController, ActionSheetController } from '@ionic/angular';
import { Product } from '../../../shared/class/product';
import { ProductService } from '../../../shared/services/product.service';
import { ProductEditPage } from '../product-edit/product-edit.page';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product: Product;
  seePrice: boolean;
  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private popoverCtrl: PopoverController,
              private alertCtrl: AlertController,
              private passportservice: PassportServiceService,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController) {
    this.ionViewDidEnter();
  }


  async onPresentPopover(event) {
    const popover = await this.popoverCtrl.create({
      component:  ProductEditPage,
      event: event,
      componentProps: {'barcode': this.product.barcode},
      translucent: false,
      backdropDismiss: true
    });
    await popover.present();
  }

  /**
   * 验证用户信息
   * @returns {Promise<void>}
   */
  async checkUser() {
    const alert = await this.alertCtrl.create({
      header: '请登录',
      inputs: [
        {
          name: 'account',
          type: 'text',
          placeholder: '请输入账户'
        },
        {
          name: 'password',
          type: 'text',
          placeholder: '请输入账密码'
        }
      ],
      buttons: [
        {
          text: '确定',
          handler: async (data) => {
            console.log('确定');
            const res = this.passportservice.login(data.account, data.password);
            if (res.success) {
              console.log('验证成功');
              this.seePrice = true;
            } else {
              console.log('验证失败');
              const toast = await this.toastCtrl.create({
                message: '账号或密码错误',
                duration: 3000
              });
              await toast.present();
            }
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('cancel');
          }
        }
      ]
    });
    await alert.present();
  }
  goToInventoryPage() {
    this.navCtrl.navigateForward(['/inventory', this.product.barcode]);
  }
  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '分享',
      buttons: [{
        text: '短信',
        role: 'share',
        icon: 'mail-sharp',
        handler: () => {
          console.log('mail');
        }
      },{
        text: '微信',
        role: 'share',
        icon: 'chatbubbles',
        handler: () => {
          console.log('WeChat');
        }
      }, {
        text: 'QQ',
        role: 'share',
        icon: 'logo-tux',
        handler: () => {
          console.log('QQ');
        }
      }, {
          text: '取消',
          role: 'cancel',
        handler: () => {
            console.log('cancel');
        }
      }]
    });
    await actionSheet.present();
  }
  /**
   * 进入页面时，初始化数据
   * 因为可能进行多次页面传递参数
   */
  ionViewDidEnter() {
    const barcode = this.activatedRoute.snapshot.params['barcode'];
    this.product = this.productService.getProductByBarcode(barcode);
    this.seePrice = false;
  }
  /**
   * 离开页面时，隐藏价格
   */
  ionViewDidLeave() {
    this.seePrice = false;
  }
  ngOnInit() {  }

}
