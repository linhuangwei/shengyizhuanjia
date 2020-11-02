export interface Product {
    id: string;
    name: string;
    categoryId: number;
    categoryName: string;
    category: any;
    barcode: string; // 条码
    images: string[];
    price: number; // 售价
    purchasePrice: number; // 进价
}
