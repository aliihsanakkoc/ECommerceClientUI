import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUri } from '../models/api-uri';
import { CategoryProductResponse } from '../models/category-product-response';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) {}

  getCategoryProducts(categoryId: number) {
    const url = `${ApiUri}CategoryProducts/OData?$filter=CategoryId eq ${categoryId}&$select=ProductId`;
    return this.http.get<CategoryProductResponse[]>(url);
  }

  getProductsByIds(productIds: number[]) {
    const idsStr = productIds.join(',');
    const url = `${ApiUri}Products/OData?$filter=Id in (${idsStr})`;
    return this.http.get<Product[]>(url);
  }
}
