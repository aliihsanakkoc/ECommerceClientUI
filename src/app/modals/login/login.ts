import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { showLoginModalSignal } from '../../modal.state';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  closeLoginModal(){
    showLoginModalSignal.set(false);
  }
}
