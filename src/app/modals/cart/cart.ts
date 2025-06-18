import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { showCartModalSignal } from '../../modal.state';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cart {
  closeCartModal(){
    showCartModalSignal.set(false);
  }
}
