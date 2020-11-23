import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from '.././shared/services/local-storage.service';
import {APP_KEY} from '../routes/welcome/welcome.page';

@Injectable({
  providedIn: 'root'
})
export class StartAppGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let appConfig: any = this.localStorageService.get(APP_KEY, {
      isLaunched: false,
      isLogin: false,
      version: '0.5.9'
    });
    if (appConfig.isLaunched === false) {
      appConfig.isLaunched = true;
      this.localStorageService.set(APP_KEY, appConfig);
      return true;
    } else {
      const lastloginTime: any = this.localStorageService.get('LoginLog',  {
        identifier: "",
        loginTime: new Date(),
        loginMaxTime: 0,
      }).loginMaxTime;

      console.log(lastloginTime);

      const loginTime = new Date().getTime();
      console.log(loginTime);

      if (loginTime > lastloginTime) {
        this.localStorageService.set(APP_KEY, {
          isLaunched: true,
          isLogin: false,
          version: '0.5.9',
        });
      }
      appConfig = this.localStorageService.get(APP_KEY, {
        isLaunched: false,
        isLogin: false,
        version: '0.5.9'
      });
      if (appConfig.isLogin == true) { this.router.navigateByUrl("home"); }
      else { this.router.navigateByUrl("login"); }
      return false;
    }
  }
}
