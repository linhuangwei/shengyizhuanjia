import { LocalStorageService } from './../../shared/services/local-storage.service';
import { CATEGORIES } from '../class/mock.categories';
import { Injectable } from '@angular/core';
import { AjaxResult } from '../../shared/class/ajax-result';
import { Category } from '../class/category';
import { Observable, Subject } from 'rxjs';
import { ActiveCategory } from '../class/ActiveCategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryListService {
  categorySubject = new Subject<ActiveCategory>();

  constructor(private localStorageService: LocalStorageService) {}

  async getAll(): Promise<AjaxResult> {
    const categories = this.localStorageService.get('Category', CATEGORIES);
    return {
      targetUrl: '',
      result: categories,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  // 增加商品分类
  
  insert(category: Category): boolean {
    if (category == null) {
      return false;
    }
    if (this.isUniqueName(category) === false) {
      return false; // 子分类名称重复
    }
    const tmp = this.localStorageService.get('Category', CATEGORIES);
    category.id = tmp.length + 1;
    tmp.push(category);
    this.localStorageService.set('Category', tmp);
    return true;
  }

  // 小分类名字唯一
   
  isUniqueName(category: Category): boolean {
    if (category == null || (category.name === '')) {
      return false;
    }

    for (let i = 0; i < category.children.length - 1; i++) {
      for (let j = i + 1; j < category.children.length; j++) {
        if (category.children[i].name == category.children[j].name) {
          return false; // 找到相同名称，跳出循环
        }
      }
    }
    return true;
  }

  // 通过名字查找商品类别的索引
   
  findCategoryIndexByName(name: string): number {
    const cg = this.localStorageService.get('Category', CATEGORIES);
    for ( let i = 0; i < cg.length; i++) {
      if (cg[i].name == name) {
        return i;
      }
    }
    return -1;
  }

  // 通过ID查找商品类别索引
   
  findCategoryIndexById(id: number): number {
    const cg = this.all();
    for (let i = 0; i < cg.length; i++) {
      if (cg[i].id == id) {
        return i;
      }
    }
    return -1;
  }
  //  通过id查找商品类别
  
  findCategoryById(id: number): Category {
    const cg = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < cg.length; i++ ) {
      if (cg[i].id == id) {
        return cg[i];
      }
    }
    return null;
  }
  // 更新数据库
   
  update(category: Category[]) {
    this.localStorageService.set('Category', category);
  }

  // 增加商品小分类
   
  insertSubCateCategory(category: Category): boolean {
    if (category === null) {
      return false;
    }
    const tmp = this.localStorageService.get('Category', CATEGORIES);
    const index = this.findCategoryIndexByName(category.name);console.log(index);
    if (index === -1) {
      return false; // 未能找到索引
    }
    for (let j = 0; j < category.children.length; j++) {
      if(tmp[index].children.length >= 9){category.children[j].id = tmp[index].children.length + 1 + tmp[index].id * 100;}
      else {category.children[j].id = tmp[index].children.length + 1 + tmp[index].id * 10;}
      tmp[index].children.push(category.children[j]);
    }
    if (this.isUniqueName(tmp[index]) === false) {
      return false; // 名称重复
    } else {
      this.update(tmp);
      return true;
    }
  }

  // 通过名字删除商品小分类
   
  deleteSubCategoryById(category: Category, id: number): boolean {
    if (category == null) {
      return false;
    }
    for (let i = 0; i < category.children.length; i++) {
      if (category.children[i].id == id) {
        const index = this.findCategoryIndexByName(category.name);
        let tmp = this.localStorageService.get('Category', CATEGORIES);
        tmp[index].children.splice(i, 1);
        this.localStorageService.set('Category', tmp);
        return true;
      }
    }
    return false;
  }

  // 通过id删除商品分类
   
  deleteCategoryById(id: number): boolean {
    const tmp = this.localStorageService.get('Category', CATEGORIES);
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].id === id) {
        tmp.splice(i, 1);
        this.localStorageService.set('Category', tmp);
        return true;
      }
    }
    return false;
  }

  // 通过传入商品分类修改数据
  modifyCategory(cg: Category): boolean {
    const index = this.findCategoryIndexById(cg.id);
    if (index === -1) {
      return false;
    }
    let tmp = this.localStorageService.get('Category', CATEGORIES);
    tmp[index] = cg;
    this.update(tmp);
    return true;
  }

  // 返回所有商品类别.

  all(): Category[] {
    return this.localStorageService.get('Category', CATEGORIES);
  }

  // 返回可观察者
  watchCategory(): Observable<ActiveCategory> {
    return this.categorySubject.asObservable();
  }

  // 传送数据
  setActiveCategory(category: ActiveCategory) {
    this.categorySubject.next(category);
  }

}
