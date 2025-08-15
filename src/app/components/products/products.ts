import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Products {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private productService = inject(ProductService);

  private paramMapSignal = toSignal(this.route.paramMap, { initialValue: null });

  categoryId = computed(() => {
    const paramMap = this.paramMapSignal();
    const idParam = paramMap?.get('id');
    return idParam ? parseInt(idParam, 10) : null;
  });

  products = signal<Product[]>([]);
  loading = signal<boolean>(false);

  constructor() {
    effect(() => {
      const id = this.categoryId();
      if (id === null) return;

      this.fetchProducts(id);
    });
  }

  private fetchProducts(categoryId: number) {
    this.loading.set(true);

    this.productService.getCategoryProducts(categoryId).subscribe({
      next: (categoryResponse) => {
        const productIds = categoryResponse.map(c => c.ProductId);
        if (productIds.length === 0) {
          this.products.set([]);
          this.loading.set(false);
          return;
        }

        this.productService.getProductsByIds(productIds).subscribe({
          next: (productResponse) => {
            this.products.set(productResponse);
            this.loading.set(false);
          },
          error: () => this.loading.set(false)
        });
      },
      error: () => this.loading.set(false)
    });
  }
  goToDetail(product: Product) {
  this.router.navigate(['productDetail', product.id], { state: { product } });
}

}
