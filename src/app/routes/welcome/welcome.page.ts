import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonSlides, MenuController } from '@ionic/angular';
import {LocalStorageService} from '../../shared/services/local-storage.service';
import {Router} from '@angular/router';
export const APP_KEY = 'App';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  encapsulation: ViewEncapsulation.None
})


export class WelcomePage implements OnInit {
  showSkip = true;
   @ViewChild('slides', {static: false}) slides: IonSlides;
   constructor(
     private localStorageService: LocalStorageService,
     private router: Router,
     private menuController: MenuController
     ) {}

   ngOnInit() {}
   onSkip(){
    //第一次调用get方法时，'App'这个key不存在，第二个参数会作为默认值返回 
    let appConfig: any = this.localStorageService.get(APP_KEY, {
      isLaunched: false,
      isLogin:false,
      version: '1.0.0'
    });
    if (appConfig.isLogin === false ) {
      this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl('signup');
    }
  }

  onSlideWillChange(event) {
    this.slides.isEnd().then((end) => {
      this.showSkip = !end;
    });
  }

  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(false);
  }
}
