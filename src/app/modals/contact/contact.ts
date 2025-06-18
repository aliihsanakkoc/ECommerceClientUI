import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { showContactModalSignal } from '../../modal.state';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact {
  closeContactModal(){
    showContactModalSignal.set(false);
  }
}
