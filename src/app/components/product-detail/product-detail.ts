import { Component, OnInit, signal, computed, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductDetailService } from '../../services/product-detail-service';
import { VariantGroup } from '../../models/variant-group';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  imports:[CurrencyPipe],
  encapsulation:ViewEncapsulation.None,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductDetail implements OnInit {
  product = signal<Product | null>(null);
  extraEntries = signal<any[]>([]);
  variantGroups = signal<VariantGroup[]>([]);
  selectedVariants = signal<Record<number, number>>({});

  constructor(
    private route: ActivatedRoute,
    private service: ProductDetailService
  ) {}

  ngOnInit(): void {
    const nav = history.state as { product?: Product };
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (nav.product) {
      this.product.set(nav.product);
    } else {
      // Product yoksa API'den çağırabilirsin (opsiyonel)
    }

    if (this.product()) {
      this.loadExtraEntries(this.product()!.productType, id);
      this.loadVariants(id);
    }
  }

  loadExtraEntries(productType: string, productId: number) {
    this.service.getExtraEntries(productType, productId).subscribe((res) => {
      this.extraEntries.set(res);
    });
  }

  loadVariants(productId: number) {
    this.service.getVariantProducts(productId).subscribe((vp) => {
      const ids = vp.map((v) => v.VariantId);
      if (ids.length > 0) {
        this.service.getVariantsByIds(ids).subscribe((variants) => {
          const grouped: Record<number, VariantGroup> = {};
          for (const v of variants) {
            if (!grouped[v.topVariantId]) {
              grouped[v.topVariantId] = {
                topVariantName: v.topVariantName,
                topVariantId: v.topVariantId,
                options: [],
              };
            }
            grouped[v.topVariantId].options.push(v);
          }
          this.variantGroups.set(Object.values(grouped));
        });
      }
    });
  }

  onVariantSelect(topVariantId: number, variantId: number) {
    this.selectedVariants.update((sv) => ({
      ...sv,
      [topVariantId]: variantId,
    }));
  }

  canAddToCart = computed(() => {
    const groups = this.variantGroups();
    const selections = this.selectedVariants();
    return (
      groups.length > 0 &&
      groups.every((g) => selections[g.topVariantId] !== undefined)
    );
  });
  getKeys(obj: any): string[] {
  return Object.keys(obj);
}

}
