import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, MenuController} from '@ionic/angular';
import { Category } from '../../shared/category';
import { CategoryListService } from '../../shared/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.page.html',
  styleUrls: ['./category-list.page.scss'],
})
export class CategoryListPage implements OnInit {
  categories: Category[];
  activeCategory: Category;
  activeSubCategories: Category[];
  activeSubCategory: Category;
  private aClength = 0;

  constructor(
    private categoryService: CategoryListService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private menuController: MenuController,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(){
    this.activatedRoute.url.subscribe((params) => {
      this.DataInit();
    });
  }

  DataInit() {
    this.categoryService.getAll().then((data) => {
      this.categories = data.result;
      if (this.categories) {
        this.activeCategory = this.categories[0];
        this.activeSubCategories = this.activeCategory.children;
      }
      this.aClength = this.activeSubCategories.length;
      console.log(this.aClength);
    });

  }
  async onPresentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "选择您的操作",
      buttons: [
        {
          text: "新增小分类",
          role: "destructive",
          handler: () => {
            this.router.navigate(['/category-add'], {queryParams: {'title1': this.activeCategory.name}});
          },
        },
        {
          text: "编辑分类",
          handler: () => {
            console.log("Archive clicked");
            this.router.navigate(['/category-edit', this.activeCategory.id]);
          },
        },
        {
          text: "取消",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
  getItemColor(id: number): string {
    if (id === this.activeCategory.id) {
      return "";
    } else {
      return "light";
    }
  }
  selectCategory(category: Category) {
    this.activeCategory = category;
    this.activeSubCategories = this.activeCategory.children;
    this.aClength = this.activeSubCategories.length;
    console.log(this.aClength);
  }
  onSelect(category: Category) {
    this.categoryService.setActiveCategory(category);
    this.location.back();
  }
  ionViewWillEnter() {
    this.menuController.enable(false);
  }

  ionViewDidLeave() {
    this.menuController.enable(true);
  }
}
