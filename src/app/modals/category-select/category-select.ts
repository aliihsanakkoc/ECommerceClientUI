import { ChangeDetectionStrategy, Component, computed, signal, ViewEncapsulation } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category-service';
import { Router } from '@angular/router';
import { showCategoryModalSignal } from '../../modal.state';

@Component({
  selector: 'app-category-select',
  imports: [],
  templateUrl: './category-select.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySelect {
  levels = signal<Array<{ selected?: Category; items: Category[] }>>([]);

  constructor(private categoryService: CategoryService, private router: Router) {}

  start(): void {
    this.fetchLevel(1, 0);
  }

  fetchLevel(topCategoryId: number, levelIndex: number): void {
    this.categoryService.getCategories(topCategoryId).subscribe(categories => {
      const currentLevels = this.levels().slice(0, levelIndex);
      currentLevels[levelIndex] = { items: categories };
      this.levels.set(currentLevels);

      if (categories.length === 0 && levelIndex > 0) {
        const previous = currentLevels[levelIndex - 1]?.selected;
        if (previous) {
          currentLevels[levelIndex] = {
            items: [],
            selected: previous
          };
          this.levels.set(currentLevels);
        }
      }
    });
  }

  onSelect(category: Category, levelIndex: number): void {
    const currentLevels = this.levels();
    currentLevels[levelIndex].selected = category;
    this.levels.set(currentLevels);
    this.fetchLevel(category.id, levelIndex + 1);
  }

  canShowButton = computed(() => {
    const list = this.levels();
    if (list.length === 0) return false;
    const last = list[list.length - 1];
    return last.items.length === 0 && !!last.selected;
  });

  showProducts(): void {
    const last = this.levels()[this.levels().length - 1];
    const id = last.selected?.id;
    if (id) {
      this.router.navigate([`/products/${id}`]);
      showCategoryModalSignal.set(false);
    }
  }
  closeCategoryModal(){
    showCategoryModalSignal.set(false);
  }
}
