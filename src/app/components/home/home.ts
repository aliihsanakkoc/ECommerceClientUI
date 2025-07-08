import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { showCategoryModalSignal } from '../../modal.state';
import { CategorySelect } from '../../modals/category-select/category-select';

@Component({
  selector: 'app-home',
  imports: [CategorySelect],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {

  showCategory = showCategoryModalSignal;

  startShopping(){
    this.showCategory.set(true);
  }
}
