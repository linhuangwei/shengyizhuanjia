import { Category } from './../class/category';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { AjaxResult } from '../class/ajax-result';
import { Product } from '../class/product';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private localStorageService: LocalStorageService) { }


  async insert(input: Product): Promise<AjaxResult>  {
    input.id = UUID.UUID();
    const res = this.localStorageService.get('product', []);
    res.push(input);
    this.localStorageService.set('product', res);
    return {
      targetUrl: '',
      result: res,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  async getListByCondition(index: number, size: 10, input: any): Promise<AjaxResult> {
    const productlist = this.localStorageService.get('product', []);
    let tmp = [];
    for (const p of productlist) {
      if (p.name == input || p.barcode == input || p.price == input) {
        tmp.push(p);
      }
    }
    const total = tmp.length;
    tmp = tmp.slice((index - 1) * size, index * size);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }



  autoIncrement(array: Product[]): string {
    if (array.length === 0) { return ''; }
    const new_id = array[length - 1].id + 1;
    return new_id;
  }

  async totalNumberOfGoods(): Promise<AjaxResult> {
    const num = this.localStorageService.get('product', []).length;
    return {
      targetUrl: '',
      result: num,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  async getListByCategoryName(index: number, size: 10, categoryName: any): Promise<AjaxResult> {
    const productlist = this.localStorageService.get('product', []);
    let tmp = [];
    for (const p of productlist) {
      if (p.categoryName == categoryName) {
        tmp.push(p);
      }
    }
    const total = tmp.length;
    tmp = tmp.slice((index - 1) * size, index * size);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
  
  modefyProduct(product: Product): boolean {
    const products = this.localStorageService.get('product', []);
    for (let i = 0; i < products.length; i++) {
      if (products[i].barcode == product.barcode) {
        products[i] = product;
        this.localStorageService.set('product', products);
        return true;
      }
    }
    return false;
  }

 
  async getList(index: number, size: number): Promise<AjaxResult> {
    if (index < 0) {
     // 实际开发中应抛出异常类对象
      throw new Error('分页的索引应大于等于零');
    }
    if (size <= 0) {
     // 实际开发中应抛出异常类对象
      throw new Error('每页显示的记录数应大于零');
    }
    let tmp = this.localStorageService.get('product', []);
    tmp = tmp.slice((index - 1) * size, index * size);
    return {
      targetUrl: '',
      result: tmp,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }

  initProduct(): Product {
    return {
      id: '',
      name: '',
      categoryId: null,
      categoryName: '',
      category: null,
      barcode: '', // 条码
      images: [],
      price: null, // 售价
      purchasePrice: null, // 进价
      inventory: null, // 库存
      standard: null, // 规格
      remark: null
    };
  }

  getProductByBarcode(barcode: string): Product {
    const products = this.localStorageService.get('product', []);
    let res = this.initProduct();
    for (const p of products) {
      if (p.barcode == barcode) {
        res = p;
        break;
      }
    }
    return res;
  }

 
  deleteProductByBarcode(barcode: string): boolean{
    const tmp = this.localStorageService.get('product', []);
    if (tmp === null || tmp.length === 0) {
      return false;
    }
    for (let i = 0; i < tmp.length; i++) {
      if (tmp[i].barcode == barcode) {
        tmp.splice(i, 1);
        this.localStorageService.set('product', tmp);
        return true;
      }
    }
    return false;
  }
}
