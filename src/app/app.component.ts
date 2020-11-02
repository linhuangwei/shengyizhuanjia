import { Component, OnInit } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages: Array<{title: string, url: string, icon: string}>;
  public router: Router;
  

  


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuController: MenuController,
  ) {
    this.initializeApp();
    this.appPages = [
      { title: '开店论坛', url: '/home', icon: 'chatbox' },
      { title: '手机橱窗', url: '/home', icon: 'create' },
      { title: '邀请有礼', url: '/home', icon: 'git-merge' },
      { title: '资金账户', url: '/home', icon: 'cash' },
      { title: '反馈建议', url: '/home', icon: 'cash' },
      { title: '帮助中心', url: '/home', icon: 'cash' },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
  }

}
