import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }
  signup(register: any): boolean {
    const UserList = this.localStorageService.get('UserList', []);
    let i: any;
    for (i = 0; i < UserList.length; i++) {
      if (register.phone == UserList[i].phone || register.email == UserList[i].email) {
        return false;
      }
    }

    const user = {
      phone: register.phone,
      email: register.email,
      shopName: register.shopName,
      password: register.password,
      CreateTime: new Date().toDateString(),
    };

    const LoginAccount = {
      userId: '',
      identifier: '',
      credential: ''
    };

    UserList.push(user);
    // console.log(this.UserList);
    this.localStorageService.set('UserList', UserList);
    return true;
  }
}
