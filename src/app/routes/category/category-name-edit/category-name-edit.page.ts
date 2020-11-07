import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-category-name-edit',
  templateUrl: './category-name-edit.page.html',
  styleUrls: ['./category-name-edit.page.scss'],
})
export class CategoryNameEditPage implements OnInit {

  name: string;
  constructor(private modalController: ModalController, private navParams: NavParams) {
    this.name = this.navParams.data['value'];
  }

  /**
   * 关闭模态窗口，并把分类名称传回给分类编辑页面
   * @param {string} name
   */
  dismiss(name?: string) {
    this.modalController.dismiss(name);
  }

  /**
   * 返回参数
   */
  onSave() {
    this.dismiss(this.name);
  }
  ngOnInit() {
  }

}
