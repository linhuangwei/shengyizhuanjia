import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { AuthenticationCodeService } from '../authentication-code.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  user:any;
  phone = '';
  username: string = '';
  lcode: string = '';
  validcode: string = '';
  newpassword: string = '';
  passwordOk = true;
  @ViewChild('forgotpasswordSlides', {static: true}) forgotpasswordSlides: any;
  codelock: boolean;
  submited: boolean;

  constructor(public router: Router,
              private alertCtrl: AlertController,
              private storage: LocalStorageService,
              private authenticationCodeService: AuthenticationCodeService) { }

  ngOnInit() {
    this.forgotpasswordSlides.lockSwipeToNext(true);
    this.phone = this.storage.get('UserList',null);
  }

  onSubmitPhone(form: NgForm) {
    this.submited = true;
    if (form.valid) {
    // 已通过客户端验证
      this.next();
    }
  }

  next() {
    this.forgotpasswordSlides.lockSwipeToNext(false);
    this.forgotpasswordSlides.slideNext();
    this.forgotpasswordSlides.lockSwipeToNext(true);
  }

  sendcode() {
      this.validcode = this.authenticationCodeService.createCode(4);
      console.log(this.validcode);
   //   this.next();
      this.codelock = true;
  }
  async alert1(mes: string) {
    const alert = await this.alertCtrl.create({
      header: '提示',
      message: mes,
      buttons: ['确定']
    });
    alert.present();
  }
  async onvalidCode() {
    if (this.authenticationCodeService.validate(this.validcode)) {
      this.next();

    } else {
      console.log('短信验证码不正确或者已过期');
      this.alert1('短信验证码不正确或者已过期');
    }

  }

  checkPassword(event) {
    let reg1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
    if (this.newpassword.length < 6 || this.newpassword.length > 16 || !reg1.test(this.newpassword)) {
        this.passwordOk = false;
    } else {
        this.passwordOk = true;
    }
  }

  async resetpassword() {
    const uinfo: any = this.storage.get('UserList',null);
    let flag = 0;
    for(var i = 0; i < uinfo.length; i++){
      if(this.username == uinfo[i].phone || this.username == uinfo[i].email){//找到对应账号
        uinfo[i].password = this.newpassword;
        flag = 1;
        //this.user = uinfo[i];
        break;
      }
    }
    if(flag === 1){
      const user1: any = this.storage.set('UserList', uinfo);
      this.alert1('重置密码成功，返回登录');
      this.router.navigateByUrl('/login');
    }
    else {
      this.alert1('账号未注册');
      this.router.navigateByUrl('/login');
    }
  }
}
