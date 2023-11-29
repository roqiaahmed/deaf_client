export interface Billboard {
    id: string;
    lable: string;
    urlImage: string;
  };

  export interface Category {
    id: string;
    name:string;
    billboardId:string
    billboard: Billboard
  }

  export interface Color {
    id: string;
    value: string;
    name: string;
  }

  export interface Scent {
    id: string;
    name: string;
  }

  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    colorId: string;
    color: Color;
    scentId: string;
    scent: Scent;
    urlImage: string;
    categoryId: string;
    category: Category;
  }

  export type Bag = {
    [key: string]: {
      product: Product;
      count: number;
    };
  };