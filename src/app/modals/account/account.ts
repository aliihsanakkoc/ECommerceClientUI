import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { showAccountModalSignal } from '../../modal.state';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Account {
  closeAccountModal(){
    showAccountModalSignal.set(false);
  }
}
