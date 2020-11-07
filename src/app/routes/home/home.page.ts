import { SalesService } from '../../shared/services/sales.service';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  private sales: Array<{title: string, content: string, previous: number, current: number}>;

  constructor(private sale: SalesService) {
    this.sales = [
      {title : '今日', content : '比昨日', previous : this.sale.getSales(), current : this.sale.getSales()},
      {title : '七日', content : '比同期', previous : this.sale.getSales(), current : this.sale.getSales()},
      {title : '本月', content : '比同期', previous : this.sale.getSales(), current : this.sale.getSales()}
    ];
   }
   options = [
    [
      {'href': '/add-product', 'name': 'add_salse', 'text': '新增商品', 'disable': false},
      {'href': '/home', 'name': 'add_user', 'text': '新增会员', 'disable': false},
      {'href': '/home', 'name': 'sales_account', 'text': '收银记账', 'disable': false},
      {'href': '/home', 'name': 'a_note', 'text': '支出管理', 'disable': false}
    ],
    [
      {'href': '/product-list', 'name': 'sales_management', 'text': '商品管理', 'disable': false},
      {'href': '/home', 'name': 'user_management', 'text': '会员管理', 'disable': false},
      {'href': '/home', 'name': 'shop_management', 'text': '查询销售', 'disable': false},
      {'href': '/home', 'name': 'analysis', 'text': '智能分析', 'disable': false}
    ],
    [
      {'href': '/home', 'name': 'gongying_more', 'text': '供应商管理', 'disable': false},
      {'href': '/home', 'name': 'guandan_more', 'text': '挂单', 'disable': false},
      {'href': '/category-list', 'name': 'image_addsales', 'text': '高级功能', 'disable': false},
      {'disable': true}
    ]
  ];


  ngOnInit() {
  }
  /**
   *
   *
   * @param {number} current 当前销售数据
   * @param {number} previous 前期销售数据
   * @returns {number} 1 增长 0 持平 -1 减少
   * @memberof HomePage
   */
  minus(current: number, previous: number): number {
    const result = current - previous;
    if (result > 0) {
      return 1;
    } else if (result === 0) {
      return 0;
    } else {
      return -1;
    }
  }

}
