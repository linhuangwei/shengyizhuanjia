import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Category } from '../../shared/category';
import { CategoryListService } from '../../shared/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.page.html',
  styleUrls: ['./category-add.page.scss'],
})
export class CategoryAddPage implements OnInit {
  headTitle: any;
  title1: any;
  category: Category;
  name1: string;

  constructor(private activatedRouter: ActivatedRoute, private categoryService: CategoryListService,
              private toastCtrl: ToastController, private router: Router) {
    this.activatedRouter.queryParams.subscribe(queryParams => {
      this.title1 = queryParams.title1;
      if (this.title1 !== '大分类') {
        this.headTitle = '新增小分类';
        this.category = {
          id: 0,
          name: '',
          children: [{
            id: 0,
            name: '',
            children: []
          }]
        };
      } else {
        this.headTitle = '新增商品分类';
        this.category = {
          id: 0,
          name: '',
          children: [{
            id: 1,
            name: '',
            children: []
          }]
        };
      }
    });
  }

  /**
   * 新增商品小分类
   */
  addSubCategory() {
      this.category.children.push({
      id: this.category.children.length + 1,
      name: '',
      children: []
    });
  }

  /**
   * 保存新增分类
   * @returns {Promise<void>}
   */
  async onSave() {
    if (this.title1 === '大分类') { // 增加商品分类
      this.category.name = this.name1;
      if (this.categoryService.insert(this.category) === true) {
        const toast = await this.toastCtrl.create({
          message: '新增成功',
          duration: 3000
        });
        this.router.navigateByUrl('/category-list');
        // location.reload();
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: '新增失败，存在相同名称',
          duration: 3000
        });
        toast.present();
      }

    } else { // 增加商品小分类
      this.category.name = this.title1;
      if (this.categoryService.insertSubCateCategory(this.category) === true) {
        const toast = await this.toastCtrl.create({
          message: '新增成功',
          duration: 3000
        });
        this.router.navigateByUrl('/category-list');
       
        // location.reload();
        toast.present();
      
      } else {
        const toast = await this.toastCtrl.create({
          message: '新增失败，存在相同名称',
          duration: 3000
        });
        toast.present();
      }
    }
  }
  ngOnInit() {
  }

}
