import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonSlides, MenuController, NavController } from '@ionic/angular';
import { AuthenticationCodeService } from '../authentication-code.service';
import { Signup } from '../signup';
import { LocalStorageService } from '../../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  constructor(
      private authenticationCode: AuthenticationCodeService,
      private Acs: AuthenticationCodeService,
      private storage: LocalStorageService,
      private router: Router,
      private menuController: MenuController,
      private userservice: UserService,
      private alertController: AlertController,
      private nav: NavController
    ) {
      this.submited = false;
      this.signup = {
        phone: '',
        email: '',
        shopName: '',
        password: '',
        confirmPassword: '',
        code: '',
      };
      this.codelock = false;
    }
  submited: boolean;
  codelock: boolean;
  shopNameOk = true;
  emailOk = true;
	passwordOk = true;
  confirmPasswordOk = true;
  signup: Signup;

  slideIndex = 0;

  @ViewChild('signupSlides', {static: true}) signupSlides: IonSlides;

  verifyCode: any = {
    verifyCodeTips: '获取验证码',
    code : '',
    codeLength: 4,
    countdown: 60,
    disable: true,
    fail: false// 验证失败
  };

  params: any = {
    checkInformationResult: false
};

  code_test = '';

  // 字符串'signupSlides'和模板中的#signupSlides引用变量的名称一致
  ngOnInit() {
     this.signupSlides.lockSwipeToNext(true);
  }

  canGoBack() {
    this.nav.back();
  }

  onNext(){
    this.signupSlides.lockSwipeToPrev(true);
    this.signupSlides.lockSwipeToNext(false);
    this.signupSlides.slideNext();
    this.signupSlides.lockSwipeToNext(true);
    this.slideIndex += 1;
    // this.signupSlides.lockSwipeToNext(true);
  }
  onPrevious() {
    this.signupSlides.lockSwipeToPrev(false);
    this.signupSlides.slidePrev();
    this.signupSlides.lockSwipeToPrev(true);
    this.slideIndex -= 1;
  }
  onSubmitPhone(form: NgForm) {
      this.submited = true;
      if (form.valid) {
      // 已通过客户端验证
        console.log(this.signup.phone);
        this.onNext();
      }
  }
  
  settime() {
    if (this.verifyCode.countdown === 1) {
        this.verifyCode.countdown = 60;
        this.verifyCode.verifyCodeTips = '重新获取';
        this.verifyCode.disable = true;
        return;
    } else {
        this.verifyCode.countdown--;
    }

    this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
    setTimeout(() => {
        this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
        this.settime();
    }, 1000);
  }

  getCode() {
    // 获取验证码
    this.code_test = this.authenticationCode.createCode(this.verifyCode.codeLength);
    console.log('验证码：' + this.code_test);
    this.verifyCode.disable = false;
    this.settime();
  }

  checkCode() {
    console.log(this.verifyCode.code);
    console.log(this.code_test);
    if (this.code_test == this.verifyCode.code) {
      this.verifyCode.fail = false;
      this.onNext();
    } else {
        this.verifyCode.fail = true;
    }
 }

  async onInputMes(event) {
      if (this.shopNameOk && this.emailOk && this.passwordOk && this.confirmPasswordOk) {
          const mark = this.userservice.signup(this.signup);
          if (mark == false) {
              const alert = await this.alertController.create({
                  header: '提示',
                  message: '手机号或邮箱已使用',
                  buttons: ['确定']
              });
              alert.present();

          } else {
              this.onNext();
          }

      }
    }
    checkShopName(event) {
      if (this.signup.shopName.length > 8 || this.signup.shopName.length === 0) {
          this.shopNameOk = false;
      } else {
          this.shopNameOk = true;
      }
    }

    checkEmail(event) {
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (this.signup.email.length < 4 || this.signup.email.length > 30 || !reg.test(this.signup.email)) {
          this.emailOk = false;
      } else {
          this.emailOk = true;
      }
    }

    checkPassword(event) {
        let reg1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
        if (this.signup.password.length < 6 || this.signup.password.length > 16 || !reg1.test(this.signup.password)) {
            this.passwordOk = false;           
        } else {           
            this.passwordOk = true;
        }
    }

    checkConfirmPassword(event) {
        const reg1 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/;
        if (this.signup.confirmPassword.length < 6 || this.signup.confirmPassword.length > 16 || !reg1.test(this.signup.password)
            || this.signup.confirmPassword !== this.signup.password) {
            this.confirmPasswordOk = false;
        } else {
            this.confirmPasswordOk = true;
        }
    }
    GoToLogin(event) {
        this.router.navigateByUrl('login');
    }

    ionViewWillEnter() {
        this.menuController.enable(false);
    }

    ionViewDidLeave() {
        this.menuController.enable(true);
    }
  }




