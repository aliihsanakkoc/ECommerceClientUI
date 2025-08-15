import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUri } from '../models/api-uri';
import { Observable } from 'rxjs';
import { VariantProductResponse } from '../models/variant-product-response';
import { Variant } from '../models/variant';

@Injectable({ providedIn: 'root' })
export class ProductDetailService {
  private http = inject(HttpClient);

  getExtraEntries(productType: string, productId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${ApiUri}${productType}s/OData?$filter=ProductId eq ${productId}`
    );
  }

  getVariantProducts(productId: number): Observable<VariantProductResponse[]> {
    return this.http.get<VariantProductResponse[]>(
      `${ApiUri}VariantProducts/OData?$filter=ProductId eq ${productId}&$select=VariantId`
    );
  }

  getVariantsByIds(variantIds: number[]): Observable<Variant[]> {
    const ids = variantIds.join(',');
    return this.http.get<Variant[]>(
      `${ApiUri}Variants/OData?$filter=id in (${ids})`
    );
  }
}
