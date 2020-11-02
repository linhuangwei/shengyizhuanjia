import { Injectable } from '@angular/core';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { APP_KEY } from '../welcome/welcome.page';
export const Users = 'UserList';
export const LoginLogs = 'LoginLog';
export const Shops = 'shop';
@Injectable({
  providedIn: 'root',
})
export class SettingServiceService {
  public TUser: any;
  public TAccount: any;
  public TShop: any;
  public APP: any;
  constructor(private localStorageService: LocalStorageService) {}
  load() {
    this.TUser = this.localStorageService.get(Users, null);
    this.TAccount = this.localStorageService.get(LoginLogs, null);
    this.TShop = this.localStorageService.get(Shops, null);
    this.APP = this.localStorageService.get(APP_KEY, null);
  }
}
