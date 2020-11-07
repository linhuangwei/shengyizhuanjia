import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, ModalController, NavController, ToastController } from '@ionic/angular';
import { Category } from '../../../shared/class/category';
import { CategoryListService } from '../../../shared/services/category.service';
import { CategoryNameEditPage } from '../category-name-edit/category-name-edit.page';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.page.html',
  styleUrls: ['./category-edit.page.scss'],
})
export class CategoryEditPage implements OnInit {

  id: any;
  category: Category;
  constructor(private activatedRoute: ActivatedRoute, 
              private categoryService: CategoryListService,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private navCtrl: NavController, 
              private router: Router) {
      this.id = this.activatedRoute.snapshot.params['id'];
     // this.id = 0;
      console.log(this.id);

      this.category = this.categoryService.findCategoryById(this.id); // 获取到商品类别
      console.log(this.category);
  }
    ngOnInit() {
  }

  /**
   * 展示模态框
   */
  private async presentModal(name: string) {
    const modal = await this.modalCtrl.create({
      component: CategoryNameEditPage,
      componentProps: {value: name}
    });
    await modal.present();
    return modal.onWillDismiss();
  }

  /**
   * 编辑商品分类名称
   *
   */
  async onEditCategoryName(item: IonItemSliding) {
    item.close();
    const {data} = await this.presentModal(this.category.name);
    if (data) {
      this.category.name = data;
    }
  }
  /**
   * 编辑商品子分类名称

   */
  async onEditSubCategoryName(item: IonItemSliding, subCategory: Category) {
    item.close();
    const {data} = await this.presentModal(subCategory.name);
    if (data) {
      subCategory.name = data;
    }
  }

  /**
   * 删除商品分类
   */
  async onDelete(item: IonItemSliding, subId?: number){
    const alert = await this.alertCtrl.create({
      header: '你确认要删除吗!',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            item.close();
          }
        }, {
          text: '确认',
          handler: () => {
            if (subId != null) { // 删除商品子分类
              item.close();
              this.categoryService.deleteSubCategoryById(this.category, subId);
              this.category = this.categoryService.findCategoryById(this.id);
            } else if (this.category.children.length === 0) { // 删除商品分类
              item.close();
              this.categoryService.deleteCategoryById(this.category.id);
              this.router.navigateByUrl('/category-list');
            } else {
              item.close();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   * 保存修改数据
   */
  async onSave() {
    if (this.categoryService.modifyCategory(this.category)) {
      this.router.navigateByUrl('/category-list');
      const toast = await this.toastCtrl.create({
        message: '保存成功',
        duration: 3000
      });
      toast.present();

    } else {
      this.router.navigateByUrl('/category-list');
      const toast = await this.toastCtrl.create({
        message: '保存失败',
        duration: 3000
      });
      toast.present();
    }
  }

}
