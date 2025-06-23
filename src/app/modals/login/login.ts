import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { showLoginModalSignal } from '../../modal.state';
import { AuthService } from '../../services/auth-service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  closeLoginModal(){
    showLoginModalSignal.set(false);
  }
  constructor(private authService:AuthService){}
  user:User={email:"",password:""}
  login(){
    this.authService.login(this.user).subscribe();
  }
}
