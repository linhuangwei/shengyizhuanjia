import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { stringify } from 'querystring';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { PassportServiceService } from '../../../shared/services/passport-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  isOldPassword = true;
  oldPassword = '';
  newPassword = '';
  checkPassword = '';
  oldpasswordFlag = true;
  newpasswordFlag = true;
  oldPass = '';
  now = 0;
  constructor(
    private passportServiceService: PassportServiceService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private router: Router,
    private localStorage: LocalStorageService,
  ) { }

  async onSave() {

    const users: any = this.localStorage.get('UserList', null);
    const shop: any = this.localStorage.get('shop', null);
    let flag = 0;
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].password === this.oldPassword && users[i].phone === shop.phone
      ) {
        flag = 1;
        this.now = i;
        this.oldPass = users[i].password;
        break;
      }
    }

    if (flag == 0){
        const toast = await this.toastCtrl.create({
        message: '密码错误',
        duration: 2000,
        });
        await toast.present();
    }

    this.isOldPassword = this.oldPass == this.oldPassword ? true : false;

    if (this.newPassword == this.checkPassword && this.isOldPassword) {

      users[this.now].password = this.newPassword;
      this.localStorage.set('UserList', users);
      console.log('修改成功');
      this.router.navigateByUrl('/setting');
      const toast = await this.toastCtrl.create({
        message: '修改成功',
        duration: 2000,
      });
      await toast.present();
    }
  }
  ngOnInit() {}
  vaildoldPassport(event) {
    const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
    if (
      this.oldPassword.length < 6 ||
      this.oldPassword.length > 16 ||
      !reg.test(this.oldPassword)
    ) {
      this.oldpasswordFlag = false;
    } else {
      this.oldpasswordFlag = true;
    }
  }
  vaildnewPassport(event) {
    const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
    if (
      this.newPassword.length < 6 ||
      this.newPassword.length > 16 ||
      !reg.test(this.newPassword)
    ) {
      this.newpasswordFlag = false;
    } else {
      this.newpasswordFlag = true;
    }
  }
}
