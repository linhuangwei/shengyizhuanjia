import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { AjaxResult } from '../class/ajax-result';

@Injectable({
  providedIn: 'root'
})
export class PassportServiceService {

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  login(account: string, password: string): AjaxResult {
    const accounts = this.localStorageService.get('UserList', '');

    if (!this.checkAccount(account, password)) {
        return new AjaxResult(false, null, {
          message: '您输入的手机号码或密码错误',
          details: ''
        }); // 账号或密码错误
    }

    const loginTime = new Date(+new Date() + 5 * 60 * 1000).getTime();
    const Tloginlog = {
      identifier: account,
      loginTime: new Date(),
      loginMaxTime: loginTime,
    };
    this.localStorageService.set('LoginLog', Tloginlog); // 记录本次用户登录时间
    console.log(Tloginlog.loginTime);
    return new AjaxResult(true, null);
  }

  checkAccount(phone: string, password: string): boolean {
    const accounts = this.localStorageService.get('UserList', []);
    let i: any;
    let flag = false;
    for (i = 0; i < accounts.length; i++) {
      if ( (accounts[i].phone == phone || accounts[i].email == phone) && accounts[i].password == password ) {
        flag = true;
        break;
      }
    }
    return flag;

  }
}
