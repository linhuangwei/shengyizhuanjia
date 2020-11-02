import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { PassportServiceService } from '../../../shared/services/passport-service.service';
import { APP_KEY } from '../../welcome/welcome.page';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  username = '';
  password = '';
  shop: any;
  constructor(
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private localStorageService: LocalStorageService,
    private router: Router,
    private passportservice: PassportServiceService,
    private storage: LocalStorageService,
    private menuController: MenuController) { }

  ngOnInit() {
  }

  async alert1(mes: string) {
    const alert = await this.alertCtrl.create({
      header: '提示',
      message: mes,
      buttons: ['确定']
    });
    alert.present();
  }

  async toast1(mes: string) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 3000
    });
    toast.present();
  }

  async onLogin(form: NgForm) {
    if (this.username === '') {
      this.toast1('请输入您的手机号码或者邮箱');
    }else if (this.password === '') {
      this.toast1('请输入您的密码');
    }else{
      const res = this.passportservice.login(this.username, this.password);
      if (!res.success) {
        const toast = await this.toastController.create({
          message: '用户名或密码错误',
          duration: 3000
        });
        toast.present();
      } else {
        const appConfig: any = this.localStorageService.get(APP_KEY, {
          isLaunched: false,
          isLogin: false,
          version: '1.0.0',
        });
        appConfig.isLogin = true;
        this.localStorageService.set(APP_KEY, appConfig);
        this.getShopLog();
        this.router.navigateByUrl('/home');
      }
    }
  }

  getShopLog() {
    this.shop = this.localStorageService.get('shop', {
      shopName: '',
      shortName: '',
      phone: '',
      email: '',
      shopKeeperName: '',
      shopTel: '',
      createTime: new Date(),
    });
    const accounts = this.localStorageService.get('UserList', '');
    for (let i = 0; i < accounts.length; i++) {
      if (
        accounts[i].phone == this.username ||
        accounts[i].email == this.username
      ) {
        this.shop.shopName = accounts[i].shopName;
        this.shop.phone = accounts[i].phone;
        this.shop.email = accounts[i].email;
        break;
      }
    }
    this.localStorageService.set('shop', this.shop);
  }
  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
  }

}
