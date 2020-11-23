import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { APP_KEY } from '../welcome/welcome.page';
import { SettingServiceService } from './setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  version: any;

  constructor(
    private settingService: SettingServiceService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  onCall(phoneNumber) {
    window.location.href = 'tel:' + phoneNumber;
  }
  ionViewWillEnter() {
    this.settingService.load(); //读配置
    this.version = this.settingService.APP.version; //版本号
  }

  onLogout() {
    this.localStorageService.remove("LoginLog");
    this.localStorageService.remove("shop"); 
    const appConfig: any = this.localStorageService.get(APP_KEY, {
      isLaunched: false,
      isLogin: false,
      version: '0.5.9'
    });
    appConfig.isLogin = false;
    this.localStorageService.set(APP_KEY, appConfig);
    this.router.navigateByUrl("login");
  }

}
